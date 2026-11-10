import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BacteriologyFormulas } from './index.js'
import '../../mcp/families.js'

test('bacteriology: generationtime, cfu, dilution, growthrate, mic, biofilm, viability, doublings — crossing to microbiology', async (t) => {
  assert.equal(BacteriologyFormulas.generationtime(120, 6).value, 20, 'minutes per division')
  assert.equal(BacteriologyFormulas.cfu(50, 1000).value, 50000, 'colony-forming units')
  assert.equal(BacteriologyFormulas.dilution(1000, 10).value, 100)
  assert.equal(BacteriologyFormulas.growthrate(12, 4).value, 3, 'divisions per hour')
  assert.equal(BacteriologyFormulas.mic(512, 8).value, 64)
  assert.equal(BacteriologyFormulas.biofilm(1000, 5).value, 5000)
  assert.equal(BacteriologyFormulas.viability(750, 1000).value, 75, 'percent viable')
  assert.equal(BacteriologyFormulas.doublings(100, 3).value, 800, 'eightfold after three doublings')
  assert.equal(BacteriologyFormulas.generationtime(120, 6).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('bacteriology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bacteriology', program: ['doublings'], params: [100, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `bacteriology.doublings at ${uuid}`)
  uuidReceiptOf('bacteriology doublings', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; generationtime 20, cfu 50000, dilution 100, growthrate 3, mic 64, biofilm 5000, viability 75, doublings 800; crossing to microbiology')
})
