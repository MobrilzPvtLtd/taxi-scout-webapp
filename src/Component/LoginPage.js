import React, { useState } from 'react';
import './LoginPage.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'
import CarListOption from './CarListOption';
import OtpVerify_Login from './OtpVerify_Login';

function LoginPage() {
  const [otp_visible ,setOtp_visible] = useState(false)

  const [userType, setUserType] = useState('user');
   // Default userType is user

  const handleLogin = () => {
    // Perform login logic based on userType
    console.log(`Logging in as ${userType}`);
    // Add your login functionality here
  };
let url = "https://admin.taxiscout24.com/"

  // api call

  const [credentials, setCredentials] = useState({email : ""},{password : ""});
  const [token, setToken] = useState([])
  let history = useNavigate();

  const handleChange = (e)=>{
    setCredentials({...credentials,[e.target.name]: e.target.value})} 

  const handleSubmit = async (e) => {
    e.preventDefault();


if (userType === "user"){

    const response = await fetch(` ${url}api/v1/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : credentials.email , password : credentials.password})
      }); 
    

    // Json Web Token condition

    const json = await response.json()


    setToken(json.access_token)

    console.log("hariom",json);
    if (response.ok){
      // Save the auth token and redirect
      sessionStorage.setItem("email" , credentials.email)
      // history("/home");
      setOtp_visible(true)

  }
  else{
      alert("Invalid credentials");
  }
  }

  else if (userType === "company"){
      history(`${url}`)
  }
}

  return (
    <div>
    <div id='banner_img_home'></div>
    <div className="container login001">
    {(otp_visible== true)?(
        <div id="otp_verify">
          <OtpVerify_Login />
        </div>
        ):(
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-options">
          <div className={`option ${userType === 'user' ? 'active' : ''}`} onClick={() => setUserType('user')}>
            User
          </div>
          <div className={`option ${userType === 'company' ? 'active' : ''}`} onClick={() => setUserType('company')}>
            Company
          </div>
        </div>
        {(userType==='user')?
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" placeholder="email"  
            name="email"
            value={credentials.email}   onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="password"  
            name="password"
            value={credentials.password}   onChange={handleChange} required />
          </div>
          {/* <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div> */}
          <button type="submit">Login as {userType}</button>
        </form>: <span>
       
         <a href='https://admin.taxiscout24.com/'> <button type="submit">Login as {userType}</button></a>
       </span>}
      </div>)}
    </div>
    </div>
    // </div>
  );
};


export default LoginPage;
