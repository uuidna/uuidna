import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PharmaFormulas } from './index.js'
import '../../mcp/families.js'

test('pharma: dose, halflife, clearance, loading, bioavailability, interval, therapeutic, steadystate — crossing to med', async (t) => {
  assert.equal(PharmaFormulas.dose(70, 10).value, 700, 'dose for a 70 kg patient')
  assert.equal(PharmaFormulas.halflife(1000, 3).value, 125, 'amount left after three half-lives')
  assert.equal(PharmaFormulas.clearance(1000, 4).value, 250)
  assert.equal(PharmaFormulas.loading(5, 40).value, 200)
  assert.equal(PharmaFormulas.bioavailability(80, 100).value, 80)
  assert.equal(PharmaFormulas.interval(6, 4).value, 24)
  assert.equal(PharmaFormulas.therapeutic(10, 100).value, 1000, 'therapeutic index')
  assert.equal(PharmaFormulas.steadystate(500, 8).value, 62)
  assert.equal(PharmaFormulas.dose(70, 10).dst, 'med')
  assert.equal(hexFamiliesOf().get('pharma')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pharma', program: ['clearance'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `pharma.clearance at ${uuid}`)
  uuidReceiptOf('pharma clearance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 700, halflife 125, clearance 250, loading 200, bioavailability 80, interval 24, therapeutic 1000, steadystate 62; crossing to med')
})
