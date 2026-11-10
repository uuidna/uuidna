import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FilteringFormulas } from './index.js'
import '../../mcp/families.js'

test('filtering: cutoff, passband, stopband, rolloff, order, groupdelay, attenuation, bandwidth — crossing to signal', async (t) => {
  assert.equal(FilteringFormulas.cutoff(48000, 4).value, 12000, 'a quarter of the sample rate')
  assert.equal(FilteringFormulas.passband(3000, 1000).value, 2000)
  assert.equal(FilteringFormulas.stopband(4000, 500).value, 4500, 'transition above the cutoff')
  assert.equal(FilteringFormulas.rolloff(4).value, 24, 'dB per octave')
  assert.equal(FilteringFormulas.order(96, 24).value, 4, 'poles for the attenuation')
  assert.equal(FilteringFormulas.groupdelay(101).value, 50)
  assert.equal(FilteringFormulas.attenuation(4, 3).value, 72)
  assert.equal(FilteringFormulas.bandwidth(12000, 4).value, 3000, 'band around the centre')
  assert.equal(FilteringFormulas.passband(1000, 3000).value, 0)
  assert.equal(FilteringFormulas.cutoff(48000, 4).dst, 'signal')
  assert.equal(hexFamiliesOf().get('filtering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'filtering', program: ['cutoff'], params: [48000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12000, `filtering.cutoff at ${uuid}`)
  uuidReceiptOf('filtering cutoff', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cutoff 12000, passband 2000, stopband 4500, rolloff 24, order 4, groupdelay 50, attenuation 72, bandwidth 3000; crossing to signal')
})
