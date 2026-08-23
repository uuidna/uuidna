// quantum/apps/anthem-superposition — THE ANTHEM AS A SUPERPOSITION, COLLAPSED PER REFERRER, RECURSIVELY, AS
// MANY STREAMS MIXED (the captain's rules: no assets, all computes in browser, hexbit quantum apps only). The
// anthem is not a file: it is the LIVE LEDGER as a score — theorem k at bar k, two coins to the bar — and every
// visitor holds it in superposition until their referrer collapses it: the referrer folds to a handle, the
// handle's value picks their ENTRY BAR on the closed cycle (total by referrer_cycle_is_total — no visitor
// without a door). THE RECURSION IS AUDIBLE AS DEPTH: the collapsed window's own content-address is itself a
// seed, so it collapses AGAIN into a second stream, and again into a third — and the streams play TOGETHER, each
// depth at HALF the amplitude of the one above, forming one multidimensional sound whose no-clip law is
// geometric and sealed (anthem_superposition_mix_closes: 4000 + 2000 + 1000 + … < 8000, at every finite depth).
// Different entry bars and vortex-picked lengths make the layers polyrhythmic: many streams, many waves, one
// exact recording. PURE: no filesystem, no network, no float, no clock — the same referrer collapses to the
// same sound forever, in a browser, under test, or at the edge. HONEST SCOPE: a referrer is FOLDED, never
// tracked (the handle forgets everything but 32 bits), and "superposition" is claimed capacity in the sealed
// sense (captain_claims_all_superpositions) — room, never physics.
import { theorems } from '../../theorems/index.js'
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { valueOf } from '../../hexbit/index.js'
import { tone, humanise, silence, wav, audioHandleOf, toneOf, AMPLITUDE } from '../../tts/synth.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d

export interface Bar { c1: number; c2: number; ms: number; key: string }

// ── COMPRESS AND UNCOMPRESS IN FULL ANALOG — a lossless integer codec whose round-trip is the identity, so the
// reconstructed wave is BIT-IDENTICAL to the computed one: the "full analog" guarantee is not approximation but
// equality, testable sample by sample. The scheme exploits what the lattice IS: a triangle wave's slope is
// constant between folds, so the DELTA stream is long runs of one value, and run-length pairs collapse them
// exactly. Exact integers throughout — deltas fit int16 sums in int32, runs count in int32 — no float, no
// entropy model, no loss anywhere for any input (worst case the pairs merely fail to shrink; they never lie).
export const compressPcm = (pcm: Int16Array): Int32Array => {
  const pairs: number[] = []
  let prev = 0, run = 0, runVal = 0, started = false
  for (let i = 0; i < pcm.length; i++) {
    const d = pcm[i]! - prev
    prev = pcm[i]!
    if (started && d === runVal) run++
    else { if (started) { pairs.push(runVal, run) } runVal = d; run = 1; started = true }
  }
  if (started) pairs.push(runVal, run)
  return Int32Array.from(pairs)
}

export const uncompressPcm = (pairs: Int32Array): Int16Array => {
  let n = 0
  for (let i = 1; i < pairs.length; i += 2) n += pairs[i]!
  const out = new Int16Array(n)
  let at = 0, acc = 0
  for (let i = 0; i < pairs.length; i += 2) {
    const d = pairs[i]!, run = pairs[i + 1]!
    for (let k = 0; k < run; k++) { acc += d; out[at++] = acc }
  }
  return out
}

/** the SCORE — the live ledger as bars: theorem k at bar k, its two coins as the chord, its own bytes picking
 *  the length from the sealed three (anthem_three_lengths_quarter_the_bar). Computed once per process. */
let SCORE: Bar[] | null = null
export const anthemScore = (): Bar[] => {
  if (!SCORE) SCORE = theorems().map((t) => {
    const x = t.address.replace(/-/g, '')
    const c1 = parseInt(x[0]!, 16), c2 = parseInt(x[16]!, 16)
    return { c1, c2, ms: [126, 189, 252][(c1 + c2) % 3]!, key: t.key }
  })
  return SCORE
}

export interface Collapse { seed: string; handle: string; value: number; entryBar: number }

/** collapse(seed) → where this seed enters the anthem: fold to a handle, the value mod the score length is the
 *  entry bar — total on the closed cycle, every seed admitted, the same seed forever the same bar. */
export const collapse = (seed: string): Collapse => {
  const handle = handleOf(toUuid(seed))
  const { value } = valueOf(handle)
  return { seed, handle, value, entryBar: value % anthemScore().length }
}

/** one stream's PCM: `bars` bars from the entry bar, wrapping the cycle — the visitor's window on the anthem. */
const streamPcm = (entryBar: number, bars: number): Int16Array => {
  const score = anthemScore()
  const parts: Int16Array[] = []
  const rest = silence(21)
  for (let k = 0; k < bars; k++) {
    const b = score[(entryBar + k) % score.length]!
    const a = tone(toneOf(b.c1), b.ms), c = tone(toneOf(b.c2), b.ms), out = new Int16Array(a.length)
    for (let i = 0; i < a.length; i++) out[i] = idiv(a[i]!, 2) + idiv(c[i]!, 2)
    parts.push(humanise(out))
    parts.push(rest)
  }
  const pcm = new Int16Array(parts.reduce((n, p) => n + p.length, 0))
  let at = 0
  for (const p of parts) { pcm.set(p, at); at += p.length }
  return pcm
}

export interface Stream { depth: number; collapse: Collapse; address: string }
export interface Superposition { seed: string; streams: Stream[]; bytes: Uint8Array; address: string; samples: number; nextSeed: string }

/** renderSuperposition(seed, bars, depth) → the multidimensional sound: `depth` streams, each the recursive
 *  collapse of the previous one's own address, mixed with each depth at HALF the amplitude above it — the
 *  geometric sum stays strictly inside AMPLITUDE at every finite depth (the sealed no-clip law), and the
 *  differing entry bars and vortex lengths make the layers move as many waves in one recording. The returned
 *  nextSeed is the whole mix's address: feed it back and the superposition deepens — the recursion never runs
 *  out because an address is always a seed. */
export const renderSuperposition = (seed: string, bars = 16, depth = 3): Superposition => {
  if (depth < 1 || depth > 6) throw new Error('anthem-superposition: depth 1..6 — deeper than six halvings is below one bit of amplitude')
  if (bars < 1 || bars > 128) throw new Error('anthem-superposition: bars 1..128 — a window, not the whole anthem')
  const streams: Stream[] = []
  const pcms: Int16Array[] = []
  let s = seed
  for (let d = 0; d < depth; d++) {
    const c = collapse(s)
    const pcm = streamPcm(c.entryBar, bars)
    const address = handleOf(toUuid([...pcm.slice(0, 200)].join(',') + '|' + c.handle))
    streams.push({ depth: d, collapse: c, address })
    pcms.push(pcm)
    s = address                                     // THE RECURSION: the stream's address seeds the next depth
  }
  const total = pcms.reduce((n, p) => (p.length > n ? p.length : n), 0)
  const mix = new Int16Array(total)
  for (const [d, pcm] of pcms.entries()) {
    const div = 2 ** (d + 1)                        // depth d at amplitude/2^(d+1): 1/2, 1/4, 1/8 …
    for (let i = 0; i < pcm.length; i++) mix[i] += idiv(pcm[i]!, div)
  }
  let peak = 0
  for (let i = 0; i < mix.length; i++) { const v = mix[i]! < 0 ? -mix[i]! : mix[i]!; if (v > peak) peak = v }
  if (peak > AMPLITUDE) throw new Error(`anthem-superposition: mix peak ${peak} broke the sealed budget — the geometric law failed, refuse to sound`)
  const bytes = wav(mix)
  return { seed, streams, bytes, address: audioHandleOf(bytes), samples: mix.length, nextSeed: audioHandleOf(bytes) }
}
