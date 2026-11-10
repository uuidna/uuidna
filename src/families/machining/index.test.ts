import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MachiningFormulas } from './index.js'
import '../../mcp/families.js'

test('machining: chipload, cuttingspeed, feedrate, materialremoval, passrate, surfacefinish, toollife, tolerance — crossing to manufacturing', async (t) => {
  assert.equal(MachiningFormulas.chipload(100, 4).value, 25, 'feed per tooth')
  assert.equal(MachiningFormulas.cuttingspeed(50, 2000).value, 314, 'surface speed proxy')
  assert.equal(MachiningFormulas.feedrate(5, 2000).value, 10000)
  assert.equal(MachiningFormulas.materialremoval(3, 10).value, 30)
  assert.equal(MachiningFormulas.passrate(950, 1000).value, 95, 'pass rate percent')
  assert.equal(MachiningFormulas.passrate(0, 0).value, 0)
  assert.equal(MachiningFormulas.surfacefinish(32).value, 32)
  assert.equal(MachiningFormulas.toollife(10000, 25).value, 400)
  assert.equal(MachiningFormulas.toollife(10000, 0).value, 0)
  assert.equal(MachiningFormulas.tolerance(5, 10000).value, 500, 'ppm')
  assert.equal(MachiningFormulas.tolerance(5, 0).value, 0)
  assert.equal(MachiningFormulas.chipload(100, 4).dst, 'manufacturing')
  assert.equal(hexFamiliesOf().get('machining')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'machining', program: ['feedrate'], params: [5, 2000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10000, `machining.feedrate at ${uuid}`)
  uuidReceiptOf('machining feedrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chipload 25, cuttingspeed 314, feedrate 10000, materialremoval 30, passrate 95, surfacefinish 32, toollife 400, tolerance 500; crossing to manufacturing')
})
