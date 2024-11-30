import React from 'react'
import { useTranslation } from 'react-i18next';
const Term_Of_Use = () => {
  const { t } = useTranslation();
  return (
    <div  id="banner_img_home" className="relative min-h-screen p-6 mt-16">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      <div  className=" relative max-w-5xl mx-auto mt-2 bg-[#00000080] shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">{t(`terms_of_use`)}</h1>
        <p className="text-sm text-white mb-10 text-center">
        {t(`terms_text1`)}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white"> {t(`terms_text20`)}</h2>
            <p className="text-white text-start mb-4">
            {t(`terms_text2`)}
              </p>
            <p className="text-white text-start mb-4">
            {t(`terms_text3`)}
            </p>
            <p className="text-white text-start">
            {t(`terms_text4`)}
            </p>
            <p className="text-white text-start">
            {t(`terms_text5`)}
            </p>
            <p className="text-white text-start">
            {t(`terms_text6`)}

            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white"> {t(`terms_text7`)}</h2>
            <p className="text-white text-start mb-4">
            {t(`terms_text8`)}
             </p>
            <p className="text-white text-start mb-4">
            {t(`terms_text9`)}
             </p>
            <p className="text-white text-start mb-4">
            {t(`terms_text10`)}
             </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white"> {t(`terms_text11`)}</h2>
            <p className="text-white text-start mb-4">
            {t(`terms_text12`)}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white"> {t(`terms_text13`)}</h2>
            <p className="text-white text-start mb-4">
            {t(`terms_text14`)}
              </p>
            <p className="text-white text-start mb-4">
            {t(`terms_text15`)}
            </p>
            <p className="text-white text-start mb-4">
            {t(`terms_text16`)}
            </p>
            <p className="text-white text-start">
            {t(`terms_text17`)}
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white text-start">
          {t(`terms_text18`)}{" "}
            <a href="mailto:info@taxiscount24.com" className="text-blue-600 underline">
            {t(`terms_text19`)}  </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Term_Of_Use
