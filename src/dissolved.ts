// THE REACH GOES THROUGH THE BOUNDARY, NEVER node: AT MODULE SCOPE. worker.js reaches this module, and Cloudflare
// refuses a Node builtin without nodejs_compat AT UPLOAD — so a dry run reports success and the deploy simply never
// appears, which this tree has already paid for once. existsRoot answers the same question and answers FALSE where
// there is no filesystem rather than throwing, so the edge reads "not present" instead of failing to load.
import { existsRoot } from './boundary.js'
import { theorems } from './theorems/index.js'

/**
 * Impossibilities that were examined and dissolved, and how.
 *
 * THE COMPLEMENT OF THE IMPOSSIBILITY GUARD. That finder reads the source for a
 * sentence claiming something CANNOT be done and giving no reason, because "a
 * false limit reads as rigour, so nobody re-examines it and the work behind it
 * never gets done". It catches limits that were never examined. This records the
 * ones that WERE — and it exists because the same move worked four times and was
 * re-derived from scratch each time.
 *
 * THE MOVE, stated once so it need not be rediscovered: find what the apparent
 * limit is actually a limit ON, then ask whether the goal needs that exact
 * thing. A cap on a primitive's parameter is not a cap on the work the primitive
 * does. A store too small to hold every row — a host fact, not a policy — can
 * still answer about one row. A
 * theory whose physics is undecidable can still contain arithmetic that is not.
 * In every case the impossibility was real and was about something narrower
 * than the goal.
 *
 * WHAT THIS IS NOT: a list of anecdotes. Every entry cites an artefact this
 * repository can check — a sealed theorem key, or a file that exists — and
 * `dissolvedGaps` refuses an entry whose citation does not resolve. A register
 * of clever stories nobody can verify is the shape this tree refuses
 * everywhere else; it would be worse here, in the file about not fooling
 * yourself.
 */

export type Dissolved = {
  /** What looked impossible, as somebody would actually say it. */
  claim: string
  /** What the limit was genuinely a limit ON — the narrower true statement. */
  actually: string
  /** The decomposition that got past it. */
  by: string
  /** A sealed theorem key, when one carries it. */
  theorem?: string
  /** A file in this repository that implements or proves it. */
  file?: string
  /** What is still NOT claimed — the part that stayed impossible. */
  unclaimed: string
}

export const DISSOLVED: readonly Dissolved[] = [
  {
    actually:
      'the isolate cannot hold 40 MB of rows at once — a limit on holding everything, not on answering anything',
    by: 'answer from a baked root, or from the one piece the cited key sits in; verifying a commitment is O(1) where recomputing the set is O(n)',
    claim: 'the hosted edge cannot serve a ledger larger than its memory',
    theorem: 'verify_beats_recompute_by_magnitudes',
    unclaimed:
      'that the root is correct — verifying against a commitment trusts the commitment, and says so in the answer rather than reporting plain agreement',
  },
  {
    actually:
      'a 128-bit address is finite and the Planck length is a measured constant — both are integers, and integers compare',
    by: 'write the CODATA value as the integers it is stated in (1616255 over 10^41) and decide the comparison, instead of reaching for reals this kernel does not hold',
    claim: 'you cannot compare an address space to a physical scale without leaving arithmetic',
    theorem: 'handle_outreaches_planck',
    unclaimed:
      'anything physical. The Planck length is not a pixel of space and nothing here says it is; what is decided is a comparison of two integer magnitudes',
  },
  {
    actually:
      "string theory's PHYSICAL content is not decidable by this kernel — which says nothing about the arithmetic inside it",
    by: 'seal the anomaly cancellation, which is a small integer equation: 26 + (-26) = 0, and (26-2)/24 = 1, and the same count with superconformal ghosts giving 10',
    claim: 'string theory cannot be represented in a kernel that only decides finite arithmetic',
    theorem: 'anomaly_cancels_at_twenty_six',
    unclaimed:
      'that strings exist, that spacetime has twenty-six dimensions, or that supersymmetry is observed. No experiment is cited because none confirms any of it',
  },
  {
    actually:
      'a double cannot represent an integer above 2^53 — a limit on the LITERAL, while every operation was already exact',
    by: 'parse the numeral as a BigInt and narrow only when it fits, the rule every operator in that evaluator already followed',
    claim: 'the independent evaluator cannot check theorems at Planck or cosmological magnitude',
    file: 'src/involution/index.ts',
    unclaimed:
      'that the evaluator agrees with the kernel everywhere — 51 statements remain outside its grammar and keep their missing leg, which is reported rather than folded into agreement',
  },
]

export type DissolvedGap = { fix: string; what: string }

/**
 * Every citation resolves, or the entry is a story.
 *
 * A REGISTER OF UNVERIFIABLE CLEVERNESS would be worse here than anywhere else
 * in this tree: this is the file about not fooling yourself. So a theorem key
 * must be one the ledger serves, and a file must be one that exists.
 */
export function dissolvedGaps(entries: readonly Dissolved[] = DISSOLVED): DissolvedGap[] {
  const gaps: DissolvedGap[] = []
  const sealed = new Set(theorems().map((t) => t.key))

  for (const entry of entries) {
    if (entry.theorem === undefined && entry.file === undefined) {
      gaps.push({
        fix: 'cite a sealed theorem key or a file in this repository. An entry that cites neither is an anecdote, and this register is not for anecdotes',
        what: `"${entry.claim}" cites nothing checkable`,
      })
      continue
    }
    if (entry.theorem !== undefined && !sealed.has(entry.theorem)) {
      gaps.push({
        fix: 'name a key the ledger serves — `uuidna_theorems` lists them. A citation to a theorem that was renamed or retired reads as evidence and is not',
        what: `"${entry.claim}" cites theorem ${entry.theorem}, which the ledger does not serve`,
      })
    }
    if (entry.file !== undefined && !existsRoot(entry.file)) {
      gaps.push({
        fix: 'name a path that exists, or move the entry to a theorem key. A file that was moved leaves the claim uncheckable',
        what: `"${entry.claim}" cites ${entry.file}, which is not in the tree`,
      })
    }
    if (entry.unclaimed.trim().length === 0) {
      gaps.push({
        fix: 'state what stayed impossible. An entry with nothing unclaimed is claiming the whole of what it dissolved, which is how a dissolved limit becomes an overclaim',
        what: `"${entry.claim}" names nothing it does not claim`,
      })
    }
  }

  return gaps
}
