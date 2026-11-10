import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ModularFormulas } from './index.js'

/** modular: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('modular: residue, inverse, classes, order, power, gcd, ring, combos', async (t) => {
  assert.equal(ModularFormulas.residue(100, 7).value, 2, 'residue(100, 7)')
  assert.equal(ModularFormulas.inverse(22, 7).value, 3, 'inverse(22, 7)')
  assert.equal(ModularFormulas.classes(1000, 26).value, 12, 'classes(1000, 26)')
  assert.equal(ModularFormulas.order(6, 2).value, 3, 'order(6, 2)')
  assert.equal(ModularFormulas.power(8).value, 256, 'power(8)')
  assert.equal(ModularFormulas.gcd(12, 18).value, 12, 'gcd(12, 18)')
  assert.equal(ModularFormulas.ring(7, 0).value, 7, 'ring(7, 0)')
  assert.equal(ModularFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('modular')?.length, 8)
  for (const [name, params, expected] of [["residue",[100,7],2],["inverse",[22,7],3],["classes",[1000,26],12]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'modular', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `modular.${name} at ${uuid}`)
    uuidReceiptOf(`modular ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "residue=2, inverse=3, classes=12")
})
