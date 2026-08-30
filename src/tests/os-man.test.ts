// os-man — man page → one exec door → Layer 2 run planner
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  catalogue, catalogueCompile, cataloguePackage, manPagePackages, manAppWitness, resolveManApp,
  resolveManPage, manAppOriginCandidates, manDrivenPortCoverage, overlayManDrivenPortCoverage,
  packageSelfTest, isManPagePackage, providedCommands,
  type CataloguePackage, type ManAppVia,
} from '../quantum/os/catalogue/index.js'
import { fresh, exec } from '../quantum/os/harness/index.js'
import { planAlpineRun } from '../os/runtime/index.js'
import { handleOf, handlePath, handleOfPath, isHandle } from '../handle.js'
import { HANDLE_HEXBITS, UUID_HEXBITS } from '../hexbit/index.js'
import { callTool, MCP_CATALOG } from '../mcp.js'

test.beforeEach(fresh)


const VIAS: readonly ManAppVia[] = ['corpus', 'origin', 'gtk-doc', 'libs', 'dev', 'provides', 'self']

const cmdsOf = (p: CataloguePackage): string[] => providedCommands(p)

const honestPass = (p: CataloguePackage): boolean => packageSelfTest(p).ok

const handleRoundTrip = (p: CataloguePackage): boolean => {
  const h = handleOf(catalogueCompile(p).address)
  return isHandle(h) && h.length === HANDLE_HEXBITS && handleOfPath(handlePath(h)) === h
}

/** topics that resolveManPage maps onto THIS documentation package — the live combination set, not a wish list */
const topicsHitting = (man: CataloguePackage): string[] => {
  const tries = [man.name, ...manAppOriginCandidates(man.name)]
  if (man.name.endsWith('-doc')) tries.push(man.name.slice(0, -4))
  if (man.name.endsWith('-man-pages')) tries.push(man.name.slice(0, -'-man-pages'.length))
  return [...new Set(tries)].filter((t) => resolveManPage(t)?.name === man.name)
}

interface Scenario {
  via: ManAppVia
  man: CataloguePackage
  app: CataloguePackage
  synthetic?: boolean
}

function liveByVia(): Map<ManAppVia, CataloguePackage[]> {
  const m = new Map<ManAppVia, CataloguePackage[]>(VIAS.map((v) => [v, []]))
  for (const man of manPagePackages()) {
    const w = manAppWitness(man)
    if (!w.ok || !w.via) continue
    m.get(w.via)!.push(man)
  }
  for (const list of m.values()) list.sort((a, b) => (a.name < b.name ? -1 : 1))
  return m
}

/** libs is unoccupied on the live APKINDEX (no *-doc whose origin is missing while origin-libs exists).
 *  The branch still has to fire: a fabricated *-doc against a real *-libs whose stem is unpublished. */
function libsScenario(): Scenario {
  for (const p of catalogue()) {
    if (!p.name.endsWith('-libs')) continue
    const stem = p.name.slice(0, -5)
    if (cataloguePackage(stem) || cataloguePackage(stem + '-doc')) continue
    const man: CataloguePackage = {
      repo: p.repo, name: `${stem}-doc`, version: p.version, checksum: p.checksum,
      desc: `${p.desc} (documentation)`, deps: [], provides: [],
    }
    const resolved = resolveManApp(man)
    assert.ok(resolved, `${man.name} must resolve through the libs branch against live ${p.name}`)
    assert.equal(resolved.via, 'libs')
    assert.equal(resolved.app.name, p.name)
    return { via: 'libs', man, app: resolved.app, synthetic: true }
  }
  throw new Error('no live *-libs whose stem is unpublished — the libs fixture cannot fire')
}

function scenarios(): Scenario[] {
  const grouped = liveByVia()
  const out: Scenario[] = []
  for (const via of VIAS) {
    if (via === 'libs') { out.push(libsScenario()); continue }
    const man = grouped.get(via)![0]
    assert.ok(man, `live catalogue must occupy via ${via}`)
    const resolved = resolveManApp(man)
    assert.ok(resolved)
    out.push({ via, man, app: resolved.app })
  }
  return out
}

function assertLayer1(s: Scenario, topics: string[]): void {
  const w = manAppWitness(s.man)
  assert.equal(w.ok, true, w.detail)
  assert.equal(w.via, s.via)
  assert.equal(w.app, s.app.name)
  assert.equal(w.manHexbits, true)
  assert.equal(w.appHexbits, true)
  assert.ok(handleRoundTrip(s.man), `${s.man.name} handle must round-trip`)
  assert.ok(handleRoundTrip(s.app), `${s.app.name} handle must round-trip`)
  if (!s.synthetic) {
    assert.ok(honestPass(s.man), `${s.man.name} self-test must be honest`)
    assert.ok(honestPass(s.app), `${s.app.name} self-test must be honest`)
  }
  for (const topic of topics) {
    const r = exec(`man ${topic}`)
    assert.equal(r.ok, true, `man ${topic}: ${r.output[0]}`)
    const d = r.data as { name?: string; app?: string; witnessOk?: boolean; hexbits?: number[]; kind?: string }
    assert.equal(d.kind, 'man')
    assert.equal(d.name, s.man.name, `man ${topic} must land on ${s.man.name}`)
    assert.equal(d.app, s.app.name)
    assert.equal(d.witnessOk, true)
    assert.equal(d.hexbits?.length, UUID_HEXBITS)
  }
  const apk = exec(`apk info ${s.app.name}`)
  assert.equal(apk.ok, true, apk.output[0])
  assert.equal((apk.data as { name?: string }).name, s.app.name)
}

/** ONE run door — the published cmd: (any language, any binary). Plan, do not author a per-package spawn. */
function assertAutomatedRun(s: Scenario): void {
  const cmds = cmdsOf(s.app)
  const command = cmds[0] ? `${cmds[0]} --help` : '/bin/busybox --help'
  const plan = planAlpineRun(command)
  if (plan.ok) {
    assert.equal(plan.recipe?.command, command)
    assert.ok(plan.backend === 'docker' || plan.backend === 'chroot')
  } else {
    assert.ok(plan.reason, 'a refused run must name why — absent rootfs or no backend, never a missing language port')
  }
}

test('each man via is a scenario — live occupancy named, libs branch fires against a real *-libs', () => {
  const grouped = liveByVia()
  const driven = manDrivenPortCoverage()
  for (const via of VIAS) {
    if (via === 'libs') {
      assert.equal(grouped.get('libs')!.length, 0, 'libs stays unoccupied on the live APKINDEX — a finding, not a pad')
      assert.equal(driven.byVia.libs, 0)
      continue
    }
    assert.ok(grouped.get(via)!.length > 0, `via ${via} must have a live occupant`)
    assert.equal(driven.byVia[via], grouped.get(via)!.length)
  }
  const libs = libsScenario()
  assert.equal(libs.via, 'libs')
  assert.equal(manAppWitness(libs.man).ok, true)
})

test('each live via × every topic form that hits that man package — Layer 1 identity, Layer 2 one run door', () => {
  const seen = new Set<ManAppVia>()
  for (const s of scenarios()) {
    seen.add(s.via)
    const topics = s.synthetic ? [] : topicsHitting(s.man)
    if (!s.synthetic) {
      assert.ok(topics.includes(s.man.name), `${s.man.name} must be reachable under its own name`)
      assert.ok(topics.length >= 1)
    }
    if (s.synthetic) {
      const w = manAppWitness(s.man)
      assert.equal(w.via, 'libs')
      assert.equal(w.ok, true, w.detail)
      assert.ok(handleRoundTrip(s.app))
    } else {
      assertLayer1(s, topics)
    }
    assertAutomatedRun(s)
  }
  assert.deepEqual([...seen].sort(), [...VIAS].sort(), 'every via scenario must have run')
})

test('name-shape combinations: -doc, -man-pages, -gtk-doc, corpus, overlay — not one authored port each', () => {
  const shapes: { label: string; man: CataloguePackage | undefined }[] = [
    { label: '-doc', man: manPagePackages().find((p) => p.name.endsWith('-doc') && !p.name.endsWith('-gtk-doc')) },
    { label: '-man-pages', man: manPagePackages().find((p) => p.name.endsWith('-man-pages')) },
    { label: '-gtk-doc', man: manPagePackages().find((p) => p.name.endsWith('-gtk-doc')) },
    { label: 'corpus', man: cataloguePackage('man-pages') ?? undefined },
    { label: 'overlay', man: cataloguePackage('oh-my-pi-doc') ?? undefined },
  ]
  for (const { label, man } of shapes) {
    assert.ok(man, `shape ${label} must exist in the committed catalogue`)
    assert.equal(isManPagePackage(man), true)
    const w = manAppWitness(man)
    assert.equal(w.ok, true, `${label}: ${w.detail}`)
    const resolved = resolveManApp(man)
    assert.ok(resolved)
    if (label === 'overlay') {
      assert.equal(man.repo, 'overlay')
      const o = overlayManDrivenPortCoverage()
      assert.equal(o.witnessed, o.total)
      assert.ok(manPagePackages().every((p) => p.name !== man.name),
        'overlay docs stay out of the Alpine man denominator')
    }
    if (label !== 'overlay') assertLayer1({ via: w.via!, man, app: resolved.app }, topicsHitting(man))
    else {
      for (const topic of topicsHitting(man)) {
        const r = exec(`man ${topic}`)
        assert.equal(r.ok, true, `man ${topic}`)
        assert.equal((r.data as { witnessOk?: boolean }).witnessOk, true)
      }
    }
    assertAutomatedRun({ via: w.via!, man, app: resolved.app })
  }
})

test('s6 origin prefers -doc over -man-pages — two published docs, one topic combination', () => {
  const doc = cataloguePackage('s6-doc')
  const pages = cataloguePackage('s6-man-pages')
  assert.ok(doc && pages, 'Alpine publishes both s6-doc and s6-man-pages')
  assert.equal(resolveManPage('s6')?.name, 's6-doc', 'origin topic prefers -doc')
  assert.equal(resolveManPage('s6-doc')?.name, 's6-doc')
  assert.equal(resolveManPage('s6-man-pages')?.name, 's6-man-pages')
  assert.notEqual(manAppWitness(doc).app, undefined)
  assert.equal(manAppWitness(pages).ok, true)
})

test('refusals: empty topic, unknown topic, orphan documentation — the combinations that must fail', () => {
  const empty = exec('man')
  assert.equal(empty.ok, false)
  assert.match(empty.output[0]!, /topic is required/)
  const gone = exec('man zzz-no-such-topic-anywhere')
  assert.equal(gone.ok, false)
  assert.match(gone.output[0]!, /no documentation package/)
  const orphan = manAppWitness({
    repo: 'community', name: 'zzz-no-such-origin-doc', version: '1.0.0-r0',
    checksum: 'Q1AAAAAAAAAAAAAAAAAAAAAAAAAAA=', desc: 'docs for nothing',
    deps: [], provides: [],
  })
  assert.equal(orphan.ok, false)
  assert.equal(orphan.app, null)
  assert.match(orphan.detail, /orphan|no catalogued app/)
})

test('MCP is one door, not one tool per language or per man package — each via reaches it', () => {
  assert.ok(MCP_CATALOG.some((t) => t.name === 'uuidna_exec'))
  assert.ok(MCP_CATALOG.some((t) => t.name === 'uuidna_run'), 'Layer 2 run door is served')
  assert.equal(MCP_CATALOG.filter((t) => /^uuidna_.+-doc$/.test(t.name)).length, 0)
  for (const s of scenarios()) {
    if (s.synthetic) continue
    const man = callTool('uuidna_exec', { line: `man ${s.man.name}` }) as {
      ok: boolean; data: { witnessOk?: boolean; app?: string; via?: string }
    }
    assert.equal(man.ok, true, s.man.name)
    assert.equal(man.data.witnessOk, true)
    assert.equal(man.data.app, s.app.name)
    assert.equal(man.data.via, s.via)
    const apk = callTool('uuidna_exec', { line: `apk info ${s.app.name}` }) as {
      ok: boolean; data: { name?: string }
    }
    assert.equal(apk.ok, true)
    assert.equal(apk.data.name, s.app.name)
  }
})
