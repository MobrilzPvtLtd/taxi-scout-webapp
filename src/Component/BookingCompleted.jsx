import React from "react";
import "./BookingCompleted.css"; 
import { FaStar, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const BookingCompleted = ({pickup ,drop_address , driver_name ,car_name ,car_pic , otp , handleOnCancel , bill ,driverProfile ,car_number}) => {
  const sendData = ()=>{
    handleOnCancel()
  }
  const {base_price ,distance_price ,time_price ,waiting_charge ,cancellation_fee ,promo_discount ,service_tax ,total_amount} = bill?.data ; 
  // console.log("deenge " , bill?.data)
  return (
    <div style={styles.container}>
    <h1 style={styles.title}>Booking Complete</h1>
    
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
          <p><strong>Base Price:</strong> $ {base_price} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Distance Price:</strong> $ {distance_price} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Time Price:</strong> $ {time_price} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Waiting Price:</strong> $ {waiting_charge} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Cancellation Fees:</strong> $ {cancellation_fee} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Discount :</strong> $ {promo_discount} </p>
        </div>
        <div style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon} />
          <p><strong>Service Tax :</strong> $ {service_tax} </p>
        </div>
        <div className="" style={styles.detailRow}>
          <FaMoneyBillWave style={styles.icon2} />
          <h2 className="text-4xl"><strong>Trip Cost:</strong> ${total_amount}</h2>
        </div>
        {/* <div style={styles.detailRow}> */}
          {/* <FaStar style={styles.icon} /> */}
          {/* <p><strong>Payment Method:</strong> {paymentMethod}</p> */}
        {/* </div> */}
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
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
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
  icon2: {
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
  buttonHover: {
    backgroundColor: '#333',
  },
};

export default BookingCompleted;