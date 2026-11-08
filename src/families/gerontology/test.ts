import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GerontologyFormulas } from './index.js'
import '../../mcp/families.js'

test('gerontology: lifeexpectancy, telomerelength, frailtyindex, biologicalage, functionaldecline, comorbiditypairs, survivalfraction, doublingtime — crossing to physiology', async (t) => {
  assert.equal(GerontologyFormulas.lifeexpectancy(75, 5).value, 80)
  assert.equal(GerontologyFormulas.telomerelength(10000, 3000).value, 7000)
  assert.equal(GerontologyFormulas.frailtyindex(30, 100).value, 30)
  assert.equal(GerontologyFormulas.biologicalage(800, 10).value, 80)
  assert.equal(GerontologyFormulas.functionaldecline(20, 100).value, 20)
  assert.equal(GerontologyFormulas.comorbiditypairs(8, 2).value, 28)
  assert.equal(GerontologyFormulas.survivalfraction(60, 100).value, 60)
  assert.equal(GerontologyFormulas.doublingtime(3650, 365).value, 10)
  assert.equal(GerontologyFormulas.lifeexpectancy(75, 5).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('gerontology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gerontology', program: ['lifeexpectancy'], params: [75, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `gerontology.lifeexpectancy at ${uuid}`)
  uuidReceiptOf('gerontology lifeexpectancy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lifeexpectancy 80, telomerelength 7000, frailtyindex 30, biologicalage 80, functionaldecline 20, comorbiditypairs 28, survivalfraction 60, doublingtime 10; crossing to physiology')
})
