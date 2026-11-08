import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { HoloFormulas } from './index.js'
import '../../mcp/families.js'

/** THE HOLOGRAM, AS FORMULAS. A fragment reaches the whole through one Merkle sibling per level, so a proof over n
 *  scales is ⌈log₂ n⌉ deep; and splicing a fragment needs a hash collision, so forgery is the birthday bound
 *  2^−(hashBits/2). Exact; crossing hologram → merkle and hologram → qsec. */
test('holo: the proof depth is ⌈log₂ scales⌉ and forgery is the birthday bound', async (t) => {
  assert.equal(HoloFormulas.proofDepth(14).value, 4, '14 scales (the faces) reach the root in 4 levels')
  assert.equal(HoloFormulas.proofDepth(8).value, 3)
  assert.equal(HoloFormulas.proofDepth(16).value, 4)
  assert.equal(HoloFormulas.proofDepth(1).value, 0, 'one scale is already the root')
  assert.equal(HoloFormulas.proofDepth(0).holds, false, 'a tree has at least one leaf')
  assert.equal(HoloFormulas.forgery(256).value, 2 ** 128, 'splicing needs a SHA-256 collision: 2^128 hash evaluations')
  assert.equal((HoloFormulas.forgery(256) as unknown as { p: number }).p, 2 ** -128, 'a chance of 2^-128 per try')
  assert.equal(HoloFormulas.forgery(16).value, 256, 'the birthday work is the lattice doubling: mintOf(8)')
  assert.equal(HoloFormulas.proofDepth(14).dst, 'merkle')
  assert.equal(HoloFormulas.forgery(256).dst, 'qsec')
  await verifyHex('holo', 2, [['proofDepth', [14], 4], ['proofDepth', [8], 3]])
  t.diagnostic('2 formulas; proofDepth(14) = 4 over the faces, forgery(256) = 2^128 hash evaluations (2^-128 a try); crossing to merkle and qsec')
})
