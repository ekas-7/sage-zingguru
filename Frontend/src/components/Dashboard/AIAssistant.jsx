import { useState, useEffect } from "react";
import { Send, Mic, Bot, User, MoreHorizontal, Trash, Plus } from "lucide-react";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I assist you today?", type: "ai", timestamp: "10:24 AM" }
  ]);
  const [isListening, setIsListening] = useState(false);

  const stats = [
    { label: "Total Chats", value: 42, bgColor: "bg-blue-100 dark:bg-blue-900" },
    { label: "Active Sessions", value: 3, bgColor: "bg-green-100 dark:bg-green-900" },
    { label: "Avg Response Time", value: "1.2s", bgColor: "bg-gray-100 dark:bg-gray-800" }
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        content: input,
        type: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInput("");
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="max-w-full h-screen p-4 md:p-6 bg-[#FEFCE8] dark:bg-gray-800 dark:text-white shadow-lg transition-all flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-[#ADFF00] p-4 rounded-lg text-center`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chat Container with Voice UI Overlay */}
      <div className="h-96 mb-6 relative flex-grow">
        {/* Chat Messages - Hidden during listening but preserved */}
        <div className={`h-full overflow-y-auto space-y-4 pr-2 transition-opacity duration-300 ${
          isListening ? 'opacity-0' : 'opacity-100'
        }`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white dark:bg-blue-800' 
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {message.type === 'ai' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                  <button className="hover:opacity-75">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice UI Overlay - Shows during listening */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isListening ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="relative w-32 h-32">
            {/* Animated gradient orb */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500 via-purple-600 to-pink-600 mix-blend-overlay animate-spin-slow"></div>
            </div>
            {/* Ripple effects */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping animation-delay-300"></div>
          </div>
          <p className="absolute bottom-1/4 text-lg font-medium">Listening...</p>
        </div>
      </div>

      {/* Input Area - Always at the bottom */}
      <div className="flex mb-20 items-center gap-2 bg-white dark:bg-gray-600 rounded-lg p-2 shadow-md">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Plus className="w-5 h-5" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none p-2"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 hover:bg-gray-100 flex dark:hover:bg-gray-700 rounded-full"
        >
          <Send className="w-5 h-5 text-blue-500" />
        </button>
        <button
          onClick={toggleListening}
          className={`p-2 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Mic className={`w-5 h-5 ${isListening ? 'text-white' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;