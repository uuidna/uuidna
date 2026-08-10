#!/usr/bin/env node
// uuidna MCP server — fuse uuidna into any harness (Claude, Cursor, any MCP client).
// Zero runtime deps: a minimal JSON-RPC 2.0 server over stdio, calling the same pure functions the build seals.
// Run:  npx @uuidna/uuidna         (bin: uuidna-mcp)
// Add to a client's mcpServers as { "command": "npx", "args": ["-y", "@uuidna/uuidna"] }.
import {
  toUuid, merkleRoot, merkleProof, verifyProof, computes,
  imprintTextChain, readImprintTextChain, billUuidna, reeducate,
  encrypt, decrypt, verifyEnvelope,
  digitalRoot, merkleGravity, adjudicate, proveVerdict, verifyUuidna,
  harness, harness7, renderTheorem, renderHero,
  sha256, hmacSha256, pbkdf2Sha256, chacha20, poly1305, aeadEncrypt, aeadDecrypt,
} from './dist/index.js'

const VERSION = '6.4.7'

// byte codecs — the low-level crypto primitives are Uint8Array in/out; MCP is JSON, so keys/nonces/tags/ciphertext
// cross the wire as hex and human text crosses as UTF-8. (toUuid/merkleFold use non-cryptographic FNV; sha256 here
// is the cryptographic hash — collision-resistant by the pigeonhole bound, 2^256 seats.)
const te = new TextEncoder(), td = new TextDecoder()
const utf8 = (s) => te.encode(String(s))
const hex = (u) => Array.from(u, (b) => b.toString(16).padStart(2, '0')).join('')
const unhex = (s) => { const h = String(s).replace(/\s+/g, ''); if (h.length % 2 || /[^0-9a-fA-F]/.test(h)) throw new Error('expected hex'); const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16); return u }
const need = (u, n, what) => { if (u.length !== n) throw new Error(what + ' must be ' + n + ' bytes (' + n * 2 + ' hex chars), got ' + u.length); return u }

const TOOLS = [
  { name: 'uuidna_address',
    description: 'Content-address any text: a deterministic 128-bit v8 UUID. Same input → same address, for anyone, with no key. Integrity, not secrecy.',
    inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'the value to address' } }, required: ['text'] },
    run: ({ text }) => toUuid(String(text)) },
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
    run: ({ leaves }) => merkleRoot(leaves.map(String)) },
  { name: 'uuidna_merkle_prove',
    description: 'Holographic inclusion proof for the leaf at index — an O(log N) audit path that verifies the whole from a tiny part.',
    inputSchema: { type: 'object', properties: { leaves: { type: 'array', items: { type: 'string' } }, index: { type: 'number' } }, required: ['leaves', 'index'] },
    run: ({ leaves, index }) => merkleProof(leaves.map(String), Number(index)) },
  { name: 'uuidna_merkle_verify',
    description: 'Verify a leaf against a root using an inclusion proof (a forged leaf fails).',
    inputSchema: { type: 'object', properties: { leaf: { type: 'string' }, proof: {}, root: { type: 'string' } }, required: ['leaf', 'proof', 'root'] },
    run: ({ leaf, proof, root }) => verifyProof(String(leaf), proof, String(root)) },
  { name: 'uuidna_imprint',
    description: 'Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption.',
    inputSchema: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
    run: ({ text }) => imprintTextChain(String(text)) },
  { name: 'uuidna_read',
    description: 'Decode text back from a uuid chain produced by uuidna_imprint (round-trips exactly).',
    inputSchema: { type: 'object', properties: { uuids: { type: 'array', items: { type: 'string' } } }, required: ['uuids'] },
    run: ({ uuids }) => readImprintTextChain(uuids.map(String)) },
  { name: 'uuidna_bill',
    description: 'Measured billing: bits saved (O(N) − O(1)) and the two coins (the conserved fair-exchange invariant). Public interest is free.',
    inputSchema: { type: 'object', properties: { commercial: { type: 'boolean' }, recomputeOps: { type: 'number' }, verifyOps: { type: 'number' } }, required: ['commercial', 'recomputeOps', 'verifyOps'] },
    run: (a) => billUuidna({ commercial: !!a.commercial, recomputeOps: Number(a.recomputeOps), verifyOps: Number(a.verifyOps) }) },
  { name: 'uuidna_encrypt',
    description: 'Encrypt text under a passphrase. Secrecy: pure-TS ChaCha20-Poly1305 (PBKDF2-SHA256, 600k) — no native crypto. Returns a sealed envelope whose content-address is the uuidna 7d-fold of its parts (public integrity/routing — never the secret).',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' } }, required: ['text', 'passphrase'] },
    run: (a) => encrypt(String(a.text), String(a.passphrase)) },
  { name: 'uuidna_decrypt',
    description: 'Decrypt a sealed envelope from uuidna_encrypt with the passphrase. A wrong key or tampered ciphertext throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' }, passphrase: { type: 'string' } }, required: ['sealed', 'passphrase'] },
    run: (a) => decrypt(a.sealed, String(a.passphrase)) },
  { name: 'uuidna_verify_envelope',
    description: 'Verify a sealed envelope\'s 7d-fold content-address (integrity/routing) without the key — public, reproducible.',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' } }, required: ['sealed'] },
    run: (a) => verifyEnvelope(a.sealed) },
  { name: 'uuidna_gravity',
    description: 'The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics; a content-addressed fixed point.',
    inputSchema: { type: 'object', properties: { addresses: { type: 'array', items: { type: 'string' } } }, required: ['addresses'] },
    run: ({ addresses }) => merkleGravity(addresses.map(String)) },
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
    run: (a) => proveVerdict(String(a.statement), (a.formulaReceipts || []).map(String)) },
  { name: 'uuidna_verify',
    description: 'The self-verdict: recompute uuidna\'s own claims from a seed and return the recomputable UuidnaVerdict (integrity, not truth; 0/7).',
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
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'the statement' }, key: { type: 'string', description: 'proof-page slug' }, base: { type: 'string', description: 'site base for the proof link, e.g. /millennium-solutions' }, kind: { type: 'string', enum: ['card', 'hero'], description: 'card (default) or hero' } }, required: ['name'] },
    run: (a) => (a.kind === 'hero' ? renderHero : renderTheorem)({ name: String(a.name), ...(a.key ? { key: String(a.key) } : {}) }, a.base ? { base: String(a.base) } : {}) },
  // ── the crypto surface: the standards AS local theorems (pure-TS, KAT-verified against the RFC/NIST vectors,
  //    zero native crypto). Bytes cross the wire as hex, human text as UTF-8. Integrity where the theorem gives
  //    integrity, secrecy where it gives secrecy — never more than it proves. 0/7. ──
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
    run: (a) => hex(pbkdf2Sha256(utf8(a.passphrase), utf8(a.salt), a.iterations ? Number(a.iterations) : 600000, a.length ? Number(a.length) : 32)) },
  { name: 'uuidna_chacha20',
    description: 'ChaCha20 keystream cipher (local theorem, RFC 8439 ARX permutation): returns hex of text ⊕ keystream. key is 32-byte hex, nonce 12-byte hex, counter defaults to 0. CAVEAT (0/7): NEVER reuse a (key, nonce, counter) — keystream reuse destroys confidentiality. For passphrase secrecy use uuidna_encrypt.',
    inputSchema: { type: 'object', properties: { key: { type: 'string', description: '32-byte hex' }, nonce: { type: 'string', description: '12-byte hex' }, counter: { type: 'number' }, text: { type: 'string' } }, required: ['key', 'nonce', 'text'] },
    run: (a) => hex(chacha20(need(unhex(a.key), 32, 'key'), a.counter ? Number(a.counter) : 0, need(unhex(a.nonce), 12, 'nonce'), utf8(a.text))) },
  { name: 'uuidna_poly1305',
    description: 'Poly1305 one-time authenticator (local theorem: exact arithmetic mod the prime 2^130−5). message and one-time key are hex (the key is 32 bytes); returns a 16-byte hex tag. CAVEAT (0/7): a one-time key authenticates exactly ONE message — never reuse it.',
    inputSchema: { type: 'object', properties: { message: { type: 'string', description: 'hex' }, oneTimeKey: { type: 'string', description: '32-byte hex' } }, required: ['message', 'oneTimeKey'] },
    run: (a) => hex(poly1305(unhex(a.message), need(unhex(a.oneTimeKey), 32, 'one-time key'))) },
  { name: 'uuidna_aead_encrypt',
    description: 'Raw ChaCha20-Poly1305 AEAD seal (local theorem, RFC 8439): returns {ct,tag} as hex. key 32-byte hex, nonce 12-byte hex, plaintext UTF-8, optional aad hex. CAVEAT (0/7): a (key, nonce) pair must be unique. For passphrase secrecy + a routable envelope use uuidna_encrypt.',
    inputSchema: { type: 'object', properties: { key: { type: 'string' }, nonce: { type: 'string' }, plaintext: { type: 'string' }, aad: { type: 'string', description: 'optional hex' } }, required: ['key', 'nonce', 'plaintext'] },
    run: (a) => { const r = aeadEncrypt(need(unhex(a.key), 32, 'key'), need(unhex(a.nonce), 12, 'nonce'), utf8(a.plaintext), a.aad ? unhex(a.aad) : new Uint8Array()); return { ct: hex(r.ct), tag: hex(r.tag) } } },
  { name: 'uuidna_aead_decrypt',
    description: 'Verify + open a raw ChaCha20-Poly1305 seal (local theorem). key/nonce/ct/tag are hex, optional aad hex; returns the UTF-8 plaintext. A wrong key or any tamper throws (Poly1305 authentication).',
    inputSchema: { type: 'object', properties: { key: { type: 'string' }, nonce: { type: 'string' }, ct: { type: 'string' }, tag: { type: 'string' }, aad: { type: 'string', description: 'optional hex' } }, required: ['key', 'nonce', 'ct', 'tag'] },
    run: (a) => td.decode(aeadDecrypt(need(unhex(a.key), 32, 'key'), need(unhex(a.nonce), 12, 'nonce'), unhex(a.ct), need(unhex(a.tag), 16, 'tag'), a.aad ? unhex(a.aad) : new Uint8Array())) },
]

const send = (msg) => process.stdout.write(JSON.stringify(msg) + '\n')
const ok = (id, r) => send({ jsonrpc: '2.0', id, result: r })
const err = (id, code, message) => send({ jsonrpc: '2.0', id, error: { code, message } })

function handle(msg) {
  const { id, method, params } = msg
  if (method === 'initialize') {
    const protocolVersion = params?.protocolVersion || '2024-11-05'
    return ok(id, { protocolVersion, capabilities: { tools: {} }, serverInfo: { name: 'uuidna', version: VERSION } })
  }
  if (method === 'notifications/initialized' || method === 'initialized') return // notification — no reply
  if (method === 'ping') return ok(id, {})
  if (method === 'tools/list') return ok(id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) })
  if (method === 'tools/call') {
    const t = TOOLS.find((x) => x.name === params?.name)
    if (!t) return err(id, -32602, 'unknown tool: ' + params?.name)
    return Promise.resolve()
      .then(() => t.run(params.arguments || {}))
      .then((out) => ok(id, { content: [{ type: 'text', text: typeof out === 'string' ? out : JSON.stringify(out) }] }))
      .catch((e) => ok(id, { content: [{ type: 'text', text: 'error: ' + (e?.message || String(e)) }], isError: true }))
  }
  if (id !== undefined) return err(id, -32601, 'method not found: ' + method)
}

let buf = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  buf += chunk
  let i
  while ((i = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
    if (!line) continue
    let msg; try { msg = JSON.parse(line) } catch { continue }
    try { handle(msg) } catch (e) { if (msg?.id !== undefined) err(msg.id, -32603, String(e?.message || e)) }
  }
})
// Do NOT exit on stdin 'end' — a pending async call (e.g. PBKDF2 in uuidna_encrypt) must flush its response
// first. With no more input and no pending work, Node's event loop drains and the process exits on its own.
