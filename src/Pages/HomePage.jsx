import { useState } from "react";
import DashCards from "../Components/Dashboard/Dash";
import HomeLawyerRevenueChart from "../Components/Dashboard/DashGraph";
import HomeLawyerAppointmentPieChart from "../Components/Dashboard/DashPiechart";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const Homepages = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <SideBarComp
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleSidebarToggle}
      />

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <DashCards />

          <div className="w-full grid grid-cols-2 max-xl:grid-cols-1 gap-5 mt-5">
            <HomeLawyerRevenueChart />
            <HomeLawyerAppointmentPieChart />
          </div>
        </div>
      </div>
    
  );
};

export default Homepages;
