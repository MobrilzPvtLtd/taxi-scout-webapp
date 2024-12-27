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
import { useTranslation } from "react-i18next";

function Search_box() {
  const { t } = useTranslation();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [distance, setDistance] = useState();
  const [credentials, setCredentials] = useState("");
  const [parsedResponse, serParsedResponse] = useState([]);
  const [carFetchFunc, setCarFetchFunc] = useState(null);
  const [taxi_schedule_form, setTaxi_schedule_form] = useState(false);

  const calculateDistance = async () => {
    const apiKey = "AIzaSyAL0hd3a2l1k1uLSAxQNN511PWkguNxzE4"; // Replace with your actual Google API key
    const origin = `${source.lat},${source.lng}`;
    const realDestination = `${destination.lat},${destination.lng}`;
  
    // Construct the Distance Matrix API URL
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${realDestination}&mode=driving&key=AIzaSyAL0hd3a2l1k1uLSAxQNN511PWkguNxzE4`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
        const element = data.rows[0].elements[0];
        if (element.status === "OK") {
          const distanceKm = element.distance.value / 1000; // Convert meters to kilometers
          setDistance(distanceKm);
          console.log(`Driving Distance: ${distanceKm} km`);
        } else {
          console.error("Error in element status:", element.status);
        }
      } else {
        console.error("Error in API response:", data.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    setCarFetchFunc(true); // Assuming this needs to be called after calculating the distance
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
    <div className="w-full p-3 border-2 border-black rounded-lg bg-white">
      {/* upper box */}

      <div className="flex flex-col justify-center items-center">
        <img src={taxi} alt="taxi" className="w-10" />
        <span className="text-xl font-semibold">{t("ride")}</span>
        <div className="bg-black h-1 w-10"></div>
      </div>

      {/* main box */}

      <div>
        <div>
          <h2 className="text-2xl font-semibold">{t("requestRide")}</h2>
        </div>
        <div>
          <div className="flex flex-col h-full w-full gap-2">
            {/* Source Input Field */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex-1">
                <InputItem type="source" currentAddress={setAddress} />
              </div>
              <div className="translate-x-[-2.5rem]">
                <LocationButton setAddress={setAddress} />
              </div>
            </div>

            {/* Destination Input Field */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex-1">
                <InputItem type="destination" />
              </div>
              <div className="opacity-0 invisible ">
                <LocationButton setAddress={setAddress} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            id="btn_hover_main"
            className="w-1/2 my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
            onClick={() => calculateDistance()}
          >
            {t("search")}
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

        <h2 className="text-xl mt-4 font-bold">{t("prefrences")} : </h2>

        <div className="mt-1 flex justify-center gap-4">
          <div className="flex gap-3 text-sm font-[600]">
            <label>
              <input
                type="checkbox"
                checked={options.option1}
                onChange={() => handleCheckboxChange("option1")}
              />
              {t("smoke")}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option2}
                onChange={() => handleCheckboxChange("option2")}
              />
              {t("alchohol")}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option3}
                onChange={() => handleCheckboxChange("option3")}
              />
              {t("pet")}
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={options.option4}
                onChange={() => handleCheckboxChange("option4")}
              />
              {t("handicap")}
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
