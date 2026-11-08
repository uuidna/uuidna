import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ADMIN — THE PAYLOAD CMS ADMIN UI, AS ARITHMETIC (its config chosen by the registry, not by hand). The dashboard is numbers:
 *  the columns a list shows, how collections fan out into nav groups, the share of fields a component overrides, which
 *  collections carry a live preview, the density of a list, how long custom components take to load, and what stays hidden.
 *  Crosses to `payload` — admin is the face payload wears. A measure. */

const PROOF = 'admin arithmetic (list columns, collection groups, custom components, live preview, nav density, load cost, hidden fields); the payload admin UI as exact integers; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'admin', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `admin.${name}`, params })

export class AdminFormulas {
  /** LIST COLUMNS: the share of columns a list shows. value ⌊shown · 100 / total⌋. */
  static columns(shown: number, total: number): CrossFormula { return c('admin-columns', 'columns(shown, total) = ⌊shown · 100 / total⌋', total > 0 ? Math.floor((shown * 100) / total) : 0, nat(shown, total) && total > 0 && shown <= total, 'columns', [shown, total]) }
  /** CUSTOM COMPONENTS: the share of UI a component overrides. value ⌊custom · 100 / total⌋. */
  static components(custom: number, total: number): CrossFormula { return c('admin-components', 'components(custom, total) = ⌊custom · 100 / total⌋', total > 0 ? Math.floor((custom * 100) / total) : 0, nat(custom, total) && total > 0 && custom <= total, 'components', [custom, total]) }
  /** LIST DENSITY: the fields packed into each row. value ⌊fields / rows⌋. */
  static density(fields: number, rows: number): CrossFormula { return c('admin-density', 'density(fields, rows) = ⌊fields / rows⌋', rows > 0 ? Math.floor(fields / rows) : 0, nat(fields, rows) && rows > 0, 'density', [fields, rows]) }
  /** NAV GROUPS: the collections gathered into each group. value ⌊collections / groups⌋. */
  static groups(collections: number, groups: number): CrossFormula { return c('admin-groups', 'groups(collections, groups) = ⌊collections / groups⌋', groups > 0 ? Math.floor(collections / groups) : 0, nat(collections, groups) && groups > 0, 'groups', [collections, groups]) }
  /** HIDDEN FIELDS: the share of fields kept out of the admin. value ⌊hidden · 100 / total⌋. */
  static hidden(hidden: number, total: number): CrossFormula { return c('admin-hidden', 'hidden(hidden, total) = ⌊hidden · 100 / total⌋', total > 0 ? Math.floor((hidden * 100) / total) : 0, nat(hidden, total) && total > 0 && hidden <= total, 'hidden', [hidden, total]) }
  /** LOAD COST: the custom components at a cost of milliseconds each. value components · ms. */
  static load(components: number, ms: number): CrossFormula { return c('admin-load', 'load(components, ms) = components · ms', components * ms, nat(components, ms), 'load', [components, ms]) }
  /** NAV ITEMS: the nav items carried by each group. value ⌊items / groups⌋. */
  static nav(items: number, groups: number): CrossFormula { return c('admin-nav', 'nav(items, groups) = ⌊items / groups⌋', groups > 0 ? Math.floor(items / groups) : 0, nat(items, groups) && groups > 0, 'nav', [items, groups]) }
  /** LIVE PREVIEW: the share of collections with a live preview. value ⌊enabled · 100 / collections⌋. */
  static preview(enabled: number, collections: number): CrossFormula { return c('admin-preview', 'preview(enabled, collections) = ⌊enabled · 100 / collections⌋', collections > 0 ? Math.floor((enabled * 100) / collections) : 0, nat(enabled, collections) && collections > 0 && enabled <= collections, 'preview', [enabled, collections]) }
}

for (const name of ['columns', 'components', 'density', 'groups', 'hidden', 'load', 'nav', 'preview'] as const)
  hexRegisterOf('admin', name, (AdminFormulas[name] as (...x: unknown[]) => unknown).bind(AdminFormulas))
