import React from "react";
import img from "../Images/serve_globally2.jpg";

const About_us = () => {
  return (
    <div>
      <div className="">
        <div className="bg-gray-50 pt-0 lg:pt-10">
          <div className="container  mx-auto px-0 sm:px-2">
                <h1 className="block lg:hidden"> About Us</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <img
                  src={img}
                  alt="TaxiScout24"
                  className="rounded-lg shadow-lg w-2/3 aspect-square"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="hidden lg:block text-3xl font-semibold text-gray-800 mb-4">
                  About Us
                </h1>
                <p className="text-gray-700 text-lg   leading-relaxed mb-6 px-3 sm:px-0 text-justify xl:px-5 ">
                  Welcome to TaxiScout24, your global partner for innovative
                  taxi software solutions. We are proud to provide a pioneering
                  platform that supports taxi companies worldwide and offers
                  passengers a seamless travel experience. Our company was
                  founded with the vision to revolutionize the taxi industry and
                  create a connected world where taxi companies operate more
                  efficiently and passengers travel more comfortably. With our
                  customized software and app offering, we enable taxi companies
                  of all sizes and orientations to optimize their operations and
                  expand their reach. Our state-of-the-art software offers a
                  wealth of features specifically designed to simplify the daily
                  operations of taxi companies. From order management to fleet
                  tracking, we provide a comprehensive solution that allows our
                  customers to work more efficiently and improve their service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_us;
