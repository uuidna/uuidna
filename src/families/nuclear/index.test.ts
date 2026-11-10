import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NuclearFormulas } from './index.js'
import '../../mcp/families.js'

test('nuclear: decay, activity, binding, criticality, enrichment, fission, dose, shielding — crossing to energy', async (t) => {
  assert.equal(NuclearFormulas.decay(1000, 3).value, 125, 'atoms left after three half-lives')
  assert.equal(NuclearFormulas.activity(5000, 2).value, 10)
  assert.equal(NuclearFormulas.binding(1600, 200).value, 8, 'binding energy per nucleon')
  assert.equal(NuclearFormulas.criticality(105, 100).value, 105, 'k-factor just supercritical')
  assert.equal(NuclearFormulas.enrichment(5, 100).value, 5, 'five percent enriched')
  assert.equal(NuclearFormulas.fission(2000, 10).value, 200)
  assert.equal(NuclearFormulas.dose(900, 3).value, 100, 'inverse square')
  assert.equal(NuclearFormulas.shielding(800, 2).value, 200, 'two layers attenuate')
  assert.equal(NuclearFormulas.decay(1000, 3).dst, 'energy')
  assert.equal(hexFamiliesOf().get('nuclear')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nuclear', program: ['dose'], params: [900, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `nuclear.dose at ${uuid}`)
  uuidReceiptOf('nuclear dose', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; decay 125, activity 10, binding 8, criticality 105, enrichment 5, fission 200, dose 100, shielding 200; crossing to energy')
})
