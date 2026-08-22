// quantum/apps/hexbit-player — THE STANDARD HEXBIT QUANTUM APP for sound, as PURE LOGIC (the captain's rules,
// 2026-08-22: no assets allowed; all computes in browser; standardise using hexbit quantum apps only;
// src/quantum/apps/**). An app here is a pure function from hexbit states to verifiable bytes: no filesystem,
// no network, no host voice, no float — it runs identically in a browser at mount, in Node under test, and at
// the edge if ever wired, and the SAME states give the SAME bytes and the SAME address everywhere. The Vue shell
// (docs/.vitepress/theme/HexbitPlayer.vue) is a thin importer of this function; the logic lives here so the
// tests can hold it without a browser. Input is STATES (0..15), never pitches: state h sounds 432·(h+1) Hz —
// the pitch IS the digit (readings_states_sound_the_lattice); the default bar is 252 ms — 4032 samples =
// 9·7·64 = 24²·7 (the_movie_and_the_song_are_one).
import { tone, humanise, silence, wav, audioHandleOf, toneOf, GAP_MS } from '../../tts/synth.js'

export interface HexbitRecording { bytes: Uint8Array; address: string; samples: number; states: readonly number[] }

/** render hexbit states to a complete WAV — the one compute every surface (browser, test, edge) shares. Throws
 *  on a state outside 0..15: an app that would guess at an out-of-lattice state is not deterministic, it is
 *  wrong, and wrong loudly beats wrong quietly. */
export function renderStates(states: readonly number[], ms = 252): HexbitRecording {
  for (const h of states) if (!Number.isInteger(h) || h < 0 || h > 15)
    throw new Error(`hexbit-player: state ${h} is outside the lattice 0..15 — nothing off-lattice can sound`)
  const parts: Int16Array[] = []
  states.forEach((h, i) => {
    if (i > 0) parts.push(silence(GAP_MS))
    parts.push(humanise(tone(toneOf(h), ms)))
  })
  const pcm = new Int16Array(parts.reduce((n, p) => n + p.length, 0))
  let at = 0
  for (const p of parts) { pcm.set(p, at); at += p.length }
  const bytes = wav(pcm)
  return { bytes, address: audioHandleOf(bytes), samples: pcm.length, states }
}
