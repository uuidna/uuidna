// catalogue-browser — browse/inspect the primed Alpine census (pure half of CatalogueBrowser.vue).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { browseCatalogue, inspectCataloguePackage } from '../quantum/apps/catalogue-browser.js'
import { UUID_HEXBITS } from '../hexbit/index.js'
import { catalogueState } from '../quantum/os/catalogue.js'

test('browseCatalogue finds published packages with hexbits', () => {
  assert.equal(catalogueState().present, true)
  const r = browseCatalogue('busybox')
  assert.equal(r.present, true)
  assert.ok(r.total > 0)
  assert.ok(r.hits.some((h) => h.name === 'busybox'))
  const hit = r.hits.find((h) => h.name === 'busybox')!
  assert.equal(hit.hexbits.length, UUID_HEXBITS)
  assert.ok(hit.address.includes('-'))
})

test('inspectCataloguePackage returns AVAILABLE provenance + optional man→app', () => {
  const i = inspectCataloguePackage('busybox')
  assert.equal(i.ok, true, i.detail)
  assert.equal(i.package?.name, 'busybox')
  assert.equal(i.package?.hexbits.length, UUID_HEXBITS)
  assert.equal(i.package?.man, 'busybox-doc')
  assert.equal(i.package?.app, 'busybox')
  const miss = inspectCataloguePackage('zzz-no-such-package-ever')
  assert.equal(miss.ok, false)
})
