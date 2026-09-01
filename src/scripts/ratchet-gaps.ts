// ratchet-gaps — A MEASURE MAY NOT BE LOOSENED TO FIT A RESULT.
//
// A peer session (zeropoint-node) named the class in one line: WHEN YOUR OWN CHANGE BREAKS A GATE, THE FIRST FIX
// YOU REACH FOR IS LOOSENING THE GATE. They caught themselves about to widen a size metric so it would credit
// their own lines; I caught myself the same hour widening a detector and then re-baselining the debt upward. It
// is the hardest failure to see from inside, because every step has a defensible-sounding argument and the
// result is a tree that always passes.
//
// THE CONVENTION THIS TREE ALREADY HAS, and which I built by hand three times today before noticing it was a
// mechanism: a ratchet's prior value is a SEALED THEOREM, and the key carries the value in its suffix.
//
//   mcp_wire_rate_fell_while_total_grew_32183   (32183 < 32424)  — the wire cost per tool, in hundredths
//   impossibility_claims_debt_622               (622 > 6)        — bare modal claims outstanding
//   mcp_tool_coverage_partition_244             (100 < 119)      — tools with no dedicated test
//
// So the check needs no git and no history file. It RECOMPUTES the live measurement and compares it to the
// number sealed in the ledger — the same verify-don't-recompute discipline every other gate here uses. Moving a
// ceiling therefore costs what moving any claim costs: a new theorem, through the conveyor, past the kernel and
// the court. A JSON file can be edited in a second; a seal cannot.
//
// AND THE DIRECTION IS THE WHOLE POINT. A ratchet declares which way it may travel. A live value BETTER than the
// seal is progress and the finding is only that the seal is stale — say so and re-seal. A live value WORSE than
// the seal is the class this exists for, and it is reported whether or not someone also edited a baseline file,
// because the edit is the symptom and the loosening is the act.
import { theoremByKey } from '../theorems/index.js'
import { toUuid } from '../address.js'

export interface Gap { what: string; fix: string }

export interface Ratchet {
  name: string
  /** the MEASURE'S OWN ADDRESS — content-address of its source with comments stripped.
   *
   *  A peer session (zeropoint-node) built this check independently and their design is the reason it is here:
   *  watching the ceiling is not enough, because the cheapest way to pass a ratchet is to change what the ruler
   *  COUNTS. Fingerprinting the measure catches that, and the fingerprint must ignore comments — otherwise
   *  rewording an explanation demands a declaration, everyone rubber-stamps them, and a real remeasurement
   *  arrives indistinguishable from forty cosmetic ones. Free to explain; not free to redefine.
   *
   *  In this tree the fingerprint is a content-address, because that is what this tree already does to
   *  everything else it wants to notice moving. */
  measureAddress?: string
  /** the sealed key WITHOUT its numeric suffix — the suffix is the sealed value */
  prefix: string
  /** which way this measure is allowed to travel */
  direction: 'shrink' | 'grow'
  /** what the number means, for the message */
  unit: string
  /** recompute it now */
  live: () => number
}

/** the sealed value for a ratchet — the numeric suffix of the newest key carrying its prefix, or null */
export function sealedValue(prefix: string): number | null {
  const keys = [...theoremByKey().keys()].filter((k) => k.startsWith(prefix + '_'))
  const nums = keys
    .map((k) => k.slice(prefix.length + 1))
    .filter((s) => /^\d+$/.test(s))
    .map((s) => Number(s))
  if (!nums.length) return null
  // MORE THAN ONE SEAL MEANS THE RATCHET HAS MOVED, which is legitimate — the ledger keeps every step. The
  // binding value is the one the ratchet's own direction calls best: a shrink-only measure is bound by its
  // smallest seal, so re-sealing a larger number cannot quietly raise the ceiling — by construction, since the
  // reduction below takes the minimum and a larger number therefore never binds.
  return nums.reduce((a, b) => (a < b ? a : b))
}

/** the address of a measure's source, comments stripped — so explaining it is free and redefining it is not */
export function measureAddress(fn: (...a: never[]) => unknown): string {
  const src = String(fn)
    .replace(/\/\*[\s\S]*?\*\//g, '')   // block comments
    .replace(/\/\/[^\n]*/g, '')          // line comments
    .replace(/\s+/g, ' ')                // whitespace is not meaning
    .trim()
  return toUuid('measure:' + src)
}

/** ratchetGaps(ratchets) → measures that moved the way they are not allowed to move. */
export function ratchetGaps(ratchets: readonly Ratchet[]): Gap[] {
  const gaps: Gap[] = []
  for (const r of ratchets) {
    const sealed = sealedValue(r.prefix)
    if (sealed === null) {
      gaps.push({
        what: `${r.name} has NO sealed ratchet — nothing would notice it loosening (expected a theorem keyed ${r.prefix}_<value>)`,
        fix: `seal the current measurement as a theorem keyed ${r.prefix}_<value>, so moving the ceiling costs a trip through the conveyor and the court rather than a one-second edit to a JSON file`,
      })
      continue
    }
    let live: number
    try { live = r.live() } catch (e) {
      gaps.push({ what: `${r.name} could not be recomputed (${e instanceof Error ? e.message : String(e)})`, fix: 'a ratchet that cannot be measured cannot be enforced — fix the measurement, do not drop the ratchet' })
      continue
    }
    // THE RULER FIRST, THEN THE READING. A changed measure invalidates the comparison entirely, so it is
    // reported before the value — checking a number against a ceiling set by a different ruler is worse than
    // not checking, because it produces a confident verdict about nothing.
    if (r.measureAddress !== undefined) {
      const now = measureAddress(r.live as (...a: never[]) => unknown)
      if (now !== r.measureAddress) {
        gaps.push({
          what: `${r.name}: THE RULER CHANGED — the measure now addresses ${now.slice(0, 13)}…, declared ${r.measureAddress.slice(0, 13)}…`,
          fix: 'a changed measure is not an error; changing one silently is. Declare it by updating measureAddress ' +
            'AND recording the ceiling that was in force under the OLD measure — that old number is the one a ' +
            'future reader would otherwise compare against without knowing the ruler moved. Comments are stripped ' +
            'before addressing, so rewording the explanation is free and costs no declaration.',
        })
        continue
      }
    }
    const worse = r.direction === 'shrink' ? live > sealed : live < sealed
    if (worse) {
      gaps.push({
        what: `${r.name} moved the WRONG WAY: ${live} ${r.unit} against a sealed ${sealed} (this measure may only ${r.direction})`,
        fix: 'fix the thing that moved, not the measure. If the loosening is genuinely intended, it costs a NEW ' +
          `sealed theorem keyed ${r.prefix}_${live} and an explicit note saying the ceiling was raised and why — ` +
          'which is exactly the friction that stops a gate being widened to fit the change that broke it.',
      })
    }
  }
  return gaps
}
