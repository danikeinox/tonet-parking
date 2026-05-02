'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiGithub, FiChevronDown, FiArrowLeft } from 'react-icons/fi'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation, languages, Language } from '@/lib/i18n'
import { useState, useRef, useEffect } from 'react'

const roadmapData = {
  en: {
    title: 'Roadmap',
    subtitle: 'Subject to change',
    backHome: 'Back to home',
    phases: [
      {
        name: 'Now',
        title: 'Ship & Operate',
        items: [
          'Stable installers (Windows MSI/Inno + Linux .deb) via CI',
          'Servo integration smoke paths on Windows',
          'Landing and docs aligned with operator runbooks',
        ],
      },
      {
        name: 'Next',
        title: 'Compatibility & Shell',
        items: [
          'HTML/CSS coverage toward conformance milestones',
          'Browser chrome: tabs, navigation, settings parity',
          'Packaging parity (macOS signing, optional AppImage)',
        ],
      },
      {
        name: 'Later',
        title: 'Depth & Scale',
        items: [
          'Performance budgets and regression tracking in CI',
          'Broader platform coverage where Servo supports',
          'Security assurance alongside feature growth',
        ],
      },
    ],
  },
  de: {
    title: 'Roadmap',
    subtitle: 'Änderungen vorbehalten',
    backHome: 'Zurück zur Startseite',
    phases: [
      {
        name: 'Jetzt',
        title: 'Ausliefern & Betreiben',
        items: [
          'Stabile Installer (Windows MSI/Inno + Linux .deb) via CI',
          'Servo-Integration Smoke-Tests auf Windows',
          'Landing und Docs mit Operator-Runbooks abgestimmt',
        ],
      },
      {
        name: 'Nächstes',
        title: 'Kompatibilität & Shell',
        items: [
          'HTML/CSS-Abdeckung bis zu Konformitätsmeilensteinen',
          'Browser-Chrome: Tabs, Navigation, Einstellungsparität',
          'Packaging-Parität (macOS-Signierung, optionales AppImage)',
        ],
      },
      {
        name: 'Später',
        title: 'Tiefe & Skalierung',
        items: [
          'Performance-Budgets und Regressionstracking in CI',
          'Breitere Plattformabdeckung wo Servo unterstützt',
          'Sicherheitszusicherung neben Feature-Wachstum',
        ],
      },
    ],
  },
  es: {
    title: 'Roadmap',
    subtitle: 'Sujeto a cambios',
    backHome: 'Volver al inicio',
    phases: [
      {
        name: 'Ahora',
        title: 'Lanzar y Operar',
        items: [
          'Instaladores estables (Windows MSI/Inno + Linux .deb) via CI',
          'Rutas de prueba de Servo en Windows',
          'Landing y docs alineados con runbooks del operador',
        ],
      },
      {
        name: 'Siguiente',
        title: 'Compatibilidad & Shell',
        items: [
          'Cobertura HTML/CSS hacia hitos de conformidad',
          'Chrome del navegador: pestañas, navegación, paridad de ajustes',
          'Paridad de empaquetado (firma macOS, AppImage opcional)',
        ],
      },
      {
        name: 'Después',
        title: 'Profundidad & Escala',
        items: [
          'Presupuestos de rendimiento y seguimiento de regresiones en CI',
          'Mayor cobertura de plataformas donde Servo lo soporte',
          'Garantías de seguridad junto al crecimiento de funciones',
        ],
      },
    ],
  },
  fr: {
    title: 'Feuille de route',
    subtitle: 'Sujet à modifications',
    backHome: 'Retour à l\'accueil',
    phases: [
      {
        name: 'Maintenant',
        title: 'Livrer & Opérer',
        items: [
          'Installateurs stables (Windows MSI/Inno + Linux .deb) via CI',
          'Chemins de test Servo sur Windows',
          'Landing et docs alignés avec les runbooks opérateur',
        ],
      },
      {
        name: 'Ensuite',
        title: 'Compatibilité & Shell',
        items: [
          'Couverture HTML/CSS vers les jalons de conformité',
          'Chrome du navigateur: onglets, navigation, parité des paramètres',
          'Parité d\'empaquetage (signature macOS, AppImage optionnel)',
        ],
      },
      {
        name: 'Plus tard',
        title: 'Profondeur & Échelle',
        items: [
          'Budgets de performance et suivi des régressions en CI',
          'Couverture plus large des plateformes où Servo le supporte',
          'Assurance sécurité aux côtés de la croissance des fonctionnalités',
        ],
      },
    ],
  },
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

export default function RoadmapPage() {
  const { language, changeLanguage, isLoaded } = useLanguage()
  const t = getTranslation(language)
  const roadmap = roadmapData[language]

  if (!isLoaded) {
    return (
      <div className="min-h-dvh w-full flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-dvh w-full bg-background relative">
      {/* Subtle gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
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
            <Link href="/roadmap" className="text-sm text-primary font-medium">
              {t.nav.roadmap}
            </Link>
            <Link 
              href="https://github.com/usetonet/tonet-browser" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View Tonet on GitHub"
            >
              <FiGithub className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.github}</span>
            </Link>
            <LanguageSwitcher language={language} onChangeLanguage={changeLanguage} />
          </nav>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <FiArrowLeft className="w-4 h-4" />
            {roadmap.backHome}
          </Link>
          
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
              {roadmap.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {roadmap.subtitle}
            </p>
          </header>

          <div className="space-y-8">
            {roadmap.phases.map((phase, index) => (
              <article 
                key={phase.name} 
                className="relative pl-8 pb-8 border-l-2 border-border last:border-l-0 last:pb-0"
              >
                {/* Phase indicator */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  {index === 0 && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-2">
                    {phase.name}
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {phase.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="flex items-start gap-3 text-sm md:text-base text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
