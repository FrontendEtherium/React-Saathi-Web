import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { baseUrl } from "../../ApiPath";

const ServiceRequest = () => {
  const [subscriber, setSubscriber] = useState(null); // Store subscriber details
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [tasks] = useState([
    {
      id: 1,
      task: "Weekly Call",
      serviceID: 4,
      isAlaCarte: false,
      status: "pending",
    },
    {
      id: 2,
      task: "Errand Run",
      serviceID: 5,
      isAlaCarte: false,
      status: "pending",
    },
    {
      id: 3,
      task: "House Cleaning",
      serviceID: 6,
      isAlaCarte: true,
      status: "pending",
    },
    {
      id: 4,
      task: "Doctor Consultation",
      serviceID: 7,
      isAlaCarte: true,
      status: "completed",
    },
    {
      id: 5,
      task: "Personal Training",
      serviceID: 8,
      isAlaCarte: false,
      status: "completed",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/subscribers/7`
        );
        const json = await response.json();

        setSubscriptionList(json.patrons); // Patrons are set here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/admin-users/48/subscribers`
        );
        const json = await response.json();
        console.log("subscribers", json);

        setSubscriptionList(json); // Patrons are set here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const [subId, setSubId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [completionData, setCompletionData] = useState({
    notes: "",
    screenshot: null,
  });

  const handleShowModal = (task) => {
    setSelectedRequest(task);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCompletionData({
      ...completionData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedRequest) return;

    const formData = new FormData();
    formData.append("description", completionData.notes);
    if (completionData.screenshot) {
      formData.append("image", completionData.screenshot);
    }

    try {
      const response = await fetch(
        `${baseUrl}/subscribers/${subscriber.subscriberID}/services/${selectedRequest.serviceID}/complete`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setAlert(`Task completed for ${selectedRequest.task}`);
      } else {
        setAlert(`Failed to update task for ${selectedRequest.task}`);
      }
    } catch (error) {
      console.error("Error submitting task update:", error);
      setAlert(`Error updating task for ${selectedRequest.task}`);
    }

    setTimeout(() => setAlert(""), 3000);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setCompletionData({
      notes: "",
      screenshot: null,
    });
  };

  // Separate Ala-Carte and Completed Tasks
  const alaCarteTasks = tasks.filter(
    (task) => task.isAlaCarte && task.status === "pending"
  );
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending" && !task.isAlaCarte
  );

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        {/* Subscriber Dropdown */}
        {subscriptionList && (
          <>
            <Row>
              <Col md={4}>
                <Form.Label>Select a Subscriber</Form.Label>
                <Form.Select
                  aria-label="Select Subscriber"
                  value={subId}
                  onChange={(event) => setSubId(event.target.value)}
                >
                  <option value="">Select Subscriber</option>
                  {subscriber.map((subscriber) => (
                    <option
                      key={subscriber.subscriberID}
                      value={subscriber.subscriberID}
                    >
                      {subscriber.firstName} {subscriber.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>
                      Subscriber: {subscriber.firstName} {subscriber.lastName}
                    </Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {subscriber.email} <br />
                      <strong>Contact No:</strong> {subscriber.contactNo} <br />
                      <strong>Package:</strong> {subscriber.packageName} <br />
                      <strong>Comments:</strong> {subscriber.comments || "N/A"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Services:</strong>
                      <ul>
                        {pendingTasks.map((task) => (
                          <li key={task.id}>{task.task}</li>
                        ))}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Patrons */}
            <Row className="mt-4">
              <Col md={12}>
                <h5 className="mb-3">Associated Patrons</h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr className="table-info">
                      <th>Patron Name</th>
                      <th>Relation</th>
                      <th>City</th>
                      <th>Contact No</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionList.map((patron) => (
                      <tr key={patron.patronID}>
                        <td>
                          {patron.firstName} {patron.lastName}
                        </td>
                        <td>{patron.relation}</td>
                        <td>{patron.city}</td>
                        <td>{patron.contactNo}</td>
                        <td>{patron.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Pending Task Table */}
            <Row className="mt-4">
              <Col md={12}>
                <h5 className="mb-3">Pending Tasks</h5>
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
                      <th>Service Name</th>
                      <th>Pending</th>
                      <th>Completed</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>3</td>
                        <td>2</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            style={{
                              backgroundColor: "#009efb",
                              borderColor: "#009efb",
                            }}
                            onClick={() => handleShowModal(task)}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Ala-Carte Service Table */}
            <Row className="mt-4">
              <Col md={12}>
                <h5 className="mb-3">Ala-Carte Services</h5>
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
                      <th>Service Name</th>
                      <th>Pending</th>
                      <th>Completed</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alaCarteTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>3</td>
                        <td>2</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            style={{
                              backgroundColor: "#009efb",
                              borderColor: "#009efb",
                            }}
                            onClick={() => handleShowModal(task)}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Completed Task Table */}
            <Row className="mt-4">
              <Col md={12}>
                <h5 className="mb-3">Completed Tasks</h5>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-font-size"
                  style={{ height: "auto", overflowY: "scroll" }}
                >
                  <thead>
                    <tr className="table-success">
                      <th>Service Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>
                          <Button variant="secondary" size="sm" disabled>
                            Completed
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}

        {/* Modal for Task Update */}
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

        {/* Alert for Task Completion */}
        {alert && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="alert alert-success">{alert}</div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServiceRequest;
