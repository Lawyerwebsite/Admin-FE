import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const getAllAppointments = async (setClients) => {
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  try {
    const res = await axios.get("http://localhost:7000/appointment/get", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    // toast.success(res.data.Message);
    setClients(res.data.allAppointments);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  }
};

const ClientComp = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllAppointments(setClients);
  }, []);

  // Filter clients by name
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-300 p-4">
      <div className="w-full h-[80%]  bg-white shadow-lg rounded-lg p-4 md:p-6 xl:p-8 mt-6">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold mb-6 text-center text-gray-800">
          Client Management
        </h1>

        {/* Search Input */}
        <div className="mb-4 md:mb-6">
          <input
            type="text"
            className="w-full px-3 py-2 md:px-4 md:py-3 text-base md:text-lg xl:text-xl border shadow-sm rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse ">
            {/* Table Head */}
            <thead>
              <tr className="bg-black  text-white text-sm md:text-lg xl:text-xl row-span-3">
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">S.no</th>
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">Name</th>
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">Email</th>
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">Phone</th>
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">Address</th>
                <th className="px-2 py-2 md:px-4 md:py-3 border  row-span-3">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-2 py-3 md:px-4 md:py-4 text-center text-gray-900 text-sm md:text-lg xl:text-xl"
                  >
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr
                    key={client._id}
                    className="border-t hover:bg-gray-300 transition duration-400"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border ">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border ">
                      {client.name}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border ">
                      {client.email}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border ">
                      {client.number}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border ">
                      {client.address}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 flex justify-center border ">
                      <Link to={`/viewclient/${client._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition duration-300">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientComp;
