import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TreeFormulas } from './index.js'

/** tree: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('tree: nodes, height, leaves, internal, children, paths, depth, subsets', async (t) => {
  assert.equal(TreeFormulas.nodes(32, 1).value, 31, 'nodes(32, 1)')
  assert.equal(TreeFormulas.height(100, 10).value, 10, 'height(100, 10)')
  assert.equal(TreeFormulas.leaves(4).value, 16, 'leaves(4)')
  assert.equal(TreeFormulas.internal(31, 16).value, 15, 'internal(31, 16)')
  assert.equal(TreeFormulas.children(2, 5).value, 10, 'children(2, 5)')
  assert.equal(TreeFormulas.paths(16, 1).value, 16, 'paths(16, 1)')
  assert.equal(TreeFormulas.depth(4, 0).value, 4, 'depth(4, 0)')
  assert.equal(TreeFormulas.subsets(5).value, 32, 'subsets(5)')
  assert.equal(hexFamiliesOf().get('tree')?.length, 8)
  for (const [name, params, expected] of [["nodes",[32,1],31],["height",[100,10],10],["leaves",[4],16]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'tree', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `tree.${name} at ${uuid}`)
    uuidReceiptOf(`tree ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "nodes=31, height=10, leaves=16")
})
