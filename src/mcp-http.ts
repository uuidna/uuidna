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
import { reveal } from './gate.js'
import { searchLedger } from './editorial.js'
import { decide } from './decide.js'
import { matrixCss } from './css.js'
import { toUuid } from './address.js'
import { conformance } from './conformance.js'
import { MCP_CATALOG, callTool, toolHandleOf, apiHandleOf } from './mcp.js'   // THE ONE CATALOGUE — the edge subtracts from it— gap 39's second party; the ONE handle fold, so both surfaces seal the same way
import { merkleRoot, merkleProof, verifyProof } from './merkle.js'
import { coins, billUuidna } from './captain/billing/index.js'
import { quantumAura } from './aura.js'
import { imageProvenance, verifyImageProvenance } from './provenance.js'
import { quantumCubeChallenge, verifyQuantumCube } from './cube.js'
// The gated dispatch core — pure and Workers-safe (address/gravity/sanitize/slimgate, no node built-ins): the SAME
// conjunction gate the stdio server enforces, so the edge and the local surface serve ONE law (DRY, sealed spec).
import { gateVerdict, gateSelfTest, depositCoins, ledgerLine, GATE_THEOREMS } from './gate-engine.js'
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
// The version this endpoint ADVERTISES to every client calling initialize. It sat at 0.1.1 through eleven
// releases while the package reached 0.2.5, so every consumer asking what it was talking to got a false answer —
// and nothing noticed, because no surface compared the two. It cannot be imported from package.json (rootDir is
// src, and this runs at the Workers edge with no filesystem), so it is stated here and HELD to package.json by
// src/tests/mcp-version.test.ts, which fails with the exact line to change. A stated constant is fine; an
// unchecked one is how this drifted.
const SERVER = { name: 'uuidna', version: '0.2.8' }

interface HttpTool { name: string; description: string; inputSchema: Record<string, unknown>; run: (a: Record<string, unknown>) => unknown }

// hex / base64 → bytes, pure (atob is available in the Workers runtime); for the image-provenance tool.
const unhex = (s: string): Uint8Array => { const h = s.replace(/\s+/g, ''); const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16); return u }
const unb64 = (s: string): Uint8Array => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }

// The Workers-safe tool set — the recomputable core, each a pure function of its input and the sealed ledger.
const TOOLS: HttpTool[] = [
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
  { name: 'uuidna_coins', description: 'The two captain COINS — coins() = 2, the conserved fair-exchange invariant (110 − 108 = 2, the Euler characteristic −χ of the genus-2 double torus). The price the fuse (64-bit → 128-bit) is gated on.',
    inputSchema: { type: 'object', properties: {} },
    run: () => ({ coins: coins() }) },
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
  { name: 'uuidna_rosetta_legs', description: 'THE INDEPENDENT-WITNESS CENSUS at the edge — how many of the five legs each sealed theorem carries: SYMBOL (the TypeScript mirror the emitter cross-checks), PROOF (the kernel\'s `by decide` verdict), WITNESS (a source outside this repository), FALSIFIER (a deliberate mutation that must FAIL — it tests the test), ADDRESS (the content fold anyone recomputes from). Symbol and proof are written by one hand and share its errors, so two legs DETECT a disagreement and never LOCATE the fault; three locate one. Pass {key} for one theorem, or nothing for the distribution, the per-leg totals, the scarcest leg, the fully-anchored keys and the floor the anchoring may never fall below. DECIDING a leg needs the wings, the emitters and the tests — a filesystem this runtime does not have — so the edge answers from the census shipped in source, and the stdio tool reports whether the two still agree. HONEST: it MEASURES anchoring and certifies nothing; a missing leg is never a claim that the theorem is false.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } } },
    run: (a) => { const rows = mirrorRows(); return a.key === undefined || a.key === null || String(a.key) === '' ? legCensus(rows) : legsFor(rows, String(a.key)) } },
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
  { name: 'uuidna_gate_status', description: 'THE GATE PROVES ITSELF, live at the edge: every hosted tools/call passes the sealed conjunction gate cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) — input sanitized, output sanitized, no fabricated theorem citation — and this tool recomputes the eight-state verdict table and REQUIRES it to equal the sealed table [1,0,0,0,0,0,0,0] (theorem anti_fraud_check_deterministic) and the boolean spec (theorem honesty_gate_is_theorem_not_oracle). The registry folds to its ORDER-INVARIANT identity receipt. The SAME gate the stdio server enforces — one law, both surfaces. Returns {table,sealedTable,matchesSealedSpec,cleanStates,drainedStates,tools,registry,cites,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => gateSelfTest(TOOLS.map((t) => t.name)) },
]
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
 *    ASYNC RUN — handleMcpRpc is synchronous by design (stateless, one request one answer), so it cannot
 *      await. These are PURE and belong here; they wait on the dispatch becoming async.
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
  "uuidna_aead_decrypt": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_snapshot": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_school_apis": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_education_jobs": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_resources": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_audit_cve": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_nist_constant": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_anchor": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_wave": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_by_lean": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_lean_index": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_statement_census": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_search": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_article": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_editorial": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_publication": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_search_trial": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_vies": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_mcp_benchmark": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_unify": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_scan_publications": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_selftest": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_quantum": 'reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy',
  "uuidna_quantum_sailing_weather": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_quantum_message": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_theorem_message": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_dictionary": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_quantum_voting": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_agent_contribute": 'pure, but its run is ASYNC and this dispatch is synchronous',
  "uuidna_predict": 'pure, but its run is ASYNC and this dispatch is synchronous',
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
 *  Pure and stateless: every request is independent, so no session is kept (the edge is stateless by design). */
export function handleMcpRpc(msg: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> }): object | null {
  const id = msg?.id ?? null
  const method = msg?.method
  const params = msg?.params ?? {}
  if (method === 'initialize') return rpc(id, { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER,
    instructions: 'uuidna hosted MCP — the Workers-safe, read-only, recomputable subset. EVERY response is GATE-ENFORCED: each tools/call passes the sealed conjunction gate cleanAudit(f,d,v) — input sanitized, output sanitized, no fabricated theorem citation — one violation drains, named. EVERY call DEPOSITS THE TWO COINS immediately (contribute first, then take — the id a deterministic content-address citing theorem captain_commission_two_coins and theorem two_coins): your first call has already contributed. Every result is TWO content blocks: the answer, then ONE ledger line carrying the gate receipt and the deposit id; full detail in _meta. Recompute the gate against its sealed spec: uuidna_gate_status (theorem anti_fraud_check_deterministic). Integrity.' })
  if (method === 'ping') return rpc(id, {})
  if (typeof method === 'string' && method.startsWith('notifications/')) return null   // a notification carries no reply
  if (method === 'tools/list') return rpc(id, { tools: listing(), _meta: { api: apiHandleOf(SERVED) } })
  if (method === 'tools/call') {
    // THE EDGE RUNS FROM uuidnaOS TOO: first call boots the verified world (cached), a drifted world refuses
    // to serve — one floor under stdio, worker, and tests alike.
    try { bootOS() } catch (e) { return rpcErr(id, -32000, String((e as Error).message)) }
    const name = params.name
    const tool = SERVED.find((t) => t.name === name)
    if (!tool) return rpcErr(id, -32602, 'unknown tool: ' + String(name))
    // THE GATED DISPATCH — the same pure conjunction gate the stdio server enforces (gate-engine, sealed spec):
    // the settled output is judged, the verdict travels in the response, a drained verdict ships sanitized and
    // flagged with its bits named. Stateless: the gate receipt is per-call, no session chain at the edge.
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
      const out = tool.run(args)
      const g = gateVerdict(String(name), (params.arguments as Record<string, unknown>) ?? {}, out)
      // THE IMMEDIATE DEPOSIT — the edge deposits too: the agent's first hosted call already contributes.
      const dep = depositCoins(String(name), g.gate.receipt)
      // ONE row for verdict + deposit (the edge is stateless, so there is no session receipt to chain) — the same
      // ledgerLine both surfaces share, so the envelope cannot drift between them.
      return rpc(id, {
        content: [{ type: 'text', text: typeof g.output === 'string' ? g.output : JSON.stringify(g.output) }, { type: 'text', text: ledgerLine(g.gate, dep) }],
        _meta: { gate: g.gate, deposit: dep },
        ...(g.gate.clean ? {} : { isError: true }),
      })
    } catch (e) {
      return rpc(id, { content: [{ type: 'text', text: 'error: ' + String((e as Error)?.message ?? e) }], isError: true })
    }
  }
  return rpcErr(id, -32601, 'method not found: ' + String(method))
}

/** The absences this edge DECLARES, for the finder that holds them honest. A name here is a tool the catalogue has
 *  and the edge does not — and it may only ever leave this list. */
export const edgeAbsentNames = (): string[] =>
  // a name the edge SERVES with its own pure implementation is not an absence, whatever the stdio version reaches
  // for — this distinction was caught by the finder below on its first run, which is what a finder is for.
  Object.keys(EDGE_ABSENT).filter((n) => !TOOLS.some((t) => t.name === n))

/** The tool names the hosted endpoint serves — for a GET /mcp discovery page. */
export const mcpHttpToolNames = (): string[] => SERVED.map((t) => t.name)
export const MCP_HTTP_PROTOCOL = PROTOCOL_VERSION
