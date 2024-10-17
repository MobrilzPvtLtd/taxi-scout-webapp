import React from 'react'

const Term_Of_Use = () => {
  return (
    <div  id="banner_img_home" className=" min-h-screen p-6 mt-16">
      <div  className="max-w-5xl mx-auto mt-2 bg-[#00000080] shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Terms of Use</h1>
        <p className="text-sm text-white mb-10 text-center">
          Last updated: September 27, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Services of TaxiScout24.com</h2>
            <p className="text-white text-start mb-4">
            1.1 TaxiScout24.com provides passengers with software free of charge, enabling them to use the services of TaxiScout24.com within the scope of availability. Passengers must register with truthful information to use TaxiScout24.com. The transportation by taxi drivers is subject to charges. Passengers have no entitlement to use TaxiScout24.com permanently or at all.
            </p>
            <p className="text-white text-start mb-4">
            1.2 TaxiScout24.com enables passengers to directly contact taxi drivers looking for passengers and thus to place a transportation order. TaxiScout24.com acts solely as an intermediary between passengers and taxi drivers. The conclusion or issuance of transportation orders as well as communication with taxi drivers are solely the responsibility of the passengers.

            </p>
            <p className="text-white text-start">
            1.3 Passengers must have their own internet access to use TaxiScout24.com. They must also allow location detection on their smartphone. The functionality of internet access and location detection is solely the responsibility of the passengers.

            </p>
            <p className="text-white text-start">
            1.4 TaxiScout24.com strives for high availability, but passengers have no entitlement to continuous and complete availability of TaxiScout24.com.


            </p>
            <p className="text-white text-start">
            1.5 TaxiScout24.com may operate a rating system. Transported passengers may objectively evaluate the services of taxi drivers and vehicles within this framework. TaxiScout24.com may publish these evaluations, with passengers being anonymized.


            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Duties of Passengers</h2>
            <p className="text-white text-start mb-4">
            2.1 Passengers are obliged to comply with all applicable legal regulations at all times and in full.
            </p>
            <p className="text-white text-start mb-4">
            2.2 Passengers are obliged to pay for transportation by taxi drivers.
            </p>
            <p className="text-white text-start mb-4">
            2.3 Passengers must securely store their access data to the software and not disclose them to third parties or allow third parties to use the software. All rights to the software remain with TaxiScout24.com. Passengers are particularly not entitled to copy, distribute, or modify the software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Liability</h2>
            <p className="text-white text-start mb-4">
              Taxi drivers are fully liable to passengers for any incidents related to transportation.
              TaxiScout24.com's liability is limited to gross negligence, intent, bodily injury, and
              death.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Final Provisions</h2>
            <p className="text-white text-start mb-4">
            4.1 The contract for the use of TaxiScout24.com, including the software, is valid indefinitely. It can be terminated by either party at any time and without giving reasons
            </p>
            <p className="text-white text-start mb-4">
            4.2 Passengers may be permanently or temporarily excluded from using TaxiScout24.com in the event of violations of these terms of use or other legal violations.

            </p>
            <p className="text-white text-start mb-4">
            4.3 TaxiScout24.com may amend these terms of use at any time and without giving reasons. Passengers will be informed about such adjustments in an appropriate manner.

            </p>
            <p className="text-white text-start">
            4.4 The use of TaxiScout24.com is subject to Swiss law.

            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white text-start">
            If you have any questions regarding these terms of use, please feel free to{" "}
            <a href="mailto:info@taxiscount24.com" className="text-blue-600 underline">
              contact us.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Term_Of_Use