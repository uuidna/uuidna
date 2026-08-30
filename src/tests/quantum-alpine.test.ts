// quantum-alpine — full crypto-related Alpine coverage: Layer 1 exec + Layer 2 plans + playbook lines.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from '../mcp.js'
import { planAlpineRuns, detectRunBackend, verifyPinnedRootfs } from '../os/runtime/index.js'
import { cryptoAppsPort, type CryptoAppsPort } from '../quantum/os/crypto-apps.js'
import {
  quantumAlpinePackageNames, testQuantumAlpinePackage, testQuantumAlpineCoverage,
  renderQuantumAlpineCoverage,
} from '../quantum/os/quantum-alpine.js'
import { quantumAdvantagePlaybook } from '../quantum/advantage/mcp/agent/playbook/index.js'
import { theoremByKey } from '../theorems/index.js'
import { fresh } from '../quantum/os/harness.js'

test.beforeEach(fresh)

test('quantumAlpinePackageNames matches uuidna_crypto census', () => {
  const census = callTool('uuidna_crypto', {}) as CryptoAppsPort
  const names = quantumAlpinePackageNames()
  assert.equal(names.length, census.total)
  assert.deepEqual(names, census.packages.map((p) => p.name))
})

test('every crypto-related Alpine package passes Layer 1 exec — one door, not one tool per apk', () => {
  const c = testQuantumAlpineCoverage()
  console.log('\n' + renderQuantumAlpineCoverage(c) + '\n')
  assert.equal(c.definition, 'quantum-alpine·crypto-apps·playbook')
  assert.equal(c.census, cryptoAppsPort().total)
  assert.equal(c.tested, c.census)
  assert.ok(c.census > 50, `expected a real census, got ${c.census}`)
  assert.equal(c.passed, c.tested, `failures: ${c.failed.join(', ')}`)
  assert.equal(c.complete, true)
  assert.ok(c.withMan > 0)
  assert.ok(c.withBinary > 0)
  assert.ok(c.withMan < c.tested, 'man on every row would be padding')
  assert.ok(c.commands.length > 0)
  for (const p of c.packages) {
    assert.ok(p.via === 'purpose' || p.via === 'depends' || p.via === 'both')
    assert.ok(p.checks.length > 0)
    assert.ok(p.theorem, `${p.name} must carry a theorem`)
    assert.ok(theoremByKey().has(p.theorem), p.theorem)
    assert.equal(p.theoremRoute, `/theorem/${p.theorem}`)
  }
  assert.ok(c.theoremCount >= 2, 'apps fold to multiple sealed theorems')
  for (const t of c.cites) assert.ok(theoremByKey().has(t.key))
})

test('playbook alpine exec lines answer through uuidna_exec with full hexbits', () => {
  const lines = quantumAdvantagePlaybook().alpine.lines
  assert.ok(lines.length >= 4)
  const c = testQuantumAlpineCoverage()
  assert.equal(c.playbookExec.length, lines.length)
  for (const h of c.playbookExec) {
    assert.equal(h.ok, true, `${h.line}: ${h.detail}`)
  }
})

test('every quantum-alpine cmd: has a Layer 2 plan — scaffold verified once', () => {
  const c = testQuantumAlpineCoverage()
  const batch = planAlpineRuns(c.commands)
  assert.equal(batch.plans.length, c.commands.length)
  assert.equal(c.plans.total, batch.plans.length)
  if (batch.ok) {
    assert.equal(c.plans.built, c.commands.length)
    for (const p of batch.plans) {
      assert.equal(p.plan.ok, true, p.command)
    }
  } else {
    assert.ok(batch.reason)
    for (const p of batch.plans) {
      assert.equal(p.plan.ok, false)
      assert.equal(p.plan.reason, batch.reason)
    }
  }
})

test('openssl nginx curl are in the census and individually exec-tested', () => {
  for (const name of ['openssl', 'nginx', 'curl', 'libcrypto3']) {
    assert.ok(quantumAlpinePackageNames().includes(name), `${name} must be crypto-related`)
    const t = testQuantumAlpinePackage(name)
    assert.equal(t.ok, true, `${name}: ${t.checks.filter((x) => !x.ok).map((x) => x.check).join(',')}`)
    const apk = t.checks.find((x) => x.check === 'apk')
    assert.ok(apk?.ok, `${name} apk: ${apk?.detail}`)
  }
})

test('sandbox probes quantum-alpine cmd: when docker and pinned rootfs are present', { timeout: 180_000 }, () => {
  const verify = verifyPinnedRootfs()
  if (!verify.present || !verify.ok || detectRunBackend() !== 'docker') return
  const c = testQuantumAlpineCoverage({ sandbox: true })
  assert.ok(c.sandbox)
  assert.equal(c.sandbox.ok, true, c.sandbox.reason ?? 'sandbox refused')
  assert.ok(c.sandbox.presentNames.includes('busybox') || c.sandbox.present >= 1)
})

test('CONTROL: coverage receipt is deterministic and names failures', () => {
  const a = testQuantumAlpineCoverage()
  const b = testQuantumAlpineCoverage()
  assert.equal(a.receipt, b.receipt)
  assert.equal(a.complete, true)
  assert.equal(a.failed.length, 0)
})
