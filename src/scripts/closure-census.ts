#!/usr/bin/env node
// @finder phase:4 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// closure-census — REPORT THE CORPUS CLOSURE FIGURES lean/CrossFormulas.lean seals its inequalities against.
//
// That wing states its findings as integer inequalities — forced > 5 x unstated, crossing between two fifths and one
// half of unstated — which is the right way to state a fraction that must be decidable. It also means the wing's
// theorems are claims ABOUT the corpus algebra, so changing the algebra can make a sealed claim false. It did:
// admitting the quantities PROGRAM-shaped theorems count took the integer pool from 786 to 1,289 and put integers in
// far more wings each. This door prints the figures so the new inequalities are read off a measurement rather than
// guessed at, and so the next change to the algebra can be checked against them before it lands.

import { quantumCombinatorics, corpusAlgebra } from '../formulas.js'

const C = quantumCombinatorics()
const A = corpusAlgebra()
const pct = (n: number, d: number): string => (d === 0 ? '—' : `${((n / d) * 100).toFixed(1)}%`)

console.log(`integers ${A.integers.length} · formulas ${C.formulas} · wings ${C.wings}`)
console.log(`landing ${C.landing} = forced ${C.forced} + stated ${C.stated} + unstated ${C.unstated}`)
console.log(`  sums to the whole: ${C.forced + C.stated + C.unstated === C.landing}`)
console.log(`  forced / unstated = ${(C.forced / C.unstated).toFixed(2)}x  (the wing sealed > 5x)`)
console.log(`crossing ${C.crossing} of unstated ${C.unstated} — ${pct(C.crossing, C.unstated)}`)
console.log(`  the wing sealed BETWEEN two fifths and one half: ${C.crossing * 5 > C.unstated * 2 && C.crossing * 2 < C.unstated}`)
console.log(`  crossing * 2 vs unstated: ${C.crossing * 2} vs ${C.unstated}`)
console.log(`stated * 100 < unstated: ${C.stated * 100 < C.unstated} (${C.stated * 100} vs ${C.unstated})`)
console.log(`formulas per wing bracket 13..14: ${C.wings * 13 < C.formulas && C.wings * 14 > C.formulas} (${(C.formulas / C.wings).toFixed(2)})`)
