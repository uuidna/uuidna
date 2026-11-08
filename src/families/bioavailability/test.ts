import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BioavailabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('bioavailability: absolute, relative, fraction, dosecorrected, aucratio, oralfactor, absorbed, retained — crossing to pharmacology', async (t) => {
  assert.equal(BioavailabilityFormulas.absolute(500, 1000).value, 50, 'half the IV exposure')
  assert.equal(BioavailabilityFormulas.relative(800, 1000).value, 80)
  assert.equal(BioavailabilityFormulas.fraction(90, 100).value, 90, 'fraction of dose absorbed')
  assert.equal(BioavailabilityFormulas.dosecorrected(5000, 50).value, 100)
  assert.equal(BioavailabilityFormulas.aucratio(600, 200).value, 3, 'threefold exposure')
  assert.equal(BioavailabilityFormulas.oralfactor(100, 30).value, 70, 'surviving first pass')
  assert.equal(BioavailabilityFormulas.absorbed(200, 80).value, 160)
  assert.equal(BioavailabilityFormulas.retained(160, 60).value, 100, 'retained after elimination')
  assert.equal(BioavailabilityFormulas.retained(50, 80).value, 0)
  assert.equal(BioavailabilityFormulas.absolute(500, 1000).dst, 'pharmacology')
  assert.equal(hexFamiliesOf().get('bioavailability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bioavailability', program: ['absolute'], params: [500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `bioavailability.absolute at ${uuid}`)
  uuidReceiptOf('bioavailability absolute', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; absolute 50, relative 80, fraction 90, dosecorrected 100, aucratio 3, oralfactor 70, absorbed 160, retained 100; crossing to pharmacology')
})
