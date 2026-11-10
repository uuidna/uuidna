import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ImmigrationFormulas } from './index.js'
import '../../mcp/families.js'

test('immigration: points, residence, continuous, quota, sponsorship, overstay, naturalization — crossing to law', async (t) => {
  assert.equal(ImmigrationFormulas.points(50, 20, 20).value, 90, 'a points-based score')
  assert.equal(ImmigrationFormulas.residence(2000, 1825).value, 1, 'five years of residence met')
  assert.equal(ImmigrationFormulas.residence(1000, 1825).value, 0)
  assert.equal(ImmigrationFormulas.continuous(90, 180).value, 1, 'absences within the allowance')
  assert.equal(ImmigrationFormulas.quota(5000, 3000).value, 3000, 'capped by the quota')
  assert.equal(ImmigrationFormulas.sponsorship(40000, 29000).value, 1, 'sponsor meets the income test')
  assert.equal(ImmigrationFormulas.overstay(400, 365).value, 35, 'overstay days')
  assert.equal(ImmigrationFormulas.naturalization(6, 5).value, 1)
  assert.equal(ImmigrationFormulas.dependents(2, 3).value, 5)
  assert.equal(ImmigrationFormulas.points(50, 20, 20).dst, 'law')
  assert.equal(hexFamiliesOf().get('immigration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'immigration', program: ['points'], params: [50, 20, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `immigration.points at ${uuid}`)
  uuidReceiptOf('immigration points', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; points 90, residence 1, continuous 1, quota 3000, sponsorship 1, overstay 35, naturalization 1, dependents 5; crossing to law')
})
