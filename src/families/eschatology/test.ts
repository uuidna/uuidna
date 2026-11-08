import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EschatologyFormulas } from './index.js'
import '../../mcp/families.js'

test('eschatology: stageorderings, scenariocombos, symbolcount, cyclelength, outcomechoices, intervalspan, tribulationphases, numbersum — crossing to philosophy', async (t) => {
  assert.equal(EschatologyFormulas.stageorderings(5).value, 120)
  assert.equal(EschatologyFormulas.scenariocombos(8, 3).value, 56)
  assert.equal(EschatologyFormulas.symbolcount(7, 3).value, 21)
  assert.equal(EschatologyFormulas.cyclelength(7, 70).value, 490)
  assert.equal(EschatologyFormulas.outcomechoices(6).value, 64)
  assert.equal(EschatologyFormulas.intervalspan(1000, 700).value, 300)
  assert.equal(EschatologyFormulas.tribulationphases(3, 4).value, 7)
  assert.equal(EschatologyFormulas.numbersum(6, 6, 6).value, 18)
  assert.equal(EschatologyFormulas.stageorderings(5).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('eschatology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'eschatology', program: ['stageorderings'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `eschatology.stageorderings at ${uuid}`)
  uuidReceiptOf('eschatology stageorderings', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stageorderings 120, scenariocombos 56, symbolcount 21, cyclelength 490, outcomechoices 64, intervalspan 300, tribulationphases 7, numbersum 18; crossing to philosophy')
})
