import React from "react";
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
//import "./Style/Support.css"; // Import your CSS file for specific support page styling

const Support = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid m-3 p-3 support">
        <div className="row">
          <div className="col-md-12">
            <h1 className="support-title">Support</h1>
            <p className="support-description">
              Welcome to our support page. If you have any questions, concerns, or feedback,
              please feel free to reach out to us using the contact information below or
              by filling out the form.
            </p>
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Email: support@example.com</p>
              <p>Phone: 123-456-7890</p>
            </div>
            <div className="contact-form">
              <h2>Contact Form</h2>
              {/* Your contact form component can be added here */}
              {/* Replace this with your actual contact form component */}
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;
