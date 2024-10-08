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
import TaxiScheduler from "./TaxiScheduler";
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
  const [taxi_schedule_form, setTaxi_schedule_form] = useState(false);

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
  // const handle_schedule_taxi = () => {
  //   setTaxi_schedule_form(true);
  // };
  // const handle_taxi_schedule_cancel = () => {
  //   setTaxi_schedule_form(false);
  // };
  return (
    <div className="p-2 sm:container w-full  sm:px-4 border-2 border-black rounded-lg">
      {/* upper box */}

      <div className="flex flex-col justify-center items-center">
        <img
          src={taxi}
          alt="taxi"
          className="w-10"
        />
        <span
          className="text-xl font-semibold"
        >
          Ride
        </span>
        <div className="bg-black h-1 w-10"></div>
      </div>

      {/* main box */}

      <div >
        <div >
          <h2 className="text-2xl font-semibold">Request a ride now</h2>
        </div>
        <div >
          <div className="relative h-full w-full">
            <InputItem type="source" />
            <div className="absolute top-0 right-1 translate-y-3 sm:translate-y-1 lg:translate-y-[-10%] lg:right-0 translate-x-[10%]  ">
              <LocationButton setAddress={setAddress} />
            </div>
          </div>
          <InputItem type="destination" />
          {/* <InputButton/> */}
          {/* </div> */}
        </div>
        <div className="flex flex-col items-center">
          <button
            
            onClick={() => calculateDistance()}
          >
            Search
          </button>
          {/* <button id="schedule_ride_btn" onClick={handle_schedule_taxi}>
            Schedule a ride{" "}
          </button>
          {taxi_schedule_form == true ? (
            <div id="taxi_scheduler">
              <div id="taxi_scheduler_overley"></div>
              <div id="taxi_scheduler_overley_lifter">
                <button
                  id="taxi_schedule_cancel"
                  onClick={handle_taxi_schedule_cancel}
                >
                  X
                </button>
                <TaxiScheduler />
              </div>
            </div>
          ) : null} */}
        </div>

        <h2 className="text-xl mt-4 font-bold">Prefrences : </h2>

        <div className="mt-1 flex justify-center gap-4">
          <div className="flex gap-3 text-sm font-[600]">
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
          carFetchFunc={calculateDistance}
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
