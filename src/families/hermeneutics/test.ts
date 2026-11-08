import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HermeneuticsFormulas } from './index.js'
import '../../mcp/families.js'

test('hermeneutics: interpretivelayers, methodcombos, contextfactors, principleorderings, ambiguityspread, lensselections, framingchoices, consensusratio — crossing to philosophy', async (t) => {
  assert.equal(HermeneuticsFormulas.interpretivelayers(6).value, 64)
  assert.equal(HermeneuticsFormulas.methodcombos(8, 3).value, 56)
  assert.equal(HermeneuticsFormulas.contextfactors(3, 4, 2).value, 9)
  assert.equal(HermeneuticsFormulas.principleorderings(5).value, 120)
  assert.equal(HermeneuticsFormulas.ambiguityspread(100, 60).value, 40)
  assert.equal(HermeneuticsFormulas.lensselections(10, 4).value, 210)
  assert.equal(HermeneuticsFormulas.framingchoices(6, 2).value, 30)
  assert.equal(HermeneuticsFormulas.consensusratio(70, 100).value, 70)
  assert.equal(HermeneuticsFormulas.interpretivelayers(6).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('hermeneutics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hermeneutics', program: ['interpretivelayers'], params: [6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `hermeneutics.interpretivelayers at ${uuid}`)
  uuidReceiptOf('hermeneutics interpretivelayers', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; interpretivelayers 64, methodcombos 56, contextfactors 9, principleorderings 120, ambiguityspread 40, lensselections 210, framingchoices 30, consensusratio 70; crossing to philosophy')
})
