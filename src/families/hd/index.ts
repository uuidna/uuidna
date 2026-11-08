import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn, halfTurn } = latticeNamesOf()

/** HUMAN DESIGN, THE STRUCTURE ONLY. The Rave Mandala is a wheel of 64 gates (the I Ching hexagrams) of 360/64° each,
 *  six lines of a gate's arc each, anchored at gate 41 at 302°; nine centers partition the 64 gates; 36 channels join
 *  gate pairs; a chart is the gates the 13 bodies occupy at birth (personality) and at the Sun's −88° of solar arc
 *  before it (design); a definition is the connected components of the defined centers. Every one of these is a
 *  computable combination and is registered here as the hex family `hd`. What is NOT here, by the author's own
 *  finding (ceccec.github.io, "Human-design profiling carries no signal"): types, profiles, authorities, any claim
 *  about a person. The structure is tested; people are not sorted by it. The Sun is Meeus ch. 25 reduced (~0.01°). */

const WHEEL = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 7, 33, 44, 28, 50, 32, 57, 48, 18, 46, 6, 47, 64, 40, 59,
  29, 4, 5, 26, 11, 10, 58, 38, 54, 61, 60, 43, 1, 34, 9, 14,
] as const
const GATES = WHEEL.length
const LINES = 6
const GATE_ARC = fullTurn / GATES
const LINE_ARC = GATE_ARC / LINES
const GATE_41_START = 302
const DESIGN_ARC = 88
// a Julian day in minutes: the wheel's line is 0.9375° and the Sun moves ~1°/day, so a chart is precise to the minute of birth
const MINUTES = 1440
export const CENTERS = ['Head', 'Ajna', 'Throat', 'G', 'Heart', 'Sacral', 'SolarPlexus', 'Spleen', 'Root'] as const
export const CENTER_GATES: Record<(typeof CENTERS)[number], readonly number[]> = {
  Head: [61, 63, 64],
  Ajna: [4, 11, 17, 24, 43, 47],
  Throat: [8, 12, 16, 20, 23, 31, 33, 35, 45, 56, 62],
  G: [1, 2, 7, 10, 13, 15, 25, 46],
  Heart: [21, 26, 40, 51],
  Sacral: [3, 5, 9, 14, 27, 29, 34, 42, 59],
  SolarPlexus: [6, 22, 30, 36, 37, 49, 55],
  Spleen: [18, 28, 32, 44, 48, 50, 57],
  Root: [19, 38, 39, 41, 52, 53, 54, 58, 60],
}
export const CHANNELS: readonly (readonly [number, number])[] = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52],
  [10, 20], [10, 34], [10, 57], [11, 56], [12, 22], [13, 33], [16, 48], [17, 62],
  [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [34, 57], [35, 36],
  [37, 40], [39, 55], [42, 53], [47, 64],
]
export const DEFINITIONS = ['none', 'single', 'split', 'triple split', 'quadruple split'] as const
const PROOF = 'ceccec.github.io src/quantum/spirit (wheel W3, lattice W5) and src/heaven/sky/astronomy (Meeus W4, design solver); structure only'

const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const norm = (deg: number) => ((deg % fullTurn) + fullTurn) % fullTurn
const rad = (deg: number) => (deg * Math.PI) / halfTurn
// the shortest signed turn from a to b, in (−180, 180]
const signed = (from: number, to: number) => { let d = norm(to) - norm(from); if (d > halfTurn) d -= fullTurn; if (d <= -halfTurn) d += fullTurn; return d }

/** Sun's apparent geocentric ecliptic longitude at a Julian day (Meeus ch. 25, reduced). */
export const sunLongitudeOf = (jd: number): number => {
  const T = (jd - 2451545) / 36525
  const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T)
  const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T)
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(rad(M)) + (0.019993 - 0.000101 * T) * Math.sin(2 * rad(M)) + 0.000289 * Math.sin(3 * rad(M))
  const omega = norm(125.04 - 1934.136 * T)
  return norm(L0 + C - 0.00569 - 0.00478 * Math.sin(rad(omega)))
}

/** The gate and line at a longitude: the wheel is read from gate 41 at 302°. */
export const gateLineOf = (deg: number): { gate: number; line: number; index: number } => {
  const index = Math.floor(norm(deg - GATE_41_START) / GATE_ARC) % GATES
  const line = Math.floor((norm(deg - GATE_41_START) - index * GATE_ARC) / LINE_ARC) + 1
  return { gate: WHEEL[index]!, line: Math.min(line, LINES), index }
}

/** The design Julian day: the Sun 88° of solar arc before birth, found by bisection (the Sun moves ~1°/day). */
export const designJdOf = (birthJd: number): number => {
  const target = norm(sunLongitudeOf(birthJd) - DESIGN_ARC)
  let lo = birthJd - 100, hi = birthJd - 70
  for (let i = 0; i < 48; i++) {
    const mid = (lo + hi) / 2
    if (signed(target, sunLongitudeOf(mid)) > 0) hi = mid
    else lo = mid
  }
  return (lo + hi) / 2
}

export const centerOf = (gate: number): number => CENTERS.findIndex((c) => CENTER_GATES[c].includes(gate)) + 1

/** The defined channels among activated gates, and the definition: connected components of the defined centers. */
export const definitionOf = (gates: readonly number[]) => {
  const set = new Set(gates)
  const defined = CHANNELS.filter(([a, b]) => set.has(a) && set.has(b))
  const centers = new Set(defined.flatMap(([a, b]) => [centerOf(a), centerOf(b)]))
  const parent = new Map([...centers].map((c) => [c, c]))
  const find = (x: number): number => (parent.get(x) === x ? x : find(parent.get(x)!))
  for (const [a, b] of defined) parent.set(find(centerOf(a)), find(centerOf(b)))
  const components = new Set([...centers].map(find)).size
  return { defined, centers: [...centers].sort((a, b) => a - b), components, definition: DEFINITIONS[Math.min(components, DEFINITIONS.length - 1)]! }
}

/** A chart's structure at a birth Julian day, from the Sun and Earth (the two bodies this unit computes): the
 *  personality and design activations, the gates, the channels they define and the definition. */
export const chartOf = (birthJd: number) => {
  const designJd = designJdOf(birthJd)
  const at = (jd: number, layer: 'personality' | 'design') => {
    const sun = sunLongitudeOf(jd)
    return [{ layer, body: 'Sun', longitude: sun, ...gateLineOf(sun) }, { layer, body: 'Earth', longitude: norm(sun + 180), ...gateLineOf(norm(sun + 180)) }]
  }
  const activations = [...at(birthJd, 'personality'), ...at(designJd, 'design')]
  const gates = [...new Set(activations.map((a) => a.gate))].sort((a, b) => a - b)
  return { birthJd, designJd, daysBeforeBirth: birthJd - designJd, activations, gates, ...definitionOf(gates), holds: birthJd - designJd > 70 && birthJd - designJd < 100 }
}

const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'hd', dst: 'lattice', formula, value, proof: PROOF }, holds, { name: `hd.${name}`, params })

export class HdFormulas {
  /** The gate at a longitude given in tenths of a degree (0..3599). */
  static gate(deg10: number): CrossFormula { return f('hd-gate', 'gate(θ) = wheel[⌊((θ − 302°) mod 360) / (360/64)⌋]', nat(deg10) && deg10 < 3600 ? gateLineOf(deg10 / 10).gate : 0, nat(deg10) && deg10 < 3600, 'gate', [deg10]) }
  /** The line (1..6) at a longitude in tenths of a degree. */
  static line(deg10: number): CrossFormula { return f('hd-line', 'line(θ) = ⌊(θ mod gate arc) / (gate arc / 6)⌋ + 1', nat(deg10) && deg10 < 3600 ? gateLineOf(deg10 / 10).line : 0, nat(deg10) && deg10 < 3600, 'line', [deg10]) }
  /** The center a gate belongs to, 1..9 in Head, Ajna, Throat, G, Heart, Sacral, SolarPlexus, Spleen, Root. */
  static center(gate: number): CrossFormula { return f('hd-center', 'center(g): the one of nine whose gates hold g', centerOf(gate), nat(gate) && gate >= 1 && gate <= GATES, 'center', [gate]) }
  /** 1 when two gates form one of the 36 channels. */
  static channel(a: number, b: number): CrossFormula { return f('hd-channel', 'channel(a, b) = [ {a, b} ∈ the 36 ]', CHANNELS.some(([x, y]) => (x === a && y === b) || (x === b && y === a)) ? 1 : 0, nat(a, b) && a >= 1 && b >= 1 && a <= GATES && b <= GATES, 'channel', [a, b]) }
  /** How many channels a gate is in (the four of integration are in three). */
  static channels(gate: number): CrossFormula { return f('hd-channels', 'channels(g) = |{ c ∈ the 36 : g ∈ c }|', CHANNELS.filter(([x, y]) => x === gate || y === gate).length, nat(gate) && gate >= 1 && gate <= GATES, 'channels', [gate]) }
  /** The Sun's longitude at a birth minute (jdm), in tenths of a degree. */
  static sun(jdm: number): CrossFormula { return f('hd-sun', 'sun(jdm): Meeus ch. 25 apparent longitude at jdm / 1440, ⌊10·λ⌋', Math.floor(sunLongitudeOf(jdm / MINUTES) * 10), nat(jdm) && jdm > 0, 'sun', [jdm]) }
  /** The design minute of a birth minute: the Sun 88° of solar arc earlier. */
  static design(jdm: number): CrossFormula { return f('hd-design', 'design(jdm): the jdm′ with sun(jdm′) = sun(jdm) − 88°', Math.round(designJdOf(jdm / MINUTES) * MINUTES), nat(jdm) && jdm > 0, 'design', [jdm]) }
  /** The definition from the number of connected components of defined centers: 0 none, 1 single, 2 split, 3 triple, 4 quadruple. */
  static definition(components: number): CrossFormula { return f('hd-definition', 'definition(k) = min(k, 4)', Math.min(components, DEFINITIONS.length - 1), nat(components), 'definition', [components]) }
  /** THE TIME AND PLACE OF BIRTH. The longitudes are geocentric, so the place enters through the clock: a local time
   *  becomes UT through the place's zone, or, where no zone is known, through its longitude (local mean time). A zone
   *  is minutes east of Greenwich plus 720 (0 = UTC−12, 720 = UTC, 1440 = UTC+12); ut() answers minutes from 00:00 UT
   *  of the local date plus 1440, so a birth before Greenwich midnight stays a natural; jdm() takes that. */
  static ut(hhmm: number, zone: number): CrossFormula {
    const hour = Math.floor(hhmm / 100), minute = hhmm % 100
    const ok = nat(hhmm, zone) && hour <= 23 && minute <= 59 && zone <= 1440
    return f('hd-ut', 'ut(hhmm, zone) = 60h + min − (zone − 720) + 1440', ok ? hour * 60 + minute - (zone - 720) + 1440 : 0, ok, 'ut', [hhmm, zone])
  }
  /** The zone of a place by its longitude alone: local mean time, 4 minutes per degree east, in tenths of a degree east (0..3599). */
  static mean(longitude10: number): CrossFormula {
    const east = longitude10 <= 1800 ? longitude10 : longitude10 - 3600
    return f('hd-mean', 'mean(λ) = ⌊4 · λ⌉ + 720 (minutes east of Greenwich, plus 720)', Math.round(east * 0.4) + 720, nat(longitude10) && longitude10 < 3600, 'mean', [longitude10])
  }
  /** A civil date as a human writes it, yyyymmdd (one 48-bit parameter), to its compact code y·372 + (m − 1)·31 + (d − 1),
   *  which fits the 24 bits a two-parameter program gives: jdm(code, minutes) takes it. */
  static code(yyyymmdd: number): CrossFormula {
    const year = Math.floor(yyyymmdd / 10000), month = Math.floor(yyyymmdd / 100) % 100, day = yyyymmdd % 100
    const ok = nat(yyyymmdd) && month >= 1 && month <= 12 && day >= 1 && day <= 31
    return f('hd-code', 'code(yyyymmdd) = 372·y + 31·(m − 1) + (d − 1)', ok ? year * 372 + (month - 1) * 31 + (day - 1) : 0, ok, 'code', [yyyymmdd])
  }
  /** A date code (hd.code) and ut() minutes to the Julian day in minutes (Meeus ch. 7): the unit every formula of a
   *  chart takes, so a chart is exact to the minute and the place of birth. */
  static jdm(code: number, minutes: number): CrossFormula {
    const year = Math.floor(code / 372), month = Math.floor((code % 372) / 31) + 1, day = (code % 31) + 1
    let y = year, m = month
    if (m <= 2) { y -= 1; m += 12 }
    const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4)
    const jd0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5
    const ok = nat(code, minutes) && month <= 12
    return f('hd-jdm', 'jdm(code, m) = 1440 · jd₀(y, m, d) + m − 1440, jd₀ at 00:00 UT (Meeus ch. 7), (y, m, d) from the code', ok ? Math.round(jd0 * MINUTES) + minutes - MINUTES : 0, ok, 'jdm', [code, minutes])
  }
  /** The chart at a birth minute (jdm): the number of channels the Sun and Earth define, personality and design
   *  together; the run's steps carry the gates. A chat that knows a birth time asks this and cites the structure. */
  static chart(jdm: number): CrossFormula {
    const c = chartOf(jdm / MINUTES)
    return f('hd-chart', 'chart(jdm) = |defined channels of {Sun, Earth} × {personality, design}| at jdm / 1440', c.defined.length, nat(jdm) && jdm > 0 && c.holds, 'chart', [jdm])
  }
  /** The combinations of the structure: gates × lines × layers. */
  static cells(): CrossFormula { return f('hd-cells', 'cells = 64 gates × 6 lines × 2 layers', GATES * LINES * 2, true, 'cells', []) }
}

for (const name of ['cells', 'center', 'channel', 'channels', 'chart', 'code', 'definition', 'design', 'gate', 'jdm', 'line', 'mean', 'sun', 'ut'] as const)
  hexRegisterOf('hd', name, (HdFormulas[name] as (...x: unknown[]) => unknown).bind(HdFormulas))
