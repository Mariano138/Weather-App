import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from '@/i18n/translations';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  resources,
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
