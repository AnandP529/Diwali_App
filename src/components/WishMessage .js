import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishMessage.css";

const WishMessage = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("paymentDetails"));
    if (details) {
      setPaymentDetails(details);

      // Generate random Purchase ID and Shipping ID
      const purchaseId = "AKF" + Math.floor(100000 + Math.random() * 900000);
      const shippingId = "SHIP" + Math.floor(100000 + Math.random() * 900000);

      // Random shipping partner
      const partners = ["BlueDart", "FedEx", "DHL", "India Post"];
      const shippingPartner = partners[Math.floor(Math.random() * partners.length)];

      // Expected delivery date 3–7 days from now
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + Math.floor(Math.random() * 5) + 3);
      const expectedDelivery = deliveryDate.toDateString();

      setPurchaseInfo({
        purchaseId,
        shippingId,
        shippingPartner,
        expectedDelivery
      });
    }
  }, []);

  const goHome = () => {
    localStorage.removeItem("paymentDetails");
    navigate("/");
  };

  if (!paymentDetails || !purchaseInfo) return <p>Loading...</p>;

  return (
    <div className="wish-page">
      <h1>🎉 Thank You for Purchasing from AK Fireworks! 🎉</h1>
      <h2>✨ Wishing You a Joyful & Safe Diwali! ✨</h2>

      <div className="purchase-info">
        <p><strong>Total Amount Paid:</strong> ₹{paymentDetails.total}</p>
        <p><strong>Payment Method:</strong> {paymentDetails.method}</p>
        <p><strong>Purchase ID:</strong> {purchaseInfo.purchaseId}</p>
        <p><strong>Shipping ID:</strong> {purchaseInfo.shippingId}</p>
        <p><strong>Shipping Partner:</strong> {purchaseInfo.shippingPartner}</p>
        <p><strong>Expected Delivery:</strong> {purchaseInfo.expectedDelivery}</p>
      </div>

      <button className="home-btn" onClick={goHome}>
        Go to Home
      </button>
    </div>
  );
};

export default WishMessage;
