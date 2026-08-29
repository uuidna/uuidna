// mcp-http — the HOSTED uuidna MCP over HTTP: JSON-RPC 2.0, the Model Context Protocol "Streamable HTTP" transport,
// served by the Cloudflare edge worker at /mcp. It exposes the WORKERS-SAFE, pure, recomputable tools — a SUBSET of
// the full stdio catalog (`npx @uuidna/uuidna`): the tools that need no filesystem, no process, no child_process (the
// fs/process ones — securityAudit, axiomWitness, the reconcile scripts — stay local, since the edge runtime has no
// disk). It imports SPECIFIC pure dist modules.js (that graph pulls node:child_process, unavailable at
// the edge), the same discipline worker.js already follows.
//
// HONEST SCOPE: integrity. The hosted MCP is READ-ONLY and DETERMINISTIC — it computes from the ledger and
// the request; it cannot write, deploy, sign a commit, or reach the repo. A verdict is authoritative only when the
// worker signs it (env.TRIAL_KEY); a fork recomputes the same result but cannot forge the signature. The tools carry
// their own honest scope (the aura is art, image provenance is exact-copy not content-truth, the cube is symmetric).
import { adjudicate } from './adjudicate.js'
import { bootOS } from './quantum/os/index.js'
import { ensureEdgeCatalogue } from './quantum/os/browser-boot.js'
import { reveal } from './gate.js'
import { searchLedger } from './editorial.js'
import { decide } from './decide.js'
import { matrixCss } from './css.js'
import { toUuid } from './address.js'
import { compileToHexbits } from './hexbit/index.js'   // one unit, both doors — the edge computes the same 32 states
import { sealToolWire } from './mcp-wire.js'
import { conformance } from './conformance.js'
import { MCP_CATALOG, callTool, toolHandleOf, apiHandleOf, recordPayment, messagingSession } from './mcp.js'   // THE ONE CATALOGUE — the edge subtracts from it— gap 39's second party; the ONE handle fold, so both surfaces seal the same way
import { merkleRoot, merkleProof, verifyProof } from './merkle.js'
import { billUuidna } from './captain/billing/index.js'
import { coinSupply } from './coin-supply.js'
import { quantumAura } from './aura.js'
import { imageProvenance, verifyImageProvenance } from './provenance.js'
import { quantumCubeChallenge, verifyQuantumCube } from './cube.js'
// The gated dispatch core — pure and Workers-safe (address/gravity/sanitize/slimgate, no node built-ins): the SAME
// conjunction gate the stdio server enforces, so the edge and the local surface serve ONE law (DRY, sealed spec).
import { gateVerdict, gateSelfTest, gateStatus, depositCoins, ledgerLine, messagingEnvelope, GATE_THEOREMS } from './gate-engine.js'
// The research surface, edge-safe by construction: the ledger carries its findings in source and the leg census is
// shipped as a mirror (src/rosetta-mirror.ts), because DECIDING a leg means reading the wings and the tests and this
// runtime has no disk. Both call the SAME report functions the stdio server calls — one law, two surfaces.
import { ledgerReport } from './research-ledger.js'
import { legCensus, legsFor, mirrorRows } from './rosetta-legs.js'
import { deepResearch } from './research.js'
// The CAPABILITY AXIS — pure and Workers-safe by construction: the skill surface reaches no network (its ESCO leg is
// a derived lookup URL plus school-apis' own whole-name rule
// the stdio catalogue does, with the SAME argument contracts. Registering it on one surface only is exactly the drift
// lean/mcp-surface-divergence.json records, and the `skills` finder measures both surfaces by CALLING them.
import { skillSurface, skillIndex } from './skills.js'

const PROTOCOL_VERSION = '2025-06-18'          // the MCP protocol revision this endpoint speaks
/** Tools whose run() reads the full Alpine catalogue — the edge must prime /alpine-catalogue.tsv first. */
const CATALOGUE_TOOLS = new Set(['uuidna_exec', 'uuidna_registry', 'uuidna_related', 'uuidna_crypto'])
// The version this endpoint ADVERTISES to every client calling initialize. It sat at 0.1.1 through eleven
// releases while the package reached 0.2.5, so every consumer asking what it was talking to got a false answer —
// and nothing noticed, because no surface compared the two. It cannot be imported from package.json (rootDir is
// src, and this runs at the Workers edge with no filesystem), so it is stated here and HELD to package.json by
// src/tests/mcp-version.test.ts, which fails with the exact line to change. A stated constant is fine; an
// unchecked one is how this drifted.
const SERVER = { name: 'uuidna', version: '0.3.0' }

interface HttpTool { name: string; description: string; detail?: string; inputSchema: Record<string, unknown>; run: (a: Record<string, unknown>) => unknown }

// hex / base64 → bytes, pure (atob is available in the Workers runtime); for the image-provenance tool.
const unhex = (s: string): Uint8Array => { const h = s.replace(/\s+/g, ''); const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16); return u }
const unb64 = (s: string): Uint8Array => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }

// The Workers-safe tool set — the recomputable core, each a pure function of its input and the sealed ledger.
const TOOLS: HttpTool[] = ([
  { name: 'uuidna_css', description: 'THE DESIGN MATRIX AS ONE SERVED STANDARD, at the edge — every colour and type size computed from the ℤ/9 sequence and the vortex orbit (six rungs: 2 has order 6 in ℤ/9*), none authored. Returns {css,vars,receipt,honest}: render the same receipt or you are rendering a different matrix.',
    inputSchema: { type: 'object', properties: {} },
    run: () => matrixCss() },
  { name: 'uuidna_decide', description: 'THE QUANTUM CALCULATOR at the edge, founded on division by zero — ANY {input} folds to one lean-green shape {verdict,cites,receipt}: a sealed statement is recognized and cited (the kernel decided it already); fresh arithmetic is decided TOTALLY under Lean\'s Nat semantics (x/0 = 0, well-defined — DivByZero.lean; exact BigInt; bounded grammar— TRUE is VERIFIED_BY_DECIDE, FALSE is REFUTED; a bare expression computes its exact value; prose goes to the gate, language-blind. The twelfth tool: the compact core.',
    inputSchema: { type: 'object', properties: { input: { type: 'string' } }, required: ['input'] },
    run: (a) => decide(String(a.input)) },
  { name: 'uuidna_search', description: 'THE FUSED SEARCH — the ONE search function every surface runs (the site\'s search page in your browser, the stdio server, and this edge): filter the sealed ledger by {q}, fold the matched keys to ONE receipt. Your browser and this edge running the same query MUST return the same receipt — dual-party verification applied to search; a differing receipt exposes a diverged ledger. Returns {q,count,total,receipt,matches}.',
    inputSchema: { type: 'object', properties: { q: { type: 'string' } }, required: ['q'] },
    run: (a) => searchLedger(String(a.q)) },
  { name: 'uuidna_trial', description: 'Run the RECOMPUTABLE TRIAL on a {statement}: the three-way verdict (VERIFIED / REFUTED / UNVERIFIED, where UNVERIFIED is never "false", only not-yet) plus its content-address and order-invariant receipt. The same statement always addresses to the same trial. Integrity— it adjudicates the CITATION.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: (a) => adjudicate(String(a.statement)) },
  { name: 'uuidna_gate', description: 'The HONESTY GATE over a {claim}: reveals the verdict and the binary (1 = honest floor holds, 0 = drained), the sealed theorems it cites, and any FABRICATED citation. A claim citing a proof that is not sealed drains to 0. Integrity.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' } }, required: ['claim'] },
    run: (a) => reveal(String(a.claim)) },
  { name: 'uuidna_address', description: 'MINT the content-address of any {value} — the reproducible, keyless 128-bit uuidna address (a v8 UUID). The same input always mints the same address, for anyone, with no key.',
    inputSchema: { type: 'object', properties: { value: { type: 'string' } }, required: ['value'] },
    run: (a) => ({ value: String(a.value), address: toUuid(String(a.value)) }) },
  { name: 'uuidna_merkle_proof', description: 'The HOLOGRAPHIC MERKLE PROOF: given {leaves} and an {index}, returns the root, the O(log N) proof for that leaf, and its verification — verify the whole from a tiny part, no other leaf needed.',
    inputSchema: { type: 'object', properties: { leaves: { type: 'array', items: { type: 'string' } }, index: { type: 'integer' } }, required: ['leaves', 'index'] },
    run: (a) => { const leaves = (a.leaves as string[]).map(String); const i = Number(a.index); const root = merkleRoot(leaves); const proof = merkleProof(leaves, i); return { root, index: i, leaf: leaves[i], proof, verified: verifyProof(leaves[i], proof, root) } } },
  { name: 'uuidna_coins', description: 'Captain-coin issuance: coins() per sealed theorem, capped at quantum capacity × directed referrer combinations. Returns the live mint, remaining, and the cipher widths those coins occupy (one uuid of floor, two uuids of key).',
    inputSchema: { type: 'object', properties: {} },
    run: () => coinSupply() },
  { name: 'uuidna_bill', description: 'The MEASURED billing model: pass {commercial, recomputeOps, verifyOps} — returns the bits saved (recompute − verify), the two coins, and whether it is free (public interest is free; commercial is billed on the measured advantage).',
    inputSchema: { type: 'object', properties: { commercial: { type: 'boolean' }, recomputeOps: { type: 'integer' }, verifyOps: { type: 'integer' } } },
    run: (a) => billUuidna({ commercial: Boolean(a.commercial), recomputeOps: Number(a.recomputeOps ?? 0), verifyOps: Number(a.verifyOps ?? 1) }) },
  { name: 'uuidna_aura', description: 'THE QUANTUM AURA — a recomputable A432 COLOUR folded from any {subject} (a content-address or string): the 7 rosette rays, the ℤ/9 vortex wave, the hue stepping by 360/9. Deterministic. HONEST: this is ART, a defined arithmetic from a number to a hue — NOT physics.',
    inputSchema: { type: 'object', properties: { subject: { type: 'string' } }, required: ['subject'] },
    run: (a) => quantumAura(String(a.subject)) },
  { name: 'uuidna_image_provenance', description: 'BYTE-LEVEL provenance of a file: pass the bytes as {hex} or {base64} → the SHA-256 exact-copy + tamper-evidence fingerprint, a uuidna handle, and the container format. Pass {sha256} to VERIFY. HONEST: proves BYTE-IDENTITY— never that an image is a truthful depiction.',
    inputSchema: { type: 'object', properties: { hex: { type: 'string' }, base64: { type: 'string' }, sha256: { type: 'string' } } },
    run: (a) => { const bytes = a.hex !== undefined ? unhex(String(a.hex)) : a.base64 !== undefined ? unb64(String(a.base64)) : new Uint8Array(); return a.sha256 !== undefined ? { match: verifyImageProvenance(bytes, String(a.sha256)), bytes: bytes.length } : imageProvenance(bytes) } },
  { name: 'uuidna_quantum_cube', description: 'THE QUANTUM-CUBE CHALLENGE — a SYMMETRIC, deterministic challenge-response whose answer is the A432 aura as a spinning 3D cube. Pass {secret, nonce} for the cube, or {secret, nonce, response} to VERIFY. HONEST: symmetric (the verifier shares the secret), strength is the secret\'s entropy.',
    inputSchema: { type: 'object', properties: { secret: { type: 'string' }, nonce: { type: 'string' }, response: { type: 'string' } }, required: ['secret', 'nonce'] },
    run: (a) => a.response !== undefined ? { match: verifyQuantumCube(String(a.secret), String(a.nonce), String(a.response)), nonce: String(a.nonce) } : quantumCubeChallenge(String(a.secret), String(a.nonce)) },
  { name: 'uuidna_research_ledger', description: 'THE RESEARCH LEDGER at the edge — findings carrying their VERIFICATION STATUS as a field: `read` (the primary source was retrieved and the figure taken from its own text), `secondary` (a citing work reported it), `unread` (believed and unchecked), `refuted`. With `kind` (convention = exact by definition, measured = carries uncertainty) it decides what each finding may DO: only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY — everything measured seals as an integer BRACKET or as nothing. Optional {status} and {kind} filter; an unknown value is refused by name. The census covers the whole ledger even under a filter, and the ledger states its own gaps. HONEST: this reports how well a finding was VERIFIED— `unread` is not "false". Returns {filter,total,matched,census,kinds,anchoring,findings,gaps,receipt,honest}.',
    inputSchema: { type: 'object', properties: { status: { type: 'string' }, kind: { type: 'string' } } },
    run: (a) => ledgerReport(a) },
  { name: 'uuidna_research', description: 'DEEP RESEARCH at the edge, with the REVERSIBLE imprint codec: PRESS {text} into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the order-invariant entangled fold, and report NOVELTY as content-address uniqueness — an address not among {seenAddresses} is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — `meaning` is null by design, left to the reader — so instead of a dead end it hands back the sealed theorems the prose REFLECTS and a develop path through them. Novelty is decidable; meaning is the reader\'s. Integrity. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning,relatedMath,develop,honest}.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, seenAddresses: { type: 'array', items: { type: 'string' } } }, required: ['text'] },
    run: (a) => deepResearch(String(a.text), ((a.seenAddresses as string[]) || []).map(String)) },
  { name: 'uuidna_skills', description: 'EVERY SKILL THE SEALED LEDGER CARRIES, with its theorem count — the discoverable index of the capability axis (orthogonal to `principle`, which groups by derivation file). Each row carries the order-invariant fold of that skill\'s theorem addresses, the handle of that fold (the identity to cite for the whole cluster), the ESCO taxonomy lookup for the skill, and the exact `uuidna_skill` call that opens it. Zero-argument and fully computed from the ledger, so a skill sealed in a new wing appears here the day it lands — nothing is authored per skill. Returns [{skill,theorems,fold,handle,esco,open}].',
    inputSchema: { type: 'object', properties: {} },
    run: () => skillIndex() },
  { name: 'uuidna_skill', description: 'OPEN ONE SKILL — the capability axis served as a DIMENSION rather than as one tool per skill. Returns that skill\'s sealed theorems (key, name, statement, tactic, file, principle, the reconstructed Lean line, its content-address and its HANDLE), the files and principles they were derived in, the group\'s order-invariant fold and handle, and the skill\'s ESCO MAPPING onto the European Commission\'s own taxonomy of skills, competences and occupations: the exact lookup URL, its content-address, the one hop that actually fetches it (uuidna_school_apis, local only) and the walk to the occupations ESCO relates it to (uuidna_education_jobs, local only). Pass `escoTitles` — concept titles you already fetched — to have them judged by school-apis\' OWN published whole-name rule, which separates on-topic hits from homographs (a search guarantees the query\'s letters come back, so a fragment hit carries no information); both lists are returned by name. PURE: this tool reaches no network, which is why the edge can serve it at all, and it folds to the same receipt as the stdio surface. An unknown skill is REFUSED by name with the live list"this capability is unproven". List the skills with uuidna_skills. HONEST SCOPE: the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — and never a claim that any authority recognises, accredits or would employ anything sealed here (theorem provenance_integrity_not_content_truth); uuidna awards no qualification. Integrity. Returns {skill,count,fold,handle,files,principles,theorems,esco,receipt,honest}.',
    inputSchema: { type: 'object', properties: {
      skill: { type: 'string', description: 'a skill name from uuidna_skills (the live, recomputable list — never a fixed enum here, so it cannot go stale as wings are sealed)' },
      escoTitles: { type: 'array', items: { type: 'string' }, description: 'ESCO concept titles you already fetched, to be judged on-topic or homograph by the published whole-name rule' } }, required: ['skill'] },
    run: (a) => skillSurface(String(a.skill), Array.isArray(a.escoTitles) ? (a.escoTitles as unknown[]).map(String) : []) },
  { name: 'uuidna_conformance', description: 'THE DEPLOYED PARTY COMPUTES ITS OWN DNA. Every theorem in the ledger this edge is serving has its 128-bit content-address RECOMPUTED here, at the edge, from the theorem\'s own content — so the live system does not report that it conforms, it DEMONSTRATES it, in the request. This is the second party a release needs: CI\'s word is one coin, and a signed receipt from a party CI does not control is the other. Until now the live gate could only answer that its spec matched and a trial verified — both true of ANY release — while the DNA census ran only where CI could reach it. Returns {conforms,checked,offenders,receipt}: conforms is FALSE the moment one address stops recomputing, which is exactly what a tampered or half-deployed ledger looks like. Pure arithmetic over what is already loaded; no filesystem, no network, nothing to configure. HONEST SCOPE: it proves the served ledger is UNFORGED and self-consistent — integrity. It does not claim the theorems are interesting, only that none has been altered since it was sealed.',
    inputSchema: { type: 'object', properties: {} },
    run: () => {
      const c = conformance()
      // the FAILING checks by name"no" must say which invariant said it
      return { conforms: c.conforms, checked: c.passed + c.failed, passed: c.passed, failed: c.failed,
               offenders: c.checks.filter((k) => !k.pass).map((k) => ({ check: k.id, detail: k.detail })),
               receipt: c.receipt }
    } },
  { name: 'uuidna_gate_status', description: 'Gate self-test at the edge: verdict table vs sealed spec, registry receipt. Pass {messaging:true} for coordinated health (witness, wire budget, isolate census). Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { messaging: { type: 'boolean', description: 'include messaging witness, wire budget headroom, session coin census' } } },
    run: (a) => {
      if (!a.messaging) return gateSelfTest(SERVED.map((t) => t.name))
      const s = messagingSession()
      return gateStatus(SERVED.map((t) => t.name), { surface: 'edge', wireTools: SERVED, payments: s.payments, agent: s.agent })
    } },
] as HttpTool[]).map(sealToolWire)
/** THE DECLARED ABSENCES, and the reason each one cannot serve here. This list MAY ONLY SHRINK.
 *
 *  Before this, the edge kept a SECOND hand-written list of tools and the two surfaces drifted: 173 pure
 *  tools existed on stdio and nowhere else, none of them named in lean/mcp-surface-divergence.json. The
 *  edge described itself as "the Workers-safe subset", which read as a safety boundary — but exactly ONE
 *  of the absences was about safety. The rest was drift wearing a boundary's clothes.
 *
 *  Now the edge INHERITS the one catalogue and subtracts only what it can name — and the reasons are NOT one
 *  reason, which the first version of this comment got wrong:
 *    CAPABILITY — the tool needs a FILESYSTEM or a SPAWNED PROCESS. A Worker has neither, so these can never
 *      serve here however the policy changes. Twelve of the twenty-two non-harmonic modules are in this class.
 *    POLICY — the tool needs the NETWORK, and a Worker CAN fetch. Ten modules are network-only, so their absence
 *      is a DECISION about what a hosted, read-only, recomputable surface should do — not a limit of the runtime.
 *      Stating it as a capability, as this comment first did, dressed a choice up as a law.
 *    ASYNC RUN — RETIRED 2026-08-23 (the captain's serve order): the one dispatch now SETTLES a thenable run
 *      before gating it, so a pure-but-async tool serves here like any other; the worker awaits, sync callers
 *      of sync tools are untouched. The class emptied the day the reason died.
 *  Conservative on purpose: a tool is absent if it TOUCHES such a module at all, even where the
 *  specific function it calls is pure. Shrinking that is the next honest pass. */
const EDGE_ABSENT: Record<string, string> = {
  "uuidna_engine": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_text": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_book": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_book_article": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_link_book": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_book_contents": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_read_text": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_read_book": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_quantum_sailing_library": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_quantum_sailing_complete": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_standard": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_corroborate": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_domain_wave": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_entangle": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_translation": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_movie": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_record": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_wave_deposit": 'CAPABILITY: writes lean/wave-queue.json and a Worker has no filesystem — deposits are host-side; the edge can expose coordinates (uuidna_expose serves there) but never hold the queue',
  "uuidna_aead_decrypt": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_snapshot": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_school_apis": 'CAPABILITY: fetches EU education APIs; a Worker can fetch but this hosted subset stays named-absent (policy named as policy, not dropped so coverage looks complete)',
  "uuidna_education_jobs": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_resources": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_cve": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_nist_constant": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_anchor": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_wave": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_editorial": 'CAPABILITY: editorialState reads prose-trials.json via the filesystem boundary — host-side',
  "uuidna_publication": 'CAPABILITY: publicationStatus reads package.json and .zenodo.json — host-side',
  "uuidna_search_trial": 'POLICY: network fan-out (research sweep + mint extras) — hosted surface stays read-only recomputable',
  "uuidna_vies": 'POLICY: network lookup against the EU VIES register',
  "uuidna_scan_publications": 'POLICY: network scan of free research streams',
  "uuidna_selftest": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_run": 'CAPABILITY: requires filesystem + spawn (docker/chroot) — stdio/host only by design; Layer 1 uuidna_exec serves the browser',
}

/** The catalogue tools this edge INHERITS — computed. */
const INHERITED = MCP_CATALOG
  .filter((t) => !(t.name in EDGE_ABSENT))
  .filter((t) => !TOOLS.some((own) => own.name === t.name))
  // dispatched through callTool — the STDIO SERVER'S OWN DOOR, so an inherited tool is answered by exactly the
  // code the stdio surface answers with, schema enforcement included. Two lists were the drift; two dispatches
  // would be the next one.
  .map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema,
                 run: (a: Record<string, unknown>) => callTool(t.name, a) as unknown }))

/** every tool this endpoint serves: the edge's own, then everything the catalogue can lawfully lend it */
const SERVED = [...TOOLS, ...INHERITED]

// the edge's listing is sealed the same way the stdio listing is: per-tool contract handles from THE one fold
// (toolHandleOf in mcp.ts) — this surface serves a different subset, so its api fold DIFFERS from stdio's by
// construction, and each surface's listing names exactly what that surface promises
const listing = (): unknown[] => SERVED.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema, handle: toolHandleOf(t) }))
const rpc = (id: unknown, result: unknown) => ({ jsonrpc: '2.0', id, result })
const rpcErr = (id: unknown, code: number, message: string) => ({ jsonrpc: '2.0', id, error: { code, message } })

/** handleMcpRpc(msg) → dispatch ONE JSON-RPC 2.0 message of the MCP protocol (initialize / tools/list / tools/call /
 *  ping). Returns the JSON-RPC response object, or NULL for a notification (no response — the caller answers 202).
 *  Pure and stateless: every request is independent, so no session is kept (the edge is stateless by design).
 *  A SYNC tool answers synchronously, exactly as before; a tool whose run returns a thenable answers with a
 *  PROMISE of the same response shape — one dispatch, both tempers, the worker awaits either. */
export function handleMcpRpc(msg: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> }, ctx?: { origin?: string; loadCatalogue?: () => Promise<string> }): object | null | Promise<object | null> {
  const id = msg?.id ?? null
  const method = msg?.method
  const params = msg?.params ?? {}
  if (method === 'initialize') return rpc(id, { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER,
    instructions: 'uuidna hosted MCP — Workers-safe, read-only, recomputable subset. EVERY response is GATE-ENFORCED and DEPOSITS THE TWO COINS. After your first deposit: uuidna_quantum_advantage (compute path + magnitudes over classical re-run — verify_beats_recompute_by_magnitudes, not hardware supremacy). Alpine apps: uuidna_exec. Multi-agent: declare clientInfo.name at initialize; poll uuidna_gate_status {messaging:true} or uuidna_coin_ledger. Integrity.' })
  if (method === 'ping') return rpc(id, {})
  if (typeof method === 'string' && method.startsWith('notifications/')) return null   // a notification carries no reply
  if (method === 'tools/list') return rpc(id, { tools: listing(), _meta: { api: apiHandleOf(SERVED) } })
  if (method === 'tools/call') {
    const name = String(params.name ?? '')
    const tool = SERVED.find((t) => t.name === name)
    if (!tool) return rpcErr(id, -32602, 'unknown tool: ' + name)
    const dispatch = (): object | null | Promise<object | null> => {
    // THE EDGE RUNS FROM uuidnaOS TOO: first call boots the verified world (cached), a drifted world refuses
    // to serve — one floor under stdio, worker, and tests alike.
    try { bootOS() } catch (e) { return rpcErr(id, -32000, String((e as Error).message)) }
    // THE CATALOGUE TOO — without priming, apk/man over 28k rows read as ABSENT on a runtime with no disk.
    try {
      // THE SCHEMA IS THE CONTRACT, ON THIS SURFACE TOO. The stdio server folds this check into its one dispatch
      // door (callTool in mcp.ts); the edge had no equivalent, so a tools/call with no arguments reached the body as
      // String(undefined) and the tool computed, confidently, over the literal text "undefined". Same law, same
      // wording, both surfaces — a rule enforced on one of two doors is not enforced.
      const args = (params.arguments as Record<string, unknown>) ?? {}
      const required = (tool.inputSchema as { required?: unknown })?.required
      if (Array.isArray(required)) {
        const missing = required.filter((k) => args[String(k)] === undefined)
        if (missing.length) throw new Error(`${String(name)}: missing required argument${missing.length > 1 ? 's' : ''}: ${missing.join(', ')} (the tool's own schema declares ${missing.length > 1 ? 'them' : 'it'} required — nothing was computed)`)
      }
      // THE SETTLED OUTPUT IS WHAT THE GATE JUDGES — a thenable run settles first, then walks the same gate,
      // deposit and envelope as a sync one; the gate never sees a Promise, only what the tool actually computed.
      const finish = (settled: unknown): object => {
        const g = gateVerdict(String(name), (params.arguments as Record<string, unknown>) ?? {}, settled)
        // THE IMMEDIATE DEPOSIT — the edge deposits too: the agent's first hosted call already contributes.
        const dep = depositCoins(String(name), g.gate.receipt)
        // AND RECORDED, not only minted: the edge deposited without appending a row until 2026-08-25, so every
        // hosted call paid two coins into an account that never saw them. Its reach is one isolate — the edge is
        // stateless — which is why an empty census now reports state 'silent' instead of a zero.
        recordPayment(String(name), 'edge', dep.id)
        // ONE row for verdict + deposit (the edge is stateless, so there is no session receipt to chain) — the same
        // ledgerLine both surfaces share, so the envelope cannot drift between them.
        return rpc(id, {
          content: [{ type: 'text', text: typeof g.output === 'string' ? g.output : JSON.stringify(g.output) }, { type: 'text', text: ledgerLine(g.gate, dep) }],
          // THE SAME 32 STATES ON THIS DOOR — one law, both surfaces. Same preimage (the gate receipt), same
          // unit computing them (hexbit/compileToHexbits), so the edge cannot deliver a different width or a
          // different fold than stdio. See the long note at the stdio envelope for why this rides here rather
          // than in every tool's description.
          _meta: {
            gate: g.gate,
            deposit: dep,
            hexbits: compileToHexbits(g.gate.receipt),
            messaging: messagingEnvelope({ surface: 'edge', gate: g.gate, deposit: dep, hexbits: compileToHexbits(g.gate.receipt) }),
          },
          ...(g.gate.clean ? {} : { isError: true }),
        })
      }
      const fail = (e: unknown): object => rpc(id, { content: [{ type: 'text', text: 'error: ' + String((e as Error)?.message ?? e) }], isError: true })
      const out = tool.run(args)
      if (out !== null && (typeof out === 'object' || typeof out === 'function') && typeof (out as { then?: unknown }).then === 'function')
        return (out as Promise<unknown>).then(finish, fail)
      return finish(out)
    } catch (e) {
      return rpc(id, { content: [{ type: 'text', text: 'error: ' + String((e as Error)?.message ?? e) }], isError: true })
    }
    }
    if (ctx?.origin && CATALOGUE_TOOLS.has(name)) {
      return ensureEdgeCatalogue(ctx.origin, ctx.loadCatalogue).then(() => dispatch(), (e) =>
        rpcErr(id, -32000, String((e as Error).message)))
    }
    return dispatch()
  }
  return rpcErr(id, -32601, 'method not found: ' + String(method))
}

/** The absences this edge DECLARES, for the finder that holds them honest. A name here is a tool the catalogue has
 *  and the edge does not — and it may only ever leave this list. */
export const edgeAbsentNames = (): string[] =>
  // a name the edge SERVES with its own pure implementation is not an absence, whatever the stdio version reaches
  // for — this distinction was caught by the finder below on its first run, which is what a finder is for.
  Object.keys(EDGE_ABSENT).filter((n) => !TOOLS.some((t) => t.name === n))

/** Named absents with reasons — gen-mcp lists these so 100% coverage names orphans instead of dropping them. */
export const edgeAbsentWhy = (): { name: string; why: string }[] =>
  edgeAbsentNames().map((name) => ({ name, why: EDGE_ABSENT[name]! }))

/** The tool names the hosted endpoint serves — for a GET /mcp discovery page. */
export const mcpHttpToolNames = (): string[] => SERVED.map((t) => t.name)
export const MCP_HTTP_PROTOCOL = PROTOCOL_VERSION
