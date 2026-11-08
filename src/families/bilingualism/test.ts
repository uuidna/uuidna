import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BilingualismFormulas } from './index.js'
import '../../mcp/families.js'

test('bilingualism: balanceindex, codeswitchrate, dominanceratio, exposurehours, interferencerate, lexicalaccess, proficiencygap, transferrate — crossing to cognition', async (t) => {
  assert.equal(BilingualismFormulas.balanceindex(60, 40).value, 80, 'near-balanced bilingual')
  assert.equal(BilingualismFormulas.codeswitchrate(15, 200).value, 7)
  assert.equal(BilingualismFormulas.dominanceratio(70, 30).value, 70, 'L1 dominant')
  assert.equal(BilingualismFormulas.exposurehours(365, 4).value, 1460, 'a year of daily exposure')
  assert.equal(BilingualismFormulas.interferencerate(12, 300).value, 4)
  assert.equal(BilingualismFormulas.lexicalaccess(6000, 50).value, 120)
  assert.equal(BilingualismFormulas.proficiencygap(90, 75).value, 15)
  assert.equal(BilingualismFormulas.proficiencygap(50, 80).value, 0, 'no lead when L2 is stronger')
  assert.equal(BilingualismFormulas.transferrate(8, 40).value, 20)
  assert.equal(BilingualismFormulas.dominanceratio(70, 30).dst, 'cognition')
  assert.equal(hexFamiliesOf().get('bilingualism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bilingualism', program: ['dominanceratio'], params: [70, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 70, `bilingualism.dominanceratio at ${uuid}`)
  uuidReceiptOf('bilingualism dominanceratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; balanceindex 80, codeswitchrate 7, dominanceratio 70, exposurehours 1460, interferencerate 4, lexicalaccess 120, proficiencygap 15, transferrate 20; crossing to cognition')
})
