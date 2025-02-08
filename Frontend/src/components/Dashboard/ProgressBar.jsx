import { useState, useEffect } from "react";
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

  // Track window size for responsive bar width
  const [barSize, setBarSize] = useState(window.innerWidth < 600 ? 30 : 50);

  useEffect(() => {
    const handleResize = () => {
      setBarSize(window.innerWidth < 600 ? 30 : 50);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 shadow-lg rounded-xl bg-[#FEFCE8] dark:bg-gray-900 dark:text-white transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Daily Study Hours</h1>
        <button className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer">
          <Calendar />
        </button>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#ADFF00" tick={{ fill: "#4B5563", fontSize: 12 }} />
            <YAxis stroke="#ADFF00" tick={{ fill: "#4B5563", fontSize: 12 }} />
            <Tooltip
              wrapperStyle={{
                backgroundColor: "#FEFC68",
                borderRadius: "10px",
                padding: "5px",
                color: "#374151",
              }}
              contentStyle={{ fontSize: "12px" }}
            />
            <Bar dataKey="hours" fill="#ADFF00" barSize={barSize} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressBar;
