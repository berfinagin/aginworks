import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr')

  const toggle = () => setLang(l => (l === 'en' ? 'tr' : 'en'))
  const t = translations[lang]

  // CSS text-transform:uppercase doesn't respect Turkish locale (i→I instead of İ).
  // For Turkish, pre-uppercase with the correct locale; for English, return unchanged (CSS handles it).
  const toUpper = (text) =>
    lang === 'tr' && typeof text === 'string'
      ? text.toLocaleUpperCase('tr-TR')
      : text

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, toUpper }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
