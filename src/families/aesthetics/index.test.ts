import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AestheticsFormulas } from './index.js'
import '../../mcp/families.js'

test('aesthetics: golden, symmetry, balance, contrast, harmony, rhythm, proportion, unity — crossing to layout', async (t) => {
  assert.equal(AestheticsFormulas.golden(1618).value, 1000, 'a width divided by φ')
  assert.equal(AestheticsFormulas.symmetry(45, 50).value, 90)
  assert.equal(AestheticsFormulas.balance(40, 50).value, 80, 'the lighter side over the heavier')
  assert.equal(AestheticsFormulas.contrast(21, 3).value, 7)
  assert.equal(AestheticsFormulas.harmony(3, 4).value, 75)
  assert.equal(AestheticsFormulas.rhythm(12, 4).value, 3, 'elements per interval')
  assert.equal(AestheticsFormulas.proportion(1, 4).value, 25)
  assert.equal(AestheticsFormulas.unity(8, 10).value, 80)
  assert.equal(AestheticsFormulas.golden(1618).dst, 'layout')
  assert.equal(hexFamiliesOf().get('aesthetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aesthetics', program: ['balance'], params: [40, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `aesthetics.balance at ${uuid}`)
  uuidReceiptOf('aesthetics balance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; golden 1000, symmetry 90, balance 80, contrast 7, harmony 75, rhythm 3, proportion 25, unity 80; crossing to layout')
})
