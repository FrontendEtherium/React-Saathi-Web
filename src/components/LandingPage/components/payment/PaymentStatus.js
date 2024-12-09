import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PaymentStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  const [paymentDetail, setPaymentDetail] = useState();
  const [status, setStatus] = useState("loading"); // "loading", "success", or "failed"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://saathi.etheriumtech.com:444/Saathi/cashfree/order/${orderId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setPaymentDetail(json);

        if (json.orderStatus === "PAID") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setStatus("failed");
      }
    };

    fetchData();
  }, [orderId]);

  const handleGoToDashboard = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ action: "goToDashboard" })
    );
  };

  if (status === "loading") {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Loading...</h1>
          <p style={styles.message}>Fetching payment details, please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {status === "success" ? (
        <div style={styles.content}>
          <h1 style={styles.title}>Payment Successful!</h1>
          <p style={styles.message}>
            Thank you for your purchase! Your transaction was completed
            successfully.
          </p>
          <div style={styles.details}>
            <p>
              <strong>Order ID:</strong> {paymentDetail?.orderID}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{paymentDetail?.amount}{" "}
              {paymentDetail?.currency}
            </p>
          </div>
          <button style={styles.button} onClick={handleGoToDashboard}>
            Go to App
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          <h1 style={{ ...styles.title, color: "#D32F2F" }}>Payment Failed</h1>
          <p style={styles.message}>
            Unfortunately, your payment could not be processed.
          </p>
          <div style={styles.details}>
            <p>
              <strong>Order ID:</strong> {paymentDetail?.orderID}
            </p>
            <p>
              <strong>Status:</strong> {paymentDetail?.orderStatus}
            </p>
          </div>
          <button style={styles.button} onClick={handleGoToDashboard}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  content: {
    textAlign: "center",
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "26px",
    color: "#333",
    fontWeight: "bold",
  },
  message: {
    fontSize: "16px",
    color: "#666",
    margin: "10px 0",
    lineHeight: "1.6",
  },
  details: {
    fontSize: "15px",
    color: "#555",
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    margin: "20px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default PaymentStatus;
