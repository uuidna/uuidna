import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DewpointFormulas } from './index.js'
import '../../mcp/families.js'

test('dewpoint: approximation, comfortband, condensationlevel, depression, frostpoint, humidityfromdew, lclheight, spread — crossing to climatology', async (t) => {
  assert.equal(DewpointFormulas.approximation(30, 50).value, 20, 'dewpoint from temp and humidity')
  assert.equal(DewpointFormulas.comfortband(15, 10, 20).value, 1, 'within the comfort band')
  assert.equal(DewpointFormulas.comfortband(25, 10, 20).value, 0)
  assert.equal(DewpointFormulas.condensationlevel(30, 20).value, 1250, 'Espy cloud base in metres')
  assert.equal(DewpointFormulas.depression(25, 18).value, 7)
  assert.equal(DewpointFormulas.frostpoint(5, 2).value, 3)
  assert.equal(DewpointFormulas.humidityfromdew(30, 20).value, 50, 'humidity read back from the spread')
  assert.equal(DewpointFormulas.lclheight(30, 20).value, 2280, 'LCL height in feet')
  assert.equal(DewpointFormulas.spread(30, 20).value, 10, 'the dewpoint depression')
  assert.equal(DewpointFormulas.approximation(30, 50).dst, 'climatology')
  assert.equal(hexFamiliesOf().get('dewpoint')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dewpoint', program: ['approximation'], params: [30, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `dewpoint.approximation at ${uuid}`)
  uuidReceiptOf('dewpoint approximation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; approximation 20, comfortband 1, condensationlevel 1250, depression 7, frostpoint 3, humidityfromdew 50, lclheight 2280, spread 10; crossing to climatology')
})
