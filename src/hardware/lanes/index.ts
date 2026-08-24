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
// WHY THE THIRD SEAT STAYS EMPTY, stated plainly because the opposite is the tempting move. This tree refuses the
// quantum claim everywhere it could be made: `src/hardware` says ordinary combinational logic reducible to NAND;
// gen-quantum-capacity's own honest field says "never a quantum computer"; and ARM 6 of the readiness trial
// checks, on every run, that no advantage is claimed. A QPU lane that dispatched nothing would be a name for a
// device this machine does not have — an instrument reporting what it never measured, which is the one defect
// class this tree spends the most effort refusing. The seat is a NOTICE, not a capability: it says where a real
// device would attach, and it says the ledger has never seen one.
import { HEXBIT_BITS, UUID_HEXBITS } from '../../hexbit/index.js'

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
 *  the tests): a claim that the shard key balances is exactly the kind that reads true and is never verified. */
export const HANDLE_BITS = (UUID_HEXBITS / 4) * HEXBIT_BITS
export const HANDLE_SPAN = 2 ** HANDLE_BITS

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
// the corpus size, not the chip. Around a few million addresses the transfer amortises and a device lane starts
// to pay — a ledger three orders of magnitude larger than this one, or a bulk imprint over a large corpus. The
// GPU seat stays specified for exactly that day, and the figure above is what it has to beat.
const MEASURED_GATE_MS = 100087
const MEASURED_KERNEL_MS = 30762
const MEASURED_COMPUTE_MS_HUNDREDTHS = 59   // 0.59 ms, in hundredths — this tree runs no floats

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
