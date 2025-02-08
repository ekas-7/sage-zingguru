const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

// Route to generate career path based on questions
app.post("/career-path", async (req, res) => {
    const { questions } = req.body;
    
    if (!questions || questions.length !== 6) {
        return res.status(400).json({ error: "Exactly 6 questions are required." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Based on the following questions and responses, generate a career path JSON with milestones, descriptions, details, and resources: ${JSON.stringify(questions)}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ career_path: text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to suggest follow-up questions based on user responses
app.post("/suggest-questions", async (req, res) => {
    const { questions, responses } = req.body;
    
    if (!questions || !responses || questions.length !== responses.length) {
        return res.status(400).json({ error: "Questions and responses are required and should be of equal length." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Given these previous questions and responses: ${JSON.stringify(questions.map((q, i) => ({ question: q, response: responses[i] })))}, suggest the next relevant question to guide career exploration along with 5 multiple-choice options. Stop at 6 questions.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const nextQuestionWithOptions = response.text();
        
        const updatedQuestions = [...questions, nextQuestionWithOptions];
        const updatedResponses = [...responses, "Pending Response"];

        if (updatedQuestions.length === 6) {
            const careerResponse = await fetch("http://localhost:3000/career-path", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questions: updatedQuestions, responses: updatedResponses })
            });
            const careerPath = await careerResponse.json();
            return res.json({ questions: updatedQuestions, responses: updatedResponses, career_path: careerPath });
        }

        res.json({ questions: updatedQuestions, responses: updatedResponses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});