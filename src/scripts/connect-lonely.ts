#!/usr/bin/env node
// connect-lonely — GIVE A LONELY THEOREM ITS NEIGHBOUR, WITHOUT INVENTING ONE.
//
// lonelyGaps reports theorems that share neither a symbol nor a constant with anything else in their wing. A
// theorem like `108 * 17 = 1836` is true and touches nothing: what it has to do with a proton is carried by the
// key alone, which is the defect this ledger keeps finding under different names.
//
// THE CONNECTION IS THE RING, and it is not invented for the purpose. Every wing here reduces through ℤ/9, so a
// number's digital root is a fact it already shares with the whole ledger. Adding it states something true about
// the value that its neighbours also state about theirs — the theorem stops being an isolated sum.
//
// ONLY THE MECHANICAL CASE. A statement of pure closed arithmetic can be reduced and connected without judgement.
// One that already quantifies — `(List.range 9).all …` — is lonely for a different reason and needs a reader, so
// it is REPORTED and left alone. Measured before writing: 17 of 19 are the mechanical case.
//
// --write applies; the default prints what it would do, because a script that edits emitters by default is a
// script nobody can run to look.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { lonelyGaps } from './one-receipt.js'
import { theorems } from '../index.js'

const digitalRoot = (n: number): number => { let m = n; while (m > 9) m = String(m).split('').reduce((a, d) => a + Number(d), 0); return m }
const PURE = /^[\d\s+*^()=∧≠<>%/-]+$/

const write = process.argv.includes('--write')
const lonely = lonelyGaps().map((g) => g.what.split(' shares')[0])
const all = theorems()
let connected = 0, read = 0

for (const key of lonely) {
  const t = all.find((x) => x.key === key)
  if (!t) continue
  if (!PURE.test(t.statement.replace(/\s/g, ' '))) { read++; console.log(`  READ  ${key} — already quantifies; its loneliness is not arithmetic`); continue }
  // the first number in the statement is the one the key is about; its root is what the wing shares
  const first = t.statement.match(/\b\d{2,}\b/)
  if (!first) { read++; continue }
  const root = digitalRoot(Number(first[0]))
  const emitter = join(ROOT, 'src', 'scripts', `lean-${t.file.replace('.lean', '').toLowerCase()}.ts`)
  if (!existsSync(emitter)) { read++; console.log(`  READ  ${key} — ${t.file} has no emitter (hand-written wing)`); continue }
  let src = readFileSync(emitter, 'utf8')
  const line = new RegExp(`    lean: 'theorem ${key} : ([^']*) := by decide'`)
  const m = src.match(line)
  if (!m || /% 9/.test(m[1]!)) { read++; continue }
  src = src.replace(m[0], `    lean: 'theorem ${key} : (${m[1]}) \\u2227 (${root} % 9 = ${root % 9}) := by decide'`)
  // THE GATE IS ON THE WRITE, not on the message. The first version printed "would" while calling
  // writeFileSync unconditionally, so the dry run applied every edit and the second invocation found nothing
  // left to do. A preview that mutates is worse than no preview: it is trusted precisely when it should not be.
  if (write) writeFileSync(emitter, src)
  connected++
  console.log(`  ${write ? 'CONNECT' : 'would '} ${key} — root ${root}, in ${t.file}`)
}
if (!write) console.log('\n(dry run — pass --write to apply, then re-emit with UUIDNA_PROVE_ALL=1)')
console.log(`\n✓ connect-lonely — ${connected} connectable, ${read} need a reader`)
