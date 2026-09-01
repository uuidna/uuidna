// tts/synth — UUIDNA'S OWN VOICE. Exact integers, no host, no float.
//
// The other half of this module borrows the operating system's voice, and a borrowed voice cannot be sealed: the
// same call on two machines makes different sound, so nothing about it recomputes. This one is ours. Every
// sample is an integer computed from the ledger's own lattice, so the audio for a given text is the SAME AUDIO
// for anyone, forever — and it folds to an address like everything else here.
//
// THE LATTICE IS A432 AND ONLY A432. A hexbit has 16 states, and each maps to a whole multiple of the tuning:
// state h sounds at 432·(h+1) hertz, so state 0 IS the tuning tone itself and no tone below or beside the 432
// series exists here — a handle is eight of its harmonics, the uuid thirty-two. That is not a decoration: the
// pitch IS the digit, so a listener with the lattice can read a handle back out of the sound.
//
// THE PHASE IS ACCUMULATED, NEVER THE PERIOD ROUNDED. No sample rate divides all sixteen tones — their lcm is
// 432·lcm(1..16), far past any device — so a whole-samples period would quantise the lattice until neighbouring
// states collide on the same pitch and the digit is no longer readable. Instead each sample asks where phase
// (i·hz) mod SAMPLE_RATE sits in its cycle: all-integer, and over any full second the wave completes EXACTLY hz
// cycles, for every state at once. The jitter is at most one sample and the average pitch is the digit, exactly.
//
// A TRIANGLE, BECAUSE A SINE NEEDS A FLOAT AND A SQUARE NEEDS AN APOLOGY. Floating-point functions are not allowed
// anywhere in this tree, and a sine is a float by construction. A triangle needs none — fold the phase, scale by
// integer division — and its overtones fall away as 1/n² where a square's fall as 1/n: the nearest an exact
// integer wave comes to a sung vowel rather than a buzzer. Exactness over comfort still, but no longer exactness
// AS discomfort.
//
// A VOICE IS HUMANISED AT ITS EDGES. A tone that starts at full amplitude is a click, and clicks are how a
// machine sounds; a linear integer ramp in and out of every tile removes them. A breath of silence between tiles
// gives the handle a cadence a listener can count. That is the whole honest meaning of "humanise" here — the
// machine artifacts are removed, the lattice is untouched.
//
// this is not speech. It does not pronounce words and no listener will hear language in it. It is
// the ledger sounding its own addresses, which is a thing a machine can do exactly and a voice cannot.
import { toUuid, TRINITY } from '../address.js'
import { handleOf } from '../handle.js'
import { HEXBIT_STATES, COINS } from '../hexbit/index.js'

export const SAMPLE_RATE = 16000       // device rate; Nyquist is SAMPLE_RATE / COINS
export const AMPLITUDE = SAMPLE_RATE / COINS  // headroom inside 16-bit signed
export const A432_HZ = HEXBIT_STATES * (TRINITY ** TRINITY)
export const BASE_HZ = A432_HZ         // state 0 sounds the tuning itself — nothing halved, nothing beside the series
export const ATTACK_MS = 8             // the edge ramp: 128 samples in and out, the difference between a note and a click
export const GAP_MS = 40               // the breath between tiles — cadence, so a listener can count eight

/** the tone a hexbit state sounds at — the pitch IS the digit. */
export const toneOf = (hexbit: number): number => BASE_HZ * (hexbit + 1)

/** PCM for one tone: a triangle wave off the exact phase accumulator — over any full second, exactly hz cycles,
 *  whatever hz is. Integer throughout: the fold is a conditional, the scale is a division with its remainder
 *  subtracted first, and no trigonometric call exists to be made. */
export const tone = (hz: number, ms: number): Int16Array => {
  const n = (SAMPLE_RATE * ms - (SAMPLE_RATE * ms) % 1000) / 1000
  const out = new Int16Array(n)
  const half = SAMPLE_RATE / 2
  for (let i = 0; i < n; i++) {
    const phase = (i * hz) % SAMPLE_RATE           // where this sample sits in its cycle, exactly
    const fold = phase < half ? phase : SAMPLE_RATE - phase   // 0 → half → 0: the triangle's two slopes
    const v = 4 * AMPLITUDE * fold
    out[i] = (v - v % SAMPLE_RATE) / SAMPLE_RATE - AMPLITUDE  // −AMPLITUDE at the folds, +AMPLITUDE at the peak
  }
  return out
}

/** exact silence — the rest between tiles is part of the utterance and part of its address. */
export const silence = (ms: number): Int16Array =>
  new Int16Array((SAMPLE_RATE * ms - (SAMPLE_RATE * ms) % 1000) / 1000)

/** HUMANISE — a linear integer ramp in and out of the buffer, so every tile begins and ends at zero. This is
 *  what removes the machine's click; it moves no pitch and adds nothing, so the lattice a listener decodes is
 *  the one `tone` computed. Truncating division keeps every sample an exact integer. */
export const humanise = (pcm: Int16Array): Int16Array => {
  const n = pcm.length
  const full = (SAMPLE_RATE * ATTACK_MS - (SAMPLE_RATE * ATTACK_MS) % 1000) / 1000
  const ramp = full * 2 <= n ? full : (n - n % 2) / 2
  const out = new Int16Array(n)
  if (ramp === 0) return out
  for (let i = 0; i < n; i++) {
    const edge = i < n - 1 - i ? i : n - 1 - i     // distance to the nearer end, computed without min()
    const k = edge < ramp ? edge : ramp
    const v = pcm[i]! * k
    out[i] = (v - v % ramp) / ramp
  }
  return out
}

/** a handle spoken as eight tones with a breath between them — the sound of an address, readable back off the
 *  lattice tile by tile, each tile humanised at its edges so only the lattice is audible. */
export const speakHandle = (handle: string, msPerTile = 120): Int16Array => {
  const tiles = [...handle].map((c) => parseInt(c, 16))
  const gap = silence(GAP_MS)
  const parts: Int16Array[] = []
  for (let i = 0; i < tiles.length; i++) {
    if (i > 0) parts.push(gap)
    parts.push(humanise(tone(toneOf(tiles[i]!), msPerTile)))
  }
  const total = parts.reduce((a, p) => a + p.length, 0)
  const out = new Int16Array(total)
  let at = 0
  for (const p of parts) { out.set(p, at); at += p.length }
  return out
}

/** WAV bytes — a 44-byte canonical header and the samples, little-endian, written by hand so no library
 *  decides the format for us and every byte is one this module put there. */
export const wav = (pcm: Int16Array): Uint8Array => {
  const bytes = pcm.length * 2
  const buf = new Uint8Array(44 + bytes)
  const dv = new DataView(buf.buffer)
  const ascii = (at: number, s: string): void => { for (let i = 0; i < s.length; i++) buf[at + i] = s.charCodeAt(i) }
  ascii(0, 'RIFF'); dv.setUint32(4, 36 + bytes, true); ascii(8, 'WAVEfmt ')
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true)
  dv.setUint32(24, SAMPLE_RATE, true); dv.setUint32(28, SAMPLE_RATE * 2, true)
  dv.setUint16(32, 2, true); dv.setUint16(34, 16, true); ascii(36, 'data'); dv.setUint32(40, bytes, true)
  for (let i = 0; i < pcm.length; i++) dv.setInt16(44 + i * 2, pcm[i]!, true)
  return buf
}

/** the address of a recording — EVERY byte, header included, folds into the receipt, and it is exported so a
 *  listener can hold a WAV they were handed against the handle they were promised without reimplementing the
 *  fold. A receipt only a producer can recompute is not a receipt. */
export const audioHandleOf = (audio: Uint8Array): string => handleOf(toUuid([...audio].join(',')))

/** the whole voice: text → its handle → tones → wav, with the address of the AUDIO so a recording is checkable. */
export const voiceOf = (text: string): { handle: string; samples: number; audio: Uint8Array; audioHandle: string } => {
  const handle = handleOf(toUuid(text))
  const pcm = speakHandle(handle)
  const audio = wav(pcm)
  return { handle, samples: pcm.length, audio, audioHandle: audioHandleOf(audio) }
}
