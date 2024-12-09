import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

function AllServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showAlert, setShowAlert] = useState({ message: "", variant: "" });

  const user = localStorage.getItem("userType");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/alacarteservices/active`
        );
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleEditClick = (service) => {
    setCurrentService({ ...service });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentService(null);
  };

  const handleDelete = async (serviceID) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (confirmation) {
      try {
        const updatedService = { status: 0 };
        await axios.put(
          `${baseUrl}/alacarteservices/${serviceID}`,
          updatedService
        );

        // Show alert for successful deletion
        setShowAlert({
          message: "Service deleted successfully",
          variant: "success",
        });

        // Update the services state by filtering out the deleted service
        setServices(
          services.filter((service) => service.serviceID !== serviceID)
        );

        // Hide the alert after 5 seconds
        setTimeout(() => {
          setShowAlert({ message: "", variant: "" });
        }, 5000);
      } catch (error) {
        console.error("Failed to delete service:", error);
        setShowAlert({
          message: "Failed to delete service",
          variant: "danger",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (currentService) {
      const url = `${baseUrl}/alacarteservices/${currentService.serviceID}`;
      try {
        await axios.put(url, currentService);
        const updatedServices = services.map((service) =>
          service.serviceID === currentService.serviceID
            ? currentService
            : service
        );
        setServices(updatedServices);
        setShowModal(false);
      } catch (error) {
        console.error("Failed to update service:", error);
        setError("Failed to update service. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex">
      <Container className="d-flex justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm w-100 pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="mt-2">
                <h4 className="heading-color">List of Services</h4>
              </div>
            </div>
            <hr />

            {/* Alert Section */}
            {showAlert.message && (
              <Alert variant={showAlert.variant} className="text-center">
                {showAlert.message}
              </Alert>
            )}

            {/* Loading Spinner */}
            {loading ? (
              <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              // Display error message if an error occurred
              <div className="d-flex justify-content-center my-4 text-danger">
                {error}
              </div>
            ) : services.length > 0 ? (
              // Services Table
              <Table
                striped
                bordered
                hover
                responsive
                className="table-font-size"
              >
                <thead>
                  <tr className="table-info">
                    <th className="text-center align-middle">S.No</th>
                    <th className="text-center align-middle">Service Name</th>
                    <th className="text-center align-middle">Description</th>
                    <th className="text-center align-middle">Price INR</th>

                    <th className="text-center align-middle">Frequency</th>
                    <th className="text-center align-middle">
                      Duration (Hours)
                    </th>
                    <th className="text-center align-middle">Business Hours</th>
                    {user === "Admin" && (
                    <th className="text-center align-middle">Edit/Delete</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.serviceID}>
                      <td>{index + 1}</td>
                      <td>{service.serviceName}</td>
                      <td>{service.serviceDescription}</td>
                      <td>
                        {service.priceINR !== null &&
                        service.priceINR !== undefined
                          ? service.priceINR
                          : "N/A"}
                      </td>

                      <td>
                        {service.frequency} {service.frequencyUnit}
                      </td>
                      <td>{service.durationInHours}</td>
                      <td>
                        {service.businessHoursStart} -{" "}
                        {service.businessHoursEnd}
                      </td>
              
                      {user === "Admin" && (
                      <td>
                        <span className="text-decoration-none me-3">
                          <Link
                            to={`/dashboard/UpdateService/${service.serviceID}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            <i
                              className="bi bi-pencil-fill edit-btn-color"
                              onClick={() => handleEditClick(service)}
                            ></i>
                          </Link>
                        </span>

                        <span>
                          <i
                            className="bi bi-trash3-fill delete-btn-color"
                            onClick={() => handleDelete(service.serviceID)}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </span>
                      </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              // Display if no services are available
              <div className="d-flex justify-content-center my-4">
                <p>No services available</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal for editing service */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentService && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service name"
                    name="serviceName"
                    value={currentService.serviceName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    name="serviceDescription"
                    value={currentService.serviceDescription}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price in INR</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price in INR"
                    name="priceINR"
                    value={currentService.priceINR}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price in USD</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price in USD"
                    name="priceUSD"
                    value={currentService.priceUSD}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Frequency"
                    name="frequency"
                    value={currentService.frequency}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Frequency Unit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Frequency Unit"
                    name="frequencyUnit"
                    value={currentService.frequencyUnit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (Hours)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter duration in hours"
                    name="durationInHours"
                    value={currentService.durationInHours}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="businessHoursStart"
                    value={currentService.businessHoursStart}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="businessHoursEnd"
                    value={currentService.businessHoursEnd}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentService.status}
                    onChange={handleInputChange}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveChanges}>
              Update Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default AllServices;
