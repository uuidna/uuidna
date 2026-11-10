import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PuppetryFormulas } from './index.js'
import '../../mcp/families.js'

test('puppetry: strings, jointcount, controlbars, manipulators, gesturecombos, articulationpoints, riggingsubsets, motionrange — crossing to kinematics', async (t) => {
  assert.equal(PuppetryFormulas.strings(9, 0).value, 9)
  assert.equal(PuppetryFormulas.jointcount(12, 2).value, 24)
  assert.equal(PuppetryFormulas.controlbars(2, 1).value, 3)
  assert.equal(PuppetryFormulas.manipulators(1, 1).value, 2)
  assert.equal(PuppetryFormulas.gesturecombos(10, 3).value, 120)
  assert.equal(PuppetryFormulas.articulationpoints(8, 2).value, 16)
  assert.equal(PuppetryFormulas.riggingsubsets(4).value, 16)
  assert.equal(PuppetryFormulas.motionrange(180, 2).value, 90)
  assert.equal(PuppetryFormulas.strings(9, 0).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('puppetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'puppetry', program: ['strings'], params: [9, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `puppetry.strings at ${uuid}`)
  uuidReceiptOf('puppetry strings', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; strings 9, jointcount 24, controlbars 3, manipulators 2, gesturecombos 120, articulationpoints 16, riggingsubsets 16, motionrange 90; crossing to kinematics')
})
