import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TribologyFormulas } from './index.js'
import '../../mcp/families.js'

test('tribology: friction, wear, lubrication, contact, viscosity, hardness, traction, fatigue — crossing to materials', async (t) => {
  assert.equal(TribologyFormulas.friction(30, 100).value, 30, 'friction coefficient 0.30')
  assert.equal(TribologyFormulas.wear(1000, 50).value, 20)
  assert.equal(TribologyFormulas.lubrication(300, 100).value, 3, 'film ratio')
  assert.equal(TribologyFormulas.contact(5000, 25).value, 200, 'contact pressure')
  assert.equal(TribologyFormulas.viscosity(900, 30).value, 30)
  assert.equal(TribologyFormulas.hardness(1000, 4).value, 250)
  assert.equal(TribologyFormulas.traction(15, 100).value, 15, 'traction coefficient 0.15')
  assert.equal(TribologyFormulas.fatigue(1000000, 500).value, 2000, 'fatigue life')
  assert.equal(TribologyFormulas.friction(1, 0).value, 0, 'guard normal > 0')
  assert.equal(TribologyFormulas.friction(30, 100).dst, 'materials')
  assert.equal(hexFamiliesOf().get('tribology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tribology', program: ['contact'], params: [5000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `tribology.contact at ${uuid}`)
  uuidReceiptOf('tribology contact', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; friction 30, wear 20, lubrication 3, contact 200, viscosity 30, hardness 250, traction 15, fatigue 2000; crossing to materials')
})
