import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SynthesisFormulas } from './index.js'

/** Program synthesis as exact combinatorics — Halstead length and vocabulary, tokens, examples, rewrites, paths, candidates, effort. */
test('synthesis: length, vocabulary, tokens, examples, rewrites, paths, candidates, effort', async (t) => {
  assert.equal(SynthesisFormulas.length(3, 5).value, 8, 'operators + operands')
  assert.equal(SynthesisFormulas.vocabulary(2, 4).value, 6, 'distinct ops + operands')
  assert.equal(SynthesisFormulas.tokens(10, 7).value, 70, '10 lines × 7 tokens')
  assert.equal(SynthesisFormulas.examples(4, 3).value, 12, '4 inputs × 3 outputs')
  assert.equal(SynthesisFormulas.rewrites(5, 6).value, 30, '5 rules × 6 terms')
  assert.equal(SynthesisFormulas.paths(4).value, 16, '2^4 control-flow paths')
  assert.equal(SynthesisFormulas.candidates(3, 4).value, 81, '3^4 enumeration space')
  assert.equal(SynthesisFormulas.candidates(50, 40).value, 0, 'an enumeration that overflows is not an integer')
  assert.equal(SynthesisFormulas.candidates(50, 40).holds, false, 'and does not hold')
  assert.equal(SynthesisFormulas.effort(8, 6).value, 48, 'length × vocabulary')
  assert.equal(SynthesisFormulas.length(3, 5).dst, 'cross')
  assert.equal(hexFamiliesOf().get('synthesis')?.length, 8)
  for (const [name, params, expected] of [['length', [3, 5], 8], ['paths', [4], 16], ['candidates', [3, 4], 81]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'synthesis', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `synthesis.${name} at ${uuid}`)
    uuidReceiptOf(`synthesis ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; Halstead length 8, 2^4 paths, 3^4 candidates, overflow → does not hold')
})
