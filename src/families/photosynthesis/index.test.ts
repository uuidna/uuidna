import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotosynthesisFormulas } from './index.js'
import '../../mcp/families.js'

test('photosynthesis: lightefficiency, carbonfixation, oxygenrelease, quantumyield, grossproduction, netproduction, chlorophyll, assimilation — crossing to botany', async (t) => {
  assert.equal(PhotosynthesisFormulas.lightefficiency(84, 100).value, 84)
  assert.equal(PhotosynthesisFormulas.carbonfixation(100, 3).value, 300, 'CO₂ fixed over a hundred cycles')
  assert.equal(PhotosynthesisFormulas.oxygenrelease(1000).value, 500, 'two waters per O₂')
  assert.equal(PhotosynthesisFormulas.quantumyield(1, 8).value, 12)
  assert.equal(PhotosynthesisFormulas.grossproduction(50, 12).value, 600, 'gross over twelve hours')
  assert.equal(PhotosynthesisFormulas.netproduction(600, 100).value, 500, 'gross less respiration')
  assert.equal(PhotosynthesisFormulas.netproduction(100, 600).value, 0)
  assert.equal(PhotosynthesisFormulas.chlorophyll(1000, 4).value, 250)
  assert.equal(PhotosynthesisFormulas.assimilation(1000, 250).value, 4, 'carbon per unit chlorophyll')
  assert.equal(PhotosynthesisFormulas.lightefficiency(84, 100).dst, 'botany')
  assert.equal(hexFamiliesOf().get('photosynthesis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photosynthesis', program: ['grossproduction'], params: [50, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `photosynthesis.grossproduction at ${uuid}`)
  uuidReceiptOf('photosynthesis grossproduction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lightefficiency 84, carbonfixation 300, oxygenrelease 500, quantumyield 12, grossproduction 600, netproduction 500, chlorophyll 250, assimilation 4; crossing to botany')
})
