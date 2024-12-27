import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

import Logo from "../assets/logo.jpg";

const menuData = [
  { title: "Dashboard", icon: <FiHome />, route: "/home" },
  { title: "Cases", icon: <FiBriefcase />, route: "/cases" },
  { title: "Clients", icon: <FiUsers />, route: "/clients" },
  { title: "Appointments", icon: <FiCalendar />, route: "/appointments" },
  { title: "Documents", icon: <FiFileText />, route: "/documents" },
  { title: "Billing", icon: <FiDollarSign />, route: "/billing" },
];

const SideBarComp = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 bg-white
           shadow-lg border-r border-gray-200 
        w-64 z-20 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64`}
      >
        <nav className="h-full flex flex-col mt-5">
          <div className="bg-white flex items-center justify-center">
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
                        ? "bg-blue-500 text-white font-bold shadow-md"
                        : "hover:bg-blue-100 hover:text-blue-500 text-gray-700"
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
