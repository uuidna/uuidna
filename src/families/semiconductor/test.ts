import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SemiconductorFormulas } from './index.js'
import '../../mcp/families.js'

test('semiconductor: bandgap, carrier, diesyield, doping, junction, mobility, resistivity, threshold — crossing to electronics', async (t) => {
  assert.equal(SemiconductorFormulas.bandgap(1120).value, 1120, 'silicon band gap in meV')
  assert.equal(SemiconductorFormulas.carrier(600, 400).value, 1000)
  assert.equal(SemiconductorFormulas.diesyield(90, 100).value, 90, 'die yield percent')
  assert.equal(SemiconductorFormulas.doping(5, 1000000).value, 5, 'five parts per million')
  assert.equal(SemiconductorFormulas.junction(1000, 10).value, 10000, 'forward/reverse ratio')
  assert.equal(SemiconductorFormulas.mobility(1400, 2).value, 700)
  assert.equal(SemiconductorFormulas.resistivity(5, 1).value, 5)
  assert.equal(SemiconductorFormulas.threshold(700).value, 700, 'threshold voltage in mV')
  assert.equal(SemiconductorFormulas.bandgap(1120).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('semiconductor')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'semiconductor', program: ['mobility'], params: [1400, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 700, `semiconductor.mobility at ${uuid}`)
  uuidReceiptOf('semiconductor mobility', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bandgap 1120, carrier 1000, diesyield 90, doping 5, junction 10000, mobility 700, resistivity 5, threshold 700; crossing to electronics')
})
