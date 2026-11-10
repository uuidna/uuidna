import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DroughtFormulas } from './index.js'
import '../../mcp/families.js'

test('drought: severity, durationmonths, rainfalldeficit, pdsi, affectedarea, waterdeficit, recoverymonths, impactindex — crossing to hydrology', async (t) => {
  assert.equal(DroughtFormulas.severity(3, 4).value, 4)
  assert.equal(DroughtFormulas.durationmonths(12, 6).value, 18)
  assert.equal(DroughtFormulas.rainfalldeficit(800, 300).value, 500)
  assert.equal(DroughtFormulas.pdsi(8, 4).value, 4)
  assert.equal(DroughtFormulas.affectedarea(100, 50).value, 5000)
  assert.equal(DroughtFormulas.waterdeficit(1000, 600).value, 400)
  assert.equal(DroughtFormulas.recoverymonths(6, 3).value, 9)
  assert.equal(DroughtFormulas.impactindex(70, 100).value, 70)
  assert.equal(DroughtFormulas.severity(3, 4).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('drought')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'drought', program: ['severity'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `drought.severity at ${uuid}`)
  uuidReceiptOf('drought severity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; severity 4, durationmonths 18, rainfalldeficit 500, pdsi 4, affectedarea 5000, waterdeficit 400, recoverymonths 9, impactindex 70; crossing to hydrology')
})
