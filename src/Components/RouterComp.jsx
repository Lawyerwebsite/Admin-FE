import React from "react";
import { Route, Routes } from "react-router-dom";

import SideBarComp from "./sideBar/SideBarComp";

import { AdminNav } from "./header/Navbar";
import Homepages from "../Pages/HomePage";
import AppointmentPage from "../Pages/AppointmentPage";
import CaseManagementPage from "../Pages/CaseManagmentPage";

import ClientPages from "../Pages/ClientPage";
import DocumentsPage from "../Pages/DocumentsPage";
import BillingPage from "../Pages/BillingPage"
import AddClientPages from "../Pages/AddClientPage";
import Login from "./Login/Login";


import ProtectedRoute from "./Protect/ProtectedRoute";
import PublicRoute from "./Protect/PublicRoute";

import ForgetPassword from "./Login/ForgetPassword";
import ChangePassword from "./Login/ChangePassword";
import AdminProfileCard from "./Profile/ProfileAdmin";
import ViewClientModal from "./Client/ViewClientComp";

const RouterComp = () => {
  return (
    <Routes>
      <Route path="/home" element={<Homepages />} />
      <Route path="/" element={<Login />} />
      <Route path="/side" element={<SideBarComp />} />
      <Route path="/nav" element={<AdminNav />} />
      <Route path="/appointments" element={<AppointmentPage />} />
      <Route path="/cases" element={<CaseManagementPage />} />
      <Route path="/clients" element={<ClientPages />} />
      <Route path="/clients/add" element={<AddClientPages />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/change" element={<ChangePassword />} />
      <Route path="/profile/:userId" element={<AdminProfileCard />} />
      <Route path="/viewclient/:_id" element={<ViewClientModal />} />
      
    </Routes>
  );
};

export default RouterComp;
