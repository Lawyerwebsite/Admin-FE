import ClientComp from "../Components/Client/ClientComp";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";


const ClientPages = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBarComp />

        <div className="flex flex-col w-full h-screen bg-gray-300">
          <AdminNav />

          <div className="overflow-y-auto bg-gray-300 p-4">
            <ClientComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPages;
