import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CinematographyFormulas } from './index.js'
import '../../mcp/families.js'

test('cinematography: fstop, exposure, depthoffield, framerate, shutterangle, focallength, iso, aspect — crossing to optics', async (t) => {
  assert.equal(CinematographyFormulas.fstop(50, 25).value, 2, 'a 50mm at a 25mm aperture is f/2')
  assert.equal(CinematographyFormulas.exposure(8, 500).value, 4000)
  assert.equal(CinematographyFormulas.depthoffield(5000, 2000).value, 3000, 'three metres stay sharp')
  assert.equal(CinematographyFormulas.depthoffield(2000, 5000).value, 0)
  assert.equal(CinematographyFormulas.framerate(1440, 60).value, 24, 'cinema frame rate')
  assert.equal(CinematographyFormulas.shutterangle(24, 180).value, 48, 'a 180° shutter at 24fps is 1/48s')
  assert.equal(CinematographyFormulas.focallength(35, 2).value, 70)
  assert.equal(CinematographyFormulas.iso(100, 4).value, 400)
  assert.equal(CinematographyFormulas.aspect(1920, 1080).value, 177)
  assert.equal(CinematographyFormulas.fstop(50, 25).dst, 'optics')
  assert.equal(hexFamiliesOf().get('cinematography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cinematography', program: ['framerate'], params: [1440, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `cinematography.framerate at ${uuid}`)
  uuidReceiptOf('cinematography framerate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fstop 2, exposure 4000, depthoffield 3000, framerate 24, shutterangle 48, focallength 70, iso 400, aspect 177; crossing to optics')
})
