// hardware/lanes — THE EXECUTOR TRINITY, SPECIFIED, WITH ONE SEAT DELIBERATELY EMPTY.
//
// The machine this tree runs on has more than one kind of executor, and the work is already shaped to be spread
// across them: an address is a uniform 32-bit handle, so `laneOf` shards by residue with no scheduler and no
// coordination, and `merkleGravity` is order-invariant, so which lane did which piece cannot change the answer.
// That is a genuine trinity of seats — and exactly two of them are real.
//
// WHAT THIS FILE IS. A SPECIFICATION, in the sense src/hardware/index.ts already means it: the datapath there is
// "NOT built, and NOT quantum hardware", and this is the same discipline applied to executors. The CPU lane is
// measured because it runs; the GPU lane is specified with the conditions it would have to meet; the QPU seat is
// NAMED AND EMPTY. Nothing here dispatches to a device, and nothing here should be read as claiming one exists.
//
// WHY THE THIRD SEAT STAYS EMPTY, stated plainly. TypeScript is the quantum-by-architecture computer; this
// host's QPU seat would be a physical device this machine does not have. Measured usable-capacity advantage is
// sealed (usable_gap_is_two_to_eighty); ARM 6 requires that seal and refuses false blanket denials of it. A QPU
// lane that dispatched nothing would name a device never measured — the seat is a NOTICE, not a capability.
import { HANDLE_BITS, HANDLE_SPAN } from '../../hexbit/index.js'

/** How real a seat is. MEASURED — it runs and its figures come from running it. SPECIFIED — the conditions are
 *  stated and nothing is built. EMPTY — named so a reader knows where it would go, and claimed for nothing. */
export type Seat = 'measured' | 'specified' | 'empty'

export interface Lane {
  name: string
  seat: Seat
  /** what a piece of work must be for this lane to take it at all */
  admits: string
  /** the honest note — for an empty seat, what is NOT being claimed */
  note: string
}

/** THE TRINITY. Two executors and one notice, in the order of how much this repository can say about each. */
export const LANES: readonly Lane[] = [
  {
    name: 'CPU',
    seat: 'measured',
    admits: 'anything the tree computes: exact integer arithmetic, process spawns, filesystem reads — the whole ledger runs here',
    note: 'the only lane with figures behind it. The proof sweep was measured across 14 lanes, and the ' +
      'lane count itself is read from the host rather than assumed (os/host capacity), never hard-coded.',
  },
  {
    name: 'GPU',
    seat: 'specified',
    admits: 'work that is (1) INDEPENDENT per element — no piece reads another\'s result; (2) EXACT INTEGER — this ' +
      'tree runs no floats, so a lane that computes in floating point cannot hold a fold; (3) WIDE ENOUGH to pay ' +
      'for the transfer, since moving a few kilobytes to a device and back costs more than folding it in place',
    note: 'NOT BUILT, and MEASURED NOT TO PAY at this ledger\'s scale. The shapes that qualify are real — the ' +
      'merkle fold is a balanced XOR tree whose siblings are independent by construction, and the receipt sweep ' +
      'applies one pure function across the whole ledger — but the whole of that work, over every theorem the ledger holds, ' +
      'is 0.59 ms on one CPU core (sweep 0.038 ms, fold 0.554 ms, 23 ns per address). A device round trip costs ' +
      'more than that before it computes anything. The lane is specified rather than built because the algebra ' +
      'says yes and the stopwatch says it would not matter.',
  },
  {
    name: 'VM',
    seat: 'specified',
    admits: 'verify-then-run of the pinned Alpine minirootfs — chroot/qemu/shell backend after uuidna SHA-256 exact-copy check',
    note: 'Layer 2 (uuidna_run). NOT on the Workers edge. Measured when mirror/ holds the pinned tarball and spawn succeeds; ' +
      'otherwise plan-only or absent — never faked.',
  },
  {
    name: 'QPU',
    seat: 'empty',
    admits: 'nothing — no work is routed here, because there is nothing to route it to',
    note: 'THE SEAT IS A NOTICE. This repository does not have quantum hardware, does not simulate it, and does ' +
      'not claim an advantage from it; the readiness trial checks that last point on every run. The word appears ' +
      'here so a reader knows the seat was considered and left empty ON PURPOSE, which is a different statement ' +
      'from silence. If a device ever attaches, it earns this seat the way everything else in this tree earns ' +
      'anything: measured, with a receipt, against work that was independent to begin with.',
  },
]

/** WHY A HANDLE IS A BALANCED SHARD KEY, as arithmetic rather than as a hope.
 *
 *  A handle is UUID_HEXBITS/4 hexbits — eight tiles of four bits, 32 bits — taken off a content-address, so its
 *  values are spread across the whole 2^32 range. Residue by the lane count therefore partitions work evenly for
 *  any lane count, without the key needing to know how many lanes there are, and without a lane needing to know
 *  what the others hold. That is the mod-9 router of src/hardware one level up: addressing by residue, not range.
 *
 *  The evenness is a property of the key, so it is stated as one and CHECKED (see laneCensus in scripts/api and
 *  the tests): a claim that the shard key balances is exactly the kind that reads true and is never verified.
 *
 *  AND IT IS NOW PROVEN RATHER THAN MERELY TESTED (2026-08-25, a peer's work on this file's claims). The three
 *  sentences above were prose, and prose is not signed true here — so they were put to the kernel, and the ledger
 *  seals them:
 *    lanes_partition_the_work       summing what each of 14 lanes receives from 64 items returns 64 — the residue
 *                                   map is a PARTITION, which is precisely why no coordination is needed: the
 *                                   question a scheduler exists to answer cannot arise.
 *    lanes_balance_within_one       those 64 give every lane 4 or 5, never fewer and never more, with no lane
 *                                   knowing what any other holds.
 *    lanes_even_on_complete_system  56 over 14 is exactly 4 each — the imbalance is never structural, only the
 *                                   remainder.
 *  A test shows a property held on the cases it ran; a decided theorem shows it holds on every case in the domain.
 *  This comment used to point at the weaker of the two witnesses because it was the only one that existed.
 *
 *  AND WHY IT WENT UNPROVEN FOR SO LONG, which is the transferable part rather than the fix. The three sentences
 *  above are a DEFENCE OF THE DESIGN — the argument for why a residue map needs no scheduler — and a defence of a
 *  design is the most dangerous prose in this tree, because it reads true and nothing is watching it. laneCensus
 *  tested the census, never the partition. The gap was never that the claim was wrong; it holds. The gap is that
 *  NOTHING COULD HAVE TOLD US IF IT HAD NOT. (The observation, and this phrasing of it, are uuidna-cb's, who put
 *  the three sentences to the kernel rather than reading past them.)
 *
 *  AND THE HANDLE IS HEXBIT'S, NOT THIS FILE'S. These two were computed here — `(UUID_HEXBITS / 4) * HEXBIT_BITS`
 *  and `2 ** HANDLE_BITS` — which made a second public HANDLE_SPAN (src/index re-exports hexbit's, src/hardware
 *  re-exported this one) reaching the same 4,294,967,296 by a different route. `universe_of_handles` seals that
 *  the units are "imported from hexbit/, never re-derived"; this file was the counterexample to the theorem the
 *  ledger holds. Re-exported now, so there is one definition and this module still names what it uses. */
export { HANDLE_BITS, HANDLE_SPAN }

// ── THE READING THAT DECIDED THE GPU SEAT — A RECORD OF ONE RUN, not a live figure. "Runs faster on a GPU" is a
// claim about a workload rather than about a chip, so the workload was measured and the numbers below are what it
// said that day. They are frozen deliberately: a record that gets edited to stay current stops being evidence of
// anything, and the whole point of these three lines is that the next reader can re-take them and compare.
//
//   the whole gate                                        100,087 ms
//   its critical path — the Lean kernel, one process per wing (111 that run)   30,762 ms
//   ALL pure uuidna compute over the entire ledger               0.59 ms
//
// The GPU-eligible portion is six ten-thousandths of one percent of a run. An infinitely fast device saves 0.59 ms
// out of a hundred seconds — and it would not save that, because a kernel launch and a round trip cost more than
// the computation they carry: at 23 ns per address, a CPU finishes ~2,000 addresses in the time a transfer takes
// to begin, and the ledger held fewer than that when this was taken. The work is smaller than its own postage.
//
// WHAT DOMINATES INSTEAD, and why no lane assignment touches it: the critical path is the Lean kernel type-
// checking proofs. That is not data-parallel arithmetic waiting for a wider machine — it is a proof checker, one
// per wing, and the win there was already taken by running them concurrently (114,402 ms → 23,536 ms across 14
// CPU lanes, 4.86x). A GPU has nothing to offer a process that spawns a type-checker.
//
// WHERE THE ANSWER WOULD FLIP, stated so the claim is falsifiable rather than merely denied: the break-even is
// the corpus size, not the chip — and it is ARITHMETIC, so it is computed below (gpuBreakEvenAddresses) rather
// than asserted here. This paragraph used to end "around a few million addresses the transfer amortises", a
// figure that appeared nowhere else and that nothing checked; when the arithmetic was finally written down it
// disagreed with the sentence three lines above it, which puts the CPU at ~2,000 addresses in the time a device
// round trip takes to begin. Both cannot be the break-even. They are answers to two different questions, and
// separating them is the whole of the fix:
//
//   STOPS LOSING — the point where a device lane is no longer worse. Pure arithmetic on two device figures,
//     computed by gpuBreakEvenAddresses; for the overhead this file's own prose implies, it is ~2,000 addresses.
//   STARTS MATTERING — the point where the fold is a visible share of a run rather than a rounding error. That
//     is gpuEligiblePpm, and it stays a rounding error for corpora far past the first threshold: even a few
//     million addresses is ~46 ms of CPU fold against a hundred-second gate. This is the "few million".
//
// A lane that has merely stopped losing is not worth building, which is why the seat stays specified past the
// first threshold and why the honest reading of this file is the second number, not the first.
const MEASURED_GATE_MS = 100087
const MEASURED_KERNEL_MS = 30762
const MEASURED_COMPUTE_MS_HUNDREDTHS = 59   // 0.59 ms, in hundredths — this tree runs no floats

/** what one address costs the CPU to fold, in nanoseconds — measured, and the only figure here this repository
 *  has actually taken (0.554 ms of fold over the whole ledger, divided by the addresses in it). */
export const CPU_NS_PER_ADDRESS = 23

/** What a device would cost, as the two numbers that decide it. BOTH ARE INPUTS, AND NEITHER IS MEASURED HERE:
 *  this repository has no GPU reading and will not invent one, so the model takes a device's figures and says
 *  what corpus THAT device would need. Supplying numbers is the caller's act, and it is the caller's claim. */
export interface DeviceCost {
  /** the fixed price of using the device at all: launch, submit, round trip — paid whatever the size */
  overheadNs: number
  /** what each address costs once the work is on its way — transfer plus compute, per element */
  perAddressNs: number
}

/** gpuBreakEvenAddresses(cost) → the corpus size at which a device lane STOPS LOSING to the CPU.
 *
 *  n · CPU = overhead + n · perAddress, solved for n: the overhead divided by the per-address gain. Integer
 *  division throughout — this tree runs no floats, so the answer floors and is exact.
 *
 *  ZERO MEANS NEVER, not "immediately". A device that is not strictly cheaper per address than 23 ns has no
 *  break-even at any size: every extra address widens the gap rather than closing it, and the overhead is never
 *  amortised because there is nothing to amortise it against. Returning a huge number there would read as a
 *  threshold a big enough corpus could reach, and no corpus can. */
export const gpuBreakEvenAddresses = (cost: DeviceCost): number => {
  const gain = CPU_NS_PER_ADDRESS - cost.perAddressNs
  if (gain <= 0) return 0
  const n = cost.overheadNs
  return (n - (n % gain)) / gain
}

/** the share of a gate pass that a device lane could address at all, in parts per million, as an integer. */
export const gpuEligiblePpm = (): number => {
  const n = MEASURED_COMPUTE_MS_HUNDREDTHS * 1000000
  const d = MEASURED_GATE_MS * 100
  return (n - (n % d)) / d
}

/** the share the Lean kernel holds, in percent — the thing a device lane cannot touch */
export const kernelPercent = (): number => {
  const n = MEASURED_KERNEL_MS * 100
  return (n - (n % MEASURED_GATE_MS)) / MEASURED_GATE_MS
}

/** the trinity's own arithmetic, recomputed rather than asserted — a caller checks it instead of trusting it */
export const trinity = (): { seats: number; measured: number; specified: number; empty: number; handleBits: number } => ({
  seats: LANES.length,
  measured: LANES.filter((l) => l.seat === 'measured').length,
  specified: LANES.filter((l) => l.seat === 'specified').length,
  empty: LANES.filter((l) => l.seat === 'empty').length,
  handleBits: HANDLE_BITS,
})
