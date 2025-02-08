from fastapi import FastAPI, HTTPException
import os
import requests
from langchain_community.document_loaders import TextLoader
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import time
from pymongo import MongoClient
import json

# Load environment variables
load_dotenv()

gemini_api_key = os.environ.get("GEMINI_API_KEY")
mongo_uri = os.environ.get("MONGO_URI")

if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY is not set in environment variables.")
if not mongo_uri:
    raise ValueError("MONGO_URI is not set in environment variables.")

# FastAPI app setup
app = FastAPI()

# Initialize MongoDB connection
mongo_client = MongoClient(mongo_uri)
db = mongo_client.get_default_database()

# Initialize embeddings
embeddings = OllamaEmbeddings(model="llama3")

# Global FAISS vector store
vector_store = None

# Initialize Google Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=gemini_api_key,
    temperature=0.7
)

# Chat prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", """
    Answer the question based on the provided context and collection data.
    Please provide the most accurate response considering both the immediate context
    and relevant information from the collections.
    
    Context: {context}
    Collection Data: {collection_data}
    """),
    ("user", "{input}")
])

document_chain = create_stuff_documents_chain(llm, prompt)

async def get_all_collections_data():
    collections = ["User", "Playlist", "Book", "CareerPath", "Question", "Other"]
    all_data = {}
    
    for collection_name in collections:
        collection = db[collection_name]
        documents = list(collection.find({}, {'_id': 0}))
        all_data[collection_name] = documents
    
    return all_data

def process_collection_data_for_embedding(collection_data):
    texts = []
    for collection_name, documents in collection_data.items():
        for doc in documents:
            if isinstance(doc.get('data'), str):
                texts.append(f"{collection_name}: {doc['data']}")
            else:
                texts.append(f"{collection_name}: {json.dumps(doc)}")
    return texts

@app.post("/add_text/")
async def add_text(text: str):
    global vector_store
    try:
        collection_data = await get_all_collections_data()
        collection_texts = process_collection_data_for_embedding(collection_data)
        
        all_texts = [text] + collection_texts
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
        final_documents = text_splitter.split_text("\n".join(all_texts))
        
        new_vectors = FAISS.from_texts(final_documents, embeddings)
        
        if vector_store is None:
            vector_store = new_vectors
        else:
            existing_texts = vector_store.get_texts()
            all_texts = existing_texts + final_documents
            vector_store = FAISS.from_texts(all_texts, embeddings)
        
        return {"message": "Text and collection data added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding text: {e}")

@app.post("/get_response/")
async def get_response(input_text: str):
    global vector_store
    if vector_store is None:
        raise HTTPException(status_code=400, detail="No data available in vector store. Add text first.")
    
    try:
        collection_data = await get_all_collections_data()
        retriever = vector_store.as_retriever()
        retrieved_docs = retriever.invoke(input_text)
        context = "\n".join([doc.page_content for doc in retrieved_docs])
        
        response = requests.get("http://localhost:5001/allCollection")
        if response.status_code == 200:
            context += "\n" + response.text
        
        full_context = {
            "context": context,
            "collection_data": json.dumps(collection_data, indent=2),
            "input": input_text
        }
        
        start = time.time()
        response = llm.invoke(prompt.format_messages(**full_context))
        end = time.time()
        
        return {
            "response": response.content,
            "response_time": f"{end - start:.2f} seconds"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

@app.get("/refresh_vectorstore/")
async def refresh_vectorstore():
    global vector_store
    try:
        collection_data = await get_all_collections_data()
        texts = process_collection_data_for_embedding(collection_data)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
        final_documents = text_splitter.split_text("\n".join(texts))
        vector_store = FAISS.from_texts(final_documents, embeddings)
        return {"message": "Vector store refreshed successfully with current collection data"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing vector store: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)