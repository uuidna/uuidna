import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PipelineFormulas } from './index.js'
import '../../mcp/families.js'

test('pipeline: stages, duration, bottleneck, parallelism, successrate, queue, cachehit, throughput — crossing to cloud', async (t) => {
  assert.equal(PipelineFormulas.stages(5).value, 5, 'five stages')
  assert.equal(PipelineFormulas.duration(100, 340).value, 240)
  assert.equal(PipelineFormulas.duration(340, 100).value, 0, 'no negative duration')
  assert.equal(PipelineFormulas.bottleneck(60, 240).value, 25, 'a quarter of the total')
  assert.equal(PipelineFormulas.parallelism(20, 4).value, 5)
  assert.equal(PipelineFormulas.successrate(95, 100).value, 95)
  assert.equal(PipelineFormulas.queue(30, 4).value, 7)
  assert.equal(PipelineFormulas.cachehit(80, 100).value, 80)
  assert.equal(PipelineFormulas.throughput(120, 8).value, 15, 'builds per hour')
  assert.equal(PipelineFormulas.stages(5).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('pipeline')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pipeline', program: ['parallelism'], params: [20, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `pipeline.parallelism at ${uuid}`)
  uuidReceiptOf('pipeline parallelism', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stages 5, duration 240, bottleneck 25, parallelism 5, successrate 95, queue 7, cachehit 80, throughput 15; crossing to cloud')
})
