import React from 'react';

const MilestonePage = ({ milestones }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Milestones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md p-4 transition-all hover:shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{milestone.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Due Date: {milestone.dueDate}</p>
            <button className="mt-4 bg-[#ADFF00] text-black rounded-2xl px-4 py-2 hover:bg-green-600 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestonePage; 