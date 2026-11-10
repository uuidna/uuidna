import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CheeseFormulas } from './index.js'
import '../../mcp/families.js'

test('cheese: aging, cultureratio, fatindrymatter, moisture, phacidity, rennet, salt, yield — crossing to chemistry', async (t) => {
  assert.equal(CheeseFormulas.aging(90, 2).value, 180, 'flavour over ninety days')
  assert.equal(CheeseFormulas.cultureratio(2, 1000).value, 2, 'starter per mille')
  assert.equal(CheeseFormulas.fatindrymatter(30, 60).value, 50, 'half the dry matter is fat')
  assert.equal(CheeseFormulas.moisture(450, 1000).value, 45)
  assert.equal(CheeseFormulas.phacidity(9, 50).value, 18)
  assert.equal(CheeseFormulas.rennet(1000, 150).value, 7, 'seven doses for the vat')
  assert.equal(CheeseFormulas.rennet(900, 150).value, 6)
  assert.equal(CheeseFormulas.salt(5, 50).value, 10)
  assert.equal(CheeseFormulas.yield(1000, 10).value, 100, 'a hundred from a thousand')
  assert.equal(CheeseFormulas.yield(1000, 10).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('cheese')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cheese', program: ['yield'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `cheese.yield at ${uuid}`)
  uuidReceiptOf('cheese yield', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; aging 180, cultureratio 2, fatindrymatter 50, moisture 45, phacidity 18, rennet 7, salt 10, yield 100; crossing to chemistry')
})
