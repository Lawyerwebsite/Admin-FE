import Billing from "../Components/Billing/Billing";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const BillingPage = () => {
  return (
    <>
      <div className="flex h-screen">
      
        <SideBarComp />

    
        {/* <div className="flex flex-col w-full bg-gray-200">
        
          <div className="h-16 bg-white shadow-md">
            <AdminNav /> */}
          {/* </div> */}

         
          <div className="flex-1 overflow-y-auto p-4">
            <Billing />
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default BillingPage;
