import React, { useState } from 'react'
import './CompanyLogin.css'
import { useNavigate } from 'react-router-dom'


function CompanyLogin() {
    const [userType, setUserType] = useState(''); // Default userType is user

    const handleLogin = () => {
    };


    // api call

    const [credentials, setCredentials] = useState({mobile : ""});
    const [token, setToken] = useState([])
    let history = useNavigate();

    const handleChange = (e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})} 

    const handleSubmit = async (e) => {
      e.preventDefault();


if (userType === "user"){

      const response = await fetch("https://admin.taxiscout24.com/api/v1/user/login", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({mobile: credentials.mobile})
        }); 
      

      // Json Web Token condition

      const json = await response.json()

      setToken(json.access_token)

      if (response.ok){
        // Save the auth token and redirect
        sessionStorage.setItem('token', json.access_token); 
        history("/home");
    }
    else{
        alert("Invalid credentials");
    }
    }

    else if (userType === "company"){
        history("/rental")
    }
}
  
    return (
      <div className="container">
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="mobile"  
              name="mobile"
              value={credentials.mobile}   onChange={handleChange} required />
            </div>
            {/* <div className="form-group">
              <input type="password" placeholder="Password" required />
            </div> */}
            <button type="submit">Login as {userType}</button>
          </form>
        </div>
      </div>
    );
  };
  

export default CompanyLogin