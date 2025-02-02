import React, { useState, useEffect } from "react";
import { FaCalendarCheck, FaUsers, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import Greeting from "./Greeting";
import axios from "axios";

function DashCards() {
  const [cardsData, setCardsData] = useState([
    { title: "Total Appointments", value: 0, icon: <FaCalendarCheck className="text-blue-500 text-4xl" /> },
    { title: "Pending Appointments", value: 0, icon: <FaClipboardList className="text-orange-500 text-4xl" /> },
    { title: "Total Clients", value: 0, icon: <FaUsers className="text-green-500 text-4xl" /> },
    { title: "Total Income", value: 0, icon: <FaMoneyBillWave className="text-purple-500 text-4xl" /> },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/admin/dash", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const { 
          totalAppointments, 
          pendingAppointments, 
          totalClients, 
          totalIncome 
        } = response.data;

        setCardsData([
          { 
            title: "Total Appointments",
            value: totalAppointments,
            icon: <FaCalendarCheck className="text-blue-500 text-4xl" />
          },
          { 
            title: "Pending Appointments",
            value: pendingAppointments,
            icon: <FaClipboardList className="text-orange-500 text-4xl" />
          },
          { 
            title: "Total Clients",
            value: totalClients,
            icon: <FaUsers className="text-green-500 text-4xl" />
          },
          { 
            title: "Total Income",
            value: `$${totalIncome.toFixed(2)}`,
            icon: <FaMoneyBillWave className="text-purple-500 text-4xl" />
          }
        ]);

      } catch (err) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="w-full">
        <Greeting />
        <br />
      </div>

      <h1 className="text-3xl font-bold font-poppins mb-6 text-center">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-lg font-semibold mb-2">
                  {card.title}
                </h2>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
              <div>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashCards;