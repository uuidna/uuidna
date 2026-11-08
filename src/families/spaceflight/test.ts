import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpaceflightFormulas } from './index.js'
import '../../mcp/families.js'

test('spaceflight: deltav, escapevelocity, orbitalperiod, payloadfraction, stageorderings, burntime, apogee, twr — crossing to aerospace', async (t) => {
  assert.equal(SpaceflightFormulas.deltav(9400, 1).value, 9400)
  assert.equal(SpaceflightFormulas.escapevelocity(11, 1000).value, 11000)
  assert.equal(SpaceflightFormulas.orbitalperiod(5400, 60).value, 90)
  assert.equal(SpaceflightFormulas.payloadfraction(4, 100).value, 4)
  assert.equal(SpaceflightFormulas.stageorderings(3).value, 6)
  assert.equal(SpaceflightFormulas.burntime(480, 2).value, 240)
  assert.equal(SpaceflightFormulas.apogee(400, 1).value, 400)
  assert.equal(SpaceflightFormulas.twr(150, 100).value, 1)
  assert.equal(SpaceflightFormulas.deltav(9400, 1).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('spaceflight')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'spaceflight', program: ['deltav'], params: [9400, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9400, `spaceflight.deltav at ${uuid}`)
  uuidReceiptOf('spaceflight deltav', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; deltav 9400, escapevelocity 11000, orbitalperiod 90, payloadfraction 4, stageorderings 6, burntime 240, apogee 400, twr 1; crossing to aerospace')
})
