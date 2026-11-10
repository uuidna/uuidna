import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BioenergeticsFormulas } from './index.js'
import '../../mcp/families.js'

test('bioenergetics: atphydrolysis, efficiency, electrontransport, gibbsfree, phosphateratio, protonmotive, redoxpotential, yield — crossing to biochemistry', async (t) => {
  assert.equal(BioenergeticsFormulas.atphydrolysis(10, 31).value, 310, 'ten moles of ATP at ~31 kJ')
  assert.equal(BioenergeticsFormulas.efficiency(40, 100).value, 40)
  assert.equal(BioenergeticsFormulas.electrontransport(10, 3).value, 30, 'three ATP per NADH')
  assert.equal(BioenergeticsFormulas.gibbsfree(100, 10, 5).value, 50)
  assert.equal(BioenergeticsFormulas.phosphateratio(25, 10).value, 25, 'P/O ratio of 2.5')
  assert.equal(BioenergeticsFormulas.protonmotive(140, 1).value, 199)
  assert.equal(BioenergeticsFormulas.redoxpotential(820, 320).value, 500)
  assert.equal(BioenergeticsFormulas.yield(1, 38).value, 38, 'ATP per glucose')
  assert.equal(BioenergeticsFormulas.redoxpotential(320, 820).value, 0)
  assert.equal(BioenergeticsFormulas.atphydrolysis(10, 31).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('bioenergetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bioenergetics', program: ['efficiency'], params: [40, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `bioenergetics.efficiency at ${uuid}`)
  uuidReceiptOf('bioenergetics efficiency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; atphydrolysis 310, efficiency 40, electrontransport 30, gibbsfree 50, phosphateratio 25, protonmotive 199, redoxpotential 500, yield 38; crossing to biochemistry')
})
