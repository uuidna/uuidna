import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GrammarFormulas } from './index.js'
import '../../mcp/families.js'

test('grammar: rules, posclasses, parsepaths, rulecombos, phrasestructuresubsets, agreementfeatures, recursiondepth, grammaticalityratio — crossing to linguistics', async (t) => {
  assert.equal(GrammarFormulas.rules(100, 3).value, 300)
  assert.equal(GrammarFormulas.posclasses(8, 0).value, 8)
  assert.equal(GrammarFormulas.parsepaths(5).value, 120)
  assert.equal(GrammarFormulas.rulecombos(12, 3).value, 220)
  assert.equal(GrammarFormulas.phrasestructuresubsets(6).value, 64)
  assert.equal(GrammarFormulas.agreementfeatures(3, 2).value, 5)
  assert.equal(GrammarFormulas.recursiondepth(5, 0).value, 5)
  assert.equal(GrammarFormulas.grammaticalityratio(90, 100).value, 90)
  assert.equal(GrammarFormulas.rules(100, 3).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('grammar')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'grammar', program: ['rules'], params: [100, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `grammar.rules at ${uuid}`)
  uuidReceiptOf('grammar rules', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rules 300, posclasses 8, parsepaths 120, rulecombos 220, phrasestructuresubsets 64, agreementfeatures 5, recursiondepth 5, grammaticalityratio 90; crossing to linguistics')
})
