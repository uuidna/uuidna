import { hexRegisterOf, hexFamiliesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { apiRegistryOf } from '../../mcp/api-door.js'
import { DOORS } from '../../mcp/discovery.js'

/** READY — THE SKILLS THAT FIND THE GAPS AND PROVE NOT READY. The unit does not decide for itself what it still lacks: it
 *  reads the public-API registry's own category tags — the real-world domains — and counts the ones no family covers.
 *  `gaps` lists them, biggest first, as the next domains to build; `domains` counts them; `coverage` is the percentage
 *  covered; and `proof` PROVES NOT READY — it holds only when nothing is uncovered, so while a gap stands its `holds` is
 *  false and the reading names what is missing. These are live readings (they read the registry), never a stored row. */

const PROOF = 'readiness from the record: the public-API registry categories no family covers are the gaps; proof holds only when none stand — otherwise it proves NOT READY and names what is missing'
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ready', dst: 'gate', formula, value, proof: PROOF, ...extra }, holds, { name: `ready.${name}`, params })

/** The registry's category tags and how many public APIs carry each. */
const categoriesOf = async (): Promise<Map<string, number>> => {
  const reg = (await apiRegistryOf()) as { entries: Record<string, { versions?: Record<string, { info?: { 'x-apisguru-categories'?: string[] } }> }> }
  const cats = new Map<string, number>()
  for (const e of Object.values(reg.entries)) for (const v of Object.values(e.versions ?? {})) for (const c of v.info?.['x-apisguru-categories'] ?? []) cats.set(c, (cats.get(c) ?? 0) + 1)
  return cats
}
/** The family names (doors and the Lean prefix stripped), lowercased — what a category is checked against. */
const familyNames = (): Set<string> => new Set([...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x)).map((x) => x.toLowerCase().replace(/^qpu\./, '')))
// a category is covered when a family name meets it whole, or meets one of its words (developer_tools → devtools via "tools")
const isCovered = (fams: Set<string>, c: string): boolean => {
  const tokens = c.split(/[^a-z0-9]+/).filter((t) => t.length > 3)
  return [...fams].some((fam) => c.includes(fam) || fam.includes(c) || tokens.some((t) => fam.includes(t) || t.includes(fam)))
}
/** The uncovered categories, biggest first. */
const gapsOf = async (): Promise<{ category: string; apis: number }[]> => {
  const cats = await categoriesOf()
  const fams = familyNames()
  return [...cats.entries()].filter(([c]) => !isCovered(fams, c)).sort((a, b) => b[1] - a[1]).map(([category, apis]) => ({ category, apis }))
}

export class ReadyFormulas {
  /** FIND THE GAPS: a slice of the registry categories no family covers, biggest first — the next domains to build. value
   *  how many uncovered in all; holds when the slice is non-empty (there is a gap to take). */
  static async gaps(from: number): Promise<CrossFormula> {
    const gaps = await gapsOf()
    const take = 8
    const slice = gaps.slice(from, from + take)
    return f('ready-gaps', 'gaps(from) = the registry categories no family covers, biggest first', gaps.length, Number.isSafeInteger(from) && from >= 0 && slice.length > 0, 'gaps', [from], { uncovered: gaps.length, slice: slice.map((g) => `${g.category} (${g.apis} APIs)`), ...(from + take < gaps.length ? { next: from + take } : {}) })
  }
  /** HOW MANY DOMAINS ARE MISSING: the count of uncovered registry categories. holds only when zero (none missing). */
  static async domains(): Promise<CrossFormula> {
    const gaps = await gapsOf()
    return f('ready-domains', 'domains() = |registry categories no family covers|', gaps.length, gaps.length === 0, 'domains', [], { top: gaps.slice(0, 8).map((g) => g.category) })
  }
  /** COVERAGE: the percentage of registry categories a family covers. value the percent; holds at 100. */
  static async coverage(): Promise<CrossFormula> {
    const cats = await categoriesOf()
    const fams = familyNames()
    const total = cats.size
    const covered = [...cats.keys()].filter((c) => isCovered(fams, c)).length
    const pct = total > 0 ? Math.floor((covered * 100) / total) : 0
    return f('ready-coverage', 'coverage() = ⌊covered categories · 100 / all categories⌋', pct, total > 0 && pct === 100, 'coverage', [], { covered, total })
  }
  /** PROVE NOT READY: readiness holds ONLY when no registry domain is uncovered. value the number still uncovered; while it
   *  is positive, holds is false — the unit is NOT READY, and the reading names the domains that must be built first. */
  static async proof(): Promise<CrossFormula> {
    const gaps = await gapsOf()
    const ready = gaps.length === 0
    return f('ready-proof', 'proof() = [no registry domain is uncovered]; holds only when ready, else proves NOT READY', gaps.length, ready, 'proof', [], { ready, verdict: ready ? 'ready: every registry domain has a family' : `NOT READY: ${gaps.length} domains uncovered`, missing: gaps.slice(0, 8).map((g) => g.category) })
  }
}

for (const name of ['coverage', 'domains', 'gaps', 'proof'] as const)
  hexRegisterOf('ready', name, (ReadyFormulas[name] as (...x: unknown[]) => unknown).bind(ReadyFormulas))
