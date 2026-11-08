import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConicFormulas } from './index.js'
import '../../mcp/families.js'

test('conic: eccentricityscaled, focallength, directrix, latusrectum, semimajor, semiminor, discriminant, vertexdistance — crossing to geometry', async (t) => {
  assert.equal(ConicFormulas.eccentricityscaled(3, 5).value, 60, 'eccentricity 0.6, scaled by 100')
  assert.equal(ConicFormulas.focallength(5, 3).value, 16, 'c² = a² − b²')
  assert.equal(ConicFormulas.directrix(5, 4).value, 6)
  assert.equal(ConicFormulas.latusrectum(5, 3).value, 3)
  assert.equal(ConicFormulas.semimajor(8, 2).value, 5, 'half the sum of the focal radii')
  assert.equal(ConicFormulas.semiminor(5, 4).value, 9, 'b² = a² − c²')
  assert.equal(ConicFormulas.discriminant(1, 5, 2).value, 17)
  assert.equal(ConicFormulas.vertexdistance(5, 2).value, 3, 'vertex past the offset')
  assert.equal(ConicFormulas.vertexdistance(2, 5).value, 0)
  assert.equal(ConicFormulas.eccentricityscaled(3, 5).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('conic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'conic', program: ['semiminor'], params: [5, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `conic.semiminor at ${uuid}`)
  uuidReceiptOf('conic semiminor', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; eccentricityscaled 60, focallength 16, directrix 6, latusrectum 3, semimajor 5, semiminor 9, discriminant 17, vertexdistance 3; crossing to geometry')
})
