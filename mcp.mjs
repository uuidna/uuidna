#!/usr/bin/env node
// uuidna MCP server — fuse uuidna into any harness (Claude, Cursor, any MCP client).
// Zero runtime deps: a minimal JSON-RPC 2.0 server over stdio, calling the same pure functions the build seals.
// Run:  npx @uuidna/uuidna         (bin: uuidna-mcp)
// Add to a client's mcpServers as { "command": "npx", "args": ["-y", "@uuidna/uuidna"] }.
import {
  toUuid, merkleRoot, merkleProof, verifyProof, computes,
  imprintTextChain, readImprintTextChain, billUuidna, reeducate,
  encrypt, decrypt, verifyEnvelope,
} from './dist/index.js'

const VERSION = '0.3.0'

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
    description: 'Encrypt text under a passphrase. Secrecy: AES-256-GCM (PBKDF2-SHA256, 600k). Returns a sealed envelope whose content-address is the uuidna 7d-fold of its parts (public integrity/routing — never the secret).',
    inputSchema: { type: 'object', properties: { text: { type: 'string' }, passphrase: { type: 'string' } }, required: ['text', 'passphrase'] },
    run: (a) => encrypt(String(a.text), String(a.passphrase)) },
  { name: 'uuidna_decrypt',
    description: 'Decrypt a sealed envelope from uuidna_encrypt with the passphrase. A wrong key or tampered ciphertext throws (GCM authentication).',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' }, passphrase: { type: 'string' } }, required: ['sealed', 'passphrase'] },
    run: (a) => decrypt(a.sealed, String(a.passphrase)) },
  { name: 'uuidna_verify_envelope',
    description: 'Verify a sealed envelope\'s 7d-fold content-address (integrity/routing) without the key — public, reproducible.',
    inputSchema: { type: 'object', properties: { sealed: { type: 'object' } }, required: ['sealed'] },
    run: (a) => verifyEnvelope(a.sealed) },
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
