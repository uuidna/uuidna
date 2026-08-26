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

for (const [apex, meta] of [...apexes.entries()].sort()) {
  const www = `www.${apex}`
  if (!wwwSet.has(www)) {
    const r = await attachWww(auth.token, accountId, apex, meta.service)
    lines.push((r.ok ? '✓ ' : '✗ ') + r.detail)
    if (!r.ok) { failed++; needScope = true }
  } else {
    lines.push(`· www already attached: ${www} → ${meta.service}`)
  }

  const https = await alwaysUseHttps(auth.token, meta.zone_id, meta.zone_name)
  lines.push((https.ok ? '✓ ' : '✗ ') + https.detail)
  if (!https.ok) { failed++; if (https.needScope) needScope = true }

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
const hard = lines.filter((l) => l.startsWith('✗ ') && l.includes('attach '))
if (process.argv.includes('--assert') && (failed || needScope) && !DRY) {
  console.error('✗ cloudflare-zone — --assert: one or more zone writes refused (see scopes above)')
  process.exitCode = 1
} else if (hard.length && !DRY) {
  console.error('✗ cloudflare-zone — www attach failed; the 522 class is still open')
  process.exitCode = 1
} else {
  console.log(`\ncloudflare-zone — ${DRY ? 'dry complete' : needScope ? 'complete (zone writes need a broader token — see scopes)' : 'complete'}`)
}
