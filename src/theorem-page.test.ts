import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremPage, renderTheoremPage } from './theorem-page.js'
import { isPagelessFile, theorems, theoremByKey } from './theorems/index.js'

test('isPagelessFile names only the four-hex span wings', () => {
  assert.equal(isPagelessFile('HexSpan1.lean'), true)
  assert.equal(isPagelessFile('HexSpan16.lean'), true)
  assert.equal(isPagelessFile('Core.lean'), false)
  assert.equal(isPagelessFile('Hexbit.lean'), false)
})

test('theoremPage computes a HexSpan door and refuses a named theorem', () => {
  const span = theoremPage('enumeration_hex4_0000')
  assert.ok(span)
  assert.ok(span.call)
  assert.equal(span.call.station, '0000')
  assert.equal(span.call.key, 'enumeration_hex4_0000')
  assert.equal(span.route, '/theorem/enumeration_hex4_0000')
  assert.match(span.statement, /reassembles/)
  assert.equal(span.file, 'HexSpan1.lean')
  const named = theorems().find((t) => !isPagelessFile(t.file))
  assert.ok(named)
  assert.equal(theoremPage(named.key), null)
  assert.equal(theoremPage('not_a_sealed_key'), null)
})

test('renderTheoremPage is the record: key, statement, handle, no second JSON copy', () => {
  const page = theoremPage('enumeration_hex4_0000')
  assert.ok(page)
  const html = renderTheoremPage(page)
  assert.match(html, /enumeration_hex4_0000/)
  assert.match(html, /ScholarlyArticle/)
  assert.match(html, /by decide/)
  assert.match(html, /problems called/)
  assert.match(html, /solution involution/)
  assert.doesNotMatch(html, /<script type="application\/json">/)
  const t = theoremByKey().get('enumeration_hex4_0000')
  assert.ok(t)
  assert.match(html, new RegExp(t.address.replace(/-/g, '\\-')))
})
