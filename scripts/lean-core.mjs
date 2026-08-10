#!/usr/bin/env node
// The 8×8 CORE — the multiplication table of ℤ/9's eight non-zero residues {1..8}. These 64 theorems are the
// generating core: from this one table the rest COMPUTES — the units (a has an inverse iff a row contains 1),
// the self-inverses (a·a=1: {1,8}), the nilpotents (a·a=0: {3,6}), the vortex orbit and the reflection all read
// off the table. Each `by decide`, sorry-free. Also emits the microdata manifest for the UI. 8×8 → the rest. 0/7.
import { emit } from './lean-gen.mjs'

const T = []
for (let a = 1; a <= 8; a++) for (let b = 1; b <= 8; b++) T.push({ key: `mul9_${a}_${b}`, stmt: `(${a} * ${b}) % 9 = ${(a * b) % 9}`, name: `${a}·${b} ≡ ${(a * b) % 9} (mod 9)` })
console.log('the 8×8 core: ' + T.length + ' non-zero ℤ/9 multiplication theorems (from these the rest computes).')

emit({ file: 'Core.lean', facts: T,
  header: "The 8×8 CORE: the multiplication table of ℤ/9's eight non-zero residues {1..8}. From these 64 theorems the rest COMPUTES — units, inverses, self-inverses {1,8}, nilpotents {3,6}, the vortex orbit and the reflection all read off this table." })
