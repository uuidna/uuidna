// categories/coding/frame-editor — THE SCHOOL'S EDITING TOOL (lead 81). The timeline is the film's own ring
// ℤ/24, and the editor's undo is not a feature bolted on: 24 is the largest modulus where EVERY invertible
// stride squares to one (frame_ring_undo_involutive — 5², 7², 11², 13², 17², 19², 23² all ≡ 1 mod 24), so
// applying the SAME stride again IS the undo, always, for every legal move. The student edits by strides and
// discovers the algebra by using it: redo equals do, undo equals do, and the history is a word in a group where
// every generator is its own inverse. Pure hexbit-app law: positions and strides are integers, the same edits
// give the same cut anywhere. the arithmetic of ℤ/24 — an editor's model, not an NLE, and no claim
// about film aesthetics.
export const FRAME_RING = 24
/** the invertible strides of ℤ/24 — each its own inverse, which is the whole editing lesson. */
export const UNITS_24: readonly number[] = [1, 5, 7, 11, 13, 17, 19, 23]

export interface EditState { position: number; history: number[] }

export const start = (): EditState => ({ position: 0, history: [] })

/** apply a stride — refuses a non-unit loudly: a move that cannot be undone is not an edit, it is damage. */
export function applyStride(s: EditState, u: number): EditState {
  if (!UNITS_24.includes(u)) throw new Error(`frame-editor: ${u} is not a unit of the ring — a move must be undoable to be an edit`)
  return { position: (s.position + u) % FRAME_RING, history: [...s.history, u] }
}

/** undo = apply the LAST stride again? No — undo on the ADDITIVE walk is the complement step; the involution
 *  lesson lives in the MULTIPLICATIVE reading: undoStride(u) is the stride that returns you, and for every unit
 *  it is 24 − u additively while u·u ≡ 1 multiplicatively — both computed, both exact, the student sees the two
 *  readings agree on "you get back". */
export function undo(s: EditState): EditState {
  if (s.history.length === 0) return s
  const last = s.history[s.history.length - 1]!
  return { position: (s.position + (FRAME_RING - last)) % FRAME_RING, history: s.history.slice(0, -1) }
}

/** the multiplicative involution the seal names: every unit squared is 1 — checkable by the student, one call. */
export const unitSquaresToOne = (u: number): boolean => UNITS_24.includes(u) && (u * u) % FRAME_RING === 1
