// referrer-song — THE HANDLE PICKS THE DOOR INTO THE ROUND (queue lead 77). A visitor arrives from somewhere;
// that somewhere folds to a handle like everything else here, and the handle's value picks which of the six
// rotations of the sealed round 142857 greets them — six doors, one per rotation (referrer_six_doors), every
// visitor admitted because mod 6 is total. The pager's step SOUNDS: the interval between two pages' tones
// reduces to a ratio whose term sum is its consonance measure (referrer_consonance_ladder — Euler's gradus made
// bare: 1:1 sums 2, 1:2 sums 3, 2:3 sums 5 — small is sweet, decidably), and the closed page-cycle keeps prev
// and next total (referrer_cycle_is_total — the wrap buys totality). PURE AND FS-FREE BY CONSTRUCTION: every
// function returns values, the song returns BYTES — no filesystem, no network, no host voice — so the edge
// worker can render a visitor's greeting per request (the synth is exact integers; the same referrer hears the
// same bytes forever). consonance is a measured ordering, never a taste; the door is an address
// derivation, never a profile — a referrer is folded, not tracked, and the handle forgets everything but 32 bits.
import { toUuid, BASE } from './address.js'
import { handleOf } from './handle.js'
import { HEX_PI, HEXAGRAM_BITS } from './hexagram.js'
import { valueOf, HEXBIT_BITS } from './hexbit/index.js'
import { tone, humanise, silence, wav, audioHandleOf, toneOf, GAP_MS, A432_HZ, SAMPLE_RATE } from './tts/synth.js'

export const ROUND = HEX_PI.join('')
export const DOORS: readonly string[] = Array.from({ length: HEX_PI.length }, (_, d) => ROUND.slice(d) + ROUND.slice(0, d))
/** One bar in ms — 9·7·4 (BASE × rosette × hexbit), the CRT cycle the_movie_and_the_song_are_one counts. */
export const BAR = BASE * (HEXAGRAM_BITS + 1) * HEXBIT_BITS

export interface Door { referrer: string; handle: string; value: number; door: number; verse: number[] }

/** doorOf(referrer) → which rotation of the round greets this visitor: the referrer folds to a handle, the
 *  handle's value mod six picks the door. Deterministic and total — the same somewhere, the same door, forever. */
export const doorOf = (referrer: string): Door => {
  const handle = handleOf(toUuid(referrer))
  const { value } = valueOf(handle)
  const door = value % HEXAGRAM_BITS
  return { referrer, handle, value, door, verse: [...DOORS[door]!].map(Number) }
}

export interface Step { fromHz: number; toHz: number; num: number; den: number; consonance: number }

const gcd = (a: number, b: number): number => { let x = a, y = b; while (y !== 0) { const t = x % y; x = y; y = t } return x }

/** stepOf(fromHandle, toHandle) → the pager's step as SOUND: the two pages' leading tiles as tones, their
 *  interval reduced, its consonance the reduced term sum — 2 is unison, 3 the octave, 5 the fifth; small is
 *  sweet, and the number is the measure (referrer_consonance_ladder). */
export const stepOf = (fromHandle: string, toHandle: string): Step => {
  const a = parseInt(fromHandle[0]!, 16) + 1, b = parseInt(toHandle[0]!, 16) + 1
  const g = gcd(a, b)
  return { fromHz: A432_HZ * a, toHz: A432_HZ * b, num: a / g, den: b / g, consonance: a / g + b / g }
}

/** the closed cycle: prev and next, total by the wrap (referrer_cycle_is_total) — no page without a neighbour. */
export const cycleStep = (n: number, k: number): { next: number; prev: number } => {
  if (n <= 0) throw new Error('cycleStep: a cycle needs at least one page')
  return { next: (k + 1) % n, prev: (k + n - 1) % n }
}

export interface ReferrerSong { door: Door; audio: Uint8Array; audioHandle: string; seconds: number }

/** referrerSong(referrer) → the visitor's greeting as bytes: the round entered at their door — six notes on the
 *  A432 lattice, the sealed 252 ms bar each, humanised — then their own handle sung as the signature. Returns
 *  BYTES, never writes: the caller (a page, a Worker, a test) decides what a greeting becomes. */
export const referrerSong = (referrer: string): ReferrerSong => {
  const door = doorOf(referrer)
  const parts: Int16Array[] = []
  for (const [i, d] of door.verse.entries()) {
    if (i > 0) parts.push(silence(GAP_MS))
    parts.push(humanise(tone(A432_HZ * d, BAR)))
  }
  parts.push(silence(GAP_MS * 4))
  for (const [i, c] of [...door.handle].entries()) {
    if (i > 0) parts.push(silence(GAP_MS))
    parts.push(humanise(tone(toneOf(parseInt(c, 16)), BAR / 2)))
  }
  const pcm = new Int16Array(parts.reduce((a, p) => a + p.length, 0))
  let at = 0
  for (const p of parts) { pcm.set(p, at); at += p.length }
  const audio = wav(pcm)
  return { door, audio, audioHandle: audioHandleOf(audio), seconds: pcm.length / SAMPLE_RATE }
}
