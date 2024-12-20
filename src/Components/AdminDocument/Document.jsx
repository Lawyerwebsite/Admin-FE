import React, { useState } from "react";

const DocumentsAdmin = () => {
  const [documents, setDocuments] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocuments((prevDocs) => [
        ...prevDocs,
        { id: Date.now(), name: file.name, size: file.size, url: fileURL },
      ]);
    }
  };

  const handleDelete = (id) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-6 h-[60%] max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Admin Documents </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload a Document
        </label>
        <input
          type="file"
          onChange={handleUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Size (KB)
            </th>
            <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-t border-gray-200">
              <td className="py-2 px-4 text-sm text-gray-700">{doc.name}</td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {(doc.size / 1024).toFixed(2)}
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                >
                  Preview
                </a>
                <a
                  href={doc.url}
                  download={doc.name}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                >
                  Download
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsAdmin;
