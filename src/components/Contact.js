import React from "react";
import "./Contact.css";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      name: "",
      mobile: "",
      email: "",
      query: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isSignedIn } = this.props;

    if (isSignedIn) {
      this.setState({ submitted: true });
    } else {
      alert("You must sign in to submit the form!");
      // Reset form fields after failed submission
      this.setState({
        name: "",
        mobile: "",
        email: "",
        query: "",
      });
    }
  };

  render() {
    const { submitted, name, mobile, email, query } = this.state;

    return (
      <React.Fragment>
        <div className="contact-container">
          
          

          <div className="map-section">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d486418.49887424003!2d82.93293171041705!3d17.737828249494704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20395498468!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1739110504580!5m2!1sen!2sin"
              title="map"
            ></iframe>
          </div>
          <div className="address-text">
            <h3>Our Address</h3>
            <p>
                Shop Name: AK Fireworks<br/>
                D/No-22-27-32, Vishakapatnam, Punja Junction Veedhi, 1-Town Area,<br/>
                Shop Name: AK Fireworks<br/>
                Landmark: SKML Temple<br/>
                TelePhone: 0891-250567
            </p>
          </div>

          <div className="form-section">
            <div className="form-card">
              <h4>Contact Us</h4>

              {submitted && this.props.isSignedIn && (
                <div className="success-msg">
                  Thank you! Our team will get back to you shortly.
                </div>
              )}

              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="number"
                  name="mobile"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="text"
                  name="query"
                  placeholder="Query"
                  value={query}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="submit"
                  value="Submit"
                  className="submit-btn"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
