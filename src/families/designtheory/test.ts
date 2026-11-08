import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DesignTheoryFormulas } from './index.js'
import '../../mcp/families.js'

test('designtheory: BIBD flag counts, the design identity, Fisher, Steiner triples and finite planes — crossing to combinatorics', async (t) => {
  // Fano plane / projective plane of order 2: a 2-(7,3,1) design, b=7, r=3, k=3, λ=1.
  assert.equal(DesignTheoryFormulas.incidences(7, 3).value, 21, 'v · r point flags')
  assert.equal(DesignTheoryFormulas.blocksizes(7, 3).value, 21, 'b · k block flags (= vr)')
  assert.equal(DesignTheoryFormulas.lambdacheck(7, 3, 3).value, 6, 'r(k − 1) = λ(v − 1) = 6')
  assert.equal(DesignTheoryFormulas.replication(1, 7, 3).value, 3, '⌊λ(v − 1)/(k − 1)⌋')
  assert.equal(DesignTheoryFormulas.blocks(7, 3, 3).value, 7, '⌊vr/k⌋ blocks')
  assert.equal(DesignTheoryFormulas.fisher(7, 7).value, 1, 'b ≥ v holds')
  assert.equal(DesignTheoryFormulas.fisher(3, 7).value, 0, 'b < v fails')
  assert.equal(DesignTheoryFormulas.steinertriples(7).value, 7, '⌊7·6/6⌋ Steiner triples')
  assert.equal(DesignTheoryFormulas.points(7).value, 7, 'the ground set')
  assert.equal(DesignTheoryFormulas.pairs(7).value, 21, '7·6/2 unordered pairs')
  assert.equal(DesignTheoryFormulas.projectiveorder(2).value, 7, 'points of PG(2,2) = n² + n + 1')
  assert.equal(DesignTheoryFormulas.replications(7, 3, 7).value, 3, '⌊bk/v⌋ = r')
  assert.equal(DesignTheoryFormulas.blockcount(1, 7, 3).value, 7, '⌊λv(v − 1)/(k(k − 1))⌋ = b')
  assert.equal(DesignTheoryFormulas.lineorder(2).value, 3, 'n + 1 points per line of PG(2,2)')
  assert.equal(DesignTheoryFormulas.affinepoints(3).value, 9, 'n² points of AG(2,3)')
  assert.equal(DesignTheoryFormulas.affinelines(3).value, 12, 'n² + n lines of AG(2,3)')
  assert.equal(DesignTheoryFormulas.incidences(7, 3).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('designtheory')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'designtheory', program: ['incidences'], params: [7, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 21, `designtheory.incidences at ${uuid}`)
  uuidReceiptOf('designtheory incidences', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas on the 2-(7,3,1) Fano design and finite planes; incidences 21, blocksizes 21, lambdacheck 6, replication 3, blocks 7, fisher 1/0, steinertriples 7, points 7, pairs 21, projectiveorder 7, replications 3, blockcount 7, lineorder 3, affinepoints 9, affinelines 12; crossing to combinatorics')
})
