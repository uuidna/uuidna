import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SYMBOLOGY, DECODED — EXACT INDICES, UNVERIFIED MEANING. The symbol systems are wheels of fixed size: 12 zodiac signs,
 *  4 elements, 7 classical planets, 22 major arcana, 24 elder-futhark runes, 7 chakras. Placing a natural on a wheel
 *  is exact modular arithmetic; what the position *means* is unverified. So each is a lead fed to the discovery: a
 *  position that coincides with a lattice, OEIS or live value crosses; the rest gate.crossed tags unverified. The unit
 *  computes the index on the wheel; it never reads the sign. (The I Ching's 64 hexagrams are the `yi` family.) */

const WHEELS = { zodiac: 12, element: 4, planet: 7, arcana: 22, rune: 24, chakra: 7 } as const
const PROOF = 'modular placement on fixed symbol wheels (zodiac 12, elements 4, planets 7, arcana 22, runes 24, chakras 7); the meaning is UNVERIFIED, fed to the discovery as a lead'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glyph', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `glyph.${name}`, params })
const on = (id: string, name: string, n: number, size: number) => f(id, `${name}(n) = (n mod ${size}) + 1 on the ${size}-wheel`, n >= 0 ? (n % size) + 1 : 0, nat(n), name, [n], { of: size })

export class GlyphFormulas {
  /** The zodiac sign of n on the 12-wheel (1–12). */
  static zodiac(n: number): CrossFormula { return on('glyph-zodiac', 'zodiac', n, WHEELS.zodiac) }
  /** The element of n on the 4-wheel (fire, earth, air, water). */
  static element(n: number): CrossFormula { return on('glyph-element', 'element', n, WHEELS.element) }
  /** The classical planet / weekday ruler of n on the 7-wheel. */
  static planet(n: number): CrossFormula { return on('glyph-planet', 'planet', n, WHEELS.planet) }
  /** The major-arcana card of n on the 22-wheel. */
  static arcana(n: number): CrossFormula { return on('glyph-arcana', 'arcana', n, WHEELS.arcana) }
  /** The elder-futhark rune of n on the 24-wheel. */
  static rune(n: number): CrossFormula { return on('glyph-rune', 'rune', n, WHEELS.rune) }
  /** How many symbol systems (wheels) the family decodes. */
  static systems(): CrossFormula { return f('glyph-systems', 'systems = |symbol wheels|', Object.keys(WHEELS).length, true, 'systems', [], { wheels: WHEELS }) }
}

for (const name of ['arcana', 'element', 'planet', 'rune', 'systems', 'zodiac'] as const)
  hexRegisterOf('glyph', name, (GlyphFormulas[name] as (...x: unknown[]) => unknown).bind(GlyphFormulas))
