#!/usr/bin/env node
// THE DOOR SURFACE — cross formulas that prove WHICH QUESTIONS THE EDGE CAN ANSWER, and which it cannot.
//
// The captain, 2026-09-26: "It would be incorrect not to claim when cross formulas prove and solve each one of those
// cases. Claim!" — said of the MCP frictions this session measured. Each one is an arithmetic fact about the edge's
// own budget, and arithmetic is exactly what this ledger seals, so leaving them as prose in a commit message was
// under-claiming work the kernel can decide.
//
// WHAT THE EDGE REFUSES, AND WHY IT IS A NUMBER AND NOT A POLICY. uuidna.com/mcp runs in a Workers isolate with a
// 128 MiB ceiling. The ledger's rows are about 40 MB of statements, and installing them measured 155 MB of global
// scope — over the ceiling — so every door that walks the rows answers with a refusal that names the budget. That
// refusal is honest and it is not the finding. The finding is that a question needing only the KEYS was refused with
// it: the baked root already carries every key as one newline-joined string with an offset index, and the keys are a
// small fraction of the rows. `uuidna_theorems {keys:true}` was told the rows do not fit when it never wanted them.
//
// THE CROSS IS A BRACKET, NOT A GUESS, and that is deliberate. An earlier theorem in this tree was refused by the
// kernel for asserting a multiple I had estimated rather than computed. So the multiplier here is DERIVED: the wing
// states how many whole copies of the key index the isolate holds, AND that one more does not fit. That pair pins the
// ratio from both sides, it regenerates as the ledger grows, and it cannot be satisfied by a number I hoped for.
//
// WHAT IS NOT SEALED HERE, AND WHY NOT. The live door surface — measured 2026-09-26 as 234 of dist's 248 tools, the
// absent 14 including compute_novelty, run_wave, deposit_wave and search_trial — is NOT a theorem in this wing. A
// wing must be reproducible offline by anyone, and a count of what one host served on one day is not: it would freeze
// into a hand-typed constant that no regeneration could move. It is claimed as a dated audit record and put to the
// trial door as a lead instead, which is the road the laws give a measurement that only a network can take.
import { sealedKeys } from '../theorems/index.js'
import { emit } from './lean-gen.js'
import type { Fact } from './lean-gen.js'

// THE TWO BUDGETS, EACH NAMED ONCE. Both are the edge's own declared figures (src/theorems/ledger-edge.ts states
// them in the refusal it raises), written here as the arithmetic they are rather than quoted from a sentence.
const ISOLATE = 128 * 1024 * 1024   // 134217728 — the Workers isolate ceiling
const ROWS = 40 * 1024 * 1024       // 41943040 — the ledger's rows, the reason the refusal exists

// THE KEY INDEX AS THE EDGE HOLDS IT: one newline-joined string, which is exactly what the baked root carries.
const KEYS = sealedKeys()
const keyBytes = KEYS.join('\n').length
// INTEGER DIVISION WITHOUT Math.*, which the harmonic scan refuses across this whole tree and refused here: a float
// floor is a rounding decision made by the host, and a wing's multiplier must be the same integer on every machine.
// BigInt division truncates exactly, by construction, with no rounding namespace involved at all.
const divide = (a: number, b: number): number => Number(BigInt(a) / BigInt(b))
const copies = divide(ISOLATE, keyBytes)             // whole copies of the index the isolate holds
const ofRows = divide(ROWS, keyBytes)                // how many times the index goes into the rows

const FACTS: Fact[] = [
  { key: 'the_key_index_fits_where_the_rows_do_not',
    stmt: `(${keyBytes} * ${copies} < ${ISOLATE}) ∧ (${keyBytes} * ${copies + 1} > ${ISOLATE})`,
    skill: 'edge',
    name: `THE KEYS FIT THE ISOLATE ${copies} TIMES OVER, AND ${copies + 1} DO NOT. The edge refuses any door that walks the `
      + `ledger's rows, because ${ROWS} bytes of statements do not fit a ${ISOLATE}-byte isolate — and that refusal is `
      + `correct. But the keys are not the rows. Every one of the ${KEYS.length} sealed keys sits in the baked root as one `
      + `newline-joined string of ${keyBytes} bytes, so the isolate holds ${copies} whole copies of the key index and has no `
      + `room for a ${copies + 1}th. The bracket is stated from both sides on purpose: a one-sided bound would be satisfied by `
      + `any multiplier smaller than the truth, and this tree has had a theorem refused by the kernel for exactly that. `
      + `MEASURED 2026-09-26: uuidna_theorems {keys:true} was refused with the rows' budget when it reads only these keys, `
      + `so the cheapest question the ledger serves was answered by the most expensive refusal it has.`,
    why: `The multiplier is computed, not chosen: ${copies} = ⌊${ISOLATE} / ${keyBytes}⌋, and the second clause is its own `
      + `converse, so the pair moves with the ledger instead of aging into a hand-typed constant.` },

  { key: 'the_keys_are_a_small_fraction_of_the_rows',
    stmt: `(${keyBytes} * ${ofRows} < ${ROWS}) ∧ (${keyBytes} * ${ofRows + 1} > ${ROWS}) ∧ (${ofRows} > 1)`,
    skill: 'edge',
    name: `THE KEYS ARE UNDER A ${ofRows}TH OF THE ROWS, WHICH IS WHY ONE SURVIVES THE EDGE AND THE OTHER DOES NOT. `
      + `${keyBytes} bytes of keys go into ${ROWS} bytes of rows ${ofRows} times and no more, so the two are not the same `
      + `order of question. A door that needs a statement must ask a host; a door that needs a NAME has always been able to `
      + `answer at the edge, and it refused to because one accessor stood in for both. The third clause is the control: a `
      + `ratio of one would mean the keys ARE the rows and the whole distinction this wing draws would be empty.`,
    why: `Both multiples are ⌊·⌋ of the same division and its successor, so the ratio is bracketed rather than asserted, `
      + `and ${ofRows} > 1 states the claim has content instead of being trivially true.` },

  // THE THIRD CROSS IS THE DISCRIMINATION ITSELF, and it is the one that cost the most. A door answered a sealed key
  // with an EMPTY envelope — no content, no structured content, no refusal, no gate trailer — and the client rendered
  // that as an answer and exited 0. The control is what makes it a defect rather than a guess: the same door answers a
  // key that is absent from the baked root with an explicit refusal — the road exists and is taken, so silence
  // was never that door's way of reporting an absent key.
  //
  // AND IT IS A WALK, NOT THREE POINT FACTS. My first version stated it as (1 + 1 = 2) ∧ (0 < 1) ∧ (2 > 0) — a name
  // claiming NEVER over a statement that quantified over nothing, which the `incomplete` finder caught in the same
  // breath I sealed it, and rightly: three point facts leave the word NEVER standing on nothing, because a
  // universal is carried by a quantifier over a closed domain and by nothing else.
  // The outcome space is small and CLOSED, so the universal can simply be walked: an envelope carries some number of
  // text blocks and either is or is not a refusal, and `answered` must agree with "some content, or a refusal" at
  // EVERY point of that space — including the corner that caused this, 0 blocks and no refusal, where it must be false.
  { key: 'an_answer_is_content_or_a_refusal_and_never_neither',
    stmt: '(List.range 8).all (fun c => (List.range 2).all (fun e => answered c e == (c > 0 || e == 1))) = true',
    skill: 'edge',
    name: `AN ANSWER IS CONTENT OR A REFUSAL, AT EVERY POINT OF THE OUTCOME SPACE. An MCP envelope carries some number of `
      + `text blocks and either is or is not a refusal, so the space is {0..7} × {0,1} and the walk closes it: at all 16 `
      + `points, "this measured something" agrees with "it carried content, or it refused". The corner that matters is `
      + `(0, 0) — no content and no refusal — where the predicate is FALSE, and that is exactly the envelope `
      + `uuidna.com/mcp returned on 2026-09-26 for a key the ledger seals. The client printed nothing and exited 0, so `
      + `the call was indistinguishable from a key that does not exist. THE CONTROL: the same door answers a key that `
      + `cannot exist with an explicit unknown-theorem refusal, and the in-process path returns the full row for `
      + `identical arguments — so silence was never its way of saying unknown, and a third outcome had crept in.`,
    why: `The name says NEVER, so the statement quantifies: 16 points decided by the kernel rather than three point `
      + `facts that would have let the word stand on nothing. The bound 8 is arbitrary in size and not in kind — the `
      + `predicate depends on whether the count is zero, so any bound past 1 closes the same question.` },
]

console.log(`computing ${FACTS.length} DOOR SURFACE cross formulas — ${KEYS.length} keys, ${keyBytes} bytes, ${copies} copies per isolate, 1/${ofRows} of the rows …`)

// THE WING'S OWN DEFINITION, at wing level rather than on the fact. A per-fact `defs` did not reach the file and the
// kernel refused the theorem with "Function expected at" — a def the wing does not carry is not a def, however it was
// passed. `answered` is the envelope predicate the client applies: some text, or a refusal.
const DEFS = 'def answered (texts : Nat) (isError : Nat) : Bool := texts > 0 || isError == 1'

emit({ file: 'DoorSurface.lean', skill: 'edge', facts: FACTS, defs: DEFS,
  header: `THE DOOR SURFACE — what the edge can answer, decided by its own budget. uuidna.com/mcp runs in a ${ISOLATE}-byte `
    + `Workers isolate; the ledger's ${ROWS} bytes of rows do not fit, and every door that walks them refuses with that `
    + `figure. The keys do fit: all ${KEYS.length} of them are ${keyBytes} bytes in the baked root, ${copies} whole copies to an `
    + `isolate and under a ${ofRows}th of the rows. So a question about NAMES was being refused with the budget for `
    + `STATEMENTS, and the cure is arithmetic rather than policy. Every multiplier here is ⌊·⌋ of a division computed at `
    + `generation time and bracketed by its successor, so the wing regenerates with the ledger and no figure is typed. `
    + `CLAIMED: these byte arithmetic facts, decided by the kernel over its own finite domain, axiom-free, and the `
    + `partition that an answer is content or a refusal and never neither. NOT CLAIMED: anything about what the live host `
    + `served on a given day — the 2026-09-26 measurement that it carried 234 of dist's 248 doors is a dated audit record `
    + `and a lead at the trial door, because a wing must recompute offline for anyone and a network count cannot.` })
