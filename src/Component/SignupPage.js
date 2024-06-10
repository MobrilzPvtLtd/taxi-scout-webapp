import React, { useEffect, useState } from "react";
import "./SignupPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { createRenderer } from "react-dom/test-utils";
import OtpVerify from "./OtpVerify";

function SignupPage() {
  const [userType, setUserType] = useState("user"); // Default userType is user
  const [STATE, setSTATE] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dialCode, setDialCode] = useState("");
  const navigate = useNavigate();
const [otp_visible ,setOtp_visible] = useState(false)
  //   sign up api

  const [credentials, setCredentials] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    password: "",
    cpassword: "",
    profile: null,
    city: "",
    state: "",
    postal_code: "",
    address: "",
    area: { STATE },

    cname: "",
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      " https://www.mobrilz.digital/admin/public/api/v1/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          mobile: credentials.mobile,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.cpassword,
          profile_picture: credentials.profile,
          country: selectedCountry,
          //  password: credentials.password , cpassword : credentials.cpassword
        }),
      }
    );

    const json = await response.json();
    // console.log(json);

    if (response.ok) {
      // alert("Check Your Email");
      sessionStorage.setItem(`email `, ` ${credentials.email}`);
      // navigate("/otpverify");
      setOtp_visible(true)
    } else {
      alert(json.message);
      console.log(json.message);
    }

    //   localStorage.setItem('token', json.authtoken);
    //   history("/home");
  };
  const handleSubmitCompany = async (e) => {
    e.preventDefault();

    const response = await fetch(
      " https://www.mobrilz.digital/admin/public/api/v1/compnayregister",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: " admin",
          service_location_id: selectedState,
          first_name: credentials.cname,
          mobile: credentials.mobile,
          email: credentials.email,
          country: selectedCountry,
          state: credentials.state,
          city: credentials.city,
          password: credentials.password,
          password_confirmation: credentials.cpassword,
          address: credentials.address,
          postal_code: credentials.postal,
          profile_picture: credentials.profile,

          //  password: credentials.password , cpassword : credentials.cpassword
        }),
      }
    );

    const json = await response.json();
    // console.log(json);

    if (response.ok) {
      alert("You are Registered successfully");
    } else {
      alert(json.message);
      console.log(json.message);
    }

    //   localStorage.setItem('token', json.authtoken);
    //   history("/home");
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // setSelectedCountry(e.target.value);
  };

  // country method

  useEffect(() => {
    const countryMethod = async () => {
      try {
        let response = await fetch(
          " https://www.mobrilz.digital/admin/public/api/v1/countries",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        // const countriesData = data.map(({ name }) => ({
        //   name
        // }));
        setCountries(data.data);
      } catch (err) {}
    };
    countryMethod();
  }, []);
  // console.log("country code " ,countries[0].dial_code)
  // console.log("outer country " , countries)
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);

    console.log("is it working", e.target.value);
  };
  // states and citiies
  // country method

  useEffect(() => {
    const stateMethod = async () => {
      try {
        let response = await fetch(
          " https://www.mobrilz.digital/admin/public/api/v1/servicelocation",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        // const countriesData = data.map(({ name }) => ({
        //   name
        // }));
        // console.log(data)
        setSTATE(data.data);
      } catch (err) {}
    };
    stateMethod();
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <>
      <div id="signup_page_main">
      {(otp_visible== true)?(
        <div id="otp_verify">
          <OtpVerify />
        </div>
        ):(
          <div>
        {userType === "user" ? (
          <div className="container">
            <div id="sign_up_page_form" className="signup-container">
              <h1 className="text-white">Sign Up</h1>
              <div className="signup-options">
                <div
                  className={`option ${userType === "user" ? "active" : ""}`}
                  onClick={() => setUserType("user")}
                >
                  User
                </div>
                <div
                  className={`option ${userType === "company" ? "active" : ""}`}
                  onClick={() => setUserType("company")}
                >
                  Company
                </div>
              </div>
              <form className="w-[15vw]" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={credentials.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    value={credentials.cpassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  {/* <label
                    htmlFor="countrySelect"
                    className="text-[20px] font-bold cc001"
                  >
                    Select a country:
                  </label> */}
                  <select
                    id="countrySelect"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select a country:</option>
                    {countries.map((country) => (
                      <option
                        key={country.dial_code}
                        name="country"
                        value={country.dial_code}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {/* {selectedCountry && (
                    <p>Selected Country Code: {selectedCountry}</p>
                  )} */}
                </div>
                <div className="form-group cc001">
                  <input
                    type="file"
                    name="profile"
                    placeholder="select"
                    value={credentials.profile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Sign Up as {userType}</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="container">
            <div id="sign_up_page_form" className="signup-container">
              <h1 className="text-white">Sign Up</h1>
              <div className="signup-options">
                <div
                  className={`option ${userType === "user" ? "active" : ""}`}
                  onClick={() => setUserType("user")}
                >
                  User
                </div>
                <div
                  className={`option ${userType === "company" ? "active" : ""}`}
                  onClick={() => setUserType("company")}
                >
                  Company
                </div>
              </div>
              <form id="form" onSubmit={handleSubmitCompany}>
                {/* <div className="form-group">
                <input
                  type="text"
                  name="company role"
                  placeholder="company role"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                />
              </div> */}
                <div className="form-group">
                  <input
                    type="text"
                    name="cname"
                    placeholder="company Name"
                    value={credentials.cname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm password"
                    value={credentials.cpassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  {/* <label
                    htmlFor="countrySelect"
                    className="text-[20px] font-bold cc001"
                  >
                    Select a country:
                  </label> */}
                  <select
                    id="countrySelect"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select a country:</option>
                    {countries.map((country) => (
                      <option
                        key={country.code}
                        name="country"
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {/* {selectedCountry && (
                    <p>Selected Country Code: {selectedCountry}</p>
                  )} */}
                </div>
                <div className="flex flex-col">
                  {/* <label
                    htmlFor="countrySelect"
                    className="text-[20px] font-bold cc001"
                  >
                    Select an Area:
                  </label> */}
                  <select
                    id="countrySelect"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="">Select an Area:</option>
                    {STATE.map((state) => (
                      <option
                        key={state.id}
                        name="service_location_id"
                        value={state.id}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {selectedState && <p>Selected State: {selectedState}</p>}
                </div>
                {/* <div className="form-group">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={credentials.country}
                  onChange={handleChange}
                  required
                />
              </div> */}
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    value={credentials.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="state"
                    placeholder="state"
                    value={credentials.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="city"
                    value={credentials.city}
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
                <div className="form-group">
                  <input
                    type="number"
                    name="postal"
                    placeholder="postal code"
                    value={credentials.postal}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group cc001 ">
                  <label for="profilePicture" className="text-[20px] font-bold cc001">
                    Company Logo:
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    value={credentials.profile}
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>
                <button type="submit">Sign Up as {userType}</button>
              </form>
            </div>
          </div>
        )}
        </div>)}
        
      </div>
    </>
  );
}

export default SignupPage;
