// src/FAQ.js
import React, { useState } from "react";

const FAQs = [
  {
    question: "How does TaxiScout24.com differ from other taxi software providers?",
    answer: "TaxiScout24.com is the world's first taxi software that operates without commissions and fixed prices. Taxi companies have full control over the rates per kilometer and the starting price. Payment is made directly from the passenger to the taxi driver, and TaxiScout24.com is not involved in the payment process."
  },
  {
    question: "Does TaxiScout24.com charge a commission for using its services?",
    answer: "No, TaxiScout24.com does not charge a commission for its services. We believe in transparency and fairness, providing passengers and taxi drivers with a platform to connect seamlessly without any additional costs."
  },
  {
    question: "Who determines the prices for rides on TaxiScout24.com?",
    answer: "At TaxiScout24.com, prices for rides are not set by the platform itself. Instead, individual taxi companies determine their own rates, providing flexibility and ensuring competitive pricing based on market factors and the specific services offered."
  },
  {
    question: "How can taxi companies manage their drivers and vehicles on TaxiScout24.com?",
    answer: "On TaxiScout24.com, taxi companies have the opportunity to manage their drivers and vehicles easily and efficiently. Through the system, they can seamlessly register new drivers and vehicles, update existing information, and optimize their operational workflows."
  },
  {
    question: "Does TaxiScout24.com facilitate payments between taxi companies and passengers?",
    answer: "No, TaxiScout24.com does not facilitate payments between taxi companies and passengers. The payment process is solely the responsibility of the driver and the passenger. TaxiScout24.com acts solely as an intermediary platform, allowing passengers to find a suitable taxi driver, and does not play a role in the payment transactions."
  },
  {
    question: "What is the fee structure for taxi companies on TaxiScout24.com?",
    answer: "On TaxiScout24.com, taxi companies pay a monthly fee per registered driver, regardless of the earnings of the taxi companies. The cost is 39.- per driver and vehicle per month. For larger companies with multiple vehicles and drivers, TaxiScout24.com offers various packages ranging from 99.- to 250.- per month, depending on the number of vehicles in the system."
  },
  {
    question: "Who is allowed to use the software provided by TaxiScout24.com and what are the requirements for drivers and vehicles?",
    answer: "Only official taxi companies are permitted to use the software provided by TaxiScout24.com, similar to apps for taxi companies. It is not allowed for private drivers to operate on the platform or for vehicles that are not registered as taxi companies to operate. All drivers must possess a valid taxi license."
  },
  {
    question: "What requirements must vehicles meet to be included in the TaxiScout24.com system?",
    answer: "At TaxiScout24.com, vehicles do not need to meet specific conditions such as a maximum age or maximum number of seats to be included in the system. TaxiScout24.com allows all taxi companies to earn money and is generally very friendly towards taxi companies."
  },
  {
    question: "Is it possible to have goods delivered using the 'Pickup Order' feature on TaxiScout24.com?",
    answer: "Yes, it is possible to have goods delivered using the 'Pickup Order' feature on TaxiScout24.com. This feature allows users to create an order for the pickup and delivery of goods, similar to a regular taxi order."
  },
  {
    question: "How does registration work for TaxiScout24.com?",
    answer: "Registration for TaxiScout24.com is simple and straightforward. Taxi companies can register through the website or mobile app and enter their vehicles and drivers into the system."
  },
  {
    question: "How can a passenger find a taxi through TaxiScout24.com?",
    answer: "Passengers can download the TaxiScout24.com app or visit the website to find a taxi. They can input their location, select a destination, and then request an available taxi nearby."
  },
  {
    question: "How is payment handled for a taxi ride through TaxiScout24.com?",
    answer: "Payment is made directly between the passenger and the taxi driver. After the ride, the passenger can pay the fare in cash or with another agreed-upon payment method directly to the driver."
  },
  {
    question: "Does TaxiScout24.com offer a rating feature for drivers and vehicles?",
    answer: "Yes, TaxiScout24.com offers a rating feature where passengers can rate the performance of drivers and vehicles. These ratings help other passengers in selecting a suitable taxi."
  },
  {
    question: "How can a taxi company update its rates and services on TaxiScout24.com?",
    answer: "Taxi companies can easily update their rates and services through their TaxiScout24.com account. They can edit the per kilometer rates, starting fare, and other information to keep them current."
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="banner_img_home" className="flex justify-center items-center min-h-screen p-8">
      <div className="bg-[#00000080] p-4 rounded-lg shadow-xl mt-16 w-full sm:w-full md:w-75">
        <h4 className="text-4xl font-bold text-white tracking-widest uppercase text-center">FAQ</h4>
        <p className="text-center text-white text-xl mt-2">
          Here are some of the frequently asked questions
        </p>

        <div className="mt-4">
          {FAQs.map((faq, index) => (
            <div key={index} className="border-b border-gray-600">
              <button
                className="flex justify-between items-center w-full p-4 text-left text-black hover:bg-gray-700 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{index + 1}. {faq.question}</span>
                <span>{activeIndex === index ? '−' : '+'}</span>
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
