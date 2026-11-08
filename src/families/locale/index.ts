import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOCALE — THE PAYLOAD CMS LOCALIZATION API, AS ARITHMETIC (locales, fallback, translated content). Localizing content is
 *  numbers: translation coverage, fallback reliance, the locales configured, which fields carry translations, words still to
 *  translate, right-to-left share, completion per locale, and the storage a localized field set costs. Crosses to `payload` —
 *  locale is the localization layer payload runs. A measure. */

const PROOF = 'locale arithmetic (coverage, fallback, locales, fields, words, rtl, complete, storage); the Payload CMS localization API; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'locale', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `locale.${name}`, params })

export class LocaleFormulas {
  /** COVERAGE: translated documents as a percentage of the total. value ⌊translated · 100 / total⌋. */
  static coverage(translated: number, total: number): CrossFormula { return c('locale-coverage', 'coverage(translated, total) = ⌊translated · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0 && translated <= total, 'coverage', [translated, total]) }
  /** FALLBACK: documents served from the fallback locale as a percentage. value ⌊missing · 100 / total⌋. */
  static fallback(missing: number, total: number): CrossFormula { return c('locale-fallback', 'fallback(missing, total) = ⌊missing · 100 / total⌋', total > 0 ? Math.floor((missing * 100) / total) : 0, nat(missing, total) && total > 0 && missing <= total, 'fallback', [missing, total]) }
  /** LOCALES: the locales configured. value count. */
  static locales(count: number): CrossFormula { return c('locale-locales', 'locales(count) = count', count, nat(count), 'locales', [count]) }
  /** FIELDS: localized fields as a percentage of all fields. value ⌊localized · 100 / total⌋. */
  static fields(localized: number, total: number): CrossFormula { return c('locale-fields', 'fields(localized, total) = ⌊localized · 100 / total⌋', total > 0 ? Math.floor((localized * 100) / total) : 0, nat(localized, total) && total > 0 && localized <= total, 'fields', [localized, total]) }
  /** WORDS: words still to translate, source over what the target already holds. value max(0, source − target). */
  static words(source: number, target: number): CrossFormula { return c('locale-words', 'words(source, target) = max(0, source − target)', Math.max(0, source - target), nat(source, target), 'words', [source, target]) }
  /** RTL: right-to-left locales as a percentage of all locales. value ⌊rtl · 100 / total⌋. */
  static rtl(rtl: number, total: number): CrossFormula { return c('locale-rtl', 'rtl(rtl, total) = ⌊rtl · 100 / total⌋', total > 0 ? Math.floor((rtl * 100) / total) : 0, nat(rtl, total) && total > 0 && rtl <= total, 'rtl', [rtl, total]) }
  /** COMPLETE: documents fully translated across every locale, as a percentage. value ⌊done · 100 / locales⌋. */
  static complete(done: number, locales: number): CrossFormula { return c('locale-complete', 'complete(done, locales) = ⌊done · 100 / locales⌋', locales > 0 ? Math.floor((done * 100) / locales) : 0, nat(done, locales) && locales > 0 && done <= locales, 'complete', [done, locales]) }
  /** STORAGE: localized field values are a field per locale. value fields · locales. */
  static storage(fields: number, locales: number): CrossFormula { return c('locale-storage', 'storage(fields, locales) = fields · locales', fields * locales, nat(fields, locales), 'storage', [fields, locales]) }
}

for (const name of ['complete', 'coverage', 'fallback', 'fields', 'locales', 'rtl', 'storage', 'words'] as const)
  hexRegisterOf('locale', name, (LocaleFormulas[name] as (...x: unknown[]) => unknown).bind(LocaleFormulas))
