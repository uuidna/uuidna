// @non-harmonic: MCP hook awaits the school's live tools/call chain on the hosted wire.
// school/advantage/mcp/examples — quantum advantage as DETAILED MCP CALLS the school can run.
//
// The usable-column gap and the classical 2^n cost are already sealed. School does not restate them as essays.
// Each lesson is one tools/call on https://uuidna.com/mcp: arguments, the field to read, the constructor value
// it must match. External agents have that wire only. No per-app uuidna_* catalogue; no Shor implementation;
// no new theorem keys — QA_REQUIRED_THEOREMS plus the Grover floor already on uuidna_crypto.
import { toUuid } from '../../../../address.js'
import { merkleGravity } from '../../../../gravity/index.js'
import { HANDLE_HEXBITS, HEXBIT_BITS, UUID_BITS, GROVER_FLOOR_BITS, shorCapacityFit, shorFullUse } from '../../../../hexbit/index.js'
import { theoremByKey } from '../../../../theorems/index.js'
import { osQuantumCapacity } from '../../../../quantum/os/index.js'
import { cryptoWidths } from '../../../../quantum/os/crypto-apps.js'
import { QA_REQUIRED_THEOREMS } from '../../../../quantum/advantage/audit/index.js'
import { decide } from '../../../../decide.js'
import { reveal } from '../../../../gate.js'
import { AGENT_ORIGIN, AGENT_MCP_PATH } from '../../../../quantum/os/agent-coverage.js'

export const ADVANTAGE_MCP_ORIGIN = AGENT_ORIGIN + AGENT_MCP_PATH

/** The overclaim that exposed the citation leak — school runs it as uuidna_try, then reads the cited theorem. */
export const ADVANTAGE_OVERCLAIM =
  'uuidna achieves quantum advantage: it computes faster than quantum hardware, by theorem n_qubit_dimension.'

export interface McpExpect {
  path: string
  equals: unknown
}

export interface AdvantageMcpExample {
  id: string
  theorem: string
  tool: string
  arguments: Record<string, unknown>
  expect: McpExpect[]
  reads: string
  curl: string
}

export interface AdvantageMcpCurriculum {
  definition: 'school·mcp·uuidna.com/mcp·quantum-advantage'
  endpoint: string
  examples: AdvantageMcpExample[]
  theorems: string[]
  receipt: string
}

const pow2 = (n: number): number => {
  let s = 1
  for (let i = 0; i < n; i++) s = s * 2
  return s
}

const curlOf = (tool: string, args: Record<string, unknown>): string => {
  const body = { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: tool, arguments: args } }
  return `curl -s -X POST ${ADVANTAGE_MCP_ORIGIN} -H 'content-type: application/json' -d '${JSON.stringify(body)}'`
}

const example = (
  id: string, theorem: string, tool: string, args: Record<string, unknown>,
  expect: McpExpect[], reads: string,
): AdvantageMcpExample =>
  ({ id, theorem, tool, arguments: args, expect, reads, curl: curlOf(tool, args) })

/** atPath(obj, 'capacity.uuidBits') → the nested field, or undefined. */
export function atPath(obj: unknown, path: string): unknown {
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[key]
  }
  return cur
}

/** expectHolds(payload, expects) → missing paths / mismatches. Empty iff the example answered. */
export function expectHolds(payload: unknown, expects: readonly McpExpect[]): { path: string; got: unknown; want: unknown }[] {
  const misses: { path: string; got: unknown; want: unknown }[] = []
  for (const e of expects) {
    const got = atPath(payload, e.path)
    if (got !== e.equals) misses.push({ path: e.path, got, want: e.equals })
  }
  return misses
}

/** schoolAdvantageMcpExamples() → the quantum-advantage curriculum as hosted MCP calls. Numbers from constructors. */
export function schoolAdvantageMcpExamples(): AdvantageMcpCurriculum {
  const byKey = theoremByKey()
  for (const k of QA_REQUIRED_THEOREMS) {
    if (!byKey.has(k)) throw new Error(`school advantage MCP: ${k} is not sealed`)
  }
  const cap = osQuantumCapacity()
  const shor = shorCapacityFit()
  const full = shorFullUse()
  const widths = cryptoWidths()
  const ghz4 = HEXBIT_BITS
  const nestQubits = cap.nestQubits
  const dim4 = decide('2^' + ghz4 + '=' + pow2(ghz4))
  const dimNest = decide(`2^${nestQubits}=${pow2(nestQubits)}`)
  const over = reveal(ADVANTAGE_OVERCLAIM)
  const nQubit = byKey.get('n_qubit_dimension')!

  const examples: AdvantageMcpExample[] = [
    example('dim-4', 'n_qubit_dimension', 'uuidna_decide', { input: '2^' + ghz4 + '=' + pow2(ghz4) },
      [{ path: 'verdict', equals: dim4.verdict }, { path: 'kind', equals: dim4.kind }],
      `${ghz4} qubits span ${pow2(ghz4)} amplitudes — uuidna_decide pays 2^n (theorem n_qubit_dimension); uuidna_quantum is named-absent on the hosted wire`),
    example('dim-ceiling', 'served_qubit_ceiling', 'uuidna_decide', { input: `2^${nestQubits}=${pow2(nestQubits)}` },
      [{ path: 'verdict', equals: dimNest.verdict }, { path: 'kind', equals: dimNest.kind }],
      `handle+hexbit nest ${nestQubits} qubits = ${pow2(nestQubits)} amplitudes (theorem served_qubit_ceiling); MCP serves the encoder (${cap.servedQubits})`),
    example('os-gap', 'usable_gap_is_two_to_eighty', 'uuidna_os', {},
      [{ path: 'capacity.uuidBits', equals: UUID_BITS }, { path: 'capacity.nestQubits', equals: cap.nestQubits }, { path: 'capacity.servedQubits', equals: cap.servedQubits }],
      `usable column is 2^${UUID_BITS} states; gap vs reported 48 logical qubits is 2^80 (theorem usable_gap_is_two_to_eighty)`),
    example('os-handle', 'handle_capacity_is_quantum_by_architecture', 'uuidna_os', {},
      [{ path: 'capacity.handleHexbits', equals: HANDLE_HEXBITS }, { path: 'capacity.shor.handleFits', equals: shor.handleFits }],
      `handle width ${HANDLE_HEXBITS} hexbits; Shor 32-bit modulus fit is ${shor.handleFits ? 'true' : 'false'} on this column`),
    example('crypto-widths', 'sha256_grover_margin_is_the_address', 'uuidna_crypto', {},
      [
        { path: 'widths.groverFloorBits', equals: GROVER_FLOOR_BITS },
        { path: 'widths.shor.uuidFits', equals: widths.shor.uuidFits },
        { path: 'widths.full.uuidChunks', equals: full.uuidChunks },
      ],
      `Grover floor ${GROVER_FLOOR_BITS} bits = one uuid; uuid Shor chunks ${full.uuidChunks} × GHZ(${full.chunkQubits})`),
    example('read-gap', 'usable_gap_is_two_to_eighty', 'uuidna_theorem', { key: 'usable_gap_is_two_to_eighty' },
      [{ path: 'key', equals: 'usable_gap_is_two_to_eighty' }, { path: 'verdict', equals: 'SEALED' }],
      'read the sealed statement — the architectural advantage is the theorem text, not a speedup claim'),
    example('read-cost', 'n_qubit_dimension', 'uuidna_theorem', { key: 'n_qubit_dimension' },
      [{ path: 'key', equals: 'n_qubit_dimension' }, { path: 'name', equals: nQubit.name }],
      'the cited theorem ends NOT a speedup or a quantum advantage — that sentence travels with every citation'),
    example('gate-overclaim', 'n_qubit_dimension', 'uuidna_gate', { claim: ADVANTAGE_OVERCLAIM },
      [{ path: 'verdict', equals: over.verdict }, { path: 'binary', equals: over.binary }],
      `uuidna_gate still ${over.verdict}s a sealed citation; read backing.says — VERIFIED is not endorsement`),
    example('skill-quantum', 'n_qubit_dimension', 'uuidna_skill', { skill: 'quantum' },
      [{ path: 'skill', equals: 'quantum' }],
      'the quantum skill is one door (not one tool per theorem); lab.simulation is state-vector'),
    example('verify-beats', 'verify_beats_recompute_by_magnitudes', 'uuidna_theorem', { key: 'verify_beats_recompute_by_magnitudes' },
      [{ path: 'key', equals: 'verify_beats_recompute_by_magnitudes' }, { path: 'verdict', equals: 'SEALED' }],
      'advantage audit is VERIFY of the sealed report, not a remeasure on the school page'),
    example('gate-error', 'gate_error_baseline_class', 'uuidna_theorem', { key: 'gate_error_baseline_class' },
      [{ path: 'key', equals: 'gate_error_baseline_class' }, { path: 'verdict', equals: 'SEALED' }],
      'fidelity baseline is a reported class the audit names — read the theorem, do not invent a figure'),
  ]

  const theorems = [...new Set(examples.map((e) => e.theorem))]
  const receipt = merkleGravity([
    toUuid('school-advantage-mcp|' + ADVANTAGE_MCP_ORIGIN),
    ...examples.map((e) => toUuid(e.id + '|' + e.tool + '|' + JSON.stringify(e.arguments))),
  ])
  return { definition: 'school·mcp·uuidna.com/mcp·quantum-advantage', endpoint: ADVANTAGE_MCP_ORIGIN, examples, theorems, receipt }
}

export interface McpHookHop {
  id: string
  tool: string
  arguments: Record<string, unknown>
  take: Record<string, unknown>
  rpc: { jsonrpc: '2.0'; id: number; method: 'tools/call'; params: { name: string; arguments: Record<string, unknown> } }
}

export interface AdvantageMcpHook {
  definition: 'school·mcp·hook'
  hops: McpHookHop[]
  servedQubits: number
  encoderQubits: number
  groverFloorBits: number
  handleChunks: number
  uuidChunks: number
  typeRungs: number
  coins: number
  theorems: number
  gravity: string
  hooked: {
    osShorEqualsCryptoShor: boolean
    groverEqualsCoinsFloor: boolean
    analyticsCoinsEqualsUnit: boolean
    nestBelowEncoder: boolean
  }
  receipt: string
}

const rec = (v: unknown): Record<string, unknown> =>
  (v !== null && typeof v === 'object' && !Array.isArray(v)) ? v as Record<string, unknown> : {}

const hopOf = (id: string, n: number, tool: string, args: Record<string, unknown>, take: Record<string, unknown>): McpHookHop =>
  ({ id, tool, arguments: args, take, rpc: { jsonrpc: '2.0', id: n, method: 'tools/call', params: { name: tool, arguments: args } } })

const typeRungsOf = (css: string): number => {
  let n = 0
  for (const d of [1, 2, 4, 5, 7, 8]) if (css.includes('--type-' + d + ':')) n++
  return n
}

/** hookAdvantageMcp(call) → OS capacity feeds decide, crypto, coins, profile, theorem, css, analytics, gravity.
 *  Each hop's arguments are taken from a previous payload. uuidna_quantum is not on this chain (hosted-absent). */
export async function hookAdvantageMcp(
  call: (name: string, args: Record<string, unknown>) => unknown | Promise<unknown>,
): Promise<AdvantageMcpHook> {
  const hops: McpHookHop[] = []
  let n = 1
  const run = async (id: string, tool: string, args: Record<string, unknown>, take: Record<string, unknown>): Promise<unknown> => {
    hops.push(hopOf(id, n, tool, args, take))
    n++
    return call(tool, args)
  }

  const os = rec(await run('os', 'uuidna_os', {}, {}))
  const cap = rec(os.capacity)
  const shor = rec(cap.shor)
  const servedQubits = Number(cap.servedQubits ?? 0)
  const servedStates = Number(cap.servedStates ?? 0)
  const nestQubits = Number(cap.nestQubits ?? 0)
  const encoderQubits = Number(shor.encoderQubits ?? 0)
  const decideInput = '2^' + servedQubits + '=' + servedStates
  await run('decide', 'uuidna_decide', { input: decideInput }, { servedQubits, servedStates })

  const crypto = rec(await run('crypto', 'uuidna_crypto', {}, { from: 'uuidna_os.capacity.shor' }))
  const widths = rec(crypto.widths)
  const groverFloorBits = Number(widths.groverFloorBits ?? 0)
  const full = rec(widths.full)

  const profile = rec(await run('profile', 'uuidna_quantum_profile', {}, {}))
  const qcrypto = rec(profile.quantumCrypto)
  const floor = Array.isArray(qcrypto.floorTheorems) ? qcrypto.floorTheorems.map(String) : []
  const floorKey = floor[0] ?? 'grover_quadratic_bound'
  await run('theorem', 'uuidna_theorem', { key: floorKey }, { key: floorKey, from: 'uuidna_quantum_profile.quantumCrypto.floorTheorems[0]' })

  const coins = rec(await run('coins', 'uuidna_coins', {}, {}))
  const coinCrypto = rec(coins.crypto)

  const css = rec(await run('css', 'uuidna_css', {}, {}))
  const typeRungs = typeRungsOf(String(css.css ?? ''))

  const analytics = rec(await run('analytics', 'uuidna_analytics', {}, {}))
  const receipts = hops.map((h) => toUuid(h.tool + '|' + JSON.stringify(h.arguments)))
  const gravity = String(await run('gravity', 'uuidna_gravity', { addresses: receipts }, { addresses: receipts.length }))

  const hooked = {
    osShorEqualsCryptoShor: JSON.stringify(shor) === JSON.stringify(rec(widths.shor)),
    groverEqualsCoinsFloor: groverFloorBits === Number(coinCrypto.floorBits ?? 0),
    analyticsCoinsEqualsUnit: Number(analytics.coins ?? 0) === Number(coins.coins ?? 0),
    nestBelowEncoder: nestQubits < encoderQubits,
  }
  const receipt = merkleGravity([
    toUuid('school-advantage-mcp-hook'),
    ...hops.map((h) => toUuid(h.id + '|' + h.tool)),
    toUuid(gravity),
  ])
  return {
    definition: 'school·mcp·hook',
    hops,
    servedQubits,
    encoderQubits,
    groverFloorBits,
    handleChunks: Number(full.handleChunks ?? shor.chunksOnHandle ?? 0),
    uuidChunks: Number(full.uuidChunks ?? shor.chunksOnUuid ?? 0),
    typeRungs,
    coins: Number(coins.coins ?? 0),
    theorems: Number(analytics.theorems ?? 0),
    gravity,
    hooked,
    receipt,
  }
}

/** renderAdvantageMcpMarkdown() → the school table, generated so the curl and the expect cannot drift. */
export function renderAdvantageMcpMarkdown(cur = schoolAdvantageMcpExamples()): string {
  const rows = cur.examples.map((e) =>
    `| \`${e.tool}\` | \`${JSON.stringify(e.arguments)}\` | [\`${e.theorem}\`](/theorem/${e.theorem}) | ${e.expect.map((x) => `\`${x.path}=${JSON.stringify(x.equals)}\``).join(', ')} |`)
  return [
    `Quantum advantage at school is **${cur.examples.length} MCP calls** on [\`${cur.endpoint}\`](${cur.endpoint}) — one door each, constructor values, no wall-clock, no new theorem.`,
    '',
    '| Tool | Arguments | Theorem | Read |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
    `Curriculum receipt \`${cur.receipt}\`. Run any row from the panel above, or paste its curl. External agents have this wire only.`,
  ].join('\n')
}
