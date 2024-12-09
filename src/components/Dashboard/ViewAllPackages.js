import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Badge,
  Collapse,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

const ViewAllPackages = () => {
  const [list, setList] = useState([]);
  const [openServiceIndex, setOpenServiceIndex] = useState(null); // For toggling service details
  const [showModal, setShowModal] = useState(false); // For opening/closing modal
  const [currentPackage, setCurrentPackage] = useState(null); // For storing the package being edited

  const user = localStorage.getItem("userType");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/subscription-package/active`
      );
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleServices = (index) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index); // Toggle services on click
  };

  const handleEditClick = (item) => {
    setCurrentPackage(item);
    setShowModal(true); // Open modal
  };

  const handleClose = () => setShowModal(false); // Close modal

  const handlePackageChange = (e) => {
    setCurrentPackage({ ...currentPackage, [e.target.name]: e.target.value });
  };

  const handleDelete = async (packageID) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (confirmation) {
      try {
        const updatedPackage = {
          status: 0,
        };
        await axios.put(
          `${baseUrl}/subscription-package/${packageID}`,
          updatedPackage
        );
        fetchData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  };

  const handleServiceStatusChange = (index, value) => {
    const updatedServices = [...currentPackage.packageServices];
    updatedServices[index].status = value;
    setCurrentPackage({ ...currentPackage, packageServices: updatedServices });
  };

  const handleSave = async () => {
    const url = `${baseUrl}/subscription-package/${currentPackage.packageID}`;
    const updatedPackage = {
      packageName: currentPackage.packageName,
      packageDescription: currentPackage.packageDescription,
      priceUSD: currentPackage.priceUSD,
      priceINR: currentPackage.priceINR,
      status: currentPackage.status,
      updatedBy: 1, // assuming the user ID of the updater is 1, adjust as necessary
      packageServices: currentPackage.packageServices.map((service) => ({
        serviceID: service.serviceID,
        frequency: service.frequency,
        frequencyUnit: service.frequencyUnit,
        priceUSD: service.priceUSD,
        priceINR: service.priceINR,
        status: service.status,
      })),
    };

    try {
      const response = await axios.put(url, updatedPackage);
      console.log("Updated successfully:", response.data);
      setList(
        list.map((pkg) =>
          pkg.packageID === currentPackage.packageID
            ? { ...pkg, ...updatedPackage }
            : pkg
        )
      );
      setShowModal(false); // Close modal after update
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  return (
    <div className="d-flex">
      <Container className="mt-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="mt-2">
                <h4 className="heading-color">List of Packages</h4>
              </div>
            </div>
            <hr />
            <Table
              striped
              bordered
              hover
              responsive
              className=" table-font-size"
            >
              <thead className="table-info">
                <tr>
                  <th className="text-center align-middle">S.No</th>
                  <th className="text-center align-middle">Package Name</th>
                  <th className="text-center align-middle">Description</th>
                  <th className="text-center align-middle">Price (INR)</th>
                  <th className="text-center align-middle">Services</th>
                  {user === "Admin" && (
                  <th className="text-center align-middle">Edit/Delete</th> )}
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.packageName}</td>
                        <td>{item.packageDescription}</td>
                        <td>₹{item.priceINR}</td>
                        <td>
                          {item.packageServices &&
                          item.packageServices.length > 0 ? (
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => toggleServices(index)}
                              aria-controls={`services-collapse-${index}`}
                              aria-expanded={openServiceIndex === index}
                              style={{
                                backgroundColor: "#009efb",
                                borderColor: "#009efb",
                                color: "white",
                                margin: "4px",
                                fontSize: "12px",
                              }}
                            >
                              {openServiceIndex === index
                                ? "Hide Services"
                                : `View Services (${item.packageServices.length})`}
                            </Button>
                          ) : (
                            <Badge bg="danger">No services</Badge>
                          )}
                        </td>

                        {user === "Admin" && (
                        <td>
                          <span className="text-decoration-none me-3">
                            <Link
                              to={`/dashboard/UpdatePackage/${item.packageID}`}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <i className="bi bi-pencil-fill edit-btn-color"></i>
                            </Link>
                          </span>
                          <span>
                            <i
                              className="bi bi-trash3-fill delete-btn-color"
                              onClick={() => handleDelete(item.packageID)}
                              style={{ cursor: "pointer" }}
                            ></i>
                          </span>
                        </td>
                        )}
                      </tr>
                      {item.packageServices &&
                        item.packageServices.length > 0 && (
                          <tr>
                            <td colSpan="6" style={{ padding: 0 }}>
                              <Collapse in={openServiceIndex === index}>
                                <div
                                  id={`services-collapse-${index}`}
                                  className="bg-light p-3"
                                >
                                  <strong>Services:</strong>
                                  <ul>
                                    {item.packageServices.map(
                                      (service, serviceIndex) => (
                                        <li key={serviceIndex}>
                                          <strong>{service.serviceName}</strong>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </Collapse>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No packages available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Edit Modal */}

      </Container>
    </div>
  );
};

export default ViewAllPackages;
