// src/FAQ.js
import React, { useState } from "react";
import bg from "../Images/Designer.jpeg"
import { useTranslation } from "react-i18next";
const FAQ = () => {
  const { t } = useTranslation();
const FAQs = [
  {
    question: t(`faq_text2`) , 
    answer: t(`faq_text3`)
  },
  {
    question: t(`faq_text4`),
    answer: t(`faq_text5`)
  },
   {
    question: t(`faq_text6`),
    answer: t(`faq_text7`) },
  {
    question: t(`faq_text8`),
    answer: t(`faq_text9`) },
  {
    question: t(`faq_text10`),
    answer: t(`faq_text11`) },
  {
    question: t(`faq_text12`),
    answer: t(`faq_text13`) },
  {
    question: t(`faq_text14`),
    answer: t(`faq_text15`) },
  {
    question: t(`faq_text16`),
    answer: t(`faq_text17`) },
  {
    question: t(`faq_text18`),
    answer: t(`faq_text19`)},
  {
    question: t(`faq_text20`),
    answer: t(`faq_text21`) },
  {
    question: t(`faq_text22`),
    answer: t(`faq_text23`) },
  {
    question: t(`faq_text24`),
    answer: t(`faq_text25`) },
  {
    question: t(`faq_text26`),
    answer: t(`faq_text27`)  },
    {
      question: t(`faq_text28`),
      answer: t(`faq_text29`)},
];


  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="relative transition-all min-h-screen bg-cover bg-center flex justify-center items-center py-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Blurry Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

      {/* FAQ Container */}
      <div className="relative  bg-[#00000099] p-4 rounded-lg shadow-xl mt-16 w-full sm:w-full md:w-3/4 md:container">
        <h4 className="text-4xl font-bold text-white tracking-widest uppercase text-center">
          FAQ
        </h4>
        <p className="text-center text-white text-xl mt-2">
        {t(`faq_text1`)}
        </p>

        <div className="mt-4">
          {FAQs.map((faq, index) => (
            <div key={index} className="border-b border-gray-600">
              <button
                className="flex justify-between items-center w-full p-4 text-left text-white font-semibold hover:bg-[#00000090] focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>
                  {index + 1}. {faq.question}
                </span>
                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="p-4 text-gray-300 bg-[#00000080]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FAQ;
