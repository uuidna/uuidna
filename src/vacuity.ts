// vacuity — WHY A SEALED STATEMENT CAN BE TRUE AND SAY NOTHING, as one rule with two consumers.
//
// WHY IT MOVED HERE. This predicate lived as a closure inside one-receipt's `vacuousGaps`, so it could only run
// as a GUARD — after a candidate had been deposited, kernel-probed, accepted and sealed. On 2026-09-05 the
// automated wave sealed `alpine_security_ops_plannable_4 : (4 + 0 = 4) ∧ (0 = 0)` and the guard caught it
// afterwards, which is the wrong end: the conveyor's deposit door already refuses an unlawful key, a missing
// why, a non-decide proof, a sorry, an axiom and a bare-literal comparison — and had no word for vacuity, the
// one fault that survives every other check because the statement is perfectly TRUE.
//
// So the door and the guard now share this. A rule that can only run after the seal is a rule the automation
// can outrun, and the conveyor exists to run unattended.
//
// WHAT COUNTS AS VACUOUS: True; an arithmetic identity that holds for its own reason rather than the theorem's
// (x + 0 = x, 0 + x = x, x * 1 = x, x - 0 = x); reflexivity or a tautology across an operator; excluded middle;
// and — the case the rule was once blind to — a CONJUNCTION whose every conjunct is vacuous, which is exactly
// the shape the wave produced.

const norm = (s: string): string => {
  let t = s.trim().replace(/\s+/g, ' ')
  for (;;) {
    if (!(t.startsWith('(') && t.endsWith(')'))) return t
    let d = 0
    for (let i = 0; i < t.length; i++) {
      if (t[i] === '(') d++
      else if (t[i] === ')') { d--; if (d === 0 && i !== t.length - 1) return t }
    }
    t = t.slice(1, -1).trim()
  }
  }
const strip = (s: string): string => norm(norm(s).replace(/\s*:\s*(Nat|Int|Prop)\b/g, ''))
const split = (s: string, op: string): [string, string] | null => {
  let d = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') d++
    else if (s[i] === ')') d--
    else if (d === 0 && s.startsWith(op, i)) return [s.slice(0, i), s.slice(i + op.length)]
  }
  return null
  }
  // AN ARITHMETIC IDENTITY IS TRUE FOR ITS OWN REASON, never for the theorem's. `x + 0 = x` decides nothing
  // about whatever x was counted from, and a statement built only from these says nothing at all.
const identity = (raw: string): string | null => {
  const t = strip(raw)
  let m = /^(\d+)\s*\+\s*0\s*=\s*(\d+)$/.exec(t); if (m && m[1] === m[2]) return 'x + 0 = x — the additive identity'
  m = /^0\s*\+\s*(\d+)\s*=\s*(\d+)$/.exec(t); if (m && m[1] === m[2]) return '0 + x = x — the additive identity'
  m = /^(\d+)\s*\*\s*1\s*=\s*(\d+)$/.exec(t); if (m && m[1] === m[2]) return 'x * 1 = x — the multiplicative identity'
  m = /^(\d+)\s*-\s*0\s*=\s*(\d+)$/.exec(t); if (m && m[1] === m[2]) return 'x - 0 = x — subtracting nothing'
  // A RESIDUE THAT CANNOT WRAP. `a % b = a` holds for EVERY a below b, so it decides nothing about a — and
  // `a % a = 0` holds for every a at all. connect-lonely emitted exactly these as "connections" (`3 % 9 = 3`,
  // `9 % 9 = 0`), one per digital root, so 24 sealed theorems share seven constants that mention none of their
  // own numbers. A modulus is only informative when the value can actually exceed it.
  m = /^(\d+)\s*%\s*(\d+)\s*=\s*(\d+)$/.exec(t)
  if (m) {
    const [a, b, r] = [Number(m[1]), Number(m[2]), Number(m[3])]
    if (a < b && a === r) return 'a % b = a for a < b — a residue that cannot wrap, true for ANY a below b'
    if (a === b && r === 0) return 'a % a = 0 — a value modulo itself, true for ANY a'
  }
  return null
  }

// A WALK DOES NOT RESCUE A TAUTOLOGY, and this rule was blind to that. Every check above reads the TOP-LEVEL
// statement, so a body hidden inside `.all (fun x => …)` was never examined — and on 2026-09-06 two theorems were
// rewritten to remove overreach and both came back as tautologies under a walk: `w + (100 - w) == 100` over
// List.range 101, and `(k+1)*300 - (k+1)*300 == 0` over List.range 60. Every quantifier check passed, because the
// quantifier was real; the proposition inside it was true before the domain was consulted. They were caught by
// re-reading, which is the instrument this ledger trusts least.
//
// Two additions close that. selfCancel matches the shapes on EXPRESSIONS rather than digits, so a bound variable
// is covered; and why() now descends into a lambda body, because the vacuity of a walk is the vacuity of what it
// walks. The domain size is irrelevant: a hundred and one true-for-every-input checks decide nothing at all.
const selfCancel = (raw: string): string | null => {
  const t = strip(raw)
  // E - E = 0, decided STRUCTURALLY rather than by pattern: split the left side of the comparison on its
  // top-level minus and compare the two halves as normalised text. A regex was tried first and missed the exact
  // statement it was written for, because a trailing paren sat between the second E and the operator — which is
  // the whole argument for splitting on the operator the module already knows how to find.
  for (const eq of ['==', '=']) {
    const cmp = split(t, eq)
    if (!cmp) continue
    if (strip(cmp[1]) !== '0') continue
    const minus = split(strip(cmp[0]), '-')
    if (minus && strip(minus[0]) && strip(minus[0]) === strip(minus[1])) return 'E - E = 0 — self-cancelling, true for ANY E'
  }
  // E + (n - E) == n, the complement sum
  // ANCHORED, because unanchored it over-fired. A long conjunction that happens to CONTAIN a complement clause
  // is not vacuous — the existing rule is right that a conjunction is vacuous only when every conjunct is, and a
  // substring match walked straight past that, flagging two substantive theorems (vortex_one_leap and
  // the_passage_costs_a_coin_at_each_end) on one clause out of a dozen. Same defect as the two detectors written
  // earlier the same day: a pattern that fires on part of a thing and reports the whole.
  const m = /^\(?([A-Za-z0-9_.()*+\s]{1,48}?)\s*\+\s*\(\s*(\d+)\s*-\s*\1\s*\)\s*(?:==|=)\s*(\d+)\)?$/.exec(t)
  if (m && m[2] === m[3]) return 'E + (n - E) = n — the complement sum, true for ANY E ≤ n'
  return null
  }

/** the body of a walk, when the statement is one — `.all (fun x => BODY)` and friends */
const walkBody = (raw: string): string | null => {
  const m = /\.\s*(?:all|any|countP|filter)\s*\(\s*fun\s+[A-Za-z0-9_]+\s*=>\s*([\s\S]+)\)\s*$/.exec(strip(raw))
  return m ? m[1]!.trim() : null
  }

const why = (raw: string): string | null => {
  const s = strip(raw)
  if (s === 'True') return 'True — proves nothing at all'
  const id = identity(s)
  if (id) return id
  const sc = selfCancel(s)
  if (sc) return sc
  // descend: a walk is exactly as vacuous as the proposition it walks
  const body = walkBody(s)
  if (body) { const bw = why(body); if (bw) return `the walk is real but its body is not — ${bw}` }
  for (const op of ['↔', '→', '∨', '∧', '=']) {
  const parts = split(s, op)
    if (!parts) continue
  const [l, r] = [strip(parts[0]), strip(parts[1])]
    if (op === '∨') {
      if (strip(r.replace(/^¬\s*/, '')) === l) return 'P ∨ ¬P — excluded middle, true for ANY P'
      if (l.includes('=') && r.includes('≠') && r.replace('≠', '=') === l) return 'P ∨ ¬P via ≠ — excluded middle, true for ANY P'
      continue
    }
    // A CONJUNCTION IS VACUOUS WHEN EVERY PART IS, and the rule below could not see that: it split on the
    // top-level operator and compared the two HALVES to each other, so `(2604 + 0 = 2604) ∧ (0 = 0)` split on
    // ∧, found the halves unequal, and returned null. It never descended. A conjunction of tautologies read
    // as a substantive statement — the finder blind to its own class, on the one shape it exists to catch.
    if (op === '∧') {
    const lw = why(l), rw = why(r)
      if (lw && rw) return `every conjunct is vacuous — ${lw}; ${rw}`
      continue
    }
    if (l === r) return op === '=' ? 'x = x — reflexivity, true for ANY x' : `P ${op} P — a tautology, true for ANY P`
  }
  return null
  }

/** vacuityReason(statement) → why the statement says nothing, or null when it says something. */
export const vacuityReason = (statement: string): string | null => why(statement)
