import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CodeFormulas } from './index.js'
import '../../mcp/families.js'

test('code: lines, highlight, tokens, indent, wrap, snippet, languages, density — crossing to frontend', async (t) => {
  assert.equal(CodeFormulas.lines(300, 80).value, 4, 'four lines at eighty columns')
  assert.equal(CodeFormulas.highlight(50, 100).value, 50)
  assert.equal(CodeFormulas.tokens(1000, 4).value, 250)
  assert.equal(CodeFormulas.indent(8, 4).value, 2)
  assert.equal(CodeFormulas.wrap(80, 120).value, 1, 'column fits')
  assert.equal(CodeFormulas.wrap(160, 120).value, 0)
  assert.equal(CodeFormulas.snippet(20, 50).value, 1, 'snippet fits')
  assert.equal(CodeFormulas.languages(5).value, 5)
  assert.equal(CodeFormulas.density(400, 1000).value, 40)
  assert.equal(CodeFormulas.lines(300, 80).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('code')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'code', program: ['lines'], params: [300, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `code.lines at ${uuid}`)
  uuidReceiptOf('code lines', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lines 4, highlight 50, tokens 250, indent 2, wrap 1, snippet 1, languages 5, density 40; crossing to frontend')
})
