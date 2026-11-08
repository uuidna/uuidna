import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FpgaFormulas } from './index.js'
import '../../mcp/families.js'

test('fpga: LUTs, flip-flops, DSP, block-RAM, fMAX, utilisation and throughput — crossing to hardware', async (t) => {
  assert.equal(FpgaFormulas.luts(100, 8).value, 800, 'LUTs across the slices')
  assert.equal(FpgaFormulas.ffs(100, 16).value, 1600, 'flip-flops across the slices')
  assert.equal(FpgaFormulas.dsp(10, 48).value, 480, 'DSP slices across the columns')
  assert.equal(FpgaFormulas.bram(400, 36).value, 14400, 'block-RAM capacity')
  assert.equal(FpgaFormulas.fmax(2000).value, 500, 'MHz from the period')
  assert.equal(FpgaFormulas.utilization(60, 100).value, 60, 'fabric used of the total')
  assert.equal(FpgaFormulas.pipeline(5, 3).value, 8, 'stages + latency')
  assert.equal(FpgaFormulas.throughput(500, 2).value, 1000, 'fMAX × per-clock')
  assert.equal(FpgaFormulas.io(8, 50).value, 400, 'banks × per-bank')
  assert.equal(FpgaFormulas.power(800, 25).value, 20000, 'LUTs × per-LUT µW')
  assert.equal(FpgaFormulas.luts(100, 8).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('fpga')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'fpga', program: ['luts'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `fpga.luts at ${uuid}`)
  uuidReceiptOf('fpga luts', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; luts 800, ffs 1600, dsp 480, bram 14400, fmax 500, utilization 60%, pipeline 8, throughput 1000, io 400, power 20000; crossing to hardware')
})
