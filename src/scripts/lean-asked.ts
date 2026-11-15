#!/usr/bin/env node
// lean-asked — THE ASKED QUESTIONS, ANSWERED BY THE KERNEL. lean/asked.json holds the arithmetic statements recorded
// through uuidna_ask: each one uuidna_decide evaluated, true as asked or false and so negated. This wing seals each
// with `decide +kernel` — the kernel recomputes the statement itself, so the evaluation the door made is not trusted,
// it is checked — and from then on uuidna_decide answers the same words VERIFIED, citing the theorem here. A statement
// is Nat arithmetic with Lean's own semantics (x / 0 = 0, x % 0 = x, truncated subtraction), which is the decide
// grammar's, so the asked words are the Lean statement; the door records nothing else.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { emit, ROOT, type Fact } from './lean-gen.js'
import { decide } from '../decide.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

const FILE = join(ROOT, 'lean', 'asked.json')
const asked = (existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : []) as { input: string; holds: boolean }[]
const PURE = /^(?:[0-9\s+\-*/%^()=<>!≤≥≠,]|powmod)+$/
// powmod(b, e, m) is b^e mod m by square-and-multiply, the same steps as decide's natPowmod. The recursion is on a fuel
// argument set to e itself: each step halves e and the step that sees e = 0 returns, so at most bitlength(e) + 1 of
// the e + 1 available steps run, the definition is exact for every e, and the kernel unfolds ~1,000 steps for a
// 1,000-bit exponent, never e of them
const POWMOD = [
  'def powmodGo (m : Nat) : Nat → Nat → Nat → Nat → Nat',
  '  | 0, _, _, acc => acc % m',
  '  | fuel + 1, b, e, acc => if e = 0 then acc % m else powmodGo m fuel (b * b % m) (e / 2) (if e % 2 = 1 then acc * b % m else acc)',
  'def powmod (b e m : Nat) : Nat := powmodGo m e (b % m) e 1',
].join('\n')
/** the asked words as Lean: powmod(a, e, m) becomes (powmod (a) (e) (m)), its arguments split at depth-zero commas */
const leanOf = (s: string): string => {
  let out = '', i = 0
  while (i < s.length) {
    if (!s.startsWith('powmod(', i)) { out += s[i++]; continue }
    let depth = 1, j = i + 7, start = j
    const args: string[] = []
    for (; j < s.length && depth; j++) {
      if (s[j] === '(') depth++
      else if (s[j] === ')') { if (--depth === 0) break }
      else if (s[j] === ',' && depth === 1) { args.push(s.slice(start, j)); start = j + 1 }
    }
    args.push(s.slice(start, j))
    if (args.length !== 3) throw new Error(`lean-asked — powmod takes three arguments: ${s}`)
    out += `(powmod ${args.map((a) => `(${leanOf(a.trim())})`).join(' ')})`
    i = j + 1
  }
  return out
}
const facts: Fact[] = asked.filter((q) => PURE.test(q.input)).map((q) => {
  const key = `asked_${handleOf(toUuid(`ask:${q.input}`))}`
  const stmt = q.holds ? leanOf(q.input) : `¬ (${leanOf(q.input)})`
  return {
    key,
    name: `asked: ${q.input.length > 120 ? `${q.input.slice(0, 117)}…` : q.input} — ${q.holds ? 'holds' : 'fails'}`,
    js: () => { const v = decide(q.input).verdict; return q.holds ? v === 'EVALUATED_TRUE' || v === 'VERIFIED' : v === 'EVALUATED_FALSE' },
    lean: `theorem ${key} : ${stmt} := by decide +kernel`,
  }
})
if (facts.length) emit({ file: 'Asked.lean', skill: 'asked', facts,
  defs: asked.some((q) => q.input.includes('powmod(')) ? POWMOD : '',
  header: 'THE ASKED QUESTIONS — every arithmetic statement recorded through uuidna_ask, decided by the kernel itself: true as asked, or false and so negated; once sealed, uuidna_decide answers the same words VERIFIED.' })
console.log(`✓ lean-asked — ${facts.length} asked statement(s) sealed`)
