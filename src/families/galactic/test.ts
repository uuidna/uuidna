import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GalacticFormulas } from './index.js'
import '../../mcp/families.js'

test('galactic: rotationvelocity, masswithinradius, starcount, diskmass, virialmass, escapevelocity, surfacebrightness, metallicity — crossing to astrophysics', async (t) => {
  assert.equal(GalacticFormulas.rotationvelocity(60000, 300).value, 200, 'a flat rotation curve')
  assert.equal(GalacticFormulas.masswithinradius(200, 300).value, 60000)
  assert.equal(GalacticFormulas.starcount(10000, 4).value, 2500, 'stars for the luminosity')
  assert.equal(GalacticFormulas.diskmass(50, 1000).value, 50000)
  assert.equal(GalacticFormulas.virialmass(10, 500).value, 50000)
  assert.equal(GalacticFormulas.escapevelocity(60000, 300).value, 400)
  assert.equal(GalacticFormulas.surfacebrightness(5000, 100).value, 50)
  assert.equal(GalacticFormulas.metallicity(2, 100).value, 2, 'two percent metals')
  assert.equal(GalacticFormulas.metallicity(50, 200).value, 25)
  assert.equal(GalacticFormulas.rotationvelocity(60000, 300).dst, 'astrophysics')
  assert.equal(hexFamiliesOf().get('galactic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'galactic', program: ['rotationvelocity'], params: [60000, 300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `galactic.rotationvelocity at ${uuid}`)
  uuidReceiptOf('galactic rotationvelocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rotationvelocity 200, masswithinradius 60000, starcount 2500, diskmass 50000, virialmass 50000, escapevelocity 400, surfacebrightness 50, metallicity 2; crossing to astrophysics')
})
