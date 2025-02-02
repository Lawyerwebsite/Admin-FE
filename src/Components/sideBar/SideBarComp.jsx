import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import Logo from "../assets/Logo.png";

const menuData = [
  { title: "Dashboard", icon: <FiHome />, route: "/home" },
  { title: "Cases", icon: <FiBriefcase />, route: "/cases" },
  { title: "Clients", icon: <FiUsers />, route: "/clients" },
  { title: "Appointments", icon: <FiCalendar />, route: "/appointments" },
  { title: "Documents", icon: <FiFileText />, route: "/documents" },
  { title: "Billing", icon: <FiDollarSign />, route: "/billing" },
  { title: "Profile", icon: <FiUser />, route: "/profile/f149f59e-1f75-49d3-9e41-dbe36ff72e6e" },
  { title: "Logout", icon: <FiLogOut />, route: "/" },
];

const SideBarComp = ({ isSidebarOpen, onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Header for Mobile */}
      <div className="md:hidden bg-white shadow-md fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-3">
        <img src={Logo} alt="Law Link Logo" className="h-10 w-14" />
        <button
          onClick={toggleMenu}
          className="text-black text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed top-14 left-0 w-full z-20">
          <ul className="p-4 space-y-2">
            {menuData.map((menu, index) => (
              <li key={index}>
                <NavLink
                  to={menu.route}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-black text-white font-bold shadow-md"
                        : "hover:bg-gray-200 hover:text-black text-black"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  <span className="text-xl">{menu.icon}</span>
                  <span className="ml-4 text-xl font-bold">{menu.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <div
        className={`fixed inset-y-0 left-0 text-black shadow-lg w-64 z-20 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64`}
      >
        <nav className="h-full flex flex-col mt-5">
          <div className="bg-white flex items-center justify-center p-4">
            <img src={Logo} alt="Law Link Logo" className="h-20 w-28" />
          </div>

          <ul className="p-4 space-y-2">
            {menuData.map((menu, index) => (
              <li key={index}>
                <NavLink
                  to={menu.route}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-black text-white font-bold shadow-md"
                        : "hover:bg-gray-200 hover:text-black text-black"
                    }`
                  }
                >
                  <span className="text-xl">{menu.icon}</span>
                  <span className="ml-4 text-xl font-bold">{menu.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={onToggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBarComp;
