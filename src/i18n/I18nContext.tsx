import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TranslationDictionary, translations } from './translations';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  languages: typeof SUPPORTED_LANGUAGES;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'jansanket_preferred_lang';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (saved && translations[saved]) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const isRtl = language === 'ur';

  useEffect(() => {
    // Set HTML lang and dir attributes dynamically
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  const currentTranslations = translations[language] || translations.en;

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslations,
        languages: SUPPORTED_LANGUAGES,
        isRtl,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
