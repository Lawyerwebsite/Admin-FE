import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // Define available pages
  const pages = [
    { name: "Client", path: "/clients"},
    { name: "Appointment", path: "/appointments"},
    { name: "Cases", path: "/cases" },
  ];

  // Filter pages based on search input
  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredPages.length === 1) {
      navigate(filteredPages[0].path);
    } else {
      alert("Please refine your search to match a specific page.");
    }
  };

  return (
    <div className="w-full md:w-[100%] px-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search pages (e.g., Client, Appointment, Cases)"
          className="w-full border border-gray-500 rounded-lg px-4 py-2 text-lg bg-gray-100 placeholder:text-gray-400 "
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FiSearch className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 sm:absolut "></FiSearch>
      </form>

      {searchInput && (
        <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page.path}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(page.path)}
              >
                {page.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No pages found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;