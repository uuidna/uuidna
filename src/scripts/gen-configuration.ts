#!/usr/bin/env node
// src/scripts/gen-configuration.ts — docs/configuration.md: the consolidation's conformance declaration and its
// configuration items, read from the configs that define them. ISO/IEC/IEEE 12207:2026 6.3.5 asks that every item
// under change be identified before it changes; a hand-kept list of Workers, bindings and routes drifts the first
// time a config moves, so the list is computed from wrangler.toml, web/wrangler.jsonc, package.json and the
// workflows, and the places where two configs disagree are computed too, never written down.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

const read = (rel: string): string | null => (existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null)

/** the subset of TOML wrangler.toml uses: [table], [[array]], key = string | bool | number, # comments */
const tomlOf = (text: string): Record<string, unknown> => {
  const doc: Record<string, unknown> = {}
  let at: Record<string, unknown> = doc
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+#.*$|^\s*#.*$/, '').trim()
    if (!line) continue
    const arr = /^\[\[([\w.]+)\]\]$/.exec(line)
    const tbl = /^\[([\w.]+)\]$/.exec(line)
    if (arr) { const list = (doc[arr[1]!] ??= []) as Record<string, unknown>[]; list.push(at = {}); continue }
    if (tbl) { at = (doc[tbl[1]!] ??= {}) as Record<string, unknown>; continue }
    const kv = /^([\w-]+)\s*=\s*(.+)$/.exec(line)
    if (!kv) continue
    const v = kv[2]!.trim()
    at[kv[1]!] = /^".*"$/.test(v) ? v.slice(1, -1) : v === 'true' ? true : v === 'false' ? false : /^-?\d+$/.test(v) ? Number(v) : v
  }
  return doc
}

/** JSON with // comments and trailing commas, as wrangler.jsonc allows — comments are stripped outside strings only */
const jsoncOf = (text: string): Record<string, unknown> => {
  let out = '', inStr = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!
    if (inStr) { out += c; if (c === '\\') out += text[++i] ?? ''; else if (c === '"') inStr = false; continue }
    if (c === '"') { inStr = true; out += c; continue }
    if (c === '/' && text[i + 1] === '/') { while (i < text.length && text[i] !== '\n') i++; out += '\n'; continue }
    out += c
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1')) as Record<string, unknown>
}

interface Worker { config: string; name: string; main: string; routes: string[]; bindings: string[]; services: { binding: string; service: string }[] }

const arr = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? v as Record<string, unknown>[] : [])
const s = (v: unknown): string => (typeof v === 'string' ? v : '')

const workerOf = (config: string, c: Record<string, unknown>): Worker => {
  const routes = [...arr(c.routes).map((r) => s(r.pattern)), ...(typeof c.route === 'string' ? [c.route] : [])].filter(Boolean)
  const services = arr(c.services).map((x) => ({ binding: s(x.binding), service: s(x.service) }))
  const durable = arr((c.durable_objects as { bindings?: unknown } | undefined)?.bindings)
  const assets = c.assets as { binding?: string } | undefined
  const bindings = [
    ...arr(c.d1_databases).map((x) => `D1 ${s(x.binding)} → ${s(x.database_name)} (${s(x.database_id)})`),
    ...arr(c.r2_buckets).map((x) => `R2 ${s(x.binding)} → ${s(x.bucket_name)}`),
    ...arr(c.kv_namespaces).map((x) => `KV ${s(x.binding)} → ${s(x.id)}`),
    ...durable.map((x) => `Durable Object ${s(x.name)} → ${s(x.class_name)}`),
    ...services.map((x) => `Service ${x.binding} → ${x.service}`),
    ...arr(c.send_email).map((x) => `Email ${s(x.name)}`),
    ...(assets?.binding ? [`Assets ${assets.binding}`] : []),
  ]
  return { config, name: s(c.name), main: s(c.main), routes, bindings, services }
}

const workers: Worker[] = []
const edgeText = read('wrangler.toml')
if (edgeText) workers.push(workerOf('wrangler.toml', tomlOf(edgeText)))
const siteText = read('web/wrangler.jsonc')
if (siteText) workers.push(workerOf('web/wrangler.jsonc', jsoncOf(siteText)))

const pkg = JSON.parse(read('package.json') ?? '{}') as { name?: string; version?: string; workspaces?: string[]; exports?: Record<string, unknown> }

/** each workflow's name and the events that start it, read from its own top-level `on:` */
const workflows = readdirSync(join(ROOT, '.github', 'workflows')).filter((f) => /\.ya?ml$/.test(f)).sort().map((f) => {
  const text = read(`.github/workflows/${f}`) ?? ''
  const name = /^name:\s*(.+)$/m.exec(text)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? f
  const inline = /^on:[ \t]*\[?([^\n\]#]+?)\]?[ \t]*(?:#.*)?$/m.exec(text)?.[1]?.trim()
  const block = /^on:[ \t]*(?:#.*)?\n((?:(?:[ \t]+.*|[ \t]*)\n?)+)/m.exec(text)?.[1] ?? ''
  const events = inline ? inline.split(',').map((e) => e.trim()) : [...block.matchAll(/^ {2}(\w+):/gm)].map((m) => m[1]!)
  return { file: f, name, events }
})

const leanWings = readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean')).length

// THE DISAGREEMENTS, each a comparison of two configs that must agree; a finding here is a consolidation step left open
const [edge, site] = [workers.find((w) => w.config === 'wrangler.toml'), workers.find((w) => w.config === 'web/wrangler.jsonc')]
const findings: string[] = []
if (edge && site && site.routes.length === 0 && !edge.services.some((x) => x.service === site.name))
  findings.push(`\`${site.config}\` declares no route for \`${site.name}\`, and \`${edge.config}\` binds no service to it (its services: ${edge.services.map((x) => `${x.binding} → ${x.service}`).join(', ') || 'none'}). The site has no way in until the edge binds it (checklist step 7).`)
if (edge && edge.routes.length === 0)
  findings.push(`\`${edge.config}\` declares no route for \`${edge.name}\`. The domain it serves is attached outside version control, so that item has no baseline here.`)
for (const w of workers) for (const svc of w.services)
  if (!workers.some((x) => x.name === svc.service))
    findings.push(`\`${w.name}\` binds \`${svc.binding} → ${svc.service}\`, a Worker no config in this repository defines. Its configuration is an item owned elsewhere.`)
const d1 = new Map<string, string[]>()
for (const w of workers) for (const b of w.bindings.filter((x) => x.startsWith('D1 '))) {
  const id = /\(([^)]+)\)$/.exec(b)?.[1] ?? b
  d1.set(id, [...(d1.get(id) ?? []), w.name])
}

const PROCESSES = [
  ['6.3.5', 'Configuration management', 'every Worker, binding, route, workflow and package below is an item; a commit names its theorem, a release is a tag'],
  ['6.3.6', 'Information management', 'docs are generated from the ledger and the configs; a surface no generator owns is a finding'],
  ['6.4.4', 'System architecture definition', 'the architecture description (ISO/IEC/IEEE 42010:2022 Clause 6, which permits no tailoring) is checklist step 5 and not yet written'],
  ['6.4.10', 'Transition', 'the site moves behind the edge Worker only after it is deployed and verified live (checklist step 7)'],
  ['6.4.13', 'Maintenance', 'npm run land heals, certifies the committed tree and pushes; nothing else pushes'],
  ['6.4.14', 'Disposal', 'a duplicate leaves only after a diff, a capture of what it alone holds, revocation of any secret it carries, and a logged deletion'],
] as const

const table = (head: string[], rows: string[][]): string =>
  [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n')

const md = `---
title: Configuration
description: The consolidation's conformance declaration and every configuration item, generated from the configs that define them.
---

# Configuration

Generated by \`src/scripts/gen-configuration.ts\` from \`wrangler.toml\`, \`web/wrangler.jsonc\`, \`package.json\` and
\`.github/workflows\`. Edit those files, never this page. Like every receipt here, it records what the tree holds, not
that it is true ([\`provenance_integrity_not_content_truth\`](/theorem/provenance_integrity_not_content_truth)).

## Conformance declaration

\`${pkg.name ?? 'this repository'}\` claims **tailored conformance** (ISO/IEC/IEEE 12207:2026 4.3, Annex A) for the consolidation
of the uuidna and qpu repositories, limited to the six processes below. The normative text of these clauses is behind
the ISO paywall; the claim rests on the published previews and is stated as such.

${table(['Clause', 'Process', 'How this repository meets it'], PROCESSES.map((p) => [p[0], p[1], p[2]]))}

## Configuration items

### Workers

${table(['Worker', 'Config', 'Entry', 'Routes', 'Bindings'], workers.map((w) => [`\`${w.name}\``, `\`${w.config}\``, `\`${w.main}\``, w.routes.join(', ') || 'none declared', w.bindings.join('<br>') || 'none']))}

### Shared storage

${table(['D1 database', 'Bound by'], [...d1.entries()].map(([id, names]) => [`\`${id}\``, names.map((n) => `\`${n}\``).join(', ')]))}

### Package

\`${pkg.name}\` ${pkg.version}: ${Object.keys(pkg.exports ?? {}).length} export paths, ${(pkg.workspaces ?? []).length} workspace pattern(s) (${(pkg.workspaces ?? []).map((w) => `\`${w}\``).join(', ')}), ${leanWings} Lean wings in \`lean/\`.

### Workflows

${table(['Workflow', 'File', 'Started by'], workflows.map((w) => [w.name, `\`${w.file}\``, w.events.join(', ') || 'unread']))}

## Open findings

${findings.length ? findings.map((f) => `- ${f}`).join('\n') : 'None: every pair of configs that must agree, agrees.'}
`

writeFileSync(join(ROOT, 'docs', 'configuration.md'), md)
console.log(`✓ gen-configuration — ${workers.length} Worker(s), ${workflows.length} workflow(s), ${d1.size} D1 database(s), ${findings.length} open finding(s)`)
