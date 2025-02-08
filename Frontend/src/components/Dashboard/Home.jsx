import React, { useEffect, useState } from "react";
import Roadmap from "../Dashboard/CareerPaths/Roadmap";
import { SearchBar } from "./SearchBar";
import ProgressBar from "./ProgressBar";
import Events from "./Events";
import VoiceAssistant from "./VoiceAssistant";
import { Plus, Minus } from "lucide-react";
import { careerData } from "./CareerPaths/careerData";
import { motion } from "framer-motion";

const Home = () => {
  const stats = [
    { label: "Projects", value: 12, bgColor: "bg-[#ADFF00]" },
    { label: "Completed", value: "68%", bgColor: "bg-[#ADFF00]" },
    { label: "Active Goals", value: 5, bgColor: "bg-[#ADFF00]" },
  ];

  return (
    <div className="max-w-full rounded-3xl bg-[#FEFCE8] dark:bg-gray-800 dark:text-white shadow-lg transition-all min-h-screen">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .mobile-order {
            order: 2;
          }
        }
      `}</style>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 h-full">
        {/* Main Content (3/5 width on desktop) */}
        <div className="lg:col-span-3 p-4 md:p-6 overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`bg-[#ADFF00] p-4 rounded-3xl text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl text-black font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Roadmap */}
          <div className="w-full">
            <Roadmap
              path={careerData["Machine Learning Engineer"]}
              title="Software Developer Career Path"
            />
          </div>
        </div>

        {/* Scrollable Sidebar Content (2/5 width on desktop) */}
        <div className="lg:col-span-2 mobile-order dark:bg-[#364153] h-auto lg:h-full overflow-y-auto scrollbar-hide">
          <div className="sticky top-0 z-10 bg-[#364153] p-4">
            <div className="flex justify-end">
              
            </div>
          </div>
          
          <div className="space-y-6 p-4">
            {/* Events */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-4xl p-4 shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Events />
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-4xl p-4 shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProgressBar />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fixed Position Elements */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
        <VoiceAssistant />
      </div>

      <div className="fixed bottom-4 left-4 md:bottom-5 md:left-7 z-50 flex flex-col gap-2">
        <button className="p-2 md:p-3 rounded-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition">
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button className="p-2 md:p-3 rounded-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg hover:bg-red-600 dark:hover:bg-red-800 transition">
          <Minus className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Home;