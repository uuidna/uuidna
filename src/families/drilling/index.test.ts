import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DrillingFormulas } from './index.js'
import '../../mcp/families.js'

test('drilling: ropenetration, mudweight, torque, wob, hydrostatic, annular, bitlife, kick — crossing to geology', async (t) => {
  assert.equal(DrillingFormulas.ropenetration(1200, 10).value, 120, 'footage per hour on bottom')
  assert.equal(DrillingFormulas.mudweight(5200, 100).value, 52)
  assert.equal(DrillingFormulas.torque(500, 12).value, 6000)
  assert.equal(DrillingFormulas.wob(20, 500).value, 10000, 'collars down the hole')
  assert.equal(DrillingFormulas.hydrostatic(10, 10000).value, 5200, 'psi at total depth')
  assert.equal(DrillingFormulas.annular(12, 5).value, 119)
  assert.equal(DrillingFormulas.bitlife(5000, 3200).value, 1800, 'footage the bit has left')
  assert.equal(DrillingFormulas.kick(5500, 5200).value, 300, 'underbalance a kick enters on')
  assert.equal(DrillingFormulas.kick(5000, 5200).value, 0)
  assert.equal(DrillingFormulas.ropenetration(1200, 10).dst, 'geology')
  assert.equal(hexFamiliesOf().get('drilling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'drilling', program: ['ropenetration'], params: [1200, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `drilling.ropenetration at ${uuid}`)
  uuidReceiptOf('drilling ropenetration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ropenetration 120, mudweight 52, torque 6000, wob 10000, hydrostatic 5200, annular 119, bitlife 1800, kick 300; crossing to geology')
})
