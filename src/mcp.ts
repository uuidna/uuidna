#!/usr/bin/env node
// uuidna MCP server — fuse uuidna into any harness (Claude, Cursor, any MCP client).
// Zero runtime deps: a minimal JSON-RPC 2.0 server over stdio, calling the same pure functions the build seals.
// Run:  npx @uuidna/uuidna         (bin: uuidna-mcp)
// Add to a client's mcpServers as { "command": "npx", "args": ["-y", "@uuidna/uuidna"] }.
import {
  toUuid, strictUuidna, merge, coin64, merkleFold, merkleRoot, merkleProof, verifyProof, computes,
  imprintTextChain, readImprintTextChain, billUuidna, reeducate,
  encrypt, decrypt, verifyEnvelope, sealSequence, MAX_ITER,
  sealStream, openStream, sealChain, openChain,
  digitalRoot, merkleGravity, doubleTorusField, adjudicate, proveVerdict, verifyUuidna,
  units, triad, vortexOrbit, diamond, involute, involutionFixed, seats,
  harness, harness7, renderTheorem, renderHero, renderList,
  sha256, hmacSha256, pbkdf2Sha256, chacha20, poly1305, aeadEncrypt, aeadDecrypt,
  bellState, ghzState, distribution, marginal, receiptOf, fraction, label, runCircuit, isClassical, truthTable,
  THEOREMS, runTrial, theorems, skillGroups,
} from './index.js'
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
    description: 'Measured billing: bits saved (O(N) − O(1)) and the two coins (the conserved fair-exchange invariant). Public interest is free.',
    inputSchema: { type: 'object', properties: { commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['commercial', 'recomputeOps', 'verifyOps'] },
    run: (a) => billUuidna({ commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps), verifyOps: Number(a.verifyOps) }) },
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
  { name: 'uuidna_gravity',
    description: 'The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics; a content-addressed fixed point.',
    inputSchema: { type: 'object', properties: { addresses: { type: 'array', items: { type: 'string' } } }, required: ['addresses'] },
    run: ({ addresses }) => merkleGravity((addresses as string[]).map(String)) },
  { name: 'uuidna_digital_root',
    description: 'The fall of an integer to its ℤ/9 digital root (1..9) — the number\'s gravity, recomputable by anyone.',
    inputSchema: { type: 'object', properties: { n: { type: 'number' } }, required: ['n'] },
    run: ({ n }) => digitalRoot(Number(n)) },
  { name: 'uuidna_adjudicate',
    description: 'The trial: a recomputable three-way verdict for a statement — REFUTED (gate drains an overclaim), SEALED (gate-clean and admissible), or UNVERIFIED (gate-clean but no receipt). Integrity, not truth.',
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
    inputSchema: { type: 'object', properties: { principle: { type: 'string' }, skill: { type: 'string', description: 'the capability axis: involution, z9-ring, z7-rosette, clay-reflection, reflection, quantum, crypt-salt, science-pairs, vortex, foundational' }, contains: { type: 'string' } } },
    run: (a = {}) => { let ts = theorems(a.skill ? { skill: String(a.skill) } : {}); if (a.principle) ts = ts.filter((t) => t.principle.toLowerCase().includes(String(a.principle).toLowerCase())); if (a.contains) { const q = String(a.contains).toLowerCase(); ts = ts.filter((t) => (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q)) } return ts } },
  { name: 'uuidna_skills',
    description: 'The theorem ledger organised by SKILL — the capability axis, orthogonal to principle. A skill is derived (recomputable) from each theorem\'s key. Returns each skill with its count and the order-invariant fold of its theorems\' content-addresses. Then pull one skill\'s theorems with uuidna_theorems { skill }.',
    inputSchema: { type: 'object', properties: {} },
    run: () => skillGroups().map((g) => ({ skill: g.skill, count: g.count, fold: g.fold })) },
  { name: 'uuidna_theorem',
    description: 'Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' } }, required: ['key'] },
    run: ({ key }) => { const t = THEOREMS.find((x) => x.key === String(key)); if (!t) throw new Error('unknown theorem: ' + key + ' (see uuidna_theorems)'); return { key: t.key, name: t.name, statement: t.statement, lean: t.lean, principle: t.principle, file: t.file, address: t.address, verdict: 'SEALED', source: 'https://github.com/uuidna/uuidna/blob/main/lean/' + t.file } } },
  { name: 'uuidna_trial',
    description: 'Run the whole Lean ledger through the trial: every theorem is SEALED by its `by decide` proof, and their content-addresses fold order-invariantly to ONE recomputable receipt (the ledger\'s integrity). Returns {count,sealed,refuted,unverified,leanBacked,receipt,verdicts}. Same lean/*.lean, same receipt.',
    inputSchema: { type: 'object', properties: {} },
    run: () => runTrial() },
  // ── the bidirectional channel — the uuid stream IS the medium. SEND = encrypt (7d secrecy) then imprint the
  //    sealed envelope INTO a uuid chain; RECEIVE = read the uuid chain then decrypt. One side per direction; the
  //    seven dimension streams each carry both ways; the wrong key never opens it (the pattern the 777 tests seal). ──
  { name: 'uuidna_send',
    description: 'SEND (→): encrypt text under a passphrase (pure-TS ChaCha20-Poly1305, 7d-fold envelope), then imprint the sealed envelope INTO a uuid stream — the channel is uuid itself. Returns the uuid chain to transport. Pass an advancing `step` (the crypt salt) so identical messages never ride the wire alike — the equality leak stays closed in transit. Receive it with uuidna_receive and the same passphrase.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' }, step: { type: 'integer', description: 'the advancing-sequence step — omit for convergent, supply and advance to close the equality leak in transit' } }, required: ['text', 'passphrase'] },
    run: (a) => imprintTextChain(JSON.stringify(encrypt(String(a.text), String(a.passphrase), a.step === undefined ? undefined : Number(a.step)))) },
  { name: 'uuidna_receive',
    description: 'RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope, then decrypt with the passphrase. The reverse direction of the bidirectional channel. A wrong key or any tamper throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } }, passphrase: { type: 'string' } }, required: ['uuids', 'passphrase'] },
    run: (a) => decrypt(JSON.parse(readImprintTextChain((a.uuids as string[]).map(String))) as Sealed, String(a.passphrase)) },
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
  'Start here: uuidna_theorems (browse the sealed ledger; filter by principle/skill), uuidna_address (content-address anything), uuidna_trial (a three-way REFUTED / SEALED / UNVERIFIED verdict), uuidna_run_ledger (fold the whole ledger to its receipt), uuidna_tokens (report your token distribution to measure tokens-per-theorem).',
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
  [/^(merkle_root|merkle_prove|merkle_verify|gravity)$/, 'Merkle & gravity', 'merkle'],
  [/^(imprint|read|send|receive)$/, 'Imprint & messaging', 'imprint'],
  [/^(encrypt|decrypt|seal_stream|verify_envelope|seal_onion|open_onion|seal_chain|open_chain)$/, 'Crypto & streams', 'crypto'],
  [/^(sha256|hmac|pbkdf2|chacha20|poly1305|aead_encrypt|aead_decrypt)$/, 'Crypto primitives', 'crypto'],
  [/^(theorems|theorem|trial|skills|render|render_list)$/, 'Theorems & trial', 'theorem'],
  [/^(gate|reeducate|adjudicate|prove_verdict|verify|harness|harness7)$/, 'Honesty gate', 'gate'],
  [/^quantum$/, 'Quantum simulation', 'quantum'],
  [/^bill$/, 'Billing & measure', 'billing'],
  [/^tokens$/, 'Billing & measure', 'measure'],
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
