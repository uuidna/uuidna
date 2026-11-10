import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MonsoonFormulas } from './index.js'
import '../../mcp/families.js'

test('monsoon: onsetday, rainfall, durationdays, windreversal, intensityindex, rainydays, deficitpct, cyclelength — crossing to climate', async (t) => {
  assert.equal(MonsoonFormulas.onsetday(150, 10).value, 160)
  assert.equal(MonsoonFormulas.rainfall(800, 1).value, 800)
  assert.equal(MonsoonFormulas.durationdays(120, 0).value, 120)
  assert.equal(MonsoonFormulas.windreversal(180, 90).value, 180)
  assert.equal(MonsoonFormulas.intensityindex(70, 100).value, 70)
  assert.equal(MonsoonFormulas.rainydays(120, 2).value, 60)
  assert.equal(MonsoonFormulas.deficitpct(20, 100).value, 20)
  assert.equal(MonsoonFormulas.cyclelength(12, 1).value, 12)
  assert.equal(MonsoonFormulas.onsetday(150, 10).dst, 'climate')
  assert.equal(hexFamiliesOf().get('monsoon')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'monsoon', program: ['onsetday'], params: [150, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 160, `monsoon.onsetday at ${uuid}`)
  uuidReceiptOf('monsoon onsetday', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; onsetday 160, rainfall 800, durationdays 120, windreversal 180, intensityindex 70, rainydays 60, deficitpct 20, cyclelength 12; crossing to climate')
})
