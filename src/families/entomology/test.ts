import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EntomologyFormulas } from './index.js'
import '../../mcp/families.js'

test('entomology: colony, metamorphosis, swarm, foraging, infestation, pollination, lifecycle, wingbeat — crossing to ecology', async (t) => {
  assert.equal(EntomologyFormulas.colony(50000, 1).value, 50001, 'a hive of workers and its queen')
  assert.equal(EntomologyFormulas.metamorphosis(4).value, 4, 'egg, larva, pupa, adult')
  assert.equal(EntomologyFormulas.swarm(12000, 3).value, 4000, 'individuals per unit area')
  assert.equal(EntomologyFormulas.foraging(600, 20).value, 30, 'per trip')
  assert.equal(EntomologyFormulas.infestation(30, 120).value, 25)
  assert.equal(EntomologyFormulas.pollination(90, 200).value, 45)
  assert.equal(EntomologyFormulas.lifecycle(1000, 950).value, 95, 'hatch rate')
  assert.equal(EntomologyFormulas.wingbeat(12000, 60).value, 200, 'beats per second')
  assert.equal(EntomologyFormulas.colony(50000, 1).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('entomology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'entomology', program: ['swarm'], params: [12000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4000, `entomology.swarm at ${uuid}`)
  uuidReceiptOf('entomology swarm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; colony 50001, metamorphosis 4, swarm 4000, foraging 30, infestation 25, pollination 45, lifecycle 95, wingbeat 200; crossing to ecology')
})
