// import { Sidebar } from "react-feather"
import axios from "axios";
import { toast } from "react-toastify";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";





const AddClientPages = () => {
  return (
    <>
      <div className="flex ">
        <SideBarComp/>
        {/* <div className="w-full">
          <AdminNav/> */}
          <div>
           <FormData/>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default AddClientPages;
