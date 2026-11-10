import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EclipseFormulas } from './index.js'

/** eclipse: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('eclipse: saros, duration, magnitude, types, path, frequency, contacts, combos', async (t) => {
  assert.equal(EclipseFormulas.saros(18, 0).value, 18, 'saros(18, 0)')
  assert.equal(EclipseFormulas.duration(450, 60).value, 7, 'duration(450, 60)')
  assert.equal(EclipseFormulas.magnitude(100, 100).value, 100, 'magnitude(100, 100)')
  assert.equal(EclipseFormulas.types(3, 0).value, 3, 'types(3, 0)')
  assert.equal(EclipseFormulas.path(100, 1).value, 100, 'path(100, 1)')
  assert.equal(EclipseFormulas.frequency(18, 1).value, 18, 'frequency(18, 1)')
  assert.equal(EclipseFormulas.contacts(4, 0).value, 4, 'contacts(4, 0)')
  assert.equal(EclipseFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('eclipse')?.length, 8)
  for (const [name, params, expected] of [["saros",[18,0],18],["duration",[450,60],7],["magnitude",[100,100],100]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'eclipse', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `eclipse.${name} at ${uuid}`)
    uuidReceiptOf(`eclipse ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "saros=18, duration=7, magnitude=100")
})
