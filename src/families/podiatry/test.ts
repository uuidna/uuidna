import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PodiatryFormulas } from './index.js'
import '../../mcp/families.js'

test('podiatry: arch, pressure, gait, pronation, healing, balance, stride, callus — crossing to med', async (t) => {
  assert.equal(PodiatryFormulas.arch(24, 100).value, 24, 'arch index')
  assert.equal(PodiatryFormulas.pressure(600, 30).value, 20)
  assert.equal(PodiatryFormulas.gait(120, 2).value, 60, 'steps per minute')
  assert.equal(PodiatryFormulas.pronation(7).value, 7)
  assert.equal(PodiatryFormulas.healing(75, 100).value, 75)
  assert.equal(PodiatryFormulas.balance(18, 20).value, 90)
  assert.equal(PodiatryFormulas.stride(1500, 1000).value, 1, 'stride length')
  assert.equal(PodiatryFormulas.callus(3).value, 3)
  assert.equal(PodiatryFormulas.arch(24, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('podiatry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'podiatry', program: ['pressure'], params: [600, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `podiatry.pressure at ${uuid}`)
  uuidReceiptOf('podiatry pressure', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; arch 24, pressure 20, gait 60, pronation 7, healing 75, balance 90, stride 1, callus 3; crossing to med')
})
