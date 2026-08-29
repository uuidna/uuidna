// tts/readings — HEXBIT WORD TABLE + ADDRESSED UTTERANCE. Pure: sixteen states, seven locale rays, one address.
// object-i18n and the monitor read this leaf. emit / synth / node:child_process stay in tts/index.ts.
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { HANDLE_HEXBITS } from '../hexbit/index.js'

export interface Utterance { lines: readonly string[]; text: string; address: string; handle: string; words: number; hexbits: number }

/** UTTER — pure, and the whole testable half. Blank lines are dropped and whitespace collapsed so the same
 *  passage always yields the same utterance, whatever it was formatted like on the page. */
export const utter = (lines: readonly string[]): Utterance => {
  const clean = lines.map((l) => l.replace(/\s+/g, ' ').trim()).filter((l) => l.length > 0)
  const text = clean.join('\n')
  const address = toUuid(text)
  return { lines: clean, text, address, handle: handleOf(address), words: clean.join(' ').split(' ').filter(Boolean).length, hexbits: HANDLE_HEXBITS }
}

export const HEXBIT_WORDS: Readonly<Record<string, readonly string[]>> = {
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'],
  bg: ['нула', 'едно', 'две', 'три', 'четири', 'пет', 'шест', 'седем', 'осем', 'девет', 'десет', 'единадесет', 'дванадесет', 'тринадесет', 'четиринадесет', 'петнадесет'],
  de: ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn'],
  fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze'],
  es: ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince'],
  ru: ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать'],
  zh: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'],
}

export interface HexbitReading { lang: string; hex: string; words: string[]; utterance: Utterance }

/** readHexbits(hex, lang) → the hexbit string read out in that language, as an addressed utterance. A character
 *  outside the sixteen states is refused by name — a reader that guessed would be translating something else. */
export const readHexbits = (hex: string, lang: string): HexbitReading => {
  const table = HEXBIT_WORDS[lang]
  if (!table) throw new Error(`readHexbits: no reading for language "${lang}" — the rays are ${Object.keys(HEXBIT_WORDS).join(', ')}`)
  const words = [...hex.toLowerCase()].map((c) => {
    const state = parseInt(c, 16)
    if (!(state >= 0 && state <= 15) || !/^[0-9a-f]$/.test(c)) throw new Error(`readHexbits: "${c}" is not a hexbit state`)
    return table[state]!
  })
  return { lang, hex: hex.toLowerCase(), words, utterance: utter([words.join(' ')]) }
}

/** englishToHexbitReadings(text) → the fold and all seven readings of it: English in, one address out, and every
 *  locale ray reading the same eight tiles in its own words — the translation that preserves the address. */
export const englishToHexbitReadings = (text: string): { handle: string; readings: HexbitReading[] } => {
  const handle = handleOf(toUuid(text))
  return { handle, readings: Object.keys(HEXBIT_WORDS).map((lang) => readHexbits(handle, lang)) }
}
