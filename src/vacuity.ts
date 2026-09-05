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
  return null
  }
const why = (raw: string): string | null => {
  const s = strip(raw)
  if (s === 'True') return 'True — proves nothing at all'
  const id = identity(s)
  if (id) return id
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
