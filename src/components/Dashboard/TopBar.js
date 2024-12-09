import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import avimg from "../../assets/images/download.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { imagePath } from "../../ImagePath";
import { Dropdown, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { baseUrl } from "../../ApiPath";
import axios from "axios";

const TopBar = () => {
  const [showModal, setShowModal] = useState(false);
  const[email,setEmail]=useState('')
  const[currentPswd,setCurrentPswd]=useState('')
  const[newPswd,setNewPswd]=useState('')
  const[alert,setAlert]=useState(false)
  const[confirmPswd,setConfirmPswd]=useState('')
  const [passwordError, setPasswordError] = useState(""); 
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();

  const image = localStorage.getItem("userPhoto");
  const firstName=localStorage.getItem('firstName')
  const lastName=localStorage.getItem('lastName')
  const Email=localStorage.getItem('email')

  const imageUrl = `${imagePath}${image.split("webapps/")[1]}`;
  const handleLogout = () => {
    // Clear the user session data from localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/");
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPswd(confirmPassword);

    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to check passwords after 500 milliseconds
    const newTimeout = setTimeout(() => {
      if (newPswd && confirmPassword && newPswd !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(""); // Clear the error if passwords match
      }
    }, 500); // Adjust the duration as needed

    setTypingTimeout(newTimeout); // Store the timeout ID
  };

  // Clear the timeout if the component unmounts
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .put(
        `${baseUrl}/admin-users/change-password`,{
          "email":Email,
          "oldPassword":currentPswd,
          "newPassword":newPswd
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Password changed successfully!!");
        }
        //   else if (response.data === 0) {
        //     setAlert('Company not created. Please check all fields and try again.');
        //   }
        else {
          setAlert("An error occurred.");
        }

        setTimeout(() => {
          setAlert("");
          navigate("/dashboard");
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 500) {
          setAlert("Some error occured. Please try again later");
        } else if (err.status == 400) {
          setAlert("Some error occured. Please try again later");
        } else {
          setAlert(err.response.data);
        }
        setTimeout(() => {
          setAlert("");
        }, 5000); // Hide alert after 3 seconds
      });
  };

  return (
    <div className="">
      <nav
        className="navbar topbar navbar-expand bg-body-light sticky-top"
        id="navbar"
        style={{ width: "100%", position: "sticky", top: "0", height: "69px" }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-end justify-content-right">
            <div>
              {" "}
              <button
                style={{ border: "none" }}
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvasLg"
                aria-controls="sidebarOffcanvasLg"
                aria-label="Toggle navigation"
              >
                <span style={{ fontSize: "18px" }}>S</span>
              </button>{" "}
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="navbarOffcanvasLg"
            aria-labelledby="navbarOffcanvasLgLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link className="navbar-brand" to="/">
                  I
                </Link>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto d-flex flex-row flex-sm-row ">
                <li className="nav-item search">
                  <form>
                    <div className="row">
                      <div
                        className="col-md-12 mt-1 ml-3"
                        style={{ width: "250px" }}
                      >
                        {/* 
                      <div className="search-bar-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
  <input
    type="text"
    className="form-control"
    placeholder="Search For..."
    aria-label="Search For..."
    style={{ borderRadius: '23px', padding: '5px',fontSize:"12px",marginTop:"2px" }} // Extra padding for the icon space
  />
  <span
    className="search-icon"
    style={{
      position: 'absolute',
      right: '10px',  // Position from the right side
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
      cursor: 'pointer',
    }}
  >
    <i className="bi bi-search"></i>
  </span>
</div> */}
                      </div>
                    </div>
                  </form>
                </li>
              </ul>
              <span className="nav-item ">
                <ul className="navbar-nav me-auto ">
                  <li className="nav-item" style={{ marginRight: "20px" }}>
                    <div>
                      <span
                        className="ms-2"
                        style={{ fontSize: "20px", color: "white" }}
                      >
                        <i className="bi bi-bell-fill"></i>
                      </span>
                    </div>
                  </li>
                  <li className="nav-item " style={{ marginRight: "20px" }}>
                    <div>
                      <span
                        className="ms-2"
                        style={{ fontSize: "20px", color: "white" }}
                      >
                        <i class="bi bi-envelope-fill"></i>
                      </span>
                    </div>
                  </li>

                  {/* <li className="nav-item " style={{ marginRight: "20px" }}>
                 
                 <div>
                    
                 <Avatar 
  src={image} 
  alt=''
  sx={{ 
    width: 34, 
    height: 34, 
    borderRadius: '50%' // Ensures the avatar is circular
  }} 
/>

                 

                   </div>
                 </li> */}

                  <li className="nav-item" style={{ marginRight: "20px" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        as="div"
                        className="p-0"
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          src={image}
                          alt=""
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%", // Ensures the avatar is circular
                          }}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item href=""><span className="fw-bold" style={{color:"#009efb"}}>{firstName} {lastName}</span></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleShow}>
                          Change Password
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        {/* Trigger modal */}
                        <Dropdown.Item onClick={ handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>

                  {/* <li className="nav-item" style={{ marginRight: "20px" }}>
  <div>
    <button
      className="btn btn-outline-light"
      onClick={handleLogout}
      
    >
      Logout
    </button>
  </div>
</li> */}
                </ul>



                {/* Modal for changing password */}
                <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* React Bootstrap Form */}
          <Form onSubmit={handleSubmit}> 

          {/* <Row className="">
              <Col  className="mb-2">
                <Form.Group controlId="email">
                  <Form.Label  className="label-style">Enter Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your Email"
                   style={{ padding: "8px", fontSize: "12px" }}
                   value={email}
                   onChange={(event) => setEmail(event.target.value)}
                   required />
                </Form.Group>
              </Col>
            </Row> */}
           
            <Row>
              <Col className="mb-2">
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label  className="label-style">Current Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter current password"
                    style={{ padding: "8px", fontSize: "12px" }}
                    value={currentPswd}
                    onChange={(event) => setCurrentPswd(event.target.value)}
                    required />
                </Form.Group>
              </Col>
             
            </Row>

            <Row>
              
              <Col  className="mb-2">
                <Form.Group controlId="formNewPassword">
                  <Form.Label className="label-style">New Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password"
                    style={{ padding: "8px", fontSize: "12px" }}
                    value={newPswd}
                    onChange={(event) => setNewPswd(event.target.value)}
                    required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
              <Col  className="mb-2">
                <Form.Group controlId="formNewPassword">
                  <Form.Label className="label-style">Confirm New Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password"
                    style={{ padding: "8px", fontSize: "12px" }}
                    value={confirmPswd}
                    onChange={handleConfirmPasswordChange}
                    required />
                </Form.Group>
              </Col>
            </Row>
            {passwordError && (
      <Alert variant="danger">
        {passwordError}
      </Alert>
    )}

     {/* Success Alert */}
     {alert && (
      <Alert variant="success" className="text-center">
        {alert}
      </Alert>
    )}
            
            <Button  type="submit" disabled={!!passwordError}
             variant="primary"
    
             style={{
              
               color: 'white',
               margin: "4px",
               fontSize: "12px"}}>
            Save 
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
         
        </Modal.Footer>
      </Modal>
    
  
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
