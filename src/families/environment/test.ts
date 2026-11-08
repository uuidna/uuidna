import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnvironmentFormulas } from './index.js'
import '../../mcp/families.js'

test('environment: emissions, exceedance, footprint, concentration, offset, exposure, penalty, remediation', async (t) => {
  assert.equal(EnvironmentFormulas.emissions(50, 24).value, 1200)
  assert.equal(EnvironmentFormulas.exceedance(120, 100).value, 20, 'above the permitted limit')
  assert.equal(EnvironmentFormulas.exceedance(80, 100).value, 0)
  assert.equal(EnvironmentFormulas.footprint(1000, 3).value, 3000)
  assert.equal(EnvironmentFormulas.concentration(5, 1000000).value, 5, 'five parts per million')
  assert.equal(EnvironmentFormulas.offset(1000, 300).value, 700, 'net after offsets')
  assert.equal(EnvironmentFormulas.exposure(40, 8).value, 320)
  assert.equal(EnvironmentFormulas.penalty(20, 500).value, 10000)
  assert.equal(EnvironmentFormulas.remediation(300, 50).value, 15000)
  assert.equal(EnvironmentFormulas.emissions(50, 24).dst, 'evidence')
  assert.equal(hexFamiliesOf().get('environment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'environment', program: ['exceedance'], params: [120, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `environment.exceedance at ${uuid}`)
  uuidReceiptOf('environment exceedance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; emissions 1200, exceedance 20, footprint 3000, concentration 5ppm, offset 700, exposure 320, penalty 10000, remediation 15000; crossing to evidence')
})
