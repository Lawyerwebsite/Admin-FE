import DocumentsAdmin from "../Components/AdminDocument/Document";
import { AdminNav } from "../Components/header/Navbar";
import SideBarComp from "../Components/sideBar/SideBarComp";

const DocumentsPage = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideBarComp />
        <div className="flex flex-col w-full h-screen">
          <AdminNav />
          <div className="flex-2 min-h-screen shadow-md shadow-slate-500 overflow-y-auto "> 
            <DocumentsAdmin />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsPage;
