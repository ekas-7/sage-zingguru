import React from "react";
import Milestone from "../../../assets/Milestone.json";
import { format, addDays, isBefore, isToday, isAfter } from "date-fns";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUrl } from "../../../store/userSlice";

function Milestones() {
  const startDate = new Date(); // Today’s Date
  const today = new Date(); // Current Date
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleMilestoneClick = (url) => {
    console.log("url : ",url);
    
     dispatch(setUrl(url));
     navigate('/dashboard')
  }

  return (
    <div className="w-full h-full p-4 border border-gray-600 bg-black rounded-lg shadow-lg flex flex-col overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Software Developer Roadmap
      </h1>
      <div className="space-y-6">
        {Milestone.map((milestone, index) => {
          const milestoneDate = addDays(startDate, index * 7);

          let status = "";
          if (isBefore(milestoneDate, today)) {
            status = "Completed";
          } else if (isToday(milestoneDate)) {
            status = "Current";
          } else if (isAfter(milestoneDate, today)) {
            status = "Upcoming";
          }

          return (
            <div 
              key={index} 
              className="flex items-center space-x-6 cursor-pointer"
              onClick={() => handleMilestoneClick(milestone.link)}
            >
              {/* Date Card */}
              <div className="flex-shrink-0 text-center text-white w-24">
                <p className="text-lg font-bold">{format(milestoneDate, "dd")}</p>
                <p className="text-sm uppercase">{format(milestoneDate, "MMM yyyy")}</p>
              </div>

              {/* Milestone Details Banner */}
              <div
                className={`flex-1 p-4 border-l-4 rounded-lg shadow-sm ${
                  status === "Completed"
                    ? "border-green-600 bg-green-100"
                    : status === "Current"
                    ? "border-yellow-600 bg-yellow-100"
                    : "border-blue-600 bg-blue-100"
                }`}
              >
                <h2 className="text-xl font-semibold">{milestone.milestone}</h2>
                <p className="text-gray-700">{milestone.description}</p>
                <p className="font-bold text-sm mt-2">
                  {status === "Completed" && (
                    <span className="text-green-700">✔ Completed</span>
                  )}
                  {status === "Current" && (
                    <span className="text-yellow-700">⏳ Current Milestone</span>
                  )}
                  {status === "Upcoming" && (
                    <span className="text-blue-700">🔜 Upcoming</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Milestones;
