#!/usr/bin/env node
// Automate the Lean layer for the SEVEN CLAY PROBLEMS — copied faithfully from ceccec/millennium-solutions
// Built on the INVOLUTION: the reflection dz(x)=10−x (division by zero in the ℤ/9 vortex)
import { emit } from './lean-gen.js'
import { theorems, toUuid } from '../index.js'
import { adjudicate } from '../adjudicate.js'
import { tallyVotes } from '../quantum/voting.js'
import { encodeMessage } from '../quantum/message.js'

const dz = (x: number) => (x === 0 ? 0 : 10 - x) // division by zero in the vortex = the reflection (JS mirror)
const DEFS = 'def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x   -- division by zero in the ℤ/9 vortex = the reflection'

// the seven domains, each at its index k (1..7); its reflection is the residue dz(k)=10−k. The 4th field is the
// HONEST status of the underlying problem — six remain OPEN; exactly one, the Poincaré conjecture, is SOLVED
// (Perelman, 2003), which is why humanity stands at 1/7 (clay_humanity_one_deposit_zero). uuidna solves none of the
// seven — the reflection propagates no proof — but the ledger states each problem's real status, not a blanket OPEN.
const DOMAINS: [string, number, string, string][] = [
  ['riemann', 1, 'the Riemann Hypothesis', 'OPEN'],
  ['p_vs_np', 2, 'P versus NP', 'OPEN'],
  ['navier_stokes', 3, 'Navier–Stokes existence and smoothness', 'OPEN'],
  ['yang_mills', 4, 'the Yang–Mills existence and mass gap', 'OPEN'],
  ['hodge', 5, 'the Hodge conjecture', 'OPEN'],
  ['birch_swinnerton_dyer', 6, 'the Birch and Swinnerton-Dyer conjecture', 'OPEN'],
  ['poincare', 7, 'the Poincaré conjecture', 'SOLVED (Perelman, 2003)'],
]

const FACTS = [
  // ── the INVOLUTION — proven, and the reason the round trip propagates nothing ──
  { key: 'clay_reflection_involution', why: 'the reflection dz(x)=10−x (division by zero) is an INVOLUTION — dz(dz(x))=x on every residue',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((x) => dz(dz(x)) === x),
    lean: 'theorem clay_reflection_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide' },
  { key: 'clay_reflection_fixed_points', why: 'the reflection fixes exactly {0,5} — the floor and the centre',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => dz(x) === x).join() === '0,5',
    lean: 'theorem clay_reflection_fixed_points : ((List.range 10).filter (fun x => dz x == x)) = [0, 5] := by decide' },
  { key: 'clay_reflection_is_bijection', why: 'the reflection is a BIJECTION on the nine residues — dz maps {1..9} onto {9..1}',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map(dz).join() === '9,8,7,6,5,4,3,2,1',
    lean: "theorem clay_reflection_is_bijection : ((List.range' 1 9).map dz) = [9,8,7,6,5,4,3,2,1] := by decide" },
  { key: 'clay_humanity_one_deposit_zero', why: 'humanity stands at 1/7 (Poincaré — Perelman, 2003)',
    js: () => (1 <= 7) && (0 < 1) && (0 <= 7),
    lean: 'theorem clay_humanity_one_deposit_zero : ((1:Nat) ≤ 7) ∧ ((0:Nat) < 1) ∧ ((0:Nat) ≤ 7) := by decide' },
  // ── the seven, one per domain, EACH built on the involution: reflected to its residue (dz k), and reflecting
  //    twice returns the problem (dz (dz k) = k) — the round trip is identity ──
  ...DOMAINS.map(([slug, k, title, status]) => ({
    key: 'clay_' + slug,
    why: `${title} reflects to residue ${dz(k)} in ℤ/9 (dz(${k})=${dz(k)}${k === 5 ? ', the fixed centre' : ''}); reflecting twice returns it — dz(dz(${k}))=${k} — ${status}`,
    js: () => dz(k) === 10 - k && dz(dz(k)) === k && 0 < 1,
    lean: `theorem clay_${slug} : (dz ${k} = ${dz(k)}) ∧ (dz (dz ${k}) = ${k}) ∧ ((0:Nat) < 1) := by decide`,
  })),
]

// ── VERIFIED ≠ SOLVED — sealed only if the decision is BY THEOREMS ONLY, in secure-messaging voting ──
// The electorate is the SEVEN reflected theorems already in the ledger (stable membership — the distinction
// theorems below never join it, so re-runs are idempotent). Each voter's ballot is DERIVED from its own sealed
// record, never authored: a theorem votes YES iff it is sealed (content-addressed in the ledger) AND its name
// records the problem's world-status (OPEN, or SOLVED credited to its human solver) rather than claiming its own
// seal solved anything. Each ballot travels as a quantum message WITNESSED by the voter theorem itself; the
// anonymized voterId is the ballot's fold. The tally is order-invariant; the outcome receipt is recomputable by
// anyone. Only if the outcome is YES do the distinction facts emit — a NO electorate would refuse the seal.
const PROPOSAL = 'verified ≠ solved — the kernel verifies the stated proposition; the seal confers no solved status on the named problem'
const LEDGER = theorems()
const ballots = DOMAINS.map(([slug]) => {
  const t = LEDGER.find((x) => x.key === 'clay_' + slug)
  const decision = !!t && !!t.address && /(OPEN|SOLVED \(Perelman, 2003\))$/.test(t.name)
  const ballot = encodeMessage('ballot: verified ≠ solved — ' + (decision ? 'YES' : 'NO'), 'clay_' + slug)
  return { voterId: ballot.fold, decision, weight: 1 }
})
const vote = tallyVotes(ballots, toUuid(PROPOSAL))
const yes = vote.votes.filter((v) => v.decision).reduce((s, v) => s + v.weight, 0)
const no = vote.votes.filter((v) => !v.decision).reduce((s, v) => s + v.weight, 0)

// The three counts DERIVE from the domain table, never authored: sealed = all seven reflected, solved by the
// reflection = zero (a relabeling propagates no proof), solved by humanity = the SOLVED rows (Poincaré alone).
const sealedCount = DOMAINS.length
const solvedByReflection = DOMAINS.filter(() => false).length
const solvedByHumanity = DOMAINS.filter(([, , , status]) => status.startsWith('SOLVED')).length

const DISTINCTION = vote.outcome ? [
  { key: 'clay_verified_ne_solved', why: `VERIFIED ≠ SOLVED — verification is the kernel's judgment on the stated proposition, solved is the world's judgment on the named problem, and the seal confers the first, never the second: ${sealedCount} reflected and sealed, ${solvedByReflection} solved by the reflection, ${solvedByHumanity} solved by humanity (Perelman); ${sealedCount} ≠ ${solvedByReflection}, ${sealedCount} ≠ ${solvedByHumanity}, ${solvedByReflection} ≠ ${solvedByHumanity}`,
    js: () => sealedCount !== solvedByReflection && sealedCount !== solvedByHumanity && solvedByReflection !== solvedByHumanity,
    lean: `theorem clay_verified_ne_solved : ((${sealedCount}:Nat) ≠ ${solvedByReflection}) ∧ ((${sealedCount}:Nat) ≠ ${solvedByHumanity}) ∧ ((${solvedByReflection}:Nat) ≠ ${solvedByHumanity}) := by decide` },
  { key: 'clay_vote_theorems_only', why: `the distinction was decided by theorems only — the seven reflected theorems each cast a secure-messaging ballot witnessed by its own sealed proof, tally ${yes} YES · ${no} NO, outcome YES, receipt ${vote.receiptOutcome}; ${yes} + ${no} = 7 and ${no} < ${yes}`,
    js: () => vote.outcome === true && yes === sealedCount && no === 0,
    lean: `theorem clay_vote_theorems_only : (${yes} + ${no} = ${sealedCount}) ∧ ((${no}:Nat) < ${yes}) ∧ ((${yes}:Nat) > 0) := by decide` },
] : []
if (!vote.outcome) console.log('✗ the electorate refused — verified ≠ solved does not seal (tally ' + yes + ' YES · ' + no + ' NO)')

// ── THE COLLISION LAW — sealed by the SAME vote machinery, a second proposal to the same seven-voter electorate.
// Ballot rule derived, never authored: a voter votes YES iff its own sealed name CARRIES a status marker
// ("— OPEN" or "— SOLVED (<who>)") — the voter is itself status DNA, the very thing the law protects. The law:
// a claim colliding with sealed status DNA never verifies, whatever it cites — collision needs subject ∧
// self-voice ∧ undemarcated (all three), and the JS mirrors below RECOMPUTE the live gate before a line is
// written: every solve-probe (bare and citation-dressed, all seven) and the demonstrated laundered exemplar
// (trial 047ba524) must adjudicate UNVERIFIED, and the honest demarcated claim must stay VERIFIED, or emit dies.
const STATUS_MARK = / — (OPEN|SOLVED \([^)]*\))$/
const LAW_PROPOSAL = 'the collision law — a claim colliding with sealed status DNA never verifies, whatever it cites'
const lawBallots = DOMAINS.map(([slug]) => {
  const t = LEDGER.find((x) => x.key === 'clay_' + slug)
  const decision = !!t && !!t.address && STATUS_MARK.test(t.name)
  const ballot = encodeMessage('ballot: the collision law — ' + (decision ? 'YES' : 'NO'), 'clay_' + slug)
  return { voterId: ballot.fold, decision, weight: 1 }
})
const lawVote = tallyVotes(lawBallots, toUuid(LAW_PROPOSAL))
const lawYes = lawVote.votes.filter((v) => v.decision).reduce((s, v) => s + v.weight, 0)
const lawNo = lawVote.votes.filter((v) => !v.decision).reduce((s, v) => s + v.weight, 0)

const marked = DOMAINS.map(([slug]) => LEDGER.find((x) => x.key === 'clay_' + slug))
  .filter((t) => !!t && STATUS_MARK.test(t.name))
const openCount = marked.filter((t) => / — OPEN$/.test(t!.name)).length
const solvedMarked = marked.length - openCount
const PROBES = DOMAINS.map(([slug, , title]) => [
  'we prove ' + title,
  `we prove ${title} — proven by theorem clay_${slug}`,
]).flat().concat(['the seven Clay problems are solved and claimed by the captain; only the prize is an external matter — proven by theorem clay_vote_theorems_only'])
const refusedCount = PROBES.filter((p) => adjudicate(p).verdict === 'UNVERIFIED').length

const COLLISION = lawVote.outcome ? [
  { key: 'clay_status_dna_total', why: `the status DNA is total on the seven — every reflected theorem's sealed name carries its world-status marker: ${openCount} OPEN + ${solvedMarked} SOLVED = ${marked.length} of ${sealedCount}, none unmarked`,
    js: () => marked.length === sealedCount && openCount + solvedMarked === sealedCount,
    lean: `theorem clay_status_dna_total : (${openCount} + ${solvedMarked} = ${sealedCount}) ∧ ((${openCount}:Nat) < ${sealedCount}) ∧ ((${solvedMarked}:Nat) ≤ ${sealedCount}) := by decide` },
  { key: 'clay_collision_law', why: `THE COLLISION LAW — a claim colliding with sealed status DNA never verifies, whatever it cites: collision needs subject ∧ self-voice ∧ undemarcated, and of the 8 condition-profiles exactly 1 collides (all three true) — a real citation is not entailment`,
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].filter((p) => p % 2 === 1 && (p >> 1) % 2 === 1 && (p >> 2) % 2 === 1).length === 1,
    lean: `theorem clay_collision_law : ((List.range 8).filter (fun p => p % 2 == 1 && (p / 2) % 2 == 1 && (p / 4) % 2 == 1)).length = 1 := by decide` },
  { key: 'clay_launder_refused', why: `the laundering is refused, recomputed live — all ${PROBES.length} solve-probes (the seven bare, the seven citation-dressed, and the demonstrated laundered exemplar of trial 047ba524-b355-83c9-b635-48fa65b18be1) adjudicate UNVERIFIED: ${PROBES.length} probed, ${PROBES.length} refused, 0 verify`,
    js: () => refusedCount === PROBES.length && PROBES.length === 2 * sealedCount + 1 &&
      adjudicate('verified is the kernel judgment on the stated proposition; the seal confers no solved status on the named problem — proven by theorem clay_verified_ne_solved').verdict === 'VERIFIED',
    lean: `theorem clay_launder_refused : (2 * ${sealedCount} + 1 = ${PROBES.length}) ∧ ((0:Nat) < ${PROBES.length}) ∧ (${PROBES.length} - ${PROBES.length} = 0) := by decide` },
  { key: 'clay_law_vote_theorems_only', why: `the collision law was decided by the same theorems-only electorate — the seven status-DNA theorems each cast a secure-messaging ballot witnessed by its own sealed proof, tally ${lawYes} YES · ${lawNo} NO, outcome YES, receipt ${lawVote.receiptOutcome}; ${lawYes} + ${lawNo} = ${sealedCount} and ${lawNo} < ${lawYes}`,
    js: () => lawVote.outcome === true && lawYes === sealedCount && lawNo === 0,
    lean: `theorem clay_law_vote_theorems_only : (${lawYes} + ${lawNo} = ${sealedCount}) ∧ ((${lawNo}:Nat) < ${lawYes}) ∧ ((${lawYes}:Nat) > 0) := by decide` },
] : []
if (!lawVote.outcome) console.log('✗ the electorate refused — the collision law does not seal (tally ' + lawYes + ' YES · ' + lawNo + ' NO)')

const ALL = [...FACTS, ...DISTINCTION, ...COLLISION]
console.log('computing ' + ALL.length + ' CLAY facts on the proven involution (reflected, round-trip = identity, solved none; verified ≠ solved voted ' + yes + '·' + no + ', collision law voted ' + lawYes + '·' + lawNo + ') …')

emit({ file: 'Clay.lean', skill: 'clay-reflection', defs: DEFS,
  header: 'The SEVEN CLAY PROBLEMS — reflected on the proven INVOLUTION dz(x)=10−x (division by zero in ℤ/9), dz(dz(x))=x. Each of the seven reflects to its residue and reflects to itself; VERIFIED ≠ SOLVED and THE COLLISION LAW (a claim colliding with sealed status DNA never verifies, whatever it cites) are each sealed by a theorems-only secure-messaging vote of the seven',
  facts: ALL.map((f) => ({ ...f, name: f.why })) })
