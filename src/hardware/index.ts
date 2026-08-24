// hardware — THE HEXBIT MACHINE, SPECIFIED.
//
// What this is: a specification, in classical digital logic, of the machine this ledger's algebra describes. It
// is NOT built, and it is NOT quantum hardware — every element below is ordinary combinational or sequential
// logic, reducible to NAND, which `nand_functionally_complete` already seals along with the truth table of every
// gate it uses. What makes it worth specifying is that the software already computes this way: exact integers,
// no floats, widths that are multiples of four, and comparisons at handle width. The hardware is the same
// arithmetic in silicon rather than a different claim.
//
// THE WIDTHS ARE NOT CHOSEN. A hexbit is 4 bits and 16 states — one tile. A handle is 8 hexbits, 32 bits, which
// is the natural word. Four handles are a uuid, 128 bits (`handle_string_spans_the_quarter`: 16^8 = 2^32 and
// (2^32)^4 = 2^128). The captain theorem fixes the rest: 32 · 4 = 128, and the commission divides the handle
// into its own unit, 8 hexbits over two coins being 4 — the bit-width of a hexbit.
//
// WHY HEXBIT-WIDE PAYS IN SILICON. A width computed by dividing by 16 takes a quarter of the steps of one
// computed by halving — measured 4.00x on the same six values, and 4x in wall-clock once each step cost one
// operation. In hardware the same ratio appears as depth: a 32-bit compare as eight 4-bit tiles is a tree of
// depth 3 rather than 5, and the tiles are independent, so the comparator is wide and shallow.
import { HEXBIT_BITS, UUID_HEXBITS, UUID_BITS, COINS } from '../hexbit/index.js'

export interface Unit { name: string; width: number; hexbits: number; note: string }

/** THE DATAPATH — every register a multiple of the tile, so nothing is ragged. */
export const DATAPATH: readonly Unit[] = [
  { name: 'hexbit', width: HEXBIT_BITS, hexbits: 1, note: 'one tile, 16 states — the unit every width is a multiple of' },
  { name: 'handle', width: UUID_HEXBITS / 4 * HEXBIT_BITS, hexbits: UUID_HEXBITS / 4, note: 'the word: 8 tiles, and what the gates compare' },
  { name: 'uuid', width: UUID_BITS, hexbits: UUID_HEXBITS, note: 'the identity: 4 handles, and what a fold produces' },
  { name: 'coin', width: COINS, hexbits: 0, note: 'the commission, two bits — narrower than a tile, and fixed' },
]

/** THE UNITS a hexbit machine needs, each reducible to NAND and each already sealed as arithmetic.
 *
 *  ROUTER: the ring is ℤ/9, so addressing is a residue and not a range. A 4-bit tile feeds a mod-9 reducer;
 *  the doubling orbit [1,2,4,8,7,5] is a 6-state ring counter, and the 3-6-9 axis is the three states it cannot
 *  enter — a nilpotent seed is trapped there in hardware exactly as it is in the walk, and the reflection
 *  dz(x) = 10 − x is the one-cycle escape (`dz_swaps_the_thirds_and_fixes_the_axis`).
 *
 *  FOLD TREE: merkle gravity is order-invariant, so the reduction is a balanced XOR tree with no ordering
 *  constraint between siblings — depth log₂(n), fully parallel, and the same root whichever way the leaves
 *  arrive. That property is what makes it a tree in hardware rather than a chain.
 *
 *  COMPARATOR: verification is a handle compare, 32 bits as 8 independent tiles, depth 3. This is the whole
 *  reason the machine is fast at what it does: O(1) verification against O(N) recompute is not an optimisation
 *  here, it is the sealed `verify_beats_recompute_by_magnitudes`, and in silicon it is one shallow tree. */
export const UNITS: readonly { unit: string; logic: string; depth: string; seals: string }[] = [
  { unit: 'mod-9 router', logic: 'combinational residue reducer over a 4-bit tile', depth: 'constant', seals: 'three_no_inverse' },
  { unit: 'doubling ring counter', logic: '6-state, the units orbit; 3 states unreachable from the axis', depth: 'one clock per step', seals: 'vortex_one_leap' },
  { unit: 'reflection unit', logic: 'dz(x) = 10 − x, one cycle, involutive', depth: 'constant', seals: 'dz_involution' },
  { unit: 'merkle fold tree', logic: 'balanced XOR, order-invariant, siblings independent', depth: 'log2(n)', seals: 'xor_preserves_distance' },
  { unit: 'handle comparator', logic: '8 tiles wide, tiles independent', depth: '3', seals: 'verify_beats_recompute_by_magnitudes' },
]

/** the machine's own arithmetic, recomputed rather than stated — a caller checks it instead of trusting it. */
export const spec = (): { widthsAreTiles: boolean; uuidIsFourHandles: boolean; tileStates: number; wordTiles: number } => ({
  widthsAreTiles: DATAPATH.filter((u) => u.hexbits > 0).every((u) => u.width % HEXBIT_BITS === 0),
  uuidIsFourHandles: (UUID_HEXBITS / 4) * 4 === UUID_HEXBITS && UUID_BITS === UUID_HEXBITS * HEXBIT_BITS,
  tileStates: 2 ** HEXBIT_BITS,
  wordTiles: UUID_HEXBITS / 4,
})

// the lanes face — the executor trinity, re-exported so src/hardware stays one name for one concept
export { LANES, trinity, gpuEligiblePpm, kernelPercent, HANDLE_BITS, HANDLE_SPAN, type Lane, type Seat } from './lanes/index.js'
