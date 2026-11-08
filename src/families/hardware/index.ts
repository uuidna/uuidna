import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HARDWARE — the silicon's own arithmetic. SMT threads off cores, cache lines and bus bytes off widths, PCIe lanes and
 *  BGA pins off a grid, dies off a wafer, per-core power off a TDP, and the address space a bit count opens. Each an exact
 *  integer at a hex address; develops the hardware leads. */

const PROOF = 'hardware counts: threads = cores · 2 (SMT2); cache lines = bytes / 64; bus bytes = width / 8; lanes = slots · per-slot; pins = rows · cols; dies = wafer / die; per-core power = tdp / cores; address space = 2^bits'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hardware', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `hardware.${name}`, params })

export class HardwareFormulas {
  /** Hardware threads from `cores` with 2-way SMT: cores · 2. */
  static threads(cores: number): CrossFormula { return f('hardware-threads', 'threads(cores) = cores · 2', cores * 2, nat(cores), 'threads', [cores]) }
  /** 64-byte cache lines spanning `bytes`: bytes / 64. */
  static cacheLines(bytes: number): CrossFormula { return f('hardware-cacheLines', 'cacheLines(bytes) = bytes / 64', div(bytes, 64), nat(bytes), 'cacheLines', [bytes]) }
  /** Bytes on a `width`-bit bus: width / 8. */
  static busBytes(width: number): CrossFormula { return f('hardware-busBytes', 'busBytes(width) = width / 8', div(width, 8), nat(width), 'busBytes', [width]) }
  /** PCIe lanes from `slots` of `perSlot` lanes each: slots · perSlot. */
  static lanes(slots: number, perSlot: number): CrossFormula { return f('hardware-lanes', 'lanes(slots, perSlot) = slots · perSlot', slots * perSlot, nat(slots, perSlot), 'lanes', [slots, perSlot]) }
  /** BGA pins on a `rows` × `cols` grid: rows · cols. */
  static pins(rows: number, cols: number): CrossFormula { return f('hardware-pins', 'pins(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'pins', [rows, cols]) }
  /** Whole `die`-sized dies from a `wafer`-area wafer: wafer / die. */
  static dies(wafer: number, die: number): CrossFormula { return f('hardware-dies', 'dies(wafer, die) = wafer / die', div(wafer, die), nat(wafer, die) && die > 0, 'dies', [wafer, die]) }
  /** Per-core power from a `tdp` across `cores`: tdp / cores. */
  static tdpPerCore(tdp: number, cores: number): CrossFormula { return f('hardware-tdpPerCore', 'tdpPerCore(tdp, cores) = tdp / cores', div(tdp, cores), nat(tdp, cores) && cores > 0, 'tdpPerCore', [tdp, cores]) }
  /** The address space `bits` address lines open: 2^bits (bits ≤ 30). */
  static addressable(bits: number): CrossFormula { return f('hardware-addressable', 'addressable(bits) = 2^bits', bits <= 30 ? 2 ** bits : 0, nat(bits) && bits <= 30, 'addressable', [bits]) }
}

for (const name of ['addressable', 'busBytes', 'cacheLines', 'dies', 'lanes', 'pins', 'tdpPerCore', 'threads'] as const)
  hexRegisterOf('hardware', name, (HardwareFormulas[name] as (...x: unknown[]) => unknown).bind(HardwareFormulas))
