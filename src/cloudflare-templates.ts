// cloudflare-templates — WHAT uuidna ADDS TO EVERY CLOUDFLARE TEMPLATE, derived from each template's own config.
//
// THE QUESTION THIS ANSWERS. Someone has an idea, picks a Cloudflare template, and deploys. Where does this
// repository help, concretely, and where does it not? A hand-written answer per template would be 42 opinions
// that rot the first time Cloudflare adds a binding. So nothing here is authored per template: the mirror in
// mirror/cloudflare-templates.tsv is HARVESTED from each template's own wrangler config, and the fit is
// computed from the bindings it declares.
//
// WHAT uuidna IS NOT. It is not a Cloudflare product and it replaces no binding. It has no key-value store, no
// SQL, no object storage, no inference. Every row below that names a binding names Cloudflare's, and what this
// tree offers is what goes ON that binding: a stable identity for the row you are about to write, a receipt for
// the manifest you are about to serve, a codec for the secret you are about to seal, a gate for the sentence
// your model is about to emit. That distinction is the whole value of the mapping — a template needs D1 for its
// rows and uuidna for the addresses of those rows, and confusing the two would make this useless.
//
// AND IT ALREADY RUNS THERE. Measured by walking the real import graph of the published package: all 13
// subpaths of @uuidna/uuidna reach zero Node builtins, so every primitive named below imports inside a Worker
// without a polyfill, a nodejs_compat flag, or a bundler shim.
// NO FILESYSTEM HERE. This module read the mirror with node:fs, vitepress pulled it into the browser bundle,
// and the docs build failed — blocking the release gate. It also contradicted what had just been measured and
// published: that all 13 subpaths reach ZERO Node builtins. The mirror is compiled to a module now
// (scripts/gen-cloudflare-templates), so this imports data rather than reading a host.
import { TEMPLATE_ROWS } from './cloudflare-templates-data.js'
import { toUuid, merkleFold } from './address.js'
import { handleOf } from './handle.js'

export const TEMPLATE_MIRROR = 'mirror/cloudflare-templates.tsv'

export interface CloudflareTemplate {
  template: string
  /** which config this row came from: the template's own, or the end-to-end test worker it also ships */
  config: 'primary' | 'e2e'
  /** the worker name the config declares — different for an e2e row, which is how the two are told apart */
  workerName: string
  bindings: string[]
  main: string
  compatibilityDate: string
}

/** allTemplateConfigs() → EVERY row the mirror holds, primary and e2e alike. Nothing is dropped: the first
 *  harvest discarded the e2e rows silently and that is how a real binding went missing. */
export const allTemplateConfigs = (): CloudflareTemplate[] => [...TEMPLATE_ROWS]

/** cloudflareTemplates() → the TEMPLATES, one row each: the primary config. The e2e workers are carried by
 *  allTemplateConfigs() and reported by the census, so they are visible without being counted as templates. */
export const cloudflareTemplates = (): CloudflareTemplate[] => allTemplateConfigs().filter((t) => t.config === 'primary')

/** e2eWorkers() → the separate end-to-end test workers six templates ship. A real fact about them, kept. */
export const e2eWorkers = (): CloudflareTemplate[] => allTemplateConfigs().filter((t) => t.config === 'e2e')

export interface Fit {
  /** what this repository offers where that binding is in play */
  offers: string
  /** the exact import a developer writes */
  from: string
  symbols: readonly string[]
}

// THE FIT IS KEYED ON THE BINDING, NOT ON THE TEMPLATE. 42 templates share 13 bindings, so the mapping is
// written once per binding and every template's answer is derived. A template that gains a binding tomorrow
// gains the right rows tomorrow, and none of this has to be revisited.
export const BINDING_FIT: Readonly<Record<string, Fit>> = Object.freeze({
  'D1': { offers: 'a content-address as the primary key, so a row\'s id IS its content and two writes of the same fact collide instead of duplicating; and a merkle fold over a result set, so a page of rows carries one receipt a client can check', from: '@uuidna/uuidna/ledger', symbols: ['toUuid', 'handleOf', 'merkleFold'] },
  'KV': { offers: 'the key. handleOf gives an 8-hex key derived from the value, which makes the namespace self-verifying — a fetch that returns something else is detectable without a second round trip', from: '@uuidna/uuidna', symbols: ['toUuid', 'handleOf'] },
  'R2': { offers: 'an object key that is the object\'s own digest, and a manifest receipt over a bucket listing so a mirror can be proven complete rather than assumed', from: '@uuidna/uuidna', symbols: ['toUuid', 'merkleFold', 'handleOf'] },
  'Durable Objects': { offers: 'an identity for the room that is not a name someone chose — idFromName(handleOf(x)) makes the room the address of what it is about; and a receipt per broadcast so late joiners can tell what they missed', from: '@uuidna/uuidna', symbols: ['handleOf', 'toUuid', 'merkleFold'] },
  'Workers AI': { offers: 'the honesty gate. slimGate refuses a sentence that claims more than its citations earn, and verifyStatement checks a claimed theorem against the sealed ledger — so a model\'s output can be filtered before it is served rather than after it is believed', from: '@uuidna/uuidna', symbols: ['slimGate', 'verifyStatement', 'theorems'] },
  'Vectorize': { offers: 'a stable id per vector derived from the text it embeds, so re-embedding the same passage lands on the same id and a duplicate is a collision rather than a second neighbour', from: '@uuidna/uuidna', symbols: ['toUuid', 'handleOf'] },
  'Queues': { offers: 'an idempotency key that is the message\'s own address, which is what makes at-least-once delivery safe to consume; and a fold over a batch so a consumer can acknowledge a set rather than a count', from: '@uuidna/uuidna', symbols: ['toUuid', 'merkleFold'] },
  'Hyperdrive': { offers: 'nothing at the connection — that is Cloudflare\'s pooling. What it offers is over the ROWS that come back: the same content-addressed key and result-set receipt as D1', from: '@uuidna/uuidna/ledger', symbols: ['toUuid', 'merkleFold'] },
  'Workflows': { offers: 'a step receipt. Each step folds its inputs to one address, so a resumed run can prove it resumed from the state it claims, and a replay that diverges is visible instead of silent', from: '@uuidna/uuidna', symbols: ['merkleFold', 'toUuid', 'handleOf'] },
  'Containers': { offers: 'provenance for what is inside. uuidnaOS attests an Alpine package by content-address without running it, and ports 69 of the 345 shell-domain commands as pure logic — so a container\'s contents can be described and checked from the Worker that starts it', from: '@uuidna/uuidna/os', symbols: ['uuidnaExec', 'cataloguePackage', 'bootOS'] },
  'Static assets': { offers: 'a permanence layer over mutable paths. Every asset gets a hexbit door — uuidna.com/<handle> style — so a link survives a rename, which is the failure static hosting has and cannot fix by itself', from: '@uuidna/uuidna', symbols: ['handleOf', 'hexbitDoorOf'] },
  'Service bindings': { offers: 'a shared address space. Two Workers that both compute toUuid over the same input agree without a schema, a version negotiation, or a shared type — the address IS the contract', from: '@uuidna/uuidna', symbols: ['toUuid', 'propositionAddress'] },
  'Workers for Platforms': { offers: 'a per-tenant namespace that cannot collide by construction, since the tenant handle is derived from the tenant, plus the licence and gate surface for what tenants may claim', from: '@uuidna/uuidna', symbols: ['handleOf', 'slimGate', 'legalFacts'] },
  'Analytics Engine': { offers: 'a stable dimension key per subject, so a metric written today and one written after a rename aggregate together', from: '@uuidna/uuidna', symbols: ['handleOf'] },
  'Vars': { offers: 'nothing — a var is a var. Listed so the census is complete and this row is the honest answer rather than an omission that reads like an oversight', from: '', symbols: [] },
  'Images': { offers: 'a derivation key: the address of (source, transform) names the variant, so the same transform is never computed twice and a cache entry proves which transform made it', from: '@uuidna/uuidna', symbols: ['toUuid', 'handleOf'] },
  'mTLS': { offers: 'nothing at the handshake. The crypto surface here is for payloads — AEAD, HMAC, PBKDF2 — not for transport, which is Cloudflare\'s', from: '', symbols: [] },
  'Pipelines': { offers: 'a record address per event so a replayed pipeline is idempotent, and a fold per window so a batch has one checkable receipt', from: '@uuidna/uuidna', symbols: ['toUuid', 'merkleFold'] },
  'AI Gateway': { offers: 'the same honesty gate as Workers AI, applied at the gateway so every model behind it is filtered by one rule', from: '@uuidna/uuidna', symbols: ['slimGate', 'verifyStatement'] },
  'Secrets Store': { offers: 'sealing at rest in your own code: ChaCha20-Poly1305 AEAD and PBKDF2 key derivation, all pure TypeScript verified against the standards\' vectors, so a secret can be sealed before it reaches any store', from: '@uuidna/uuidna/crypto', symbols: ['aeadEncrypt', 'aeadDecrypt', 'pbkdf2Sha256'] },
})

export interface TemplateCoverage {
  template: string
  bindings: string[]
  /** the bindings this tree has something to say about */
  fitted: { binding: string; offers: string; from: string; symbols: readonly string[] }[]
  /** bindings where the honest answer is that uuidna adds nothing */
  neutral: string[]
  /** bindings declared by the template that this map has never heard of — a gap, not a silence */
  unmapped: string[]
}

/** coverageOf(t) → what uuidna offers this template, derived entirely from the bindings it declares. */
export function coverageOf(t: CloudflareTemplate): TemplateCoverage {
  const fitted: TemplateCoverage['fitted'] = []
  const neutral: string[] = []
  const unmapped: string[] = []
  for (const b of t.bindings) {
    const fit = BINDING_FIT[b]
    if (fit === undefined) { unmapped.push(b); continue }
    if (fit.symbols.length === 0) { neutral.push(b); continue }
    fitted.push({ binding: b, offers: fit.offers, from: fit.from, symbols: fit.symbols })
  }
  return { template: t.template, bindings: t.bindings, fitted, neutral, unmapped }
}

export interface TemplateCensus {
  templates: number
  /** the separate e2e test workers six templates also ship — carried, not counted as templates */
  e2eWorkers: number
  configs: number
  bindings: number
  /** templates with at least one binding this tree serves */
  covered: number
  /** every binding the mirror declares, and how many templates declare it */
  byBinding: { binding: string; templates: number; mapped: boolean }[]
  /** declared bindings with no entry in BINDING_FIT — the honest gap */
  unmapped: string[]
  receipt: string
  honest: string
}

const HONEST =
  'uuidna is not a Cloudflare product and replaces no binding: it has no key-value store, no SQL, no object ' +
  'storage and no inference. Every binding named here is Cloudflare\'s. What this tree offers is what goes ON ' +
  'a binding — an address for the row, a receipt for the manifest, a codec for the secret, a gate for the ' +
  'sentence. Two bindings are mapped to NOTHING on purpose (vars, mTLS) because the honest answer there is ' +
  'that this repository adds nothing, and an omission would read like an oversight. Measured separately: all ' +
  '13 published subpaths reach zero Node builtins, so every symbol named here imports inside a Worker. ' +
  'Six templates also ship a separate end-to-end test worker (its own name, main and bindings); those rows are ' +
  'CARRIED in the mirror and reported here, and are not counted as templates — dropping them is how the first ' +
  'harvest lost the Workers AI binding from text-to-image-template.'

/** templateCensus() → the whole surface, and the bindings this map does not yet cover. */
export function templateCensus(): TemplateCensus {
  const ts = cloudflareTemplates()
  const counts = new Map<string, number>()
  for (const t of ts) for (const b of t.bindings) counts.set(b, (counts.get(b) ?? 0) + 1)
  const byBinding = [...counts.entries()]
    .map(([binding, templates]) => ({ binding, templates, mapped: BINDING_FIT[binding] !== undefined }))
    .sort((a, b) => b.templates - a.templates || (a.binding < b.binding ? -1 : 1))
  const unmapped = byBinding.filter((b) => !b.mapped).map((b) => b.binding)
  const covered = ts.filter((t) => coverageOf(t).fitted.length > 0).length
  return {
    templates: ts.length,
    e2eWorkers: e2eWorkers().length,
    configs: allTemplateConfigs().length,
    bindings: counts.size,
    covered,
    byBinding,
    unmapped,
    receipt: merkleFold([toUuid('cf-templates|' + ts.length), ...ts.map((t) => toUuid(t.template + '|' + t.bindings.join(',')))]),
    honest: HONEST,
  }
}

const wordsOf = (s: string): string[] =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean)

/** templatesFor(idea) → the templates whose name or bindings answer the words someone brought. Whole words.
 *
 *  A WORD THAT MATCHES EVERY TEMPLATE CARRIES NO INFORMATION, and dropping it is the difference between a
 *  search and a catalogue dump. Every row in the mirror is named `*-template`, so the word "template" matched
 *  all 36 — a caller asking for "zzz-not-a-template" was handed the entire catalogue as though every one of
 *  them answered. The rule is DERIVED, not a hand-kept stop list: a query word is dropped exactly when its
 *  match set is the whole corpus, which is the same discipline the ESCO leg carries (a search guarantees the
 *  query's letters come back, so a hit that everything shares tells you nothing). */
export function templatesFor(idea: string): TemplateCoverage[] {
  const ts = cloudflareTemplates()
  const hay = new Map(ts.map((t) => [t.template, new Set(wordsOf(t.template + ' ' + t.bindings.join(' ')))]))
  const informative = wordsOf(idea).filter((w) => {
    const hits = ts.filter((t) => hay.get(t.template)!.has(w)).length
    return hits > 0 && hits < ts.length
  })
  if (informative.length === 0) return []
  return ts.filter((t) => informative.some((w) => hay.get(t.template)!.has(w))).map(coverageOf)
}

/** the handle of the whole census — one address for "which templates, with which bindings, at this harvest" */
export const templateCensusHandle = (): string => handleOf(templateCensus().receipt)
