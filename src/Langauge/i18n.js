import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationAR from '../locales/ar/translation.json'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector/cjs';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
