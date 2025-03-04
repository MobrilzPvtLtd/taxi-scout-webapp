import React from "react";
import "./BookingCompleted.css"; 
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import axios from "axios"; // Import axios

const BookingCompleted = ({
  pickup, drop_address, driver_name, car_name, car_pic, otp, 
  handleOnCancels, bill, driverProfile, car_number,request_id
}) => {
  const navigate = useNavigate();
  console.log("API Response:", request_id);
  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };
  const token = getTokenFromCookie("token");
  const sendData = async () => {
    try {
      const response = await axios.post(
        "https://admin.taxiscout24.com/api/v1/request/rating",
        {
          request_id: request_id,
          rating: 5,
          comment: "Great service!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.status === 200) {
        alert("Booking data sent successfully!");
        navigate(0); // Navigate to home page after successful API call
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data. Please try again.");
    }
  };
  

  // Ensure bill and bill.data are defined before destructuring
  const {
    base_price,
    distance_price,
    time_price,
    waiting_charge,
    cancellation_fee,
    promo_discount,
    service_tax,
    total_amount
  } = bill?.data ?? {}; 

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Booking Completed</h1>
      
      <div style={styles.card}>
        <div style={styles.driverInfo}>
          <img src={driverProfile} alt="Driver" style={styles.driverPhoto} />
          <div>
            <h2 style={styles.driverName}>{driver_name}</h2>
            <p style={styles.carInfo}>{car_name} - {car_number}</p>
          </div>
        </div>

        <div style={styles.tripDetails}>
          <div style={styles.detailRow}>
            <FaMapMarkerAlt style={styles.icon1} />
            <p className="text-left"><strong>Drop-off Location:</strong> {drop_address}</p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Base Price:</strong> {base_price} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Distance Price:</strong> {distance_price} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Time Price:</strong> {time_price} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Waiting Price:</strong> {waiting_charge} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Cancellation Fees:</strong> {cancellation_fee} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Discount :</strong> {promo_discount} </p>
          </div>
          <div style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <p><strong>Service Tax :</strong> {service_tax} </p>
          </div>
          <div className="" style={styles.detailRow}>
            <FaMoneyBillWave style={styles.icon} />
            <h2 className=""><strong>Trip Cost:</strong> {total_amount}</h2>
          </div>
        </div>

        <button style={styles.button} onClick={sendData} >Go to home</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  driverInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px',
  },
  driverPhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginRight: '20px',
    border: '3px solid #000',
  },
  driverName: {
    fontSize: '1.8rem',
    marginBottom: '5px',
  },
  carInfo: {
    color: '#888',
    fontSize: '1rem',
  },
  tripDetails: {
    marginBottom: '30px',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent : 'flex-start',
    marginBottom: '15px',
    fontSize: '1.2rem',
    marginLeft : '1rem'
  },
  icon1: {
    marginRight: '10px',
    color: '#555',
    fontSize: '3rem',
  },
  icon: {
    marginRight: '10px',
    color: '#555',
    fontSize: '1.5rem',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease',
  },
};

export default BookingCompleted;
