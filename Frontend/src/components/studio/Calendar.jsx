import React from "react";
import "react-calendar/dist/Calendar.css"; // Import default styles
import { Calendar } from "lucide-react";


const CalendarComponent = ({ date, setDate }) => {
  const handleCalendar = (selectedDate) => {
    setDate(selectedDate);
  };

  const WidgetContainer = ({ title, icon, children }) => (
    <div className="w-68 right-0 bg-[#FEFCE8] dark:bg-gray-800 shadow-lg p-4 rounded-3xl z-50 border border-[#ADFF00]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">{title}</h2>
        {icon}
      </div>
      {children}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 transition-all hover:shadow-2xl 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-60 border border-gray-200 dark:border-gray-700">

      {/* Calendar Header */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Mark your date
      </h2>

      {/* Calendar Wrapper */}

      <WidgetContainer title="Calendar" icon={<Calendar className="w-5 h-5 dark:text-white" />}>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center font-bold dark:text-white">
              {day}
            </div>
          ))}
          {Array(31).fill(null).map((_, i) => (
            <div key={i} className="text-center p-2 hover:bg-[#ADFF00] rounded-full cursor-pointer transition-colors dark:text-white">
              {i + 1}
            </div>
          ))}
        </div>
      </WidgetContainer>


      {/* Selected Date Display */}
      <p className="mt-4 text-center font-semibold text-gray-700 dark:text-gray-300">
        Selected Date: <span className="text-blue-500">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default CalendarComponent;
