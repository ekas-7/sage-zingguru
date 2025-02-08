import { useState } from "react";
import { Search, Plus, Minus, Lock, MoreHorizontal, Check, Play } from "lucide-react";
import DarkModeToggle from "../ui/DarkModeToggle";

const LearningRoadmap = () => {
  const [expanded, setExpanded] = useState(null);

  const stats = [
    { label: "Total", value: 26, bgColor: "bg-blue-100 dark:bg-blue-900" },
    { label: "Completed", value: 2, bgColor: "bg-green-100 dark:bg-green-900" },
    { label: "Upcoming", value: 23, bgColor: "bg-gray-100 dark:bg-gray-800" }
  ];

  const courses = [
    {
      title: "Medical Terminology",
      description: "Learn basic medical language for effective communication.",
      status: "completed"
    },
    {
      title: "Pharmacology Basics",
      description: "Introduction to drug interactions and medical prescriptions.",
      status: "in-progress",
      progress: "00:30",
      isVideo: true
    },
    {
      title: "Anatomy and Physiology",
      description: "Understand the structure and function of the human body.",
      status: "completed"
    },
    {
      title: "Medical Ethics and Professionalism",
      description: "Understand ethical principles and professionalism in healthcare.",
      status: "upcoming",
      isLocked: true
    },
    {
      title: "Disease Pathophysiology",
      description: "Study the cellular and molecular basis of common diseases.",
      status: "upcoming",
      isLocked: true
    }
  ];

  return (
    <div className="max-w-4xl p-4 md:p-6 rounded-xl bg-[#FEFCE8]  dark:bg-gray-900 dark:text-white shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Roadmap</h1>
        <div className="flex items-center gap-3">

          <button className="text-3xl cursor-pointer hover:scale-110 transition-transform">
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-[#ADFF00] p-4 rounded-lg text-center`}>
            <div className="text-2xl text-black font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={course.title}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            {/* Connection Line */}
            {index > 0 && (
              <div className="absolute -top-4 left-8 w-0.5 h-4 bg-gray-200 dark:bg-gray-700" />
            )}

            <div className="flex items-start justify-between">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  {course.status === "completed" && (
                    <span className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      Completed <Check className="w-3 h-3" />
                    </span>
                  )}
                  {course.status === "upcoming" && (
                    <span className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-white text-xs px-2 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{course.description}</p>

                {/* Video Progress */}
                {course.isVideo && course.progress && (
                  <div className="mt-2 flex items-center gap-2">
                    <button className="p-2  rounded-full hover:scale-110 transition">
                      <Play className="w-5 h-5" />
                    </button>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Watching {course.progress}
                    </span>
                  </div>
                )}

                {/* Expandable Content */}
                {expanded === index && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      More details about this course can go here.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {course.isLocked ? (
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Lock className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default LearningRoadmap;
