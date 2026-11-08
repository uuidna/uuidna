import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KnittingFormulas } from './index.js'
import '../../mcp/families.js'

test('knitting: gauge, courses, wales, stitch, looplength, tightness, productivity, gsm — crossing to materials', async (t) => {
  assert.equal(KnittingFormulas.gauge(22, 10).value, 22, 'stitches per 10 cm')
  assert.equal(KnittingFormulas.courses(30, 10).value, 30, 'rows per 10 cm')
  assert.equal(KnittingFormulas.wales(3, 40).value, 120, 'stitch columns across the width')
  assert.equal(KnittingFormulas.stitch(120, 150).value, 18000, 'loops in the piece')
  assert.equal(KnittingFormulas.looplength(6000, 1000).value, 6, 'mm of yarn per loop')
  assert.equal(KnittingFormulas.tightness(200, 5).value, 40)
  assert.equal(KnittingFormulas.productivity(84, 20, 60).value, 100800, 'loops in an hour')
  assert.equal(KnittingFormulas.gsm(50, 2500).value, 200)
  assert.equal(KnittingFormulas.gauge(22, 10).dst, 'materials')
  assert.equal(hexFamiliesOf().get('knitting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'knitting', program: ['gauge'], params: [22, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 22, `knitting.gauge at ${uuid}`)
  uuidReceiptOf('knitting gauge', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gauge 22, courses 30, wales 120, stitch 18000, looplength 6, tightness 40, productivity 100800, gsm 200; crossing to materials')
})
