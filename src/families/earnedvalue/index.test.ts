import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EarnedvalueFormulas } from './index.js'
import '../../mcp/families.js'

test('earnedvalue: cpi, spi, costvariance, schedulevariance, eac, etc, tcpi, vac — crossing to econ', async (t) => {
  assert.equal(EarnedvalueFormulas.cpi(800, 1000).value, 80, 'under cost: 0.80 index')
  assert.equal(EarnedvalueFormulas.spi(900, 1000).value, 90)
  assert.equal(EarnedvalueFormulas.costvariance(1200, 1000).value, 200, 'ahead on cost')
  assert.equal(EarnedvalueFormulas.schedulevariance(1000, 900).value, 100)
  assert.equal(EarnedvalueFormulas.eac(2000, 1000, 800).value, 2500, 'estimate at completion')
  assert.equal(EarnedvalueFormulas.etc(2000, 800).value, 1200)
  assert.equal(EarnedvalueFormulas.tcpi(2000, 800, 1000).value, 120, 'to-complete index')
  assert.equal(EarnedvalueFormulas.vac(2000, 1800).value, 200, 'variance at completion')
  assert.equal(EarnedvalueFormulas.cpi(800, 0).value, 0)
  assert.equal(EarnedvalueFormulas.cpi(800, 1000).dst, 'econ')
  assert.equal(hexFamiliesOf().get('earnedvalue')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'earnedvalue', program: ['cpi'], params: [800, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `earnedvalue.cpi at ${uuid}`)
  uuidReceiptOf('earnedvalue cpi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cpi 80, spi 90, costvariance 200, schedulevariance 100, eac 2500, etc 1200, tcpi 120, vac 200; crossing to econ')
})
