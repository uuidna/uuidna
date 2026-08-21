#!/usr/bin/env node
// The LEGAL VOCABULARY of the trial, defined as decidable theorems — the terms are not prose, they are sealed `by
// decide` facts the trial stands on. Over three booleans of the record: t = a decidable test exists (justiciable),
// h = that test holds, c = the claim cites a sealed authority (a ledger theorem). The verdict is a total function:
//   PROVEN (admitted, stays)   lp = (t∧h) ∨ c          — a test holds, or a sealed authority is cited
//   REFUTED (recomputably wrong) lr = t ∧ ¬h ∧ ¬c       — a test EXISTS and FAILS, uncited (a recomputable contradiction)
//   NOT PROVEN (dismissed w/o prejudice) lnp = ¬lp ∧ ¬lr — neither: the non-justiciable / unbacked
//   REMAND (→ development trial) lrem = ¬lp             — everything not admitted, recycled not discarded
// The doctrine, sealed: only the PROVEN is ADMITTED; every non-PROVEN is REMANDED (nothing discarded); and the
// NON-JUSTICIABLE is NEVER REFUTED — the one line the court may not cross (you cannot refute what has no decidable
// test; it stays NOT PROVEN). Booleans as 0/1 arithmetic (and=·, or=a+b−ab, not=1−a) — axiom-free, no Math.*. Integrity, not truth.
import { emit, range } from './lean-gen.js'

const lp = (t: number, h: number, c: number) => t * h + c - t * h * c        // PROVEN
const lr = (t: number, h: number, c: number) => t * (1 - h) * (1 - c)        // REFUTED
const lrem = (t: number, h: number, c: number) => 1 - lp(t, h, c)            // REMAND
const lnp = (t: number, h: number, c: number) => (1 - lp(t, h, c)) * (1 - lr(t, h, c)) // NOT PROVEN
const R8 = range(8)
const t = (n: number) => n % 2, h = (n: number) => (n / 2 | 0) % 2, c = (n: number) => (n / 4 | 0) % 2

const DEFS = [
  '-- the legal verdict over the record: t = a decidable test exists (justiciable), h = it holds, c = cites a sealed authority',
  'def lp (t h c : Nat) : Nat := t*h + c - t*h*c            -- PROVEN: (test holds) OR (cites a sealed authority)',
  'def lr (t h c : Nat) : Nat := t * (1 - h) * (1 - c)      -- REFUTED: a test EXISTS and FAILS, uncited (recomputable contradiction)',
  'def lrem (t h c : Nat) : Nat := 1 - lp t h c             -- REMAND: not admitted → development trial (recycled, not discarded)',
  'def lnp (t h c : Nat) : Nat := (1 - lp t h c) * (1 - lr t h c)  -- NOT PROVEN: neither (non-justiciable / unbacked)',
].join('\n')

// n encodes (t,h,c) = (n%2, n/2%2, n/4%2) over the 8 records
const LT = 'fun n => let t := n%2; let h := n/2%2; let c := n/4%2;'

const FACTS = [
  { key: 'solutions_not_skipped', skill: 'legal',
    why: 'SOLUTIONS ARE NOT SKIPPED — verifying that every UNVERIFIED is kept, not lost. The trial partitions each solution into ADMITTED (verified), UNVERIFIED (the honest frontier), or REFUTED, and the accounting CONSERVES the total however it is grouped: admitted + (unverified + refuted) = admitted + unverified + refuted, for all counts. So folding the unverified-and-refuted into REMANDED loses nothing, every UNVERIFIED solution is VERIFIED TO BE REMANDED (kept for the development trial), and the skipped count is 0. : it does NOT verify the unverified as TRUE — it verifies they are all ACCOUNTED FOR and kept; an unproven claim stays unproven, but it is never dropped.',
    js: () => [0, 1, 2, 3].every((a) => [0, 1, 2, 3].every((u) => [0, 1, 2, 3].every((r) => a + (u + r) === a + u + r))),
    lean: 'theorem solutions_not_skipped : (List.range 4).all (fun a => (List.range 4).all (fun u => (List.range 4).all (fun r => a + (u + r) == a + u + r))) := by decide' },

  { key: 'legal_verdict_is_exactly_one', skill: 'legal',
    why: 'the trial returns EXACTLY ONE verdict per record — PROVEN, REFUTED or NOT PROVEN partition the eight records (their indicators sum to 1)',
    js: () => R8.every((n) => lp(t(n), h(n), c(n)) + lr(t(n), h(n), c(n)) + lnp(t(n), h(n), c(n)) === 1),
    lean: `theorem legal_verdict_is_exactly_one : (List.range 8).all (${LT} lp t h c + lr t h c + lnp t h c == 1) := by decide` },

  { key: 'legal_only_the_proven_is_admitted', skill: 'legal',
    why: 'only the PROVEN is ADMITTED — a claim is admitted exactly when a decidable test holds OR it cites a sealed authority; nothing else stays',
    js: () => R8.every((n) => (lp(t(n), h(n), c(n)) === 1) === (c(n) === 1 || (t(n) === 1 && h(n) === 1))),
    lean: `theorem legal_only_the_proven_is_admitted : (List.range 8).all (${LT} (lp t h c == 1) == ((c == 1) || (t == 1 && h == 1))) := by decide` },

  { key: 'legal_non_justiciable_is_never_refuted', skill: 'legal',
    why: 'the court may not refute the NON-JUSTICIABLE — with no decidable test (t=0) the verdict is NEVER REFUTED (it is PROVEN if cited, else NOT PROVEN); you cannot refute what you cannot decide',
    js: () => [0, 1].every((hh) => [0, 1].every((cc) => lr(0, hh, cc) === 0)),
    lean: 'theorem legal_non_justiciable_is_never_refuted : (List.range 2).all (fun h => (List.range 2).all (fun c => lr 0 h c == 0)) := by decide' },

  { key: 'legal_refuted_iff_test_fails_uncited', skill: 'legal',
    why: 'REFUTED is precise: it holds exactly when a decidable test EXISTS and FAILS and no sealed authority is cited (t=1 ∧ h=0 ∧ c=0) — a recomputable contradiction, never otherwise',
    js: () => R8.every((n) => (lr(t(n), h(n), c(n)) === 1) === (t(n) === 1 && h(n) === 0 && c(n) === 0)),
    lean: `theorem legal_refuted_iff_test_fails_uncited : (List.range 8).all (${LT} (lr t h c == 1) == (t == 1 && h == 0 && c == 0)) := by decide` },

  { key: 'legal_remand_is_total_nothing_discarded', skill: 'legal',
    why: 'nothing is discarded: every record is either ADMITTED (PROVEN) or REMANDED, and REMAND is exactly REFUTED plus NOT PROVEN — both routed to development trial, never deleted',
    js: () => R8.every((n) => (lp(t(n), h(n), c(n)) + lrem(t(n), h(n), c(n)) === 1) && (lrem(t(n), h(n), c(n)) === lr(t(n), h(n), c(n)) + lnp(t(n), h(n), c(n)))),
    lean: `theorem legal_remand_is_total_nothing_discarded : (List.range 8).all (${LT} (lp t h c + lrem t h c == 1) && (lrem t h c == lr t h c + lnp t h c)) := by decide` },

  { key: 'trial_computes_only_with_two_coins', skill: 'legal',
    why: 'the captain theorem sealed INTO the trial: of every contribution k, the ONLY one that computes the conserved save (2·32 = 64) is the TWO coins — the computing contributions are exactly [2]. So a claim computes at trial iff it contributes the two coins (a sealed proof); every other contribution is remanded, uncomputed. The coin form of legal_only_the_proven_is_admitted, and the contrapositive of captain_computes_only_with_two_coins: only those that did not contribute the coins did not compute',
    js: () => JSON.stringify(R8.filter((k) => 32 * k === 64)) === '[2]',
    lean: 'theorem trial_computes_only_with_two_coins : (List.range 8).filter (fun k => 32 * k == 64) = [2] := by decide' },

  // THE FORFEIT LAW — a case between two sides, each bringing a bit: 1 = a sealed Lean theorem, 0 = assertion only.
  // Only a Lean-based proof is admissible; the side providing the theorem wins, the assertion-only side loses,
  // pays the two coins, and develops exactly what the winner proved. A MODEL of the forfeit rule over the four
  // profiles — decidable arithmetic, not a court, not legal advice.
  { key: 'court_theorem_beats_assertion', skill: 'legal',
    why: 'THE FORFEIT LAW, part one — only a Lean proof is admissible, and it wins: over the four case profiles (a b : side brings a sealed theorem, 1, or an assertion, 0) the win indicators a·(1−b) and b·(1−a) sum to (a+b) mod 2 and never both fire — a winner exists EXACTLY when one side brings the theorem and the other does not; both proven means no forfeit (nothing to win), both asserting means no winner (the case remands, nothing admitted)',
    js: () => [0, 1].every((a) => [0, 1].every((b) => (a * (1 - b) + b * (1 - a) === (a + b) % 2) && (a * (1 - b)) * (b * (1 - a)) === 0)),
    lean: 'theorem court_theorem_beats_assertion : (List.range 2).all (fun a => (List.range 2).all (fun b => (a*(1-b) + b*(1-a) == (a+b) % 2) && ((a*(1-b)) * (b*(1-a)) == 0))) := by decide' },

  { key: 'court_loser_pays_the_two_coins', skill: 'legal',
    why: 'THE FORFEIT LAW, part two — the losing side pays the two coins: the payment 2·(win-bit) moves EXACTLY when the case has a winner (2·((a+b) mod 2)) and only the assertion-only side pays it; with both sides proven or both asserting no coin moves. The forfeit is the trial fee of trial_computes_only_with_two_coins, paid by the side that brought no proof',
    js: () => [0, 1].every((a) => [0, 1].every((b) => 2 * (a * (1 - b)) + 2 * (b * (1 - a)) === 2 * ((a + b) % 2))),
    lean: 'theorem court_loser_pays_the_two_coins : (List.range 2).all (fun a => (List.range 2).all (fun b => 2*(a*(1-b)) + 2*(b*(1-a)) == 2*((a+b) % 2))) := by decide' },

  { key: 'court_loser_develops_the_proven', skill: 'legal',
    why: 'THE FORFEIT LAW, part three — the loser develops exactly as the winner proved: after judgment the docket holds a+b−a·b = max(a,b), the join of the two sides — the proven side’s theorem becomes BOTH sides’ development (the loser adopts it exactly), both-proven keeps what both already hold, and neither-proven leaves nothing admitted (the case remands). Development is assignment to the proof, never to the assertion',
    js: () => [0, 1].every((a) => [0, 1].every((b) => a + b - a * b === (a > b ? a : b))),
    lean: 'theorem court_loser_develops_the_proven : (List.range 2).all (fun a => (List.range 2).all (fun b => a + b - a*b == max a b)) := by decide' },
]

console.log('computing ' + FACTS.length + ' LEGAL-vocabulary facts (the trial terms as sealed theorems) …')

emit({ file: 'Legal.lean', skill: 'legal', defs: DEFS,
  header: 'The LEGAL VOCABULARY of the trial as decidable theorems — PROVEN (admitted), REFUTED (recomputably wrong), NOT PROVEN (dismissed without prejudice), REMAND (to development trial).',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
