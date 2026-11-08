import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HashFormulas } from './index.js'

/** hash: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('hash: buckets, collisions, loadpct, digestbits, seeds, probes, bitsperkey, combos', async (t) => {
  assert.equal(HashFormulas.buckets(10).value, 1024, 'buckets(10)')
  assert.equal(HashFormulas.collisions(1000, 900).value, 100, 'collisions(1000, 900)')
  assert.equal(HashFormulas.loadpct(75, 100).value, 75, 'loadpct(75, 100)')
  assert.equal(HashFormulas.digestbits(32, 8).value, 256, 'digestbits(32, 8)')
  assert.equal(HashFormulas.seeds(2, 2).value, 4, 'seeds(2, 2)')
  assert.equal(HashFormulas.probes(100, 10).value, 10, 'probes(100, 10)')
  assert.equal(HashFormulas.bitsperkey(160, 20).value, 8, 'bitsperkey(160, 20)')
  assert.equal(HashFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('hash')?.length, 8)
  for (const [name, params, expected] of [["buckets",[10],1024],["collisions",[1000,900],100],["loadpct",[75,100],75]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'hash', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `hash.${name} at ${uuid}`)
    uuidReceiptOf(`hash ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "buckets=1024, collisions=100, loadpct=75")
})
