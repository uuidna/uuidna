import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConservationFormulas } from './index.js'
import '../../mcp/families.js'

test('conservation: protected, population, corridor, threatened, restoration, carrying, poaching, viability — crossing to ecology', async (t) => {
  assert.equal(ConservationFormulas.protected(30, 100).value, 30, 'thirty percent of habitat reserved')
  assert.equal(ConservationFormulas.population(400, 1000).value, 40, 'two-fifths of the baseline remains')
  assert.equal(ConservationFormulas.corridor(12, 4).value, 3, 'three routes per fragment')
  assert.equal(ConservationFormulas.threatened(25, 200).value, 12)
  assert.equal(ConservationFormulas.restoration(150, 600).value, 25, 'a quarter of lost ground restored')
  assert.equal(ConservationFormulas.carrying(1000, 8).value, 125, 'individuals a place can carry')
  assert.equal(ConservationFormulas.poaching(45, 300).value, 15)
  assert.equal(ConservationFormulas.viability(250, 500).value, 50, 'half of the minimum viable size')
  assert.equal(ConservationFormulas.protected(30, 100).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('conservation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'conservation', program: ['corridor'], params: [12, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `conservation.corridor at ${uuid}`)
  uuidReceiptOf('conservation corridor', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; protected 30, population 40, corridor 3, threatened 12, restoration 25, carrying 125, poaching 15, viability 50; crossing to ecology')
})
