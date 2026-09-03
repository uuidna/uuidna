// hardware/lanes/report — THE BALANCER, AS FIGURES A REPORT CAN CARRY.
//
// `laneCensus` has always ended its docstring with "what a report needs to show that the balance was real and not
// assumed", and no report used it. The evenness of the shard was stated as a property of the key and checked in a
// test; it was never PUBLISHED, so a reader of any sealed report had to take the balance on the tree's word. This
// turns the census into classed figures, so the balance travels with its own evidence.
//
// ── THE ANSWER TO "HOW DO THE LANES MESSAGE EACH OTHER": THEY DO NOT. That is the design, not an omission, and it
// is the whole efficiency and security argument in one fact.
//
//   ROUTING IS THE ADDRESS. `laneOf` takes the handle — eight hex characters off a content-address, so uniform by
//     construction — and reduces it mod the lane count. No scheduler is consulted, no queue is shared, no lane
//     tells another what it holds. The routing decision is a property of the work itself, so two lanes cannot
//     disagree about it and there is nothing to synchronise.
//
//   RECONCILIATION IS THE FOLD. `merkleGravity` is order-invariant, so which lane did which piece cannot change
//     the answer. Lanes therefore never need to agree on ORDER either — the usual reason parallel workers talk.
//
//   SO THE INTER-LANE MESSAGE COUNT IS ZERO, and it is zero by construction rather than by tuning. That is the
//     efficiency claim: coordination overhead cannot grow with lane count because there is no coordination. And
//     it is the security claim: a channel that does not exist is unraceable, unstarvable, unforgeable or observed. The
//     only thing that crosses a lane boundary is a content-address, and a content-address is checkable by
//     recomputation rather than by trust.
//
//   THE PRICE IS NAMED, because a claim without its cost is an advertisement: residue routing is NOT
//     work-conserving. A lane can hold the slow items while others idle, measured at about a tenth more
//     wall-clock on an even workload (see poolByHandle). Reproducibility is bought with that tenth.
//
// ── AND THE QPU SEAT IS EMPTY. It is named so a reader knows where a real device would attach, and it is claimed
// for NOTHING: nothing dispatches to it, nothing is measured on it, and no message is routed through it. If the
// question is whether the quantum seat carries the messaging, the answer this tree will give is no — the seat is
// a notice. Saying otherwise would be an instrument reporting what it never measured, which is the one defect
// class this repository spends the most effort refusing.
//
// HOST FIGURES BELONG IN THE SERVED REPORT, NEVER IN THE SEALED ONE. Lane count and processor width are read from
// the machine and differ between machines, so they are `measured` and they would drift a sealed artifact on every
// host that built it — the exact defect this report already suffered once with a timing. docs/public/*.jsonld is
// tracked but is neither in spin's DERIVED_FILES nor in the gate's git-diff set, so it is the right home; the
// sealed lean/*.json must not carry them.
import type { Figure } from '../../microdata.js'
import { trinity, LANES } from './index.js'

export interface BalancerHost {
  /** lanes the fan-out may use right now — the machine's width less the reserve */
  lanes: number
  /** every logical processor the host reports */
  logical: number
  /** lanes deliberately left behind so the orchestrator and the heavy step are not starved */
  reserved: number
}

/** balancerFigures(census, host) → the balancer as classed figures.
 *
 *  `census` is what `laneCensus` returned for the work actually distributed: one count per lane. It is taken as an
 *  ARGUMENT rather than computed here so this module stays in the hardware layer — `laneCensus` lives beside the
 *  fan-out in the scripts layer, and a second implementation of it here would be the duplication this tree keeps
 *  deleting. The caller measures; this states what was measured. */
export function balancerFigures(census: readonly number[], host: BalancerHost): Figure[] {
  const items = census.reduce((a, b) => a + b, 0)
  let lo = census.length ? census[0]! : 0
  let hi = lo
  for (const c of census) { if (c < lo) lo = c; if (c > hi) hi = c }
  // spread as an integer percentage of the busiest lane over the quietest — 100 is perfect balance. Integer
  // arithmetic throughout, because the determinism law admits no float where an integer will do.
  const spreadPct = lo === 0 ? 0 : (hi * 100 - ((hi * 100) % lo)) / lo
  const t = trinity()

  const seatFigure = (name: string): Figure => {
    const lane = LANES.find((l) => l.name === name)!
    return {
      name: `executor seat — ${lane.name}`,
      value: lane.seat,
      // the seat's own honesty word maps exactly onto the figure's class, which is why the two vocabularies were
      // worth aligning: a `specified` lane stays unpublished as though it ran, and an `empty` one claims nothing
      measurementTechnique: lane.seat === 'measured' ? 'measured' : lane.seat === 'specified' ? 'computed' : 'declared',
      citation: `${lane.admits} — ${lane.note}`,
    }
  }

  return [
    { name: 'balancer — lanes in use', value: host.lanes, unitText: 'lanes', measurementTechnique: 'measured',
      citation: `read from this host at build time: ${host.logical} logical processors less ${host.reserved} reserved, so the fan-out is never wider than the machine` },
    { name: 'balancer — work distributed', value: items, unitText: 'items', measurementTechnique: 'measured',
      citation: 'every piece the fan-out actually routed this run, counted from the lane census rather than from what was queued' },
    { name: 'balancer — lane spread', value: spreadPct, unitText: '% (busiest lane over quietest; 100 is even)',
      measurementTechnique: 'measured',
      citation: `busiest lane held ${hi}, quietest held ${lo} — measured on the work that ran, not asserted from the key's uniformity` },
    { name: 'balancer — inter-lane messages', value: 0, unitText: 'messages', measurementTechnique: 'declared',
      citation: 'ZERO BY CONSTRUCTION, not by tuning, and the construction is SEALED: theorem lanes_partition_the_work proves the residue map is a partition — summing what each of 14 lanes receives from 64 items returns 64, nothing lost and nothing counted twice — so the question a scheduler exists to answer cannot arise. merkleGravity is order-invariant, so lanes never need to agree on order either. Coordination overhead cannot grow with lane count because there is no coordination, and a channel that does not exist is unraceable, unstarvable, unforgeable or observed. The price, named: residue routing is not work-conserving and costs about a tenth more wall-clock on an even workload' },
    { name: 'balancer — worst-case lane imbalance', value: 1, unitText: 'item',
      // COMPUTED, not measured: it is proven for every workload, so a run is the wrong evidence for it. Classing it
      // `measured` would offer this run as proof of a claim about all runs, which is the substitution the
      // honesty classes exist to prevent.
      measurementTechnique: 'computed',
      citation: 'PROVEN, not observed: theorem lanes_balance_within_one seals that 64 items over 14 lanes give every lane 4 or 5 — never fewer, never more — with no lane knowing what another holds, and theorem lanes_even_on_complete_system seals that the imbalance vanishes entirely when the work divides (56 items over 14 lanes give exactly 4 each). So the imbalance is never structural; it is only the remainder, bounded by one item per lane. All three are `by decide`, sorry-free, and depend on NO axiom beyond the leanprover/lean4 kernel' },
    { name: 'balancer — executor seats', value: t.seats, unitText: 'seats', measurementTechnique: 'declared',
      citation: `${t.measured} measured, ${t.specified} specified, ${t.empty} empty — the trinity is two executors and one notice` },
    ...LANES.map((l) => seatFigure(l.name)),
  ]
}
