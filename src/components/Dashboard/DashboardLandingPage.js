import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardAdminHome from "./DashboardAdminHome";
import DashboardSaathiHome from "./DashboardSaathiHome";

const DashboardLandingPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (!storedUserType) {
      navigate("/"); // Redirect to login if userType is not found
    } else {
      setUserType(storedUserType);
    }
  }, [navigate]);

  if (!userType) {
    // Return null or a loading spinner until the userType is loaded
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userType === "Admin" && <DashboardAdminHome />}
      {userType === "Saathi" && <DashboardSaathiHome />}
    </div>
  );
};

export default DashboardLandingPage;
