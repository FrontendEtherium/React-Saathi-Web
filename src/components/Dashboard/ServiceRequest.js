import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const ServiceRequest = () => {
  // Dummy data for pending requests
  const pendingRequestsData = [
    {
      id: 1,
      clientName: "John Doe",
      packageName: "Bronze Package",
      serviceName: "Weekly Call",
      serviceDescription: "A 1-hour call to check on health.",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      packageName: "Silver Package",
      serviceName: "Errand Run",
      serviceDescription: "2-hour errand run for groceries.",
    },
  ];

  // Dummy data for completed requests
  const completedRequestsData = [
    {
      id: 3,
      clientName: "Michael Johnson",
      serviceName: "House Check",
      notes: "Checked the house and everything is in good condition.",
    },
    {
      id: 4,
      clientName: "Emily Davis",
      serviceName: "Weekly Call",
      notes: "Had a 1-hour call, all is well with health.",
    },
  ];

  const [pendingRequests] = useState(pendingRequestsData);
  const [completedRequests] = useState(completedRequestsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [completionData, setCompletionData] = useState({
    notes: "",
    screenshot: null,
  });
  const [alert, setAlert] = useState("");

  // Handle open modal
  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setCompletionData({
      notes: "",
      screenshot: null,
    });
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCompletionData({
      ...completionData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission for task completion
  const handleSubmit = () => {
    setAlert(`Task completed for ${selectedRequest.clientName}`);
    setTimeout(() => setAlert(""), 3000);
    handleCloseModal();
  };

  return (
    <Container fluid className="mt-5">
      {/* Pending Requests Section */}
      <Row>
        <Col>
          <h3 className="mb-4 text-center">Pending Requests</h3>
          <Row>
            {pendingRequests.map((request) => (
              <Col md={6} className="mb-4" key={request.id}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="text-default">
                      {request.clientName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {request.packageName}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Service:</strong> {request.serviceName} <br />
                      <strong>Description:</strong> {request.serviceDescription}
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => handleShowModal(request)}
                    >
                      Update Status
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Completed Requests Section */}
      <Row className="mt-5">
        <Col>
          <h3 className="mb-4 text-center">Completed Requests</h3>
          <Row>
            {completedRequests.map((request) => (
              <Col md={6} className="mb-4" key={request.id}>
                <Card className="shadow-sm border-0 bg-light">
                  <Card.Body>
                    <Card.Title className="text-success">
                      {request.clientName}
                    </Card.Title>
                    <Card.Text>
                      <strong>Service:</strong> {request.serviceName} <br />
                      <strong>Completion Notes:</strong> {request.notes}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for Updating Status */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Completion Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={completionData.notes}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Screenshot or File</Form.Label>
              <Form.Control
                type="file"
                name="screenshot"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {alert && (
        <Alert variant="success" className="mt-3">
          {alert}
        </Alert>
      )}
    </Container>
  );
};

export default ServiceRequest;
