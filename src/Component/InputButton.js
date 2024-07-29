import React, { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.730610,
  lng: -73.935242,
};

function InputButton() {
  const [address, setAddress] = useState("");
let google = window.google
  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSelect = (address) => {
    setAddress(address);
  };

  const handleCurrentAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geocoder = new google.maps.Geocoder();
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              setAddress(results[0].formatted_address);
          
            } else {
              alert("No results found");
            }
          } else {
            alert("Geocoder failed due to: " + status);
          }
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Autocomplete onLoad={(autocomplete) => {}} onPlaceChanged={handleSelect}>
            {({ getInputProps, getSuggestionItemProps, loading, suggestions }) => (
              <div>
                <input {...getInputProps({ value: address, onChange: handleChange })} />
                <div>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Autocomplete>
        </GoogleMap>
      </LoadScript>
      <form>
        <label>
          Street address
          <input type="text" value={address} readOnly />
        </label>
        <button type="button" onClick={handleCurrentAddress}>
          Use Current Address
        </button>
      </form>
    </div>
  );
}

export default InputButton;