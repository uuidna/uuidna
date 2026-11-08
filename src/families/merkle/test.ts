import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MerkleFormulas } from './index.js'
import '../../mcp/families.js'

test('merkle: leaves, treeheight, proofsize, hashcombos, nodecount, siblingpairs, rootpaths, verificationsteps — crossing to graphtheory', async (t) => {
  assert.equal(MerkleFormulas.leaves(4).value, 16)
  assert.equal(MerkleFormulas.treeheight(4, 0).value, 4)
  assert.equal(MerkleFormulas.proofsize(4, 32).value, 128)
  assert.equal(MerkleFormulas.hashcombos(8, 2).value, 28)
  assert.equal(MerkleFormulas.nodecount(2, 15).value, 30)
  assert.equal(MerkleFormulas.siblingpairs(16, 2).value, 120)
  assert.equal(MerkleFormulas.rootpaths(4, 2).value, 12)
  assert.equal(MerkleFormulas.verificationsteps(4, 1).value, 5)
  assert.equal(MerkleFormulas.leaves(4).dst, 'graphtheory')
  assert.equal(hexFamiliesOf().get('merkle')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'merkle', program: ['leaves'], params: [4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `merkle.leaves at ${uuid}`)
  uuidReceiptOf('merkle leaves', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; leaves 16, treeheight 4, proofsize 128, hashcombos 28, nodecount 30, siblingpairs 120, rootpaths 12, verificationsteps 5; crossing to graphtheory')
})
