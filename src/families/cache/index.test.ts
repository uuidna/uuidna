import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CacheFormulas } from './index.js'

/** cache: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('cache: lines, ways, sets, hitpct, tagbits, blocks, levels, combos', async (t) => {
  assert.equal(CacheFormulas.lines(32768, 64).value, 512, 'lines(32768, 64)')
  assert.equal(CacheFormulas.ways(3).value, 8, 'ways(3)')
  assert.equal(CacheFormulas.sets(512, 8).value, 64, 'sets(512, 8)')
  assert.equal(CacheFormulas.hitpct(95, 100).value, 95, 'hitpct(95, 100)')
  assert.equal(CacheFormulas.tagbits(48, 12).value, 36, 'tagbits(48, 12)')
  assert.equal(CacheFormulas.blocks(65536, 64).value, 1024, 'blocks(65536, 64)')
  assert.equal(CacheFormulas.levels(3, 0).value, 3, 'levels(3, 0)')
  assert.equal(CacheFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('cache')?.length, 8)
  for (const [name, params, expected] of [["lines",[32768,64],512],["ways",[3],8],["sets",[512,8],64]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'cache', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `cache.${name} at ${uuid}`)
    uuidReceiptOf(`cache ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "lines=512, ways=8, sets=64")
})
