import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrototypingFormulas } from './index.js'
import '../../mcp/families.js'

test('prototyping: fidelity, iterations, coverage, feedback, velocity, reuse, validation, interactivity — crossing to content', async (t) => {
  assert.equal(PrototypingFormulas.fidelity(80, 100).value, 80)
  assert.equal(PrototypingFormulas.iterations(12, 4).value, 3, 'three versions a week')
  assert.equal(PrototypingFormulas.coverage(20, 5).value, 4, 'four screens per flow')
  assert.equal(PrototypingFormulas.feedback(45, 90).value, 50)
  assert.equal(PrototypingFormulas.velocity(30, 6).value, 5, 'five screens a day')
  assert.equal(PrototypingFormulas.reuse(30, 120).value, 25)
  assert.equal(PrototypingFormulas.validation(90, 100).value, 90)
  assert.equal(PrototypingFormulas.interactivity(15, 30).value, 50)
  assert.equal(PrototypingFormulas.fidelity(80, 100).dst, 'content')
  assert.equal(hexFamiliesOf().get('prototyping')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'prototyping', program: ['coverage'], params: [20, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `prototyping.coverage at ${uuid}`)
  uuidReceiptOf('prototyping coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fidelity 80, iterations 3, coverage 4, feedback 50, velocity 5, reuse 25, validation 90, interactivity 50; crossing to content')
})
