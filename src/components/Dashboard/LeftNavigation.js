import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Accordion, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { imagePath } from "../../ImagePath";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";

const LeftNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const image = localStorage.getItem("userPhoto");

  const imageUrl = `${imagePath}${image.split("webapps/")[1]}`;

  const user = localStorage.getItem("userType");
  const fisrtName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    if (
      location.pathname.includes("/dashboard/userRegisteration") ||
      location.pathname.includes("/dashboard/assignSaathi") ||
      location.pathname.includes("/dashboard/myAccount")
    ) {
      setActiveAccordion("0"); // Open the first accordion
    } else if (
      location.pathname.includes("/dashboard/createPackage") ||
      location.pathname.includes("/dashboard/createServices") ||
      location.pathname.includes("/dashboard/servicesList") ||
      location.pathname.includes("/dashboard/packages")
    ) {
      setActiveAccordion("1"); // Open the second accordion
    } else if (
      location.pathname.includes("/dashboard/subscriberRegisteration") ||
      location.pathname.includes("/dashboard/patronDetails") ||
      location.pathname.includes("/dashboard/list")
    ) {
      setActiveAccordion("3"); // Open the second accordion
    } else {
      setActiveAccordion(null); // Close all accordions if no match
    }
  }, [location.pathname]);

  const handleAccordionToggle = (key) => {
    setActiveAccordion((prevKey) => (prevKey === key ? null : key));
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="leftbar">
      <Navbar
        className="leftside"
        collapseOnSelect
        expand="lg"
        style={{ position: "fixed", top: 0, width: "16%" }}
      >
        <Container className="d-flex flex-column">
          <div href="/" className="brandMobile text-center">
            Saathi
          </div>

          {user === "Saathi" && (
            <>
              <div className="text-center mt-3">
                <img
                  src={image}
                  alt="Saathi Profile"
                  className="profile-img" // Apply custom class
                />
                <div className="d-flex">
                  <div>
                    {" "}
                    <span className="mt-2 fw-bold">
                      {fisrtName} {lastName}
                    </span>
                  </div>
                  {/* <div><span style={{color:"green",height :"6px"}}><StarIcon/></span></div> */}
                </div>
                <Box display="flex" justifyContent="center" alignItems="center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      style={{ color: "green", fontSize: 14 }} // Adjust fontSize as needed
                    />
                  ))}
                </Box>
              </div>
            </>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{ width: "100%" }}>
            <Nav className="me-auto flex-column  leftNavbar">
              {user === "Admin" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className={`nav-link ${
                      location.pathname === "/dashboard"
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    <HomeIcon className="me-2" />
                    <span>Home</span>
                  </Nav.Link>

                  <Accordion activeKey={activeAccordion} flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className="accordion-head"
                        onClick={() => handleAccordionToggle("0")}
                      >
                        <Nav.Link as="div" className="nav-link">
                          <ManageAccountsIcon className="me-2" />
                          <span>Manage Accounts</span>
                        </Nav.Link>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/userRegisteration"
                          className={`nav-link ${
                            location.pathname === "/dashboard/userRegisteration"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("0")} // Ensure the accordion remains open
                        >
                          User Registration
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/assignSaathi"
                          className={`nav-link ${
                            location.pathname === "/dashboard/assignSaathi"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("0")} // Keep the accordion open
                        >
                          Assign a Saathi
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/myAccount"
                          className={`nav-link ${
                            location.pathname === "/dashboard/myAccount"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("0")} // Keep it open
                        >
                          Manage Users
                        </Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion activeKey={activeAccordion} flush>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header
                        className="accordion-head"
                        onClick={() => handleAccordionToggle("1")}
                      >
                        <Nav.Link as="div" className="nav-link">
                          <ManageAccountsIcon className="me-2" />
                          <span>Packages & Services</span>
                        </Nav.Link>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/createPackage"
                          className={`nav-link ${
                            location.pathname === "/dashboard/createPackage"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          Add New Package
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/createServices"
                          className={`nav-link ${
                            location.pathname === "/dashboard/createServices"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          Add New Service
                        </Nav.Link>

                        <Nav.Link
                          as={Link}
                          to="/dashboard/servicesList"
                          className={`nav-link ${
                            location.pathname === "/dashboard/serviceList"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          List of Services
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/packages"
                          className={`nav-link ${
                            location.pathname === "/dashboard/packages"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          List of Packages
                        </Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Nav.Link
                    as={Link}
                    to="/dashboard/subscribers"
                    className={`nav-link ${
                      location.pathname === "/dashboard/subscribers"
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    <PeopleIcon className="me-2" /> Subscribers
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/dashboard/saathis"
                    className={`nav-link ${
                      location.pathname === "/dashboard/saathis"
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    <PeopleIcon className="me-2" /> Saathis
                  </Nav.Link>

                  <Nav.Link onClick={handleLogout} className="nav-link">
                    <LogoutIcon className="me-2" /> Logout
                  </Nav.Link>
                </>
              )}

              {user === "Saathi" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className={`nav-link ${
                      location.pathname === "/dashboard"
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    <HomeIcon className="me-2" />
                    <span>Home</span>
                  </Nav.Link>

                  <Accordion activeKey={activeAccordion} flush>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header
                        className="accordion-head"
                        onClick={() => handleAccordionToggle("3")}
                      >
                        <Nav.Link as="div" className="nav-link">
                          <ManageAccountsIcon className="me-2" />
                          <span>Manage Accounts</span>
                        </Nav.Link>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/subscriberRegisteration"
                          className={`nav-link ${
                            location.pathname ===
                            "/dashboard/subscriberRegisteration"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("3")} // Keep the accordion open
                        >
                          Subscriber Activation
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/patronDetails"
                          className={`nav-link ${
                            location.pathname === "/dashboard/patronDetails"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("3")} // Keep it open
                        >
                          Patron Registration
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/list"
                          className={`nav-link ${
                            location.pathname === "/dashboard/list"
                              ? "active-nav-link"
                              : ""
                          }`}
                          onClick={() => setActiveAccordion("3")} // Keep it open
                        >
                          Manage Subscribers
                        </Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion activeKey={activeAccordion} flush>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header
                        className="accordion-head"
                        onClick={() => handleAccordionToggle("1")}
                      >
                        <Nav.Link as="div" className="nav-link">
                          <ManageAccountsIcon className="me-2" />
                          <span>Packages & Services</span>
                        </Nav.Link>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/servicesList"
                          className={`nav-link ${
                            location.pathname === "/dashboard/servicesList"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          List of Services
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/dashboard/packages"
                          className={`nav-link ${
                            location.pathname === "/dashboard/packages"
                              ? "active-nav-link"
                              : ""
                          }`}
                        >
                          List of Packages
                        </Nav.Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Nav.Link
                    as={Link}
                    to="/dashboard/serviceTaskList"
                    className={`nav-link ${
                      location.pathname === "/dashboard/serviceTaskList"
                        ? "active-nav-link"
                        : ""
                    }`}
                  >
                    <ManageAccountsIcon className="me-2" />
                    Services
                  </Nav.Link>

                  <Nav.Link onClick={handleLogout} className="nav-link">
                    <LogoutIcon className="me-2" /> Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </div>
  );
};

export default LeftNavigation;
