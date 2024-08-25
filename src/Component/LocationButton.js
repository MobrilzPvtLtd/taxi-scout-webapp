// LocationButton.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";

const LocationButton = ({ setAddress }) => {
  const [loading, setLoading] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    reverseGeocode(latitude, longitude);
  };

  const error = () => {
    console.error("Unable to retrieve your location");
  };
  const [latestAddress, setLatestAddress] = useState(null);
  const [address1, setAddress1] = useState(null);

  const reverseGeocode = async (lat, lng) => {
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAL0hd3a2l1k1uLSAxQNN511PWkguNxzE4`
      );
      console.log("response" , response)
      // const address = response.data.results[0].formatted_address;
      const address2002 = response.data.results[0];
      const address2 = response.data.results[0].geometry.location;
      // setAddress(address);
      setAddress1(address2002);
      setLatestAddress(address2);
    } catch (error) {
      console.error("Error occurred while reverse geocoding:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   } else {
  //     console.error("Geolocation is not supported by your browser");
  //   }
  // }, []);
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error ,{
        timeout: 10000 
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  },[])
  

  if (loading) {
    return <p>Loading your current address...</p>;
  }

  const handleOnClick = () => {
    setSource({
      lat: address1?.geometry?.location.lat,
      lng: address1?.geometry?.location.lng,
      name: address1?.formatted_address,
      label: address1?.formatted_address
    });

    setAddress(address1);

 
  };
  return (
    <button id="locationButton" type="button" onClick={handleOnClick}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        tabindex="0"
        role="button"
        class="pe-location-fetch css-bOZeEP"
      >
        <title>Navigate right up</title>
        <path
          d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
};

export default LocationButton;
