// browser-apps-usable — THE GATE: every honest browser app surface must mount, compute, and resolve man samples.
// Integrates manDrivenPortCoverage (man→app→hexbit). Fails if a shelf claims "live at" without a Vue mount.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  BROWSER_SURFACES, MAN_BROWSER_SAMPLES, browserAppsUsable, docHasMount,
} from '../quantum/apps/browser-usable.js'
import { resolveManPage, manAppWitness } from '../quantum/os/catalogue.js'

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
