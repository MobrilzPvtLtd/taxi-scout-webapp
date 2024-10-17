import React, { useContext, useEffect, useState } from "react";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LATLNG_State from "../Context/LATLNG_State";
import LocationButton from "./LocationButton";

function InputItem(type, getData) {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [placeholder, setPlaceholder] = useState(null);
  const [value, setValue] = useState(null);



  useEffect(() => {
    type.type == "source"
      ? setPlaceholder((source.label)?(`${(source?.label)?.slice(0,40)}...`) : "Pickup Location")
      : setPlaceholder((destination?.label) || "Dropoff Location");
  }, [source]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [address, setAddress] = useState("");

  const [placeAddress, setPlaceAddress] = useState(
    /** @google.maps.places */ null
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        address: "",
      });

      // console.log(place)
    });

    // const getLatAndLngAddress = async(place)=>{
    //   const placeId = await place.value.place_id
    //   console.log("placeId" , placeId)
    //   }
    //   getLatAndLngAddress()
  }, []);

  const google = window.google;
 

  const getLatAndLng = async (place, type) => {
    // console.log(place,type)
    const placeId = await place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        if (type == "source") {
          setSource({
            lat: place?.geometry?.location.lat(),
            lng: place?.geometry?.location.lng(),
            name: place?.formatted_address,
            label: place?.name,
          });
        } else {
          setDestination({
            lat: place?.geometry?.location.lat(),
            lng: place?.geometry?.location.lng(),
            name: place?.formatted_address,
            label: place?.name,
          });
        }
      }
    });
  };

  const [loading, setLoading] = useState(null);
  useEffect(() => {
    setLoading(true);
  }, []);

  const handleInputChange = (event) => {
    setAddress(event.target.value); // Update the address state with the input value
  };

  return (
    <div className="flex justify-center">
      <GooglePlacesAutocomplete
        // apiKey={process.env.REACT_PUBLIC_GOOGLE_API_KEY}
        //  className = "inputData"
        //  value = {address}
        //  onChange = {handleInputChange}
        //  initialValue= "noida sector 63"
        selectProps={{
          value,

          onChange: (place) => {
            getLatAndLng(place, type.type);

            setValue(place);
          },

          placeholder: placeholder,
          // isClearable:true,
          className: "w-60 sm:w-full text-xs  sm:text-xl",
          component: { DropDownIndicator: false },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#f6f6f6",
              border: "none",
              padding: "10px 0",
              margin: "10px 5px",
              borderRadius: "10px",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
