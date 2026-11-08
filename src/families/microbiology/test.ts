import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MicrobiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('microbiology: growth, generation, cfu, mic, resistance, zone, viability, od — crossing to med', async (t) => {
  assert.equal(MicrobiologyFormulas.growth(100, 3).value, 800, 'three doublings')
  assert.equal(MicrobiologyFormulas.generation(600, 3).value, 200)
  assert.equal(MicrobiologyFormulas.cfu(50, 1000).value, 50000)
  assert.equal(MicrobiologyFormulas.mic(8).value, 8)
  assert.equal(MicrobiologyFormulas.resistance(25, 100).value, 25)
  assert.equal(MicrobiologyFormulas.zone(18).value, 18)
  assert.equal(MicrobiologyFormulas.viability(950, 1000).value, 95)
  assert.equal(MicrobiologyFormulas.od(1000, 10).value, 100)
  assert.equal(MicrobiologyFormulas.growth(100, 3).dst, 'med')
  assert.equal(hexFamiliesOf().get('microbiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'microbiology', program: ['growth'], params: [100, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `microbiology.growth at ${uuid}`)
  uuidReceiptOf('microbiology growth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; growth 800, generation 200, cfu 50000, mic 8, resistance 25, zone 18, viability 95, od 100; crossing to med')
})
