// quantum/apps/hexbit-animator — THE SECOND LAYER OF THE KERNEL (lead 94, the captain's DVD reading: the uuid is
// imprinted in layers; the same 32 states are simultaneously sound, glyph, and MOTION, each layer a projection
// verified by refolding to the one identity). The player renders states as the lattice's tones; this app renders
// the SAME states as keyframes — one keyframe per bar, the bar the sealed 4032 samples that is also 24 film
// slots of 168 (the_movie_and_the_song_are_one: at the sample level the two tilings are the same integer, so
// sound and motion align bar-for-bar BY ARITHMETIC, not by synchronization code). Pure hexbit-app law: integers
// only — a keyframe's ray is a sixteenth-of-turn INDEX (the shell does the trigonometry, because paint is the
// shell's half), its level is the state's own multiplier, its glyph the Glagolitic letter Cyril's numbering
// reaches. The animation is DRIVEN BY THE UUID ONLY: same states, same keyframes, same fold, any machine — and
// one moved state moves the fold, so a rendering that drifts from its uuid convicts itself. HONEST SCOPE: the
// layers carry IDENTITY made visible and audible — no claim that the motion means anything beyond the states.
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { renderStates, type HexbitRecording } from './hexbit-player.js'

export const BAR_MS = 252                 // 9·7·4 — the four tongues' bar
export const FRAMES_PER_BAR = 24          // the film ring inside every bar (4032 = 24·168)
export const SAMPLES_PER_FRAME = 168      // 24·7 — nothing left over
export const GAP_MS = 40                  // the breath between bars, the player's own

export interface Keyframe {
  index: number        // which bar of the piece
  state: number        // the hexbit 0..15 — the whole cause of everything below
  ray: number          // sixteenth-of-turn index 0..15 — the shell multiplies by 22.5° when it paints
  level: number        // state + 1 — the same multiplier the tone rides (432·level Hz)
  glyph: string        // the Glagolitic letter of the state — the readable layer
  hz: number           // the audible layer's frequency, so the shell can label without recomputing
  atMs: number         // when this bar begins — bars and breaths, exact integers
}

export interface Animation {
  states: readonly number[]
  keyframes: Keyframe[]
  totalMs: number
  fold: string         // the ONE identity every layer refolds to — toUuid over the states, layer-independent
  handle: string
}

/** the motion layer: states → keyframes, integer throughout; refuses off-lattice states the player's way. */
export function animateStates(states: readonly number[], ms = BAR_MS): Animation {
  for (const h of states) if (!Number.isInteger(h) || h < 0 || h > 15)
    throw new Error(`hexbit-animator: state ${h} is outside the lattice 0..15 — nothing off-lattice can move`)
  const keyframes: Keyframe[] = states.map((h, i) => ({
    index: i,
    state: h,
    ray: h,
    level: h + 1,
    glyph: String.fromCodePoint(0x2C00 + h),
    hz: 432 * (h + 1),
    atMs: i * (ms + GAP_MS),
  }))
  const totalMs = states.length === 0 ? 0 : states.length * ms + (states.length - 1) * GAP_MS
  const fold = toUuid('hexbit-states|' + states.join(','))
  return { states, keyframes, totalMs, fold, handle: handleOf(fold) }
}

/** BOTH LAYERS FROM ONE IDENTITY — the DVD read whole: the sound (the player's exact bytes) and the motion (the
 *  keyframes) derive from the same states and carry the same fold; the page prints one identity and two
 *  renderings, each checkable against it. */
export function layersOf(states: readonly number[], ms = BAR_MS): { animation: Animation; recording: HexbitRecording } {
  return { animation: animateStates(states, ms), recording: renderStates(states, ms) }
}
