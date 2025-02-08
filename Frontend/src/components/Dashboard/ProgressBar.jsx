import { useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";
import { Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProgressBar = () => {
  const [data, setData] = useState([
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 1 },
    { day: "Sun", hours: 3 },
  ]);

  return (
    <div className="max-w-3xl p-6 shadow-lg rounded-xl bg-[#FEFCE8] dark:bg-gray-900 dark:text-white  transition-all">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Daily Study Hours</h1>
        <button className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer">
          <Calendar />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#ADFF00" tick={{ fill: "#4B5563" }} />
          <YAxis stroke="#ADFF00" tick={{ fill: "#4B5563" }} />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#FEFC68",
              borderRadius: "30px",
              color: "#374151",
            }}
          />
          <Bar
            dataKey="hours"
            fill="#ADFF00"
            barSize={50}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressBar;
