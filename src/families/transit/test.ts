import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TransitFormulas } from './index.js'
import '../../mcp/families.js'

test('transit: ridership, frequency, loadfactor, ontime, coverage, farebox, headway, span — crossing to transport', async (t) => {
  assert.equal(TransitFormulas.ridership(500, 40).value, 20000, 'a day of riders')
  assert.equal(TransitFormulas.frequency(5, 15).value, 20, 'departures over five hours')
  assert.equal(TransitFormulas.loadfactor(45, 60).value, 75)
  assert.equal(TransitFormulas.ontime(920, 1000).value, 92)
  assert.equal(TransitFormulas.coverage(240, 12).value, 20, 'stops per area')
  assert.equal(TransitFormulas.farebox(3000, 5000).value, 60)
  assert.equal(TransitFormulas.headway(300, 20).value, 15, 'minutes between vehicles')
  assert.equal(TransitFormulas.span(5, 23).value, 18, 'service hours')
  assert.equal(TransitFormulas.span(23, 5).value, 0)
  assert.equal(TransitFormulas.ridership(500, 40).dst, 'transport')
  assert.equal(hexFamiliesOf().get('transit')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'transit', program: ['ridership'], params: [500, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20000, `transit.ridership at ${uuid}`)
  uuidReceiptOf('transit ridership', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ridership 20000, frequency 20, loadfactor 75, ontime 92, coverage 20, farebox 60, headway 15, span 18; crossing to transport')
})
