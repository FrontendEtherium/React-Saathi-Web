import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../ApiPath";
import { useLocation, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

function Payment() {
  const location = useLocation();
  const [subscriberId, setSubscriberId] = useState();
  const [packageId, setPackageId] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subscriberId = queryParams.get("subscriberId");
    const packageId = queryParams.get("packageId");

    console.log("Subscriber ID:", subscriberId);
    setSubscriberId(subscriberId);

    console.log("Package ID:", packageId);
    setPackageId(packageId);
    handleOrder(subscriberId, packageId);
    // Add your payment processing logic here using subscriberId and packageId
  }, [location]);
  const handleOrder = async (subscriberId, packageId) => {
    console.log();

    try {
      // Assuming `subscriberId` and `packageId` are available within the scope
      const response = await fetch(`${baseUrl}/subscribers/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberID: parseInt(subscriberId),
          packageID: packageId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const json = await response.json();
      console.log("json", json);

      // Load Cashfree
      const cashfree = await load({
        mode: "production", 
      });

      let checkoutOptions = {
        paymentSessionId: json.paymentSessionID,
        redirectTarget: "_self",
        returnUrl: `https://saathi.etheriumtech.com/payment/status?order_id=${json.orderID}`,
      };

      cashfree.checkout(checkoutOptions);

      // Set order details after successful payment initialization
      setOrderDetail(json);
    } catch (error) {
      console.error("Order creation error:", error);
    }
  };

  return <div className=" flex bg-white"></div>;
}

export default Payment;
