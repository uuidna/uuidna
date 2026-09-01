// refused-robots — LIVE robots.txt RECOMPUTE for hosts named by lean/leads.json's refused[] list.
//
// The refused[] finder (src/refused.ts) stops outbound fetch("https://…") to a refused host. That was the defect
// that cost: an unread boundary. The residual this module pays is narrower — recompute the DISALLOW rules the
// refusal recorded, from the host's own robots.txt, so a recorded boundary that no longer matches the live file
// is named rather than trusted from memory.
//
// this fetches robots.txt (or accepts a supplied body). It does not crawl. A host that answers 418
// or refuses the fetch is reported as unread, never as "allows everything" — the same unread≠empty law
// refused-hosts carries. Offline tests inject fixtures; live recompute is opt-in (UUIDNA_LIVE_ROBOTS=1).
// @non-harmonic: live robots.txt recompute for refused hosts — fetch is the reading, fixtures keep the suite offline
import { hostsRefused, readRefusedHosts } from './refused-hosts.js'

export interface RobotsRules {
  host: string
  /** false when the body could not be read — NOT the same as an empty disallow list */
  read: boolean
  status?: number
  disallow: string[]
  /** why the read failed, when read is false */
  reason?: string
}

/** parseRobots(body) → Disallow paths for User-agent: * (and bare Disallow lines). Pure. */
export function parseRobots(body: string): string[] {
  const lines = body.split(/\r?\n/)
  const out: string[] = []
  let inStar = true // before any User-agent, treat as global; after User-agent: *, keep; after other, skip
  let sawAgent = false
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, '').trim()
    if (!line) continue
    const ua = /^user-agent\s*:\s*(.+)$/i.exec(line)
    if (ua) {
      sawAgent = true
      const agent = ua[1]!.trim()
      inStar = agent === '*'
      continue
    }
    if (sawAgent && !inStar) continue
    const d = /^disallow\s*:\s*(.*)$/i.exec(line)
    if (d) {
      const path = d[1]!.trim()
      if (path) out.push(path)
    }
  }
  return [...new Set(out)].sort()
}

export type FetchRobots = (url: string) => Promise<{ status: number; body: string }>

/** Default fetch — Node's global fetch. Kept injectable so tests never need the network. */
export const defaultFetchRobots: FetchRobots = async (url) => {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'uuidna-refused-robots/1' } })
  const body = res.status >= 200 && res.status < 400 ? await res.text() : ''
  return { status: res.status, body }
}

/** robotsForHost(host, fetch) → the live (or supplied) disallow census for one host. */
export async function robotsForHost(host: string, fetchRobots: FetchRobots = defaultFetchRobots): Promise<RobotsRules> {
  const url = `https://${host}/robots.txt`
  try {
    const { status, body } = await fetchRobots(url)
    if (status === 418) {
      return { host, read: false, status, disallow: [], reason: 'robots.txt answered 418 — site-wide anti-automation; the refusal stands, the rules are unread' }
    }
    if (status < 200 || status >= 400 || !body) {
      return { host, read: false, status, disallow: [], reason: `robots.txt returned ${status} with no usable body` }
    }
    return { host, read: true, status, disallow: parseRobots(body) }
  } catch (e) {
    return { host, read: false, disallow: [], reason: e instanceof Error ? e.message : String(e) }
  }
}

/** recomputeRefusedRobots(fetch?) → one reading per refused host. When the ledger cannot be read, returns
 *  { read: false, hosts: [] } rather than inventing an empty refusal set. */
export async function recomputeRefusedRobots(fetchRobots: FetchRobots = defaultFetchRobots): Promise<{
  read: boolean
  hosts: RobotsRules[]
}> {
  const ledger = readRefusedHosts()
  if (!ledger.read) return { read: false, hosts: [] }
  const hosts = ledger.hosts.length ? ledger.hosts : hostsRefused()
  const rows: RobotsRules[] = []
  for (const host of hosts) rows.push(await robotsForHost(host, fetchRobots))
  return { read: true, hosts: rows }
}

/** whether a recorded disallow path is still present in the live rules — the residual the refusal note owed. */
export function disallowHolds(live: readonly string[], recorded: string): boolean {
  return live.some((d) => d === recorded || recorded.startsWith(d) || d.startsWith(recorded))
}
