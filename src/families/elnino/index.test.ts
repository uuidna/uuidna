import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElninoFormulas } from './index.js'
import '../../mcp/families.js'

test('elnino: oni, ssttanomaly, phasecount, cycleyears, teleconnections, intensityindex, durationmonths, rainfallshift — crossing to climate', async (t) => {
  assert.equal(ElninoFormulas.oni(20, 10).value, 2)
  assert.equal(ElninoFormulas.ssttanomaly(30, 25).value, 5)
  assert.equal(ElninoFormulas.phasecount(2, 1).value, 3)
  assert.equal(ElninoFormulas.cycleyears(3, 4).value, 7)
  assert.equal(ElninoFormulas.teleconnections(12, 2).value, 24)
  assert.equal(ElninoFormulas.intensityindex(80, 100).value, 80)
  assert.equal(ElninoFormulas.durationmonths(9, 3).value, 12)
  assert.equal(ElninoFormulas.rainfallshift(100, 40).value, 60)
  assert.equal(ElninoFormulas.oni(20, 10).dst, 'climate')
  assert.equal(hexFamiliesOf().get('elnino')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'elnino', program: ['oni'], params: [20, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `elnino.oni at ${uuid}`)
  uuidReceiptOf('elnino oni', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; oni 2, ssttanomaly 5, phasecount 3, cycleyears 7, teleconnections 24, intensityindex 80, durationmonths 12, rainfallshift 60; crossing to climate')
})
