import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EconFormulas } from './index.js'

/** The forensic economist's arithmetic — present/future value, annuity, work-life, lost earnings — each exact. */
test('econ: present/future value, annuity, work-life and life horizons, lost earnings', async (t) => {
  assert.equal(EconFormulas.future(1000, 500, 1).value, 1050, '1000 at 5% for a year is 1050')
  assert.equal(EconFormulas.present(1050, 500, 1).value, 1000, 'the present value undoes it')
  assert.equal(EconFormulas.present(1000, 0, 5).value, 1000, 'no discount, no change')
  assert.equal(EconFormulas.worklife(30).value, 37, 'from 30 to 67')
  assert.equal(EconFormulas.worklife(70).value, 0, 'past retirement')
  assert.equal(EconFormulas.life(40).value, 40, '~80-year horizon')
  assert.equal(EconFormulas.lost(50000, 37).value, 1850000, 'nominal lost earnings')
  assert.ok(Number(EconFormulas.annuity(10000, 500, 10).value) > 70000, 'a 10-year annuity PV at 5%')
  assert.equal(hexFamiliesOf().get('econ')?.length, 6)
  for (const [name, params, expected] of [['future', [1000, 500, 1], 1050], ['worklife', [30], 37], ['lost', [50000, 37], 1850000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'econ', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `econ.${name} at ${uuid}`)
    uuidReceiptOf(`econ ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('6 formulas; FV 1000→1050, worklife 30→37y, lost 50k×37=1.85M, annuity PV')
})
