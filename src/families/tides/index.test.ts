import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TidesFormulas } from './index.js'
import '../../mcp/families.js'

test('tides: amplitude, flowrate, harmonic, meanlevel, neaptide, period, range, springtide — crossing to oceanography', async (t) => {
  assert.equal(TidesFormulas.amplitude(264).value, 132, 'half the range')
  assert.equal(TidesFormulas.flowrate(12000, 6).value, 2000, 'volume per unit time')
  assert.equal(TidesFormulas.harmonic(50, 4).value, 200)
  assert.equal(TidesFormulas.meanlevel(312, 48).value, 180, 'mean sea level')
  assert.equal(TidesFormulas.neaptide(90, 40).value, 50)
  assert.equal(TidesFormulas.period(24, 2).value, 12, 'twelve hours a semidiurnal half-cycle')
  assert.equal(TidesFormulas.range(312, 48).value, 264, 'high water less low water')
  assert.equal(TidesFormulas.springtide(40, 90).value, 130, 'sun and moon pulls add')
  assert.equal(TidesFormulas.neaptide(40, 90).value, 0)
  assert.equal(TidesFormulas.range(312, 48).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('tides')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tides', program: ['range'], params: [312, 48] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 264, `tides.range at ${uuid}`)
  uuidReceiptOf('tides range', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; amplitude 132, flowrate 2000, harmonic 200, meanlevel 180, neaptide 50, period 12, range 264, springtide 130; crossing to oceanography')
})
