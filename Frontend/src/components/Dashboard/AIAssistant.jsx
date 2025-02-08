import { useState, useEffect } from "react";
import { Send, Mic, Bot, User, MoreHorizontal, Trash, Plus } from "lucide-react";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I assist you today?", type: "ai", timestamp: "10:24 AM" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Total Chats", value: 42, bgColor: "bg-blue-100 dark:bg-blue-900" },
    { label: "Active Sessions", value: 3, bgColor: "bg-green-100 dark:bg-green-900" },
    { label: "Avg Response Time", value: "1.2s", bgColor: "bg-gray-100 dark:bg-gray-800" }
  ];

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        content: input,
        type: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...messages, userMessage]);
      setInput("");
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input })
        });

        const data = await response.json();
        
        const aiMessage = {
          id: messages.length + 2,
          content: data.reply || "I'm not sure how to respond to that.",
          type: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error communicating with API:", error);
      }

      setLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="max-w-full h-screen p-4 md:p-6 bg-[#FEFCE8] dark:bg-gray-800 dark:text-white shadow-lg transition-all flex flex-col">
      

      <iframe
        src="https://ekas-7-streamlit-app-g4fbyx.streamlit.app?embed=true"
        style={{ height: "100%", width: "100%", border: "none" }}
      ></iframe>
      
     
    </div>
  );
};

export default AIAssistant;
