import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FatigueFormulas } from './index.js'
import '../../mcp/families.js'

test('fatigue: amplitude, cyclestofailure, endurancelimit, meanstress, minerdamage, safetyfactor, stressrange, stressratio — crossing to materials', async (t) => {
  assert.equal(FatigueFormulas.amplitude(300, 100).value, 100, 'half the stress range')
  assert.equal(FatigueFormulas.cyclestofailure(10000, 50).value, 200, 'cycles the part lasts')
  assert.equal(FatigueFormulas.endurancelimit(400).value, 200, 'half the ultimate strength')
  assert.equal(FatigueFormulas.meanstress(300, 100).value, 200)
  assert.equal(FatigueFormulas.minerdamage(50, 200).value, 25, 'percent of life spent')
  assert.equal(FatigueFormulas.safetyfactor(600, 200).value, 3, 'three times the applied stress')
  assert.equal(FatigueFormulas.stressrange(300, 100).value, 200)
  assert.equal(FatigueFormulas.stressratio(10, 100).value, 10, 'R ratio as a percent')
  assert.equal(FatigueFormulas.amplitude(300, 100).dst, 'materials')
  assert.equal(hexFamiliesOf().get('fatigue')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fatigue', program: ['safetyfactor'], params: [600, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `fatigue.safetyfactor at ${uuid}`)
  uuidReceiptOf('fatigue safetyfactor', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; amplitude 100, cyclestofailure 200, endurancelimit 200, meanstress 200, minerdamage 25, safetyfactor 3, stressrange 200, stressratio 10; crossing to materials')
})
