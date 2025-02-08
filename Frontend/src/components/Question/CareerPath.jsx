import React, { useState } from "react";
import axios from "axios";
import { Loader2, Send, Sparkles, BookOpen, GraduationCap } from "lucide-react";

const CareerPathApp = () => {
  const [questions, setQuestions] = useState(["What are your key interests?"]);
  const [responses, setResponses] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [careerPath, setCareerPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResponseChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = value;
    setResponses(updatedResponses);
  };

  const handleNextQuestion = async () => {
    if (!responses[currentIndex].trim()) {
      setError("Please fill in your response before proceeding.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (questions.length < 6) {
        const res = await axios.post("http://localhost:3000/next-question", {
          questions,
          responses,
        });

        setQuestions(res.data.questions);
        setResponses(res.data.responses);
        setCurrentIndex(currentIndex + 1);
      }

      if (questions.length === 6) {
        const careerRes = await axios.post("http://localhost:3000/career-path", {
          questions,
          responses,
        });

        let parsedCareerPath;
        try {
          parsedCareerPath = JSON.parse(careerRes.data.career_path);
        } catch {
          parsedCareerPath = careerRes.data.career_path;
        }

        setCareerPath(parsedCareerPath);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Career Path Generator</h1>
          </div>
          <p className="text-gray-600">Discover your ideal career path through AI-powered guidance</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {careerPath ? (
            <div className="space-y-8">
              <div className="border-b pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-indigo-600" />
                  {careerPath.title || "Your Career Path"}
                </h2>
                <p className="text-gray-700">{careerPath.description || "AI-generated career guidance based on your responses."}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  Career Milestones
                </h3>
                {Array.isArray(careerPath.milestones) &&
                  careerPath.milestones.map((milestone, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-700 mb-4">{milestone.description}</p>
                      <div className="text-sm text-gray-500 mb-4">Timeline: {milestone.timeframe || "Varies"}</div>

                      {milestone.resources && milestone.resources.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-900">Resources:</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {milestone.resources.map((resource, rIndex) => (
                              <li key={rIndex}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800"
                                >
                                  {resource.title}
                                </a>
                                <span className="text-gray-500 text-sm"> ({resource.type})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Question {currentIndex + 1} of 6</h2>
                <p className="text-gray-700">{questions[currentIndex]}</p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={responses[currentIndex]}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-4 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Type your response..."
                  rows={4}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handleNextQuestion}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Next</span>
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">Press Enter to submit your response</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathApp;
