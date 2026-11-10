import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TrigonometryFormulas } from './index.js'
import '../../mcp/families.js'

test('trigonometry: sine, cosine, tangent, hypotenuse, radians, period, amplitude, phase — crossing to code', async (t) => {
  assert.equal(TrigonometryFormulas.sine(90).value, 1000, 'sin 90° = 1')
  assert.equal(TrigonometryFormulas.sine(0).value, 0)
  assert.equal(TrigonometryFormulas.sine(30).value, 500, 'sin 30° = 0.5')
  assert.equal(TrigonometryFormulas.cosine(0).value, 1000, 'cos 0° = 1')
  assert.equal(TrigonometryFormulas.cosine(90).value, 0)
  assert.equal(TrigonometryFormulas.cosine(60).value, 500, 'cos 60° = 0.5')
  assert.equal(TrigonometryFormulas.tangent(100, 100).value, 1000, 'tan 45° = 1')
  assert.equal(TrigonometryFormulas.tangent(5, 0).value, 0)
  assert.equal(TrigonometryFormulas.hypotenuse(3, 4).value, 25, '3² + 4²')
  assert.equal(TrigonometryFormulas.radians(180).value, 3)
  assert.equal(TrigonometryFormulas.period(100, 4).value, 25)
  assert.equal(TrigonometryFormulas.period(100, 0).value, 0)
  assert.equal(TrigonometryFormulas.amplitude(10, 2).value, 4)
  assert.equal(TrigonometryFormulas.amplitude(2, 10).value, 0)
  assert.equal(TrigonometryFormulas.phase(90, 360).value, 90)
  assert.equal(TrigonometryFormulas.phase(5, 0).value, 0)
  assert.equal(TrigonometryFormulas.sine(90).dst, 'code')
  assert.equal(hexFamiliesOf().get('trigonometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'trigonometry', program: ['hypotenuse'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `trigonometry.hypotenuse at ${uuid}`)
  uuidReceiptOf('trigonometry hypotenuse', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sine 1000/0/500, cosine 1000/0/500, tangent 1000, hypotenuse 25, radians 3, period 25, amplitude 4, phase 90; crossing to code')
})
