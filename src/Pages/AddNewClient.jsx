import React, { useState } from "react";
import ReactDOM from "react-dom";

export const formData = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedCases: [],
    newCase: "",
  });

  const [clientList, setClientList] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCase = () => {
    if (!formData.newCase.trim()) {
      setErrors({ ...errors, newCase: "Case cannot be empty." });
      return;
    }
    if (formData.linkedCases.includes(formData.newCase.trim())) {
      setErrors({ ...errors, newCase: "Duplicate cases are not allowed." });
      return;
    }
    setErrors({ ...errors, newCase: "" });
    setFormData({
      ...formData,
      linkedCases: [...formData.linkedCases, formData.newCase.trim()],
      newCase: "",
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be a 10-digit number.";
    }
    if (!formData.address.trim()) errors.address = "Address is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccessMessage("Client added successfully!");
      setClientList([...clientList, formData]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        linkedCases: [],
        newCase: "",
      });
    }
  };

  const handleDeleteClient = (index) => {
    setClientList(clientList.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Add New Client
        </h1>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
          
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

         
          <div className="mb-4">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Linked Cases
            </label>
            <input
              type="text"
              name="newCase"
              value={formData.newCase}
              onChange={handleChange}
              placeholder="Add linked case"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCase}
              className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              Add Case
            </button>
            {errors.newCase && <p className="text-red-500 text-sm mt-1">{errors.newCase}</p>}

            <ul className="list-disc pl-6 mt-2">
              {formData.linkedCases.map((caseTitle, index) => (
                <li key={index} className="text-gray-800 dark:text-gray-200">
                  {caseTitle}
                </li>
              ))}
            </ul>
          </div>

         
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg"
          >
            Add Client
          </button>
        </form>

        {clientList.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Client List
            </h2>
            <ul>
              {clientList.map((client, index) => (
                <li
                  key={index}
                  className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
                >
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email: {client.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Phone: {client.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Address: {client.address}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Linked Cases: {client.linkedCases.join(", ") || "None"}
                  </p>
                  <button
                    onClick={() => handleDeleteClient(index)}
                    className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Delete Client
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<formData />, document.getElementById("root"));
