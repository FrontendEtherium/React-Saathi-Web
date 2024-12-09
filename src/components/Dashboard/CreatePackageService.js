import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"; // For loading state
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

function CreatePackageService() {
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
  const [alert, setAlert] = useState({ message: "", variant: "" }); // For success/error messages
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Cancel operation
  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Validation of input fields
  const validateServiceFields = () => {
    const validationErrors = {};

    if (!serviceName)
      validationErrors.serviceName = "Service name is required.";
    if (!serviceDescription)
      validationErrors.serviceDescription = "Service description is required.";
    if (!frequencyUnit)
      validationErrors.frequencyUnit = "Frequency unit is required.";
    if (!frequency || frequency <= 0)
      validationErrors.frequency = "Frequency must be a positive number.";
    if (!priceINR || priceINR <= 0)
      validationErrors.priceINR = "Price in INR must be a positive number.";
    if (!priceUSD || priceUSD <= 0)
      validationErrors.priceUSD = "Price in USD must be a positive number.";
    if (!durationInHours || durationInHours <= 0)
      validationErrors.durationInHours = "Duration must be a positive number.";
    if (!businessHoursStart)
      validationErrors.businessHoursStart =
        "Business hours start time is required.";
    if (!businessHoursEnd)
      validationErrors.businessHoursEnd =
        "Business hours end time is required.";
    if (!serviceStatus)
      validationErrors.serviceStatus = "Service status is required.";

    return validationErrors;
  };

  // Submit Service Data
  const handleSubmitService = async (event) => {
    event.preventDefault();

    // Perform validation first
    const validationErrors = validateServiceFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({ message: "", variant: "" });
      return;
    }

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
      durationInHours: parseInt(durationInHours),
      businessHoursStart: formattedBusinessHoursStart,
      businessHoursEnd: formattedBusinessHoursEnd,
      status: parseInt(serviceStatus),
      createdBy: parseInt(userId),
    };

    try {
      setLoading(true);
      setErrors({});

      const response = await axios.post(
        `${baseUrl}/alacarteservices`,
        serviceData
      );

      console.log("Response:", response.data);

      setAlert({
        message: "Service created successfully!",
        variant: "success",
      });

      // Reset form after successful creation
      setServiceName("");
      setServiceDescription("");
      setFrequency("");
      setFrequencyUnit("");
      setPriceINR("");
      setPriceUSD("");
      setSurgePrice("");
      setDurationInHours("");
      setBusinessHoursStart("");
      setBusinessHoursEnd("");
      setServiceStatus("");

      setTimeout(() => {
        setAlert({ message: "", variant: "" });
      }, 5000);
    } catch (error) {
      console.error("Error creating service:", error);
      setAlert({
        message:
          "An error occurred while creating the service. Please try again.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 ml-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center mt-5">
              <div className="mt-2">
                <h4 className="heading-color">Add New Package Service</h4>
              </div>
            </div>
            <hr />

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

              {/* Price fields */}
              <Row>
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
                <Col className="p-3">
                  <Form.Group>
                    <Form.Label className="label-style">Surge Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Surge Price"
                      style={{ padding: "8px", fontSize: "12px" }}
                      value={surgePrice}
                      onChange={(event) => setSurgePrice(event.target.value)}
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
              </Row>
              <Row>
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

            {/* Alert Section */}
            {alert.message && (
              <Alert variant={alert.variant} className="h6 mx-3 mt-3 w-50">
                {alert.message}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CreatePackageService;
