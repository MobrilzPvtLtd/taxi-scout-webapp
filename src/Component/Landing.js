import React, { useContext, useState } from "react";
import InputItem from "./InputItem";
import LocationButton from "./LocationButton";
import { useNavigate } from "react-router-dom";
import banner from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif";
import taxi from "../Images/taxi.png";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import CarListOption from "./CarListOption";
import bg_1 from "../Images/bg_1.jpg";
import bg_2 from "../Images/bg_2.jpg";
import bg_3 from "../Images/OIG4.LOjK9uqO7Lj.OtzgY5XW.jpg";
import bg_4 from "../Images/serve_globally.jpg";
import bg_5 from "../Images/serve_globally2.jpg";
import ChatPopup from "./chatPopup";

const Landing = () => {
  const [distance, setDistance] = useState();
  const [carFetchFunc, setCarFetchFunc] = useState(null);

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

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [address, setAddress] = useState("");
  const calculateDistance = () => {
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
    setDistance(distance * 0.000621374);
    setCarFetchFunc(true);
  };
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const handleRedirect = () => {
    token != null || undefined ? history("/home") : history("/login");
  };

  return (
    <>
    <div className="pt-5 sm:mt-0 md:pt-10">
      <div className="pb-2 md:container px-2 flex justify-center items-center gap-10 container ">
        <div className="px-2 flex flex-col-reverse justify-center items-center lg:container lg:w-1/2 lg:flex-col gap-3 ">
          <div className="flex flex-col ">
            <h1 className="uppercase font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl">
              ORDER TAXI TODAY{" "}
            </h1>
            <p className="px-4 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              With the TaxiScout app, you can travel safely from A to B –
              wherever you are. Are you traveling by wheelchair or need help
              elsewhere? No problem, we take your individual
              requests into account.
            </p>
          </div>
          <div className="w-4/5 p-3 border-2 border-black rounded-lg bg-white">
            <div id="upper-box">
              <img
                src={taxi}
                alt="taxi"
                className="w-10 lg:w-20 object-cover rounded-lg"
              />
              <span className="text-2xl font-semibold">Ride</span>
              <div className="bg-black h-1 w-10"></div>
            </div>

            {/* main box */}

            <div className="">
              <div class="text-sm sm:text-2xl lg:text-4xl font-semibold">
                Request a ride now
              </div>
              <div class="">
                <div className="relative px-10">
                  <InputItem type="source" />
                  <div className="absolute top-0 right-1 translate-y-2 sm:translate-y-0 md:translate-y-1 lg:translate-y-[-10%] lg:right-0 translate-x-[-60%] ">
                    <LocationButton setAddress={setAddress} />
                  </div>
                </div>
                <div className="relative px-10">
                  <InputItem type="destination" />
                </div>
              </div>
              <button
                className="w-fit my-2 px-10 bg-black text-white "
                onClick={handleRedirect}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div
          className="hidden lg:flex items-center justify-center xl:w-1/2
         "
        >
          <img className="rounded-lg w-3/5" src={bg_1}></img>
        </div>
      </div>
      <div className="bg-white pt-3 sm:pt-4  rounded-2xl flex flex-col justify-center items-center ">
        <div className="px-0 sm:px-20">
        <h1 className="uppercase font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl ">
          Smart Way to Order a Taxi
        </h1>
        <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-white sm:pt-3 pb-3 sm:gap-4">
          <div className="w-50 flex justify-center">
            <img className="rounded-xl w-96 aspect-square" src={bg_2}></img>
          </div>
          <div className="w-50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
              You do not have to call
            </h1>
            <p className=" px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              You do not like to make phone calls or do not have time to dial
              the number? Or maybe you currently have poor network coverage?
              Maybe you are also in a meeting and do not want to be disturb?
              This is not a problem! You can comfortably order your taxi with
              just a few clicks via our app.
            </p>
          </div>
        </div>
        <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-white sm:pt-3 pb-3 sm:gap-4">
          <div className="w-50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
              There is no extra <br></br>waiting time
            </h1>
            <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              You are in a hurry and need to get from point A to point B
              quickly? Or are you on the road and do not have time to wait for a
              taxi? Maybe you spontaneously decided to go out? With Taxi Scout
              you have no extra waiting time - you can order a taxi via the app
              and it will be at your doorstep in few minutes!
            </p>
          </div>
          <div className="w-50 flex justify-center">
            <img
              src={bg_3}
              width={700}
              className="rounded-lg aspect-square w-96"
            ></img>
          </div>
        </div>
        <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-white sm:pt-3 pb-3 sm:gap-4">
          <div className="w-50 flex justify-center">
            <img
              src={bg_4}
              width={700}
              className="rounded-xl w-96 aspect-square"
            ></img>
          </div>
          <div className="w-50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
              Everything is clear <br></br> and transparent
            </h1>
            <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              Probably this sounds familiar: You ordered your taxi, you've been
              told estimated time, you are still waiting but your taxi is not
              there yet, and nobody tells you why. With Tаxi Scout everything is
              clear and transparent. Once you order a taxi, you will be able to
              track its position in real time and get the estimated time of
              arrival.
            </p>
          </div>
        </div>
        <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-white sm:pt-3 pb-3 sm:gap-4">
          <div className="w-50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
              Do you have special requests? <br></br> No problem!
            </h1>
            <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              You need to order a taxi to the train station or the airport? You
              need a wheelchair accessible taxi? Whatever your situation is, we
              fulfill your special requirements, just let us know!
            </p>
          </div>
          <div className="w-50 flex justify-center">
            <img
              src={bg_3}
              width={700}
              className="rounded-lg w-96 aspect-square"
            ></img>
          </div>
        </div>
        <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-white sm:pt-3 pb-3 sm:gap-4">
          <div className="w-50 flex justify-center">
            <img
              src={bg_4}
              width={700}
              className="rounded-xl w-96 aspect-square"
            ></img>
          </div>
          <div className="w-50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
              We accept credit cards <br></br>and cash payments
            </h1>
            <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
              You have ordered a taxi and have no cash? No problem! You can
              easily pay by credit card. Our paying system accepts all
              credit cards and cash.
            </p>
          </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Landing;
