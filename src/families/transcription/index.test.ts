import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TranscriptionFormulas } from './index.js'
import '../../mcp/families.js'

test('transcription: codons, elongationtime, expressionlevel, gcontent, mrnalength, promoterstrength, readthrough, splicevariants — crossing to genetics', async (t) => {
  assert.equal(TranscriptionFormulas.codons(300).value, 100, '100 codons from 300 bases')
  assert.equal(TranscriptionFormulas.elongationtime(900, 20).value, 45, 'seconds to elongate')
  assert.equal(TranscriptionFormulas.expressionlevel(6000, 60).value, 100, 'transcripts per second')
  assert.equal(TranscriptionFormulas.gcontent(60, 100).value, 60)
  assert.equal(TranscriptionFormulas.mrnalength(5, 200).value, 1000)
  assert.equal(TranscriptionFormulas.promoterstrength(4, 25).value, 100)
  assert.equal(TranscriptionFormulas.splicevariants(3, 4).value, 12)
  assert.equal(TranscriptionFormulas.readthrough(80, 70).value, 1, 'readthrough met')
  assert.equal(TranscriptionFormulas.readthrough(60, 70).value, 0)
  assert.equal(TranscriptionFormulas.codons(300).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('transcription')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'transcription', program: ['codons'], params: [300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `transcription.codons at ${uuid}`)
  uuidReceiptOf('transcription codons', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; codons 100, elongationtime 45, expressionlevel 100, gcontent 60, mrnalength 1000, promoterstrength 100, splicevariants 12, readthrough 1; crossing to genetics')
})
