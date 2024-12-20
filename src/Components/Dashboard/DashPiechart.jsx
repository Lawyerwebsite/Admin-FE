import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Data for the Pie Chart
const data = [
  { name: "Clients", value: 60 }, // 60% of total
  { name: "Resolved", value: 25 }, // 25% of total
  { name: "Ongoing", value: 15 }, // 15% of total
];

// Colors for each slice
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Custom label rendering for the Pie Chart
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm sm:text-base"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Main Component
export default class ClientStatusChart extends PureComponent {
  render() {
    return (
      <div className="">
        {/* Responsive Pie Chart Section */}
        <div className="mr-7 h-[450px] ml-7 p-6 rounded-lg shadow-sm bg-white shadow-gray-400 border-t">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700  ">
            Client Status Overview
          </h2>
          <div className=" sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    );
  }
}
