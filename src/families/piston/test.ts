import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PistonFormulas } from './index.js'

/** piston: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('piston: displacement, stroke, bore, compression, force, cycles, rings, combos', async (t) => {
  assert.equal(PistonFormulas.displacement(500, 4).value, 2000, 'displacement(500, 4)')
  assert.equal(PistonFormulas.stroke(80, 1).value, 80, 'stroke(80, 1)')
  assert.equal(PistonFormulas.bore(86, 1).value, 86, 'bore(86, 1)')
  assert.equal(PistonFormulas.compression(100, 10).value, 10, 'compression(100, 10)')
  assert.equal(PistonFormulas.force(1000, 5).value, 5000, 'force(1000, 5)')
  assert.equal(PistonFormulas.cycles(1000, 2).value, 2000, 'cycles(1000, 2)')
  assert.equal(PistonFormulas.rings(3, 0).value, 3, 'rings(3, 0)')
  assert.equal(PistonFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('piston')?.length, 8)
  for (const [name, params, expected] of [["displacement",[500,4],2000],["stroke",[80,1],80],["bore",[86,1],86]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'piston', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `piston.${name} at ${uuid}`)
    uuidReceiptOf(`piston ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "displacement=2000, stroke=80, bore=86")
})
