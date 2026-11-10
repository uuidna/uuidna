import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OsmosisFormulas } from './index.js'
import '../../mcp/families.js'

test('osmosis: osmoticpressure, osmolarity, tonicity, waterpotential, netflux, reflectioncoeff, gradient, equilibrium — crossing to biochemistry', async (t) => {
  assert.equal(OsmosisFormulas.osmoticpressure(2, 300, 310).value, 186000, 'van\'t Hoff for a dissociating solute')
  assert.equal(OsmosisFormulas.osmolarity(600, 2).value, 300, 'particles per unit volume')
  assert.equal(OsmosisFormulas.tonicity(300, 150).value, 1, 'hypertonic inside')
  assert.equal(OsmosisFormulas.tonicity(150, 300).value, 0)
  assert.equal(OsmosisFormulas.waterpotential(200, 500).value, 300)
  assert.equal(OsmosisFormulas.netflux(5, 10, 20).value, 1000, 'flux through the membrane')
  assert.equal(OsmosisFormulas.reflectioncoeff(90, 100).value, 90)
  assert.equal(OsmosisFormulas.gradient(500, 200).value, 300)
  assert.equal(OsmosisFormulas.equilibrium(300, 300).value, 1, 'both sides equal')
  assert.equal(OsmosisFormulas.equilibrium(300, 200).value, 0)
  assert.equal(OsmosisFormulas.osmoticpressure(2, 300, 310).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('osmosis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'osmosis', program: ['osmolarity'], params: [600, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `osmosis.osmolarity at ${uuid}`)
  uuidReceiptOf('osmosis osmolarity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; osmoticpressure 186000, osmolarity 300, tonicity 1, waterpotential 300, netflux 1000, reflectioncoeff 90, gradient 300, equilibrium 1; crossing to biochemistry')
})
