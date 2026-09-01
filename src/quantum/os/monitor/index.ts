// quantum/os/monitor — VITEPRESS AS A DEVICE OF uuidnaOS, not a website beside it.
//
// The OS page has carried the line "TypeScript computes · VitePress shows" since the hexbit port, and it was
// accurate and unfolded: the site was documentation that happened to render some panels. This makes the
// relationship structural. The monitor is a DEVICE — it has a panel inventory, a resolution, a refresh, and a
// receipt, exactly as the driver bundle and the boot image do — and uuidnaOS can be asked about it the same way
// it is asked about anything else it carries.
//
// WHAT A MONITOR IS AND IS NOT, and the distinction is the whole honesty of the model. A monitor DISPLAYS; it
// does not compute. Every figure on every panel is computed in TypeScript — by the ledger, the census, the
// timing boundary — and the panel's only job is to put it where a person can see it. Calling VitePress a monitor
// is a MODEL, not a claim that a static site generator executes anything. Where a panel does compute in the
// visitor's tab (PortsConsole, ArchMetrics), it is uuidnaOS running there, not VitePress.
//
// LIVE PANELS ARE THE ONES THAT MATTER and they are counted separately. A panel rendered at build time shows what
// was true when the site was built; a panel inside <ClientOnly> runs on the reader's own machine and shows what
// is true now, on their hardware. The second kind is the only kind that can report an architecture, and a
// monitor census that averaged the two would hide which numbers are stale by construction.
//
// PRIMED, NOT READ. The inventory comes from the host that can enumerate files; this module holds no filesystem,
// so the monitor can be asked about from a tab as readily as from a build. Absent an inventory it says so.
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

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
