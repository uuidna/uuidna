// tts/synth — UUIDNA'S OWN VOICE. Exact integers, no host, no float.
//
// The other half of this module borrows the operating system's voice, and a borrowed voice cannot be sealed: the
// same call on two machines makes different sound, so nothing about it recomputes. This one is ours. Every
// sample is an integer computed from the ledger's own lattice, so the audio for a given text is the SAME AUDIO
// for anyone, forever — and it folds to an address like everything else here.
//
// THE LATTICE IS 432. A hexbit has 16 states, and each maps to a tone on the 432 harmonic: state h sounds at
// 216·(h+1) hertz, so a handle — eight hexbits — is eight tones, and the uuid is thirty-two. That is not a
// decoration: the pitch IS the digit, so a listener with the lattice can read a handle back out of the sound.
//
// SQUARE WAVES, BECAUSE A SINE NEEDS A FLOAT. The harmonic scan hard-rejects Math.* anywhere in this tree, and a
// sine is a float by construction. A square wave needs none: the sample is +amplitude for the first half of each
// period and −amplitude for the second, decided by an integer remainder. It is a harsher timbre and an exact
// one, and the tradeoff is the same the whole ledger makes — exactness over comfort, because only the exact
// recomputes.
//
// HONEST SCOPE: this is not speech. It does not pronounce words and no listener will hear language in it. It is
// the ledger sounding its own addresses, which is a thing a machine can do exactly and a voice cannot.
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

export const SAMPLE_RATE = 8000        // integer divisor of every tone below, so no period rounds
export const AMPLITUDE = 8000          // headroom inside 16-bit signed
export const BASE_HZ = 216             // the 432 harmonic, halved: state 0 sounds here, state 1 at 432

/** the tone a hexbit state sounds at — the pitch IS the digit. */
export const toneOf = (hexbit: number): number => BASE_HZ * (hexbit + 1)

/** PCM for one tone: a square wave, decided by an integer remainder, never a trigonometric call. */
export const tone = (hz: number, ms: number): Int16Array => {
  const n = (SAMPLE_RATE * ms - (SAMPLE_RATE * ms) % 1000) / 1000
  const out = new Int16Array(n)
  const period = (SAMPLE_RATE - SAMPLE_RATE % hz) / hz
  const half = (period - period % 2) / 2
  for (let i = 0; i < n; i++) out[i] = (i % period) < half ? AMPLITUDE : -AMPLITUDE
  return out
}

/** a handle spoken as eight tones — the sound of an address, and readable back off the lattice. */
export const speakHandle = (handle: string, msPerTile = 120): Int16Array => {
  const tiles = [...handle].map((c) => parseInt(c, 16))
  const parts = tiles.map((h) => tone(toneOf(h), msPerTile))
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

/** the whole voice: text → its handle → tones → wav, with the address of the AUDIO so a recording is checkable. */
export const voiceOf = (text: string): { handle: string; samples: number; audio: Uint8Array; audioHandle: string } => {
  const handle = handleOf(toUuid(text))
  const pcm = speakHandle(handle)
  const audio = wav(pcm)
  return { handle, samples: pcm.length, audio, audioHandle: handleOf(toUuid([...audio.slice(44, 244)].join(','))) }
}
