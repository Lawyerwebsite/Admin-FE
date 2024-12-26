import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Filters from "./Filters";
import CaseTable from "./CaseTable";
import CaseForm from "./CaseForm";
import { jsPDF } from "jspdf";

const getAllAppointments = async (setCases) => {
  const authToken = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:7000/appointment/get", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    toast.success(res.data.Message);
    const appointments = res.data.allAppointments;
    const allAppointments = appointments.filter(
      (appointment) => appointment.status === "Ongoing" || appointment.status === "Resolved"
    );
    setCases(allAppointments);
  } catch (err) {
    toast.error(err.response?.data?.Message || "Failed to fetch appointments");
  }
};

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({ status: "", client: "", startDate: "" });
  const [showForm, setShowForm] = useState(false);
  const [editCase, setEditCase] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredCases = cases.filter((c) => {
    return (
      (!filters.status || c.status === filters.status) &&
      (!filters.client || c.name.toLowerCase().includes(filters.client.toLowerCase())) &&
      (!filters.startDate || c.startDate === filters.startDate)
    );
  });

  const exportCasesToPDF = () => {
    const doc = new jsPDF();
    doc.text("Case Management Report", 10, 10);
    let y = 20;
    filteredCases.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.title} (${c.status})`, 10, y);
      y += 10;
    });
    doc.save("cases_report.pdf");
  };

  const handleSaveCase = async (caseData) => {
    if (editCase) {
      try {
        await axios.put(
          `http://localhost:7000/appointment/updatefile/?_id=${editCase._id}`,
          caseData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        toast.success("Case updated successfully");
      } catch (err) {
        toast.error("Failed to update case");
      }
    } else {
      setCases([...cases, caseData]);
      toast.success("Case added successfully");
    }
    setShowForm(false);
    setEditCase(null);
  };

  useEffect(() => {
    getAllAppointments(setCases);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-300">
      <h2 className="text-2xl font-bold mb-6">Case Management</h2>
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={exportCasesToPDF}
        onAddNew={() => setShowForm(true)}
      />
      {showForm && (
        <CaseForm
          caseData={editCase}
          onSave={handleSaveCase}
          onCancel={() => {
            setShowForm(false);
            setEditCase(null);
          }}
        />
      )}
      <CaseTable cases={filteredCases} onEdit={setEditCase} />
    </div>
  );
};

export default CaseManagement;
