import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RenderingFormulas } from './index.js'
import '../../mcp/families.js'

test('rendering: fps, triangles, pixels, raytracing, culling, shading, latency, fillrate — crossing to layout', async (t) => {
  assert.equal(RenderingFormulas.fps(120, 2).value, 60, 'sixty frames a second')
  assert.equal(RenderingFormulas.triangles(10).value, 8, 'a strip of ten vertices')
  assert.equal(RenderingFormulas.pixels(1920, 1080).value, 2073600, 'a 1080p frame')
  assert.equal(RenderingFormulas.raytracing(1000, 8).value, 8000)
  assert.equal(RenderingFormulas.culling(30, 120).value, 25, 'a quarter still drawn')
  assert.equal(RenderingFormulas.shading(64, 4).value, 256)
  assert.equal(RenderingFormulas.latency(2, 120).value, 16, 'two frames at 120 Hz')
  assert.equal(RenderingFormulas.fillrate(1000, 60).value, 60000)
  assert.equal(RenderingFormulas.fps(120, 2).dst, 'layout')
  assert.equal(hexFamiliesOf().get('rendering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rendering', program: ['fps'], params: [120, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `rendering.fps at ${uuid}`)
  uuidReceiptOf('rendering fps', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fps 60, triangles 8, pixels 2073600, raytracing 8000, culling 25, shading 256, latency 16, fillrate 60000; crossing to layout')
})
