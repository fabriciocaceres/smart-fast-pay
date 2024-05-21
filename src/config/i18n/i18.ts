import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/translation.json';
import es from '@/locales/es/translation.json';
import pt_BR from '@/locales/pt-BR/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      'pt-BR': {
        translation: pt_BR,
      },
    },
  });

export default i18n;
