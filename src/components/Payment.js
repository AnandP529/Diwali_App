import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const [billingItems, setBillingItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedBilling = JSON.parse(localStorage.getItem("billing")) || [];
    setBillingItems(storedBilling);
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = billingItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handlePayment = () => {
    // Validate address and payment method
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !paymentMethod
    ) {
      return alert(
        "Please fill all required fields and select a payment method!"
      );
    }

    // Save payment details to localStorage
    const paymentDetails = {
      total: total.toFixed(2),
      method: paymentMethod,
      items: billingItems,
      address,
    };
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

    // Clear billing
    localStorage.removeItem("billing");

    // Redirect to WishMessage page
    navigate("/wish");
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>

      {/* Billing Summary */}
      <div className="billing-summary-section">
        <h2>Billing Summary</h2>
        {billingItems.length === 0 ? (
          <p>No items for billing!</p>
        ) : (
          <div className="billing-items">
            {billingItems.map((item) => (
              <div className="billing-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="billing-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="billing-totals">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Tax (18%): ₹{tax.toFixed(2)}</p>
              <h3>Final Amount: ₹{total.toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Address Section */}
      <div className="address-section">
        <h2>Shipping Address</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleAddressChange}
        />
      </div>

      {/* Payment Method */}
      <div className="payment-method-section">
        <h2>Payment Method</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
              checked={paymentMethod === "Credit/Debit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Net Banking
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
        </div>
      </div>

      {/* Confirm Payment */}
      <button className="confirm-payment-btn" onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
