import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TimeseriesFormulas } from './index.js'
import '../../mcp/families.js'

test('timeseries: movingaverage, trend, seasonalindex, autocorrelation, lag, smoothing, differencing, forecast — crossing to statistics', async (t) => {
  assert.equal(TimeseriesFormulas.movingaverage(100, 4).value, 25, 'a window averaged')
  assert.equal(TimeseriesFormulas.trend(50, 20).value, 30, 'the rise first to last')
  assert.equal(TimeseriesFormulas.seasonalindex(120, 100).value, 120, 'a fifth above the mean')
  assert.equal(TimeseriesFormulas.autocorrelation(80, 100).value, 80)
  assert.equal(TimeseriesFormulas.lag(100, 3).value, 97, 'shifted back three periods')
  assert.equal(TimeseriesFormulas.smoothing(100, 200, 50).value, 150, 'halfway between prev and cur')
  assert.equal(TimeseriesFormulas.differencing(150, 100).value, 50)
  assert.equal(TimeseriesFormulas.forecast(100, 5, 3).value, 115, 'carried three steps ahead')
  assert.equal(TimeseriesFormulas.movingaverage(100, 4).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('timeseries')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'timeseries', program: ['forecast'], params: [100, 5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 115, `timeseries.forecast at ${uuid}`)
  uuidReceiptOf('timeseries forecast', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; movingaverage 25, trend 30, seasonalindex 120, autocorrelation 80, lag 97, smoothing 150, differencing 50, forecast 115; crossing to statistics')
})
