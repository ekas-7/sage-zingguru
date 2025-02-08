import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles

const CalendarComponent = ({ date, setDate }) => {
  const handleCalendar = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4 transition-all hover:shadow-xl">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Calendar</h2>
      <div className="text-gray-600 dark:text-gray-300">
        <Calendar onChange={handleCalendar} value={date} />
        <p className="mt-2 text-center font-medium">Selected Date: {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
