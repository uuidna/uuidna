import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AgronomyFormulas } from './index.js'
import '../../mcp/families.js'

test('agronomy: output, seedrate, rotation, moisture, nitrogen, tillage, harvest, density — crossing to agriculture', async (t) => {
  assert.equal(AgronomyFormulas.output(10000, 100).value, 100, 'yield per area')
  assert.equal(AgronomyFormulas.seedrate(5000, 100).value, 50)
  assert.equal(AgronomyFormulas.rotation(12, 4).value, 3, 'crops per year of the cycle')
  assert.equal(AgronomyFormulas.moisture(30, 100).value, 30)
  assert.equal(AgronomyFormulas.nitrogen(120, 100).value, 120)
  assert.equal(AgronomyFormulas.tillage(15, 3).value, 45)
  assert.equal(AgronomyFormulas.harvest(90, 100).value, 90, 'harvest against the expectation')
  assert.equal(AgronomyFormulas.density(300, 5).value, 60)
  assert.equal(AgronomyFormulas.output(10000, 100).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('agronomy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'agronomy', program: ['rotation'], params: [12, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `agronomy.rotation at ${uuid}`)
  uuidReceiptOf('agronomy rotation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; output 100, seedrate 50, rotation 3, moisture 30, nitrogen 120, tillage 45, harvest 90, density 60; crossing to agriculture')
})
