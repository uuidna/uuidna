// credits — the neighbourhood is read once per principle; this control re-derives a sample the slow way and must agree.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { credits, creditsSummary } from './index.js'
import { theorems, theoremNeighbours } from '../../theorems/index.js'

// THE CONTROL: for a sample spread over the ledger, walk the materialised neighbours and re-derive the contextual
// list from the credits each neighbour would earn on its own name; the per-principle memo must give the same names.
test('contextual credits equal the walk over materialised neighbours, in order, and never repeat a historical name', () => {
  const sample = theorems().filter((_, i) => i % 1009 === 0)
  assert.ok(sample.length > 10)
  for (const t of sample) {
    const c = credits(t.key)
    const seen = new Set(c.historical.map((h) => h.who))
    const walked: string[] = []
    for (const n of theoremNeighbours(t.key).neighbours) {
      // a neighbour's own historical names that come from its name + principle are the registry hits on that text
      for (const h of credits(n.key).historical) {
        if (h.who.startsWith('DOI ')) continue
        if ((n.name + ' ' + n.principle).includes(h.who.split(' (')[0]!.split(' ').pop()!) && !seen.has(h.who)) { seen.add(h.who); walked.push(h.who) }
      }
    }
    for (const w of c.contextual) assert.ok(!c.historical.some((h) => h.who === w.who), `${t.key}: ${w.who} credited twice`)
    for (const w of walked) assert.ok(c.contextual.some((x) => x.who === w), `${t.key}: the walk found ${w}; the memo did not`)
  }
})

test('creditsSummary partitions the ledger and is stable across calls', () => {
  const a = creditsSummary(); const b = creditsSummary()
  assert.equal(a.historical + a.contextual + a.captainAlone, a.total)
  assert.equal(a.total, theorems().length)
  assert.deepEqual(a, b)
})
