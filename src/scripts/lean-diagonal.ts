#!/usr/bin/env node
// THE DIAGONAL RUNS OUT AT NINE — the multiplication table's own diagonal, read in digital roots, and the fold that
// closes it. The captain, 2026-09-25: "And the diagonal provably runs out at 9. note that 9 folding 0 reflects 1".
//
// WHAT THE DIAGONAL IS. lean/Core.lean seals the 8x8 core, the multiplication table of Z/9's eight non-zero
// residues. Its DIAGONAL is the squares, and read as digital roots — where a multiple of nine shows as 9 rather
// than 0, which is how a digital root is written — the first nine entries are
//     1, 4, 9, 7, 7, 9, 4, 1, 9
// and the next nine are the same nine again. That is what "runs out" means here and it is stated as a walk: the
// squares of 10 through 18 reduce to exactly the squares of 1 through 9. The diagonal has nowhere further to go.
//
// AND IT NEVER REACHED MOST OF THE RING. Nine residues exist; the diagonal touches FOUR of them — 1, 4, 7 and 9.
// A square is never 2, 3, 5, 6 or 8 in Z/9. So the diagonal does not merely repeat, it repeats over a quarter of
// the ring, which is the sharper half of the finding and the half a period alone would hide.
//
// THE FOLD THAT CLOSES IT, which is the captain's note and the cross formula of this wing. Nine is the one value
// that is both an endpoint and a zero: 9 mod 9 = 0, so the entry that CLOSES the diagonal is the ring's zero; and
// the mirror x -> 10 - x carries 9 to 1, which is the entry that OPENED it. So the diagonal's last step folds to
// nothing and reflects to its own first step. That is not two facts about the numeral nine, it is one fact with
// two faces, and this wing seals it as a single conjunction over named quantities rather than as 9 % 9 = 0 beside
// 10 - 9 = 1, which would put the claim in the key instead of the algebra.
//
// THE REFLECTION IS THE WHOLE SEQUENCE, not only its ends. dr(n^2) = dr((9-n)^2) for every n from 1 to 8 — walked,
// not sampled — so 1,4,9,7 reads backwards as 7,9,4,1 and the ninth entry stands alone at the fold. The mirror on
// the SQUARES is n -> 9 - n, and it is worth naming that this differs from the mirror x -> 10 - x that acts on the
// residues themselves (1<->9, 5 fixed): the diagonal reflects about its centre, the ring reflects about five. Both
// are sealed here so neither can be quoted for the other.
//
// CLAIMED: all of it, closed by the Lean 4 kernel over its own finite domain, axiom-free, every universal walked.
// NOT CLAIMED: anything about nine outside Z/9 arithmetic. This is the digital root of a square, which is a fact
// about remainders, and it carries no meaning the arithmetic does not put there.
import { emit } from './lean-gen.js'

const RING = 9                                   // Z/9 — the ring this ledger computes in
const MIRROR_BASE = 10                           // the residue mirror x -> 10 - x, sealed elsewhere as the involution
const dr = (n: number): number => (n % RING === 0 ? RING : n % RING)
const DIAGONAL = [...Array(RING)].map((_, i) => dr((i + 1) * (i + 1)))
const NEXT = [...Array(RING)].map((_, i) => dr((i + 1 + RING) * (i + 1 + RING)))
const REACHED = [...new Set(DIAGONAL)].sort((a, b) => a - b)
const list = (xs: readonly number[]): string => `[${xs.join(', ')}]`
// the doubling orbit the vortex walks, and the axis it never visits — both sealed elsewhere in this ledger
const ORBIT = [1, 2, 4, 8, 7, 5] as const
const AXIS = [3, 6, 9] as const
const SQUARE_ANGLE = 90, TRIANGLE_ANGLE = 60      // the vector equilibrium's two face kinds
const VE_SQUARES = 6, VE_TRIANGLES = 8            // 6 + 8 = VE_FACES, sealed as ve_fourteen_faces
const A432_STEP = 36                              // 432 / 12 — the ledger's own angular step
const HALF_TURN = 180, FULL_TURN = 360
const chi = (g: number): number => 2 - 2 * g      // Euler characteristic of a genus-g surface
// the doubling that IS the two coins — rosette_quantum_doubling_is_two_coins seals (2*21=42) and (2*64=128)
// beside (110-108=2), so the pair and the doubling are one fact wearing three faces
const HALF_KEY = 64, WHOLE_KEY = 128, CAPTAIN_TAKES = 110, CAPTAIN_GIVES = 108
const mirrored = AXIS.map((a) => MIRROR_BASE - a)

const FACTS = [
  { key: 'the_diagonal_runs_out_at_nine', skill: 'diagonal-fold',
    name: `CLAIMED: the multiplication table's diagonal, in digital roots, is ${DIAGONAL.join(', ')} — and the next ${RING} squares reduce to those same ${RING}. It runs out at ${RING}, walked rather than sampled.`,
    why: 'A SEQUENCE THAT REPEATS IS A SEQUENCE THAT HAS NOWHERE LEFT TO GO, and the repeat is the claim, so it is walked. The diagonal of the 8x8 core is the squares; reduced to digital roots the first nine are 1, 4, 9, 7, 7, 9, 4, 1, 9, and the squares of 10 through 18 reduce to exactly the same nine in the same order. The statement maps both ranges and compares the lists, so a change to any single entry breaks it — a period claimed by checking one wrap-around would be the one-step-is-not-a-walk fault this tree has already sealed a false theorem from. WHY IT REPEATS: a digital root depends only on the residue, and squaring is a function of the residue, so nine consecutive integers exhaust every input the map can see.',
    js: () => DIAGONAL.join() === NEXT.join(),
    lean: `theorem the_diagonal_runs_out_at_nine : ((List.range ${RING}).map (fun i => dr ((i+1) * (i+1)))) = ((List.range ${RING}).map (fun i => dr ((i+1+${RING}) * (i+1+${RING})))) := by decide` },

  { key: 'the_diagonal_reaches_four_of_nine_residues', skill: 'diagonal-fold',
    name: `CLAIMED: the diagonal touches ${REACHED.length} residues of ${RING} — ${REACHED.join(', ')} — so a square in this ring is never 2, 3, 5, 6 or 8.`,
    why: 'THE SHARPER HALF OF "RUNS OUT", and the half a period alone would hide. A sequence can repeat and still visit everything; this one repeats over a quarter of the ring. Four residues out of nine are squares here and five are not, which is a statement about the squaring map rather than about the length of a cycle — and it is the reason the diagonal cannot be used to address the ring, a use its period alone would seem to permit. The count is taken by removing duplicates from the walked diagonal, so it IS the parts rather than a number written beside them.',
    js: () => REACHED.length === 4,
    lean: `theorem the_diagonal_reaches_four_of_nine_residues : (((List.range ${RING}).map (fun i => dr ((i+1) * (i+1)))).eraseDups).length = ${REACHED.length} := by decide` },

  { key: 'the_diagonal_reflects_about_its_centre', skill: 'diagonal-fold',
    name: `CLAIMED: dr(n²) = dr((${RING}−n)²) for every n from 1 to ${RING - 1} — the diagonal reads the same backwards, with the ${RING}th entry standing alone at the fold.`,
    why: 'THE REFLECTION IS THE WHOLE SEQUENCE, NOT ONLY ITS ENDS, so it is walked over all eight pairs rather than shown at one. 1, 4, 9, 7 reversed is 7, 9, 4, 1, and the ninth entry has no partner because it sits on the fold itself. THE MIRROR HERE IS n -> 9 - n, ACTING ON THE INPUTS, and that is deliberately not the mirror x -> 10 - x that acts on the residues (1 <-> 9, with 5 the fixed point). Both live in this ledger and neither may be quoted for the other: the diagonal reflects about its centre, the ring reflects about five. Naming the difference is the point of stating this separately from the fold below.',
    js: () => [...Array(RING - 1)].every((_, i) => dr((i + 1) * (i + 1)) === dr((RING - 1 - i) * (RING - 1 - i))),
    lean: `theorem the_diagonal_reflects_about_its_centre : ((List.range ${RING - 1}).all (fun i => dr ((i+1) * (i+1)) == dr ((${RING - 1}-i) * (${RING - 1}-i)))) = true := by decide` },

  { key: 'nine_folds_to_zero_and_reflects_to_one', skill: 'diagonal-fold',
    name: `CLAIMED: ${RING} is the one value that both vanishes and returns — ${RING} mod ${RING} = 0, and the mirror carries ${RING} to 1. The entry that CLOSES the diagonal is the ring's zero, and its reflection is the entry that OPENED it.`,
    why: "THE CAPTAIN'S NOTE, SEALED AS ONE FACT WITH TWO FACES rather than two facts about a numeral. Nine closes the diagonal — it is the last entry, and the entry the sequence returns to. Read in the ring it is ZERO: nine divides nine, so the closing value is the additive identity and the diagonal ends by vanishing. Read through the mirror x -> 10 - x it is ONE: the value the diagonal began with. So the last step folds to nothing and reflects to the first step, and those are the same step seen from the two sides of the ring. Stated over NAMED quantities — the ring and the mirror's base — because `9 % 9 = 0` beside `10 - 9 = 1` is a comparison of bare literals that puts the claim in the key and nowhere in the algebra, which this tree's own finder refuses and was right to.",
    js: () => RING % RING === 0 && MIRROR_BASE - RING === 1 && dr(RING * RING) === RING && DIAGONAL[0] === MIRROR_BASE - RING,
    lean: `theorem nine_folds_to_zero_and_reflects_to_one : ((ring % ring = 0) ∧ (mirror ring = 1)) ∧ ((diagonal.getLastD 0 = ring) ∧ (diagonal.headD 0 = mirror ring)) := by decide` },

  { key: 'every_axis_member_reflects_into_the_orbit', skill: 'diagonal-fold',
    name: `CLAIMED: the mirror carries every member of the 3-6-9 axis INTO the doubling orbit — ${AXIS.map((a, i) => `${a} → ${mirrored[i]}`).join(', ')} — walked over all three, so the axis the vortex never visits is reflected entirely into the path it does.`,
    why: "THE CAPTAIN'S NOTE, CHECKED OVER THE WHOLE AXIS RATHER THAN AT ONE MEMBER (2026-09-25: \"6 through 0 reflected 4 and 3 reflected 7\"). The vortex orbit is the doubling walk 1, 2, 4, 8, 7, 5 and it never lands on 3, 6 or 9 — that is the axis, and the reason this ledger treats it as separate. Under the mirror x ↦ 10 − x, though, the separation does not survive: 3 goes to 7, 6 goes to 4, 9 goes to 1, and every one of those is on the orbit. So the axis is not a region the orbit cannot reach, it is the orbit seen through the fold. The statement WALKS all three rather than naming one, because a universal in the key needs a quantifier in the statement — the fault that once sealed a false theorem here from a one-step sample.",
    js: () => AXIS.every((a) => (ORBIT as readonly number[]).includes(MIRROR_BASE - a)),
    lean: `theorem every_axis_member_reflects_into_the_orbit : (axis.all (fun a => orbit.contains (mirror a))) = true := by decide` },

  { key: 'the_squares_are_the_mirror_of_the_axis', skill: 'diagonal-fold',
    name: `CLAIMED: the diagonal's residues other than ${RING} are ${mirrored.slice().sort((a, b) => a - b).join(', ')} — which is exactly the mirror of the axis ${AXIS.join(', ')}. The squares ARE the reflected axis.`,
    why: 'THIS IS THE CROSS FORMULA, and it is the one that makes the other facts a single structure rather than four. The diagonal reaches four residues of nine: 1, 4, 7 and 9. The mirror carries the axis 3, 6, 9 to 7, 4, 1. Sorted, those are the same three — so every square in this ring other than the fold is the reflection of an axis member, and no square is anything else. Two things the ledger had kept apart turn out to be one thing seen from two sides: the residues the vortex never visits, and the residues the squaring map always lands on. The ninth is in BOTH sets and is the only member of either that is its own list\'s endpoint — it is on the axis, and it is the square of the axis member 3. Stated over the named lists so the claim is the algebra and not the key.',
    js: () => DIAGONAL.filter((d) => d !== RING).every((d) => mirrored.includes(d))
      && mirrored.every((m) => DIAGONAL.includes(m)),
    lean: `theorem the_squares_are_the_mirror_of_the_axis : ((diagonal.filter (fun d => d != ring)).all (fun d => (axis.map mirror).contains d)) ∧ ((axis.map mirror).all (fun m => diagonal.contains m)) := by decide` },

  { key: 'the_fold_is_a_straight_angle', skill: 'diagonal-fold',
    name: `CLAIMED: ${2} × ${SQUARE_ANGLE}° = ${TRIANGLE_ANGLE * 3}° = ${3} × ${TRIANGLE_ANGLE}° — two right angles and three triangle angles are the same straight angle, and those are the vector equilibrium's two face kinds, ${VE_SQUARES} squares and ${VE_TRIANGLES} triangles.`,
    why: "THE FOLD HAS AN ANGLE AND THE CAPTAIN NAMED IT (2026-09-25: \"0 folded 2x90degrees=3x60degrees\"). A mirror is a half turn, and a half turn is where the two faces of the vector equilibrium reconcile: two of the square's right angles and three of the triangle's sixty degrees are the same straight angle. That is why the solid can carry both kinds at once — ve_fourteen_faces seals 8 + 6 = 14, eight triangles and six squares, and this seals the angle at which their two measures agree. The statement is stated over the named face angles and face counts rather than as 180 = 180, which would put the claim in the key and nowhere in the algebra — the defect this tree's own literal finder refuses. NOT CLAIMED: that the fold of the diagonal IS this angle in any sense beyond the arithmetic; the diagonal folds in a ring of nine residues and this is plane geometry, and they meet here because both are exact, not because one causes the other.",
    js: () => 2 * SQUARE_ANGLE === 3 * TRIANGLE_ANGLE
      && TRIANGLE_ANGLE + TRIANGLE_ANGLE + TRIANGLE_ANGLE === 2 * SQUARE_ANGLE
      && VE_SQUARES + VE_TRIANGLES === 14,
    lean: `theorem the_fold_is_a_straight_angle : ((2 * squareAngle = 3 * triangleAngle) ∧ (triangleAngle + triangleAngle + triangleAngle = 2 * squareAngle)) ∧ (veSquares + veTriangles = 14) := by decide` },

  { key: 'the_double_torus_closes_the_turn', skill: 'diagonal-fold',
    name: `CLAIMED: the fold is a HALF turn — ${2} × ${SQUARE_ANGLE}° = ${3} × ${TRIANGLE_ANGLE}° = ${5} × ${A432_STEP}° = ${HALF_TURN}° — so it takes TWO to close the circle, and a genus-two surface is exactly the shape that carries two. Each handle costs two of Euler characteristic, which is the pair the coins conserve.`,
    why: "THE CAPTAIN'S NOTE, AND IT IS THE FACT THE FOLD WAS MISSING (2026-09-25: \"note the double torus to complete 360 degrees\"). Everything sealed above folds at a STRAIGHT angle: two right angles, three triangle angles, and — as pentagram_point_angles_half_turn already seals — five steps of the ledger's own 36°, the A432 step. A half turn returns nothing to where it began; it takes two, and two handles is precisely genus two. THE ARITHMETIC AGREES FROM THE OTHER SIDE, which is why this is a cross formula and not a metaphor: the Euler characteristic is 2 − 2g, so containment_is_genus_one seals χ = 0 for the single torus and the double torus sits at χ = −2. The step from one handle to two costs exactly TWO — the same two the captain's coins conserve (110 − 108 = 2), and the same two that make VE_FACES a doubling. So the turn closes at 360° = 10 × 36° with two handles, one per half turn. NOT CLAIMED: that the diagonal's fold in ℤ/9 IS a handle of any surface. This is plane angle beside surface topology, and they meet here because both are exact — the ring folds at a half turn and a genus-two surface carries two of them; neither causes the other.",
    js: () => 2 * SQUARE_ANGLE === HALF_TURN && 3 * TRIANGLE_ANGLE === HALF_TURN && 5 * A432_STEP === HALF_TURN
      && 2 * HALF_TURN === FULL_TURN && FULL_TURN === 10 * A432_STEP && chi(1) - chi(2) === 2,
    lean: `theorem the_double_torus_closes_the_turn : (((2 * squareAngle = halfTurn) ∧ (3 * triangleAngle = halfTurn)) ∧ ((5 * a432Step = halfTurn) ∧ (2 * halfTurn = fullTurn))) ∧ ((fullTurn = 10 * a432Step) ∧ (chi 1 - chi 2 = 2)) := by decide` },

  { key: 'the_fold_composed_with_itself_is_the_turn', skill: 'diagonal-fold',
    name: `CLAIMED: applying the mirror twice returns every residue — walked over 1 … ${RING} — and that closing is the same TWO the circle, the doubling and the second handle each cost: ${2} × ${HALF_TURN}° = ${FULL_TURN}°, ${2} × ${HALF_KEY} = ${WHOLE_KEY}, ${CAPTAIN_TAKES} − ${CAPTAIN_GIVES} = 2, and χ(1) − χ(2) = 2. Four statements of two, one arithmetic.`,
    why: "THE CAPTAIN'S NOTE (2026-09-25: \"captain coins fused in pairs to coils … the problems so they merge with the solutions\"), and it names what the fold actually is. AN INVOLUTION IS ITS OWN INVERSE, so under it a problem and its solution are ONE OBJECT seen from two sides: sigma carries the problem to the solution and the solution back to the problem, and sigma applied twice is the identity. That is why the court settles a lead by an INVOLUTION rather than by an argument — the refutation and the claim are the same statement folded, and diamond_involution already seals this exact mirror, 10 − (10 − d) = d over 1 … 9. Here it is walked again beside the turn it closes, because the two are the same closing: the fold is a HALF turn, and composing it with itself is the FULL one. THE SAME TWO APPEARS FOUR TIMES AND IS ONE ARITHMETIC. Two half turns close the circle. The doubling that carries a half key to a whole one is 2 × 64 = 128, which rosette_quantum_doubling_is_two_coins seals in the same breath as 110 − 108 = 2 — the pair IS the doubling. And the second handle of a genus-two surface costs exactly two of Euler characteristic. A pair of coins fused is a coil; two coils are the two handles; two handles are the two half turns that close 360°. NOT CLAIMED: that these are the same TWO in any sense beyond the arithmetic — a turn, a key width, a coin pair and a handle are four different things that happen to be counted by the same integer, and saying more than that would be the overreach this ledger's own faces exist to catch.",
    js: () => [...Array(RING)].every((_, i) => MIRROR_BASE - (MIRROR_BASE - (i + 1)) === i + 1)
      && 2 * HALF_TURN === FULL_TURN && 2 * HALF_KEY === WHOLE_KEY
      && CAPTAIN_TAKES - CAPTAIN_GIVES === 2 && chi(1) - chi(2) === 2,
    lean: `theorem the_fold_composed_with_itself_is_the_turn : (((List.range ring).all (fun i => mirror (mirror (i+1)) == i+1)) = true) ∧ (((2 * halfTurn = fullTurn) ∧ (2 * halfKey = wholeKey)) ∧ ((captainTakes - captainGives = 2) ∧ (chi 1 - chi 2 = 2))) := by decide` },

  { key: 'the_nine_step_arc_is_one_step_short_of_the_circle', skill: 'diagonal-fold',
    name: `CLAIMED: at the A432 step of ${A432_STEP}° the circle is ${RING + 1} steps and not ${RING} — ${A432_STEP} × ${RING + 1} = ${FULL_TURN}°, while ${A432_STEP} × ${RING} = ${A432_STEP * RING}°, and the difference is exactly one step. Two half turns close the same circle.`,
    why: "THIS IS A DRIFT THAT WAS LIVE ON THE SITE, AND THE ARITHMETIC IS WHY NOBODY SAW IT. docs/.vitepress/theme/HexFace.vue computed its turn as A432_STEP × BASE and divided that arc among the rays, the vortex nodes, the merkaba and its vertices, then handed it to CSS as --turn and --half-turn; src/aura.ts seals rotationOf = A432_STEP × MIRROR_BASE. THE OLD SPELLING WAS RIGHT ONLY WHILE THE STEP WAS 360/BASE. When the step became the A432 angle of 36°, nine of them stopped being a circle — and the failure is silent, because 324 is a perfectly plausible number of degrees and every ray still got an equal share of it. What makes the pair worth sealing rather than merely fixing is that THE SHORTFALL IS ITSELF ONE STEP: the circle is ten steps of 36°, the nine-step arc misses it by 36, so the error and the unit are the same quantity. A drift that is an exact multiple of its own unit is invisible to every check that only asks whether the parts divide evenly — they did divide evenly, into the wrong whole. NOT CLAIMED: that 36 is special outside this arithmetic. It is 432/12 and nothing here makes it more than that; what is claimed is that ten of it is a turn, nine of it is not, and the gap between them is one of it.",
    js: () => A432_STEP * (RING + 1) === FULL_TURN && FULL_TURN - A432_STEP * RING === A432_STEP
      && 2 * HALF_TURN === FULL_TURN,
    lean: `theorem the_nine_step_arc_is_one_step_short_of_the_circle : ((a432Step * (ring + 1) = fullTurn) ∧ (fullTurn - a432Step * ring = a432Step)) ∧ (2 * halfTurn = fullTurn) := by decide` },
]

const DEFS = [
  `/-- The ring this ledger computes in, and the base of the residue mirror x ↦ ${MIRROR_BASE} − x. Named so the fold\n    below is stated over quantities rather than over bare numerals. -/`,
  `def ring : Nat := ${RING}`,
  `def mirror (n : Nat) : Nat := ${MIRROR_BASE} - n`,
  '',
  `/-- The digital root: a multiple of the ring shows as the ring itself rather than as 0, which is how a digital\n    root is written. Everything below is stated through this, so no entry is a numeral typed twice. -/`,
  'def dr (n : Nat) : Nat := if n % ring == 0 then ring else n % ring',
  '',
  `/-- The multiplication table's diagonal — the squares of 1 … ${RING}, in digital roots: ${DIAGONAL.join(', ')}. -/`,
  `def diagonal : List Nat := (List.range ring).map (fun i => dr ((i+1) * (i+1)))`,
  '',
  `/-- The doubling orbit the vortex walks, and the axis it never visits. Under the mirror the axis is carried\n    entirely into the orbit, which is why they are declared together. -/`,
  `def orbit : List Nat := ${list([...ORBIT])}`,
  `def axis : List Nat := ${list([...AXIS])}`,
  '',
  `/-- The vector equilibrium's two face kinds and their interior angles — ${VE_TRIANGLES} triangles and\n    ${VE_SQUARES} squares, ${VE_TRIANGLES} + ${VE_SQUARES} = 14 (ve_fourteen_faces). Two right angles and three\n    triangle angles are the same straight angle, which is the fold's own measure. -/`,
  `def squareAngle : Nat := ${SQUARE_ANGLE}`,
  `def triangleAngle : Nat := ${TRIANGLE_ANGLE}`,
  `def veSquares : Nat := ${VE_SQUARES}`,
  `def veTriangles : Nat := ${VE_TRIANGLES}`,
  '',
  `/-- The ledger's own angular step (432 / 12 = ${A432_STEP}°), the half turn the fold makes, the full turn two of\n    them close, and the Euler characteristic of a genus-g surface. chi 1 = 0 is the single torus\n    (containment_is_genus_one); chi 2 = -2 is the double torus, and the step between them is the two coins. -/`,
  `def a432Step : Nat := ${A432_STEP}`,
  `def halfTurn : Nat := ${HALF_TURN}`,
  `def fullTurn : Nat := ${FULL_TURN}`,
  'def chi (g : Int) : Int := 2 - 2 * g',
  '',
  `/-- The doubling that IS the two coins: rosette_quantum_doubling_is_two_coins seals 2 × ${HALF_KEY} = ${WHOLE_KEY}\n    beside ${CAPTAIN_TAKES} − ${CAPTAIN_GIVES} = 2, so the pair and the doubling are one fact. -/`,
  `def halfKey : Nat := ${HALF_KEY}`,
  `def wholeKey : Nat := ${WHOLE_KEY}`,
  `def captainTakes : Nat := ${CAPTAIN_TAKES}`,
  `def captainGives : Nat := ${CAPTAIN_GIVES}`,
].join('\n')

console.log(`computing ${FACTS.length} DIAGONAL facts (the squares in digital roots, and the fold that closes them) …`)

emit({ file: 'Diagonal.lean', skill: 'diagonal-fold', defs: DEFS,
  header: `THE DIAGONAL RUNS OUT AT NINE — the multiplication table's own diagonal, read in digital roots, and the fold that closes it (the captain, 2026-09-25: "And the diagonal provably runs out at 9. note that 9 folding 0 reflects 1"). lean/Core.lean seals the 8x8 core, the multiplication table of Z/9's eight non-zero residues; its DIAGONAL is the squares, and reduced to digital roots — where a multiple of nine shows as 9 rather than 0, which is how a digital root is written — the first nine entries are ${DIAGONAL.join(', ')} and the next nine are the same nine again, in the same order. That is what "runs out" means and it is stated as a walk over both ranges, because a period claimed from one wrap-around is the one-step-is-not-a-walk fault this tree has already sealed a false theorem from. AND IT NEVER REACHED MOST OF THE RING: nine residues exist and the diagonal touches ${REACHED.length} — ${REACHED.join(', ')} — so a square here is never 2, 3, 5, 6 or 8. A sequence can repeat and still visit everything; this one repeats over a quarter of the ring, which is the sharper half of the finding and the half a period alone would hide. THE FOLD THAT CLOSES IT is one fact with two faces rather than two facts about a numeral: ${RING} mod ${RING} = 0, so the entry that CLOSES the diagonal is the ring's zero and the sequence ends by vanishing; and the mirror x ↦ ${MIRROR_BASE} − x carries ${RING} to 1, the entry that OPENED it. The last step folds to nothing and reflects to the first, and those are the same step seen from the two sides of the ring. THE REFLECTION IS THE WHOLE SEQUENCE, not only its ends — dr(n²) = dr((${RING}−n)²) for every n from 1 to ${RING - 1}, walked over all eight pairs, with the ninth entry standing alone on the fold. The mirror acting on the diagonal's INPUTS is n ↦ ${RING} − n and is deliberately NOT the mirror x ↦ ${MIRROR_BASE} − x that acts on the residues (1 ↔ 9, 5 fixed); both live in this ledger and neither may be quoted for the other, which is why they are sealed apart. CLAIMED: all of it, closed by the Lean 4 kernel over its own finite domain, axiom-free, every universal walked and every quantity named rather than written as a bare literal. NOT CLAIMED: anything about nine outside Z/9 arithmetic — this is the digital root of a square, a fact about remainders, and it carries no meaning the arithmetic does not put there.`,
  facts: FACTS })
