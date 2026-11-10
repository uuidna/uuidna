import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SedimentologyFormulas } from './index.js'
import '../../mcp/families.js'

test('sedimentology: grainsize, sorting, roundness, settlingvelocity, porosity, sedimentload, bedform, maturity — crossing to geomorphology', async (t) => {
  assert.equal(SedimentologyFormulas.grainsize(500, 100).value, 300, 'mean of the coarse and fine bounds')
  assert.equal(SedimentologyFormulas.sorting(800, 200).value, 600, 'the spread of grain diameters')
  assert.equal(SedimentologyFormulas.sorting(200, 800).value, 0)
  assert.equal(SedimentologyFormulas.roundness(80, 100).value, 80)
  assert.equal(SedimentologyFormulas.settlingvelocity(100, 20).value, 500, 'Stokes settling ∝ d²/μ')
  assert.equal(SedimentologyFormulas.porosity(30, 100).value, 30)
  assert.equal(SedimentologyFormulas.sedimentload(50, 40).value, 2000, 'concentration times discharge')
  assert.equal(SedimentologyFormulas.bedform(120, 4).value, 30, 'the flow regime index')
  assert.equal(SedimentologyFormulas.bedform(5, 0).value, 0)
  assert.equal(SedimentologyFormulas.maturity(90, 10).value, 90, 'quartz share of the population')
  assert.equal(SedimentologyFormulas.grainsize(500, 100).dst, 'geomorphology')
  assert.equal(hexFamiliesOf().get('sedimentology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sedimentology', program: ['grainsize'], params: [500, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `sedimentology.grainsize at ${uuid}`)
  uuidReceiptOf('sedimentology grainsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; grainsize 300, sorting 600, roundness 80, settlingvelocity 500, porosity 30, sedimentload 2000, bedform 30, maturity 90; crossing to geomorphology')
})
