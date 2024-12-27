import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";

const getAllAppointments = async (setAppointments) => {
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  try {
    const res = await axios.get("http://localhost:7000/appointment/get",
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    toast.success(res.data.Message);
    setAppointments(res.data.allAppointments);
  } catch (err) {
    console.error(err);
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
    date: null,
    time: "",
    discribe: "",
    category: "", // Added category to the state
  });


  const handleConfirm = async (id) => {
    const today = new Date();

    const todaysDate = today.toISOString().split('T')[0];

    try {
      const status = { status: "Ongoing", startDate: todaysDate };
      await axios.put(
        `http://localhost:7000/appointment/updatestatus/?_id=${id}`,
        status,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      // toast.success("Appointment confirmed successfully");
      getAllAppointments(setAppointments);
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to confirm appointment");
    }
  };

  const handleReschedule = async (_id, newDate, newTime) => {
    try {
      const newData = { startDate: newDate, time: newTime };
      await axios.put(
        `http://localhost:7000/appointment/reschedule/?_id=${_id}`,
        newData,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      setRescheduleData(null);
      getAllAppointments(setAppointments);
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to reschedule appointment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/appointment/add", newAppointment,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      setShowAddModal(false);
      getAllAppointments(setAppointments);
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to add appointment");
    }
  };

  useEffect(() => {
    getAllAppointments(setAppointments);
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen font-sans">
      <h1 className="text-4xl font-bold  mb-8 text-black">
        Appointment Management
      </h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xl px-6 py-3 rounded mb-6 transition-all shadow-lg"
      >
        <FaPlus className="text-2xl" /> Add Appointment
      </button>

      <div className="grid grid-cols-1 border-gray-400 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => {
          const timestamp = appointment.date;
          const date = new Date(timestamp);
          const formattedDate = date.toISOString().split('T')[0];

          return (
            <div
              key={appointment._id}
              className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">{appointment.name}</h2>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Email:</span> {appointment.email}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Number:</span> {appointment.number}
                </p>
              </div>
              <div className="text-sm text-gray-600 mt-4">
                <p>
                  <span className="font-semibold">Date:</span> {formattedDate}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {appointment.time}
                </p>
                <p>
                  <span className="font-semibold">Category:</span> {appointment.category}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {appointment.address}
                </p>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${appointment.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  Status: {appointment.status}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                {appointment.status === "pending" && (
                  <button
                    onClick={() => handleConfirm(appointment._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-all"
                  >
                    Confirm
                  </button>
                )}
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
              </div>
            </div>
          );

        })}
      </div>


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

              {/* Added Law Category Dropdown */}
              <label className="block text-gray-700 font-medium">Law Category</label>
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
              <div>

              </div>
            </form>
          </div>
        </div>
      )}

      {rescheduleData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleReschedule(
                  rescheduleData._id,
                  rescheduleData.newDate,
                  rescheduleData.newTime
                );
              }}
              className="flex flex-col gap-4"
            >
              <DatePicker
                selected={rescheduleData.newDate || null}
                onChange={(date) =>
                  setRescheduleData({ ...rescheduleData, newDate: date })
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

              {/* Optionally allow category to be rescheduled */}
              <input
                type="text"
                value={rescheduleData.current.category}
                onChange={(e) =>
                  setRescheduleData({
                    ...rescheduleData,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
                className="border rounded p-2"
                required
              />

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
