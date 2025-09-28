import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landingpage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Products from "./components/Productspage/Products";
import ProductDetails from "./components/Productspage/ProductDetails";
import Cart from "./components/Cart";
import Billing from "./components/Billing";
import Payment from "./components/Payment";
import WishMessage from "./components/WishMessage ";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedStatus);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<><LandingPage /><Contact /><Footer /></>} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/address" element={<Contact/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/wish" element={<WishMessage />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
