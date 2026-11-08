import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FloricultureFormulas } from './index.js'
import '../../mcp/families.js'

test('floriculture: bloomrate, stemlength, vaselife, yield, spacing, gradeout, petalcount, forcing — crossing to botany', async (t) => {
  assert.equal(FloricultureFormulas.bloomrate(120, 6).value, 20, 'buds opening per day')
  assert.equal(FloricultureFormulas.stemlength(12, 3).value, 36)
  assert.equal(FloricultureFormulas.vaselife(14, 5).value, 9, 'days in the vase')
  assert.equal(FloricultureFormulas.yield(200, 8).value, 1600)
  assert.equal(FloricultureFormulas.spacing(1000, 25).value, 40, 'plants the bed holds')
  assert.equal(FloricultureFormulas.gradeout(500, 40).value, 460)
  assert.equal(FloricultureFormulas.petalcount(5, 8).value, 40)
  assert.equal(FloricultureFormulas.forcing(300, 250).value, 1, 'chill met')
  assert.equal(FloricultureFormulas.forcing(200, 250).value, 0)
  assert.equal(FloricultureFormulas.bloomrate(120, 6).dst, 'botany')
  assert.equal(hexFamiliesOf().get('floriculture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'floriculture', program: ['spacing'], params: [1000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `floriculture.spacing at ${uuid}`)
  uuidReceiptOf('floriculture spacing', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bloomrate 20, stemlength 36, vaselife 9, yield 1600, spacing 40, gradeout 460, petalcount 40, forcing 1; crossing to botany')
})
