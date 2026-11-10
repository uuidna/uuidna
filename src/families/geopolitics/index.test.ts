import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeopoliticsFormulas } from './index.js'
import '../../mcp/families.js'

test('geopolitics: powerindex, allianceweight, tradedependency, bordertension, influencescore, sanctionimpact, balanceofpower, stabilityindex — crossing to governance', async (t) => {
  assert.equal(GeopoliticsFormulas.powerindex(50, 30, 20).value, 100, 'composite of three capability scores')
  assert.equal(GeopoliticsFormulas.allianceweight(12, 8).value, 96)
  assert.equal(GeopoliticsFormulas.tradedependency(250, 1000).value, 25, 'a quarter of trade on imports')
  assert.equal(GeopoliticsFormulas.bordertension(100, 30).value, 3)
  assert.equal(GeopoliticsFormulas.influencescore(15, 4).value, 60, 'allies weighted by votes')
  assert.equal(GeopoliticsFormulas.sanctionimpact(1000, 300).value, 700)
  assert.equal(GeopoliticsFormulas.balanceofpower(600, 400).value, 150)
  assert.equal(GeopoliticsFormulas.stabilityindex(70, 85).value, 1, 'stability target met')
  assert.equal(GeopoliticsFormulas.stabilityindex(70, 50).value, 0)
  assert.equal(GeopoliticsFormulas.powerindex(50, 30, 20).dst, 'governance')
  assert.equal(hexFamiliesOf().get('geopolitics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geopolitics', program: ['powerindex'], params: [50, 30, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `geopolitics.powerindex at ${uuid}`)
  uuidReceiptOf('geopolitics powerindex', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; powerindex 100, allianceweight 96, tradedependency 25, bordertension 3, influencescore 60, sanctionimpact 700, balanceofpower 150, stabilityindex 1; crossing to governance')
})
