// advantage.data — VitePress DATA LOADER for the home quantum-advantage monitor.
// TypeScript computes; VitePress monitors lean/quantum-advantage.json + lean/quantum-capacity.json.
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleOf } from '../../dist/handle.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

export type AdvantageLevel = {
  level: string
  reach: string
  reachPow2: number
  costDecade: number
  fidelityOps: number
  disagreements: number
  seal: string
  /** bar width 0–100 for cost decade graph (decade / maxDecade) */
  costBar: number
  /** bar width 0–100 for reach on log2 scale */
  reachBar: number
}

export type CapacityPlatform = {
  org: string
  model: string
  usable: number | null
  physical: number | null
  opTimeNs: number | null
  opClass: string
  /** log2 bar vs uuidna 128 */
  usableBar: number
  highlight: boolean
}

export type AdvantageMonitor = {
  usableBits: number
  reportedLogical: number
  gapExponent: number
  gapFactor: string
  theorem: string
  theoremHref: string
  capacityHref: string
  advantageHref: string
  receipt: string
  capacityReceipt: string
  handle: string
  complete: boolean
  levels: AdvantageLevel[]
  platforms: CapacityPlatform[]
  /** platforms with usable > 0, for the capacity graph */
  usablePlatforms: CapacityPlatform[]
  measuredNsDecade: number
  ledgerCount: number
  honest: string
  host: string
  /** per-theorem decide-step costs keyed by content-address (lean/heartbeats.json) */
  heartbeats: Record<string, number>
  maxHeartbeats: number
  medianHeartbeats: number
}

declare const data: AdvantageMonitor
export { data }

const bitLen = (n: number): number => {
  let c = 0
  let x = n
  while (x > 0) {
    x = (x - (x % 2)) / 2
    c++
  }
  return c
}

const logBar = (n: number, maxBits = 7): number => {
  if (n == null || n <= 0) return 2
  const pct = (bitLen(n) * 100 - (bitLen(n) * 100) % maxBits) / maxBits
  return pct < 3 ? 3 : pct > 100 ? 100 : pct
}

export default {
  watch: [
    '../../lean/quantum-advantage.json',
    '../../lean/quantum-capacity.json',
    '../../lean/heartbeats.json',
    '../../docs/public/quantum-advantage.jsonld',
    '../../docs/public/quantum-capacity.jsonld',
  ],
  load(): AdvantageMonitor {
    const qaPath = join(ROOT, 'lean/quantum-advantage.json')
    const capPath = join(ROOT, 'lean/quantum-capacity.json')
    const hbPath = join(ROOT, 'lean/heartbeats.json')
    if (!existsSync(qaPath)) {
      throw new Error('lean/quantum-advantage.json missing — run gen-quantum-advantage off the push path first')
    }
    const heartbeats: Record<string, number> = existsSync(hbPath)
      ? ((JSON.parse(readFileSync(hbPath, 'utf8')) as { costs?: Record<string, number> }).costs ?? {})
      : {}
    const hbValues = Object.values(heartbeats).filter((n) => n > 0).sort((a, b) => a - b)
    const maxHeartbeats = hbValues.length ? hbValues[hbValues.length - 1] : 0
    const medianHeartbeats = hbValues.length ? hbValues[(hbValues.length - (hbValues.length % 2)) / 2] : 0
    const qa = JSON.parse(readFileSync(qaPath, 'utf8')) as {
      receipt?: string
      report?: {
        complete?: boolean
        honest?: string
        receipt?: string
        rows?: Array<{
          level: string
          reach?: { pow2?: number; seals?: string }
          cost?: { opNsDecade?: number }
          fidelity?: { ops?: number; disagreements?: number }
          kind?: string
        }>
      }
      device?: { cpu?: string; platform?: string; arch?: string }
    }
    const receipt = qa.receipt ?? qa.report?.receipt ?? ''
    const rows = qa.report?.rows ?? []
    const maxDecade = Math.max(1, ...rows.map((r) => r.cost?.opNsDecade ?? 0))
    const levels: AdvantageLevel[] = rows.map((r) => {
      const pow2 = r.kind === 'corpus' ? 0 : (r.reach?.pow2 ?? 0)
      const decade = r.cost?.opNsDecade ?? 0
      return {
        level: r.level,
        reach: pow2 ? `2^${pow2}` : 'ledger',
        reachPow2: pow2,
        costDecade: decade,
        fidelityOps: r.fidelity?.ops ?? 0,
        disagreements: r.fidelity?.disagreements ?? 0,
        seal: r.reach?.seals ?? '',
        costBar: Math.round((decade / maxDecade) * 100) || 4,
        reachBar: pow2 ? logBar(pow2 === 128 ? 128 : Math.min(pow2, 128), 7) : 100,
      }
    })

    let host = ''
    if (qa.device?.cpu) host = `${qa.device.cpu} · ${qa.device.platform}/${qa.device.arch}`

    let platforms: CapacityPlatform[] = []
    let capacityReceipt = ''
    let measuredNsDecade = 3
    let ledgerCount = 0
    if (existsSync(capPath)) {
      const cap = JSON.parse(readFileSync(capPath, 'utf8')) as {
        receipt?: string
        measured?: { nsDecade?: number; ledger?: number }
        rows?: Array<{
          org: string; model: string; usable: number | null; physical: number | null
          opTimeNs: number | null; opClass: string
        }>
      }
      capacityReceipt = cap.receipt ?? ''
      measuredNsDecade = cap.measured?.nsDecade ?? 3
      ledgerCount = cap.measured?.ledger ?? 0
      platforms = (cap.rows ?? []).map((r) => ({
        org: r.org,
        model: r.model,
        usable: r.usable,
        physical: r.physical,
        opTimeNs: r.opTimeNs,
        opClass: r.opClass,
        usableBar: r.usable != null && r.usable > 0 ? logBar(r.usable) : 2,
        highlight: r.org === 'uuidna',
      }))
    }

    const usablePlatforms = platforms.filter((p) => p.usable != null && p.usable > 0)

    return {
      usableBits: 128,
      reportedLogical: 48,
      gapExponent: 80,
      gapFactor: '2^80',
      theorem: 'usable_gap_is_two_to_eighty',
      theoremHref: '/theorem/usable_gap_is_two_to_eighty',
      capacityHref: '/quantum#quantum-capacity',
      advantageHref: '/quantum-advantage.jsonld',
      receipt,
      capacityReceipt,
      handle: receipt ? handleOf(receipt) : '',
      complete: qa.report?.complete === true && levels.length >= 4,
      levels,
      platforms,
      usablePlatforms,
      measuredNsDecade,
      ledgerCount,
      honest:
        qa.report?.honest ??
        'TypeScript computes; VitePress monitors. Measured usable-capacity quantum advantage: theorem usable_gap_is_two_to_eighty.',
      host,
      heartbeats,
      maxHeartbeats,
      medianHeartbeats,
    }
  },
}
