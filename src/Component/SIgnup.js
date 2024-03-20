import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const SIgnup = () => {

  const [credentials, setCredentials] = useState({name :"" ,mobile: "" , email: "", password: "" , cpassword : ""}) 
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
    console.log(json);
    // if (json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken); 
      history("/home");

  // }
  // else{
      // alert("Invalid credentials");
  // }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})}

  return (
    <div className='container'>
     <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-2">
    <label htmlFor="inputEmail4" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} name="name" value={credentials.name} id="inputEmail4" placeholder="Enter your Name"/>
  </div>
 
  <div className="col-3">
    <label htmlFor="inputAddress" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={onChange} id="inputAddress" name="email" value={credentials.email} placeholder="Enter Your Email" />
  </div>
  <div className="col-3">
    <label htmlFor="inputAddress2" className="form-label">Mobile</label>
    <input type="number" className="form-control" onChange={onChange} name='mobile' value={credentials.mobile} id="inputAddress2" placeholder="Enter your Mobile Number"/>
  </div>
  <div className="col-md-3">
    <label htmlFor="Email" className="form-label">Create Username</label>
    <input type="email" className="form-control" onChange={onChange} name='create' id="Create User Name " placeholder="Enter your Username" value={credentials.email}/> 
  </div>
  <div className="col-md-3">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} name='password'placeholder="Enter your Password" value={credentials.password} minLength={5} required id="inputPassword4"/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputPassword4" className="form-label"> confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} placeholder="Confirm Your Password" name='cpassword' value={credentials.cpassword} minLength={5} required id="inputPassword4"/>
  </div>
  
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
  )
}

export default SIgnup
