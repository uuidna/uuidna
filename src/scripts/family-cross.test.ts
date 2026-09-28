// family-cross.test — THE CROSS MUST BE ABLE TO FAIL, and the discovery must be able to come up empty.
//
// family-cross reports that every family's declared wings are sealed. That sentence is worth nothing until the same
// reader has been shown catching a family that declares a wing the kernel never sealed — which is why the control
// below hands it a fabricated declaration and requires the disagreement.
//
// AND THE DISCOVERY IS ASSERTED TOO. The autonomy of this finder is that it reads src/scripts/*-family.ts rather than a
// list, so a test that only checked the crossing would pass against a discoverer that found nothing at all — the exact
// shape that made a sibling finder report "0 gaps" for 55 files it had never opened.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { crossFamily, familyModules } from './family-cross.js'

test('a family whose every declared wing is sealed agrees', () => {
  const sealed = new Set(['A.lean', 'B.lean'])
  const r = crossFamily('two', [{ file: 'A.lean' }, { file: 'B.lean' }], sealed)
  assert.equal(r.declared, 2)
  assert.equal(r.sealed, 2)
  assert.deepEqual(r.missing, [])
  assert.ok(r.agrees)
})

// ── THE CONTROL. Without this, `agrees: true` is decoration.
test('A DECLARED WING THE KERNEL NEVER SEALED IS CAUGHT — the cross can fail', () => {
  const r = crossFamily('claims-too-much', [{ file: 'A.lean' }, { file: 'Ghost.lean' }], new Set(['A.lean']))
  assert.equal(r.agrees, false, 'a wing declared and not sealed must be a disagreement')
  assert.deepEqual(r.missing, ['Ghost.lean'], 'and it must be NAMED, so the finding is actionable')
  assert.equal(r.sealed, 1, 'the sealed count is what was actually found, not what was claimed')
})

test('the membership is read off each entry, by file or by name', () => {
  const sealed = new Set(['X.lean'])
  assert.ok(crossFamily('byFile', [{ file: 'X.lean' }], sealed).agrees)
  assert.ok(crossFamily('byName', [{ name: 'X.lean' }], sealed).agrees)
  // an entry carrying neither is not counted as a member rather than counted as a failure
  assert.equal(crossFamily('neither', [{} as { file?: string }], sealed).declared, 0)
})

test('THE DISCOVERY FINDS THE FAMILIES THAT EXIST — a discoverer that found none would pass every test above', () => {
  const mods = familyModules()
  assert.ok(mods.length >= 2, `at least two families must be discovered, or this is a self-check and not a cross — found ${mods.length}`)
  assert.ok(mods.includes('equilibrium-family'), 'the six-cube xor family is discovered')
  assert.ok(mods.includes('involution-family'), 'the refuted-lead family is discovered')
  assert.ok(mods.every((m) => m.endsWith('-family')), 'and nothing else is swept in')
})

test('an empty family is reported as agreeing with nothing, not as a failure', () => {
  const r = crossFamily('empty', [], new Set(['A.lean']))
  assert.equal(r.declared, 0)
  assert.ok(r.agrees, 'declaring no wing cannot be a broken promise — it is an empty one')
})
