// run-evidence — one call reads a run's saved receipts; each rule has a control that must fire, so an absent log can
// never read as a clean, empty run.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { runEvidence } from './run-evidence.js'

const rootWith = (lines: readonly unknown[]): string => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-run-evidence-'))
  mkdirSync(join(root, 'dist', 'evidence'), { recursive: true })
  writeFileSync(join(root, 'dist', 'evidence', 'axioms-receipts.jsonl'), lines.map((l) => JSON.stringify(l)).join('\n') + '\n')
  return root
}
const row = (file: string, die: number[], battery: number) => ({
  file, verdict: {}, readings: { ns: '1000', die: die.map((mk) => ({ measured: true, millikelvin: mk, source: 's' })), battery: { measured: true, millikelvin: battery } },
})

test('a saved run reads back its count, its latest receipts and its hottest die in one call', () => {
  const r = runEvidence('axioms-receipts', 10, rootWith([row('A.lean', [305000, 326000], 303700), row('B.lean', [307000, 330000], 303800)]))
  assert.equal(r.measured, true)
  if (!r.measured) return
  assert.equal(r.saved, 2)
  assert.equal(r.dieRange.hottestMax, 330000)
  assert.equal(r.dieRange.coolestMax, 326000)
  assert.deepEqual(r.latest.map((v) => v.what), ['A.lean', 'B.lean'])
  assert.equal(r.latest[1]!.battery, 303800)
})

test('CONTROL: an unknown run is not measured — never an empty clean list', () => {
  assert.equal(runEvidence('secrets', 10, rootWith([])).measured, false)
})

test('CONTROL: a log that cannot be read is not measured, and says where the evidence lives', () => {
  const r = runEvidence('trial-rows', 10, rootWith([]))
  assert.equal(r.measured, false)
  if (r.measured) return
  assert.match(r.why, /dist\/evidence|qpu storage/)
})
