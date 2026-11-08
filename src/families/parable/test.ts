import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ParableFormulas } from './index.js'
import '../../mcp/families.js'

test('parable: elementcount, interpretationpaths, symbolpairs, meaninglayers, charactercount, motifcombos, narrativeorderings, moralcount — crossing to linguistics', async (t) => {
  assert.equal(ParableFormulas.elementcount(3, 2).value, 5)
  assert.equal(ParableFormulas.interpretationpaths(4).value, 24)
  assert.equal(ParableFormulas.symbolpairs(7, 2).value, 21)
  assert.equal(ParableFormulas.meaninglayers(4).value, 16)
  assert.equal(ParableFormulas.charactercount(3, 2).value, 5)
  assert.equal(ParableFormulas.motifcombos(8, 3).value, 56)
  assert.equal(ParableFormulas.narrativeorderings(5, 3).value, 60)
  assert.equal(ParableFormulas.moralcount(1, 3).value, 3)
  assert.equal(ParableFormulas.elementcount(3, 2).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('parable')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'parable', program: ['elementcount'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `parable.elementcount at ${uuid}`)
  uuidReceiptOf('parable elementcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; elementcount 5, interpretationpaths 24, symbolpairs 21, meaninglayers 16, charactercount 5, motifcombos 56, narrativeorderings 60, moralcount 3; crossing to linguistics')
})
