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
const PURE = /^[0-9\s+\-*/%^()=<>!≤≥≠]+$/
const facts: Fact[] = asked.filter((q) => PURE.test(q.input)).map((q) => {
  const key = `asked_${handleOf(toUuid(`ask:${q.input}`))}`
  const stmt = q.holds ? q.input : `¬ (${q.input})`
  return {
    key,
    name: `asked: ${q.input.length > 120 ? `${q.input.slice(0, 117)}…` : q.input} — ${q.holds ? 'holds' : 'fails'}`,
    js: () => { const v = decide(q.input).verdict; return q.holds ? v === 'EVALUATED_TRUE' || v === 'VERIFIED' : v === 'EVALUATED_FALSE' },
    lean: `theorem ${key} : ${stmt} := by decide +kernel`,
  }
})
if (facts.length) emit({ file: 'Asked.lean', skill: 'asked', facts,
  header: 'THE ASKED QUESTIONS — every arithmetic statement recorded through uuidna_ask, decided by the kernel itself: true as asked, or false and so negated; once sealed, uuidna_decide answers the same words VERIFIED.' })
console.log(`✓ lean-asked — ${facts.length} asked statement(s) sealed`)
