import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SemioticsFormulas } from './index.js'
import '../../mcp/families.js'

test('semiotics: signs, signifierpairs, codesubsets, denotationlevels, paradigmorderings, syntagmlength, iconindexsymbol, interpretantratio — crossing to linguistics', async (t) => {
  assert.equal(SemioticsFormulas.signs(50, 30).value, 80)
  assert.equal(SemioticsFormulas.signifierpairs(20, 2).value, 190)
  assert.equal(SemioticsFormulas.codesubsets(6).value, 64)
  assert.equal(SemioticsFormulas.denotationlevels(2, 1).value, 3)
  assert.equal(SemioticsFormulas.paradigmorderings(5).value, 120)
  assert.equal(SemioticsFormulas.syntagmlength(8, 3).value, 24)
  assert.equal(SemioticsFormulas.iconindexsymbol(3, 0).value, 3)
  assert.equal(SemioticsFormulas.interpretantratio(70, 100).value, 70)
  assert.equal(SemioticsFormulas.signs(50, 30).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('semiotics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'semiotics', program: ['signs'], params: [50, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `semiotics.signs at ${uuid}`)
  uuidReceiptOf('semiotics signs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; signs 80, signifierpairs 190, codesubsets 64, denotationlevels 3, paradigmorderings 120, syntagmlength 24, iconindexsymbol 3, interpretantratio 70; crossing to linguistics')
})
