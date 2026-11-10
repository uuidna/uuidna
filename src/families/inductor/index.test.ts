import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InductorFormulas } from './index.js'
import '../../mcp/families.js'

test('inductor: inductance, reactance, energy, timeconstant, turnspairs, quality, seriessum, coupling — crossing to electronics', async (t) => {
  assert.equal(InductorFormulas.inductance(100, 1).value, 100)
  assert.equal(InductorFormulas.reactance(628, 10).value, 6280)
  assert.equal(InductorFormulas.energy(100, 2).value, 50)
  assert.equal(InductorFormulas.timeconstant(100, 10).value, 10)
  assert.equal(InductorFormulas.turnspairs(10, 2).value, 45)
  assert.equal(InductorFormulas.quality(100, 2).value, 50)
  assert.equal(InductorFormulas.seriessum(100, 200).value, 300)
  assert.equal(InductorFormulas.coupling(90, 100).value, 90)
  assert.equal(InductorFormulas.inductance(100, 1).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('inductor')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'inductor', program: ['inductance'], params: [100, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `inductor.inductance at ${uuid}`)
  uuidReceiptOf('inductor inductance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; inductance 100, reactance 6280, energy 50, timeconstant 10, turnspairs 45, quality 50, seriessum 300, coupling 90; crossing to electronics')
})
