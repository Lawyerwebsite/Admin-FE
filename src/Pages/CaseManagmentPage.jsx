import CaseManagementComp from "../Components/Case/CaseManagementComp";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const CaseManagementPage = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBarComp />



        <div className="flex-1 overflow-y-auto bg-gray-200 p-4">
          <CaseManagementComp />
        </div>
      </div>

    </>
  );
};

export default CaseManagementPage;
