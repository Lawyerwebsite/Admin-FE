import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import axios from "axios";




const getAllAppointments = async (setAppointments) => {
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  try {
    const res = await axios.get("http://localhost:7000/appointment/get", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    toast.success(res.data.Message);
    const appointments = res.data.allAppointments;
    const allAppointments = appointments.filter(
      (appointment) =>
        appointment.status == "Ongoing" || appointment.status == "Resolved"
    );
    setAppointments(allAppointments);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  }
};

const CaseManagementComp = () => {
  const [cases, setCases] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    client: "",
    startDate: "",
  });

  const [newCase, setNewCase] = useState({
    // title: "",
    // client: "",
    // lawyer: "",
    // status: "Ongoing",
    // startDate: new Date().toISOString().split('T')[0],
    // endDateDate: new Date().toISOString().split('T')[0],
  });

  const [showAddCaseForm, setShowAddCaseForm] = useState(false);
  const [editCase, setEditCase] = useState(null);
  const [sortedCases, setSortedCases] = useState(cases);
  const [viewCase, setViewCase] = useState(null);

 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

 
  useEffect(() => {
    let filteredCases = cases;

    if (filters.status) {
      filteredCases = filteredCases.filter((c) => c.status === filters.status);
    }
    if (filters.client) {
      filteredCases = filteredCases.filter((c) => c.client.toLowerCase().includes(filters.client.toLowerCase()));
    }
    if (filters.startDate) {
      filteredCases = filteredCases.filter(
        (c) => c.startDate === filters.startDate
      );
    }

    setSortedCases(filteredCases);
  }, [filters, cases]);

  
  const addNewCase = () => {
    if (!newCase.title || !newCase.client) {
      alert("Please fill in all required fields.");
      return;
    }

    const newCaseObject = {
      id: cases.length + 1,
      title: newCase.title,
      client: newCase.client,
      lawyer: newCase.lawyer,
      status: newCase.status,
      startDate: newCase.startDate,
      emdDate: newCase.endDateDate,
    };

    setCases([...cases, newCaseObject]);
    setShowAddCaseForm(false); 
    setNewCase({
      id: "",
      title: "",
      client: "",
      status: "Ongoing",
      startDate: new Date().toISOString().split('T')[0],
    }); // Reset the form data
  };
  const exportCasesToPDF = () => {
    const doc = new jsPDF();
  
    
    doc.setFontSize(16);
    doc.text("Case Management Report", 14, 10);
    doc.setFontSize(12);
    let yPosition = 20;

    // Adding Table Header
    doc.text("Case Title", 14, yPosition);
    doc.text("Start Date", 230, yPosition);
    doc.text("Client", 60, yPosition);
    doc.text("Status", 180, yPosition);
    
    yPosition += 10;

    // Adding case data
    sortedCases.forEach((caseItem) => {
      doc.text(caseItem.title, 14, yPosition);
      doc.text(caseItem.client, 60, yPosition);
      doc.text(caseItem.status, 180, yPosition);
      doc.text(caseItem.startDate, 230, yPosition);
      doc.text(caseItem.endDate, 230, yPosition);
      yPosition += 10;
    });
    doc.save("cases_report.pdf");
  };
  

  // Show Edit Case form
  const handleEditCase = (caseItem) => {
    setEditCase(caseItem);
    setShowAddCaseForm(true);
  };


  // const handleViewCase = (caseItem) => {
    // setViewCase(caseItem);
   

  // };

  const handleSaveEditedCase = async () => {
    const _id = editCase._id;
    const authToken = localStorage.getItem("token");
    try {
      await axios
        .put(
          `http://localhost:7000/appointment/updatefile/?_id=${_id}`,
          editCase,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res) => {
          toast.success(res.data.Message);
          toast.error(res.data.Error);
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (err) {
      console.log(err.message);

      toast.error(err.response?.data?.Message);
    }
    setShowAddCaseForm(false);
    setEditCase(null);
  };

  useEffect(() => {
    getAllAppointments(setCases);
  }, []);

  return (
    <div className="container mx-auto px-4 min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
        Case Management
      </h2>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <select
          name="status"
          onChange={handleFilterChange}
          className="p-2 border border-black rounded shadow-sm w-full sm:w-auto"
        >
          <option value="">Filter by Status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Resolved">Resolved</option>
        </select>
        <input
          name="client"
          type="text"
          placeholder="Filter by Client"
          onChange={handleFilterChange}
          className="p-2 border border-black rounded shadow-sm w-full sm:w-auto"
        />
        <input
          name="startDate"
          type="date"
          onChange={handleFilterChange}
          className="p-2 border border-black rounded shadow-sm w-full sm:w-auto"
        />
        <button
          onClick={exportCasesToPDF}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow-sm w-full sm:w-auto"
        >
          Export Cases (PDF)
        </button>
        <button
          onClick={() => setShowAddCaseForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm w-full sm:w-auto"
        >
          + Add New Case
        </button>
      </div>

      {/* Add/Edit Case Form */}
      {showAddCaseForm && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
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
              className="p-2 border border-black rounded shadow-sm w-full"
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
            <input
              type="text"
              value={editCase ? editCase.email : newCase.email}
              onChange={(e) =>
                editCase
                  ? setEditCase({ ...editCase, email: e.target.value })
                  : setNewCase({ ...newCase, email: e.target.value })
              }
              placeholder="Email"
              className="p-2 border border-black rounded shadow-sm w-full"
            />
            <input
              type="text"
              value={editCase ? editCase.number : newCase.number}
              onChange={(e) =>
                editCase
                  ? setEditCase({ ...editCase, number: e.target.value })
                  : setNewCase({ ...newCase, number: e.target.value })
              }
              placeholder="Number"
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
              className="p-2 border border-black rounded shadow-sm w-full"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
            <input
              type="date"
              value={editCase ? editCase.startDate : newCase.startDate}
              onChange={(e) =>
                editCase
                  ? setEditCase({ ...editCase, startDate: e.target.value })
                  : setNewCase({ ...newCase, startDate: e.target.value })
              }
              className="p-2 border border-black rounded shadow-sm w-full"
            />
            <div className="flex flex-wrap gap-4">
              <button
                onClick={editCase ? handleSaveEditedCase : addNewCase}
                className="bg-green-500 text-white px-4 py-2 rounded shadow-sm w-full sm:w-auto"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddCaseForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-sm w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Case Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 text-lg p-4">ID</th>
              <th className="border border-gray-300 text-lg p-4">Client</th>
              <th className="border border-gray-300 text-lg p-4">Email</th>
              <th className="border border-gray-300 text-lg p-4">Number</th>
              <th className="border border-gray-300 text-lg p-4">Title</th>
              <th className="border border-gray-300 text-lg p-4">Status</th>
              <th className="border border-gray-300 text-lg p-4">Start Date</th>
              <th className="border border-gray-300 text-lg p-4">End Date</th>
              <th className="border border-gray-300 text-lg p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCases.map((caseItem, index) => {
              const timestamp = caseItem.startDate;
              const date = new Date(timestamp);
              const startDate = date.toISOString().split("T")[0];
              return (
                <tr key={caseItem.id}>
                  <td className="border border-gray-300 text-lg p-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.name}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.email}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.number}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.title}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.status}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {startDate}
                  </td>
                  <td className="border border-gray-300 text-lg p-2">
                    {caseItem.endDate}
                  </td>
                  <td className="border border-gray-300 text-lg p-2 flex gap-4">
                    <button
                      onClick={() => handleEditCase(caseItem)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    {/* <button
                      onClick={() => handleViewCase(caseItem)}
                      className="text-green-500"
                    >
                      View
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
       
        
      </div>
      
    </div>
  );
};

export default CaseManagementComp;
