import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { PermaFormulas } from './index.js'

/** Three faces, each the lattice's own count. A count that is not that face does not hold. */
test('perma: coins, rays, faces — the lattice trinity', async (t) => {
  const lattice = latticeNamesOf()
  assert.equal(PermaFormulas.coins(lattice.coins).value, lattice.coins)
  assert.equal(PermaFormulas.coins(lattice.coins).holds, true)
  assert.equal(PermaFormulas.coins(lattice.seed).holds, lattice.seed === lattice.coins)
  assert.equal(PermaFormulas.rays(lattice.rays).value, lattice.rays)
  assert.equal(PermaFormulas.rays(lattice.rays).holds, true)
  assert.equal(PermaFormulas.faces(lattice.coins, lattice.rays).value, lattice.faces)
  assert.equal(PermaFormulas.faces(lattice.coins, lattice.rays).holds, true)
  assert.equal(PermaFormulas.faces(lattice.coins, lattice.rays).dst, 'merkaba')
  assert.equal(hexFamiliesOf().get('perma')?.length, 3)
  for (const [name, params, expected] of [
    ['coins', [lattice.coins], lattice.coins],
    ['rays', [lattice.rays], lattice.rays],
    ['faces', [lattice.coins, lattice.rays], lattice.faces],
  ] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'perma', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `perma.${name} at ${uuid}`)
    uuidReceiptOf(`perma ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`3 formulas; coins ${lattice.coins}, rays ${lattice.rays}, faces ${lattice.faces}`)
})
