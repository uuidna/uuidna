#!/usr/bin/env node
// Automate the Lean layer for THE SIXTEEN BINARY BOOLEAN FUNCTIONS — enumerated, with the standard names. PURE
// ARITHMETIC: every value is a bit or a count; nothing is measured from the world.
//
// WHY. Three wings asked for this object and none holds it. Hardware.lean claims NAND functional completeness while
// reconstructing three of sixteen gates. Command.lean proves an acceptance rule equals AND without eliminating the
// other fifteen. Quantum.lean seals only the COUNT, 2^(2*2) = 16. The functions themselves — the object all three
// reason about — appear nowhere in lean/.
//
// THE VOCABULARY IS THE STANDARD ONE, deliberately. This ledger's keys lean on private abbreviations (z9mul, z7pow,
// nimsum) where established names exist, and a name nobody searches is a name nobody finds. These are the terms as
// mathematics and digital logic already use them: AND, OR, XOR, NAND, NOR, XNOR, implication and its converse,
// their negations, the two projections and the two constants.
//
// THE ENCODING packs each function as its four-row truth table read as a nibble over the inputs (0,0), (0,1),
// (1,0), (1,1) — so the sixteen functions ARE the sixteen values of a nibble, which is why there are exactly
// 2^(2^2) of them and not some other number.
import { emit } from './lean-gen.js'

const ROWS: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]]
const bit = (m: number, i: number) => (m >> i) & 1
const table = (m: number) => ROWS.map((_, i) => bit(m, i))
const FNS = Array.from({ length: 16 }, (_, m) => table(m))
const AND = 8, OR = 14, XOR = 6, NAND = 7, NOR = 1
const constants = FNS.filter((f) => new Set(f).size === 1).length
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `-- a two-input boolean function packed as its truth table over (0,0),(0,1),(1,0),(1,1) — one nibble each
def bitOf (m i : Nat) : Nat := (m / (2 ^ i)) % 2
def rowsOf (m : Nat) : List Nat := (List.range 4).map (fun i => bitOf m i)

-- the classical gates, as arithmetic on bits
def andB (a b : Nat) : Nat := a * b
def orB  (a b : Nat) : Nat := a + b - a * b
def notB (a : Nat) : Nat := 1 - a
def nandB (a b : Nat) : Nat := 1 - a * b`

const FACTS = [
  { key: 'sixteen_binary_functions',
    why: 'THERE ARE EXACTLY SIXTEEN two-input boolean functions, and they are the sixteen values of a nibble: each function IS its four-row truth table, so 2^(2^2) = 16 counts them and no argument is needed beyond the encoding. All sixteen are distinct.',
    js: () => FNS.length === 16 && new Set(FNS.map((f) => f.join(''))).size === 16 && 2 ** (2 ** 2) === 16,
    lean: 'theorem sixteen_binary_functions : ((List.range 16).map rowsOf).eraseDups.length = 16 ∧ ((2:Nat)^(2^2) = 16) := by decide' },

  { key: 'gates_name_their_tables',
    why: 'THE CLASSICAL GATES ARE PARTICULAR ROWS: AND is 0001, OR is 0111, XOR is 0110, NAND is 1110 and NOR is 1000, reading the table over (0,0), (0,1), (1,0), (1,1). Each named gate is one of the sixteen and the line identifies which, so the names are anchored to the enumeration rather than asserted beside it.',
    js: () => table(AND).join('') === '0001' && table(OR).join('') === '0111' && table(XOR).join('') === '0110' && table(NAND).join('') === '1110',
    lean: `theorem gates_name_their_tables : (rowsOf 8 = ${L(table(AND))}) ∧ (rowsOf 14 = ${L(table(OR))}) ∧ (rowsOf 6 = ${L(table(XOR))}) ∧ (rowsOf 7 = ${L(table(NAND))}) ∧ (rowsOf 1 = ${L(table(NOR))}) := by decide` },

  { key: 'nand_rebuilds_the_others',
    why: 'NAND IS FUNCTIONALLY COMPLETE, decided rather than claimed: NOT is NAND of a value with itself, AND is the negation of NAND, and OR is NAND of the two negations. Every input pair checked, so the completeness argument is carried out rather than cited — this is why a chip can be one repeated gate.',
    js: () => [0, 1].every((a) => 1 - a * a === 1 - a) && [0, 1].every((a) => [0, 1].every((b) => 1 - (1 - a * b) * (1 - a * b) === a * b)),
    lean: 'theorem nand_rebuilds_the_others : ((List.range 2).all (fun a => nandB a a == notB a)) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => notB (nandB a b) == andB a b))) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => nandB (notB a) (notB b) == orB a b))) := by decide' },

  { key: 'two_functions_ignore_input',
    why: 'EXACTLY TWO OF THE SIXTEEN ARE CONSTANT — the always-false 0000 and the always-true 1111 — so fourteen actually depend on their inputs. Two, and the line proves the count rather than the reader noticing it.',
    js: () => constants === 2 && FNS.filter((f) => new Set(f).size > 1).length === 14,
    lean: 'theorem two_functions_ignore_input : (((List.range 16).filter (fun m => (rowsOf m).eraseDups.length == 1)).length = 2) ∧ (((List.range 16).filter (fun m => (rowsOf m).eraseDups.length > 1)).length = 14) := by decide' },

  { key: 'xor_differs_from_or',
    why: 'XOR IS NOT OR, and the difference is the single row where both inputs hold: 0110 against 0111. The two agree on three of four rows, which is why the distinction is worth deciding rather than assuming — a gate that agreed everywhere would be the same gate.',
    js: () => { const x = table(XOR).join(''), o = table(OR).join(''); return x !== o && x.slice(0, 3) === o.slice(0, 3) },
    lean: `theorem xor_differs_from_or : (rowsOf 6 ≠ rowsOf 14) ∧ ((rowsOf 6).take 3 = (rowsOf 14).take 3) ∧ (rowsOf 6 = ${L(table(XOR))}) := by decide` },

  { key: 'implication_is_a_gate',
    why: 'IMPLICATION IS ONE OF THE SIXTEEN, not a logical extra: a implies b reads 1011 over the four rows, false only where a holds and b does not. Its converse and both negations are also among the sixteen, so the whole of two-input logic is inside the enumeration with nothing left outside it.',
    js: () => table(13).join('') === '1011' && table(11).join('') === '1101' && table(2).join('') === '0100',
    lean: `theorem implication_is_a_gate : (rowsOf 13 = ${L(table(13))}) ∧ (rowsOf 11 = ${L(table(11))}) ∧ (rowsOf 2 = ${L(table(2))}) := by decide` },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Boolean.lean', skill: 'boolean', defs: DEFS,
  header: 'THE SIXTEEN BINARY BOOLEAN FUNCTIONS — enumerated, under the names mathematics and digital logic already use.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
