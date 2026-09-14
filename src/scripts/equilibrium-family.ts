// equilibrium-family — the six-cube's xor-translation family, declared ONCE. lean-equilibrium emits its wings from
// this and lean-ledger titles them from this, so neither the file count nor a title can drift from the theorems.
//
// ONE TRANSLATION TO A FILE (the captain, 2026-09-14: "smaller combinatorial lean files make the difference"). A file
// is the unit the kernel compiles and saves, and its peak memory grows with everything elaborated in it: measured
// with /usr/bin/time -l under Lean 4.33, eight translations to a file peaked at 5.1 GB in 51.8 s, one to a file at
// 1.43 GB in 12.8 s. One theorem is the smallest wing that changes no statement, so this is the floor, not a pick;
// each small wing compiles alone, is saved as its .olean, and every later step imports it.

/** the six-cube: cells are the 6-bit words, and every other count here is derived from this one */
export const BITS = 6
export const CELLS = 1 << BITS

export interface XorWing { file: string; a: number; title: string; summary: string }

/** xorWings() → one wing per translation a in 0..CELLS-1, with the title the ledger shows for it */
export const xorWings = (): XorWing[] => Array.from({ length: CELLS }, (_, a) => ({
  file: `EquilibriumXor${a + 1}.lean`,
  a,
  title: `The six-cube translation by ${a}`,
  summary: `the xor translation by ${a} is an automorphism of the six-cube — one theorem to a file, the smallest wing that changes no statement, so each compiles alone, is saved and is imported (lead 241)`,
}))
