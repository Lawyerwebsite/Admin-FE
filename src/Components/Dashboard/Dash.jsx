import React from "react";
import Greeting from "./Greeting";

function DashCards() {
  const cards = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "4.63%",
      increase: true,
    },
    {
      title: "Pending Appointments",
      value: "5",
      change: "2.63%",
      increase: false,
    },
    { title: "Total Clients", value: "50", change: "2.63%", increase: false },
    { title: "Total Income", value: "50000", change: "4.63%", increase: true },
  ];

  return (
    <div className=" p-6">
      <div>
        <div className=" w-[5%]min-h-screen ">
          <Greeting />
        </div>
        <br />
      </div>
      <h1 className="text-3xl font-bold font-poppins mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {cards.map((cards, index) => (
          <div
            key={index}
            className="bg-white shadow-md shadow-gray-400 border-t rounded-lg p-4  border-r-4 "
            style={{
              borderColor: cards.increase ? "" : "",
            }}
          >
            <h2 className="text-gray-600 text-lg font-poppins font-semibold">
              {cards.title}
            </h2>
            <p className="text-2xl font-bold">{cards.value}</p>
            <p
              className={`text-sm ${
                cards.increase ? "text-green-500" : "text-red-500"
              }`}
            >
              {cards.increase ? "↑" : "↓"} {cards.change} vs. last week
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashCards;
