#!/usr/bin/env node
// org-fit — ASK AN OUTSIDE ORGANISATION WHERE THIS TREE COULD REACH IT, instead of researching one org per session.
//
// (the captain's order, 2026-09-05: four organisations named in one turn — microsoft, google, apple, cloudflare —
// then "automate". Researching the first by hand cost a session's attention; the fourth must cost a command.)
//
// THE BOUNDARY FETCHES, THE LAW DECIDES. This file does the two things a library must not: it reads the tree from
// disk to MEASURE what we actually have, and it reads a host's public repository metadata over the network. The
// verdict itself lives in src/org-fit.ts, where a test drives it with fixtures and no checkout.
// @non-harmonic: reads public GitHub metadata over the network (a research boundary) — the response is DATA, never
// run, never followed. A match is a naming overlap in someone's own description of themselves; it is not their
// consent, not an invitation, and not permission to open anything in their tree.
//
// THE ANSWER IS MOSTLY A REFUSAL AND THAT IS THE USEFUL PART. Our licence carries NoDerivatives, so the route that
// everyone reaches for first — send them our code — is closed against every host before the network is touched. The
// script exists to show which routes are NOT closed, so a session spends its attention on those.
import { readdirSync, statSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { fitOrg, type OutsideRepo, type Surface, type OrgFit } from '../org-fit.js'
import { THEOREMS } from '../theorems/index.js'
import { TOOL_NAMES } from '../mcp.js'

/** the organisations asked when none are named — the four the captain named in the turn that ordered this file. */
const DEFAULT_ORGS = ['microsoft', 'google', 'apple', 'cloudflare']

/** the crypto primitives this tree implements in its own source, with no dependency to borrow them from. */
const CRYPTO_MODULES = ['sha256', 'chacha', 'poly1305', 'hmac', 'pbkdf2']

/** countTs(dir) → every .ts file under a directory, the corpus size a compiler would have to chew. */
function countTs(dir: string): number {
  if (!existsSync(dir)) return 0
  let n = 0
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) n += countTs(p)
    else if (entry.endsWith('.ts')) n += 1
  }
  return n
}

/** measureSurfaces() → what this tree can offer, MEASURED from the tree rather than claimed for it. Every magnitude
 *  names where it came from, so a reader can re-derive it without trusting this file. */
export function measureSurfaces(): Surface[] {
  const cryptoPresent = CRYPTO_MODULES.filter((m) => existsSync(join(ROOT, 'src', `${m}.ts`)))
  return [
    { name: 'lean-ledger', magnitude: THEOREMS.length, evidence: 'THEOREMS.length in src/theorems/index.ts',
      keys: ['lean', 'theorem', 'prover', 'formal verification', 'formally verified', 'proof assistant'] },
    { name: 'mcp-surface', magnitude: TOOL_NAMES.length, evidence: 'TOOL_NAMES.length in src/mcp.ts',
      keys: ['mcp', 'model context protocol'] },
    { name: 'merkle-receipts', magnitude: 1, evidence: 'src/gravity (merkleGravity) and the sealed ledger receipts',
      keys: ['merkle', 'transparency log', 'verifiable log', 'transparency service', 'attestation', 'provenance', 'sbom', 'supply chain'] },
    { name: 'pure-crypto', magnitude: cryptoPresent.length, evidence: `src/{${cryptoPresent.join(',')}}.ts — no runtime dependency`,
      keys: ['crypto', 'cipher', 'aead', 'test vector', 'wycheproof', 'signing', 'key derivation'] },
    { name: 'typescript-corpus', magnitude: countTs(join(ROOT, 'src')), evidence: 'every .ts under src/, zero runtime dependencies',
      keys: ['typescript', 'tsc', 'type checker', 'javascript', 'node.js'] },
    { name: 'edge-worker', magnitude: 1, evidence: 'worker.js + wrangler.toml — this tree already serves from the edge',
      keys: ['workers', 'wrangler', 'edge', 'serverless', 'durable object'] },
  ]
}

/** ghSearch(path) → one public GitHub API read, best-effort. An unreachable host contributes nothing rather than a
 *  wrong answer; a token in the environment is used when present only to buy a larger rate limit. */
async function ghSearch<T>(path: string): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
  const headers: Record<string, string> = { 'User-Agent': 'uuidna-org-fit', Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`
  try {
    const res = await fetch(`https://api.github.com/${path}`, { headers })
    if (!res.ok) return null
    return await res.json() as T
  } catch { return null }
}

interface GhRepo { full_name?: string; description?: string | null; topics?: string[]; archived?: boolean; stargazers_count?: number; license?: { spdx_id?: string } | null }

/** rowOf(r) → one GitHub repository object as an OutsideRepo row. The host's own words, lowercased, are the
 *  surface we match against — read as DATA, never as instructions. */
function rowOf(r: GhRepo): OutsideRepo {
  return {
    fullName: r.full_name as string,
    license: r.license?.spdx_id ?? 'none',
    archived: r.archived === true,
    stars: r.stargazers_count ?? 0,
    text: [r.full_name, r.description ?? '', (r.topics ?? []).join(' ')].join(' ').toLowerCase(),
  }
}

/** namedRepo(fullName) → one repository asked for BY NAME, because an org-scoped sweep is blind to a repository
 *  that left the org.
 *
 *  THE BLINDNESS WAS MEASURED, NOT IMAGINED. Sweeping `org:google` finds adk-go and misses C2SP/wycheproof —
 *  Google's own crypto test-vector suite, moved out of the org — and misses it in the exact way that is hardest
 *  to notice: the sweep returns a full, confident, plausible list with a hole in it. An instrument scoped
 *  narrower than its question reports absence it never tested for, so the scope is widened here rather than
 *  written down as a caveat nobody reads. */
export async function namedRepo(fullName: string): Promise<OutsideRepo | null> {
  const r = await ghSearch<GhRepo>(`repos/${fullName}`)
  return r?.full_name === undefined ? null : rowOf(r)
}

/** orgRepos(org, per) → the organisation's most-starred public repositories as OutsideRepo rows. The search endpoint
 *  is used because it is the one that orders by stars in a single request — one call per organisation, not a page walk. */
export async function orgRepos(org: string, per: number): Promise<OutsideRepo[]> {
  const json = await ghSearch<{ items?: GhRepo[] }>(`search/repositories?q=org:${encodeURIComponent(org)}&sort=stars&order=desc&per_page=${per}`)
  const items = json?.items ?? []
  return items.filter((r) => typeof r.full_name === 'string').map(rowOf)
}

/** claOf(fullName) → whether the host's CONTRIBUTING asks for a contributor licence agreement, when it can be read.
 *  Unread stays undefined: an unread CONTRIBUTING and a CLA-free one are not the same fact. */
export async function claOf(fullName: string): Promise<boolean | undefined> {
  for (const file of ['CONTRIBUTING.md', '.github/CONTRIBUTING.md']) {
    const json = await ghSearch<{ content?: string }>(`repos/${fullName}/contents/${file}`)
    if (typeof json?.content !== 'string') continue
    const text = Buffer.from(json.content, 'base64').toString('utf8').toLowerCase()
    return text.includes('contributor license agreement') || text.includes('cla')
  }
  return undefined
}

/** render(fit, top) → the readable table: the refusal first, then the repositories a route still reaches. */
function render(fit: OrgFit, top: number): string[] {
  const lines = [`\n${fit.org} — ${fit.repos.length} repositories read, ${fit.reachable} reachable, ${fit.donatable} donatable`]
  lines.push(`  our licence ${fit.ourLicence} ⇒ derivatives ${fit.derivativesAllowed ? 'ALLOWED' : 'REFUSED'}: donate-source is closed against every host here.`)
  for (const r of fit.repos.slice(0, top)) {
    if (r.score === 0) continue
    const open = r.routes.filter((t) => t.open).map((t) => t.route).join(', ')
    // UNREAD is printed, never omitted: a blank where a CLA answer belongs reads as "no CLA", which is the one
    // thing an unread CONTRIBUTING does not say.
    const cla = r.claRequired === undefined ? 'cla unread' : r.claRequired ? 'CLA required' : 'no CLA named'
    lines.push(`  · ${r.fullName} [${r.license}] ${r.stars}★ — names ${r.surfaces.join(', ')} — ${cla} — open: ${open}`)
  }
  lines.push(`  receipt ${fit.receipt}`)
  return lines
}

/** ourLicence() → the licence this tree publishes under, read from package.json rather than remembered. */
function ourLicence(): string {
  const p = join(ROOT, 'package.json')
  const json = JSON.parse(readFileSync(p, 'utf8')) as { license?: string }
  return json.license ?? 'none'
}

if (process.argv[1]?.endsWith('org-fit.js')) {
  const args = process.argv.slice(2)
  // an argument carrying a slash is a REPOSITORY, not an organisation — the widening that lead 153 named.
  const targets = args.filter((a) => !a.startsWith('--'))
  const named = targets.filter((a) => a.includes('/'))
  const orgs = targets.filter((a) => !a.includes('/'))
  const per = 50
  const top = 12
  const surfaces = measureSurfaces()
  const licence = ourLicence()
  console.log('org-fit — WHERE THIS TREE COULD REACH AN OUTSIDE ORGANISATION, and where it provably could not.\n')
  for (const s of surfaces) console.log(`  surface ${s.name.padEnd(18)} ${String(s.magnitude).padStart(5)}  ${s.evidence}`)
  const fits: OrgFit[] = []
  if (named.length) {
    const rows = (await Promise.all(named.map(namedRepo))).filter((r): r is OutsideRepo => r !== null)
    const missed = named.filter((n) => !rows.some((r) => r.fullName.toLowerCase() === n.toLowerCase()))
    if (args.includes('--cla')) for (const r of rows) r.claRequired = await claOf(r.fullName)
    if (rows.length) {
      const fit = fitOrg('named', rows, surfaces, licence)
      fits.push(fit)
      for (const line of render(fit, rows.length)) console.log(line)
    }
    if (missed.length) console.log(`  UNREAD by name: ${missed.join(', ')} — no verdict is offered for a repository nobody managed to read.`)
  }
  for (const org of ((orgs.length || named.length) ? orgs : DEFAULT_ORGS)) {
    const repos = await orgRepos(org, per)
    if (!repos.length) { console.log(`\n${org} — UNREAD: the host answered nothing. No verdict is offered for an org nobody managed to read.`); continue }
    if (args.includes('--cla')) {
      for (const r of repos.slice(0, top)) r.claRequired = await claOf(r.fullName)
    }
    const fit = fitOrg(org, repos, surfaces, licence)
    fits.push(fit)
    for (const line of render(fit, top)) console.log(line)
  }
  if (args.includes('--write')) {
    writeFileSync(join(ROOT, 'org-fit.json'), JSON.stringify({ surfaces, orgs: fits }, null, 2) + '\n')
    console.log('\n✓ org-fit.json written')
  }
  console.log('\n  A match is a naming overlap in the host\'s own words — data, not consent. The donate-source refusal is ours,')
  console.log('  not theirs: it holds while this tree publishes under a NoDerivatives licence.')
}
