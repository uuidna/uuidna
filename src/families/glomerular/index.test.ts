import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlomerularFormulas } from './index.js'
import '../../mcp/families.js'

test('glomerular: excretion, clearance, filtrationrate, creatinineclearance, filtrationfraction, filteredload, reabsorption, plasmaflow — crossing to nephrology', async (t) => {
  assert.equal(GlomerularFormulas.excretion(100, 2).value, 200, 'mass excreted per minute')
  assert.equal(GlomerularFormulas.clearance(200, 2).value, 100)
  assert.equal(GlomerularFormulas.filtrationrate(100, 2, 2).value, 100, 'GFR in mL/min')
  assert.equal(GlomerularFormulas.creatinineclearance(120, 1, 1).value, 120)
  assert.equal(GlomerularFormulas.filtrationfraction(125, 625).value, 20, 'a fifth of plasma filtered')
  assert.equal(GlomerularFormulas.filteredload(100, 5).value, 500)
  assert.equal(GlomerularFormulas.reabsorption(500, 100).value, 400, 'tubule reclaims the difference')
  assert.equal(GlomerularFormulas.reabsorption(100, 500).value, 0)
  assert.equal(GlomerularFormulas.plasmaflow(1000, 45).value, 550)
  assert.equal(GlomerularFormulas.filtrationrate(100, 2, 2).dst, 'nephrology')
  assert.equal(hexFamiliesOf().get('glomerular')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'glomerular', program: ['filtrationrate'], params: [100, 2, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `glomerular.filtrationrate at ${uuid}`)
  uuidReceiptOf('glomerular filtrationrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; excretion 200, clearance 100, filtrationrate 100, creatinineclearance 120, filtrationfraction 20, filteredload 500, reabsorption 400, plasmaflow 550; crossing to nephrology')
})
