// ship-preflight — each finder handed a crafted violation (it fires) and a crafted clean case (it stays silent).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { CATALOGUE_FILE } from './quantum/os/catalogue/index.js'
import {
  CLOUDFLARE_ASSET_BYTES, LEAN_JSON_SERVE, oversizedAssets, servedFiles, shipAssetGaps,
  markdownLinks, deadShipLinks, type LinkWorld,
  PIN_MEASUREMENT_FILE, pinMeasurementOf, pageReportOf,
  moduleImports, edgeImports, workerEdgeWalk, shipEdgeGaps,
} from './ship-preflight.js'

test('shipAssetGaps: a served file one byte over the per-asset limit is named, and one at the limit is not', () => {
  const gaps = oversizedAssets([{ path: 'over', size: CLOUDFLARE_ASSET_BYTES + 1 }, { path: 'at', size: CLOUDFLARE_ASSET_BYTES }])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /^over is/)
  assert.deepEqual(oversizedAssets([{ path: 'small', size: 1 }]), [])
  assert.equal(CLOUDFLARE_ASSET_BYTES, 25 * 1024 * 1024, 'Cloudflare states the limit in MiB')
})

test('shipAssetGaps: a root missing the required served sources is refused by name; the live tree serves them all', () => {
  const bare = mkdtempSync(join(tmpdir(), 'ship-'))
  mkdirSync(join(bare, 'lean'))
  const gaps = shipAssetGaps(bare)
  for (const need of ['llm.txt', CATALOGUE_FILE, ...LEAN_JSON_SERVE.map((f) => `lean/${f}`)])
    assert.ok(gaps.some((g) => g.what.startsWith(need + ' is absent')), `${need} must be named when absent`)
  const live = servedFiles(ROOT)
  assert.deepEqual(live.missing, [])
  assert.ok(live.rows.some((r) => r.path === 'llm.txt') && live.rows.some((r) => r.path.startsWith('docs/public/')) && live.rows.some((r) => r.path.endsWith('.lean')),
    'the walk reads docs/public, the lean wings and the copied root files')
})

test('markdownLinks reads prose links and skips fenced and inline code', () => {
  const md = 'see [a](/theorem/a_key) and [p](/publications/mono#x)\n```\n[f](/theorem/fenced)\n```\n`[i](/theorem/inline)`\n'
  assert.deepEqual(markdownLinks(md), ['/theorem/a_key', '/publications/mono#x'])
})

test('shipLinkGaps: a link to an unheld key or slug fires; a paged key, a slug, a static page and an edge route stay silent', () => {
  const world: LinkWorld = {
    paged: (k) => k === 'a_key',
    slugs: new Set(['mono']),
    staticPage: (r) => r === '/theorem/static_one',
    edge: (l) => l === '/theorem/hex_1',
  }
  const files = [{ path: 'docs/x.md', text: '[a](/theorem/a_key) [h](/theorem/hex_1) [s](/theorem/static_one) [m](/publications/mono.html) [g](/theorem/ghost) [g](/theorem/ghost/) [n](/publications/nope)' }]
  const gaps = deadShipLinks(files, world)
  assert.equal(gaps.length, 2, gaps.map((g) => g.what).join('\n'))
  assert.match(gaps[0]!.what, /^\/theorem\/ghost — linked 2 time\(s\), first in docs\/x\.md/)
  assert.match(gaps[1]!.what, /^\/publications\/nope/)
  assert.deepEqual(deadShipLinks([{ path: 'docs/y.md', text: '[a](/theorem/a_key)' }], world), [])
})

test('the page report reads the pin\'s recorded measurement, and names it UNMEASURED when the record is gone', () => {
  const text = readFileSync(join(ROOT, PIN_MEASUREMENT_FILE), 'utf8')
  const rec = pinMeasurementOf(text)
  assert.ok(rec, `${PIN_MEASUREMENT_FILE} records the died/fit reading`)
  assert.equal(rec.object + rec.statics, rec.died, 'the recorded parts sum to the recorded whole')
  assert.ok(rec.fit < rec.died && rec.cap < rec.movedTo)
  assert.equal(pinMeasurementOf(text.replace(/static\) died/g, 'static) lived')), null, 'a record without its died reading is not a measurement')
  assert.match(pageReportOf({ object: 10, statics: 2, pin: 12288 }, null), /UNMEASURED/)
  const line = pageReportOf({ object: rec.object, statics: rec.statics + 1, pin: rec.movedTo }, rec)
  assert.match(line, /1 more than the count that died/)
  assert.match(line, /Reported, not gated/)
})

test('moduleImports reads static imports and re-exports, and skips type-only and dynamic ones', () => {
  const src = [
    "import { a,\n  b } from './multi.js'",
    "import './side.js'",
    "import * as ns from 'node:path'",
    "export * from './re.js'",
    "import type { T } from 'node:fs'",
    "const fs = await import('node:fs')",
    "// import { x } from 'node:os'",
  ].join('\n')
  assert.deepEqual(moduleImports(src).sort(), ['./multi.js', './re.js', './side.js', 'node:path'])
})

test('shipEdgeGaps: a builtin imported by a reachable module fires; an unreachable one and a boundary read stay silent', () => {
  const files: Record<string, string> = {
    '/w.js': "import { a } from './a.js'\nimport { c } from './c.js'\nimport './gone.js'",
    '/a.js': "import { readFileSync } from 'node:fs'",
    '/b.js': "import { readFileSync } from 'node:fs'", // nothing reaches b
    '/c.js': "import { hostFs } from './boundary.js'\nimport type { T } from 'node:fs'",
    '/boundary.js': "const fs = process.getBuiltinModule('node:fs')",
  }
  const resolveSpec = (from: string, spec: string): string | null => {
    if (!spec.startsWith('./')) return null
    const p = '/' + spec.slice(2)
    return p in files ? p : null
  }
  const w = edgeImports('/w.js', (p) => files[p] ?? null, resolveSpec, (s) => s.startsWith('node:'))
  assert.deepEqual(w.hits, [{ module: '/a.js', spec: 'node:fs' }])
  assert.deepEqual(w.unresolved, [{ module: '/w.js', spec: './gone.js' }])
  assert.equal(w.reached, 4)
  const clean = edgeImports('/c.js', (p) => files[p] ?? null, resolveSpec, (s) => s.startsWith('node:'))
  assert.deepEqual(clean.hits, [])
})

test('shipEdgeGaps on the live worker: the split modules are REACHED and import no builtin', () => {
  const w = workerEdgeWalk(ROOT)
  for (const m of ['lead-clusters.js', 'handle-store-census.js', 'receipt-memo.js'])
    assert.ok(w.modules.some((p) => p.endsWith('/dist/' + m)) && !w.hits.some((h) => h.module.endsWith('/dist/' + m)), `${m} is on the worker's graph and imports no builtin`)
  assert.deepEqual(shipEdgeGaps(ROOT), [])
})
