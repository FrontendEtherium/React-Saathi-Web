import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../ApiPath';

const MyAccount = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin-users`);
        // Filter users with status 1
        const activeUsers = res.data.filter(user => user.status == 1);
        // Sort by createdDate in descending order (latest first)
        const sortedUsers = activeUsers.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

        setList(sortedUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {

    const confirmation = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');

    if (confirmation) {
    const AdMap = {
      status: 0,
    };

    const formData = new FormData();
    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });

    try {
      const response = await axios.post(`${baseUrl}/admin-users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        // Filter the list locally after deleting
        const updatedList = list.filter(user => user.adminUserID !== id);
        setList(updatedList);
      } else {
        console.error('An error occurred. Please contact the development team.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  };

  return (
    <div>
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="mt-2">
                <h4>List of Users</h4>
                
              </div>
            </div>
            <hr />
            <div>
              <table className="table table-striped  table-bordered table-font-size">
                <thead>
                  <tr  class="table-info">
                    <th scope="col">S.No</th>
                    <th scope="col">User Type</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Edit/Delete</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? list.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.userType}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.contactNo}</td>
                      <td>
                        <span className="text-decoration-none me-3">
                          <Link to={`/dashboard/updateAdminUsers/${item.adminUserID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i className="bi bi-pencil-fill edit-btn-color"></i>
                          </Link>
                        </span>
                        <span>
                          <i
                            className="bi bi-trash3-fill delete-btn-color"
                            onClick={() => handleDelete(item.adminUserID)}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7">No data available</td>
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
}

export default MyAccount;
