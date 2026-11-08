// THE LEADS, ROUTED. Every open lead in scripts/leads.memory.json gets exactly one route, decided by the lead's own
// words and these rules, so no lead waits on someone reading a list. The routes:
//   local     the unit can carry it out itself; a handler runs it (none is wired yet, so it is named, not run)
//   approval  it publishes, pushes, releases or contacts someone outside the unit: it waits for the user's yes
//   blocked   it would touch work that is someone else's in-flight change: it waits until that owner says otherwise
//   external  it needs a credential or a host the unit does not hold: it names what it needs
// holds is true when every open lead has a route: the check that no lead is left unrouted.
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { mcpFuseOf } from '../quantum/processing/unit/index.js'

type Lead = { name: string; state: string; lead: string }

// the memory is read from the repository when there is one; a host with no file system (a Worker) has no memory, and says so
const MEMORY = (() => { try { return fileURLToPath(new URL('../../scripts/leads.memory.json', import.meta.url)) } catch { return undefined } })()

const ROUTES = [
  { route: 'blocked', test: /in-flight|uncommitted/i, owes: 'the owner of the in-flight change says what to do with it' },
  { route: 'approval', test: /\bpublish|\bpush\b|\brelease\b|\bDOI\b|\bZenodo\b|\bcontact|waterscarcity@|\bemail\b/i, owes: 'the user says yes to the outward step' },
  { route: 'external', test: /write token|credential|\btoken\b/i, owes: 'the credential or host the unit does not hold' },
] as const

type Routed = { name: string; route: 'local' | 'approval' | 'blocked' | 'external'; owes: string; lead: string }

/** The route of one lead, from its words. A lead no rule matches is local. */
export const routeOf = (lead: Lead) => {
  const hit = ROUTES.find((r) => r.test.test(lead.lead))
  return hit ? { route: hit.route, owes: hit.owes } : { route: 'local' as const, owes: 'a handler the unit carries out itself' }
}

/** Every lead in the memory, routed. Crossed and standing leads are not open, so they carry no route. */
export const leadsOf = () => {
  if (MEMORY === undefined || !existsSync(MEMORY)) return { source: 'scripts/leads.memory.json', reached: false, leads: [] as Routed[], holds: false }
  const memory = JSON.parse(readFileSync(MEMORY, 'utf8')) as { leads: Lead[] }
  const open: Routed[] = memory.leads.filter((l) => l.state === 'open').map((l) => ({ name: l.name, ...routeOf(l), lead: l.lead }))
  const counts = open.reduce<Record<string, number>>((acc, row) => ({ ...acc, [row.route]: (acc[row.route] ?? 0) + 1 }), {})
  return {
    source: 'scripts/leads.memory.json',
    reached: true,
    total: memory.leads.length,
    open: open.length,
    counts,
    leads: open,
    holds: open.every((row) => typeof row.route === 'string' && row.route.length > 0),
  }
}

mcpFuseOf('leads', {
  description: 'The open leads, each routed: local (the unit carries it out), approval (waits for the user\'s yes), blocked (someone else\'s in-flight work) or external (needs a credential). { name } returns one lead. holds is true when every open lead has a route.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'one lead by name, e.g. xprize-water-scarcity' },
      route: { type: 'string', description: 'only the leads on this route: local, approval, blocked or external' },
    },
  },
  run: async (args) => {
    const all = leadsOf()
    if (!all.reached) return { kind: 'leads', ...all, next: ['the leads memory is not on this host: run the unit from its repository'] }
    if (typeof args.name === 'string') {
      const row = all.leads.find((l) => l.name === args.name)
      if (!row) return { kind: 'leads', name: args.name, holds: false, next: ['no open lead by that name: list them with { }'] }
      return { kind: 'leads', ...row, holds: true }
    }
    const rows = typeof args.route === 'string' ? all.leads.filter((l) => l.route === args.route) : all.leads
    return { kind: 'leads', source: all.source, total: all.total, open: all.open, counts: all.counts, leads: rows, holds: all.holds }
  },
})
