import React, { useContext, useEffect, useRef, useState } from "react";
import "./SignupPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { createRenderer } from "react-dom/test-utils";
import OtpVerify from "./OtpVerify";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Context/UserContext";
function SignupPage() {
  const { t } = useTranslation();
  let url = "https://admin.taxiscout24.com/";
  const {userType, setUserType} = useContext(UserContext); // Default userType is user
  const [STATE, setSTATE] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dialCode, setDialCode] = useState("");
  const navigate = useNavigate();
  const [otp_visible, setOtp_visible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set the image as a base64 string
      };
      reader.readAsDataURL(file); // Read file as a data URL (base64)
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  //   sign up api

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle the file upload here
    }
  };

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
    contact_name: "",
  });

  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.error("Execute reCAPTCHA not yet available");
      return;
    }
    try {
      // Execute the reCAPTCHA and get the token
      const recaptchaToken = await executeRecaptcha("login");

      const response = await fetch(`${url}api/v1/user/register`, {
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
          profile_picture: selectedImage,
          country: selectedCountry,
          token: recaptchaToken,

          //  password: credentials.password , cpassword : credentials.cpassword
        }),
      });

      const json = await response.json();
      // console.log(json);

      if (response.ok) {
        // alert("Check Your Email");
        localStorage.setItem(`email`, `${credentials.email}`);
        setOtp_visible(true);
      } else {
        alert(json.message);
        console.log(json.message);
      }
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.error("Execute reCAPTCHA not yet available");
      return;
    }
    const recaptchaToken = await executeRecaptcha("login");
    const response = await fetch(`${url}api/v1/compnayregister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: " admin",
        service_location_id: selectedState,
        company_name: credentials.cname,
        mobile: credentials.mobile,
        email: credentials.email,
        country: selectedCountry,
        // state: credentials.state,
        city: credentials.city,
        password: credentials.password,
        password_confirmation: credentials.cpassword,
        address: credentials.address,
        postal_code: credentials.postal,
        profile_picture: selectedImage,
        package_id: 1,
        name: credentials.contact_name,
        token: recaptchaToken,

        //  password: credentials.password , cpassword : credentials.cpassword
      }),
    });

    const json = await response.json();
    localStorage.setItem("email", credentials.email);
    // console.log(json);

    if (response.ok) {
      alert("You are Registered successfully");
      setOtp_visible(true);
    } else {
      let alertMessage = "";
      let errorMessages = json.errors;

      Object.keys(errorMessages).forEach((key) => {
        const messages = errorMessages[key];
        alertMessage += messages.join(" ") + "\n";
      });
      alert(alertMessage);
      console.log(json.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const countryMethod = async () => {
      try {
        let response = await fetch(`${url}api/v1/countries`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await response.json();
        setCountries(data.data);
      } catch (err) {}
    };
    countryMethod();
  }, []);
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  console.log("countries ki list ", countries);

  useEffect(() => {
    const stateMethod = async () => {
      try {
        let response = await fetch(`${url}api/v1/servicelocation`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await response.json();
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
      <div id="banner_img_home" className="relative mt-10">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
        <div className="relative container flex justify-center items-center  md:justify-end min-h-[100vh] min-w-full">
          {otp_visible == true ? (
            <div id="otp_verify">
              <OtpVerify />
            </div>
          ) : (
            <div className="pt-2">
              {userType === t('user') ? (
                // <div className="container flex justify-center items-center   ">
                <div className="signup-container flex justify-center items-center">
                  <h1 className="text-white">{t('sign_up')}</h1>
                  <div className="signup-options flex-row gap-3">
                    <div
                      className={`option ${
                        userType === t('user') ? "active" : ""
                      }`}
                      onClick={() => setUserType(t('user'))}
                    >
                      {t('user')}
                    </div>
                    <div
                      className={`option ${
                        userType === t('company') ? "active" : ""
                      }`}
                      onClick={() => setUserType(t('company'))}
                    >
                      {t(`company`)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                    ) : null}

                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <button
                      onClick={handleClick}
                      id="btn_hover_main"
                      className="w-full my-2 py-3 px-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                    >
                      {t('upload_logo_profile')}
                    </button>
                  </div>
                  <form
                    className=" w-fit  grid gird-cols-1 md:grid-cols-2 gap-x-2 "
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder={t('name')}
                        value={credentials.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder= {t('email')}
                        value={credentials.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="number"
                        name="mobile"
                        placeholder={t('mobile')}
                        value={credentials.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        placeholder={t('password')}
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="cpassword"
                        placeholder={t('cpassword')}
                        value={credentials.cpassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <select
                        id="countrySelect"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <option value="">{t('select_a_country')}</option>
                        {[...countries] // Create a copy of the array to avoid mutating the original
                          .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by country name
                          .map((country, index) => (
                            <option
                              key={index}
                              name="country"
                              value={country.dial_code}
                            >
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <button
                      id="btn_hover_main"
                      className="w-full my-2 py-3 font-semibold rounded-lg text-sm md:translate-x-[50%] lg:px-10 md:py-2"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {t('sign_up_as')} {userType}
                    </button>
                  </form>
                </div>
              ) : (
                // </div>
                // <div className="container">
                <div className="signup-container  flex justify-center items-center">
                  <h1 className="text-white">{t('sign_up')}</h1>
                  <div className="signup-options flex gap-3">
                    <div
                      className={`option ${
                        userType === t('user') ? "active" : ""
                      }`}
                      onClick={() => setUserType(t('user'))}
                    >
                    {t('user')}
                    </div>
                    <div
                      className={`option ${
                        userType === t('company') ? "active" : ""
                      }`}
                      onClick={() => setUserType(t('company'))}
                    >
                      {t('company')}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                    ) : null}

                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <button
                      onClick={handleClick}
                      id="btn_hover_main"
                      className="w-full my-2 py-3 px-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                    >
                     {t('upload_logo_profile')}
                    </button>
                  </div>
                  <form
                    id=""
                    className="w-full place-items-center grid grid-cols-1 md:grid-cols-2 gap-x-3 "
                    onSubmit={handleSubmitCompany}
                  >
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
                        placeholder={t('company_name')}
                        value={credentials.cname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact_name"
                        placeholder={t('contact_person')}
                        value={credentials.contact_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder={t('email')}
                        value={credentials.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        placeholder= {t("password")}
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="cpassword"
                        placeholder={t('cpassword')}
                        value={credentials.cpassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <select
                        id="countrySelect"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <option value="">{t('select_a_country')}</option>
                        {countries
                          .sort((a, b) => a.name.localeCompare(b.name)) 
                          .map((country, index) => (
                            <option
                              key={index}
                              name="country"
                              value={country.dial_code}
                            >
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full form-group">
                      <select
                        id="countrySelect"
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        <option value="">Select Your Zone:</option>
                        {STATE?.map((state, index) => (
                          <option
                            key={index}
                            name="service_location_id"
                            value={state.id}
                          >
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="address"
                        placeholder={t('address')}
                        value={credentials.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* <div className="form-group">
                      <input
                        type="text"
                        name="state"
                        placeholder="state"
                        value={credentials.state}
                        onChange={handleChange}
                        required
                      />
                    </div> */}
                    {/* <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        placeholder="city"
                        value={credentials.city}
                        onChange={handleChange}
                        required
                      />
                    </div> */}
                    <div className="form-group">
                      <input
                        type="number"
                        name="mobile"
                        placeholder={t('mobile')}
                        value={credentials.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        name="postal"
                        placeholder={t('postal_code')}
                        value={credentials.postal}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* <div className="flex justify-center ">
                      <div className="form-group cc001 "> */}
                    <button
                      id="btn_hover_main"
                      className="w-full my-2 py-3 font-semibold rounded-lg text-sm md:translate-x-[50%] lg:px-10 md:py-2"
                      type="submit"
                    >
                      {t('sign_up_as')} {userType}
                    </button>
                    {/* </div>
                    </div> */}
                  </form>
                </div>
                // </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeExWoqAAAAABvfj4hxT9GHLXKpeYBzAfjILAgM">
      <SignupPage />
    </GoogleReCaptchaProvider>
  );
}
