import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReadyFormulas } from './index.js'
import '../../mcp/families.js'

/** The gap-finding skills: the registry decides what is missing, and proof holds only when nothing is. */
test('ready: finds the registry gaps and proves not ready while any domain is uncovered', async (t) => {
  const gaps = (await ReadyFormulas.gaps(0)) as unknown as { value: number; uncovered: number; slice: string[] }
  assert.ok(Number.isSafeInteger(gaps.value) && gaps.value >= 0, 'the uncovered count is a natural')
  assert.ok(Array.isArray(gaps.slice), 'the gaps are listed as the next domains to build')

  const domains = (await ReadyFormulas.domains()) as unknown as { value: number; holds: boolean }
  assert.equal(domains.value, gaps.value, 'domains() agrees with gaps()')
  assert.equal(domains.holds, domains.value === 0, 'holds only when no domain is missing')

  const coverage = (await ReadyFormulas.coverage()) as unknown as { value: number; holds: boolean; covered: number; total: number }
  assert.ok(coverage.value >= 0 && coverage.value <= 100, 'coverage is a percentage')
  assert.equal(coverage.holds, coverage.value === 100)
  assert.equal(coverage.covered + domains.value, coverage.total, 'covered + uncovered = all categories')

  // PROVE NOT READY: while a gap stands, proof does not hold and names what is missing
  const proof = (await ReadyFormulas.proof()) as unknown as { value: number; holds: boolean; ready: boolean; verdict: string; missing: string[] }
  assert.equal(proof.value, domains.value)
  assert.equal(proof.holds, proof.value === 0)
  assert.equal(proof.ready, proof.holds)
  if (!proof.ready) assert.match(proof.verdict, /NOT READY/, 'it proves not ready with the count')
  uuidReceiptOf('ready proof', contentUuidOf(proof), { uncovered: proof.value, ready: proof.ready })

  assert.equal(hexFamiliesOf().get('ready')?.length, 4)
  t.diagnostic(`4 formulas; ${proof.value} domains uncovered → ${proof.verdict}; coverage ${coverage.value}% (${coverage.covered}/${coverage.total}); next: ${gaps.slice.slice(0, 4).join(', ')}`)
})
