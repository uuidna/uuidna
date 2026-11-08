import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PetrologyFormulas } from './index.js'
import '../../mcp/families.js'

test('petrology: colorindex, silicacontent, porosity, graindensity, differentiation, crystallization, modalcomposition, meltfraction — crossing to geochemistry', async (t) => {
  assert.equal(PetrologyFormulas.colorindex(15, 100).value, 15, 'a leucocratic rock')
  assert.equal(PetrologyFormulas.silicacontent(720, 1000).value, 72, 'rhyolitic silica')
  assert.equal(PetrologyFormulas.porosity(30, 200).value, 15)
  assert.equal(PetrologyFormulas.graindensity(5300, 2).value, 2650, 'quartz grain density')
  assert.equal(PetrologyFormulas.differentiation(30, 55, 5).value, 90, 'the felsic sum')
  assert.equal(PetrologyFormulas.crystallization(40, 50).value, 80)
  assert.equal(PetrologyFormulas.modalcomposition(250, 1000).value, 25, 'point-count share')
  assert.equal(PetrologyFormulas.meltfraction(10, 40).value, 25)
  assert.equal(PetrologyFormulas.colorindex(15, 100).dst, 'geochemistry')
  assert.equal(hexFamiliesOf().get('petrology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'petrology', program: ['colorindex'], params: [15, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `petrology.colorindex at ${uuid}`)
  uuidReceiptOf('petrology colorindex', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; colorindex 15, silicacontent 72, porosity 15, graindensity 2650, differentiation 90, crystallization 80, modalcomposition 25, meltfraction 25; crossing to geochemistry')
})
