#!/usr/bin/env node
// falsifier-gap — NAME the sealed statements that carry no decidable denial, instead of counting them.
//
// mint-gate refuses the mint on `falsifier-ceiling: 71090/71094 carry a decidable denial` and stops at the count. Four
// rows short of 71,094 cannot be found by reading, so this is the same defect phd-proofs had: a check that reports a
// number and sends its reader to bisect the tree is doing half its job. The door names them, with the wing and the
// statement the evaluator could not read.
//
// THE LEDGER IS IMPORTED ONLY ON A MISS, which is the whole reason this door is fast. Measured: importing
// dist/theorems/generated.js costs 699ms, which was this door's entire cost, and a receipt checked AFTER a static
// import cannot pay. The digest is file contents — about fifteen milliseconds — and the heavy modules are reached
// inside `compute`, so an unchanged tree never loads the ledger at all.

import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'

interface Short { key: string; file: string; statement: string }

const walk = await servedAsync<{ total: number; short: Short[] }>({
  path: 'lean/falsifier-gap-receipt.json',
  // the ledger AND the rule: a receipt keyed on the ledger alone serves a stale count after the rule is corrected,
  // which is the defect audit-citations was measured committing on 2026-09-03
  inputs: ledgerAndRule(['dist/rosetta-legs.js', 'dist/scripts/falsifier-gap.js']),
  compute: async () => {
    const { mirrorRows } = await import('../rosetta-legs.js')
    const { theorems } = await import('../theorems/index.js')
    const byKey = new Map(theorems().map((t) => [String(t.key), t]))
    const rows = mirrorRows()
    return {
      total: rows.length,
      short: rows.filter((r) => !r.legs.includes('falsifier')).map((r) => {
        const t = byKey.get(r.key)
        return {
          key: r.key,
          file: t ? String(t.file) : 'not in ledger',
          statement: t ? String(t.statement ?? '') : '',
        }
      }),
    }
  },
}, fsStore)

const { total, short } = walk.value
console.log(walk.hit
  ? `served by receipt ${walk.digest} — the ledger was not loaded`
  : `walked and earned receipt ${walk.digest}`)
console.log(`falsifier ceiling: ${total - short.length}/${total} carry a decidable denial`)
if (short.length === 0) {
  console.log('✓ every sealed statement can be denied by an independent evaluator')
} else {
  console.log(`${short.length} WITHOUT a denial:`)
  for (const r of short) {
    console.log(`  ✗ ${r.key}  [${r.file}]`)
    if (r.statement !== '') console.log(`      ${r.statement.slice(0, 150)}`)
  }
  console.log()
  console.log("A missing denial is the evaluator's grammar falling short of a shape the kernel accepts — extend the")
  console.log('grammar (src/involution), or restate the theorem in a shape already decidable. Never drop the leg.')
}
