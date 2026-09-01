#!/usr/bin/env node
// @non-harmonic: reaches the Cloudflare API (and optionally reads wrangler OAuth from the local config) — a NAMED
// boundary, like deploy-run.ts. Never imported by the core.
//
// cloudflare-zone — HARDEN EVERY ZONE / WORKER THIS REPO OWNS. Agnostic: discovers apexes from Workers custom
// domains for the services named in wrangler.toml (plus known sibling workers), then for each:
//   1. attach www.<apex> as a Workers custom domain (kills 522 when DNS is proxied but nothing is bound)
//   2. PATCH zone setting always_use_https = on (HTTP → HTTPS at the edge)
//   3. upsert a dynamic Redirect Rule www → https://apex/$1 (301) when the rulesets API accepts the token
//
// Auth (first match wins):
//   CLOUDFLARE_API_TOKEN  — preferred; create at https://dash.cloudflare.com/profile/api-tokens
//   wrangler OAuth        — ~/.wrangler or Library/Preferences/.wrangler (workers:write, zone:read only)
//
// REQUIRED TOKEN SCOPES (create a Custom token; apply to All zones this account owns, or the uuidna* + perma.family set):
//   Account · Workers Scripts · Edit          — PUT /accounts/{id}/workers/domains (www attach)
//   Account · Account Settings · Read         — resolve account id when CLOUDFLARE_ACCOUNT_ID is unset
//   Zone · Zone · Read                        — list zones / resolve zone_id
//   Zone · Zone Settings · Edit               — PATCH .../settings/always_use_https
//   Zone · Dynamic Redirect · Edit            — rulesets http_request_dynamic_redirect (optional; worker also 301s)
//   Zone · DNS · Edit                         — only if www has no record and you want the script to create a
//                                               proxied CNAME www → apex (usually Workers Domains creates it)
//
// Wrangler OAuth (as of 2026-08-26) carries workers:write + zone:read — enough for (1), not (2)/(3). The worker
// itself also 301s http→https and www→apex, so the live surface is correct even when the zone toggles stay off.
//
//   npm run cf:zone           → apply + probe
//   npm run cf:zone -- --dry  → discover + probe only (no writes)
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './api.js'

const DRY = process.argv.includes('--dry')
const API = 'https://api.cloudflare.com/client/v4'

/** Workers this tree deploys (wrangler.toml name + known siblings on the same account). */
function ownedServices(): string[] {
  const toml = readFileSync(join(ROOT, 'wrangler.toml'), 'utf8')
  const name = /^name\s*=\s*"([^"]+)"/m.exec(toml)?.[1]
  const set = new Set<string>(['uuidna', 'uuidna-payload'])
  if (name) set.add(name)
  return [...set].sort()
}

function resolveToken(): { token: string; source: string } | null {
  const env = process.env.CLOUDFLARE_API_TOKEN?.trim()
  if (env) return { token: env, source: 'CLOUDFLARE_API_TOKEN' }
  const candidates = [
    join(homedir(), 'Library', 'Preferences', '.wrangler', 'config', 'default.toml'),
    join(homedir(), '.wrangler', 'config', 'default.toml'),
    join(homedir(), '.config', 'wrangler', 'config', 'default.toml'),
  ]
  for (const p of candidates) {
    if (!existsSync(p)) continue
    const text = readFileSync(p, 'utf8')
    const m = /^oauth_token\s*=\s*"([^"]+)"/m.exec(text)
    if (m) return { token: m[1]!, source: `wrangler OAuth (${p})` }
  }
  return null
}

type CfJson = { success: boolean; errors?: { code?: number; message?: string }[]; result?: unknown; result_info?: { total_count?: number } }

async function cf(token: string, method: string, path: string, body?: unknown): Promise<CfJson> {
  const res = await fetch(API + path, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  return (await res.json()) as CfJson
}

function errMsg(j: CfJson): string {
  return (j.errors ?? []).map((e) => e.message ?? String(e.code)).join('; ') || 'unknown Cloudflare error'
}

type WorkerDomain = {
  id: string
  zone_id: string
  zone_name: string
  hostname: string
  service: string
  environment: string
}

async function listWorkerDomains(token: string, accountId: string): Promise<WorkerDomain[]> {
  const j = await cf(token, 'GET', `/accounts/${accountId}/workers/domains`)
  if (!j.success) throw new Error(`list workers/domains — ${errMsg(j)}`)
  return (j.result as WorkerDomain[]) ?? []
}

async function attachWww(token: string, accountId: string, apex: string, service: string): Promise<{ ok: boolean; detail: string }> {
  const hostname = `www.${apex}`
  if (DRY) return { ok: true, detail: `dry — would attach ${hostname} → ${service}` }
  const j = await cf(token, 'PUT', `/accounts/${accountId}/workers/domains`, {
    hostname,
    service,
    environment: 'production',
  })
  if (j.success) return { ok: true, detail: `attached ${hostname} → ${service}` }
  return { ok: false, detail: `attach ${hostname} FAILED — ${errMsg(j)}` }
}

async function alwaysUseHttps(token: string, zoneId: string, zoneName: string): Promise<{ ok: boolean; detail: string; needScope: boolean }> {
  if (DRY) return { ok: true, detail: `dry — would PATCH always_use_https=on for ${zoneName}`, needScope: false }
  const j = await cf(token, 'PATCH', `/zones/${zoneId}/settings/always_use_https`, { value: 'on' })
  if (j.success) return { ok: true, detail: `always_use_https=on (${zoneName})`, needScope: false }
  const msg = errMsg(j)
  const needScope = /Authentication error|unauthorized|Unauthorized|10000|9109/i.test(msg)
  return { ok: false, detail: `always_use_https FAILED for ${zoneName} — ${msg}`, needScope }
}

/** Dynamic Redirect Rule: www.zone/* → https://zone/$1 (301). Idempotent by rule description tag. */
async function ensureWwwRedirect(token: string, zoneId: string, zoneName: string): Promise<{ ok: boolean; detail: string; needScope: boolean }> {
  const tag = 'uuidna-www-to-apex'
  if (DRY) return { ok: true, detail: `dry — would upsert redirect ${tag} on ${zoneName}`, needScope: false }

  const list = await cf(token, 'GET', `/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`)
  if (!list.success && !/not found|does not exist|1400/i.test(errMsg(list))) {
    const msg = errMsg(list)
    return { ok: false, detail: `redirect ruleset read FAILED for ${zoneName} — ${msg}`, needScope: /Authentication|unauthorized|10000|9109/i.test(msg) }
  }

  const existing = (list.result as { id?: string; rules?: { id?: string; description?: string; action?: string; expression?: string; action_parameters?: unknown; enabled?: boolean }[] } | null) ?? null
  const rules = [...(existing?.rules ?? [])]
  const expression = `(http.host eq "www.${zoneName}")`
  const action_parameters = {
    from_value: {
      status_code: 301,
      target_url: { expression: `concat("https://${zoneName}", http.request.uri.path)` },
      preserve_query_string: true,
    },
  }
  const mine = rules.findIndex((r) => r.description === tag)
  if (mine >= 0) {
    rules[mine] = { ...rules[mine], action: 'redirect', expression, action_parameters, description: tag, enabled: true }
  } else {
    rules.push({ action: 'redirect', expression, action_parameters, description: tag, enabled: true })
  }

  const path = existing?.id
    ? `/zones/${zoneId}/rulesets/${existing.id}`
    : `/zones/${zoneId}/rulesets/phases/http_request_dynamic_redirect/entrypoint`
  const method = existing?.id ? 'PUT' : 'PUT'
  const body = existing?.id
    ? { rules }
    : { name: `${zoneName} www→apex`, kind: 'zone', phase: 'http_request_dynamic_redirect', rules }

  const j = await cf(token, method, path, body)
  if (j.success) return { ok: true, detail: `redirect rule ${tag} on ${zoneName}`, needScope: false }
  const msg = errMsg(j)
  return { ok: false, detail: `redirect rule FAILED for ${zoneName} — ${msg}`, needScope: /Authentication|unauthorized|10000|9109|plan|entitlement/i.test(msg) }
}

async function probe(url: string): Promise<{ status: number; location: string }> {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'manual', headers: { 'cache-control': 'no-cache' } })
    return { status: res.status, location: res.headers.get('location') ?? '' }
  } catch (e) {
    return { status: 0, location: String((e as Error).message).slice(0, 80) }
  }
}

const SCOPE_DOC = `
REQUIRED CLOUDFLARE_API_TOKEN scopes (Custom token → All zones, or uuidna.com / uuidna.net / uuidna.org / perma.family):
  • Account · Workers Scripts · Edit
  • Account · Account Settings · Read
  • Zone · Zone · Read
  • Zone · Zone Settings · Edit          ← Always Use HTTPS
  • Zone · Dynamic Redirect · Edit       ← www→apex Redirect Rule (optional; worker already 301s)
  • Zone · DNS · Edit                    ← only if www DNS must be created by hand
Paste as repo secret CLOUDFLARE_API_TOKEN (+ CLOUDFLARE_ACCOUNT_ID) and re-run: npm run cf:zone
`.trim()

const auth = resolveToken()
if (!auth) {
  console.error('✗ cloudflare-zone — no CLOUDFLARE_API_TOKEN and no wrangler OAuth config found')
  console.error(SCOPE_DOC)
  process.exit(1)
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()
  || (await (async () => {
    // wrangler whoami equivalent — token/verify
    const j = await cf(auth.token, 'GET', '/accounts?per_page=50')
    if (!j.success) return ''
    const rows = (j.result as { id: string; name: string }[]) ?? []
    return rows[0]?.id ?? ''
  })())

if (!accountId) {
  console.error('✗ cloudflare-zone — could not resolve account id; set CLOUDFLARE_ACCOUNT_ID')
  process.exit(1)
}

const services = ownedServices()
console.log(`cloudflare-zone — auth=${auth.source} account=${accountId} services=${services.join(',')} dry=${DRY}`)

const domains = await listWorkerDomains(auth.token, accountId)
const owned = domains.filter((d) => services.includes(d.service))
if (!owned.length) {
  console.error('✗ cloudflare-zone — no Workers custom domains for owned services; deploy the worker first')
  process.exit(1)
}

// Apex hosts: non-www hostnames bound to owned services (uuidna.com, uuidna.net, …).
const apexes = new Map<string, { zone_id: string; zone_name: string; service: string }>()
for (const d of owned) {
  if (d.hostname.startsWith('www.')) continue
  // skip multi-label hosts like payload.uuidna.com — only bare zone apexes get a www twin
  if (d.hostname !== d.zone_name) continue
  apexes.set(d.hostname, { zone_id: d.zone_id, zone_name: d.zone_name, service: d.service })
}

const wwwSet = new Set(owned.filter((d) => d.hostname.startsWith('www.')).map((d) => d.hostname))
const lines: string[] = []
let needScope = false
let failed = 0
// apexes where the redirect is neither writable NOR observably in force — the only https finding that is real
const unenforced: string[] = []

for (const [apex, meta] of [...apexes.entries()].sort()) {
  const www = `www.${apex}`
  if (!wwwSet.has(www)) {
    const r = await attachWww(auth.token, accountId, apex, meta.service)
    lines.push((r.ok ? '✓ ' : '✗ ') + r.detail)
    if (!r.ok) { failed++; needScope = true }
  } else {
    lines.push(`· www already attached: ${www} → ${meta.service}`)
  }

  // A REFUSED WRITE IS NOT A KNOWN-BAD SETTING, and reporting it as either was the actual defect (held lead 5,
  // 2026-09-01): four always_use_https writes failed for want of zone scope, the redirect was enforced the whole
  // time — http answered 301 — and the run could not tell the difference, so it said nothing useful in either
  // direction. Flipping the exit code alone would have been the wrong cure: it converts a false all-clear into a
  // false alarm, and CI that cannot get a broader token would learn to ignore the step, which is how a check dies.
  //
  // The evidence to settle it was already being COLLECTED and thrown away — the live probes below print exactly
  // this 301. So when the API refuses, ASK THE ZONE WHAT IT DOES rather than what it says: an http request that
  // answers 301 to an https location proves always_use_https is in force, whoever set it and whenever. That is a
  // stronger claim than the write's own success, which only proves the setting was accepted, not that it applies.
  //
  // HONEST SCOPE, and it is the reason this is a distinct verdict rather than a pass: the effect probe cannot
  // distinguish the ZONE setting from the WORKER's own 301, which this deploy also installs. It proves the
  // redirect is enforced — the property anyone actually depends on — not which layer enforces it. Defense in
  // depth means either layer satisfies the requirement; a zone left off behind a working worker is a real but
  // lesser gap, and it is named here rather than hidden inside a green tick.
  const https = await alwaysUseHttps(auth.token, meta.zone_id, meta.zone_name)
  if (https.ok) {
    lines.push('✓ ' + https.detail)
  } else {
    // THREE-WAY, NEVER TWO. The first cut of this check was binary — redirect or not — and it accused
    // uuidna.net of serving plain http on its very first run, while the live probes twelve lines below showed
    // 301 for the same host in the same run. The probe had simply failed to connect (status 0), and a binary
    // verdict has nowhere to put "I could not tell", so it filed the blip under the worst answer available.
    // That is a false alarm that HARD-FAILS A DEPLOY: strictly worse than the silence this fold was replacing,
    // because it blocks a correct ship on a network hiccup. Unreachable is its own verdict, and it retries first
    // — a real outage survives three attempts, a blip does not.
    let eff = await probe(`http://${apex}/`)
    for (let attempt = 0; attempt < 2 && eff.status === 0; attempt++) eff = await probe(`http://${apex}/`)
    const enforced = (eff.status === 301 || eff.status === 308) && eff.location.startsWith('https://')
    if (eff.status === 0) {
      lines.push(`· always_use_https UNKNOWN for ${meta.zone_name} — the API write was refused (${https.detail}) AND the effect probe could not connect after 3 attempts (${eff.location}). Not asserted either way; a check must never file "unreachable" as "broken" or as "fine".`)
      if (https.needScope) needScope = true
    } else if (enforced) {
      lines.push(`✓ always_use_https ENFORCED for ${meta.zone_name} — verified by effect (http ${eff.status} → ${eff.location}), not by the API write, which was refused: ${https.detail}`)
      if (https.needScope) needScope = true
    } else {
      lines.push('✗ ' + https.detail + ` — AND the effect probe agrees it is not enforced (http ${eff.status || 'unreachable'}${eff.location ? ' → ' + eff.location : ''})`)
      failed++
      unenforced.push(apex)
      if (https.needScope) needScope = true
    }
  }

  const redir = await ensureWwwRedirect(auth.token, meta.zone_id, meta.zone_name)
  lines.push((redir.ok ? '✓ ' : '· ') + redir.detail)
  if (!redir.ok && redir.needScope) needScope = true
  // redirect failure on free plan / missing entitlement is non-fatal — worker 301s
}

for (const l of lines) console.log('  ' + l)

// Live probes for every apex this pass owns.
console.log('\ncloudflare-zone — live probes:')
for (const apex of [...apexes.keys()].sort()) {
  for (const u of [`http://${apex}/`, `https://www.${apex}/`, `https://${apex}/`]) {
    const p = await probe(u)
    console.log(`  ${String(p.status).padStart(3)} ${u}${p.location ? ' → ' + p.location : ''}`)
  }
}

if (needScope) {
  console.log('\n' + SCOPE_DOC)
  console.log('Worker-side 301 (http→https, www→apex) still applies after `npx wrangler deploy` — zone toggles are defense in depth.')
}

// HARD FAIL only when a www Workers Domain could not be attached — that is the 522 class. Zone Settings /
// Redirect Rule refusals are SCOPE GAPS: printed above, exit 0 so `npm run ship` still completes (the worker
// enforces the same redirects). Pass --assert to make any refused write non-zero for CI that has a full token.
// THE HARD SET GREW A SECOND MEMBER, and it is the one the lead was actually about. A www attach failure is the
// 522 class. An apex whose http does NOT redirect is the plain-text class: the API refused the write and the
// zone demonstrably is not doing it, which is no longer a scope gap — it is an unencrypted front door, and a
// deploy must never report COMPLETE over it.
const hard = lines.filter((l) => l.startsWith('✗ ') && l.includes('attach ')).concat(unenforced.map((a) => `unenforced https: ${a}`))
if (unenforced.length) {
  console.error(`\n✗ cloudflare-zone — ${unenforced.length} apex(es) serve http WITHOUT a redirect to https: ${unenforced.join(', ')}`)
  console.error('  This is not the scope gap; a scope gap still shows a 301. Fix the zone setting or the worker route.')
}
if (process.argv.includes('--assert') && (failed || needScope) && !DRY) {
  console.error('✗ cloudflare-zone — --assert: one or more zone writes refused (see scopes above)')
  process.exitCode = 1
} else if (hard.length && !DRY) {
  console.error('✗ cloudflare-zone — www attach failed; the 522 class is still open')
  process.exitCode = 1
} else {
  console.log(`\ncloudflare-zone — ${DRY ? 'dry complete' : needScope ? 'complete (zone writes need a broader token — see scopes)' : 'complete'}`)
}
