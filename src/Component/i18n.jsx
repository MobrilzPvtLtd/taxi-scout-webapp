// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your language translation files
import de from './locales/de/landing.json';
import en from './locales/en/landing.json';
import es from './locales/es/landing.json';
import ar from './locales/ar/landing.json';
import fr from './locales/fr/landing.json';
import it from './locales/it/landing.json';
import pr from './locales/pr/landing.json';
import rs from './locales/rs/landing.json';
import sr from './locales/sr/landing.json';
import tr from './locales/tr/landing.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: de,
      },
     
      es: {
        translation: es,
      },
      ar: {
        translation: ar,
      },
     en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      it: {
        translation: it,
      },
      pr: {
        translation: pr,
      },
      rs: {
        translation: rs,
      },
      sr: {
        translation: sr,
      },
      tr: {
        translation: tr,
      },
    },
    lng: 'de', // default language
    fallbackLng: 'de', // fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
