import React from "react";
import Roadmap from "./Roadmap";
import { SearchBar } from "./SearchBar";
import ProgressBar from "./ProgressBar";
import Events from "./Events";
import VoiceAssistant from './VoiceAssistant'
import {Plus,Minus} from 'lucide-react'

const Home = () => {
  const stats = [
    { label: "Projects", value: 12, bgColor: "bg-[#ADFF00]" },
    { label: "Completed", value: "68%", bgColor: "bg-[#ADFF00]" },
    { label: "Active Goals", value: 5, bgColor: "bg-[#ADFF00]" },
  ];

  return (
    <div className="max-w-full p-4 md:p-6 mt-1 rounded-3xl bg-[#FEFCE8] dark:bg-gray-800 dark:text-white shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar />
        </div>
      </div>

      <div className="fixed bottom-0 right-0">
      <VoiceAssistant/>
      </div>

      {/* Floating Actions */}
            <div className="fixed bottom-5 left-7 z-50 flex flex-col gap-2">
              <button className="p-3 rounded-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg hover:bg-red-600 dark:hover:bg-red-800 transition">
                <Minus className="w-5 h-5" />
              </button>
            </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-[#ADFF00] p-4 rounded-lg text-center`}
          >
            <div className="text-2xl text-black font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 ">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col md:flex-row justify-evenly gap-8">
        {/* Roadmap Section */}
        <div className="flex flex-col">
          <Roadmap />

          {/* Progress Bar */}
          <div className="mt-6">
            <ProgressBar />
          </div>
        </div>

        {/* Events Section */}
        <Events />
      </div>
    </div>
  );
};

export default Home;
