import { AdminNav } from "../Components/header/Navbar";
import AdminProfileCard from "../Components/Profile/ProfileAdmin";
import SideBarComp from "../Components/sideBar/SideBarComp";

const ProfilePage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <SideBarComp />

      {/* Main Content */}
      <div className=" w-full flex flex-col">
        {/* Navbar */}
        <AdminNav />

        {/* Page Content */}
        <div className=" w-full flex-grow overflow-y-auto bg-gray-300 ">
            <AdminProfileCard/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;