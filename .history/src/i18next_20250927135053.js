import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // تحميل الترجمات من ملفات JSON
  .use(LanguageDetector) // يحدد اللغة من المتصفح
  .use(initReactI18next) // يربط i18next مع React
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
