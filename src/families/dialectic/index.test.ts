import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DialecticFormulas } from './index.js'
import '../../mcp/families.js'

test('dialectic: thesisantithesis, syntheses, argumentpairs, stageorderings, contradictioncount, premisepaths, resolutiondepth, validmoves — crossing to logic', async (t) => {
  assert.equal(DialecticFormulas.thesisantithesis(1, 1).value, 2)
  assert.equal(DialecticFormulas.syntheses(3, 3).value, 9)
  assert.equal(DialecticFormulas.argumentpairs(10, 2).value, 45)
  assert.equal(DialecticFormulas.stageorderings(4).value, 24)
  assert.equal(DialecticFormulas.contradictioncount(20, 14).value, 6)
  assert.equal(DialecticFormulas.premisepaths(6, 3).value, 120)
  assert.equal(DialecticFormulas.resolutiondepth(3, 2).value, 5)
  assert.equal(DialecticFormulas.validmoves(4).value, 16)
  assert.equal(DialecticFormulas.thesisantithesis(1, 1).dst, 'logic')
  assert.equal(hexFamiliesOf().get('dialectic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dialectic', program: ['thesisantithesis'], params: [1, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `dialectic.thesisantithesis at ${uuid}`)
  uuidReceiptOf('dialectic thesisantithesis', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thesisantithesis 2, syntheses 9, argumentpairs 45, stageorderings 24, contradictioncount 6, premisepaths 120, resolutiondepth 5, validmoves 16; crossing to logic')
})
