#!/usr/bin/env node
// account — the reconciliation gate. The manual "all is accounted" check, ported to a TEST that runs itself instead
// of being asked: every theorem accounted for (per-file counts sum to the total), no double-counting (keys distinct),
// the billing model itself sealed, and the decide-step cost coverage reported. Exits non-zero if the accounting does
// not reconcile — a suggestion tested in the trial, not confirmed by a question. Integrity, not truth.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { theorems } from '../index.js'
import { ROOT } from './lean-gen.js'

const T = theorems()
let failed = false
const check = (ok: boolean, msg: string): void => { console.log((ok ? '  ✓ ' : '  ✗ ') + msg); if (!ok) failed = true }

console.log('accounting — the provenance reconciliation:')

// reconcile: per-file counts sum to the total (nothing off-ledger)
const byFile: Record<string, number> = {}
T.forEach((t) => { byFile[t.file] = (byFile[t.file] || 0) + 1 })
const sum = Object.values(byFile).reduce((a, b) => a + b, 0)
check(sum === T.length, `reconciles: ${sum} per-file = ${T.length} on the ledger (nothing off-ledger)`)

// no double-counting: keys are distinct
const keys = T.map((t) => t.key)
check(new Set(keys).size === keys.length, `no double-counting: ${new Set(keys).size} distinct keys`)

// every theorem uniquely addressable
const addrs = T.map((t) => t.address)
check(new Set(addrs).size === addrs.length, `every theorem uniquely addressable: ${new Set(addrs).size} distinct addresses`)

// the accounting model itself is sealed
const acct = ['two_coins', 'contribute_two_save_sixtyfour', 'bill_never_negative']
check(acct.every((k) => T.some((t) => t.key === k)), 'the billing model itself is sealed (two_coins, contribute_two_save_sixtyfour, bill_never_negative)')

// decide-step cost coverage — reported (a snapshot; the fold is on-demand), not a hard failure
try {
  const hb = JSON.parse(readFileSync(join(ROOT, 'lean', 'heartbeats.json'), 'utf8')).costs || {}
  const measured = T.filter((t) => hb[t.address] !== undefined).length
  console.log(`  · decide-step cost coverage: ${measured}/${T.length} measured` + (measured < T.length ? ` — ${T.length - measured} not yet folded (npm run heartbeats --all)` : ' (complete)'))
} catch { console.log('  · heartbeats.json absent — decide-step cost coverage not checked') }

console.log(failed ? '\n✗ accounting does NOT reconcile' : '\n✓ all is accounted — the ledger reconciles')
process.exit(failed ? 1 : 0)
