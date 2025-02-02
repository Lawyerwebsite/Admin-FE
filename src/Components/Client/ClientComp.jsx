import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const getAllAppointments = async (setClients, setLoading) => {
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  setLoading(true);
  try {
    const res = await axios.get("http://localhost:7000/appointment/gets", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    setClients(res.data.allAppointments);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  } finally {
    setLoading(false);
  }
};

const ClientComp = () => {
  const [clients, setClients] = useState([]);
 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;


  useEffect(() => {
    getAllAppointments(setClients, setLoading);
  }, []);

  // Filtered clients based on search query
  const filteredClients = useMemo(
    () =>
      clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [clients, searchQuery]
  );
 


  // Paginated clients
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-300 p-2">
      <div className="w-full h-[80%] bg-white shadow-lg rounded-lg md:p-6 xl:p-4 mt-1">
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
        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300">
  <thead>
    <tr className="bg-black text-white text-sm md:text-lg xl:text-xl">
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">S.no</th>
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">Name</th>
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">Email</th>
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">Phone</th>
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">Address</th>
      <th className="px-2 py-2 md:px-4 md:py-3 border border-gray-300">Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedClients.length === 0 ? (
      <tr>
        <td
          colSpan="6"
          className="px-2 py-3 md:px-4 md:py-4 text-center text-gray-900 text-sm md:text-lg xl:text-xl"
        >
          No clients found.
        </td>
      </tr>
    ) : (
      paginatedClients.map((client, index) => (
        <tr
          key={client._id}
          className="border-t hover:bg-gray-300 transition duration-400"
        >
          <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border border-gray-300">
            {startIndex + index + 1}
          </td>
          <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border border-gray-300">
            {client.name}
          </td>
          <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border border-gray-300">
            {client.email}
          </td>
          <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border border-gray-300">
            {client.number}
          </td>
          <td className="px-2 py-2 md:px-4 md:py-3 text-sm md:text-lg xl:text-xl text-gray-900 border border-gray-300">
            {client.address}
          </td>
          <td className="px-2 py-2 md:px-4 md:py-3 flex justify-center border border-gray-300">
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
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ol className="flex gap-2 text-sm font-medium">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-white text-gray-900"
                } border`}
              >
                Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500"
                    : "bg-white text-gray-900"
                } border`}
              >
                Next
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ClientComp;
