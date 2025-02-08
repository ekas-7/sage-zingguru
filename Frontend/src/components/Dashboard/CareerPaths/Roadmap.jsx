import React from 'react';
import { Card, CardHeader, CardContent } from "./Card";
import { Search } from 'lucide-react';

const RoadmapPath = ({ path, title }) => {
  const totalMilestones = path.roadmap.length;
  const completedMilestones = 2; // This would be dynamic in a real app
  const upcomingMilestones = totalMilestones - completedMilestones;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-none"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-2">
          <span className="text-2xl font-bold">{totalMilestones}</span>
          <span className="text-gray-600">Total</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex items-center gap-2">
          <span className="text-2xl font-bold">{completedMilestones}</span>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-2">
          <span className="text-2xl font-bold">{upcomingMilestones}</span>
          <span className="text-gray-600">Upcoming</span>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

        {/* Milestone Cards */}
        {path.roadmap.map((milestone, index) => (
          <div key={milestone.milestone} className="relative mb-8">
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <Card className="transform transition-all hover:scale-105">
                  <CardHeader className="p-4">
                    <h3 className="text-lg font-semibold">{milestone.milestone}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {milestone.details.map((detail, i) => (
                        <p key={i} className="text-sm">{detail}</p>
                      ))}
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Resources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {milestone.resources.map((resource, i) => (
                            <span key={i} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Node */}
              <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full relative z-10" />
              </div>

              {/* Empty Space for Alternating Layout */}
              <div className="w-5/12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage component
const LearningRoadmap = () => {
  const careerPath = {
    "Software Developer": {
      "roadmap": [
        {
          "milestone": "Learn Programming Basics",
          "description": "Start with fundamental programming concepts.",
          "details": [
            "Choose a language: Python, JavaScript, Java, C++",
            "Learn variables, loops, functions, and OOP",
            "Practice basic problems on platforms like LeetCode, CodeChef"
          ],
          "resources": ["CS50 Harvard", "Python Crash Course", "freeCodeCamp"]
        },
        {
          "milestone": "Master Data Structures & Algorithms",
          "description": "Understand how data structures and algorithms work.",
          "details": [
            "Study Arrays, Linked Lists, Stacks, Queues, Trees, Graphs",
            "Learn sorting, searching, dynamic programming",
            "Solve at least 100 problems on LeetCode"
          ],
          "resources": ["NeetCode", "GeeksforGeeks", "Cracking the Coding Interview"]
        },
        {
          "milestone": "Learn Version Control",
          "description": "Understand how to manage code versions and collaborate with Git.",
          "details": [
            "Learn Git basics: commit, push, pull, branches",
            "Use GitHub for project management",
            "Contribute to open-source projects"
          ],
          "resources": ["Pro Git Book", "GitHub Docs", "Try Git by Atlassian"]
        },
        {
          "milestone": "Understand System Design Basics",
          "description": "Learn how to design scalable applications.",
          "details": [
            "Understand databases (SQL vs NoSQL)",
            "Learn about caching, load balancing, and microservices",
            "Read system design case studies"
          ],
          "resources": ["System Design Primer", "Grokking the System Design Interview"]
        },
        {
          "milestone": "Build Real-World Projects",
          "description": "Apply your knowledge by building software projects.",
          "details": [
            "Create a portfolio website",
            "Develop a CRUD-based application",
            "Contribute to open-source repositories"
          ],
          "resources": ["Frontend Mentor", "Dev.to", "Hackathons"]
        }
      ]
    }
  };

  return (
    <RoadmapPath 
      path={careerPath["Software Developer"]} 
      title="Software Developer Career Path" 
    />
  );
};

export default LearningRoadmap;