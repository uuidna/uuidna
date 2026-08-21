#!/usr/bin/env node
// Automate the Lean layer for THE HANDLE SPAN — what 65536 handles of 32 qubits each come to, and what that total
// is NOT. PURE ARITHMETIC: every number is a power of two or a product of two of them; nothing is measured from the
// world and no ledger count appears, so nothing here drifts.
//
// THE ARITHMETIC. A handle is the uuid's first segment — 8 hex characters, 4 bits each, so 32 bits spanning 2^32.
// Take 2^16 = 65536 such handles and the qubit counts ADD while the spans multiply: 2^16 * 2^5 = 2^21, so the total
// is 2^21 = 2097152 qubits. Multiplication of counts is addition of exponents, and that is the whole derivation.
//
// AND WHAT IT IS NOT — carried on the lines, not in this comment. Two million qubits of SPAN is not two million
// amplitudes: a register of n qubits holds 2^n amplitudes, so 16 qubits is already 65536 complex numbers in memory
// (the shipped MAX_MESSAGE_QUBITS), and 2^21 qubits would demand 2^2097152 of them. The theorems below seal that the
// total exceeds the register rather than fitting inside it, so the span can never be read as a capacity.
import { emit } from './lean-gen.js'

const HANDLES = 16   // 2^16 = 65536 handles
const PER = 5        // 2^5  = 32 qubits each
const TOTAL = HANDLES + PER

const FACTS = [
  { key: 'handles_times_qubits',
    why: 'THE PRODUCT: 65536 handles at 32 qubits each is 2097152 qubits — stated both as the plain multiplication and as the powers of two it is, so the two readings are sealed to be the same number.',
    js: () => 65536 * 32 === 2097152 && 2 ** 16 * 2 ** 5 === 2 ** 21,
    lean: 'theorem handles_times_qubits : (65536 * 32 = 2097152) ∧ ((2:Nat)^16 * 2^5 = 2^21) := by decide' },

  { key: 'exponents_add',
    why: 'WHY IT IS A SHIFT AND NOT A MULTIPLICATION OF QUBITS: counts multiply exactly when exponents add — 16 + 5 = 21. The qubit total is the sum of the two exponents, never their product, and 16 * 5 = 80 differs, which the line proves rather than assumes.',
    js: () => 16 + 5 === 21 && 16 * 5 !== 21,
    lean: 'theorem exponents_add : (16 + 5 = 21) ∧ (16 * 5 ≠ 21) := by decide' },

  { key: 'handle_spans_thirtytwo',
    why: 'ONE HANDLE IS 8 HEX CHARACTERS AT 4 BITS EACH — 32 bits, spanning 2^32 = 4294967296 addresses. The segment length is what fixes the span; nothing else about a handle enters it.',
    js: () => 8 * 4 === 32 && 2 ** 32 === 4294967296,
    lean: 'theorem handle_spans_thirtytwo : (8 * 4 = 32) ∧ ((2:Nat)^32 = 4294967296) := by decide' },

  { key: 'register_holds_amplitudes',
    why: 'A REGISTER OF n QUBITS HOLDS 2^n AMPLITUDES, walked from none to sixteen: [1, 2, 4, …, 65536]. Sixteen qubits is already 65536 complex numbers held at once — the shipped messaging cap, and the reason a qubit count is never a count of things stored.',
    js: () => 2 ** 16 === 65536,
    lean: 'theorem register_holds_amplitudes : ((List.range 17).map (fun n => 2^n)).getLast! = 65536 := by decide' },

  { key: 'total_exceeds_register',
    why: 'THE SPAN IS NOT A CAPACITY, and the refusal is on this line: the 2097152-qubit total is strictly greater than the 16 qubits any shipped register holds, and the two numbers are not equal. A total arrived at by adding exponents describes what can be NAMED, never what can be HELD.',
    // computed into bindings, not compared as literals: TS narrows `2097152 !== 16` to a no-overlap type error,
    // and the point is precisely that the two quantities DIFFER — so compute both, then compare. Same fix the
    // ledger already documents at roman_reads_subtractively.
    js: () => { const total: number = 2 ** TOTAL, reg: number = HANDLES; return total > reg && total !== reg && 2 ** 21 !== 2 ** 16 },
    lean: 'theorem total_exceeds_register : (2097152 > 16) ∧ (2097152 ≠ 16) ∧ ((2:Nat)^21 ≠ 2^16) := by decide' },

  { key: 'total_is_not_amplitudes',
    why: 'AND THE TOTAL IS NOT AN AMPLITUDE COUNT EITHER: 2^21 = 2097152 is the number of QUBITS, while the amplitudes such a register would carry is 2 raised to that — a number this line does not attempt to write. SCOPE: what is sealed here is that the two differ, 2097152 ≠ 65536; the larger quantity is named, never evaluated, and nothing claims it can be realised.',
    js: () => { const total: number = 2 ** TOTAL, amps: number = 2 ** HANDLES; return total !== amps && total > amps },
    lean: 'theorem total_is_not_amplitudes : (2097152 ≠ 65536) ∧ ((2:Nat)^21 > 2^16) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'HandleSpan.lean', skill: 'handle-span', defs: '',
  header: 'THE HANDLE SPAN — what 65536 handles of 32 qubits each come to, and what that total is NOT.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
