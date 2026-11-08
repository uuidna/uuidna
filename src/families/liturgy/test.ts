import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LiturgyFormulas } from './index.js'
import '../../mcp/families.js'

test('liturgy: feastdays, cyclelength, hourorderings, rubriccombos, seasons, chantmodes, vestmentsubsets, processionpaths — crossing to anthropology', async (t) => {
  assert.equal(LiturgyFormulas.feastdays(40, 12).value, 52)
  assert.equal(LiturgyFormulas.cyclelength(7, 52).value, 364)
  assert.equal(LiturgyFormulas.hourorderings(7).value, 5040)
  assert.equal(LiturgyFormulas.rubriccombos(12, 3).value, 220)
  assert.equal(LiturgyFormulas.seasons(4, 2).value, 6)
  assert.equal(LiturgyFormulas.chantmodes(8, 1).value, 8)
  assert.equal(LiturgyFormulas.vestmentsubsets(5).value, 32)
  assert.equal(LiturgyFormulas.processionpaths(6, 2).value, 30)
  assert.equal(LiturgyFormulas.feastdays(40, 12).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('liturgy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'liturgy', program: ['feastdays'], params: [40, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 52, `liturgy.feastdays at ${uuid}`)
  uuidReceiptOf('liturgy feastdays', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; feastdays 52, cyclelength 364, hourorderings 5040, rubriccombos 220, seasons 6, chantmodes 8, vestmentsubsets 32, processionpaths 30; crossing to anthropology')
})
