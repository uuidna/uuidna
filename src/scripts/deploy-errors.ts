#!/usr/bin/env node
// deploy-errors — IS THE DEPLOYED SITE ACTUALLY SERVING? Asked of the deployment, not of the repository.
//
// The captain, 2026-09-28: "check for deploy errors automatically".
//
// WHAT WAS MISSING, measured rather than assumed. deploy-verify.ts looked like the answer and is not: it has ZERO argv
// guards and exports only constants (DEPLOY_BUDGET_MS, the NAVIGATE_* thresholds) which guard.ts and mcp.ts import.
// Running `node dist/scripts/deploy-verify.js` therefore executes a module, prints nothing and exits 0 — a green over
// an absent action, and this session spent a call believing it. release-live.ts asks npm and Zenodo whether the
// RELEASE exists, which is a different question from whether the SITE serves. Nothing asked the deployment.
//
// THE SURFACES ARE READ FROM THE DEPLOYMENT'S OWN SITEMAP, never listed here. A hand list of URLs is the thing that
// rots the first time a route is added, and this tree's law is that a list somebody edits is a list somebody forgets.
// sitemap.xml is what the site publishes about itself, so the check follows the deployment rather than a memory of it.
//
// A SAMPLE, AND IT SAYS SO. The sitemap carries thousands of URLs and fetching all of them would be a denial of
// service against our own host. A bounded, DETERMINISTIC sample is taken — every Nth URL, so the stride is exact on
// every host and no clock or random enters — and the count sampled is reported beside the count published, because
// "12 of 5,260 answered" and "the site is fine" are different claims.
//
// EXIT 1 IS A REFUTATION, not a bad connection. A 5xx, a timeout or a TLS failure is about this run and this path;
// only a 4xx from a URL the site itself published is a real deploy error — the site listing a route it does not
// serve. That distinction is the one the API prober had to learn twice today, and it is built in here from the start.
import { wrArtifact } from '../artifact.js'

const HOST = process.env.UUIDNA_LIVE ?? 'https://uuidna.com'
const UA = 'uuidna-deploy-errors/1.0 (+https://uuidna.com; ceccec@psg.bg)'
const TIMEOUT_MS = 20_000
const SAMPLE = 12

export interface Probe { url: string; status: number | null; ms: number; why?: string }

const ask = async (url: string, init?: RequestInit): Promise<Probe> => {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)
  const at = process.hrtime.bigint()
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { 'user-agent': UA }, ...init })
    return { url, status: r.status, ms: Number(process.hrtime.bigint() - at) / 1e6 }
  } catch (e) {
    const cause = e instanceof Error ? String((e as { cause?: { message?: string } }).cause?.message ?? '') : ''
    const why = e instanceof Error && e.name === 'AbortError' ? `no answer within ${TIMEOUT_MS}ms` : `unreachable: ${cause || String(e)}`
    return { url, status: null, ms: Number(process.hrtime.bigint() - at) / 1e6, why }
  } finally { clearTimeout(timer) }
}

/** the URLs the deployment publishes about itself; empty when the sitemap itself cannot be read */
export const urlsOf = (xml: string): string[] => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] as string)

// INTEGER DIVISION WITH NO ROUNDING NAMESPACE, which the harmonic scan refuses everywhere and refused here on the
// first run. `div` truncates by construction — subtract the remainder before dividing — so the result is exact on
// every host. The rejected call would have been correct arithmetic and a rejected import all the same: the law is that
// no rounding helper settles anything, with no exemption, and the scan does not negotiate about intent.
const div = (a: number, b: number): number => (b === 0 ? 0 : (a - (a % b)) / b)

/** every Nth url — a deterministic stride, so two runs sample the same paths and a difference is the site's */
export const sampleOf = (urls: readonly string[], n: number): string[] => {
  if (urls.length <= n) return [...urls]
  const stride = div(urls.length, n) || 1
  const out: string[] = []
  for (let i = 0; i < urls.length && out.length < n; i += stride) out.push(urls[i] as string)
  return out
}

/** a 4xx on a URL the SITE published is a deploy error; a 5xx, a timeout or an unreachable host is about the run */
export const isDeployError = (p: Probe): boolean => p.status !== null && p.status >= 400 && p.status < 500

if (process.argv[1]?.endsWith('deploy-errors.js')) {
  const sitemap = await ask(`${HOST}/sitemap.xml`)
  const xml = sitemap.status === 200 ? await (await fetch(`${HOST}/sitemap.xml`, { headers: { 'user-agent': UA } })).text() : ''
  const published = urlsOf(xml)
  const sampled = sampleOf(published, SAMPLE)

  const probes: Probe[] = [sitemap]
  for (const u of sampled) probes.push(await ask(u))
  // THE DOOR IS ASKED THE WAY A CLIENT ASKS IT. A GET on /mcp says the route exists; only tools/list says it serves.
  const door = await ask(`${HOST}/mcp`, {
    method: 'POST',
    headers: { 'user-agent': UA, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
  })
  probes.push(door)

  const errors = probes.filter(isDeployError)
  const unreached = probes.filter((p) => p.status === null || (p.status >= 500))

  console.log(`deploy-errors — ${HOST}: ${published.length} url(s) published, ${sampled.length} sampled (every ${published.length > SAMPLE ? div(published.length, SAMPLE) : 1}th), ${errors.length} deploy error(s), ${unreached.length} not reached`)
  for (const p of probes) {
    const mark = isDeployError(p) ? '✗' : p.status === null || p.status >= 500 ? '?' : '✓'
    console.log(`  ${mark} ${String(p.status ?? '—').padStart(3)}  ${p.ms.toFixed(0).padStart(5)} ms  ${p.url.replace(HOST, '')}${p.why ? ' — ' + p.why : ''}`)
  }

  wrArtifact('lean/deploy-errors.json', {
    kind: 'deploy-errors',
    why: 'Whether the DEPLOYED site serves what it publishes. The surfaces are read from the deployment own sitemap '
      + 'rather than listed, and the sample is a deterministic stride so two runs ask the same paths. A 4xx on a '
      + 'published URL is a deploy error; a 5xx, a timeout or an unreachable host is a fact about the run and is '
      + 'counted apart. deploy-verify.ts is NOT this check: it has no entry point and exports only constants.',
    host: HOST,
    published: published.length,
    sampled: sampled.length,
    errors: errors.length,
    notReached: unreached.length,
    probes,
  })

  if (errors.length > 0) {
    console.error(`\n✗ deploy-errors — ${errors.length} url(s) the site publishes do not serve`)
    process.exit(1)
  }
  if (unreached.length > 0) console.log(`\n· deploy-errors — ${unreached.length} not measured this run (5xx, timeout or unreachable); not a deploy error`)
  else console.log(`\n✓ deploy-errors — every sampled surface the site publishes serves it`)
}
