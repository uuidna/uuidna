// quantum/advantage/mcp/agent-playbook — AFTER THE TWO COINS: how any agent recomputes quantum and reads
// magnitudes over classical re-run. Pure curriculum — numbers from hexbit constructors and sealed theorem keys.
import { toUuid } from '../../../../../address.js'
import { merkleGravity } from '../../../../../gravity/index.js'
import { HANDLE_HEXBITS, HEXBIT_BITS, UUID_BITS, GROVER_FLOOR_BITS } from '../../../../../hexbit/index.js'
import { advantageCurriculum, type AdvantageMcpExample } from '../../curriculum/index.js'

export interface PlaybookStep {
  order: number
  tool: string
  arguments: Record<string, unknown>
  theorem: string
  reads: string
}

export interface QuantumAdvantagePlaybook {
  prerequisite: string
  magnitudes: {
    theorem: string
    at2_10: string
    at2_20: string
    note: string
  }
  steps: PlaybookStep[]
  simulate: { tool: string; bell: Record<string, unknown>; ghz: Record<string, unknown> }
  alpine: { tool: string; lines: string[] }
  curriculum: { endpoint: string; receipt: string; exampleCount: number }
  receipt: string
  honest: string
}

const pow2 = (n: number): number => {
  let s = 1
  for (let i = 0; i < n; i++) s = s * 2
  return s
}

/** quantumAdvantagePlaybook() → ordered tools/call path for agents who already paid the two coins. */
export function quantumAdvantagePlaybook(): QuantumAdvantagePlaybook {
  const ghz4 = HEXBIT_BITS
  const nestQubits = HANDLE_HEXBITS + HEXBIT_BITS
  const servedQubits = HEXBIT_BITS * HEXBIT_BITS
  const cur = advantageCurriculum()

  const channelAddr = toUuid('channel-playbook')
  const steps: PlaybookStep[] = [
    {
      order: 1,
      tool: 'uuidna_os',
      arguments: {},
      theorem: 'usable_gap_is_two_to_eighty',
      reads: `capacity.uuidBits=${UUID_BITS}, capacity.servedQubits=${servedQubits} — usable address column before any simulate`,
    },
    {
      order: 2,
      tool: 'uuidna_uuid_channel',
      arguments: { address: channelAddr },
      theorem: 'layout_groups_thirtytwo',
      reads: 'handle + 3 hex trinities + tail, torusHome=true — route/messaging without payload store',
    },
    {
      order: 3,
      tool: 'uuidna_decide',
      arguments: { input: `2^${ghz4}=${pow2(ghz4)}` },
      theorem: 'n_qubit_dimension',
      reads: 'verdict=VERIFIED_BY_DECIDE — simulation cost is 2^n amplitudes (not a hardware speedup claim)',
    },
    {
      order: 4,
      tool: 'uuidna_quantum',
      arguments: { circuit: 'bell' },
      theorem: 'n_qubit_dimension',
      reads: 'outcomes and marginals — exact classical state-vector; honest field names simulation',
    },
    {
      order: 5,
      tool: 'uuidna_crypto',
      arguments: {},
      theorem: 'sha256_grover_margin_is_the_address',
      reads: `widths.groverFloorBits=${GROVER_FLOOR_BITS} — one uuid is the Grover floor on this column`,
    },
    {
      order: 6,
      tool: 'uuidna_theorem',
      arguments: { key: 'verify_beats_recompute_by_magnitudes' },
      theorem: 'verify_beats_recompute_by_magnitudes',
      reads: 'read the sealed statement — magnitudes are VERIFY vs RECOMPUTE, not physics supremacy',
    },
    {
      order: 7,
      tool: 'uuidna_exec',
      arguments: { line: 'openssl' },
      theorem: 'the_os_is_bootable_quantum',
      reads: 'Alpine community apps through one door — identity + hexbits, never ELF execution',
    },
  ]

  const receipt = merkleGravity([
    toUuid('quantum-advantage-playbook'),
    ...steps.map((s) => toUuid(`${s.order}|${s.tool}|${s.theorem}`)),
    cur.receipt,
  ])

  return {
    prerequisite: 'Every tools/call already deposited the two captain coins (deposit 2 · captain_commission_two_coins). Declare clientInfo.name at initialize; poll uuidna_coin_ledger for WHO paid.',
    magnitudes: {
      theorem: 'verify_beats_recompute_by_magnitudes',
      at2_10: '2^10=1024 leaves → verify path 10 nodes (1024 > 100·10)',
      at2_20: '2^20=1048576 leaves → verify path 20 nodes (1048576 > 10000·20)',
      note: 'N/log(N) grows — prove once O(N), verify forever O(log N). Architectural usable-column gap: theorem usable_gap_is_two_to_eighty.',
    },
    steps,
    simulate: {
      tool: 'uuidna_quantum',
      bell: { circuit: 'bell' },
      ghz: { circuit: 'ghz', qubits: ghz4 },
    },
    alpine: {
      tool: 'uuidna_exec',
      lines: ['apk search openssl', 'man openssl', 'nginx', 'ls /catalogue'],
    },
    curriculum: { endpoint: cur.endpoint, receipt: cur.receipt, exampleCount: cur.examples.length },
    receipt,
    honest: 'Classical exact simulation (2^n amplitudes, exponential — theorem n_qubit_dimension). Magnitudes cite verify_beats_recompute_by_magnitudes (integrity verification), not quantum hardware supremacy. Alpine apps: provenance via uuidna_exec only.',
  }
}

/** playbookExamples() → the same rows as advantageCurriculum for cross-surface tests. */
export function playbookExamples(): readonly AdvantageMcpExample[] {
  return advantageCurriculum().examples
}
