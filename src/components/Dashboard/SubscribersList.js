import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../ApiPath';



const SubscribersList = () => {

    const [list, setList] = useState("");

    
    useEffect(() => {

        console.log("hello")
        const fetchData = async () => {
       

        axios.get(`${baseUrl}/subscribers`)
        .then(res => {
            console.log(res.data[0].firstName)
            const activeUsers = res.data.filter(user => user.status === 1);
           // Sort by createdDate in descending order (latest first)
    const sortedUsers = activeUsers.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    
    setList(sortedUsers);


            // setList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
        };
        fetchData();
      }, []);

      const handleDelete = async (id) => {

        const confirmation = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    
        if (confirmation) {
       
    
        try {
          const response = await axios.put(`${baseUrl}/subscribers/${id}`,{

            "status":0
            
           })
    
          if (response.data) {
            // Filter the list locally after deleting
            const updatedList = list.filter(user => user.subscriberID !== id);
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
           <div>
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
<hr/>

<div>
  <table class="table  table-bordered  table-striped table-font-size">
  <thead>
    <tr  class="table-info">
      <th scope="col">S.No</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact Number</th>
      <th scope="col">Saathi Assigned</th>
      <th scope="col">Package</th>
      <th scope="col">Edit/Delete</th>
    </tr>
  </thead>
  <tbody>
                    {list.length > 0 ? list.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.contactNo}</td>
                        <td>{item.saathi?.firstName} {item.saathi?.lastName}</td>
                        <td>{item.packageName}</td>
                        <td>
                        <span className="text-decoration-none me-3">
                          <Link to={`/dashboard/updateAdminsubscriber/${item.subscriberID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i className="bi bi-pencil-fill edit-btn-color"></i>
                          </Link>
                        </span>
                        <span>
                          <i
                            className="bi bi-trash3-fill delete-btn-color"
                            onClick={() => handleDelete(item.subscriberID)}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </span>
                      </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="8">No data available</td>
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

    </div>
    </div>
  )
}

export default SubscribersList