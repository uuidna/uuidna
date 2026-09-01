// quantum/os/uiapi — THE INTERFACE SURFACE uuidnaOS ALREADY HAS, censused against the one Alpine publishes.
//
// Alpine ships 1,424 interface packages across six classes — 522 GUI toolkits, 464 display-server pieces, 245
// terminal and TUI, 108 input, 48 accessibility, 37 web-UI. This is the first domain where uuidna does not have
// to argue about what it could reach: it already HAS a terminal (uuidnaExec, one door and its applets), a GUI
// (the panels the monitor draws), served pages, and semantic markup. The port is therefore a census on both
// sides rather than a new capability, and saying so is the honest shape of it.
//
// WHAT uuidna DOES NOT HAVE, and the asymmetry is the interesting part. It draws no pixels and owns no window:
// the browser is its display server, its compositor and its input stack, and 572 of those 1,424 packages
// (display-server plus input) are things a tab is GIVEN rather than things uuidna implements. That is not a
// limit dressed as a law — os/runtime could plan a verified run of any of them — it is a description of where
// the work currently sits, and the number is worth stating because it is most of the domain.
//
// THE ACCESSIBILITY LINE IS THE ONE WORTH READING, because it is the only class where uuidna does something
// structural rather than borrowing. Every served package page carries schema.org microdata — itemscope,
// itemtype, itemprop — so the page is machine-readable by a screen reader, a search engine and an agent through
// the same markup. That is not a claim of WCAG conformance, which is a thing an audit decides and this is not
// an audit; it is the measurable fact underneath.
import { APPLETS } from '../exec/index.js'
import { primeMonitor, monitorCensus } from '../census/index.js'
import { MONITOR_INVENTORY } from '../census/inventory/index.js'
import { packagePage, renderPackagePage } from '../pkgpage/index.js'
import { catalogue } from '../catalogue/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

/** the six interface classes Alpine's own descriptions name, and who provides each here */
export const UI_CLASSES: readonly { ui: string; match: RegExp; provider: 'uuidna' | 'the browser' }[] = [
  { ui: 'terminal/tui', match: /\b(ncurses|terminal emulator|tui|curses|readline|termbox|tmux|screen multiplexer)\b/i, provider: 'uuidna' },
  { ui: 'gui toolkit', match: /\b(gtk|qt5|qt6|wxwidgets|fltk|tk widget|imgui|egui|libadwaita)\b/i, provider: 'uuidna' },
  { ui: 'web ui', match: /\b(browser engine|webkit|gecko|html render\w*|dom|css engine)\b/i, provider: 'the browser' },
  { ui: 'display server', match: /\b(wayland|xorg|x11|compositor|display server|wlroots)\b/i, provider: 'the browser' },
  { ui: 'input', match: /\b(libinput|keyboard layout|xkb|touchpad|input method|ime|fcitx|ibus)\b/i, provider: 'the browser' },
  { ui: 'a11y', match: /\b(accessib\w*|screen reader|at-spi|braille|speech synthes\w*)\b/i, provider: 'uuidna' },
]

export interface UiClassRow { ui: string; alpinePackages: number; provider: string; uuidnaSurface: string }

export interface UiApiCensus {
  definition: 'alpine-interface-port·census-both-sides'
  alpineTotal: number
  /** packages in classes a tab is GIVEN rather than uuidna implementing them */
  providedByBrowser: number
  rows: UiClassRow[]
  own: { applets: number; panels: number; livePanels: number; pages: number; microdataProps: number }
  receipt: string
}

export function uiApi(): UiApiCensus {
  const rows0 = catalogue()
  primeMonitor(MONITOR_INVENTORY)
  const m = monitorCensus()

  // one served page, measured rather than asserted — the a11y claim rests on this count
  const page = packagePage('zstd')
  const html = page ? renderPackagePage(page, []) : ''
  const microdataProps = (html.match(/itemprop=/g) ?? []).length

  const own = { applets: APPLETS.length, panels: m.panels, livePanels: m.live, pages: m.pages, microdataProps }
  const surfaceOf: Record<string, string> = {
    'terminal/tui': `uuidnaExec — ${own.applets} applets behind one door`,
    'gui toolkit': `${own.panels} panels, ${own.livePanels} computing in the reader's own tab`,
    'web ui': `${own.pages} served pages, rendered from the ledger`,
    'display server': 'none — the tab is the display; uuidna draws no pixels and owns no window',
    'input': 'none — the browser delivers events; uuidna reads them',
    'a11y': `schema.org microdata: ${own.microdataProps} itemprops on one served page`,
  }

  const rows: UiClassRow[] = UI_CLASSES.map((c) => ({
    ui: c.ui,
    alpinePackages: rows0.filter((p) => c.match.test(p.name) || c.match.test(p.desc)).length,
    provider: c.provider,
    uuidnaSurface: surfaceOf[c.ui] ?? '',
  }))

  return {
    definition: 'alpine-interface-port·census-both-sides',
    alpineTotal: rows.reduce((s, r) => s + r.alpinePackages, 0),
    providedByBrowser: rows.filter((r) => r.provider === 'the browser').reduce((s, r) => s + r.alpinePackages, 0),
    rows,
    own,
    receipt: merkleGravity(rows.map((r) => toUuid(`ui:${r.ui}:${r.alpinePackages}`))),
  }
}

export function renderUi(c: UiApiCensus): string[] {
  return [
    `interface: ${c.alpineTotal} Alpine packages across ${c.rows.length} classes · ${c.providedByBrowser} of them provided to a tab rather than implemented here`,
    ...c.rows.map((r) => `  ${r.ui.padEnd(15)} ${String(r.alpinePackages).padStart(4)}  [${r.provider}]  ${r.uuidnaSurface}`),
    `  receipt ${c.receipt}`,
  ]
}
