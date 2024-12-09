import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { baseUrl } from "../../ApiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/subscribers/active`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const AdMap = {
      email: email,
      password: password,
    };

    console.log("AdMap:", AdMap);

    const formData = new FormData();

    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });

    axios
      .post(`${baseUrl}/admin/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the content type as form data
        },
      })
      .then((res) => {
        if (res.data && res.data != "Invalid credentials for Admin") {
          // Assuming the API response has a success field
          localStorage.setItem("userType", res.data.userType);
          localStorage.setItem("userId", res.data.adminUserID);
          localStorage.setItem("userPhoto", res.data.picture);
          localStorage.setItem("firstName", res.data.firstName);
          localStorage.setItem("lastName", res.data.lastName);
          localStorage.setItem("email", res.data.email);
          const user = localStorage.getItem("userType");
          const userId = localStorage.getItem("userId");

          const first = localStorage.getItem("firstName");
          const last = localStorage.getItem("lastName");

          console.log("name", first);
          console.log("name", last);

          console.log("userId", userId);
          console.log("user", user);
          console.log("pic", res.data.picture);
          // Redirect to /dashboard after successful login
          navigate("/dashboard");
        } else if (res.data == "Invalid credentials for Admin") {
          // Show alert for invalid credentials
          setAlert("Invalid credentials. Please try again.");
          setTimeout(() => {
            setAlert("");
          }, 4000);
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data.includes("Invalid credentials")) {
          setAlert("Invalid Credentials.");
          setTimeout(() => {
            setAlert("");
          }, 4000);
        }
        setAlert("Invalid Credentials.");
        setTimeout(() => {
          setAlert("");
        }, 4000);
      });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#f7f7f7" }} // Background color for the whole page
      >
        <Card
          className="shadow-sm"
          style={{ width: "400px", borderRadius: "10px" }}
        >
          <Card.Body>
            <div className="text-center mb-4">
              <h3
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  color: "#6c757d",
                }}
              >
                Sign In
              </h3>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: "14px", padding: "10px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="validationCustom03">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontSize: "14px", padding: "10px" }}
                />
              </Form.Group>

              <div className="d-flex align-items-center justify-content-between mb-3">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ fontSize: "12px", padding: "7px 16px" }}
                >
                  Login
                </Button>
                <Link
                  to="#"
                  style={{ fontSize: "14px", textDecoration: "none" }}
                >
                  Forgot Password?
                </Link>
              </div>
              {alert && (
                <Alert variant="danger" className="h6 mx-3 mt-3">
                  {alert}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
