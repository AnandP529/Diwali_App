import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  // Individual Buy Now
  const handleBuyNow = (item) => {
    const billing = JSON.parse(localStorage.getItem("billing")) || [];
    const existingIndex = billing.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      billing[existingIndex].quantity += item.quantity;
    } else {
      billing.push(item);
    }
    localStorage.setItem("billing", JSON.stringify(billing));
    navigate("/billing");
  };

  // Global Buy Now for all cart items
  const handleBuyAll = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    const billing = JSON.parse(localStorage.getItem("billing")) || [];
    cartItems.forEach((item) => {
      const index = billing.findIndex((i) => i.id === item.id);
      if (index >= 0) billing[index].quantity += item.quantity;
      else billing.push(item);
    });
    localStorage.setItem("billing", JSON.stringify(billing));
    navigate("/billing");
  };

  return (
    <div className="cart-page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-container">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <p>Total: ₹{item.price * item.quantity}</p>
                  <div className="cart-buttons">
                    <button
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Tax (18%): ₹{tax.toFixed(2)}</p>
            <h3>Final Total: ₹{total.toFixed(2)}</h3>
            {/* Global Buy Now Button */}
            <button className="global-buy-btn" onClick={handleBuyAll}>
              Buy Items
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
