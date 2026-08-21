#!/usr/bin/env node
// Automate the Lean layer for THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational
// logic every digital circuit is built from, each sealed as a decidable, AXIOM-FREE `by decide` fact. This is the
// honest realisation of "organising theorem algebra in binary particles for low-level computation": a bit is a Nat in
// {0,1}; a gate is arithmetic on bits (NOT a = 1−a, AND = a·b, OR = a+b−a·b, XOR = lxor, the axiom-free bitwise XOR);
// and the identities a hardware toolchain checks a netlist AGAINST — the gate truth tables, NAND functional
// completeness, the half- and full-adder, the 2:1 multiplexer, De Morgan — are each a finite, decidable statement the
// Lean kernel settles with no axiom. XOR uses `lxor` (structural, 8-bit fuel) so the whole layer stays kernel-only —
// not even propext (verified by scripts/lean-axioms). integrity. uuidna SEALS this spec —
// the exact decidable arithmetic of the gates — so a gate design can be VERIFIED AGAINST it. It does not, and these
// theorems do not claim to, fabricate a device, synthesise a netlist, or develop silicon. A sealed spec.
import { emit, LXOR_DEF } from './lean-gen.js'

// bit rows: the four (a,b) input assignments, as the exact list the truth tables enumerate
const R2: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]]
const lx = (a: number, b: number): number => a ^ b        // JS bitwise XOR — bits only; the audit mirror of Lean `lxor`
// FLOOR division with NO Math.* (hard-rejected — not a local theorem): (a − a%b)/b is exact integer division, the
// audit mirror of Lean's `/` on Nat.
const fdiv = (a: number, b: number): number => (a - (a % b)) / b
const bit = (n: number, i: number): number => fdiv(n, 2 ** i) % 2

const FACTS = [
  // ── the four primitive gate truth tables — a gate is arithmetic on bits ──────────────────────────────────────
  { key: 'not_gate_truth_table',
    why: 'The NOT gate as arithmetic: NOT a = 1 − a over a bit. Its truth table is [0,1] ↦ [1,0] — the one-input inverter, sealed exactly.',
    js: () => JSON.stringify([0, 1].map((a) => 1 - a)) === JSON.stringify([1, 0]),
    lean: 'theorem not_gate_truth_table : [0,1].map (fun a => 1 - a) = [1,0] := by decide' },

  { key: 'and_gate_truth_table',
    why: 'The AND gate as arithmetic: AND a b = a · b over bits. Its truth table over (0,0),(0,1),(1,0),(1,1) is [0,0,0,1] — one only when both inputs are one.',
    js: () => JSON.stringify(R2.map(([a, b]) => a * b)) === JSON.stringify([0, 0, 0, 1]),
    lean: 'theorem and_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1] := by decide' },

  { key: 'or_gate_truth_table',
    why: 'The OR gate as arithmetic: OR a b = a + b − a·b over bits. Its truth table is [0,1,1,1] — zero only when both inputs are zero.',
    js: () => JSON.stringify(R2.map(([a, b]) => a + b - a * b)) === JSON.stringify([0, 1, 1, 1]),
    lean: 'theorem or_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 + p.2 - p.1 * p.2) = [0,1,1,1] := by decide' },

  { key: 'xor_gate_truth_table',
    why: 'The XOR gate as the axiom-free bitwise `lxor`: its truth table over the four rows is [0,1,1,0] — one exactly when the inputs differ. The difference detector, kernel-only.',
    js: () => JSON.stringify(R2.map(([a, b]) => lx(a, b))) === JSON.stringify([0, 1, 1, 0]),
    lean: 'theorem xor_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => lxor p.1 p.2) = [0,1,1,0] := by decide' },

  { key: 'xor_is_addition_mod_two',
    why: 'XOR IS addition in ℤ/2: lxor a b = (a + b) mod 2 for bits. The difference gate and the parity sum are one arithmetic — the binary algebra folds back to the field of two elements.',
    js: () => R2.every(([a, b]) => lx(a, b) === (a + b) % 2),
    lean: 'theorem xor_is_addition_mod_two : [(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 == (p.1 + p.2) % 2) := by decide' },

  { key: 'gate_output_is_one_bit',
    why: 'The algebra is CLOSED on the bit: every primitive gate returns a value ≤ 1 for bit inputs — NOT, AND, OR, XOR all land back in {0,1}. Combinational logic never leaves 𝔹.',
    js: () => R2.every(([a, b]) => 1 - a <= 1 && a * b <= 1 && a + b - a * b <= 1 && lx(a, b) <= 1),
    lean: 'theorem gate_output_is_one_bit : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 <= 1) ∧ (p.1 * p.2 <= 1) ∧ (p.1 + p.2 - p.1 * p.2 <= 1) ∧ (lxor p.1 p.2 <= 1)) := by decide' },

  // ── NAND functional completeness — the single universal gate real silicon is fabricated from ─────────────────
  { key: 'nand_reconstructs_not',
    why: 'NAND rebuilds NOT: NAND a a = 1 − a·a = 1 − a for a bit — tie a NAND\'s inputs together and it inverts. The first leg of NAND\'s universality.',
    js: () => [0, 1].every((a) => 1 - a * a === 1 - a),
    lean: 'theorem nand_reconstructs_not : [0,1].all (fun a => (1 - a * a) == (1 - a)) := by decide' },

  { key: 'nand_reconstructs_and',
    why: 'NAND rebuilds AND: AND a b = NOT (NAND a b) = 1 − (1 − a·b) = a·b — a NAND followed by a NAND-inverter is an AND. The second leg.',
    js: () => R2.every(([a, b]) => 1 - (1 - a * b) === a * b),
    lean: 'theorem nand_reconstructs_and : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1 * p.2)) == p.1 * p.2) := by decide' },

  { key: 'nand_reconstructs_or',
    why: 'NAND rebuilds OR: OR a b = NAND (NOT a) (NOT b) = 1 − (1−a)(1−b) = a + b − a·b — invert both inputs into a NAND. The third leg.',
    js: () => R2.every(([a, b]) => 1 - (1 - a) * (1 - b) === a + b - a * b),
    lean: 'theorem nand_reconstructs_or : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1) * (1 - p.2)) == p.1 + p.2 - p.1 * p.2) := by decide' },

  { key: 'nand_functionally_complete',
    why: 'NAND is FUNCTIONALLY COMPLETE for {NOT, AND, OR}: across every bit assignment, the three NAND reconstructions all hold at once — so a single gate type generates the whole basis. This is why digital chips are one repeated NAND.',
    js: () => [0, 1, 2, 3].every((n) => { const a = n % 2, b = fdiv(n, 2) % 2; return (1 - a * a === 1 - a) && (1 - (1 - a * b) === a * b) && (1 - (1 - a) * (1 - b) === a + b - a * b) }),
    lean: 'theorem nand_functionally_complete : (List.range 4).all (fun n => ((1 - (n%2) * (n%2)) == (1 - n%2)) ∧ ((1 - (1 - (n%2) * (n/2%2))) == (n%2) * (n/2%2)) ∧ ((1 - (1 - n%2) * (1 - n/2%2)) == (n%2) + (n/2%2) - (n%2) * (n/2%2))) := by decide' },

  { key: 'de_morgan_gate_law',
    why: 'De Morgan in gates: NOT (a AND b) = (NOT a) OR (NOT b), as 1 − a·b = (1−a) + (1−b) − (1−a)(1−b) over bits. The identity that lets a synthesiser push bubbles through gates.',
    js: () => R2.every(([a, b]) => 1 - a * b === (1 - a) + (1 - b) - (1 - a) * (1 - b)),
    lean: 'theorem de_morgan_gate_law : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 * p.2) == (1 - p.1) + (1 - p.2) - (1 - p.1) * (1 - p.2)) := by decide' },

  // ── the arithmetic units — the half-adder, the full-adder, the multiplexer ───────────────────────────────────
  { key: 'half_adder_correct',
    why: 'The HALF-ADDER is correct: sum = XOR a b, carry = AND a b, and sum + 2·carry = a + b over every bit pair. The one-bit addition circuit, proven against its arithmetic meaning.',
    js: () => R2.every(([a, b]) => lx(a, b) + 2 * (a * b) === a + b),
    lean: 'theorem half_adder_correct : [(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 + 2 * (p.1 * p.2) == p.1 + p.2) := by decide' },

  { key: 'full_adder_correct',
    why: 'The FULL-ADDER is correct: sum = XOR (XOR a b) cin, carry = (a+b+cin)/2, and sum + 2·carry = a + b + cin across all eight input rows. The cell every ripple-carry adder chains, proven exact.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].every((n) => { const a = bit(n, 0), b = bit(n, 1), c = bit(n, 2); return lx(lx(a, b), c) + 2 * fdiv(a + b + c, 2) === a + b + c }),
    lean: 'theorem full_adder_correct : (List.range 8).all (fun n => lxor (lxor (n%2) (n/2%2)) (n/4%2) + 2 * ((n%2 + n/2%2 + n/4%2) / 2) == n%2 + n/2%2 + n/4%2) := by decide' },

  { key: 'mux_selects_input',
    why: 'The 2:1 MULTIPLEXER selects: mux s a b = (1−s)·a + s·b equals a when the select is 0 and b when it is 1, across all eight rows. Routing as arithmetic — the primitive every datapath is woven from.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].every((n) => { const s = bit(n, 0), a = bit(n, 1), b = bit(n, 2); return (1 - s) * a + s * b === (s === 0 ? a : b) }),
    lean: 'theorem mux_selects_input : (List.range 8).all (fun n => (1 - n%2) * (n/2%2) + (n%2) * (n/4%2) == (if n%2 == 0 then n/2%2 else n/4%2)) := by decide' },
]

// audit each fact offline, then GENERATE its green `by decide` theorem — the research loop's terminal.
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Hardware.lean', skill: 'hardware', defs: LXOR_DEF,
  header: 'THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational logic, each fact a decidable, axiom-free `by decide` particle.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
