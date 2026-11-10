import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HistoriographyFormulas } from './index.js'
import '../../mcp/families.js'

test('historiography: sourcecount, narrativeorderings, biasfactors, periodizations, crosschecks, interpretiveframes, consensuslevel, revisionspan — crossing to sociology', async (t) => {
  assert.equal(HistoriographyFormulas.sourcecount(40, 20).value, 60)
  assert.equal(HistoriographyFormulas.narrativeorderings(5).value, 120)
  assert.equal(HistoriographyFormulas.biasfactors(2, 3, 1).value, 6)
  assert.equal(HistoriographyFormulas.periodizations(10, 3).value, 120)
  assert.equal(HistoriographyFormulas.crosschecks(12, 4).value, 48)
  assert.equal(HistoriographyFormulas.interpretiveframes(5).value, 32)
  assert.equal(HistoriographyFormulas.consensuslevel(70, 100).value, 70)
  assert.equal(HistoriographyFormulas.revisionspan(200, 50).value, 150)
  assert.equal(HistoriographyFormulas.sourcecount(40, 20).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('historiography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'historiography', program: ['sourcecount'], params: [40, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `historiography.sourcecount at ${uuid}`)
  uuidReceiptOf('historiography sourcecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sourcecount 60, narrativeorderings 120, biasfactors 6, periodizations 120, crosschecks 48, interpretiveframes 32, consensuslevel 70, revisionspan 150; crossing to sociology')
})
