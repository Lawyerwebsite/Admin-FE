import ClientComp from "../Components/Client/ClientComp";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const ClientPages = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBarComp />

      {/* Main Content */}
      {/* <div className=" w-full flex flex-col"> */}
        {/* Navbar */}
        {/* <AdminNav /> */}

        {/* Page Content */}
        <div className=" flex-1 overflow-y-auto bg-gray-300 p-10 ">
          <ClientComp />
        </div>
      </div>
    // </div>
  );
};

export default ClientPages;
