// src/FAQ.js
import axios from "axios";
import React, { useState, useEffect } from "react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]); // To store FAQ data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [activeIndex, setActiveIndex] = useState(null); // To manage accordion

  useEffect(() => {
    // Replace with your actual API endpoint
    let url = "https://admin.taxiscout24.com";

    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/faq`);
        console.log("faq response", response);
        if (!response.data.success) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.data.data;
        setFaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        {/* Simple loader, you can customize or use a library */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div id='banner_img_home' class="p-8">
      <div class="bg-[#ffffff] p-4 rounded-lg shadow-xl py-8 mt-12">
        <h4 class="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
          FAQ
        </h4>
        <p class="text-center text-gray-600 text-sm mt-2">
          Here are some of the frequently asked questions
        </p>
        <div class="space-y-12 px-2 xl:px-16 mt-12">
          {faqs.map((faq, index) => (
          <div class="mt-4 flex">
            <div>
              <div class="flex items-center h-16 border-l-4 border-blue-600">
                <span class="text-4xl text-blue-600 px-4">Q.</span>
              </div>
              <div class="flex items-center h-16 border-l-4 border-gray-400">
                <span class="text-4xl text-gray-400 px-4">A.</span>
              </div>
            </div>
            <div>
              <div class="flex items-center h-16">
                <span class="text-lg text-blue-600 font-bold">
                  {faq.question}?
                </span>
              </div>
              <div class="flex items-left py-2">
                <span class="text-gray-500 text-left">
                 {faq.answer}
                </span>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
