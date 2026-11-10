import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SimulationFormulas } from './index.js'
import '../../mcp/families.js'

test('simulation: timestep, convergence, montecarlo, stability, resolution, speedup, accuracy, iterations — crossing to code', async (t) => {
  assert.equal(SimulationFormulas.timestep(1000, 100).value, 10, 'ten units per step')
  assert.equal(SimulationFormulas.convergence(50, 10).value, 5)
  assert.equal(SimulationFormulas.montecarlo(785, 1000).value, 78, 'pi estimate percent')
  assert.equal(SimulationFormulas.stability(95, 100).value, 95)
  assert.equal(SimulationFormulas.resolution(1000, 50).value, 20, 'domain per cell')
  assert.equal(SimulationFormulas.speedup(800, 100).value, 800, 'eight times serial')
  assert.equal(SimulationFormulas.accuracy(990, 1000).value, 99)
  assert.equal(SimulationFormulas.iterations(42).value, 42)
  assert.equal(SimulationFormulas.timestep(1000, 100).dst, 'code')
  assert.equal(hexFamiliesOf().get('simulation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'simulation', program: ['timestep'], params: [1000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `simulation.timestep at ${uuid}`)
  uuidReceiptOf('simulation timestep', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; timestep 10, convergence 5, montecarlo 78, stability 95, resolution 20, speedup 800, accuracy 99, iterations 42; crossing to code')
})
