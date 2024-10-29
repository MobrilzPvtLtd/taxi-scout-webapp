import React from "react";
import app_store from "../Images/app_store.png";
import google_play from "../Images/google_play.png";
import mobileTaxi from "../Images/Taxi-Booking-App-Development.png"
import { useTranslation } from "react-i18next";

const AppDownloadButtons = () => {
  const {t} = useTranslation();
  return (
    <div className=" bg-gray-100 ">
    <div className="container px-2 md:flex lg:px-10 pt-5">
      <div className="flex flex-col items-center justify-center px-5 w-full md:w-1/2">
        <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl">{t('toolsandideas')}</h1>
        <p className="px-0 text-justify text-xs sm:px-20 sm:text-md  md:text-xl lg:px-10 lg:text-xl">
         {t('toolsandideasDescription')}
        </p>
        <div className="flex flex-row justify-center items-center">
          <img className=" p-0 m-0 w-40 sm:w-52 h-fit hover:cursor-pointer" src={google_play} alt={google_play} />
          <img className="p-0 m-0 w-40 sm:w-52 h-fit hover:cursor-pointer" src={app_store} alt={app_store} />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center w-1/2"><img className="w-96" src={mobileTaxi} alt={mobileTaxi} /></div>
    </div>
    </div>

  );
};

export default AppDownloadButtons;
