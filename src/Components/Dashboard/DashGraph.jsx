import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HomeLawyerRevenueChart = () => {
  // State to track the selected interval
  const [timeInterval, setTimeInterval] = useState("Year");

  // Data for different intervals
  const allData = {
    Year: [
      { name: "Jan", revenue: 20000 },
      { name: "Feb", revenue: 25000 },
      { name: "March", revenue: 28000 },
      { name: "April", revenue: 30000 },
      { name: "May", revenue: 35000 },
      { name: "June", revenue: 45000 },
      { name: "July", revenue: 50000 },
      { name: "Aug", revenue: 55000 },
      { name: "Sept", revenue: 60000 },
      { name: "Oct", revenue: 65000 },
      { name: "Nov", revenue: 70000 },
      { name: "Dec", revenue: 75000 },
    ],
    Month: [
      { name: "Week 1", revenue: 12000 },
      { name: "Week 2", revenue: 15000 },
      { name: "Week 3", revenue: 18000 },
      { name: "Week 4", revenue: 20000 },
    ],
    Week: [
      { name: "Mon", revenue: 3000 },
      { name: "Tue", revenue: 4000 },
      { name: "Wed", revenue: 3500 },
      { name: "Thu", revenue: 4500 },
      { name: "Fri", revenue: 5000 },
      { name: "Sat", revenue: 4000 },
      { name: "Sun", revenue: 3800 },
    ],
  };

  // Determine which data to display
  const chartData = allData[timeInterval];

  return (
    <div className=" w-full h-[450px] ml-6 bg-white max-sm:h-[350px] p-10 max-sm:pb-16 pb-16 max-sm:p-2 shadow-sm shadow-gray-400 border-t rounded-lg">
      {/* Chart Title and Dropdown */}
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-bold text-gray-800">
          {`Revenue (${timeInterval})`}
        </h2>
        <div>
          <select
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Week">Week</option>
          </select>
        </div>
      </div>

      {/* Responsive Bar Chart */}
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#413ea0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeLawyerRevenueChart;
