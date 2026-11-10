import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmpiricismFormulas } from './index.js'
import '../../mcp/families.js'

test('empiricism: observations, inductionsteps, evidencecombos, hypothesissubsets, confirmationratio, samplepairs, generalizationpaths, certaintydegree — crossing to logic', async (t) => {
  assert.equal(EmpiricismFormulas.observations(100, 5).value, 500)
  assert.equal(EmpiricismFormulas.inductionsteps(3, 2).value, 5)
  assert.equal(EmpiricismFormulas.evidencecombos(10, 3).value, 120)
  assert.equal(EmpiricismFormulas.hypothesissubsets(5).value, 32)
  assert.equal(EmpiricismFormulas.confirmationratio(70, 100).value, 70)
  assert.equal(EmpiricismFormulas.samplepairs(12, 2).value, 66)
  assert.equal(EmpiricismFormulas.generalizationpaths(6, 2).value, 30)
  assert.equal(EmpiricismFormulas.certaintydegree(60, 100).value, 60)
  assert.equal(EmpiricismFormulas.observations(100, 5).dst, 'logic')
  assert.equal(hexFamiliesOf().get('empiricism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'empiricism', program: ['observations'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `empiricism.observations at ${uuid}`)
  uuidReceiptOf('empiricism observations', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; observations 500, inductionsteps 5, evidencecombos 120, hypothesissubsets 32, confirmationratio 70, samplepairs 66, generalizationpaths 30, certaintydegree 60; crossing to logic')
})
