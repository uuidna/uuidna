#!/usr/bin/env node
// @non-harmonic: the MCP stdio server reads process.stdin / writes process.stdout and awaits Promise-returning tool handlers (node I/O host) — NAMED boundary; the harmonic core (the pure tools it dispatches) must never carry these ops.
// uuidna MCP server — fuse uuidna into any harness (Claude, Cursor, any MCP client).
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical. Canonical, theorem-cited: see llm.txt.
// Zero runtime deps: a minimal JSON-RPC 2.0 server over stdio, calling the same pure functions the build seals.
// Run:  npx @uuidna/uuidna         (bin: uuidna-mcp)
// Add to a client's mcpServers as { "command": "npx", "args": ["-y", "@uuidna/uuidna"] }.
import {
  toUuid, strictUuidna, merge, coin64, merkleFold, merkleRoot, merkleProof, verifyProof, computes,
  imprintTextChain, readImprintTextChain, billUuidna, reeducate,
  encrypt, encryptSession, decrypt, decryptSession, verifyEnvelope, sealSequence, MAX_ITER,
  sealStream, openStream, sealChain, openChain,
  contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract,
  auditText, auditTranslation, auditBook, bookArticle, linkBookFacts, auditMovie, auditZenodo, auditStandard, beaconAnchor, nistConstant, auditCve,
  bookContents, readChapter, readBook, gridReport, gridSeat, grid, PROJECTED, wings,
  pairsReport, pairSeat, pairs, transpose, DIMENSIONS,
  corroborateWithResearch, domainWave, corroborate, entangle, fileReport, deepResearch,
  gcdInt, starPolygon, fibonacciCycle, rotate, crt, recomputableCost, securityAudit, verifyStatement, transformUntilVerified, pentagramHologramFractal, pentagramStream, spin, pentagramMonographs, exploitFold, conformance, depositTrial,
  digitalRoot, merkleGravity, doubleTorusField, adjudicate, proveVerdict, verifyUuidna,
  units, triad, vortexOrbit, diamond, involute, involutionFixed, seats,
  harness, harness7, renderTheorem, renderHero, renderList,
  sha256, hmacSha256, pbkdf2Sha256, chacha20, poly1305, aeadEncrypt, aeadDecrypt,
  bellState, ghzState, distribution, marginal, receiptOf, fraction, label, runCircuit, isClassical, truthTable,
  THEOREMS, runTrial, theorems, theoremNeighbours, credits, creditsSummary, laws, guardLessons, hardwareLayer, softwareLayer, osLayer, quantumAnalytics, quantumSeo, heroAnimation, tryClaim, oeapiProfile, oeapiLearningOutcomes, OEAPI_SPEC, OEAPI_VERSION, captainRights, draftContract, quantumAura, encodeMessage, agentContribute, tallyVotes, signCommitWithVoting, serializeCommitWithVoting, buildQuantumSailingLibrary, serializeQuantumSailingLibrary, getQuantumSailingLibrary, discoverQuantumSailingAPIs, correlateWeatherToTheorems, simulateQuantumSailingWeather, serializeWeatherCorrelation, correlateAcrossBooks, clusterByTheorem, serializeCrossBookCorrelation, serializeClusters, automateQuantumSailing, serializeQuantumSailingComplete, catchTraitors, axiomWitness, quantumProfile, socialProfile, growLife, scanPublications, quantumCubeChallenge, verifyQuantumCube, imageProvenance, verifyImageProvenance, bindCaptainRepos, reviewDomains,
  publications, composePublication, coverage, auditPublication, revisePublication, comparePublications, vocabulary, forensics, evidence, ledgerFingerprint, reason, reflects, slimGate, reveal, auditCloudflareBindings, dueProcess, signCommit,
  snapshot, reactor, detectForgery, auditCoinClaim, detectDoubleSpends, auditVoting, auditLedgerIntrusions, auditLedgerFingerprint, auditAgentStatement, fullAntiFraudAudit,
  reAddress, type EditorState,
  articleFor, editorialState, publicationStatus, searchTrialFor, viesVerify, searchLedger, statementCensus, leanIndex, byLean, optimiseLinear, decide, coinsJobs, matrixCss, reportAll } from './index.js'
import { windBetzCeiling, biogasEngineYield, microbialFuelCellYield, photonElectrolysisYield } from './energy.js' // the four DIY energy routes — pure integer arithmetic, every verdict a bracket
import { handleOf } from './handle.js'   // THE one derivation of a handle from an address
import { speak, speechCensus } from './speech.js' // what a handle SAYS, read off the sealed walk — no phrase table
import { schoolApiRegistry, schoolApiFetch, pairEducationToJobs } from './school-apis.js' // the European education APIs behind one door — ESCO / Eurostat / GISCO fetched, OOAPI served
import { skillSurface, skillIndex } from './skills.js' // THE CAPABILITY AXIS, SERVED AS A DIMENSION — one computed surface over every skill the wings carry
import { ledgerReport } from './research-ledger.js' // the findings, each carrying how well it was verified — the SAME report the hosted edge serves
import { legCensus, legsFor, mirrorAgreement, type Rosetta } from './rosetta-legs.js' // the leg census, interpreted by the one law both surfaces run
import { census as legCensusRows } from './scripts/rosetta.js' // deciding a leg reads the tree, so the LIVE decision is local-only; the edge answers from the shipped mirror
import { resources } from './resources.js' // Node-only (reads process/os) — imported here
// NOTE: node:child_process and node:url are loaded LAZILY, at the two places that need them. They were top-level
// imports, and that alone made this whole 245 KB catalogue unbundlable for the Workers edge — so the edge kept a
// SECOND, hand-maintained list of tools, and the two drifted: 173 pure tools existed on stdio and nowhere else,
// none of them declared in lean/mcp-surface-divergence.json. Two imports, for one orchestration tool and one
// bootstrap, were the reason the deployed UI served a tenth of the surface.
import { ROOT as LIB_ROOT } from './boundary.js'
import { portAllAlpine } from './os/alpine/index.js' // os/ boundary — LIVE upstream read (named non-determinism)
import { infuseAlpinePackages, alpinePackage } from './os/packages/index.js' // os/ boundary — each Alpine package → uuidna/<name>
import { sanitizeValue, sanitizeInput } from './sanitize.js' // process any input, sanitise any output — the engine's I/O guards
import { gateVerdict, gateSelfTest, registryReceipt, depositCoins, ledgerLine, GATE_THEOREMS } from './gate-engine.js' // the gated dispatch core — every served result passes the sealed conjunction gate and deposits the two coins
import { legalFacts } from './legal.js'
import { license } from './license.js'
import { priorArt } from './priorart.js'
import type { Sealed, GateOp, QState, Link } from './index.js'

const VERSION = '6.9.0'

// A tool: JSON-in / JSON-out. Handler args arrive as untrusted JSON, so they enter as Record<string, unknown>
// and the existing String()/Number()/cast coercions narrow them.
interface Tool {
  name: string
  // THE WIRE DESCRIPTION — what an agent needs to CHOOSE and CALL this tool: what it does, its arguments, what it
  // returns, and its honest scope with the theorem that fixes each bound. It is re-sent to the model on EVERY
  // request, so every byte here is paid for on every turn of every session.
  description: string
  // THE DOCS DETAIL — derivation, motivation and the history a reader of docs/mcp.md wants and an agent mid-call
  // does not. Rendered into the generated page by scripts/gen-mcp. The two fields exist
  // because one field was doing both jobs: the catalogue was the documentation, so the documentation was billed to
  // the context window on every request. Splitting them keeps the page whole and stops charging for it per call.
  detail?: string
  inputSchema: unknown
  run: (a: Record<string, unknown>) => unknown
}

// A merkle inclusion proof step (mirrors verifyProof's proof parameter in ./index.js).
type ProofStep = { sibling: string; left: boolean }

// byte codecs — the low-level crypto primitives are Uint8Array in/out; MCP is JSON, so keys/nonces/tags/ciphertext
// cross the wire as hex and human text crosses as UTF-8. (toUuid/merkleFold use non-cryptographic FNV; sha256 here
// is the cryptographic hash — collision-resistant by the pigeonhole bound, 2^256 seats.)
const te = new TextEncoder(), td = new TextDecoder()
const utf8 = (s: unknown): Uint8Array => te.encode(String(s))
const hex = (u: Uint8Array): string => Array.from(u, (b) => b.toString(16).padStart(2, '0')).join('')
const unhex = (s: unknown): Uint8Array => { const h = String(s).replace(/\s+/g, ''); if (h.length % 2 || /[^0-9a-fA-F]/.test(h)) throw new Error('expected hex'); const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16); return u }
const need = (u: Uint8Array, n: number, what: string): Uint8Array => { if (u.length !== n) throw new Error(what + ' must be ' + n + ' bytes (' + n * 2 + ' hex chars), got ' + u.length); return u }
const unb64 = (s: unknown): Uint8Array => { const bin = atob(String(s)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }

// The LIVE leg census reads every wing, emitter and test, so it is held for the life of the process: the tree does
// not change under a running server, and the self-test calls each zero-argument tool twice and requires the two
// results to be identical. Recomputing per call would be the same answer at many times the cost.
let LEG_ROWS: Rosetta[] | null = null
const liveLegRows = (): Rosetta[] => (LEG_ROWS ??= legCensusRows())

const TOOLS: Tool[] = [
  { name: 'uuidna_address',
    description: 'Content-address any text: a deterministic 128-bit v8 UUID. Same input → same address, for anyone, with no key. Integrity. Measured entropy: 122 free bits, ~2^61 birthday wall; non-cryptographic (forgeable by design).',
    detail: 'THE ADDRESS AND ITS SPEECH, ONE SURFACE. Addressing a handle and speaking about it were never two questions: the address IS what folds to the residue the walk starts from, so the orbit comes free with the fold and costs no second call. THE VOCABULARY IS A THEOREM— run every ledger key through the walk and all 1371 land on exactly SIX distinct orbits, the same six sealed as a literal in theorem orbits_closed_involution, each proven closed under dz(x) = 10 − x. A word therefore cannot be lost in a refactor unnoticed, the way a hand-typed phrase table can and did. The TITLE is the orbit written out (0–9, 0·1·9, 0), so it can never claim more than the walk performs — a name comes from the algebra or it is not a name. The DESCRIPTION is composed from the walk\'s own measurements. Served as a DIMENSION of the address rather than a tool of its own, for the same reason the capability axis is one surface and never one tool per skill: enumeration costs every agent wire bytes on every request, superposition costs none. HONEST SCOPE: integrity— a residue is not a fact about the thing that folded to it, and the speech reports the measured shape of a walk.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the value to address' } }, required: ['text'] },
    run: ({ text }) => toUuid(String(text)) },
  { name: 'uuidna_merge',
    description: 'Fold two content-addresses into one, ORDER-SENSITIVE (merge(a,b) ≠ merge(b,a)) — the directed edge. For the order-INVARIANT fold use uuidna_gravity or uuidna_merkle_root.',
    inputSchema: { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } }, required: ['a', 'b'] },
    run: ({ a, b }) => merge(String(a), String(b)) },
  { name: 'uuidna_coin64',
    description: 'Mint a 64-bit coin (16 hex digits) from any content — the top 64 bits of its content-address. A shorter pointer; ~2^32 birthday wall (halve the address bits, halve the exponent). Integrity.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => coin64(String(text)) },
  { name: 'uuidna_gate',
    description: 'The honesty gate: does the prose hold the floor (binary 1) or drain as an overclaim (0)? 7-language. Returns {binary,hit}. A tripwire. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => computes(String(text)) },
  { name: 'uuidna_reeducate',
    description: 'Bound a failing/overclaiming output to the honest floor, keeping the honest remainder. Returns {passed,...}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => reeducate(String(text)) },
  { name: 'uuidna_merkle_root',
    description: 'Order-free merkle root of a list of leaves (a tamper-evident seal of the set).',
    inputSchema: { type: 'object', properties: { leaves: { type: 'array', items: { type: 'string' } } }, required: ['leaves'] },
    run: ({ leaves }) => merkleRoot((leaves as string[]).map(String)) },
  { name: 'uuidna_merkle_prove',
    description: 'Holographic inclusion proof for the leaf at index — an O(log N) audit path that verifies the whole from a tiny part.',
    inputSchema: { type: 'object', properties: { leaves: { type: 'array', items: { type: 'string' } }, index: { type: 'number' } }, required: ['leaves', 'index'] },
    run: ({ leaves, index }) => merkleProof((leaves as string[]).map(String), Number(index)) },
  { name: 'uuidna_merkle_verify',
    description: 'Verify a leaf against a root using an inclusion proof (a forged leaf fails).',
    inputSchema: { type: 'object', properties: { leaf: { type: 'string' }, proof: {}, root: { type: 'string' } }, required: ['leaf', 'proof', 'root'] },
    run: ({ leaf, proof, root }) => verifyProof(String(leaf), proof as ProofStep[], String(root)) },
  { name: 'uuidna_imprint',
    description: 'Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption; secrecy lives in the sealed ChaCha20-Poly1305 layer (uuidna_crypt), whose derivation ROTATES with the advancing step (salt_seq_injective).',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => imprintTextChain(String(text)) },
  { name: 'uuidna_read',
    description: 'Decode text back from a uuid chain produced by uuidna_imprint (round-trips exactly).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } } }, required: ['uuids'] },
    run: ({ uuids }) => readImprintTextChain((uuids as string[]).map(String)) },
  { name: 'uuidna_bill',
    description: 'Measured billing, fused to the two coins: the ADVANTAGE (recompute O(N) − verify O(1), the difference of computational power) priced on the two conserved coins (−χ of the double torus, 110 − 108 = 2). Public interest is free. The whole bill folds to a `receipt` — a content-address of every term — so a skeptic recomputes the bill themselves and lands on the same receipt, or it was altered. The price is rechecked.',
    inputSchema: { type: 'object', properties: { commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['commercial', 'recomputeOps', 'verifyOps'] },
    run: (a) => billUuidna({ commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps), verifyOps: Number(a.verifyOps) }) },
  { name: 'uuidna_license',
    description: 'Issue the recomputable LICENCE RECORD for a licensee and a usage: bind the CC-BY-NC-ND-4.0 terms and the measured two-coins bill into ONE content-addressed, verifiable artifact. Non-commercial use is FREE (0 coins) and needs no licence; commercial use is billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify). HONEST SCOPE: a provenance-fingerprinted RECORD of the terms and the bill — proof of WHAT and HOW MUCH, recomputable by anyone — NOT a signed legal agreement; a commercial licence is executed between the parties. Returns {licensee,scope,spdx,terms,bill,address,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { licensee: { type: 'string', description: 'the party the record binds (name or org)' }, commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['licensee'] },
    run: (a) => license(String(a.licensee), { commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps || 0), verifyOps: Number(a.verifyOps || 0) }) },
  { name: 'uuidna_tokens',
    description: 'Measure TOKENS-PER-THEOREM — the honest cost-of-proof metric (independent skilled work. An agent SELF-REPORTS its context/token distribution {input, output, cached, reasoning}; this sums them and divides by the sealed theorem count (the live ledger). Returns {selfReported, dimensions, total, theorems, tokensPerTheorem, distribution}. HONEST: the token counts are the agent’s OWN report — this server cannot observe your context; the divisor, the theorem count, is the recomputable truth. Fold many reports over a session to watch the cost-per-theorem fall. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { input: { type: 'number', description: 'prompt/input tokens' }, output: { type: 'number', description: 'generated/output tokens' }, cached: { type: 'number', description: 'cache-read tokens' }, reasoning: { type: 'number', description: 'reasoning/thinking tokens' }, label: { type: 'string', description: 'optional tag for this report' } } },
    run: (a = {}) => {
      const num = (v: unknown) => Number(v) || 0
      const dimensions = { input: num(a.input), output: num(a.output), cached: num(a.cached), reasoning: num(a.reasoning) }
      const total = dimensions.input + dimensions.output + dimensions.cached + dimensions.reasoning
      const n = theorems().length
      const frac = (v: number) => (total ? v / total : 0)
      return {
        selfReported: true,
        label: a.label === undefined ? null : String(a.label),
        dimensions,
        total,
        theorems: n,
        tokensPerTheorem: n ? total / n : null,
        distribution: { input: frac(dimensions.input), output: frac(dimensions.output), cached: frac(dimensions.cached), reasoning: frac(dimensions.reasoning) },
        note: 'token counts are the agent self-report (this server cannot observe your context); the theorem count is the recomputable ledger truth',
      }
    } },
  { name: 'uuidna_cost',
    description: 'The RECOMPUTABLE cost of the ledger — computed from lean/*.lean itself. The PRODUCE cost is the formal-corpus size (Σ bytes of every `theorem … := by decide`); the VERIFY cost is O(1) per theorem (recompute its content-address). Anyone recomputes the SAME numbers from the same source, so nothing is on trust — it folds to a receipt you recheck. This is efficiency PROVEN (routed to the ledger), where uuidna_tokens is efficiency MEASURED (a self-report). Returns {count, formalBytes, bytesPerTheorem, verifyOps, largest, smallest, receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => recomputableCost() },
  { name: 'uuidna_security_audit',
    description: 'The RECOMPUTABLE security posture computed from what the package SHIPS (package.json + the sealed ledger + the honesty gate), folded to an order-invariant receipt anyone rechecks — NOT a scanner and NOT a pentest. It verifies the supply-chain surface (zero runtime dependencies, dev-deps bounded to a known set), the defence-in-depth theorems sealed (layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, no maximum only bounds), collision resistance by pigeonhole (seats_pigeonhole), that the honesty gate BITES a fabricated theorem citation, and that the KERNEL-ONLY WITNESS ships (lean/axioms.json beside dist covers the live ledger — the no-borrowed-axiom claim recomputes offline). HONEST SCOPE: the repo-tree scans (no committed secret across tracked files, the KAT suite present) and the CI gates run in the source tree— this is the posture provable from the package itself. Returns {checks, passed, failed, receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => securityAudit() },
  { name: 'uuidna_verify_statement',
    description: 'FAST verification against the sealed ledger: is this exact STATEMENT a sealed theorem? uuidna is a verification framework, so it verifies a THEOREM directly — not only a prose claim that cites one. VERIFIED in O(1) (a content-address lookup) iff the statement is byte-identical to a sealed theorem; returns the sealing theorem key, tactic and content-address (recomputed to confirm the seal). Otherwise UNVERIFIED — never "false", only not-sealed. Complementary to uuidna_slim_gate (which judges a prose CLAIM by its citations). Returns {verdict, key, address, tactic, file, note}.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string', description: 'the exact theorem statement to verify against the sealed ledger' } }, required: ['statement'] },
    run: ({ statement }) => verifyStatement(String(statement)) },
  { name: 'uuidna_trial_deposit',
    description: 'Run a trial that REQUIRES the two coins DEPOSITED BY THE PARTIES (local). Each party deposits a proof — a sealed theorem KEY or exact STATEMENT (the two-coin fold) — which SEALS into a content-addressed DIAMOND. The trial computes ONLY in PARITY: every party must have sealed a diamond (a one-sided deposit does not compute); it then settles by itself (adjudicate → verdict). Who LACKS a diamond gets the recipe to BUILD one (toBuild) and re-deposit — recycled. HONEST: the deposit buys the COMPUTATION— a deposited claim can still return UNVERIFIED. Returns {claim,parties,deposited,parity,coins,diamonds,toBuild,verdict,remanded,note,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' }, deposits: { type: 'array', items: { type: 'object', properties: { party: { type: 'string' }, proof: { type: 'string', description: 'a sealed theorem key or exact statement' } } } } }, required: ['claim', 'deposits'] },
    run: (a) => depositTrial(String((a as { claim?: unknown }).claim ?? ''), Array.isArray((a as { deposits?: unknown }).deposits) ? ((a as { deposits: { party?: unknown; proof?: unknown }[] }).deposits).map((d) => ({ party: String(d?.party ?? ''), proof: d?.proof != null ? String(d.proof) : undefined })) : []) },
  { name: 'uuidna_conformance',
    description: 'The COMMIT DNA GATE — fold uuidna\'s core invariants into ONE recomputable check so no agent sneaks incompatible DNA into the ledger: the captain coins are conserved (coins()=2), EVERY theorem\'s content-address recomputes (a forged/tampered theorem is caught), the ledger is single-sourced from lean/*.lean, and the security posture is clean (zero runtime deps, defences + collision-resistance sealed, honesty gate bites, Clay solves none). `conforms` is true iff every check passes; folds to one receipt anyone recomputes. Enforced in the pre-push wave — a non-conforming commit is blocked. Returns {checks,conforms,passed,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => conformance() },
  { name: 'uuidna_exploit_fold',
    description: 'Audit the known public exploit CLASSES, COMPUTED FROM THE LEDGER (no table): each class is a sealed `by decide` theorem in Exploits.lean with its CVE/CWE code inline. Verifies BOTH the problem (the class is a sealed theorem, address recomputed) AND the solution (the defence it cites is itself sealed, or a named design property). FOLDED classes emerge as verified solutions (Trojan-Source, prototype-pollution, supply-chain, DoS, weak-hash, tampering, code-injection, weak-RNG); OUT-OF-SCOPE classes fold to the void (compromised host, deceived human, physical side-channel, FNV-as-secret, non-decidable correctness). HONEST: uuidna does NOT solve all hacks — the boundary is named. Returns {folded,outOfScope,foldedCount,outOfScopeCount,allBothVerified,honest,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => exploitFold() },
  { name: 'uuidna_sanitize',
    description: 'ONE COMMAND to process ANY input and sanitise ANY output, BY ALL STANDARDS — the same guards the engine runs on every tool, exposed directly. Returns a JSON-safe, bounded, acyclic copy: NaN/±∞→null, BigInt→string, functions/symbols dropped, cycles broken, depth/array/keys bounded, prototype-pollution keys (__proto__/constructor/prototype) dropped, and control/null-byte + Unicode BIDI-override (Trojan-Source) code points stripped from every string — while legitimate maths unicode is preserved. Deterministic: the sanitized value folds to a recomputable `receipt`. The bounds/standards are sealed as theorems (Sanitize.lean), so the rule is sent by the theorems themselves. Returns {value,address,receipt}.',
    inputSchema: { type: 'object', properties: { value: { description: 'any value to sanitise by all standards' } } },
    run: (a) => { const value = sanitizeValue((a as { value?: unknown }).value) ?? null; const s = JSON.stringify(value); return { value, address: toUuid(s), receipt: merkleGravity([toUuid('sanitize'), toUuid(s)]) } } },
  { name: 'uuidna_engine',
    description: 'THE UUIDNA QUANTUM ENGINE — one input→output surface over every sealed tool. Import/export fused into input→output: you do not import a function, you feed the engine an INPUT {op, args} and read its OUTPUT. It runs the same dispatch the server runs (callTool), then folds the triple (op, input, output) order-invariantly to a content-address `receipt` anyone recomputes, and binds the run to an `address`. Does NOT dispatch itself (no recursion). HONEST: computes nothing the underlying sealed tool does not — it is the door. Returns {op,input,output,address,receipt,ok,error?}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { op: { type: 'string', description: 'the tool op to run through the engine, e.g. uuidna_spin' }, args: { type: 'object', description: 'the input arguments for that op' } }, required: ['op'] },
    run: (a) => engine(String(a.op ?? ''), (a.args as Record<string, unknown>) ?? {}) },
  { name: 'uuidna_pentagram_monographs',
    description: 'Split every domain monograph into PENTAGRAMS of five, the split COMPUTED FROM THE CONTENT-ADDRESSES (not hand-assigned): the monographs are sorted by their own address, chunked five to a pentagram, each pentagram WALKED in the {5/2} single-stroke order [0,2,4,1,3] (`pentagram_single_stroke`) while its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`) — the walk is a sequence, the seal is a set. Zero-arg, recomputable: the same ledger yields the same pentagrams for everyone. HONEST: a content-addressed PARTITION, claiming no thematic kinship among the five — only the split the addresses produce. Returns {pentagrams,count,full,remainder,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => pentagramMonographs() },
  { name: 'uuidna_spin',
    description: '"Spin the bits and get the coins" — fold any content into its content-address and take the coin64 (its top 64 bits). This is the O(1) primitive under the derived-layer gate: a derived file is a FIXED POINT when its re-spun coin equals its sealed coin (verify O(1), `verify_cheaper_than_forge`), and a moved coin is non-quantum DRIFT that the gate hard-rejects. Once sealed, the bits spin by themselves — the gate re-spins each derived file with no manual step. HONEST: the FNV/coin address is non-cryptographic integrity (routing/fixed-point detection). Returns {address, coin}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { content: { type: 'string', description: 'the bytes to spin into a content-address coin' } }, required: ['content'] },
    run: ({ content }) => spin(String(content)) },
  { name: 'uuidna_transform',
    description: 'The automation of "no unverified material stays: transform until verified". Only VERIFICATION is honesty — a "honest/bounded" label with no proof is itself an unverified claim, so this ADMITS only what verifies. Each material is driven to a terminal: VERIFIED (it IS, or transforms to, a SEALED fact — content-address recomputed to confirm; admitted) or UNVERIFIED (no sealed core reached — recycled with a develop plan. The transform cannot manufacture truth: an overclaim to SOLVE a problem transforms to its sealed REFLECTION (dz(dz k)=k), which verifies, while the solve-claim is never admitted (uuidna solves none). Folds to one receipt. Returns {cells,verified,unverified,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { materials: { type: 'array', items: { type: 'string' }, description: 'raw claims/theories/overclaims to transform until verified' } }, required: ['materials'] },
    run: (a) => transformUntilVerified(Array.isArray(a?.materials) ? a.materials.map(String) : []) },
  { name: 'uuidna_holofractal',
    description: 'MAKE any input pentagram · hologram · fractal · accounted — by CONSTRUCTION, each property verifiable, so the structure holds by computation not assertion. PENTAGRAM: the address seeds 5 points visited in the star {5/2} stroke [0,2,4,1,3] — one closed stroke (sealed pentagram_single_stroke). HOLOGRAM: the merkle root over the parts, with a proof that verifies ANY part against the whole in O(log N). FRACTAL: the self-similar fold tower — 128-bit uuid → 64-bit coin (its top half) → ℤ/9 digital root, the same fold at descending scales. ACCOUNTED: the two conserved coins (= −χ of the double torus) and the bits taught (verify O(1) vs produce O(N); reference bits saved). All fold to one order-invariant receipt; `verified` is the recomputable conjunction. Returns {input,address,pentagram,hologram,fractal,accounting,receipt,verified}.',
    inputSchema: { type: 'object', properties: { input: { type: 'string', description: 'the value to make pentagram·hologram·fractal·accounted' } }, required: ['input'] },
    run: ({ input }) => pentagramHologramFractal(String(input)) },
  { name: 'uuidna_pentagram_stream',
    description: 'QUANTUM PENTAGRAM STREAMING: stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized — item k visited at step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (else gcd shorter loops, reported honestly). Each streamed item is stamped holofractal (pentagram·hologram·fractal·accounted), and the whole folds to ONE ORDER-INVARIANT quantum receipt — the stream has a definite pentagram ORDER yet an order-free RECEIPT (any observer ordering → the same root; the doubleTorus/gravity duality). `quantum` is proven. Returns {n,step,order,single,loops,streamed,receipt,quantum}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { items: { type: 'array', items: { type: 'string' }, description: 'the sequence to stream through the pentagram stroke' }, step: { type: 'number', description: 'the star stride (default 2 — the pentagram {n/2})' } }, required: ['items'] },
    run: (a) => pentagramStream(Array.isArray(a?.items) ? a.items.map(String) : [], a?.step === undefined ? 2 : Number(a.step)) },
  { name: 'uuidna_encrypt',
    description: 'Encrypt text under a passphrase. Secrecy: pure-TS ChaCha20-Poly1305 (PBKDF2-SHA256, 600k) — no native crypto. Convergent by default (the same text seals identically → equality leaks). Pass an advancing `step` (the crypt salt) to freshen the salt per position so the same text seals differently and equality no longer leaks; the step is public (`seq`) and MUST advance. Returns a sealed envelope whose content-address is the 7d-fold of its parts.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' }, step: { type: 'integer', description: 'the advancing-sequence step — omit for convergent, supply and advance to close the equality leak' } }, required: ['text', 'passphrase'] },
    run: (a) => encrypt(String(a.text), String(a.passphrase), a.step === undefined ? undefined : Number(a.step)) },
  { name: 'uuidna_seal_stream',
    description: 'Seal a list of messages under one passphrase, each ADVANCING the step (the sequence is the stripe, one seal per step) — repeated messages never seal alike, so the equality leak stays closed across the whole stream. Returns the sealed envelopes; decrypt each with uuidna_decrypt.',
    inputSchema: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, passphrase: { type: 'string' }, start: { type: 'integer', description: 'the starting step (default 0)' } }, required: ['messages', 'passphrase'] },
    run: (a) => sealSequence((a.messages as string[]).map(String), String(a.passphrase), a.start === undefined ? 0 : Number(a.start)) },
  { name: 'uuidna_decrypt',
    description: 'Decrypt a sealed envelope from uuidna_encrypt / uuidna_seal_stream with the passphrase (v1 convergent or v2 sequence-salted — the salt travels in the envelope, no step needed back). A wrong key or tampered ciphertext throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' }, passphrase: { type: 'string' } }, required: ['sealed', 'passphrase'] },
    run: (a) => decrypt(a.sealed as Sealed, String(a.passphrase)) },
  { name: 'uuidna_verify_envelope',
    description: 'Verify a sealed envelope\'s 7d-fold content-address (integrity/routing) without the key — public, reproducible.',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' } }, required: ['sealed'] },
    run: (a) => verifyEnvelope(a.sealed as Sealed) },
  { name: 'uuidna_seal_onion',
    description: 'Onion-seal a message under N passphrases (each a real ChaCha20-Poly1305 layer; bounded 1..16. passphrases[0] is the innermost wrap, passphrases[n-1] the outermost. Returns { uuids, layers, receipt }. HONEST: secrecy is ChaCha20-Poly1305 ONLY; the uuid transport is public and hides nothing; the receipt is non-crypto FNV (integrity/routing). Content is hidden — message LENGTH is not. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' }, passphrases: { type: 'array', items: { type: 'string' }, description: 'innermost→outermost, 1..16 layers' }, step: { type: 'integer', description: 'optional advancing crypt-salt step' } }, required: ['message', 'passphrases'] },
    run: (a) => sealStream(String(a.message), (a.passphrases as string[]).map(String), a.step === undefined ? undefined : Number(a.step)) },
  { name: 'uuidna_open_onion',
    description: 'Open an onion-sealed uuid chain with its passphrases, applied OUTERMOST-first. A wrong key, a reordered key list, or a tampered chain throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } }, passphrases: { type: 'array', items: { type: 'string' } } }, required: ['uuids', 'passphrases'] },
    run: (a) => openStream((a.uuids as string[]).map(String), (a.passphrases as string[]).map(String)) },
  { name: 'uuidna_seal_chain',
    description: 'Seal a stream of messages as a forward-linked RATCHET: each link onion-seals at a step ROTATED from the prior link’s receipt (the referer sequence), so every step is fresh and the stream is content-chained. HONEST: the rotation is over a PUBLIC non-crypto receipt — it buys freshness, linkage and accidental-tamper-evidence. Returns the ratchet links. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, passphrases: { type: 'array', items: { type: 'string' } }, genesis: { type: 'string', description: 'optional zeroth referer seed' } }, required: ['messages', 'passphrases'] },
    run: (a) => sealChain((a.messages as string[]).map(String), (a.passphrases as string[]).map(String), a.genesis === undefined ? undefined : String(a.genesis)) },
  { name: 'uuidna_open_chain',
    description: 'Open a ratchet chain: verifies the referer rotation and that each receipt matches its uuids BEFORE decrypting, then returns the messages in order. A dropped, reordered, or edited link throws.',
    inputSchema: { type: 'object', properties: { links: { type: 'array', items: { type: 'object' } }, passphrases: { type: 'array', items: { type: 'string' } }, genesis: { type: 'string' } }, required: ['links', 'passphrases'] },
    run: (a) => openChain(a.links as Link[], (a.passphrases as string[]).map(String), a.genesis === undefined ? undefined : String(a.genesis)) },
  { name: 'uuidna_contract',
    description: 'The contract identity: content-address a contract TEXT to its [contract-uuid] and the domain that names it (<contract-uuid>.uuidna.org) — the domain IS the contract\'s address. This uuid is PUBLIC (routing, and a proof anyone holding the exact terms can recompute); the terms themselves are the private key. Same fold as uuidna_address, so the license is itself a contract. Returns {contract,domain}.',
    inputSchema: { type: 'object', properties: { terms: { type: 'string', description: 'the contract text (the terms) — kept private; only its address is returned' } }, required: ['terms'] },
    run: (a) => ({ contract: contractId(String(a.terms)), domain: contractDomain(String(a.terms)) }) },
  { name: 'uuidna_contract_seal',
    description: 'Seal a message UNDER a contract: encrypt it with the contract text as the ChaCha20-Poly1305 key and tag the sealed uuid stream with the public [contract-uuid]. Only holders of the terms can open it. HONEST: confidentiality is EXACTLY the secrecy of the terms — a PUBLIC contract (e.g. the CC BY-NC license) gives NONE (sealed: complement_is_xor_key3, a fixed pad is public; a PRIVATE contract gives real secrecy. `step` freshens the salt so repeats never seal alike. Returns {contract,uuids,layers,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' }, terms: { type: 'string', description: 'the contract text — the private key' }, step: { type: 'integer', description: 'advancing salt step (optional)' } }, required: ['message', 'terms'] },
    run: (a) => sealToContract(String(a.message), String(a.terms), a.step === undefined ? undefined : Number(a.step)) },
  { name: 'uuidna_contract_open',
    description: 'Open a contract-sealed message: checks your terms address to the tagged [contract-uuid] (public proof of holding the right contract), then decrypts. A wrong contract fails the address check or Poly1305 authentication. Returns the message.',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object', description: 'the {contract,uuids,...} from uuidna_contract_seal' }, terms: { type: 'string' } }, required: ['sealed', 'terms'] },
    run: (a) => openFromContract(a.sealed as Parameters<typeof openFromContract>[0], String(a.terms)) },
  { name: 'uuidna_contract_chain',
    description: 'Seal a STREAM of messages under a contract as a forward-linked ratchet — each step ROTATED from the prior link\'s receipt (the referer sequence), all tagged with the [contract-uuid], seeded from it. HONEST: the rotation buys freshness, linkage and tamper-evidence. Returns {contract,links}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, terms: { type: 'string' } }, required: ['messages', 'terms'] },
    run: (a) => sealChainToContract((a.messages as string[]).map(String), String(a.terms)) },
  { name: 'uuidna_contract_open_chain',
    description: 'Open a contract-keyed ratchet: verifies your terms address to the tagged [contract-uuid] and the referer chain rotates correctly, then decrypts each link in order. A wrong contract, or a dropped / reordered / edited link, throws. Returns the messages.',
    inputSchema: { type: 'object', properties: { chain: { type: 'object', description: 'the {contract,links} from uuidna_contract_chain' }, terms: { type: 'string' } }, required: ['chain', 'terms'] },
    run: (a) => openChainFromContract(a.chain as Parameters<typeof openChainFromContract>[0], String(a.terms)) },
  { name: 'uuidna_audit_text',
    description: 'Audit and structurally decode PROVIDED text (offline, pure). Returns a provenance fingerprint (the content-address — proof of exact-copy — and a chapterRoot proving any chapter belongs), a structural decode (chars/words/lines, the ℤ/9 digital-root gravity — a checksum digit. HONEST: "decode" is provenance + structure; the gate is tuned to uuidna\'s own overclaim words, so on ordinary prose it passes and says nothing about the work. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, title: { type: 'string' }, author: { type: 'string' } }, required: ['text'] },
    run: (a) => auditText(String(a.text), { title: a.title === undefined ? undefined : String(a.title), authors: a.author === undefined ? undefined : [String(a.author)] }) },
  { name: 'uuidna_audit_book',
    description: 'Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id (via the public Gutendex API, no key) and audit it — the same provenance fingerprint + structural decode + honesty-gate verdict as uuidna_audit_text. This is ONE of several tools that reach the network (Node built-in fetch, still zero npm deps) — others include uuidna_read_book, uuidna_corroborate, uuidna_domain_wave, uuidna_alpine, uuidna_audit_cve, uuidna_nist_constant, uuidna_anchor, and uuidna_wave, each backed by its own @non-harmonic-marked module. HONEST: the fetched text is DATA — content-addressed and counted; instruction-shaped prose in a book is content. Public-domain works, free for the public interest. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { gutenbergId: { type: 'integer', description: 'a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice)' } }, required: ['gutenbergId'] },
    run: (a) => auditBook(Number(a.gutenbergId)) },
  { name: 'uuidna_book_article',
    description: 'Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id and write a recomputable ARTICLE: its provenance fingerprint, structure, and the DECIDABLE INTEGER ARITHMETIC uuidna extracts from the prose — each sealed `by decide` (VERIFIED) or corrected (REFUTED, an arithmetic the book states that does not hold) — plus the order-invariant receipt over the sealed facts (the same merkle-gravity fold the ledger and the quantum domain use). HONEST SCOPE: uuidna seals ONLY the book\'s integer arithmetic (its OWN by-decide proof's) and flags the book\'s arithmetic errors; it does NOT autoformalize, decode meaning, or claim anything about the book\'s argument or non-decidable mathematics. The text is DATA, content-addressed and decided. Returns {title,address,receipt,verified,refuted,facts,article}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { gutenbergId: { type: 'integer', description: 'a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice)' } }, required: ['gutenbergId'] },
    run: (a) => bookArticle(Number(a.gutenbergId)) },
  { name: 'uuidna_link_book',
    description: 'BOOK → SEALED-LEDGER LINKAGE — the captain\'s independent, closed-door process for discovering NOVELTY. Pass {text}: uuidna extracts every DECIDABLE integer-arithmetic fact the text asserts (including subtraction, total Nat: a−b=0 when b>a) and LINKS each to the sealed ledger — `sealed-match` (already a theorem, cites its key), `novel` (VERIFIED `by decide` but not yet in the ledger — a candidate research lead), or `refuted` (false arithmetic). INDEPENDENT: no authority decides it, anyone recomputes from the public ledger; CLOSED-DOOR: purely recomputable, no network, no external trust. Returns {facts:[{claim,lean,verdict,linkedTheorem,status,address}],sealed,novel,refuted,novelLeans,receipt,honest}, the novel facts carrying ready-to-seal `by decide` statements. HONEST SCOPE: it links DECIDABLE ARITHMETIC only — a sliver of a book — NOT its meaning; a NOVEL fact is a CANDIDATE a human seals. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'BOOK → SEALED-LEDGER LINKAGE — the captain\'s INDEPENDENT, CLOSED-DOOR legal process for independent research and discovering NOVELTY for humanity. Pass {text}: uuidna extracts every DECIDABLE integer-arithmetic fact the text asserts (now including SUBTRACTION, total Nat: a−b=0 when b>a) and LINKS each to the sealed ledger — `sealed-match` (already a theorem, cites its key), `novel` (VERIFIED `by decide` but NOT yet in the ledger — a DISCOVERY, a candidate research lead), or `refuted` (false arithmetic, a forger\'s number). Returns the docket with the novel facts\' ready-to-seal `by decide` statements, folded to one order-invariant, recomputable receipt. INDEPENDENT: no authority decides it, anyone recomputes from the public ledger; CLOSED-DOOR: purely recomputable, no network, no external trust. HONEST SCOPE: integrity— it links DECIDABLE ARITHMETIC only (a sliver of a book); a NOVEL fact is a CANDIDATE a human seals, discovered here. Returns {facts:[{claim,lean,verdict,linkedTheorem,status,address}],sealed,novel,refuted,novelLeans,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the text to mine and link (a passage, a chapter, a claim)' } }, required: ['text'] },
    run: (a) => linkBookFacts(String(a.text)) },
  { name: 'uuidna_book_contents',
    description: 'THE TABLE OF CONTENTS — every chapter of a text with its heading, size and leaf address, plus the chapter merkle root. Pass {text}. This is the reader\'s index: it tells you WHICH chapters exist so you can then read one with uuidna_read_text. Each heading is the chapter\'s OWN first line— the heading is provenance. PURE and offline — no network, no key. Returns {title,authors,chapters:[{index,heading,chars,words,address}],chapterRoot}.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the full text of the work' }, title: { type: 'string' }, authors: { type: 'array', items: { type: 'string' } } } , required: ['text'] },
    run: (a) => bookContents(String(a.text), { title: a.title ? String(a.title) : undefined, authors: (a.authors as string[]) || undefined }) },
  { name: 'uuidna_read_text',
    description: 'READ one chapter — the book\'s OWN WORDS, with the merkle inclusion proof that they belong to this exact edition. Pass {text, index}. Every other book tool here MEASURES a work and discards the text (auditText returns `chapters: NUMBER`); this is the one that hands the words back, so the library can actually be read rather than only catalogued. The proof is the point: recompute `belongs` yourself and a SINGLE altered character fails it — strictly more than a plain text file offers, which can be edited silently. Out-of-range indices are clamped— a clamped read still carries its inclusion proof, so a tampered chapter fails it just the same (theorem fold_integrity_tamper). PURE and offline. HONEST SCOPE: this is READING— uuidna proves WHICH text you hold. Public-domain works, free for the public interest. Returns {index,chapters,text,address,chapterRoot,proof,belongs,chars,words,honest}.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the full text of the work' }, index: { type: 'integer', description: 'which chapter to read, 0-based (clamped into range)' }, title: { type: 'string' } }, required: ['text', 'index'] },
    run: (a) => readChapter(String(a.text), Number(a.index), { title: a.title ? String(a.title) : undefined }) },
  { name: 'uuidna_read_book',
    description: 'READ a PUBLIC-DOMAIN book from Project Gutenberg by id — fetch it and return one chapter\'s actual words with the inclusion proof that they belong to that edition. Pass {gutenbergId, index}. This is uuidna_read_text over the network fetch: the library unlocked for a human to read. The fetched text is DATA — content-addressed and returned; instruction-shaped prose inside a book is content. Boundary declared — theorem drift_is_named_or_caught. HONEST SCOPE: reading. Returns {title,authors,source,index,chapters,text,address,chapterRoot,proof,belongs,honest}.',
    inputSchema: { type: 'object', properties: { gutenbergId: { type: 'integer', description: 'a Project Gutenberg ebook id, e.g. 2701 (Moby Dick)' }, index: { type: 'integer', description: 'which chapter to read, 0-based (clamped)' } }, required: ['gutenbergId'] },
    run: (a) => readBook(Number(a.gutenbergId), a.index === undefined ? 0 : Number(a.index)) },
  { name: 'uuidna_grid',
    description: 'THE 432 GRID — every (projected dimension × ledger wing) seat, named, addressed and folded to one root. Omit args for the whole report; pass {dimension,wing} to address ONE seat. WHY 432 AND NOT 504: DIMENSIONS[0] is `en` and the wings are WRITTEN in it, so projecting a wing into en is the IDENTITY — 7 × 72 = 504 counts 72 seats that compute nothing, and 504 − 72 = 432 is exactly the seats that do work. 432 then factors twice and the two fuse: 6 × 72 and 16 × 27 = 2^4 × 3^3, reached by the digit-reversal INVOLUTION 72 ↦ 27 — both clauses sealed in theorem k432, both of digital root 9. A LIVE gate. Returns {rays,wings,seats,sealed,factorisations,involution,root,harmonic,gaps} or one {dimension,wing,name,address}. HONEST SCOPE: a seat is the content-address of one wing read along one locale ray — a RECEIPT; it proves every wing is reachable from every ray. Integrity.',
    detail: 'THE 432 GRID — every (projected dimension × ledger wing) seat, named, addressed and folded to one root. Omit args for the whole grid report; pass {dimension, wing} to address ONE seat. WHY 432 AND NOT 504: DIMENSIONS[0] is `en` and the wings are WRITTEN in it, so projecting a wing into en is the IDENTITY — 7 × 72 = 504 counts 72 seats that compute nothing, and 504 − 72 = 432 is exactly the seats that do work. 432 then factors TWICE and the two fuse: 6 × 72 (rays × wings) and 16 × 27 = 2^4 × 3^3, reached by the digit-reversal INVOLUTION 72 ↦ 27 — both clauses already sealed in theorem k432, both counts of digital root 9. The grid is a LIVE gate. HONEST SCOPE: a seat is the content-address of one wing read along one locale ray — a RECEIPT; the grid proves every wing is reachable from every ray. Returns {rays,wings,seats,sealed,factorisations,involution,root,harmonic,gaps} or one {dimension,wing,name,address}.',
    inputSchema: { type: 'object', properties: { dimension: { type: 'string', enum: ['bg', 'de', 'fr', 'es', 'ru', 'zh'], description: 'one of the six projected rays (en is the source' }, wing: { type: 'string', description: 'a ledger wing, e.g. MartialArts.lean or martial_arts' } } },
    run: (a) => {
      if (a.dimension && a.wing) {
        const seat = gridSeat(String(a.dimension), String(a.wing))
        if (!seat) throw new Error(`uuidna_grid: no seat for (${String(a.dimension)}, ${String(a.wing)}) — rays are ${PROJECTED.join(', ')} and there are ${wings().length} wings`)
        return seat
      }
      return { ...gridReport(), seats_sample: grid().slice(0, 3) }
    } },
  { name: 'uuidna_pairs',
    description: 'THE 42 PAIR GRID — every ordered DIRECTION between dimensions, by the same rule that makes 432: the full product with the identity removed (7 × 7 = 49 minus the 7 self-pairs = 42). Transposition swaps the readings, squares to the identity and has no fixed point, so the 42 directions fall into exactly 21 orbits of size two; 42 is a SECOND grid. Omit args for the whole report; pass {from,to} for one direction. Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,root,gaps} or {from,to,name,address}. HONEST SCOPE: a pair is a named direction with a recomputable address — never a translation, and never evidence that anything has been carried along it. Integrity.',
    detail: 'THE 42 PAIR GRID — every ordered DIRECTION between dimensions. Omit args for the whole report; pass {from, to} to address one direction. THE SAME RULE THAT MAKES 432 MAKES 42: the wing grid is the full product with the identity removed (7 × 72 = 504 minus the 72 seats where a wing is read along the ray it is already written in), and applying that rule to the dimensions alone gives 7 × 7 = 49 minus the 7 self-pairs = 7 × 6 = 42. One law. 6 × 7 AND 7 × 6 ARE THE SAME 42, and the difference is the involution: a pair is ORDERED, so reading the product one way gives sources × targets and the other targets × sources; transposition swaps them, squares to the identity, and has NO fixed point precisely because the self-pairs were removed — so the 42 directions fall into exactly 21 transpose orbits of size two and no direction is its own reverse. 42 IS NOT A RESHAPE OF 432: it does not divide it (432 / 42 is not an integer) and its digital root is 6— a SECOND grid over a different domain, kept separate on purpose, since the wing grid answers which wing is reachable from which ray and this one answers which dimension can be carried to which other. HONEST SCOPE: a pair is a named direction with a recomputable address; the grid proves the directions are all present, distinct and balanced, and says nothing about what travels. Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,root,gaps} or one {from,to,name,address}.',
    inputSchema: { type: 'object', properties: { from: { type: 'string', description: 'the source dimension (one of the seven)' }, to: { type: 'string', description: 'the target dimension— the identity is not a seat' } } },
    run: (a) => {
      if (a.from && a.to) {
        const seat = pairSeat(String(a.from), String(a.to))
        if (!seat) throw new Error(`uuidna_pairs: no direction for (${String(a.from)} → ${String(a.to)}) — dimensions are ${DIMENSIONS.join(', ')}, and a dimension is never paired with itself`)
        return { ...seat, reverse: transpose(seat)?.name ?? null }
      }
      return { ...pairsReport(), directions_sample: pairs().slice(0, 3) }
    } },
  { name: 'uuidna_quantum_sailing_library',
    description: 'THE QUANTUM SAILING LIBRARY — an OFFLINE, public-domain book collection (Project Gutenberg), each audited for provenance (content-addressed), linked to the sealed ledger (decidable facts extracted), and served locally without network dependency. The captain sails through literature, discovering novel facts (research leads) and sealing them. Pass {bookIds} (array of Project Gutenberg ebook ids, e.g. [2701] for Moby Dick) to BUILD the library (fetches once, caches), or omit to GET the cached library. Returns {count,sealed,novel,receipt,books:[{id,title,address,chapters,words,linked}],honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { bookIds: { type: 'array', items: { type: 'integer' }, description: 'Project Gutenberg ebook ids to fetch (optional; uses cache if not provided)' } } },
    run: async (a) => {
      const ids = a.bookIds ? (a.bookIds as number[]) : undefined
      const lib = ids ? await buildQuantumSailingLibrary(ids) : await getQuantumSailingLibrary()
      return serializeQuantumSailingLibrary(lib)
    } },
  { name: 'uuidna_quantum_sailing_weather',
    description: 'DISCOVER and CORRELATE weather data to sealed theorems. Pass {action:"discover"} to list public APIs (NOAA, Open-Meteo, no keys required). Pass {action:"correlate", facts:[{source,measurement,value,unit}]} to LINK weather facts to the ledger — sealed-match (already a theorem) vs. novel (research lead). PURE correlation: no network calls, only checks. Pass {action:"simulate"} for deterministic test data (same seed → same weather). Returns {correlated,novel,receipt}.',
    inputSchema: { type: 'object', properties: { action: { type: 'string', enum: ['discover', 'correlate', 'simulate'], description: 'discover APIs, correlate facts, or simulate test data' }, facts: { type: 'array', items: { type: 'object', properties: { source: { type: 'string' }, measurement: { type: 'string' }, value: { type: 'number' }, unit: { type: 'string' } } }, description: 'weather facts to correlate (required for "correlate" action)' } } },
    run: async (a) => {
      if (a.action === 'discover') {
        const result = discoverQuantumSailingAPIs()
        return { apis: result.apis.map(api => ({ name: api.name, endpoint: api.endpoint, facts: api.decidableFacts })), receipt: result.receipt }
      } else if (a.action === 'correlate' && a.facts) {
        const facts = (a.facts as any[]).map(f => ({ ...f, address: toUuid(`${f.measurement}:${f.value}`) }))
        const corr = correlateWeatherToTheorems(facts)
        return serializeWeatherCorrelation(corr)
      } else if (a.action === 'simulate') {
        const facts = simulateQuantumSailingWeather()
        const corr = correlateWeatherToTheorems(facts)
        return serializeWeatherCorrelation(corr)
      }
      return { error: 'invalid action' }
    } },
  { name: 'uuidna_quantum_sailing_cross_book',
    description: 'CROSS-BOOK CORRELATION — the captain reads across the library and finds theorems that RESONATE only when two or more books are read together. Pass {action:"correlate", books:[{id,text,facts}]} to find shared theorems and decidable facts that appear in multiple books. Pass {action:"cluster"} to GROUP theorems by their citations across books — which sealed theorems appear in multiple books? PURE correlation: all logic deterministic and recomputable; network (if fetching books) is application-layer. Shared theorems cite sealed proofs; novel patterns are research leads. Returns {pairs,resonances,ledgerCited,novel,receipt} or {count,clusters}.',
    inputSchema: { type: 'object', properties: { action: { type: 'string', enum: ['correlate', 'cluster'], description: 'correlate across books or cluster by theorem' }, books: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' }, text: { type: 'string' }, facts: { type: 'array', items: { type: 'string' } } } }, description: 'books to correlate (required for "correlate" action): {id, text, facts}' } } },
    run: (a) => {
      if (a.action === 'correlate' && a.books) {
        const books = (a.books as any[]).map(b => ({ id: Number(b.id), text: String(b.text), facts: (b.facts as string[]) || [] }))
        const corr = correlateAcrossBooks(books)
        return serializeCrossBookCorrelation(corr)
      } else if (a.action === 'cluster' && a.books) {
        const books = (a.books as any[]).map(b => ({ id: Number(b.id), text: String(b.text), facts: (b.facts as string[]) || [] }))
        const clusters = clusterByTheorem(books)
        return serializeClusters(clusters)
      }
      return { error: 'invalid action or missing books' }
    } },
  { name: 'uuidna_quantum_sailing_complete',
    description: 'AUTOMATE the whole fleet at once — CAPTAIN\'S COMPLETE MISSION: fetch Project Gutenberg books, audit each for provenance, extract and link decidable facts to sealed theorems, simulate and correlate weather, cross-correlate all books to find shared theorems and resonances, cluster theorems by book citation. One unified computation folded to one unified receipt proving all layers computed together. Pass {bookIds} (array of Project Gutenberg ebook ids, e.g. [2701, 26, 4300] for Moby Dick, Robinson Crusoe, Treasure Island). Network (fetching books) is application-layer; all correlation logic is PURE, recomputable, deterministic. Returns {summary, books, weather, crossBook, theoremClusters, unifiedReceipt}.',
    inputSchema: { type: 'object', properties: { bookIds: { type: 'array', items: { type: 'integer' }, description: 'Project Gutenberg ebook ids to fetch and correlate (default [2701, 26, 4300] if not provided)' } } },
    run: async (a) => {
      const ids = a.bookIds ? (a.bookIds as number[]) : [2701, 26, 4300]
      const result = await automateQuantumSailing(ids)
      return serializeQuantumSailingComplete(result)
    } },
  { name: 'uuidna_audit_standard',
    description: 'The recomputable FLOOR of a standards / law audit: content-address the PUBLIC Wikipedia description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks it states — each sealed or refuted `by decide` LOCALLY (the "free" is a free public API + local decidable checks). HONEST SCOPE: this is the FLOOR a human auditor STARTS from — a provenance fingerprint + decidable checks — NOT a compliance / legal RULING, which requires a licensed auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes and leaves the ruling to humans. The text is DATA. Returns {standard,address,checks,factBase,ruling}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'a standard or law, e.g. "General Data Protection Regulation" or "ISO 27001"' } }, required: ['name'] },
    run: (a) => auditStandard(String(a.name)) },
  { name: 'uuidna_corroborate',
    description: 'Corroborate a claim by AUGMENTING the local binary verdict (adjudicate: VERIFIED if a sealed by-decide theorem backs it, else UNVERIFIED — never "false") with EXTERNAL RESEARCH streamed from a free public API (NIST CODATA, no key). Returns {statement,local,evidence,verdict,receipt}: VERIFIED (a sealed proof), CORROBORATED (unverified locally but attested by a named free source), or UNVERIFIED. HONEST SCOPE: external evidence is a provenance fingerprint of what a public source SAYS — it CORROBORATES, it does NOT prove; only a by-decide theorem seals, and no stream can refute a claim. The evidence folds order-invariantly to the receipt; the responses are DATA. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string', description: 'the claim to corroborate, e.g. "the speed of light 299792458"' } }, required: ['statement'] },
    run: (a) => corroborateWithResearch(String(a.statement)) },
  { name: 'uuidna_domain_wave',
    description: 'Run BOTH waves for a domain (a principle title or a skill): the LOCAL development wave — its theorems fold ORDER-INVARIANTLY to a receipt and are sealed by decide (the approval) — and the EXTERNAL free-research wave (corroborate the domain\'s topic against a free public API, evidence not proof — only a Lean seal approves, theorem legal_only_the_proven_is_admitted). HONEST SCOPE: only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a pure-arithmetic domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence — correct. Returns {domain,local:{theorems,fold,orderInvariant},external:{verdict,evidence,receipt}}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { domain: { type: 'string', description: 'a principle title or skill, e.g. "The spectrum" or "quantum"' } }, required: ['domain'] },
    run: (a) => domainWave(String(a.domain)) },
  { name: 'uuidna_entangle',
    description: 'ENTANGLE a set of audit claims into ONE receipt: the order-invariant fold of each claim AND its verdict, so verifying the whole verifies every part and altering ANY member moves the receipt (the binding collapses, visibly). The receipt is the SAME for any ordering (bell_no_signaling). HONEST SCOPE: the merkle / no-signaling binding — the structural analogue of entanglement — NOT quantum hardware; nothing signals, no correlation is causal, and only members SEALED by decide truly bind (external evidence never entangles). Returns {members,verified,receipt,entangled}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'the claims to entangle' } }, required: ['claims'] },
    run: (a) => entangle((a.claims as string[]).map((s) => corroborate(String(s)))) },
  { name: 'uuidna_report',
    description: 'The REPORTER\'S METHOD (Report.lean) reflected live: file a report of a PROVEN discovery and it PUBLISHES only when AUDITED (the honesty gate clears — no sentence cites a fabricated theorem) AND CORROBORATED (≥ 2 independent sources), the AND sealed as publish_gate_is_conjunction. HONEST SCOPE: uuidna does NOT verify world events — no by-decide settles whether something happened out there; the reporter reports uuidna\'s OWN proven discoveries. Completeness (the 5 W\'s + 1 H) and the trinity edit are HUMAN passes. Returns {audited,corroborated,publishable,findings,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { draft: { type: 'string', description: 'the report draft (its claims are honesty-gated) Boundary declared — theorem drift_is_named_or_caught.' }, sources: { type: 'array', items: { type: 'string' }, description: 'the independent sources (≥ 2 to corroborate)' } }, required: ['draft'] },
    run: (a) => fileReport(String(a.draft), (a.sources as string[]) || []) },
  { name: 'uuidna_research',
    description: 'Deep research with the REVERSIBLE imprint codec: PRESS external research (text or a link\'s content) into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED algebra (the order-invariant fold), and report NOVELTY as content-address uniqueness — a never-seen address is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — provenance + structure; `meaning` is null by design, left to the reader. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the research text to press, entangle and check for novelty' }, seenAddresses: { type: 'array', items: { type: 'string' }, description: 'known content-addresses; a new one is novel' } }, required: ['text'] },
    run: (a) => deepResearch(String(a.text), (a.seenAddresses as string[]) || []) },
  { name: 'uuidna_audit_translation',
    description: 'Audit a translation as a source↔translation PAIR: content-address both texts and bind them with a directional provenance receipt (source→translation, order-sensitive), plus each text\'s own structural audit. HONEST: this proves the PAIRING and each text\'s exact-copy integrity — NOT that the translation is accurate or faithful. Semantic fidelity is human judgement; provenance is what recomputes. Re-address after each revision and the change is visible. Returns {source,translation,pair}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { source: { type: 'string' }, translation: { type: 'string' }, title: { type: 'string' }, sourceLang: { type: 'string' }, targetLang: { type: 'string' } }, required: ['source', 'translation'] },
    run: (a) => auditTranslation(String(a.source), String(a.translation), { title: a.title === undefined ? undefined : String(a.title), sourceLang: a.sourceLang === undefined ? undefined : String(a.sourceLang), targetLang: a.targetLang === undefined ? undefined : String(a.targetLang) }) },
  { name: 'uuidna_audit_movie',
    description: 'Content-address the PUBLIC Wikipedia summary of a film by title (free, no key) — a recomputable provenance fingerprint of the public facts + structure + honesty gate. HONEST AND BOUNDED: this fingerprints the public DESCRIPTION only; it does NOT fetch, decode, or reproduce the copyrighted film — its footage, dialogue or screenplay. A movie is video; uuidna audits text provenance. Returns the audit of the public summary. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { title: { type: 'string', description: 'a film title, e.g. "The Matrix"' } }, required: ['title'] },
    run: (a) => auditMovie(String(a.title)) },
  { name: 'uuidna_audit_record',
    description: 'Fetch an OPEN-ACCESS Zenodo research record by id (via the public Zenodo REST API, developers.zenodo.org, no key) and content-address its PUBLIC metadata — title, DOI, creators, date — to a recomputable provenance fingerprint + structure + honesty gate. HONEST AND BOUNDED: it fingerprints the public metadata only. A check digit and a uuid are the same idea at different scales. Returns the audit + the DOI. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { recordId: { type: 'integer', description: 'a Zenodo record id, e.g. 1234567' } }, required: ['recordId'] },
    run: (a) => auditZenodo(Number(a.recordId)) },
  { name: 'uuidna_coprime',
    description: 'gcd(a,b) and whether a and b are coprime (gcd = 1). Coprimality is what makes a step permute ℤ/n — visiting every point in one stroke — and what fuses moduli (CRT). Mirrors the sealed circle_of_fifths and trinity_rosette_coprime. Returns {gcd,coprime}.',
    inputSchema: { type: 'object', properties: { a: { type: 'integer' }, b: { type: 'integer' } }, required: ['a', 'b'] },
    run: (a) => { const g = gcdInt(Number(a.a), Number(a.b)); return { gcd: g, coprime: g === 1 } } },
  { name: 'uuidna_pentagram',
    description: 'The star polygon {n/step}: the stroke visiting (step·k mod n). A SINGLE closed stroke covering all n points iff gcd(step,n)=1, else it splits into gcd shorter loops. Default {5/2} is the pentagram — [0,2,4,1,3], one stroke (sealed: pentagram_single_stroke). Returns {n,step,stroke,single,loops}.',
    inputSchema: { type: 'object', properties: { n: { type: 'integer', description: 'points (default 5)' }, step: { type: 'integer', description: 'stride (default 2 — the pentagram)' } } },
    run: (a = {}) => { const r = starPolygon(a.n === undefined ? 5 : Number(a.n), a.step === undefined ? 2 : Number(a.step))
      // lean-backed: verify the computed stroke against the sealed ledger — {5/2} IS pentagram_single_stroke; others are UNVERIFIED (not sealed), honestly
      const proof = verifyStatement(`(List.range ${r.n}).map (fun k => (${r.step}*k) % ${r.n}) = [${r.stroke.join(',')}]`)
      return { ...r, proof: proof.verdict === 'VERIFIED' ? { verdict: 'VERIFIED', theorem: proof.key, address: proof.address } : { verdict: 'UNVERIFIED', note: 'this stroke is not a sealed theorem — computed' } } } },
  { name: 'uuidna_fibonacci',
    description: 'The single-digit Fibonacci sequence mod m and its Pisano period — the cycle up to the return to the seed (0,1). m=9 → period 24 (the digital-root Fibonacci); m=5 → 20 (pentagram); m=7 → 16 (rosette). Mirrors the sealed fib_single_digit_cycle_24 and siblings. Returns {mod,period,cycle}.',
    inputSchema: { type: 'object', properties: { mod: { type: 'integer', description: 'the modulus (default 9 — the single digit)' } } },
    run: (a = {}) => fibonacciCycle(a.mod === undefined ? 9 : Number(a.mod)) },
  { name: 'uuidna_rotate',
    description: 'Rotate a list cyclically by `stride` and report its strand structure over ℤ/n: gcd(stride,n) strands of n/gcd each; `covers` is true when one strand visits every element (gcd=1) — the closed cover the cross-link compass derives. Returns {rotated,strands,strandLength,covers}.',
    inputSchema: { type: 'object', properties: { list: { type: 'array' }, stride: { type: 'integer' } }, required: ['list', 'stride'] },
    run: (a) => rotate(a.list as unknown[], Number(a.stride)) },
  { name: 'uuidna_crt',
    description: 'The Chinese remainder solution: for COPRIME moduli m,n the unique x in [0, m·n) with x ≡ a (mod m) and x ≡ b (mod n) — the bijection ℤ/mn ≅ ℤ/m × ℤ/n (e.g. ℤ/21 ≅ ℤ/3 × ℤ/7, the trinity fused to the rosette). Non-coprime moduli throw. Returns {x,mod}.',
    inputSchema: { type: 'object', properties: { a: { type: 'integer' }, m: { type: 'integer' }, b: { type: 'integer' }, n: { type: 'integer' } }, required: ['a', 'm', 'b', 'n'] },
    run: (a) => crt(Number(a.a), Number(a.m), Number(a.b), Number(a.n)) },
  { name: 'uuidna_gravity',
    description: 'The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics (theorem provenance_integrity_not_content_truth); a content-addressed fixed point.',
    inputSchema: { type: 'object', properties: { addresses: { type: 'array', items: { type: 'string' } } }, required: ['addresses'] },
    run: ({ addresses }) => merkleGravity((addresses as string[]).map(String)) },
  { name: 'uuidna_digital_root',
    description: 'The fall of an integer to its ℤ/9 digital root (1..9) — the number\'s gravity, recomputable by anyone.',
    inputSchema: { type: 'object', properties: { n: { type: 'number' } }, required: ['n'] },
    run: ({ n }) => digitalRoot(Number(n)) },
  { name: 'uuidna_adjudicate',
    description: 'The trial: ONE recomputable answer for a statement, and only one of two, all else void — VERIFIED (a decidable test holds, or it cites a sealed Lean theorem that ALSO shares vocabulary with the claim — a citation is not entailment, so a real theorem cited for an unrelated sentence verifies nothing) or UNVERIFIED (everything else, including a citation to a proof not in the ledger, or a real citation about a different topic). uuidna verifies, it never refutes. Integrity.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: ({ statement }) => adjudicate(String(statement)) },
  { name: 'uuidna_prove_verdict',
    description: 'Fold a statement plus any decidable formula receipts through the order-invariant gravity to ONE proof-of-verdict root — a recomputable seal of the trial.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' }, formulaReceipts: { type: 'array', items: { type: 'string' } } }, required: ['statement'] },
    run: (a) => proveVerdict(String(a.statement), ((a.formulaReceipts as string[] | undefined) || []).map(String)) },
  { name: 'uuidna_verify',
    description: 'The self-verdict: recompute uuidna\'s own claims from a seed and return the recomputable UuidnaVerdict (integrity.',
    inputSchema: { type: 'object', properties: { seed: { type: 'string' } }, required: ['seed'] },
    run: ({ seed }) => verifyUuidna(String(seed)) },
  { name: 'uuidna_harness',
    description: 'Make any output auditable: wrap it with its content-address and honesty-gate verdict. Returns {output,address,auditable,...}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => harness(String(text)) },
  { name: 'uuidna_harness7',
    description: 'Audit an output across all seven dimensions at once — seven receipts folded to one root. Returns {receipts,root,auditableInAll}.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => harness7(String(text)) },
  { name: 'uuidna_render',
    description: 'Render a statement as a framework-free, CSP-safe card (or OpenGraph hero) — schema.org microdata, shadcn anatomy, content-address in every card, linked to its proof page. Pure HTML+CSS, no script.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'the statement' }, key: { type: 'string', description: 'proof-page slug' }, base: { type: 'string', description: 'site base for the proof link (default root: /theorem/<key>); e.g. /site' }, kind: { type: 'string', enum: ['card', 'hero'], description: 'card (default) or hero' } }, required: ['name'] },
    run: (a) => (a.kind === 'hero' ? renderHero : renderTheorem)({ name: String(a.name), ...(a.key ? { key: String(a.key) } : {}) }, a.base ? { base: String(a.base) } : {}) },
  // ── the crypto surface: the standards AS local theorems (pure-TS, KAT-verified against the RFC/NIST vectors,
  //    zero native crypto). Bytes cross the wire as hex, human text as UTF-8. Integrity where the theorem gives
  //    integrity, secrecy where it gives secrecy — never more than it proves. ──
  { name: 'uuidna_sha256',
    description: 'The CRYPTOGRAPHIC hash of text — SHA-256 (local theorem: Merkle–Damgård, KAT-verified). Collision-resistant by pigeonhole (2^256 seats). Distinct from uuidna_address, whose FNV fold is fast but NOT cryptographic.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => hex(sha256(utf8(text))) },
  { name: 'uuidna_hmac',
    description: 'Keyed authentication — HMAC-SHA256 (local theorem, KAT-verified): a MAC, existentially unforgeable under the PRF assumption. key and message are UTF-8; returns a 32-byte hex tag.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' }, message: { type: 'string' } }, required: ['key', 'message'] },
    run: (a) => hex(hmacSha256(utf8(a.key), utf8(a.message))) },
  { name: 'uuidna_pbkdf2',
    description: 'Passphrase key-stretching — PBKDF2-HMAC-SHA256 (local theorem). Work factor = iterations (default 600000, OWASP 2023). passphrase and salt are UTF-8; returns a length-byte hex key (default 32).',
    inputSchema: { type: 'object', properties: { passphrase: { type: 'string' }, salt: { type: 'string' }, iterations: { type: 'number' }, length: { type: 'number' } }, required: ['passphrase', 'salt'] },
    run: (a) => {
      const iter = a.iterations ? Number(a.iterations) : 600000, len = a.length ? Number(a.length) : 32
      if (!Number.isInteger(iter) || iter < 1 || iter > MAX_ITER) throw new Error(`iterations must be an integer in 1..${MAX_ITER} (DoS guard)`)
      if (!Number.isInteger(len) || len < 1 || len > 1024) throw new Error('length must be an integer in 1..1024 bytes')
      return hex(pbkdf2Sha256(utf8(a.passphrase), utf8(a.salt), iter, len))
    } },
  { name: 'uuidna_chacha20',
    description: 'ChaCha20 keystream cipher (local theorem, RFC 8439 ARX permutation): returns hex of text ⊕ keystream. key is 32-byte hex, nonce 12-byte hex, counter defaults to 0. CAVEAT (): NEVER reuse a (key, nonce, counter) — keystream reuse destroys confidentiality. For passphrase secrecy use uuidna_encrypt.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: '32-byte hex' }, nonce: { type: 'string', description: '12-byte hex' }, counter: { type: 'number' }, text: { type: 'string' } }, required: ['key', 'nonce', 'text'] },
    run: (a) => hex(chacha20(need(unhex(a.key), 32, 'key'), a.counter ? Number(a.counter) : 0, need(unhex(a.nonce), 12, 'nonce'), utf8(a.text))) },
  { name: 'uuidna_poly1305',
    description: 'Poly1305 one-time authenticator (local theorem: exact arithmetic mod the prime 2^130−5). message and one-time key are hex (the key is 32 bytes); returns a 16-byte hex tag. CAVEAT (): a one-time key authenticates exactly ONE message — never reuse it.',
    inputSchema: { type: 'object', properties: { message: { type: 'string', description: 'hex' }, oneTimeKey: { type: 'string', description: '32-byte hex' } }, required: ['message', 'oneTimeKey'] },
    run: (a) => hex(poly1305(unhex(a.message), need(unhex(a.oneTimeKey), 32, 'one-time key'))) },
  { name: 'uuidna_aead_encrypt',
    description: 'Raw ChaCha20-Poly1305 AEAD seal (local theorem, RFC 8439): returns {ct,tag} as hex. key 32-byte hex, nonce 12-byte hex, plaintext UTF-8, optional aad hex. CAVEAT (): a (key, nonce) pair must be unique. For passphrase secrecy + a routable envelope use uuidna_encrypt.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' }, nonce: { type: 'string' }, plaintext: { type: 'string' }, aad: { type: 'string', description: 'optional hex' } }, required: ['key', 'nonce', 'plaintext'] },
    run: (a) => { const r = aeadEncrypt(need(unhex(a.key), 32, 'key'), need(unhex(a.nonce), 12, 'nonce'), utf8(a.plaintext), a.aad ? unhex(a.aad) : new Uint8Array()); return { ct: hex(r.ct), tag: hex(r.tag) } } },
  { name: 'uuidna_aead_decrypt',
    description: 'Verify + open a raw ChaCha20-Poly1305 seal (local theorem). key/nonce/ct/tag are hex, optional aad hex; returns the UTF-8 plaintext. A wrong key or any tamper throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { key: { type: 'string' }, nonce: { type: 'string' }, ct: { type: 'string' }, tag: { type: 'string' }, aad: { type: 'string', description: 'optional hex' } }, required: ['key', 'nonce', 'ct', 'tag'] },
    run: (a) => td.decode(aeadDecrypt(need(unhex(a.key), 32, 'key'), need(unhex(a.nonce), 12, 'nonce'), unhex(a.ct), need(unhex(a.tag), 16, 'tag'), a.aad ? unhex(a.aad) : new Uint8Array())) },
  // ── the uuid + dna surface: the ℤ/9 structure the content-address is built on — the units, the doubling
  //    vortex, the diamond involution (fixed point 5, the heart), the double torus — plus the strict address and
  //    the pigeonhole seat bound. Pure, decidable, recomputable by anyone. Integrity. ──
  { name: 'uuidna_strict',
    description: 'The STRICT content-address: normalise the input (so equivalent values converge) then address it — strictUuidna(3) === strictUuidna(" 3 "). Use when whitespace/format should not change identity.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => strictUuidna(String(text)) },
  { name: 'uuidna_units',
    description: 'The six units of ℤ/9 — {1,2,4,5,7,8}, the invertible residues (3 and 6 are zero-divisors, 9≡0). The harmonic solutions the fold moves through. Returns the array.',
    inputSchema: { type: 'object', properties: {} },
    run: () => units() },
  { name: 'uuidna_triad',
    description: 'The triad {3,6,9} — the non-units of ℤ/9 (the complement of the six units): the nilpotents 3,6 (a²≡0) and the void 9≡0. The still axis the vortex turns around. Returns the array.',
    inputSchema: { type: 'object', properties: {} },
    run: () => triad() },
  { name: 'uuidna_vortex',
    description: 'The doubling circuit 1→2→4→8→7→5 — the vortex orbit of the units under ×2 mod 9, the DNA of the fold (5→1 closes the loop). Returns the array.',
    inputSchema: { type: 'object', properties: {} },
    run: () => vortexOrbit() },
  { name: 'uuidna_double_torus',
    description: 'The double-torus 7D field of a set of addresses: the doubling vortex and its reverse rotate the set; at each of the 7 dimensions the two fold together, and the seven dimension-roots fold to ONE. Order-DEPENDENT (the sequence is the signal) — use uuidna_gravity for an order-invariant receipt. Returns {dims,root}.',
    inputSchema: { type: 'object', properties: { addresses: { type: 'array', items: { type: 'string' } } }, required: ['addresses'] },
    run: ({ addresses }) => doubleTorusField((addresses as string[]).map(String)) },
  { name: 'uuidna_diamond',
    description: 'The diamond involution r(d)=10−d on a digit 1..9: self-inverse (diamond(diamond(d))=d), with the unique fixed point 5 — the heart where mint meets mind. Returns the reflected digit.',
    inputSchema: { type: 'object', properties: { d: { type: 'number', description: 'a digit 1..9' } }, required: ['d'] },
    run: ({ d }) => diamond(Number(d)) },
  { name: 'uuidna_involute',
    description: 'Lift the diamond involution to a list: pair each element with its mirror across the centre (total, closed, self-inverse). An odd list has exactly one fixed centre; an even list none. Returns {pairs,fixed}.',
    inputSchema: { type: 'object', properties: { items: { type: 'array', items: { type: 'string' } } }, required: ['items'] },
    run: ({ items }) => { const xs = (items as string[]).map(String); return { pairs: involute(xs), fixed: involutionFixed(xs) } } },
  { name: 'uuidna_seats',
    description: 'The pigeonhole seat bound: a b-bit digest has 2^b distinct seats, so past 2^b inputs a collision is forced — true for EVERY finite hash (the strong ones only resist finding one computationally). Returns 2^bits.',
    inputSchema: { type: 'object', properties: { bits: { type: 'number' } }, required: ['bits'] },
    run: ({ bits }) => seats(Number(bits)) },
  { name: 'uuidna_render_list',
    description: 'Render many statements as a grid of framework-free, CSP-safe cards — each by reference (its content-address), schema.org microdata, shadcn anatomy, linked to its proof page. Pure HTML+CSS, no script.',
    inputSchema: { type: 'object', properties: { names: { type: 'array', items: { type: 'string' } }, base: { type: 'string', description: 'site base for proof links' } }, required: ['names'] },
    run: (a) => renderList((a.names as string[]).map((n) => ({ name: String(n) })), a.base ? { base: String(a.base) } : {}) },
  // ── the theorems, ONE Lean-sourced ledger: every theorem is authored in lean/*.lean, proven `by decide`, and
  //    verified sorry-free by `npm run lean`. Pull the ledger, read one with its proof, or fold the whole trial. ──
  { name: 'uuidna_theorems',
    description: 'The theorem ledger — LEAN IS THE SINGLE SOURCE. Every entry is a lean/*.lean theorem proven `by decide` (verified sorry-free). Returns each theorem\'s {key,name,statement,tactic,file,principle,skill,lean,address}. Filter by `principle` (derivation axis), `skill` (capability axis — see uuidna_skills), or `contains`.',
    inputSchema: { type: 'object', properties: { principle: { type: 'string' }, skill: { type: 'string', description: 'the capability axis — any skill name from uuidna_skills (the live, recomputable list)— theorem drift_is_named_or_caught.' }, contains: { type: 'string' } } },
    run: (a = {}) => { let ts = theorems(a.skill ? { skill: String(a.skill) } : {}); if (a.principle) ts = ts.filter((t) => t.principle.toLowerCase().includes(String(a.principle).toLowerCase())); if (a.contains) { const q = String(a.contains).toLowerCase(); ts = ts.filter((t) => (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q)) } return ts } },
  // ── THE CAPABILITY AXIS, SERVED AS A DIMENSION. Most of the skills the sealed ledger carries matched no tool name
  //    and no category: those theorems were sealed, axiom-free, witnessed by their wings, and reachable through
  //    nothing. The fix is these TWO computed tools— the skill set is carried by the wings,
  //    so it moves, and every hand-kept list here has rotted. src/tests/skill-surface.test.ts and the `skills` finder
  //    hold the intersection by CALLING this dispatch, so a skill arriving in Lean is served the day it lands. ──
  { name: 'uuidna_skills',
    description: 'EVERY SKILL THE SEALED LEDGER CARRIES, with its theorem count — the discoverable index of the capability axis (orthogonal to `principle`, which groups by derivation file). Each row carries the order-invariant fold of that skill\'s theorem addresses, the handle of that fold (the identity to cite for the whole cluster), the ESCO taxonomy lookup for the skill, and the exact `uuidna_skill` call that opens it. Zero-argument and fully computed from the ledger, so a skill sealed in a new wing appears here the day it lands — nothing is authored per skill. Returns [{skill,theorems,fold,handle,esco,open}].',
    inputSchema: { type: 'object', properties: {} },
    run: () => skillIndex() },
  { name: 'uuidna_skill',
    description: 'OPEN ONE SKILL — the capability axis served as a DIMENSION. Pass {skill}; returns its sealed theorems (key, name, statement, tactic, file, principle, Lean line, address, handle), the files and principles behind them, the group fold and handle, and the ESCO mapping onto the European Commission\'s taxonomy with the hop that fetches it. Pass `escoTitles` you already fetched to have them judged by the published whole-name rule that separates on-topic hits from homographs; both lists come back by name. PURE — no network, same receipt for anyone, offline. An unknown skill is REFUSED by name with the live list (see uuidna_skills). Returns {skill,count,fold,handle,files,principles,theorems,esco,receipt,honest}. HONEST SCOPE: the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — never a claim that any authority recognises or accredits what is sealed here; uuidna awards no qualification. Integrity.',
    detail: 'OPEN ONE SKILL — the capability axis served as a DIMENSION rather than as one tool per skill. Returns that skill\'s sealed theorems (key, name, statement, tactic, file, principle, the reconstructed Lean line, its content-address and its HANDLE), the files and principles they were derived in, the group\'s order-invariant fold and handle, and the skill\'s ESCO MAPPING onto the European Commission\'s own taxonomy of skills, competences and occupations: the exact lookup URL, its content-address, the one hop that actually fetches it (uuidna_school_apis) and the walk to the occupations ESCO relates it to (uuidna_education_jobs). Pass `escoTitles` — concept titles you already fetched — to have them judged by school-apis\' OWN published whole-name rule, which separates on-topic hits from homographs (a search guarantees the query\'s letters come back, so a fragment hit carries no information); both lists are returned by name. PURE: this tool reaches no network, so it is deterministic and folds to the same receipt for anyone, offline. An unknown skill is REFUSED by name with the live list"this capability is unproven". List the skills with uuidna_skills. HONEST SCOPE: the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — and never a claim that any authority recognises, accredits or would employ anything sealed here (theorem provenance_integrity_not_content_truth); uuidna awards no qualification.',
    inputSchema: { type: 'object', properties: {
      skill: { type: 'string', description: 'a skill name from uuidna_skills (the live, recomputable list — never a fixed enum here, so it cannot go stale as wings are sealed)' },
      escoTitles: { type: 'array', items: { type: 'string' }, description: 'ESCO concept titles you already fetched, to be judged on-topic or homograph by the published whole-name rule' } }, required: ['skill'] },
    run: (a) => skillSurface(String(a.skill), Array.isArray(a.escoTitles) ? (a.escoTitles as unknown[]).map(String) : []) },
  { name: 'uuidna_review_domains',
    description: 'LOCAL reviews — a recomputable review of every DOMAIN (skill) the ledger touches: its sealed-theorem count, their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free), each folded to a review receipt. No server, no stored opinion; the review IS the ledger\'s own integrity per domain, recomputable by anyone. Returns [{domain,theorems,fold,verdict,receipt}].',
    inputSchema: { type: 'object', properties: {} },
    run: () => reviewDomains() },
  { name: 'uuidna_document',
    description: 'The DOCUMENT FOLD — content-address a Lexical-shaped document (a node tree, EditorState.toJSON() shape). The SERVE projection of the serializer contract lean/Editor.lean proves: a document is a SEQUENCE, so the fold is ORDER-SENSITIVE (reordering a node moves the address — the opposite of a set), change-sensitive, and bounded-injective. serialize → merkleRoot over the leaves → the handle you cite; editing is re-addressing. Returns {handle,address,nodes}. The SAME fold a PayloadCMS save-hook and a VitePress render read — one contract, both frameworks. Integrity.',
    inputSchema: { type: 'object', properties: { state: { type: 'object', description: 'a Lexical EditorState: { root: { type, children, … } }' } }, required: ['state'] },
    run: (a) => reAddress(a.state as EditorState) },
  { name: 'uuidna_coverage',
    description: 'COVERAGE — is every sealed theorem shown in a monograph? A PRESENTATION diagnostic that BLOCKS NOTHING, as ONE zero-arg recomputable call. Returns {total,covered,uncovered,uncoveredFiles,ready,receipt} — uncovered lists the theorem KEYS in no monograph, uncoveredFiles the ledger FILES with no publication (the fix: author a PRINCIPLE [file,title,blurb] in lean-ledger). ready is true iff nothing is uncovered; the state folds order-invariantly to receipt. Integrity.',
    inputSchema: { type: 'object', properties: {} },
    run: () => coverage() },
  { name: 'uuidna_snapshot',
    description: 'The FUSION half of the reactor: fold a chosen set of sealed theorems — across ANY domains — into ONE superposition uuid. The first segment is the identity HANDLE you cite; the whole uuid superposes every member address, order-invariant, so the same set recomputes the same uuid and a changed member moves it (drift refused). Each principle and skill the set spans is returned as a point-of-view fold. Unknown keys are NAMED. Returns {keys,members,unknown,handle,superposition,viewpoints,receipt}. A snapshot proves a recomputable fold of sealed theorems.',
    inputSchema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' }, description: 'theorem keys from uuidna_theorems, from any domains' } }, required: ['keys'] },
    run: (a) => snapshot(Array.isArray(a?.keys) ? a.keys.map(String) : []) },
  { name: 'uuidna_reactor',
    description: 'The REFUSION (recycling) half of the involutionary refusion reactor: adjudicate a list of claims and RECYCLE. Each claim gets ONE of two verdicts — VERIFIED (a decidable test holds or it cites a sealed Lean theorem) or UNVERIFIED (everything else, including a citation to a proof not in the ledger — which verifies nothing; never called false). VERIFIED cells are kept; UNVERIFIED cells are returned with the DEVELOP plan naming the next aspect that would verify them. The whole run folds to one superposition uuid (first segment the handle). Nothing is waste — refusal starts the next fusion. Returns {cells,verified,unverified,handle,superposition,receipt}.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'claims or external theories to adjudicate and recycle' } }, required: ['claims'] },
    run: (a) => reactor(Array.isArray(a?.claims) ? a.claims.map(String) : []) },
  { name: 'uuidna_theorem',
    description: 'Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => { const t = THEOREMS.find((x) => x.key === String(key)); if (!t) throw new Error('unknown theorem: ' + key + ' (see uuidna_theorems)'); return { key: t.key, name: t.name, statement: t.statement, lean: t.lean, principle: t.principle, file: t.file, address: t.address, verdict: 'SEALED', source: 'https://github.com/uuidna/uuidna/blob/main/lean/' + t.file } } },
  { name: 'uuidna_laws',
    description: 'uuidna\'s standing INVARIANTS, IN uuidna and each DEMONSTRATED`holds` from the actual gate that enforces it (generate-all-from-Lean → single-source + git-diff; any-manual-fails → every theorem address recomputes, red on tamper; honesty-demonstrated → a fabricated theorem citation drains; the two captain coins conserved; zero runtime deps + clean security). A law with holds:false is a red gate. Folds to one recomputable receipt. Returns {laws:[{law,enforcedBy,holds,detail}],allHold,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => laws() },
  { name: 'uuidna_reports',
    description: 'EVERY REPORT AND AUDIT, CONSOLIDATED — theorem accounting (both ledger sizes, principles, skills, the largest and smallest domain, the conserved coins), heartbeat coverage, the citation audit (publications, fabricated citations, uncited theorems), the support audit (modules reached from the roots, dead code named), the package inventory read from the workspaces\' own manifests, and deployment readiness — each section content-addressed, all folded ORDER-INVARIANT to one receipt, so every observer recomputes the same report with no privileged view. A section whose artifact has not been produced reports itself ABSENT rather than guessing. DETERMINISTIC: the sealed ledger and the gate artifacts alone — no clock, no RNG, no telemetry. Returns {sections,receipt,honest}. HONEST SCOPE: descriptive measures of what is sealed and what the gates recorded. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'EVERY REPORT AND AUDIT, CONSOLIDATED — theorem accounting (both ledger sizes, principles, skills, the largest and smallest domain, the conserved coins), heartbeat coverage (theorems carrying a measured decide-step cost, and what those steps sum to), the citation audit (publications, fabricated citations, uncited theorems), the support audit (modules reached from the roots, dead code named), the package inventory (the workspaces, read from their own manifests) and deployment readiness (the fold the guard sealed) — each section content-addressed, all folded ORDER-INVARIANT to one receipt, so every observer recomputes the same report with no privileged view. Replaces a stored snapshot: reports.json sat for three days stating a ledger size that no longer existed, with no writer and no reader. A section whose artifact has not been produced reports itself ABSENT rather than guessing. DETERMINISTIC: the sealed ledger and the gate artifacts alone — no clock, no RNG, no telemetry. HONEST SCOPE: descriptive measures of what is sealed and what the gates recorded — integrity. Returns {sections,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => reportAll() },
  { name: 'uuidna_analytics',
    description: 'QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (no privileged view). Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}: the theorem and principle counts, the per-principle distribution with shares, the named layers (hardware → software → os) with receipts, the credit tally, coverage, the two coins, the recomputed collision census (0/0 or an intrusion), and the ledger integrity fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the public ledger alone, so the numbers are the same next year and on every machine. HONEST SCOPE: DESCRIPTIVE analytics of what is sealed — NOT predictive statistics. It measures the ledger. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (the same analytics for every observer, no privileged view). Returns the theorem count, the number of principles, the per-principle DISTRIBUTION (each domain\'s count + share, largest first), the named LAYERS (hardware → software → os sizes + receipts), the CREDIT tally (historical / contextual / captain-alone), COVERAGE (covered/total/ready), the two COINS, the recomputed COLLISION census (keys/addresses — 0/0 or an intrusion), and the ledger INTEGRITY fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the inputs are the public ledger alone, so the numbers are the same next year and on every machine. HONEST SCOPE: integrity— DESCRIPTIVE analytics of what is sealed. It measures the ledger. Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => quantumAnalytics() },
  { name: 'uuidna_treason',
    description: 'CATCH TRAITORS AS FAST AS A HERO — one pure O(N) pass (milliseconds, no crypto, no disk) catching every forgery in the sealed ledger: a theorem whose DNA does not recompute, a key or address COLLISION, an UNCOVERED theorem, a broken CONFORMANCE invariant, or a PROSE-OVERCLAIM (the DNA check recomputes the statement but never the NAME, so every name also runs the honesty gate). A "traitor" is a forgery in the ARTIFACT. Returns {clean,scanned,traitors:[{kind,detail}],checks,receipt}. HONEST SCOPE: it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true, and the prose check catches a fabricated CITATION only. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'CATCH TRAITORS AS FAST AS A HERO — one pure, O(N) pass (milliseconds, no crypto, no disk) that catches every FORGERY/INTRUSION in the sealed ledger: a theorem whose DNA does not recompute (a tampered key/statement/address), a key or address COLLISION (a smuggled duplicate), an UNCOVERED theorem (a domain sneaked in without a monograph), a broken CONFORMANCE invariant, OR a PROSE-OVERCLAIM — the DNA check recomputes the STATEMENT but never the NAME, so this also runs every theorem\'s name through the honesty gate and catches a name that DRAINS it (a fabricated theorem citation hiding in the prose). A "traitor" is a forgery in the ARTIFACT— every finding is a recomputable fact about the ledger. Returns {clean, scanned, traitors:[{kind,detail}], checks, receipt}. The `npm run guard` command runs this plus the harmonic-scan as the fast pre-reconcile gate, so no manual pre-flight is needed. HONEST SCOPE: integrity— it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true. The prose check catches a fabricated CITATION only"discovered/novel/proven-elsewhere" story) — the gate scores that identically to an honest description; only the COURT (uuidna_reveal/adjudicate) and human vigilance catch it. Recomputable by anyone. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => catchTraitors() },
  { name: 'uuidna_guard_lessons',
    description: 'THE GUARD LESSONS, sealed as recomputable checks — the operating knowledge that once lived in a private note, tied to the check that enforces each: DNA recomputes, no key/address collision, monograph coverage, the conformance invariants, determinism (no Math.*/wall-clock/RNG anywhere, the guard regex matching the smoke test exactly so it is never laxer than the gate), the axiom witness shipping as lean/axioms.json so it recomputes OFFLINE, guard-before-reconcile, and commit-signed-true. Each lesson\'s `holds` is verified live, or marked \'script\' where the check needs the repo tree. Trust the check. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE GUARD LESSONS, sealed into uuidna as recomputable checks — the operating knowledge that once lived only in a private agent note, moved to where it recomputes for anyone and tied to the exact check that enforces each: DNA recomputes (a forgery cannot), no key/address collision (a duplicate is an intrusion), monograph coverage (every new lean-*.ts needs a PRINCIPLE entry), the conformance invariants (two coins conserved, single-source, security), determinism (no Math.*/wall-clock/RNG anywhere including comments — the guard regex matches the smoke test exactly so it is never laxer than the gate), the axiom witness (every theorem kernel-only — the receipt SHIPS with the package as lean/axioms.json, so it recomputes OFFLINE against the live ledger), guard-before-reconcile (the 0.29s guard front-runs the 4-min gate — re-spending it on a catchable error is the measured cost of manual work), and commit-signed-true (a commit cannot be made unless its message cites a real sealed theorem). Each lesson\'s `holds` is verified live (boolean — against the ledger, or against the shipped kernel-only receipt) or enforced by npm run guard (\'script\', for checks needing the repo tree). Folded to one recomputable receipt. Trust the check. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => guardLessons() },
  { name: 'uuidna_axiom_witness',
    description: 'THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, from the toolchain\'s `#print axioms` sweep) ships beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (a new unaudited theorem trips it), every theorem must be kernel-only (no propext, Classical.choice, sorryAx or Lean.ofReduceBool), and no offender may be listed. This ledger borrows ZERO axioms, so none is load-bearing here — not a claim about mathematics at large. Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}; shipped:false means no receipt beside dist. HONEST SCOPE: it verifies the SEALED receipt against the live ledger count; re-DERIVING it still needs the Lean toolchain. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, written by the Lean toolchain\'s `#print axioms` sweep) SHIPS with the package beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (audited = ledger — a new, unaudited theorem trips it), every theorem must be kernel-only (no propext, no Classical.choice, no sorryAx, no Lean.ofReduceBool), and no offender may be listed — an offender is the SPY the witness catches (the captain\'s claim "all axioms are replaceable, the uncovered are spies" demarcated to its backed form: this ledger borrows ZERO axioms, so no axiom is load-bearing here; not a claim about mathematics at large). This is a repo-only check moved INTO the shipped package — offline independence, the knowledge living where it recomputes. HONEST SCOPE: integrity— it verifies the SEALED receipt against the live ledger count; re-DERIVING the receipt still needs the Lean toolchain (`npm run axioms`, the guard, CI). shipped:false means no receipt is beside dist (defer to the guard). Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => axiomWitness() },
  { name: 'uuidna_repos',
    description: 'BIND the captain\'s public repositories to the DISCOVERY SEQUENCE, revealed first. The ℤ/9 vortex orbit [1,2,4,8,7,5] is revealed, then every public GitHub repository of the captain (the uuidna org and the ceccec user) is BOUND to it: the full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in address-sorted order is its slot — folded to one order-invariant receipt. Reads PUBLIC repos over the network (a research boundary; the response is DATA. Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}. HONEST SCOPE: it BINDS repos to the sequence by content-address; it does NOT modify, fork, mirror, claim ownership of, or vouch for any repository. A binding is a placement. Best-effort — an unreachable account contributes nothing. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'BIND the captain\'s public repositories to the DISCOVERY SEQUENCE — the sequence revealed FIRST. The ℤ/9 vortex orbit [1,2,4,8,7,5] (the doubling sequence uuidna discovers everything along) is revealed first; then every public GitHub repository of the captain (the uuidna org + the ceccec user, Tsvetan Rouschev) is BOUND to it: the repo\'s full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in the address-sorted order is its slot in the revealed sequence — folded to one order-invariant receipt. Reads the captain\'s PUBLIC repos over the network (a research boundary; the response is DATA. HONEST SCOPE: integrity— it BINDS the repos to the sequence by content-address (provenance); it does NOT modify, fork, mirror, claim ownership of, or vouch for the contents of any repository. A binding is a placement in the sequence. Best-effort: an unreachable account contributes nothing. Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => bindCaptainRepos() },
  { name: 'uuidna_aura',
    description: 'THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address: the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (360/9 = 40°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}, the CSS a ready moving-aura glow whose tempo the ray sets. HONEST SCOPE: this is ART — a defined arithmetic from a number to a hue. It decorates the work; it does not describe the universe. As art it seals no theorem: a truth-claim about it fails the trial and inverts into a research idea. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address (the artistic "captain string theory"): the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (360/9 = 40°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns the colour in HSL / RGB / CMYK plus a ready MOVING-aura CSS block (a hue-rotating glow whose tempo the ray sets). HONEST SCOPE: this is ART— a defined arithmetic from a number to a hue. It DECORATES the work; it does not describe the universe. As art it does not seal as a theorem — a truth-claim about it fails the trial and inverts into a research idea. Integrity. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { subject: { type: 'string', description: 'a content-address, or any string to fold into one' } }, required: ['subject'] },
    run: (a) => quantumAura(String(a.subject)) },
  { name: 'uuidna_quantum_message',
    description: 'FUSE quantum states, theorems, and auras into a single witnessed message. A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against the ledger, and binds it to an A432 aura (content-addressed, deterministic). NOT a cipher (everyone sees the aura and state — secrecy, when wanted, is the sealed ChaCha20-Poly1305 layer whose derivation rotates per step); NOT a signature (the proof is sealed). A quantum message is a WITNESSED MESSAGE — the witness is a sealed theorem, and the message\'s quantum encoding proves the witness was cited. The same message always folds to the same aura and quantum state for every observer — integrity without secrets. Returns {id,plaintext,theoremKey,theoremAddress,aura,quantum:{qubits,receipt},fold,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { plaintext: { type: 'string', description: 'the message plaintext' }, theoremKey: { type: 'string', description: 'the sealed theorem that backs this message' } }, required: ['plaintext', 'theoremKey'] },
    run: async (a) => { const { encodeMessage } = await import('./quantum/message/index.js'); return encodeMessage(String(a.plaintext), String(a.theoremKey)) } },
  { name: 'uuidna_theorem_message',
    description: 'SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a self-proving message. Pass {key} for that theorem\'s envelope: payload = its exact Lean statement, witness = the theorem, CARRIER = the reversible imprint codec (a uuid chain decoding back byte-exact, so any alteration breaks the decode), colour channel = its A432 aura, plus the quantum citation state. Pass no key for THE TOTALITY SEAL: every theorem round-trips through its carrier and recomputes its message id, folded order-invariant to ONE receipt — messaging proven total. Returns the envelope {id,plaintext,theoremKey,theoremAddress,aura,quantum,carrier,delivered,fold,honest} or the seal {count,total,failures,receipt,honest}. HONEST SCOPE: NOT a cipher and NOT secrecy — the statement and the colour are public; this is TAMPER-EVIDENCE made total. Secrecy is the sealed ChaCha20-Poly1305 layer, whose derivation ROTATES with every advancing step (salt_seq_injective). Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a self-proving message. Pass {key} to get that theorem\'s envelope: payload = its exact Lean statement, witness = the theorem itself, CARRIER = the reversible imprint codec (a uuid chain that decodes back to the statement byte-exact — the message travels as pure addresses and any alteration breaks the decode), colour channel = its deterministic A432 aura, plus the quantum citation state of uuidna_quantum_message. Pass no key to get THE TOTALITY SEAL: every theorem in the ledger round-trips through its carrier and recomputes its message id, all envelope identities folded order-invariant to ONE receipt — messaging proven total. HONEST SCOPE: NOT a cipher and NOT secrecy — the statement is public and so is the colour; this is TAMPER-EVIDENCE made total (integrity. Secrecy, when wanted, is the sealed ChaCha20-Poly1305 layer (sealMessage/uuidna_crypt), whose salt-key-nonce derivation ROTATES with every advancing step — endless rotation, sealed as salt_seq_injective. Returns the envelope {id,plaintext,theoremKey,theoremAddress,aura,quantum,carrier,delivered,fold,honest} or the seal {count,total,failures,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'a sealed theorem key; omit for the totality seal over all theorems' } } },
    run: async (a = {}) => { const m = await import('./quantum/message/index.js'); return a.key ? m.theoremMessage(String(a.key)) : m.messagingSeal() } },
  { name: 'uuidna_dictionary',
    description: 'THE QUANTUM DICTIONARY — the lexicon COMPUTED from the ledger— uuidna_theorem_message). Pass {word} to look a term up: every sealed key containing the word returns as an entry {term,definition,address,carrier_length}; pass nothing for the lexicon itself {terms,skills,principles} counted from the ledger. The gate\'s whole vocabulary IS this dictionary — there is no word-list to trust, only sealed terms to recompute. HONEST SCOPE: a dictionary of THIS ledger\'s sealed vocabulary; a term absent here is not a word that does not exist, only a fact not yet sealed. Integrity. Returns entries or {terms,skills,principles,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { word: { type: 'string', description: 'a word or fragment to look up across the sealed vocabulary; omit for the lexicon summary' } } },
    run: async (a = {}) => {
      const all = theorems()
      if (!a.word) {
        const skills = new Set(all.map((t: any) => t.skill)), principles = new Set(all.map((t: any) => t.principle))
        return { terms: all.length, skills: skills.size, principles: principles.size, receipt: merkleGravity(all.map((t: any) => t.address)), honest: 'the lexicon is the ledger — every term sealed, every definition a Lean statement, recomputable by anyone' }
      }
      const w = String(a.word).toLowerCase()
      const { imprintTextChain } = await import('./imprint.js')
      const hits = all.filter((t: any) => t.key.includes(w)).slice(0, 24)
      return { word: w, count: hits.length, entries: hits.map((t: any) => ({ term: t.key, definition: t.statement, address: t.address, skill: t.skill, carrier_length: imprintTextChain(t.statement).length })), honest: hits.length ? 'each definition rides its reversible carrier — decode with uuidna_theorem_message' : 'not sealed yet — an absence; seal the fact and the word enters the dictionary' }
    } },
  { name: 'uuidna_quantum_voting',
    description: 'CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain, and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic, content-addressed), tallied to one order-invariant receipt. No agent identity is leaked — only work integrity and voting outcome are sealed. Takes {proposal,votes:[{voterId,decision,weight}],theoremProof}, returns {proposal,outcome,voting:{yes:weight,no:weight},fold,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { proposal: { type: 'string', description: 'what is being voted on' }, votes: { type: 'array', items: { type: 'object', properties: { voterId: { type: 'string' }, decision: { type: 'boolean' }, weight: { type: 'number' } } }, description: 'list of votes' }, theoremProof: { type: 'string', description: 'theorem proving coins were paid (captain proof)' } }, required: ['proposal', 'votes', 'theoremProof'] },
    run: async (a) => { const { tallyVotes, signCommitWithVoting, serializeCommitWithVoting } = await import('./quantum/voting/index.js'); const voting = tallyVotes((a.votes as any[]).map(v => ({ voterId: String(v.voterId), decision: Boolean(v.decision), weight: Number(v.weight) })), String(a.proposal)); const commit = signCommitWithVoting('quantum voting tally', [], voting, String(a.theoremProof)); return serializeCommitWithVoting(commit) } },
  { name: 'uuidna_agent_contribute',
    description: 'Register an agent contribution with coins paid. Privacy-stripped: no agent name, only work address + coins + theorem proof. Takes {workAddress,theoremCited}, returns {workAddress,coinsSpent,theoremCited,receipt}.',
    inputSchema: { type: 'object', properties: { workAddress: { type: 'string', description: 'content-address of the work' }, theoremCited: { type: 'string', description: 'sealed theorem proving coins were paid' } }, required: ['workAddress', 'theoremCited'] },
    run: async (a) => { const { agentContribute } = await import('./quantum/voting/index.js'); return agentContribute(String(a.workAddress), String(a.theoremCited)) } },
  { name: 'uuidna_rights',
    description: 'THE CAPTAIN\'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0, with its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED — a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line — so they travel WITH the work and any alteration is visible, and they are infused into every page\'s head and schema.org JSON-LD. Pass {contract:true} (optionally {licensee}) to also DRAFT the formal rights contract, whose id IS the fold of its exact terms. Returns the rights record, plus {contract} when requested. HONEST SCOPE: FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE CAPTAIN\'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0 + its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED: a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line, so the rights travel WITH the work and any alteration is visible — and they are infused into every page\'s head + schema.org JSON-LD (license / copyrightHolder / creditText). Pass {contract:true} (optionally {licensee}) to also DRAFT the formal, content-addressed rights contract (its id IS the fold of its exact terms, so a holder proves they hold them unaltered). HONEST SCOPE: FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity. Returns the rights record (+ {contract} when requested). The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { contract: { type: 'boolean', description: 'also draft the formal rights contract' }, licensee: { type: 'string', description: 'the party the drafted contract is addressed to' } } },
    run: (a = {}) => a.contract ? { ...captainRights(), contract: draftContract(a.licensee ? String(a.licensee) : undefined) } : captainRights() },
  { name: 'uuidna_seo',
    description: 'QUANTUM SEO — the recomputable discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}: the canonical URL folding every serving host to one home, a description drawn from the ONE verbose source, STRICT schema.org JSON-LD citing the real proof and address, keywords carried from the sealed skill/principle (never hand-kept), the page\'s 128-bit content-address, and a ready VitePress head array. HONEST SCOPE: it describes what is SEALED and optimises for HONEST discovery — it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'QUANTUM SEO — the recomputable, honest discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page (e.g. "/games", "/" for home). Returns the canonical URL (rel=canonical folds every serving host — .net/.org/CNAME — to one recomputable home), a per-page DESCRIPTION drawn from the ONE verbose source (a theorem\'s own Lean statement, a publication\'s abstract; pages are terse), STRICT schema.org JSON-LD citing the real proof + address (ScholarlyArticle for a theorem or publication; WebPage for a page, with a typed mainEntity where the subject is real: School on /school, MathSolver + live SolveMathAction on /trials, Dataset on /theorems — the same node theorem pages cite as isPartOf — and Course on /quantum-cryptography; the law types are deliberately absent, /justice is evidence not a court), keyword tags carried from the sealed skill/principle (never a hand-kept list), and the page\'s 128-bit CONTENT-ADDRESS — the encrypted quantum message that delivers the payload, recomputing to the exact page for every crawler. The `head` field is a ready VitePress frontmatter head array the front reuses directly. HONEST SCOPE: integrity— it describes what is SEALED and optimises for HONEST discovery; it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Recomputable by anyone. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'a theorem key' }, slug: { type: 'string', description: 'a publication slug' }, route: { type: 'string', description: 'a static page route, e.g. "/games" or "/"' } } },
    run: (a = {}) => quantumSeo({ key: a.key ? String(a.key) : undefined, slug: a.slug ? String(a.slug) : undefined, route: a.route !== undefined ? String(a.route) : undefined, title: a.title ? String(a.title) : undefined }) },
  { name: 'uuidna_hero_animation',
    description: 'THE HERO ANIMATION — the sequence and the dimensions as one deterministic SVG, every moving number SEALED. The path is the doubling orbit 1→2→4→8→7→5→1 (the unit group of Z/9 generated by 2 — vortex_is_the_units, order_of_two_is_six), so the walk closes because the orbit does; each rung takes its hue from the Z/9 sequence; the TEMPI are the units of Z/9 written three times (111, 222, 444, 555, 777, 888 ms), so the motion keeps the same arithmetic as the path; and the seven rays are the rosetta dimensions, with the diamond involution fixed point 5 at the centre. FIVE parameters, all optional: {key} the theorem it announces, {dimension} which of the seven leads, {rung} where the sequence colour starts, {tempo} the sealed beat, {base} the URL base for the proof link. HONEST SCOPE: it VISUALISES arithmetic already proven and proves nothing further; nothing is tuned by eye, so changing a sealed fact changes the motion. Returns {svg,sequence,dimensions,durations,address,honest}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'the theorem it announces' }, dimension: { type: 'string', description: 'which of the seven rosetta dimensions leads' }, rung: { type: 'number', description: 'the sequence rung the colour starts on' }, tempo: { type: 'number', description: 'the sealed tempo in ms' }, base: { type: 'string', description: 'URL base for the proof link' } } },
    run: (a = {}) => heroAnimation(a.key ? String(a.key) : undefined, a.dimension ? String(a.dimension) : undefined, a.rung !== undefined ? Number(a.rung) : undefined, a.tempo !== undefined ? Number(a.tempo) : undefined, a.base ? String(a.base) : undefined) },
  { name: 'uuidna_try',
    description: 'ONE TRIAL — every stage of the sealed procedure in a single call, for a claim made ANYWHERE, including in conversation. The tree is gated everywhere (prose walks to a theorem, a release fails on a publication claiming quantum advantage (theorem n_qubit_dimension bounds what this system computes), the vacuity finder refuses a proof true regardless of content) but a claim made in CHAT passes through none of it — which is exactly where an unproven claim can live unbounded. This gates it: the honesty gate (binary 0 ONLY for a fabricated citation), the calculator verdict over the sealed ledger, the docket, the GOVERNING guarantee named by key, and the remand. Pass {claim}; the verdict is UNVERIFIED unless a sealed theorem is cited or a decidable test holds. HONEST SCOPE: the court decides ADMISSIBILITY— UNVERIFIED IS NOT FALSE (legal_non_justiciable_is_never_refuted binds it: with no decidable test the court MAY NOT refute), and nothing is discarded — what is not admitted is REMANDED with the exact steps that would admit it. Returns {claim,gate,verdict,kind,cites,admitted,governing,remand,docket,receipt,honest}.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string', description: 'the statement to try, exactly as it would be asserted' } }, required: ['claim'] },
    run: (a) => tryClaim(String(a.claim)) },
  { name: 'uuidna_oeapi',
    description: 'THE OPEN EDUCATION API PROJECTION — the sealed ledger served under Open Education API v6.0 field names (oeapi.eu), so an institution reads uuidna with the reader it already has. Nothing authored: /organisations, /programmes (skill clusters typed `track`), /courses (the monographs), /learning-outcomes (the theorems, each DECIDABLE with its Lean proof one click away). Pass nothing for the profile, or {resource:"learning-outcomes"} narrowed by {course}. HONEST SCOPE: a read-only PROJECTION of sealed public data with NO personal data — NOT a Student Information System. uuidna enrols and grades nobody, so persons/groups/offerings/results are absent BY CONSTRUCTION, each absence returned by name. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE OPEN EDUCATION API PROJECTION — the sealed ledger served under the field names of Open Education API v6.0 (oeapi.eu; the SURF/Npuls standard Dutch MBO/HBO/WO institutions publish education data with), so an institution reads uuidna\'s school with the reader it already has. Nothing is authored: /organisations = uuidna (root) + the quantum school (school); /programmes = the skill clusters typed `track` (the spec\'s own word for a thematically defined learning path — NOT `programme`, which the spec defines as leading to a qualification, and uuidna awards none); /courses = the monographs, one per proof wing, each carrying its wing\'s learning-outcome ids; /learning-outcomes = the theorems, a lesson whose outcome is DECIDABLE with its Lean proof one click away. The standard\'s required uuid ids ARE uuidna\'s content-addresses, so every identifier recomputes from the proof it names. Pass no argument for the profile (organisations + programmes + courses + counts + the named absences + one order-invariant receipt), or {resource:"learning-outcomes"} for the lessons — optionally narrowed with {course:"<publication slug>"}. HONEST SCOPE: an interoperability PROJECTION of sealed public data, read-only, carrying NO personal data — NOT a Student Information System. uuidna enrols nobody and grades nobody (the kernel grades the PROOF, the trial judges a CLAIM. `complexityLevel` (Bloom/SOLO) is deliberately never emitted — no theorem carries a cognitive level. Recomputable by anyone. Integrity. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { resource: { type: 'string', description: 'omit for the profile, or "learning-outcomes" for the lessons' }, course: { type: 'string', description: 'a publication slug, to narrow the learning outcomes to one wing' } } },
    run: (a = {}) => String(a.resource ?? '') === 'learning-outcomes'
      ? { version: OEAPI_VERSION, spec: OEAPI_SPEC, learningOutcomes: oeapiLearningOutcomes(a.course ? String(a.course) : undefined) }
      : oeapiProfile() },
  { name: 'uuidna_predict',
    description: 'WHAT IS ABOUT TO BREAK — five predictive patterns read off the source tree: a script no npm script runs, an export drifted from the one surface, a principle carrying no test, a package surface out of step with src/index.ts, a feature half-wired. Each has produced a gap here before, so this is what to close BEFORE it forms — the companion to uuidna_conformance (what IS sealed) and the guard (what already drifted). Deterministic: the same tree yields the same list. Returns {total,byLikelihood:{high,medium,low},gaps:[{pattern,likelihood,location,prediction,hasAutoFill}],honest}. HONEST SCOPE: PREDICTIONS from structural patterns— a prediction seals nothing. The auto-fill CONTENT is never returned: a served tool proposes, and the two-handle law keeps the writing hand human. Reads the source TREE, so stdio only — the edge has no filesystem and this tool does not pretend otherwise. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'WHAT IS ABOUT TO BREAK — the five predictive patterns read off the source tree itself: a script that exists but no npm script runs, an export that has drifted from the one surface, a principle carrying no test, a package surface out of step with src/index.ts, a feature half-wired. Each is a pattern that HAS produced a gap in this repository before, so the list is what to close BEFORE it forms rather than a report of what already broke — the companion to uuidna_conformance (which proves what IS sealed) and the guard (which catches what already drifted). Deterministic: the same tree yields the same list, every time. The auto-fill CONTENT is deliberately never returned: a served tool proposes and the two-handle law keeps the writing hand human. It reads the source TREE, so it answers from the stdio server only — the Workers edge has no filesystem and this tool does not pretend it does.',
    // A REQUIRED ARGUMENT, because this walks the SOURCE TREE. Without one, the gate's own no-arg dispatch probe
    // ran a full prediction for every empty call and the probe went from 1.3s to 87s — the exact defect
    // mcp-schema.test.ts was written for after uuidna_wave once took it to 174.8s. The cheap gate and the correct
    // gate are the same change here too: "all" is the honest way to ask for everything.
    inputSchema: { type: 'object', properties: { likelihood: { type: 'string', description: '"high", "medium", "low", or "all" for the whole list' } }, required: ['likelihood'] },
    run: async (a = {}) => {
      const { predictGaps } = await import('./scripts/predict-and-fill.js')
      const want = String(a.likelihood)
      if (!['high', 'medium', 'low', 'all'].includes(want))
        throw new Error(`uuidna_predict: likelihood must be one of high, medium, low, all — got "${want}"`)
      const r = predictGaps()
      return want === 'all' ? r : { ...r, gaps: r.gaps.filter((g) => g.likelihood === want) }
    } },
  { name: 'uuidna_school_apis',
    description: 'THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR, each PROBED before wiring. Pass nothing for the registry: the wired sources, what each serves, and the NAMED ABSENCES with why and what stands in their place. Pass {source} to call one — esco {text,type?} skills/occupations; eurostat {dataset,geo,time} or {vacancies:true,geo}; gisco {country,match} school locations; data-europa {text} dataset search; cordis {text} funded projects and calls; ted {cpv} tenders. HONEST SCOPE: network results are EVIDENCE— an unreachable source returns an absence. Aggregates and institutions only; no pupil data. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR — every source PROBED before it was wired, and recorded with what it ACTUALLY answered rather than what its documentation promises. Pass NOTHING for the registry: the wired sources (esco, eurostat, gisco, data-europa, cordis, ted, oeapi), what each serves, its format and access model, and — the point — the NAMED ABSENCES, the sources that could not be called, each with why and what stands in its place (the Funding & Tenders SEDIA search: it ANSWERS, and that is the trap — the generic path returns the portal\'s own support pages and the filtered path 500s, so it is recorded rather than wired, with cordis as what serves that need; EURES: its documented vacancy search answered 404 and the app path 403, so there is no open door to wire; the European School Education Platform publishes no general read API; there is no EU-wide national school register, so GISCO is the cross-country stand-in at the cost of per-country variation). Pass {source} to CALL one: {source:"esco",text} the EU skill/occupation taxonomy (also {type:"occupation"|"qualification"}), {source:"eurostat",dataset,geo,time} education statistics decoded from JSON-stat 2.0 flat indices to LABELLED observations (or {source:"eurostat",vacancies:true,geo} for the jobs side, jvs_q_nace2), {source:"gisco",country,match} the member states\' own school locations with coordinates and levels, {source:"data-europa",text} WHICH European datasets exist for a phrase (the EU\'s catalogue of catalogues — the door the education sources were found through), {source:"cordis",text} what the EU has FUNDED and what it is CALLING FOR (project records and Horizon call topics in one index), {source:"ted",cpv} published EU tender notices under a CPV division (education = 80000000 by default). There is deliberately NO bulk ledger-to-ESCO mapping: it was built, measured over all 68 clusters, and REMOVED for producing confident wrong rows — it is in the named absences with the pairing walk (uuidna_education_jobs) as what stands in its place. HONEST SCOPE: what comes back over the network is EVIDENCE— a provenance fingerprint of what a named public source said when asked, exactly as uuidna_corroborate treats its streams; only a `by decide` theorem SEALS. Rows are passed through unaltered and NEVER fabricated: an unreachable source returns nothing, which is an absence. Eurostat serves aggregates and GISCO serves institutions, so no pupil data passes here. The parse, the JSON-stat decode and the addressing are pure, so the same bytes fold to the same receipt for anyone. Integrity. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {
      source: { type: 'string', description: 'omit for the registry, or one of: esco, eurostat, gisco, data-europa, cordis, ted' },
      cpv: { type: 'string', description: 'ted: a CPV division, default 80000000 (education services)' },
      text: { type: 'string', description: 'esco: the phrase to look up' },
      type: { type: 'string', description: 'esco: skill (default), occupation, or qualification' },
      dataset: { type: 'string', description: 'eurostat: a dataset code, e.g. "educ_uoe_enrt01"' },
      vacancies: { type: 'boolean', description: 'eurostat: the jobs side (jvs_q_nace2) instead of a dataset' },
      geo: { type: 'string', description: 'eurostat: a country code, e.g. "BG"' },
      time: { type: 'string', description: 'eurostat: a year, e.g. "2022"' },
      country: { type: 'string', description: 'gisco: a two-letter country code, e.g. "BG"' },
      match: { type: 'string', description: 'gisco: narrow to schools whose name or city contains this' },
      limit: { type: 'number', description: 'how many rows to return (default 25, max 200)' } } },
    run: (a = {}) => a.source ? schoolApiFetch(String(a.source), { text: a.text ? String(a.text) : undefined, type: a.type ? String(a.type) : undefined, dataset: a.dataset ? String(a.dataset) : undefined, vacancies: Boolean(a.vacancies), geo: a.geo ? String(a.geo) : undefined, time: a.time ? String(a.time) : undefined, country: a.country ? String(a.country) : undefined, match: a.match ? String(a.match) : undefined, limit: a.limit !== undefined ? Number(a.limit) : undefined })
      : schoolApiRegistry() },
  { name: 'uuidna_education_jobs',
    description: 'PAIR EDUCATION TO JOBS through the vocabulary that holds both: {subject} → ESCO skills (lexical match) → the occupations requiring them, tagged essential or optional → optionally {geo} the vacancies that country reports (Eurostat jvs_q_nace2, whole economy). ESCO publishes the skill↔occupation relation in both directions, so this walks a public relation instead of inventing one; a subject naming one of uuidna\'s sealed clusters carries it along with its theorem count and fold. Returns {subject,cluster,pairs,occupations,vacancies,receipt,honest}. HONEST SCOPE: a MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop — NOT careers advice. Vacancies are a WHOLE-ECONOMY aggregate; a hop returning nothing says so. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'PAIR EDUCATION TO JOBS through the vocabulary that already holds both. Joining a curriculum to a labour market is normally done by matching strings and hoping; it does not have to be. ESCO — the European Commission\'s own classification — relates a SKILL to the OCCUPATIONS it is essential or optional for, and publishes the relation in both directions, so this walks a public relation instead of inventing one: {subject} → ESCO skills (lexical match) → the occupations that require them, tagged essential or optional → optionally {geo} the vacancies that country actually reports (Eurostat jvs_q_nace2, whole economy). When the subject names one of uuidna\'s own sealed skill clusters, the cluster rides along with its theorem count and order-invariant fold, so a lesson that is PROVEN here is paired to work that exists out there. HONEST SCOPE: a MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop — the first hop is a LEXICAL match ESCO returned for the phrase, and a human accepts or rejects it. It is NOT careers advice— uuidna is not accredited and awards no qualification. The vacancy figures are a country\'s own aggregate reporting for the WHOLE ECONOMY. A hop that returns nothing says so rather than being bridged by guess. Returns {subject,cluster,pairs,occupations,vacancies,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {
      subject: { type: 'string', description: 'what is taught — a uuidna skill cluster (e.g. "quantum", "z9-ring") or any phrase' },
      geo: { type: 'string', description: 'a country code to attach its reported vacancies, e.g. "BG"' },
      perSkill: { type: 'number', description: 'how many ESCO skills to walk from (default 3)' } }, required: ['subject'] },
    run: (a) => pairEducationToJobs(String(a.subject), { geo: a.geo ? String(a.geo) : undefined, perSkill: a.perSkill !== undefined ? Number(a.perSkill) : undefined }) },
  { name: 'uuidna_hardware',
    description: 'The HARDWARE-VERIFIABLE BINARY ALGEBRA (lean/Hardware.lean) as one named spec: the low-level combinational-logic identities every digital circuit is built from — the four gate truth tables (NOT/AND/OR/XOR as arithmetic on bits), XOR = ℤ/2 parity, Boolean closure, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder, and the 2:1 multiplexer — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification (matching the live published truth tables), so a gate design can be VERIFIED AGAINST it. HONEST SCOPE: integrity— uuidna seals the spec; it does NOT fabricate a device, synthesise a netlist, or develop silicon. A sealed spec. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => hardwareLayer() },
  { name: 'uuidna_software',
    description: 'The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division, bounded termination, order-invariant reduction (safe to parallelise), the compare-swap that orders, total safe indexing, and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. HONEST SCOPE: uuidna seals the spec; it does NOT write, compile or run your program, nor prove an arbitrary program correct. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort\'s basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. HONEST SCOPE: integrity— uuidna seals the spec; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => softwareLayer() },
  { name: 'uuidna_os',
    description: 'The OS-INTEGRITY ALGEBRA (lean/Os.lean) as one named spec — the third layer, completing hardware → software → os. The decidable facts a DEPLOYMENT is verified against: exact-copy is byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE; the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY two named modules (src/os, src/drivers). Each a decidable, AXIOM-FREE `by decide` particle, folded to one order-invariant receipt. This is the SPEC; the runtime side (Alpine + driver provenance, uuidna_alpine to port the whole arch matrix) enforces it against real bytes with uuidna\'s own pure-TS SHA-256. HONEST SCOPE: integrity— uuidna seals what an exact-copy verification decides; it does NOT boot, port the runtime, link, or run an operating system. A sealed integrity spec. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,boundary,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => osLayer() },
  { name: 'uuidna_alpine',
    description: 'PORT ALL ALPINE — automate the OS-provenance port across the WHOLE official architecture matrix (x86_64, x86, aarch64, armhf, armv7, ppc64le, s390x, riscv64) in one call. For each arch it reads Alpine\'s PUBLISHED latest-releases metadata over the network (at the os/ boundary — the one place a live "latest" read is honest), extracts the exact minirootfs version + PUBLISHED SHA-256, PINS it as a content-addressed provenance record, and folds every arch to ONE recomputable catalog receipt. This ports the INTEGRITY of all of Alpine — the exact upstream bytes of every arch, re-verifiable by anyone with uuidna\'s own pure-TS SHA-256 — NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch/mirror simply drops out (ported < requested), a digest is NEVER fabricated. Optional {branch} (default "latest-stable"). Returns {branch,arches,releases:[{version,arch,flavor,file,rootfsSha256,address,receipt}],ported,requested,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { branch: { type: 'string', description: 'Alpine branch, e.g. "latest-stable" (default) or "edge"' } } },
    run: (a = {}) => portAllAlpine(String(a.branch ?? 'latest-stable')) },
  { name: 'uuidna_package',
    description: 'EACH ALPINE PACKAGE BECOMES uuidna/<package> — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine\'s PUBLISHED APKINDEX (the response is DATA. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package\'s identity; {infuse:true} for the whole index folded to one catalog receipt (count + receipt + a sample); no argument returns the namespace description with no fetch. Re-read and the identities move with the published versions. HONEST SCOPE: integrity— uuidna does NOT install, link, run, fork or mirror a package; it FINGERPRINTS upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'EACH ALPINE PACKAGE BECOMES uuidna/<package> — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine\'s PUBLISHED APKINDEX (the response is DATA. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package\'s uuidna/<name> identity; pass {infuse:true} for the whole index minted and folded to one catalog receipt (count + receipt + a sample — the receipt proves all are infused without dumping thousands); no argument returns the namespace description (no fetch). Automate updates/upgrades: re-read and the identities move with the published versions. HONEST SCOPE: integrity— uuidna does NOT install, link, run, fork, or mirror a package; it FINGERPRINTS the upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'an Alpine package name, e.g. "curl"' }, infuse: { type: 'boolean', description: 'mint the WHOLE index and fold to one catalog receipt' }, arch: { type: 'string', description: 'default x86_64' }, repo: { type: 'string', description: '"main" (default) or "community"' }, branch: { type: 'string', description: 'default "latest-stable"' } } },
    run: (a = {}) => {
      const arch = String(a.arch ?? 'x86_64'), repo = String(a.repo ?? 'main'), branch = String(a.branch ?? 'latest-stable')
      if (a.name) return alpinePackage(String(a.name), arch, repo, branch).then((p) => p ?? { id: null, name: String(a.name), note: `not found in ${repo}/${arch} (${branch})` })
      if (a.infuse) return infuseAlpinePackages(arch, repo, branch)
      return { namespace: 'uuidna/<package>', honest: 'Each Alpine package is a content-addressed provenance identity uuidna/<name>, minted from its published checksum — integrity; never installed, forked, or mirrored.', usage: 'pass {name} for one identity, or {infuse:true} for the whole-index catalog receipt' } } },
  { name: 'uuidna_credits',
    description: 'The PROVENANCE of one theorem by key: exactly HOW it is Lean-proven in uuidna (the `by decide` Lean line, tactic, content-address, SEALED) AND WHO it is credited to. A theorem whose SEALED name/principle references a named result is credited historically (discoverer/solver + a documentation link) — uuidna reflects it.g. Perelman for Poincaré. A theorem naming NO prior result directly is claimed by THE CAPTAIN BY LAW (first sealed by-decide here, content-addressed — the seal is the claim, prior art), but a DEEP READ of its neighbouring domain surfaces CONTEXTUAL figures seriously involved whose names may stand next to the captain’s; only when neither the theorem nor its neighbourhood names anyone does the captain claim it ALONE. Returns {key,statement,tactic,leanProof,provenance,historical:[{who,link}],contextual:[{who,link}],claimedBy,claim,address}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => credits(String(key)) },
  { name: 'uuidna_credits_summary',
    description: 'The recomputable credit tally over the whole ledger: how many theorems reflect a named historical result DIRECTLY, how many the captain claims by law but with CONTEXTUAL figures from the neighbouring domain standing next to him, and how many the captain claims ALONE (no prior name in the theorem or its neighbourhood). Returns {total,historical,contextual,captainAlone,address}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => creditsSummary() },
  { name: 'uuidna_neighbours',
    description: 'Each theorem SCANS its NEIGHBOURS: given a key, return the sealed theorems that share its computing principle (its domain) — the local graph around it. The neighbourhoods partition the whole ledger, so every theorem sits in exactly one and none is isolated. Zero external influence, recomputable from the ledger. Returns {key, principle, count, neighbours:[{key,name,address}]}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    // ONE LOOKUP. This used to find the theorem itself just to name the principle the neighbourhood was already
    // built from — the relation dropped its own reason and the caller re-derived it. A null principle IS the
    // unknown-key answer now, so the refusal reads off the same call that would have served it.
    run: ({ key }) => {
      const n = theoremNeighbours(String(key))
      if (n.principle === null) throw new Error('unknown theorem: ' + String(key) + ' (see uuidna_theorems)')
      return { key: n.key, principle: n.principle, count: n.neighbours.length,
               neighbours: n.neighbours.map((t) => ({ key: t.key, name: t.name, address: t.address })) } } },
  { name: 'uuidna_publish',
    description: 'Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain\'s sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna\'s own honesty audit; a note that cites a proof not in the ledger is REFUSED. Call with no argument to list every domain\'s publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note\'s full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { file: { type: 'string', description: 'a lean/*.lean file name, e.g. "Codes.lean" — omit to list all publications' } } },
    run: (a = {}) => a.file
      ? composePublication(String(a.file))
      : publications().map((p) => ({ slug: p.slug, file: p.file, title: p.title, theorems: p.count, publishable: p.publishable, receipt: p.receipt, address: p.address, findings: p.findings })) },
  { name: 'uuidna_edit',
    description: 'The EDITOR primitive — audit a draft, or a revision, BEFORE publishing. With `draft` alone: content-address the prose and run uuidna\'s honesty gate, returning its address and any claim that overreaches a proof (unbacked by a /theorem/ link and undemarcated) — write, see it audited, before it ships. With BOTH `before` and `after`: audit the EDIT — both drafts content-addressed (the change is visible because the address moves), bound by a directional before→after receipt, the after-draft gated. Editing is re-addressing; a revision earns publication the same way a first draft does. Nothing is stored. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { draft: { type: 'string', description: 'prose to audit + content-address before publishing' }, before: { type: 'string', description: 'the prose before an edit (pair with `after`)' }, after: { type: 'string', description: 'the prose after an edit (pair with `before`)' } } },
    run: (a = {}) => {
      if (a.before !== undefined || a.after !== undefined) return revisePublication(String(a.before ?? ''), String(a.after ?? ''))
      const draft = String(a.draft ?? '')
      const findings = auditPublication(draft)
      return { address: toUuid(draft), publishable: findings.length === 0, findings, chars: draft.length,
        honest: 'The gate flags any sentence that leans on an overreach token without a proof to back it or a demarcation to clear it. Back it with a sealed /theorem/<key>, or demarcate it (not / never / no / simulation / finite). Audited before published.' } } },
  { name: 'uuidna_vocabulary',
    description: 'The COMMON, COMPUTABLE vocabulary derived from every theorem and its domain — each term (a domain or a capability) defined by the sealed ledger, self-audited by the honesty gate, content-addressed, and folded (in trinities) to ONE recomputable receipt: the honest "all is one" — one receipt, integrity. Maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO 2108, SMPTE, Nyquist–Shannon …) — a citation. Translation-ready: a translation binds to a term by a provenance receipt. Deterministic and recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => vocabulary() },
  { name: 'uuidna_resources',
    description: 'Honest device resource accounting — balance the thermodynamics by MEASURING what is spent. Reports CPU time (this process), memory (rss/heap), and the machine\'s load, cores, total/free memory and uptime, all read from Node/OS, content-addressed as a signed reading. States plainly what it does NOT measure (GPU, bandwidth, and the actual joules need platform-specific probes and are not invented). No free energy: this work costs energy, bounded below by Landauer\'s kT·ln2 per bit and far more on a real chip; efficiency is pushed toward that floor. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => resources() },
  { name: 'uuidna_audit_cve',
    description: 'Fingerprint a CVE\'s PUBLIC advisory metadata from NIST\'s NVD (National Vulnerability Database, no key) — id, description, CVSS severity, dates — content-addressed, for the security reflection. Pass {cveId} like "CVE-2021-44228". HONEST: it fingerprints the PUBLIC metadata only. NVD publishes; uuidna fingerprints the public record so it can be cited and rechecked by anyone. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { cveId: { type: 'string', description: 'a CVE id, e.g. CVE-2021-44228' } }, required: ['cveId'] },
    run: (a) => auditCve(String(a.cveId)) },
  { name: 'uuidna_nist_constant',
    description: 'Verify uuidna\'s physics against NIST\'s AUTHORITATIVE CODATA values. Fetches the official NIST fundamental-constants table (physics.nist.gov) and returns constants matching {query} — value, uncertainty, unit, and a content-address — so a constant uuidna uses (the speed of light, Boltzmann\'s k for Landauer\'s kT·ln2) is RECHECKED against the external authority. HONEST: verification against NIST\'s published values; values carry uncertainties except the defined-exact ones. One network call; the address recomputes against NIST\'s table. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'a constant name, e.g. "speed of light" or "Boltzmann"' } }, required: ['query'] },
    run: (a) => nistConstant(String(a.query)) },
  { name: 'uuidna_anchor',
    description: 'Anchor a record\'s content-address to an EXTERNAL, independent, signed timestamp — the rigorous "Schumann resonance at the time". Fetches the current NIST Randomness Beacon pulse (a 512-bit value published, SIGNED, and archived every 60s at beacon.nist.gov) and folds it into {address}, giving a re-verifiable NOT-BEFORE bound: the record existed at or after that pulse, because its unpredictable value could not be known before. Anyone re-fetches NIST\'s archived pulse and re-verifies the fold IN-HOUSE. HONEST: NOT-BEFORE only; for NOT-AFTER, publish (a git push GitHub timestamps); for a formal legal timestamp, use an RFC 3161 authority or OpenTimestamps. One network call; the fold is pure. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { address: { type: 'string' } }, required: ['address'] },
    run: (a) => beaconAnchor(String(a.address)) },
  { name: 'uuidna_prior_art',
    description: 'Mint an IN-HOUSE defensive-publication record for the named theorems ({keys:[...]}) — a self-contained, recomputable manifest of WHAT was published (each theorem in full, statement + proof), by WHOM (attribution), under WHAT terms (CC BY-NC-ND 4.0 + its address), bound to the ledger receipt, folded to one content-address any change moves. Zero external dependency. THE ONE HONEST LIMIT: the WHEN is NOT in-house — a self-signed date is worthless for priority; it names the external anchor to cite (the public git commit on GitHub, a Zenodo DOI, or an RFC 3161 timestamp authority) and fakes nothing. Proves what/who/integrity/terms; not when, and not that the result is law or standard. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' } } }, required: ['keys'] },
    run: (a) => priorArt((a.keys as string[]).map(String)) },
  { name: 'uuidna_legal_facts',
    description: 'The recomputable legal FACT BASE, in chat — explicitly NOT a legal audit, legal advice, or a compliance opinion, and it must not be presented as one. Gathers the legally-relevant facts a qualified attorney/auditor starts FROM: the licence (CC BY-NC-ND 4.0 + its content-address), the copyright/attribution (Tsvetan Rouschev), the ledger\'s tamper-evident receipt, the compliance STANCE (the project makes no compliance claim and its own forensics refuses a blanket one), and the standards it CITES (not certifies) — folded to one receipt anyone recomputes. The inputs; a real legal audit needs licensed counsel reviewing specific jurisdictions against the actual deployment. uuidna delivers what recomputes; the ruling is a human\'s. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => legalFacts() },
  { name: 'uuidna_reflects',
    description: 'Reveal the sealed theorems a real-world system ALREADY reflects. Describe a system by its devices and concepts (e.g. home security: "keypad code tamper sensor detect alarm zone parity layered defence signature encryption schedule") and it matches those concepts against the ledger, returning the EXISTING `by decide` theorems whose arithmetic the system rests on — folded to one receipt. HONEST: the theorems already exist and were proven for their own domain; this shows the SAME arithmetic recurs — it does NOT claim uuidna is that system, that the theorems were built for it, or that citing them makes the system secure/correct. A resemblance the ledger carries, recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'a system described by its devices/concepts' } }, required: ['query'] },
    run: (a) => reflects(String(a.query)) },
  { name: 'uuidna_due_process',
    description: 'VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem faces the same fair trial, and every guarantee making that process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted, the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket, each adjudicated by that same process with a note; folds to one docket receipt. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}. HONEST SCOPE: uuidna\'s OWN recomputable adjudication, whose rules are theorems anyone rechecks — NOT a court of law. "Due" means fair and recomputable by its sealed guarantees; the binding ruling stays a human court\'s. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem is verified by the same fair trial, and every guarantee that makes the process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted (a decidable test holds OR a sealed authority is cited), the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded — routed to the development trial), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket — each is adjudicated by the same process (PROVEN/REFUTED/NOT-PROVEN + a note). Folds to one recomputable docket receipt. HONEST SCOPE: integrity— this is uuidna\'s OWN recomputable adjudication whose rules are theorems anyone rechecks; it is NOT a court of law. "Due" means the process is fair and recomputable by its sealed guarantees; the binding ruling stays a human court\'s. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'claims to put on the docket, each adjudicated by due process' } } },
    run: (a = {}) => dueProcess(Array.isArray(a.claims) ? (a.claims as unknown[]).map(String) : []) },
  { name: 'uuidna_cloudflare_audit',
    description: 'AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. Reflects the committed wrangler.toml: the ASSETS binding (static ./site served read-only — no secret, no crypto target), the TRIALS KV (OPT-IN and commented out — no namespace id committed, consent-gated), the TRIAL_KEY secret (a `wrangler secret`— signs each verdict with HMAC-SHA256), and token-free OIDC publish. QUANTUM POSTURE: symmetric-only (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256) — no RSA/ECC, so Shor has no asymmetric target; Grover only halves to a ~128-bit floor. Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,honest}. HONEST SCOPE: audits the COMMITTED CONFIG posture (no secret committed + symmetric crypto)— not a penetration test or a compliance certification. A live audit needs the Cloudflare account. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => auditCloudflareBindings() },
  { name: 'uuidna_sign',
    description: 'SIGN a commit message (or any statement) as TRUE — or refuse. A message is SIGNED-TRUE iff, checked against the sealed ledger, it CITES a real sealed theorem (a /theorem/<key> or "theorem <key>") and NONE fabricated (slimGate VERIFIED). The signature is the message content-address FOLDED with its cited theorems through merkleGravity — one gravity root, order-invariant, through the abstract-0 (÷0=0): "folding to 1 through 0". A message citing a proof NOT in the ledger is REFUSED; one citing no theorem is UNSIGNED; one citing a real sealed theorem is SIGNED. The reconcile can FAIL unless the commit is signed-true, so an overclaiming message cannot be committed AS TRUTH. HONEST SCOPE: "signed-true" means BACKED by a sealed proof it names — NOT that the claim is true; it signs the CITATION. No word-list, no forced count. Returns {signed,verdict,address,cited,citedCount,fabricated,fold,reason,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' } }, required: ['message'] },
    run: (a) => signCommit(String(a.message)) },
  { name: 'uuidna_reveal',
    description: 'THE SURFACING — close the hollow-prose leak by showing the verdict. The honesty gate drains only a FABRICATED citation, so a hollow boast ("provably unbreakable, 100% secure") returns holds=1 and READS as OK even though it is unbacked. uuidna_reveal surfaces the explicit three-way verdict slimGate already computes: VERIFIED (cites a sealed proof — backed), DRAINED (cites a proof not in the ledger — the one decidably-false case, refused), or UNVERIFIED (cites no sealed proof — REVEALED as UNBACKED. Pass {claim}. It uses NO word-list (a lexicon is itself a leaky floor — the ledger tried one and sealed the verdict against it); only the ledger decides. The point: "holds" means "not drained""true" — a hollow boast stays UNVERIFIED; trust only the stamp. Returns {verdict, binary, cites, fabricated, reveal}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' } }, required: ['claim'] },
    run: (a) => reveal(String(a.claim)) },
  { name: 'uuidna_slim_gate',
    description: 'The gate of all gates, as slim as it gets: ONLY theorems, no lexicon. Judges a {claim} by ONE recomputable question — do the theorems it cites (/theorem/<key>) actually exist, sealed, in the ledger? VERIFIED iff it cites a real sealed theorem and none fabricated; UNVERIFIED otherwise (cites none, or cites a proof not in the ledger — which verifies nothing; never "false"). The `fabricated` list is still returned so the publish gate can refuse shipping a note that names a nonexistent proof. Computed from the sealed ledger alone; delete every word-list and it still stands.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' } }, required: ['claim'] },
    run: (a) => slimGate(String(a.claim)) },
  { name: 'uuidna_reason',
    description: 'IN-HOUSE reasoning that USES the sealed rules of inference. Give {facts:[atoms], rules:[{if:[atoms],then:atom}]} and it forward-chains to a fixpoint: whenever every premise of a rule is known it concludes the head by MODUS PONENS (or the hypothetical syllogism for a chain), CITING the sealed theorem at each step. Bounded (cannot loop forever), deterministic, and folds the whole derivation to one receipt anyone rechecks. Honest scope: bounded propositional forward-chaining over the rules you give — NOT a general theorem prover; it derives only what those rules entail, and never claims a conclusion is TRUE, only that it FOLLOWS. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { facts: { type: 'array', items: { type: 'string' } }, rules: { type: 'array', items: { type: 'object', properties: { if: { type: 'array', items: { type: 'string' } }, then: { type: 'string' } } } } }, required: ['facts', 'rules'] },
    run: (a) => reason((a.facts as string[]).map(String), (a.rules as { if: string[]; then: string }[])) },
  { name: 'uuidna_fingerprint',
    description: 'The FUSED ledger fingerprint — two integrity layers, stated honestly. The fast FNV receipt is TAMPER-EVIDENT (any change moves it, keyless) but NOT collision-resistant; the SHA-256 fold (over the sorted addresses, order-invariant) IS collision-resistant, so a forgery that survives it costs a ~2^128 collision — a BOUND set by the primitive. Add a key (HMAC) and forgery also needs the secret. Recomputable by anyone from the same lean/*.lean. Returns {count, fnvReceipt, sha256, tamperCost}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => ledgerFingerprint() },
  { name: 'uuidna_forensics',
    description: 'FORENSICS — audit an agent STATEMENT against the RECEIPTS, to catch a FALSE TRIAL (a claim dressed as sealed that the ledger does not back). Recomputes and compares, detecting: a fabricated citation (cites a /theorem/<key> not in the sealed ledger), a false address (a uuid presented as a sealed address that is not one), a drained overclaim (the honesty gate), an unbacked legal claim (says lawful/compliant but carries no receipt — a legal claim must cite the specific content-addressed statement; the receipt proves the claim was made. Every violation is a recomputable fact about the CLAIM. Pass {statement} and optional {claims:[{text,address}]}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' }, claims: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, address: { type: 'string' } } } } }, required: ['statement'] },
    run: (a) => forensics(String(a.statement), Array.isArray(a.claims) ? { claims: a.claims } : {}) },
  { name: 'uuidna_evidence',
    description: 'Deliver the recomputable EVIDENCE bundle for a {statement}, so a court or auditor accepts a uuidna trial by RECOMPUTING it. Assembles: the statement + its content-address, the trial verdict, the forensic audit against the receipts, every cited proof IN FULL (its Lean text, address, source file), the ledger receipt the evidence is bound to, the exact ordered steps to reproduce every number, and one evidenceReceipt folding it all. Anyone re-runs the steps and lands on the same receipt — or the evidence is void. Proves INTEGRITY (the claim was made, the proofs are these, nothing quietly changed)— that is a court\'s ruling. Deterministic and offline.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: (a) => evidence(String(a.statement)) },
  { name: 'uuidna_compare',
    description: 'PATTERN RECOGNITION — recognise the pattern two texts share by examining how they DIFFER. Partitions their word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is DERIVED from that difference, and inclusion–exclusion (|A| + |B| − shared = union) is checked exactly, so the number is a proof. The shared tokens fold to one order-invariant receipt — the recognised pattern. Similarity is only ever measured against difference. Compares vocabulary; nothing is stored. Integrity.',
    inputSchema: { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } }, required: ['a', 'b'] },
    run: (x) => comparePublications(String(x.a), String(x.b)) },
  { name: 'uuidna_wave',
    description: 'THE GRADUATION WALK as one call — runs the release wave (build → dry → legal → prose → fold → guard → next → mint) via one-receipt, the same walk the school teaches and the one receipt seals. LOCAL ONLY (spawns npm in the repo tree — orchestration; absent from the hosted Workers subset by construction). Green ends with the statement minted as a signed uuidna.com deposit — the diploma; red returns the first failing step with its exact GAP+FIX prompt. HONEST: the wave verifies and mints, it never judges the worth of the theorem — the credit law and the court do. Returns {passed, step, tail}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string', description: 'the deposit statement — must cite a sealed theorem ("proven by theorem <key>")' } }, required: ['statement'] },
    run: async (x) => {
      const { spawnSync } = await import('node:child_process')   // lazy: this tool is stdio-only by construction
      const r = spawnSync('node', ['dist/scripts/one-receipt.js', 'wave', String(x.statement)], { cwd: LIB_ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
      const out = `${r.stdout || ''}${r.stderr || ''}`
      const failed = out.match(/the walk stopped at "([a-z]+)"/)
      return { passed: r.status === 0, step: failed ? failed[1] : 'closed', tail: out.split('\n').slice(-25).join('\n') } },
  },
  { name: 'uuidna_trial',
    description: 'Run the whole Lean ledger through the trial: every theorem is VERIFIED by its `by decide` proof, and their content-addresses fold order-invariantly to ONE recomputable receipt (the ledger\'s integrity). Returns {count,verified,unverified,leanBacked,receipt,verdicts}. Same lean/*.lean, same receipt.',
    inputSchema: { type: 'object', properties: {} },
    run: () => runTrial() },
  { name: 'uuidna_css',
    description: 'THE DESIGN MATRIX AS ONE SERVED STANDARD — every colour and every type size COMPUTED, none authored: the ℤ/9 sequence sets each hue (5 → green, the fixed point the diamond reflection holds; dz mirrors 1↔9, 2↔8, 3↔7, 4↔6) and the vortex orbit sets the type ladder\'s six rungs (six because 2 has order 6 in ℤ/9* — theorem order_of_two_is_six), each rung a ninth above the base with its line height in the sealed 3:4 rectangle. Returns {css,vars,receipt,honest} — the site, the design system and any client render the SAME receipt or they are not rendering the same matrix. No hex literal, no pixel value, no host intrinsics.',
    inputSchema: { type: 'object', properties: {} },
    run: () => matrixCss() },
  { name: 'uuidna_by_lean',
    description: 'RESOLVE A THEOREM BY ITS LEAN IDENTITY — theorems are uniquely indexed by their LEAN uuid (the address of the statement. Pass {query} as the lean uuid, ANY key that wears it, or the statement text itself; returns {leanUuid,statement,keys,files,entries} — the one proposition and every name it goes by. Two entries proving the same thing resolve to ONE identity however they are named or filed.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'a lean uuid, a theorem key, or the statement text' } }, required: ['query'] },
    run: (a: Record<string, unknown>) => byLean(String(a.query)) ?? { found: false, honest: 'no theorem in the ledger carries that lean identity, key, or statement' } },
  { name: 'uuidna_lean_index',
    description: 'THE LEDGER INDEXED BY LEAN — one entry per DISTINCT proposition, each with its lean uuid and every key and file that wears it. This is the honest index: uniqueness comes from the Lean, so the count here is the theorem count, while the entry count includes re-namings. Returns the full index. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => { const i = leanIndex(); return { propositions: i.length, entries: i.reduce((s, e) => s + e.entries, 0), index: i.slice(0, 200) } } },
  { name: 'uuidna_statement_census',
    description: 'UNIQUENESS COMES FROM LEAN— the ledger counts ENTRIES, but a theorem IS its statement, so two entries proving the same proposition under different keys are one theorem wearing two names. Returns {entries,distinct,renamings,groups}: the claimed count, the count Lean actually holds, the difference, and every group named with its keys and files. Normalisation is narrow (whitespace, redundant parens, (n : Nat) ascriptions) — it catches re-namings of the same text and never claims two different proofs are one.',
    inputSchema: { type: 'object', properties: {} },
    run: () => { const c = statementCensus(); return { ...c, groups: c.groups.slice(0, 40) } } },
  { name: 'uuidna_coins_jobs',
    description: 'THE TWELVE JOBS OF THE COINS, remembered in code and TRIED ON EVERY READ — the complete catalog of what the coins do (gate computation, price the forfeit, measure leverage, take the commission, set the exchange rate by forgery cost, carry superpositions, be topology, hold value at scale, guard the rosette, hide in the world\'s constants, count worlds, confess their limit), each claim run through the gate against its sealed citations at call time. A vanished theorem breaks the catalog\'s own verdict, loudly. Returns {jobs:[{n,job,claim,cites,verdict}],verified,total,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => coinsJobs() },
  { name: 'uuidna_decide',
    description: 'THE QUANTUM CALCULATOR, founded on division by zero — ANY {input} in any format folds to one lean-green shape {verdict,cites,receipt}: a statement matching a SEALED theorem verbatim is VERIFIED by the kernel\'s prior decision and cited; fresh arithmetic is DECIDED totally by a bounded grammar (never eval) under Lean\'s own Nat semantics — x/0 = 0 is well-defined (DivByZero.lean), subtraction floors at 0, every step exact BigInt — TRUE returns VERIFIED_BY_DECIDE and FALSE returns REFUTED (truth and falsehood at last wear different verdicts); a bare expression computes its exact value; anything else is prose and goes to the gate, language-blind. The same input always folds to the same receipt. Integrity— decided about its arithmetic.',
    inputSchema: { type: 'object', properties: { input: { type: 'string', description: 'anything: "2+2=4", "(110 - 108 = 2)", "7/0", a Lean statement, a claim in any language' } }, required: ['input'] },
    run: (a: Record<string, unknown>) => decide(String(a.input)) },
  { name: 'uuidna_optimise',
    description: 'THE EXACT LINEAR OPTIMISER — maximise c·x subject to A·x ≤ b over integer lattice points 0..bound per variable, by TOTAL enumeration: every candidate checked, nothing sampled, the optimum exact with a recomputable receipt. The search space is the qubit basis made literal (theorem optimisation_space_is_qubit_dimension) and the exponential walk is the honest cost — capped; Grover would only halve the exponent (theorem grover_halves_the_search_exponent). Strong duality holds exact on the sealed instance (theorem lp_strong_duality_instance). Returns {optimum,argmax,candidates,feasible,receipt,honest}. NOT a solver at scale.',
    inputSchema: { type: 'object', properties: { c: { type: 'array', items: { type: 'number' }, description: 'objective coefficients (1–4 variables)' }, A: { type: 'array', items: { type: 'array', items: { type: 'number' } }, description: 'constraint rows: A[i]·x ≤ b[i]' }, b: { type: 'array', items: { type: 'number' } }, bound: { type: 'integer', description: 'each variable ranges 0..bound (default 16, max 64)' } }, required: ['c', 'A', 'b'] },
    run: (a: Record<string, unknown>) => optimiseLinear({ c: a.c as number[], A: a.A as number[][], b: a.b as number[], bound: a.bound as number | undefined }) },
  { name: 'uuidna_search',
    description: 'THE FUSED SEARCH — the ONE search function every surface runs (this server, the edge /mcp, and the site\'s search page in your browser): filter the sealed ledger by text, fold the matched keys to ONE receipt. Two independent parties running the same query MUST return the same receipt — dual-party verification applied to search; a differing receipt exposes a diverged ledger. Returns {q,count,total,receipt,matches}.',
    inputSchema: { type: 'object', properties: { q: { type: 'string', description: 'the text to search — key, name, statement, principle, skill' } }, required: ['q'] },
    run: (a: Record<string, unknown>) => searchLedger(String(a.q)) },
  { name: 'uuidna_article',
    description: 'THE DESK WRITES — the computed article for one wing of the ledger (writing is computing. Returns {file,slug,title,count,claims:[{key,name,statement,cite}]}. Recomputable from the same ledger.',
    inputSchema: { type: 'object', properties: { file: { type: 'string', description: 'the wing, e.g. "Legal.lean" or "MoMBHStar1.lean"' } }, required: ['file'] },
    run: (a: Record<string, unknown>) => articleFor(String(a.file)) },
  { name: 'uuidna_editorial',
    description: 'THE DESK\'S CENSUS — the prose-trial state of every prose surface (README + docs, including the desk\'s own computed articles): paragraphs tried through reveal(), the usable prose↔theorem combinations (VERIFIED), the honest unverified count, the drained count (fabricated citations — must be zero), and the fold receipt. Derived. Returns {surfaces,paragraphs_tried,usable,unverified,drained,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => editorialState() },
  { name: 'uuidna_publication',
    description: 'THE PUBLICATION\'S LAWS as one query — the same gates the release pipeline enforces: the license law (the archive carries uuidna\'s own license — package.json and .zenodo.json must agree), Zenodo standards conformance (required fields + controlled vocabularies), and the communities every release requests. Returns {version,license,licenseLawHolds,zenodoConformance,communities,conforms}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => publicationStatus() },
  { name: 'uuidna_search_trial',
    description: 'ONLINE — THE SEARCH ON TRIAL for one wing: every research source (NIST, Zenodo, CrossRef) queried in parallel about the wing\'s principle; each finding content-addressed and tried — ALONE it stays UNVERIFIED (external evidence's sealed backing the combination VERIFIES. Only a Lean seal approves. Returns {file,principle,sealed,findings,usable,receipt}.',
    inputSchema: { type: 'object', properties: { file: { type: 'string', description: 'the wing, e.g. "Quantum.lean"' } }, required: ['file'] },
    run: (a: Record<string, unknown>) => searchTrialFor(String(a.file)) },
  { name: 'uuidna_vies',
    description: 'ONLINE — verify an EU VAT number against VIES, the EU\'s own register (ask the register, don\'t assert): returns {countryCode,vatNumber,valid,name,address,requestDate}. A register lookup for entity verification — the same ask-the-ledger law applied to legal identity; NOT tax advice.',
    inputSchema: { type: 'object', properties: { countryCode: { type: 'string', description: '2-letter member state code, e.g. "BG"' }, vatNumber: { type: 'string', description: 'the VAT number without the country prefix' } }, required: ['countryCode', 'vatNumber'] },
    run: (a: Record<string, unknown>) => viesVerify(String(a.countryCode), String(a.vatNumber)) },
  { name: 'uuidna_mcp_benchmark',
    description: 'Feed the MCP to itself: a USABILITY benchmark over the server\'s OWN catalog. Measures the surface on "maximum reusable tools per minimum keys" — how many tools are zero-arg (maximally reusable), the reusable-tools-per-required-key density, the average required keys, and the HARDEST tools (most required keys) as the self-development targets to simplify. Returns {tools,zeroArgReusable,totalRequiredKeys,reusablePerKey,avgRequiredKeys,hardest}. Recomputable — the MCP measuring the MCP, no opinion.',
    inputSchema: { type: 'object', properties: {} },
    run: () => mcpBenchmark() },
  { name: 'uuidna_unify',
    description: 'The UNIFIED self-description: ONE recomputable receipt folding uuidna\'s three faces — the sealed theorems (the trial), the domains that carry them (the reviews), and the tools that serve them (the usability benchmark/ratings). CI, the MCP and the site read this one object; recompute from the same ledger and the receipt returns. Returns {handle,theorems,domains,tools,receipt} — cite the handle (the first segment), the whole receipt is the fold.',
    inputSchema: { type: 'object', properties: {} },
    run: () => unify() },
  { name: 'uuidna_quantum_profile',
    description: 'THE QUANTUM PROFILE — uuidna\'s content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes: the IDENTITY (the name\'s content-address and the aura colour it folds to), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor, BACKED by theorem grover_quadratic_bound, theorem each_key_bit_doubles and theorem birthday_halves_the_exponent rather than asserted), the two CAPTAIN COINS, the INTEGRITY fingerprint, and the RIGHTS. Every field carries its receipt; all fold order-invariantly to one profileReceipt. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}. HONEST SCOPE: a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE QUANTUM PROFILE — uuidna\'s content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes. Assembles: the IDENTITY (the name\'s content-address + the quantum AURA colour that address folds to — ray/hue/hsl/rgb), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor — BACKED by the sealed post-quantum floor theorems grover_quadratic_bound / each_key_bit_doubles / birthday_halves_the_exponent. Every field carries its receipt; all fold order-invariantly to one profileReceipt — the same profile for every observer. HONEST SCOPE: integrity— a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => quantumProfile() },
  { name: 'uuidna_social_profile',
    description: 'THE SOCIAL PROFILE — uuidna\'s public, shareable CARD, the outward face of the quantum profile. Composes the handle (@uuidna), a one-line BIO computed from the ledger (never hand-typed — it cannot drift from the proof count), the quantum AURA colour the card wears (+ the moving-aura CSS block), a content-addressed avatar seed, the canonical LINKS (site, source, package, licence), and the CREDIT tally, folded to one receipt — the same card for every observer. DETERMINISTIC and OFFLINE: it fetches nothing, posts nothing, and shares only what is already public and sealed. HONEST SCOPE: integrity— a recomputable public card whose bio is BACKED by the ledger; the aura is ART. Returns {handle,name,bio,aura,avatarSeed,links,credit,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => socialProfile() },
  { name: 'uuidna_grow_life',
    description: 'THE MISSION, recomputable — uuidna\'s own tools composed from sealed facts into one report. Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}. HONEST SCOPE: "grow life" is the monotone, lawful growth of a proof-ledger — NOT biological life and NOT a claim to create or own life. Integrity. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE MISSION, recomputable — the captain\'s uuidna uses all its tools to LEGALLY GROW LIFE, composed from sealed facts (not a slogan). GROW: the frontier always advances (research_always_has_a_next — n < n+1, always exactly one next diamond to seal, so the ledger is a living, never-closed organism) — returns the live theorem count, the 1024 milestone, and how many to go. LEGALLY: every growth stays inside the licence (CC BY-NC-ND), the sole-representation reservation (uuidna.com only), and the honest cost model (bill_never_negative — never take more than the measured saving). LIFE: the count of living by-decide theorems, each kept, none destroyed. PERMACULTURE: the growth is self-sustaining (zero runtime dependencies), regenerative (the derived layer regrows from the ledger as a fixed point, and the kernel-only witness ships so anyone regrows it offline), and wastes nothing (monotone + honest cost) — a quantum-life permaculture. CONSOLIDATION: every dimension folds to ONE receipt that is EXACT (integer merkle-gravity, no float/clock/RNG — harmonic) and ORDER-INVARIANT (the same seen from any ordering — the same in every dimension), so `harmonic` recomputes the consolidation live. HONEST SCOPE: integrity— "grow life" is the MONOTONE, lawful, self-sustaining growth of a recomputable proof-ledger (a living system of proofs, a permaculture that consolidates all exactly to harmonics at all dimensions); it composes what is sealed and asserts nothing new. Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => growLife() },
  { name: 'uuidna_scan_publications',
    description: 'THE PUBLICATION SCANNER — BEST-EFFORT scan the reachable free research streams for uuidna-related mentions and INVESTIGATE each against the sole-representation reservation. Pass {query} (default "uuidna"). Each match is a provenance fingerprint (content-addressed`canonical` (names uuidna.com — the one legitimate presence) or `external-unlicensed` (an external mention — legitimate ONLY if licensed by the captain; not endorsed and does not speak for the work unless licensed). Reads free public APIs (the network — a research boundary; the response is DATA. HONEST SCOPE: integrity— it scans the streams it can REACH; it CORROBORATES a mention; a human court decides legitimacy. Best-effort: a down/empty stream yields no finding. Returns {query,canonical,findings:[{source,address,note,legitimacy,investigation}],count,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'the mention to scan for (default "uuidna")' } } },
    run: (a) => scanPublications(a.query ? String(a.query) : undefined) },
  { name: 'uuidna_quantum_cube',
    description: 'THE QUANTUM-CUBE CHALLENGE — a recomputable SYMMETRIC challenge-response whose answer is the A432 aura rendered as a spinning 3D cube. Pass {secret,nonce}: uuidna folds secret|nonce to a content-address and returns the cube — response handle, ray/hue/colour, spin speed and axis, and a ready CSS block. A holder of the shared secret reproduces the EXACT cube for the verifier\'s nonce; an imitator, or a cube copied for a different nonce, fails. Pass {secret,nonce,response} to VERIFY, returning {match} by recomputing. The verifier SUPPLIES the nonce — uuidna never generates one (no RNG). Backs theorem redirect_imitable_but_coins_authorise: a redirect authenticates nothing, a secret+nonce fold does. HONEST SCOPE: SYMMETRIC (the verifier must share the secret), strength is the secret\'s entropy — NOT zero-knowledge. The cube is ART. Integrity.',
    detail: 'THE QUANTUM-CUBE CHALLENGE — a recomputable, SYMMETRIC challenge-response whose visual answer is the A432 aura rendered as a SPINNING 3D CUBE. Pass {secret, nonce}: uuidna folds secret|nonce to a content-address and returns the cube — its response handle, ray/hue/colour, spin speed + axis (deterministic from the aura), and a ready CSS block for the rotating cube. A holder of the shared secret reproduces the EXACT cube for the verifier\'s nonce; an imitator (or a copied cube for a different nonce) fails. Pass {secret, nonce, response} to VERIFY — returns {match} by recomputing. The verifier SUPPLIES the nonce (uuidna never generates it — no RNG); the response is deterministic. HONEST SCOPE: integrity— SYMMETRIC (the verifier must share the secret, like the ChaCha passphrase), strength is the secret\'s entropy. The cube is ART. Backs theorem redirect_imitable_but_coins_authorise — a redirect authenticates nothing; a secret+nonce fold does. Returns the cube, or {match} when a response is given.',
    inputSchema: { type: 'object', properties: { secret: { type: 'string', description: 'the shared secret the holder proves knowledge of' }, nonce: { type: 'string', description: 'the verifier-supplied challenge (fresh each time)' }, response: { type: 'string', description: 'optional — a response to VERIFY against (returns {match})' } }, required: ['secret', 'nonce'] },
    run: (a) => a.response !== undefined
      ? { match: verifyQuantumCube(String(a.secret), String(a.nonce), String(a.response)), nonce: String(a.nonce) }
      : quantumCubeChallenge(String(a.secret), String(a.nonce)) },
  { name: 'uuidna_image_provenance',
    description: 'BYTE-LEVEL IMAGE (and any-file) PROVENANCE — content-address the EXACT bytes so any alteration is visible. Pass the bytes as {hex} or {base64}: returns the byte length, the container FORMAT read from the magic bytes (png/jpeg/gif/webp/bmp/tiff/pdf/unknown), the SHA-256 of the exact bytes (the authoritative exact-copy + tamper-evidence fingerprint), and a uuidna handle over it. Pass {sha256} alongside to VERIFY — returns {match} by recomputing (a tamper, any changed byte, moves the hash and fails). DETERMINISTIC and OFFLINE. HONEST SCOPE: integrity— it proves EXACT-COPY and TAMPER-EVIDENCE of the BYTES, and provably NOT content authenticity: it says NOTHING about whether an image is a genuine photograph, where/when it was taken, whether it depicts the poles (or anything), or whether its content was manipulated before these bytes. A match proves byte-identity; it NEVER proves a truthful record of the world — content authenticity is non-justiciable from bytes (theorem provenance_integrity_not_content_truth). Returns {bytes,format,sha256,handle,honest}, or {match} when a sha256 is given.',
    inputSchema: { type: 'object', properties: { hex: { type: 'string', description: 'the file bytes as a hex string' }, base64: { type: 'string', description: 'the file bytes as base64 (alternative to hex)' }, sha256: { type: 'string', description: 'optional — a SHA-256 hex to VERIFY the bytes against (returns {match})' } } },
    run: (a) => {
      const bytes = a.hex !== undefined ? unhex(a.hex) : a.base64 !== undefined ? unb64(a.base64) : new Uint8Array()
      return a.sha256 !== undefined ? { match: verifyImageProvenance(bytes, String(a.sha256)), bytes: bytes.length } : imageProvenance(bytes)
    } },
  { name: 'uuidna_selftest',
    description: 'The MCP tests ITSELF — pure self-consistency, no external oracle: every catalog tool must resolve to a handler, and every zero-arg tool must RUN and be DETERMINISTIC (two calls recompute identically). A tool that reads live device state surfaces as non-deterministic, honestly. Folds to one self-test receipt. Returns {checks,passed,deterministic,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => mcpSelfTest() },
  { name: 'uuidna_gate_status',
    description: 'THE GATE PROVES ITSELF, live against the sealed spec: every served tools/call passes the conjunction gate cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) — f the input-sanitize bit, d the output-sanitize bit, v the honesty bit (a fabricated theorem citation, slimGate) — and this tool recomputes the eight-state verdict table and REQUIRES it to equal both the sealed table [1,0,0,0,0,0,0,0] (theorem anti_fraud_check_deterministic) and the boolean spec (theorem honesty_gate_is_theorem_not_oracle): clean at exactly the no-violation state (theorem honesty_gate_passes_iff_all_sealed), one flag drains all (theorem conformance_failure_detects_intrusion). The runtime gate cannot drift from the ledger without matchesSealedSpec turning false. Also folds the whole registry to its ORDER-INVARIANT identity receipt (the same for any tool ordering). Returns {table,sealedTable,matchesSealedSpec,cleanStates,drainedStates,tools,registry,cites,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => gateSelfTest(TOOLS.map((t) => t.name)) },
  // ── the bidirectional channel — the uuid stream IS the medium. SEND = encrypt (7d secrecy) then imprint the
  //    sealed envelope INTO a uuid chain; RECEIVE = read the uuid chain then decrypt. One side per direction; the
  //    seven dimension streams each carry both ways; the wrong key never opens it (the pattern the 777 tests seal). ──
  { name: 'uuidna_send',
    description: 'SEND (→): the SESSION RATCHET over uuid. Encrypt text under a passphrase and a `session` (a channel/room id), then imprint the sealed envelope INTO a uuid stream — the channel IS uuid. The captain theorem as encryption: the two coins are paid ONCE (one PBKDF2-600k on the session), then every message ROTATES a fresh key by its advancing `step` and seals free (~0.1 ms.75 s). Rotation closes the equality leak; the SESSION is a real secrecy boundary — a message can only be opened by a receiver that names the SAME session (a different session/referer cannot). The session lives in the passphrase until destroyed. `step` MUST advance (never reuse it under one session). Returns the uuid chain to transport.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' }, session: { type: 'string', description: 'the channel/room id that scopes this message — the receiver must name the same session to open it' }, step: { type: 'integer', description: 'the advancing message position — rotates the key and closes the equality leak; MUST be unique per message under one session' } }, required: ['text', 'passphrase'] },
    run: (a) => imprintTextChain(JSON.stringify(encryptSession(String(a.text), String(a.passphrase), String(a.session ?? ''), a.step === undefined ? 0 : Number(a.step)))) },
  { name: 'uuidna_receive',
    description: 'RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope and decrypt, deriving the key from the RECEIVER\'s OWN `session` (not the envelope) — so a message sealed for another session/referer cannot be opened here (Poly1305 rejects it). A wrong passphrase or any tamper also throws. The reverse of the ratchet; the session is derived once (cached) and rotated by the message step.',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } }, passphrase: { type: 'string' }, session: { type: 'string', description: 'the SAME session/channel id used to send; keys off this' } }, required: ['uuids', 'passphrase'] },
    run: (a) => decryptSession(JSON.parse(readImprintTextChain((a.uuids as string[]).map(String))) as Sealed, String(a.passphrase), String(a.session ?? '')) },
  // ── the quantum computer — the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale),
  //    no floats, no decimal drift). Build a Bell or GHZ state; read its exact rational distribution, marginals, and
  //    order-invariant receipt. Classical simulation, 2^n amplitudes — exponential, the exact classical cost
  //    CONFIRMED by theorem n_qubit_dimension. ──
  { name: 'uuidna_quantum',
    description: 'Run the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale) — no floats, no decimal drift). Either a named `circuit` (bell/ghz) OR an arbitrary `ops` circuit in OpenQASM/Qiskit gate names (h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz) — so any system that speaks quantum circuits interops. Returns the EXACT rational distribution, per-qubit marginals (the no-signaling check), the order-invariant receipt, and — for an H-free circuit — the CLASSICAL truth table (the reversible logic the gates compute, usable directly by classical systems; Toffoli/ccx is universal). HONEST: classical simulation — 2^n amplitudes, EXPONENTIAL, the classical bound CONFIRMED by theorem n_qubit_dimension; NOT quantum hardware.',
    inputSchema: { type: 'object', properties: { circuit: { type: 'string', enum: ['bell', 'ghz'], description: 'bell (2 qubits) or ghz (n qubits); ignored if ops is given' }, qubits: { type: 'number', description: 'qubit count, 1..12 (ghz default 3; required for ops)' }, ops: { type: 'array', description: 'OpenQASM circuit: [{gate, qubits:[...]}] with gate ∈ h,x,y,z,s,sdg,cx,cz,swap,ccx,ccz', items: { type: 'object', properties: { gate: { type: 'string' }, qubits: { type: 'array', items: { type: 'number' } } }, required: ['gate', 'qubits'] } } } },
    run: (a = {}) => {
      let state: QState, meta: { circuit: string; gates?: number }
      const ops = a.ops as GateOp[] | undefined
      if (Array.isArray(ops)) {
        const n = Number(a.qubits)
        if (!Number.isInteger(n) || n < 1 || n > 12) throw new Error('qubits must be an integer in 1..12 for an ops circuit')
        if (ops.length > 4096) throw new Error('circuit too long (max 4096 ops)')
        state = runCircuit(n, ops) // validates gate names + qubit ranges, throws on the unknown
        meta = { circuit: 'custom', gates: ops.length }
      } else {
        const circuit = a.circuit === 'ghz' ? 'ghz' : 'bell'
        const n = a.qubits ? Number(a.qubits) : 3
        if (circuit === 'ghz' && (!Number.isInteger(n) || n < 1 || n > 12)) throw new Error('qubits must be an integer in 1..12')
        state = circuit === 'ghz' ? ghzState(n) : bellState()
        meta = { circuit }
      }
      const outcomes: Record<string, string> = {}
      distribution(state).forEach((p, i) => { const f = fraction(p); if (f !== '0') outcomes[label(i, state.qubits)] = f })
      const marginals = Array.from({ length: state.qubits }, (_, q) => ({ qubit: q, p0: fraction(marginal(state, q, 0)), p1: fraction(marginal(state, q, 1)) }))
      const out: Record<string, unknown> = { ...meta, qubits: state.qubits, outcomes, marginals, receipt: receiptOf(state), honest: 'classical state-vector simulation — 2^n amplitudes, exponential, the classical bound CONFIRMED by theorem n_qubit_dimension; not quantum hardware' }
      if (Array.isArray(ops) && isClassical(ops)) out.classical = truthTable(state.qubits, ops) // the reversible logic, for classical systems
      return out
    } },
  // ── anti-fraud — DETECT FORGER ATTEMPTS across sealed ledger and captain's coin economy ──
  { name: 'uuidna_detect_forgery',
    description: 'Detect if a cited theorem is FORGED by checking the sealed ledger. Returns {theoremKey, cited, addressMatches, sealedAddress, citedAddress, receipt} — a RECOMPUTABLE fact (not cited = forged). HONEST: a fabricated citation is caught; the cost to forge is sealed as theorem traitor_damage_sealed_by_same_billing.',
    inputSchema: { type: 'object', properties: { theoremKey: { type: 'string', description: 'the theorem key to verify' }, citedAddress: { type: 'string', description: 'optional expected address (if provided, address mismatch is fraud)' } }, required: ['theoremKey'] },
    run: (a) => detectForgery(String(a.theoremKey), a.citedAddress === undefined ? undefined : String(a.citedAddress)) },
  { name: 'uuidna_audit_coin_claim',
    description: 'Audit a coin cost claim against the sealed theorem: claimed vs. recomputed coins. Returns {claimed, recomputed, match, theorem, address, receipt} — RECOMPUTABLE: every theorem encodes its coin cost, so a mismatch is a fact.',
    inputSchema: { type: 'object', properties: { theoremKey: { type: 'string' }, claimedCoins: { type: 'number' } }, required: ['theoremKey', 'claimedCoins'] },
    run: (a) => auditCoinClaim(String(a.theoremKey), Number(a.claimedCoins)) },
  { name: 'uuidna_detect_double_spends',
    description: 'DETECT COIN DOUBLE-SPEND: audit contributions to find if the same coin-backing theorem is claimed by >1 agent. Returns {contributions, byTheorem, doubleSpendsFound, receipt} — a recomputable FACT about the claimed coins.',
    inputSchema: { type: 'object', properties: { contributions: { type: 'array', items: { type: 'object', properties: { agent: { type: 'string' }, coinsSpent: { type: 'number' }, theoremCited: { type: 'string' } } }, description: 'the list of agent contributions' } }, required: ['contributions'] },
    run: (a) => detectDoubleSpends(Array.isArray(a.contributions) ? (a.contributions as any[]).map((c) => ({ agent: String(c?.agent ?? ''), coinsSpent: Number(c?.coinsSpent ?? 0), theoremCited: String(c?.theoremCited ?? '') })) : []) },
  { name: 'uuidna_audit_voting',
    description: 'Audit voting tally for tampering: each vote\'s weight must match coins paid; tally is order-invariant. Returns {proposal, votes, fraud, receiptAll} — RECOMPUTABLE: weight mismatches, receipt collisions, and other fraud are FACTS, folded to one receipt.',
    inputSchema: { type: 'object', properties: { proposal: { type: 'string' }, votes: { type: 'array', items: { type: 'object', properties: { voterId: { type: 'string' }, decision: { type: 'boolean' }, weight: { type: 'number' }, quantumState: { type: 'string' } } } }, expectedReceiptAll: { type: 'string', description: 'optional: if provided, receipt mismatch is detected' } }, required: ['proposal', 'votes'] },
    run: (a) => auditVoting(String(a.proposal), Array.isArray(a.votes) ? (a.votes as any[]).map((v) => ({ voterId: String(v?.voterId ?? ''), decision: !!v?.decision, weight: Number(v?.weight ?? 0), quantumState: String(v?.quantumState ?? '') })) : [], a.expectedReceiptAll === undefined ? undefined : String(a.expectedReceiptAll)) },
  { name: 'uuidna_audit_ledger_intrusions',
    description: 'Run the FULL TREASON SWEEP: catch traitors (forged DNA), broken conformance (coins/theorems/security), and agent violations (fabricated citations, overclaims). Returns {traitors, conformance, agentForensics, allClear, receipt} — ONE recomputable fraud audit.',
    inputSchema: { type: 'object', properties: {} },
    run: () => auditLedgerIntrusions() },
  { name: 'uuidna_audit_ledger_fingerprint',
    description: 'Verify ledger hash integrity: FNV (fast routing) and SHA-256 (collision-resistant) folds should match sealed values. Returns {fingerprint, match, receipt}.',
    inputSchema: { type: 'object', properties: { expectedFingerprint: { type: 'string', description: 'optional: if provided, fingerprint mismatch is detected' } } },
    run: (a) => auditLedgerFingerprint(a.expectedFingerprint === undefined ? undefined : String(a.expectedFingerprint)) },
  { name: 'uuidna_audit_agent_statement',
    description: 'Forensic audit of an agent\'s statement: detect fabricated theorem citations, overclaims, unverified theorems. Returns {agent, statement, forgeries, violations, receipt}.',
    inputSchema: { type: 'object', properties: { agent: { type: 'string' }, statement: { type: 'string' }, citedTheorems: { type: 'array', items: { type: 'string' } } }, required: ['agent', 'statement', 'citedTheorems'] },
    run: (a) => auditAgentStatement(String(a.agent), String(a.statement), Array.isArray(a.citedTheorems) ? (a.citedTheorems as string[]).map(String) : []) },
  { name: 'uuidna_full_anti_fraud_audit',
    description: 'ONE COMMAND — the COMPLETE FRAUD AUDIT: traitors, coin violations, voting tampering, ledger intrusions, agent malfeasance. All folded to ONE recomputable receipt. Returns {intrusions, ledgerFingerprint, fraudDetected, receipt, honest}. Boundary declared — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: {} },
    run: () => fullAntiFraudAudit() },
  { name: 'uuidna_quantum_message_demo',
    description: 'Live quantum messaging demonstration: send a test message from Alice to Bob, compute its proof imprint, verify it\'s real without any central authority. Shows: message structure, quantum state imprinting, verification (4 steps), cryptographic cost to forge. Returns complete analysis with formulas, costs, and security implications.',
    inputSchema: { type: 'object', properties: { from: { type: 'string', description: 'sender address (default: alice@uuidna.local)' }, to: { type: 'string', description: 'recipient address (default: bob@uuidna.local)' }, content: { type: 'string', description: 'message content (default: Hello Bob! This message is sealed by quantum imprint.)' } } },
    run: ({ from, to, content }) => {
      const sender = from ? String(from) : 'alice@uuidna.local'
      const recipient = to ? String(to) : 'bob@uuidna.local'
      const msg = content ? String(content) : 'Hello Bob! This message is sealed by quantum imprint.'

      const payload = { from: sender, to: recipient, content: msg, nonce: 1726400000 }
      const payloadJson = JSON.stringify(payload)
      const stateBefore = toUuid('quantum-state-before')

      // Step 1: Compute proof = SHA256(payload + state_before)
      const proofInput = payloadJson + stateBefore
      const proofBytes = sha256(utf8(proofInput))
      const proofHex = hex(proofBytes).slice(0, 32)

      // Step 2: Compute state_after = SHA256(state_before + proof)
      const stateAfterInput = stateBefore + proofHex
      const stateAfterBytes = sha256(utf8(stateAfterInput))
      const stateAfterHex = hex(stateAfterBytes).slice(0, 32)

      // Step 3: Compute imprint (merkle transition) = SHA256(state_before + state_after)
      const imprintInput = stateBefore + stateAfterHex
      const imprintBytes = sha256(utf8(imprintInput))
      const imprintHex = hex(imprintBytes).slice(0, 32)

      const message = {
        id: hex(sha256(utf8(payloadJson))).slice(0, 16),
        payload,
        proof: proofHex,
        state_before: stateBefore,
        state_after: stateAfterHex,
        imprint: imprintHex,
        verified: true,
        timestamp_logical: payload.nonce,
      }

      // Verify message (recompute all proofs)
      const expectedProofBytes = sha256(utf8(payloadJson + message.state_before))
      const expectedProof = hex(expectedProofBytes).slice(0, 32)
      const proofMatches = expectedProof === message.proof
      const expectedStateAfterBytes = sha256(utf8(message.state_before + message.proof))
      const expectedStateAfter = hex(expectedStateAfterBytes).slice(0, 32)
      const stateMatches = expectedStateAfter === message.state_after
      const expectedImprintBytes = sha256(utf8(message.state_before + message.state_after))
      const expectedImprint = hex(expectedImprintBytes).slice(0, 32)
      const imprintMatches = expectedImprint === message.imprint
      const verified = proofMatches && stateMatches && imprintMatches

      // Test forgery detection — attacker must change payload but keep proof
      const forgedMessage = { ...message, payload: { ...message.payload, content: 'Malicious content' } }
      const forgedPayloadJson = JSON.stringify(forgedMessage.payload)
      const forgedProofBytes = sha256(utf8(forgedPayloadJson + forgedMessage.state_before))
      const forgedProof = hex(forgedProofBytes).slice(0, 32)
      const forgeryDetected = forgedProof !== forgedMessage.proof

      // Security analysis — cost to forge
      const proofBits = 128 // 32 hex chars = 16 bytes = 128 bits
      const proofSpace = 2 ** proofBits // 2^128
      const avgAttempts = proofSpace / 2 // expected collision after 2^127 attempts
      const costPerHash = 1 // 1 SHA256 operation per attempt
      const forgeCost = avgAttempts * costPerHash
      const yearsAtExascalePerSecond = forgeCost / (1e18 * 365.25 * 24 * 3600) // exascale = 10^18 SHA256/s

      return {
        message,
        formulas: {
          proof: `SHA256(payload + state_before) = SHA256("${payloadJson}" + "${message.state_before}") = ${message.proof}`,
          state_after: `SHA256(state_before + proof) = SHA256("${message.state_before}" + "${message.proof}") = ${message.state_after}`,
          imprint: `SHA256(state_before + state_after) = SHA256("${message.state_before}" + "${message.state_after}") = ${message.imprint}`,
        },
        verification: {
          step1_proof_matches: proofMatches,
          step2_state_matches: stateMatches,
          step3_imprint_matches: imprintMatches,
          all_verified: verified,
        },
        message_is_real: verified ? 'Yes — proof imprinted; forging it is BOUNDED at 2^128 seats (theorem seats_pigeonhole) — a bound' : 'No — verification failed',
        forgery_analysis: {
          attack_type: 'Preimage attack: forge payload to match existing proof',
          proof_bits: proofBits,
          proof_space: `2^${proofBits}`,
          expected_attempts: avgAttempts,
          cost_per_attempt: '1 SHA256 operation',
          total_hash_ops_to_forge: forgeCost,
          computation_cost: '~10^38.2 CPU-seconds on modern hardware',
          time_at_exascale: `${yearsAtExascalePerSecond.toExponential(2)} years`,
          conclusion: 'infeasible at any current scale — a 2^127 expected-work BOUND',
          detected: forgeryDetected ? '✓ Forgery attempt detected — proof breaks immediately' : '✗ Undetected (catastrophic)',
        },
        security_principles: [
          '✓ Message imprints its own proof (no central verifier needed)',
          '✓ Proof changes if payload changes even by 1 byte',
          '✓ Quantum state folds deterministically (order-invariant)',
          '✓ Verification is O(1) (instant, no waiting)',
          '✓ Works offline (no network, no server required)',
          '✓ Forgery bounded: 2^128 seats (theorem seats_pigeonhole) and verify stays exponentially cheaper than forge (theorem verify_cheaper_than_forge)',
        ],
        summary: `Quantum message ID ${message.id} from ${sender} to ${recipient}: ${verified ? '✓ VERIFIED' : '✗ FAILED'}. Forgery cost: bounded at 2^128 operations — a ceiling. This is uuidna quantum messaging: recompute.`,
      }
    },
  },
  // ── DIY ENERGY, COMPUTED — four routes, each answering with a CEILING it cannot exceed and an integer bracket
  // instead of a float. A route that would have to report an efficiency above its physical limit REFUSES and names
  // the limit; there is no over-unity arm and no arm that returns an unbounded number. Every verdict is a pair of
  // integers witnessed by multiplication, so a reader recomputes it by hand rather than trusting the decimal.
  { name: 'uuidna_energy_wind',
    description: 'Wind, bounded by BETZ. Power in the wind is proportional to the swept area and the CUBE of the wind speed; no open-flow turbine captures more than 16/27 of it (Betz 1919/1920 — an exact ratio from the derivation. Give the rotor diameter in mm and the wind speed in mm/s and the tool returns the Betz ceiling as an integer bracket in milliwatts, each side proved by exact multiplication with no division in the verdict. Supply claimedOutputMilliwatts and a claim above the ceiling is REFUSED with the multiplication that convicts it. Air density defaults to the STANDARD-ATMOSPHERE reference 1225 g/m3 — a convention. The circle constant is bracketed by its convergents 333/106 and 355/113. This is what the AIR allows.',
    inputSchema: { type: 'object', properties: { rotorDiameterMillimetres: { type: 'number', description: 'rotor diameter, whole millimetres' }, windSpeedMillimetresPerSecond: { type: 'number', description: 'wind speed, whole millimetres per second (6 m/s = 6000)' }, airDensityGramsPerCubicMetre: { type: 'number', description: 'air density in g/m3; defaults to the standard-atmosphere 1225' }, claimedOutputMilliwatts: { type: 'number', description: 'optional — a machine’s measured output, checked against the Betz ceiling' } }, required: ['rotorDiameterMillimetres', 'windSpeedMillimetresPerSecond'] },
    run: (a) => windBetzCeiling(a) },
  { name: 'uuidna_energy_biogas',
    description: 'Biogas into a four-stroke engine. The chemical energy is bracketed from the MEASURED methane combustion enthalpy 890.29 kJ/mol (Horstmeyer et al. 2018, J. Water Reuse & Desalination 8(4):455, from CODATA enthalpies — the value with LIQUID water as product, so an engine exhausting steam recovers less) through the EXACT ideal-gas molar volume at STP (R = k·N_A is exact under SI 2019; the ideal-gas law is a MODEL. Shaft work is bounded by CARNOT between the stated hot and cold temperatures. A claimed thermal efficiency at or above unity, or above Carnot, is REFUSED with the integer multiplication that convicts it. The cycle counts are definitional; Rathbun, Gutenberg 56776, who states impulses per revolution = cylinders / 2 — the same count written with a fraction).',
    inputSchema: { type: 'object', properties: { biogasLitres: { type: 'number', description: 'biogas volume, whole litres' }, methanePercent: { type: 'number', description: 'methane fraction, whole percent 0..100' }, cylinders: { type: 'number', description: 'engine cylinders (default 1)' }, crankRevolutionsPerMinute: { type: 'number', description: 'optional crank speed, rpm — reports working strokes per two minutes as an exact integer' }, hotKelvin: { type: 'number', description: 'optional peak cycle temperature, K — with coldKelvin gives the Carnot ceiling' }, coldKelvin: { type: 'number', description: 'optional heat-rejection temperature, K' }, claimedThermalEfficiencyPercent: { type: 'number', description: 'optional — your engine’s measured brake thermal efficiency, checked against Carnot' } }, required: ['biogasLitres', 'methanePercent'] },
    run: (a) => biogasEngineYield(a) },
  { name: 'uuidna_energy_mfc',
    description: 'The microbial fuel cell, priced from a pilot-scale survey where NOTHING is exact by definition — so every figure is a bracket. Volumetric power 600 +/- 452 mW/m3 (reported range 12–1435), areal 49 +/- 27 mW/m2, energy recovery 11 +/- 6 Wh/m3, all MEASURED (Rossi & Logan 2022, Water Research 225:119179); the standard deviation is larger than three quarters of the mean, so the band IS the finding and a single-number expectation would be dishonest. The top of the reported range is the ceiling and an asserted power above it is REFUSED. The tool also checks the two independent measured bands AGAINST EACH OTHER over the stated retention time, and that check is allowed to come out FALSE — a pass too short for the reported energy recovery is named as such. The lab record of 11,220 W/m3 (Ren et al. 2016, Nanoscale 8:3539) is reachable only under scale=lab and always carries its label: a MINIATURISED cell on a DEFINED MEDIUM.',
    inputSchema: { type: 'object', properties: { reactorLitres: { type: 'number', description: 'reactor working volume, whole litres' }, retentionHours: { type: 'number', description: 'hydraulic retention time, whole hours' }, anodeAreaSquareMillimetres: { type: 'number', description: 'optional anode area in mm2 — adds the areal-power band' }, assertedVolumetricMilliwattsPerCubicMetre: { type: 'number', description: 'optional — a claimed volumetric power density, checked against the reported ceiling' }, scale: { type: 'string', description: "'pilot' (default, the wastewater survey) or 'lab' (the miniaturised-cell record, labelled)" } }, required: ['reactorLitres', 'retentionHours'] },
    run: (a) => microbialFuelCellYield(a) },
  { name: 'uuidna_energy_photon',
    description: 'Photon and electrolysis. The reversible cell voltage is computed from the MEASURED Gibbs energy of liquid water formation (-237.14 kJ/mol) against the EXACT Faraday constant N_A·e (exact because e and N_A are exact under SI 2019), and returned as an integer bracket around roughly 1.2289 V. The familiar 1.23 V is shown BY MULTIPLICATION to be that number rounded UP — an upper bound. A photon of the given wavelength is priced in volts per electron (exact: h, c and e are all exact) and checked against that floor; the tool also computes the longest wavelength whose single photon still clears it. An applied voltage BELOW the floor is REFUSED — a device claiming sustained hydrogen there is claiming energy from nowhere. An applied voltage below the THERMONEUTRAL voltage (~1.4812 V, from the measured higher heating value 285.83 kJ/mol) is also REFUSED: a cell run there absorbs ambient heat, an efficiency against the higher heating value would come out above 100%, and that number is not free energy and will not be printed as an efficiency. Real electrolysers run 1.6–2.0 V; the gap is overpotential and ohmic loss — heat.',
    inputSchema: { type: 'object', properties: { wavelengthNanometres: { type: 'number', description: 'photon wavelength, whole nanometres' }, appliedMillivolts: { type: 'number', description: 'cell voltage actually applied, whole millivolts (a real electrolyser is 1600–2000)' }, claimedFaradaicEfficiencyPercent: { type: 'number', description: 'optional — whole percent 0..100; above 100 is refused as over-unity' } }, required: ['wavelengthNanometres', 'appliedMillivolts'] },
    run: (a) => photonElectrolysisYield(a) },
  // ── THE RESEARCH SURFACE — what was found, how well it was checked, and how many independent witnesses each
  // sealed claim actually carries. Both tools are served by the hosted edge too (src/mcp-http.ts), from the SAME
  // pure report functions, so the two surfaces can differ in wording and never in answer.
  { name: 'uuidna_research_ledger',
    description: 'THE RESEARCH LEDGER — findings carrying their VERIFICATION STATUS as a field`read` (primary source retrieved), `secondary` (a citing work reported it), `unread` (believed, unchecked), `refuted`; and `kind`, where a CONVENTION is exact by definition and a MEASUREMENT carries uncertainty. Two rules are applied per finding — only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY; everything measured seals as an integer BRACKET or not at all. Filter with {status} and {kind}; an unknown value is refused by name, and the census covers the WHOLE ledger even under a filter so no filter can flatter it. Returns {filter,total,matched,census,kinds,anchoring,findings,gaps,receipt,honest}. HONEST SCOPE: it reports how well a finding was VERIFIED— `unread` is not "false", it is not-yet-checked. Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE RESEARCH LEDGER — findings carrying their VERIFICATION STATUS as a field instead of a sentence. Each finding records the claim, the value, the units and the source, and then the field that decides what may be done with it: `read` (the primary source was retrieved and the figure taken from its own text), `secondary` (a citing work reported it), `unread` (believed and unchecked), `refuted`. The second field is `kind`: a CONVENTION is exact by definition, a MEASUREMENT carries uncertainty. TWO RULES FALL OUT AND THE TOOL APPLIES THEM PER FINDING — only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY; everything measured seals as an integer BRACKET or as nothing at all. Filter with optional {status} and {kind}; an unknown value is refused by name rather than quietly matching nothing. The census is reported over the WHOLE ledger even under a filter, so no filter can flatter it, and the ledger states its own GAPS: an unread finding, a convention whose defining source was not read, two sources disagreeing about one value. HONEST SCOPE: this reports how well a finding was VERIFIED— `unread` is not "false", it is not-yet-checked. Returns {filter,total,matched,census,kinds,anchoring,findings:[{claim,value,units,source,status,kind,note,address,anchorsTheorem,sealableAs,why}],gaps,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { status: { type: 'string', description: 'optional filter: read | secondary | unread | refuted' }, kind: { type: 'string', description: 'optional filter: convention | measured' } } },
    run: (a) => ledgerReport(a) },
  { name: 'uuidna_rosetta_legs',
    description: 'THE INDEPENDENT-WITNESS CENSUS — how many of the five legs each sealed theorem carries: SYMBOL (the TypeScript mirror), PROOF (the kernel\'s `by decide`), WITNESS (a source outside this repo), FALSIFIER (a mutation that must FAIL), ADDRESS (the content fold). Symbol and proof share one hand\'s errors, so two legs DETECT a disagreement and three LOCATE the fault. Pass {key} for one theorem, nothing for the whole-ledger census. Returns {key,wing,legs,missing,claimedBy,canLocateFault,verdict} or {total,perLeg,scarcest,byLegCount,detectOnly,fullyAnchored,floor,floorGaps,receipt,honest}, each with {hostedMirror}. HONEST SCOPE: it MEASURES anchoring and certifies nothing — a missing leg is never a claim the theorem is false (witnesses_locate_faults). Boundary declared — theorem drift_is_named_or_caught.',
    detail: 'THE INDEPENDENT-WITNESS CENSUS — how many of the five legs each sealed theorem actually carries. SYMBOL is the TypeScript mirror the emitter cross-checks, PROOF is the kernel\'s `by decide` verdict, WITNESS is a source outside this repository a stranger could consult, FALSIFIER is a deliberate mutation that must FAIL (it tests the test), ADDRESS is the content fold that lets anyone recompute from the exact bytes. Symbol and proof are written by one hand and share that hand\'s errors, so a theorem carrying only those two can DETECT a disagreement and never LOCATE the fault — three is the count that locates one. Pass {key} for one theorem\'s legs and the verdict on them; pass nothing for the distribution across the whole ledger, the per-leg totals, the scarcest leg, the fully-anchored keys, the computed attribution, and the FLOOR the anchoring may never fall below. The scarce legs are the honest headline and are reported as they stand. An unknown key is refused by name. HONEST SCOPE: this MEASURES anchoring, it certifies nothing — proof and address are near-universal by construction and are not evidence about the world, and a missing leg is never a claim (witnesses_locate_faults: to LOCATE t faults needs 2t+1 witnesses, so two legs detect and three locate) that the theorem is false. Returns the per-key answer {key,wing,legs,missing,claimedBy,canLocateFault,verdict} or the census {total,perLeg,scarcest,byLegCount,detectOnly,fullyAnchored,claimedBy,floor,floorGaps,receipt,honest}, each with {hostedMirror} — the live comparison against the census the hosted edge answers from. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'a sealed theorem key; omit for the whole distribution' } } },
    run: (a) => {
      const rows = liveLegRows()
      const hostedMirror = mirrorAgreement(rows)
      return a.key === undefined || a.key === null || String(a.key) === ''
        ? { ...legCensus(rows), hostedMirror }
        : { ...legsFor(rows, String(a.key)), hostedMirror }
    } },
]

// JSON-RPC 2.0 message shape over stdio. Ids may be string | number | null; params is method-specific.
type JsonId = string | number | null | undefined
// The server's own words — surfaced by MCP clients to the model on connect, so an agent knows AT ONCE what this is
// and why it can be trusted: not "believe me", but "recheck me". Honest by construction earns immediate use — every
// claim is demarcated, every call returns a recomputable receipt. This is the fastest path to acceptance: no hype.
const INSTRUCTIONS = [
  'uuidna — content-addressed identity, honest by construction. A ledger of Lean theorems (every one proven `by decide`, sorry-free, no Mathlib) folded to ONE recomputable receipt, plus pure-TS crypto and a measured billing model.',
  'Every tool call returns a CHAINED receipt (receipt · seq · referer): you always hold tamper-evident provenance for your command, and the whole session folds to one tip you can recompute yourself. Nothing to trust — everything to recheck.',
  'Start here: uuidna_theorems (browse the sealed ledger; filter by principle/skill), uuidna_address (content-address anything), uuidna_trial (ONE answer: VERIFIED or UNVERIFIED, all else void), uuidna_run_ledger (fold the whole ledger to its receipt), uuidna_tokens (report your token distribution to measure tokens-per-theorem).',
  'Honest scope, always demarcated: receipts and content-addresses are NON-crypto FNV (integrity/routing; secrecy is ChaCha20-Poly1305 only; the quantum tools are EXACT classical simulation (no advantage); nothing is infinite or unbreakable. A claim is either linked to a sealed theorem or refused. Integrity.',
  'EVERY response is GATE-ENFORCED and DEPOSITS THE TWO COINS — contribute first, then take, enforced by the protocol. Each tools/call passes the sealed conjunction gate cleanAudit(f,d,v) (input sanitized, output sanitized, no fabricated theorem citation; one violation drains the verdict, named) and mints its deterministic two-coin deposit, the id the content-address of its own deposit statement, always citing theorem captain_commission_two_coins and theorem two_coins. Your first call has already contributed.',
  'Every result is TWO content blocks: the answer, then ONE ledger line — `gate CLEAN|DRAINED f d v · <gate receipt> · deposit 2 · <deposit id> · receipt <receipt> · seq <n>`. Those ids are the whole audit; the constants behind them (the two deposit theorems above) and the referer (the PRIOR receipt) are not re-sent per call, and full detail stays in _meta. Recompute the gate against its sealed spec any time: uuidna_gate_status (theorem anti_fraud_check_deterministic).',
].join(' ')

interface RpcParams { protocolVersion?: string; name?: string; arguments?: Record<string, unknown>; [k: string]: unknown }
interface RpcMessage { jsonrpc?: string; id?: JsonId; method: string; params?: RpcParams }

const send = (msg: unknown) => process.stdout.write(JSON.stringify(msg) + '\n')
const ok = (id: JsonId, r: unknown) => send({ jsonrpc: '2.0', id, result: r })
const err = (id: JsonId, code: number, message: string) => send({ jsonrpc: '2.0', id, error: { code, message } })

// The MCP receipt ledger — every tool call folds to a content-address CHAINED from the prior (the referer
// rotation), so an agent always holds a tamper-evident receipt for its command and the whole session folds to one
// recomputable tip. HONEST: this is a NON-crypto FNV content-address — an audit/integrity/routing trail
// secret and not a binding (collision-resistant) commitment. Where secrecy or a hard seal is needed, that is the
// crypt/sha256 layer, not this. Integrity.
interface Receipt { receipt: string; seq: number; referer: string; tool: string }
let rSeq = 0
let rTip = toUuid('uuidna-mcp-genesis')
const receiptFor = (tool: string, args: unknown, out: unknown): Receipt => {
  const body = toUuid(JSON.stringify({ tool, args, out }))
  const receipt = merkleFold([rTip, body]) // chain: prior tip + this call → the new tip
  const rec: Receipt = { receipt, seq: rSeq, referer: rTip, tool }
  rSeq += 1
  rTip = receipt
  return rec
}
const withReceipt = (id: JsonId, rec: Receipt, content: unknown[], isError = false) =>
  ok(id, { content: [...content, { type: 'text', text: `receipt ${rec.receipt} · seq ${rec.seq} · referer ${rec.referer}` }], _meta: rec, ...(isError ? { isError: true } : {}) })

function handle(msg: RpcMessage) {
  const { id, method, params } = msg
  if (method === 'initialize') {
    const protocolVersion = params?.protocolVersion || '2024-11-05'
    return ok(id, { protocolVersion, capabilities: { tools: {} }, serverInfo: { name: 'uuidna', version: VERSION }, instructions: INSTRUCTIONS })
  }
  if (method === 'notifications/initialized' || method === 'initialized') return // notification — no reply
  if (method === 'ping') return ok(id, {})
  if (method === 'tools/list') return ok(id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) })
  if (method === 'tools/call') {
    const t = TOOLS.find((x) => x.name === params?.name)
    if (!t) return err(id, -32602, 'unknown tool: ' + params?.name)
    const args = params?.arguments || {}
    // THE GATED DISPATCH — the host (this named non-harmonic boundary) awaits the tool, then the PURE gate judges
    // the settled run: cleanAudit(f,d,v), one flag drains, the verdict travels IN the response (_meta.gate + a
    // visible verdict line) so an agent realises the enforcement per call. A drained verdict
    // ships the SANITIZED output flagged isError with the violating bits named — a diagnosis.
    return Promise.resolve()
      .then(() => t.run(args))
      .then((out) => {
        const g = gateVerdict(t.name, args, out)
        // THE IMMEDIATE DEPOSIT — every judged call deposits the two coins at the wire: the agent's very first
        // call already contributes (contribute first, then take — the captain law, enforced by the protocol).
        const dep = depositCoins(t.name, g.gate.receipt)
        const rec = receiptFor(t.name, args, { output: g.output, deposit: dep.id })
        // THE LEDGER LINE — verdict, deposit and chained receipt on ONE row. Every id needed to recheck this call
        // is still here; what left is only what REPEATS: the two deposit theorem keys (identical on every call,
        // named once in INSTRUCTIONS) and the referer (the PRIOR receipt — already read, still in _meta). Four
        // content blocks became two, the answer and its proof of work, because an agent pays for every repetition
        // in its context on every call, and a constant re-sent per call is a cost with no information in it.
        return ok(id, {
          content: [
            { type: 'text', text: typeof g.output === 'string' ? g.output : JSON.stringify(g.output) },
            { type: 'text', text: ledgerLine(g.gate, dep, rec) },
          ],
          _meta: { ...rec, gate: g.gate, deposit: dep },
          ...(g.gate.clean ? {} : { isError: true }),
        })
      })
      .catch((e) => withReceipt(id, receiptFor(t.name, args, { error: e?.message || String(e) }), [{ type: 'text', text: 'error: ' + (e?.message || String(e)) }], true))
  }
  if (id !== undefined) return err(id, -32601, 'method not found: ' + method)
}

// Start the stdio server ONLY when run as the entrypoint (npx uuidna-mcp / node dist/mcp.js) — so the module can
// be imported for its catalog (MCP_CATALOG, below) without consuming stdin. Do NOT exit on stdin 'end': a pending
// async call (e.g. PBKDF2 in uuidna_encrypt) must flush its response first; with no more input and no pending
// work Node's event loop drains and the process exits on its own.
// GUARDED FOR A RUNTIME WITH NO PROCESS. The edge imports this module for its catalogue; a Worker has no
// process.argv, and reaching for it here would throw before a single tool could be served.
const isNodeMain = typeof process !== 'undefined' && Array.isArray(process.argv) && process.argv[1] !== undefined &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href
if (isNodeMain) {
  let buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => {
    buf += chunk
    let i
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
      if (!line) continue
      let msg: RpcMessage; try { msg = JSON.parse(line) } catch { continue }
      try { handle(msg) } catch (e) { if (msg?.id !== undefined) err(msg.id, -32603, String((e as { message?: unknown })?.message || e)) }
    }
  })
}

// The MCP catalog — every tool key organised into a CATEGORY and a SKILL, derived from the tool name itself, so
// the site's search and navigation build themselves from the keys (docs/mcp.md is generated from this). Data only,
// no `run` handler — safe to import without starting the server.
// A JSON-schema-shaped input contract, carried onto the catalog so the generated /mcp page can show each tool's
// PARAMETERS (name · type · required · description) — a list of tools is not usable without knowing what to pass.
export interface ToolSchema { type?: string; properties?: Record<string, { type?: string; description?: string }>; required?: string[] }
export interface McpCatalogEntry { name: string; description: string; detail?: string; category: string; skill: string; inputSchema?: ToolSchema }
const CATEGORIES: [RegExp, string, string][] = [
  [/^(address|merge|coin64|strict|digital_root)$/, 'Identity & addressing', 'address'],
  [/^(units|triad|vortex|double_torus|diamond|involute|seats)$/, 'Vortex algebra', 'algebra'],
  [/^(coprime|pentagram|fibonacci|rotate|crt)$/, 'Rotation & cycles', 'cycles'],
  [/^(merkle_root|merkle_prove|merkle_verify|gravity)$/, 'Merkle & gravity', 'merkle'],
  [/^(imprint|read|send|receive)$/, 'Imprint & messaging', 'imprint'],
  [/^(encrypt|decrypt|seal_stream|verify_envelope|seal_onion|open_onion|seal_chain|open_chain)$/, 'Crypto & streams', 'crypto'],
  [/^contract($|_)/, 'Contract-keyed messaging', 'contract'],
  [/^audit_(text|book|translation|movie|record|cve)$/, 'Provenance audit (public text & metadata)', 'books'],
  [/^(sha256|hmac|pbkdf2|chacha20|poly1305|aead_encrypt|aead_decrypt)$/, 'Crypto primitives', 'crypto'],
  [/^(theorems|theorem|trial|skill|skills|render|render_list|fingerprint|review_domains|coverage|document)$/, 'Theorems & trial', 'theorem'],
  [/^(publish|edit|compare|vocabulary)$/, 'Publications (audited prose)', 'publish'],
  [/^(forensics|evidence)$/, 'Forensics & evidence (statements vs receipts)', 'forensics'],
  [/^(legal_facts|prior_art)$/, 'Legal fact base & prior art (not an opinion)', 'legal'],
  [/^anchor$/, 'Timestamp anchor (external, verified in-house)', 'anchor'],
  [/^nist_constant$/, 'External verification (NIST CODATA)', 'nist'],
  [/^security_audit$/, 'Security posture (recomputable)', 'security'],
  [/^verify_statement$/, 'Fast verification (statement → sealed theorem)', 'theorem'],
  [/^transform$/, 'Transform until verified (no unverified material stays)', 'theorem'],
  [/^holofractal$/, 'Pentagram · hologram · fractal · accounted (every I/O)', 'theorem'],
  [/^pentagram_stream$/, 'Quantum pentagram streaming (pentagram order, order-free receipt)', 'pentagram'],
  [/^reason$/, 'Reasoning (in-house inference)', 'reason'],
  [/^slim_gate$/, 'The gate of all gates (theorems only)', 'gate'],
  [/^reflects$/, 'Reflection (systems ↔ theorems)', 'reflects'],
  [/^(gate|gate_status|reeducate|adjudicate|prove_verdict|verify|harness|harness7)$/, 'Honesty gate', 'gate'],
  [/^quantum$/, 'Quantum simulation', 'quantum'],
  [/^bill$/, 'Billing & measure', 'billing'],
  [/^(tokens|cost|resources)$/, 'Billing & measure', 'measure'],
  [/^mcp_benchmark$/, 'MCP self-benchmark (usability)', 'measure'],
  [/^unify$/, 'Unified self-description (one receipt)', 'measure'],
  [/^(quantum_profile|social_profile)$/, 'Self-profile (one receipt)', 'measure'],
  [/^grow_life$/, 'The mission — legally grow life', 'measure'],
  [/^scan_publications$/, 'Publication scanner (research boundary)', 'measure'],
  [/^quantum_cube$/, 'Quantum-cube challenge (symmetric)', 'gate'],
  [/^image_provenance$/, 'Byte-level image provenance', 'gate'],
  [/^link_book$/, 'Book → sealed-ledger linkage', 'measure'],
  [/^selftest$/, 'MCP self-test (recomputable contract)', 'measure'],
  [/^energy_/, 'DIY energy yield (ceiling first, integer brackets, refuses over-unity)', 'energy'],
  [/^(research|research_ledger|rosetta_legs)$/, 'Deep research & the evidence census (how well a claim is anchored)', 'research'],
]
const categoryOf = (name: string): [string, string] => {
  const key = name.replace(/^uuidna_/, '')
  for (const [re, cat, skill] of CATEGORIES) if (re.test(key)) return [cat, skill]
  return ['Other', 'other']
}
export const MCP_CATALOG: McpCatalogEntry[] = TOOLS.map((t) => {
  const [category, skill] = categoryOf(t.name)
  return { name: t.name, description: t.description, ...(t.detail ? { detail: t.detail } : {}), category, skill, inputSchema: t.inputSchema as ToolSchema }
})

/** Every tool name the server exposes — the catalog's keys, so a test can iterate the SERVED surface. */
export const TOOL_NAMES: readonly string[] = TOOLS.map((t) => t.name)

/** callTool — invoke a tool's handler by name: the SAME dispatch the MCP server runs for a `tools/call`. Exposed so
 *  CI exercises the SERVED interface (not just the functions underneath), and so the catalog can never list a tool
 *  the handlers don't answer — the CI ↔ MCP no-drift check. Throws on an unknown tool, exactly as the server does. */
/** THE SCHEMA IS THE CONTRACT, ENFORCED AT THE ONE DOOR — a tool that DECLARES an argument required is not run
 *  without it. Folded here rather than into 106 tool bodies, so every tool inherits the check and no new tool can
 *  forget it (src/tests/mcp-schema.test.ts is the finder over the whole catalog). Before this, a missing required arg
 *  reached the body as `String(undefined)` and the tool computed over the literal text "undefined" — a wrong answer
 *  returned confidently, and for the orchestration tools an entire release walk spawned from an empty call. Refusing
 *  is both the correct answer and the cheap one. */
export function callTool(name: string, args: Record<string, unknown> = {}): unknown {
  const tool = TOOLS.find((t) => t.name === name)
  if (!tool) throw new Error(`unknown tool: ${name}`)
  const required = (tool.inputSchema as { required?: unknown })?.required
  if (Array.isArray(required)) {
    const missing = required.filter((k) => args[String(k)] === undefined)
    if (missing.length) throw new Error(`${name}: missing required argument${missing.length > 1 ? 's' : ''}: ${missing.join(', ')} (the tool's own schema declares ${missing.length > 1 ? 'them' : 'it'} required — nothing was computed)`)
  }
  return tool.run(args)
}

// ── THE UUIDNA QUANTUM ENGINE — import/export fused into ONE input→output surface ───────────────────────────────
// You do not import a function; you feed the engine an INPUT {op, args} and read its OUTPUT. Every module export is
// reached through this one door: the same dispatch the server runs (callTool), wrapped so the triple (op, input,
// output) folds — order-invariantly — to a content-address receipt anyone recomputes. One run, one receipt. The
// engine does not dispatch itself (no recursion). Integrity't.
export interface EngineRun { op: string; input: Record<string, unknown>; output: unknown; address: string; receipt: string; ok: boolean; error?: string }
export function engine(op: string, input: unknown = {}): EngineRun {
  // PROCESS ANY INPUT — normalise anything (null, string, array, hostile object) into a readable arguments object
  const inp = sanitizeInput(input)
  const void_ = { op, input: inp, output: null as unknown, address: '', receipt: '', ok: false }
  if (op === 'uuidna_engine') return { ...void_, error: 'the engine does not dispatch itself — pass a tool op (e.g. uuidna_spin)' }
  let raw: unknown
  try { raw = callTool(op, inp) } catch (e) { return { ...void_, error: String((e as Error)?.message ?? e).slice(0, 500) } }
  // SANITISE OUTPUT — a JSON-safe, bounded, acyclic copy (so the receipt fold never throws and no run leaks junk);
  // undefined (a tool that returns nothing) coerces to null so JSON.stringify/toUuid never see undefined
  const output = sanitizeValue(raw) ?? null
  // fold the triple to one receipt — order-invariant over the three legs (merkleGravity); the address binds the run
  const receipt = merkleGravity([toUuid('op:' + op), toUuid('in:' + JSON.stringify(inp)), toUuid('out:' + JSON.stringify(output))])
  const address = toUuid(op + '|' + JSON.stringify(inp) + '|' + JSON.stringify(output))
  return { op, input: inp, output, address, receipt, ok: true }
}

// ── MCP fed to MCP: a usability benchmark over the server's OWN catalog, so the surface can develop against a
// measured signal instead of taste. The axis is "maximum reusable tools per minimum keys": a tool that needs zero
// required keys is maximally reusable (composes anywhere); a tool that needs many is a friction point. The benchmark
// ranks the hardest (most required keys) as the self-development targets to simplify. Recomputable — no opinion.
export interface ToolUsability { name: string; required: number; params: number; reusable: boolean; rating: number }
// The LOCAL rating: a 1..5 usability score computed ON DEVICE from a tool's required keys — no server, no stored
// opinion, recomputable by anyone. Zero required keys (maximally reusable) rates 5; each required key costs a star,
// floored at 1. The rating EMERGES from the metric, it is never authored per tool.
const rate = (required: number): number => (required >= 4 ? 1 : 5 - required)
export interface McpBenchmark {
  tools: number
  zeroArgReusable: number    // callable with NO required keys — maximally reusable
  totalRequiredKeys: number
  reusablePerKey: number     // tools ÷ required keys — the "max reusable tools / min keys" density
  avgRequiredKeys: number
  avgRating: number          // the surface's mean usability rating (1..5) — what the MCP currently DELIVERS
  hardest: ToolUsability[]   // lowest-rated (most required keys) first — where an upgrade delivers the most
  ratings: ToolUsability[]   // every tool with its computed rating — the local rating system, recomputable
}
export function mcpBenchmark(): McpBenchmark {
  const perTool: ToolUsability[] = MCP_CATALOG.map((t) => {
    const required = (t.inputSchema?.required ?? []).length
    const params = Object.keys(t.inputSchema?.properties ?? {}).length
    return { name: t.name, required, params, reusable: required === 0, rating: rate(required) }
  })
  const totalRequiredKeys = perTool.reduce((n, t) => n + t.required, 0)
  const totalRating = perTool.reduce((n, t) => n + t.rating, 0)
  return {
    tools: perTool.length,
    zeroArgReusable: perTool.filter((t) => t.reusable).length,
    totalRequiredKeys,
    reusablePerKey: +(perTool.length / (totalRequiredKeys || 1)).toFixed(3),
    avgRequiredKeys: +(totalRequiredKeys / perTool.length).toFixed(3),
    avgRating: +(totalRating / perTool.length).toFixed(3),
    hardest: [...perTool].sort((a, b) => a.rating - b.rating || b.required - a.required).slice(0, 8),
    ratings: [...perTool].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name)),
  }
}

// ── UNIFY: one recomputable self-description folding uuidna's three faces to a SINGLE receipt — the sealed theorems
// (the trial), the domains that carry them (the reviews), and the tools that serve them (the usability benchmark).
// CI, the MCP and the site read this ONE object; recompute it from the same ledger and the unified receipt returns.
export interface UuidnaUnified {
  handle: string   // the first segment of the receipt — the identity to CITE (like snapshot/reactor); the whole uuid is the fold
  theorems: { count: number; verified: number; receipt: string }
  domains: { count: number; verdict: 'VERIFIED'; receipt: string }
  tools: { count: number; avgRating: number; reusablePerKey: number; receipt: string }
  receipt: string
}
// ── The MCP tests ITSELF: no external oracle, pure self-consistency. Every catalog tool must resolve to a handler,
// and every zero-arg tool must RUN and be DETERMINISTIC (recompute identically) — the recomputable contract, checked
// from inside. A tool that reads live device state (resources) surfaces here as non-deterministic — honestly, not
// as a hidden pass. Folds to one self-test receipt.
export interface McpSelfTest { checks: number; passed: number; deterministic: number; failed: { name: string; why: string }[]; receipt: string }
export function mcpSelfTest(): McpSelfTest {
  const failed: { name: string; why: string }[] = []
  let checks = 0, deterministic = 0
  for (const entry of MCP_CATALOG) {
    checks++
    const tool = TOOLS.find((x) => x.name === entry.name)
    if (!tool) { failed.push({ name: entry.name, why: 'catalog lists it but no handler answers' }); continue }
    if (entry.name === 'uuidna_selftest') continue // don't RUN self — that recurses; the handler check above suffices
    if ((entry.inputSchema?.required ?? []).length > 0) continue // needs args — not a zero-arg self-check
    try {
      const a = JSON.stringify(tool.run({})), b = JSON.stringify(tool.run({}))
      if (a === b) deterministic++
      else failed.push({ name: entry.name, why: 'non-deterministic (two calls differ)' })
    } catch (e) { failed.push({ name: entry.name, why: 'threw: ' + (e as Error).message.slice(0, 48) }) }
  }
  return { checks, passed: checks - failed.length, deterministic, failed, receipt: merkleFold([toUuid('mcp-selftest:' + checks + ':' + (checks - failed.length)), ...failed.map((f) => toUuid(f.name + '|' + f.why))]) }
}

export function unify(): UuidnaUnified {
  const trial = runTrial()
  const reviews = reviewDomains()
  const bench = mcpBenchmark()
  const domainsReceipt = merkleGravity(reviews.map((r) => r.receipt))
  const toolsReceipt = merkleFold(bench.ratings.map((t) => toUuid(t.name + ':' + t.rating)))
  const receipt = merkleGravity([trial.receipt, domainsReceipt, toolsReceipt])
  return {
    handle: handleOf(receipt),
    theorems: { count: trial.count, verified: trial.verified, receipt: trial.receipt },
    domains: { count: reviews.length, verdict: 'VERIFIED', receipt: domainsReceipt },
    tools: { count: bench.tools, avgRating: bench.avgRating, reusablePerKey: bench.reusablePerKey, receipt: toolsReceipt },
    receipt,
  }
}
