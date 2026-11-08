import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DyeingFormulas } from './index.js'
import '../../mcp/families.js'

test('dyeing: shade, liquorratio, exhaustion, fixation, concentration, temperature, fastness, uptake — crossing to chemistry', async (t) => {
  assert.equal(DyeingFormulas.shade(3, 100).value, 3, 'three percent on weight of fabric')
  assert.equal(DyeingFormulas.liquorratio(2000, 100).value, 20, 'a 20:1 bath')
  assert.equal(DyeingFormulas.exhaustion(85, 100).value, 85)
  assert.equal(DyeingFormulas.fixation(90, 100).value, 90)
  assert.equal(DyeingFormulas.concentration(50, 10).value, 5, 'grams per litre')
  assert.equal(DyeingFormulas.temperature(30, 2, 30).value, 90, 'ramped to the boil')
  assert.equal(DyeingFormulas.fastness(4, 5).value, 4, 'average grey-scale rating')
  assert.equal(DyeingFormulas.uptake(5, 10).value, 50)
  assert.equal(DyeingFormulas.shade(3, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('dyeing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dyeing', program: ['exhaustion'], params: [85, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `dyeing.exhaustion at ${uuid}`)
  uuidReceiptOf('dyeing exhaustion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shade 3, liquorratio 20, exhaustion 85, fixation 90, concentration 5, temperature 90, fastness 4, uptake 50; crossing to chemistry')
})
