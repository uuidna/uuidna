import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExegesisFormulas } from './index.js'
import '../../mcp/families.js'

test('exegesis: senseoptions, lexemecombos, parsepaths, morphemecount, variantreadings, clauseorderings, rootmatches, semanticrange — crossing to linguistics', async (t) => {
  assert.equal(ExegesisFormulas.senseoptions(5).value, 32)
  assert.equal(ExegesisFormulas.lexemecombos(15, 2).value, 105)
  assert.equal(ExegesisFormulas.parsepaths(4).value, 24)
  assert.equal(ExegesisFormulas.morphemecount(12, 3).value, 36)
  assert.equal(ExegesisFormulas.variantreadings(40, 12).value, 52)
  assert.equal(ExegesisFormulas.clauseorderings(5, 3).value, 60)
  assert.equal(ExegesisFormulas.rootmatches(300, 15).value, 20)
  assert.equal(ExegesisFormulas.semanticrange(90, 30).value, 60)
  assert.equal(ExegesisFormulas.senseoptions(5).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('exegesis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'exegesis', program: ['senseoptions'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `exegesis.senseoptions at ${uuid}`)
  uuidReceiptOf('exegesis senseoptions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; senseoptions 32, lexemecombos 105, parsepaths 24, morphemecount 36, variantreadings 52, clauseorderings 60, rootmatches 20, semanticrange 60; crossing to linguistics')
})
