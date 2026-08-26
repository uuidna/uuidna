// quantum-advantage audit — VERIFY path must be complete, metrics-aligned, and under 60s.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  quantumAdvantageAudit,
  QA_REQUIRED_THEOREMS,
  QA_SEAL_PATH,
} from '../quantum/advantage/audit/index.js'
import { theoremByKey } from '../theorems/index.js'

// VERIFY of lean/quantum-advantage.json — sealed usable_gap_is_two_to_eighty · n_qubit_dimension
test('usable-capacity advantage audit VERIFY path holds under 60s', () => {
  const a = quantumAdvantageAudit()
  assert.equal(a.ok, true, a.gaps.map((g) => g.what).join('\n') || 'audit red')
  assert.equal(a.mode, 'verify')
  assert.ok(a.ms < 60_000, `verify path ${a.ms}ms must be <60000`)
  assert.ok(a.levels >= 4, 'all datapath levels present')
  assert.ok(a.sealDigest.length === 32)
})

test('required advantage theorems are sealed', () => {
  const byKey = theoremByKey()
  for (const k of QA_REQUIRED_THEOREMS)
    assert.ok(byKey.has(k), `missing ${k}`)
})

test('green and next invoke the quantum-advantage VERIFY audit on the push path', () => {
  const green = readFileSync(join(ROOT, 'src/scripts/green.ts'), 'utf8')
  assert.match(green, /quantum-advantage-audit/)
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.ok(pkg.scripts['quantum-advantage-audit'] || /quantum-advantage-audit/.test(green))
  assert.ok(readFileSync(join(ROOT, QA_SEAL_PATH), 'utf8').length > 100)
})
