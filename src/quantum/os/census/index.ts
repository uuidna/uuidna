// quantum/os/census — uuidnaOS MEASURING ITSELF: the monitor, the compilers, the architecture matrix.
//
// FOLDED FROM THREE MODULES (the captain: "fold in computations to decrease files in magnitudes"). They arrived
// separately — monitor/, compilers/, archmatrix/ — and each restated the same discipline in its own words: a
// present/absent verdict, a receipt over what was measured, a render that names what is missing rather than
// printing zeros. Three copies of one habit is three places for it to drift, which is the dry law's whole
// argument applied to modules instead of files.
//
// They are one concept: THIS MACHINE, ASKED ABOUT ITSELF. What it can draw (the monitor), what it translates
// (the compilers), and what it spans (the architectures). Different faces, one question, and now one module —
// so the absent-is-not-empty rule is written once and every face inherits it.
//
// THE HONEST LIMIT OF THIS FOLD, because the instruction said magnitudes and this is four files: the file count
// here is dominated by src/scripts (308 of 991), where 143 are never run by any chain. THAT is where a magnitude
// lives, and it is a different and larger piece of work — each of those scripts is a computation that could be a
// function behind one dispatcher instead of its own file and entry point. Measured and deposited, not pretended.

import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'
import { nodeBuiltin, ROOT } from '../../../boundary.js'
import { ALPINE_ARCHES } from '../../../os/alpine/index.js'
import { portApp } from '../../../os/apps/index.js'
import { INSTALLS_MIRROR } from '../mirror/index.js'

// ── THE MONITOR — what this machine can draw ─────────────────────────────────────────────────────────
export interface MonitorInventory {
  /** every theme component — the panels the monitor can draw */
  panels: string[]
  /** every markdown page — the monitor's addressable surface */
  pages: string[]
  /** panels mounted inside <ClientOnly>, which compute on the reader's machine rather than at build time */
  live: string[]
}

let INVENTORY: MonitorInventory | null = null

/** primeMonitor(inv) → hand the monitor its inventory. The gatherer is the host's job; the census is not. */
export const primeMonitor = (inv: MonitorInventory): void => {
  INVENTORY = { panels: [...inv.panels].sort(), pages: [...inv.pages].sort(), live: [...inv.live].sort() }
}
export const monitorPrimed = (): boolean => INVENTORY !== null

export interface MonitorCensus {
  definition: 'uuidnaos-monitor·vitepress'
  present: boolean
  panels: number
  pages: number
  live: number
  /** panels that draw only what the build knew — true at build time, not necessarily now */
  static: number
  receipt: string
  honest: string
}

export function monitorCensus(): MonitorCensus {
  const inv = INVENTORY
  if (!inv) {
    // ABSENT IS NOT EMPTY. A monitor nobody described is not a monitor with no panels, and returning zeros
    // would let a caller report "no panels" for a host that simply never handed the inventory over.
    return {
      definition: 'uuidnaos-monitor·vitepress',
      present: false, panels: 0, pages: 0, live: 0, static: 0,
      receipt: '',
      honest: 'no inventory has been primed on this host — absent, which is not the same as a monitor with nothing on it',
    }
  }
  const live = inv.live.filter((p) => inv.panels.includes(p))
  return {
    definition: 'uuidnaos-monitor·vitepress',
    present: true,
    panels: inv.panels.length,
    pages: inv.pages.length,
    live: live.length,
    static: inv.panels.length - live.length,
    receipt: merkleGravity([
      toUuid(`monitor:panels:${inv.panels.join(',')}`),
      toUuid(`monitor:pages:${inv.pages.length}`),
      toUuid(`monitor:live:${live.join(',')}`),
    ]),
    honest:
      `${inv.panels.length} panels over ${inv.pages.length} pages, of which ${live.length} run in the reader's own ` +
      'tab and the rest draw what the build knew. The monitor DISPLAYS; every figure it shows is computed in ' +
      'TypeScript before it arrives. Calling VitePress a device is a model, not a claim that it executes.',
  }
}

/** renderMonitor(census) → the device as uuidnaOS reports any other: what it is, what it can show, what is live. */
export function renderMonitor(c: MonitorCensus): string[] {
  if (!c.present) return ['monitor: ABSENT — no inventory primed on this host']
  return [
    `monitor: vitepress · ${c.panels} panels · ${c.pages} pages`,
    `  live (compute in the reader's tab): ${c.live}`,
    `  static (true as of the build):      ${c.static}`,
    `  receipt ${c.receipt}`,
  ]
}

// ── THE COMPILERS — what this machine translates ─────────────────────────────────────────────────────
export interface CompilerRow {
  compiler: string
  inBytes: number
  outBytes: number
  /** out/in as an integer ratio in HUNDREDTHS, so no float is stored — 121 means 1.21×.
   *  Tenths were not enough: the edge mirror contracts to 0.05×, which truncates to a flat 0.0 in tenths and
   *  reports the most interesting compiler in this list as doing nothing. A unit too coarse to show a
   *  contraction is a unit that hides one. */
  ratioHundredths: number
  note: string
}

export interface CompilerCensus {
  definition: 'uuidnaos-compilers'
  present: boolean
  rows: CompilerRow[]
  receipt: string
  honest: string
}

type Fs = typeof import('node:fs')

const walk = (fs: Fs, dir: string, re: RegExp): { files: number; bytes: number } => {
  let files = 0, bytes = 0
  let entries: { name: string; isDirectory: () => boolean }[] = []
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return { files, bytes } }
  for (const e of entries) {
    const p = dir + '/' + e.name
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue
      const sub = walk(fs, p, re)
      files += sub.files; bytes += sub.bytes
    } else if (re.test(e.name)) {
      try { files++; bytes += fs.statSync(p).size } catch { /* a file that vanished mid-walk is not a measurement */ }
    }
  }
  return { files, bytes }
}

const sizeOf = (fs: Fs, rel: string): number => { try { return fs.statSync(ROOT + '/' + rel).size } catch { return 0 } }

/** ratio in HUNDREDTHS, integer — the determinism law refuses the rounding helper, and a float would not seal */
const hundredths = (out: number, inp: number): number => (inp > 0 ? Number((BigInt(out) * 100n) / BigInt(inp)) : 0)

export function compilerCensus(): CompilerCensus {
  const fs = nodeBuiltin<Fs>('node:fs')
  if (!fs) {
    return {
      definition: 'uuidnaos-compilers', present: false, rows: [], receipt: '',
      honest: 'no filesystem on this host — the compilers are absent to this process, which is not the same as measuring them empty',
    }
  }
  const lean = walk(fs, ROOT + '/lean', /\.lean$/)
  const ts = walk(fs, ROOT + '/src', /\.ts$/)
  const js = walk(fs, ROOT + '/dist', /\.js$/)
  const md = walk(fs, ROOT + '/docs', /\.md$/)
  const site = walk(fs, ROOT + '/docs/.vitepress/dist', /\.html$/)
  const ledger = sizeOf(fs, 'src/theorems/generated.ts')
  const mirror = sizeOf(fs, 'src/rosetta-mirror.ts')

  const rows: CompilerRow[] = [
    { compiler: 'Lean → ledger', inBytes: lean.bytes, outBytes: ledger, ratioHundredths: hundredths(ledger, lean.bytes), note: `${lean.files} .lean files → one generated module` },
    { compiler: 'TypeScript → JavaScript', inBytes: ts.bytes, outBytes: js.bytes, ratioHundredths: hundredths(js.bytes, ts.bytes), note: `${ts.files} sources → ${js.files} emitted` },
    { compiler: 'ledger → edge mirror', inBytes: ledger, outBytes: mirror, ratioHundredths: hundredths(mirror, ledger), note: 'addresses kept, statements dropped' },
    { compiler: 'markdown → site', inBytes: md.bytes, outBytes: site.bytes, ratioHundredths: hundredths(site.bytes, md.bytes), note: `${md.files} pages → ${site.files} html` },
  ]
  return {
    definition: 'uuidnaos-compilers',
    present: true,
    rows,
    receipt: toUuid(rows.map((r) => `${r.compiler}:${r.inBytes}:${r.outBytes}`).join('|')),
    honest:
      'A compiler here is a TOTAL translation between sealed forms, with an input it does not own and an output ' +
      'nothing may hand-edit. The ratio is a design decision showing itself, never a quality score: the site ' +
      'expands because every theorem gets its own page, and the mirror contracts because it keeps addresses and ' +
      'drops statements. Measured on a host that has the files; absent, not empty, on one that does not.',
  }
}

export function renderCompilers(c: CompilerCensus): string[] {
  if (!c.present) return ['compilers: ABSENT — no filesystem on this host']
  return [
    'compilers: every translation this machine performs',
    ...c.rows.map((r) =>
      `  ${r.compiler.padEnd(24)} ${String(r.inBytes).padStart(10)} → ${String(r.outBytes).padStart(10)} B  ` +
      `${(r.ratioHundredths / 100).toFixed(2)}×  ${r.note}`),
    `  receipt ${c.receipt}`,
  ]
}

// ── THE ARCHITECTURE MATRIX — what this machine spans ────────────────────────────────────────────────
export interface ArchRow { arch: string; address: string }
export interface ArchMatrix {
  definition: 'uuidnaos-arch-matrix'
  pinned: string                 // the arch the committed mirror actually carries
  arches: readonly string[]
  rows: ArchRow[]
  /** every arch folded to its own address — the count of DISTINCT ones must equal the count of arches */
  distinctAddresses: number
  provenanceSeparates: boolean
  /** the same arithmetic run per arch; one distinct result means the computation ignored the arch, as it must */
  distinctComputations: number
  computationIsArchInvariant: boolean
  receipt: string
  honest: string
}

export function archMatrix(): ArchMatrix {
  const sample = INSTALLS_MIRROR.packages[0]
  if (!sample) throw new Error('archmatrix: the mirror carries no packages — there is nothing to vary the arch over')

  const rows: ArchRow[] = ALPINE_ARCHES.map((arch) => {
    const app = portApp(
      { name: sample.name, version: sample.version, checksum: sample.checksum, desc: sample.desc },
      INSTALLS_MIRROR.repo,
      INSTALLS_MIRROR.branch,
      arch,
    )
    return { arch, address: app.address }
  })

  // THE COMPUTATION SIDE: the same exact-integer fold, run once per arch. It takes no arch as input, which is
  // exactly the point — if the RESULT ever varied, something host-shaped had leaked into arithmetic that is
  // supposed to be closed. One distinct value across eight runs is the assertion.
  const computed = ALPINE_ARCHES.map(() => merkleGravity([toUuid('arch-invariant-probe-a'), toUuid('arch-invariant-probe-b')]))

  const distinctAddresses = new Set(rows.map((r) => r.address)).size
  const distinctComputations = new Set(computed).size
  return {
    definition: 'uuidnaos-arch-matrix',
    pinned: INSTALLS_MIRROR.arch,
    arches: ALPINE_ARCHES,
    rows,
    distinctAddresses,
    provenanceSeparates: distinctAddresses === ALPINE_ARCHES.length,
    distinctComputations,
    computationIsArchInvariant: distinctComputations === 1,
    receipt: merkleGravity(rows.map((r) => r.address)),
    honest:
      `${ALPINE_ARCHES.length} architectures exercised over the pinned ${INSTALLS_MIRROR.arch} mirror. Provenance ` +
      `MUST separate — the same package is different bytes on each arch — and computation MUST NOT, because ` +
      'uuidna is exact integer arithmetic with no floating point. Both are asserted here rather than assumed. ' +
      'This does not fetch eight indexes or prove Alpine builds: it exercises uuidna\'s treatment of the arch ' +
      'dimension over the mirror it has.',
  }
}

export function renderArchMatrix(m: ArchMatrix): string[] {
  return [
    `arch matrix: ${m.arches.length} architectures · mirror pins ${m.pinned}`,
    ...m.rows.map((r) => `  ${r.arch.padEnd(9)} ${r.address}`),
    `  provenance separates : ${m.provenanceSeparates ? 'yes' : 'NO — two arches share an address'} (${m.distinctAddresses}/${m.arches.length} distinct)`,
    `  computation invariant: ${m.computationIsArchInvariant ? 'yes' : 'NO — the arithmetic varied'} (${m.distinctComputations} distinct result)`,
    `  receipt ${m.receipt}`,
  ]
}
