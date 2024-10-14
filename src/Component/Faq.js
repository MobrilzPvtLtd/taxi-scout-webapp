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
    <div id="banner_img_home" class="p-8">
      <div class="bg-[#00000080] p-4 rounded-lg shadow-xl py-8 mt-16">
        <h4 class="text-4xl font-bold text-white tracking-widest uppercase text-center">
          FAQ
        </h4>
        <p class="text-center text-white text-xl mt-2">
          Here are some of the frequently asked questions
        </p>
        {/* <div class="space-y-12 px-2 xl:px-16 mt-12">
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
                <span class=" text-left text-white">
                 {faq.answer}
                </span>
              </div>
            </div>
          </div>))}
        </div> */}
        <div className="flex justify-content-center align-content-center my-3 ">
          {/* <div class="accordion w-75" id="accordionfaq">
          {faqs.map((faq, index) => (
            
            <div class="accordion-item">
             
                <button
                  class="accordion-button hover:none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${index+1}`}
                  aria-expanded="true"
                  aria-controls={index+1}
                >
                 <h4 className="mx-2">{index+1}.</h4>  {faq.question}?
                </button>
             
              <div
                id={index+1}
                class="accordion-collapse collapse"
                data-bs-parent="#accordionfaq"
              >
                <div class="accordion-body">
                   {faq.answer}
                </div>
              </div>
            </div>))}
          </div> */}
              <div class="accordion accordion-flush w-75" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       1. "How does TaxiScout24.com differ from other taxi software providers?"
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">"TaxiScout24.com is the world's first taxi software that operates without commissions and fixed prices. Taxi companies have full control over the rates per kilometer and the starting price. Payment is made directly from the passenger to the taxi driver, and TaxiScout24.com is not involved in the payment process."</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
     2. "Does TaxiScout24.com charge a commission for using its services?"
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">:"No, TaxiScout24.com does not charge a commission for its services. We believe in transparency and fairness, providing passengers and taxi drivers with a platform to connect seamlessly without any additional costs."
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
     3. Who determines the prices for rides on TaxiScout24.com?

      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">At TaxiScout24.com, prices for rides are not set by the platform itself. Instead, individual taxi companies determine their own rates, providing flexibility and ensuring competitive pricing based on market factors and the specific services offered.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
     4. "How can taxi companies manage their drivers and vehicles on TaxiScout24.com?""

      </button>
    </h2>
    <div id="flush-collapsefour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">On TaxiScout24.com, taxi companies have the opportunity to manage their drivers and vehicles easily and efficiently. Through the system, they can seamlessly register new drivers and vehicles, update existing information, and optimize their operational workflows.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefive" aria-expanded="false" aria-controls="flush-collapsefive">
     5. "Does TaxiScout24.com facilitate payments between taxi companies and passengers?"

      </button>
    </h2>
    <div id="flush-collapsefive" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">No, TaxiScout24.com does not facilitate payments between taxi companies and passengers. The payment process is solely the responsibility of the driver and the passenger. TaxiScout24.com acts solely as an intermediary platform, allowing passengers to find a suitable taxi driver, and does not play a role in the payment transactions."</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapsesix">
     6. "What is the fee structure for taxi companies on TaxiScout24.com?"
      </button>
    </h2>
    <div id="flush-collapsesix" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">n TaxiScout24.com, taxi companies pay a monthly fee per registered driver, regardless of the earnings of the taxi companies. The cost is 39.- per driver and vehicle per month. For larger companies with multiple vehicles and drivers, TaxiScout24.com offers various packages ranging from 99.- to 250.- per month, depending on the number of vehicles in the system."</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
      7. "Who is allowed to use the software provided by TaxiScout24.com and what are the requirements for drivers and vehicles?"

      </button>
    </h2>
    <div id="flush-collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">"Only official taxi companies are permitted to use the software provided by TaxiScout24.com, similar to apps for taxi companies. It is not allowed for private drivers to operate on the platform or for vehicles that are not registered as taxi companies to operate. All drivers must possess a valid taxi license."
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
     8. "What requirements must vehicles meet to be included in the TaxiScout24.com system?"
      </button>
    </h2>
    <div id="flush-collapseEight" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">At TaxiScout24.com, vehicles do not need to meet specific conditions such as a maximum age or maximum number of seats to be included in the system. TaxiScout24.com allows all taxi companies to earn money and is generally very friendly towards taxi companies."
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
      9. "Is it possible to have goods delivered using the 'Pickup Order' feature on TaxiScout24.com?"
      </button>
    </h2>
    <div id="flush-collapseNine" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">"Yes, it is possible to have goods delivered using the 'Pickup Order' feature on TaxiScout24.com. This feature allows users to create an order for the pickup and delivery of goods, similar to a regular taxi order."</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
     10. "How does registration work for TaxiScout24.com?" 
      </button>
    </h2>
    <div id="flush-collapseTen" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> Registration for TaxiScout24.com is simple and straightforward. Taxi companies can register through the website or mobile app and enter their vehicles and drivers into the system.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse11" aria-expanded="false" aria-controls="flush-collapse11">
     11. "How can a passenger find a taxi through TaxiScout24.com?"

      </button>
    </h2>
    <div id="flush-collapse11" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Passengers can download the TaxiScout24.com app or visit the website to find a taxi. They can input their location, select a destination, and then request an available taxi nearby.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse12" aria-expanded="false" aria-controls="flush-collapse12">
     12. "How is payment handled for a taxi ride through TaxiScout24.com?"

      </button>
    </h2>
    <div id="flush-collapse12" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Payment is made directly between the passenger and the taxi driver. After the ride, the passenger can pay the fare in cash or with another agreed-upon payment method directly to the driver.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse13" aria-expanded="false" aria-controls="flush-collapse13">
      13. "Does TaxiScout24.com offer a rating feature for drivers and vehicles?" 
      </button>
    </h2>
    <div id="flush-collapse13" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Yes, TaxiScout24.com offers a rating feature where passengers can rate the performance of drivers and vehicles. These ratings help other passengers in selecting a suitable taxi.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse14" aria-expanded="false" aria-controls="flush-collapse14">
     14. "How can a taxi company update its rates and services on TaxiScout24.com?" 

      </button>
    </h2>
    <div id="flush-collapse14" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> Taxi companies can easily update their rates and services through their TaxiScout24.com account. They can edit the per kilometer rates, starting fare, and other information to keep them current.
      </div>
    </div>
  </div>
</div>
        </div>
 

      </div>
    </div>
  );
};

export default FAQ;
