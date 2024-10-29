import "./App.css";
import Home from "./Component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Component/SignupPage";
import LoginPage from "./Component/LoginPage";
import Registor from "./Component/Register";
import { SourceContext } from "./Context/SourceContext";
import { useState } from "react";
import { DestinationContext } from "./Context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";
import MainPage from "./Component/MainPage";
import Payment from "./Component/Payment";
import CheckOutForm from "./Component/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreateRentalRequest from "./Component/CreateRentalRequest";
import CompanyLogin from "./Component/Compnay/CompanyLogin";
import CompanySignUp from "./Component/Compnay/CompanySignUp";
import LATLNG_State from "./Context/LATLNG_State";
import Contact from "./Component/Contact";
import Faq from "./Component/Faq";
import How_It_Works from "./Component/How_It_Works";
import Pricing from "./Component/Pricing";
import Blogs from "./Component/Blogs";
import Gallery from "./Component/Gallery";
import Our_Team from "./Component/Our_Team";
import Term_Of_Use from "./Component/Term_Of_Use";
import Term_Of_Services from "./Component/Term_Of_Services";
import Privacy_Policy from "./Component/Privacy_Policy";
import Our_Partner from "./Component/Our_Partner";
import "./Aryann.css";
import About_us from "./Component/About_us";
import Home_search_box from "./Component/Home_search_box";
import Landing from "./Component/Landing";
import OtpVerify from "./Component/OtpVerify";
import EditProfilePage from "./Component/EditProfilePage";
import ChatPopup from "./Component/chatPopup";
import BookingCompleted from "./Component/BookingCompleted";
import { NavbarMain } from "./Component/Navbar_Main";
import { Footer } from "./Component/UI/Footer/Footer";
import BlogDetail from "./Component/BlogDetails";
import ProtectedRoute from "./Component/ProtectedRoute";
import ForgetPassword from "./Component/Forget Password/ForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import CookieConsentPopup from "./Component/CookieConsentPopup";
import "./Component/i18n"

function App() {
  let token = sessionStorage.getItem("token");
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
  );

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/100",
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  let rqstId = sessionStorage.id;

  return (
    <Elements stripe={stripePromise}>
     
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
                
          <div className="App bg-gradient-to-r from-yellow-500 to-[#f99816]">
            <CookieConsentPopup/>
            <BrowserRouter>
              <LATLNG_State>
                <NavbarMain />
                {rqstId ? (
                  <div>
                    <div className="chat-box" onClick={togglePopup}>
                      <div className="chat-header">Chat with us!</div>
                    </div>
                    {showPopup && <ChatPopup />}
                  </div>
                ) : null}
                {/* <MainPage/> */}
                <div className="w-full main-app-body">
                  <Routes>
                    <Route path="/" element={token ? <Home /> : <Landing />} />

                    <Route
                      path="/signup"
                      element={
                        <ProtectedRoute>
                          <SignupPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <ProtectedRoute>
                          {" "}
                          <LoginPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/registor" element={<Registor />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/checkout" element={<CheckOutForm />} />
                    <Route path="/rental" element={<CreateRentalRequest />} />
                    <Route path="/company" element={<CompanyLogin />} />
                    <Route path="/about-us" element={<About_us />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/how-it-works" element={<How_It_Works />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/our-team" element={<Our_Team />} />
                    <Route path="/term-of-use" element={<Term_Of_Use />} />
                    <Route
                      path="/term-of-services"
                      element={<Term_Of_Services />}
                    />
                    <Route
                      path="/privacy-policy"
                      element={<Privacy_Policy />}
                    />
                    <Route path="/our-partner" element={<Our_Partner />} />
                    <Route path="/OtpVerify" element={<OtpVerify />} />
                    <Route path="/edit-profile" element={<EditProfilePage />} />

                    <Route
                      path="/booking-completed"
                      element={<BookingCompleted />}
                    />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    
                  
                  </Routes>
                </div>
              </LATLNG_State>

              <Footer />
            </BrowserRouter>
          </div>
         
        </DestinationContext.Provider>
      </SourceContext.Provider>
         
    </Elements>
  );
}

export default App;
