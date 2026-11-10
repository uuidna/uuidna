import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JetstreamFormulas } from './index.js'
import '../../mcp/families.js'

test('jetstream: windspeed, altitude, latitude, meandercount, waveamplitude, rossbynumber, coresubsets, shearindex — crossing to meteorology', async (t) => {
  assert.equal(JetstreamFormulas.windspeed(100, 2).value, 200)
  assert.equal(JetstreamFormulas.altitude(10, 1000).value, 10000)
  assert.equal(JetstreamFormulas.latitude(50, 10).value, 60)
  assert.equal(JetstreamFormulas.meandercount(5, 3).value, 8)
  assert.equal(JetstreamFormulas.waveamplitude(1000, 4).value, 250)
  assert.equal(JetstreamFormulas.rossbynumber(100, 10).value, 10)
  assert.equal(JetstreamFormulas.coresubsets(4).value, 16)
  assert.equal(JetstreamFormulas.shearindex(60, 100).value, 60)
  assert.equal(JetstreamFormulas.windspeed(100, 2).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('jetstream')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'jetstream', program: ['windspeed'], params: [100, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `jetstream.windspeed at ${uuid}`)
  uuidReceiptOf('jetstream windspeed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; windspeed 200, altitude 10000, latitude 60, meandercount 8, waveamplitude 250, rossbynumber 10, coresubsets 16, shearindex 60; crossing to meteorology')
})
