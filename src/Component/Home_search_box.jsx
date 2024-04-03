import React, { useState } from 'react'
import InputItem from './InputItem'
import LocationButton from './LocationButton'
import {  useNavigate} from 'react-router-dom'



const Home_search_box = () => {
const history = useNavigate();
    const handleSubmit = () => {

        history ('/login')
        console.log("hariom", history)
    }
    
//   const calculateDistance = () => {
//     const distance =
//       window.google.maps.geometry.spherical.computeDistanceBetween(
//         { lat: source.lat, lng: source.lng },
//         { lat: destination.lat, lng: destination.lng }
//       );
//     setDistance(distance * 0.000621374);
//     setCarFetchFunc(true);
//   };
//   const [address, setAddress] = useState("");
  return (
    <div><div id="main-box">
    <div class="css-hPnljU">
      <h2 class="css-jzIGNN">Request a ride now</h2>
    </div>
    <div class="search-input ">
      {/* <div className="flex justify-center"> */}
      {/* <InputButton ></InputButton> */}
      <InputItem type="source" />

      {/* <LocationButton setAddress={setAddress} /> */}
      
      {/* </div> */}
      {/* <LocationButton onClick ={(()=> set(address))} /> */}
      {/* <div className="flex justify-center mr-9"> */}

      <InputItem type="destination" />
      {/* <InputButton/> */}
      {/* </div> */}
    </div>
    <button
      style={{
        backgroundColor: "black",
        borderRadius: "10px",
        height: "70px",
        width: "220px",
        fontSize: "28px",
        marginTop: "20px",
        marginRight: "25px",
      }}
      onClick={handleSubmit}
    >
      Search
    </button>
    </div>
    </div>


  )
}

export default Home_search_box