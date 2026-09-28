// artifact — THE ONE DOOR THAT WRITES A DERIVED ARTIFACT, AND STAMPS ITS CROSS ON THE WAY OUT.
//
// The captain, 2026-09-28: "why arrays and hashes are not result of cross formulas?!? formulate all!" and then, when
// the answer began as three hand-patched writers: "no manual work whatsoever."
//
// MEASURED, and the measurement is the whole argument: 19 of 327 files in lean/ carry a receipt. The other 308 are
// arrays a reader can compare to nothing. Meanwhile wrRoot — this repository's one declared write door — is reached by
// 9 source files while more than twenty write into lean/ with writeFileSync directly. Those two numbers are the same
// fact: a rule that lives in each writer is a rule each writer can skip, and most of them did.
//
// SO THE STAMP LIVES IN THE DOOR. A writer says what it computed; the receipt is not its business and never was. That
// is the difference between folding the finder and remembering the finder, and it is why this is not a helper the
// careful writers may use: audit-artifact-receipts refuses a lean/*.json that arrived any other way, so the next
// artifact gets its cross without anybody deciding to give it one.
//
// WHY NOT INSIDE wrRoot ITSELF, which would be the narrower door: boundary.ts imports nothing, and it is imported by
// handle.ts and address.ts. Folding the cross into it would make boundary -> crossfold -> hexbit -> handle -> boundary,
// a cycle through the module the edge bundle loads first. A DECLARED BOUNDARY, stated here so the next reader does not
// "simplify" this into the cycle: the layering is the reason, not taste.
import { wrRoot } from './boundary.js'
import { crossFold } from './crossfold.js'

/** the separator between a leaf's path and its value — a byte no path or rendered value contains */
const SEP = String.fromCharCode(0)

/** the two fields the door adds, and the only two a writer must not write itself */
export interface ArtifactSeal {
  /** the content address of this artifact's own leaves, order-invariant */
  receipt: string
  /** the two routes that had to meet on it - `agrees: false` is a fault in the FOLD, never in the content */
  crossed: { sorted: string; reversed: string; agrees: boolean }
}

/**
 * THE LEAVES ARE READ OFF THE ARTIFACT, which is what makes the receipt recomputable by someone who has only the file.
 *
 * Every primitive in the value becomes one `path SEP value` leaf, with array indices in the path, so a row moving
 * between positions moves its leaf and a changed number changes exactly one. The seal fields are excluded by name for
 * the obvious reason: a receipt is no input to itself BY CONSTRUCTION, since folding it in would change the value being folded.
 *
 * Exported because the finder recomputes with the SAME function — a verifier that reimplements the derivation is
 * checking two derivations against each other, and this tree has paid for that mistake in other shapes.
 */
function leavesOf(value: unknown, path = '', out: string[] = []): string[] {
  if (value === null || typeof value !== 'object') {
    out.push(path + SEP + String(value))
    return out
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) leavesOf(value[i], path + '[' + i + ']', out)
    return out
  }
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    if (path === '' && (key === 'receipt' || key === 'crossed')) continue
    leavesOf((value as Record<string, unknown>)[key], path === '' ? key : path + '.' + key, out)
  }
  return out
}

/** sealOf(value) -> the cross this value's own content folds to */
export const sealOf = (value: unknown): ArtifactSeal => {
  const f = crossFold(leavesOf(value))
  return { receipt: f.receipt, crossed: f.crossed }
}

/**
 * wrArtifact(relPath, value) -> write a derived artifact, sealed with its own cross.
 *
 * The seal is computed from the value the writer passes, so it describes what was written rather than what the writer
 * meant. A writer that passes its own `receipt` has it recomputed and replaced: an asserted address is the thing this
 * door exists to abolish.
 */
// GENERIC OVER THE WRITER'S OWN TYPE, because every caller has one. The first signature took Record<string, unknown>
// and every typed census — DuplicationCensus, PaddingCensus, ReleaseLive, Harvest — was refused by the compiler for
// being MORE specific than that, which would have meant either widening each writer's own interface or casting at
// twenty-five call sites. The seal is computed from the value's own leaves and cares about no field by name, so the
// constraint that actually matters is that it is an object.
export function wrArtifact<T extends object>(relPath: string, value: T): ArtifactSeal {
  const seal = sealOf(value)
  wrRoot(relPath, JSON.stringify({ ...value, ...seal }, null, 1) + '\n')
  return seal
}
