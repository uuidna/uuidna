import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import { primeCatalogue, CATALOGUE_FILE } from '../catalogue/index.js'
import { packagePage, renderPackagePage } from './index.js'

const prime = (): void => { primeCatalogue(readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8')) }

test('a published package computes its whole page from the mirror', () => {
  prime()
  const p = packagePage('busybox')!
  assert.ok(p, 'busybox is published')
  assert.equal(p.name, 'busybox')
  assert.match(p.version, /^\d/)
  assert.match(p.handle, /^[0-9a-f]{8}$/, 'the handle is the address\'s first eight hex')
  assert.equal(p.route, '/catalogue/busybox')
  assert.ok(p.domains.includes('shell'), 'the domains are matched, not stored')
})

test('CONTROL — a name the catalogue does not publish is null, not an empty page', () => {
  prime()
  assert.equal(packagePage('definitely-not-a-published-package'), null,
    'an empty page for a missing package reads exactly like a real one for a package with no metadata')
})

// ── THE PAYLOAD IS THE MARKUP ────────────────────────────────────────────────────────────────────────────────
// A JSON block beside the HTML would be a second statement of the same facts, free to drift from the first.
// Every field carries its schema.org itemprop instead, so a reader sees prose and a machine reads microdata off
// the same bytes — there is only one place each fact is written.
test('the rendered page carries its payload as microdata, not as prose alone', () => {
  prime()
  const html = renderPackagePage(packagePage('busybox')!, [{ name: 'uuidna_port' }])
  assert.match(html, /itemtype="https:\/\/schema\.org\/SoftwareApplication"/)
  for (const prop of ['name', 'description', 'softwareVersion', 'identifier', 'value', 'sameAs', 'url'])
    assert.match(html, new RegExp(`itemprop="${prop}"`), `the payload must carry ${prop}`)
  assert.match(html, /itemtype="https:\/\/schema\.org\/PropertyValue"/, 'the checksum says WHICH digest it is')
})

test('CONTROL — every value in the page is escaped, so metadata cannot become markup', () => {
  prime()
  const page = packagePage('busybox')!
  const hostile = { ...page, desc: '<script>alert(1)</script>', name: 'busybox" onload="x' }
  const html = renderPackagePage(hostile, [])
  assert.doesNotMatch(html, /<script>alert/, 'a description is data, never markup')
  assert.match(html, /&lt;script&gt;/, 'and it is escaped rather than stripped, so the record stays faithful')
})

test('the tools are passed IN, so the page carries no opinion about which roster a host serves', () => {
  prime()
  const p = packagePage('busybox')!
  assert.match(renderPackagePage(p, [{ name: 'uuidna_only_this' }]), /uuidna_only_this/)
  assert.doesNotMatch(renderPackagePage(p, []), /potentialAction/, 'no tools, no tool list — not an empty one')
})
