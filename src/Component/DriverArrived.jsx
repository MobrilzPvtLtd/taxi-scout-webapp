
import React from "react";
import "./BookingCompleted.css"; 
import { FaCheckCircle } from "react-icons/fa";

const DriverArrived = ({pickup ,drop_address , driver_name ,car_name ,car_pic , otp , handleOnCancel})  => {
    const handleCancel = ()=>{
        handleOnCancel();
    }
  return (
    <div className="booking-completed-container">
      <div className="icon-wrapper">
        <FaCheckCircle className="check-icon" />
      </div>
      <h1 className="title">Driver Arrived!</h1>
      <p className="subtitle">
        Your driver is arrived . Share you OTP to start ride.
      </p>

      <div className="booking-details">
        <p><strong>Pickup Location:</strong> {pickup}</p>
        <p><strong>Drop-off Location:</strong> {drop_address}</p>
        {/* <p><strong>Estimated Arrival:</strong> 5 minutes</p> */}
        <p><strong>Driver Name:</strong> {driver_name}</p>
        <p><strong>Mobile Number:</strong> {driver_name}</p>
        <p><strong>Car:</strong> {car_name}</p>
        <img src={car_pic} alt="" />
        <h1>OTP : {otp}</h1>
      </div>

      <button className="button-primary text-red-600 " onClick={handleCancel}>Cancel Ride</button>
      <button className="button-secondary">Go To Home</button>
    </div>
  );
};


export default DriverArrived;
