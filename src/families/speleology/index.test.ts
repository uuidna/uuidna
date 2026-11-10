import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpeleologyFormulas } from './index.js'
import '../../mcp/families.js'

test('speleology: depth, extent, speleothem, dissolution, survey, gradient, humidity, chambers — crossing to geology', async (t) => {
  assert.equal(SpeleologyFormulas.depth(2197).value, 2197, 'meters below the entrance')
  assert.equal(SpeleologyFormulas.extent(12, 50).value, 600, 'passages times segment length')
  assert.equal(SpeleologyFormulas.speleothem(100, 4).value, 25, 'growth time at the rate')
  assert.equal(SpeleologyFormulas.dissolution(30, 200).value, 15)
  assert.equal(SpeleologyFormulas.survey(750, 1000).value, 75)
  assert.equal(SpeleologyFormulas.gradient(45, 300).value, 15)
  assert.equal(SpeleologyFormulas.humidity(95, 100).value, 95)
  assert.equal(SpeleologyFormulas.chambers(42).value, 42)
  assert.equal(SpeleologyFormulas.depth(2197).dst, 'geology')
  assert.equal(hexFamiliesOf().get('speleology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'speleology', program: ['extent'], params: [12, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `speleology.extent at ${uuid}`)
  uuidReceiptOf('speleology extent', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 2197, extent 600, speleothem 25, dissolution 15, survey 75, gradient 15, humidity 95, chambers 42; crossing to geology')
})
