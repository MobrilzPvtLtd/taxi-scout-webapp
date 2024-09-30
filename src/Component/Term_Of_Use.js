import React from 'react'

const Term_Of_Use = () => {
  return (
    <div className="bg-[#fffa93] min-h-screen p-6">
      <div className="max-w-5xl mx-auto mt-2 bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-10 text-center">
          Last updated: September 27, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Services of TaxiScout24.com</h2>
            <p className="text-gray-700 mb-4">
              1.1 TaxiScout24.com provides passengers with software free of charge, enabling them to
              use the services of TaxiScout24.com within the scope of availability. Passengers must
              register with truthful information. Transportation by taxi drivers is subject to
              charges. Passengers have no entitlement to use TaxiScout24.com permanently.
            </p>
            <p className="text-gray-700 mb-4">
              1.2 TaxiScout24.com acts solely as an intermediary between passengers and taxi drivers.
              The conclusion or issuance of transportation orders as well as communication with taxi
              drivers are solely the responsibility of the passengers.
            </p>
            <p className="text-gray-700">
              1.3 Passengers must have their own internet access and allow location detection on their
              smartphone. Availability of these services is not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Duties of Passengers</h2>
            <p className="text-gray-700 mb-4">
              2.1 Passengers are obliged to comply with all applicable legal regulations at all times.
            </p>
            <p className="text-gray-700 mb-4">
              2.2 Passengers must pay for transportation services provided by taxi drivers.
            </p>
            <p className="text-gray-700 mb-4">
              2.3 Passengers must securely store their access data and are not permitted to copy,
              distribute, or modify the software provided by TaxiScout24.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Liability</h2>
            <p className="text-gray-700 mb-4">
              Taxi drivers are fully liable to passengers for any incidents related to transportation.
              TaxiScout24.com's liability is limited to gross negligence, intent, bodily injury, and
              death.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Final Provisions</h2>
            <p className="text-gray-700 mb-4">
              4.1 The contract for the use of TaxiScout24.com is valid indefinitely and can be
              terminated by either party at any time.
            </p>
            <p className="text-gray-700 mb-4">
              4.2 TaxiScout24.com may exclude passengers for violating these terms or other legal
              violations.
            </p>
            <p className="text-gray-700 mb-4">
              4.3 TaxiScout24.com may amend these terms at any time. Passengers will be notified
              appropriately.
            </p>
            <p className="text-gray-700">
              4.4 The use of TaxiScout24.com is governed by Swiss law.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
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