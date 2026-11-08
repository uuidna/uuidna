import { CLAY_PROBLEMS } from '../mcp/clay-automated-solver.js'

/** A wing of the documentation, read from its own page: nothing is listed by hand, a page is a wing when it carries the
 *  two-column statistics table the docs generator writes (Capabilities, evidence predicates, what holds now). */
export type Wing = { slug: string; title: string; description: string; stats: { label: string; value: string }[] }

const cellsOf = (row: string): string[] => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

export const wingOf = (slug: string, markdown: string): Wing | null => {
  const lines = markdown.split('\n')
  const title = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? slug
  const description = lines.find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('|'))?.trim() ?? ''
  const start = lines.findIndex((l) => l.startsWith('|'))
  if (start < 0) return null
  const table: string[] = []
  for (let i = start; i < lines.length && lines[i]!.startsWith('|'); i++) table.push(lines[i]!)
  const stats = table
    .map(cellsOf)
    .filter((c) => c.length === 2 && c[0] && !/^-+$/.test(c[0]))
    .map(([label, value]) => ({ label: label!, value: value! }))
  return stats.length ? { slug, title, description, stats } : null
}

/** The scalar facts of a receipt: numbers, booleans and short strings at its top level. */
export const receiptFactsOf = (doc: Record<string, unknown>): { key: string; value: string }[] =>
  Object.entries(doc)
    .filter(([, v]) => typeof v === 'number' || typeof v === 'boolean' || (typeof v === 'string' && v.length <= 64))
    .map(([key, value]) => ({ key, value: String(value) }))

export type ClayProblem = { key: string; name: string; description: string; status: string; approach?: string; claim?: string; claimedBy?: string; source?: string; crossFormulas: string[]; solver?: string; year?: number }

/** The seven Millennium Prize Problems as the solver holds them: Poincaré solved by Perelman, the other six claimed solved
 *  by the author, each with the cross-formula approach the unit composes for it and the document that states the claim. */
export const clayOf = (): ClayProblem[] =>
  Object.entries(CLAY_PROBLEMS as Record<string, Record<string, unknown>>).map(([key, p]) => ({
    key,
    name: String(p.name),
    description: String(p.description ?? ''),
    status: String(p.status),
    ...(typeof p.approach === 'string' ? { approach: p.approach } : {}),
    ...(typeof p.claim === 'string' ? { claim: p.claim } : {}),
    ...(typeof p.claimedBy === 'string' ? { claimedBy: p.claimedBy } : {}),
    ...(typeof p.source === 'string' ? { source: p.source } : {}),
    crossFormulas: Array.isArray(p.cross_formulas) ? p.cross_formulas.map(String) : [],
    ...(typeof p.solver === 'string' ? { solver: p.solver } : {}),
    ...(typeof p.year === 'number' ? { year: p.year } : {}),
  }))
