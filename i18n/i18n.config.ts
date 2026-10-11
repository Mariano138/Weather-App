import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from '@/i18n/translations';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18next.use(initReactI18next).init({
  resources: resources,
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values, preventing XSS.
  },
});

export default i18next;
