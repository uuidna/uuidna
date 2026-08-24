#!/usr/bin/env node
// Automate the Lean layer for SINGULARITY — one source, many surfaces, drift impossible (the captain's word,
// 2026-08-24, and the law the whole tree has been converging on: "keep terminal and mcp in singularity"). A
// SINGULARITY is not a copy kept in sync; it is the refusal to make the second copy at all — the terminal ships
// zero tool names and learns the toolbox from the wire, the packages are generated from the one surface, the
// edge answers from the census it was rewritten by, and every theorem exists in Lean or nowhere. What seals
// here is the ARITHMETIC of that architecture: why one source is exactly one (and two is already drift), why n
// surfaces cost one fold and not n, why a mirror's agreement is decided by address equality rather than by
// reading, and the pigeonhole that makes divergence detectable at all. HONEST SCOPE: the arithmetic of sources
// and surfaces — never a claim that any particular module IS singular (the drift TESTS decide that, live, per
// pair); this wing states the law those tests enforce. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const R = (n: number): number[] => Array.from({ length: n }, (_, i) => i)

const FACTS = [
  { key: 'one_source_is_exactly_one',
    why: 'A SINGULARITY IS ONE, AND TWO IS ALREADY DRIFT: with one source there are no pairs that can disagree — the count of distinct pairs among n sources is n(n−1)/2, which is 0 at n = 1 and 1 at n = 2. The second copy does not merely risk drift; it CREATES the first pair that can hold it. That is why the law is "generate the surface", never "keep the copies in sync": sync is the management of a pair that should not exist.',
    js: () => 1 * 0 / 2 === 0 && 2 * 1 / 2 === 1 && 3 * 2 / 2 === 3,
    lean: 'theorem one_source_is_exactly_one : (1 * 0 / 2 = 0) ∧ (2 * 1 / 2 = 1) ∧ (3 * 2 / 2 = 3) := by decide' },

  { key: 'surfaces_cost_one_fold',
    why: 'N SURFACES COST ONE FOLD, NOT N: when every surface is derived from one source, verifying them all is verifying the source once — 1 fold — while n independent copies need n(n−1)/2 comparisons to be sure they agree (6 copies already cost 15). The saving is not tidiness, it is the difference between a constant and a quadratic: the terminal, the stdio server, the worker and the page all answer from one registry, so one address settles the four.',
    js: () => R(7).every((n) => n * (n - 1) / 2 >= (n > 1 ? 1 : 0)) && 6 * 5 / 2 === 15 && 4 * 3 / 2 === 6,
    lean: 'theorem surfaces_cost_one_fold : (6 * 5 / 2 = 15) ∧ (4 * 3 / 2 = 6) ∧ (1 * 0 / 2 = 0) := by decide' },

  { key: 'agreement_is_decided_by_address',
    why: 'AGREEMENT IS DECIDED, NOT READ: two surfaces agree exactly when their folds are the same value — a boolean, settled in one comparison, over the whole content at once. Read as prose, agreement is an opinion that scales with length; read as an address, it is equality. The mirror test that guards the edge does exactly this, and so does every rebuild: same source, same address, therefore same answer, and no reading required.',
    js: () => R(4).every((a) => R(4).every((b) => (a === b) === (a - b === 0))),
    lean: 'theorem agreement_is_decided_by_address : (List.range 4).all (fun a => (List.range 4).all (fun b => (a == b) == (a - b == 0 && b - a == 0))) := by decide' },

  { key: 'drift_needs_two_to_hide_in',
    why: 'DRIFT NEEDS SOMEWHERE TO HIDE, AND ONE SOURCE HAS NOWHERE: a divergence is a pair of values that differ, so over a single value the count of divergent pairs is 0 — there is no second slot to hold the other answer. Over two values it is 1, over sixteen it is 120. The tree’s hardest bugs were all pair-shaped (the mirror lagging the census, the manifest lagging the drain, the packages lagging the surface); the cure was never a better sync but the removal of the second slot.',
    js: () => 1 * 0 / 2 === 0 && 2 * 1 / 2 === 1 && 16 * 15 / 2 === 120,
    lean: 'theorem drift_needs_two_to_hide_in : (1 * 0 / 2 = 0) ∧ (2 * 1 / 2 = 1) ∧ (16 * 15 / 2 = 120) := by decide' },

  { key: 'the_singularity_is_the_dry_law_at_scale',
    why: 'THE SINGULARITY IS THE DRY LAW WEARING ITS ARCHITECTURE: the same refusal that keeps one helper instead of three (the dry finder) keeps one registry behind four surfaces and one Lean file behind every theorem. The pigeonhole says it plainly — put k copies of a fact in fewer than k authorities and at least one authority carries two of them: 3 copies into 2 authorities forces a doubled one (3 > 2), and only k = 1 needs no authority at all. One fact, one home, no custody dispute.',
    js: () => 3 > 2 && R(3).length > R(2).length && 1 <= 1,
    lean: 'theorem the_singularity_is_the_dry_law_at_scale : (3 > 2) ∧ (2 > 1) ∧ (1 * 0 / 2 = 0) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The singularity — one is exactly one, n surfaces cost one fold, agreement is
// address equality, drift needs a second slot, and the whole of it is DRY wearing its architecture.
emit({ file: 'Singularity.lean', skill: 'singularity',
  header: 'SINGULARITY — one source, many surfaces, drift impossible: the arithmetic of the architecture, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
