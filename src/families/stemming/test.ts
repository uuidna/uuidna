import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StemmingFormulas } from './index.js'
import '../../mcp/families.js'

test('stemming: affixcount, conflationrate, indexreduction, overstemming, rootratio, stemlength, suffixstripped, understemming — crossing to linguistics', async (t) => {
  assert.equal(StemmingFormulas.affixcount(12, 18).value, 30, 'prefixes plus suffixes')
  assert.equal(StemmingFormulas.conflationrate(30, 120).value, 25)
  assert.equal(StemmingFormulas.indexreduction(1000, 640).value, 360, 'terms removed from the index')
  assert.equal(StemmingFormulas.overstemming(5, 200).value, 2)
  assert.equal(StemmingFormulas.rootratio(50, 200).value, 25, 'roots per hundred words')
  assert.equal(StemmingFormulas.stemlength(7, 3).value, 4, 'running minus ing')
  assert.equal(StemmingFormulas.suffixstripped(12, 5).value, 7)
  assert.equal(StemmingFormulas.understemming(9, 300).value, 3)
  assert.equal(StemmingFormulas.stemlength(3, 7).value, 0, 'suffix longer than word')
  assert.equal(StemmingFormulas.stemlength(7, 3).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('stemming')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stemming', program: ['stemlength'], params: [7, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `stemming.stemlength at ${uuid}`)
  uuidReceiptOf('stemming stemlength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; affixcount 30, conflationrate 25, indexreduction 360, overstemming 2, rootratio 25, stemlength 4, suffixstripped 7, understemming 3; crossing to linguistics')
})
