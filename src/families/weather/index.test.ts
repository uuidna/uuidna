import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WeatherFormulas } from './index.js'
import '../../mcp/families.js'

test('weather: heatindex, windchill, dewpoint, pressure, precipitation, humidity, visibility, uv — crossing to environment', async (t) => {
  assert.equal(WeatherFormulas.heatindex(30, 80).value, 38, 'heat you feel')
  assert.equal(WeatherFormulas.windchill(10, 50).value, 5)
  assert.equal(WeatherFormulas.windchill(3, 90).value, 0, 'never below zero')
  assert.equal(WeatherFormulas.dewpoint(25, 50).value, 15)
  assert.equal(WeatherFormulas.pressure(1013, 800).value, 913)
  assert.equal(WeatherFormulas.pressure(50, 8000).value, 0, 'never below zero')
  assert.equal(WeatherFormulas.precipitation(60, 4).value, 15, 'millimetres an hour')
  assert.equal(WeatherFormulas.humidity(40, 50).value, 80)
  assert.equal(WeatherFormulas.visibility(12).value, 12)
  assert.equal(WeatherFormulas.uv(7).value, 7)
  assert.equal(WeatherFormulas.heatindex(30, 80).dst, 'environment')
  assert.equal(hexFamiliesOf().get('weather')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'weather', program: ['heatindex'], params: [30, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 38, `weather.heatindex at ${uuid}`)
  uuidReceiptOf('weather heatindex', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heatindex 38, windchill 5/0, dewpoint 15, pressure 913/0, precipitation 15, humidity 80, visibility 12, uv 7; crossing to environment')
})
