import React, { useState } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { baseUrl } from "../../ApiPath";

const ManageUsers = () => {
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
  const [passwordIcon, setPasswordIcon] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    console.log("Image selected:", {
      image: file.name,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)
    const formattedNumber = `+${mob.slice(0, countryCode.length)}-${mob.slice(countryCode.length)}`;

    const AdMap = {
      firstName: first,
      lastName: last,
      email: email,
      // dob: dob,
      contactNo:formattedNumber,
      countryCode: countryCode,
      briefBio: bio,
      userType: selectedOption,
      password: password,
      status: 1,
      createdBy: userId,
      updatedBy: null,
      // picture:image
    };

    console.log("AdMap:", AdMap);
    const formData = new FormData();

    if (image) {
      formData.append("picture", image); // 'picture' is the field name expected by the backend
    }

    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send a POST request using Axios with the form data
    axios
      .post(
        `${baseUrl}/admin-users`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("User created successfully!!");
          setLoading(false)
        }
        //   else if (response.data === 0) {
        //     setAlert('Company not created. Please check all fields and try again.');
        //   }
        else {
          setAlert("An error occurred. Please contact the development team.");
          setLoading(false)
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
        setLoading(false)
      });
  };

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 ml-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4 className="heading-color">Add New User</h4>
                </div>
              </div>
              <hr />
              <div>
                {/* Consolidated Form */}
                <div style={{ position: "relative" }}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={3} className="p-3">
                        <Form.Label className="label-style  ">
                          User Type
                        </Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={selectedOption}
                          onChange={(event) =>
                            setSelectedOption(event.target.value)
                          }
                          required
                        >
                          {/* <option>User Type</option> */}
                          <option value="Admin">Admin</option>
                          <option value="Saathi">Saathi</option>
                        </Form.Select>
                      </Col>
                    </Row>
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
                          UserName
                        </Form.Label>
                        <Form.Control
                          placeholder="user@etheriumtech.com"
                          style={{ padding: "8px", fontSize: "12px" }}
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </Col>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Set Password
                        </Form.Label>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            required
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <i class="bi bi-eye-slash-fill"></i>
                            ) : (
                              <i class="bi bi-eye-fill"></i>
                            )}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="auto" className="p-3" lg={6}>
  <Form.Label className="label-style">Phone Number</Form.Label>
  <div className="w-100">
    <PhoneInput
      country={'in'}
      value={mob}
      onChange={(value, country) => {
        setMob(value);
        setCountryCode(country.dialCode);
      }}
      inputStyle={{ width: '100%' }} // Ensure full width
    />
  </div>
</Col>

                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Upload Photograph
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          placeholder="Select Image"
                          style={{ padding: "8px", fontSize: "12px" }}
                          onChange={handleImageChange}
                        />
                      </Col>
                    </Row>

                    <Row></Row>

                    {selectedOption == "Saathi" && (
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Brief Bio
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Brief Bio"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={3}
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>
                    )}

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        style={{
                          backgroundColor: "#009efb",
                          borderColor: "#009efb",
                          color: "white",
                          margin: "4px",
                          fontSize: "12px",
                        }}
                      >
                        Save
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
  );
};

export default ManageUsers;