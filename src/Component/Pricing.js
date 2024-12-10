import { Skeleton } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const SubscriptionPage = () => {
  const { t } = useTranslation();
  const {userType , setUserType} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let url = "https://admin.taxiscout24.com";
  const [price, setPrice] = useState();
  useEffect(() => {
    const handlePrice = async () => {
      setLoading(true);
      const response = await axios.get(`${url}/api/v1/admin/packages`);
      if (response) {
        setPrice(response.data);
        setLoading(false);
      }
    };
    handlePrice();
  }, []);
  return (
    <>
      {loading ? (
        <div className="container  mx-auto px-0 sm:px-2">
          <Skeleton active />
        </div>
      ) : (
        <section class="bg-gradient-to-r from-yellow-500 to-orange-500 py-12 mt-16  ">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <div class="text-4xl font-extrabold text-black sm:text-5xl">
                <h1> {t(`pricing_text1`)} </h1>
              </div>
              <p class="mt-4 text-xl text-gray-700">
              {t(`pricing_text2`)}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {price?.map((item, index) => (
                <div
                  class="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden"
                  key={index}
                >
                  {/* <div class="absolute top-0 right-0 m-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {item.package_name}
                    </span>
                  </div> */}
                  <div class="mb-8">
                    <h3 class="text-xs  sm:text-sm md:text-lg lg:text-xl font-semibold text-black">
                      {item.package_name}
                    </h3>
                    {/* <p class="mt-4 text-purple-200">Perfect for individuals and small teams.</p> */}
                  </div>
                  <div class="mb-8">
                    <span class="text-5xl font-extrabold text-black">
                      ${item.amount}
                    </span>
                    <span class="text-xl font-medium text-black-300">/{t(`pricing_text3`)}</span>
                  </div>
                  <ul class="mb-8 space-y-4 text-gray-700">
                    <li class="flex items-center">
                      <svg
                        class="h-6 w-6 text-green-400 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item.number_of_drivers} {t(`pricing_text4`)}</span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-6 w-6 text-green-400 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span> {t(`pricing_text5`)}</span>
                    </li>
                  </ul>
                  <Link
                    to="/signup"
                    onClick={()=>setUserType(t('company'))}
                    class="block w-full py-3 px-6 text-center rounded-md text-black font-semibold bg-gradient-to-r from-yellow-600 to-[#ffd91c] hover:from-yellow-700 hover:to-orange-400"
                  >
                     {t(`pricing_text6`)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SubscriptionPage;
