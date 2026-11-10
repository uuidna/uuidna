import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LocationFormulas } from './index.js'
import '../../mcp/families.js'

test('location: manhattan, chebyshev, box, grid, within, speed, eta, zoom — crossing to cross', async (t) => {
  assert.equal(LocationFormulas.manhattan(3, 4).value, 7)
  assert.equal(LocationFormulas.chebyshev(3, 4).value, 4)
  assert.equal(LocationFormulas.box(30, 40).value, 1200)
  assert.equal(LocationFormulas.grid(275, 100).value, 2, 'the cell index')
  assert.equal(LocationFormulas.within(80, 100).value, 1, 'inside the radius')
  assert.equal(LocationFormulas.within(120, 100).value, 0)
  assert.equal(LocationFormulas.speed(300, 4).value, 75)
  assert.equal(LocationFormulas.eta(300, 75).value, 4)
  assert.equal(LocationFormulas.zoom(2560, 256).value, 10)
  assert.equal(LocationFormulas.manhattan(3, 4).dst, 'cross')
  assert.equal(hexFamiliesOf().get('location')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'location', program: ['box'], params: [30, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `location.box at ${uuid}`)
  uuidReceiptOf('location box', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; manhattan 7, chebyshev 4, box 1200, grid 2, within 1, speed 75, eta 4, zoom 10; crossing to cross')
})
