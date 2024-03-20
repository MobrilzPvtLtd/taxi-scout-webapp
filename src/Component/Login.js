import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [credentials, setCredentials] = useState({mobile: "", password: ""}) 
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://www.mobrilz.digital/admin/public/api/v1/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    }); 
    
    const json = await response.json()
    console.log(json);
    if (json){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken); 
      Navigate("/home");

  }
  else{
      alert("Invalid credentials");
  }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})}   
  return (
    <div> 
        <h1>Taxi Scout</h1>
       <form onSubmit={handleSubmit}>
  <div className=" mx-auto col-10 col-md-8 col-lg-3">
    <label for="exampleInputEmail1" className="form-label" >Phone Number</label>
    <input type="email" className="form-control" id="email" name= "email" value={credentials.email} onChange={onChange} placeholder='Enter Your Email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your Phone Number with anyone else.</div>
  </div>
  {/* <div className="mx-auto col-10 col-md-3 col-lg-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name= "password" value={credentials.password} onChange={onChange} placeholder='Enter Your Password' id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
 
  <button type="submit" className="btn btn-primary">Login</button>
  
</form>
    </div>
  )
}

export default Login
