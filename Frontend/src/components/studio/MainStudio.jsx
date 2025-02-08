import React, { useState } from "react";
import BookShell from "./BookShell";
import Center from "./Center";
import Calendar from "./Calendar";
import Checklist from "./Checklist";

import VideosURLs from '../../assets/VideosURL.json';

function MainStudio() {
  const [date,setDate] = useState(new Date());

  return (
    <div className="border rounded-lg p-4 h-full grid grid-cols-10 grid-rows-6 gap-4">
      
      <div className="col-span-3 row-span-6 bg-gray-200 p-4">
        <BookShell />
      </div>

      <div className="col-span-4 row-span-6 bg-gray-100">
        <Center playlist={VideosURLs}/>
      </div>

      <div className="col-span-3 row-span-3 bg-gray-300 p-4">
        <Checklist />
      </div>

      <div className="col-span-3 row-span-3 bg-gray-400 p-4">
        <Calendar date={date} setDate={setDate} />
      </div>

    </div>
  );
}

export default MainStudio;
