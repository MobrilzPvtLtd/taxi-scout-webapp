import React, { useContext, useEffect, useRef, useState } from "react";
import "./SignupPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
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
  const { userType, setUserType } = useContext(UserContext); // Default userType is user
  const [STATE, setSTATE] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();
  const [otp_visible, setOtp_visible] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
  const [imagePreview, setImagePreview] = useState(null);   // State to store the preview URL

  // Handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  // Trigger the hidden file input when the button is clicked
  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const [credentials, setCredentials] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    password: "",
    cpassword: "",
    city: "",
    state: "",
    postal_code: "",
    address: "",
    cname: "",
    contact_name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.error("Execute reCAPTCHA not yet available");
      return;
    }

    try {
      // Execute the reCAPTCHA and get the token
      const recaptchaToken = await executeRecaptcha("login");

      // Create form data
      const formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("mobile", credentials.mobile);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("password_confirmation", credentials.cpassword);
      formData.append("country", selectedCountry);
      if (selectedImage) formData.append("profile_picture", selectedImage);
      formData.append("token", recaptchaToken);

      const response = await fetch(`${url}api/v1/user/register`, {
        method: "POST",
        body: formData, // Send as FormData
      });

      const json = await response.json();

      if (response.ok) {
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

    // Create form data
    const formData = new FormData();
    formData.append("role", "admin");
    formData.append("service_location_id", selectedState);
    formData.append("company_name", credentials.cname);
    formData.append("mobile", credentials.mobile);
    formData.append("email", credentials.email);
    // formData.append("country", selectedCountry);
    // formData.append("city", credentials.city);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.cpassword);
    formData.append("address", credentials.address);
    formData.append("postal_code", credentials.postal);
    if (selectedImage) formData.append("profile_picture", selectedImage);
    formData.append("package_id", 1);
    formData.append("name", credentials.contact_name);
    formData.append("token", recaptchaToken);

    const response = await fetch(`${url}api/v1/compnayregister`, {
      method: "POST",
      body: formData, // Send as FormData
    });

    const json = await response.json();

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
          headers: { "Content-Type": "application/json" },
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

  useEffect(() => {
    const stateMethod = async () => {
      try {
        let response = await fetch(`${url}api/v1/servicelocation`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
console.log("selected image" , imagePreview)
useEffect(() => {
  return () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);
  return (
    <>
      <div id="banner_img_home" className="relative mt-10">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
        <div className="relative container flex justify-center items-center md:justify-end min-h-[100vh]">
          {otp_visible ? (
            <OtpVerify />
          ) : (
            <div className="pt-2">
              {userType === t('user') ? (
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
      {/* Display selected image preview */}
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
      ) : null}

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Button to trigger file input */}
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
                        src={imagePreview}
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
                    <div className="flex flex-col w-full form-group">
                      <select
                        id="countrySelect"
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        <option value="">{t('select_a_country')}</option>
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
                      <br></br>
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
