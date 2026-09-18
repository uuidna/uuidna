#!/usr/bin/env node
// Automate the Lean layer for THE LINKS — one theorem for each LONELY theorem the ledger seals.
//
// A LONELY theorem is one that connect-lonely names: the ledger seals it and nothing else in the ledger relates
// to it. Loneliness is not a defect in the proof; it is a missing edge. Each theorem in this wing states, in one
// decidable sentence, a relation between a lonely theorem's OWN objects and a DIFFERENT sealed theorem's objects,
// and each was tested by PERTURBING either side, where the theorem must fail. That perturbation is what separates
// a link from a restatement, and each fact's sentence records which perturbations refused.
//
// WHY A NEW SKILL RATHER THAN crosslink. The crosslink skill is Crosslink.lean's subject: what the HANDLE STORE's
// addressing admits in the way of relations between handle folders — a statement about names and the graph they
// could carry. This wing relates SEALED THEOREMS to each other, which is a different object entirely; folding it
// into crosslink would make one skill answer for two subjects and leave a reader asking for the handle store's
// link structure holding eleven theorems about affine rows, Alpine origins and generator manifests. Skills are
// derived from the wings (src/skills.ts serves the axis as a dimension, never a hand-kept list), so a new skill
// named links is served the day this wing lands, with no list to edit.
//
// SCOPE: each theorem is an arithmetic relation between two sealed statements' objects. It confers nothing on
// either side beyond what the two already seal, and where two censuses were taken at different moments the fact
// says so and states only the arithmetic between them.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { emit, range, ROOT } from './lean-gen.js'
import { DIMENSIONS } from '../dimensions.js'

const idiv = (a: number, b: number): number => (a - (a % b)) / b
const srcText = (p: string): string => readFileSync(join(ROOT, p), 'utf8')
const SL = (xs: readonly string[]): string => '[' + xs.map((s) => JSON.stringify(s)).join(', ') + ']'
const eqList = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i])

// ── THE LISTS ARE WALKED, NEVER TYPED ───────────────────────────────────────────────────────────────────────
// Two of these theorems decide over the generator manifest, the scripts reconcile runs directly, and the dormant
// census. A pasted copy of any of the three is a snapshot that rots the day the list moves — and the arithmetic
// these facts state is arithmetic ABOUT the list, so a stale copy would seal a position that no longer exists.
// Each is read from the one file that declares it.
const GENERATE_MANIFEST: string[] = [...srcText('src/scripts/generate.ts').matchAll(/\{\s*file:\s*'([^']+)'/g)].map((m) => m[1]!)
const RECONCILE_DIRECT: string[] = [...new Set(srcText('src/scripts/reconcile.ts').split('\n')
  .filter((l) => /^\s*run\(/.test(l))
  .flatMap((l) => [...l.matchAll(/dist\/scripts\/([a-z0-9-]+\.js)/g)].map((m) => m[1]!)))]
const DORMANT_SCRIPTS: string[] = (JSON.parse(srcText('lean/dormant-scripts.json')) as { scripts: string[] }).scripts
const RECONCILE_RUNS: string[] = [...RECONCILE_DIRECT, ...GENERATE_MANIFEST]
// the Lean idxOf, mirrored by a fold rather than by indexOf, so the two computations are not the same one twice
const idxFold = (s: string, l: readonly string[]): number => l.reduce<number>((n, x, i) => (n === l.length && x === s ? i : n), l.length)

const NAMED_JS = ['gen-prose-evidence.js', 'gen-handles.js', 'gen-captain-claims-complete.js']
const NAMED_TS = ['gen-prose-evidence.ts', 'gen-handles.ts', 'gen-captain-claims-complete.ts']
const REFUTERS_JS = NAMED_JS.map((g) => (RECONCILE_RUNS.includes(g) ? 1 : 0))
const REFUTERS_TS = NAMED_TS.map((g) => (DORMANT_SCRIPTS.includes(g) ? 0 : 1))
const flagAll = (l: readonly number[]): number => 1 - l.reduce((acc, x) => acc * (1 - x), 1)

// the sealed literals of truncated_run_counted_47: 47 generators listed, the runner stopped at 6, 41 skipped
const LISTED = 47
const CUT = 6
const SLOT = idxFold('gen-prose-evidence.js', GENERATE_MANIFEST)
const SLOT_README = idxFold('gen-readme.js', GENERATE_MANIFEST)
const SLOT_LLM = idxFold('gen-llm.js', GENERATE_MANIFEST)

// ── THE SEQUENCE ROWS, mirrored from Sequence.lean's own definitions ─────────────────────────────────────────
const UNITS9 = [1, 2, 4, 5, 7, 8]
const R9 = range(9)                        // List.range 9 — the nine residues, the shift index set
const R1TO9 = range(9).map((i) => i + 1)   // List.range' 1 9 — the nine digits as the sequence wing writes them
const dzJs = (d: number): number => (d === 0 ? 0 : 10 - d)
const dblJs = (d: number): number => (2 * d) % 9
const TOUR_TAIL = [1, 2, 4, 8, 7, 5, 3, 6, 9]
const renJs = (v: number): number => (v === 0 ? 9 : v)
const arowJs = (a: number, b: number): number[] => [0, ...TOUR_TAIL.map((d) => renJs((a * d + b) % 9))]
const risesJs = (p: number, n: number): boolean => n < p || ((p === 3 || p === 6) && n % 9 === (p + 3) % 9)
const strokesJs = (r: readonly number[]): boolean[] => r.slice(0, r.length - 1).map((p, i) => risesJs(p, r[i + 1]!))
const risingJs = (r: readonly number[]): number => strokesJs(r).filter((s) => s).length
const fallingJs = (r: readonly number[]): number => strokesJs(r).filter((s) => !s).length
const budgetJs = (r: readonly number[]): [number, number] => [fallingJs(r), risingJs(r)]
const famTallyJs = (p: (a: number, b: number) => boolean): number =>
  UNITS9.map((a) => R9.filter((b) => p(a, b)).length).reduce((x, y) => x + y, 0)
const isUnit9 = (a: number): boolean => R9.some((e) => (a * e) % 9 === 1)
const AGL_ORDER = R9.filter(isUnit9).length * 9

// ── THE AURA WITNESS PAIR, decomposed the way the hue map decomposes it ──────────────────────────────────────
const AURA_A: number = 4316331   // the first witness colour the lonely theorem carries, #41dcab
const AURA_B: number = 3198876   // its pair, #30cf9c — distinct as integers, identical as hue degrees
const hueGreenBandJs = (c: number): number => {
  const r = idiv(c, 65536)
  const g = idiv(c, 256) % 256
  const b = c % 256
  return 120 + idiv(2 * (60 * (b - r)) + (g - r), 2 * (g - r))
}

const DEFS = `/-- the six units of ℤ/9, the index set the affine family is walked over -/
def units9 : List Nat := [1, 2, 4, 5, 7, 8]

/-- the division-by-zero reflection dz(x) = 10 − x, fixed at 0 -/
def dz (d : Nat) : Nat := if d == 0 then 0 else 10 - d

/-- the doubling map of the vortex, x ↦ 2x mod 9 -/
def dbl (d : Nat) : Nat := (2 * d) % 9

/-- the digit tour, without its leading zero -/
def tourTail : List Nat := [1, 2, 4, 8, 7, 5, 3, 6, 9]

/-- the ℤ/9 renaming that writes the zero residue as nine -/
def ren (v : Nat) : Nat := if v == 0 then 9 else v

/-- one affine row x ↦ a·x + b of ℤ/9, written over the tour -/
def arow (a b : Nat) : List Nat := 0 :: tourTail.map (fun d => ren ((a * d + b) % 9))

/-- a stroke rises when the next digit is lower, or on the two ±3 exceptions -/
def rises (p n : Nat) : Bool := (n < p) || ((p == 3 || p == 6) && n % 9 == (p + 3) % 9)

def strokesOf (r : List Nat) : List Bool := List.zipWith rises r r.tail
def risingOf (r : List Nat) : Nat := ((strokesOf r).filter (fun s => s)).length
def fallingOf (r : List Nat) : Nat := ((strokesOf r).filter (fun s => !s)).length

/-- the stroke budget of a row: its falling strokes and its rising ones -/
def budget (r : List Nat) : Nat × Nat := (fallingOf r, risingOf r)

/-- how many of the 54 affine rows satisfy a predicate on (a, b) -/
def famTally (p : Nat -> Nat -> Bool) : Nat :=
  (units9.map (fun a => ((List.range 9).filter (fun b => p a b)).length)).foldl (fun x y => x + y) 0

/-- the affine group order, computed exactly as agl_order_54 computes it: the units, times the nine shifts -/
def aglOrder : Nat := ((List.range 9).filter (fun a => (List.range 9).any (fun e => a * e % 9 == 1))).length * 9

/-- hue in degrees of a 24-bit colour whose channels satisfy r < b < g (the green band):
    120 + round(60 · (b − r) / (g − r)), rounding by (2n + d) / (2d) -/
def hueGreenBand (c : Nat) : Nat :=
  let r := c / 65536
  let g := c / 256 % 256
  let b := c % 256
  120 + (2 * (60 * (b - r)) + (g - r)) / (2 * (g - r))

/-- GENERATORS (src/scripts/generate.ts): the file of every entry, in manifest order, which is the list
    generate.js runs. Walked from that file, never typed. -/
def generateManifest : List String :=
  ${SL(GENERATE_MANIFEST)}

/-- Every dist script src/scripts/reconcile.ts runs directly, in the order its run() calls name them. -/
def reconcileDirect : List String :=
  ${SL(RECONCILE_DIRECT)}

/-- What reconcile runs: its direct scripts and then the whole manifest. -/
def reconcileRuns : List String := reconcileDirect ++ generateManifest

/-- Position of a name in a list of names (its length if absent). -/
def idxOf (s : String) : List String → Nat
  | [] => 0
  | x :: xs => if x == s then 0 else 1 + idxOf s xs

/-- The generators lead b13fd37a names, as generate.ts spells them. -/
def namedGeneratorsJs : List String := ${SL(NAMED_JS)}

/-- The same generators as lean/dormant-scripts.json spells them. -/
def namedGeneratorsTs : List String := ${SL(NAMED_TS)}

/-- lean/dormant-scripts.json, scripts — built and reachable, run by nothing. -/
def dormantScripts : List String :=
  ${SL(DORMANT_SCRIPTS)}

/-- One refuter per generator of the lead's FIRST conjunct: it fires (1) when reconcile does run it. -/
def refutersJs : List Nat := namedGeneratorsJs.map (fun g => if reconcileRuns.contains g then 1 else 0)

/-- One refuter per generator of the lead's SECOND conjunct: it fires (1) when the name is NOT dormant. -/
def refutersTs : List Nat := namedGeneratorsTs.map (fun g => if dormantScripts.contains g then 0 else 1)

/-- flag_is_any_refutation's rule, widened to a panel: flag = 1 − ∏(1 − aᵢ), the OR. -/
def flagAll (l : List Nat) : Nat := 1 - (l.foldl (fun acc x => acc * (1 - x)) 1)

/-- DIMENSIONS (src/dimensions.ts): the seven locale rays. -/
def dimensions : List String := ${SL([...DIMENSIONS])}

/-- PROJECTED (src/grid.ts): DIMENSIONS.slice(1), the identity ray removed. -/
def projected : List String := dimensions.drop 1

/-- The pair grid: every ordered pair of distinct dimensions, n × (n − 1). -/
def pairGrid : Nat := dimensions.length * (dimensions.length - 1)

/-- The full grid at a wing count: projected rays × wings. -/
def fullGrid (wings : Nat) : Nat := projected.length * wings

/-- The lead's own wing count. -/
def historicalWings : Nat := 72

-- @skill: links
/-- THE BOUNDED SEARCH FOR NON-DIVISIBILITY, restated from Involutione92de628.lean so the two facts that use it
    share one copy. It is stated here and not inside a fact because a proof written twice is a proof that drifts
    once. The kernel's own decision procedure for the divides relation borrows propext (measured: every by-decide
    proof of a non-divisibility depends on it), and no theorem in this tree may; this universal decides the same
    question from the bound alone and depends on no axiom at all. -/
theorem not_dvd_of_bound : ∀ d n : Nat, (∀ j, j < n / d + 1 → d * j ≠ n) → ¬ d * (n / d + 1) ≤ n → ¬ d ∣ n := by
  intro d n hsmall hover ⟨k, hk⟩
  cases Nat.lt_or_ge k (n / d + 1) with
  | inl hlt => exact hsmall k hlt hk.symm
  | inr hge =>
    have h1 : d * (n / d + 1) ≤ d * k := Nat.mul_le_mul_left d hge
    exact hover (hk ▸ h1)`

const FACTS = [
  { key: 'the_untested_hundred_pay_a_third_of_the_wire',
    name: 'THE UNTESTED HUNDRED PAY MORE THAN A THIRD OF THE WIRE. Thirteen exact facts decided together over the two censuses of ONE catalogue of MCP tools: 144 + 100 = 244 tools counted by coverage, 244 + 14 = 258 counted by the wire, and every byte figure computed at the sealed mean rate of 32183 hundredths of a byte a tool.',
    why: 'The lonely theorem a_new_tool_pays_at_most_the_mean_wire_cost prices ONE arrival against a rate: the wire ratchet seals 32183 hundredths of a byte per tool, so 258 tools may weigh 83032 bytes, the other 257 weigh 82616, and the newcomer whole allowance is the 416-byte difference — it weighs 373, and its 460-byte first draft was refused. The sealed theorem mcp_tool_coverage_partition_244 counts the SAME catalogue by a different instrument: every MCP tool is either directly exercised by a test that names it (144) or covered only by an aggregate fold (100), 244 in all, the debt down from 119. THE LINK prices the coverage partition at the wire rate: the 144 exercised tools cost 46343 bytes of the listing, the 100 unexercised cost 32183, the two censused groups leave 4506 bytes, and the 14 tools that arrived after the partition cost 4505 at the mean — so the catalogue two censuses close on each other, and more than a third of every agent tool context is tools no test names directly. PERTURBED AND REFUSED: the mean rate 32183 to 32184, the tool count 258 to 259, the arriving row 373 to its refused 460 draft, the exercised tools 144 to 145, the prior debt 119 to 99 — each failed to decide. CONTROL, recorded as slack: 373 to 374 still decides, because that conjunct is an inequality with 43 bytes of headroom. SCOPE: the pricing is at the sealed MEAN rate, not each tool measured bytes, and the two readings were taken at different moments; the link states only the arithmetic between them.',
    js: () => 144 + 100 === 244 && 100 < 119 && 244 + 14 === 258
      && idiv(32183 * 258, 100) === 83032 && idiv(32183 * 144, 100) === 46343 && idiv(32183 * 100, 100) === 32183
      && 32183 * 3 > 83032 && 46343 + 32183 < 83032
      && 83032 - 46343 - 32183 === 4506 && idiv(32183 * 14, 100) === 4505 && 4505 < 4506
      && (82616 + 373) * 100 <= 32183 * 258 && (82616 + 460) * 100 > 32183 * 258,
    lean: 'theorem the_untested_hundred_pay_a_third_of_the_wire : (144 + 100 = 244) ∧ (100 < 119) ∧ (244 + 14 = 258) ∧ (32183 * 258 / 100 = 83032) ∧ (32183 * 144 / 100 = 46343) ∧ (32183 * 100 / 100 = 32183) ∧ (32183 * 3 > 83032) ∧ (46343 + 32183 < 83032) ∧ (83032 - 46343 - 32183 = 4506) ∧ (32183 * 14 / 100 = 4505) ∧ (4505 < 4506) ∧ ((82616 + 373) * 100 ≤ 32183 * 258) ∧ ((82616 + 460) * 100 > 32183 * 258) := by decide' },

  { key: 'the_budget_census_exhausts_the_affine_group',
    name: 'THE BUDGET CENSUS EXHAUSTS THE AFFINE GROUP, over all 54 affine rows of ℤ/9 and every one of the nine digits. Three budget classes of 18, 30 and 6 rows, a fourth class of exactly 0, and both totals equal to the group order recomputed from the unit predicate.',
    why: 'The lonely theorem budget_census_2d552f1f is a census of stroke budgets over the 54 affine rows x to a·x + b of ℤ/9: budget (4,5) on 18 rows, (5,4) on 30, (6,3) on 6, the mirror dz keeping the budget on 30 of them, and row (1,3) the first whose reflection moves it. The sealed theorem agl_order_54 says AGL(1,ℤ/9) has units times nine, 54 elements, and partition_six_three says the nine digits split 6 units and 3 non-units — the very index set the census walks. THE LINK asserts the census is COMPLETE against that independently computed order: the three budget classes have no fourth (the tally of rows outside all three is 0), their counts 18 + 30 + 6 equal the group order recomputed here from the unit predicate rather than quoted, and the 30 rows the mirror fixes plus the 24 it moves are that same order. Neither side is the other restatement: the left is a tally over rows, the right is the filter-and-multiply that agl_order_54 seals. PERTURBED AND REFUSED: the first census class 18 to 19 rows at budget (4,5); the shift factor of the group order 9 to 8 — each failed to decide.',
    js: () => famTallyJs((a, b) => eqList(budgetJs(arowJs(a, b)), [4, 5])) === 18
      && famTallyJs((a, b) => eqList(budgetJs(arowJs(a, b)), [5, 4])) === 30
      && famTallyJs((a, b) => eqList(budgetJs(arowJs(a, b)), [6, 3])) === 6
      && famTallyJs((a, b) => !(eqList(budgetJs(arowJs(a, b)), [4, 5]) || eqList(budgetJs(arowJs(a, b)), [5, 4]) || eqList(budgetJs(arowJs(a, b)), [6, 3]))) === 0
      && 18 + 30 + 6 === AGL_ORDER
      && famTallyJs((a, b) => eqList(budgetJs(arowJs(a, b).map(dzJs)), budgetJs(arowJs(a, b)))) === 30
      && 30 + 24 === AGL_ORDER
      && R1TO9.filter(isUnit9).length === 6 && R1TO9.filter((a) => !isUnit9(a)).length === 3,
    lean: 'theorem the_budget_census_exhausts_the_affine_group : famTally (fun a b => budget (arow a b) == (4, 5)) = 18 ∧ famTally (fun a b => budget (arow a b) == (5, 4)) = 30 ∧ famTally (fun a b => budget (arow a b) == (6, 3)) = 6 ∧ famTally (fun a b => !((budget (arow a b) == (4, 5)) || (budget (arow a b) == (5, 4)) || (budget (arow a b) == (6, 3)))) = 0 ∧ 18 + 30 + 6 = aglOrder ∧ famTally (fun a b => budget ((arow a b).map dz) == budget (arow a b)) = 30 ∧ 30 + 24 = aglOrder ∧ ((List.range\' 1 9).filter (fun a => (List.range 9).any (fun e => a * e % 9 == 1))).length = 6 ∧ ((List.range\' 1 9).filter (fun a => !(List.range 9).any (fun e => a * e % 9 == 1))).length = 3 := by decide' },

  { key: 'the_mirror_is_a_member_of_the_family_whose_budget_it_moves',
    name: 'THE MIRROR IS A MEMBER OF THE FAMILY WHOSE BUDGET IT MOVES, checked on every one of the 54 affine rows and on all nine digits: the mirror carries each row to another row of the same family, and yet moves the stroke budget on 24 of the 54, first at row (1,3).',
    why: 'The lonely theorem involution_2d552f1f is a negation: the kernel refutes lead 2d552f1f, so the mirror dz(x) = 10 − x does NOT keep the stroke budget on every one of the 54 affine rows. The sealed theorem mirror_congruence says that same mirror IS an affine map of ℤ/9 — 10 − d is congruent to 8·d + 1 — and 8 is a unit, so by agl_order_54 the mirror is itself one of the 54 maps the lead quantified over. THE LINK puts the two together and computes the consequence: because the mirror is a member of the family it carries every row to another row of the family, checked on all 54, and yet the budget is not carried with it, moving on 24 of the 54 rows, first at (1,3). So the refutation is not the mirror leaving the family or failing to be an involution; it is that the stroke budget, which reads ORDER through rises, is not a class function of a group the mirror belongs to. PERTURBED AND REFUSED: the refutation witness flipped from false to true; the count of moved rows 24 to 23; the mirror affine form 8·d + 1 to 8·d + 2; the row image the congruence forces, a to 9 − a changed to a to 8 − a — each failed to decide.',
    js: () => R1TO9.every((d) => (10 - d) % 9 === (8 * d + 1) % 9)
      && UNITS9.includes(8) && R9.some((e) => (8 * e) % 9 === 1)
      && UNITS9.every((a) => R9.every((b) => eqList(arowJs(a, b).map(dzJs), arowJs((9 - a) % 9, (10 - b) % 9))))
      && !eqList(budgetJs(arowJs(1, 3).map(dzJs)), budgetJs(arowJs(1, 3)))
      && famTallyJs((a, b) => !eqList(budgetJs(arowJs(a, b).map(dzJs)), budgetJs(arowJs(a, b)))) === 24,
    lean: 'theorem the_mirror_is_a_member_of_the_family_whose_budget_it_moves : ((List.range\' 1 9).all (fun d => (10 - d) % 9 == (8 * d + 1) % 9) = true) ∧ (units9.contains 8 = true) ∧ ((List.range 9).any (fun e => 8 * e % 9 == 1) = true) ∧ (units9.all (fun a => (List.range 9).all (fun b => ((arow a b).map dz) == arow ((9 - a) % 9) ((10 - b) % 9))) = true) ∧ (budget ((arow 1 3).map dz) == budget (arow 1 3)) = false ∧ famTally (fun a b => !(budget ((arow a b).map dz) == budget (arow a b))) = 24 := by decide' },

  { key: 'the_aura_pair_the_wheel_cannot_separate',
    name: 'THE AURA PAIR THE WHEEL CANNOT SEPARATE: seventeen facts about the two witness colours the lonely theorem carries, whose three channels differ and whose single hue degree is the same 161 for both.',
    why: 'The lonely theorem aura_alphabet_is_pairwise_distinct decides that the aura surface 378 colours (9 residues × 7 rays × 6 waves), sorted and split into 6 chunks of 63, are pairwise distinct as 24-bit integers, and it carries one witness pair in its last conjunct. The sealed theorem alphabet_exceeds_wheel seals the pigeonhole that predicts why that pair had to be carried: 9·7·6 = 378 states against a 360-degree hue wheel, so hue alone cannot name every state; alphabet_digital_root_is_nine seals that factorisation and true_colour_is_24_bit seals the space the alphabet lives in, 2^24 = 16777216. THE LINK computes BOTH sides of that prediction on the lonely theorem own numbers: it decomposes the two witness colours into their 24-bit channels (65, 220, 171 and 48, 207, 156), computes each hue in the green band as 120 + round(60·(b − r)/(g − r)) and gets 161 for BOTH, so the hue map is witnessed non-injective on the very pair the lonely theorem certifies distinct — the abstract pigeonhole made concrete — while both colours still fit under 2^24, which is why three channels can separate what one cannot. PERTURBED AND REFUSED: one digit of the witness colour, 4316331 to 4316431 at every occurrence; the sealed factorisation 9·7·6 to 9·7·5 in both conjuncts — each failed to decide.',
    js: () => idiv(AURA_A, 65536) === 65 && idiv(AURA_A, 256) % 256 === 220 && AURA_A % 256 === 171
      && idiv(AURA_B, 65536) === 48 && idiv(AURA_B, 256) % 256 === 207 && AURA_B % 256 === 156
      && AURA_A !== AURA_B
      && hueGreenBandJs(AURA_A) === 161 && hueGreenBandJs(AURA_B) === 161
      && hueGreenBandJs(AURA_A) === hueGreenBandJs(AURA_B)
      && 161 < 360 && 360 < 9 * 7 * 6 && 9 * 7 * 6 === 378
      && AURA_A < (1 << 24) && AURA_B < (1 << 24) && (1 << 24) === 16777216 && 9 * 7 * 6 < (1 << 24),
    lean: 'theorem the_aura_pair_the_wheel_cannot_separate : (4316331 / 65536 = 65) ∧ (4316331 / 256 % 256 = 220) ∧ (4316331 % 256 = 171) ∧ (3198876 / 65536 = 48) ∧ (3198876 / 256 % 256 = 207) ∧ (3198876 % 256 = 156) ∧ (4316331 ≠ 3198876) ∧ (hueGreenBand 4316331 = 161) ∧ (hueGreenBand 3198876 = 161) ∧ (hueGreenBand 4316331 = hueGreenBand 3198876) ∧ (161 < 360) ∧ (360 < 9 * 7 * 6) ∧ (9 * 7 * 6 = 378) ∧ (4316331 < 2 ^ 24) ∧ (3198876 < 2 ^ 24) ∧ (2 ^ 24 = 16777216) ∧ (9 * 7 * 6 < 2 ^ 24) := by decide' },

  { key: 'the_barren_claim_fails_exactly_at_the_dz_fixed_points',
    name: 'THE BARREN CLAIM FAILS EXACTLY AT THE TWO dz FIXED POINTS. Over all ten seeds 0 to 9: the seeds where the refuted lead two-state claim fails are exactly [0, 5], which is exactly the fixed-point set of dz, and exactly one of the two, 0, is fixed by both maps.',
    why: 'The lonely theorem involution_ef58b583 is the kernel refutation of lead ef58b583 — the lead claimed, among other things, that dz (d to 10 − d, dz 0 = 0) reaches exactly two states from any seed. The proof kills the FIRST conjunct, and the wing own comment names only seed 0 as the reason. The ledger already seals, in a different wing, exactly WHERE that conjunct fails: dz_fixed_points decides that the seeds dz fixes are [0, 5], the floor and the heart. THE LINK computes both: the set of seeds at which the two-state claim fails is ALSO [0, 5], so the refutation witness set is precisely dz fixed-point set, and it is two seeds, not the one the comment names. It then separates them with the sealed phase facts: zero_closes_in_phase (dz 0 = 0 and dbl 0 = 0) makes 0 the only seed BOTH maps fix, while five_returns_out_of_phase (dz 5 = 5, dbl 5 = 1) shows 5 is fixed by the involution alone, which is the lead own doctrine that an involution alone is barren; and dz_loses_nothing (image 10) against doubling_collapses_nine (image 9) is maps_differ_in_reach. PERTURBED AND REFUSED: the lead own reflection dz d = 10 − d changed to 8 − d; the sealed image size of doubling 9 changed to 10 — each failed to decide.',
    js: () => {
      const R10 = range(10)
      const dedup = (l: readonly number[]): number[] => l.filter((x, i) => l.indexOf(x) === i)
      return eqList(R10.filter((s) => dedup([s, dzJs(s)]).length !== 2), [0, 5])
        && eqList(R10.filter((s) => dzJs(s) === s), [0, 5])
        && eqList(R10.filter((s) => dzJs(s) === s && dblJs(s) === s), [0])
        && dzJs(0) === 0 && dblJs(0) === 0 && dzJs(5) === 5 && dblJs(5) === 1
        && dedup(R10.map(dzJs)).length === 10 && dedup(R10.map(dblJs)).length === 9
    },
    lean: 'theorem the_barren_claim_fails_exactly_at_the_dz_fixed_points : ((List.range 10).filter (fun s => ([s, dz s]).eraseDups.length != 2) = [0, 5]) ∧ ((List.range 10).filter (fun s => dz s == s) = [0, 5]) ∧ ((List.range 10).filter (fun s => (dz s == s) && (dbl s == s)) = [0]) ∧ (dz 0 = 0) ∧ (dbl 0 = 0) ∧ (dz 5 = 5) ∧ (dbl 5 = 1) ∧ (((List.range 10).map dz).eraseDups.length = 10) ∧ (((List.range 10).map dbl).eraseDups.length = 9) := by decide' },

  { key: 'reconciled_generator_sat_inside_the_truncated_run',
    name: `RECONCILED GENERATOR SAT INSIDE THE TRUNCATED RUN. Six positions read off the two lists themselves — all ${GENERATE_MANIFEST.length} manifest entries and all ${RECONCILE_DIRECT.length} direct scripts — placing three named generators inside the sealed window of ${LISTED} listed generators cut at ${CUT}.`,
    why: `The lonely theorem reconciled_b13fd37a says only that the string gen-prose-evidence.js is a member of the list reconcile runs — it is the ledger ONLY membership theorem over strings, which is why nothing relates to it. The sealed theorem truncated_run_counted_47 seals the arithmetic of a silent truncation over that SAME list: of ${LISTED} listed generators the shared runner ended at ${CUT} and silently skipped 41, including gen-readme and gen-llm, two names that are literal entries of the manifest. THE LINK places the lonely membership inside the sealed window over the list itself: gen-prose-evidence.js sits at manifest slot ${SLOT}, which is ${LISTED - SLOT} short of the sealed ${LISTED} and ${SLOT - CUT} past the sealed cut of ${CUT}; gen-readme.js and gen-llm.js, the two the sealed theorem names by hand, sit at ${SLOT_README} and ${SLOT_LLM}, likewise inside it; the position in the full run is the direct-script count plus ${SLOT}; and the list the sealed theorem counted at ${LISTED} now carries exactly ${GENERATE_MANIFEST.length - LISTED} more. Every left side is read off the actual lists, every right side is a literal of the sealed theorem, so the two move together. PERTURBED AND REFUSED: deleting one earlier entry from the manifest, which moves gen-prose-evidence.js one slot and the length by one; the sealed count ${LISTED} lowered to 46 — each failed to decide. THE ONE ASSUMPTION, STATED PLAINLY: the ${LISTED} the sealed theorem counted is this same manifest at an earlier size.`,
    js: () => RECONCILE_RUNS[RECONCILE_DIRECT.length + SLOT] === 'gen-prose-evidence.js'
      && idxFold('gen-prose-evidence.js', RECONCILE_RUNS) === RECONCILE_DIRECT.length + SLOT
      && GENERATE_MANIFEST[SLOT] === 'gen-prose-evidence.js' && GENERATE_MANIFEST[SLOT_README] === 'gen-readme.js' && GENERATE_MANIFEST[SLOT_LLM] === 'gen-llm.js'
      && SLOT > CUT && SLOT < LISTED && SLOT_README < LISTED && SLOT_LLM < LISTED
      && GENERATE_MANIFEST.length > LISTED,
    lean: `theorem reconciled_generator_sat_inside_the_truncated_run : idxOf "gen-prose-evidence.js" reconcileRuns = reconcileDirect.length + ${SLOT} ∧ idxOf "gen-prose-evidence.js" generateManifest + ${LISTED - SLOT} = ${LISTED} ∧ idxOf "gen-prose-evidence.js" generateManifest - ${CUT} = ${SLOT - CUT} ∧ idxOf "gen-readme.js" generateManifest + ${LISTED - SLOT_README} = ${LISTED} ∧ idxOf "gen-llm.js" generateManifest + ${LISTED - SLOT_LLM} = ${LISTED} ∧ generateManifest.length - ${LISTED} = ${GENERATE_MANIFEST.length - LISTED} := by decide` },

  { key: 'lead_b13fd37a_is_flagged_by_every_single_refuter',
    name: 'LEAD b13fd37a IS FLAGGED BY EVERY SINGLE REFUTER. All six refuters fire, three on each of the lead two conjuncts, and the sealed flagging rule returns 1 on each conjunct alone, on the joined six-refuter panel, and on every single-refuter panel — while the all-zero panel returns 0.',
    why: 'The lonely theorem involution_b13fd37a is the kernel negation of lead b13fd37a, discharged by exactly one witness: reconcile does run gen-prose-evidence.js. The sealed theorem flag_is_any_refutation seals the audit game rule flag(a,b) = 1 − (1−a)(1−b), the OR — a claim is caught the moment ONE independent refuter fires — and three_refuters_monotone seals that a further refuter never un-flags. THE LINK runs that sealed rule over lead b13fd37a OWN refuters, computed from the lists rather than asserted: one refuter per generator on each of the lead two conjuncts. All three named generators are in the run list, not just the one the involution cites, and none of the three .ts names is dormant, so the lead second conjunct is false too; the panel flag is 1 on either conjunct alone, 1 on the joined panel, and 1 on every single-refuter panel, while the all-zero panel comes back 0 — the control that can fail. The link says what the involution leaves unsaid: the lead is not narrowly false, it is flagged six ways under the ledger own sealed flagging rule. PERTURBED AND REFUSED: one named generator misspelled so its refuter reads 0 and the panel becomes [0,1,1]; the sealed rule changed from 1 − ∏(1−a) to 2 − ∏(1−a) — each failed to decide.',
    js: () => eqList(REFUTERS_JS, [1, 1, 1]) && eqList(REFUTERS_TS, [1, 1, 1])
      && flagAll(REFUTERS_JS) === 1 && flagAll(REFUTERS_TS) === 1 && flagAll([...REFUTERS_JS, ...REFUTERS_TS]) === 1
      && flagAll([1, 0, 0]) === 1 && flagAll([0, 0, 1]) === 1 && flagAll([0, 0, 0]) === 0,
    lean: 'theorem lead_b13fd37a_is_flagged_by_every_single_refuter : refutersJs = [1, 1, 1] ∧ refutersTs = [1, 1, 1] ∧ flagAll refutersJs = 1 ∧ flagAll refutersTs = 1 ∧ flagAll (refutersJs ++ refutersTs) = 1 ∧ flagAll [1, 0, 0] = 1 ∧ flagAll [0, 0, 1] = 1 ∧ flagAll [0, 0, 0] = 0 := by decide' },

  { key: 'the_grid_widths_are_the_sealed_fortytwo_and_k432',
    name: 'THE GRID WIDTHS ARE THE SEALED FORTY-TWO AND THE SEALED 432. Six identities over the seven locale rays: both list-derived widths equal the sealed expressions, and the greatest common divisor of those two sealed expressions alone is exactly the six projected rays.',
    why: 'The lonely theorem anatomy_e92de628 says the pair grid over the seven locale rays is 42, the full grid at 72 wings is 432, their gcd is the 6 projected rays, and 7 does not divide 72. The ledger already seals both widths independently: directions_number_fortytwo gives 7·7 − 7, the ordered pairs less the diagonal, and rosette_quantum_fortytwo gives 7·6, the directed merge edges of the rosette, while k432 gives 432 = 2^4·3^3 = 16·27. THE LINK asserts that the lonely wing two list-derived widths ARE those sealed expressions, and then — the part neither side contains — that the greatest common divisor of the two SEALED expressions alone, taken without reference to the lonely wing definitions, is exactly the number of projected rays the lonely wing counts. So the 6 the anatomy theorem finds between its own two numbers is the same 6 that already sits between the ledger sealed 42 and its sealed 432. PERTURBED AND REFUSED: the wing count 72 to 71, which moves the full grid to 426; the sealed factorisation 2^4·3^3 to 2^5·3^3 — each failed to decide.',
    js: () => {
      const dims = [...DIMENSIONS]
      const proj = dims.slice(1)
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const pairGrid = dims.length * (dims.length - 1)
      const fullGrid = proj.length * 72
      return pairGrid === 7 * 7 - 7 && pairGrid === 7 * 6
        && fullGrid === 2 ** 4 * 3 ** 3 && fullGrid === 16 * 27
        && gcd(7 * 7 - 7, 2 ** 4 * 3 ** 3) === proj.length && gcd(7 * 6, 16 * 27) === proj.length
    },
    lean: 'theorem the_grid_widths_are_the_sealed_fortytwo_and_k432 : pairGrid = 7 * 7 - 7 ∧ pairGrid = 7 * 6 ∧ fullGrid historicalWings = 2 ^ 4 * 3 ^ 3 ∧ fullGrid historicalWings = 16 * 27 ∧ Nat.gcd (7 * 7 - 7) (2 ^ 4 * 3 ^ 3) = projected.length ∧ Nat.gcd (7 * 6) (16 * 27) = projected.length := by decide' },

  { key: 'the_bounded_search_returns_the_sealed_gcd_verdict',
    name: 'THE BOUNDED SEARCH RETURNS THE SEALED GCD VERDICT at each of the three pairs the sealed theorem names: for all three, the bounded enumeration and the greatest common divisor agree, and the universal then delivers both non-divisibilities and the one witness.',
    why: 'The lonely theorem not_dvd_of_bound_e92de628 is a universal: for all d and n, if no multiplier below the bound n / d + 1 reaches n and that bound already overshoots n, then d does not divide n. It is a decision procedure for non-divisibility that avoids the kernel propext-borrowing decision for the divides relation, and it names no constant at all, which is why nothing in its wing shares a symbol with it. The sealed theorem rosette_and_vortex_are_coprime computes three greatest common divisors over concrete pairs: gcd 7 9 = 1, gcd 7 14 = 7, gcd 9 6 = 3. THE LINK asserts that at exactly those three pairs the bounded search the universal performs — enumerating j below n / d + 1 and asking whether d·j hits n — returns the same boolean as asking whether the sealed gcd equals d, and then uses the universal itself to deliver the two non-divisibilities while exhibiting the witness for the one divisibility. This is an instantiation, not a restatement: the sealed gcd values decide the right-hand booleans and the universal bound decides the left-hand ones, and the equation between them holds only because the two independent computations agree pair by pair. PERTURBED AND REFUSED: the universal own bound n / d + 1 shrunk to n / d in the (7,14) conjunct; the sealed gcd 7 14 = 7 changed to 2 — each failed to decide.',
    js: () => {
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      const hits = (d: number, n: number): boolean => [...Array(idiv(n - (n % d), d) + 1).keys()].some((j) => d * j === n)
      return hits(7, 9) === (gcd(7, 9) === 7) && hits(7, 14) === (gcd(7, 14) === 7) && hits(9, 6) === (gcd(9, 6) === 9)
        && gcd(7, 9) === 1 && gcd(7, 14) === 7 && gcd(9, 6) === 3
        && 9 % 7 !== 0 && 14 % 7 === 0 && 6 % 9 !== 0
    },
    lean: `theorem the_bounded_search_returns_the_sealed_gcd_verdict : (((List.range (9 / 7 + 1)).any (fun j => 7 * j == 9)) = (Nat.gcd 7 9 == 7)) ∧ (((List.range (14 / 7 + 1)).any (fun j => 7 * j == 14)) = (Nat.gcd 7 14 == 7)) ∧ (((List.range (6 / 9 + 1)).any (fun j => 9 * j == 6)) = (Nat.gcd 9 6 == 9)) ∧ (Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3) ∧ (¬ (7 ∣ 9)) ∧ (7 ∣ 14) ∧ (¬ (9 ∣ 6)) := by
  refine ⟨by decide, by decide, by decide, by decide, by decide, by decide, ?_, ⟨2, by decide⟩, ?_⟩
  · exact not_dvd_of_bound 7 9 (by decide) (by decide)
  · exact not_dvd_of_bound 9 6 (by decide) (by decide)` },

  { key: 'the_pair_grid_misses_the_seventh_factor_of_k432',
    name: 'THE PAIR GRID MISSES THE SEVENTH FACTOR OF 432. Six facts: the full grid is the sealed factorisation written as the seal writes it, the six projected rays divide it, the seventh leaves a remainder of 5, and so the pair grid of 42 does not divide it.',
    why: 'The lonely theorem involution_e92de628 is the kernel refusal of lead e92de628: the pair grid does not divide the full grid. Unfolded over the wing definitions that is the single claim that 42, the seven dimensions times the six they pair with, does not divide 432, the six projected rays times the 72 historical wings; as a statement it is the lead name and nothing else, which is why the finder sees it touching nothing. The sealed theorem k432 is the factorisation of the same number: 432 = 2^4·3^3 = 16·27. THE LINK states why the refutation is true in the factorisation own terms: the full grid 6·72 is exactly the sealed number written as k432 writes it, the pair grid is 7·6, the six projected rays divide that factorisation with witness 72, the factorisation leaves 5 on division by 7 so it carries no seventh factor, and therefore 42 does not divide it — proved by the wing own bounded-search universal, not by a propext-borrowing decision. It is not a restatement of either side: k432 alone says nothing about divisibility by 42, and the involution alone never mentions the prime factorisation that explains it. PERTURBED AND REFUSED: the sealed factorisation 2^4·3^3 changed to 2^4·3^4 in the conjunct equating it with the full grid; the pair grid 42 changed to 36 in the non-divisibility and in the instantiation of the bound — each failed to decide.',
    js: () => 6 * 72 === 2 ** 4 * 3 ** 3 && 2 ** 4 * 3 ** 3 === 16 * 27 && 7 * 6 === 42
      && (2 ** 4 * 3 ** 3) % 7 === 5 && (2 ** 4 * 3 ** 3) % 6 === 0 && (2 ** 4 * 3 ** 3) % 42 !== 0,
    lean: `theorem the_pair_grid_misses_the_seventh_factor_of_k432 : (6 * 72 = 2 ^ 4 * 3 ^ 3) ∧ (2 ^ 4 * 3 ^ 3 = 16 * 27) ∧ (7 * 6 = 42) ∧ ((2 ^ 4 * 3 ^ 3) % 7 = 5) ∧ (6 ∣ 2 ^ 4 * 3 ^ 3) ∧ (¬ (42 ∣ 2 ^ 4 * 3 ^ 3)) := by
  refine ⟨by decide, by decide, by decide, by decide, ⟨72, by decide⟩, ?_⟩
  exact not_dvd_of_bound 42 (2 ^ 4 * 3 ^ 3) (by decide) (by decide)` },

  { key: 'origin_surplus_class_by_class_is_the_catalogue_surplus',
    name: 'ORIGIN SURPLUS CLASS BY CLASS IS THE CATALOGUE SURPLUS. Nine facts over all three Alpine binding classes: each class origin count is at most its package count, the two defects stand side by side at 0 and 1856, and the three per-class surpluses sum to exactly the catalogue-wide surplus.',
    why: 'The lonely theorem alpine_binding_origins_overcount_16083 counts the Alpine mirror three binding classes by distinct ORIGIN — 1277 harmonised, 2819 crypto, 13843 port — finds they sum to 17939 against only 16083 distinct origins in the catalogue, and records the excess 1856: origins do not partition. Its sibling in the same wing, alpine_bindings_partition_packages_28635, counts the SAME three classes by PACKAGE — 2034, 3087, 23514 — and finds they sum exactly to the 28635 packages: packages do partition. The two share every object and not one numeral, which is precisely why the finder calls the origin claim lonely. THE LINK puts the two censuses in one statement: class by class the origin count never exceeds the package count, since an origin ships at least one package; the two defects stand side by side, zero for packages and 1856 for origins; and, the real content, the per-class companion surpluses 2034 − 1277, 3087 − 2819 and 23514 − 13843 sum to exactly 28635 − 17939, the catalogue-wide surplus. That identity is decided from both sides six numerals at once and fails if any single one of them moves, so it is a bridge and not a conjunction of two independent facts. PERTURBED AND REFUSED: the port class package count 23514 to 23515; the port class origin count 13843 to 13844 — each failed to decide.',
    js: () => (2034 - 1277) + (3087 - 2819) + (23514 - 13843) === 28635 - 17939
      && 2034 + 3087 + 23514 === 28635 && 1277 + 2819 + 13843 === 17939
      && 2034 + 3087 + 23514 - 28635 === 0 && 1277 + 2819 + 13843 - 16083 === 1856
      && 1277 <= 2034 && 2819 <= 3087 && 13843 <= 23514 && 16083 <= 28635,
    lean: 'theorem origin_surplus_class_by_class_is_the_catalogue_surplus : ((2034 - 1277) + (3087 - 2819) + (23514 - 13843) = 28635 - 17939) ∧ (2034 + 3087 + 23514 = 28635) ∧ (1277 + 2819 + 13843 = 17939) ∧ (2034 + 3087 + 23514 - 28635 = 0) ∧ (1277 + 2819 + 13843 - 16083 = 1856) ∧ (1277 ≤ 2034) ∧ (2819 ≤ 3087) ∧ (13843 ≤ 23514) ∧ (16083 ≤ 28635) := by decide',
  },
]

emit({
  file: 'Links.lean',
  skill: 'links',
  defs: DEFS,
  header: 'THE LINKS — one theorem for each LONELY theorem the ledger seals. A lonely theorem is one that nothing '
    + 'else in the ledger relates to; loneliness is not a defect in the proof, it is a missing edge. Each of these '
    + 'eleven states, in one decidable sentence, a relation between a lonely theorem OWN objects and a DIFFERENT '
    + 'sealed theorem objects, and each was tested by PERTURBING either side, where the theorem must fail — the '
    + 'perturbations that refused are recorded in each sentence, because that is what separates a link from a '
    + 'restatement. THE ELEVEN, lonely to sealed: a_new_tool_pays_at_most_the_mean_wire_cost to '
    + 'mcp_tool_coverage_partition_244; budget_census_2d552f1f to agl_order_54 and partition_six_three; '
    + 'involution_2d552f1f to mirror_congruence and agl_order_54; aura_alphabet_is_pairwise_distinct to '
    + 'alphabet_exceeds_wheel, alphabet_digital_root_is_nine and true_colour_is_24_bit; involution_ef58b583 to '
    + 'dz_fixed_points, zero_closes_in_phase, five_returns_out_of_phase, dz_loses_nothing, doubling_collapses_nine '
    + 'and maps_differ_in_reach; reconciled_b13fd37a to truncated_run_counted_47; involution_b13fd37a to '
    + 'flag_is_any_refutation and three_refuters_monotone; anatomy_e92de628 to directions_number_fortytwo, '
    + 'rosette_quantum_fortytwo and k432; not_dvd_of_bound_e92de628 to rosette_and_vortex_are_coprime; '
    + 'involution_e92de628 to k432; alpine_binding_origins_overcount_16083 to '
    + 'alpine_bindings_partition_packages_28635. '
    + 'THE SKILL IS links AND NOT crosslink, because crosslink is Crosslink.lean subject — what the handle store '
    + 'addressing admits in the way of relations between handle FOLDERS — and this wing relates sealed THEOREMS to '
    + 'each other, a different object. Skills are derived from the wings and never hand-listed, so the new one is '
    + 'served the day this wing lands. '
    + 'THE LISTS ARE WALKED, NEVER TYPED: the generator manifest, the scripts reconcile runs directly and the '
    + 'dormant census are read from the files that declare them, so a position this wing seals is a position that '
    + 'still exists. '
    + 'SCOPE: each theorem is an arithmetic relation between two sealed statements objects, and confers nothing on '
    + 'either side beyond what the two already seal. Where two censuses were taken at different moments the '
    + 'sentence says so and states only the arithmetic between them. One further lonely theorem of the same pass, '
    + 'hardware_coverage_is_not_correctness_coverage, is NOT here: its numeral is computed from nothing, so '
    + 'perturbing either side changes nothing the kernel can see and no link to it can be more than a numeral '
    + 'copied in. Its cure is upstream, in the wing that states it.',
  facts: FACTS.map((f) => ({ ...f, name: f.name + ' ' + f.why })),
})
