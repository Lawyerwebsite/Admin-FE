import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const getAllAppointments = async (setClients, setLoading) => {
  const authToken = localStorage.getItem("token");
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
    <div className="flex justify-center w-full min-h-screen bg-gray-300 p-4">
      <div className="w-full  bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Client Management
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase border-r border-gray-700">
                    S.no
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase border-r border-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase border-r border-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase border-r border-gray-700">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase border-r border-gray-700">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-6 text-center text-gray-700 text-lg"
                    >
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  paginatedClients.map((client, index) => (
                    <tr
                      key={client._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-3 text-md text-gray-700 border-r border-gray-200">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-3 text-md text-gray-700 border-r border-gray-200">
                        {client.name}
                      </td>
                      <td className="px-4 py-3 text-md text-gray-700 border-r border-gray-200">
                        {client.email}
                      </td>
                      <td className="px-4 py-3 text-md text-gray-700 border-r border-gray-200">
                        {client.number}
                      </td>
                      <td className="px-4 py-3 text-md text-gray-700 border-r border-gray-200">
                        {client.address}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link to={`/viewclient/${client._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
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
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ClientComp;