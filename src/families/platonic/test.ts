import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PlatonicFormulas } from './index.js'
import '../../mcp/families.js'

/** The five solids, each a trinity (V, E, F) under Euler's one law, paired by duality — the trinity pairs. */
test('platonic: Euler holds for every solid, the duals are the trinity pairs, the tetrahedron is self-dual', async (t) => {
  // the one law holds for all five — the simple invariant managing every solid
  for (let i = 0; i < 5; i++) {
    const v = Number(PlatonicFormulas.vertices(i).value), e = Number(PlatonicFormulas.edges(i).value), f = Number(PlatonicFormulas.faces(i).value)
    assert.equal(PlatonicFormulas.euler(v, e, f).value, 2, `Euler holds for solid ${i}`)
    assert.equal(PlatonicFormulas.euler(v, e, f).holds, true)
  }
  assert.equal(PlatonicFormulas.euler(8, 12, 6).value, 2, 'the cube: 8 − 12 + 6 = 2')
  assert.equal(PlatonicFormulas.euler(8, 12, 5).holds, false, 'a broken solid does not hold')
  // the trinity pairs: duals swap vertices and faces
  assert.equal(PlatonicFormulas.dual(1).value, 2, 'cube ↔ octahedron')
  assert.equal(PlatonicFormulas.dual(2).value, 1, 'octahedron ↔ cube')
  assert.equal(PlatonicFormulas.dual(3).value, 4, 'dodecahedron ↔ icosahedron')
  assert.equal(Number(PlatonicFormulas.vertices(1).value), Number(PlatonicFormulas.faces(2).value), "cube's vertices are the octahedron's faces")
  assert.equal(PlatonicFormulas.self(0).value, 1, 'the tetrahedron is its own pair')
  assert.equal(PlatonicFormulas.self(1).value, 0, 'the cube is not self-dual')
  assert.equal(PlatonicFormulas.sides(1).value, 4, 'a cube face is a square')
  assert.equal(PlatonicFormulas.meeting(1).value, 3, 'three faces meet at a cube vertex')
  assert.equal(hexFamiliesOf().get('platonic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'platonic', program: ['faces'], params: [3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `platonic.faces(dodecahedron) at ${uuid}`)
  uuidReceiptOf('platonic faces', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; Euler=2 for all five; duals cube↔octa (8v=8f), dodeca↔icosa; tetrahedron self-dual; crossing to merkaba')
})
