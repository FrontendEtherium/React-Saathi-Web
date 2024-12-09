import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"; // For loading state
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get id from URL
import { baseUrl } from "../../ApiPath";

function EditService() {
  // States for Service Section
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [frequencyUnit, setFrequencyUnit] = useState("");
  const [priceINR, setPriceINR] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [surgePrice, setSurgePrice] = useState("");
  const [durationInHours, setDurationInHours] = useState("");
  const [businessHoursStart, setBusinessHoursStart] = useState("");
  const [businessHoursEnd, setBusinessHoursEnd] = useState("");
  const [serviceStatus, setServiceStatus] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [alert, setAlert] = useState(""); // For success/error messages
  const [errors, setErrors] = useState({});
  const [extraPrice, setExtraPrice] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the route parameters

  // Fetch service data on component mount
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseUrl}/alacarteservices/${id}`
        );
        const serviceData = response.data;

        // Pre-fill the form with the fetched data
        setServiceName(serviceData.serviceName);
        setServiceDescription(serviceData.serviceDescription);
        setFrequency(serviceData.frequency);
        setFrequencyUnit(serviceData.frequencyUnit);
        setPriceINR(serviceData.priceINR);
        setPriceUSD(serviceData.priceUSD);
        setSurgePrice(serviceData.surgePrice);
        setDurationInHours(serviceData.durationInHours);
        setBusinessHoursStart(serviceData.businessHoursStart);
        setBusinessHoursEnd(serviceData.businessHoursEnd);
        setServiceStatus(serviceData.status);
        setExtraPrice(serviceData.extraPrice); // If there is an extra charge field
      } catch (error) {
        console.error("Error fetching service data:", error);
        setAlert(
           "Error fetching service data."
        
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  // Cancel operation
  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Submit Service Data
  const handleSubmitService = async (event) => {
    event.preventDefault();

    // Format business hours to required structure
    const formattedBusinessHoursStart =
      businessHoursStart.length === 5
        ? businessHoursStart + ":00"
        : businessHoursStart;
    const formattedBusinessHoursEnd =
      businessHoursEnd.length === 5
        ? businessHoursEnd + ":00"
        : businessHoursEnd;

    const serviceData = {
      serviceName,
      serviceDescription,
      frequency: parseInt(frequency),
      frequencyUnit,
      priceINR: parseFloat(priceINR),
      priceUSD: parseFloat(priceUSD),
      surgePrice: parseFloat(surgePrice),
      extraPrice: parseFloat(extraPrice), // If applicable
      durationInHours: parseInt(durationInHours),
      businessHoursStart: formattedBusinessHoursStart,
      businessHoursEnd: formattedBusinessHoursEnd,
      status: 1,
      createdBy: parseInt(userId),
    };

    try {
      setLoading(true);
      setErrors({});

      const response = await axios.put(
        `${baseUrl}/alacarteservices/${id}`,
        serviceData
      );

      console.log("Response:", response.data);

      setAlert(
        "Service updated successfully!"
      );

      setTimeout(() => {
        setAlert("");
        navigate("/dashboard");
      }, 5000);
    } catch (error) {
      console.error("Error updating service:", error);
      setAlert(
          "An error occurred while updating the service. Please try again."
    
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 ml-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center ">
              <div className="mt-2">
                <h4 className="heading-color">Update Service</h4>
              </div>
            </div>
            <hr />
            <div style={{ position: "relative" }}>
              <Form onSubmit={handleSubmitService}>
                <Row>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Service Name
                      </Form.Label>
                      <Form.Control
                        placeholder="Add Service Name"
                        value={serviceName}
                        required
                        style={{ padding: "8px", fontSize: "12px" }}
                        onChange={(event) => setServiceName(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Service Description
                      </Form.Label>
                      <Form.Control
                        placeholder="Add Service Description"
                        value={serviceDescription}
                        style={{ padding: "8px", fontSize: "12px" }}
                        onChange={(event) =>
                          setServiceDescription(event.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Dropdown for selecting frequency */}
                <Row>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Frequency of Service
                      </Form.Label>
                      <Form.Select
                        value={frequencyUnit}
                        style={{ padding: "8px", fontSize: "12px" }}
                        onChange={(event) =>
                          setFrequencyUnit(event.target.value)
                        }
                        required
                      >
                        <option value="">Select Frequency</option>
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">BiWeekly</option>
                        <option value="monthly">Monthly</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Duration (Hours)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Duration"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={durationInHours}
                        onChange={(event) =>
                          setDurationInHours(event.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Price in INR
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Price in INR"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={priceINR}
                        onChange={(event) => setPriceINR(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Price in USD
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Price in USD"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={priceUSD}
                        onChange={(event) => setPriceUSD(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Service Start Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={businessHoursStart}
                        onChange={(event) =>
                          setBusinessHoursStart(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Service End Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={businessHoursEnd}
                        onChange={(event) =>
                          setBusinessHoursEnd(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Surge Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Surge Price"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={surgePrice}
                        onChange={(event) => setSurgePrice(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col className="p-3">
                    <Form.Group>
                      <Form.Label className="label-style">Extras</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Extras"
                        style={{ padding: "8px", fontSize: "12px" }}
                        value={extraPrice}
                        onChange={(event) => setExtraPrice(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* <Row>
                <Col className="p-3">
                  <Form.Group>
                    <Form.Label className="label-style">
                      Service Status
                    </Form.Label>
                    <Form.Select
                      value={serviceStatus}
                      style={{ padding: "8px", fontSize: "12px" }}
                      onChange={(event) => setServiceStatus(event.target.value)}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row> */}

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
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" />
                    ) : (
                      "Save"
                    )}
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
            </div>
            {/* Alert Section */}
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditService;
