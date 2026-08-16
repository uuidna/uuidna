// mcp-http — the HOSTED uuidna MCP over HTTP: JSON-RPC 2.0, the Model Context Protocol "Streamable HTTP" transport,
// served by the Cloudflare edge worker at /mcp. It exposes the WORKERS-SAFE, pure, recomputable tools — a SUBSET of
// the full stdio catalog (`npx @uuidna/uuidna`): the tools that need no filesystem, no process, no child_process (the
// fs/process ones — securityAudit, axiomWitness, the reconcile scripts — stay local, since the edge runtime has no
// disk). It imports SPECIFIC pure dist modules, never index.js (that graph pulls node:child_process, unavailable at
// the edge), the same discipline worker.js already follows.
//
// HONEST SCOPE: integrity, not truth. The hosted MCP is READ-ONLY and DETERMINISTIC — it computes from the ledger and
// the request; it cannot write, deploy, sign a commit, or reach the repo. A verdict is authoritative only when the
// worker signs it (env.TRIAL_KEY); a fork recomputes the same result but cannot forge the signature. The tools carry
// their own honest scope (the aura is art, image provenance is exact-copy not content-truth, the cube is symmetric).
import { adjudicate } from './adjudicate.js'
import { reveal } from './gate.js'
import { toUuid } from './address.js'
import { merkleRoot, merkleProof, verifyProof } from './merkle.js'
import { coins, billUuidna } from './captain/billing.js'
import { quantumAura } from './aura.js'
import { imageProvenance, verifyImageProvenance } from './provenance.js'
import { quantumCubeChallenge, verifyQuantumCube } from './cube.js'
// The gated dispatch core — pure and Workers-safe (address/gravity/sanitize/slimgate, no node built-ins): the SAME
// conjunction gate the stdio server enforces, so the edge and the local surface serve ONE law (DRY, sealed spec).
import { gateVerdict, gateSelfTest, GATE_THEOREMS } from './gate-engine.js'

const PROTOCOL_VERSION = '2025-06-18'          // the MCP protocol revision this endpoint speaks
const SERVER = { name: 'uuidna', version: '0.1.1' }

interface HttpTool { name: string; description: string; inputSchema: Record<string, unknown>; run: (a: Record<string, unknown>) => unknown }

// hex / base64 → bytes, pure (atob is available in the Workers runtime); for the image-provenance tool.
const unhex = (s: string): Uint8Array => { const h = s.replace(/\s+/g, ''); const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16); return u }
const unb64 = (s: string): Uint8Array => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }

// The Workers-safe tool set — the recomputable core, each a pure function of its input and the sealed ledger.
const TOOLS: HttpTool[] = [
  { name: 'uuidna_trial', description: 'Run the RECOMPUTABLE TRIAL on a {statement}: the three-way verdict (VERIFIED / REFUTED / UNVERIFIED, where UNVERIFIED is never "false", only not-yet) plus its content-address and order-invariant receipt. The same statement always addresses to the same trial. Integrity, not truth — it adjudicates the CITATION, never the world.',
    inputSchema: { type: 'object', properties: { statement: { type: 'string' } }, required: ['statement'] },
    run: (a) => adjudicate(String(a.statement)) },
  { name: 'uuidna_gate', description: 'The HONESTY GATE over a {claim}: reveals the verdict and the binary (1 = honest floor holds, 0 = drained), the sealed theorems it cites, and any FABRICATED citation. A claim citing a proof that is not sealed drains to 0. Integrity, not truth.',
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
  { name: 'uuidna_aura', description: 'THE QUANTUM AURA — a recomputable A432 COLOUR folded from any {subject} (a content-address or string): the 7 rosette rays, the ℤ/9 vortex wave, the hue stepping by 360/9. Deterministic. HONEST: this is ART, a defined arithmetic from a number to a hue — NOT physics, not a claim that sound is light.',
    inputSchema: { type: 'object', properties: { subject: { type: 'string' } }, required: ['subject'] },
    run: (a) => quantumAura(String(a.subject)) },
  { name: 'uuidna_image_provenance', description: 'BYTE-LEVEL provenance of a file: pass the bytes as {hex} or {base64} → the SHA-256 exact-copy + tamper-evidence fingerprint, a uuidna handle, and the container format. Pass {sha256} to VERIFY. HONEST: proves BYTE-IDENTITY, NEVER content authenticity — never that an image is a truthful depiction.',
    inputSchema: { type: 'object', properties: { hex: { type: 'string' }, base64: { type: 'string' }, sha256: { type: 'string' } } },
    run: (a) => { const bytes = a.hex !== undefined ? unhex(String(a.hex)) : a.base64 !== undefined ? unb64(String(a.base64)) : new Uint8Array(); return a.sha256 !== undefined ? { match: verifyImageProvenance(bytes, String(a.sha256)), bytes: bytes.length } : imageProvenance(bytes) } },
  { name: 'uuidna_quantum_cube', description: 'THE QUANTUM-CUBE CHALLENGE — a SYMMETRIC, deterministic challenge-response whose answer is the A432 aura as a spinning 3D cube. Pass {secret, nonce} for the cube, or {secret, nonce, response} to VERIFY. HONEST: symmetric (the verifier shares the secret), strength is the secret\'s entropy, NOT zero-knowledge and NOT biometric.',
    inputSchema: { type: 'object', properties: { secret: { type: 'string' }, nonce: { type: 'string' }, response: { type: 'string' } }, required: ['secret', 'nonce'] },
    run: (a) => a.response !== undefined ? { match: verifyQuantumCube(String(a.secret), String(a.nonce), String(a.response)), nonce: String(a.nonce) } : quantumCubeChallenge(String(a.secret), String(a.nonce)) },
  { name: 'uuidna_gate_status', description: 'THE GATE PROVES ITSELF, live at the edge: every hosted tools/call passes the sealed conjunction gate cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) — input sanitized, output sanitized, no fabricated theorem citation — and this tool recomputes the eight-state verdict table and REQUIRES it to equal the sealed table [1,0,0,0,0,0,0,0] (theorem anti_fraud_check_deterministic) and the boolean spec (theorem honesty_gate_is_theorem_not_oracle). The registry folds to its ORDER-INVARIANT identity receipt. The SAME gate the stdio server enforces — one law, both surfaces. Returns {table,sealedTable,matchesSealedSpec,cleanStates,drainedStates,tools,registry,cites,receipt}.',
    inputSchema: { type: 'object', properties: {} },
    run: () => gateSelfTest(TOOLS.map((t) => t.name)) },
]

const listing = (): unknown[] => TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))
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
    instructions: 'uuidna hosted MCP — the Workers-safe, read-only, recomputable subset. EVERY response is GATE-ENFORCED: each tools/call passes the sealed conjunction gate cleanAudit(f,d,v) — input sanitized, output sanitized, no fabricated theorem citation — and carries its verdict (_meta.gate + a visible gate line); one violation drains, named. Recompute the gate against its sealed spec: uuidna_gate_status (theorem anti_fraud_check_deterministic). Integrity, not truth.' })
  if (method === 'ping') return rpc(id, {})
  if (typeof method === 'string' && method.startsWith('notifications/')) return null   // a notification carries no reply
  if (method === 'tools/list') return rpc(id, { tools: listing() })
  if (method === 'tools/call') {
    const name = params.name
    const tool = TOOLS.find((t) => t.name === name)
    if (!tool) return rpcErr(id, -32602, 'unknown tool: ' + String(name))
    // THE GATED DISPATCH — the same pure conjunction gate the stdio server enforces (gate-engine, sealed spec):
    // the settled output is judged, the verdict travels in the response, a drained verdict ships sanitized and
    // flagged with its bits named. Stateless: the gate receipt is per-call, no session chain at the edge.
    try {
      const out = tool.run((params.arguments as Record<string, unknown>) ?? {})
      const g = gateVerdict(String(name), (params.arguments as Record<string, unknown>) ?? {}, out)
      const gateLine = `gate ${g.gate.clean ? 'CLEAN' : 'DRAINED'} f${g.gate.input} d${g.gate.output} v${g.gate.honesty} · ${g.gate.receipt}` + (g.gate.fabricated.length ? ' · fabricated: ' + g.gate.fabricated.join(', ') : '')
      return rpc(id, {
        content: [{ type: 'text', text: typeof g.output === 'string' ? g.output : JSON.stringify(g.output) }, { type: 'text', text: gateLine }],
        _meta: { gate: g.gate },
        ...(g.gate.clean ? {} : { isError: true }),
      })
    } catch (e) {
      return rpc(id, { content: [{ type: 'text', text: 'error: ' + String((e as Error)?.message ?? e) }], isError: true })
    }
  }
  return rpcErr(id, -32601, 'method not found: ' + String(method))
}

/** The tool names the hosted endpoint serves — for a GET /mcp discovery page. */
export const mcpHttpToolNames = (): string[] => TOOLS.map((t) => t.name)
export const MCP_HTTP_PROTOCOL = PROTOCOL_VERSION
