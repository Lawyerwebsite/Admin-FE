import ClientComp from "../Components/Client/ClientComp";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const ClientPages = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <SideBarComp />

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Navbar */}
        <AdminNav />

        {/* Page Content */}
        <div className="flex-grow overflow-y-auto bg-gray-300 ">
          <ClientComp />
        </div>
      </div>
    </div>
  );
};

export default ClientPages;
