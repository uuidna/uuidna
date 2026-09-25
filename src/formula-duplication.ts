// formula-duplication — THE SAME FORMULA, SEALED MORE THAN ONCE, FOUND BY ALGEBRA RATHER THAN BY NAME.
//
// src/proposition-address.ts already merges statements that differ only in SPELLING — spacing, `==` for `=` — and
// folds 71076 keys to 70993 propositions. That is the right key for publication and it is blind to the case the
// captain pointed at: two statements that are the same FORMULA written in a different order. `(2*5) % 9 = 1` and
// `(5*2) % 9 = 1` are one arithmetic fact and two propositions under that key, because the normaliser compares
// characters and multiplication does not care about them.
//
// MEASURED, BEFORE ANY OF THIS WAS WRITTEN: of 71076 sealed statements, 1529 are pure formulas (the rest are
// programs — list walks, string literals, decidable predicates). Those 1529 hold 1324 distinct ALGEBRAIC forms, so
// 144 forms carry 349 statements between them and 205 statements are restatements of a form already sealed.
//
// AND THE LARGEST CLASS IS NOT A CROSS-DOMAIN COINCIDENCE, which is what it looked like before it was read: the
// five-way collision on `(2*5) % 9 = 1` is mul9_2_5 in Core.lean, z9mul_2_5 in Ring.lean and two_mul_five in
// Vortex.lean — three keys, three files, ONE skill (`z9-ring`), and the same human-readable name "2·5 ≡ 1 (mod 9)"
// on all three. The ℤ/9 multiplication table is sealed three times over. That is redundancy inside one subject, not
// three domains meeting, and the distinction matters: when two DIFFERENT skills arrive at one form, the shared form
// is a cross and the most interesting thing in the corpus. When one skill does, it is a copy.
//
// THE DANGER IS OVER-MERGING, and proposition-address.ts states it exactly: "a normalisation that is too aggressive
// MERGES two different results forever, which is worse." So this quotients by precisely two laws and no others —
// commutativity (with associativity where it holds) and the mirror symmetry of the order relations. Subtraction,
// division, modulo and exponentiation are left strictly alone, and the test attacks that boundary rather than
// asserting it: 2−3 must not meet 3−2, 8/4 must not meet 4/8, 2^3 must not meet 3^2.
//
// IT REPORTS AND RANKS; IT DELETES NOTHING. A sealed theorem is a published record, several carry DOIs, and the
// captain's rule is that no one withdraws a settlement. What a census owes is the truth about how many distinct
// facts the ledger holds — 71076 keys is not 71076 formulas — and which copies a future wing should cite instead
// of re-sealing.
import { toUuid, merkleFold } from './address.js'
import { classify, formulaSource, parseFormula, type Node, type BinOp } from './formula.js'

/** commutative AND associative: a chain of these may be flattened and sorted whole */
const FLATTENABLE = new Set<BinOp>(['+', '*', '∧'])
/** commutative but NOT associative: sort the two operands, never flatten a chain.
 *  `a = b = c` is not a Lean statement and treating `=` as associative would invent a grouping. */
const SYMMETRIC = new Set<BinOp>(['=', '≠'])
/** mirrored pairs: `a < b` and `b > a` are one relation written from either end */
const MIRROR: Partial<Record<BinOp, BinOp>> = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' }

/**
 * canonicalFormula(node) → a string equal for two formulas that differ ONLY by
 *   · the order of operands of +, * or ∧ (and the grouping of a chain of one of them), or
 *   · the direction an order relation is written in.
 * Every other difference survives, including operand order under −, /, % and ^.
 */
export function canonicalFormula(n: Node): string {
  if (n.kind === 'num') return n.text
  if (n.kind === 'neg') return `¬${canonicalFormula(n.of)}`
  if (n.kind !== 'bin') return canonicalFormula((n as { of: Node }).of)
  const { op, left, right } = n

  if (FLATTENABLE.has(op)) {
    const parts: string[] = []
    const walk = (x: Node): void => {
      if (x.kind === 'bin' && x.op === op) { walk(x.left); walk(x.right) }
      else parts.push(canonicalFormula(x))
    }
    walk(n)
    return `(${parts.sort().join(op)})`
  }
  if (SYMMETRIC.has(op)) {
    const [l, r] = [canonicalFormula(left), canonicalFormula(right)].sort()
    return `(${l}${op}${r})`
  }
  const m = MIRROR[op]
  if (m) {
    // orient so the lexicographically smaller side is written first, rewriting the operator when it flips
    const [l, r] = [canonicalFormula(left), canonicalFormula(right)]
    return l <= r ? `(${l}${op}${r})` : `(${r}${m}${l})`
  }
  return `(${canonicalFormula(left)}${op}${canonicalFormula(right)})`
}

/** formulaAddress(statement) → the algebraic address, or null when the statement is not a pure formula. */
export function formulaAddress(statement: string): string | null {
  if (classify(statement) !== 'formula') return null
  const p = parseFormula(formulaSource(statement))
  if (!p.ok) return null
  return toUuid('formula:' + canonicalFormula(p.node))
}

export interface Restated {
  address: string
  canonical: string
  /** every sealed key that carries this one form */
  keys: readonly { key: string; file: string; skill: string; statement: string }[]
  /** distinct skills across those keys — 1 is a copy inside one subject, 2+ is a form two subjects share */
  skills: readonly string[]
  /** distinct wings, which is how the copies are spread over files */
  files: readonly string[]
  /** true when one skill seals it more than once: redundancy rather than a meeting of domains */
  withinOneSkill: boolean
  /** the LEAST gloss overlap in the group — low means the statements mean different things */
  glossOverlap: number
  /**
   * A CROSS: two or more skills, and glosses that genuinely differ, so one identity is carrying two subjects.
   * `2·6 = 3·4` is Boyle's law at fixed temperature AND a moment balance about a pivot — one conserved product,
   * two pieces of physics, neither derived from the other. That is what a cross formula explains.
   */
  cross: boolean
}

export interface DuplicationCensus {
  statements: number
  /** statements that parse as a pure formula; the rest are programs and are not addressed here */
  formulas: number
  /** distinct algebraic forms among those */
  forms: number
  /** how many statements could be dropped without losing a formula */
  restatements: number
  groups: readonly Restated[]
  /** groups where a single skill seals one form repeatedly */
  copies: number
  /** groups where two or more skills meet on one form AND mean different things — crosses, not waste */
  crosses: number
  receipt: string
}

export interface Sealed { key: string; statement: string; file: string; skill: string; name?: string }

/**
 * THE SKILL ALONE IS NOT THE DISCRIMINATOR, and reading the first run of this census is what showed it. Two skills
 * meeting on one form looked like a cross by definition, until the rows were read: Quantum.lean and Wave.lean share
 * three forms, and a renamed copy across a file boundary would look exactly the same from the skill field.
 *
 * The honest question is whether the two statements MEAN different things, and the gloss is where meaning lives. So
 * the glosses are compared — Jaccard over their content words — and a group counts as a cross only when its glosses
 * genuinely differ. Measured: all fifteen multi-skill groups pass, the quantum/wave three among them, because their
 * glosses declare themselves as bridges in words ("ARCHITECTURE BRIDGE (Wave↔Quantum)"). The suspicion was wrong and
 * the check stays, because it is the thing that would have caught it had it been right.
 */
const CROSS_GLOSS_LIMIT = 0.5

const contentWords = (s: string): Set<string> =>
  new Set(String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter((w) => w.length > 3))

/** glossOverlap(a, b) → Jaccard over content words; 1 is the same sentence, 0 shares no substantial word. */
export function glossOverlap(a: string, b: string): number {
  const [A, B] = [contentWords(a), contentWords(b)]
  if (A.size === 0 || B.size === 0) return 0
  let hit = 0
  for (const w of A) if (B.has(w)) hit += 1
  return hit / (A.size + B.size - hit)
}

/** duplicationCensus(sealed) → how many distinct FORMULAS the ledger holds, and where one is sealed twice. */
export function duplicationCensus(sealed: readonly Sealed[]): DuplicationCensus {
  const byForm = new Map<string, { canonical: string; keys: Sealed[] }>()
  let formulas = 0
  for (const t of sealed) {
    const s = String(t.statement ?? '')
    if (!s) continue
    if (classify(s) !== 'formula') continue
    const p = parseFormula(formulaSource(s))
    if (!p.ok) continue
    formulas += 1
    const canonical = canonicalFormula(p.node)
    const g = byForm.get(canonical)
    if (g) g.keys.push(t)
    else byForm.set(canonical, { canonical, keys: [t] })
  }

  const groups: Restated[] = [...byForm.values()]
    .filter((g) => g.keys.length > 1)
    .map((g) => {
      const skills = [...new Set(g.keys.map((k) => k.skill))].sort()
      const glosses = g.keys.map((k) => String(k.name ?? ''))
      let least = 1
      for (let i = 0; i < glosses.length; i += 1) {
        for (let j = i + 1; j < glosses.length; j += 1) least = Math.min(least, glossOverlap(glosses[i]!, glosses[j]!))
      }
      return {
        address: toUuid('formula:' + g.canonical),
        canonical: g.canonical,
        keys: g.keys.map((k) => ({ key: k.key, file: k.file, skill: k.skill, statement: k.statement })),
        skills,
        files: [...new Set(g.keys.map((k) => k.file))].sort(),
        withinOneSkill: skills.length === 1,
        glossOverlap: least,
        cross: skills.length > 1 && least < CROSS_GLOSS_LIMIT,
      }
    })
    // widest first, then by form so the order is stable across runs — a census nobody can diff is not a census
    .sort((a, b) => b.keys.length - a.keys.length || a.canonical.localeCompare(b.canonical))

  return {
    statements: sealed.length,
    formulas,
    forms: byForm.size,
    restatements: groups.reduce((n, g) => n + g.keys.length - 1, 0),
    groups,
    copies: groups.filter((g) => g.withinOneSkill).length,
    crosses: groups.filter((g) => g.cross).length,
    receipt: merkleFold([toUuid(`formula-duplication|${formulas}|${byForm.size}`), ...groups.map((g) => g.address)]),
  }
}
