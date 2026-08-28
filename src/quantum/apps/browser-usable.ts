// quantum/apps/browser-usable — THE HONEST "ALL APPS" BROWSER GATE (pure half).
//
// Doctrine: man pages testing apps folded into hexbits IS port completeness (manDrivenPortCoverage). Browser
// usability is that seal PLUS every store shelf that claims a live route actually mounts an interactive shell,
// PLUS the uuidnaOS terminal door (man applet) and the default-install routes. NOT 28k Playwright sessions —
// the catalogue is provenance; the man→app corpus (~4.7k docs) is the computable completeness denominator.
//
// Mount presence is checked by the caller (scripts/tests hold the docs/ read — this module stays browser-clean).
import { manDrivenPortCoverage, type ManDrivenPortCoverage } from '../os/catalogue.js'
import { uuidnaExec } from '../os/exec.js'
import { defaultInstalls } from '../os/index.js'
import { UUID_HEXBITS } from '../../hexbit/index.js'
import { testClaim, start, applyStride, undo, build } from './categories/coding/index.js'
import { readPassage, findFacts, tryQuote } from './categories/books/index.js'
import { drillOf, attemptDrill, foldFeedback, meterLoop, walkTo, prerequisitesOf } from './categories/practice/index.js'
import { startState, allLegal, nimSum, nimVerdict, mobilityOf } from './categories/gaming/index.js'
import { costOf, walletCensus, leverageOf, compoundAt } from './categories/trading/index.js'
import { renderStates } from './hexbit-player.js'
import { animateStates } from './hexbit-animator.js'
import { browseCatalogue, inspectCataloguePackage } from './catalogue-browser.js'
import { runExecLine } from './exec-shell.js'
import { portPanelView } from './port-panel.js'
import { LEAN_LEDGER } from '../../theorems/generated.js'
import { theorems } from '../../theorems/index.js'
import { theoremDemoCoverage } from './theorem-demos.js'

/** One interactive browser surface the store / OS claims visitors can use. */
export interface BrowserSurface {
  id: string
  shelf: 'kernel' | 'coding' | 'books' | 'gaming' | 'practice' | 'trading' | 'terminal' | 'os'
  route: string
  /** Vue component tag that must appear in the route's markdown (ClientOnly wrappers allowed). */
  mount: string
  /** docs/*.md basename that must carry the mount (without .md). */
  doc: string
}

/** The honest browser-app set — store shelves with live mounts + terminal + OS boot player. Derived once here
 *  so gen-apps "live at" claims and this gate cannot drift into different denominators. */
export const BROWSER_SURFACES: readonly BrowserSurface[] = [
  { id: 'hexbit-animator', shelf: 'kernel', route: '/apps', mount: 'HexbitAnimator', doc: 'apps' },
  { id: 'hexbit-player', shelf: 'kernel', route: '/referrer-song', mount: 'HexbitPlayer', doc: 'referrer-song' },
  { id: 'school-tools', shelf: 'coding', route: '/tools', mount: 'SchoolTools', doc: 'tools' },
  { id: 'book-room', shelf: 'books', route: '/reading-room', mount: 'BookRoom', doc: 'reading-room' },
  { id: 'star-play', shelf: 'gaming', route: '/games', mount: 'StarPlay', doc: 'games' },
  { id: 'nim-play', shelf: 'gaming', route: '/games', mount: 'NimPlay', doc: 'games' },
  { id: 'chess', shelf: 'gaming', route: '/chess', mount: 'Chess', doc: 'chess' },
  { id: 'practice-loop', shelf: 'practice', route: '/school', mount: 'PracticeLoop', doc: 'school' },
  { id: 'trading-floor', shelf: 'trading', route: '/trading', mount: 'TradingFloor', doc: 'trading' },
  { id: 'terminal', shelf: 'terminal', route: '/terminal', mount: 'ExecShell', doc: 'terminal' },
  { id: 'chat-terminal', shelf: 'terminal', route: '/chat', mount: 'UuidnaTerminal', doc: 'chat' },
  { id: 'os-boot', shelf: 'os', route: '/os', mount: 'HexbitPlayer', doc: 'os' },
  { id: 'os-port', shelf: 'os', route: '/os', mount: 'PortPanel', doc: 'os' },
  { id: 'catalogue-browser', shelf: 'os', route: '/catalogue', mount: 'CatalogueBrowser', doc: 'catalogue' },
]

/** Man topics exercised through uuidnaExec — one sample per witness path (byVia), plus boot staples. */
export const MAN_BROWSER_SAMPLES: readonly string[] = [
  'busybox', 'openssl', 'man-pages', 'man-pages-posix', 'apk-tools', 'zlib', 'ca-certificates',
  'dotnet', 'gtk', 'unifont', 'clutter-gtk', 'oh-my-pi',
]

export interface MountCheck {
  id: string
  route: string
  mount: string
  doc: string
  ok: boolean
  detail: string
}

export interface ManSampleCheck {
  topic: string
  ok: boolean
  detail: string
}

export interface ComputeCheck {
  id: string
  ok: boolean
  detail: string
}

export interface BrowserAppsUsable {
  definition: 'store+os+man→app→browser'
  manDriven: ManDrivenPortCoverage
  mounts: MountCheck[]
  compute: ComputeCheck[]
  manSamples: ManSampleCheck[]
  catalogueExec: ManSampleCheck[]
  installRoutes: { route: string; package: string; hexbits: number; ok: boolean }[]
  totals: {
    surfaces: number
    mountsOk: number
    computeOk: number
      manSamplesOk: number
      catalogueExecOk: number
      installOk: number
    manWitnessed: number
    manTotal: number
  }
  gaps: string[]
  ok: boolean
  honest: string
}

const runCompute = (): ComputeCheck[] => {
  const out: ComputeCheck[] = []
  const push = (id: string, fn: () => void): void => {
    try { fn(); out.push({ id, ok: true, detail: 'computed' }) }
    catch (e) { out.push({ id, ok: false, detail: e instanceof Error ? e.message : String(e) }) }
  }
  push('coding/testClaim', () => {
    const r = testClaim('the round turns on seven, proven by theorem song_round_turns_on_seven')
    if (!r.instrumentValid) throw new Error('controls failed')
  })
  push('coding/frame-editor', () => { undo(applyStride(start(), 5)) })
  push('coding/build', () => {
    const b = build([1, 2, 4, 8, 7, 5])
    // address is the audio handle (glyph fold), not a dashed uuid
    if (!b.address || b.address.length < 8) throw new Error('no address')
  })
  push('books/readPassage', () => { if (readPassage('2 + 2 = 4').chars < 1) throw new Error('empty') })
  push('books/findFacts', () => { findFacts('2 + 2 = 4') })
  push('books/tryQuote', () => { tryQuote('the round turns on seven, proven by theorem song_round_turns_on_seven') })
  push('practice/drill', () => {
    const d = drillOf('two_coins', LEAN_LEDGER)
    const t = attemptDrill(d, true, 100)
    foldFeedback([t])
    meterLoop([true, true, true])
    const withCites = LEAN_LEDGER.find((x) => prerequisitesOf(x.key, LEAN_LEDGER).length > 0)
    if (!withCites) throw new Error('no citation road')
    walkTo(withCites.key, LEAN_LEDGER)
  })
  push('gaming/chess', () => { if (allLegal(startState()).length !== 20) throw new Error('start moves') })
  push('gaming/nim', () => { if (nimSum([3, 5, 6]) !== 0 || !nimVerdict([3, 5, 6]).pPosition) throw new Error('nim') })
  push('gaming/mobility', () => { if (mobilityOf('N', 0, 0).count !== 2) throw new Error('knight corner') })
  push('trading/desk', () => {
    const n = theorems().length
    walletCensus(n, n)
    leverageOf(64)
    compoundAt(38)
    costOf({ seal: 1 })
  })
  push('kernel/player', () => { renderStates([1, 2, 4, 8, 7, 5]) })
  push('kernel/animator', () => { animateStates([1, 2, 4, 8, 7, 5]) })
  push('os/catalogue-browser', () => {
    const r = browseCatalogue('musl')
    if (!r.present || r.hits.length === 0) throw new Error(r.why ?? 'no musl hits')
    const i = inspectCataloguePackage('musl')
    if (!i.ok) throw new Error(i.detail)
  })
  push('os/exec-shell', () => {
    const r = runExecLine('ls /terminal')
    if (!r.ok || r.output.length < 1) throw new Error('ls /terminal failed')
    const h = runExecLine('help')
    if (!h.ok) throw new Error('help failed')
  })
  push('os/port-panel', () => {
    const v = portPanelView()
    if (v.status.count < 20 || v.lines.length < 3) throw new Error('port panel incomplete')
  })
  push('theorem/drill-coverage', () => {
    const c = theoremDemoCoverage(LEAN_LEDGER)
    if (!c.ok) throw new Error(`${c.gaps.length} theorems without drill: ${c.gaps.slice(0, 3).join(', ')}`)
  })
  return out
}

const runManSamples = (): ManSampleCheck[] => MAN_BROWSER_SAMPLES.map((topic) => {
  const r = uuidnaExec(`man ${topic}`)
  if (!r.ok) return { topic, ok: false, detail: r.output[0] ?? 'man failed' }
  const d = r.data as { hexbits?: number[]; kind?: string }
  const ok = d.kind === 'man' && Array.isArray(d.hexbits) && d.hexbits.length === UUID_HEXBITS
  return { topic, ok, detail: ok ? `man ${topic} → ${UUID_HEXBITS} hexbits` : 'bad man payload' }
})

/** uuidnaOS terminal doors beyond man samples — full catalogue census + driver/device provenance. */
const CATALOGUE_EXEC_LINES = ['apk list --all', 'ls /catalogue', 'driver', 'device'] as const

const runCatalogueExec = (): ManSampleCheck[] => CATALOGUE_EXEC_LINES.map((line) => {
  const r = uuidnaExec(line)
  if (!r.ok) return { topic: line, ok: false, detail: r.output[0] ?? 'exec failed' }
  if (line === 'apk list --all') {
    const total = (r.data as { total?: number }).total ?? 0
    return { topic: line, ok: total > 25000, detail: `catalogue ${total} packages` }
  }
  if (line === 'ls /catalogue') {
    return { topic: line, ok: r.output.some((l) => l.endsWith('/')), detail: 'repo dirs listed' }
  }
  if (line === 'device') {
    const addr = (r.data as { device?: { deviceAddress?: string } }).device?.deviceAddress ?? ''
    return { topic: line, ok: addr.includes('-'), detail: `device ${addr}` }
  }
  return { topic: line, ok: r.output.some((l) => l.includes('alpine-netboot')), detail: 'driver provenance' }
})

/** docHasMount(src, mount) → whether markdown embeds the Vue tag (ClientOnly wrappers allowed). */
export const docHasMount = (src: string, mount: string): boolean =>
  new RegExp(`<${mount}\\b`).test(src)

/** browserAppsUsable(docSources) → the seal. Caller reads docs/ (this module stays free of node:fs). */
export function browserAppsUsable(docSources: ReadonlyMap<string, string>): BrowserAppsUsable {
  const manDriven = manDrivenPortCoverage()
  const mounts = BROWSER_SURFACES.map((s): MountCheck => {
    const src = docSources.get(s.doc) ?? ''
    const ok = src.length > 0 && docHasMount(src, s.mount)
    return {
      id: s.id, route: s.route, mount: s.mount, doc: s.doc, ok,
      detail: ok ? `${s.doc}.md mounts <${s.mount}>` : `${s.doc}.md missing <${s.mount}> — shelf claims live at ${s.route}`,
    }
  })
  const compute = runCompute()
  const manSamples = runManSamples()
  const catalogueExec = runCatalogueExec()
  const port = defaultInstalls()
  const installRoutes = port.specs.map((s) => ({
    route: s.route,
    package: s.name,
    hexbits: s.hexbits.length,
    ok: s.hexbits.length === UUID_HEXBITS && s.hexbits.every((h) => h >= 0 && h < 16),
  }))

  const gaps: string[] = []
  for (const m of mounts) if (!m.ok) gaps.push(m.detail)
  for (const c of compute) if (!c.ok) gaps.push(`compute ${c.id}: ${c.detail}`)
  for (const m of manSamples) if (!m.ok) gaps.push(`man sample ${m.topic}: ${m.detail}`)
  for (const c of catalogueExec) if (!c.ok) gaps.push(`catalogue exec ${c.topic}: ${c.detail}`)
  for (const i of installRoutes) if (!i.ok) gaps.push(`install ${i.route} (${i.package}) tiles=${i.hexbits}/${UUID_HEXBITS}`)
  const manOk = manDriven.total > 4000
    && manDriven.witnessed >= manDriven.total - 25
    && (manDriven.witnessed === manDriven.total || manDriven.missing.length > 0)
  if (!manOk) {
    gaps.push(`man→app→hexbit ${manDriven.witnessed}/${manDriven.total} — ${manDriven.missing.join(', ') || 'unnamed'}`)
  } else if (manDriven.witnessed < manDriven.total) {
    gaps.push(`man→app orphans (named, not padded): ${manDriven.missing.join(', ')}`)
  }

  const mountsOk = mounts.filter((m) => m.ok).length
  const computeOk = compute.filter((c) => c.ok).length
  const manSamplesOk = manSamples.filter((m) => m.ok).length
  const catalogueExecOk = catalogueExec.filter((c) => c.ok).length
  const installOk = installRoutes.filter((i) => i.ok).length
  const browserGaps = gaps.filter((g) => !g.startsWith('man→app orphans'))
  const ok = browserGaps.length === 0 && manOk

  return {
    definition: 'store+os+man→app→browser',
    manDriven,
    mounts,
    compute,
    manSamples,
    catalogueExec,
    installRoutes,
    totals: {
      surfaces: BROWSER_SURFACES.length,
      mountsOk,
      computeOk,
      manSamplesOk,
      catalogueExecOk,
      installOk,
      manWitnessed: manDriven.witnessed,
      manTotal: manDriven.total,
    },
    gaps,
    ok,
    honest: 'Honest scope: store interactive mounts + uuidnaOS terminal (man samples + catalogue census via apk/ls + driver/device) + default-install routes + '
      + 'manDrivenPortCoverage (man→app→hexbit). Not 28k browser sessions. Orphan -doc rows are named, never padded.',
  }
}
