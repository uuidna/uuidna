import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FertilizationFormulas } from './index.js'
import '../../mcp/families.js'

test('fertilization: nitrogenrate, npkratio, applicationrate, nutrientuptake, leachingloss, soiltestindex, splitapplication, efficiency — crossing to agronomy', async (t) => {
  assert.equal(FertilizationFormulas.nitrogenrate(200, 50).value, 150, 'N rate after the soil credit')
  assert.equal(FertilizationFormulas.npkratio(10, 40).value, 25)
  assert.equal(FertilizationFormulas.applicationrate(50, 120).value, 6000, 'a field of fertilizer')
  assert.equal(FertilizationFormulas.nutrientuptake(8, 25).value, 200)
  assert.equal(FertilizationFormulas.leachingloss(200, 15).value, 30)
  assert.equal(FertilizationFormulas.soiltestindex(60, 40).value, 150)
  assert.equal(FertilizationFormulas.splitapplication(180, 3).value, 60, 'dose per pass')
  assert.equal(FertilizationFormulas.efficiency(120, 200).value, 60, 'nutrient use efficiency')
  assert.equal(FertilizationFormulas.efficiency(50, 0).value, 0)
  assert.equal(FertilizationFormulas.nitrogenrate(200, 50).dst, 'agronomy')
  assert.equal(hexFamiliesOf().get('fertilization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fertilization', program: ['applicationrate'], params: [50, 120] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `fertilization.applicationrate at ${uuid}`)
  uuidReceiptOf('fertilization applicationrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; nitrogenrate 150, npkratio 25, applicationrate 6000, nutrientuptake 200, leachingloss 30, soiltestindex 150, splitapplication 60, efficiency 60; crossing to agronomy')
})
