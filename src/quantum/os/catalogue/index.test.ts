// browser-apps-usable — THE GATE: every honest browser app surface must mount, compute, and resolve man samples.
// Integrates manDrivenPortCoverage (man→app→hexbit). Fails if a shelf claims "live at" without a Vue mount.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import {
  BROWSER_SURFACES, MAN_BROWSER_SAMPLES, browserAppsUsable, docHasMount,
} from '../../apps/browser-usable.js'
import { resolveManPage, manAppWitness, primeCatalogue, catalogue, catalogueBrowse, cataloguePackage, CATALOGUE_FILE } from './index.js'

const loadDocs = (): Map<string, string> => {
  const m = new Map<string, string>()
  for (const s of BROWSER_SURFACES) {
    const p = join(ROOT, 'docs', `${s.doc}.md`)
    if (existsSync(p)) m.set(s.doc, readFileSync(p, 'utf8'))
  }
  return m
}

test('BROWSER USABILITY — store mounts + compute + man samples + man→app→hexbit', () => {
  const r = browserAppsUsable(loadDocs())
  assert.equal(r.definition, 'store+os+man→app→browser')
  assert.ok(r.totals.surfaces >= 10, `expected ≥10 surfaces; got ${r.totals.surfaces}`)
  assert.equal(r.totals.mountsOk, r.totals.surfaces,
    `missing mounts:\n${r.mounts.filter((m) => !m.ok).map((m) => m.detail).join('\n')}`)
  assert.equal(r.totals.computeOk, r.compute.length,
    `compute failures:\n${r.compute.filter((c) => !c.ok).map((c) => `${c.id}: ${c.detail}`).join('\n')}`)
  assert.equal(r.totals.manSamplesOk, MAN_BROWSER_SAMPLES.length,
    `man sample failures:\n${r.manSamples.filter((m) => !m.ok).map((m) => `${m.topic}: ${m.detail}`).join('\n')}`)
  assert.equal(r.totals.catalogueExecOk, r.catalogueExec.length,
    `catalogue exec failures:\n${r.catalogueExec.filter((c) => !c.ok).map((c) => `${c.topic}: ${c.detail}`).join('\n')}`)
  assert.equal(r.totals.installOk, r.installRoutes.length)
  assert.ok(r.manDriven.total > 4000)
  assert.ok(r.manDriven.witnessed >= r.manDriven.total - 25,
    `man→app ${r.manDriven.witnessed}/${r.manDriven.total}`)
  // Browser gate itself must be green (named man orphans are listed but do not fail ok)
  const browserGaps = r.gaps.filter((g) => !g.startsWith('man→app orphans'))
  assert.deepEqual(browserGaps, [], `browser gaps:\n${browserGaps.join('\n')}`)
  assert.equal(r.ok, true)
})

test('MAN_BROWSER_SAMPLES cover every byVia witness path', () => {
  const need = ['corpus', 'origin', 'gtk-doc', 'dev', 'provides', 'self'] as const
  const seen = new Set<string>()
  for (const topic of MAN_BROWSER_SAMPLES) {
    const doc = resolveManPage(topic)
    assert.ok(doc, `${topic} must resolve a documentation package`)
    const w = manAppWitness(doc)
    assert.equal(w.ok, true, `${topic}: ${w.detail}`)
    if (w.via) seen.add(w.via)
  }
  for (const v of need) assert.ok(seen.has(v), `missing ${v} witness; got ${[...seen].join(', ')}`)
})

test('docHasMount sees ClientOnly wrappers', () => {
  assert.equal(docHasMount('<ClientOnly><Chess /></ClientOnly>', 'Chess'), true)
  assert.equal(docHasMount('<HexbitAnimator />', 'HexbitAnimator'), true)
  assert.equal(docHasMount('no mount here', 'Chess'), false)
})

// ── THE LAZY PATH MUST ANSWER EXACTLY WHAT THE EAGER ONE DOES ────────────────────────────────────────────────
// Priming indexes lines instead of materialising 28,635 rows, so a browse or a lookup can answer without the
// 21.9 ms of deps/provides splitting nothing on those paths reads. A fast answer that differs from the slow one
// is not an answer, so these compare the two directly rather than trusting that the same code was reused.
test('lazy browse returns exactly what the materialised browse returns', async () => {
  primeCatalogue(readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8'))
  const lazy = [['', 40, undefined], ['ngin', 40, undefined], ['ssl', 25, 'main'], ['zzzz', 40, undefined]]
    .map(([q, n, r]) => catalogueBrowse(q as string, n as number, r as 'main' | undefined))
  catalogue()   // force full materialisation — subsequent browses take the eager path
  const eager = [['', 40, undefined], ['ngin', 40, undefined], ['ssl', 25, 'main'], ['zzzz', 40, undefined]]
    .map(([q, n, r]) => catalogueBrowse(q as string, n as number, r as 'main' | undefined))
  for (let i = 0; i < lazy.length; i++) {
    assert.equal(lazy[i]!.total, eager[i]!.total, 'the totals must match')
    assert.deepEqual(lazy[i]!.hits.map((h) => h.name), eager[i]!.hits.map((h) => h.name), 'same rows, same order')
  }
})

test('a lazily materialised row equals the eagerly parsed one, field for field', () => {
  primeCatalogue(readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8'))
  const lazyRow = cataloguePackage('busybox')
  catalogue()
  const eagerRow = cataloguePackage('busybox')
  assert.deepEqual(lazyRow, eagerRow, 'one line parsed alone must equal the same line parsed in the walk')
})

test('CONTROL — priming reports the row count without materialising the rows', () => {
  const st = primeCatalogue(readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8'))
  assert.ok(st.present && st.count > 28000, `primed count is real (${st.count})`)
  assert.equal(cataloguePackage('busybox')?.name, 'busybox', 'and a lookup answers from the index')
})
