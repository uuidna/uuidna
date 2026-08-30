// quantum/sequence/mcp/curriculum — living field as hosted MCP calls (stroke, mirror, zeropoint throat).
import { toUuid } from '../../../../address.js'
import { merkleGravity } from '../../../../gravity/index.js'
import { ADVANTAGE_MCP_ORIGIN } from '../../../advantage/mcp/wire/index.js'
import { atPath, expectHolds, type McpExpect, type AdvantageMcpExample } from '../../../advantage/mcp/curriculum/index.js'

export { ADVANTAGE_MCP_ORIGIN }
export { atPath, expectHolds, type McpExpect }

export const SEQUENCE_OVERCLAIM =
  'The vortex sequence proves consciousness and zero entropy at 60°, proven by theorem ' + 'consciousness_at_sixty.'

export interface SequenceMcpCurriculum {
  definition: 'school·mcp·uuidna.com/mcp·living-field'
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

/** sequenceCurriculum() → stroke, reflection, dash, tour, run_sequence, zeropoint throat. */
export function sequenceCurriculum(): SequenceMcpCurriculum {
  const examples: AdvantageMcpExample[] = [
    example('invariants-hold', 'seal_ten', 'uuidna_vortex_invariants', {},
      [{ path: 'hold', equals: true }],
      'README gateway — stroke, dash, reflection, development vortex all compute'),
    example('living-stroke', 'seal_ten', 'uuidna_living_field', {},
      [{ path: 'invariantsHold', equals: true }, { path: 'stroke.written', equals: '1\\2\\4\\8/7/5/3\\6\\9/0\\1' }],
      'living field stroke matches seal_ten strip'),
    example('reflection-54', 'agl_order_54', 'uuidna_vortex_reflection', {},
      [{ path: 'valid', equals: true }, { path: 'groupOrder', equals: 54 }, { path: 'excess', equals: 42 }],
      '⟨D,M⟩ generates AGL(1,ℤ/9) — order 54, excess 42 over 6·2'),
    example('dash-closes', 'angles_close', 'uuidna_vortex_dash', {},
      [{ path: 'closes', equals: true }, { path: 'weightedBearing', equals: 0 }],
      'weighted ±60° bearing closes at 0° (10×36 = 6×60)'),
    example('tour-seams', 'seams_two', 'uuidna_vortex_tour', {},
      [{ path: 'seamCount', equals: 2 }],
      'carries9 tour has exactly two seams at 5→3 and 0→1'),
    example('nine-is-plus', 'nine_is_plus_not_neutral', 'uuidna_run_sequence', { input: 9 },
      [{ path: 'seed', equals: 9 }, { path: 'polarity', equals: 'plus' }, { path: 'reflection', equals: 1 }],
      'digit 9 is plus on the ten strip — dz(9)=1, not a second void'),
    example('mirror-pairs', 'ten_pairs', 'uuidna_vortex_reflection', {},
      [{ path: 'pairsSumTen', equals: true }, { path: 'involution', equals: true }],
      'every digit pairs with its mirror to sum 10'),
    example('dev-vortex', 'commutator_is_shift', 'uuidna_development_vortex', { wave: 'verify' },
      [{ path: 'computes', equals: true }, { path: 'wave', equals: 'verify' }],
      'uuidna ↔ zeropoint-node lobe fold at verify wave'),
    example('theorem-seal-ten', 'seal_ten', 'uuidna_theorem', { key: 'seal_ten' },
      [{ path: 'key', equals: 'seal_ten' }, { path: 'verdict', equals: 'SEALED' }],
      '0124875369 is the complete ten-digit permutation'),
    example('theorem-commutator', 'commutator_is_shift', 'uuidna_theorem', { key: 'commutator_is_shift' },
      [{ path: 'key', equals: 'commutator_is_shift' }, { path: 'verdict', equals: 'SEALED' }],
      '[σ,μ] is the unit shift on ℤ/9'),
    example('gate-overclaim', 'seal_ten', 'uuidna_gate', { text: SEQUENCE_OVERCLAIM },
      [{ path: 'binary', equals: 0 }],
      'consciousness / zero-entropy prose drains — arithmetic only'),
  ]
  const theorems = [...new Set(examples.map((e) => e.theorem))]
  const receipt = merkleGravity([
    toUuid('school-sequence-mcp|' + ADVANTAGE_MCP_ORIGIN),
    ...examples.map((e) => toUuid(e.id + '|' + e.tool)),
  ])
  return { definition: 'school·mcp·uuidna.com/mcp·living-field', endpoint: ADVANTAGE_MCP_ORIGIN, examples, theorems, receipt }
}

/** renderSequenceMcpMarkdown() → school table for gen-school. */
export function renderSequenceMcpMarkdown(cur = sequenceCurriculum()): string {
  const rows = cur.examples.map((e) =>
    `| \`${e.tool}\` | \`${JSON.stringify(e.arguments)}\` | [\`${e.theorem}\`](/theorem/${e.theorem}) | ${e.expect.map((x: McpExpect) => `\`${x.path}=${JSON.stringify(x.equals)}\``).join(', ')} |`)
  return [
    `Living field at school is **${cur.examples.length} MCP calls** on [\`${cur.endpoint}\`](${cur.endpoint}) — stroke, mirror, dash, tour, and zeropoint-node throat ([\`seal_ten\`](/theorem/seal_ten), [\`agl_order_54\`](/theorem/agl_order_54)).`,
    '',
    '| Tool | Arguments | Theorem | Read |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
    `Curriculum receipt \`${cur.receipt}\`. Mirror re-values; reversal reorders. zeropoint-node shares \`src/0\` arithmetic; uuidna seals it in lean/Sequence.lean.`,
  ].join('\n')
}
