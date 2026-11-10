import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AssayFormulas } from './index.js'
import '../../mcp/families.js'

test('assay: concentration, dilution, recovery, limitofdetection, standardcurve, purity, yield, replicates — crossing to chemistry', async (t) => {
  assert.equal(AssayFormulas.concentration(1000, 50).value, 20, 'mass over volume')
  assert.equal(AssayFormulas.dilution(100, 10, 50).value, 20, 'C1V1 = C2V2')
  assert.equal(AssayFormulas.recovery(95, 100).value, 95)
  assert.equal(AssayFormulas.limitofdetection(10, 3, 2).value, 16, 'blank plus three sigma')
  assert.equal(AssayFormulas.standardcurve(5, 20, 3).value, 103)
  assert.equal(AssayFormulas.purity(990, 1000).value, 99)
  assert.equal(AssayFormulas.yield(80, 100).value, 80, 'eighty percent yield')
  assert.equal(AssayFormulas.replicates(300, 3).value, 100, 'mean of the replicates')
  assert.equal(AssayFormulas.concentration(1000, 0).value, 0, 'guarded divide by zero')
  assert.equal(AssayFormulas.concentration(1000, 50).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('assay')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'assay', program: ['concentration'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `assay.concentration at ${uuid}`)
  uuidReceiptOf('assay concentration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; concentration 20, dilution 20, recovery 95, limitofdetection 16, standardcurve 103, purity 99, yield 80, replicates 100; crossing to chemistry')
})
