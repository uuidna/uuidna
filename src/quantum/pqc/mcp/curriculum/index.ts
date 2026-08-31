// quantum/pqc/mcp/curriculum — PQC posture as hosted MCP calls (symmetric + ML-KEM/X25519/ML-DSA wired).
import { toUuid } from '../../../../address.js'
import { merkleGravity } from '../../../../gravity/index.js'
import { GROVER_FLOOR_BITS, KEY_BITS } from '../../../../hexbit/index.js'
import { HYBRID_SUITE_ID, SYMMETRIC_SUITE_ID } from '../../../../crypt-suites.js'
import { ADVANTAGE_MCP_ORIGIN } from '../../../advantage/mcp/wire/index.js'
import { atPath, expectHolds, type McpExpect, type AdvantageMcpExample } from '../../../advantage/mcp/curriculum/index.js'

export { ADVANTAGE_MCP_ORIGIN }
export { atPath, expectHolds, type McpExpect }

export const PQC_OVERCLAIM =
  'uuidna is post-quantum cryptography enabled with ML-KEM-768 and ML-DSA-65, proven by theorem grover_quadratic_bound.'

export interface PqcMcpCurriculum {
  definition: 'school·mcp·uuidna.com/mcp·pqc-adjacent'
  endpoint: string
  examples: AdvantageMcpExample[]
  theorems: string[]
  receipt: string
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

/** pqcCurriculum() → symmetric widths + profile + theorems; hybrid profile deployable. */
export function pqcCurriculum(): PqcMcpCurriculum {
  const examples: AdvantageMcpExample[] = [
    example('crypto-grover', 'sha256_grover_margin_is_the_address', 'uuidna_crypto', {},
      [{ path: 'widths.groverFloorBits', equals: GROVER_FLOOR_BITS }],
      `Grover floor ${GROVER_FLOOR_BITS} bits — symmetric search margin after halving`),
    example('crypto-key', 'key_floor_is_one_uuid', 'uuidna_crypto', {},
      [{ path: 'widths.keyBits', equals: KEY_BITS }],
      `ChaCha20-Poly1305 key is ${KEY_BITS} bits`),
    example('pqc-label', 'grover_quadratic_bound', 'uuidna_crypto', {},
      [{ path: 'pqc.label', equals: 'PQC-adjacent' }, { path: 'pqc.symmetricPresent', equals: true }],
      'posture is PQC-adjacent: symmetric stack and hybrid instruments present'),
    example('pqc-hybrid', 'grover_quadratic_bound', 'uuidna_crypto', {},
      [{ path: 'pqc.hybridDeployable', equals: true }],
      'ML-KEM-768, X25519, and ML-DSA-65 are wired — hybridDeployable is true'),
    example('profile-symmetric', 'grover_quadratic_bound', 'uuidna_quantum_profile', {},
      [{ path: 'quantumCrypto.symmetricOnly', equals: true }, { path: 'quantumCrypto.floorSealed', equals: true }],
      'quantum profile reports symmetric-only when floor theorems seal'),
    example('theorem-grover', 'grover_quadratic_bound', 'uuidna_theorem', { key: 'grover_quadratic_bound' },
      [{ path: 'key', equals: 'grover_quadratic_bound' }, { path: 'verdict', equals: 'SEALED' }],
      'Grover is a quadratic speedup — the floor theorem, not a PQC KEM claim'),
    example('theorem-margin', 'sha256_grover_margin_is_the_address', 'uuidna_theorem', { key: 'sha256_grover_margin_is_the_address' },
      [{ path: 'key', equals: 'sha256_grover_margin_is_the_address' }, { path: 'verdict', equals: 'SEALED' }],
      '256/2 = 128 lands on the content-address width'),
    example('theorem-key-floor', 'key_floor_is_one_uuid', 'uuidna_theorem', { key: 'key_floor_is_one_uuid' },
      [{ path: 'key', equals: 'key_floor_is_one_uuid' }, { path: 'verdict', equals: 'SEALED' }],
      'cipher floor is one uuid wide in hexbits'),
    example('gate-fabricated-kem', 'grover_quadratic_bound', 'uuidna_gate', {
      text: 'uuidna deploys ML-KEM-768 encapsulation, proven by theorem ' + 'ml_kem_768_present',
    },
      [{ path: 'binary', equals: 0 }],
      'fabricated ML-KEM theorem drains — ledger keys are not minted for desk wiring'),
    example('suite-symmetric', 'grover_quadratic_bound', 'uuidna_crypto', {},
      [{ path: 'pqc.suites.0.id', equals: SYMMETRIC_SUITE_ID }, { path: 'pqc.suites.0.present', equals: true }],
      `symmetric suite ${SYMMETRIC_SUITE_ID} is present and deployed today`),
    example('suite-hybrid', 'grover_quadratic_bound', 'uuidna_crypto', {},
      [{ path: 'pqc.suites.1.id', equals: HYBRID_SUITE_ID }, { path: 'pqc.suites.1.present', equals: true }],
      `hybrid suite ${HYBRID_SUITE_ID} is present with ML-KEM-768 and X25519`),
  ]
  const theorems = [...new Set(examples.map((e) => e.theorem))]
  const receipt = merkleGravity([
    toUuid('school-pqc-mcp|' + ADVANTAGE_MCP_ORIGIN),
    ...examples.map((e) => toUuid(e.id + '|' + e.tool)),
  ])
  return { definition: 'school·mcp·uuidna.com/mcp·pqc-adjacent', endpoint: ADVANTAGE_MCP_ORIGIN, examples, theorems, receipt }
}

/** renderPqcMcpMarkdown() → school table for gen-school. */
export function renderPqcMcpMarkdown(cur = pqcCurriculum()): string {
  const rows = cur.examples.map((e) =>
    `| \`${e.tool}\` | \`${JSON.stringify(e.arguments)}\` | [\`${e.theorem}\`](/theorem/${e.theorem}) | ${e.expect.map((x: McpExpect) => `\`${x.path}=${JSON.stringify(x.equals)}\``).join(', ')} |`)
  return [
    `PQC posture at school is **${cur.examples.length} MCP calls** on [\`${cur.endpoint}\`](${cur.endpoint}) — symmetric widths sealed, hybrid profile registered, KEM/signature slots named absent ([\`grover_quadratic_bound\`](/theorem/grover_quadratic_bound), [\`sha256_grover_margin_is_the_address\`](/theorem/sha256_grover_margin_is_the_address)).`,
    '',
    '| Tool | Arguments | Theorem | Read |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
    `Curriculum receipt \`${cur.receipt}\`. PQC-adjacent: ChaCha20-Poly1305 on derived subkeys; ML-KEM, X25519, ML-DSA in pure TS; hybrid wire deployable.`,
  ].join('\n')
}
