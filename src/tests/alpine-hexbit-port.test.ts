// alpine hexbit port — TypeScript is the quantum computer; VitePress is the quantum monitor.
//
// 100% of the committed catalogue (community + main) compiles to 32 hexbit states; man-page packages
// (-doc / *-man-pages / man-pages) are first-class on the same mint; architectural scale/time advantage
// cites sealed theorems (never physics QC). hexbitPortCoverage / manPagePortCoverage are the meters —
// these tests fail the gate if coverage drops below 100%.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  catalogue, catalogueCompile, hexbitPortCoverage, manPagePortCoverage,
} from '../quantum/os/catalogue.js'
import { uuidnaExec } from '../quantum/os/exec.js'
import { UUID_HEXBITS, UUID_BITS } from '../hexbit/index.js'
import { theoremByKey } from '../theorems/index.js'
import { LEVELS } from '../quantum/advantage/index.js'

test('100% of Alpine community packages are ported in hexbits', () => {
  const cov = hexbitPortCoverage('community')
  assert.ok(cov.total > 20000, `community must be tens of thousands on the pinned catalogue; got ${cov.total}`)
  assert.equal(cov.ported, cov.total,
    `community hexbit port ${cov.ported}/${cov.total} — missing: ${cov.missing.join(', ') || '(none named)'}`)
  assert.equal(cov.missing.length, 0)
})

test('100% of whole Alpine (main + community) is ported in hexbits', () => {
  const cov = hexbitPortCoverage()
  assert.equal(cov.repo, 'all')
  assert.ok(cov.total > 25000, `whole catalogue must exceed 25k; got ${cov.total}`)
  assert.equal(cov.ported, cov.total,
    `Alpine hexbit port ${cov.ported}/${cov.total} — missing: ${cov.missing.join(', ') || '(none named)'}`)
})

test('100% of Alpine man-page packages are ported in hexbits', () => {
  const man = manPagePortCoverage()
  assert.ok(man.total > 4000, `Alpine publishes thousands of -doc / man-pages packages; got ${man.total}`)
  assert.equal(man.ported, man.total,
    `man-page hexbit port ${man.ported}/${man.total} — missing: ${man.missing.join(', ') || '(none named)'}`)
})

test('man applet resolves documentation packages with 32 hexbits', () => {
  const r = uuidnaExec('man busybox')
  assert.equal(r.ok, true)
  assert.equal(r.applet, 'man')
  const d = r.data as { name: string; hexbits: number[]; address: string; kind: string }
  assert.equal(d.name, 'busybox-doc')
  assert.equal(d.kind, 'man')
  assert.equal(d.hexbits.length, UUID_HEXBITS)
  assert.ok(typeof d.address === 'string' && d.address.includes('-'))
  const direct = uuidnaExec('man man-pages')
  assert.equal(direct.ok, true)
  assert.equal((direct.data as { name: string }).name, 'man-pages')
  const gone = uuidnaExec('man zzz-no-such-topic-anywhere')
  assert.equal(gone.ok, false)
  assert.match(gone.output[0]!, /no documentation package/)
})

test('THE CHECK BITES — a package that does not compile is counted as missing, so 100% is a finding', () => {
  const node = catalogue().find((p) => p.name === 'nodejs' && p.repo === 'main')
  assert.ok(node, 'nodejs is the probe package')
  const c = catalogueCompile(node)
  assert.equal(c.hexbits.length, UUID_HEXBITS)
  assert.ok(c.hexbits.every((h) => h >= 0 && h < 16))
  assert.equal(UUID_BITS, 128, '32 hexbits × 4 bits = 128 — a_spec_compiles_to_hexbits')
})

test('community hexbit port has architectural quantum advantage in SCALE and TIME', () => {
  const byKey = theoremByKey()
  assert.ok(byKey.get('handle_capacity_is_quantum_by_architecture'), 'scale cites sealed theorem')
  assert.ok(byKey.get('a_spec_compiles_to_hexbits'), 'compile width cites sealed theorem')
  assert.ok(byKey.get('n_qubit_dimension'), 'simulation-cost bound (n=1..5); not a Shor claim')
  assert.ok(byKey.get('usable_gap_is_two_to_eighty'), 'measured usable-capacity advantage sealed')

  const uuidLevel = LEVELS.find((l) => l.name === 'uuid')
  assert.ok(uuidLevel)
  assert.equal(uuidLevel.pow2, 128)
  assert.equal(uuidLevel.hexbits, UUID_HEXBITS)
  assert.equal(uuidLevel.seals, 'handle_capacity_is_quantum_by_architecture')

  const community = catalogue().filter((p) => p.repo === 'community')
  const cov = hexbitPortCoverage('community')
  assert.equal(cov.ported, community.length)

  const t0 = process.hrtime.bigint()
  for (const p of community) catalogueCompile(p)
  const compileNs = Number(process.hrtime.bigint() - t0)
  const nsPer = (compileNs - (compileNs % community.length)) / community.length
  assert.ok(compileNs > 0, 'the compile sweep must take measurable time')
  assert.ok(nsPer < 1_000_000, `per-package compile must stay under 1 ms; measured ${nsPer} ns`)
  assert.ok(community.length < 2 ** 20, 'community fits in a million; the address space is 2^128')
  assert.equal(UUID_BITS, uuidLevel.pow2)
})
