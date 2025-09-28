import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // Detect if we are on product details page
  const isProductDetails = location.pathname.startsWith("/product/");

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>AK 🪔</h2>
      </div>

      <div className="nav-links">
        {!isProductDetails && (
          <>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/address">Address</Link>
          </>
        )}
        {/* Always show Cart and Billing */}
        <Link to="/cart">Cart</Link>
        {isProductDetails && <Link to="/billing">Billing</Link>}
      </div>

      <div className="nav-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            {!isProductDetails && <Link to="/signin" className="signin-button">Sign In</Link>}
            {!isProductDetails && <Link to="/signup" className="signup-button">Sign Up</Link>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
