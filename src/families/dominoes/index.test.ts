import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DominoesFormulas } from './index.js'
import '../../mcp/families.js'

test('dominoes: distinctpairs, doubles, totaltiles, pips, chainorderings, handsubsets, maxpip, layoutpaths — crossing to combinatorics', async (t) => {
  assert.equal(DominoesFormulas.distinctpairs(7, 2).value, 21)
  assert.equal(DominoesFormulas.doubles(7, 0).value, 7)
  assert.equal(DominoesFormulas.totaltiles(21, 7).value, 28)
  assert.equal(DominoesFormulas.pips(28, 6).value, 168)
  assert.equal(DominoesFormulas.chainorderings(6).value, 720)
  assert.equal(DominoesFormulas.handsubsets(7).value, 128)
  assert.equal(DominoesFormulas.maxpip(6, 0).value, 6)
  assert.equal(DominoesFormulas.layoutpaths(7, 2).value, 42)
  assert.equal(DominoesFormulas.distinctpairs(7, 2).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('dominoes')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dominoes', program: ['distinctpairs'], params: [7, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 21, `dominoes.distinctpairs at ${uuid}`)
  uuidReceiptOf('dominoes distinctpairs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; distinctpairs 21, doubles 7, totaltiles 28, pips 168, chainorderings 720, handsubsets 128, maxpip 6, layoutpaths 42; crossing to combinatorics')
})
