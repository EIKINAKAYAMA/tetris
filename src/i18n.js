import i18n from 'i18next'
import enTranslation from './locales/en.json'
import jaTranslation from './locales/ja.json'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: enTranslation
  },
  ja: {
    translation: jaTranslation
  }
}

i18n.use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    react: { wait: true },
    resources: resources
  })

export default i18n
