import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import loader from "../Images/Spinner@1x-1.0s-200px-200px (1).gif";

const OtpVerify = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  let url = "https://admin.taxiscout24.com/";
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    email: "",
    otp: "",
  });
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer > 0) {
      const timerID = setInterval(() => {
        setTimer((timer) => timer - 1);
        // console.log("timer ki value " , timer)
      }, 1000);

      return () => clearInterval(timerID);
    }
  }, [timer]);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let value = localStorage.getItem("email");
    setEmail(value);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${url}api/v1/validate-email-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: parseInt(state.otp),
      }),
    });
    if (response.ok) {
      setMessage("OTP Verified Successfully!");
      alert("OTP Verified Successfully!");
      navigate("/login");

      setLoading(false);
    } else {
      setMessage("Invalid OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading2(true);
    const response = await fetch(`${url}api/v1/send-mail-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (response.ok) {
      setMessage(
        "An OTP has been resent to your email. Please check for the 6-digit code"
      );
      setTimer(90);
      setLoading2(false);
    } else {
      setMessage("Server Error");
      setLoading2(false);
    }
  };
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}
    >
      <h1>OTP Verification</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          className="otp_input"
          type="text"
          name="otp"
          value={state.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
        />
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
            Verify
          </button>
        )}
      </form>
      {message && <p>{message}</p>}
      <div className="mt-3">
        {timer == 0 ? (
          <div>
            {loading2 ? (
              <div className="flex justify-center">
                {" "}
                <img className="w-20 " src={loader} alt="loading..." />{" "}
              </div>
            ) : (
              <button className="re-btn" onClick={handleResend}>
                RESEND OTP
              </button>
            )}{" "}
          </div>
        ) : (
          <button className="re-btn1" disabled>
            RESEND OTP
          </button>
        )}
        <p>00:{timer}</p>
      </div>
    </div>
  );
};

export default OtpVerify;
