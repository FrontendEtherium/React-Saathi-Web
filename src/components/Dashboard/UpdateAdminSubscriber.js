import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../ApiPath";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UpdateAdminSubscriber = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [middle, setMiddle] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [selectedOption, setSelectedOption] = useState("Admin");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState();

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${baseUrl}/subscribers/${id}`).then((res) => {
          console.log(res.data);
          //   console.log(res.data[0].firstName)
          setFirst(res.data.firstName);
          setLast(res.data.lastName);
          setMob(res.data.contactNo);
          setEmail(res.data.email);
          setDob(res.data.dob);
          setBio(res.data.briefBio);
          setSelectedOption(res.data.userType);
          setPassword(res.data.password);
          setCountryCode(res.data.countryCode);
          setStatus(res.data.status);
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard/subscribers");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedNumber = `+${mob.slice(0, countryCode.length)}-${mob.slice(
      countryCode.length
    )}`;

    axios
      .put(`${baseUrl}/subscribers/${id}`, {
        firstName: first,
        lastName: last,
        email: email,
        contactNo: formattedNumber,
        countryCode: countryCode,
        status: status,
        updatedBy: parseInt(userId),
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("User updated successfully!!");
        }
        //   else if (response.data === 0) {
        //     setAlert('Company not created. Please check all fields and try again.');
        //   }
        else {
          setAlert("An error occurred. Please contact the development team.");
        }

        setTimeout(() => {
          setAlert("");
          navigate("/dashboard/subscribers");
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
    <div>
      <div>
        <div className="d-flex">
          <Container className="justify-content-center aligh-items-center mt-5 ml-5 px-5">
            <Card className="shadow-sm pb-3">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Update Subscriber Details</h4>
                  </div>
                </div>
                <hr />
                <div>
                  {/* Consolidated Form */}
                  <div style={{ position: "relative" }}>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder="First name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={first}
                            onChange={(event) => setFirst(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Last name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={last}
                            onChange={(event) => setLast(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Username
                          </Form.Label>
                          <Form.Control
                            placeholder="Email Address"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                          />
                        </Col>
                        {/* <Col className="p-3">
                                    <Row className="align-items-center">
                                    
                                            <Col xs="auto" lg={2}>
                                            <Form.Label className="label-style">Code</Form.Label>
                                                <Form.Select
                                                    style={{ padding: '8px', fontSize: '12px' }}
                                                    aria-label="Select Country Code"
                                                    value={countryCode}
                                                    onChange={(event) => setCountryCode(event.target.value)}
                                                    
                                                >
                                                    <option>+91</option>
                                                    <option value="+91">+91 (India)</option>
                                                    <option value="+44">+44 (UK)</option>
                                          
                                                </Form.Select>
                                            </Col>

                              
                                            <Col>
                                            <Form.Label className="label-style">Phone Number</Form.Label>
                                                <Form.Control
                                                    placeholder="Phone Number"
                                                    style={{ padding: '8px', fontSize: '12px' }}
                                                    value={mob}
                                                    onChange={(event) => setMob(event.target.value)}
                                                    required
                                                />
                                            </Col>
                                        </Row>

                                        
                                    </Col> */}
                        <Col xs="auto" className="p-3" lg={6}>
                          <Form.Label className="label-style">
                            Phone Number
                          </Form.Label>
                          <div className="w-100">
                            <PhoneInput
                              country={"in"}
                              value={mob}
                              onChange={(value, country) => {
                                setMob(value);
                                setCountryCode(country.dialCode);
                              }}
                              inputStyle={{ width: "100%" }} // Ensure full width
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* <Row>
                                   
                                    <Col className="p-3" md={6}>
                                    <Form.Label className="label-style">Select Status</Form.Label>
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={status}
                                            onChange={(event) => setStatus(event.target.value)} 
                                            required// Corrected setStatus
                                        >
                                           <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </Form.Select>
                                    </Col>
                                </Row> */}

                      <Row>
                        {/* <Col className="p-3">
                                        <Form.Control
                                        type="password"
                                            placeholder="Password"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </Col> */}
                        <Col className="p-3" md={6}></Col>
                      </Row>

                      {selectedOption == "Saathi" && (
                        <Row>
                          <Col className="p-3">
                            <Form.Control
                              as="textarea"
                              placeholder="Brief Bio"
                              style={{ padding: "8px", fontSize: "12px" }}
                              rows={3}
                              value={bio}
                              onChange={(event) => setBio(event.target.value)}
                            />
                          </Col>
                        </Row>
                      )}

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#009efb",
                            borderColor: "#009efb",
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Update
                        </Button>

                        <Button
                          variant="secondary"
                          type="button"
                          onClick={handleCancel}
                          style={{
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>

                    {alert && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 999, // Ensures it appears above the form
                          width: "100%", // Adjust width if needed
                          display: "flex",
                          justifyContent: "center", // Centers alert horizontally
                          alignItems: "center", // Ensures proper alignment in flexbox
                        }}
                      >
                        <Alert variant="success" className="h6 w-50">
                          {alert}
                        </Alert>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminSubscriber;
