import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLandingPage from "./components/Dashboard/DashboardLandingPage";
import List from "./components/Dashboard/List";
import CreateSaathi from "./components/Dashboard/CreateSaathi";
import MyAccount from "./components/Dashboard/MyAccount";
import ManageUsers from "./components/Dashboard/ManageUsers";
import AssignSaathi from "./components/Dashboard/AssignSaathi";
import SubscribersList from "./components/Dashboard/SubscribersList";
import SaathiList from "./components/Dashboard/SaathiList";
import PatronDetails from "./components/Dashboard/PatronDetails";
import Login from "./components/login/Login";
import SaathiLandingPage from "./components/Dashboard/SaathiLandingPage";
import UpdateAdminUsers from "./components/Dashboard/UpdateAdminUsers";
import UpdateSubscriber from "./components/Dashboard/UpdateSubscriber";
import UpdateAdminSubscriber from "./components/Dashboard/UpdateAdminSubscriber";
import SubscriberRegisteration from "./components/Dashboard/SubscriberRegisteration";
import HomePage from "./components/LandingPage/HomePage";
import CreateService from "./components/Dashboard/CreateService";
import AllServices from "./components/Dashboard/AllServices";
import Packages from "./components/Dashboard/Packages";
import ViewAllPackages from "./components/Dashboard/ViewAllPackages";
import CreatePackageService from "./components/Dashboard/CreatePackageService";
import EditPackage from "./components/Dashboard/EditPackage";
import EditService from "./components/Dashboard/EditService";
import ServiceTaskList from "./components/Dashboard/ServiceTaskList";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
import Payment from "./components/LandingPage/components/payment/Payment";

import PaymentStatus from "./components/LandingPage/components/payment/PaymentStatus";
function App() {
  const location = useLocation();

  return (
    <div className="">
      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
    


        {/* Route for Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Dashboard layout route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardLandingPage />} />
          <Route path="list" element={<List />} />
          <Route path="createSaathi" element={<CreateSaathi />} />
          <Route path="myAccount" element={<MyAccount />} />
          <Route path="userRegisteration" element={<ManageUsers />} />
          <Route path="assignSaathi" element={<AssignSaathi />} />
          <Route path="subscribers" element={<SubscribersList />} />
          <Route path="saathis" element={<SaathiList />} />
          <Route path="UpdatePackage/:id" element={<EditPackage />} />
          <Route path="UpdateService/:id" element={<EditService />} />

          <Route path="serviceTaskList" element={<ServiceTaskList />} />
          <Route path="serviceTaskList/:id" element={<ServiceTaskList />} />
          <Route path="createServices" element={<CreateService />} />
          <Route
            path="createPackageServices"
            element={<CreatePackageService />}
          />
          <Route path="servicesList" element={<AllServices />} />
          <Route path="packages" element={<ViewAllPackages />} />
          <Route path="createPackage" element={<Packages />} />
          <Route path="patronDetails/:id?" element={<PatronDetails />} />
          <Route path="updateAdminUsers/:id" element={<UpdateAdminUsers />} />
          <Route path="updateSubscriber/:id" element={<UpdateSubscriber />} />
          <Route
            path="updateAdminSubscriber/:id"
            element={<UpdateAdminSubscriber />}
          />
          <Route
            path="subscriberRegisteration"
            element={<SubscriberRegisteration />}
          />
          <Route path="saathiDashboard" element={<SaathiLandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
