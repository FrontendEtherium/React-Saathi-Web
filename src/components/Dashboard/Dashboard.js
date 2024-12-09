import React from "react";
import LeftNavigation from "./LeftNavigation";
import TopBar from "./TopBar";
import DashboardLandingPage from "./DashboardLandingPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import CreateSaathi from "./CreateSaathi";
import List from "./List";
import MyAccount from "./MyAccount";
import ManageUsers from "./ManageUsers";
import PatronDetails from "./PatronDetails";
import AssignSaathi from "./AssignSaathi";
import SubscribersList from "./SubscribersList";
import SaathiList from "./SaathiList";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation(); // Get the current location

  const user = localStorage.getItem("userType");

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="d-flex">
      <LeftNavigation />
      <div className="flex-grow-1">
        <TopBar />
        <div className="content">
          {/* Outlet will render the nested dashboard routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
