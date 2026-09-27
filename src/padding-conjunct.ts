// padding-conjunct — A CONJUNCT THAT IS TRUE BY ITS SHAPE CONSTRAINS NOTHING, AND THIS FINDS THEM ALL.
//
// (the captain, 2026-09-27: "Clean all code from hacks", then "Why not simplify all to the core?!?" — said after I had
// replaced eleven of these by hand and built no guard, so the twelfth could walk straight in. Fixing instances is
// mowing; this is the root.)
//
// WHAT THE SPECIES IS. src/ratchet-record.ts named it first: a term like `(5 = 5)`, `(32 - 0 = 32)` or `(5 * 0 = 0)`
// sitting in a conjunction. `by decide` signs it, because it is true — and it is true of ANY numbers, so the kernel
// verified arithmetic and never touched the claim the sentence beside it makes. The theorem then reads as a
// conjunction of substance when part of it is furniture, and `(6 + 0 = 6)` padding also makes a row a terminal node:
// nothing can ever cite it, which is part of what the lonely-theorem finder keeps finding.
//
// THE TEST IS SUBSTITUTION, and it is the whole idea. A conjunct that constrains its numbers stops holding when the
// numbers change; a conjunct true by shape holds whatever they are. So every numeral is replaced by a fresh one,
// consistently, and the conjunct is re-decided by the independent evaluator. `5 = 5` becomes `7 = 7` and still holds —
// padding. `3 + 1 = 4` becomes `7 + 1 = 11` and fails — it was saying something about 3, 1 and 4.
//
// ZERO AND ONE ARE STRUCTURAL AND ARE NOT SUBSTITUTED. They are the identity and absorbing elements, so they are part
// of the SHAPE rather than of the values: `5 * 0 = 0` must stay `7 * 0 = 0` to reveal that multiplying by zero says
// nothing, and substituting the 0 as if it were data would hide exactly the padding this exists to catch.
//
// TWO SUBSTITUTIONS, NOT ONE, because a single one can agree by accident — a conjunct can survive one map and fail the
// next, and a finder that asked once would call it padding. Both must hold before the verdict is padding, which keeps
// the finder conservative in the direction that matters: it would rather miss one than accuse a real claim.
//
// IT REPORTS AND RANKS; IT DELETES NOTHING. A sealed theorem is a published record and no one withdraws a settlement.
// What a finder owes is the name of every row whose conjunct cannot fail, so the next wing is written differently and
// the ones standing are settled deliberately.
import { holds } from './involution/index.js'
import { toUuid, merkleFold } from './address.js'

/** the numerals a conjunct actually constrains — 0 and 1 are shape, not data */
export const dataNumerals = (conjunct: string): string[] =>
  [...new Set((conjunct.match(/\b\d+\b/g) ?? []).filter((d) => Number(d) >= 2))]

const substitute = (conjunct: string, map: ReadonlyMap<string, number>): string =>
  conjunct.replace(/\b\d+\b/g, (d) => String(map.get(d) ?? d))

/**
 * TWO FAMILIES, BECAUSE ONE FAMILY SATISFIES RELATIONS BY ACCIDENT.
 *
 * The first version substituted only PRIMES, and primes are pairwise coprime — so `Nat.gcd 19 235 = 1`, a real claim
 * about two particular gear counts, became `Nat.gcd 7 11 = 1` and held, and the finder called a genuine claim padding.
 * The same trap hides anywhere the relation is "shares no factor", "is not a multiple", "is odd".
 *
 * So the second family shares a factor: multiples of six, which are neither coprime nor odd nor squarefree-distinct.
 * A conjunct must hold under BOTH to be shape-true. Coprimality now fails the composite map and is correctly kept;
 * `5 = 5` holds under either, because reflexivity is indifferent to what it compares.
 */
const FRESH_COPRIME = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41] as const
const FRESH_SHARING = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] as const

/**
 * shapeTrue(conjunct) → true when the conjunct holds under every substitution of its data numerals, so it is true
 * because of its form and says nothing about the quantities the theorem is about.
 *
 * A conjunct the evaluator cannot read at all returns FALSE — unreadable is not padding. Accusing a statement this
 * finder cannot evaluate would be the finder claiming more than it measured, which is the fault it exists to catch.
 */
export function shapeTrue(conjunct: string, wingSource = ''): boolean {
  const ds = dataNumerals(conjunct)
  if (ds.length === 0) return holds(conjunct, wingSource) === true
  for (const family of [FRESH_COPRIME, FRESH_SHARING]) {
    for (const offset of [0, 1]) {
      const map = new Map(ds.map((d, i) => [d, family[(i + offset) % family.length]!]))
      if (holds(substitute(conjunct, map), wingSource) !== true) return false
    }
  }
  return true
}

/** conjunctsOf(statement) → the top-level ∧ operands, with their own parentheses kept. */
export function conjunctsOf(statement: string): string[] {
  const out: string[] = []
  let depth = 0
  let start = 0
  const s = String(statement)
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i]!
    if (ch === '(' || ch === '[') depth += 1
    else if (ch === ')' || ch === ']') depth -= 1
    else if (ch === '∧' && depth === 0) { out.push(s.slice(start, i).trim()); start = i + 1 }
  }
  out.push(s.slice(start).trim())
  return out.filter((x) => x.length > 0)
}

/**
 * WHERE PADDING CAN LIVE, so the evaluator is asked far fewer times. A first version ran the substitution test on every
 * conjunct of every conjunctive statement and exhausted a 4 GB heap: two evaluator parses per conjunct over tens of
 * thousands of conjuncts. Raising the heap would have bought the ceiling; narrowing the question earns it.
 *
 * Padding is always a SHORT ARITHMETIC term — that is what makes it padding. A conjunct that walks a list, applies a
 * lambda or indexes a structure is doing work whatever its numerals, and cannot be true merely by shape. So anything
 * carrying `fun`, a list literal, a `List.` call or a wing definition's name is skipped, and so is anything long. The
 * filter is on the SHAPE of the term and never on its content, so it cannot hide a padding conjunct that happens to
 * mention a large number — and the cost falls from tens of thousands of parses to a few hundred.
 */
const couldBeShapeTrue = (conjunct: string): boolean =>
  conjunct.length <= 48
  && !/\bfun\b|\bList\.|\ball\b|\bany\b|\bfilter\b|\bmap\b|\bfoldl\b|\[/.test(conjunct)
  && /\d/.test(conjunct)

export interface Padding { key: string; file: string; conjunct: string; of: number }

export interface PaddingCensus {
  /** conjunctive statements examined */
  examined: number
  findings: readonly Padding[]
  receipt: string
}

export interface SealedStatement { key: string; statement: string; file: string }

/** paddingCensus(sealed) → every conjunct that cannot fail, named with the row that carries it. */
export function paddingCensus(sealed: readonly SealedStatement[]): PaddingCensus {
  const findings: Padding[] = []
  let examined = 0
  for (const t of sealed) {
    const statement = String(t.statement ?? '')
    if (!statement.includes('∧')) continue
    const parts = conjunctsOf(statement)
    if (parts.length < 2) continue
    examined += 1
    for (const c of parts) {
      // A LONE CONJUNCT IS NOT PADDING. A statement of one term is simply that claim; padding is a term carried
      // BESIDE others, where it inflates a conjunction it does not constrain.
      if (couldBeShapeTrue(c) && shapeTrue(c)) findings.push({ key: t.key, file: t.file, conjunct: c, of: parts.length })
    }
  }
  return {
    examined,
    findings: findings.sort((a, b) => (a.file + a.key).localeCompare(b.file + b.key)),
    receipt: merkleFold([toUuid(`padding|${examined}`), ...findings.map((f) => toUuid(`${f.key}|${f.conjunct}`))]),
  }
}

/** the guard's shape: a conjunct that cannot fail is furniture, and the fix is to state what the sentence claims. */
export function paddingGaps(sealed: readonly SealedStatement[]): { what: string; fix: string }[] {
  const c = paddingCensus(sealed)
  if (c.findings.length === 0) return []
  return [{
    what: `${c.findings.length} conjunct(s) hold under substitution of their own numerals, so they cannot fail `
      + `(${c.findings.slice(0, 4).map((f) => f.key + ': ' + f.conjunct).join('; ')}${c.findings.length > 4 ? '; …' : ''})`,
    fix: 'state what the sentence beside it claims, computed — a walk over the domain, a second route to the same '
      + 'quantity, or a characterisation in both directions. If two measured counts coincide so that a real claim '
      + 'emits as a numeral against itself, the claim needs its quantities NAMED apart (a def per count), which a '
      + 'conveyor candidate cannot carry — that one is a measurement wearing a theorem name, and its home is a ratchet',
  }]
}
