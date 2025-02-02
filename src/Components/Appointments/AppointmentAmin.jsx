import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus } from "react-icons/fa";

const getAllAppointments = async (setAppointments) => {
  const authToken = localStorage.getItem("token");

  try {
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
  }
};

function AppointmentManagement() {
  const authToken = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
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

  // Confirm appointment
  const handleConfirm = async (id) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const status = { status: "Ongoing", startDate: today };
      await axios.put(
        `http://localhost:7000/appointment/updatestatus/?_id=${id}`,
        status,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success("Appointment confirmed successfully");
      getAllAppointments(setAppointments); // Refresh appointments list
    } catch (err) {
      toast.error(
        err.response?.data?.Message || "Failed to confirm appointment"
      );
    }
  };

  // Reschedule appointment
  const handleReschedule = async (_id, newDate, newTime) => {
    try {
      const newData = { startDate: newDate, time: newTime };
      await axios.put(
        `http://localhost:7000/appointment/reschedule/?_id=${_id}`,
        newData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      // Update the appointments state directly
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === _id
            ? { ...appointment, startDate: newDate, time: newTime }
            : appointment
        )
      );

      setRescheduleData(null); // Close the reschedule modal
      toast.success("Appointment rescheduled successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.Message || "Failed to reschedule appointment"
      );
    }
  };

  // Add new appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:7000/appointment/add",
        newAppointment,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setShowAddModal(false);
      getAllAppointments(setAppointments); // Refresh appointments list
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to add appointment");
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    getAllAppointments(setAppointments);
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen font-sans bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-black">
          Appointment Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xl px-4 py-3 rounded shadow-lg"
        >
          <FaPlus className="text-xl" /> Add Appointment
        </button>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 border border-gray-300 text-left">
                S.No
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Phone
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Start Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Time
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Category
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Address
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => {
              const formattedDate = appointment.date
                ? new Date(appointment.date).toISOString().split("T")[0]
                : "";
              const formattedStartDate = appointment.startDate
                ? new Date(appointment.startDate).toISOString().split("T")[0]
                : "";

              return (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.number}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {formattedDate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {formattedStartDate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.time}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {appointment.address}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
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
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <div className="flex justify-center flex-col gap-3">
                      {appointment.status === "pending" && (
                        <button
                          onClick={() => handleConfirm(appointment._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      {appointment.status === "Resolved" ? (
                        <span>Completed</span>
                      ) : (
                        <button
                          onClick={() =>
                            setRescheduleData({
                              _id: appointment._id,
                              current: appointment,
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-all"
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

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
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
                className="border rounded p-2"
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
                className="border rounded p-2"
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
                className="border rounded p-2"
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
                className="border rounded p-2"
                required
              />
              <DatePicker
                selected={newAppointment.date}
                onChange={(date) =>
                  setNewAppointment({ ...newAppointment, date })
                }
                placeholderText="Select Date"
                className="border rounded p-2"
                required
              />
              <select
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                className="border rounded p-2"
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
                className="border rounded p-2"
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
                className="border rounded p-2"
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

      {/* Reschedule Modal */}
      {rescheduleData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
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
                    startDate: date.toISOString().split("T")[0], // Ensure consistency
                  })
                }
                placeholderText="Select New Date"
                className="border rounded p-2"
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
                className="border rounded p-2"
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
