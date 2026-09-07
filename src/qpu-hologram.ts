// qpu-hologram — THE OCTET READ AS QPU: named planes, one sequence, fourteen faces.
//
// Desk wiring. Numbers and addresses. The hardware QPU lane stays empty; this module does not dispatch a device.
import { TRINITY, BASE } from './address.js'
import { COINS, HEXBIT_BITS, HANDLE_HEXBITS, VE_FACES } from './hexbit/index.js'
import { LANES } from './hardware/lanes/index.js'
import { SEAL_TEN, throughVoid } from './sequence-field.js'

/** The worker host. Licensed as its own entry — no wildcard. */
export const QPU_HOST = 'qpu.uuidna.com'

/** BindingPoint pentagram — CPU, GPU, RAM, CACHE, STORAGE. */
export const QPU_POINTS = ['CPU', 'GPU', 'RAM', 'CACHE', 'STORAGE'] as const

export const qpuSeatOf = () => {
  const lane = LANES.find((l) => l.name === 'QPU')
  if (!lane) throw new Error('qpu-hologram: LANES has no QPU seat')
  return { name: lane.name, seat: lane.seat, admits: lane.admits }
}

export const qpuWidthOf = () => ({
  points: [...QPU_POINTS],
  pentagram: QPU_POINTS.length,
  binds: 'cpu-only — no per-job footprint given, memory not considered',
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
})

/** Opposite VE faces are throughVoid of each other — the superposition's equilibrium as a count. */
export const qpuFacesOf = (): readonly { face: number; opposite: number }[] =>
  Array.from({ length: VE_FACES }, (_, i) => ({ face: i, opposite: throughVoid(i % BASE) }))

export const qpuMachineOf = () => ({
  host: QPU_HOST,
  seat: qpuSeatOf(),
  width: qpuWidthOf(),
  hologram: qpuHologramOf(),
})
