import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BeamFormulas } from './index.js'

/** beam: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('beam: moment, deflection, span, load, supports, sections, safety, combos', async (t) => {
  assert.equal(BeamFormulas.moment(100, 5).value, 500, 'moment(100, 5)')
  assert.equal(BeamFormulas.deflection(1000, 48).value, 20, 'deflection(1000, 48)')
  assert.equal(BeamFormulas.span(6, 1).value, 6, 'span(6, 1)')
  assert.equal(BeamFormulas.load(500, 6).value, 3000, 'load(500, 6)')
  assert.equal(BeamFormulas.supports(2, 1).value, 3, 'supports(2, 1)')
  assert.equal(BeamFormulas.sections(4, 0).value, 4, 'sections(4, 0)')
  assert.equal(BeamFormulas.safety(300, 100).value, 3, 'safety(300, 100)')
  assert.equal(BeamFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('beam')?.length, 8)
  for (const [name, params, expected] of [["moment",[100,5],500],["deflection",[1000,48],20],["span",[6,1],6]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'beam', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `beam.${name} at ${uuid}`)
    uuidReceiptOf(`beam ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "moment=500, deflection=20, span=6")
})
