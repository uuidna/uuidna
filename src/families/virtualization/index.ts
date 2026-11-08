import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VIRTUALIZATION — PACKING COMPUTE ONTO FEWER MACHINES, AS ARITHMETIC. A hypervisor is numbers: vCPUs overcommitted
 *  against real cores, how many guests a host holds, guests consolidated onto fewer hosts, memory ballooned back,
 *  total vCPUs on a board, memory allocated, hypervisor overhead, and how long a live migration takes. Crosses to
 *  `concurrency` — many guests sharing one host is concurrency made physical. A measure. */

const PROOF = 'virtualization arithmetic (overcommit, VM density, consolidation, ballooning, vCPU count, allocation, overhead, migration); packing guests onto hosts; a measure crossed to concurrency'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'virtualization', dst: 'concurrency', formula, value, proof: PROOF, ...extra }, holds, { name: `virtualization.${name}`, params })

export class VirtualizationFormulas {
  /** OVERCOMMIT: allocated vCPUs against physical cores, as a percentage. value ⌊vcpu · 100 / cores⌋. */
  static overcommit(vcpu: number, cores: number): CrossFormula { return c('virtualization-overcommit', 'overcommit(vcpu, cores) = ⌊vcpu · 100 / cores⌋', cores > 0 ? Math.floor((vcpu * 100) / cores) : 0, nat(vcpu, cores) && cores > 0, 'overcommit', [vcpu, cores]) }
  /** DENSITY: guests a host holds at a per-guest memory. value ⌊hostMem / vmMem⌋. */
  static density(hostMem: number, vmMem: number): CrossFormula { return c('virtualization-density', 'density(hostMem, vmMem) = ⌊hostMem / vmMem⌋', vmMem > 0 ? Math.floor(hostMem / vmMem) : 0, nat(hostMem, vmMem) && vmMem > 0, 'density', [hostMem, vmMem]) }
  /** CONSOLIDATION: the hosts a fleet of guests needs at a per-host capacity. value ⌈vms / perHost⌉. */
  static consolidation(vms: number, perHost: number): CrossFormula { return c('virtualization-consolidation', 'consolidation(vms, perHost) = ⌈vms / perHost⌉', perHost > 0 ? Math.ceil(vms / perHost) : 0, nat(vms, perHost) && perHost > 0, 'consolidation', [vms, perHost]) }
  /** BALLOONING: memory reclaimed from a guest. value max(0, allocated − used). */
  static ballooning(allocated: number, used: number): CrossFormula { return c('virtualization-ballooning', 'ballooning(allocated, used) = max(0, allocated − used)', Math.max(0, allocated - used), nat(allocated, used), 'ballooning', [allocated, used]) }
  /** VCPU: total virtual CPUs on a board. value sockets · cores · threads. */
  static vcpu(sockets: number, cores: number, threads: number): CrossFormula { return c('virtualization-vcpu', 'vcpu(sockets, cores, threads) = sockets · cores · threads', sockets * cores * threads, nat(sockets, cores, threads), 'vcpu', [sockets, cores, threads]) }
  /** ALLOCATION: memory committed to the guests. value vms · perVm. */
  static allocation(vms: number, perVm: number): CrossFormula { return c('virtualization-allocation', 'allocation(vms, perVm) = vms · perVm', vms * perVm, nat(vms, perVm), 'allocation', [vms, perVm]) }
  /** OVERHEAD: hypervisor reservation against host memory, as a percentage. value ⌊reserved · 100 / total⌋. */
  static overhead(reserved: number, total: number): CrossFormula { return c('virtualization-overhead', 'overhead(reserved, total) = ⌊reserved · 100 / total⌋', total > 0 ? Math.floor((reserved * 100) / total) : 0, nat(reserved, total) && total > 0 && reserved <= total, 'overhead', [reserved, total]) }
  /** MIGRATION: live-migration seconds to move a guest's memory at a bandwidth. value ⌈memory / bandwidth⌉. */
  static migration(memory: number, bandwidth: number): CrossFormula { return c('virtualization-migration', 'migration(memory, bandwidth) = ⌈memory / bandwidth⌉', bandwidth > 0 ? Math.ceil(memory / bandwidth) : 0, nat(memory, bandwidth) && bandwidth > 0, 'migration', [memory, bandwidth]) }
}

for (const name of ['allocation', 'ballooning', 'consolidation', 'density', 'migration', 'overcommit', 'overhead', 'vcpu'] as const)
  hexRegisterOf('virtualization', name, (VirtualizationFormulas[name] as (...x: unknown[]) => unknown).bind(VirtualizationFormulas))
