import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PayrollFormulas } from './index.js'

/** payroll: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('payroll: gross, net, withholding, employees, overtime, deductions, periods, combos', async (t) => {
  assert.equal(PayrollFormulas.gross(5000, 12).value, 60000, 'gross(5000, 12)')
  assert.equal(PayrollFormulas.net(5000, 1500).value, 3500, 'net(5000, 1500)')
  assert.equal(PayrollFormulas.withholding(25, 100).value, 25, 'withholding(25, 100)')
  assert.equal(PayrollFormulas.employees(100, 1).value, 100, 'employees(100, 1)')
  assert.equal(PayrollFormulas.overtime(10, 45).value, 450, 'overtime(10, 45)')
  assert.equal(PayrollFormulas.deductions(500, 200).value, 700, 'deductions(500, 200)')
  assert.equal(PayrollFormulas.periods(26, 0).value, 26, 'periods(26, 0)')
  assert.equal(PayrollFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('payroll')?.length, 8)
  for (const [name, params, expected] of [["gross",[5000,12],60000],["net",[5000,1500],3500],["withholding",[25,100],25]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'payroll', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `payroll.${name} at ${uuid}`)
    uuidReceiptOf(`payroll ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "gross=60000, net=3500, withholding=25")
})
