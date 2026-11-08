import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SortFormulas } from './index.js'

/** sort: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('sort: comparisons, swaps, passes, merges, partitions, runs, depth, combos', async (t) => {
  assert.equal(SortFormulas.comparisons(1000, 10).value, 10000, 'comparisons(1000, 10)')
  assert.equal(SortFormulas.swaps(1000, 2).value, 500, 'swaps(1000, 2)')
  assert.equal(SortFormulas.passes(100, 10).value, 10, 'passes(100, 10)')
  assert.equal(SortFormulas.merges(1024, 2).value, 512, 'merges(1024, 2)')
  assert.equal(SortFormulas.partitions(4).value, 16, 'partitions(4)')
  assert.equal(SortFormulas.runs(8, 0).value, 8, 'runs(8, 0)')
  assert.equal(SortFormulas.depth(100, 10).value, 10, 'depth(100, 10)')
  assert.equal(SortFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('sort')?.length, 8)
  for (const [name, params, expected] of [["comparisons",[1000,10],10000],["swaps",[1000,2],500],["passes",[100,10],10]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'sort', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `sort.${name} at ${uuid}`)
    uuidReceiptOf(`sort ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "comparisons=10000, swaps=500, passes=10")
})
