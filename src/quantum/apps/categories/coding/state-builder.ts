// categories/coding/state-builder — THE SCHOOL'S BUILDING TOOL (lead 81). The student composes hexbit states on
// the lattice and gets back the whole truth of what they built: the exact-integer recording (renderStates — the
// standard player is the kernel of the builder), its content-address, the door their composition enters the round
// by, the trinity multiplier behind that door, and the beat their adjacent steps make in units of A432. Building
// and understanding are one act: every figure the report carries cites the seal that makes it computable. Pure
// hexbit-app law throughout. HONEST SCOPE: states, doors, ratios — the composition's arithmetic, not its beauty.
import { renderStates, type HexbitRecording } from '../../hexbit-player.js'

export interface Composition extends HexbitRecording {
  door: number          // states[0] mod 6 — door_of_the_referrer
  multiplier: number    // 3^door mod 7 — the_shift_is_the_trinity
  beats: number[]       // adjacent-step beat rates in Hz — adjacent_steps_beat_at_the_tuning (432·|Δstate|)
}

export function build(states: readonly number[], ms = 252): Composition {
  const r = renderStates(states, ms)
  const door = states.length > 0 ? states[0]! % 6 : 0
  let multiplier = 1
  for (let i = 0; i < door; i++) multiplier = (multiplier * 3) % 7
  const beats = states.slice(1).map((s, i) => 432 * (s > states[i]! ? s - states[i]! : states[i]! - s))
  return { ...r, door, multiplier, beats }
}
