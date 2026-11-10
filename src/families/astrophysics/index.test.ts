import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AstrophysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('astrophysics: schwarzschild, chandrasekhar, luminosity, redshift, jeans, eddington, tidal, timescale — crossing to gravity', async (t) => {
  assert.equal(AstrophysicsFormulas.schwarzschild(10).value, 30, 'ten solar masses, ~30 km')
  assert.equal(AstrophysicsFormulas.chandrasekhar(144).value, 100, 'at the 1.44 limit')
  assert.equal(AstrophysicsFormulas.luminosity(2, 5).value, 20)
  assert.equal(AstrophysicsFormulas.redshift(1100, 1000).value, 100, 'z of 0.1')
  assert.equal(AstrophysicsFormulas.jeans(1000, 10).value, 100)
  assert.equal(AstrophysicsFormulas.eddington(5).value, 165000)
  assert.equal(AstrophysicsFormulas.tidal(1000, 10).value, 1, 'inverse cube pull')
  assert.equal(AstrophysicsFormulas.timescale(10, 1000).value, 100, 'nuclear timescale')
  assert.equal(AstrophysicsFormulas.chandrasekhar(0).value, 0)
  assert.equal(AstrophysicsFormulas.schwarzschild(10).dst, 'gravity')
  assert.equal(hexFamiliesOf().get('astrophysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'astrophysics', program: ['luminosity'], params: [2, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `astrophysics.luminosity at ${uuid}`)
  uuidReceiptOf('astrophysics luminosity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; schwarzschild 30, chandrasekhar 100, luminosity 20, redshift 100, jeans 100, eddington 165000, tidal 1, timescale 100; crossing to gravity')
})
