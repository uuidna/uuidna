import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CpuFormulas } from './index.js'
import '../../mcp/families.js'

test('cpu: cores, threads, IPC, MIPS, the pipeline, Amdahl and speedup — crossing to hardware', async (t) => {
  assert.equal(CpuFormulas.cores(4, 8).value, 32, 'dies × per-die')
  assert.equal(CpuFormulas.threads(32, 2).value, 64, 'cores × SMT')
  assert.equal(CpuFormulas.ipc(100, 25).value, 4, 'instructions per cycle')
  assert.equal(CpuFormulas.mips(4, 3000).value, 12000, 'IPC × clock')
  assert.equal(CpuFormulas.pipeline(5, 10).value, 14, 'stages + instructions − 1')
  assert.equal(CpuFormulas.cacheline(100, 64).value, 2, 'lines spanned')
  assert.equal(CpuFormulas.tdp(8, 15).value, 120, 'cores × per-core watts')
  assert.equal(CpuFormulas.amdahl(20, 80).value, 100, 'serial + parallel totals 100')
  assert.equal(CpuFormulas.speedup(100, 4).value, 25, 'serial over parallel')
  assert.equal(CpuFormulas.turbo(3000, 500).value, 3500, 'base + boost')
  assert.equal(CpuFormulas.cores(4, 8).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('cpu')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'cpu', program: ['cores'], params: [4, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `cpu.cores at ${uuid}`)
  uuidReceiptOf('cpu cores', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; cores 32, threads 64, ipc 4, mips 12000, pipeline 14, cacheline 2, tdp 120, amdahl 100, speedup 25, turbo 3500; crossing to hardware')
})
