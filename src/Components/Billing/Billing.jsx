import React, { useState } from "react";

const Billing = () => {
  const [invoices, setInvoices] = useState([
    { id: "INV001", client: "pavan", amount: 500, status: "Paid", date: "2024-12-01" },
    { id: "INV001", client: "hari", amount: 500, status: "Paid", date: "2024-12-06" },
    { id: "INV003", client: "kalam", amount: 500, status: "Paid", date: "2024-12-07" },
    { id: "INV001", client: "	kalpana", amount: 500, status: "Paid", date: "2024-12-08" },
    { id: "INV001", client: "	Sasi crazy", amount: 500, status: "Paid", date: "2024-12-09" },
 
  ]);

  const [filters, setFilters] = useState({ client: "", status: "" });

  // Handle filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesClient =
      filters.client === "" || invoice.client.toLowerCase().includes(filters.client.toLowerCase());
    const matchesStatus =
      filters.status === "" || invoice.status.toLowerCase() === filters.status.toLowerCase();
    return matchesClient && matchesStatus;
  });

  // Calculate totals
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalUnpaid = totalRevenue - totalPaid;

  return (
    <div className=" p-6 max-w-7xl m-16 mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Billing Page</h1>

      {/* Payment Status Overview */}
      <div className="mb-6 grid grid-cols-2  gap-44 ">
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-8  bg-blue-100 text-blue-800 rounded-lg">
          <h2 className="text-lg font-semibold">Paid</h2>
          <p className="text-xl font-bold">${totalPaid.toFixed(2)}</p>
        </div>
       
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by Client"
          value={filters.client}
          onChange={(e) => setFilters({ ...filters, client: e.target.value })}
          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      
      </div>

      {/* Invoices Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text- font-semibold ">Invoice ID</th>
            <th className="py-2 px-4 text-left text-sm font-semibold ">Client</th>
            <th className="py-2 px-4 text-right text-sm font-semibold ">Amount</th>
            <th className="py-2 px-4 text-center text-sm font-semibold ">Status</th>
            <th className="py-2 px-4 text-left text-sm font-semibold ">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id} className="border-t border-gray-200">
              <td className="py-2 px-4 text-sm text-gray-700">{invoice.id}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{invoice.client}</td>
              <td className="py-2 px-4 text-right text-sm text-gray-700">${invoice.amount.toFixed(2)}</td>
              <td
                className={`py-2 px-4 text-center text-sm ${
                  invoice.status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {invoice.status}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
