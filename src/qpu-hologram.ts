// qpu-hologram — THE uuidna SIDE OF THE qpu.uuidna.com HOP. Figures here are recomputed from local constants by
// doubling and attributed to QPU Lean (QPU_LEAN) by name. JSON Nat.
import { TRINITY, BASE } from './address.js'
import { COINS, HEXBIT_BITS, HANDLE_BITS, HANDLE_HEXBITS, UUID_HEXBITS, VE_FACES } from './hexbit/index.js'
import { LANES } from './hardware/lanes/index.js'
import { SEAL_TEN, throughVoid } from './sequence-field.js'

/** The worker host. Licensed as its own entry — no wildcard. */
export const QPU_HOST = 'qpu.uuidna.com'
export const QPU_HREF = `https://${QPU_HOST}`
export const QPU_LEAN = 'https://github.com/uuidna/qpu/blob/main/src/quantum/processing/unit/index.lean'

/** BindingPoint pentagram — CPU, GPU, RAM, CACHE, STORAGE of this host. */
export const QPU_POINTS = ['CPU', 'GPU', 'RAM', 'CACHE', 'STORAGE'] as const

const doubleOf = (k: number): number => {
  let x = k - k
  x = x + 1
  for (let i = k - k; i < k; i++) x += x
  return x
}

const seed = doubleOf(TRINITY - TRINITY)
const bits = HANDLE_BITS
const amplitudes = doubleOf(bits)
const kvAmplitudes = amplitudes + amplitudes
const fused = VE_FACES * kvAmplitudes

export const qpuSeatOf = () => {
  const lane = LANES.find((l) => l.name === 'QPU')
  if (!lane) throw new Error('qpu-hologram: LANES has no QPU seat')
  return {
    name: lane.name,
    seat: lane.seat,
    admits: lane.admits,
    host: 'uuidna' as const,
    honest: 'The QPU lane names the reverse hop to qpu.uuidna.com.',
  }
}

export const qpuWidthOf = () => ({
  points: [...QPU_POINTS],
  pentagram: QPU_POINTS.length,
  binds: 'cpu-only — no per-job footprint given, memory not considered',
  host: 'uuidna' as const,
})

export const qpuHologramOf = () => ({
  foundation: 0,
  debit: TRINITY,
  credit: HEXBIT_BITS + COINS,
  pentagram: QPU_POINTS.length,
  fold: BASE - COINS,
  octet: HANDLE_HEXBITS,
  veFaces: VE_FACES,
  seal: [...SEAL_TEN],
  host: 'uuidna' as const,
})

/** Opposite VE faces are throughVoid of each other. */
export const qpuFacesOf = (): readonly { face: number; opposite: number }[] =>
  Array.from({ length: VE_FACES }, (_, i) => ({ face: i, opposite: throughVoid(i % BASE) }))

/** QPU Lean figures, recomputed here by doubling and attributed to QPU Lean by name. */
export const qpuCircuitOf = () => {
  const holds =
    bits === UUID_HEXBITS &&
    bits === HANDLE_BITS &&
    amplitudes + amplitudes === kvAmplitudes &&
    fused === VE_FACES * kvAmplitudes &&
    VE_FACES === HANDLE_HEXBITS + HEXBIT_BITS + COINS
  return {
    kind: 'quantum' as const,
    host: QPU_HOST,
    href: QPU_HREF,
    lean: QPU_LEAN,
    theorem: 'quantum' as const,
    attributed: 'qpu.uuidna.com' as const,
    bits,
    amplitudes,
    kv: { added: amplitudes, amplitudes: kvAmplitudes },
    faces: VE_FACES,
    fused,
    next: fused + fused,
    hz: 432,
    holds,
  }
}

export const qpuReverseHrefOf = (path = '/') => {
  const door = path.startsWith('/') ? path : `/${path}`
  return `${QPU_HREF}${door}`
}

export const qpuMachineOf = () => ({
  host: QPU_HOST,
  href: QPU_HREF,
  reverse: true as const,
  seat: qpuSeatOf(),
  width: qpuWidthOf(),
  hologram: qpuHologramOf(),
  circuit: qpuCircuitOf(),
})
