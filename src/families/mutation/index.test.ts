import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MutationFormulas } from './index.js'

/** mutation: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('mutation: rate, types, substitutions, frequency, hotspots, silent, generations, combos', async (t) => {
  assert.equal(MutationFormulas.rate(1000000, 1000).value, 1000, 'rate(1000000, 1000)')
  assert.equal(MutationFormulas.types(3, 0).value, 3, 'types(3, 0)')
  assert.equal(MutationFormulas.substitutions(100, 3).value, 300, 'substitutions(100, 3)')
  assert.equal(MutationFormulas.frequency(5, 1000).value, 5, 'frequency(5, 1000)')
  assert.equal(MutationFormulas.hotspots(10, 2).value, 20, 'hotspots(10, 2)')
  assert.equal(MutationFormulas.silent(25, 100).value, 25, 'silent(25, 100)')
  assert.equal(MutationFormulas.generations(100, 1).value, 100, 'generations(100, 1)')
  assert.equal(MutationFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('mutation')?.length, 8)
  for (const [name, params, expected] of [["types",[3,0],3],["substitutions",[100,3],300],["frequency",[5,1000],5]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'mutation', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `mutation.${name} at ${uuid}`)
    uuidReceiptOf(`mutation ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "types=3, substitutions=300, frequency=5")
})
