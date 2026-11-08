import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WoodworkingFormulas } from './index.js'
import '../../mcp/families.js'

test('woodworking: boardfeet, expansion, hardness, jointstrength, kerf, moisture, usage, waste — crossing to construction', async (t) => {
  assert.equal(WoodworkingFormulas.boardfeet(96, 12).value, 8, 'a one-inch slab in board-feet')
  assert.equal(WoodworkingFormulas.expansion(100, 5).value, 50)
  assert.equal(WoodworkingFormulas.hardness(1290).value, 1290, 'red oak Janka')
  assert.equal(WoodworkingFormulas.jointstrength(12, 250).value, 3000)
  assert.equal(WoodworkingFormulas.kerf(10, 3).value, 30)
  assert.equal(WoodworkingFormulas.moisture(120, 100).value, 20)
  assert.equal(WoodworkingFormulas.usage(80, 100).value, 80, 'four-fifths off the board')
  assert.equal(WoodworkingFormulas.waste(20, 100).value, 20)
  assert.equal(WoodworkingFormulas.boardfeet(96, 12).dst, 'construction')
  assert.equal(hexFamiliesOf().get('woodworking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'woodworking', program: ['boardfeet'], params: [96, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `woodworking.boardfeet at ${uuid}`)
  uuidReceiptOf('woodworking boardfeet', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; boardfeet 8, expansion 50, hardness 1290, jointstrength 3000, kerf 30, moisture 20, usage 80, waste 20; crossing to construction')
})
