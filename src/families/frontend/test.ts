import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FrontendFormulas } from './index.js'
import '../../mcp/families.js'

test('frontend: many frontends on one Payload API — pages, fetch, build, cache, frameworks, headless, isr', async (t) => {
  assert.equal(FrontendFormulas.pages(120, 3).value, 360, 'routes across locales')
  assert.equal(FrontendFormulas.fetch(5, 2).value, 10)
  assert.equal(FrontendFormulas.build(360, 20).value, 7200)
  assert.equal(FrontendFormulas.cache(950, 1000).value, 95)
  assert.equal(FrontendFormulas.hydration(12, 48).value, 25)
  const fw = FrontendFormulas.frameworks(6) as unknown as { value: number; holds: boolean; examples: string[] }
  assert.equal(fw.value, 6)
  assert.ok(fw.examples.includes('vitepress'), 'VitePress is one of the frontends the headless API serves')
  assert.equal(FrontendFormulas.frameworks(0).holds, false, 'a headless API serves at least one frontend')
  assert.equal(FrontendFormulas.headless(40, 6).value, 240, 'one API endpoints across six frontends')
  assert.equal(FrontendFormulas.isr(3600, 60).value, 60)
  assert.equal(FrontendFormulas.pages(120, 3).dst, 'payload')
  assert.equal(hexFamiliesOf().get('frontend')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'frontend', program: ['headless'], params: [40, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 240, `frontend.headless at ${uuid}`)
  uuidReceiptOf('frontend headless', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pages 360, fetch 10, build 7200, cache 95, hydration 25, frameworks 6 (incl vitepress), headless 240, isr 60')
})
