import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
    { code: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
    { code: "de", name: "German", flag: "https://flagcdn.com/w40/de.png" },
    { code: "ar", name: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
    { code: "fr", name: "French", flag: "https://flagcdn.com/w40/fr.png" },
    { code: "it", name: "Italian", flag: "https://flagcdn.com/w40/it.png" },
    { code: "pr", name: "Portuguese", flag: "https://flagcdn.com/w40/pt.png" },
    { code: "rs", name: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
    { code: "sr", name: "Serbian", flag: "https://flagcdn.com/w40/rs.png" },
    { code: "tr", name: "Turkish", flag: "https://flagcdn.com/w40/tr.png" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = (code) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <div className="language-switcher">
      {/* Izabrani jezik */}
      <div className="selected-language">
        <img
          src={selectedLang.flag}
          alt={`${selectedLang.name} flag`}
          className="flag-icon"
        />
        <span>{selectedLang.name}</span>
      </div>

      {/* Padajući meni */}
      <ul className="dropdown-menu">
        {languages.map((lang) => (
          <li
            key={lang.code}
            className="dropdown-item"
            onClick={() => changeLanguage(lang.code)}
          >
            <img
              src={lang.flag}
              alt={`${lang.name} flag`}
              className="flag-icon"
            />
            <span>{lang.name}</span>
          </li>
        ))}
      </ul>

      <style>
        {`
          .language-switcher {
            position: relative;
            display: inline-block;
          }

          .selected-language {
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
            background-color: #fff;
            color: #000;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            display: none;
          }

          .language-switcher:hover .dropdown-menu {
            display: block;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 5px 10px;
            cursor: pointer;
            color: #000;
            background-color: #fff;
          }

          .dropdown-item:hover {
            background-color: #f0f0f0;
          }

          .flag-icon {
            width: 20px;
            height: 15px;
            border-radius: 3px;
          }
          /* Stilovi za mobilne uređaje */
          @media (max-width: 768px) {
            .dropdown-menu {
              position: fixed; /* Osigurava da se meni otvori iznad drugih elemenata */
              top: auto;
              
              left: 0;
              width: auto;
              max-height: 50%; /* Pola ekrana za veće liste */
              margin-bottom: 220px;
            }
    
            .dropdown-item {
              padding: 15px 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LanguageSwitcher;
