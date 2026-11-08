import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LuminosityFormulas } from './index.js'
import '../../mcp/families.js'

test('luminosity: stefanboltzmann, apparentbrightness, inversesquare, bolometric, eddingtonlimit, radiusfromtemp, fluxratio, luminosityclass — crossing to astrophysics', async (t) => {
  assert.equal(LuminosityFormulas.stefanboltzmann(3, 2).value, 48, 'area · temp⁴')
  assert.equal(LuminosityFormulas.apparentbrightness(1000, 10).value, 10)
  assert.equal(LuminosityFormulas.inversesquare(2, 6).value, 9, 'flux falls as the square')
  assert.equal(LuminosityFormulas.bolometric(100, 200, 300).value, 600)
  assert.equal(LuminosityFormulas.eddingtonlimit(10).value, 320000, 'the luminosity ceiling')
  assert.equal(LuminosityFormulas.radiusfromtemp(1000, 10).value, 10)
  assert.equal(LuminosityFormulas.fluxratio(1000, 50).value, 20)
  assert.equal(LuminosityFormulas.luminosityclass(5000, 1000).value, 1, 'class reached')
  assert.equal(LuminosityFormulas.luminosityclass(500, 1000).value, 0)
  assert.equal(LuminosityFormulas.stefanboltzmann(3, 2).dst, 'astrophysics')
  assert.equal(hexFamiliesOf().get('luminosity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'luminosity', program: ['fluxratio'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `luminosity.fluxratio at ${uuid}`)
  uuidReceiptOf('luminosity fluxratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stefanboltzmann 48, apparentbrightness 10, inversesquare 9, bolometric 600, eddingtonlimit 320000, radiusfromtemp 10, fluxratio 20, luminosityclass 1; crossing to astrophysics')
})
