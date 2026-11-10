import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NimFormulas } from './index.js'
import '../../mcp/families.js'

test('nim: heaps, totalstones, movecombos, positionsubsets, grundyvalue, winningmoves, heapmax, parity — crossing to logic', async (t) => {
  assert.equal(NimFormulas.heaps(3, 0).value, 3)
  assert.equal(NimFormulas.totalstones(3, 5, 7).value, 15)
  assert.equal(NimFormulas.movecombos(15, 2).value, 105)
  assert.equal(NimFormulas.positionsubsets(6).value, 64)
  assert.equal(NimFormulas.grundyvalue(15, 4).value, 3)
  assert.equal(NimFormulas.winningmoves(2, 1).value, 3)
  assert.equal(NimFormulas.heapmax(7, 5).value, 7)
  assert.equal(NimFormulas.parity(15, 2).value, 1)
  assert.equal(NimFormulas.heaps(3, 0).dst, 'logic')
  assert.equal(hexFamiliesOf().get('nim')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nim', program: ['heaps'], params: [3, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `nim.heaps at ${uuid}`)
  uuidReceiptOf('nim heaps', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heaps 3, totalstones 15, movecombos 105, positionsubsets 64, grundyvalue 3, winningmoves 3, heapmax 7, parity 1; crossing to logic')
})
