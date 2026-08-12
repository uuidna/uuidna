// The theorem ledger — DERIVED, LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven
// `by decide` (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs parses them into ./generated.ts,
// and this module is the typed, addressed view the package, the MCP tools, the trial and the site all consume.
// No theorem is authored here. A theorem computes in Lean, or it is not a theorem. Integrity, not truth.
import { LEAN_LEDGER, PRINCIPLES, type LeanTheorem } from './generated.js'
import { merkleGravity } from '../gravity.js'
import { toUuid } from '../address.js'

export { PRINCIPLES }
export type { LeanTheorem }

// SKILL — a derived, recomputable label mined from the theorem's KEY (Lean is the single source; the skill is a pure
// function of the name, exactly like the address). It groups theorems by the CAPABILITY they demonstrate — an axis
// ORTHOGONAL to `principle` (which groups by derivation file). First matching rule wins; anything unmatched is a
// foundational fact. Nothing is authored here — the skill is read off the name a Lean theorem already carries.
const SKILL_RULES: readonly [RegExp, string][] = [
  [/involut/, 'involution'],
  [/^z9|(^|_)mul9|mod9|_sq_zero|_self_inv|_no_inverse|_mul_(two|three|four|five|six|seven|eight|nine)/, 'z9-ring'],
  [/^z7/, 'z7-rosette'],
  [/pentag|(^|_)fib(_|onacci)|pisano/, 'pentagram'],
  [/chessboard|knight|rook|bishop|queen|_tour/, 'chess'],
  [/hamming|codeword|repetition|singleton_bound|checksum|_corrects_|_detects_/, 'codes'],
  [/twelfths|tide|flood|semidiurnal|spring_exceeds|neap/, 'tides'],
  [/^clay_/, 'clay-reflection'],
  [/(^|_)(dz|reflection|mirror|diamond|complement|division_by_zero|div_by_zero)/, 'reflection'],
  [/bell|ghz|born|no_signaling|superposition|truth_table|pauli|(^|_)cnot|(^|_)cz|swap|toffoli|ccz|s_squared|s_dagger|s_fourth|hadamard|quantum/, 'quantum'],
  [/salt|(^|_)seq/, 'crypt-salt'],
  [/abo|blood|dna|codon|sound|octave|electron|subshell|circle_of_fifths|tritone|(^|_)ph_|punnett|heterozygote|colou?r|primary_secondary|mendel/, 'science-pairs'],
  [/unit|orbit|doubling|vortex|agl|commutator|nilpotent|idempotent|lagrange|coprime|light|gravity|root|strip|neighbour|polarit/, 'vortex'],
]
/** The SKILL a theorem demonstrates, derived from its key — the capability axis, recomputable by anyone from the name. */
export function skillOf(key: string): string {
  const k = key.toLowerCase()
  for (const [re, s] of SKILL_RULES) if (re.test(k)) return s
  return 'foundational'
}

/** A Lean theorem with its reconstructed proof, content-address, and derived skill. */
export interface Theorem extends LeanTheorem { lean: string; address: string; skill: string }

const withDerived = (t: LeanTheorem): Theorem => ({
  ...t,
  lean: `theorem ${t.key} : ${t.statement} := by ${t.tactic}`,
  address: toUuid(t.key + ':' + t.statement),
  skill: skillOf(t.key),
})

/** Every Lean-proven theorem, in computing-principle order. */
export const THEOREMS: readonly Theorem[] = LEAN_LEDGER.map(withDerived)

/** The distinct skills present, in the order they first appear in the ledger. */
export const SKILLS: readonly string[] = [...new Set(THEOREMS.map((t) => t.skill))]

export interface SkillGroup { skill: string; count: number; fold: string; theorems: Theorem[] }
/** The ledger organised by SKILL (the capability axis) — each group's content-addresses fold, order-invariantly,
 *  to one recomputable receipt. Same theorems as the principle view, grouped on the orthogonal axis. */
export function skillGroups(): SkillGroup[] {
  return SKILLS.map((skill) => {
    const ts = THEOREMS.filter((t) => t.skill === skill)
    return { skill, count: ts.length, fold: merkleGravity(ts.map((t) => t.address)), theorems: ts }
  })
}

export interface TheoremVerdict {
  key: string; name: string; statement: string; file: string; principle: string; lean: string; verdict: 'SEALED'; address: string
}
export interface TrialResult {
  count: number; sealed: number; refuted: number; unverified: number; leanBacked: number; receipt: string; verdicts: TheoremVerdict[]
}

/** Run the whole ledger through the trial. Every theorem is SEALED by its `by decide` Lean proof — verified
 *  sorry-free by `npm run lean` before the ledger was generated — so the seal's authority is the Lean proof, not
 *  a runtime re-check. Their content-addresses fold, order-invariantly, to ONE recomputable receipt: the ledger's
 *  integrity. Recomputable by anyone from the same lean/*.lean. Integrity, not truth. */
export function runTrial(): TrialResult {
  const verdicts: TheoremVerdict[] = THEOREMS.map((t) => ({
    key: t.key, name: t.name, statement: t.statement, file: t.file, principle: t.principle, lean: t.lean, verdict: 'SEALED', address: t.address,
  }))
  const receipt = merkleGravity(verdicts.map((v) => v.address))
  return { count: verdicts.length, sealed: verdicts.length, refuted: 0, unverified: 0, leanBacked: verdicts.length, receipt, verdicts }
}

/** The ledger, by reference — each theorem's key, name, statement, Lean proof, principle, skill, source file and
 *  address. Pass `{ skill }` to filter to one skill (the capability axis). */
export function theorems(opts: { skill?: string } = {}): { key: string; name: string; statement: string; tactic: string; file: string; principle: string; skill: string; lean: string; address: string }[] {
  const ts = opts.skill ? THEOREMS.filter((t) => t.skill === opts.skill) : THEOREMS
  return ts.map((t) => ({ key: t.key, name: t.name, statement: t.statement, tactic: t.tactic, file: t.file, principle: t.principle, skill: t.skill, lean: t.lean, address: t.address }))
}
