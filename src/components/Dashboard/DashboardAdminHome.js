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

import { baseUrl } from "../../ApiPath";

const DashboardAdminHome = () => {
  const userId = localStorage.getItem("userId");
  const [list, setList] = useState([]);
  const [services, setServices] = useState({});
  const [subList, setSubList] = useState(null);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      axios
        .get(`${baseUrl}/admin-users/combined/saathi-subscriber-counts`)
        .then((res) => {
          setServices(res.data);
          console.log(services, "services");
          if (res.data.saathiServiceSummary?.packageDetails?.length > 0) {
            console.log(
              "First package name:",
              res.data.saathiServiceSummary.packageDetails[0].packageName
            );
          }
        })

        .catch((err) => console.log(err));
    };

    fetchServices();

    // const fetchList = async () => {
    //   try {
    //     const res = await axios.get(
    //       `${baseUrl}/subscribers/without-saathi`
    //     );
    //     console.log(res.data[0].firstName);
    //     // setSub(res.data.length);
    //     if (res.data && res.data.length > 0) {
    //       console.log(res.data[0].firstName);
    //       setSub(res.data.length);
    //       console.log("listtt")
    //     } else {
    //       console.log('No subscribers without Saathi found');
    //       setSub(0);
    //       console.log("listtt")
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    const fetchList = async () => {
      try {
        const res = await axios.get(`${baseUrl}/subscribers/without-saathi`);
        console.log("API Response:", res.data); // Log the entire response

        if (res.data && res.data.length > 0) {
          console.log(res.data[0].firstName);
          setSub(res.data.length);
          console.log("listtt");
        } else {
          console.log("No subscribers without Saathi found");
          setSub(0);
          console.log("listtt");
        }
      } catch (err) {
        console.error("Error fetching list:", err); // Log any errors
      }
    };

    fetchList();

    const fetchWithSaathiList = async () => {
      try {
        const res = await axios.get(`${baseUrl}/subscribers/with-saathi`);
        console.log("new response", res.data[0].subscriber.firstName);
        // setSubList(res.data.length);
        if (res.data && res.data.length > 0) {
          console.log(res.data[0].firstName);
          setSubList(res.data.length);
          console.log("list");
        } else {
          console.log("No subscribers with Saathi found");
          setSubList(0);
          console.log("list");
        }
        console.log("list", subList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWithSaathiList();
  }, [userId]);

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
                            <div> Users </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            >
                              {services.totalSubscriberCounts}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {/* 
                         {/* {services?.packageDetails?.length > 0 && services.packageDetails.map((service, index) => (
  <div key={index} className="d-flex justify-content-between align-items-center">
    <div className="font-14">{service.packageName}</div>
    <div className="font-20">{service.subscriberCount}</div>
  </div>
))} */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Registered</div>
                              <div className="font-20">
                                {services?.subscriberCounts?.RegisteredUsers}
                              </div>
                              {/* <div className="font-20">20</div> */}
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Subscribers</div>
                              <div className="font-20">
                                {services?.subscriberCounts?.totalSubscribers}
                              </div>
                            </div>

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
                            <div> Subscriptions </div>
                            <div
                              className="float-end fw-bold font-20 appColor"
                              style={{ color: "#009efb" }}
                            >
                              {services.totalSubscriptions}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {services?.saathiServiceSummary?.packageDetails
                              ?.length > 0 ? (
                              services.saathiServiceSummary.packageDetails
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
                                ))
                            ) : (
                              <span></span>
                            )}

                            {/* <div className="d-flex justify-content-between align-items-center">
        <div className="font-14">Gold</div>
        <div className="font-20">5</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="font-14">Silver</div>
        <div className="font-20">5</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="font-14">Bronze</div>
        <div className="font-20">5</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="font-14">Basic</div>
        <div className="font-20">5</div>
      </div> */}

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
                            <div> Saathis </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            >
                              {services?.saathiCounts?.totalSaathi}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {/* {services?.serviceBreakdown?.map((service, index) => (
      <div key={index} className="d-flex justify-content-between align-items-center">
        <div className="font-14">{service.serviceName}</div>
        <div className="font-20">{service.pending}</div>
      </div>
    ))} */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Assigned</div>
                              <div className="font-20">
                                {services?.saathiCounts?.assignedSaathi}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Unassigned</div>
                              <div className="font-20">
                                {services?.saathiCounts?.unassignedSaathi}
                              </div>
                            </div>

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4} className="d-flex mt-5">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Package Services </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            >
                              {services.totalPackageServices}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {/* {services?.serviceBreakdown?.map((service, index) => (
      <div key={index} className="d-flex justify-content-between align-items-center">
        <div className="font-14">{service.serviceName}</div>
        <div className="font-20">{service.pending}</div>
      </div>
    ))} */}

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Completed</div>
                              <div
                                className="font-20"
                                style={{ color: "green" }}
                              >
                                {services.totalCompletedPackageServices}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Pending</div>
                              <div className="font-20" style={{ color: "red" }}>
                                {services.totalPendingPackageServices}
                              </div>
                            </div>

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4} className="d-flex mt-5">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Ala-Carte Services</div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            >
                              {services.totalAlaCarteServices}
                            </div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            {/* {services?.serviceBreakdown?.map((service, index) => (
      <div key={index} className="d-flex justify-content-between align-items-center">
        <div className="font-14">{service.serviceName}</div>
        <div className="font-20">{service.pending}</div>
      </div>
    ))} */}

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Completed</div>
                              <div
                                className="font-20 "
                                style={{ color: "green" }}
                              >
                                {services.totalCompletedAlaCarteServices}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Pending</div>
                              <div className="font-20" style={{ color: "red" }}>
                                {services.totalPendingAlaCarteServices}
                              </div>
                            </div>

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4} className="d-flex mt-5">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div> Saathi Assignment </div>
                            <div
                              className="float-end fw-bold font-20"
                              style={{ color: "#009efb" }}
                            ></div>
                          </div>
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="" style={{ color: "gray" }}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">Users with Saathi</div>
                              <div
                                className="font-20"
                                style={{ color: "green" }}
                              >
                                {subList}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-14">
                                Users Without Saathi
                              </div>
                              <div className="font-20" style={{ color: "red" }}>
                                {" "}
                                {sub}
                              </div>
                            </div>

                            <div></div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default DashboardAdminHome;
