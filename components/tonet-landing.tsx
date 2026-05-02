'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiGithub, FiChevronDown, FiStar } from 'react-icons/fi'
import { FaWindows, FaLinux, FaApple, FaAndroid } from 'react-icons/fa'
import { SiIos } from 'react-icons/si'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation, languages, Language } from '@/lib/i18n'
import { useState, useRef, useEffect } from 'react'
import useSWR from 'swr'

const GITHUB_REPO = 'usetonet/tonet-browser'
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

const fetcher = (url: string) => fetch(url).then(res => res.json())

function useGitHubStars() {
  const { data, error } = useSWR(
    `https://api.github.com/repos/${GITHUB_REPO}`,
    fetcher,
    { 
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      errorRetryCount: 1
    }
  )
  
  return {
    stars: data?.stargazers_count ?? 0,
    isLoading: !error && !data,
    isError: error
  }
}

function LanguageSwitcher({ 
  language, 
  onChangeLanguage 
}: { 
  language: Language
  onChangeLanguage: (lang: Language) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
        aria-label="Select language"
      >
        {language.toUpperCase()}
        <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[60px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-muted transition-colors ${
                language === lang.code ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GitHubLink({ t }: { t: ReturnType<typeof getTranslation> }) {
  const { stars } = useGitHubStars()
  
  return (
    <Link 
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      aria-label="View Tonet on GitHub"
    >
      <FiGithub className="w-4 h-4" />
      <span className="hidden sm:inline">
        {stars >= 1 ? (
          <span className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5" />
            {stars}
          </span>
        ) : (
          t.nav.github
        )}
      </span>
    </Link>
  )
}

function Header({ t, language, onChangeLanguage }: { 
  t: ReturnType<typeof getTranslation>
  language: Language
  onChangeLanguage: (lang: Language) => void 
}) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 shrink-0">
      <Link href="/" className="flex items-center gap-2.5 group">
        {/* Logo with glow effect only on icon */}
        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#8A5CFF] via-[#5A99FF] to-[#8A5CFF] rounded-xl opacity-60 blur-md group-hover:opacity-80 transition-opacity" />
          <Image 
            src="/images/tonet-logo.png" 
            alt="Tonet Browser Logo" 
            width={32} 
            height={32} 
            className="rounded-lg relative z-10"
          />
        </div>
        <span className="font-semibold text-lg text-foreground">Tonet</span>
      </Link>
      
      <nav className="flex items-center gap-4 md:gap-6" aria-label="Main navigation">
        <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {t.nav.roadmap}
        </Link>
        <GitHubLink t={t} />
        <LanguageSwitcher language={language} onChangeLanguage={onChangeLanguage} />
      </nav>
    </header>
  )
}

function Hero({ t }: { t: ReturnType<typeof getTranslation> }) {
  return (
    <section className="flex flex-col items-center text-center px-4 shrink-0" aria-labelledby="hero-title">
      <span className="inline-flex items-center px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/20 text-primary mb-3 sm:mb-4">
        {t.hero.badge}
      </span>
      
      <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight text-balance">
        {t.hero.title}
      </h1>
      
      <h2 className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium text-balance max-w-2xl">
        {t.hero.tagline}
      </h2>
      
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground/70 max-w-md leading-relaxed">
        {t.hero.description}
      </p>
    </section>
  )
}

function PreviewCards({ t }: { t: ReturnType<typeof getTranslation> }) {
  return (
    <section className="px-4 mt-4 sm:mt-6 md:mt-8 shrink-0" aria-label="Feature highlights">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
        {/* Servo Card */}
        <article className="bg-card rounded-lg sm:rounded-xl border border-border p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center">
          <div className="bg-muted rounded-md sm:rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mb-1.5 sm:mb-2 md:mb-3 flex items-center gap-1 sm:gap-2">
            <div className="flex gap-0.5 sm:gap-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="w-10 sm:w-16 md:w-24 h-1 sm:h-1.5 md:h-2 bg-primary/30 rounded ml-1 sm:ml-2" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-muted rounded-md sm:rounded-lg">
            <Image 
              src="/images/servo-logo.png" 
              alt="Servo rendering engine logo" 
              width={80} 
              height={24}
              className="h-3 sm:h-4 md:h-6 w-auto"
            />
          </div>
          <p className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-1.5 sm:mt-2 md:mt-3">{t.cards.poweredBy} Servo</p>
        </article>

        {/* Platforms Card */}
        <article className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3d] rounded-lg sm:rounded-xl border border-border p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center">
          <h3 className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mb-2 sm:mb-3 md:mb-4">{t.cards.platforms}</h3>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5">
              <FaWindows className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-[#0078D4]" aria-hidden="true" />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] text-muted-foreground">{t.platforms.now}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5">
              <FaLinux className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-[#FCC624]" aria-hidden="true" />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] text-muted-foreground">{t.platforms.now}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5">
              <FaApple className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-foreground" aria-hidden="true" />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] text-muted-foreground">{t.platforms.soon}</span>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5">
              <FaAndroid className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-[#3DDC84]" aria-hidden="true" />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] text-muted-foreground">{t.platforms.soon}</span>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5">
              <SiIos className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-foreground" aria-hidden="true" />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] text-muted-foreground">{t.platforms.soon}</span>
            </div>
          </div>
        </article>

        {/* You Choose Card */}
        <article className="bg-gradient-to-br from-[#1a1525] to-[#251a35] rounded-lg sm:rounded-xl border border-border p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center">
          <div className="bg-muted/80 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 w-full space-y-1 sm:space-y-1.5 md:space-y-2">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 shrink-0" />
              <span className="text-[8px] sm:text-xs md:text-sm text-foreground truncate">{t.cards.youChoose}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/50 shrink-0" />
              <span className="text-[7px] sm:text-[10px] md:text-xs text-muted-foreground truncate">{t.cards.youChooseDesc}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function Footer({ t }: { t: ReturnType<typeof getTranslation> }) {
  return (
    <footer className="px-4 py-2 text-center shrink-0">
      <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
        {t.footer.euNote}
      </p>
      <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground/50 mt-0.5">
        {t.footer.moreLanguages}
      </p>
    </footer>
  )
}

export default function TonetLandingPage() {
  const { language, changeLanguage, isLoaded } = useLanguage()
  const t = getTranslation(language)

  if (!isLoaded) {
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="h-dvh w-full overflow-hidden flex flex-col bg-background relative">
      {/* Subtle gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <Header t={t} language={language} onChangeLanguage={changeLanguage} />
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <Hero t={t} />
          <PreviewCards t={t} />
        </div>
        <Footer t={t} />
      </div>
    </main>
  )
}
