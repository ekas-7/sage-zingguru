import React, { useState } from "react";
import BookShell from "./BookShell";
import Center from "./Center";
import Calendar from "./Calendar";
import Checklist from "./Checklist";
import FocusTimer from "./FocusTimer";
import VideosURLs from '../../assets/VideosURL.json';

function MainStudio() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="relative overflow-hidden">
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full grid grid-cols-11 grid-rows-6 gap-6 dark:bg-gray-800 ">
        {/* Bookshelf Section */}
        
        <div className="col-span-3 row-span-3 bg-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl">
          <BookShell />
        </div>

        {/* Center Section */}
        <div className="col-span-5 row-span-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-lg overflow-hidden">
          <Center playlist={VideosURLs} />
        </div>

        {/* Timer Section */}
        <div className="col-span-3 row-span-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl relative overflow-hidden group">
          {/* Accent decoration */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
          <Checklist />
        </div>


        {/* Right Column Sections */}
        <div className="col-span-3 row-span-3 bg-gradient-to-br dark:bg-gray-900 flex justify-center items-center  rounded-3xl shadow-lg transition-all hover:shadow-xl">
          <FocusTimer />
        </div>

        <div className="col-span-3 row-span-3 bg-gradient-to-br flex justify-center items-center dark:bg-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl">
          <Calendar date={date} setDate={setDate} />
        </div>

        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 dark:via-gray-900/0 dark:to-gray-900/10 pointer-events-none" />
      </div>
    </div>
  );
}

export default MainStudio;