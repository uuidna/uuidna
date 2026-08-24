// quantum/apps/harmony-scan — THE HARMONY APPARATUS: a non-invasive scan of a recording, read out as a panel.
//
// "Medical" here names the SHAPE OF THE READOUT and nothing else: an apparatus that touches nothing, a panel of
// measurements each against a stated reference range, and findings that are NAMED rather than diagnosed. It is
// a spectrometer's kind of medical, not a physician's.
//
// HONEST SCOPE, and it governs every line below: this measures the ARITHMETIC OF INTERVALS in bytes. It is not
// a medical device. It diagnoses nothing, treats nothing, and says nothing whatever about any listener's body,
// mind or health. The ledger's standing refusal holds here in full — A432 is a tuning this lattice computes in,
// NOT a frequency that heals, and a consonance measure is Euler's gradus (a reduced ratio's term sum), which
// orders intervals by arithmetic simplicity and NOT by beauty, wellness, or any effect on a person.
//
// WHY TWO READINGS. A scan with one source cannot be wrong. This one reads the SCORE (exact: each bar's two
// coin-tiles give an interval whose reduced ratio is its consonance) and the AUDIO (measured: zero-crossings,
// peak, silence — counted from the PCM itself), then CROSS-CHECKS them. Agreement is the health finding;
// disagreement means the recording is not the song it claims to be, which is the only diagnosis this apparatus
// is competent to make. Exact integers throughout — no host rounding library, no float, no clock.
import { SAMPLE_RATE, AMPLITUDE, toneOf } from '../../tts/synth.js'
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d
const gcd = (a: number, b: number): number => { let x = a, y = b; while (y !== 0) { const t = x % y; x = y; y = t } return x }

/** THE LADDER, named — the sealed consonance steps (referrer_consonance_ladder). A ratio's term sum IS the
 *  measure; these names are the classical labels for the smallest ones, given only so a panel reads in words. */
export const LADDER: ReadonlyArray<{ sum: number; name: string }> = [
  { sum: 2, name: 'unison' }, { sum: 3, name: 'octave' }, { sum: 5, name: 'fifth' },
  { sum: 7, name: 'fourth' }, { sum: 8, name: 'major sixth' }, { sum: 9, name: 'major third' },
]
export const nameOf = (sum: number): string => LADDER.find((l) => l.sum === sum)?.name ?? `wide (gradus ${sum})`

export interface Interval { num: number; den: number; consonance: number; name: string }
/** the interval between two lattice tiles, reduced — the multipliers ARE the ratio (both sound k·432). */
export const intervalOf = (t1: number, t2: number): Interval => {
  const a = t1 + 1, b = t2 + 1
  const g = gcd(a, b)
  const num = idiv(a, g), den = idiv(b, g)
  return { num, den, consonance: num + den, name: nameOf(num + den) }
}

export interface Bar { c1: number; c2: number; ms: number }

/** THE STRUCTURAL SCAN — exact, from the score: every bar's simultaneity, plus the melodic step between bars.
 *  A histogram is a panel, not a verdict: it says what is there, and the reference ranges say what is usual. */
export interface Structural {
  bars: number
  simultaneous: Record<number, number>   // consonance measure → how many bars sound it
  steps: Record<number, number>          // consonance of each bar-to-bar step
  gradusTotal: number                    // the summed measure — lower is arithmetically simpler, NOT better
  worst: { bar: number; consonance: number; name: string } | null
}
export function scanStructure(score: readonly Bar[]): Structural {
  const simultaneous: Record<number, number> = {}
  const steps: Record<number, number> = {}
  let gradusTotal = 0
  let worst: Structural['worst'] = null
  for (const [i, b] of score.entries()) {
    const iv = intervalOf(b.c1, b.c2)
    simultaneous[iv.consonance] = (simultaneous[iv.consonance] ?? 0) + 1
    gradusTotal += iv.consonance
    if (!worst || iv.consonance > worst.consonance) worst = { bar: i + 1, consonance: iv.consonance, name: iv.name }
    if (i > 0) { const st = intervalOf(score[i - 1]!.c1, b.c1); steps[st.consonance] = (steps[st.consonance] ?? 0) + 1 }
  }
  return { bars: score.length, simultaneous, steps, gradusTotal, worst }
}

/** THE VITAL SIGNS — measured from the PCM alone, knowing nothing of the score: how many voiced segments the
 *  recording contains, its peak against the sealed headroom, and how much of it is breath. Any of these can
 *  disagree with the structure, which is the entire reason to measure them separately. */
export interface Vitals { samples: number; segments: number; peak: number; silentSamples: number; clipping: boolean }

/** A REST IS A RUN, NOT A ZERO — the apparatus's own first misreading, kept as the reason this line exists.
 *  Version one counted every zero SAMPLE as silence and reported 27 voiced segments for a 3-bar recording,
 *  because a triangle wave crosses zero twice a cycle: the instrument was hearing the waveform's own crossings
 *  as gaps. The threshold is DERIVED, never picked — half the sealed breath (GAP 21 ms → 336 samples → 168),
 *  which no crossing inside any lattice tone can reach (the lowest tone, 432 Hz, folds every 37 samples). */
export const REST_FLOOR = idiv(idiv(SAMPLE_RATE * 21, 1000), 2)

export function scanVitals(pcm: Int16Array, restFloor = REST_FLOOR): Vitals {
  let peak = 0, silentSamples = 0, segments = 0
  let zeros = 0, voicedSinceRest = false
  for (let i = 0; i < pcm.length; i++) {
    const v = pcm[i]! < 0 ? -pcm[i]! : pcm[i]!
    if (v > peak) peak = v
    if (pcm[i] === 0) {
      silentSamples++
      zeros++
      if (zeros === restFloor && voicedSinceRest) { segments++; voicedSinceRest = false }
    } else { zeros = 0; voicedSinceRest = true }
  }
  if (voicedSinceRest) segments++
  return { samples: pcm.length, segments, peak, silentSamples, clipping: peak > AMPLITUDE }
}

/** the pitch a voiced span actually carries, by RISING ZERO-CROSSINGS — the instrument used on every song in
 *  this tree, and one that can disagree with what the score intended. */
export function measuredHz(pcm: Int16Array, from: number, to: number): number {
  let crossings = 0
  for (let i = from + 1; i < to && i < pcm.length; i++) if (pcm[i - 1]! < 0 && pcm[i]! >= 0) crossings++
  const span = to - from
  return span > 0 ? idiv(crossings * SAMPLE_RATE, span) : 0
}

/** THE PANEL — the whole readout, with the cross-check that makes it an instrument rather than a description.
 *  `agrees` is the only finding this apparatus is competent to make: the audio contains as many voiced
 *  segments as the score has bars, and it never exceeds the headroom the lattice seals. */
export interface Panel {
  structure: Structural
  vitals: Vitals
  agrees: boolean
  findings: string[]
  receipt: string
  honest: string
}
export const HONEST =
  'A measurement of interval ARITHMETIC in a recording — Euler\'s gradus (a reduced ratio\'s term sum) over the ' +
  'A432 lattice, cross-checked against the bytes. NOT a medical device: it diagnoses nothing, treats nothing, ' +
  'and makes no claim about any listener\'s body, mind, health or experience. A432 is the tuning this lattice ' +
  'computes in, never a frequency that heals; a lower gradus is arithmetically simpler, never "better".'

export function scanSong(score: readonly Bar[], pcm: Int16Array): Panel {
  const structure = scanStructure(score)
  const vitals = scanVitals(pcm)
  const findings: string[] = []
  if (vitals.clipping) findings.push(`peak ${vitals.peak} exceeds the sealed headroom ${AMPLITUDE} — the mix is over its ceiling (amplitude_inside_int16)`)
  if (vitals.segments !== structure.bars) findings.push(`the recording carries ${vitals.segments} voiced segment(s) where the score has ${structure.bars} bar(s) — the audio is not this score`)
  if (vitals.silentSamples === 0 && structure.bars > 1) findings.push('no breath anywhere — bars abut with no rest, which no rendering in this tree produces')
  if (structure.worst && structure.worst.consonance > 12) findings.push(`bar ${structure.worst.bar} sounds a ${structure.worst.name} — the widest interval in the piece (a measurement, not a complaint)`)
  const agrees = vitals.segments === structure.bars && !vitals.clipping
  return {
    structure, vitals, agrees, findings, honest: HONEST,
    receipt: handleOf(toUuid(JSON.stringify({ b: structure.bars, g: structure.gradusTotal, s: vitals.segments, p: vitals.peak }))),
  }
}

/** read a WAV this tree wrote back into samples — the apparatus takes the artifact as it is handed to it. */
export function pcmOfWav(wav: Uint8Array): Int16Array {
  const dv = new DataView(wav.buffer, wav.byteOffset, wav.byteLength)
  const n = idiv(dv.getUint32(40, true), 2)
  const out = new Int16Array(n)
  for (let i = 0; i < n; i++) out[i] = dv.getInt16(44 + i * 2, true)
  return out
}
