import React, { useState } from 'react'
import './CompanyLogin.css'
import { useNavigate } from 'react-router-dom'


function CompanySignUp() {
    const [userType, setUserType] = useState('user'); // Default userType is user

    const handleSignUp = () => {
    };
//   sign up api

const [credentials, setCredentials] = useState({
    name :"" ,mobile: "" , email: "", country: "" 
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userType === "user"){
    const response = await fetch("https://admin.taxiscout24.com/api/v1/user/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : credentials.name  , mobile : credentials.mobile, email: credentials.email, country : credentials.country
          //  password: credentials.password , cpassword : credentials.cpassword
          })
    }); 
    
    const json = await response.json()
    
        if (response.ok) {
          alert('You are Registered successfully');
        }
       else {alert(json.message) 
  
  }

   
  
    //   localStorage.setItem('token', json.authtoken); 
    //   history("/home");

       }
       else if (userType === "company"){
        history("/rental")
    }
  }
  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})}



    return (
      <div className="container">
        <div className="signup-container">
          <h1>Sign Up</h1>
          <div className="signup-options">
            <div className={`option ${userType === 'user' ? 'active' : ''}`} onClick={() => setUserType('user')}>
              User
            </div>
            <div className={`option ${userType === 'company' ? 'active' : ''}`} onClick={() => setUserType('company')}>
              Company
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Full Name" value={credentials.name}
              onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email"  name="email" placeholder="Email"  value={credentials.email}
              onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" name="country" placeholder="+41" value={credentials.country}  onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="number" name="mobile" placeholder="Mobile Number" value={credentials.mobile}  onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up as {userType}</button>
          </form>
        </div>
      </div>
    );
  };

export default CompanySignUp