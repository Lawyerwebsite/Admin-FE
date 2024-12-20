import React from "react";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-600">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, Tailwind CSS!</h1>
        <p className="text-gray-600">
          This is a simple React app styled with Tailwind CSS.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Click Me
        </button>
      </div>
    </div>
  );
};

export default App;
