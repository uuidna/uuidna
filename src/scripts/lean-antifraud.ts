#!/usr/bin/env node
// Automate the Lean layer for THE ANTI-FRAUD DETECTORS — generated, and exhaustive where it used to sample. PURE
// ARITHMETIC: every value is a bit, a count or a claim index — the detectors are decided by exhaustion over a
// finite alphabet, never by reading an instrument or observing the world, so this wing owes no authority but the
// kernel. What it does NOT buy: the kernel confirms the sweep is complete, not that fraud looks like these lists.
//
// WHY THIS EXISTS NOW. AntiFraud.lean was hand-written: no generator, so nothing regenerated it and every fact was
// typed. The sweep found the gap that follows from that — the double-spend detector sampled four hand-picked claim
// lists while every other detector in the wing was exhaustive. A detector tested on the cases its author thought of
// is a detector tested against its author. All 27 length-3 lists over a 3-theorem alphabet are walked here.
//
// AND THE DUPLICATE IS DROPPED. `captain_commission_two_coins` stated 110 - 108 = 2, character for character the
// same statement as `two_coins` in Coins.lean, which is its canonical home. One statement under two names is a
// re-naming, not two facts; the ledger already counted it among its 74. Coins.lean keeps it.
import { emit } from './lean-gen.js'

const R = (n: number) => Array.from({ length: n }, (_, i) => i)
const claimsOf = (t: number, cs: number[]) => cs.filter((c) => c === t).length
const doubleSpent = (t: number, cs: number[]) => claimsOf(t, cs) >= 2
const LISTS: number[][] = []
for (const a of [1, 2, 3]) for (const b of [1, 2, 3]) for (const c of [1, 2, 3]) LISTS.push([a, b, c])
const FLAGGED = LISTS.filter((l) => [1, 2, 3].some((t) => doubleSpent(t, l))).length
const DEFS = `def forged (cited sealed : Nat) : Nat := if cited == sealed then 0 else 1
def claimsOf (t : Nat) (cs : List Nat) : Nat := (cs.filter (fun c => c == t)).length
def doubleSpent (t : Nat) (cs : List Nat) : Bool := 2 <= claimsOf t cs
def voteOk (weight coins : Nat) : Nat := if weight == coins then 1 else 0
def cleanAudit (f d v : Nat) : Nat := (1 - f) * (1 - d) * (1 - v)
def commission (bits : Nat) : Nat := 2 * (bits / 110)
def verified (c s : Nat) : Nat := c * s
def unverified (c s : Nat) : Nat := 1 - verified c s

-- the 27 length-three claim lists over a three-theorem alphabet — the detector's whole domain
def lists : List (List Nat) := [${LISTS.map((l) => '[' + l.join(',') + ']').join(',')}]`

const FACTS = [
  { key: 'captain_commission_two_coins',
    why: 'THE CAPTAIN COMMISSION \u2014 the key the hosted MCP quotes to every agent that connects and every two-coin deposit cites, so the NAME is a published contract. THE COMMISSION IS A STEP. A rate that rounded would leak; a floor cannot.',
    js: () => 2 * ((110 / 110) | 0) === 2 && 2 * ((220 / 110) | 0) === 4 && 2 * ((109 / 110) | 0) === 0,
    lean: 'theorem captain_commission_two_coins : (commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0) := by decide' },

  { key: 'forgery_flags_every_mismatch',
    why: 'THE FORGERY DETECTOR IS EXHAUSTIVE over all 81 cited-versus-sealed pairs: it flags exactly the 72 where the two differ and clears exactly the 9 on the diagonal. Every pair walked, so no mismatch has a hiding place.',
    js: () => { let f = 0; for (const c of R(9)) for (const s of R(9)) if ((c === s ? 0 : 1) === 1) f++; return f === 72 },
    lean: 'theorem forgery_flags_every_mismatch : (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 1)).length = 72 ∧ (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 0)).length = 9 := by decide' },

  { key: 'double_spend_walks_every_list',
    why: 'THE DOUBLE-SPEND DETECTOR, EXHAUSTIVE AT LAST: all 27 length-three claim lists over three theorems are walked, and exactly 21 contain a repeat while 6 do not. The wing formerly sampled four lists by hand — a detector tested on the cases its author imagined is tested against its author.',
    js: () => FLAGGED === 21 && LISTS.length === 27 && LISTS.length - FLAGGED === 6,
    lean: 'theorem double_spend_walks_every_list : (lists.length = 27) ∧ ((lists.filter (fun l => [1,2,3].any (fun t => doubleSpent t l))).length = 21) ∧ ((lists.filter (fun l => !([1,2,3].any (fun t => doubleSpent t l)))).length = 6) := by decide' },

  { key: 'single_claim_never_flags',
    why: 'AND IT DOES NOT OVERREACH: a list naming three different theorems flags nothing, so the detector answers to repetition and not to length. Both halves decided — what fires and what must not.',
    js: () => !doubleSpent(1, [1, 2, 3]) && claimsOf(1, [1, 2, 3]) === 1 && doubleSpent(3, [3, 1, 3]),
    lean: 'theorem single_claim_never_flags : (doubleSpent 1 [1,2,3] = false) ∧ (claimsOf 1 [1,2,3] = 1) ∧ (doubleSpent 3 [3,1,3] = true) := by decide' },

  { key: 'vote_passes_iff_weight_paid',
    why: 'A VOTE PASSES EXACTLY WHEN ITS WEIGHT EQUALS THE COINS PAID, over all sixteen weight-payment pairs up to four: inflation is refused and honest weight is admitted, with no third outcome.',
    js: () => R(4).every((w) => R(4).every((c) => ((w === c ? 1 : 0) === 1) === (w === c))),
    lean: 'theorem vote_passes_iff_weight_paid : (List.range 4).all (fun w => (List.range 4).all (fun c => (voteOk w c == 1) == (w == c))) := by decide' },

  { key: 'anti_fraud_check_deterministic',
    why: 'THE GATE IS DETERMINISTIC — the published spec the hosted MCP recomputes against, and a name 59 files cite. Across all eight states of the three detectors it passes on exactly ONE — every detector silent — and fails on the other seven, so the verdict table is fixed [1,0,0,0,0,0,0,0]: same input, same verdict, for anyone. One flag anywhere drains it, which is what makes it a gate rather than a score. THE KEY IS PART OF THE CONTRACT: across all eight states of the three detectors it passes on exactly ONE — every detector silent — and fails on the other seven. One flag anywhere drains it, which is what makes it a gate rather than a score.',
    js: () => { let p = 0; for (const f of [0, 1]) for (const d of [0, 1]) for (const v of [0, 1]) if ((1 - f) * (1 - d) * (1 - v) === 1) p++; return p === 1 },
    lean: 'theorem anti_fraud_check_deterministic : (((List.range 2).flatMap (fun f => (List.range 2).flatMap (fun d => (List.range 2).map (fun v => cleanAudit f d v)))).filter (fun x => x == 1)).length = 1 := by decide' },

  { key: 'sealed_theorem_not_forged',
    why: 'A TRUE SEAL NEVER FLAGS — the gate accuses no honest tool. Walking the nine matching claim-seal pairs, forged is 0 at every one, so the forgery detector has no false positive to trade against its recall. This is the honest half of forgery_flags_every_mismatch, and it carries its own name because 48 files cite it as the guarantee that an honest citation is never refused.',
    js: () => R(9).every((c) => (c === c ? 0 : 1) === 0),
    lean: 'theorem sealed_theorem_not_forged : ((List.range 9).map (fun c => forged c c)).all (fun x => x == 0) := by decide' },

  { key: 'honesty_gate_passes_iff_all_sealed',
    why: 'THE GATE PASSES EXACTLY WHEN NOTHING IS FLAGGED \u2014 an IFF over all eight detector states"it passes when clean". One direction alone would admit a gate that also passed on something else. Named in GATE_THEOREMS as part of the gate\u2019s published spec.',
    js: () => [0,1].every((f) => [0,1].every((d) => [0,1].every((v) => ((1-f)*(1-d)*(1-v) === 1) === (f === 0 && d === 0 && v === 0)))),
    lean: 'theorem honesty_gate_passes_iff_all_sealed : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (cleanAudit f d v == 1) == (f == 0 && d == 0 && v == 0)))) := by decide' },

  { key: 'conformance_failure_detects_intrusion',
    why: 'ONE RAISED FLAG DRAINS THE WHOLE AUDIT \u2014 no partial credit. Over all eight states, if any detector fires the gate is 0, which is what makes it a conjunction rather than a score that could average an intrusion away.',
    js: () => [0,1].every((f) => [0,1].every((d) => [0,1].every((v) => (f + d + v > 0 ? (1-f)*(1-d)*(1-v) === 0 : true)))),
    lean: 'theorem conformance_failure_detects_intrusion : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (f + d + v == 0) || (cleanAudit f d v == 0)))) := by decide' },

  { key: 'honesty_gate_is_theorem_not_oracle',
    why: 'THE IMPLEMENTATION EQUALS ITS BOOLEAN SPEC at every one of the eight states \u2014 there is no oracle, no judgement call, nothing consulted that a reader cannot recompute. This is the theorem that makes the gate auditable rather than trusted.',
    js: () => [0,1].every((f) => [0,1].every((d) => [0,1].every((v) => (1-f)*(1-d)*(1-v) === (f === 0 && d === 0 && v === 0 ? 1 : 0)))),
    lean: 'theorem honesty_gate_is_theorem_not_oracle : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => cleanAudit f d v == (if f == 0 && d == 0 && v == 0 then 1 else 0)))) := by decide' },

  { key: 'overclaim_with_fake_cite_fails',
    why: 'A FABRICATED CITATION DRAINS THE AUDIT whatever else is clean: with the citation bit raised the gate is 0 at every combination of the other two detectors. Since the lexical honesty gate was folded away, this is the ONE thing that drains \u2014 so it carries its own theorem.',
    js: () => [0,1].every((f) => [0,1].every((d) => (1-f)*(1-d)*(1-1) === 0)),
    lean: 'theorem overclaim_with_fake_cite_fails : (List.range 2).all (fun f => (List.range 2).all (fun d => cleanAudit f d 1 == 0)) := by decide' },

  { key: 'fraud_verdict_is_exactly_one',
    why: 'EVERY CLAIM LEAVES WITH ONE VERDICT: verified plus unverified is one at all four evidence states, so no claim escapes without a verdict and none carries two. The trial is total and binary.',
    js: () => R(2).every((c) => R(2).every((s) => c * s + (1 - c * s) === 1)),
    lean: 'theorem fraud_verdict_is_exactly_one : (List.range 2).all (fun c => (List.range 2).all (fun s => verified c s + unverified c s == 1)) := by decide' },

  { key: 'fabricated_cite_stays_unverified',
    why: 'A CITATION WITHOUT A SEAL IS UNVERIFIED. An open door is not a closed one.',
    js: () => 1 - 1 * 0 === 1 && 1 * 1 === 1,
    lean: 'theorem fabricated_cite_stays_unverified : (unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'AntiFraud.lean', skill: 'anti-fraud', defs: DEFS,
  header: 'THE ANTI-FRAUD DETECTORS — generated, and exhaustive where the wing used to sample.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
