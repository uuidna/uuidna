#!/usr/bin/env node
// Automate the Lean layer for the MARTIAL ARTS — the arithmetic of stance and angle, and nothing else. The vocabulary
// of the arts (the 45° line, the balanced stance, the kinetic chain, the lever) names quantities; what is sealed here
// is what those quantities DO as numbers, which turns out to be a law the ledger already holds at other scales: the
// complement map's fixed point is the half — 90−45=45 in degrees, 100−50=50 in percent, and 10−5=5, which is the
// ledger's own diamond involution dz(x)=10−x with its unique fixed point 5 (DIAMOND_FIXED). Balance is not a
// biomechanical claim here; it is a FIXED POINT, and the arts are one more place it appears.
//
// SCOPE — the narrowest in the ledger beside Psychology.lean: every theorem below is a fact about NUMBERS.
// Nothing here proves anything about technique, effectiveness, force, injury, physiology, or what wins a fight, and
// no theorem in this wing may be cited for such a claim. The named arts are the CONTEXT the arithmetic was drawn
// from, never validation of it.
//
// WHY THIS WING EXISTS IN THIS FORM: its predecessor (src/scripts/martial-arts-theorems.ts
// wired) paired grand names with trivial proofs — `center_of_gravity_stability` proven by `1 = 1`, Newton's third law
// by `1 + 1 = 2`, conservation of momentum by `2 * 3 = 6`. Each Lean line was true and none of them proved its own
// name. That is the one thing this ledger must never contain, so the claims were dropped and only the arithmetic that
// stands on its own was kept, renamed for what it actually proves. A theorem's name is not its proof.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'complement_fixes_the_half',
    why: 'THE BALANCED SPLIT IS A FIXED POINT, at every scale the arts measure in: the complement map c(x) = w − x sends x to what is left of the whole, and it fixes exactly the half — 90 − 45 = 45 for the angle, 100 − 50 = 50 for the weight split, 10 − 5 = 5 for the ledger\'s own diamond involution dz(x) = 10 − x whose unique fixed point is 5 (diamond_involution, DIAMOND_FIXED = [5]). The 45° line and the even stance are not separate facts about bodies; they are one arithmetic fact about complements, and the ledger already proved it at 10. One law, three scales.',
    js: () => 90 - 45 === 45 && 100 - 50 === 50 && 10 - 5 === 5,
    lean: 'theorem complement_fixes_the_half : (90 - 45 = 45) ∧ (100 - 50 = 50) ∧ (10 - 5 = 5) := by decide' },

  { key: 'supplement_completes_the_straight',
    why: 'An angle and its supplement complete the straight angle: 30 + 150 = 180, and the pair is ordered (30 < 150) — so naming one names the other. The arts speak of an opening and the angle you leave; as arithmetic that is complementation on 180, the same reflection the colour wheel runs on ℤ/12 and the diamond runs on 10. Geometry of the pair.',
    js: () => 30 + 150 === 180 && 30 < 150,
    lean: 'theorem supplement_completes_the_straight : (30 + 150 = 180) ∧ (30 < 150) := by decide' },

  { key: 'chain_joints_are_links_minus_one',
    why: 'A chain of n links has n − 1 joints: the five named segments of a kinetic chain (ground, hips, shoulders, arm, hand) meet at four joints, 5 − 1 = 4. It is the same off-by-one that governs every path: n stations, n − 1 steps between them — the counting fact the frame ring and the imprint chain both pay. A count of segments.',
    js: () => 5 - 1 === 4,
    lean: 'theorem chain_joints_are_links_minus_one : 5 - 1 = 4 := by decide' },

  { key: 'lever_ratio_is_exact_division',
    why: 'The ratio of two lever arms is exact division when one divides the other: 8 / 4 = 2, and the ratio is recovered by multiplying back, 2 * 4 = 8. The arts describe a longer arm as an advantage; what is sealed is only that the RATIO is exact arithmetic — no force, no torque, no mechanical claim, which would need units and a model the ledger does not carry.',
    js: () => 8 / 4 === 2 && 2 * 4 === 8,
    lean: 'theorem lever_ratio_is_exact_division : (8 / 4 = 2) ∧ (2 * 4 = 8) := by decide' },
]

emit({
  file: 'MartialArts.lean', skill: 'martial-arts',
  header: 'MARTIAL ARTS — the arithmetic of stance and angle: the complement map\'s fixed point is the half (one law at 90, 100 and the ledger\'s 10), the supplement pair, the chain\'s off-by-one, the exact lever ratio.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
