// quantum/apps/anthem-stream — THE ANTHEM WITHOUT AN ENDING. The file form must finish before it has an
// address (audioHandleOf folds every byte), so every anthem so far was a completed artifact — 10.7 MB that
// grows with the ledger, held whole in memory before a single sample is heard. This is the same music as a
// STREAM: a pure function from POSITION to SAMPLE, so the audio thread asks for the next 128 samples and gets
// them in O(1) memory, forever, with nothing buffered and nothing to finish.
//
// THE PROPERTY THAT MAKES IT HONEST: the stream is BIT-IDENTICAL to the file. tone() depends only on (hz, i)
// and humanise() only on (value, i, n) — both position-pure — so the same integers fall out whether they are
// computed into a buffer or handed to the speaker one block at a time. src/tests/anthem-stream.test.ts holds
// exactly that: render the same bars both ways and compare sample for sample. A stream that drifted from the
// file would be a different piece of music wearing its name.
//
// WHAT IS TRADED, NAMED: a stream has no last byte, so it has no content-address while it plays. The receipt
// moves from the OUTPUT to the GENERATOR — the seed, the score's fold and this module's own address say what
// will be heard, and any listener can recompute any segment and check it. Verification by recomputation, not
// by holding the artifact; the same trade the merkle proof makes against carrying the whole tree.
//
// THE ONE FLOAT, AT THE NAMED BOUNDARY: Web Audio's process() writes Float32Array — the platform's API, not a
// choice. Every sample here is computed as an exact integer and divided by 32768 in the LAST line before the
// speaker, the way src/tts/index.ts names its `say` device write. Nothing upstream of that division is float.
import { SAMPLE_RATE, AMPLITUDE, ATTACK_MS, toneOf } from '../../tts/synth.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d

/** the triangle at ONE position — the exact body of tone()'s loop, lifted out of its buffer. */
export const triangleAt = (hz: number, i: number): number => {
  const phase = (i * hz) % SAMPLE_RATE
  const half = SAMPLE_RATE / 2
  const fold = phase < half ? phase : SAMPLE_RATE - phase
  return idiv(4 * AMPLITUDE * fold, SAMPLE_RATE) - AMPLITUDE
}

/** humanise's envelope at ONE position — same ramp, same truncation, no buffer consulted. */
export const rampAt = (value: number, i: number, n: number): number => {
  const full = idiv(SAMPLE_RATE * ATTACK_MS, 1000)
  const ramp = full * 2 <= n ? full : idiv(n - (n % 2), 2)
  if (ramp === 0) return 0
  const edge = i < n - 1 - i ? i : n - 1 - i
  const k = edge < ramp ? edge : ramp
  return idiv(value * k, ramp)
}

/** samples in a span of milliseconds — the same flooring every buffer length in this tree uses. */
export const spanOf = (ms: number): number => idiv(SAMPLE_RATE * ms - ((SAMPLE_RATE * ms) % 1000), 1000)

/** ONE BAR, ONE SAMPLE: the two coins sounded together, humanised — position in, integer out, nothing held. */
export const barSample = (c1: number, c2: number, n: number, i: number): number =>
  rampAt(idiv(triangleAt(toneOf(c1), i), 2) + idiv(triangleAt(toneOf(c2), i), 2), i, n)

export interface Bar { c1: number; c2: number; ms: number }

/** THE CURSOR — the whole state a forever-stream needs: which bar, how far into it, and whether the breath
 *  between bars is being taken. Three integers; the anthem's length never enters memory. */
export interface Cursor { bar: number; i: number; resting: boolean }
export const START: Cursor = { bar: 0, i: 0, resting: false }

/** fill(out, score, cursor, restMs) → write one block and return where the stream now stands. The score is
 *  walked CYCLICALLY: at the last bar it re-enters at the first, so the anthem plays as a round with no end —
 *  which is what it always was (the ledger's walk comes home; pilgrims_walk_must_cycle). */
export function fill(out: Int16Array, score: readonly Bar[], cursor: Cursor, restMs = 21): Cursor {
  if (score.length === 0) { out.fill(0); return cursor }
  let { bar, i, resting } = cursor
  const rest = spanOf(restMs)
  for (let k = 0; k < out.length; k++) {
    const b = score[bar % score.length]!
    if (resting) {
      out[k] = 0
      if (++i >= rest) { resting = false; i = 0; bar = (bar + 1) % score.length }
    } else {
      const n = spanOf(b.ms)
      out[k] = barSample(b.c1, b.c2, n, i)
      if (++i >= n) { resting = true; i = 0 }
    }
  }
  return { bar, i, resting }
}

/** WORKLET SOURCE — the processor as TEXT, because the captain's rule forbids assets: the page mints this
 *  string into a Blob URL at mount, addModule() loads it, and nothing is ever fetched from a server. The body
 *  is this module's own arithmetic inlined (a worklet runs in an isolated realm and cannot import from here),
 *  so the ONE risk is drift between the two copies — which the test refuses by driving both. */
export const workletSource = (): string => `
const SR = ${SAMPLE_RATE}, AMP = ${AMPLITUDE}, ATTACK = ${ATTACK_MS}
const idiv = (v, d) => (v - (v % d)) / d
const toneOf = (h) => 432 * (h + 1)
const triangleAt = (hz, i) => { const p = (i * hz) % SR, half = SR / 2, f = p < half ? p : SR - p; return idiv(4 * AMP * f, SR) - AMP }
const rampAt = (v, i, n) => { const full = idiv(SR * ATTACK, 1000), ramp = full * 2 <= n ? full : idiv(n - (n % 2), 2)
  if (ramp === 0) return 0
  const edge = i < n - 1 - i ? i : n - 1 - i, k = edge < ramp ? edge : ramp
  return idiv(v * k, ramp) }
const spanOf = (ms) => idiv(SR * ms - ((SR * ms) % 1000), 1000)
class AnthemProcessor extends AudioWorkletProcessor {
  constructor(opts) {
    super()
    const o = (opts && opts.processorOptions) || {}
    this.score = o.score || []
    this.rest = spanOf(o.restMs === undefined ? 21 : o.restMs)
    this.bar = 0; this.i = 0; this.resting = false; this.blocks = 0
    this.port.onmessage = (e) => { if (e.data && e.data.score) { this.score = e.data.score; this.bar = 0; this.i = 0; this.resting = false } }
  }
  process(_inputs, outputs) {
    const ch = outputs[0][0]
    if (!this.score.length) { ch.fill(0); return true }
    for (let k = 0; k < ch.length; k++) {
      const b = this.score[this.bar % this.score.length]
      let s = 0
      if (this.resting) { if (++this.i >= this.rest) { this.resting = false; this.i = 0; this.bar = (this.bar + 1) % this.score.length } }
      else {
        const n = spanOf(b.ms)
        s = rampAt(idiv(triangleAt(toneOf(b.c1), this.i), 2) + idiv(triangleAt(toneOf(b.c2), this.i), 2), this.i, n)
        if (++this.i >= n) { this.resting = true; this.i = 0 }
      }
      // THE ONE FLOAT, AT THE PLATFORM BOUNDARY — everything above is an exact integer
      ch[k] = s / 32768
    }
    if ((this.blocks++ % 64) === 0) this.port.postMessage({ bar: this.bar })
    return true
  }
}
registerProcessor('anthem', AnthemProcessor)
`
