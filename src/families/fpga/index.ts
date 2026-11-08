import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FPGA — THE RECONFIGURABLE FABRIC, AS ARITHMETIC. An FPGA is numbers by the book: look-up tables and flip-flops
 *  across the slices, DSP slices across the columns, block-RAM capacity, the maximum clock from the period, fabric
 *  utilisation, pipeline latency, streaming throughput, the I/O across the banks, and static power. Deterministic
 *  integer identities, standard FPGA architecture. Crosses to `hardware`. A measure, not advice. */

const PROOF = 'FPGA arithmetic by the book (LUTs = slices · per-slice, flip-flops = slices · per-slice, DSP = columns · per-column, block-RAM = blocks · KB-each, fMAX = ⌊1e6 / period-ps⌋ MHz, utilisation = ⌊used · 100 / total⌋, pipeline = stages + latency, throughput = fMAX · per-clock, I/O = banks · per-bank, power = LUTs · per-LUT-µW); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fpga', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `fpga.${name}`, params })

export class FpgaFormulas {
  /** LUTS — total look-up tables across the slices. value slices · perSlice. */
  static luts(slices: number, perSlice: number): CrossFormula { return f('fpga-luts', 'luts(slices, perSlice) = slices · perSlice', slices * perSlice, nat(slices, perSlice), 'luts', [slices, perSlice]) }
  /** FFS — total flip-flops (registers) across the slices. value slices · perSlice. */
  static ffs(slices: number, perSlice: number): CrossFormula { return f('fpga-ffs', 'ffs(slices, perSlice) = slices · perSlice', slices * perSlice, nat(slices, perSlice), 'ffs', [slices, perSlice]) }
  /** DSP — total DSP slices across the columns. value columns · perColumn. */
  static dsp(columns: number, perColumn: number): CrossFormula { return f('fpga-dsp', 'dsp(columns, perColumn) = columns · perColumn', columns * perColumn, nat(columns, perColumn), 'dsp', [columns, perColumn]) }
  /** BRAM — total block-RAM capacity: the blocks times the kilobits each holds. value blocks · kbEach (Kb). */
  static bram(blocks: number, kbEach: number): CrossFormula { return f('fpga-bram', 'bram(blocks, kbEach) = blocks · kbEach (Kb)', blocks * kbEach, nat(blocks, kbEach), 'bram', [blocks, kbEach]) }
  /** FMAX — the maximum clock from the critical-path period in picoseconds. value ⌊1000000 / periodPs⌋ (MHz); holds periodPs > 0. */
  static fmax(periodPs: number): CrossFormula { return f('fpga-fmax', 'fmax(periodPs) = ⌊1000000 / periodPs⌋ (MHz)', periodPs > 0 ? Math.floor(1000000 / periodPs) : 0, nat(periodPs) && periodPs > 0, 'fmax', [periodPs]) }
  /** UTILIZATION — fabric utilisation: used resources as a percentage of the total. value ⌊used · 100 / total⌋; holds total > 0 and used ≤ total. */
  static utilization(used: number, total: number): CrossFormula { return f('fpga-utilization', 'utilization(used, total) = ⌊used · 100 / total⌋', total > 0 ? Math.floor((used * 100) / total) : 0, nat(used, total) && total > 0 && used <= total, 'utilization', [used, total]) }
  /** PIPELINE — pipeline depth: the register stages plus the combinational latency. value stages + latency. */
  static pipeline(stages: number, latency: number): CrossFormula { return f('fpga-pipeline', 'pipeline(stages, latency) = stages + latency', stages + latency, nat(stages, latency), 'pipeline', [stages, latency]) }
  /** THROUGHPUT — streaming throughput: the clock times the results produced each cycle. value fmaxMHz · perClock. */
  static throughput(fmaxMHz: number, perClock: number): CrossFormula { return f('fpga-throughput', 'throughput(fmaxMHz, perClock) = fmaxMHz · perClock', fmaxMHz * perClock, nat(fmaxMHz, perClock), 'throughput', [fmaxMHz, perClock]) }
  /** IO — total user I/O: the banks times the pins each bank carries. value banks · perBank. */
  static io(banks: number, perBank: number): CrossFormula { return f('fpga-io', 'io(banks, perBank) = banks · perBank', banks * perBank, nat(banks, perBank), 'io', [banks, perBank]) }
  /** POWER — static power: the LUTs times the microwatts each draws. value luts · perLutUw (µW). */
  static power(luts: number, perLutUw: number): CrossFormula { return f('fpga-power', 'power(luts, perLutUw) = luts · perLutUw (µW)', luts * perLutUw, nat(luts, perLutUw), 'power', [luts, perLutUw]) }
}

for (const name of ['bram', 'dsp', 'ffs', 'fmax', 'io', 'luts', 'pipeline', 'power', 'throughput', 'utilization'] as const)
  hexRegisterOf('fpga', name, (FpgaFormulas[name] as (...x: unknown[]) => unknown).bind(FpgaFormulas))
