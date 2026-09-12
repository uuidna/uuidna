// dry-gaps — the linear-scan finder must catch the scan it was folded from and stay silent on the keyed lookup.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { linearScansIn, linearGaps } from './dry-gaps.js'

test('linearScansIn names the scan and not the keyed lookup', () => {
  const src = [
    "const a = theoremByKey().get(String(key))",
    "const t = THEOREMS.find((x) => x.key === String(key))",
    "const u = THEOREMS.find((t) => t.key === key)",
    "const v = THEOREMS.find((t) => t.file === f)",
    "// THEOREMS.find((x) => x.key === k) named in a comment is prose, not a scan",
  ].join('\n')
  const lines = linearScansIn(src)
  assert.ok(lines.length >= 1, 'the positive control: linearGaps fires through linearScansIn on a crafted violation')
  assert.deepEqual(lines, [2, 3], 'the two key scans, by line; the file scan is a different question')
})

test('the tree holds no linear key scan (the three cured sites stay cured)', () => {
  assert.deepEqual(linearGaps(), [])
})
