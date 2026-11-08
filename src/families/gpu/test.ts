import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GpuFormulas } from './index.js'
import '../../mcp/families.js'

test('gpu: cores, warps, occupancy, FLOPS, bandwidth and the roofline model — crossing to hardware', async (t) => {
  assert.equal(GpuFormulas.cores(128, 64).value, 8192, 'SMs × per-SM cores')
  assert.equal(GpuFormulas.warpsize().value, 32, 'SIMT warp')
  assert.equal(GpuFormulas.warps(100).value, 4, '⌈100/32⌉')
  assert.equal(GpuFormulas.occupancy(48, 64).value, 75, 'active warps of the max')
  assert.equal(GpuFormulas.grid(256, 1024).value, 262144, 'threads launched')
  assert.equal(GpuFormulas.blocks(10000, 256).value, 40, 'blocks to cover the threads')
  assert.equal(GpuFormulas.flops(8192, 2, 2).value, 32768, 'cores · clock · per-cycle')
  assert.equal(GpuFormulas.bandwidth(32, 100).value, 3200, 'bus × clock')
  assert.equal(GpuFormulas.intensity(1000, 250).value, 4, 'FLOP per byte')
  assert.equal(GpuFormulas.ridge(32768, 3200).value, 11, 'roofline ridge point')
  assert.equal(GpuFormulas.bound(4, 11).value, 0, 'memory-bound below the ridge')
  assert.equal(GpuFormulas.bound(20, 11).value, 1, 'compute-bound at the ridge')
  assert.equal(GpuFormulas.shared(4096, 8).value, 32768, 'shared-memory footprint')
  assert.equal(GpuFormulas.hide(16, 4, 60).value, 1, 'occupancy hides the latency')
  assert.equal(GpuFormulas.hide(4, 1, 60).value, 0, 'too few warps to hide it')
  assert.equal(GpuFormulas.speedup(1024, 32).value, 32, 'SIMT lane speedup')
  assert.equal(GpuFormulas.util(6144, 8192).value, 75, 'busy cores of the total')
  assert.equal(GpuFormulas.cores(128, 64).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('gpu')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'gpu', program: ['cores'], params: [128, 64] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8192, `gpu.cores at ${uuid}`)
  uuidReceiptOf('gpu cores', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; cores 8192, warpsize 32, warps 4, occupancy 75%, grid 262144, blocks 40, flops 32768, bandwidth 3200, intensity 4, ridge 11, bound 0/1, shared 32768, hide 1/0, speedup 32, util 75%; crossing to hardware')
})
