import React from "react";
import { FaCalendarCheck, FaUsers, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import Greeting from "./Greeting";

function DashCards() {
  const cards = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "4.63%",
      increase: true,
      icon: <FaCalendarCheck className="text-blue-500 text-4xl" />,
    },
    {
      title: "Pending Appointments",
      value: "5",
      change: "2.63%",
      increase: false,
      icon: <FaClipboardList className="text-orange-500 text-4xl" />,
    },
    {
      title: "Total Clients",
      value: "50",
      change: "2.63%",
      increase: false,
      icon: <FaUsers className="text-green-500 text-4xl" />,
    },
    {
      title: "Total Income",
      value: "50000",
      change: "4.63%",
      increase: true,
      icon: <FaMoneyBillWave className="text-purple-500 text-4xl" />,
    },
  ];

  return (
    <div className="p-6">
      <div className="w-full">
        <Greeting />
        <br />
      </div>

      <h1 className="text-3xl font-bold font-poppins mb-6 text-center">Dashboard Overview</h1>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-center w-[250px] h-[210px] border-l-4"
            style={{
              borderColor: card.increase ? "blue" : "red",
            }}
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-gray-600 text-lg font-poppins font-semibold text-center mb-2">
              {card.title}
            </h2>
            <p className="text-2xl font-bold text-center mb-2">{card.value}</p>
            <p
              className={`text-sm ${
                card.increase ? "text-green-500" : "text-red-500"
              }`}
            >
              {card.increase ? "↑" : "↓"} {card.change} vs. last week
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashCards;
