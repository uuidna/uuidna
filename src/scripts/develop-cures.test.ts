// develop answers every taught denial in one round (lead 229): the selector returns every match in table order,
// collapses two denials that share a command, and returns nothing for an output it was never taught.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { curesFor, CURES, HEAL_ORDER, BUILD_GATE, WING_STEP, RESEAL_FROM, healPlan } from './develop-cures.js'

const table = [
  { name: 'specific', when: /stamped ledger slot/, cmd: 'node dist/scripts/stamp.js', because: 'a' },
  { name: 'witness', when: /"messaging_total":false/, cmd: 'node dist/scripts/one-receipt.js messaging', because: 'b' },
  { name: 'axioms', when: /AXIOM WITNESS|kernel-only-witness-shipped/, cmd: 'npm run axioms', because: 'c' },
  { name: 'axioms-alias', when: /kernel-only-witness-shipped/, cmd: 'npm run axioms', because: 'd' },
]

test('every denial the output carries is answered, in table order, once per distinct command', () => {
  const out = 'kernel-only-witness-shipped\n"messaging_total":false\ndocs/x.md carries stamped ledger slot(s)\n'
  assert.deepEqual(curesFor(out, table).map((c) => c.name), ['specific', 'witness', 'axioms'])
})

test('one denial is one cure, and an untaught output is an empty answer (the honest end of a round)', () => {
  assert.deepEqual(curesFor('carries stamped ledger slot(s)', table).map((c) => c.name), ['specific'])
  assert.deepEqual(curesFor('something nobody taught', table), [])
})

test('CONTROL — a signature is a denial, never a word: a green receipt line must not summon a cure', () => {
  const anchored = [{ name: 'package surface drift', when: /(?:✗|GAP)[^\n]*(?:packages? (?:receipt|surface)|gen:packages)/, cmd: 'node dist/scripts/gen-packages.js', because: 'e' }]
  assert.deepEqual(curesFor('gen-packages — 6 packages computed from the one surface; packages receipt c047c416', anchored), [])
  assert.equal(curesFor('✗ gen-packages — packages surface drifted from src/index.ts', anchored).length, 1)
})

// ── the orders learned on 2026-09-15, held as data the runners read ──────────────────────────────────────────────

test('HEAL_ORDER resolves to taught cures, each with its reason, and an unknown name throws instead of skipping', () => {
  const plan = healPlan(HEAL_ORDER, [WING_STEP, ...CURES])
  assert.equal(plan.length, HEAL_ORDER.length)
  for (const p of plan) assert.ok(p.order.length > 20 && p.because.length > 20, `${p.name} carries its reason`)
  assert.ok(HEAL_ORDER.some((o) => o.cure === RESEAL_FROM))
  assert.throws(() => healPlan([{ cure: 'nobody taught this', because: 'x' }], CURES), /no cure row carries/)
})

test('the court record is recomputed before the spin reseal, in the order and in the table develop matches in', () => {
  const order = HEAL_ORDER.map((o) => o.cure)
  assert.ok(order.indexOf('court record stale') < order.indexOf('derived layer drift (spin)'))
  assert.equal(order[order.length - 1], 'derived layer drift (spin)', 'the seal is last')
  const at = (n: string): number => CURES.findIndex((c) => c.name === n)
  const inTable = order.filter((n) => at(n) >= 0)
  assert.deepEqual([...inTable].sort((a, b) => at(a) - at(b)), inTable, 'the table keeps the measured order')
  const both = 'lean/refusal-trials.json is not what the court computes now\n✗ NON-QUANTUM DRIFT in spin-manifest.json'
  assert.deepEqual(curesFor(both, CURES).map((c) => c.name), ['court record stale', 'derived layer drift (spin)'])
})

test('wings run through lean-one, and the build gate answers a refused type check before anything regenerates', () => {
  assert.equal(WING_STEP.cmd, 'node dist/scripts/lean-one.js')
  assert.equal(HEAL_ORDER[0]?.cure, WING_STEP.name)
  assert.equal(CURES[0], BUILD_GATE)
  assert.equal(curesFor('src/theorems/generated.ts(88,5): error TS2590: too complex', CURES)[0], BUILD_GATE)
  assert.deepEqual(curesFor('✓ build — tsc exited 0', CURES).filter((c) => c === BUILD_GATE), [])
})
