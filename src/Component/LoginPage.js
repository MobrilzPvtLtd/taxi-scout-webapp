import React, { useState } from "react";
import { Skeleton } from "antd";
import "./LoginPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import CarListOption from "./CarListOption";
import OtpVerify_Login from "./OtpVerify_Login";
import loader from "../Images/Spinner@1x-1.0s-200px-200px (1).gif";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [otp_visible, setOtp_visible] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [userType, setUserType] = useState("user");
  // Default userType is user

  const handleLogin = () => {
    // Perform login logic based on userType
    console.log(`Logging in as ${userType}`);
    // Add your login functionality here
  };
  let url = "https://admin.taxiscout24.com/";

  // api call

  const [credentials, setCredentials] = useState(
    { email: "" },
    { password: "" }
  );
  const [token, setToken] = useState([]);
  let history = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "user") {
      setLoading(true);
      try {
        const response = await fetch(` ${url}api/v1/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const json = await response.json();

        setToken(json.access_token);
        if (response.ok) {
          sessionStorage.setItem("email", credentials.email);
          setOtp_visible(true);
          setLoading(false);
        } else {
          alert("Invalid credentials");
        }
      } catch (err) {
        setRefreshReCaptcha(!refreshReCaptcha);
        console.log(err);
      }
    } else if (userType === "company") {
      history(`${url}`);
    }
  };
  const setTokenFunc = (getToken) => {
    setToken(getToken);
  };
  return (
    <div className="" id="banner_img_home">
      <div className="container flex justify-center items-center  md:justify-end min-h-[100vh] min-w-full">
        {otp_visible == true ? (
          <div id="otp_verify">
            <OtpVerify_Login />
          </div>
        ) : (
          <div className="login-container flex justify-center items-center">
            <h1>Login</h1>
            <div className="login-options">
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
            {userType === "user" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div> */}
                {loading ? (
                  <div className="flex justify-center">
                    {" "}
                    <img className="w-20 " src={loader} alt="loading..." />{" "}
                  </div>
                ) : (
                  <button
                    id="btn_hover_main"
                    className="w-full my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                    type="submit"
                  >
                    Login as {userType}
                  </button>
                )}
                 <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
          <GoogleReCaptcha
            className="google-recaptcha-custom-class"
            onVerify={setTokenFunc}
            refreshReCaptcha={refreshReCaptcha}
          />
        </GoogleReCaptchaProvider>
              </form>
            ) : (
              <span>
                <a href="https://admin.taxiscout24.com/">
                  {" "}
                  <button
                    id="btn_hover_main"
                    className="w-full my-2 py-3 px-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                    type="submit"
                  >
                    Login as {userType}
                  </button>
                </a>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}

export default LoginPage;
