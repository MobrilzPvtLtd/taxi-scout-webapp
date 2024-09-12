import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SIgnup from './Component/SIgnup';
import Login from './Component/Login';
import Cards from './Component/Cards';
import SignupPage from './Component/SignupPage';
import LoginPage from './Component/LoginPage';
import HomePage from './Component/HomePage';
import Registor from './Component/Register';
import { SourceContext } from './Context/SourceContext';
import { useState } from 'react';
import { DestinationContext } from './Context/DestinationContext';
import { LoadScript } from '@react-google-maps/api';
import MainPage from './Component/MainPage';
import Payment from './Component/Payment';
import CheckOutForm from './Component/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreateRentalRequest from './Component/CreateRentalRequest';
import CompanyLogin from './Component/Compnay/CompanyLogin';
import CompanySignUp from './Component/Compnay/CompanySignUp';
import DriverSearchBox from './Component/DriverSearchBox';
import LATLNG_State from './Context/LATLNG_State';
import Contact from './Component/Contact';
import Faq from './Component/Faq';
import How_It_Works from './Component/How_It_Works';
import Pricing from './Component/Pricing';
import Blogs from './Component/Blogs';
import Gallery from './Component/Gallery';
import Our_Team from './Component/Our_Team';
import Term_Of_Use from './Component/Term_Of_Use';
import Term_Of_Services from './Component/Term_Of_Services';
import Privacy_Policy from './Component/Privacy_Policy';
import Our_Partner from './Component/Our_Partner';
import "./Aryann.css"
import About_us from './Component/About_us';
import Home_search_box from './Component/Home_search_box';
import Landing from './Component/Landing';
import OtpVerify from './Component/OtpVerify';
import EditProfilePage from './Component/EditProfilePage';
import ChatPopup from './Component/chatPopup';
import BookingCompleted from './Component/BookingCompleted';
import "./Responsive.css"
import { NavbarMain } from './Component/Navbar_Main';
import { Footer } from './Component/UI/Footer/Footer';
import Card from './Component/Blogs';
import Articles from './Component/Blogs';
import BlogDetail from './Component/BlogDetails';
// import firebase from 'firebase'

function App() {

  let token = sessionStorage.token ;
  const [source, setSource]= useState([])
  const [destination, setDestination]= useState([])
  const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');



  console.log("current path name" , window.location.pathname)

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/100'
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

 const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <Elements stripe={stripePromise} >
    <SourceContext.Provider value={{source, setSource}}>
      <DestinationContext.Provider value={{destination , setDestination}}>
   
   {/* <LoadScript
   libraries={['places']} 
   googleMapsApiKey={'AIzaSyAhZQSz7cUgNdkv1V05EjT26V_UtKSH5y4'}> */}
    <div className="App">
     <BrowserRouter>
     <LATLNG_State>
     
      <NavbarMain id='navbar_main_sticky'/>
     
      <div className="chat-box" onClick={togglePopup}>
        <div className="chat-header">Chat with us!</div>
      </div>
      {showPopup && <ChatPopup />}
     {/* <MainPage/> */}
      <div id='main_component'>
      <Routes>
      {/* <Route path = "/" element = {<Login/>} /> */}
      <Route path='/home' element =  {<Home/>} />
      {/* <Route path='/SIgnup' element =  {<SIgnup/>} /> */}
      <Route path='/signup' element =  {<SignupPage/>} />
      <Route path='/login' element =  {<LoginPage/>} />
      
      <Route path='/registor' element =  {<Registor/>} />
      <Route path='/payment' element =  {<Payment/>} />
      <Route path='/checkout' element =  {<CheckOutForm/>} />
      <Route path='/rental' element =  {<CreateRentalRequest/>} />
      <Route path='/company' element =  {<CompanyLogin/>} />
      <Route path='/driver' element =  {<DriverSearchBox/>} />
      {/* <Route path='/about' element =  {<About/>} /> */}
      <Route path='/about' element =  {<About_us/>} />
      <Route path='/' element = {<Landing/>}/>
      <Route path='/contact' element =  {<Contact/>} />
      <Route path='/faq' element =  {<Faq/>} />
      <Route path='/how-it-works' element =  {<How_It_Works/>} />
      <Route path='/pricing' element =  {<Pricing/>} />
      <Route path='/blogs' element =  {<Blogs/>} />
      <Route path='/gallery' element =  {<Gallery/>} />
      <Route path='/our-team' element =  {<Our_Team/>} />
      <Route path='/term-of-use' element =  {<Term_Of_Use/>} />
      <Route path='/term-of-services' element =  {<Term_Of_Services/>} />
      <Route path='/privacy-policy' element =  {<Privacy_Policy/>} />
      <Route path='/our-partner' element =  {<Our_Partner/>} />
      <Route path='/OtpVerify' element =  {<OtpVerify/>} />
      <Route path='/edit-profile' element =  {<EditProfilePage />} />
      
      <Route path='/booking-completed' element =  {<BookingCompleted/>} />
      <Route path="/blog/:id" element={<BlogDetail/>} />
      
     
      


      </Routes>
      {/* {(window.location.pathname =="/taxi-scout")?
      <Landing/> : null} */}
     
      </div>
      </LATLNG_State> 
     </BrowserRouter>

    </div>
    <Footer/>
    {/* </LoadScript> */}
    </DestinationContext.Provider>
    </SourceContext.Provider>
    </Elements>
  );
}

export default App;
