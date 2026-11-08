import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EpidemiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('epidemiology: r0, incidence, prevalence, attack, fatality, herd, doubling, vaccine — crossing to med', async (t) => {
  assert.equal(EpidemiologyFormulas.r0(10, 30).value, 3, 'three new cases per case')
  assert.equal(EpidemiologyFormulas.incidence(50, 100000).value, 50, 'per 100k')
  assert.equal(EpidemiologyFormulas.prevalence(200, 1000).value, 20)
  assert.equal(EpidemiologyFormulas.attack(45, 100).value, 45)
  assert.equal(EpidemiologyFormulas.fatality(2, 100).value, 2)
  assert.equal(EpidemiologyFormulas.herd(4).value, 75, 'herd-immunity threshold from R0')
  assert.equal(EpidemiologyFormulas.doubling(300, 150).value, 150)
  assert.equal(EpidemiologyFormulas.doubling(100, 150).value, 0)
  assert.equal(EpidemiologyFormulas.vaccine(95, 100).value, 95, 'efficacy')
  assert.equal(EpidemiologyFormulas.r0(10, 30).dst, 'med')
  assert.equal(hexFamiliesOf().get('epidemiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'epidemiology', program: ['r0'], params: [10, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `epidemiology.r0 at ${uuid}`)
  uuidReceiptOf('epidemiology r0', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; r0 3, incidence 50, prevalence 20, attack 45, fatality 2, herd 75, doubling 150, vaccine 95; crossing to med')
})
