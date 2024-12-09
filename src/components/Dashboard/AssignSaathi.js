import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

const AssignSaathi = () => {
  const [sub, setSub] = useState([]);
  const [saathi, setSaathi] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedSaathi, setSelectedSaathi] = useState("");
  const [alert, setAlert] = useState("");
  const [changedAlert, setChangedAlert] = useState("");

  const [subList, setSubList] = useState([]);
  const [changedSub, setChangedSub] = useState("");
  const [changedSaathi, setChangedSaathi] = useState("");
  const [reason, setReason] = useState("");
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  const navigate = useNavigate(); // for React Router v6+

  const handleCancel = () => {
    navigate("/dashboard"); // for React Router v6+
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/subscribers/without-saathi`
        );
        console.log(res.data[0].firstName);
        setSub(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();

    const fetchWithSaathiList = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/subscribers/with-saathi`
        );
        console.log("new response", res.data[0].subscriber.firstName);
        setSubList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWithSaathiList();

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin-users/saathi`
        );
        const filteredData = res.data.filter((user) => user.status === 1); // Filter users with status 1
        console.log(filteredData[0]?.firstName); // Optional: log the first user's name (if exists)
        setSaathi(filteredData); // Set only filtered users in state
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .put(
        `${baseUrl}/subscribers/${parseInt(
          selectedSub
        )}/assign-saathi?saathiID=${parseInt(selectedSaathi)}`
      )
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Saathi assigned successfully!!");
        }
        //   else if (response.data === 0) {
        //     setAlert('Company not created. Please check all fields and try again.');
        //   }
        else {
          setAlert("An error occurred. Please contact the development team.");
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
  const handleSubChange = (event) => {
    const selectedSubscriberId = event.target.value;
    // setChangedSub(event.target.value)

    setChangedSub(selectedSubscriberId);
    console.log(selectedSubscriberId, "changessub");

    // Find the selected subscriber
    const selectedSubscriber = subList.find(
      (subscriber) =>
        subscriber.subscriber.subscriberID == parseInt(selectedSubscriberId)
    );

    if (selectedSubscriber && selectedSubscriber.saathi) {
      // Set the associated Saathi automatically
      setChangedSaathi(selectedSubscriber.saathi.adminUserID);
    }
  };

  const handleCardChange =(e)=>{
    setShowFirst(false)
    setShowSecond(true)
  }
  const handleCancelSecond =()=>{
    setShowFirst(true)
    setShowSecond(false)
  }

  const handleSubmitChange = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .put(
        `${baseUrl}/subscribers/${parseInt(
          changedSub
        )}/assign-saathi?saathiID=${changedSaathi}`,
        {
          Reason: reason,
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setChangedAlert("Saathi changed successfully!!");
        } else {
          setChangedAlert(
            "An error occurred. Please contact the development team."
          );
        }

        setTimeout(() => {
          setChangedAlert("");
          navigate("/dashboard");
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 500) {
          setChangedAlert("Some error occured. Please try again later");
        } else if (err.status == 400) {
          setChangedAlert("Some error occured. Please try again later");
        } else {
          setChangedAlert(err.response.data);
        }
        setTimeout(() => {
          setChangedAlert("");
        }, 5000); // Hide alert after 3 seconds
      });
  };

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 px-5">
          {showFirst && (
            <>
            <Card className="shadow-sm pb-3">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Assign a Saathi</h4>
                  </div>
                </div>
                <hr />
                <div style={{ position: "relative" }}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Select a Subscriber
                        </Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={selectedSub}
                          onChange={(event) =>
                            setSelectedSub(event.target.value)
                          }
                          required
                        >
                          <option value="">Select Subscriber</option>
                          {sub.length > 0 &&
                            sub.map((subscriber) => (
                              <option
                                key={subscriber.subscriberID}
                                value={subscriber.subscriberID}
                              >
                                {subscriber.firstName} {subscriber.lastName}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Select a Saathi
                        </Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={selectedSaathi}
                          onChange={(event) =>
                            setSelectedSaathi(event.target.value)
                          }
                          required
                        >
                          <option value="">Select Saathi</option>
                          {saathi.length > 0 &&
                            saathi.map((subscriber) => (
                              <option
                                key={subscriber.adminUserID}
                                value={subscriber.adminUserID}
                              >
                                {subscriber.firstName} {subscriber.lastName}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                    </Row>

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
                        Assign
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
{/* 
                    <div className="d-flex justify-content-center mt-4">
                      <Button
                        variant=""
                      onClick={handleCardChange}
                        style={{
                          backgroundColor: "#009efb",
                          borderColor: "#009efb",
                          color: "white",
                          margin: "4px",
                          fontSize: "12px",
                        }}
                      >
                        Change Assigned Saathi
                      </Button>
                    </div> */}
                  
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
              </Card.Body>
            </Card>

            
            <div className="d-flex justify-content-center mt-4">
                      <Button
                        variant=""
                      onClick={handleCardChange}
                        style={{
                          backgroundColor: "#009efb",
                          borderColor: "#009efb",
                          color: "white",
                          margin: "4px",
                          fontSize: "12px",
                        }}
                      >
                        Change Assigned Saathi
                      </Button>
                    </div>

            {/* <div className="d-flex justify-content-center mt-4">
                      <Button
                        variant=""
                      onClick={handleCardChange}
                        style={{
                          backgroundColor: "#009efb",
                          borderColor: "#009efb",
                          color: "white",
                          margin: "4px",
                          fontSize: "12px",
                        }}
                      >
                        Change Assigned Saathi
                      </Button>
                    </div> */}

            </>
          )}

          { 
            showSecond && (
              <Card className="shadow-sm pb-3">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Change Assigned Saathi</h4>
                  </div>
                </div>
                <hr />
                <div style={{ position: "relative" }}>
                  <Form onSubmit={handleSubmitChange}>
                    <Row>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Select a Subscriber
                        </Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={changedSub}
                          // onChange={(event) => setChangedSub(event.target.value)}
                          onChange={handleSubChange}
                          required
                        >
                          <option value="">Select Subscriber</option>
                          {subList.length > 0 &&
                            subList.map((sub) => (
                              <option
                                key={sub.subscriber.subscriberID}
                                value={sub.subscriber.subscriberID}
                              >
                                {sub.subscriber.firstName}{" "}
                                {sub.subscriber.lastName}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Select a Saathi
                        </Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={changedSaathi}
                          onChange={(event) =>
                            setChangedSaathi(event.target.value)
                          }
                          required
                        >
                          <option value="">Select Saathi</option>
                          {saathi.length > 0 &&
                            saathi.map((subscriber) => (
                              <option
                                key={subscriber.adminUserID}
                                value={subscriber.adminUserID}
                              >
                                {subscriber.firstName} {subscriber.lastName}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                    </Row>
  
                    <Row>
                      <Col className="p-3">
                        <Form.Label className="label-style">
                          Reason for Change
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Mention Reason"
                          style={{ padding: "8px", fontSize: "12px" }}
                          rows={2}
                          value={reason}
                          onChange={(event) => setReason(event.target.value)}
                          required
                        />
                      </Col>
                    </Row>
  
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
                        onClick={handleCancelSecond}
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
  
                  {changedAlert && (
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
                        {changedAlert}
                      </Alert>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
            )
          }

         
        </Container>
      </div>
    </div>
  );
};

export default AssignSaathi;
