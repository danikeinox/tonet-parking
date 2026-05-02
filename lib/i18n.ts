export type Language = 'en' | 'de' | 'es' | 'fr'

export const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

export const translations = {
  en: {
    nav: {
      roadmap: 'Roadmap',
      github: 'GitHub',
    },
    hero: {
      badge: 'Coming soon',
      title: 'Tonet Browser',
      tagline: 'Browse without the weight. Push back on web bloat.',
      description: 'Built on Servo. Speed, clarity, and you in control.',
    },
    platforms: {
      now: 'Now',
      soon: 'Soon',
    },
    cards: {
      poweredBy: 'Powered by',
      platforms: 'Available on',
      youChoose: 'You choose',
      youChooseDesc: 'Pick your version, update on your terms.',
    },
    footer: {
      euNote: 'EU builds ship with Servo. Availability may vary in other regions.',
      moreLanguages: 'More languages soon',
    },
  },
  de: {
    nav: {
      roadmap: 'Roadmap',
      github: 'GitHub',
    },
    hero: {
      badge: 'Demnächst',
      title: 'Tonet Browser',
      tagline: 'Surfen ohne Ballast. Gegen Web-Bloat.',
      description: 'Basiert auf Servo. Geschwindigkeit, Klarheit und du hast die Kontrolle.',
    },
    platforms: {
      now: 'Jetzt',
      soon: 'Bald',
    },
    cards: {
      poweredBy: 'Angetrieben von',
      platforms: 'Verfügbar auf',
      youChoose: 'Du entscheidest',
      youChooseDesc: 'Wähle deine Version, update nach deinen Regeln.',
    },
    footer: {
      euNote: 'EU-Builds werden mit Servo ausgeliefert. Verfügbarkeit kann in anderen Regionen variieren.',
      moreLanguages: 'Weitere Sprachen bald',
    },
  },
  es: {
    nav: {
      roadmap: 'Roadmap',
      github: 'GitHub',
    },
    hero: {
      badge: 'Próximamente',
      title: 'Tonet Browser',
      tagline: 'Navega sin el peso. Rechaza el bloat web.',
      description: 'Basado en Servo. Velocidad, claridad y tú en control.',
    },
    platforms: {
      now: 'Ahora',
      soon: 'Pronto',
    },
    cards: {
      poweredBy: 'Impulsado por',
      platforms: 'Disponible en',
      youChoose: 'Tú eliges',
      youChooseDesc: 'Elige tu versión, actualiza cuando quieras.',
    },
    footer: {
      euNote: 'Las builds de la UE incluyen Servo. La disponibilidad puede variar en otras regiones.',
      moreLanguages: 'Más idiomas pronto',
    },
  },
  fr: {
    nav: {
      roadmap: 'Feuille de route',
      github: 'GitHub',
    },
    hero: {
      badge: 'Bientôt',
      title: 'Tonet Browser',
      tagline: 'Naviguez sans le poids. Repoussez le bloat web.',
      description: 'Basé sur Servo. Vitesse, clarté et vous aux commandes.',
    },
    platforms: {
      now: 'Maintenant',
      soon: 'Bientôt',
    },
    cards: {
      poweredBy: 'Propulsé par',
      platforms: 'Disponible sur',
      youChoose: 'Vous choisissez',
      youChooseDesc: 'Choisissez votre version, mettez à jour à votre rythme.',
    },
    footer: {
      euNote: 'Les builds UE incluent Servo. La disponibilité peut varier dans d\'autres régions.',
      moreLanguages: 'Plus de langues bientôt',
    },
  },
}

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en
}

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.split('-')[0]
  if (['en', 'de', 'es', 'fr'].includes(browserLang)) {
    return browserLang as Language
  }
  return 'en'
}
