import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { baseUrl } from "../../ApiPath";

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [priceINR, setPriceINR] = useState(0); // Store the total price in INR
  const [packagePriceINR, setPackagePriceINR] = useState(0); // Store final discounted price

  const [priceUSD, setPriceUSD] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceFrequencies, setServiceFrequencies] = useState({});
  const [discountPercentage, setDiscountPercentage] = useState(0); // Discount percentage
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/alacarteservices`
        );
        const data = response.data;
        const filteredData = data.filter((item) => item.status === 1);
        setServices(filteredData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  const validateForm = () => {
    const newErrors = {};

    if (!packageName) newErrors.packageName = "Package name is required.";
    if (!packageDescription)
      newErrors.packageDescription = "Package description is required.";
    if (!selectedServices.length)
      newErrors.selectedServices = "You must select at least one service.";
    if (!packageStatus) newErrors.packageStatus = "Package status is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle service selection and total price calculation
  const handleServiceSelection = (serviceID) => {
    if (selectedServices.includes(serviceID)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceID));
      const newFrequencies = { ...serviceFrequencies };
      delete newFrequencies[serviceID];
      setServiceFrequencies(newFrequencies);
    } else {
      setSelectedServices([...selectedServices, serviceID]);
      setServiceFrequencies({
        ...serviceFrequencies,
        [serviceID]: 1, // Default frequency to 1 when the service is selected
      });
    }
  };

  const handleFrequencyChange = (serviceID, value) => {
    setServiceFrequencies({
      ...serviceFrequencies,
      [serviceID]: value,
    });
  };

  useEffect(() => {
    // Calculate total price in INR when services are selected/deselected or frequency is updated
    const calculateTotalPrice = () => {
      const total = selectedServices.reduce((acc, serviceID) => {
        const service = services.find((s) => s.serviceID === serviceID);
        const frequency = serviceFrequencies[serviceID] || 1; // Get the selected frequency or default to 1
        return acc + (service?.priceINR || 0) * frequency; // Multiply price by frequency
      }, 0);
      setPriceINR(total);
    };

    calculateTotalPrice();
  }, [selectedServices, services, serviceFrequencies]);

  // Handle discount calculation
  useEffect(() => {
    const applyDiscount = () => {
      const discountedPrice = priceINR - (priceINR * discountPercentage) / 100;
      setPackagePriceINR(discountedPrice); // Store discounted price
    };

    applyDiscount();
  }, [discountPercentage, priceINR]);

  const handleSubmitPackage = async (event) => {
    event.preventDefault();
    console.log("selectred", selectedServices);

    if (selectedServices.length === 0) {
      const confirmation = window.confirm(
        "Select atleast one service to continue"
      );
      return; // Stop form submission if no services are selected
    }

    const packageServices = selectedServices.map((serviceID) => {
      const service = services.find((s) => s.serviceID === serviceID);
      const selectedFrequency =
        parseInt(serviceFrequencies[serviceID], 10) || 1;

      return {
        serviceID: service.serviceID,
        frequency: selectedFrequency,
        frequencyUnit: service.frequencyUnit,
        // priceUSD: service.priceUSD,
        // priceINR: service.priceINR,
        status: service.status,
      };
    });

    const packageData = {
      packageName,
      packageDescription,
      priceINR: parseFloat(packagePriceINR), // Use total price in INR
      priceUSD: parseFloat(priceUSD),
      status: 1,
      createdBy: parseInt(userId),
      packageDiscount: discountPercentage / 100,
      packageServices,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/subscription-package`,
        packageData
      );
      setAlert("Package created successfully!");
      setTimeout(() => {
        setAlert("");
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error creating package:", error);
      setAlert("An error occurred while creating the package.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    setPriceUSD(packagePriceINR * 0.012);
  }, [packagePriceINR]);
  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center ">
              <div className="mt-2">
                <h4 className="heading-color">Add New Package</h4>
              </div>
            </div>
            <hr />
            <Form onSubmit={handleSubmitPackage}>
              {/* Package Name */}
              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageName">
                    <Form.Label className="label-style">
                      Package Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Package Name"
                      value={packageName}
                      required
                      onChange={(event) => setPackageName(event.target.value)}
                      style={{ padding: "8px", fontSize: "12px" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packageName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Package Description */}
              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageDescription">
                    <Form.Label className="label-style">
                      Package Description
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Package Description"
                      value={packageDescription}
                      required
                      style={{ padding: "8px", fontSize: "12px" }}
                      onChange={(event) =>
                        setPackageDescription(event.target.value)
                      }
                      isInvalid={!!errors.packageDescription}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packageDescription}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Services Selection */}
              <div className="text-center mt-2">
                <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                  List of All Services
                </h4>
              </div>

              <div className="d-flex">
                <Card className="shadow-sm w-100 pb-3">
                  <Card.Body>
                    {services.length > 0 ? (
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-font-size"
                        style={{ height: "auto", overflowY: "scroll" }}
                      >
                        <thead>
                          <tr className="table-info">
                            <th>Select Services</th>
                            <th>Service Name</th>
                            <th>Price (INR)</th>
                            <th>Frequency of Service</th>
                            <th>Duration (Hours)</th>
                            <th>Business Hours</th>
                            <th>No. of Services</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((service) => (
                            <tr key={service.serviceID} style={{height:"50px"}}>
                              <td className=" justify-content-center">
                                <Form.Check
                                  type="checkbox"
                                  id={`service-${service.serviceID}`}
                                  className="custom-checkbox"
                                  checked={selectedServices.includes(
                                    service.serviceID
                                  )}
                                  onChange={() =>
                                    handleServiceSelection(service.serviceID)
                                  }
                                />
                              </td>
                              <td>{service.serviceName}</td>
                              <td>{service.priceINR}</td>
                              <td>{service.frequencyUnit}</td>
                              <td>{service.durationInHours}</td>
                              <td style={{ maxWidth: "100px" }}>
                                {service.businessHoursStart}-
                                {service.businessHoursEnd}
                              </td>
                              <td>
                                {selectedServices.includes(
                                  service.serviceID
                                ) && (
                                  <Form.Group
                                    controlId={`frequency-${service.serviceID}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter frequency"
                                      value={
                                        serviceFrequencies[service.serviceID] ||
                                        1
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          service.serviceID,
                                          e.target.value
                                        )
                                      }
                                      style={{ width: "80px" }}
                                      required
                                    />
                                  </Form.Group>
                                )}
                              </td>
                              <td>
                                ₹
                                {selectedServices.includes(service.serviceID)
                                  ? service.priceINR *
                                    (serviceFrequencies[service.serviceID] || 1)
                                  : service.priceINR}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="d-flex justify-content-center my-4">
                        <p>No services available</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Price and Discount Section */}
              <Row>
                <Col className="p-3">
                  <Row>
                    <Col>
                      <Form.Group controlId="priceINR">
                        <Form.Label className="label-style">
                          Package Price in INR
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "8px", fontSize: "12px" }}
                          type="number"
                          value={priceINR}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="discountPercentage">
                        <Form.Label className="label-style">
                          Package Discount (%)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Discount Percentage"
                          value={discountPercentage}
                          onChange={(event) =>
                            setDiscountPercentage(event.target.value)
                          }
                          style={{ padding: "8px", fontSize: "12px" }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="packagePriceINR">
                        <Form.Label className="label-style">
                          Final Package Price in INR
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={packagePriceINR}
                          required
                          style={{ padding: "8px", fontSize: "12px" }}
                          onChange={(event) => {
                            setPriceINR(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="packagePriceINR">
                        <Form.Label className="label-style">
                          Final Package Price in USD
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={priceUSD}
                          required
                          style={{ padding: "8px", fontSize: "12px" }}
                          onChange={(event) => {
                            setPriceUSD(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Package Status */}
              {/* <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageStatus">
                    <Form.Label className="label-style">
                      Package Status
                    </Form.Label>
                    <Form.Select
                      value={packageStatus}
                      onChange={(event) => setPackageStatus(event.target.value)}
                      isInvalid={!!errors.packageStatus}
                      required
                      style={{ padding: "8px", fontSize: "12px" }}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.packageStatus}
                    </Form.Control.Feedback>
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Packages;
