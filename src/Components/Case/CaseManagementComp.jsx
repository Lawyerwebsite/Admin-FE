import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEdit, FaFilter, FaPlus, FaSearch, FaCalendarAlt } from "react-icons/fa";


const getAllAppointments = async (setAppointments) => {
  const authToken = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:7000/appointment/gets", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    toast.success(res.data.Message);
    const appointments = res.data.allAppointments;
    const allAppointments = appointments.filter(
      (appointment) =>
        appointment.status === "Ongoing" || appointment.status === "Resolved"
    );
    setAppointments(allAppointments);
  } catch (err) {
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  }
};

const CaseManagementComp = () => {
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    name: "",
    startDate: "",
  });
  const [newCase, setNewCase] = useState({
    title: "",
    client: "",
    lawyer: "",
    status: "Ongoing",
    startDate: new Date().toISOString().split("T")[0],
  });
  const [showAddCaseForm, setShowAddCaseForm] = useState(false);
  const [editCase, setEditCase] = useState(null);
  const [sortedCases, setSortedCases] = useState(cases);
  const [isLoading, setIsLoading] = useState(true);

 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  useEffect(() => {
    let filteredCases = [...cases];
    if (filters.status) {
      filteredCases = filteredCases.filter((c) => c.status === filters.status);
    }
    if (filters.name) {
      filteredCases = filteredCases.filter((c) =>
        c.name?.toString().toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.startDate) {
      filteredCases = filteredCases.filter((c) => c.startDate === filters.startDate);
    }
    setSortedCases(filteredCases);
  }, [filters, cases]);


  useEffect(() => {
    getAllAppointments(setCases).then(() => setIsLoading(false));
  }, []);


  const handleEditCase = (caseItem) => {
    setEditCase(caseItem);
    setShowAddCaseForm(true);
  };


  const handleSaveEditedCase = async () => {
    const _id = editCase._id;
    const authToken = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:7000/appointment/updatefile/?_id=${_id}`,
        editCase,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success(res.data.Messag);
     
      setCases((prevCases) =>
        prevCases.map((c) => (c._id === _id ? { ...c, ...editCase } : c))
      );
      setShowAddCaseForm(false);
      setEditCase(null);
    } catch (err) {
      toast.error(err.response?.data?.Message || "Failed to update case");
    }
  };

  const addNewCase = () => {
    if (!newCase.title || !newCase.client) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newCaseObject = {
      ...newCase,
      id: cases.length + 1,
    };

    setCases([...cases, newCaseObject]);
    setShowAddCaseForm(false);
    setNewCase({
      title: "",
      client: "",
      lawyer: "",
      status: "Ongoing",
      startDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="container mx-auto px-4 min-h-screen bg-gray-50 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b border-gray-200 pb-4">
        Case Management
      </h2>

      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              name="status"
              onChange={handleFilterChange}
              className="w-full bg-transparent focus:outline-none"
            >
              <option value="">Filter by Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              name="name"
              type="text"
              placeholder="Filter by Client"
              onChange={handleFilterChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input
              name="startDate"
              type="date"
              onChange={handleFilterChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

     
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left border-r">ID</th>
              <th className="p-4 text-left border-r">Client</th>
              <th className="p-4 text-left border-r">Email</th>
              <th className="p-4 text-left border-r">Number</th>
              <th className="p-4 text-left border-r">Title</th>
              <th className="p-4 text-left border-r">Status</th>
              <th className="p-4 text-left border-r">Start Date</th>
              <th className="p-4 text-left border-r">End Date</th>
              <th className="p-4 text-left border-r">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : sortedCases.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  No cases found.
                </td>
              </tr>
            ) : (
              sortedCases.map((caseItem, index) => {
                const startDate = new Date(caseItem.startDate).toISOString().split("T")[0];
                return (
                  <tr key={caseItem.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b border-gray-200 border-r">{index + 1}</td>
                    <td className="p-4 border-b border-gray-200 border-r">{caseItem.name}</td>
                    <td className="p-4 border-b border-gray-200 border-r">{caseItem.email}</td>
                    <td className="p-4 border-b border-gray-200 border-r">{caseItem.number}</td>
                    <td className="p-4 border-b border-gray-200 border-r">{caseItem.title}</td>
                    <td className="p-4 border-b border-gray-200 border-r">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          caseItem.status === "Ongoing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-200 border-r">{startDate}</td>
                    <td className="p-4 border-b border-gray-200 border-r">{caseItem.endDate}</td>
                    <td className="p-4 border-b border-gray-200 border-r">
                      <button
                        onClick={() => handleEditCase(caseItem)}
                        className="text-blue-500 flex justify-center items-center hover:text-blue-700 p-1"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Action Button */}
      {/* <button
        onClick={() => setShowAddCaseForm(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
      >
        <FaPlus />
      </button> */}

     
      {showAddCaseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editCase ? "Edit Case" : "Add New Case"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editCase ? editCase.title : newCase.title}
                onChange={(e) =>
                  editCase
                    ? setEditCase({ ...editCase, title: e.target.value })
                    : setNewCase({ ...newCase, title: e.target.value })
                }
                placeholder="Case Title"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              <input
              type="text"
              value={editCase ? editCase.name : newCase.name}
              onChange={(e) =>
                editCase
                  ? setEditCase({ ...editCase, client: e.target.value })
                  : setNewCase({ ...newCase, client: e.target.value })
              }
              placeholder="Client Name"
              className="p-2 border border-black rounded shadow-sm w-full"
            />
              <select
                name="status"
                value={editCase ? editCase.status : newCase.status}
                onChange={(e) =>
                  editCase
                    ? setEditCase({ ...editCase, status: e.target.value })
                    : setNewCase({ ...newCase, status: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Resolved">Resolved</option>
              </select>
              <input
                type="date"
                value={editCase ? editCase.endDate : newCase.endDate}
                onChange={(e) =>
                  editCase
                    ? setEditCase({ ...editCase, endDate: e.target.value })
                    : setNewCase({ ...newCase, startDate: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={editCase ? handleSaveEditedCase : addNewCase}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddCaseForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagementComp;