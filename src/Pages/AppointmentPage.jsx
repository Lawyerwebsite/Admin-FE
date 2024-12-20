import AppointmentManagement from "../Components/Appointments/AppointmentAmin";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const AppointmentPage = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBarComp />

        <div className="flex flex-col w-full h-screen">
          <AdminNav />

          <div className="flex-1 overflow-y-auto bg-gray-300 p-4">
            <AppointmentManagement />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
