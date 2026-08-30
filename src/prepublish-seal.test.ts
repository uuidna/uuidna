// prepublish-seal — the publication law as a recomputable test: thesis audit, Lean format, VE involutions,
// finite-infinity grants. publish.yml editorial and `npm run editorial` must pass this before any ship.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import {
  prepublishSeal,
  VECTOR_EQUILIBRIUM_INVOLUTIONS,
  WAVE_INVOLUTION_SEALS,
  FINITE_INFINITY_GRANTS,
} from './prepublish-seal.js'
import { theoremByKey } from './index.js'
import { publications } from './index.js'

test('prepublish seal holds — thesis + Lean + equilibrium + finite infinities', () => {
  const s = prepublishSeal()
  assert.equal(s.ok, true, s.gaps.map((g) => g.what).join('\n') || 'seal red')
  assert.equal(s.thesis.drained, 0)
  assert.equal(s.thesis.archiveConforms, true)
  assert.equal(s.thesis.publishable, s.thesis.publications)
  assert.equal(s.leanFormat.allDecide, true)
  assert.equal(s.equilibrium.missing.length, 0)
  assert.equal(s.finiteInfinities.missing.length, 0)
  assert.ok(s.receipt.length > 0)
})

test('every publication is Lean-backed — wing file + by-decide theorems', () => {
  const byKey = theoremByKey()
  for (const p of publications()) {
    assert.ok(p.file.endsWith('.lean'), `${p.slug} file is Lean`)
    assert.ok(p.count >= 1)
    for (const k of p.theorems) {
      const t = byKey.get(k)
      assert.ok(t, `${p.slug} → ${k}`)
      assert.match(t.tactic, /decide/)
    }
  }
})

test('vector equilibrium involution set is gap-free on the ledger', () => {
  const byKey = theoremByKey()
  for (const k of [...VECTOR_EQUILIBRIUM_INVOLUTIONS, ...WAVE_INVOLUTION_SEALS])
    assert.ok(byKey.has(k), `missing involution/equilibrium seal: ${k}`)
})

test('finite-infinity grants are sealed (finite by-decide licensing exponential shapes)', () => {
  const byKey = theoremByKey()
  for (const k of FINITE_INFINITY_GRANTS)
    assert.ok(byKey.has(k), `missing finite-infinity grant: ${k}`)
  assert.ok(FINITE_INFINITY_GRANTS.includes('involution_replaces_the_raised_ceiling'))
  assert.ok(FINITE_INFINITY_GRANTS.includes('n_qubit_dimension'))
})

test('editorial npm script and publish.yml run the prepublish seal before ship', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.match(pkg.scripts.editorial, /prepublish-seal/)
  const yml = readFileSync(join(ROOT, '.github', 'workflows', 'publish.yml'), 'utf8')
  assert.match(yml, /prepublish-seal|npm run editorial/)
  // editorial job must exist and precede publish
  assert.match(yml, /editorial:/)
  assert.match(yml, /needs:\s*editorial/)
})
