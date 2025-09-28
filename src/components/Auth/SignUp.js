import React, { Component } from "react";
import "./Auth.css";
import { withRouter } from "./withRouter";

class SignUp extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save login state
    localStorage.setItem("isLoggedIn", "true");

    alert("Sign Up successful 🚀");

    // ✅ Redirect to home
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="auth-btn">Sign Up</button>
          </form>
          <p className="switch-text">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
