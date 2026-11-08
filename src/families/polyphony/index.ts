import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLYPHONY — MANY VOICES AT ONCE, AS ARITHMETIC. Several independent lines sounding together are numbers: how many
 *  voices a texture carries, the most that can sound at once, the cost of moving one line to the next, how independent the
 *  lines are, how dense the texture is, how many notes overlap, notes per voice, and the voices still active. Crosses to
 *  `music` — polyphony is how music layers its lines. A measure. */

const PROOF = 'polyphony arithmetic (voice count, max polyphony, voice-leading cost, independence, density, overlap, texture, active voices); many independent lines as numbers; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'polyphony', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `polyphony.${name}`, params })

export class PolyphonyFormulas {
  /** VOICE COUNT: parts, each carrying so many lines. value parts · perPart. */
  static voicecount(parts: number, perPart: number): CrossFormula { return c('polyphony-voicecount', 'voicecount(parts, perPart) = parts · perPart', parts * perPart, nat(parts, perPart), 'voicecount', [parts, perPart]) }
  /** MAX POLYPHONY: the most voices that can sound at once across two sections. value max(voiceA, voiceB). */
  static maxpolyphony(voiceA: number, voiceB: number): CrossFormula { return c('polyphony-maxpolyphony', 'maxpolyphony(voiceA, voiceB) = max(voiceA, voiceB)', Math.max(voiceA, voiceB), nat(voiceA, voiceB), 'maxpolyphony', [voiceA, voiceB]) }
  /** VOICE-LEADING COST: the distance one line moves from one chord to the next. value |from − to|. */
  static voiceleadingcost(from: number, to: number): CrossFormula { return c('polyphony-voiceleadingcost', 'voiceleadingcost(from, to) = |from − to|', Math.max(0, from - to) + Math.max(0, to - from), nat(from, to), 'voiceleadingcost', [from, to]) }
  /** INDEPENDENCE INDEX: voice crossings as a percentage of the voices. value ⌊crossings · 100 / voices⌋. */
  static independenceindex(crossings: number, voices: number): CrossFormula { return c('polyphony-independenceindex', 'independenceindex(crossings, voices) = ⌊crossings · 100 / voices⌋', voices > 0 ? Math.floor((crossings * 100) / voices) : 0, nat(crossings, voices) && voices > 0, 'independenceindex', [crossings, voices]) }
  /** DENSITY RATIO: notes sounding as a percentage of the notes possible. value ⌊sounding · 100 / total⌋. */
  static densityratio(sounding: number, total: number): CrossFormula { return c('polyphony-densityratio', 'densityratio(sounding, total) = ⌊sounding · 100 / total⌋', total > 0 ? Math.floor((sounding * 100) / total) : 0, nat(sounding, total) && total > 0 && sounding <= total, 'densityratio', [sounding, total]) }
  /** OVERLAP COUNT: notes started that have not yet ended, so still overlapping. value max(0, started − ended). */
  static overlapcount(started: number, ended: number): CrossFormula { return c('polyphony-overlapcount', 'overlapcount(started, ended) = max(0, started − ended)', Math.max(0, started - ended), nat(started, ended), 'overlapcount', [started, ended]) }
  /** TEXTURE INDEX: notes spread over the voices that carry them. value ⌊notes / voices⌋. */
  static textureindex(notes: number, voices: number): CrossFormula { return c('polyphony-textureindex', 'textureindex(notes, voices) = ⌊notes / voices⌋', voices > 0 ? Math.floor(notes / voices) : 0, nat(notes, voices) && voices > 0, 'textureindex', [notes, voices]) }
  /** ACTIVE VOICES: the voices still sounding once the resting ones fall silent. value max(0, total − resting). */
  static activevoices(total: number, resting: number): CrossFormula { return c('polyphony-activevoices', 'activevoices(total, resting) = max(0, total − resting)', Math.max(0, total - resting), nat(total, resting), 'activevoices', [total, resting]) }
}

for (const name of ['activevoices', 'densityratio', 'independenceindex', 'maxpolyphony', 'overlapcount', 'textureindex', 'voicecount', 'voiceleadingcost'] as const)
  hexRegisterOf('polyphony', name, (PolyphonyFormulas[name] as (...x: unknown[]) => unknown).bind(PolyphonyFormulas))
