import React, { useState } from "react";
import img from "../Images/serve_globally2.jpg";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
const About_us = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div>
        {loading ? (
          <div className="container  mx-auto px-0 sm:px-2"><Skeleton active /></div>
        ) : (
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
                  {t('about_us')}
                </h1>
                <p className="text-gray-700 text-lg   leading-relaxed mb-6 px-3 sm:px-0 text-justify xl:px-5 ">
                {t('about_text1')}
                </p>
              </div>
            </div>
          </div>
      </div>
        )}
    </div>
  );
};

export default About_us;
