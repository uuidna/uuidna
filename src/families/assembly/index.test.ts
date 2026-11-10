import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AssemblyFormulas } from './index.js'
import '../../mcp/families.js'

test('assembly: takt, cycle, balance, stations, throughput, wip, efficiency, yield — crossing to manufacturing', async (t) => {
  assert.equal(AssemblyFormulas.takt(480, 60).value, 8, 'eight minutes of takt a unit')
  assert.equal(AssemblyFormulas.cycle(600, 120).value, 5)
  assert.equal(AssemblyFormulas.balance(100, 8).value, 13, 'thirteen stations for the work content')
  assert.equal(AssemblyFormulas.stations(100, 25).value, 4, 'four stations for the load')
  assert.equal(AssemblyFormulas.throughput(960, 8).value, 120, 'units per hour')
  assert.equal(AssemblyFormulas.wip(120, 5).value, 600)
  assert.equal(AssemblyFormulas.efficiency(90, 10).value, 90)
  assert.equal(AssemblyFormulas.yield(980, 1000).value, 98)
  assert.equal(AssemblyFormulas.takt(480, 0).value, 0, 'guarded division')
  assert.equal(AssemblyFormulas.takt(480, 60).dst, 'manufacturing')
  assert.equal(hexFamiliesOf().get('assembly')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'assembly', program: ['stations'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `assembly.stations at ${uuid}`)
  uuidReceiptOf('assembly stations', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; takt 8, cycle 5, balance 13, stations 4, throughput 120, wip 600, efficiency 90, yield 98; crossing to manufacturing')
})
