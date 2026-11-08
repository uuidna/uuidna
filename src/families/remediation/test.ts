import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RemediationFormulas } from './index.js'
import '../../mcp/families.js'

test('remediation: contaminant, reduction, dilution, halflife, cleanup, exposure, threshold, volume — crossing to environment', async (t) => {
  assert.equal(RemediationFormulas.contaminant(1000, 50).value, 20, 'concentration')
  assert.equal(RemediationFormulas.reduction(200, 50).value, 75, 'percent removed')
  assert.equal(RemediationFormulas.dilution(1000, 4).value, 250)
  assert.equal(RemediationFormulas.halflife(1000, 3).value, 125, 'three half-lives')
  assert.equal(RemediationFormulas.cleanup(900, 1000).value, 90)
  assert.equal(RemediationFormulas.exposure(5, 30).value, 150)
  assert.equal(RemediationFormulas.threshold(40, 50).value, 1, 'under the limit')
  assert.equal(RemediationFormulas.threshold(60, 50).value, 0)
  assert.equal(RemediationFormulas.volume(10, 20, 30).value, 6000)
  assert.equal(RemediationFormulas.contaminant(1000, 50).dst, 'environment')
  assert.equal(hexFamiliesOf().get('remediation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'remediation', program: ['dilution'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `remediation.dilution at ${uuid}`)
  uuidReceiptOf('remediation dilution', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; contaminant 20, reduction 75, dilution 250, halflife 125, cleanup 90, exposure 150, threshold 1, volume 6000; crossing to environment')
})
