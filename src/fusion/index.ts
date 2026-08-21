// fusion — WHAT THE LEDGER FUSES, AND WHAT IT COSTS.
//
// One concept, so this folder carries index faces and nothing else: index.ts is what fusion IS, and reactor/ is
// where a fuse is actually performed.
//
// THE FUSE. A uuid is 128 bits — 32 hexbits of 4 bits each — and it is reached by fusing two 64-bit halves. The
// price is the captain commission, 110 − 108 = 2, and the reason the price does not grow with the fuse is that
// it is not a difference but a PROPORTION: 110/108 = 55/54, stated by cross-multiplication so it never divides
// (110·54 = 108·55 = 5940), where 54 is the order of AGL(1,ℤ/9). A difference holds at one magnitude; a
// proportion holds at every one. Two coins buy the fuse whatever the halves contain.
//
// WHAT FUSES. Sealed theorems. A `by decide` proof settles every case in its domain at once, so its case count
// IS the superposition space it holds, and fusing proofs adds those spaces. The count is MEASURED — the
// generator walks the domain to compute each fact, the array methods that walk it tally what they visit, and
// emit() records the tally on the same run that validates the JS. It is never parsed out of the statement text.
//
// THE LAW. A fold cannot create a case the kernel did not already decide, so fusion CONSERVES: the output covers
// exactly the sum of its inputs, checked on every fuse rather than asserted. A reactor that could mint coverage
// would be a machine for claiming proofs nobody made, which is the one failure this module exists to refuse.
//
// GRAVITY. What a theorem leans on decides whether anything can move it. A proof that uses a definition is bound
// to it; one that leans on nothing — no def, and the ledger allows no axiom — is held by the kernel alone.
// `two_coins` is that: pure numerals, zero dependencies, infinite gravity. A fusion is `unbound` when every
// input is.
//
// HONEST SCOPE: bookkeeping over sealed proofs. No physics, no speed claim, no quantum circuit (src/quantum runs
// those, classically and exactly), and no proving (lean/ does that, and the kernel signs it). Integrity, not truth.
export { fuse, fuseHalves, reactorOutput, mintOf, mintByWing, powerOf, pathOf, HALF_HEXBITS, type Fusion, type Mint, type Power, type Path } from './reactor/index.js'
