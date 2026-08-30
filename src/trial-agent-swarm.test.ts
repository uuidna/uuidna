import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readImprintTextChain } from './index.js'
import { applyToElements, INVOLUTIONS } from './involution/index.js'
import { trialAdmit, trialAgentSwarm, trialAgentVerifyByDenial } from './trial-gate.js'
import { trialSealContent, runTrial } from './index.js'
import { THEOREMS } from './index.js'

test('3000 agents — verify by involutions of denials', () => {
  const { records, seal } = trialAgentSwarm(3000)
  assert.equal(seal.agents, 3000)
  assert.equal(seal.verified, 3000)
  assert.ok(seal.denialsRefused > 0)
  assert.ok(seal.denialsFixed >= 0)
  assert.equal(seal.involutions.divZero! + seal.involutions.vortex!, 3000)
  assert.ok(seal.kinds['key-collision'] > 0)
  for (const r of records) {
    assert.equal(applyToElements(applyToElements(r.candidate.statement, INVOLUTIONS.find((i) => i.name === r.involution)!), INVOLUTIONS.find((i) => i.name === r.involution)!), r.candidate.statement)
    assert.equal(r.verified, true)
    assert.equal(r.admission.admitted, true)
    if (r.denial !== r.candidate.statement) assert.equal(r.denialAdmission.admitted, false)
  }
})

test('trialAgentVerifyByDenial — denial refused, home admitted', () => {
  const t = THEOREMS.find((row) => applyToElements(row.statement, INVOLUTIONS[1]!) !== row.statement)!
  const r = trialAgentVerifyByDenial(t, INVOLUTIONS[1]!)
  assert.notEqual(r.denial, t.statement)
  assert.equal(r.denialAdmission.admitted, false)
  assert.equal(r.admission.admitted, true)
  assert.equal(r.verified, true)
})

test('trialSealContent — verified + denial refusal carriers fold', () => {
  const s = trialSealContent(256)
  assert.equal(s.trial.count, THEOREMS.length)
  assert.equal(s.swarm.verified, 256)
  assert.ok(s.swarm.denialsRefused > 0)
  assert.equal(s.refused.length, s.swarm.denialsRefused)
  const round = readImprintTextChain(s.imprint)
  const parsed = JSON.parse(round) as { count: number; admitted: number; refused: number }
  assert.equal(parsed.count, THEOREMS.length)
  assert.equal(parsed.admitted, s.swarm.verified)
  assert.equal(parsed.refused, s.swarm.denialsRefused)
})

test('runTrial merkaba — eight inputs and eight outputs sealed', () => {
  const t = runTrial()
  assert.equal(t.merkaba.vertices, 8)
  assert.equal(t.merkaba.traitorProof.admitted, true)
})

test('forged denial — key-collision before home mints', () => {
  const row = THEOREMS[0]!
  const forged = row.statement + ' '
  const a = trialAdmit({
    key: row.key,
    statement: forged,
    lean: `theorem ${row.key} : ${forged} := by decide`,
    file: row.file,
  })
  assert.equal(a.admitted, false)
  assert.equal(a.kind, 'key-collision')
})
