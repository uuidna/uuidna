import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ToxFormulas } from './index.js'
import '../../mcp/families.js'

test('tox: dose, half-life, clearance, margin, exposure, limit, LD50, onset — into evidence', async (t) => {
  assert.equal(ToxFormulas.dose(50, 6).value, 300, 'concentration over volume')
  assert.equal(ToxFormulas.halflife(800, 3).value, 100, 'three half-lives')
  assert.equal(ToxFormulas.clearance(1000, 50, 10).value, 500, 'linear clearance')
  assert.equal(ToxFormulas.clearance(100, 50, 10).value, 0, 'cleared to zero')
  assert.equal(ToxFormulas.margin(1000, 200).value, 500, 'a five-fold margin of safety')
  assert.equal(ToxFormulas.exposure(5, 4, 8).value, 160, 'cumulative exposure')
  assert.equal(ToxFormulas.threshold(120, 100).value, 1, 'over the permissible limit')
  assert.equal(ToxFormulas.threshold(80, 100).value, 0)
  assert.equal(ToxFormulas.ld(60, 200).value, 30, '30% of LD50')
  assert.equal(ToxFormulas.onset(600, 50).value, 12)
  assert.equal(ToxFormulas.dose(50, 6).dst, 'evidence')
  assert.equal(hexFamiliesOf().get('tox')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tox', program: ['halflife'], params: [800, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `tox.halflife at ${uuid}`)
  uuidReceiptOf('tox halflife', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 300, halflife 100, clearance 500, margin 500, exposure 160, threshold 1, ld 30, onset 12; crossing to evidence')
})
