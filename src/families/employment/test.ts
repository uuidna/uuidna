import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmploymentFormulas } from './index.js'
import '../../mcp/families.js'

test('employment: pay, overtime, severance, notice, redundancy, holiday — crossing to law', async (t) => {
  assert.equal(EmploymentFormulas.gross(160, 25).value, 4000)
  assert.equal(EmploymentFormulas.overtimehours(45, 40).value, 5, 'hours above the standard week')
  assert.equal(EmploymentFormulas.overtime(5, 20, 150).value, 150, 'time-and-a-half on five hours')
  assert.equal(EmploymentFormulas.severance(8, 500).value, 4000, 'a week per year')
  assert.equal(EmploymentFormulas.notice(15, 12).value, 12, 'notice capped at twelve weeks')
  assert.equal(EmploymentFormulas.redundancy(15, 500, 12).value, 6000, 'capped years at the weekly wage')
  assert.equal(EmploymentFormulas.holiday(28, 183).value, 14, 'holiday accrued at mid-year')
  assert.equal(EmploymentFormulas.net(4000, 900).value, 3100)
  assert.equal(EmploymentFormulas.gross(160, 25).dst, 'law')
  assert.equal(hexFamiliesOf().get('employment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'employment', program: ['severance'], params: [8, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4000, `employment.severance at ${uuid}`)
  uuidReceiptOf('employment severance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gross 4000, overtimehours 5, overtime 150, severance 4000, notice 12, redundancy 6000, holiday 14, net 3100; crossing to law')
})
