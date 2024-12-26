

import React, { useState } from "react";


const CaseList = ({ cases }) => {
  const [viewCase, setViewCase] = useState(null); // State to track the selected case

  const handleViewCase = (caseItem) => {
    setViewCase(caseItem); // Update state with the selected case
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Case List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Case Title</th>
            <th className="border border-gray-300 px-4 py-2">Client</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{caseItem.title}</td>
              <td className="border border-gray-300 px-4 py-2">{caseItem.client}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleViewCase(caseItem)}
                  className="text-green-500 underline hover:text-green-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the ViewCaseCard component if viewCase is not null */}
      {viewCase && (
        <ViewCaseCard
          caseData={viewCase}
          onClose={() => setViewCase(null)} // Pass the close handler
        />
      )}
    </div>
  );
};

export default CaseList;  

