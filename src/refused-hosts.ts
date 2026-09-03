// refused-hosts — the hosts named by lean/leads.json's `refused` list, READ FROM IT rather than copied out.
//
// A second copy of a boundary is how boundaries drift: refuse a host in the ledger, forget to add it here, and the
// finder that enforces the refusal silently stops covering it — a check that narrows without saying so. So this
// parses the ledger's own list. An unread file answers with an EMPTY list and the caller is told, so
// that "no refused hosts" and "could not read the refusals" are never the same value.
//
// Node-only by construction (it reads a file), and the edge never imports it.
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')
const pathm = (): typeof import('node:path') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:path') as typeof import('node:path')
const urlm = (): typeof import('node:url') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:url') as typeof import('node:url')

const ROOT = (): string => pathm().join(pathm().dirname(urlm().fileURLToPath(import.meta.url)), '..')

/** A hostname as it appears inside a refusal's prose: a dotted name ending in a known public suffix. Deliberately
 *  conservative — a refusal that names no host contributes nothing, which is correct: those refusals are about
 *  CLAIMS and are not mechanically decidable. `.bg` is in the list because refused[] names ceccec.psg.bg. */
const HOST = /\b([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|info|io|dev|edu|gov|bg))\b/gi

export interface RefusedHosts {
  hosts: string[]
  /** false when lean/leads.json could not be read or had no `refused` array — NOT the same as "nothing refused" */
  read: boolean
}

/** refusedHostsFrom(json) → the hosts a refusals list names. Pure: the caller supplies the parsed ledger.
 *  Only the `lead` is scanned — `boundary`/`note` name sanctioned substitutes (api.stackexchange.com, Wikisource)
 *  and must not be treated as refused ingestions. */
export function refusedHostsFrom(ledger: unknown): string[] {
  const refused = (ledger as { refused?: unknown[] } | null)?.refused
  if (!Array.isArray(refused)) return []
  const found = new Set<string>()
  for (const entry of refused) {
    const lead = typeof (entry as { lead?: unknown })?.lead === 'string' ? (entry as { lead: string }).lead : ''
    for (const m of lead.matchAll(HOST)) found.add(m[1]!.toLowerCase())
  }
  return [...found].sort()
}

/** read the ledger and report BOTH the hosts and whether the read succeeded */
export function readRefusedHosts(): RefusedHosts {
  try {
    // ROOT() is already the repository root — this module compiles to dist/refused-hosts.js, so dirname is dist/
    // and one `..` reaches the root. A second `..` would leave the repository entirely and read nothing, which is
    // exactly the failure `read: false` exists to report rather than hide.
    const raw = fsm().readFileSync(pathm().join(ROOT(), 'lean', 'leads.json'), 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray((parsed as { refused?: unknown[] }).refused)) return { hosts: [], read: false }
    return { hosts: refusedHostsFrom(parsed), read: true }
  } catch {
    return { hosts: [], read: false }   // unread is not empty
  }
}

/** the hosts, for callers that have already established the list could be read */
export const hostsRefused = (): string[] => readRefusedHosts().hosts
