import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ParasitologyFormulas } from './index.js'
import '../../mcp/families.js'

test('parasitology: prevalence, intensity, burden, abundance, aggregation, transmission, lifecycle, infectivity — crossing to microbiology', async (t) => {
  assert.equal(ParasitologyFormulas.prevalence(250, 1000).value, 25, 'a quarter of the hosts carry it')
  assert.equal(ParasitologyFormulas.intensity(1200, 50).value, 24)
  assert.equal(ParasitologyFormulas.burden(50, 24).value, 1200, 'the total worm burden')
  assert.equal(ParasitologyFormulas.abundance(5000, 1000).value, 5)
  assert.equal(ParasitologyFormulas.aggregation(800, 10).value, 80, 'clumped, not random')
  assert.equal(ParasitologyFormulas.transmission(500, 20).value, 100, 'new infections')
  assert.equal(ParasitologyFormulas.lifecycle(4, 7).value, 28)
  assert.equal(ParasitologyFormulas.infectivity(100, 50).value, 1, 'dose clears ID50')
  assert.equal(ParasitologyFormulas.infectivity(30, 50).value, 0)
  assert.equal(ParasitologyFormulas.prevalence(250, 1000).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('parasitology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'parasitology', program: ['intensity'], params: [1200, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `parasitology.intensity at ${uuid}`)
  uuidReceiptOf('parasitology intensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; prevalence 25, intensity 24, burden 1200, abundance 5, aggregation 80, transmission 100, lifecycle 28, infectivity 1; crossing to microbiology')
})
