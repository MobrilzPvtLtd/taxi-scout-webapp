import React, { useContext, useEffect, useState } from "react";
import "../Component/Search_box.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import InputItem from "./InputItem";
import GoogleMapSection from "./GoogleMapSection";
import CarListOption from "./CarListOption";
import taxi from "../Images/taxi.png";
import LocationButton from "./LocationButton";
import CurrentLocation from "./CurrentLocation";
import InputButton from "./InputButton";
// import {Loader, LoaderOptions ,google} from 'google-maps';

function Search_box() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [distance, setDistance] = useState();
  const [credentials, setCredentials] = useState("");
  const [parsedResponse, serParsedResponse] = useState([]);
  const [carFetchFunc, setCarFetchFunc] = useState(null);

  const calculateDistance = () => {
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
    setDistance(distance * 0.000621374);
    setCarFetchFunc(true);
  };

  // console.log("source and destination" , source ,  destination)
  const google = window.google;

  const [data, setData] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [address, setAddress] = useState("");
  useEffect(() => {
    // setSource(address)
  }, []);

  const [options, setOptions] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });

  const handleCheckboxChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  return (
    <div id="box">
      {/* upper box */}

      <div id="upper-box">
        <img
          src={taxi}
          style={{
            height: "50px",
            width: "50px",
            position: "relative",
            left: "210px",
          }}
        />
        <span
          class="css-bQCKjs"
          style={{ fontSize: "25px", fontWeight: "700" }}
        >
          Ride
        </span>
        <div id="outline"></div>
      </div>

      {/* main box */}

      <div id="main-box">
        <div class="css-hPnljU">
          <h2 class="css-jzIGNN">Request a ride now</h2>
        </div>
        <div class="search-input ">
          {/* <div className="flex justify-center"> */}
          {/* <InputButton ></InputButton> */}
          <InputItem type="source" />

          <LocationButton setAddress={setAddress} />
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
          onClick={() => calculateDistance()}
        >
          Search
        </button>

        <h2 className="text-[20px] mt-3 font-bold">Prefrences : </h2>

        <div className="mt-1 d-flex justify-center gap-4">
          <div className="d-flex gap-3 text-[16px] font-[600]">
            <label>
              <input
                type="checkbox"
                checked={options.option1}
                onChange={() => handleCheckboxChange("option1")}
              />
              Smoke
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option2}
                onChange={() => handleCheckboxChange("option2")}
              />
              Alchohol
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option3}
                onChange={() => handleCheckboxChange("option3")}
              />
              Pet
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option4}
                onChange={() => handleCheckboxChange("option4")}
              />
              Handicap
            </label>
          </div>
        </div>
      </div>

      {distance ? (
        <CarListOption
          carFetchFunc={carFetchFunc}
          option1={options.option1}
          option2={options.option2}
          option3={options.option3}
          option4={options.option4}
          distance={distance}
          // token = {token}
        />
      ) : null}
    </div>
  );
}

export default Search_box;
