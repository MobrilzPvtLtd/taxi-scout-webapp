import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router';

const OtpVerify = () => {
let url = "https://admin.taxiscout24.com/"
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    email:"",
    otp:""
  });
  const [timer ,setTimer] = useState(30)
  useEffect(()=>{

    if(timer > 0){
     const timerID = setInterval(()=>{
    setTimer( timer => timer - 1)
    // console.log("timer ki value " , timer)
      }, 1000);
    
    return ()=> clearInterval(timerID);
    } 
    },[timer])

  const handleChange = (e) => {
    setOtp(e.target.value);
    setState({...state, [e.target.name]: e.target.value})
  };
// const value = sessionStorage.getItem("email")
useEffect(()=>{
  let value = localStorage.getItem("email")
  // console.log("session inside" , value)
  setEmail(value)
  },[])
console.log("session value" ,email)
  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch(`${url}api/v1/validate-email-otp`,{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            otp: parseInt(state.otp)
        })
    })

    console.log("response" , response)
    // Here you would typically make an API call to verify the OTP
    // For demonstration, let's assume the OTP is 123456
    if (response.ok) {
      setMessage('OTP Verified Successfully!');
      alert('OTP Verified Successfully!');
      navigate('/login')
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handleResend = async(e)=>{
    const response = await fetch(`${url}api/v1/send-mail-otp`,{
      method: "POST",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          email:email
      })
  })
   ;
   console.log(" resend data ki value" , response)
   if (response.ok) {
    setMessage('An OTP has been resent to your email. Please check for the 6-digit code');
    setTimer(60)
   
  } else {
    setMessage('Server Error');
  }
  }
  return (
    <div className='container' style={{ textAlign: 'center', marginTop: '50px',color:'#fff'}}>
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column', alignItems:'center' , gap:'10px'}}>
        <input
        className='otp_input'
          type="text"
          name = "otp"
          value={state.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' , width: '15vw' }}>
          Verify
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='reotp-main'>
        {(timer == 0)?
        <button className="re-btn" onClick={handleResend} >RESEND OTP</button> :
        <button className="re-btn1"  disabled>RESEND OTP</button>}
        <p>00:{timer}</p>
      </div>
    </div>
  );
};

export default OtpVerify
