// laws — uuidna's standing invariants, IN uuidna (not in an agent's private notes) and each DEMONSTRATED, not
// asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it, so a reader
// verifies the law rather than trusting the prose. A law with `holds:false` is a red gate. Folds to
// one receipt anyone recomputes from the ledger. Integrity— a law here is only as true as its computed check.
import { theorems } from './theorems/index.js'
import { conformance } from './conformance.js'
import { computes } from './gate.js'
import { toUuid, toUuidOnce } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { axiomsOf, wingAskedKey } from './axiom-report.js'
import { dispositionFor, involutionOf, witnessSealOf, receiptSealOf, receiptSealed, SEALED_BY } from './refusal-trials.js'
import { VE_FACES } from './hexbit/index.js'
import { runEvidenceOf } from './run-evidence.js'
import { auditRecordOf, auditChainBreaks } from './legal-audit.js'
import { RESEARCH_DOORS } from './quantum/os/research/index.js'

/** `said` keeps the captain's own words and date beside the law, so every client of uuidna_laws reads the rule as it
 *  was given — not an agent's paraphrase in a private note */
export interface Law { law: string; said?: string; enforcedBy: string; holds: boolean; detail: string; unmeasured?: string }
/** `unmeasured` names the laws this surface could not measure (their gates, with the reason on each law) — such a law
 *  reports holds:false, never a silent true, and allHold stays false until a surface that can measure it answers */
export interface Laws { laws: Law[]; allHold: boolean; unmeasured: string[]; receipt: string }

/** laws() → the standing development invariants, each with its ENFORCING gate and its recomputed `holds`. Demonstrated,
 *  not claimed; recomputable by anyone. The rules live here, in uuidna — never hand-written into a side note. */
export function laws(): Laws {
  const T = theorems()
  const conf = conformance()
  const check = (id: string): boolean => conf.checks.find((c) => c.id === id)?.pass ?? false
  const unmeasuredOf = (id: string): { unmeasured: string } | Record<string, never> => {
    const why = conf.checks.find((c) => c.id === id)?.unmeasured
    return why ? { unmeasured: why } : {}
  }
  const forged = T.filter((t) => toUuidOnce(t.key + ':' + t.statement) !== t.address).length

  const L: Law[] = [
    { law: 'Generate all only from Lean — the sealed theorems are the single source; the derived layer is computed and diff-gated.',
      enforcedBy: 'conformance:single-source-ledger + the pre-push git-diff', holds: check('single-source-ledger'),
      detail: `every one of ${T.length} theorems is sourced from a lean/*.lean file` },
    { law: 'Any manual fails — every theorem recomputes its content-address; a hand-tampered theorem turns the recompute test red.',
      enforcedBy: 'conformance:ledger-dna-recomputes + recompute.test', holds: forged === 0,
      detail: forged === 0 ? `all ${T.length} addresses recompute; ${forged} forged` : `${forged} theorem(s) do not recompute` },
    { law: 'Honesty is DEMONSTRATED by the gate— a claim citing a theorem that is not sealed drains to 0.',
      enforcedBy: 'the honesty gate (computes/slimGate)', holds: computes('proven in theorem nonexistent_xyz').binary === 0,
      detail: 'a fabricated theorem citation drains; an honest floor signs' },
    { law: 'The two captain coins are conserved — 110 − 108 = 2, the fair-exchange invariant priced on every fold.',
      enforcedBy: 'conformance:captain-coins-conserved', holds: check('captain-coins-conserved'),
      detail: 'coins() = 2, the Euler characteristic −χ of the double torus' },
    { law: 'Zero runtime dependencies and a clean security posture — no third-party code runs; defences + collision-resistance sealed.',
      enforcedBy: 'conformance:security-posture-clean (security-audit)', holds: check('security-posture-clean'),
      ...unmeasuredOf('security-posture-clean'),
      detail: 'zero runtime deps; the honesty gate bites; uuidna solves 0 of 7' },
    { law: 'Lean decides — the kernel\'s own `#print axioms` is the verdict, with no allow list, deny list or hand rule between them.',
      said: 'the captain, 2026-09-14: "remove any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions"',
      enforcedBy: 'axiom-report axiomsOf + axiom-report.test',
      holds: axiomsOf("'k' depends on axioms: [Never.listed]", 'k')?.join() === 'Never.listed'
        && axiomsOf("'k' does not depend on any axioms", 'k')?.length === 0
        && axiomsOf('', 'k') === null,
      detail: 'an axiom nobody listed is reported exactly as the kernel named it; an absent verdict is null, which every reader counts as open' },
    { law: 'Every lead goes to a kernel trial before it enters any list; no wording, map or hand disposition settles one.',
      said: 'the captain, 2026-09-14: "all leads go to trial before entering any list" · "lean decides"',
      enforcedBy: 'refusal-trials dispositionFor + the leads guard finder (leads-conserved)',
      holds: ((t = [{ key: 'k', verdict: 'VERIFIED' as const }]) =>
        dispositionFor({ status: 'lean' }, t) === 'open'
        && dispositionFor({ status: 'lean' }, t, () => false) === 'open'
        && dispositionFor({ status: 'lean' }, t, () => true) === 'verified')(),
      detail: 'without the kernel\'s answer a lead stays open; only the kernel accepting its own theorems verifies it' },
    { law: 'Compute once, save, pass on — a step reads the saved result of the step before, and only for the identical question.',
      said: 'the captain, 2026-09-14: "things need to be remembered at each step instead of saved and passed to the next"',
      enforcedBy: 'axiom-report wingAskedKey + lean-gen savedOleanOf (the .olean addressed by toolchain and text)',
      holds: wingAskedKey('w', ['k'], 'a') === wingAskedKey('w', ['k'], 'a')
        && wingAskedKey('w', ['k'], 'a') !== wingAskedKey('w', ['k'], 'b')
        && wingAskedKey('w', ['k'], 'a') !== wingAskedKey('w ', ['k'], 'a'),
      detail: 'a new toolchain or one moved byte asks again; measured with /usr/bin/time -l under Lean 4.33, EquilibriumXor1 re-elaborated peaks at 5.1 GB in 51.8 s, its saved result answers by import at 401 MB in 0.20 s' },
    { law: 'A saved receipt reads back carrying the device readings taken as it finished, and none where none were saved; a run with no saved log reads as not measured.',
      said: 'the captain, 2026-09-14: "each receipt holds the data. and receipt are saved at once they are computed"',
      enforcedBy: 'run-evidence runEvidenceOf (the reader of dist/evidence) + device-readings appendEvidence (the writer)',
      holds: ((mk = 310000, row = { file: 'k.lean', readings: { ns: '7', die: [{ measured: true, millikelvin: mk, source: 's' }], battery: null } },
        saved = runEvidenceOf('trial-rows', JSON.stringify(row) + '\n'), bare = runEvidenceOf('trial-rows', JSON.stringify({ file: 'k.lean' }) + '\n')) =>
        saved.measured && saved.saved === 1 && saved.latest[0]?.ns === '7' && saved.latest[0]?.dieMax === mk
        && bare.measured && bare.latest[0]?.ns === null && bare.latest[0]?.dieMax === null
        && runEvidenceOf('trial-rows', null).measured === false
        && runEvidenceOf('unnamed-run', JSON.stringify(row) + '\n').measured === false)(),
      detail: 'a receipt saved with its readings reads back with that clock and that die temperature, one saved without them reads back with none, and an absent log or an unknown run is not measured; that each receipt is appended the moment it is computed is appendEvidence\'s, which writes through the host\'s filesystem and is not recomputed here' },
    { law: 'A refutation stands only when it involutes inside Lean — the lead\'s own claim stated as lead_<handle> : Prop and the kernel\'s proof of involution_<handle> : ¬ lead_<handle>; no reader, agent or verifier decides that a theorem settles a lead. Otherwise the lead is reopened by default, its settlement kept word for word.',
      said: 'the captain, 2026-09-14: "reopen by default so no escape for traitors" · "noone can withdraw. only can prove what they meant" · "involute all refuted leads immediately" · on a binding a reader judged decisive: "illegal"',
      enforcedBy: 'refusal-trials involutionOf + trial-refusals settlementOf + the leads gate (a reopened lead blocks a release)',
      holds: involutionOf('abcd1234', [{ key: 'involution_abcd1234', statement: '¬ lead_abcd1234' }])?.refutes === true
        && involutionOf('abcd1234', [{ key: 'involution_abcd1234', statement: 'lead_abcd1234' }])?.refutes === false
        && involutionOf('abcd1234', [{ key: 'involution_abcd1234', statement: '6 * 7 = 7 * 6' }]) === null
        && involutionOf('abcd1234', [{ key: 'directions_number_fortytwo', statement: '¬ lead_abcd1234' }]) === null,
      detail: 'only the exact pair under the lead\'s own handle closes it; a true theorem judged decisive by reading closes nothing — the court recomputes this for every refuted lead on every run' },
    { law: 'Nothing is legal unless signed and sealed by the 2×7 witness rosettas — every one of the VE_FACES (8 + 6) witnesses recomputes the verdict\'s theorem and signs it; a missing, duplicated or fabricated signature leaves it unsealed.',
      said: 'the captain, 2026-09-14: "unless signed and sealed by the 2x7 withness rosettas nothing is legal" · "fuse all and reuse or no way to handle all at once"',
      enforcedBy: 'refusal-trials witnessSealOf (signCommit + merkleGravity over VE_FACES) + trial-refusals settlementOf',
      holds: ((all = Array.from({ length: VE_FACES }, (_, face) => ({ face, statement: `witness ${face} recomputed theorem two_coins` }))) =>
        witnessSealOf('two_coins', all).legal
        && !witnessSealOf('two_coins', all.slice(1)).legal
        && !witnessSealOf('two_coins', [...all.slice(1), { face: 0, statement: 'witness 0 recomputed theorem nonexistent_xyz' }]).legal
        && !witnessSealOf('two_coins', [...all.slice(1), all[1]!]).legal)(),
      detail: 'the seal is a content-address fold, not a private key: it proves the statements exist, agree and cite the sealed proof, not that separate hands wrote them' },
    { law: 'Every receipt is signed by 2×7 theorems — its content address picks VE_FACES (8 + 6) distinct sealed theorems from the ledger, each face signs the receipt citing its own, and their folds seal it; nothing unsealed is stored, and a receipt changed after signing no longer verifies.',
      said: 'the captain, 2026-09-14: "receipts need signatures from 2x7 theorems"',
      enforcedBy: 'refusal-trials receiptSealOf / receiptSealed + the uuidna_evidence deposit door + receipt-verify-qpu',
      holds: ((body = { kind: 'law', n: 1 }, s = receiptSealOf(body), stored = { ...body, [SEALED_BY]: s }) =>
        s.legal && s.signed === VE_FACES && new Set(s.witnesses.map((w) => w.by)).size === VE_FACES
        && receiptSealed(stored)
        && !receiptSealed({ ...stored, n: 2 }))(),
      detail: 'the fourteen theorems are derived from the receipt\'s own address, never listed; the signature is a content-address fold, not a private key' },
    { law: 'Every agent action is audited against the laws as it happens — each tools/call, on stdio and at the edge, leaves one chained record of its addresses, its verdict and the laws\' state.',
      said: 'the captain, 2026-09-14: "fuse all law apis as well so legal audit of all agent actions is in realtime"',
      enforcedBy: 'legal-audit auditCall at both MCP dispatch doors + legal-audit.test',
      holds: ((s = { receipt: 'r', allHold: true, failing: [] as string[] }, secret = 'never-in-the-record') => {
        const a = auditRecordOf(1, 'genesis', 'law', 't', { secret }, null, { clean: true, receipt: 'g' }, s)
        const b = auditRecordOf(2, a.link, 'law', 't', {}, null, { clean: true, receipt: 'g' }, s)
        return !JSON.stringify(a).includes(secret) && auditChainBreaks([a, b]) === null
          && auditChainBreaks([a, { ...b, tool: 'forged' }]) !== null
      })(),
      detail: 'a record keeps only the addresses of the arguments; the chain recomputes, and an altered or removed record breaks it at a named link' },
    { law: 'Research has no special cases — every door is its API\'s facts and its reader, asked the wave\'s topic like every other; what it answers is evidence the court leans.',
      said: 'the captain, 2026-09-14: "there are no special cases. all researched in waves by topic and leaned in court"',
      enforcedBy: 'research RESEARCH_DOORS + research-sources.test (the registry adds nothing to a door)',
      holds: RESEARCH_DOORS.length > 0 && RESEARCH_DOORS.every((d) => Object.keys(d).sort().join() === 'access,base,host,read'),
      detail: `${RESEARCH_DOORS.length} doors, each declaring only host, base, access and reader — no per-door query, override or prose` },
  ]

  const allHold = L.every((l) => l.holds)
  const receipt = merkleGravity(L.map((l) => toUuid(l.law + '|' + l.holds)))
  return { laws: L, allHold, unmeasured: L.filter((l) => l.unmeasured).map((l) => l.enforcedBy), receipt }
}
