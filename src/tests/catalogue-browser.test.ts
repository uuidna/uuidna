// catalogue-browser — browse/inspect the primed Alpine census (pure half of CatalogueBrowser.vue).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { browseCatalogue, inspectCataloguePackage, renderAlpineApp, SHADCN_ALPINE_SLOTS } from '../quantum/apps/catalogue-browser.js'
import { UUID_HEXBITS } from '../hexbit/index.js'
import { catalogueState } from '../quantum/os/catalogue.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

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

test('renderAlpineApp is a shadcn card — same slots as renderTheorem, no script', () => {
  const r = browseCatalogue('busybox')
  const hit = r.hits.find((h) => h.name === 'busybox')
  assert.ok(hit)
  const html = renderAlpineApp(hit)
  assert.match(html, /class="uuidna-card"/)
  assert.match(html, /data-alpine="busybox"/)
  assert.ok(!/<script/i.test(html))
  for (const slot of SHADCN_ALPINE_SLOTS) {
    if (slot === 'button' || slot === 'input') continue
    assert.match(html, new RegExp('data-slot="' + slot + '"'))
  }
  assert.match(html, /data-slot="badge"/)
  assert.match(html, /data-slot="handle"/)
})

test('Alpine apps Vue shells use shadcn slots and do not pull Tailwind or React', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/CatalogueBrowser.vue'), 'utf8')
  for (const slot of SHADCN_ALPINE_SLOTS) {
    assert.match(vue, new RegExp('data-slot="' + slot + '"'), `CatalogueBrowser missing ${slot}`)
  }
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  assert.ok(!deps.react && !deps.tailwindcss && !deps['@radix-ui/react-slot'] && !deps['shadcn-vue'])
})
