import React from 'react';
import bg from '../Images/Designer.jpeg'

const Privacy_Policy = () => {
  return (
    <div className="relative min-h-fit bg-gray-100 py-12 mt-12 px-6 sm:px-12 lg:px-32 lg:py-12 lg:mt-10" style={{backgroundImage : `url(${bg})` , backgroundRepeat:"no-repeat" , backgroundSize:"cover" }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="relative max-w-5xl mx-auto bg-[#000000bd] shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Privacy Policy for Taxiscout24
        </h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
            <p className="text-[#d1d1d1]">
              Taxiscout24, operated by Swissinserate GmbH, headquartered in Dottikon, Switzerland, 
              is committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
              disclose, and protect your personal information when you use our website and services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Data Collection</h2>
            <p className="text-[#d1d1d1]">
              We collect personal data that you provide directly to us, such as your name, contact details, 
              and payment information. Additionally, we may automatically collect certain data when you use 
              our website, including your IP address, browser type, and device information. This data helps 
              us improve our services and personalize your experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Use of Personal Data</h2>
            <ol className="list-decimal list-inside text-[#D1D1D1] space-y-1">
              <li>Provide and improve our services</li>
              <li>Process transactions</li>
              <li>Communicate with you regarding updates, promotions, or customer service</li>
              <li>Ensure the security of our website and services</li>
              <li>Comply with legal requirements</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Cookies</h2>
            <p className="text-[#D1D1D1]">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              Cookies help us analyze website performance, remember your preferences, and personalize content. 
              You can manage your cookie preferences in your browser settings. For more details, please refer to 
              our Cookie Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Data Sharing and Disclosure</h2>
            <p className="text-[#d1d1d1]">
              We do not share or sell your personal data to third parties, except as required to deliver our 
              services or as required by law. We may share data with:
            </p>
            <ul className="list-disc list-inside text-[#d1d1d1] space-y-1">
              <li>Trusted service providers who assist in operating our website</li>
              <li>Legal authorities, if required by law or in response to valid legal requests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Data Security</h2>
            <p className="text-[#d1d1d1]">
              We implement technical and organizational measures to safeguard your personal data from 
              unauthorized access, alteration, disclosure, or destruction. However, please be aware that no 
              method of data transmission over the internet is completely secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Data Retention</h2>
            <p className="text-[#d1d1d1]">
              We retain your personal data only as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, comply with legal obligations, or resolve disputes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">8. Your Rights</h2>
            <p className="text-[#d1d1d1]">
              Depending on your location, you may have rights under data protection laws, including the right 
              to access, correct, delete, or restrict the use of your personal data. To exercise these rights, 
              please contact us at <a href="mailto:info@taxiscout24.com" className="text-white underline font-semibold">info@taxiscout24.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">9. Changes to this Privacy Policy</h2>
            <p className="text-[#d1d1d1]">
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable 
              laws. We encourage you to review this page regularly to stay informed of any updates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">10. Contact Us</h2>
            <p className="text-[#d1d1d1]">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <address className="not-italic text-[#d1d1d1]">
              Swissinserate GmbH<br />
              Heuerweg 7<br />
              5605 Dottikon, Switzerland<br />
              Email: <a href="mailto:info@taxiscout24.com" className="text-white font-semibold underline">info@taxiscout24.com</a>
            </address>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy_Policy;
