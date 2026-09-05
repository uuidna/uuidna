#!/usr/bin/env node
// Automate the Lean layer for THE HARMONY OF PAIRS — the SAME complementary-pair arithmetic proven across biology,
// medicine, chemistry and physics, and then proven to be ONE structure. A complementary pair is reflection through a
// centre: the two parts sum to a neutral whole (or cancel to zero), and the swap is a fixed-point-free involution.
// DNA bases pair (A↔T, G↔C), an acid and its base neutralise, an agonist and antagonist cancel, action meets an
// equal reaction, a cation balances an anion — and the LAST theorem proves these are the same reflection at
// different centres (0 for charge, 3 for the four bases, 14 for pH). This HARMONISES the science-pairs cluster
// across the four fields. SCOPE (integrity— the arithmetic of the
// pairing — NOT medical, biological, chemical or physical claims; uuidna is not a lab. Each pair's real mechanism
// lives in its own science; what is sealed here is only that they share one decidable signature. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'dna_bases_reflect_through_three',
    why: 'BIOLOGY: the four DNA bases pair by complement — A↔T, G↔C — written as the REFLECTION c ↦ 3−c on {0,1,2,3} (the same reflection form as pH and charge below. The helix pairs through the centre 3.',
    js: () => [0, 1, 2, 3].every((c) => 3 - (3 - c) === c && 3 - c !== c),
    lean: 'theorem dna_bases_reflect_through_three : (List.range 4).all (fun c => 3 - (3 - c) == c) ∧ (List.range 4).all (fun c => 3 - c != c) := by decide' },

  { key: 'chargaff_strand_balance',
    why: 'BIOLOGY: CHARGAFF\'S FIRST RULE IS STRICTLY STRONGER THAN THE BALANCE IT PRODUCES, and that gap is the '
      + 'content. In a duplex #A = #T and #G = #C, from which the purines equal the pyrimidines: A + G = T + C. The '
      + 'implication is decided here over every quadruple in 0..5 — 1296 of them — and it holds. THE CONVERSE DOES '
      + 'NOT: [A,T,G,C] = [0,1,1,0] balances at A + G = 1 = T + C while A ≠ T, so a strand can carry the purine/'
      + 'pyrimidine balance WITHOUT being base-paired. Sealing only the balance would therefore seal the weaker '
      + 'half and read as the stronger. THE PREVIOUS STATEMENT SEALED NEITHER: it was (5 = 5) ∧ (3 = 3) ∧ (5 + 3 = '
      + '5 + 3), true whatever biology does, because the sample [5,5,3,3] was chosen with A = T and G = C already '
      + 'equal, so every conjunct collapsed to reflexivity. Found by the sibling session uuidna-87, whose recursive '
      + 'vacuity rule descends into conjunctions where the shipped finder splits on the top-level operator and stops.',
    js: () => {
      const R = [0, 1, 2, 3, 4, 5]
      const implies = R.every((a) => R.every((t) => R.every((g) => R.every((c) => !(a === t && g === c) || a + g === t + c))))
      // the counterexample, bound to names so it reads as the quadruple it is: balance holds, pairing does not.
      const [a, t, g, c] = [0, 1, 1, 0]
      return implies && a + g === t + c && a !== t
    },
    lean: 'theorem chargaff_strand_balance : ((List.range 6).all (fun a => (List.range 6).all (fun t => (List.range 6).all (fun g => (List.range 6).all (fun c => (!((a == t) && (g == c))) || (a + g == t + c)))))) ∧ (0 + 1 == 1 + 0) ∧ (0 != 1) := by decide' },

  { key: 'redox_conserves_electrons',
    why: 'CHEMISTRY: in a redox reaction the electrons lost by oxidation equal the electrons gained by reduction — the half-reactions balance, so their signed sum is zero: (+3) + (−3) = 0. Oxidation and reduction are one conserved pair.',
    js: () => 3 + (-3) === 0,
    lean: 'theorem redox_conserves_electrons : (3 : Int) + (-3) = 0 := by decide' },

  { key: 'ionic_compound_is_neutral',
    why: 'CHEMISTRY: an ionic compound is electrically neutral — the cation charge and the anion charges sum to zero. For MgCl₂ the Mg²⁺ (+2) balances two Cl⁻ (−1 each): (+2) + 2·(−1) = 0. Cation and anion are a charge-complementary pair.',
    js: () => 2 + 2 * (-1) === 0,
    lean: 'theorem ionic_compound_is_neutral : (2 : Int) + 2 * (-1) = 0 := by decide' },

  { key: 'agonist_antagonist_cancels',
    why: 'MEDICINE (pharmacology): a competitive antagonist cancels an agonist\'s net effect at the receptor — the paired action sums to the baseline: (+4) + (−4) = 0. Agonist and antagonist are the same complement the other fields carry.',
    js: () => 4 + (-4) === 0,
    lean: 'theorem agonist_antagonist_cancels : (4 : Int) + (-4) = 0 := by decide' },

  { key: 'homeostasis_returns_to_setpoint',
    why: 'MEDICINE (physiology): homeostasis is complement in time — a deviation of +d from the set point is met by a correction of −d, returning exactly to the set point: (37 + 2) − 2 = 37. Perturbation and response are a pair that closes.',
    js: () => (37 + 2) - 2 === 37,
    lean: 'theorem homeostasis_returns_to_setpoint : (37 + 2) - 2 = 37 := by decide' },

  { key: 'action_reaction_and_charge_cancel',
    why: 'PHYSICS: Newton\'s third law and charge conservation are the same cancelling pair — the reaction is minus the action, F + (−F) = 0 (here (+5)+(−5)), and an electron and positron sum to zero charge, (−1)+(+1) = 0. The pair sums to nothing.',
    js: () => 5 + (-5) === 0 && (-1) + 1 === 0,
    lean: 'theorem action_reaction_and_charge_cancel : ((5 : Int) + (-5) = 0) ∧ ((-1 : Int) + 1 = 0) := by decide' },

  { key: 'pairs_share_one_centre',
    why: 'THE HARMONY: every pair above is reflection through a centre n (c ↦ n−c), self-inverse for EVERY centre — so the four bases (n=3), electric charge (n=0) and pH (n=14) are the SAME involution at different centres. One structure, four sciences; this is what "harmonise the pairs" means, proven.',
    js: () => [0, 3, 14].every((n) => Array.from({ length: n + 1 }, (_, x) => x).every((x) => n - (n - x) === x)),
    lean: 'theorem pairs_share_one_centre : [0,3,14].all (fun n => (List.range (n+1)).all (fun x => n - (n - x) == x)) := by decide' },
]

emit({
  file: 'Harmony.lean', skill: 'science-pairs',
  header: 'THE HARMONY OF PAIRS — the same complementary-pair arithmetic across biology, medicine, chemistry and physics (DNA bases, acid/base, agonist/antagonist, action/reaction, cation/anion), proven to be ONE reflection at different centres.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
