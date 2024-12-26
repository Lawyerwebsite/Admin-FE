import React, { useState, useEffect } from "react";


const isAdmin = () => true; 
const Slot = () => {
  const [slots, setSlots] = useState([
    { id: 1, time: "9:00 AM - 10:00 AM", type: "part-time", isAvailable: true, date: "2024-12-24" },
    { id: 2, time: "10:00 AM - 11:00 AM", type: "full-time", isAvailable: false, date: "2024-12-24" },
    { id: 3, time: "11:00 AM - 12:00 PM", type: "part-time", isAvailable: true, date: "2024-12-24" },
  ]);

  const [filter, setFilter] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]); // Today's date
  const [newSlot, setNewSlot] = useState({ time: "", type: "part-time", date: currentDate });

  // Utility to convert time string to a Date object
  const parseTime = (timeString, date) => {
    const [start, end] = timeString.split(" - ");
    const [startHour, startMinute, startPeriod] = start.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
    const hour = startPeriod === "PM" && startHour !== "12" ? parseInt(startHour, 10) + 12 : parseInt(startHour, 10);
    return new Date(`${date}T${hour}:${startMinute}:00`);
  };

  // Check slot availability based on current time
  const checkTimeAndMarkSlots = () => {
    const now = new Date();
    setSlots((prevSlots) =>
      prevSlots.map((slot) => {
        const slotEndTime = parseTime(slot.time, slot.date);
        if (slot.date === currentDate && slotEndTime <= now) {
          return { ...slot, isAvailable: false }; // Mark slot as unavailable if time is over
        }
        return slot;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(checkTimeAndMarkSlots, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slots, currentDate]);

  const filteredSlots = slots.filter(
    (slot) => (!filter || slot.type === filter) && slot.date === currentDate
  );

  const updateSlotAvailability = (id) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
  };

  const handleSlotCreation = () => {
    if (!newSlot.time || !newSlot.date) {
      alert("Please fill out all fields before adding a slot.");
      return;
    }
    setSlots((prevSlots) => [
      ...prevSlots,
      {
        id: prevSlots.length + 1,
        time: newSlot.time,
        type: newSlot.type,
        isAvailable: true,
        date: newSlot.date,
      },
    ]);
    setNewSlot({ time: "", type: "part-time", date: currentDate });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Manage Slots</h1>
          <p className="text-gray-600">Slots automatically update after time is over.</p>
        </header>

        {/* Slot Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create a New Slot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              className="px-4 py-2 border rounded-lg"
              placeholder="Enter Time (e.g., 9:00 AM - 10:00 AM)"
              value={newSlot.time}
              onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
            />
            <select
              className="px-4 py-2 border rounded-lg"
              value={newSlot.type}
              onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value })}
            >
              <option value="part-time">Part-Time</option>
              <option value="full-time">Full-Time</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border rounded-lg"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]} // Prevent past date selection
            />
          </div>
          <button
            className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={handleSlotCreation}
          >
            Add Slot
          </button>
        </div>

        {/* Date Selector */}
        <div className="text-center mb-6">
          <label className="font-semibold text-gray-700 mr-2">Select Date:</label>
          <input
            type="date"
            className="px-4 py-2 border rounded-lg"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Prevent past date selection
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 mx-2 rounded-lg font-semibold text-white transition ${
              filter === "part-time"
                ? "bg-blue-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setFilter("part-time")}
          >
            Part-Time
          </button>
          <button
            className={`px-6 py-2 mx-2 rounded-lg font-semibold text-white transition ${
              filter === "full-time"
                ? "bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => setFilter("full-time")}
          >
            Full-Time
          </button>
          <button
            className={`px-6 py-2 mx-2 rounded-lg font-semibold text-white transition ${
              filter === "" ? "bg-gray-600" : "bg-gray-500 hover:bg-gray-600"
            }`}
            onClick={() => setFilter("")}
          >
            Clear Filter
          </button>
        </div>

        {/* Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-gray-800">{slot.time}</p>
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${
                    slot.type === "part-time"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {slot.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Availability:</strong>{" "}
                {slot.isAvailable ? "Available" : "Not Available"}
              </p>
              <button
                className={`w-full py-2 rounded-lg font-bold text-white transition ${
                  slot.isAvailable
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!slot.isAvailable}
                onClick={() => updateSlotAvailability(slot.id)}
              >
                {slot.isAvailable ? "Mark as Unavailable" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>

        {/* No Slots Message */}
        {filteredSlots.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg">No slots available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slot;
