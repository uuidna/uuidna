// edge-served — a pageless sealed theorem resolves; everything the Worker does not render stays a dead link.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { edgeServes } from './edge-served.js'
import { theorems, isPagelessFile } from './theorems/index.js'

test('a sealed pageless theorem is a route the edge serves, in every spelling of its link', () => {
  const station = theorems().find((t) => isPagelessFile(t.file))!
  assert.ok(station, 'the ledger carries the pageless span')
  for (const link of [`/theorem/${station.key}`, `/theorem/${station.key}.html`, `/theorem/${station.key}#statement`, `/theorem/${station.key}/`]) {
    assert.equal(edgeServes(link), true, link)
  }
})

test('a key the ledger does not hold, a paged theorem, and any other path are not edge-served', () => {
  const station = theorems().find((t) => isPagelessFile(t.file))!
  const paged = theorems().find((t) => !isPagelessFile(t.file))!
  assert.equal(edgeServes(`/theorem/${station.key}x`), false, 'a typo of a station key')
  assert.equal(edgeServes('/theorem/enumeration_hex4_zzzz'), false, 'not a hex station')
  assert.equal(edgeServes(`/theorem/${paged.key}`), false, 'a paged theorem is the site\'s to build')
  assert.equal(edgeServes(`/publications/${station.key}`), false, 'another route')
})
