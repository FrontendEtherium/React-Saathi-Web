import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { imagePath } from "../../ImagePath";
import { baseUrl } from "../../ApiPath";

const SaathiList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/admin-users/saathi/subscribers`
        );
        const activeUsers = res.data.filter((user) => user.status === 1);
        const sortedUsers = activeUsers.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        setList(sortedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center align-items-center mt-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4>List of Saathis</h4>
                </div>
              </div>
              <hr />
              <div>
                <table className="table table-bordered table-striped table-font-size">
                  <thead>
                    <tr className="table-info">
                      <th scope="col" className="col-1">
                        S.No
                      </th>
                      <th scope="col" className="col-5">
                        Saathi Name
                      </th>
                      <th scope="col" className="col-6">
                        Subscribers Associated
                      </th>
                      <th scope="col" className="col-6">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length > 0 ? (
                      list.map((item, index) => {
                        const picturePath = item.picturePath
                          ? `${imagePath}${item.picturePath.split("webapps/")[1]}`
                          : null;

                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <Avatar
                                    alt={`${item.firstName} ${item.lastName}`}
                                    src={item.picturePath}
                                    sx={{ width: 34, height: 34 }}
                                  />
                                </div>
                                <div>
                                  {item.firstName} {item.lastName}
                                </div>
                              </div>
                            </td>
                            <td>
                              {item.subscribers && item.subscribers.length > 0 ? (
                                <ol>
                                  {item.subscribers.map((subscriber, subIndex) => (
                                    <li key={subIndex}>
                                      {subscriber.firstName} {subscriber.lastName}
                                    </li>
                                  ))}
                                </ol>
                              ) : (
                                <span></span>
                              )}
                            </td>
                            <td>5</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">No data available</td>
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

export default SaathiList;
