import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const initialState = [
  {
    image: null,
  },
];

const token = localStorage.getItem("token");

export const AdminNav = ({ onSidebarToggle }) => {
  const [file, setFile] = useState(null);
    const [getFormData, setGetFormData] = useState(initialState);
    
    
  
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const adminId = localStorage.getItem("adminId");
  const profileOptions = [
    { title: "Profile Settings", path: `/profile/${adminId}` },
    { title: "Logout", action: handleLogout },
  ];

  
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/lawyerprofile/?_id=${adminId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        console.log(response);

        setGetFormData(response.data);
        console.log("get res data====>", response.data.lawyers);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [adminId]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="w-full mx-auto px-4 flex items-center justify-between h-20">
        <button
          aria-label="Toggle Sidebar"
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={onSidebarToggle}
        >
          <FiMenu size={24} />
        </button>

        <div className="w-full md:w-[60%] px-4 ">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search clients, cases, or documents"
              className="w-full  border rounded-lg px-4 py-2 text-lg  bg-gray-100 placeholder:text-gray-400 focus:ring focus:ring-indigo-200 focus:outline-none"
              aria-label="Search"
            />
            <FiSearch className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 " />
          </div> */}
          <SearchBar/>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <FiBell size={24} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              <img
                src={`http://localhost:7000/upload/${getFormData.fileName}`}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block">Admin</span>
              <FiChevronDown />
            </button>
            {profileMenuOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48">
                {profileOptions.map((item, idx) => (
                  <li key={idx}>
                    {item.action ? (
                      <button
                        onClick={item.action}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </button>
                    ) : (
                      <a
                        href={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {item.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
