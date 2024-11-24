import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className='text-black '>
        <select onChange={changeLanguage} name="" defaultValue="en" id="">

  <option value ='en'>English</option>
      <option value ='es'>Español</option>
      <option value ='de'>German</option>
      <option value ='ar'>Arabic</option>
      <option value ='fr'>French</option>
      <option value ='it'>Italian</option>
      <option value ='pr'>Portuguese</option>
      <option value ='rs'>Russian</option>
      <option value ='sr'>Serbian</option>
      <option value ='tr'>Turkish</option>
        </select>
    </div>
  );
};

export default LanguageSwitcher;
