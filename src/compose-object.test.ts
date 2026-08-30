import { test } from 'node:test'
import assert from 'node:assert/strict'
import { allObjectPaths, composeTheorem } from './compose-object.js'
import { theorems } from './index.js'

test('compose-object — SSG composer reachable and emits theorem monographs', () => {
  const t = theorems()[0]!
  const page = composeTheorem(t)
  assert.ok(page.params?.address)
  assert.ok(page.content?.length)
  assert.ok(allObjectPaths().length > 1000)
})
