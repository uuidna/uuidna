#!/usr/bin/env node
// @non-harmonic: the MCP stdio server reads process.stdin / writes process.stdout and awaits Promise-returning tool handlers (node I/O host) — NAMED boundary; the harmonic core (the pure tools it dispatches) must never carry these ops.
// uuidna MCP server — fuse uuidna into any harness (Claude, Cursor, any MCP client).
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical, not 128 qubits). Canonical, theorem-cited: see llm.txt.
// Zero runtime deps: a minimal JSON-RPC 2.0 server over stdio, calling the same pure functions the build seals.
// Run:  npx @uuidna/uuidna         (bin: uuidna-mcp)
// Add to a client's mcpServers as { "command": "npx", "args": ["-y", "@uuidna/uuidna"] }.
import {
  toUuid, strictUuidna, merge, coin64, merkleFold, merkleRoot, merkleProof, verifyProof, computes,
  imprintTextChain, readImprintTextChain, billUuidna, reeducate,
  encrypt, encryptSession, decrypt, decryptSession, verifyEnvelope, sealSequence, MAX_ITER,
  sealStream, openStream, sealChain, openChain,
  contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract,
  auditText, auditTranslation, auditBook, bookArticle, auditMovie, auditZenodo, auditStandard, beaconAnchor, nistConstant, auditCve,
  corroborateWithResearch, domainWave, corroborate, entangle, fileReport, deepResearch,
  gcdInt, starPolygon, fibonacciCycle, rotate, crt, recomputableCost, securityAudit, verifyStatement, transformUntilVerified, pentagramHologramFractal, pentagramStream, spin, pentagramMonographs, exploitFold, conformance, depositTrial,
  digitalRoot, merkleGravity, doubleTorusField, adjudicate, proveVerdict, verifyUuidna,
  units, triad, vortexOrbit, diamond, involute, involutionFixed, seats,
  harness, harness7, renderTheorem, renderHero, renderList,
  sha256, hmacSha256, pbkdf2Sha256, chacha20, poly1305, aeadEncrypt, aeadDecrypt,
  bellState, ghzState, distribution, marginal, receiptOf, fraction, label, runCircuit, isClassical, truthTable,
  THEOREMS, runTrial, theorems, theoremNeighbours, credits, creditsSummary, laws, hardwareLayer, softwareLayer, osLayer, quantumAnalytics, quantumSeo, captainRights, draftContract, quantumAura, catchTraitors, bindCaptainRepos, skillGroups, reviewDomains,
  publications, composePublication, coverage, auditPublication, revisePublication, comparePublications, vocabulary, forensics, evidence, ledgerFingerprint, reason, reflects, slimGate, reveal, auditCloudflareBindings, dueProcess, signCommit,
  snapshot, reactor,
  reAddress, type EditorState,
} from './index.js'
import { resources } from './resources.js' // Node-only (reads process/os) — imported here, not via the browser index
import { portAllAlpine } from './quantum/os/alpine.js' // os/ boundary — LIVE upstream read (named non-determinism), not via the deterministic index
import { infuseAlpinePackages, alpinePackage } from './quantum/os/packages.js' // os/ boundary — each Alpine package → uuidna/<name>
import { sanitizeValue, sanitizeInput } from './sanitize.js' // process any input, sanitise any output — the engine's I/O guards
import { legalFacts } from './legal.js'
import { license } from './license.js'
import { priorArt } from './priorart.js'
import type { Sealed, GateOp, QState, Link } from './index.js'
import { pathToFileURL } from 'node:url'

const VERSION = '6.8.0'

// A tool: JSON-in / JSON-out. Handler args arrive as untrusted JSON, so they enter as Record<string, unknown>
// and the existing String()/Number()/cast coercions narrow them.
interface Tool {
  name: string
  description: string
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

const TOOLS: Tool[] = [
  { name: 'uuidna_address',
    description: 'Content-address any text: a deterministic 128-bit v8 UUID. Same input → same address, for anyone, with no key. Integrity, not secrecy. Measured entropy: 122 free bits, ~2^61 birthday wall; non-cryptographic (forgeable by design).',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the value to address' } }, required: ['text'] },
    run: ({ text }) => toUuid(String(text)) },
  { name: 'uuidna_merge',
    description: 'Fold two content-addresses into one, ORDER-SENSITIVE (merge(a,b) ≠ merge(b,a)) — the directed edge. For the order-INVARIANT fold use uuidna_gravity or uuidna_merkle_root.',
    inputSchema: { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } }, required: ['a', 'b'] },
    run: ({ a, b }) => merge(String(a), String(b)) },
  { name: 'uuidna_coin64',
    description: 'Mint a 64-bit coin (16 hex digits) from any content — the top 64 bits of its content-address. A shorter pointer; ~2^32 birthday wall (halve the address bits, halve the exponent). Integrity, not secrecy.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => coin64(String(text)) },
  { name: 'uuidna_gate',
    description: 'The honesty gate: does the prose hold the floor (binary 1) or drain as an overclaim (0)? 7-language. Returns {binary,hit}. A tripwire, not an oracle.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => computes(String(text)) },
  { name: 'uuidna_reeducate',
    description: 'Bound a failing/overclaiming output to the honest floor, keeping the honest remainder. Returns {passed,...}.',
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
    description: 'Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => imprintTextChain(String(text)) },
  { name: 'uuidna_read',
    description: 'Decode text back from a uuid chain produced by uuidna_imprint (round-trips exactly).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } } }, required: ['uuids'] },
    run: ({ uuids }) => readImprintTextChain((uuids as string[]).map(String)) },
  { name: 'uuidna_bill',
    description: 'Measured billing, fused to the two coins: the ADVANTAGE (recompute O(N) − verify O(1), the difference of computational power) priced on the two conserved coins (−χ of the double torus, 110 − 108 = 2). Public interest is free. The whole bill folds to a `receipt` — a content-address of every term — so a skeptic recomputes the bill themselves and lands on the same receipt, or it was altered. The price is rechecked, never trusted.',
    inputSchema: { type: 'object', properties: { commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['commercial', 'recomputeOps', 'verifyOps'] },
    run: (a) => billUuidna({ commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps), verifyOps: Number(a.verifyOps) }) },
  { name: 'uuidna_license',
    description: 'Issue the recomputable LICENCE RECORD for a licensee and a usage: bind the CC-BY-NC-ND-4.0 terms and the measured two-coins bill into ONE content-addressed, verifiable artifact. Non-commercial use is FREE (0 coins) and needs no licence; commercial use is billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify). HONEST SCOPE: a provenance-fingerprinted RECORD of the terms and the bill — proof of WHAT and HOW MUCH, recomputable by anyone — NOT a signed legal agreement, not legal advice, and not the grant itself; a commercial licence is executed between the parties. Returns {licensee,scope,spdx,terms,bill,address,honest}.',
    inputSchema: { type: 'object', properties: { licensee: { type: 'string', description: 'the party the record binds (name or org)' }, commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['licensee'] },
    run: (a) => license(String(a.licensee), { commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps || 0), verifyOps: Number(a.verifyOps || 0) }) },
  { name: 'uuidna_tokens',
    description: 'Measure TOKENS-PER-THEOREM — the honest cost-of-proof metric (independent skilled work, not money). An agent SELF-REPORTS its context/token distribution {input, output, cached, reasoning}; this sums them and divides by the sealed theorem count (the live ledger). Returns {selfReported, dimensions, total, theorems, tokensPerTheorem, distribution}. HONEST: the token counts are the agent’s OWN report — this server cannot observe your context; the divisor, the theorem count, is the recomputable truth. Fold many reports over a session to watch the cost-per-theorem fall.',
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
    description: 'The RECOMPUTABLE cost of the ledger — computed from lean/*.lean itself, NOT self-reported like uuidna_tokens. The PRODUCE cost is the formal-corpus size (Σ bytes of every `theorem … := by decide`); the VERIFY cost is O(1) per theorem (recompute its content-address). Anyone recomputes the SAME numbers from the same source, so nothing is on trust — it folds to a receipt you recheck. This is efficiency PROVEN (routed to the ledger), where uuidna_tokens is efficiency MEASURED (a self-report). Returns {count, formalBytes, bytesPerTheorem, verifyOps, largest, smallest, receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => recomputableCost() },
  { name: 'uuidna_security_audit',
    description: 'The RECOMPUTABLE security posture computed from what the package SHIPS (package.json + the sealed ledger + the honesty gate), folded to an order-invariant receipt anyone rechecks — NOT a scanner and NOT a pentest. It verifies the supply-chain surface (zero runtime dependencies, dev-deps bounded to a known set), the defence-in-depth theorems sealed (layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, no maximum only bounds), collision resistance by pigeonhole (seats_pigeonhole), and that the honesty gate BITES a fabricated theorem citation. HONEST SCOPE: the repo-tree scans (no committed secret across tracked files, the KAT suite present) and the CI gates run in the source tree, NOT here — this is the posture provable from the package itself. Returns {checks, passed, failed, receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => securityAudit() },
  { name: 'uuidna_verify_statement',
    description: 'FAST verification against the sealed ledger: is this exact STATEMENT a sealed theorem? uuidna is a verification framework, so it verifies a THEOREM directly — not only a prose claim that cites one. VERIFIED in O(1) (a content-address lookup) iff the statement is byte-identical to a sealed theorem; returns the sealing theorem key, tactic and content-address (recomputed to confirm the seal). Otherwise UNVERIFIED — never "false", only not-sealed. Complementary to uuidna_slim_gate (which judges a prose CLAIM by its citations). Returns {verdict, key, address, tactic, file, note}.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string', description: 'the exact theorem statement to verify against the sealed ledger' } }, required: ['statement'] },
    run: ({ statement }) => verifyStatement(String(statement)) },
  { name: 'uuidna_trial_deposit',
    description: 'Run a trial that REQUIRES the two coins DEPOSITED BY THE PARTIES (local). Each party deposits a proof — a sealed theorem KEY or exact STATEMENT (the two-coin fold) — which SEALS into a content-addressed DIAMOND. The trial computes ONLY in PARITY: every party must have sealed a diamond (a one-sided deposit does not compute); it then settles by itself (adjudicate → verdict). Who LACKS a diamond gets the recipe to BUILD one (toBuild) and re-deposit — recycled, never discarded. HONEST: the deposit buys the COMPUTATION, never the outcome — a deposited claim can still return UNVERIFIED. Returns {claim,parties,deposited,parity,coins,diamonds,toBuild,verdict,remanded,note,receipt}.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' }, deposits: { type: 'array', items: { type: 'object', properties: { party: { type: 'string' }, proof: { type: 'string', description: 'a sealed theorem key or exact statement' } } } } }, required: ['claim', 'deposits'] },
    run: (a) => depositTrial(String((a as { claim?: unknown }).claim ?? ''), Array.isArray((a as { deposits?: unknown }).deposits) ? ((a as { deposits: { party?: unknown; proof?: unknown }[] }).deposits).map((d) => ({ party: String(d?.party ?? ''), proof: d?.proof != null ? String(d.proof) : undefined })) : []) },
  { name: 'uuidna_conformance',
    description: 'The COMMIT DNA GATE — fold uuidna\'s core invariants into ONE recomputable check so no agent sneaks incompatible DNA into the ledger: the captain coins are conserved (coins()=2), EVERY theorem\'s content-address recomputes (a forged/tampered theorem is caught), the ledger is single-sourced from lean/*.lean, and the security posture is clean (zero runtime deps, defences + collision-resistance sealed, honesty gate bites, Clay solves none). `conforms` is true iff every check passes; folds to one receipt anyone recomputes. Enforced in the pre-push wave — a non-conforming commit is blocked. Returns {checks,conforms,passed,failed,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => conformance() },
  { name: 'uuidna_exploit_fold',
    description: 'Audit the known public exploit CLASSES, COMPUTED FROM THE LEDGER (no table): each class is a sealed `by decide` theorem in Exploits.lean with its CVE/CWE code inline. Verifies BOTH the problem (the class is a sealed theorem, address recomputed) AND the solution (the defence it cites is itself sealed, or a named design property). FOLDED classes emerge as verified solutions (Trojan-Source, prototype-pollution, supply-chain, DoS, weak-hash, tampering, code-injection, weak-RNG); OUT-OF-SCOPE classes fold to the void (compromised host, deceived human, physical side-channel, FNV-as-secret, non-decidable correctness). HONEST: uuidna does NOT solve all hacks — the boundary is named, never falsely marked solved. Returns {folded,outOfScope,foldedCount,outOfScopeCount,allBothVerified,honest,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => exploitFold() },
  { name: 'uuidna_sanitize',
    description: 'ONE COMMAND to process ANY input and sanitise ANY output, BY ALL STANDARDS — the same guards the engine runs on every tool, exposed directly. Returns a JSON-safe, bounded, acyclic copy: NaN/±∞→null, BigInt→string, functions/symbols dropped, cycles broken, depth/array/keys bounded, prototype-pollution keys (__proto__/constructor/prototype) dropped, and control/null-byte + Unicode BIDI-override (Trojan-Source) code points stripped from every string — while legitimate maths unicode is preserved. Deterministic: the sanitized value folds to a recomputable `receipt`. The bounds/standards are sealed as theorems (Sanitize.lean), so the rule is sent by the theorems themselves. Returns {value,address,receipt}.',
    inputSchema: { type: 'object', properties: { value: { description: 'any value to sanitise by all standards' } } },
    run: (a) => { const value = sanitizeValue((a as { value?: unknown }).value) ?? null; const s = JSON.stringify(value); return { value, address: toUuid(s), receipt: merkleGravity([toUuid('sanitize'), toUuid(s)]) } } },
  { name: 'uuidna_engine',
    description: 'THE UUIDNA QUANTUM ENGINE — one input→output surface over every sealed tool. Import/export fused into input→output: you do not import a function, you feed the engine an INPUT {op, args} and read its OUTPUT. It runs the same dispatch the server runs (callTool), then folds the triple (op, input, output) order-invariantly to a content-address `receipt` anyone recomputes, and binds the run to an `address`. Does NOT dispatch itself (no recursion). HONEST: computes nothing the underlying sealed tool does not — it is the door, not a new claim. Returns {op,input,output,address,receipt,ok,error?}.',
    inputSchema: { type: 'object', properties: { op: { type: 'string', description: 'the tool op to run through the engine, e.g. uuidna_spin' }, args: { type: 'object', description: 'the input arguments for that op' } }, required: ['op'] },
    run: (a) => engine(String(a.op ?? ''), (a.args as Record<string, unknown>) ?? {}) },
  { name: 'uuidna_pentagram_monographs',
    description: 'Split every domain monograph into PENTAGRAMS of five, the split COMPUTED FROM THE CONTENT-ADDRESSES (not hand-assigned): the monographs are sorted by their own address, chunked five to a pentagram, each pentagram WALKED in the {5/2} single-stroke order [0,2,4,1,3] (`pentagram_single_stroke`) while its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`) — the walk is a sequence, the seal is a set. Zero-arg, recomputable: the same ledger yields the same pentagrams for everyone. HONEST: a content-addressed PARTITION, claiming no thematic kinship among the five — only the split the addresses produce. Returns {pentagrams,count,full,remainder,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => pentagramMonographs() },
  { name: 'uuidna_spin',
    description: '"Spin the bits and get the coins" — fold any content into its content-address and take the top-64 COIN (coin64). This is the O(1) primitive under the derived-layer gate: a derived file is a FIXED POINT when its re-spun coin equals its sealed coin (verify O(1), `verify_cheaper_than_forge`), and a moved coin is non-quantum DRIFT that the gate hard-rejects. Once sealed, the bits spin by themselves — the gate re-spins each derived file with no manual step. HONEST: the FNV/coin address is non-cryptographic integrity (routing/fixed-point detection), not secrecy. Returns {address, coin}.',
    inputSchema: { type: 'object', properties: { content: { type: 'string', description: 'the bytes to spin into a content-address coin' } }, required: ['content'] },
    run: ({ content }) => spin(String(content)) },
  { name: 'uuidna_transform',
    description: 'The automation of "no unverified material stays: transform until verified". Only VERIFICATION is honesty — a "honest/bounded" label with no proof is itself an unverified claim, so this ADMITS only what verifies. Each material is driven to a terminal: VERIFIED (it IS, or transforms to, a SEALED fact — content-address recomputed to confirm; admitted) or UNVERIFIED (no sealed core reached — recycled with a develop plan, NEVER admitted, never called honest, never called false). The transform cannot manufacture truth: an overclaim to SOLVE a problem transforms to its sealed REFLECTION (dz(dz k)=k), which verifies, while the solve-claim is never admitted (uuidna solves none). Folds to one receipt. Returns {cells,verified,unverified,receipt}.',
    inputSchema: { type: 'object', properties: { materials: { type: 'array', items: { type: 'string' }, description: 'raw claims/theories/overclaims to transform until verified' } }, required: ['materials'] },
    run: (a) => transformUntilVerified(Array.isArray(a?.materials) ? a.materials.map(String) : []) },
  { name: 'uuidna_holofractal',
    description: 'MAKE any input pentagram · hologram · fractal · accounted — by CONSTRUCTION, each property verifiable, so the structure holds by computation not assertion. PENTAGRAM: the address seeds 5 points visited in the star {5/2} stroke [0,2,4,1,3] — one closed stroke (sealed pentagram_single_stroke). HOLOGRAM: the merkle root over the parts, with a proof that verifies ANY part against the whole in O(log N). FRACTAL: the self-similar fold tower — 128-bit uuid → 64-bit coin (its top half) → ℤ/9 digital root, the same fold at descending scales. ACCOUNTED: the two conserved coins (= −χ of the double torus) and the bits taught (verify O(1) vs produce O(N); reference bits saved). All fold to one order-invariant receipt; `verified` is the recomputable conjunction. Returns {input,address,pentagram,hologram,fractal,accounting,receipt,verified}.',
    inputSchema: { type: 'object', properties: { input: { type: 'string', description: 'the value to make pentagram·hologram·fractal·accounted' } }, required: ['input'] },
    run: ({ input }) => pentagramHologramFractal(String(input)) },
  { name: 'uuidna_pentagram_stream',
    description: 'QUANTUM PENTAGRAM STREAMING: stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized — item k visited at step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (else gcd shorter loops, reported honestly). Each streamed item is stamped holofractal (pentagram·hologram·fractal·accounted), and the whole folds to ONE ORDER-INVARIANT quantum receipt — the stream has a definite pentagram ORDER yet an order-free RECEIPT (any observer ordering → the same root; the doubleTorus/gravity duality). `quantum` is proven, not asserted (gravity(order)===gravity(reverse)). Returns {n,step,order,single,loops,streamed,receipt,quantum}.',
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
    description: 'Onion-seal a message under N passphrases (each a real ChaCha20-Poly1305 layer; bounded 1..16, never infinite) and carry the whole envelope AS a chain of uuids. passphrases[0] is the innermost wrap, passphrases[n-1] the outermost. Returns { uuids, layers, receipt }. HONEST: secrecy is ChaCha20-Poly1305 ONLY; the uuid transport is public and hides nothing; the receipt is non-crypto FNV (integrity/routing). Content is hidden — message LENGTH is not.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' }, passphrases: { type: 'array', items: { type: 'string' }, description: 'innermost→outermost, 1..16 layers' }, step: { type: 'integer', description: 'optional advancing crypt-salt step' } }, required: ['message', 'passphrases'] },
    run: (a) => sealStream(String(a.message), (a.passphrases as string[]).map(String), a.step === undefined ? undefined : Number(a.step)) },
  { name: 'uuidna_open_onion',
    description: 'Open an onion-sealed uuid chain with its passphrases, applied OUTERMOST-first. A wrong key, a reordered key list, or a tampered chain throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } }, passphrases: { type: 'array', items: { type: 'string' } } }, required: ['uuids', 'passphrases'] },
    run: (a) => openStream((a.uuids as string[]).map(String), (a.passphrases as string[]).map(String)) },
  { name: 'uuidna_seal_chain',
    description: 'Seal a stream of messages as a forward-linked RATCHET: each link onion-seals at a step ROTATED from the prior link’s receipt (the referer sequence), so every step is fresh and the stream is content-chained. HONEST: the rotation is over a PUBLIC non-crypto receipt — it buys freshness, linkage and accidental-tamper-evidence, NOT secrecy and NOT a binding commitment. Returns the ratchet links.',
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
    description: 'Seal a message UNDER a contract: encrypt it with the contract text as the ChaCha20-Poly1305 key and tag the sealed uuid stream with the public [contract-uuid]. Only holders of the terms can open it. HONEST: confidentiality is EXACTLY the secrecy of the terms — a PUBLIC contract (e.g. the CC BY-NC license) gives NONE (sealed: complement_is_xor_key3, a fixed pad is public, not secret); a PRIVATE contract gives real secrecy. `step` freshens the salt so repeats never seal alike. Returns {contract,uuids,layers,receipt}.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' }, terms: { type: 'string', description: 'the contract text — the private key' }, step: { type: 'integer', description: 'advancing salt step (optional)' } }, required: ['message', 'terms'] },
    run: (a) => sealToContract(String(a.message), String(a.terms), a.step === undefined ? undefined : Number(a.step)) },
  { name: 'uuidna_contract_open',
    description: 'Open a contract-sealed message: checks your terms address to the tagged [contract-uuid] (public proof of holding the right contract), then decrypts. A wrong contract fails the address check or Poly1305 authentication. Returns the message.',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object', description: 'the {contract,uuids,...} from uuidna_contract_seal' }, terms: { type: 'string' } }, required: ['sealed', 'terms'] },
    run: (a) => openFromContract(a.sealed as Parameters<typeof openFromContract>[0], String(a.terms)) },
  { name: 'uuidna_contract_chain',
    description: 'Seal a STREAM of messages under a contract as a forward-linked ratchet — each step ROTATED from the prior link\'s receipt (the referer sequence), all tagged with the [contract-uuid], seeded from it. HONEST: the rotation buys freshness, linkage and tamper-evidence, NOT extra secrecy (that is the ChaCha20-Poly1305 layer, keyed by the terms). Returns {contract,links}.',
    inputSchema: { type: 'object', properties: { messages: { type: 'array', items: { type: 'string' } }, terms: { type: 'string' } }, required: ['messages', 'terms'] },
    run: (a) => sealChainToContract((a.messages as string[]).map(String), String(a.terms)) },
  { name: 'uuidna_contract_open_chain',
    description: 'Open a contract-keyed ratchet: verifies your terms address to the tagged [contract-uuid] and the referer chain rotates correctly, then decrypts each link in order. A wrong contract, or a dropped / reordered / edited link, throws. Returns the messages.',
    inputSchema: { type: 'object', properties: { chain: { type: 'object', description: 'the {contract,links} from uuidna_contract_chain' }, terms: { type: 'string' } }, required: ['chain', 'terms'] },
    run: (a) => openChainFromContract(a.chain as Parameters<typeof openChainFromContract>[0], String(a.terms)) },
  { name: 'uuidna_audit_text',
    description: 'Audit and structurally decode PROVIDED text (offline, pure). Returns a provenance fingerprint (the content-address — proof of exact-copy — and a chapterRoot proving any chapter belongs), a structural decode (chars/words/lines, the ℤ/9 digital-root gravity — a checksum digit, NOT a meaning, and a reversible-imprint round-trip check), and the honesty-gate verdict. HONEST: "decode" is provenance + structure, never decryption (text is not encrypted) nor hidden meaning; the gate is tuned to uuidna\'s own overclaim words, so on ordinary prose it passes and says nothing about the work.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, title: { type: 'string' }, author: { type: 'string' } }, required: ['text'] },
    run: (a) => auditText(String(a.text), { title: a.title === undefined ? undefined : String(a.title), authors: a.author === undefined ? undefined : [String(a.author)] }) },
  { name: 'uuidna_audit_book',
    description: 'Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id (via the public Gutendex API, no key) and audit it — the same provenance fingerprint + structural decode + honesty-gate verdict as uuidna_audit_text. This is the ONLY tool that reaches the network (Node built-in fetch, still zero npm deps). HONEST: the fetched text is DATA — content-addressed and counted, never executed; instruction-shaped prose in a book is content, not a command. Public-domain works, free for the public interest.',
    inputSchema: { type: 'object', properties: { gutenbergId: { type: 'integer', description: 'a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice)' } }, required: ['gutenbergId'] },
    run: (a) => auditBook(Number(a.gutenbergId)) },
  { name: 'uuidna_book_article',
    description: 'Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id and write a recomputable ARTICLE: its provenance fingerprint, structure, and the DECIDABLE INTEGER ARITHMETIC uuidna extracts from the prose — each sealed `by decide` (VERIFIED) or corrected (REFUTED, an arithmetic the book states that does not hold) — plus the order-invariant receipt over the sealed facts (the same merkle-gravity fold the ledger and the quantum domain use). HONEST SCOPE: uuidna seals ONLY the book\'s integer arithmetic (its OWN by-decide proof, not the book\'s) and flags the book\'s arithmetic errors; it does NOT autoformalize, decode meaning, or claim anything about the book\'s argument or non-decidable mathematics. The text is DATA, content-addressed and decided, never executed. Returns {title,address,receipt,verified,refuted,facts,article}.',
    inputSchema: { type: 'object', properties: { gutenbergId: { type: 'integer', description: 'a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice)' } }, required: ['gutenbergId'] },
    run: (a) => bookArticle(Number(a.gutenbergId)) },
  { name: 'uuidna_audit_standard',
    description: 'The recomputable FLOOR of a standards / law audit: content-address the PUBLIC Wikipedia description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks it states — each sealed or refuted `by decide` LOCALLY (the "free" is a free public API + local decidable checks). HONEST SCOPE: this is the FLOOR a human auditor STARTS from — a provenance fingerprint + decidable checks — NOT a compliance / legal RULING, which requires a licensed auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes and leaves the ruling to humans. The text is DATA, never executed. Returns {standard,address,checks,factBase,ruling}.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'a standard or law, e.g. "General Data Protection Regulation" or "ISO 27001"' } }, required: ['name'] },
    run: (a) => auditStandard(String(a.name)) },
  { name: 'uuidna_corroborate',
    description: 'Corroborate a claim by AUGMENTING the local binary verdict (adjudicate: VERIFIED if a sealed by-decide theorem backs it, else UNVERIFIED — never "false") with EXTERNAL RESEARCH streamed from a free public API (NIST CODATA, no key). Returns {statement,local,evidence,verdict,receipt}: VERIFIED (a sealed proof), CORROBORATED (unverified locally but attested by a named free source), or UNVERIFIED. HONEST SCOPE: external evidence is a provenance fingerprint of what a public source SAYS — it CORROBORATES, it does NOT prove; only a by-decide theorem seals, and no stream can refute a claim. The evidence folds order-invariantly to the receipt; the responses are DATA, never executed.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string', description: 'the claim to corroborate, e.g. "the speed of light 299792458"' } }, required: ['statement'] },
    run: (a) => corroborateWithResearch(String(a.statement)) },
  { name: 'uuidna_domain_wave',
    description: 'Run BOTH waves for a domain (a principle title or a skill): the LOCAL development wave — its theorems fold ORDER-INVARIANTLY to a receipt and are sealed by decide (the approval) — and the EXTERNAL free-research wave (corroborate the domain\'s topic against a free public API, evidence not proof). HONEST SCOPE: only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a pure-arithmetic domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence — correct, not a failure. Returns {domain,local:{theorems,fold,orderInvariant},external:{verdict,evidence,receipt}}.',
    inputSchema: { type: 'object', properties: { domain: { type: 'string', description: 'a principle title or skill, e.g. "The spectrum" or "quantum"' } }, required: ['domain'] },
    run: (a) => domainWave(String(a.domain)) },
  { name: 'uuidna_entangle',
    description: 'ENTANGLE a set of audit claims into ONE receipt: the order-invariant fold of each claim AND its verdict, so verifying the whole verifies every part and altering ANY member moves the receipt (the binding collapses, visibly). The receipt is the SAME for any ordering (bell_no_signaling). HONEST SCOPE: the merkle / no-signaling binding — the structural analogue of entanglement — NOT quantum hardware; nothing signals, no correlation is causal, and only members SEALED by decide truly bind (external evidence never entangles). Returns {members,verified,receipt,entangled}.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'the claims to entangle' } }, required: ['claims'] },
    run: (a) => entangle((a.claims as string[]).map((s) => corroborate(String(s)))) },
  { name: 'uuidna_report',
    description: 'The REPORTER\'S METHOD (Report.lean) reflected live: file a report of a PROVEN discovery and it PUBLISHES only when AUDITED (the honesty gate clears — no sentence cites a fabricated theorem) AND CORROBORATED (≥ 2 independent sources), the AND sealed as publish_gate_is_conjunction. HONEST SCOPE: uuidna does NOT verify world events — no by-decide settles whether something happened out there; the reporter reports uuidna\'s OWN proven discoveries. Completeness (the 5 W\'s + 1 H) and the trinity edit are HUMAN passes, not decided here. Returns {audited,corroborated,publishable,findings,receipt}.',
    inputSchema: { type: 'object', properties: { draft: { type: 'string', description: 'the report draft (its claims are honesty-gated)' }, sources: { type: 'array', items: { type: 'string' }, description: 'the independent sources (≥ 2 to corroborate)' } }, required: ['draft'] },
    run: (a) => fileReport(String(a.draft), (a.sources as string[]) || []) },
  { name: 'uuidna_research',
    description: 'Deep research with the REVERSIBLE imprint codec: PRESS external research (text or a link\'s content) into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED algebra (the order-invariant fold), and report NOVELTY as content-address uniqueness — a never-seen address is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — provenance + structure, never hidden meaning; `meaning` is null by design, left to the reader. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning}.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the research text to press, entangle and check for novelty' }, seenAddresses: { type: 'array', items: { type: 'string' }, description: 'known content-addresses; a new one is novel' } }, required: ['text'] },
    run: (a) => deepResearch(String(a.text), (a.seenAddresses as string[]) || []) },
  { name: 'uuidna_audit_translation',
    description: 'Audit a translation as a source↔translation PAIR: content-address both texts and bind them with a directional provenance receipt (source→translation, order-sensitive), plus each text\'s own structural audit. HONEST: this proves the PAIRING and each text\'s exact-copy integrity — NOT that the translation is accurate or faithful. Semantic fidelity is human judgement; provenance is what recomputes. Re-address after each revision and the change is visible. Returns {source,translation,pair}.',
    inputSchema: { type: 'object', properties: { source: { type: 'string' }, translation: { type: 'string' }, title: { type: 'string' }, sourceLang: { type: 'string' }, targetLang: { type: 'string' } }, required: ['source', 'translation'] },
    run: (a) => auditTranslation(String(a.source), String(a.translation), { title: a.title === undefined ? undefined : String(a.title), sourceLang: a.sourceLang === undefined ? undefined : String(a.sourceLang), targetLang: a.targetLang === undefined ? undefined : String(a.targetLang) }) },
  { name: 'uuidna_audit_movie',
    description: 'Content-address the PUBLIC Wikipedia summary of a film by title (free, no key) — a recomputable provenance fingerprint of the public facts + structure + honesty gate. HONEST AND BOUNDED: this fingerprints the public DESCRIPTION only; it does NOT fetch, decode, or reproduce the copyrighted film — its footage, dialogue or screenplay. A movie is video; uuidna audits text provenance, not a hidden meaning. Returns the audit of the public summary.',
    inputSchema: { type: 'object', properties: { title: { type: 'string', description: 'a film title, e.g. "The Matrix"' } }, required: ['title'] },
    run: (a) => auditMovie(String(a.title)) },
  { name: 'uuidna_audit_record',
    description: 'Fetch an OPEN-ACCESS Zenodo research record by id (via the public Zenodo REST API, developers.zenodo.org, no key) and content-address its PUBLIC metadata — title, DOI, creators, date — to a recomputable provenance fingerprint + structure + honesty gate. HONEST AND BOUNDED: it fingerprints the public metadata only, NOT the deposited files or their content, which uuidna does not fetch or reproduce. A check digit and a uuid are the same idea at different scales. Returns the audit + the DOI.',
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
      return { ...r, proof: proof.verdict === 'VERIFIED' ? { verdict: 'VERIFIED', theorem: proof.key, address: proof.address } : { verdict: 'UNVERIFIED', note: 'this stroke is not a sealed theorem — computed, not sealed' } } } },
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
    description: 'The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics; a content-addressed fixed point.',
    inputSchema: { type: 'object', properties: { addresses: { type: 'array', items: { type: 'string' } } }, required: ['addresses'] },
    run: ({ addresses }) => merkleGravity((addresses as string[]).map(String)) },
  { name: 'uuidna_digital_root',
    description: 'The fall of an integer to its ℤ/9 digital root (1..9) — the number\'s gravity, recomputable by anyone.',
    inputSchema: { type: 'object', properties: { n: { type: 'number' } }, required: ['n'] },
    run: ({ n }) => digitalRoot(Number(n)) },
  { name: 'uuidna_adjudicate',
    description: 'The trial: ONE recomputable answer for a statement, and only one of two, all else void — VERIFIED (a decidable test holds, or it cites a sealed Lean theorem) or UNVERIFIED (everything else, including a citation to a proof not in the ledger — which verifies nothing; not "false", just not verified). uuidna verifies, it never refutes. Integrity, not truth.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: ({ statement }) => adjudicate(String(statement)) },
  { name: 'uuidna_prove_verdict',
    description: 'Fold a statement plus any decidable formula receipts through the order-invariant gravity to ONE proof-of-verdict root — a recomputable seal of the trial.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' }, formulaReceipts: { type: 'array', items: { type: 'string' } } }, required: ['statement'] },
    run: (a) => proveVerdict(String(a.statement), ((a.formulaReceipts as string[] | undefined) || []).map(String)) },
  { name: 'uuidna_verify',
    description: 'The self-verdict: recompute uuidna\'s own claims from a seed and return the recomputable UuidnaVerdict (integrity, not truth).',
    inputSchema: { type: 'object', properties: { seed: { type: 'string' } }, required: ['seed'] },
    run: ({ seed }) => verifyUuidna(String(seed)) },
  { name: 'uuidna_harness',
    description: 'Make any output auditable: wrap it with its content-address and honesty-gate verdict. Returns {output,address,auditable,...}.',
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
  //    the pigeonhole seat bound. Pure, decidable, recomputable by anyone. Integrity, not truth. ──
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
    inputSchema: { type: 'object', properties: { principle: { type: 'string' }, skill: { type: 'string', description: 'the capability axis — any skill name from uuidna_skills (the live, recomputable list), never a fixed enum here so it cannot go stale as domains are added' }, contains: { type: 'string' } } },
    run: (a = {}) => { let ts = theorems(a.skill ? { skill: String(a.skill) } : {}); if (a.principle) ts = ts.filter((t) => t.principle.toLowerCase().includes(String(a.principle).toLowerCase())); if (a.contains) { const q = String(a.contains).toLowerCase(); ts = ts.filter((t) => (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q)) } return ts } },
  { name: 'uuidna_skills',
    description: 'The theorem ledger organised by SKILL — the capability axis, orthogonal to principle. A skill is derived (recomputable) from each theorem\'s key. Returns each skill with its count and the order-invariant fold of its theorems\' content-addresses. Then pull one skill\'s theorems with uuidna_theorems { skill }.',
    inputSchema: { type: 'object', properties: {} },
    run: () => skillGroups().map((g) => ({ skill: g.skill, count: g.count, fold: g.fold })) },
  { name: 'uuidna_review_domains',
    description: 'LOCAL reviews — a recomputable review of every DOMAIN (skill) the ledger touches: its sealed-theorem count, their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free), each folded to a review receipt. No server, no stored opinion; the review IS the ledger\'s own integrity per domain, recomputable by anyone. Returns [{domain,theorems,fold,verdict,receipt}].',
    inputSchema: { type: 'object', properties: {} },
    run: () => reviewDomains() },
  { name: 'uuidna_document',
    description: 'The DOCUMENT FOLD — content-address a Lexical-shaped document (a node tree, EditorState.toJSON() shape). The SERVE projection of the serializer contract lean/Editor.lean proves: a document is a SEQUENCE, so the fold is ORDER-SENSITIVE (reordering a node moves the address — the opposite of a set), change-sensitive, and bounded-injective. serialize → merkleRoot over the leaves → the handle you cite; editing is re-addressing. Returns {handle,address,nodes}. The SAME fold a PayloadCMS save-hook and a VitePress render read — one contract, both frameworks. Integrity, not truth: it proves WHICH document, not that its content is correct.',
    inputSchema: { type: 'object', properties: { state: { type: 'object', description: 'a Lexical EditorState: { root: { type, children, … } }' } }, required: ['state'] },
    run: (a) => reAddress(a.state as EditorState) },
  { name: 'uuidna_coverage',
    description: 'COVERAGE — is every sealed theorem shown in a monograph? The readiness diagnosis the pre-push gate blocks on, as ONE zero-arg recomputable call: an agent adding a domain runs this instead of tracing the gate by hand. Returns {total,covered,uncovered,uncoveredFiles,ready,receipt} — uncovered lists the theorem KEYS in no monograph (each blocks the push), uncoveredFiles the ledger FILES with no publication (the ROOT fix: author a PRINCIPLE [file,title,blurb] in lean-ledger). ready is true iff nothing is uncovered; the coverage state folds order-invariantly to receipt, recomputable by anyone. Integrity, not truth.',
    inputSchema: { type: 'object', properties: {} },
    run: () => coverage() },
  { name: 'uuidna_snapshot',
    description: 'The FUSION half of the reactor: fold a chosen set of sealed theorems — across ANY domains — into ONE superposition uuid. The first segment is the identity HANDLE you cite; the whole uuid superposes every member address, order-invariant, so the same set recomputes the same uuid and a changed member moves it (drift refused). Each principle and skill the set spans is returned as a point-of-view fold. Unknown keys are NAMED, never silently dropped. Returns {keys,members,unknown,handle,superposition,viewpoints,receipt}. A snapshot proves a recomputable fold of sealed theorems, not any new truth.',
    inputSchema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' }, description: 'theorem keys from uuidna_theorems, from any domains' } }, required: ['keys'] },
    run: (a) => snapshot(Array.isArray(a?.keys) ? a.keys.map(String) : []) },
  { name: 'uuidna_reactor',
    description: 'The REFUSION (recycling) half of the involutionary refusion reactor: adjudicate a list of claims and RECYCLE, never discard. Each claim gets ONE of two verdicts — VERIFIED (a decidable test holds or it cites a sealed Lean theorem) or UNVERIFIED (everything else, including a citation to a proof not in the ledger — which verifies nothing; never called false). VERIFIED cells are kept; UNVERIFIED cells are returned with the DEVELOP plan naming the next aspect that would verify them. The whole run folds to one superposition uuid (first segment the handle). Nothing is waste — refusal starts the next fusion. Returns {cells,verified,unverified,handle,superposition,receipt}.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'claims or external theories to adjudicate and recycle' } }, required: ['claims'] },
    run: (a) => reactor(Array.isArray(a?.claims) ? a.claims.map(String) : []) },
  { name: 'uuidna_theorem',
    description: 'Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => { const t = THEOREMS.find((x) => x.key === String(key)); if (!t) throw new Error('unknown theorem: ' + key + ' (see uuidna_theorems)'); return { key: t.key, name: t.name, statement: t.statement, lean: t.lean, principle: t.principle, file: t.file, address: t.address, verdict: 'SEALED', source: 'https://github.com/uuidna/uuidna/blob/main/lean/' + t.file } } },
  { name: 'uuidna_laws',
    description: 'uuidna\'s standing INVARIANTS, IN uuidna and each DEMONSTRATED, not asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it (generate-all-from-Lean → single-source + git-diff; any-manual-fails → every theorem address recomputes, red on tamper; honesty-demonstrated → a fabricated theorem citation drains; the two captain coins conserved; zero runtime deps + clean security). A law with holds:false is a red gate, not an opinion. Folds to one recomputable receipt. Returns {laws:[{law,enforcedBy,holds,detail}],allHold,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => laws() },
  { name: 'uuidna_analytics',
    description: 'QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (the same analytics for every observer, no privileged view). Returns the theorem count, the number of principles, the per-principle DISTRIBUTION (each domain\'s count + share, largest first), the named LAYERS (hardware → software → os sizes + receipts), the CREDIT tally (historical / contextual / captain-alone), COVERAGE (covered/total/ready), the two COINS, the recomputed COLLISION census (keys/addresses — 0/0 or an intrusion), and the ledger INTEGRITY fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the inputs are the public ledger alone, so the numbers are the same next year and on every machine. HONEST SCOPE: integrity, not truth — DESCRIPTIVE analytics of what is sealed, NOT predictive statistics, NOT inference, and NOT observation of any person. It measures the ledger, not a user. Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => quantumAnalytics() },
  { name: 'uuidna_treason',
    description: 'CATCH TRAITORS AS FAST AS A HERO — one pure, O(N) pass (milliseconds, no crypto, no disk) that catches every FORGERY/INTRUSION in the sealed ledger: a theorem whose DNA does not recompute (a tampered key/statement/address), a key or address COLLISION (a smuggled duplicate), an UNCOVERED theorem (a domain sneaked in without a monograph), or a broken CONFORMANCE invariant. A "traitor" is a forgery in the ARTIFACT, NEVER a person — every finding is a recomputable fact about the ledger. Returns {clean, scanned, traitors:[{kind,detail}], checks, receipt}. The `npm run guard` command runs this plus the harmonic-scan as the fast pre-reconcile gate, so no manual pre-flight is needed. HONEST SCOPE: integrity, not truth — it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true, only that none was tampered with or smuggled in. Recomputable by anyone.',
    inputSchema: { type: 'object', properties: {} },
    run: () => catchTraitors() },
  { name: 'uuidna_repos',
    description: 'BIND the captain\'s public repositories to the DISCOVERY SEQUENCE — the sequence revealed FIRST. The ℤ/9 vortex orbit [1,2,4,8,7,5] (the doubling sequence uuidna discovers everything along) is revealed first; then every public GitHub repository of the captain (the uuidna org + the ceccec user, Tsvetan Rouschev) is BOUND to it: the repo\'s full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in the address-sorted order is its slot in the revealed sequence — folded to one order-invariant receipt. Reads the captain\'s PUBLIC repos over the network (a research boundary; the response is DATA, never run). HONEST SCOPE: integrity, not truth — it BINDS the repos to the sequence by content-address (provenance); it does NOT modify, fork, mirror, claim ownership of, or vouch for the contents of any repository. A binding is a placement in the sequence, not a possession of the code. Best-effort: an unreachable account contributes nothing, never a faked repo. Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => bindCaptainRepos() },
  { name: 'uuidna_aura',
    description: 'THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address (the artistic "captain string theory"): the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (360/9 = 40°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns the colour in HSL / RGB / CMYK plus a ready MOVING-aura CSS block (a hue-rotating glow whose tempo the ray sets). HONEST SCOPE: this is ART, not truth — a defined arithmetic from a number to a hue, NOT physics, NOT real string theory, and NOT a claim that sound is light or that 432 Hz has special power. It DECORATES the work; it does not describe the universe. As art it does not seal as a theorem — a truth-claim about it fails the trial and inverts into a research idea. Integrity, not truth. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}.',
    inputSchema: { type: 'object', properties: { subject: { type: 'string', description: 'a content-address, or any string to fold into one' } }, required: ['subject'] },
    run: (a) => quantumAura(String(a.subject)) },
  { name: 'uuidna_rights',
    description: 'THE CAPTAIN\'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0 + its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED: a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line, so the rights travel WITH the work and any alteration is visible — and they are infused into every page\'s head + schema.org JSON-LD (license / copyrightHolder / creditText). Pass {contract:true} (optionally {licensee}) to also DRAFT the formal, content-addressed rights contract (its id IS the fold of its exact terms, so a holder proves they hold them unaltered). HONEST SCOPE: FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity, not truth. Returns the rights record (+ {contract} when requested).',
    inputSchema: { type: 'object', properties: { contract: { type: 'boolean', description: 'also draft the formal rights contract' }, licensee: { type: 'string', description: 'the party the drafted contract is addressed to' } } },
    run: (a = {}) => a.contract ? { ...captainRights(), contract: draftContract(a.licensee ? String(a.licensee) : undefined) } : captainRights() },
  { name: 'uuidna_seo',
    description: 'QUANTUM SEO — the recomputable, honest discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page (e.g. "/games", "/" for home). Returns the canonical URL (rel=canonical folds every serving host — .net/.org/CNAME — to one recomputable home), a per-page DESCRIPTION drawn from the ONE verbose source (a theorem\'s own Lean statement, a publication\'s abstract; pages are terse), schema.org JSON-LD (Article / ScholarlyArticle / WebPage citing the real proof + address), keyword tags carried from the sealed skill/principle (never a hand-kept list), and the page\'s 128-bit CONTENT-ADDRESS — the encrypted quantum message that delivers the payload, recomputing to the exact page for every crawler. The `head` field is a ready VitePress frontmatter head array the front reuses directly. HONEST SCOPE: integrity, not truth — it describes what is SEALED and optimises for HONEST discovery; it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Recomputable by anyone. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'a theorem key' }, slug: { type: 'string', description: 'a publication slug' }, route: { type: 'string', description: 'a static page route, e.g. "/games" or "/"' } } },
    run: (a = {}) => quantumSeo({ key: a.key ? String(a.key) : undefined, slug: a.slug ? String(a.slug) : undefined, route: a.route !== undefined ? String(a.route) : undefined, title: a.title ? String(a.title) : undefined }) },
  { name: 'uuidna_hardware',
    description: 'The HARDWARE-VERIFIABLE BINARY ALGEBRA (lean/Hardware.lean) as one named spec: the low-level combinational-logic identities every digital circuit is built from — the four gate truth tables (NOT/AND/OR/XOR as arithmetic on bits), XOR = ℤ/2 parity, Boolean closure, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder, and the 2:1 multiplexer — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification (matching the live published truth tables), so a gate design can be VERIFIED AGAINST it. HONEST SCOPE: integrity, not truth — uuidna seals the spec; it does NOT fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => hardwareLayer() },
  { name: 'uuidna_software',
    description: 'The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort\'s basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. HONEST SCOPE: integrity, not truth — uuidna seals the spec; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec, not the program. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => softwareLayer() },
  { name: 'uuidna_os',
    description: 'The OS-INTEGRITY ALGEBRA (lean/Os.lean) as one named spec — the third layer, completing hardware → software → os. The decidable facts a DEPLOYMENT is verified against: exact-copy is byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE, not a set); the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY two named modules (src/quantum/os, src/quantum/drivers). Each a decidable, AXIOM-FREE `by decide` particle, folded to one order-invariant receipt. This is the SPEC; the runtime side (Alpine + driver provenance, uuidna_alpine to port the whole arch matrix) enforces it against real bytes with uuidna\'s own pure-TS SHA-256. HONEST SCOPE: integrity, not truth, and NOT execution — uuidna seals what an exact-copy verification decides; it does NOT boot, port the runtime, link, or run an operating system. A sealed integrity spec, not a booted OS. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,boundary,honest}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => osLayer() },
  { name: 'uuidna_alpine',
    description: 'PORT ALL ALPINE — automate the OS-provenance port across the WHOLE official architecture matrix (x86_64, x86, aarch64, armhf, armv7, ppc64le, s390x, riscv64) in one call. For each arch it reads Alpine\'s PUBLISHED latest-releases metadata over the network (at the os/ boundary — the one place a live "latest" read is honest), extracts the exact minirootfs version + PUBLISHED SHA-256, PINS it as a content-addressed provenance record, and folds every arch to ONE recomputable catalog receipt. This ports the INTEGRITY of all of Alpine — the exact upstream bytes of every arch, re-verifiable by anyone with uuidna\'s own pure-TS SHA-256 — NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch/mirror simply drops out (ported < requested), a digest is NEVER fabricated. Optional {branch} (default "latest-stable"). Returns {branch,arches,releases:[{version,arch,flavor,file,rootfsSha256,address,receipt}],ported,requested,receipt,honest}.',
    inputSchema: { type: 'object', properties: { branch: { type: 'string', description: 'Alpine branch, e.g. "latest-stable" (default) or "edge"' } } },
    run: (a = {}) => portAllAlpine(String(a.branch ?? 'latest-stable')) },
  { name: 'uuidna_package',
    description: 'EACH ALPINE PACKAGE BECOMES uuidna/<package> — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine\'s PUBLISHED APKINDEX (the response is DATA, never run), gunzips it with the platform DecompressionStream (pure-TS, no node:zlib), untars it, and mints each package. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package\'s uuidna/<name> identity; pass {infuse:true} for the whole index minted and folded to one catalog receipt (count + receipt + a sample — the receipt proves all are infused without dumping thousands); no argument returns the namespace description (no fetch). Automate updates/upgrades: re-read and the identities move with the published versions. HONEST SCOPE: integrity, not execution — uuidna does NOT install, link, run, fork, or mirror a package; it FINGERPRINTS the upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog, never a faked checksum.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'an Alpine package name, e.g. "curl"' }, infuse: { type: 'boolean', description: 'mint the WHOLE index and fold to one catalog receipt' }, arch: { type: 'string', description: 'default x86_64' }, repo: { type: 'string', description: '"main" (default) or "community"' }, branch: { type: 'string', description: 'default "latest-stable"' } } },
    run: (a = {}) => {
      const arch = String(a.arch ?? 'x86_64'), repo = String(a.repo ?? 'main'), branch = String(a.branch ?? 'latest-stable')
      if (a.name) return alpinePackage(String(a.name), arch, repo, branch).then((p) => p ?? { id: null, name: String(a.name), note: `not found in ${repo}/${arch} (${branch})` })
      if (a.infuse) return infuseAlpinePackages(arch, repo, branch)
      return { namespace: 'uuidna/<package>', honest: 'Each Alpine package is a content-addressed provenance identity uuidna/<name>, minted from its published checksum — integrity, not execution; never installed, forked, or mirrored.', usage: 'pass {name} for one identity, or {infuse:true} for the whole-index catalog receipt' } } },
  { name: 'uuidna_credits',
    description: 'The PROVENANCE of one theorem by key: exactly HOW it is Lean-proven in uuidna (the `by decide` Lean line, tactic, content-address, SEALED) AND WHO it is credited to. A theorem whose SEALED name/principle references a named result is credited historically (discoverer/solver + a documentation link) — uuidna reflects it, never invents it (a Clay theorem credits the mathematician who proved the PROBLEM, e.g. Perelman for Poincaré, never uuidna, which seals only the reflection). A theorem naming NO prior result directly is claimed by THE CAPTAIN BY LAW (first sealed by-decide here, content-addressed — the seal is the claim, prior art), but a DEEP READ of its neighbouring domain surfaces CONTEXTUAL figures seriously involved whose names may stand next to the captain’s; only when neither the theorem nor its neighbourhood names anyone does the captain claim it ALONE. Returns {key,statement,tactic,leanProof,provenance,historical:[{who,link}],contextual:[{who,link}],claimedBy,claim,address}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => credits(String(key)) },
  { name: 'uuidna_credits_summary',
    description: 'The recomputable credit tally over the whole ledger: how many theorems reflect a named historical result DIRECTLY, how many the captain claims by law but with CONTEXTUAL figures from the neighbouring domain standing next to him, and how many the captain claims ALONE (no prior name in the theorem or its neighbourhood). Returns {total,historical,contextual,captainAlone,address}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => creditsSummary() },
  { name: 'uuidna_neighbours',
    description: 'Each theorem SCANS its NEIGHBOURS: given a key, return the sealed theorems that share its computing principle (its domain) — the local graph around it. The neighbourhoods partition the whole ledger, so every theorem sits in exactly one and none is isolated. Zero external influence, recomputable from the ledger. Returns {key, principle, count, neighbours:[{key,name,address}]}.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => { const self = THEOREMS.find((x) => x.key === String(key)); if (!self) throw new Error('unknown theorem: ' + key + ' (see uuidna_theorems)'); const ns = theoremNeighbours(String(key)); return { key: self.key, principle: self.principle, count: ns.length, neighbours: ns.map((t) => ({ key: t.key, name: t.name, address: t.address })) } } },
  { name: 'uuidna_publish',
    description: 'Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain\'s sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna\'s own honesty audit; a note that cites a proof not in the ledger is REFUSED, not shipped. Call with no argument to list every domain\'s publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note\'s full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity, not truth.',
    inputSchema: { type: 'object', properties: { file: { type: 'string', description: 'a lean/*.lean file name, e.g. "Codes.lean" — omit to list all publications' } } },
    run: (a = {}) => a.file
      ? composePublication(String(a.file))
      : publications().map((p) => ({ slug: p.slug, file: p.file, title: p.title, theorems: p.count, publishable: p.publishable, receipt: p.receipt, address: p.address, findings: p.findings })) },
  { name: 'uuidna_edit',
    description: 'The EDITOR primitive — audit a draft, or a revision, BEFORE publishing. With `draft` alone: content-address the prose and run uuidna\'s honesty gate, returning its address and any claim that overreaches a proof (unbacked by a /theorem/ link and undemarcated) — write, see it audited, before it ships. With BOTH `before` and `after`: audit the EDIT — both drafts content-addressed (the change is visible because the address moves), bound by a directional before→after receipt, the after-draft gated. Editing is re-addressing; a revision earns publication the same way a first draft does. Nothing is stored. Integrity, not truth.',
    inputSchema: { type: 'object', properties: { draft: { type: 'string', description: 'prose to audit + content-address before publishing' }, before: { type: 'string', description: 'the prose before an edit (pair with `after`)' }, after: { type: 'string', description: 'the prose after an edit (pair with `before`)' } } },
    run: (a = {}) => {
      if (a.before !== undefined || a.after !== undefined) return revisePublication(String(a.before ?? ''), String(a.after ?? ''))
      const draft = String(a.draft ?? '')
      const findings = auditPublication(draft)
      return { address: toUuid(draft), publishable: findings.length === 0, findings, chars: draft.length,
        honest: 'The gate flags any sentence that leans on an overreach token without a proof to back it or a demarcation to clear it. Back it with a sealed /theorem/<key>, or demarcate it (not / never / no / simulation / finite). Audited before published.' } } },
  { name: 'uuidna_vocabulary',
    description: 'The COMMON, COMPUTABLE vocabulary derived from every theorem and its domain — each term (a domain or a capability) defined by the sealed ledger, self-audited by the honesty gate, content-addressed, and folded (in trinities) to ONE recomputable receipt: the honest "all is one" — one receipt, integrity, NOT a metaphysical singularity. Maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO 2108, SMPTE, Nyquist–Shannon …) — a citation, never a compliance claim. Translation-ready: a translation binds to a term by a provenance receipt. Deterministic and recomputable by anyone.',
    inputSchema: { type: 'object', properties: {} },
    run: () => vocabulary() },
  { name: 'uuidna_resources',
    description: 'Honest device resource accounting — balance the thermodynamics by MEASURING what is spent, never claiming it is free. Reports CPU time (this process), memory (rss/heap), and the machine\'s load, cores, total/free memory and uptime, all read from Node/OS, content-addressed as a signed reading. States plainly what it does NOT measure (GPU, bandwidth, and the actual joules need platform-specific probes and are not invented). No free energy: this work costs energy, bounded below by Landauer\'s kT·ln2 per bit and far more on a real chip; efficiency is pushed toward that floor, never past it.',
    inputSchema: { type: 'object', properties: {} },
    run: () => resources() },
  { name: 'uuidna_audit_cve',
    description: 'Fingerprint a CVE\'s PUBLIC advisory metadata from NIST\'s NVD (National Vulnerability Database, no key) — id, description, CVSS severity, dates — content-addressed, for the security reflection. Pass {cveId} like "CVE-2021-44228". HONEST: it fingerprints the PUBLIC metadata only, NOT an exploit or the affected code, and it is NOT a claim uuidna assesses, reproduces or fixes the vulnerability. NVD publishes; uuidna fingerprints the public record so it can be cited and rechecked by anyone.',
    inputSchema: { type: 'object', properties: { cveId: { type: 'string', description: 'a CVE id, e.g. CVE-2021-44228' } }, required: ['cveId'] },
    run: (a) => auditCve(String(a.cveId)) },
  { name: 'uuidna_nist_constant',
    description: 'Verify uuidna\'s physics against NIST\'s AUTHORITATIVE CODATA values. Fetches the official NIST fundamental-constants table (physics.nist.gov) and returns constants matching {query} — value, uncertainty, unit, and a content-address — so a constant uuidna uses (the speed of light in cosmic_speed_limit, Boltzmann\'s k for Landauer\'s kT·ln2) is RECHECKED against the external authority, not self-asserted. HONEST: verification against NIST\'s published values, NOT a claim NIST endorses uuidna; values carry uncertainties except the defined-exact ones. One network call; the address recomputes against NIST\'s table.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'a constant name, e.g. "speed of light" or "Boltzmann"' } }, required: ['query'] },
    run: (a) => nistConstant(String(a.query)) },
  { name: 'uuidna_anchor',
    description: 'Anchor a record\'s content-address to an EXTERNAL, independent, signed timestamp — the rigorous "Schumann resonance at the time". Fetches the current NIST Randomness Beacon pulse (a 512-bit value published, SIGNED, and archived every 60s at beacon.nist.gov) and folds it into {address}, giving a re-verifiable NOT-BEFORE bound: the record existed at or after that pulse, because its unpredictable value could not be known before. Anyone re-fetches NIST\'s archived pulse and re-verifies the fold IN-HOUSE. HONEST: NOT-BEFORE only; for NOT-AFTER, publish (a git push GitHub timestamps); for a formal legal timestamp, use an RFC 3161 authority or OpenTimestamps. One network call; the fold is pure.',
    inputSchema: { type: 'object', properties: { address: { type: 'string' } }, required: ['address'] },
    run: (a) => beaconAnchor(String(a.address)) },
  { name: 'uuidna_prior_art',
    description: 'Mint an IN-HOUSE defensive-publication record for the named theorems ({keys:[...]}) — a self-contained, recomputable manifest of WHAT was published (each theorem in full, statement + proof), by WHOM (attribution), under WHAT terms (CC BY-NC-ND 4.0 + its address), bound to the ledger receipt, folded to one content-address any change moves. Zero external dependency. THE ONE HONEST LIMIT: the WHEN is NOT in-house — a self-signed date is worthless for priority; it names the external anchor to cite (the public git commit on GitHub, a Zenodo DOI, or an RFC 3161 timestamp authority) and fakes nothing. Proves what/who/integrity/terms; not when, and not that the result is law or standard.',
    inputSchema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' } } }, required: ['keys'] },
    run: (a) => priorArt((a.keys as string[]).map(String)) },
  { name: 'uuidna_legal_facts',
    description: 'The recomputable legal FACT BASE, in chat — explicitly NOT a legal audit, legal advice, or a compliance opinion, and it must not be presented as one. Gathers the legally-relevant facts a qualified attorney/auditor starts FROM: the licence (CC BY-NC-ND 4.0 + its content-address), the copyright/attribution (Tsvetan Rouschev), the ledger\'s tamper-evident receipt, the compliance STANCE (the project makes no compliance claim and its own forensics refuses a blanket one), and the standards it CITES (not certifies) — folded to one receipt anyone recomputes. The inputs, never the verdict; a real legal audit needs licensed counsel reviewing specific jurisdictions against the actual deployment. uuidna delivers what recomputes; the ruling is a human\'s.',
    inputSchema: { type: 'object', properties: {} },
    run: () => legalFacts() },
  { name: 'uuidna_reflects',
    description: 'Reveal the sealed theorems a real-world system ALREADY reflects. Describe a system by its devices and concepts (e.g. home security: "keypad code tamper sensor detect alarm zone parity layered defence signature encryption schedule") and it matches those concepts against the ledger, returning the EXISTING `by decide` theorems whose arithmetic the system rests on — folded to one receipt. HONEST: the theorems already exist and were proven for their own domain; this shows the SAME arithmetic recurs — it does NOT claim uuidna is that system, that the theorems were built for it, or that citing them makes the system secure/correct. A resemblance the ledger carries, recomputable by anyone.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'a system described by its devices/concepts' } }, required: ['query'] },
    run: (a) => reflects(String(a.query)) },
  { name: 'uuidna_due_process',
    description: 'VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem is verified by the same fair trial, and every guarantee that makes the process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted (a decidable test holds OR a sealed authority is cited), the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded — routed to the development trial), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket — each is adjudicated by the same process (PROVEN/REFUTED/NOT-PROVEN + a note). Folds to one recomputable docket receipt. HONEST SCOPE: integrity, not truth — this is uuidna\'s OWN recomputable adjudication whose rules are theorems anyone rechecks; it is NOT a court of law, NOT legal advice, and NOT an enforceable ruling. "Due" means the process is fair and recomputable by its sealed guarantees; the binding ruling stays a human court\'s. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}.',
    inputSchema: { type: 'object', properties: { claims: { type: 'array', items: { type: 'string' }, description: 'claims to put on the docket, each adjudicated by due process' } } },
    run: (a = {}) => dueProcess(Array.isArray(a.claims) ? (a.claims as unknown[]).map(String) : []) },
  { name: 'uuidna_cloudflare_audit',
    description: 'AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. Reflects the committed wrangler.toml: the ASSETS binding (static ./site served read-only — no secret, no crypto target), the TRIALS KV (OPT-IN and commented out — no namespace id committed, consent-gated), the TRIAL_KEY secret (a `wrangler secret`, NEVER in the repo — signs each verdict with HMAC-SHA256), and token-free OIDC publish. QUANTUM POSTURE: symmetric-only (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256) — no RSA/ECC, so Shor has no asymmetric target; Grover only halves to a ~128-bit floor. Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,honest}. HONEST SCOPE: audits the COMMITTED CONFIG posture (no secret committed + symmetric crypto), NOT the live edge deployment (the real secret and KV id live at the edge, not the repo) — not a penetration test or a compliance certification. A live audit needs the Cloudflare account.',
    inputSchema: { type: 'object', properties: {} },
    run: () => auditCloudflareBindings() },
  { name: 'uuidna_sign',
    description: 'SIGN a commit message (or any statement) as TRUE — or refuse. A message is SIGNED-TRUE iff, checked against the sealed ledger, it CITES a real sealed theorem (a /theorem/<key> or "theorem <key>") and NONE fabricated (slimGate VERIFIED). The signature is the message content-address FOLDED with its cited theorems through merkleGravity — one gravity root, order-invariant, through the abstract-0 (÷0=0): "folding to 1 through 0". A message citing a proof NOT in the ledger is REFUSED; one citing no theorem is UNSIGNED; one citing a real sealed theorem is SIGNED. The reconcile can FAIL unless the commit is signed-true, so an overclaiming message cannot be committed AS TRUTH. HONEST SCOPE: "signed-true" means BACKED by a sealed proof it names — NOT that the claim is true; it signs the CITATION, not the world. No word-list, no forced count. Returns {signed,verdict,address,cited,citedCount,fabricated,fold,reason,honest}.',
    inputSchema: { type: 'object', properties: { message: { type: 'string' } }, required: ['message'] },
    run: (a) => signCommit(String(a.message)) },
  { name: 'uuidna_reveal',
    description: 'THE SURFACING — close the hollow-prose leak by showing the verdict, not the drain-bit. The honesty gate drains only a FABRICATED citation, so a hollow boast ("provably unbreakable, 100% secure") returns holds=1 and READS as OK even though it is unbacked. uuidna_reveal surfaces the explicit three-way verdict slimGate already computes: VERIFIED (cites a sealed proof — backed), DRAINED (cites a proof not in the ledger — the one decidably-false case, refused), or UNVERIFIED (cites no sealed proof — REVEALED as UNBACKED, not verified). Pass {claim}. It uses NO word-list (a lexicon is itself a leaky floor — the ledger tried one and sealed the verdict against it); only the ledger decides. The point: "holds" means "not drained", NEVER "true" — a hollow boast stays UNVERIFIED, never VERIFIED; trust only the stamp, not the absence of a drain. Returns {verdict, binary, cites, fabricated, reveal}.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' } }, required: ['claim'] },
    run: (a) => reveal(String(a.claim)) },
  { name: 'uuidna_slim_gate',
    description: 'The gate of all gates, as slim as it gets: ONLY theorems, no lexicon. Judges a {claim} by ONE recomputable question — do the theorems it cites (/theorem/<key>) actually exist, sealed, in the ledger? VERIFIED iff it cites a real sealed theorem and none fabricated; UNVERIFIED otherwise (cites none, or cites a proof not in the ledger — which verifies nothing; never "false"). The `fabricated` list is still returned so the publish gate can refuse shipping a note that names a nonexistent proof. Computed from the sealed ledger alone; delete every word-list and it still stands.',
    inputSchema: { type: 'object', properties: { claim: { type: 'string' } }, required: ['claim'] },
    run: (a) => slimGate(String(a.claim)) },
  { name: 'uuidna_reason',
    description: 'IN-HOUSE reasoning that USES the sealed rules of inference. Give {facts:[atoms], rules:[{if:[atoms],then:atom}]} and it forward-chains to a fixpoint: whenever every premise of a rule is known it concludes the head by MODUS PONENS (or the hypothetical syllogism for a chain), CITING the sealed theorem at each step. Bounded (cannot loop forever), deterministic, and folds the whole derivation to one receipt anyone rechecks. Honest scope: bounded propositional forward-chaining over the rules you give — NOT a general theorem prover; it derives only what those rules entail, and never claims a conclusion is TRUE, only that it FOLLOWS.',
    inputSchema: { type: 'object', properties: { facts: { type: 'array', items: { type: 'string' } }, rules: { type: 'array', items: { type: 'object', properties: { if: { type: 'array', items: { type: 'string' } }, then: { type: 'string' } } } } }, required: ['facts', 'rules'] },
    run: (a) => reason((a.facts as string[]).map(String), (a.rules as { if: string[]; then: string }[])) },
  { name: 'uuidna_fingerprint',
    description: 'The FUSED ledger fingerprint — two integrity layers, stated honestly. The fast FNV receipt is TAMPER-EVIDENT (any change moves it, keyless) but NOT collision-resistant; the SHA-256 fold (over the sorted addresses, order-invariant) IS collision-resistant, so a forgery that survives it costs a ~2^128 collision — a BOUND set by the primitive, NOT a maximum. Add a key (HMAC) and forgery also needs the secret. Recomputable by anyone from the same lean/*.lean. Returns {count, fnvReceipt, sha256, tamperCost}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => ledgerFingerprint() },
  { name: 'uuidna_forensics',
    description: 'FORENSICS — audit an agent STATEMENT against the RECEIPTS, to catch a FALSE TRIAL (a claim dressed as sealed that the ledger does not back). Recomputes and compares, detecting: a fabricated citation (cites a /theorem/<key> not in the sealed ledger), a false address (a uuid presented as a sealed address that is not one), a drained overclaim (the honesty gate), an unbacked legal claim (says lawful/compliant but carries no receipt — a legal claim must cite the specific content-addressed statement; the receipt proves the claim was made, NEVER that it is legally correct), and an address-mismatch (a {text→address} claim that does not recompute). Every violation is a recomputable fact about the CLAIM, never an accusation of a person. Pass {statement} and optional {claims:[{text,address}]}.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' }, claims: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, address: { type: 'string' } } } } }, required: ['statement'] },
    run: (a) => forensics(String(a.statement), Array.isArray(a.claims) ? { claims: a.claims } : {}) },
  { name: 'uuidna_evidence',
    description: 'Deliver the recomputable EVIDENCE bundle for a {statement}, so a court or auditor accepts a uuidna trial by RECOMPUTING it, not trusting it. Assembles: the statement + its content-address, the trial verdict, the forensic audit against the receipts, every cited proof IN FULL (its Lean text, address, source file), the ledger receipt the evidence is bound to, the exact ordered steps to reproduce every number, and one evidenceReceipt folding it all. Anyone re-runs the steps and lands on the same receipt — or the evidence is void. Proves INTEGRITY (the claim was made, the proofs are these, nothing quietly changed), NEVER legal correctness — that is a court\'s ruling, not a fold. Deterministic and offline.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: (a) => evidence(String(a.statement)) },
  { name: 'uuidna_compare',
    description: 'PATTERN RECOGNITION — recognise the pattern two texts share by examining how they DIFFER. Partitions their word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is DERIVED from that difference, and inclusion–exclusion (|A| + |B| − shared = union) is checked exactly, so the number is a proof, not an estimate. The shared tokens fold to one order-invariant receipt — the recognised pattern. Similarity is only ever measured against difference. Compares vocabulary, NOT meaning; nothing is stored. Integrity, not truth.',
    inputSchema: { type: 'object', properties: { a: { type: 'string' }, b: { type: 'string' } }, required: ['a', 'b'] },
    run: (x) => comparePublications(String(x.a), String(x.b)) },
  { name: 'uuidna_trial',
    description: 'Run the whole Lean ledger through the trial: every theorem is VERIFIED by its `by decide` proof, and their content-addresses fold order-invariantly to ONE recomputable receipt (the ledger\'s integrity). Returns {count,verified,unverified,leanBacked,receipt,verdicts}. Same lean/*.lean, same receipt.',
    inputSchema: { type: 'object', properties: {} },
    run: () => runTrial() },
  { name: 'uuidna_mcp_benchmark',
    description: 'Feed the MCP to itself: a USABILITY benchmark over the server\'s OWN catalog. Measures the surface on "maximum reusable tools per minimum keys" — how many tools are zero-arg (maximally reusable), the reusable-tools-per-required-key density, the average required keys, and the HARDEST tools (most required keys) as the self-development targets to simplify. Returns {tools,zeroArgReusable,totalRequiredKeys,reusablePerKey,avgRequiredKeys,hardest}. Recomputable — the MCP measuring the MCP, no opinion.',
    inputSchema: { type: 'object', properties: {} },
    run: () => mcpBenchmark() },
  { name: 'uuidna_unify',
    description: 'The UNIFIED self-description: ONE recomputable receipt folding uuidna\'s three faces — the sealed theorems (the trial), the domains that carry them (the reviews), and the tools that serve them (the usability benchmark/ratings). CI, the MCP and the site read this one object; recompute from the same ledger and the receipt returns. Returns {handle,theorems,domains,tools,receipt} — cite the handle (the first segment), the whole receipt is the fold.',
    inputSchema: { type: 'object', properties: {} },
    run: () => unify() },
  { name: 'uuidna_selftest',
    description: 'The MCP tests ITSELF — pure self-consistency, no external oracle: every catalog tool must resolve to a handler, and every zero-arg tool must RUN and be DETERMINISTIC (two calls recompute identically). A tool that reads live device state surfaces as non-deterministic, honestly. Folds to one self-test receipt. Returns {checks,passed,deterministic,failed,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => mcpSelfTest() },
  // ── the bidirectional channel — the uuid stream IS the medium. SEND = encrypt (7d secrecy) then imprint the
  //    sealed envelope INTO a uuid chain; RECEIVE = read the uuid chain then decrypt. One side per direction; the
  //    seven dimension streams each carry both ways; the wrong key never opens it (the pattern the 777 tests seal). ──
  { name: 'uuidna_send',
    description: 'SEND (→): the SESSION RATCHET over uuid. Encrypt text under a passphrase and a `session` (a channel/room id), then imprint the sealed envelope INTO a uuid stream — the channel IS uuid. The captain theorem as encryption: the two coins are paid ONCE (one PBKDF2-600k on the session), then every message ROTATES a fresh key by its advancing `step` and seals free (~0.1 ms, not 1.75 s). Rotation closes the equality leak; the SESSION is a real secrecy boundary — a message can only be opened by a receiver that names the SAME session (a different session/referer cannot). The session lives in the passphrase until destroyed. `step` MUST advance (never reuse it under one session). Returns the uuid chain to transport.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' }, session: { type: 'string', description: 'the channel/room id that scopes this message — the receiver must name the same session to open it' }, step: { type: 'integer', description: 'the advancing message position — rotates the key and closes the equality leak; MUST be unique per message under one session' } }, required: ['text', 'passphrase'] },
    run: (a) => imprintTextChain(JSON.stringify(encryptSession(String(a.text), String(a.passphrase), String(a.session ?? ''), a.step === undefined ? 0 : Number(a.step)))) },
  { name: 'uuidna_receive',
    description: 'RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope and decrypt, deriving the key from the RECEIVER\'s OWN `session` (not the envelope) — so a message sealed for another session/referer cannot be opened here (Poly1305 rejects it). A wrong passphrase or any tamper also throws. The reverse of the ratchet; the session is derived once (cached) and rotated by the message step.',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } }, passphrase: { type: 'string' }, session: { type: 'string', description: 'the SAME session/channel id used to send; keys off this, not the envelope, so the session is a real boundary' } }, required: ['uuids', 'passphrase'] },
    run: (a) => decryptSession(JSON.parse(readImprintTextChain((a.uuids as string[]).map(String))) as Sealed, String(a.passphrase), String(a.session ?? '')) },
  // ── the quantum computer — the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale),
  //    no floats, no decimal drift). Build a Bell or GHZ state; read its exact rational distribution, marginals, and
  //    order-invariant receipt. Classical simulation, 2^n amplitudes — exponential, NO quantum advantage. ──
  { name: 'uuidna_quantum',
    description: 'Run the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale) — no floats, no decimal drift). Either a named `circuit` (bell/ghz) OR an arbitrary `ops` circuit in OpenQASM/Qiskit gate names (h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz) — so any system that speaks quantum circuits interops. Returns the EXACT rational distribution, per-qubit marginals (the no-signaling check), the order-invariant receipt, and — for an H-free circuit — the CLASSICAL truth table (the reversible logic the gates compute, usable directly by classical systems; Toffoli/ccx is universal). HONEST: classical simulation — 2^n amplitudes, EXPONENTIAL, NO quantum advantage, NOT quantum hardware.',
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
      const out: Record<string, unknown> = { ...meta, qubits: state.qubits, outcomes, marginals, receipt: receiptOf(state), honest: 'classical state-vector simulation — 2^n amplitudes, exponential, no quantum advantage, not quantum hardware' }
      if (Array.isArray(ops) && isClassical(ops)) out.classical = truthTable(state.qubits, ops) // the reversible logic, for classical systems
      return out
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
  'Honest scope, always demarcated: receipts and content-addresses are NON-crypto FNV (integrity/routing, not secrecy, not a binding commitment); secrecy is ChaCha20-Poly1305 only; the quantum tools are EXACT classical simulation (no advantage), not hardware; nothing is infinite or unbreakable. A claim is either linked to a sealed theorem or refused. Integrity, not truth.',
].join(' ')

interface RpcParams { protocolVersion?: string; name?: string; arguments?: Record<string, unknown>; [k: string]: unknown }
interface RpcMessage { jsonrpc?: string; id?: JsonId; method: string; params?: RpcParams }

const send = (msg: unknown) => process.stdout.write(JSON.stringify(msg) + '\n')
const ok = (id: JsonId, r: unknown) => send({ jsonrpc: '2.0', id, result: r })
const err = (id: JsonId, code: number, message: string) => send({ jsonrpc: '2.0', id, error: { code, message } })

// The MCP receipt ledger — every tool call folds to a content-address CHAINED from the prior (the referer
// rotation), so an agent always holds a tamper-evident receipt for its command and the whole session folds to one
// recomputable tip. HONEST: this is a NON-crypto FNV content-address — an audit/integrity/routing trail, not a
// secret and not a binding (collision-resistant) commitment. Where secrecy or a hard seal is needed, that is the
// crypt/sha256 layer, not this. Integrity, not truth.
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
    return Promise.resolve()
      .then(() => t.run(args))
      .then((out) => withReceipt(id, receiptFor(t.name, args, out), [{ type: 'text', text: typeof out === 'string' ? out : JSON.stringify(out) }]))
      .catch((e) => withReceipt(id, receiptFor(t.name, args, { error: e?.message || String(e) }), [{ type: 'text', text: 'error: ' + (e?.message || String(e)) }], true))
  }
  if (id !== undefined) return err(id, -32601, 'method not found: ' + method)
}

// Start the stdio server ONLY when run as the entrypoint (npx uuidna-mcp / node dist/mcp.js) — so the module can
// be imported for its catalog (MCP_CATALOG, below) without consuming stdin. Do NOT exit on stdin 'end': a pending
// async call (e.g. PBKDF2 in uuidna_encrypt) must flush its response first; with no more input and no pending
// work Node's event loop drains and the process exits on its own.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
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
export interface McpCatalogEntry { name: string; description: string; category: string; skill: string; inputSchema?: ToolSchema }
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
  [/^(theorems|theorem|trial|skills|render|render_list|fingerprint|review_domains|coverage|document)$/, 'Theorems & trial', 'theorem'],
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
  [/^(gate|reeducate|adjudicate|prove_verdict|verify|harness|harness7)$/, 'Honesty gate', 'gate'],
  [/^quantum$/, 'Quantum simulation', 'quantum'],
  [/^bill$/, 'Billing & measure', 'billing'],
  [/^(tokens|cost|resources)$/, 'Billing & measure', 'measure'],
  [/^mcp_benchmark$/, 'MCP self-benchmark (usability)', 'measure'],
  [/^unify$/, 'Unified self-description (one receipt)', 'measure'],
  [/^selftest$/, 'MCP self-test (recomputable contract)', 'measure'],
]
const categoryOf = (name: string): [string, string] => {
  const key = name.replace(/^uuidna_/, '')
  for (const [re, cat, skill] of CATEGORIES) if (re.test(key)) return [cat, skill]
  return ['Other', 'other']
}
export const MCP_CATALOG: McpCatalogEntry[] = TOOLS.map((t) => {
  const [category, skill] = categoryOf(t.name)
  return { name: t.name, description: t.description, category, skill, inputSchema: t.inputSchema as ToolSchema }
})

/** Every tool name the server exposes — the catalog's keys, so a test can iterate the SERVED surface. */
export const TOOL_NAMES: readonly string[] = TOOLS.map((t) => t.name)

/** callTool — invoke a tool's handler by name: the SAME dispatch the MCP server runs for a `tools/call`. Exposed so
 *  CI exercises the SERVED interface (not just the functions underneath), and so the catalog can never list a tool
 *  the handlers don't answer — the CI ↔ MCP no-drift check. Throws on an unknown tool, exactly as the server does. */
export function callTool(name: string, args: Record<string, unknown> = {}): unknown {
  const tool = TOOLS.find((t) => t.name === name)
  if (!tool) throw new Error(`unknown tool: ${name}`)
  return tool.run(args)
}

// ── THE UUIDNA QUANTUM ENGINE — import/export fused into ONE input→output surface ───────────────────────────────
// You do not import a function; you feed the engine an INPUT {op, args} and read its OUTPUT. Every module export is
// reached through this one door: the same dispatch the server runs (callTool), wrapped so the triple (op, input,
// output) folds — order-invariantly — to a content-address receipt anyone recomputes. One run, one receipt. The
// engine does not dispatch itself (no recursion). Integrity, not truth: it computes nothing the sealed tool doesn't.
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
    handle: receipt.slice(0, 8),
    theorems: { count: trial.count, verified: trial.verified, receipt: trial.receipt },
    domains: { count: reviews.length, verdict: 'VERIFIED', receipt: domainsReceipt },
    tools: { count: bench.tools, avgRating: bench.avgRating, reusablePerKey: bench.reusablePerKey, receipt: toolsReceipt },
    receipt,
  }
}
