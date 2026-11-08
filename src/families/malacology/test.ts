import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MalacologyFormulas } from './index.js'
import '../../mcp/families.js'

test('malacology: shellwhorls, spiralratio, speciescount, radulateeth, chambercount, growthlines, shellcombos, aperturesize — crossing to zoology', async (t) => {
  assert.equal(MalacologyFormulas.shellwhorls(5, 2).value, 7)
  assert.equal(MalacologyFormulas.spiralratio(161, 100).value, 161)
  assert.equal(MalacologyFormulas.speciescount(800, 10).value, 8000)
  assert.equal(MalacologyFormulas.radulateeth(100, 5).value, 500)
  assert.equal(MalacologyFormulas.chambercount(30, 0).value, 30)
  assert.equal(MalacologyFormulas.growthlines(12, 3).value, 36)
  assert.equal(MalacologyFormulas.shellcombos(10, 2).value, 45)
  assert.equal(MalacologyFormulas.aperturesize(100, 4).value, 25)
  assert.equal(MalacologyFormulas.shellwhorls(5, 2).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('malacology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'malacology', program: ['shellwhorls'], params: [5, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7, `malacology.shellwhorls at ${uuid}`)
  uuidReceiptOf('malacology shellwhorls', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shellwhorls 7, spiralratio 161, speciescount 8000, radulateeth 500, chambercount 30, growthlines 36, shellcombos 45, aperturesize 25; crossing to zoology')
})
