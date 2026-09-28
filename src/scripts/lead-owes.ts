#!/usr/bin/env node
// lead-owes — THE AUTOMATION CEILING OVER THE LEADS THAT HOLD A RELEASE, measured rather than estimated.
//
// The captain, 2026-09-28: "Land all leads" / "Release all leads" / "land all leads and their leads in full automation".
// `leads-gate` says how many hold. It does not say which of them a generator could ever reach, and without that number
// "full automation" is a plan with no denominator. This door supplies the denominator and nothing else: it moves no
// lead, settles nothing, and returns 0 whatever it finds, because a reading is not a verdict.
//
// WHY IT CANNOT BE FOLDED INTO leads-gate. That gate decides whether a release may ship and must stay the smallest
// thing that answers it. This is a reading about the WORK, for a human choosing what to build next, and a gate that also
// advises is a gate whose refusal can be argued with.
import { gatherLeads } from './leads-gate.js'
import { leadCensus } from '../leads.js'
import { owesCensus } from '../lead-owes.js'
import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'

const served = await servedAsync<{ holding: number; door: number; corpus: number; kernel: number; source: number; undetermined: number; automatable: string; rows: { what: string; instrument: string; why: string }[] }>({
  path: 'lean/lead-owes-receipt.json',
  // dist/leads.js IS AN INPUT, and leaving it out was the audit-citations defect by a new road: the classification runs
  // over `census.holding`, so the rule that DECIDES what holds is as much an input as the rule that classifies it. With
  // it absent, correcting kernelDecidable moved holding from 40 to 9 and this receipt would have kept serving 40.
  inputs: ledgerAndRule(['dist/scripts/lead-owes.js', 'dist/lead-owes.js', 'dist/leads.js']),
  compute: async () => {
    const census = leadCensus(gatherLeads())
    const owes = owesCensus(census.holding)
    return {
      holding: census.holding.length,
      door: owes.door,
      corpus: owes.corpus,
      kernel: owes.kernel,
      source: owes.source,
      undetermined: owes.undetermined,
      automatable: owes.automatable,
      rows: owes.rows.map((r) => ({ what: r.lead.what, instrument: r.instrument, why: r.why })),
    }
  },
}, fsStore)

const v = served.value
console.log(served.hit ? `served by receipt ${served.digest}` : `walked and earned receipt ${served.digest}`)
console.log(`${v.holding} lead(s) hold a release. Which instrument could settle each:`)
console.log(`  DOOR — a gap record naming the capability no door served: ${v.door}`)
console.log(`  CORPUS — a query no sealed theorem covers; owes new content: ${v.corpus}`)
console.log(`  KERNEL — a relation among quantities the ledger holds: ${v.kernel} (${v.automatable})`)
console.log(`  SOURCE — a shape in the TypeScript, which the kernel cannot read: ${v.source}`)
console.log(`  UNDETERMINED — no relation stated, no artefact named: ${v.undetermined}`)
console.log()
console.log(`A THEOREM GENERATOR REACHES AT MOST ${v.automatable} OF WHAT HOLDS. The rest owe a code change, or an`)
console.log('instrument that settles a source reading — which this tree does not have, because `leads-gate --refute`')
console.log('requires a kernel involution and the kernel cannot look at TypeScript. Encoding a source measurement as a')
console.log('Lean literal would seal a theorem that stays green after the defect returns, which is the vacuous-success')
console.log('class arriving by a new road. So the source count is work, openly carried, and not a proof waiting to be run.')
console.log()
for (const cls of ['door', 'corpus', 'kernel', 'source', 'undetermined'] as const) {
  for (const r of v.rows.filter((x) => x.instrument === cls).slice(0, 5)) {
    console.log(`  ${cls.padEnd(13)} ${r.what.slice(0, 96)}`)
  }
}
console.log()
console.log('NOTHING MOVED. Every lead counted here still holds a release exactly as it did before this door ran: the')
console.log('source count is the measure of a debt, never a licence to stop carrying it.')
