import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MysticismFormulas } from './index.js'
import '../../mcp/families.js'

test('mysticism: stages, ascentorderings, unionstates, virtuecombos, contemplationlevels, darknesslight, numberpaths, illuminationratio — crossing to philosophy', async (t) => {
  assert.equal(MysticismFormulas.stages(3, 4).value, 7)
  assert.equal(MysticismFormulas.ascentorderings(7).value, 5040)
  assert.equal(MysticismFormulas.unionstates(5).value, 32)
  assert.equal(MysticismFormulas.virtuecombos(7, 3).value, 35)
  assert.equal(MysticismFormulas.contemplationlevels(3, 3).value, 9)
  assert.equal(MysticismFormulas.darknesslight(100, 40).value, 60)
  assert.equal(MysticismFormulas.numberpaths(10, 3).value, 720)
  assert.equal(MysticismFormulas.illuminationratio(70, 100).value, 70)
  assert.equal(MysticismFormulas.stages(3, 4).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('mysticism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mysticism', program: ['stages'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7, `mysticism.stages at ${uuid}`)
  uuidReceiptOf('mysticism stages', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stages 7, ascentorderings 5040, unionstates 32, virtuecombos 35, contemplationlevels 9, darknesslight 60, numberpaths 720, illuminationratio 70; crossing to philosophy')
})
