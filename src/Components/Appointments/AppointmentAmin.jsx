import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaSpinner, FaSort, FaFilter } from "react-icons/fa";

const getAllAppointments = async (setAppointments, setIsLoading) => {
  const authToken = localStorage.getItem("token");

  try {
    setIsLoading(true); // Start loading
    const res = await axios.get("http://localhost:7000/appointment/gets", {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (res.data?.allAppointments) {
      setAppointments(res.data.allAppointments); // Set appointments data
      toast.success(res.data.Message);
    } else {
      setAppointments([]); // Set to empty array if no data
      toast.warning("No appointments found.");
    }
  } catch (err) {
    setAppointments([]); // Handle errors gracefully
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  } finally {
    setIsLoading(false); // Stop loading
  }
};

function AppointmentManagement() {
  const authToken = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [availableTimes] = useState([
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
  ]);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    date: "",
    time: "",
    discribe: "",
    category: "",
  });

 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

 
  const [filterStatus, setFilterStatus] = useState("all");
  const filteredAppointments = sortedAppointments.filter((appointment) => {
    if (filterStatus === "all") return appointment.status !== "Resolved";
    return appointment.status === filterStatus && appointment.status !== "Resolved";
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAppointments.slice(indexOfFirstRow, indexOfLastRow);

  // Row Selection
  const [selectedRows, setSelectedRows] = useState([]);
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Confirm multiple appointments
  const handleConfirmMultiple = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) =>
          axios.put(
            `http://localhost:7000/appointment/updatestatus/?_id=${id}`,
            { status: "Ongoing", startDate: new Date().toISOString().split("T")[0] },
            { headers: { Authorization: `Bearer ${authToken}` } }
          )
        )
      );
      toast.success("Selected appointments confirmed successfully");
      getAllAppointments(setAppointments, setIsLoading); // Refresh appointments list
      setSelectedRows([]); // Clear selection
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to confirm appointments");
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    getAllAppointments(setAppointments, setIsLoading);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen font-sans bg-gray-100">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          Appointment Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-xl px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-all"
        >
          <FaPlus className="text-sm sm:text-xl" /> Add Appointment
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="Ongoing">Ongoing</option>
        </select>
        <button
          onClick={() => requestSort("name")}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          <FaSort /> Sort by Name
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleConfirmMultiple}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm Selected
          </button>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow border-t-2">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left border-r border-gray-700 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === currentRows.length}
                    onChange={() => {
                      if (selectedRows.length === currentRows.length) {
                        setSelectedRows([]);
                      } else {
                        setSelectedRows(currentRows.map((row) => row._id));
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[120px]">
                  Name
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[150px]">
                  Email
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[120px]">
                  Phone
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[100px]">
                  Date
                </th>
                {/* <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[120px]">
                  Start Date
                </th> */}
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[100px]">
                  Time
                </th>
                {/* <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[120px]">
                  Category
                </th> */}
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[150px]">
                  Address
                </th>
                <th className="px-4 py-3 text-left border-r border-gray-700 min-w-[100px]">
                  Status
                </th>
                <th className="px-4 py-3 text-center border-r border-gray-700 min-w-[150px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((appointment, index) => {
                const formattedDate = appointment.date
                  ? new Date(appointment.date).toISOString().split("T")[0]
                  : "";
                const formattedStartDate = appointment.startDate
                  ? new Date(appointment.startDate).toISOString().split("T")[0]
                  : "";

                return (
                  <tr
                    key={appointment._id}
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-4 py-3 border-t border-gray-200 w-12 border-r">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(appointment._id)}
                        onChange={() => toggleRowSelection(appointment._id)}
                      />
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[120px]">
                      {appointment.name}
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[150px]">
                      {appointment.email}
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[120px]">
                      {appointment.number}
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[100px]">
                      {formattedDate}
                    </td>
                    {/* <td className="px-4 py-3 border-t border-gray-200 min-w-[120px]">
                      {formattedStartDate}
                    </td> */}
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[100px]">
                      {appointment.time}
                    </td>
                    {/* <td className="px-4 py-3 border-t border-gray-200 min-w-[120px]">
                      {appointment.category}
                    </td> */}
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[150px]">
                      {appointment.address}
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 min-w-[100px]">
                      <span
                        className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                          appointment.status === "pending"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-t border-r border-gray-200 text-center min-w-[150px]">
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => handleConfirm(appointment._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-sm hover:shadow-md transition-all"
                          >
                            Confirm
                          </button>
                        )}
                        {appointment.status !== "Resolved" && (
                          <button
                            onClick={() =>
                              setRescheduleData({
                                _id: appointment._id,
                                current: appointment,
                              })
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-sm hover:shadow-md transition-all"
                          >
                            Reschedule
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredAppointments.length / rowsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredAppointments.length / rowsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(filteredAppointments.length / rowsPerPage)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={newAppointment.name}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, name: e.target.value })
                }
                placeholder="Name"
                className="border rounded p-2 w-full"
                required
              />
              <input
                type="email"
                value={newAppointment.email}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="border rounded p-2 w-full"
                required
              />
              <input
                type="text"
                value={newAppointment.number}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    number: e.target.value,
                  })
                }
                placeholder="Phone"
                className="border rounded p-2 w-full"
                required
              />
              <input
                type="text"
                value={newAppointment.address}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    address: e.target.value,
                  })
                }
                placeholder="Address"
                className="border rounded p-2 w-full"
                required
              />
              <DatePicker
                selected={newAppointment.date}
                onChange={(date) =>
                  setNewAppointment({ ...newAppointment, date })
                }
                placeholderText="Select Date"
                className="border rounded p-2 w-full"
                required
              />
              <select
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                className="border rounded p-2 w-full"
                required
              >
                <option value="">Select Time</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <textarea
                value={newAppointment.discribe}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    discribe: e.target.value,
                  })
                }
                placeholder="Describe your issue"
                rows="4"
                className="border rounded p-2 w-full"
                required
              ></textarea>
              <select
                value={newAppointment.category}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    category: e.target.value,
                  })
                }
                className="border rounded p-2 w-full"
                required
              >
                <option value="">Select the Law Category</option>
                <option value="banking">Banking</option>
                <option value="civil">Civil</option>
                <option value="corporate">Corporate</option>
                <option value="criminal">Criminal</option>
                <option value="family">Family</option>
                <option value="immigration">Immigration</option>
                <option value="realestate">RealEstate</option>
                <option value="service">Service</option>
                <option value="others">Others</option>
              </select>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {rescheduleData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Reschedule Appointment
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleReschedule(
                  rescheduleData._id,
                  rescheduleData.startDate,
                  rescheduleData.newTime
                );
              }}
              className="flex flex-col gap-4"
            >
              <DatePicker
                selected={
                  rescheduleData.startDate
                    ? new Date(rescheduleData.startDate)
                    : null
                }
                onChange={(date) =>
                  setRescheduleData({
                    ...rescheduleData,
                    startDate: date.toISOString().split("T")[0],
                  })
                }
                placeholderText="Select New Date"
                className="border rounded p-2 w-full"
                required
              />
              <select
                value={rescheduleData.newTime || ""}
                onChange={(e) =>
                  setRescheduleData({
                    ...rescheduleData,
                    newTime: e.target.value,
                  })
                }
                className="border rounded p-2 w-full"
                required
              >
                <option value="">Select New Time</option>
                {availableTimes.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setRescheduleData(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentManagement;