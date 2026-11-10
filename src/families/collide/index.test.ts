import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CollideFormulas } from './index.js'
import '../../mcp/families.js'

/** Collisions grow domains, proven by the CERN arithmetic. The record 38 = 19·2 + 0 holds; conservation, the product,
 *  decay and its channels are exact; and the gap counts the families the collisions still imply. */
test('collide: the CERN record holds, collisions and decays are exact, the gap counts missing families', async (t) => {
  // the CERN-proven record 38 = 19 · 2 + 0 (theorem cern)
  assert.equal(CollideFormulas.events(19, 2, 0).value, 38, 'record 38 = 19·2 + 0')
  assert.equal(CollideFormulas.events(19, 2, 0).holds, true, 'r < q: a valid Euclidean division')
  assert.equal(CollideFormulas.events(19, 2, 2).holds, false, 'r ≥ q: not a valid division')
  // conservation, product, invariants
  assert.equal(CollideFormulas.collide(14, 13).value, 27, 'conservation a + b')
  assert.equal(CollideFormulas.product(7, 6).value, 42, 'the interaction product a · b')
  assert.equal(CollideFormulas.invariant(3, 4).value, 25, '3² + 4² = 25')
  assert.equal(CollideFormulas.balance(19, 4).value, 15, 'the missing momentum |a − b|')
  // decay: dissolve to the heaviest prime, the channels are the divisors
  assert.equal(CollideFormulas.dissolve(90).value, 5, '90 = 2·3²·5 decays to 5')
  assert.equal(CollideFormulas.dissolve(38).value, 19, '38 = 2·19 decays to 19')
  assert.equal(CollideFormulas.channels(38).value, 4, '38 has divisors 1, 2, 19, 38')
  assert.equal(CollideFormulas.channels(12).value, 6, '12 has six divisors')
  assert.equal(CollideFormulas.threshold(14, 13).value, 1, 'above threshold')
  assert.equal(CollideFormulas.threshold(12, 13).value, 0, 'below threshold')
  // the gap: of the domains the collisions reach, the families served — the missing families as a lead
  assert.equal(CollideFormulas.gap(20, 14).value, 6, 'six families still implied by the collisions')
  assert.equal(CollideFormulas.gap(14, 14).holds, true, 'no gap: the families cover the domains')
  // the family is registered and runs at its hex address
  assert.equal(hexFamiliesOf().get('collide')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'collide', program: ['events'], params: [19, 2, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 38, `collide.events at ${uuid}`)
  uuidReceiptOf('collide events', contentUuidOf(run), { uuid })
  t.diagnostic('9 formulas; record 38 = 19·2 + 0 (theorem cern); dissolve 90→5, 38→19; channels 38=4; gap(20,14)=6 missing families')
})
