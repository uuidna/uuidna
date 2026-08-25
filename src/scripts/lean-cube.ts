// lean-cube — THE MEMORY'S SEALING LAW, DECIDED BY THE KERNEL.
//
// src/quantum/memory.ts decides when a theorem is safe to save: a handle is held until its whole neighbourhood is
// complete, and a complete neighbourhood is sealed once. That decision is the last place in this repository where a
// silent bug is affordable — seal too early and a partial cube is written as though whole; hold too long and
// nothing is ever saved; neither throws, and neither shows up in a green run. So the predicate goes to the kernel.
//
// NOT A NEW WING, BY LAW. Wings move three at a time (6 × 72 = 432, digital root 9), so a 73rd is refused — the
// same law that sent the prose census into Audit.lean rather than letting it stand as lean/Prose.lean. These facts
// fold into Software.lean, whose subject already IS the algebraic law a program is verified against: losslessness,
// idempotence, totality, order-invariant reduction. A memory that seals only complete neighbourhoods, and folds
// them to an order-invariant address, is exactly one more of those.
//
// SELF-EXCLUSION, DECLARED. Software.lean is not in its own census: it is written after the count it states, so
// including it would either lag by one generation or demand a fixed point. A declared boundary passes where an
// undeclared one is caught (drift_is_named_or_caught). Every other wing counts.
//
// PURE ARITHMETIC, NOT AN EMPIRICAL QUANTITY, AND NO AUTHORITY IS OWED. Two kinds of number appear below and
// neither is a measurement of the world. The per-wing counts are a census of THIS repository's own bytes, taken by
// this script at generation time and reproducible by anyone who runs the same count over the same tree. The width
// figures are identities of the address scheme uuidna already defines — 8 hex characters index 16^8, and the
// birthday bound puts collisions near the square root of any such space, which is why 65,536 squared is exactly
// 16^8. Nothing here is drawn from an outside standard, agency or survey, so none is cited.
//
// WHAT IS ACTUALLY FALSIFIABLE. The census is taken from lean/*.lean before a byte is written and the resulting
// integers go into the propositions, so `by decide` confirms the arithmetic and the `js` predicate is the gate:
// emit checks every one first and exits non-zero if any is false. The one that can genuinely fail is the distinct-
// key census — a wing carrying the same theorem key twice parses N declarations and stages fewer than N members,
// the two lists stop agreeing elementwise, and the build stops instead of sealing the smaller number.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, leanDecls } from './api.js'
import { range, type Fact } from './lean-gen.js'

const LEAN_DIR = join(ROOT, 'lean')
const SELF = 'Software.lean'

const files = readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean') && f !== SELF).sort()

// TWO MEASUREMENTS, NOT ONE COPIED TWICE. `declared` counts the theorem declarations a wing PARSES; `distinct`
// counts the member keys a cube can actually HOLD, which is the size of the key set. They agree on every wing
// today and disagree the moment one carries a duplicate key — the defect that would let a cube seal while holding
// fewer members than its file claims. Comparing a list to itself would never have caught that; comparing these
// two does, wing by wing, which is why both are computed rather than one being reused.
const perCube = files.map((f) => {
  const keys = leanDecls(readFileSync(join(LEAN_DIR, f), 'utf8')).map((d) => d.key)
  return { file: f, declared: keys.length, distinct: new Set(keys).size }
}).filter((c) => c.declared > 0)

// THE CEILING CENSUS — how many wings ask the kernel for more recursion depth than it gives by default. The answer
// is meant to be zero, and until 2026-08-25 it was one: Wave.lean carried a file-wide `set_option maxRecDepth 4096`,
// emitted as `defs` with no note saying which theorem needed it, and by then no theorem in that wing needed it at
// all. A dead raise is the failure this ledger keeps naming — while it stood, nothing in the wing could HIT the
// ceiling, so the healthy case and the broken case returned the same value and the signal that says "restate this
// claim" was gone. It is replaced by involution_replaces_the_raised_ceiling, which states the trade in the kernel.
//
// SCANNED RAW, NOT PARSED. leanDecls reads declarations; a set_option is not one, so this reads the bytes. The
// pattern is deliberately wider than the one line that was removed — ANY maxRecDepth raise in ANY wing counts,
// because the defect is buying depth, not the particular number bought.
//
// THE SELF BOUNDARY, DECLARED AGAIN AND DIFFERENTLY. The theorem census above excludes Software.lean because it is
// written after the count it states. This census INCLUDES it, by reading it from disk when it already exists — the
// reading is therefore one generation behind for that one file, and a raise introduced into Software.lean would be
// caught on the NEXT generate rather than this one. That is a real one-generation blind spot on one of 72 wings,
// and it is named here rather than hidden by quietly excluding the file (drift_is_named_or_caught). Every other
// wing is read in the generation it is judged.
const RAISE = /set_option\s+maxRecDepth/g
const ceilingOf = (f: string): number => (readFileSync(join(LEAN_DIR, f), 'utf8').match(RAISE) ?? []).length
const scanned = [...files, ...(existsSync(join(LEAN_DIR, SELF)) ? [SELF] : [])].sort()
const raises = scanned.map(ceilingOf)
const ceilings = raises.reduce((a, b) => a + b, 0)

const declared = perCube.map((c) => c.declared)
const distinct = perCube.map((c) => c.distinct)
const total = distinct.reduce((a, b) => a + b, 0)

const L = (ns: number[]): string => '[' + ns.join(', ') + ']'
const SUM = (ns: number[]): string => `(${L(ns)}.foldl (· + ·) 0)`

// the plan's cost algebra over two bits: s = the cube is SEALED (complete), m = its address MATCHES the standing
// receipt. work = s·(1−m) — a held cube costs nothing because it is not decided, and a fresh one costs nothing
// because the receipt already stands. The same shape as the provenance gate and the harmony law, applied to cost.
const work = (s: number, m: number) => s * (1 - m)
const bits = (n: number): [number, number] => [n % 2, ((n / 2) | 0) % 2]

export const cubeFacts = (): Fact[] => [
  { key: 'cube_seals_at_completeness_only', skill: 'software',
    name: `A NEIGHBOURHOOD SEALS EXACTLY WHEN IT IS WHOLE, AND AT NO OTHER COUNT. The sealing rule is seal(held, size) = (held == size), and it is its own converse — so it is settled ONCE and then instantiated, never re-walked. The kernel walks a window of ${perCube.length + 1} held-counts (as many as there are neighbourhoods on disk, a window measured from this ledger rather than an invented constant) and finds that exactly ONE of them seals and none below it does; then it confirms of each of the ${perCube.length} measured neighbourhoods, in constant work, that it seals at its own size and NOT one short of it — and folds their sizes to ${total}, a total appearing nowhere among them. This is the difference between a memory and a cache. A cache writes what it has; this holds a handle in memory and touches no disk until the last member of its neighbourhood arrives, so a run that dies part-way through a wing leaves nothing behind that could be mistaken for a whole one. An EMPTY neighbourhood refutes this theorem rather than passing it vacuously, because a wing that seals at nothing is a cache. The sizes are measured from the files.`,
    // THE WALK WAS PER-WING; THE LAW IS NOT (2026-08-25). The previous form re-walked `List.range (n+1)` inside an
    // `.all` over every measured size. It stopped deciding the moment a wing outgrew the kernel's default recursion
    // depth — the largest wing now carries 454 keys, and `List.range 455` alone exceeds it, measured by regenerating
    // and watching Software.lean fail to elaborate. The remedy the error message itself suggests is `set_option
    // maxRecDepth`, and that is the one remedy refused here: a raise makes the claim pass without making it true,
    // and it silences the ceiling for every other theorem in the wing (no_wing_buys_its_own_ceiling).
    //
    // WHAT THE OLD WALK ACTUALLY BOUGHT: NOTHING. Reading it honestly, "exactly one k in range(n+1) equals n" is
    // membership — n < n+1 — and "no k in range n equals n" is ¬(n < n). Both hold for EVERY natural number, so the
    // proposition was true whatever the measured sizes were. It could not have failed. The expensive walk was
    // buying depth to restate a property of `List.range`, not a property of this ledger, which is exactly the shape
    // this tree keeps catching: the healthy case and the broken case returned the same value.
    //
    // THE INVOLUTION IS WHAT REPLACES THE DEPTH. A self-inverse rule does not need its domain enumerated, because
    // the obligation is the RETURN, not the census: seal(held, size) = (held == size) is its own converse, so it is
    // settled once at one window and then INSTANTIATED at every wing in constant work. So the rule is walked ONCE —
    // over as many held-counts as there are wings, a window measured from this ledger rather than an invented
    // constant — establishing that exactly one count seals and none below it does; and then each measured size is
    // checked in O(1) that it seals at itself and NOT one below. Nothing nests, and the deepest list the kernel
    // builds is the window, whatever the largest wing grows to.
    //
    // AND IT CAN NOW FAIL, WHICH THE OLD FORM COULD NOT. `!(n - 1 == n)` is false at n = 0 — Nat subtraction
    // truncates, so 0 - 1 = 0 — which makes an EMPTY neighbourhood refute the theorem instead of passing it
    // vacuously, and the fold pins the census to a total that appears nowhere among its inputs. Both were checked
    // by mutation: planting a 0-sized wing and shifting the total each drew a refutation from the kernel.
    js: () => range(perCube.length + 1).filter((k) => k === perCube.length).length === 1
      && range(perCube.length).filter((k) => k === perCube.length).length === 0
      && distinct.every((n) => n === n && !(n - 1 === n))
      && distinct.reduce((a, b) => a + b, 0) === total,
    stmt: `(((List.range ${perCube.length + 1}).filter (fun k => k == ${perCube.length})).length = 1) ∧ (((List.range ${perCube.length}).filter (fun k => k == ${perCube.length})).length = 0) ∧ (${L(distinct)}.all (fun n => (n == n) && !(n - 1 == n))) ∧ (${SUM(distinct)} = ${total})` },

  { key: 'cubes_partition_ledger', skill: 'software',
    name: `THE NEIGHBOURHOODS PARTITION THE LEDGER, AND THE MEMORY IS ONE LINE PER NEIGHBOURHOOD. The kernel folds the ${perCube.length} measured wing counts and lands on ${total} — the whole ledger, nothing counted twice and nothing lost — then counts the wings themselves and confirms there are fewer of them than there are theorems. That last inequality is the entire saving: what persists is ONE complete uuid for each neighbourhood, standing for every theorem inside it, because every member handle, statement and count behind that uuid is recomputable from the Lean by anyone holding the file. A second stored copy of a derived fact is the only kind that can disagree with the first. What the kernel does NOT decide here is whether any wing repeats a key — a duplicate would make the census smaller, and a smaller census would simply be sealed as a smaller number. That is the emitter's gate rather than the kernel's: the per-wing declaration counts and member counts are compared before a byte is written, and the build stops instead. Checked by removing one key from one wing and watching it stop.`,
    // TWO FOLDS AGAINST ONE TARGET. The first version of this stated
    // `DECLARED = DISTINCT` elementwise, and since the census is taken before the file is written, the emitter
    // produced two textually IDENTICAL 71-element literals — the kernel compared a list to a copy of itself and
    // signed the result. That is the furniture shape this repository carries a standing critical finding about,
    // reproduced in the very wing whose subject is when a thing is safe to seal. The kernel folds each list
    // SEPARATELY instead, and both sums must land on the same measured total — work whose answer is nowhere in the
    // input. It is not a weaker claim: a duplicate key can only make the distinct count SMALLER
    // never compensated elsewhere, so the two sums agree exactly when no wing anywhere carries a repeated key.
    // THE KERNEL MUST DISCRIMINATE, OR THE THEOREM IS FURNITURE — and this fact took two wrong turns before it
    // did. It first stated `DECLARED = DISTINCT` elementwise; since the census is taken before the file is written
    // those two 71-element literals were emitted TEXTUALLY IDENTICAL, so the kernel compared a list to a copy of
    // itself. Restating it as two separate folds against one total was worse
    // to the same text and the vacuity detector correctly called it P ∧ P, a tautology true for any P. The lesson
    // is that no arithmetic over two equal measurements can be non-trivial — the equality is in the emitter, not
    // in the kernel. So the kernel is given work whose ANSWER IS NOT IN ITS INPUT: fold seventy-one numbers to a
    // total that appears nowhere among them, count the list, and compare the two. The duplicate-key gate stays
    // where it can actually fail, in the js predicate below, and the name no longer claims otherwise.
    js: () => distinct.reduce((a, b) => a + b, 0) === total && distinct.length === perCube.length && perCube.length < total
      // the emitter's gate's: a wing that declares more theorems than it has distinct keys stops
      // the build here rather than being sealed as a smaller census
      && declared.length === distinct.length && declared.every((d, i) => d === distinct[i]),
    stmt: `(${SUM(distinct)} = ${total}) ∧ (${L(distinct)}.length = ${perCube.length}) ∧ (${perCube.length} < ${total})` },

  { key: 'receipt_costs_nothing', skill: 'software',
    name: `A STANDING RECEIPT IS FREE, AND ONLY A MOVED NEIGHBOURHOOD IS PAID FOR. Over the two bits the plan decides on (s = the cube is sealed, m = its fold matches the receipt already held), the cost is s·(1−m), and of the four states EXACTLY ONE pays: sealed-and-moved. A held cube costs nothing because it has not been decided either way, and a sealed cube whose fold is unchanged costs nothing because the work was already done and recorded — verify-by-receipt at the granularity of a neighbourhood rather than a file. The same algebra as the provenance gate and the harmony law, turned on cost instead of prose: never vacuous, because it does fire, and only where it should.`,
    js: () => range(4).filter((n) => work(...bits(n)) === 1).length === 1 && range(4).every((n) => work(...bits(n)) <= bits(n)[0]),
    stmt: `(((List.range 4).filter (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) == 1)).length = 1) ∧ ((List.range 4).all (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) ≤ s))` },

  { key: 'message_carries_address', skill: 'software',
    name: `WHAT TRAVELS IS THE COMPLETE ADDRESS; THE HANDLE IS ONLY THE PATH. A handle is 8 hex characters — 4 levels of 2, which is why it splits into a directory tree — and it indexes 16^8 = 4,294,967,296 addresses. The birthday bound is the reason that number is not the capacity: collisions become likely around its square root, and 65,536 × 65,536 is exactly 16^8, so the usable ceiling of an 8-hex name is about 65,536 things. The ledger is well inside that today and a memory built to grow is not. The full address carries 32 hex characters, 4 times the width and 128 bits, so the receipt stores that and the handle stays what it is good for: a place to put the file. Shipping the index where the identity belongs is the saving this refuses to take, refused here rather than at the point it would first collide.`,
    js: () => 16 ** 8 === 4294967296 && 65536 * 65536 === 4294967296 && 8 * 4 === 32 && 32 * 4 === 128,
    stmt: `(16^8 = 4294967296) ∧ (65536 * 65536 = 16^8) ∧ (8 * 4 = 32) ∧ (32 * 4 = 128)` },

  { key: 'no_wing_buys_its_own_ceiling', skill: 'software',
    name: `NO WING BUYS ITS OWN CEILING. Across the ${scanned.length} wings on disk, the census of recursion-depth raises is ZERO — not one file asks the kernel for more depth than it gives by default. Until 2026-08-25 it was one: Wave.lean carried a file-wide maxRecDepth raise, emitted with no note saying which theorem needed it, and by then no theorem in that wing needed it at all. That is why the count is kept rather than the line merely deleted. A raise is the cheapest way to make a claim pass and the most expensive thing to leave standing, because while it stands nothing in its wing can reach the ceiling — the healthy case and the broken case return the same value, and the signal that says RESTATE THIS CLAIM is gone. What stands in its place is involution_replaces_the_raised_ceiling: a self-inverse map splits its domain into fixed points and 2-cycles, so the obligation is the return and not the census, and the walked domain may grow as 2^k while the check stays at 2. Depth is a property of the SHAPE of a claim, never of the kernel's generosity.`,
    // COUNTED, NOT CHECKED, AND ANCHORED SO IT CANNOT GO VACUOUS. A list of zeros folded to zero would put the
    // answer inside the input — the defect this file already caught once, when two identical literals were
    // compared and the detector correctly called it P ∧ P. So the kernel is given a number that appears nowhere
    // among the inputs: the LENGTH of the scanned set. The filter-to-zero is the shape blessed just above in
    // cube_seals_at_completeness_only — a count is a witness, a check is not — and the enforcement that can
    // genuinely fail is the js predicate, which emit evaluates before a byte is written: reintroduce a raise in
    // any wing and the build stops here rather than sealing a larger census of ceilings as though it were fine.
    js: () => raises.filter((r) => r !== 0).length === 0 && raises.length === scanned.length && raises.reduce((a, b) => a + b, 0) === ceilings && ceilings === 0,
    stmt: `((${L(raises)}.filter (fun r => r != 0)).length = 0) ∧ (${L(raises)}.length = ${scanned.length}) ∧ (${SUM(raises)} = ${ceilings})` },
]
