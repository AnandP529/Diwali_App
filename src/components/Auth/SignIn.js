import React, { Component } from "react";
import "./Auth.css";
import { withRouter } from "./withRouter";

class SignIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    this.props.setIsLoggedIn(true); // update App state

    alert("Sign In successful 🚀");
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
          <p className="switch-text">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
