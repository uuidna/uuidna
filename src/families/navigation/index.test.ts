import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NavigationFormulas } from './index.js'
import '../../mcp/families.js'

test('navigation: bearing, distance, eta, crosstrack, dilution, waypoint, heading, accuracy — crossing to transport', async (t) => {
  assert.equal(NavigationFormulas.bearing(450).value, 90, 'bearing wraps the compass circle')
  assert.equal(NavigationFormulas.distance(60, 3).value, 180)
  assert.equal(NavigationFormulas.eta(180, 60).value, 3, 'three hours still to run')
  assert.equal(NavigationFormulas.crosstrack(5, 100).value, 5)
  assert.equal(NavigationFormulas.dilution(12, 4).value, 3)
  assert.equal(NavigationFormulas.waypoint(3, 10).value, 30, 'three tenths of the route done')
  assert.equal(NavigationFormulas.heading(350, 20).value, 10, 'drift carried past north')
  assert.equal(NavigationFormulas.accuracy(95, 100).value, 95)
  assert.equal(NavigationFormulas.bearing(450).dst, 'transport')
  assert.equal(hexFamiliesOf().get('navigation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'navigation', program: ['heading'], params: [350, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `navigation.heading at ${uuid}`)
  uuidReceiptOf('navigation heading', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bearing 90, distance 180, eta 3, crosstrack 5, dilution 3, waypoint 30, heading 10, accuracy 95; crossing to transport')
})
