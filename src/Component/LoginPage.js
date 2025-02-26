import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import your CSS file for styling
import loader from "../Images/Spinner@1x-1.0s-200px-200px (1).gif";
import OtpVerify_Login from "./OtpVerify_Login";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [userType, setUserType] = useState(t("user"));
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [token, setToken] = useState(null); // Store token after login
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const setCookie = (name, value, seconds) => {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };
  const authToken = getTokenFromCookie("token");
  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://admin.taxiscout24.com/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.data);
      } else if (response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token); // Fetch data immediately after login
      const intervalId = setInterval(() => fetchUserData(token), 5000); // Fetch data every 5 sec
      console.log("Fetch user data");
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [token]); // Runs when token changes

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("Execute reCAPTCHA not yet available");
      return;
    }

    if (userType === t("user")) {
      setLoading(true);

      try {
        const recaptchaToken = await executeRecaptcha("login");

        const response = await fetch("https://admin.taxiscout24.com/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            token: recaptchaToken,
          }),
        });

        const json = await response.json();

        if (response.ok) {
          setCookie("email", credentials.email, 86400);
          setCookie("token", json.access_token, 86400);
          setToken(json.access_token); // Save token to state
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      } catch (err) {
        console.error("Login failed", err);
      } finally {
        setLoading(false);
      }
    } else if (userType === t("company")) {
      window.location = "https://admin.taxiscout24.com/";
    }
  };

  return (
    <div id="banner_img_home" className="relative mt-10">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="relative container flex justify-center items-center md:justify-end min-h-[100vh] min-w-full">
        {otpVisible ? (
          <div id="otp_verify">
            <OtpVerify_Login />
          </div>
        ) : (
          <div className="login-container flex justify-center items-center">
            <h1>{t("login")}</h1>
            <div className="login-options">
              <div
                className={`option ${userType === t("user") ? "active" : ""}`}
                onClick={() => setUserType(t("user"))}
              >
                User
              </div>
              <div
                className={`option ${userType === t("company") ? "active" : ""}`}
                onClick={() => setUserType(t("company"))}
              >
                {t("company")}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {userType === t("company") ? null : (
                <>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder={t("email")}
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder={t("password")}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {loading ? (
                <div className="flex justify-center">
                  <img className="w-20" src={loader} alt="Loading..." />
                </div>
              ) : (
                <button
                  id="btn_hover_main"
                  className="w-full my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                  type="submit"
                >
                  {t("login_us")} {userType}
                </button>
              )}

              {userType === t("user") ? (
                <Link to="/forget-password">
                  <button className="text-white transition-all hover:scale-105">
                    {t("forgot_password")}
                  </button>
                </Link>
              ) : null}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeExWoqAAAAABvfj4hxT9GHLXKpeYBzAfjILAgM">
      <LoginPage />
    </GoogleReCaptchaProvider>
  );
}
