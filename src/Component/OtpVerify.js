import React, { useState } from 'react'
import {  useNavigate } from 'react-router';

const OtpVerify = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    email:"",
    otp:""
  });


  const handleChange = (e) => {
    setOtp(e.target.value);
    setState({...state, [e.target.name]: e.target.value})
  };
const value = sessionStorage.getItem("email")
console.log("session value" ,value)
  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('https://www.mobrilz.digital/admin/public/api/v1/validate-email-otp',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:value,
            otp: parseInt(state.otp)
        })
    })
    // Here you would typically make an API call to verify the OTP
    // For demonstration, let's assume the OTP is 123456
    if (response.OK) {
      setMessage('OTP Verified Successfully!');
      navigate('/home')
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };
  return (
    <div className='container' style={{ textAlign: 'center', marginTop: '50px',color:'#fff'}}>
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column', alignItems:'center' , gap:'10px'}}>
        <input
          type="text"
          name = "otp"
          value={state.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          style={{ padding: '10px', fontSize: '16px', width: '15vw'  }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' , width: '15vw' }}>
          Verify
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OtpVerify
