'use client'

import { useState, useEffect } from 'react'
import { Language, detectBrowserLanguage } from '@/lib/i18n'

const LANG_STORAGE_KEY = 'tonet-lang'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language | null
    if (stored && ['en', 'de', 'es', 'fr'].includes(stored)) {
      setLanguage(stored)
    } else {
      const detected = detectBrowserLanguage()
      setLanguage(detected)
      localStorage.setItem(LANG_STORAGE_KEY, detected)
    }
    setIsLoaded(true)
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }

  return { language, changeLanguage, isLoaded }
}
