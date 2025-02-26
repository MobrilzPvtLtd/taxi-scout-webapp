import React from 'react';
import bg from '../Images/Designer.jpeg'
import { useTranslation } from 'react-i18next';
const Privacy_Policy = () => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-fit bg-gray-100 py-12 mt-12 px-6 sm:px-12 lg:px-32 lg:py-12 lg:mt-10" style={{backgroundImage : `url(${bg})` , backgroundRepeat:"no-repeat" , backgroundSize:"cover" }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div className="relative max-w-5xl mx-auto bg-[#000000bd] shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
        {t(`policy_text1`)}
        </h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text2`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text3`)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text4`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text5`)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text6`)}</h2>
            <ol className="list-decimal list-inside text-[#D1D1D1] space-y-1">
              <li> {t(`policy_text7`)}</li>
              <li> {t(`policy_text8`)}</li>
              <li> {t(`policy_text9`)}</li>
              <li> {t(`policy_text10`)}</li>
              <li> {t(`policy_text11`)}</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text12`)}</h2>
            <p className="text-[#D1D1D1]">
            {t(`policy_text13`)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text14`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text15`)}
            </p>
            <ul className="list-disc list-inside text-[#d1d1d1] space-y-1">
              <li> {t(`policy_text16`)}</li>
              <li> {t(`policy_text17`)}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text18`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text19`)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text20`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text21`)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text22`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text23`)}<a href="mailto:info@taxiscout24.com" className="text-white underline font-semibold">info@taxiscout24.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text24`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text25`)}
                </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2"> {t(`policy_text26`)}</h2>
            <p className="text-[#d1d1d1]">
            {t(`policy_text27`)} </p>
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
