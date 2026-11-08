import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ForensicFormulas } from './index.js'

/** The forensic measures a court admits — match probability, likelihood ratio, custody, minutiae, error, BAC — each exact. */
test('forensic: DNA rmp, likelihood ratio, chain of custody, minutiae, error rate, toxicology — the admissible math', async (t) => {
  assert.equal(ForensicFormulas.rmp(13).value, 13, 'a 13-locus profile is ~1 in 10^13')
  assert.equal((ForensicFormulas.rmp(13) as unknown as { codis: boolean }).codis, true, 'CODIS ≥ 13 loci')
  assert.equal(ForensicFormulas.likelihood(1000, 1).value, 1000000, 'LR of a million, ×1000')
  assert.equal(ForensicFormulas.custody(3).holds, true, 'three hashed handoffs, unbroken')
  assert.equal(ForensicFormulas.custody(0).holds, false, 'no handoff, broken')
  assert.equal(ForensicFormulas.points(12).value, 1, 'twelve minutiae meet the threshold')
  assert.equal(ForensicFormulas.points(8).value, 0)
  assert.equal(ForensicFormulas.error(20).value, 1, '2% error is admissible')
  assert.equal(ForensicFormulas.error(50).value, 0, '5% is not')
  assert.equal(ForensicFormulas.rarity(1000000, 8000000000).value, 8000, '1-in-a-million trait: 8000 others on Earth')
  assert.equal(ForensicFormulas.bac(80).value, 1, '0.08% is the per-se limit')
  assert.equal(ForensicFormulas.bac(50).value, 0)
  assert.equal(hexFamiliesOf().get('forensic')?.length, 7)
  for (const [name, params, expected] of [['rmp', [13], 13], ['points', [12], 1], ['bac', [80], 1]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'forensic', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `forensic.${name} at ${uuid}`)
    uuidReceiptOf(`forensic ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('7 formulas; rmp 1-in-10^13, LR ×1000, custody unbroken ≥1, 12 minutiae, 2% error admissible, BAC 0.08%')
})
