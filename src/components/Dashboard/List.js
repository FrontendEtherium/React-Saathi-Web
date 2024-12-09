import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

const List = () => {
  const userId = localStorage.getItem("userId");

  const [list, setList] = useState("");

  useEffect(() => {
    console.log("hello");
    const fetchData = async () => {
      axios
        .get(
          `${baseUrl}/admin-users/${userId}/subscribers`
        )
        .then((res) => {
          // Filter the data where status is 1
          const filteredData = res.data.filter(
            (subscriber) => subscriber.status === 1
          );

          console.log(filteredData[0]?.firstName);
          setList(filteredData);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (confirmation) {
      try {
        const response = await axios.put(
          `${baseUrl}/subscribers/${id}`,
          {
            status: 0,
          }
        );

        if (response.data) {
          // Filter the list locally after deleting
          const updatedList = list.filter((user) => user.subscriberID !== id);
          setList(updatedList);
        } else {
          console.error(
            "An error occurred. Please contact the development team."
          );
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4>List of Subscribers</h4>
                </div>
              </div>
              <hr />
              <div>
                <table class="table  table-bordered table-striped table-font-size">
                  <thead>
                    <tr class="table-info">
                      <th scope="col">S.No</th>
                      <th scope="col">Subscriber Name</th>
                      <th scope="col">Patron Name</th>
                      <th scope="col">Contact No.</th>
                      <th scope="col">Email</th>
                      <th scope="col">Package</th>
                      <th scope="col">Status</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length > 0 ? (
                      list.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>
                          <td>
                            {item.patrons && item.patrons.length > 0 ? (
                              <ol>
                                {item.patrons.map((patron, patronIndex) => (
                                  <li key={patronIndex}>
                                    {patron.firstName} {patron.lastName}
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <span style={{color:"red" ,marginLeft:"20px"}}> Pending</span>
                            )}
                          </td>
                          <td>{item.contactNo}</td>
                          <td>{item.email}</td>
                          <td>{item.packageName}</td>
                          <td>Active</td>
                          <td>
                            <span className="text-decoration-none me-3">
                              <Link
                                to={`/dashboard/updateSubscriber/${item.subscriberID}`}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                <i className="bi bi-pencil-fill edit-btn-color"></i>
                              </Link>
                            </span>
                            {/* <span>
                          <i
                            className="bi bi-trash3-fill delete-btn-color"
                            onClick={() => handleDelete(item.subscriberID)}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </span> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Subscriber</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default List;
