import React, { useState, useEffect } from "react";
import EditorComponent from "./Notion/EditorComponent";
import { db, collection, addDoc, getDocs, setDoc, doc, updateDoc } from "../../config/firebase";
import { DoorClosed } from "lucide-react";

const NotionHelp = () => {
  const [fileName, setFileName] = useState(""); // To store filename
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [initialData, setInitialData] = useState({
    time: Date.now(),
    blocks: [
      {
        type: "header",
        data: {
          text: "hello.js",
          level: 2,
        },
      },
    ],
    version: "2.11.10",
  });

  

  // Fetch saved notes from Firebase
  useEffect(() => {
    const fetchNotes = async () => {

      const querySnapshot = await getDocs(collection(db, "notionFiles"));

      querySnapshot.docs.forEach((doc) => {
        console.log("Document ID:", doc.id);
        console.log("Document Data:", doc.data()); // Using doc.data() to get the fields directly
      });

      // console.log(querySnapshot.docs.data());

      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        fileName: doc.data().fileName,  // Corrected field name,
        ...doc.data()
      }));
      // console.log("new : " , notesData);

      setNotes(notesData);
    };

    fetchNotes();
  }, []);

  // Save note to Firebase
  const saveNote = async (data) => {
    if (!selectedFile) {
      alert("Please create or select a file first.");
      return;
    }

    try {
      // Update the document in the "notionFiles" collection with the selected file ID
      const noteRef = doc(db, "notionFiles", selectedFileId);

      await updateDoc(noteRef, {
        data: data,  // Update the 'data' field with the new content
      });

      console.log("Saved Note:", data);
      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again.");
    }
  };

  // Create a new file
  const createFile = async () => {
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "notionFiles"), {
        fileName,
        data: {
          time: Date.now(),
          blocks: [
            {
              type: "header",
              data: {
                text: "hello.js",
                level: 2,
              },
            },
          ],
          version: "2.11.10",
        },
      });

      setNotes([...notes, { id: docRef.id, fileName }]);
      setSelectedFile(docRef.id);
      alert("File created successfully!");
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Error creating file, please try again.");
    }
  };

  // Load a saved notion file
  const handleNotionClick = async (file) => {
    if (file.id === selectedFileId) return
    setSelectedFile(file.fileName);
    setSelectedFileId(file.id)

    // Destructure file.data to remove fileName and name
    const { fileName, name, id, ...restData } = file;

    // Now restData contains everything except fileName and name
    setInitialData(restData.data);
  };


  return (
    <div className="w-full h-[calc(100vh-100px)]">
      <div className="h-full bg-[#fffbea] border-2 border-black rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col lg:flex-row h-full gap-4">
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex flex-col gap-4 bg-[#d7e933] p-4 rounded-xl border-2 border-black">
            <div className="mb-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="w-full p-2 border rounded-md"
              />
              <button
                onClick={createFile}
                className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md"
              >
                Create File
              </button>
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="font-bold">Saved Files</h3>
              {notes.length === 0 ? (
                <p className="text-gray-500">No files created.</p>
              ) : (
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <li
                      key={note.id}
                      className={`p-3 cursor-pointer border rounded-md shadow-md hover:bg-gray-100 transition ${selectedFile === note.id ? "bg-gray-200" : "bg-white"
                        }`}
                      onClick={() => handleNotionClick(note)}
                    >
                      {note.fileName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full">
            {selectedFile ? (
              <EditorComponent initialData={initialData} onSave={saveNote} />
            ) : (
              <div className="w-full h-full p-4 border border-gray-600 bg-black rounded-lg shadow-lg flex flex-col overflow-hidden">
                <p className="text-lg font-bold text-gray-600">Please select a file to edit</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default NotionHelp;
