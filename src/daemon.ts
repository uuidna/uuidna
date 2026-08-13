#!/usr/bin/env node
// @non-harmonic: node process host (reads process — infra, not the recomputable core) — NAMED boundary; the harmonic core must never carry these ops.
// daemon — uuidna as a long-running LOCAL service: a verifier and a gate any process on the machine can query over
// HTTP. Zero-dependency (Node's built-in http), bound to 127.0.0.1 ONLY (never 0.0.0.0 — loopback, not the network),
// READ-ONLY, and STATELESS: it stores nothing, logs no request bodies, keeps no device data (privacy by default,
// "without consent nothing is stored"). It exposes what uuidna proves and checks — content-address anything, try a
// statement (the three-way verdict), read the sealed ledger, run the honesty gate, fold the trial receipt, and
// VERIFY a text against a claimed address (the keyless tamper-check). It is NOT a censor (it removes nothing, it only
// flags a claim and asks for a proof) and NOT a quantum computer (uuidna's quantum is a classical simulation) — both
// were refuted at trial. This is how uuidna installs deeper on a device: as a service, honestly bounded. Integrity, not truth.
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { readFileSync } from 'node:fs'
import {
  toUuid, adjudicate, overreachOf, theorems, runTrial, vocabulary, THEOREMS, forensics, evidence, ledgerFingerprint, reason, reflects,
} from './index.js'
import { resources } from './resources.js' // Node-only (reads process/os) — imported here, not via the browser index
import { legalFacts } from './legal.js'

const VERSION = (() => {
  try { return JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version as string } catch { return '0.0.0' }
})()

const HOST = '127.0.0.1' // loopback ONLY — the daemon is local; it is never bound to a public interface by default.
const PORT = Number(process.env.UUIDNA_PORT || process.argv[2] || 7777)

export interface RouteResult { status: number; json: unknown }

// The pure router — (method, path, query, body) → {status, json}. No I/O, no globals mutated, so it is unit-testable
// without binding a socket. Every route is read-only and stateless; nothing here writes, stores, or removes anything.
export function route(method: string, path: string, query: URLSearchParams, body: Record<string, unknown>): RouteResult {
  const ok = (json: unknown): RouteResult => ({ status: 200, json })
  const bad = (msg: string): RouteResult => ({ status: 400, json: { error: msg } })

  if (method === 'GET' && path === '/') return ok({
    service: 'uuidna', version: VERSION,
    honest: 'A local, loopback-only, read-only, stateless verifier and gate. Not a censor, not a quantum computer.',
    routes: {
      'GET /health': 'liveness + ledger receipt',
      'GET|POST /address': 'content-address a value (?of= or {text})',
      'POST /trial': 'a three-way verdict for {statement}',
      'POST /forensics': 'audit an agent {statement} (+ optional {claims}) against the receipts',
      'POST /evidence': 'deliver the recomputable evidence bundle for {statement}',
      'GET /gate': 'run the honesty gate on ?text=',
      'POST /verify': 'tamper-check {text, address} — recompute and compare (keyless)',
      'GET /theorems': 'the sealed ledger (?skill= ?contains=)',
      'GET /theorem/<key>': 'one theorem with its proof',
      'GET /run': 'fold the whole ledger to one receipt',
      'GET /fingerprint': 'the fused fingerprint — FNV receipt + collision-resistant SHA-256',
      'GET /resources': 'honest device resource accounting (CPU + memory measured; GPU/bandwidth/joules not faked)',
      'GET /legal': 'recomputable legal FACT BASE (not a legal opinion)',
      'GET /vocabulary': 'the common computable vocabulary',
    },
  })

  if (method === 'GET' && path === '/health') {
    const t = runTrial()
    return ok({ ok: true, version: VERSION, theorems: t.count, receipt: t.receipt })
  }

  if (path === '/address') {
    const text = method === 'GET' ? query.get('of') : (body.text as string | undefined)
    if (text == null) return bad('provide ?of=<text> (GET) or {"text":…} (POST)')
    return ok({ input: text, address: toUuid(String(text)) })
  }

  if (method === 'POST' && path === '/trial') {
    if (typeof body.statement !== 'string') return bad('provide {"statement":…}')
    return ok(adjudicate(body.statement))
  }

  if (method === 'POST' && path === '/forensics') {
    if (typeof body.statement !== 'string') return bad('provide {"statement":…} (an agent statement to audit against the receipts)')
    const claims = Array.isArray(body.claims) ? (body.claims as { text: string; address: string }[]) : undefined
    return ok(forensics(body.statement, claims ? { claims } : {}))
  }

  if (method === 'POST' && path === '/evidence') {
    if (typeof body.statement !== 'string') return bad('provide {"statement":…} (deliver the recomputable evidence bundle)')
    return ok(evidence(body.statement))
  }

  if (method === 'GET' && path === '/gate') {
    const text = query.get('text')
    if (text == null) return bad('provide ?text=<prose>')
    const drained = overreachOf(text)
    return ok({ text, clean: drained === null, overreach: drained, note: drained ? 'flagged — back it with a sealed /theorem/<key> or demarcate it' : 'clean — nothing to drain' })
  }

  if (method === 'POST' && path === '/verify') {
    if (typeof body.text !== 'string' || typeof body.address !== 'string') return bad('provide {"text":…, "address":…}')
    const recomputed = toUuid(body.text)
    return ok({ match: recomputed === body.address, recomputed, claimed: body.address, note: recomputed === body.address ? 'intact — the text recomputes to the claimed address' : 'TAMPERED — the text does not match its claimed address' })
  }

  if (method === 'GET' && path === '/theorems') {
    const skill = query.get('skill'); const contains = query.get('contains')
    let ts = theorems(skill ? { skill } : {})
    if (contains) { const q = contains.toLowerCase(); ts = ts.filter((t) => (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q)) }
    return ok({ count: ts.length, theorems: ts })
  }

  if (method === 'GET' && path.startsWith('/theorem/')) {
    const key = decodeURIComponent(path.slice('/theorem/'.length))
    const t = THEOREMS.find((x) => x.key === key)
    if (!t) return { status: 404, json: { error: 'unknown theorem: ' + key } }
    return ok({ key: t.key, name: t.name, statement: t.statement, lean: t.lean, principle: t.principle, file: t.file, skill: t.skill, address: t.address, verdict: 'SEALED' })
  }

  if (method === 'GET' && path === '/run') return ok(runTrial())
  if (method === 'GET' && path === '/fingerprint') return ok(ledgerFingerprint())
  if (method === 'GET' && path === '/resources') return ok(resources())
  if (method === 'GET' && path === '/legal') return ok(legalFacts())

  if (method === 'POST' && path === '/reason') {
    if (!Array.isArray(body.facts) || !Array.isArray(body.rules)) return bad('provide {"facts":[atoms], "rules":[{"if":[atoms],"then":atom}]}')
    return ok(reason((body.facts as string[]).map(String), body.rules as { if: string[]; then: string }[]))
  }
  if (method === 'GET' && path === '/vocabulary') return ok(vocabulary())
  if (method === 'GET' && path === '/reflects') { const q = query.get('q'); return q ? ok(reflects(q)) : bad('provide ?q=<system described by devices/concepts>') }

  return { status: 404, json: { error: 'no such route: ' + method + ' ' + path + ' — GET / for the index' } }
}

// The HTTP wrapper around the pure router. Reads at most a small JSON body, bounded, and never persists it.
function handle(req: IncomingMessage, res: ServerResponse): void {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`)
  const send = (r: RouteResult): void => {
    const payload = JSON.stringify(r.json, null, 2)
    res.writeHead(r.status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
    res.end(payload)
  }
  if (req.method === 'GET') { send(route('GET', url.pathname, url.searchParams, {})); return }
  if (req.method === 'POST') {
    let raw = ''
    req.on('data', (c) => { raw += c; if (raw.length > 1_000_000) req.destroy() }) // 1 MB cap; bodies are never stored
    req.on('end', () => {
      let body: Record<string, unknown> = {}
      try { body = raw ? JSON.parse(raw) : {} } catch { send({ status: 400, json: { error: 'invalid JSON body' } }); return }
      send(route('POST', url.pathname, url.searchParams, body))
    })
    return
  }
  send({ status: 405, json: { error: 'method not allowed' } })
}

// Start only when run directly (not when imported by the tests). Bound to loopback, logs a line, exits cleanly.
const isMain = process.argv[1] && (import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith(process.argv[1].split('/').pop() || ''))
if (isMain) {
  const server = createServer(handle)
  server.listen(PORT, HOST, () => {
    console.log(`uuidna daemon ${VERSION} — http://${HOST}:${PORT} (loopback only, read-only, stateless)`)
    console.log(`  try: curl http://${HOST}:${PORT}/health`)
  })
  const shut = (): void => { server.close(() => process.exit(0)) }
  process.on('SIGINT', shut); process.on('SIGTERM', shut)
}
