#!/usr/bin/env node
// falsifier-gap — NAME the sealed statements that carry no decidable denial, instead of counting them.
//
// mint-gate refuses the mint on `falsifier-ceiling: 71090/71094 carry a decidable denial` and stops there. A count
// without names is the same defect phd-proofs had: the reader is told a number and sent to find the rows by hand, which
// is the work the check exists to do. Four rows short of 71,094 is unfindable by reading; this prints them with the
// wing they sit in and the statement the evaluator could not read, so the gap ends at something actionable.

import { mirrorRows } from '../rosetta-legs.js'
import { theorems } from '../theorems/index.js'

const byKey = new Map(theorems().map((t) => [String(t.key), t]))
const short = mirrorRows().filter((r) => !r.legs.includes('falsifier'))

console.log(`falsifier ceiling: ${mirrorRows().length - short.length}/${mirrorRows().length} carry a decidable denial`)
if (short.length === 0) {
  console.log('✓ every sealed statement can be denied by an independent evaluator')
} else {
  console.log(`${short.length} WITHOUT a denial:`)
  for (const r of short) {
    const t = byKey.get(r.key)
    console.log(`  ✗ ${r.key}  [${t ? String(t.file) : 'not in ledger'}]`)
    if (t) console.log(`      ${String(t.statement ?? '').slice(0, 150)}`)
  }
  console.log()
  console.log('A missing denial is the evaluator\'s grammar falling short of a shape the kernel accepts — extend the')
  console.log('grammar (src/involution), or restate the theorem in a shape already decidable. Never drop the leg.')
}
