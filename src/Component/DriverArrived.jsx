import React from "react";
import "./BookingCompleted.css";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const DriverArrived = ({
  pickup,
  drop_address,
  driver_name,
  car_name,
  car_pic,
  otp,
  handleOnCancel,
}) => {
  const { t } = useTranslation();
  const handleCancel = () => {
    handleOnCancel();
  };
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center gap-3 ">
        <FaCheckCircle className="w-10 h-10 fill-green-500 " />

        <h1 className="m-0">Driver Arrived!</h1>
      </div>
      <p className="subtitle">
        Your driver is arrived . Share you OTP to start ride.
      </p>

      <div className="booking-details">
        <p>
          <strong>{t('pickup_location')}:</strong> {pickup}
        </p>
        <p>
          <strong>{t('dropoff_location')}:</strong> {drop_address}
        </p>
        {/* <p><strong>Estimated Arrival:</strong> 5 minutes</p> */}
        <p>
          <strong>Driver Name:</strong> {driver_name}
        </p>
        <p>
          <strong>Mobile Number:</strong> {driver_name}
        </p>
        <p>
          <strong>Car:</strong> {car_name}
        </p>
        <img src={car_pic} alt="" />
        <p className="text-black m-0 w-fit text-center"><strong>OTP :</strong> {otp}</p>
      </div>

      <button className="button-primary text-red-600 " onClick={handleCancel}>
        Cancel Ride
      </button>
      <button className="button-secondary">Go To Home</button>
    </div>
  );
};

export default DriverArrived;
