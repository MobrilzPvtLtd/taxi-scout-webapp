import React from "react";
import img from "../Images/serve_globally2.jpg";

const About_us = () => {
  return (
    <div>
      <div className="title_box">
        {/* <div className="title_main container">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">About Us</h1>
            <div className="line001"></div>
          </div>
          <div>
            <p className="text001">
              {" "}
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
          </div>
        </div> */}
        <div className="bg-gray-50 py-16 container my-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
          ar far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={img}
              alt="TaxiScout24"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our company was founded with the vision to revolutionize the taxi
              industry and create a connected world where taxi companies operate
              more efficiently and passengers travel more comfortably. With our
              customized software and app offering, we enable taxi companies of
              all sizes and orientations to optimize their operations and expand
              their reach.
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our state-of-the-art software offers a wealth of features
              specifically designed to simplify the daily operations of taxi
              companies. From order management to fleet tracking, we provide a
              comprehensive solution that allows our customers to work more
              efficiently and improve their service.
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
