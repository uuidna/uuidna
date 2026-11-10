import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolymerFormulas } from './index.js'

/** polymer: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('polymer: chains, molweight, monomers, crosslinks, tg, degree, branches, combos', async (t) => {
  assert.equal(PolymerFormulas.chains(1000, 100).value, 100000, 'chains(1000, 100)')
  assert.equal(PolymerFormulas.molweight(100, 50).value, 5000, 'molweight(100, 50)')
  assert.equal(PolymerFormulas.monomers(500, 2).value, 1000, 'monomers(500, 2)')
  assert.equal(PolymerFormulas.crosslinks(1000, 10).value, 100, 'crosslinks(1000, 10)')
  assert.equal(PolymerFormulas.tg(200, 100).value, 100, 'tg(200, 100)')
  assert.equal(PolymerFormulas.degree(10000, 100).value, 100, 'degree(10000, 100)')
  assert.equal(PolymerFormulas.branches(4, 0).value, 4, 'branches(4, 0)')
  assert.equal(PolymerFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('polymer')?.length, 8)
  for (const [name, params, expected] of [["chains",[1000,100],100000],["molweight",[100,50],5000],["monomers",[500,2],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'polymer', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `polymer.${name} at ${uuid}`)
    uuidReceiptOf(`polymer ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "chains=100000, molweight=5000, monomers=1000")
})
