import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FuzzingFormulas } from './index.js'
import '../../mcp/families.js'

test('fuzzing: iterations, inputspace, crashcombos, coveragepct, seedcount, mutationpaths, uniquecrashes, throughput — crossing to statistics', async (t) => {
  assert.equal(FuzzingFormulas.iterations(10000, 5).value, 50000)
  assert.equal(FuzzingFormulas.inputspace(16).value, 65536)
  assert.equal(FuzzingFormulas.crashcombos(10, 2).value, 45)
  assert.equal(FuzzingFormulas.coveragepct(80, 100).value, 80)
  assert.equal(FuzzingFormulas.seedcount(50, 50).value, 100)
  assert.equal(FuzzingFormulas.mutationpaths(6, 2).value, 30)
  assert.equal(FuzzingFormulas.uniquecrashes(100, 88).value, 12)
  assert.equal(FuzzingFormulas.throughput(60000, 60).value, 1000)
  assert.equal(FuzzingFormulas.iterations(10000, 5).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('fuzzing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fuzzing', program: ['iterations'], params: [10000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `fuzzing.iterations at ${uuid}`)
  uuidReceiptOf('fuzzing iterations', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; iterations 50000, inputspace 65536, crashcombos 45, coveragepct 80, seedcount 100, mutationpaths 30, uniquecrashes 12, throughput 1000; crossing to statistics')
})
