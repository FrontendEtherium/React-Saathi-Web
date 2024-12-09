import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { baseUrl } from "../../ApiPath";

const DashboardSaathiHome = () => {
  const userId = localStorage.getItem("userId");
  const [list, setList] = useState([]);
  const [services, setServices] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${baseUrl}/admin-users/${userId}/subscribers/services`)
        .then((res) => {
          // Map the data to create a flat structure with services separated by subscriber
          const flattenedData = res.data.flatMap((subscriber) =>
            subscriber.services.flatMap((service) =>
              service.preferredDateTimes.map((dateTime) => ({
                subscriberID: subscriber.subscriberID,
                subscriberName: subscriber.subscriberName,
                serviceName: service.serviceName,
                requestedTime: dateTime.requestedDate,
                preferredDate: dateTime.preferredDate,
                color: dateTime.color,
                serviceID: service.serviceID,
                completionStatus: dateTime.completionStatus,
              }))
            )
          );
          console.log("flat Data", flattenedData);
          setList(flattenedData);
        })
        .catch((err) => console.log(err));
    };

    const fetchServices = async () => {
      axios
        .get(`${baseUrl}/admin-users/${userId}/subscribers/services/all`)
        .then((res) => {
          setServices(res.data);
          console.log(services, "services");
        })
        .catch((err) => console.log(err));
    };

    fetchServices();
    fetchData();
  }, [userId]);

  const sortList = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setList(sortedList);
  };

  // Function to highlight the active sort direction
  const getArrowStyle = (key, direction) => {
    return sortConfig.key === key && sortConfig.direction === direction
      ? { fontWeight: "bold", color: "blue" }
      : {};
  };

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              {/* <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4>Service Requests</h4>
                </div>
              </div>
              <hr /> */}

              <div className="mb-5 mt-5">
                <Row className="mt-3">
                  {/* Associated Patrons */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Subscribers </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            >
                              {services?.totalSubscribers}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {services?.packageDetails?.length > 0 &&
                              services.packageDetails
                                .sort((a, b) =>
                                  a.packageName.localeCompare(b.packageName)
                                ) // Sorting based on packageName
                                .map((service, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="font-14">
                                      {service.packageName}
                                    </div>
                                    <div className="font-20">
                                      {service.subscriberCount}
                                    </div>
                                  </div>
                                ))}

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Package Details */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Completed Tasks </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "green" }}
                            >
                              {services?.totalCompleted}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {services?.serviceBreakdown?.length > 0 &&
                              services.serviceBreakdown
                                .sort((a, b) =>
                                  a.serviceName.localeCompare(b.serviceName)
                                ) // Sorting based on serviceName
                                .map((service, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="font-14">
                                      {service.serviceName}
                                    </div>
                                    <div className="font-20">
                                      {service.completed}
                                    </div>
                                  </div>
                                ))}

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Empty Column with Same Height */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Pending Tasks </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "red" }}
                            >
                              {services?.totalPending}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {services?.serviceBreakdown?.length > 0 &&
                              services.serviceBreakdown
                                .sort((a, b) =>
                                  a.serviceName.localeCompare(b.serviceName)
                                ) // Sorting based on serviceName
                                .map((service, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="font-14">
                                      {service.serviceName}
                                    </div>
                                    <div className="font-20">
                                      {service.pending}
                                    </div>
                                  </div>
                                ))}
                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

              {list.length > 0 && (
                <>
                  <Card className="shadow-sm pb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-center">
                        <div className="mt-2">
                          <h4>Ala-carte Service Requests</h4>
                        </div>
                      </div>
                      <hr />

                      <div>
                        <Table striped bordered className="table-font-size">
                          <thead>
                            <tr className="table-info">
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Subscriber Name
                                <span style={{ cursor: "pointer" }}>
                                  <ArrowDropUpIcon
                                    onClick={() =>
                                      sortList("subscriberName", "ascending")
                                    }
                                    style={{
                                      ...getArrowStyle(
                                        "subscriberName",
                                        "ascending"
                                      ),
                                      marginRight: "-10px",
                                    }}
                                  />
                                  <ArrowDropDownIcon
                                    onClick={() =>
                                      sortList("subscriberName", "descending")
                                    }
                                    style={getArrowStyle(
                                      "subscriberName",
                                      "descending"
                                    )}
                                  />
                                </span>
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Service Name
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Requested Time
                                <span style={{ cursor: "pointer" }}>
                                  <ArrowDropUpIcon
                                    onClick={() =>
                                      sortList("requestedTime", "ascending")
                                    }
                                    style={{
                                      ...getArrowStyle(
                                        "requestedTime",
                                        "ascending"
                                      ),
                                      marginRight: "-10px",
                                    }}
                                  />
                                  <ArrowDropDownIcon
                                    onClick={() =>
                                      sortList("requestedTime", "descending")
                                    }
                                    style={getArrowStyle(
                                      "requestedTime",
                                      "descending"
                                    )}
                                  />
                                </span>
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Preferred Time
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                style={{ verticalAlign: "middle" }}
                              >
                                Update
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.length > 0 ? (
                              list.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.subscriberName}</td>
                                  <td>{item.serviceName}</td>
                                  <td>{item.requestedTime}</td>
                                  <td>{item.preferredDate}</td>
                                  <td>
                                    <span
                                      style={{
                                        color:
                                          item.color === "amber"
                                            ? "#FFBF00"
                                            : item.color,
                                      }}
                                    >
                                      {item.completionStatus}
                                    </span>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/dashboard/serviceTaskList/${item.subscriberID}`}
                                      style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                      }}
                                    >
                                      <i className="bi bi-pencil-fill edit-btn-color"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7">No Service Request</td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default DashboardSaathiHome;
