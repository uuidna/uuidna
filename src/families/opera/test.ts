import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OperaFormulas } from './index.js'
import '../../mcp/families.js'

test('opera: acts, arias, voicetypes, ensemblecombos, orchestrasize, scoreorderings, rangeoctaves, dynamicspan — crossing to music', async (t) => {
  assert.equal(OperaFormulas.acts(3, 1).value, 4)
  assert.equal(OperaFormulas.arias(8, 2).value, 16)
  assert.equal(OperaFormulas.voicetypes(6, 0).value, 6)
  assert.equal(OperaFormulas.ensemblecombos(8, 2).value, 28)
  assert.equal(OperaFormulas.orchestrasize(60, 1).value, 60)
  assert.equal(OperaFormulas.scoreorderings(5).value, 120)
  assert.equal(OperaFormulas.rangeoctaves(48, 12).value, 4)
  assert.equal(OperaFormulas.dynamicspan(100, 20).value, 80)
  assert.equal(OperaFormulas.acts(3, 1).dst, 'music')
  assert.equal(hexFamiliesOf().get('opera')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'opera', program: ['acts'], params: [3, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `opera.acts at ${uuid}`)
  uuidReceiptOf('opera acts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acts 4, arias 16, voicetypes 6, ensemblecombos 28, orchestrasize 60, scoreorderings 120, rangeoctaves 4, dynamicspan 80; crossing to music')
})
