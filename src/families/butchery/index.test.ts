import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ButcheryFormulas } from './index.js'
import '../../mcp/families.js'

test('butchery: yield, primalcuts, weightkg, cutcombos, boneratio, aginggraysdays, portionsper, gradescore — crossing to agriculture', async (t) => {
  assert.equal(ButcheryFormulas.yield(60, 100).value, 60)
  assert.equal(ButcheryFormulas.primalcuts(8, 0).value, 8)
  assert.equal(ButcheryFormulas.weightkg(300, 1).value, 300)
  assert.equal(ButcheryFormulas.cutcombos(12, 3).value, 220)
  assert.equal(ButcheryFormulas.boneratio(15, 100).value, 15)
  assert.equal(ButcheryFormulas.aginggraysdays(21, 1).value, 21)
  assert.equal(ButcheryFormulas.portionsper(300, 2).value, 150)
  assert.equal(ButcheryFormulas.gradescore(90, 100).value, 90)
  assert.equal(ButcheryFormulas.yield(60, 100).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('butchery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'butchery', program: ['yield'], params: [60, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `butchery.yield at ${uuid}`)
  uuidReceiptOf('butchery yield', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; yield 60, primalcuts 8, weightkg 300, cutcombos 220, boneratio 15, aginggraysdays 21, portionsper 150, gradescore 90; crossing to agriculture')
})
