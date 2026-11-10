import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ArachnologyFormulas } from './index.js'
import '../../mcp/families.js'

test('arachnology: legcount, eyearrangements, silkglands, speciescount, webradials, venomtoxins, moltstages, preycombos — crossing to zoology', async (t) => {
  assert.equal(ArachnologyFormulas.legcount(8, 0).value, 8)
  assert.equal(ArachnologyFormulas.eyearrangements(4).value, 24)
  assert.equal(ArachnologyFormulas.silkglands(6, 1).value, 6)
  assert.equal(ArachnologyFormulas.speciescount(500, 10).value, 5000)
  assert.equal(ArachnologyFormulas.webradials(20, 10).value, 30)
  assert.equal(ArachnologyFormulas.venomtoxins(10, 3).value, 120)
  assert.equal(ArachnologyFormulas.moltstages(5, 2).value, 7)
  assert.equal(ArachnologyFormulas.preycombos(8, 2).value, 28)
  assert.equal(ArachnologyFormulas.legcount(8, 0).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('arachnology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'arachnology', program: ['legcount'], params: [8, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `arachnology.legcount at ${uuid}`)
  uuidReceiptOf('arachnology legcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; legcount 8, eyearrangements 24, silkglands 6, speciescount 5000, webradials 30, venomtoxins 120, moltstages 7, preycombos 28; crossing to zoology')
})
