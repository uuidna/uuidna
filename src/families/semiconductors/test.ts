import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SemiconductorsFormulas } from './index.js'
import '../../mcp/families.js'

test('semiconductors: bandgap, doping, mobility, resistivity, threshold, yield, wafer, junction — crossing to electrical', async (t) => {
  assert.equal(SemiconductorsFormulas.bandgap(1120, 50).value, 1070, 'silicon gap after narrowing')
  assert.equal(SemiconductorsFormulas.doping(500, 8).value, 4000)
  assert.equal(SemiconductorsFormulas.mobility(1400, 7).value, 200, 'drift mobility')
  assert.equal(SemiconductorsFormulas.resistivity(10, 50, 25).value, 20)
  assert.equal(SemiconductorsFormulas.threshold(5, 2).value, 3, 'gate overdrive')
  assert.equal(SemiconductorsFormulas.threshold(1, 2).value, 0)
  assert.equal(SemiconductorsFormulas.yield(950, 1000).value, 95, 'die yield percent')
  assert.equal(SemiconductorsFormulas.wafer(31416, 100).value, 314, 'dies per wafer')
  assert.equal(SemiconductorsFormulas.junction(600, 4).value, 150)
  assert.equal(SemiconductorsFormulas.bandgap(1120, 50).dst, 'electrical')
  assert.equal(hexFamiliesOf().get('semiconductors')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'semiconductors', program: ['wafer'], params: [31416, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 314, `semiconductors.wafer at ${uuid}`)
  uuidReceiptOf('semiconductors wafer', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bandgap 1070, doping 4000, mobility 200, resistivity 20, threshold 3, yield 95, wafer 314, junction 150; crossing to electrical')
})
