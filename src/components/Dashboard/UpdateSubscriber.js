import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../ApiPath";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UpdateSubscriber = () => {
  //states for subscriber

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [middle, setMiddle] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [selectedOption, setSelectedOption] = useState("Admin");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState();
  const [list, setList] = useState("");
  const [subId, setSubId] = useState("");
  const [packages, setPackages] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [comments, setComments] = useState("");
  const [packageList, setPackageList] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPackageID, setSelectedPackageId] = useState("");
  const [amount, setAmount] = useState("");

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  //states for patron 1

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailPatron, setEmailPatron] = useState("");
  const [mobPatron, setMobPatron] = useState("");

  const [dobPatron, setDobPatron] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [commentsPatron, setCommentsPatron] = useState("");
  const [countryCodePatron, setCountryCodePatron] = useState("");
  const [relation, setRelation] = useState("");
  const [patron1Id, setPatron1Id] = useState("");

  //states for patron 2

  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [emailPatron2, setEmailPatron2] = useState("");
  const [mobPatron2, setMobPatron2] = useState("");

  const [dobPatron2, setDobPatron2] = useState("");
  const [city2, setCity2] = useState("");
  const [state2, setState2] = useState("");
  const [country2, setCountry2] = useState("");
  const [add1Second, setAdd1Second] = useState("");
  const [add2Second, setAdd2Second] = useState("");
  const [commentsPatron2, setCommentsPatron2] = useState("");
  const [countryCodePatron2, setCountryCodePatron2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [patron2Id, setPatron2Id] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${baseUrl}/subscribers/${id}`).then((res) => {
          console.log(res.data);
          console.log(res.data.firstName);
          // console.log("id",res.data.patrons[0].patronID)
          setFirst(res.data.firstName);
          setLast(res.data.lastName);
          setMob(res.data.contactNo);
          setEmail(res.data.email);
          setDob(res.data.dob);
          setBio(res.data.briefBio);
          setSelectedOption(res.data.userType);
          setPassword(res.data.password);
          setCountryCode(res.data.countryCode);
          setStatus(res.data.status);
          setPackages(res.data.packageName);
          setComments(res.data.comments);
          setSelectedPackage(res.data.packageID || "");
          setAmount(
            res.data.priceUSD && res.data.priceINR
              ? `USD ${res.data.priceUSD} / INR ${res.data.priceINR}`
              : ""
          );

          //states for patron 1

          if (res.data.patrons && res.data.patrons.length > 0) {
            const patron = res.data.patrons[0];
            setFirstName(patron.firstName || "");
            setLastName(patron.lastName || "");
            setEmailPatron(patron.email || "");
            setDobPatron(patron.dob || "");
            setCity(patron.city || "");
            setState(patron.state || "");
            setCountry(patron.country || "");
            setRelation(patron.relation || "");
            setAdd1(patron.address1 || "");
            setAdd2(patron.address2 || "");
            setMobPatron(patron.contactNo || "");
            setCommentsPatron(patron.comments || "");
            setCountryCodePatron(patron.countryCode || "");
            setPatron1Id(patron.patronID || "");
          } else {
            console.log("Patrons array is empty or undefined");
            // Optionally, set default values or handle the empty state here
          }

          //states for patron 2

          if (res.data.patrons && res.data.patrons.length > 1) {
            const secondPatron = res.data.patrons[1];
            setFirstName2(secondPatron.firstName || "");
            setLastName2(secondPatron.lastName || "");
            setEmailPatron2(secondPatron.email || "");
            setDobPatron2(secondPatron.dob || "");
            setCity2(secondPatron.city || "");
            setState2(secondPatron.state || "");
            setCountry2(secondPatron.country || "");
            setRelation2(secondPatron.relation || "");
            setAdd1Second(secondPatron.address1 || "");
            setAdd2Second(secondPatron.address2 || "");
            setMobPatron2(secondPatron.contactNo || "");
            setCommentsPatron2(secondPatron.comments || "");
            setCountryCodePatron2(secondPatron.countryCode || "");
            setPatron2Id(secondPatron.patronID || "");
          } else {
            console.log(
              "Second patron does not exist or patrons array has fewer than two elements"
            );
            // Optionally, set default values or handle the empty state here
          }
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();

    const fetchPackageList = async () => {
      axios
        .get(`${baseUrl}/subscription-package/active`)
        .then((res) => {
          console.log("packagess", res.data);
          console.log("packaged", res.data[0].packageID);
          setPackageList(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchPackageList();
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard/list");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedNumber = `+${mob.slice(0, countryCode.length)}-${mob.slice(
      countryCode.length
    )}`;

    axios
      .put(`${baseUrl}/subscribers/${id}`, {
        firstName: first,
        lastName: last,
        email: email,
        contactNo: formattedNumber,
        countryCode: countryCode,
        status: status,
        updatedBy: parseInt(userId),
        comments: comments,
        packageID: parseInt(selectedPackage),
        creditCard: {
          nameOnCard: cardName,
          creditCardNumber: cardNo,
          expiryDate: cardExpiry,
          cvv: cardCvv,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Subscriber Updated successfully!!");
        }
        //   else if (response.data === 0) {
        //     setAlert('Company not created. Please check all fields and try again.');
        //   }
        else {
          setAlert("An error occurred. Please contact the development team.");
        }

        setTimeout(() => {
          setAlert("");
          // navigate('/dashboard/list')
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 500) {
          setAlert("Some error occured. Please try again later");
        } else if (err.status == 400) {
          setAlert("Some error occured. Please try again later");
        } else {
          setAlert(err.response.data);
        }
        setTimeout(() => {
          setAlert("");
        }, 5000); // Hide alert after 3 seconds
      });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    const formattedNumber = `+${mobPatron.slice(0,countryCodePatron.length)}-${mobPatron.slice(
      countryCodePatron.length
    )}`;


    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: emailPatron,
      dob: dobPatron,
      contactNo: formattedNumber,
      countryCode: countryCodePatron,
      updatedBy: parseInt(userId),
      address1: add1,
      address2: add2,
      city: city,
      state: state,
      country: country,
      relation: relation,
      subscriberID: parseInt(id),
      comments: commentsPatron,
    };

    axios
      .put(`${baseUrl}/patrons/${patron1Id}`, payload)
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Patron Details Updated successfully!!");
        } else {
          setAlert("An error occurred. Please contact the development team.");
        }

        setTimeout(() => {
          setAlert("");
          // navigate('/dashboard')
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 500) {
          setAlert("Some error occured. Please try again later");
        } else if (err.status == 400) {
          setAlert("Some error occured. Please try again later");
        } else {
          setAlert(err.response.data);
        }
        setTimeout(() => {
          setAlert("");
        }, 5000); // Hide alert after 3 seconds
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    const formattedNumber1 = `+${mobPatron2.slice(0,countryCodePatron2.length)}-${mobPatron2.slice(
      countryCodePatron2.length
    )}`;

    const payload = {
      firstName: firstName2,
      lastName: lastName2,
      email: emailPatron2,
      dob: dobPatron2,
      contactNo: formattedNumber1,
      countryCode: countryCodePatron2,
      updatedBy: parseInt(userId),
      address1: add1Second,
      address2: add2Second,
      city: city2,
      state: state2,
      country: country2,
      relation: relation2,
      subscriberID: parseInt(id),
      comments: commentsPatron2,
    };

    axios
      .put(`${baseUrl}/patrons/${patron2Id}`, payload)
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Patron Details Updated successfully!!");
        } else {
          setAlert("An error occurred. Please contact the development team.");
        }

        setTimeout(() => {
          setAlert("");
          // navigate('/dashboard')
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 500) {
          setAlert("Some error occured. Please try again later");
        } else if (err.status == 400) {
          setAlert("Some error occured. Please try again later");
        } else {
          setAlert(err.response.data);
        }
        setTimeout(() => {
          setAlert("");
        }, 5000); // Hide alert after 3 seconds
      });
  };

  return (
    <div>
      <div>
        <div className="d-flex">
          <Container className="justify-content-center aligh-items-center mt-5 ml-5 px-5">
            <Card className="shadow-sm pb-3">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Update Subscriber Details</h4>
                  </div>
                </div>
                <hr />
                <div>
                  {/* Consolidated Form */}
                  <div style={{ position: "relative" }}>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder="First name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={first}
                            onChange={(event) => setFirst(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Last name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={last}
                            onChange={(event) => setLast(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Username
                          </Form.Label>
                          <Form.Control
                            placeholder="Username"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                          />
                        </Col>

                        {/* <Col className="p-3">
            <Row className="align-items-center">
    
                <Col xs="auto" lg={2}>
                <Form.Label className="label-style">Code</Form.Label>
                    <Form.Select
                        style={{ padding: '8px', fontSize: '12px' }}
                        aria-label="Select Country Code"
                        value={countryCode}
                        onChange={(event) => setCountryCode(event.target.value)}
                    >
                        <option>+91</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+44">+44 (UK)</option>
            
                    </Form.Select>
                </Col>

      
                <Col>
                <Form.Label className="label-style">Phone Number</Form.Label>
                    <Form.Control
                        placeholder="Phone Number"
                        style={{ padding: '8px', fontSize: '12px' }}
                        value={mob}
                        onChange={(event) => setMob(event.target.value)}
                        required
                    />
                </Col>
            </Row>
        </Col> */}
                        <Col xs="auto" className="p-3" lg={6}>
                          <Form.Label className="label-style">
                            Phone Number
                          </Form.Label>
                          <div className="w-100">
                            <PhoneInput
                              country={"in"}
                              value={mob}
                              onChange={(value, country) => {
                                setMob(value);
                                setCountryCode(country.dialCode);
                              }}
                              inputStyle={{ width: "100%" }} // Ensure full width
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Package
                          </Form.Label>
                          <Form.Select
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={selectedPackage}
                            onChange={(event) => {
                              const selectedPackageId = event.target.value;
                              setSelectedPackage(event.target.value);
                              console.log(
                                "Selected package:",
                                event.target.value
                              );

                              // Find the selected package based on packageID
                              const selectedPkg = packageList.find(
                                (pkg) => pkg.packageID == selectedPackageId
                              );
                              console.log("Selected package:", selectedPkg);
                              // Set the amount to the package's price if the package is found
                              if (selectedPkg) {
                                console.log(selectedPkg.priceUSD);
                                const price = `USD ${selectedPkg.priceUSD}  / INR ${selectedPkg.priceINR}`;
                                setAmount(price);
                              } else {
                                setAmount(""); // Reset if no package is found
                              }
                            }}
                            required
                          >
                            <option value="">Select a package</option>
                            {packageList &&
                              packageList.map((pkg) => (
                                <option
                                  key={pkg.packageID}
                                  value={pkg.packageID}
                                >
                                  {pkg.packageName}
                                </option>
                              ))}
                          </Form.Select>
                        </Col>

                        {/* <Col className="p-3">
        <Form.Label className="label-style">Status</Form.Label>
            <Form.Select
                style={{ padding: '8px', fontSize: "12px" }}
                aria-label="Select Option"
                value={status}
                onChange={(event) => setStatus(event.target.value)} // Corrected setStatus
                required
            >
                <option value="">Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
            </Form.Select>
        </Col> */}
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Name on the Card
                          </Form.Label>
                          <Form.Control
                            placeholder="Name on the Card"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardName}
                            onChange={(event) =>
                              setCardName(event.target.value)
                            }
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Credit Card Number
                          </Form.Label>
                          <Form.Control
                            placeholder="Credit card Number"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardNo}
                            onChange={(event) => setCardNo(event.target.value)}
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Expiry Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Expiry Date"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardExpiry}
                            onChange={(event) =>
                              setCardExpiry(event.target.value)
                            }
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">CVV</Form.Label>
                          <Form.Control
                            placeholder="CVV"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardCvv}
                            onChange={(event) => setCardCvv(event.target.value)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        {/* <Col className="p-3">
            <Form.Control
            type="password"
                placeholder="Password"
                style={{ padding: '8px', fontSize: "12px" }}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
        </Col> */}
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Add Comments
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Add Comments"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={comments}
                            onChange={(event) =>
                              setComments(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      {selectedOption == "Saathi" && (
                        <Row>
                          <Col className="p-3">
                            <Form.Control
                              as="textarea"
                              placeholder="Brief Bio"
                              style={{ padding: "8px", fontSize: "12px" }}
                              rows={3}
                              value={bio}
                              onChange={(event) => setBio(event.target.value)}
                            />
                          </Col>
                        </Row>
                      )}

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#009efb",
                            borderColor: "#009efb",
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Update
                        </Button>

                        <Button
                          variant="secondary"
                          type="button"
                          onClick={handleCancel}
                          style={{
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>

                    {alert && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 999, // Ensures it appears above the form
                          width: "100%", // Adjust width if needed
                          display: "flex",
                          justifyContent: "center", // Centers alert horizontally
                          alignItems: "center", // Ensures proper alignment in flexbox
                        }}
                      >
                        <Alert variant="success" className="h6 w-50">
                          {alert}
                        </Alert>
                      </div>
                    )}
                  </div>{" "}
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm pb-3 mt-5">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Update Patron 1 Details</h4>
                  </div>
                </div>
                <hr />
                <div>
                  {/* Consolidated Form */}
                  <div style={{ position: "relative" }}>
                    <Form onSubmit={handleSubmit1}>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder=" Patron's First name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="  Patron's Last name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">Email</Form.Label>
                          <Form.Control
                            placeholder="Patron's Email"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={emailPatron}
                            onChange={(event) =>
                              setEmailPatron(event.target.value)
                            }
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Date of Birth
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="D.O.B"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={dobPatron}
                            onChange={(event) =>
                              setDobPatron(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        {/* <Col className="p-3">
      <Row className="align-items-center">
    <Col xs="auto" lg={2}>
    <Form.Label className="label-style">Code</Form.Label>
      <Form.Select
        style={{ padding: '8px', fontSize: '12px' }}
        aria-label="Select Country Code"
        value={countryCodePatron} 
        onChange={(event) => setCountryCodePatron(event.target.value)} 
      >
        <option >+91</option>
        <option value="+91">+91 (India)</option>
        <option value="+44">+44 (UK)</option>
      </Form.Select>
    </Col>
    
    <Col>
    <Form.Label className="label-style">Phone No</Form.Label>
      <Form.Control
        placeholder="Patron's Phone Number"
        style={{ padding: '8px', fontSize: '12px' }}
        value={mobPatron}
        onChange={(event) => setMobPatron(event.target.value)} 
        required
      />
    </Col>
  </Row>
        </Col> */}

                        <Col xs="auto" className="p-3" lg={6}>
                          <Form.Label className="label-style">
                            Phone Number
                          </Form.Label>
                          <div className="w-100">
                            <PhoneInput
                              country={"in"}
                              value={mobPatron}
                              onChange={(value, country) => {
                                setMobPatron(value);
                                setCountryCodePatron(country.dialCode);
                              }}
                              inputStyle={{ width: "100%" }} // Ensure full width
                            />
                          </div>
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Relation with Subscriber
                          </Form.Label>
                          <Form.Control
                            placeholder="Patron's Relation with Subscriber"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={relation}
                            onChange={(event) =>
                              setRelation(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Address Line 1
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Address line 1"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={add1}
                            onChange={(event) => setAdd1(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Address Line 2
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Address Line 2"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={add2}
                            onChange={(event) => setAdd2(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">City</Form.Label>
                          <Form.Control
                            placeholder="City"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">State</Form.Label>
                          <Form.Control
                            placeholder="State"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Country
                          </Form.Label>
                          <Form.Control
                            placeholder="Country"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Add Comments
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Add Comments"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={commentsPatron}
                            onChange={(event) =>
                              setCommentsPatron(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#009efb",
                            borderColor: "#009efb",
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Update
                        </Button>

                        <Button
                          variant="secondary"
                          type="button"
                          onClick={handleCancel}
                          style={{
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>

                    {alert && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 999, // Ensures it appears above the form
                          width: "100%", // Adjust width if needed
                          display: "flex",
                          justifyContent: "center", // Centers alert horizontally
                          alignItems: "center", // Ensures proper alignment in flexbox
                        }}
                      >
                        <Alert variant="success" className="h6 w-50">
                          {alert}
                        </Alert>
                      </div>
                    )}
                  </div>{" "}
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm pb-3 mt-5">
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div className="mt-2">
                    <h4>Update Patron 2 Details</h4>
                  </div>
                </div>
                <hr />
                <div>
                  {/* Consolidated Form */}
                  <div style={{ position: "relative" }}>
                    <Form onSubmit={handleSubmit2}>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder=" Patron's First name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={firstName2}
                            onChange={(event) =>
                              setFirstName2(event.target.value)
                            }
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="  Patron's Last name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={lastName2}
                            onChange={(event) =>
                              setLastName2(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">Email</Form.Label>
                          <Form.Control
                            placeholder="Patron's Email"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={emailPatron2}
                            onChange={(event) =>
                              setEmailPatron2(event.target.value)
                            }
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Date of Birth
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="D.O.B"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={dobPatron2}
                            onChange={(event) =>
                              setDobPatron2(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        {/* <Col className="p-3">
                          <Row className="align-items-center">
                          
                            <Col xs="auto" lg={2}>
                              <Form.Label className="label-style">
                                Code
                              </Form.Label>
                              <Form.Select
                                style={{ padding: "8px", fontSize: "12px" }}
                                aria-label="Select Country Code"
                                value={countryCodePatron2} 
                                onChange={(event) =>
                                  setCountryCodePatron2(event.target.value)
                                } 
                              >
                        
                                <option>+91</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+44">+44 (UK)</option>
                          
                              </Form.Select>
                            </Col>

                      
                            <Col>
                              <Form.Label className="label-style">
                                Phone No
                              </Form.Label>
                              <Form.Control
                                placeholder="Patron's Phone Number"
                                style={{ padding: "8px", fontSize: "12px" }}
                                value={mobPatron2} 
                                onChange={(event) =>
                                  setMobPatron2(event.target.value)
                                } 
                                required
                              />
                            </Col>
                          </Row>
                        </Col> */}

<Col xs="auto" className="p-3" lg={6}>
  <Form.Label className="label-style">Phone Number</Form.Label>
  <div className="w-100">
    <PhoneInput
      country={'in'}
      value={mobPatron2}
      onChange={(value, country) => {
        setMobPatron2(value);
        setCountryCodePatron2(country.dialCode);
      }}
      inputStyle={{ width: '100%' }} // Ensure full width
    />
  </div>
</Col>

                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Relation with Subscriber
                          </Form.Label>
                          <Form.Control
                            placeholder="Patron's Relation with Subscriber"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={relation2}
                            onChange={(event) =>
                              setRelation2(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Address Line 1
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Address line 1"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={add1Second}
                            onChange={(event) =>
                              setAdd1Second(event.target.value)
                            }
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Address Line 2
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Address Line 2"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={add2Second}
                            onChange={(event) =>
                              setAdd2Second(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">City</Form.Label>
                          <Form.Control
                            placeholder="City"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={city2}
                            onChange={(event) => setCity2(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">State</Form.Label>
                          <Form.Control
                            placeholder="State"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={state2}
                            onChange={(event) => setState2(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Country
                          </Form.Label>
                          <Form.Control
                            placeholder="Country"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={country2}
                            onChange={(event) =>
                              setCountry2(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Add Comments
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Add Comments"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={commentsPatron2}
                            onChange={(event) =>
                              setCommentsPatron2(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#009efb",
                            borderColor: "#009efb",
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Update
                        </Button>

                        <Button
                          variant="secondary"
                          type="button"
                          onClick={handleCancel}
                          style={{
                            color: "white",
                            margin: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>

                    {alert && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 999, // Ensures it appears above the form
                          width: "100%", // Adjust width if needed
                          display: "flex",
                          justifyContent: "center", // Centers alert horizontally
                          alignItems: "center", // Ensures proper alignment in flexbox
                        }}
                      >
                        <Alert variant="success" className="h6 w-50">
                          {alert}
                        </Alert>
                      </div>
                    )}
                  </div>{" "}
                </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubscriber;
