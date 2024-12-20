import React, { useState } from "react";
import SideBarComp from "../sideBar/SideBarComp";
import { AdminNav } from "./AdminNav";

function SideNav() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AdminNav onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />
      <SideBarComp
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <main className="p-4 md:ml-64">
        <h1 className="text-3xl font-bold">Welcome </h1>
      </main>
    </>
  );
}

export default SideNav;
