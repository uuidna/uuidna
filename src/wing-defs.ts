// wing-defs — TEACH THE SECOND IMPLEMENTATION WHAT A WING'S OWN DEFINITIONS MEAN.
//
// WHAT BROKE, AND WHY IT WAS INVISIBLE. Every sealed theorem is supposed to carry a decidable denial: the Lean
// kernel and an independent TypeScript evaluator recomputing the same proposition, two different machines
// agreeing. That held for the whole ledger — 2,656 of 2,656 — until the wings sealed on 2026-09-06 stated their
// theorems through wing-LOCAL definitions (pmod, lawPow, fixedPow, ordOf, lawLambda). The evaluator parses
// List.range, .all and countP perfectly well; it had no way to know what `pmod` means, because that definition
// lives in the wing. Coverage fell to 2,765 of 5,116. Measured cause: 2,350 of 2,351 unreachable statements
// needed a wing-local def interpreted, and exactly ONE needed a missing operator.
//
// THE TRADE THAT WAS MADE WITHOUT NOTICING: a helper def buys depth and speed and costs the second opinion.
// Inlining everything is not the answer — that is what drove the recursion depth failures in the first place.
// The answer is that the evaluator should read the same source the kernel does.
//
// TWO KINDS OF DEFINITION, AND ONLY ONE OF THEM IS PARSED.
//
//   SIMPLE   `def name (a : Nat) (b : Nat) : Nat := body` — the body is an ordinary expression, so it becomes a
//            curried function that binds its parameters and evaluates the body with the evaluator already here.
//            No new language: the same parser, one more environment.
//
//   RECURSIVE  `def ordAux ... | 0, _, k => k | Nat.succ f, cur, k => ...` — structural recursion with pattern
//            matching. These are NOT parsed. They are given their MATHEMATICAL meaning directly: pmod is a^n mod
//            m, ordOf is the multiplicative order. That is not a cheat and it is not circular — it is the
//            independence the leg asks for. The wing computes a^n mod m by square-and-multiply; this computes it
//            the plain way; the two agreeing is the check. And the ledger already seals that the wing's
//            definition equals the plain one (pmod_is_modular_exponentiation, whose case count is the ledger's own tally and not a number typed here), so the substitution
//            is verified rather than assumed.
//
// WHAT IT DOES INSTEAD OF GUESSING: a def it can neither parse nor recognise is left OUT of the environment,
// because the parser here handles expression bodies and not pattern-matching recursion — that is the named
// limit, not a mood. The statement using it then stays unreachable and keeps its missing leg, visible in the
// backlog where a human can see it. A generated leg that half-checks
// its theorem is worse than the missing leg it replaces.

/** the mathematical meaning of the recursive helpers, independent of how the wing computes them */
export const KNOWN_DEFS: Record<string, (args: number[]) => number | null> = {
  // a^n mod m, computed plainly — the wing's square-and-multiply agreeing with this IS the cross-check
  pmod: ([a, n, m]) => {
    if (a === undefined || n === undefined || m === undefined || m <= 0) return null
    let r = 1 % m, b = ((a % m) + m) % m, k = n
    while (k > 0) { if (k % 2 === 1) r = (r * b) % m; b = (b * b) % m; k = (k - (k % 2)) / 2 }
    return r
  },
  // the same map under the other name the wings use
  pw: ([a, n, m]) => KNOWN_DEFS.pmod!([a!, n!, m!]),
  // the multiplicative order of a modulo m — the least k ≥ 1 with a^k ≡ 1
  ordOf: ([a, m]) => {
    if (a === undefined || m === undefined || m <= 1) return null
    let x = ((a % m) + m) % m, k = 1
    if (x === 0) return null
    while (x !== 1) { x = (x * (((a % m) + m) % m)) % m; k += 1; if (k > m + 1) return null }
    return k
  },
}

/** one simple definition, as source: its parameter names and its body expression */
export interface SimpleDef { name: string; params: string[]; body: string }

/** simpleDefs(source) → every `def name (p : T) … : T := body` in a wing whose body is a plain expression.
 *
 *  Pattern-matching definitions (a `|` alternative on the next line) are skipped deliberately: they are the
 *  recursive helpers, and KNOWN_DEFS gives those their meaning instead of parsing their recursion. */
export function simpleDefs(source: string): SimpleDef[] {
  const out: SimpleDef[] = []
  const lines = source.split('\n')
  for (let i = 0; i < lines.length; i++) {
    // PARENS NEST, AND A CHARACTER CLASS DOES NOT SEE THAT. The first version matched a parameter block with
    // \([^)]*\), which stops at the first close paren — so `(pes : List (Nat × Nat))` ended mid-type, the def
    // never parsed, and 295 theorems stated through lawDivisors and its kin stayed unreachable while the
    // environment silently lacked them. Scanned with a depth counter instead, which is what the shape requires.
    const head = /^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*(.*)$/.exec(lines[i]!)
    if (!head) continue
    const name = head[1]!
    const rest = head[2] ?? ''
    let depth = 0, cut = -1
    for (let k = 0; k < rest.length; k++) {
      const ch = rest[k]!
      if (ch === '(') depth++
      else if (ch === ')') depth--
      else if (ch === ':' && depth === 0) { cut = k; break }
    }
    if (cut < 0) continue
    const paramBlock = rest.slice(0, cut)
    const after = rest.slice(cut + 1)
    const asgn = after.indexOf(':=')
    if (asgn < 0) continue                     // a pattern-matching def: no `:=` on the head line
    const firstLine = after.slice(asgn + 2)
    const params: string[] = []
    for (const p of paramBlock.matchAll(/\(\s*([A-Za-z_][A-Za-z0-9_]*(?:\s+[A-Za-z_][A-Za-z0-9_]*)*)\s*:/g))
      for (const nm of p[1]!.trim().split(/\s+/)) params.push(nm)
    // the body may continue over following lines until the next top-level declaration
    const body: string[] = [firstLine ?? '']
    let j = i + 1
    // STOP AT A DOC COMMENT TOO. The scan ran to the next top-level declaration and a `/--` block is not one, so
    // a def sitting above a documented theorem swallowed that theorem's entire doc comment into its body. The body
    // then threw, the curried application broke mid-argument, and the parse derailed into "expected numeral" —
    // which reads exactly like an unbound identifier and sent me looking at closure capture in the shared
    // evaluator for an hour. The defect was three lines from where I started.
    while (j < lines.length && !/^\s*(def |theorem |abbrev |namespace|end |--|\/--)/.test(lines[j]!)) { body.push(lines[j]!); j++ }
    const text = body.join(' ').trim()
    if (!text) continue
    out.push({ name: name!, params, body: text })
  }
  return out
}
