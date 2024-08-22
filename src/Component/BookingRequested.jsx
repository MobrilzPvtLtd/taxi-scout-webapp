
import React from "react";
import "./BookingCompleted.css"; 
import { FaCheckCircle } from "react-icons/fa";

const BookingRequested = () => {
  return (
    <div className="booking-completed-container">
      <div className="icon-wrapper">
        <FaCheckCircle className="check-icon" />
      </div>
      <h1 className="title">Booking Confirmed!</h1>
      <p className="subtitle">
        Thank you for your booking. Your driver is on the way!
      </p>

      <div className="booking-details">
        <p><strong>Pickup Location:</strong> 123 Main St, New York, NY</p>
        <p><strong>Drop-off Location:</strong> 456 Elm St, Brooklyn, NY</p>
        <p><strong>Estimated Arrival:</strong> 5 minutes</p>
        <p><strong>Driver Name:</strong> John Doe</p>
        <p><strong>Car:</strong> Tesla Model S (Black)</p>
      </div>

      <button className="button-primary">Go to Home</button>
      <button className="button-secondary">View Details</button>
    </div>
  );
};


export default BookingRequested;
