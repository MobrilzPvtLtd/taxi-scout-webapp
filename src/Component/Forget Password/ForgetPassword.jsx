import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  LinearProgress,
  Paper,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import bg from "../../Images/Designer.jpeg";
import axios from "axios";
import loader from "../../Images/Spinner@1x-1.0s-200px-200px (1).gif";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  maxWidth: "500px",
  margin: "2rem auto",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

const StrengthMeter = styled(Box)(({ strength }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
    "& .MuiLinearProgress-root": {
        height: "8px",
        borderRadius: "4px",
        flex: 1,
        backgroundColor: "#e0e0e0",
    },
}));

const ForgetPassword = () => {
  const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [otpVerify, setOtpVerify] = useState(false);
    const [loading , setLoading] = useState(false);
    let url = "https://admin.taxiscout24.com/";
    const navigate = useNavigate();
  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.match(/[A-Z]/)) score += 25;
    if (pass.match(/[0-9]/)) score += 25;
    if (pass.match(/[^A-Za-z0-9]/)) score += 25;
    return score;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 25) return "#f44336";
    if (strength <= 50) return "#ff9800";
    if (strength <= 75) return "#2196f3";
    return "#4caf50";
  };

  const getStrengthLabel = (strength) => {
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Medium";
    if (strength <= 75) return "Strong";
    return "Very Strong";
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`${url}api/v1/password/forgot`, { email });
  
      console.log("Response data:", response.data);
  
      if (response.data.success) {
        setLoading(false);
        setOtpVerify(true);
        const successMessage = response.data.message || "OTP sent successfully.";
        toast.success(successMessage, {
          position: "top-right",
        });
      } else {
        setLoading(false);
        const errorMessage = response.data.message || "Registration failed.";
        toast.error(errorMessage, {
          position: "top-right",
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    const newStrength = calculatePasswordStrength(password);
    setStrength(newStrength);

    setErrors((prev) => ({
      ...prev,
      password:
        password.length > 0 && password.length < 8
          ? "Password must be at least 8 characters long"
          : "",
    }));
  }, [password]);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post(`${url}api/v1/password/reset`, { email ,password , password_confirmation , otp} );
  
      console.log("Response data:", response.data);
  
      if (response.data.success) {
        setLoading(false);
        setOtpVerify(true);
        const successMessage = response.data.message || "OTP sent successfully.";
        toast.success(successMessage, {
          position: "top-right",
        });
        navigate("/login")
      } else {
        setLoading(false);
        const errorMessage = response.data.message || "Registration failed.";
        toast.error(errorMessage, {
          position: "top-right",
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    const newStrength = calculatePasswordStrength(password);
    setStrength(newStrength);

    setErrors((prev) => ({
      ...prev,
      password:
        password.length > 0 && password.length < 8
          ? "Password must be at least 8 characters long"
          : "",
    }));
  }, [password]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value && !validateEmail(value) ? "Invalid email format" : "",
    }));
  };
  return (
    <div
      className="relative w-full min-h-fit  pt-20 mt-20 h-[70vh] ultraxl:h-[85vh]"
      style={{ backgroundImage: `url(${bg})` , backgroundPosition : "center" , backgroundRepeat : "no-repeat" , backgroundSize : "cover"}}
    >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="container relative">
        {otpVerify ? (
          <Container>
            <StyledPaper elevation={3}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                {t('password_recovery')}
              </Typography>

              <Box onSubmit={handleSubmit2} component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label= {t('email')}
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                  aria-label="Email input"
                />

                <Box sx={{ position: "relative", }}>
                  <TextField
                    fullWidth
                    label="OTP"
                    variant="outlined"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    aria-label="Otp input"
                  />
                  
                </Box>
                <Box sx={{ position: "relative",marginTop: "1rem" }}>
                  <TextField
                    fullWidth
                    label={t('new_password')}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    aria-label="Password input"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </Box>
                <Box sx={{ position: "relative" , marginTop: "1rem"}}>
                  <TextField
                    fullWidth

                    label={t('confrim_password')}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    aria-label="Password input"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </Box>

                <StrengthMeter strength={strength}>
                  <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getStrengthColor(strength),
                        transition: "all 0.3s ease",
                      },
                    }}
                    aria-label="Password strength indicator"
                  />
                  <Tooltip
                    title={
                      <Typography>
                        Password should contain:
                        <br />• At least 8 characters
                        <br />• Uppercase letters
                        <br />• Numbers
                        <br />• Special characters
                      </Typography>
                    }
                  >
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <FaInfoCircle />
                    </IconButton>
                  </Tooltip>
                </StrengthMeter>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: getStrengthColor(strength),
                    transition: "color 0.3s ease",
                  }}
                  aria-live="polite"
                >
                  Password Strength: {getStrengthLabel(strength)}
                </Typography>
                {loading ?<div className="flex justify-center items-center"> <img className="w-10" src={loader}></img></div>:
                <button id='btn_hover_main' className= "w-full my-2 py-3 font-semibold rounded-lg text-sm  lg:px-10 md:py-2"
                      type="submit"
                      >{t('reset_my_password')}</button>}
              </Box>
            </StyledPaper>
          </Container>
        ) : (
          <Container>
            <StyledPaper elevation={3}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Password Recovery
              </Typography>

              <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label={t('email')}
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                  aria-label="Email input"
                />
                {loading ?<div className="flex justify-center items-center"> <img className="w-10" src={loader}></img></div>:
                <button id='btn_hover_main' className= "w-full my-2 py-3 font-semibold rounded-lg text-sm  lg:px-10 md:py-2"
                      type="submit"
                      >{t('reset_my_password')}</button>}
              </Box>
              <button onClick={()=>navigate("/login")} className="text-black transition-all hover:scale-105">{t('back_to_login')}</button>
             
            </StyledPaper>
          </Container>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
