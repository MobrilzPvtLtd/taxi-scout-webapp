import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import LocationButton from "./LocationButton";
import { useNavigate } from "react-router-dom";
import banner from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif";
import taxi from "../Images/taxi.png";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import CarListOption from "./CarListOption";
import bg_1 from "../Images/WhatsApp Image 2024-09-14 at 16.08.04_366d98cb.jpg";
import bg_2 from "../Images/IMG-20241005-WA0037.jpg";
import bg_3 from "../Images/IMG-20241005-WA0039.jpg";
import bg_4 from "../Images/IMG-20241027-WA0004.jpg";
import bg_5 from "../Images/serve_globally2.jpg";
import ChatPopup from "./chatPopup";
import AppDownloadButtons from "./AppDownloadButtons";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import LoginPopup from "./LoginPopup";

const Landing = () => {
  const { t } = useTranslation();
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
  const [showPopup, setShowPopup] = useState(true);
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
     {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
      <div className="pt-3 sm:pt-5 sm:mt-0 md:py-1">
        <div className="pb-5 sm:pb-6 md:container px-2 flex justify-center items-center gap-10 container ">
          <div className="px-2 flex flex-col-reverse justify-center items-center lg:container lg:w-1/2 lg:flex-col gap-3 ">
            <div className="flex flex-col ">
              <h1 className="uppercase font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl">
                {t(`landing.title1.1`)}
              </h1>
              <p className="px-4 text-justify text-xs sm:px-20 sm:text-md md:text-xl lg:px-10 lg:text-xl">
                {t("description")}
              </p>
            </div>
            <div className="w-4/5 p-3 border-2 border-black rounded-lg bg-white">
              <div id="upper-box">
                <img
                  src={taxi}
                  alt="taxi"
                  className="w-10 lg:w-20 object-cover rounded-lg"
                />
                <span className="text-2xl font-semibold">{t('ride')}</span>
                <div className="bg-black h-1 w-10"></div>
              </div>
              <div className="">
                <div class="text-sm sm:text-2xl lg:text-4xl font-semibold">
                {t('requestRide')}
                </div>
                <div>
          <div className="flex flex-col h-full w-full gap-2">
            {/* Source Input Field */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex-1">
                <InputItem type="source" />
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
                <button
                  id="btn_hover_main"
                  className="w-1/2 my-2 px-10 py-2 font-semibold rounded-lg bg-black text-white hover:bg-white hover:text-black "
                  onClick={handleRedirect}
                >
                   {t('searchButton')}
                </button>
              </div>
            </div>
          </div>

          <div
            className="hidden xl:flex items-center justify-center xl:w-1/2
         "
          >
            <img className="rounded-lg w-3/5" src={bg_1}></img>
          </div>
        </div>
        <div className="bg-gray-100 pt-3 sm:pt-4  rounded-2xl flex flex-col justify-center items-center ">
          <div className="px-0 sm:px-20">
            <h1 className="uppercase font-semibold text-lg sm:text-xl md:text-2xl lg:text-4xl ">
            {t('smart_way')}
            </h1>
            <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-gray-100 sm:pt-3 pb-3 sm:gap-4">
              <div className="w-50 flex justify-center">
                <img className="rounded-xl w-96 aspect-square" src={bg_2}></img>
              </div>
              <div className="w-50 flex flex-col justify-center items-center">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
                  {t('doNotCall')}
                </h1>
                <p className=" px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
                {t('doNotCallDescription')}
                </p>
              </div>
            </div>
            <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-gray-100 sm:pt-3 pb-3 sm:gap-4">
              <div className="w-50 flex flex-col justify-center items-center">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
                 {t("noExtraWaitingTime")}
                </h1>
                <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
                  {t('noExtraWaitingTimeDescription')}
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
            <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-gray-100 sm:pt-3 pb-3 sm:gap-4">
              <div className="w-50 flex justify-center">
                <img
                  src={bg_4}
                  width={700}
                  className="rounded-xl w-96 aspect-square"
                ></img>
              </div>
              <div className="w-50 flex flex-col justify-center items-center">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
                {t("clearAndTransparent")}
                </h1>
                <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
                 {t('clearAndTransparentDescription')}
                </p>
              </div>
            </div>
            <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-gray-100 sm:pt-3 pb-3 sm:gap-4">
              <div className="w-50 flex flex-col justify-center items-center">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
                {t("specialRequests")}
                </h1>
                <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
                 {t('specialRequestsDescription')}
                </p>
              </div>
              <div className="w-50 flex justify-center">
                <img
                  src={bg_5}
                  width={700}
                  className="rounded-lg w-96 aspect-square"
                ></img>
              </div>
            </div>
            <div className="px-3 pt-0 gap-3 sm:container flex justify-center items-center  bg-gray-100 sm:pt-3 pb-3 sm:gap-4">
              <div className="w-50 flex justify-center">
                <img
                  src={bg_4}
                  width={700}
                  className="rounded-xl w-96 aspect-square"
                ></img>
              </div>
              <div className="w-50 flex flex-col justify-center items-center">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">
                {t("paymentOptions")}
                </h1>
                <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
                 {t('paymentOptionsDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <AppDownloadButtons />
      </div>
    </>
  );
};

export default Landing;
