import React from "react";
import Cards from "./Cards";
import SIgnup from "./SIgnup";
import Search_box from "./Search_box";
import GoogleMapSection from "./GoogleMapSection";
import "./Home.css";

const Home = (createRequest, parsedResponse) => {
  const SignupButton = () => {
    <SIgnup style={{ display: "none" }} />;
  };

  const headerMenu = [
    {
      id: 1,
      name: "Make A Booking",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "My Trips",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "Change Language",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "Make Complaints",
      icon: "/taxi.png",
    },
    {
      id: 2,
      name: "About",
      icon: "/taxi.png",
    },
  ];

  SignupButton();
  return (
    <div className="flex justify-center">
    <div className="w-full pt-20 mt-10 pb-5 flex gap-4 flex-col min-h-[100vh] sm:container sm:flex-row px-4 ">
      <div className="w-full sm:w-1/3 ">
        <Search_box
          createRequest={createRequest}
          parsedResponse={parsedResponse}
        />
      </div>
      <div className="w-full h-full sm:w-2/3   ">
        <GoogleMapSection />
      </div>
    </div>
    </div>
  );
};

export default Home;
