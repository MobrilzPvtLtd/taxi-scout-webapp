

import React, { useState } from 'react';
import './Registor.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom'

function Registor() {
  const [credentials, setCredentials] = useState({
    name :"" ,mobile: "" , email: "", password: "" , cpassword : ""
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/Auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : credentials.name  , mobile : credentials.mobile, email: credentials.email, password: credentials.password , cpassword : credentials.cpassword})
    }); 
    
    const json = await response.json()
  
    sessionStorage.setItem('token', json.authtoken); 
      history("/home");


  }
  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})}



  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Link Your GST Number </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="GST Number"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
       
          <div className="form-group">
            <input
              type="password"
              name="email"
              placeholder="Password"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

  <div className="form-group">
            <input
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              value={credentials.mobile}
              onChange={handleChange}
              required
            />
              </div>

          <button type="submit">Link</button>
          <Link to="/home">Back</Link>
          

        </form>
      </div>
    </div>
  );
}

export default Registor;
