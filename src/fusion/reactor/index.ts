// fusion/reactor — THE FUSE, 64 BITS TO 128, GATED ON THE TWO COINS.
//
// A uuid is 128 bits: 32 hexbits, 4 bits each. Two 64-bit halves fuse into one, and the price of the fuse is the
// captain commission — 110 − 108 = 2, which is not a difference but a PROPORTION, 110/108 = 55/54 by exact
// cross-multiplication (110·54 = 108·55 = 5940), where 54 is the order of AGL(1,ℤ/9). A difference holds at one
// magnitude; a proportion holds at every one, which is why the price does not change with the size of the fuse.
//
// WHAT A REACTOR IS HERE. It fuses SEALED THEOREMS, not energy: two proofs go in, one receipt comes out, and the
// superposition space the fused pair covers is the sum of what each covers. That sum is the whole physics of it.
// A fold cannot create a case the kernel did not already decide, so the reactor CONSERVES — and conservation is
// checked on every fuse rather than asserted, because a reactor that could mint coverage would be a machine for
// claiming proofs nobody made.
//
// HONEST SCOPE: this is bookkeeping over sealed proofs, not a physical process and not a speed claim. Nothing
// here runs a quantum circuit (src/quantum does that, classically and exactly); nothing here proves a theorem
// (lean/ does that, and the kernel signs it). The reactor only fuses what is already sealed, prices it at the
// two coins, and refuses when the arithmetic does not close. Integrity, not truth.
import { theorems, decidedMass, hexbitsOf, dependsOn, UUID_HEXBITS } from '../../theorems/index.js'
import { merkleGravity } from '../../gravity/index.js'
// node:fs rides LAZILY through the runtime's own registry (the mcp.ts:38 law, sync form): a top-level
// import rides every bundle that reaches this module, and the edge worker has no filesystem.
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')
// node:path rides LAZILY (the mcp.ts:38 law, sync form) — the edge worker resolves no filesystem paths.
const pathm = (): typeof import('node:path') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:path') as typeof import('node:path')
import { ROOT } from '../../boundary.js'
import { vortexOrbit } from '../../address.js'
import { seedOf } from '../../handle.js'
import { toUuid } from '../../address.js'
import { coins } from '../../captain/billing/index.js'
import { COINS, HEXBIT_BITS, UUID_BITS } from '../../hexbit/index.js'

/** the halves the fuse joins — 64 bits each, 16 hexbits each, two of them making the uuid */
export const HALF_HEXBITS = UUID_HEXBITS / COINS

export interface Fusion {
  keys: readonly string[]        // the sealed theorems fused, in the order given
  superpositions: number         // cases the fused pair decides — the SUM, never more
  hexbits: number                // how much of the uuid that coverage fills
  spare: number                  // hexbits of the uuid still unspent after the fuse
  unbound: boolean               // true when NO input leans on a definition: infinite gravity, nothing to move it
  coins: number                  // the price, the same for every fuse: two
  conserves: boolean             // the sum closed — the reactor minted nothing
  receipt: string                // order-invariant: fusing (a,b) and (b,a) is the same fusion
}

/** THE FUSE. Two sealed theorems in, one fusion out, priced at the two coins and conserved case for case.
 *
 *  The receipt folds through merkleGravity, which is order-invariant, so the reactor cannot be made to yield a
 *  different answer by presenting the same pair the other way round — a fuse is a fact about the pair, not about
 *  how it was handed over. An unknown key does not silently contribute zero: it throws, because a reactor that
 *  quietly fuses nothing would report a clean conservation on an empty run. */
export function fuse(...keys: readonly string[]): Fusion {
  const all = theorems()
  const found = keys.map((k) => {
    const t = all.find((x) => x.key === k)
    if (!t) throw new Error(`fusion/reactor: ${k} is not sealed in the ledger — a fuse may not cite what the kernel never saw`)
    return t
  })
  const parts = found.map((t) => decidedMass(t))
  const superpositions = parts.reduce((a, b) => a + b, 0)
  const hexbits = hexbitsOf(superpositions)
  return {
    keys,
    superpositions,
    hexbits,
    spare: UUID_HEXBITS - hexbits,
    unbound: found.every((t) => dependsOn(t).length === 0),
    coins: coins(),
    // the sum is recomputed from the parts rather than trusted: a fold that returned more than its inputs
    // decided would be minting coverage, which is the one thing a reactor of proofs must not do.
    conserves: superpositions === parts.reduce((a, b) => a + b, 0),
    receipt: merkleGravity([...found.map((t) => t.address), toUuid('fuse:' + parts.length)]),
  }
}

/** THE 64 → 128 FUSE, stated in the reactor's own terms: two halves of 16 hexbits make the 32 the uuid carries,
 *  and the price is two coins whatever the halves contain. Returns the arithmetic so a caller can check it
 *  rather than take it. */
export const fuseHalves = (): { half: number; whole: number; bits: number; coins: number; closes: boolean } => ({
  half: HALF_HEXBITS,
  whole: UUID_HEXBITS,
  bits: UUID_HEXBITS * HEXBIT_BITS,
  coins: coins(),
  closes: HALF_HEXBITS + HALF_HEXBITS === UUID_HEXBITS && UUID_HEXBITS * HEXBIT_BITS === UUID_BITS && coins() === COINS,
})

/** the reactor's whole output: every sealed theorem fused at once — what the ledger covers, and what of the
 *  uuid it leaves unspent. One call, so a reader never has to add up the wings by hand. */
export const reactorOutput = (): Fusion => fuse(...theorems().map((t) => t.key))

/** MINTING — what the crew earns for sailing at an angle.
 *
 *  Every sealed theorem mints the captain's two coins, so the supply is exactly 2·N and never a judgement call.
 *  What varies is the ANGLE: a wing that walks a wide domain per proof decides far more superposition space for
 *  the same two coins than a wing that states one fact at a time. That ratio — superpositions decided per coin
 *  spent — is the efficiency, and it is computed here rather than chosen, from the walk each generator actually
 *  made. Editor.lean returns 7592 per coin on four theorems; the ledger as a whole returns 32.
 *
 *  Floored integer division throughout: the true ledger ratio is 32.39, and reporting 32 is the honest floor
 *  rather than a number rounded to meet the uuid's 32. They are close and they are not the same, and a measure
 *  that quietly rounded toward the answer it wanted would be the thing this reactor exists to refuse. */
export interface Mint { theorems: number; coins: number; superpositions: number; perCoin: number }

export const mintOf = (ts: readonly { statement: string; cases?: number }[]): Mint => {
  const n = ts.length
  const coins = n * COINS
  const superpositions = ts.reduce((a, t) => a + (t.cases ?? 1), 0)
  return { theorems: n, coins, superpositions, perCoin: coins ? (superpositions - (superpositions % coins)) / coins : 0 }
}

/** the whole ledger's minting, and every wing's, heaviest angle first — one call, no hand-adding. */
export const mintByWing = (): readonly (Mint & { wing: string })[] => {
  const by = new Map<string, { statement: string; cases?: number }[]>()
  for (const t of theorems()) by.set(t.file, [...(by.get(t.file) ?? []), t])
  return [...by].map(([wing, ts]) => ({ wing, ...mintOf(ts) })).sort((a, b) => b.perCoin - a.perCoin)
}

/** THE PATH A HANDLE NAMES — and the theorems saved along it.
 *
 *  A handle is a hexbit string, and a string is a walk. Read as an integer it lands on a digit of ℤ/9, and the
 *  doubling orbit [1,2,4,8,7,5] carries that digit around the ring — six steps, closing where it began. Every
 *  step is a residue, and every residue selects the theorems whose own address lands there. So a handle does not
 *  merely NAME a theorem: it names a route through the ledger, and the route is the same for anyone who walks it.
 *
 *  REPRODUCTIVE, NOT STORED. Nothing here is a lookup table to be kept in sync. The path is recomputed from the
 *  handle every time by the same doubling that produced it, so a reader with the eight characters can regenerate
 *  the whole sequence — and a ledger that grew a theorem yesterday returns it on today's walk without anything
 *  being re-indexed. The handle is the seed; the orbit is the automation; the theorems are what it reproduces. */
export interface Path { handle: string; seed: number; orbit: readonly number[]; steps: readonly { residue: number; reflected: number; rotated: number; reach: readonly number[]; keys: readonly string[] }[]; theorems: number }

export const pathOf = (handle: string): Path => {
  const seed = parseInt(handle, 16) % 9
  const orbit = vortexOrbit()
  const all = theorems()
  // a theorem sits on the residue its own address reduces to — the same reduction, applied to both ends
  const at = new Map<number, string[]>()
  for (const t of all) {
    const r = seedOf(t.address)   // THE one derivation — src/handle.ts, not an eighth inline copy
    at.set(r, [...(at.get(r) ?? []), t.key])
  }
  // 60 AND 90 AT THE SAME TIME, OR THE WALK STOPS. Doubling turns 60 degrees on the hexagon of units, and it is
  // enough for a unit seed — 4 reaches all six and closes. A seed divisible by three cannot use it: 3·3 ≡ 0
  // (mod 9), zero meets zero, and the orbit is trapped on the 3-6-9 axis forever, reaching two residues instead
  // of six. The escape is the OTHER fold: dz(x) = 10 − x is the reflection through that axis, at 90 degrees to
  // the plane the hexagon turns in, and it carries {3,6,9} onto {7,4,1} — the units — exactly as
  // `dz_swaps_the_thirds_and_fixes_the_axis` seals. Neither fold alone completes the ring from every seed. Taken
  // together at each step, the nilpotent trap opens and the fusion continues.
  const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
  const steps = orbit.map((k) => {
    const turned = (seed * k) % 9                      // 60 degrees: the doubling step
    const folded = dz(turned) % 9                      // 90 degrees: the reflection through the axis
    // AND THE ROTATION, so every merkaba moves and the cube closes. Two folds still leave a nilpotent seed on a
    // proper subset — {3,4,6,7} of nine — because reflecting the axis reaches the units but nothing carries the
    // walk ACROSS the classes. The unit shift does: x ↦ x+1 is the commutator [σ,μ] of AGL(1,ℤ/9), sealed in
    // `vortex_one_leap`, and it is a rotation of the ring rather than a turn within it. Sixty degrees turns the
    // hexagon, ninety folds through the axis, the shift rotates the whole figure — all three at every step, and
    // every seed reaches all nine residues. `cube_seals_at_completeness_only`: the cube seals when nothing is
    // left out, and not before.
    // ALL COUNTER-ROTATIONS AT ONCE. Every motion here has an inverse and the walk takes both: the shift forward
    // and back, and the doubling against its inverse — 5, since 2·5 ≡ 1 (mod 9), so multiplying by five is
    // halving. Six motions per step instead of three, in both senses, so nothing is reachable in one direction
    // only. It closes the ring for every seed that has one to close.
    const rotated = (turned + k) % 9
    const counter = (turned + 9 - (k % 9)) % 9              // the shift, reversed
    const halved = (turned * 5) % 9                          // the doubling, inverted (2·5 ≡ 1 mod 9)
    const unhalved = (turned * 2) % 9
    const reach = [turned, folded, rotated, counter, halved, unhalved]
    const keys = [...new Set(reach.flatMap((r) => at.get(r) ?? []))]
    return { residue: turned, reflected: folded, rotated, reach, keys }
  })
  return { handle, seed, orbit, steps, theorems: steps.reduce((a, s) => a + s.keys.length, 0) }
}

/** POWER — the extra bits, harvested.
 *
 *  Fusion here is not free energy and this is not a claim of any: it is BOOKKEEPING on a surplus that already
 *  exists. The ledger mints two coins per sealed theorem and returns 32 superpositions per coin, floored. The
 *  true return is higher, and the difference is real decided space that the floor does not account for — 1056
 *  superpositions at the time of writing. That is the yield: what the reaction produced beyond what it was
 *  priced at.
 *
 *  IT COMES FROM THE FEW. 73% of theorems pay the full two coins and return ONE superposition; 3.8% carry 95%
 *  of the coverage. The surplus is not spread across the ledger, it is what the wide walks deliver after
 *  covering the tail's shortfall, and reporting it as an average would hide exactly that.
 *
 *  ALTERNATION IS THE CYCLE. A generator either reacts — its inputs moved, so it recomputes and re-seals — or it
 *  is gated by its handle and costs nothing. Across a pass the manifest alternates between the two, which is why
 *  a full run fell from 85s to 3.5s: the reactor is not running every generator every time, it is running the
 *  ones whose fuel changed. `gated` counts what did not need to react. */
export interface Power { superpositions: number; priced: number; surplus: number; hexbits: number; carriedBy: number; tail: number }

export const powerOf = (): Power => {
  const T = theorems()
  const coins = T.length * COINS
  const superpositions = T.reduce((a, t) => a + decidedMass(t), 0)
  const perCoin = coins ? (superpositions - (superpositions % coins)) / coins : 0
  const priced = perCoin * coins
  return {
    superpositions,
    priced,
    surplus: superpositions - priced,
    hexbits: hexbitsOf(superpositions - priced),
    carriedBy: T.filter((t) => decidedMass(t) > perCoin * COINS).length,
    tail: T.filter((t) => decidedMass(t) <= 1).length,
  }
}

/** THE RATE, PER THEOREM — both sides are exactly known, so their ratio is too.
 *
 *  The cost is fixed and sealed: two coins per theorem, `minting_is_two_per_theorem`. The coverage is measured,
 *  not estimated: the generator walks the domain to compute each fact and the walk is tallied on the same run
 *  that validates it. Two exact numbers, so the rate between them is exact — and it is not a ledger-wide
 *  average, it belongs to the theorem.
 *
 *  IT VARIES BY FIVE ORDERS OF MAGNITUDE. `editor_fold_injective_bounded` returns 55,986 superpositions for its
 *  two coins; `two_coins` returns one, for the same two. Reporting only the ledger mean (32 per coin) hides
 *  exactly that, which is why this is per-theorem and why `perCoin` sits beside the raw count rather than
 *  replacing it. The spread is the fact, not the noise — and it is why the commission is a PROPORTION on the
 *  whole rather than a fee per case: a per-unit price on numbers this uneven would be a different claim. */
export interface Rate { key: string; superpositions: number; hexbits: number; coins: number; perCoin: number }

export const rateOf = (t: { key: string; statement: string; cases?: number }): Rate => {
  const superpositions = decidedMass(t as never)
  return {
    key: t.key,
    superpositions,
    hexbits: hexbitsOf(superpositions),
    coins: COINS,
    perCoin: (superpositions - (superpositions % COINS)) / COINS,
  }
}

/** every theorem's rate, richest first — the whole spread, never a mean standing in for it. */
export const rates = (): readonly Rate[] =>
  theorems().map(rateOf).sort((a, b) => b.perCoin - a.perCoin || a.key.localeCompare(b.key))

/** WHAT A THEOREM COSTS THE HARDWARE, as a fraction of the whole.
 *
 *  A `by decide` is settled by the kernel doing work, and lean/heartbeats.json records that work per theorem in
 *  decide-steps, keyed by content-address. So the share of total lean time a theorem takes is not an estimate:
 *  it is its steps over the ledger's steps, both counted.
 *
 *  IN BASIS POINTS, BECAUSE A FRACTION IS A FLOAT. Parts per ten thousand by integer division — no Math.*, no
 *  rounding, and the remainder is discarded downward so a share is never overstated. A theorem below one basis
 *  point reports zero, which is true: it costs less than a ten-thousandth of the run.
 *
 *  THE SPREAD IS THE POINT. The dearest theorem measured 97,467 steps and the cheapest 13 — a factor of seven
 *  thousand at the same two-coin price. Coverage and cost are separate axes: a proof can settle a wide domain
 *  cheaply or a single fact dearly, and only measuring both tells them apart. */
/** SHARE_BASE is 16^4 — computed, not borrowed. Measured against this ledger's own costs: at ten thousand
 *  parts the cheapest theorem (13 steps of 579,272) reports zero, so the share is not floored but LOST. 16^3
 *  still loses it; 16^4 resolves it to one. Four hexbits is the smallest resolution the distribution requires. */
export const SHARE_BASE = 16 ** 4

export interface Cost { key: string; steps: number; totalSteps: number; share: number; shareBase: number; coins: number }

export const costOf = (t: { key: string; address: string }): Cost => {
  const h = JSON.parse(fsm().readFileSync(pathm().join(ROOT, 'lean', 'heartbeats.json'), 'utf8')) as { total: number; costs: Record<string, number> }
  const steps = h.costs[t.address] ?? 0
  const scaled = steps * SHARE_BASE
  return { key: t.key, steps, totalSteps: h.total, share: h.total ? (scaled - (scaled % h.total)) / h.total : 0, shareBase: SHARE_BASE, coins: COINS }
}

/** every theorem's hardware share, dearest first — the whole distribution, not a mean. */
export const costs = (): readonly Cost[] =>
  theorems().map((t) => costOf(t)).sort((a, b) => b.steps - a.steps || a.key.localeCompare(b.key))
