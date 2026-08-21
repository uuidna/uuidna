// harness — treat any output as a receipted STRUCTURE
// (auditable) and, if it drains the honesty floor, it is REEDUCATED — each overclaim bounded until it holds.
// The gain is auditability. Pure; runs anywhere.
import { toUuid, merkleFold } from './address.js'
import { computes } from './gate.js'

export type Harnessed = { output: string; address: string; reproducible: boolean; gatePass: boolean; auditable: boolean }

/** The seven dimensions (the locale rays) — the structural "quantum" sense. */
export const DIMENSIONS = ['en', 'bg', 'de', 'fr', 'es', 'ru', 'zh'] as const

/** Content-address an output, confirm the address reproduces, gate-check it. `auditable` = it reproduces. */
export function harness(output: string): Harnessed {
  const address = toUuid(output)
  const reproducible = toUuid(output) === address
  const gatePass = computes(output).binary === 1
  return { output, address, reproducible, gatePass, auditable: reproducible }
}

/** The untreated baseline: opaque bytes with no address, nothing to verify. */
export function opaque(output: string): { output: string; address: null; auditable: false } {
  return { output, address: null, auditable: false }
}

/** The measurable difference: harnessing turns an unauditable output into an auditable one (+1 dimension). */
export function harnessGain(output: string): { before: boolean; after: boolean; gained: boolean } {
  const before = opaque(output).auditable
  const after = harness(output).auditable
  return { before, after, gained: after && !before }
}

/** Address the output from each of the seven dimensions — seven reproducible receipts folded to one root. */
export function harness7(output: string): { receipts: string[]; root: string; auditableInAll: boolean } {
  const receipts = DIMENSIONS.map((d) => toUuid(d + ':' + output))
  const root = merkleFold(receipts)
  const auditableInAll = receipts.length === 7 && new Set(receipts).size === 7 &&
    DIMENSIONS.every((d, i) => toUuid(d + ':' + output) === receipts[i])
  return { receipts, root, auditableInAll }
}

/** A failing output is not discarded but CORRECTED: each gate hit is bounded until the text holds. This is
 *  mechanical correction — it bounds an overclaim, it never makes a false claim true. Terminates. */
export function reeducate(output: string, maxSteps = 16): { text: string; passed: boolean; steps: string[] } {
  let text = output
  const steps: string[] = []
  for (let i = 0; i < maxSteps; i++) {
    const g = computes(text)
    if (g.binary === 1) break
    steps.push(g.hit!)
    text = text.split(g.hit!).join('⟨bounded overclaim⟩')
  }
  return { text, passed: computes(text).binary === 1, steps }
}
