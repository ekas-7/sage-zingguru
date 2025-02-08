import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles

function MyCalendar({date,setDate}) {
  const handleCalendar = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="p-4 h-full bg-white shadow rounded-lg">
      <Calendar onChange={handleCalendar} value={date} />
      <p className="mt-2 text-center font-medium">Selected Date: {date.toDateString()}</p>
    </div>
  );
}

export default MyCalendar;
