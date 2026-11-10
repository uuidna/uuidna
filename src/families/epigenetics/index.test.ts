import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EpigeneticsFormulas } from './index.js'
import '../../mcp/families.js'

test('epigenetics: methylation, acetylation, expression, imprinting, chromatin, clock, inheritance, remodeling — crossing to genetics', async (t) => {
  assert.equal(EpigeneticsFormulas.methylation(30, 40).value, 75)
  assert.equal(EpigeneticsFormulas.acetylation(9, 10).value, 90)
  assert.equal(EpigeneticsFormulas.expression(50, 200).value, 25)
  assert.equal(EpigeneticsFormulas.imprinting(1, 2).value, 50, 'one of two alleles silenced')
  assert.equal(EpigeneticsFormulas.chromatin(3, 4).value, 75)
  assert.equal(EpigeneticsFormulas.clock(3650, 50).value, 73, 'sites per year')
  assert.equal(EpigeneticsFormulas.inheritance(3, 4).value, 75)
  assert.equal(EpigeneticsFormulas.remodeling(20, 80).value, 25)
  assert.equal(EpigeneticsFormulas.methylation(30, 40).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('epigenetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'epigenetics', program: ['methylation'], params: [30, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `epigenetics.methylation at ${uuid}`)
  uuidReceiptOf('epigenetics methylation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; methylation 75, acetylation 90, expression 25, imprinting 50, chromatin 75, clock 73, inheritance 75, remodeling 25; crossing to genetics')
})
