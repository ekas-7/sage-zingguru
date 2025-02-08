import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

const CalendarComponent = ({ date, setDate }) => {
  const handleCalendar = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 transition-all hover:shadow-2xl 
      backdrop-blur-md bg-opacity-80 dark:bg-opacity-60 border border-gray-200 dark:border-gray-700">
      
      {/* Calendar Header */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Mark your date
      </h2>

      {/* Calendar Wrapper */}
      
        <Calendar
          onChange={handleCalendar}
          value={date}
          className="w-full border-none rounded-3xl"
        />
     

      {/* Selected Date Display */}
      <p className="mt-4 text-center font-semibold text-gray-700 dark:text-gray-300">
        Selected Date: <span className="text-blue-500">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default CalendarComponent;
