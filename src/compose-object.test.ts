import { test } from 'node:test'
import assert from 'node:assert/strict'
import { allObjectPaths, composeTheorem, objectPageCount } from './compose-object.js'
import { theorems, isPagelessFile } from './theorems/index.js'

test('compose-object — SSG composer reachable and emits theorem monographs', () => {
  const t = theorems()[0]!
  const page = composeTheorem(t)
  assert.ok(page.params?.address)
  assert.ok(page.content?.length)
  assert.ok(objectPageCount().total > 1000)
})

test('compose-object — HexSpan is sealed, not a page each', () => {
  const named = theorems().filter((t) => !isPagelessFile(t.file)).length
  assert.equal(objectPageCount().theorem, named)
  assert.ok(theorems().some((t) => isPagelessFile(t.file)))
  const paths = allObjectPaths()
  assert.ok(!paths.some((p: { params: Record<string, unknown> }) => 'key' in p.params && String(p.params.key).startsWith('enumeration_hex4_')))
})
