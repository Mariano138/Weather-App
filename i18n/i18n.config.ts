import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from './translations';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18next.use(initReactI18next).init({
  resources: resources,
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default i18next;
