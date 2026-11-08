import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OnomasticsFormulas } from './index.js'
import '../../mcp/families.js'

test('onomastics: namecount, surnamepairs, orderingchoices, frequencyrank, patronymiclayers, etymsubsets, variantspellings, distributionratio — crossing to linguistics', async (t) => {
  assert.equal(OnomasticsFormulas.namecount(1000, 2).value, 2000)
  assert.equal(OnomasticsFormulas.surnamepairs(50, 2).value, 1225)
  assert.equal(OnomasticsFormulas.orderingchoices(5).value, 120)
  assert.equal(OnomasticsFormulas.frequencyrank(1000, 10).value, 100)
  assert.equal(OnomasticsFormulas.patronymiclayers(3, 1).value, 4)
  assert.equal(OnomasticsFormulas.etymsubsets(5).value, 32)
  assert.equal(OnomasticsFormulas.variantspellings(20, 3).value, 60)
  assert.equal(OnomasticsFormulas.distributionratio(40, 100).value, 40)
  assert.equal(OnomasticsFormulas.namecount(1000, 2).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('onomastics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'onomastics', program: ['namecount'], params: [1000, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `onomastics.namecount at ${uuid}`)
  uuidReceiptOf('onomastics namecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; namecount 2000, surnamepairs 1225, orderingchoices 120, frequencyrank 100, patronymiclayers 4, etymsubsets 32, variantspellings 60, distributionratio 40; crossing to linguistics')
})
