import React from "react";
import BookShell from "./BookShell";
import Center from "./Center";
import Calendar from "./Calendar";
import Checklist from "./Checklist";

function MainStudio() {
  return (
    <div className="border rounded-lg p-4 h-full grid grid-cols-6 grid-rows-6 gap-4">
      
      {/* Left Sidebar - BookShell (Spans Full Height) */}
      <div className="col-span-1 row-span-6 bg-gray-200 p-4">
        <BookShell />
      </div>

      {/* Center Content - Center (Spans Full Height) */}
      <div className="col-span-4 row-span-6 bg-gray-100 p-4">
        <Center />
      </div>

      {/* Right Sidebar - Checklist (Upper Part) */}
      <div className="col-span-1 row-span-4 bg-gray-300 p-4">
        <Checklist />
      </div>

      {/* Right Sidebar - Calendar (Below Checklist) */}
      <div className="col-span-1 row-span-2 bg-gray-400 p-4">
        <Calendar />
      </div>

    </div>
  );
}

export default MainStudio;
