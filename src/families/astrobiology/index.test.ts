import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AstrobiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('astrobiology: habitablezone, drake, biosignature, metabolism, extremophile, panspermia, oxygenation, abiogenesis — crossing to chemistry', async (t) => {
  assert.equal(AstrobiologyFormulas.habitablezone(4, 25).value, 100, 'the habitable-zone radius proxy')
  assert.equal(AstrobiologyFormulas.drake(7, 2, 100).value, 1400, 'communicating civilisations')
  assert.equal(AstrobiologyFormulas.biosignature(3, 4).value, 75)
  assert.equal(AstrobiologyFormulas.metabolism(1000, 8).value, 125, 'energy per cell')
  assert.equal(AstrobiologyFormulas.extremophile(80, 122).value, 42, 'margin below the hyperthermophile limit')
  assert.equal(AstrobiologyFormulas.panspermia(1000, 60, 100).value, 600, 'seeds surviving the transit')
  assert.equal(AstrobiologyFormulas.oxygenation(21, 100).value, 21)
  assert.equal(AstrobiologyFormulas.abiogenesis(50, 1000).value, 50000)
  assert.equal(AstrobiologyFormulas.extremophile(200, 122).value, 0, 'past the limit, no margin')
  assert.equal(AstrobiologyFormulas.habitablezone(4, 25).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('astrobiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'astrobiology', program: ['metabolism'], params: [1000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `astrobiology.metabolism at ${uuid}`)
  uuidReceiptOf('astrobiology metabolism', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; habitablezone 100, drake 1400, biosignature 75, metabolism 125, extremophile 42, panspermia 600, oxygenation 21, abiogenesis 50000; crossing to chemistry')
})
