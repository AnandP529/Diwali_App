import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Billing.css";

const Billing = () => {
  const [billingItems, setBillingItems] = useState([]);
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedBilling = JSON.parse(localStorage.getItem("billing")) || [];
    setBillingItems(storedBilling);

    // Generate expected delivery date 3–7 days from today
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + Math.floor(Math.random() * 5) + 3);

    // Format: dd-mm-yyyy
    const formattedDate = `${String(deliveryDate.getDate()).padStart(2, "0")}-${String(
      deliveryDate.getMonth() + 1
    ).padStart(2, "0")}-${deliveryDate.getFullYear()}`;
    setExpectedDelivery(formattedDate);
  }, []);

  // Update quantity
  const updateQuantity = (id, delta) => {
    const updatedItems = billingItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setBillingItems(updatedItems);
    localStorage.setItem("billing", JSON.stringify(updatedItems));
  };

  // Remove item with confirmation to move to cart
  const removeItem = (item) => {
    const confirmMove = window.confirm(
      `${item.name} removed from billing! Do you want to add it back to Cart?`
    );

    const updatedBilling = billingItems.filter(i => i.id !== item.id);
    setBillingItems(updatedBilling);
    localStorage.setItem("billing", JSON.stringify(updatedBilling));

    if (confirmMove) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = cart.findIndex(i => i.id === item.id);
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += item.quantity;
      } else {
        cart.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.name} added back to Cart!`);
    }
  };

  const subtotal = billingItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handlePayment = () => {
    // Store payment details including total and expected delivery for WishMessage
    const paymentDetails = {
      total: total.toFixed(2),
      method: "Pending", // Will be set in payment page
      expectedDelivery
    };
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
    navigate("/payment"); // Navigate to actual Payment page
  };

  return (
    <div className="billing-page">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      <h1>Billing Summary</h1>
      {billingItems.length === 0 ? (
        <p>No products added for billing!</p>
      ) : (
        <div className="billing-container">
          {billingItems.map((item) => (
            <div className="billing-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="billing-info">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                
                <p>Total: ₹{item.price * item.quantity}</p>
                <button className="remove-btn" onClick={() => removeItem(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="billing-summary">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Tax (18%): ₹{tax.toFixed(2)}</p>
            <h3>Final Amount: ₹{total.toFixed(2)}</h3>
            <p><strong>Expected Delivery:</strong> {expectedDelivery}</p>
            <button className="pay-now-btn" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
