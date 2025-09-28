import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productList } from "../Productspage/ProductList";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status based on localStorage
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  useEffect(() => {
    if (productName) {
      const category = productName.replace(/-/g, " ");
      const selectedProducts = productList.filter(
        (p) => p.category === category
      );
      setProducts(selectedProducts);

      const initialQuantities = {};
      selectedProducts.forEach((p) => {
        initialQuantities[p.id] = 0;
      });
      setQuantities(initialQuantities);
    }
  }, [productName]);

  if (!products || products.length === 0) return <p>Loading...</p>;

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      alert("Please sign in to make a purchase!");
      navigate("/signin");
      return;
    }
    const billing = JSON.parse(localStorage.getItem("billing")) || [];
    const qty = quantities[product.id];
    if (qty === 0) return alert("Please select at least 1 quantity!");
    const index = billing.findIndex((item) => item.id === product.id);
    if (index >= 0) billing[index].quantity += qty;
    else billing.push({ ...product, quantity: qty });
    localStorage.setItem("billing", JSON.stringify(billing));
    alert(`${product.name} added to billing! Don't forget to check out other items too.`);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please sign in to add items to the cart!");
      navigate("/signin");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const qty = quantities[product.id];
    if (qty === 0) return alert("Please select at least 1 quantity!");
    const index = cart.findIndex((item) => item.id === product.id);
    if (index >= 0) cart[index].quantity += qty;
    else cart.push({ ...product, quantity: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart! <br/>
    Don't forget to explore other items too.`);
  };

  // Global Buy Now for all selected products
  const handleBuyAll = () => {
    if (!isLoggedIn) {
      alert("Please sign in to make a purchase!");
      navigate("/signin");
      return;
    }
    const billing = JSON.parse(localStorage.getItem("billing")) || [];
    let hasSelected = false;
    products.forEach((product) => {
      const qty = quantities[product.id];
      if (qty > 0) {
        hasSelected = true;
        const index = billing.findIndex((item) => item.id === product.id);
        if (index >= 0) billing[index].quantity += qty;
        else billing.push({ ...product, quantity: qty });
      }
    });
    if (!hasSelected) return alert("Please select at least 1 quantity for any product!");
    localStorage.setItem("billing", JSON.stringify(billing));
    alert("All selected products added to billing!");
  };

  // Global Add All to Cart
  const handleAddAllToCart = () => {
    if (!isLoggedIn) {
      alert("Please sign in to add items to the cart!");
      navigate("/signin");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let hasSelected = false;
    products.forEach((product) => {
      const qty = quantities[product.id];
      if (qty > 0) {
        hasSelected = true;
        const index = cart.findIndex((item) => item.id === product.id);
        if (index >= 0) cart[index].quantity += qty;
        else cart.push({ ...product, quantity: qty });
      }
    });
    if (!hasSelected) return alert("Please select at least 1 quantity for any product!");
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("All selected products added to cart!");
  };

  return (
    <div className="product-details-page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/products")}>
          &larr; Back
        </button>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.info}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <div className="quantity-selector">
                <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                <span>{quantities[product.id]}</span>
                <button onClick={() => updateQuantity(product.id, 1)}>+</button>
              </div>

              <p>
                <strong>Total:</strong> ₹{quantities[product.id] * product.price}
              </p>

              <div className="action-buttons">
                <button onClick={() => handleBuyNow(product)}>Buy Now</button>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="global-actions">
        <button onClick={handleBuyAll}>Buy All Selected Products</button>
        <button onClick={handleAddAllToCart}>Add All to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
