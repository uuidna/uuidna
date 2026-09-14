// prepublish-seal — the publication law as a recomputable test: thesis audit, Lean format, VE involutions,
// finite-infinity grants. publish.yml editorial and `npm run editorial` must pass this before any ship.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import {
  prepublishSeal,
  kernelVerdictOf,
  leanFormatFault,
  VECTOR_EQUILIBRIUM_INVOLUTIONS,
  WAVE_INVOLUTION_SEALS,
  FINITE_INFINITY_GRANTS,
  type KernelVerdict,
} from './prepublish-seal.js'
import { theoremByKey, theorems } from './index.js'
import { publications } from './index.js'

test('prepublish seal holds — thesis + Lean + equilibrium + finite infinities', () => {
  const s = prepublishSeal()
  assert.equal(s.ok, true, s.gaps.map((g) => g.what).join('\n') || 'seal red')
  assert.equal(s.thesis.drained, 0)
  assert.equal(s.thesis.archiveConforms, true)
  assert.equal(s.thesis.publishable, s.thesis.publications)
  assert.equal(s.leanFormat.axiomFree, true)
  assert.equal(s.equilibrium.missing.length, 0)
  assert.equal(s.finiteInfinities.missing.length, 0)
  assert.ok(s.receipt.length > 0)
})

test('every publication is Lean-backed — wing file + kernel-vouched theorems', () => {
  const byKey = theoremByKey()
  const verdict = kernelVerdictOf()
  for (const p of publications()) {
    assert.ok(p.file.endsWith('.lean'), `${p.slug} file is Lean`)
    assert.ok(p.count >= 1)
    for (const k of p.theorems) {
      const t = byKey.get(k)
      assert.ok(t, `${p.slug} → ${k}`)
      assert.equal(leanFormatFault(t, verdict), null, `${p.slug} → ${k}`)
    }
  }
})

test('the Lean format judges the kernel verdict, never the tactic — both directions', () => {
  const clean: KernelVerdict = () => []
  const borrows: KernelVerdict = () => ['propext']
  const unasked: KernelVerdict = () => null
  const exact = { key: 'k', tactic: 'exact h', lean: 'theorem k : P := by exact h', file: 'W.lean' }
  assert.equal(leanFormatFault(exact, clean), null, 'a non-decide, axiom-free proof passes')
  assert.match(leanFormatFault(exact, borrows) ?? '', /propext/, 'a named axiom fails')
  assert.match(leanFormatFault(exact, unasked) ?? '', /no kernel verdict/, 'absent from the audit fails')
  const sorry = { key: 'k', tactic: 'sorry', lean: 'theorem k : P := by sorry', file: 'W.lean' }
  assert.match(leanFormatFault(sorry, clean) ?? '', /sorry/, 'a sorry fails even under a clean verdict')
  const desync = { key: 'k', tactic: 'decide', lean: 'theorem k : P := by exact h', file: 'W.lean' }
  assert.match(leanFormatFault(desync, clean) ?? '', /does not carry/, 'a lean without its recorded proof fails')

  const verdict = kernelVerdictOf()
  const nonDecide = theorems().filter((t) => !t.tactic.startsWith('decide'))
  assert.ok(nonDecide.some((t) => t.key === 'reconciled_b13fd37a'), 'the live ledger carries non-decide proofs')
  for (const t of nonDecide) assert.equal(leanFormatFault(t, verdict), null, t.key)
  const live = nonDecide[0]!
  const perturbed: KernelVerdict = (key, file) => key === live.key ? ['Classical.choice'] : verdict(key, file)
  assert.match(leanFormatFault(live, perturbed) ?? '', /Classical\.choice/, 'CONTROL: the same live row fails once the kernel names an axiom')
  assert.equal(verdict(live.key, 'NoSuchWing.lean'), null, 'CONTROL: a key asked of the wrong wing has no verdict')
})

test('vector equilibrium involution set is gap-free on the ledger', () => {
  const byKey = theoremByKey()
  for (const k of [...VECTOR_EQUILIBRIUM_INVOLUTIONS, ...WAVE_INVOLUTION_SEALS])
    assert.ok(byKey.has(k), `missing involution/equilibrium seal: ${k}`)
})

test('finite-infinity grants are sealed (finite kernel-checked seals licensing exponential shapes)', () => {
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
