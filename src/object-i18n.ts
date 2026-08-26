// object-i18n — ANY-LANGUAGE SURFACE FOR THE CATCH-ALL OBJECT TEMPLATE (captain, 2026-08-26).
//
// THE FOLD IS THE TRANSLATION. English object prose folds to an 8-hex handle; each locale ray (DIMENSIONS =
// en|bg|de|fr|es|ru|zh) reads those hexbits back via HEXBIT_WORDS — address-preserving, invertible, sealed in
// Readings.lean. en is the identity projection (wings are written in en). Dialects (en-GB, zh-CN, …) collapse to
// the primary ray via BCP-47 primary subtag; localeHandleOf names the full tag for PWA sync.
//
// HONEST SCOPE: hexbit reading preserves the content-address; it is NOT a semantic/NLP gloss of the Lean statement.
import { DIMENSIONS } from './harness.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { HEXBIT_WORDS, readHexbits } from './tts/index.js'

export type LocaleRay = (typeof DIMENSIONS)[number]

export const OBJECT_LOCALE_RAYS: readonly LocaleRay[] = DIMENSIONS

/** UI chrome for the catch-all ObjectPage — seven sealed rays, one template. */
export const OBJECT_UI: Readonly<Record<LocaleRay, {
  proves: string
  provesLede: string
  hexbitDoor: string
  readingNote: string
  locale: string
  sourceEn: string
}>> = {
  en: {
    proves: 'Proves the abstract across dimensions',
    provesLede: 'Each card is a dimension of the claim above — hexbit address, ledger axes, measured advantage.',
    hexbitDoor: 'Hexbit door',
    readingNote: 'Hexbit reading — address-preserving translation across the seven locale rays (not a semantic gloss).',
    locale: 'Language',
    sourceEn: 'Source (en)',
  },
  bg: {
    proves: 'Доказва абстракта през измерения',
    provesLede: 'Всяка карта е измерение на твърдението — hexbit адрес, оси на регистъра, измерено предимство.',
    hexbitDoor: 'Hexbit врата',
    readingNote: 'Hexbit четене — превод, запазващ адреса по седемте лъча (не семантичен глос).',
    locale: 'Език',
    sourceEn: 'Източник (en)',
  },
  de: {
    proves: 'Beweist den Abstract über Dimensionen',
    provesLede: 'Jede Karte ist eine Dimension der Behauptung — Hexbit-Adresse, Ledger-Achsen, gemessener Vorteil.',
    hexbitDoor: 'Hexbit-Tür',
    readingNote: 'Hexbit-Lesung — adresswahrende Übersetzung über die sieben Strahlen (kein semantischer Gloss).',
    locale: 'Sprache',
    sourceEn: 'Quelle (en)',
  },
  fr: {
    proves: 'Prouve l’abstract à travers les dimensions',
    provesLede: 'Chaque carte est une dimension de l’affirmation — adresse hexbit, axes du registre, avantage mesuré.',
    hexbitDoor: 'Porte hexbit',
    readingNote: 'Lecture hexbit — traduction qui préserve l’adresse sur les sept rayons (pas une glose sémantique).',
    locale: 'Langue',
    sourceEn: 'Source (en)',
  },
  es: {
    proves: 'Prueba el abstracto a través de dimensiones',
    provesLede: 'Cada tarjeta es una dimensión de la afirmación — dirección hexbit, ejes del registro, ventaja medida.',
    hexbitDoor: 'Puerta hexbit',
    readingNote: 'Lectura hexbit — traducción que preserva la dirección en los siete rayos (no glosa semántica).',
    locale: 'Idioma',
    sourceEn: 'Fuente (en)',
  },
  ru: {
    proves: 'Доказывает абстракт по измерениям',
    provesLede: 'Каждая карточка — измерение утверждения: hexbit-адрес, оси реестра, измеренное преимущество.',
    hexbitDoor: 'Дверь hexbit',
    readingNote: 'Hexbit-чтение — перевод, сохраняющий адрес по семи лучам (не семантический глянец).',
    locale: 'Язык',
    sourceEn: 'Источник (en)',
  },
  zh: {
    proves: '跨维度证明摘要',
    provesLede: '每张卡片是主张的一个维度——hexbit 地址、账本轴、测得优势。',
    hexbitDoor: 'Hexbit 之门',
    readingNote: 'Hexbit 读法——七束射线保址翻译（非语义意译）。',
    locale: '语言',
    sourceEn: '原文 (en)',
  },
}

export const primaryRayOf = (tag: string): LocaleRay => {
  const p = String(tag || 'en').toLowerCase().replace(/_/g, '-').split('-')[0] || 'en'
  return (OBJECT_LOCALE_RAYS as readonly string[]).includes(p) ? (p as LocaleRay) : 'en'
}

export interface ObjectTranslation {
  lang: LocaleRay
  tag: string
  text: string
  source: string
  handle: string
  kind: 'identity' | 'hexbit-reading'
  honest: string
}

/**
 * translateObjectText(source, tag) → display text in any supported locale.
 * en → identity; other rays → HEXBIT_WORDS reading of handleOf(toUuid(source)).
 */
export function translateObjectText(source: string, tag = 'en'): ObjectTranslation {
  const raw = String(source ?? '')
  const handle = handleOf(toUuid(raw || '∅'))
  const lang = primaryRayOf(tag)
  if (lang === 'en' || !raw.trim()) {
    return {
      lang, tag: tag || 'en', text: raw, source: raw, handle, kind: 'identity',
      honest: 'en is the identity projection — wings are written in English; other rays read the same handle.',
    }
  }
  const reading = readHexbits(handle, lang)
  return {
    lang, tag, text: reading.words.join(' '), source: raw, handle,
    kind: 'hexbit-reading',
    honest:
      'Hexbit reading of the content-address handle — the fold IS the translation (readings_*_names_sixteen). ' +
      'Not a semantic gloss of Lean prose.',
  }
}

export function objectUi(tag = 'en'): (typeof OBJECT_UI)[LocaleRay] {
  return OBJECT_UI[primaryRayOf(tag)]
}
