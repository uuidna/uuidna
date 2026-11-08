import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LogogramFormulas } from './index.js'
import '../../mcp/families.js'

test('logogram: symbols, compoundpairs, radicals, strokeorderings, semanticsubsets, readingsper, frequencyrank, literacyratio — crossing to combinatorics', async (t) => {
  assert.equal(LogogramFormulas.symbols(2000, 1).value, 2000)
  assert.equal(LogogramFormulas.compoundpairs(20, 2).value, 190)
  assert.equal(LogogramFormulas.radicals(214, 0).value, 214)
  assert.equal(LogogramFormulas.strokeorderings(5).value, 120)
  assert.equal(LogogramFormulas.semanticsubsets(6).value, 64)
  assert.equal(LogogramFormulas.readingsper(3, 2).value, 5)
  assert.equal(LogogramFormulas.frequencyrank(2000, 10).value, 200)
  assert.equal(LogogramFormulas.literacyratio(95, 100).value, 95)
  assert.equal(LogogramFormulas.symbols(2000, 1).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('logogram')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'logogram', program: ['symbols'], params: [2000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `logogram.symbols at ${uuid}`)
  uuidReceiptOf('logogram symbols', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; symbols 2000, compoundpairs 190, radicals 214, strokeorderings 120, semanticsubsets 64, readingsper 5, frequencyrank 200, literacyratio 95; crossing to combinatorics')
})
