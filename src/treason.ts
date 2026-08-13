// treason — CATCH TRAITORS AS FAST AS A HERO: one pure, O(N) pass that catches every INTRUSION into the sealed ledger,
// so the check is a single automated call, not a hand-run pre-flight (manual work is the entropy). A "traitor" here is
// never a person — it is a FORGERY in the artifact: a theorem whose DNA does not recompute (a tampered key/statement/
// address), a key or address collision (a smuggled duplicate), an uncovered theorem (a domain sneaked in without a
// monograph), or a broken conformance invariant. Every finding is a recomputable fact about the LEDGER, folded to one
// receipt anyone rechecks. No crypto KATs, no filesystem — pure and fast (milliseconds), so it runs before every push
// AND inline. HONEST SCOPE: integrity, not truth — it proves the artifact is unforged and self-consistent; it does not
// judge a person, and passing it is not a claim the theorems are TRUE, only that none was tampered with or smuggled in.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { coverage } from './publish.js'
import { conformance } from './conformance.js'

export interface Traitor { kind: 'forged-dna' | 'key-collision' | 'address-collision' | 'uncovered' | 'conformance'; detail: string }

export interface TreasonReport {
  clean: boolean
  scanned: number          // theorems checked
  traitors: Traitor[]      // the intrusions caught (empty = clean)
  checks: string[]         // the checks that ran, in order — the hero's sweep
  receipt: string          // clean-or-not folded with the traitors, order-invariant, recomputable
  honest: string
}

/** catchTraitors() → one fast pass over the sealed ledger that catches every forgery/intrusion: DNA that does not
 *  recompute, a key/address collision, an uncovered theorem, or a broken conformance invariant. Pure and O(N) — a
 *  hero's sweep in milliseconds, no crypto and no disk. Returns the traitors (empty = clean) and a recomputable
 *  receipt. A traitor is a forgery in the artifact, NEVER a person. Integrity, not truth. */
export function catchTraitors(): TreasonReport {
  const T = theorems()
  const traitors: Traitor[] = []

  // 1) DNA — every theorem's address IS toUuid(key ":" statement); a tampered key/statement/address breaks exactly one.
  for (const t of T) if (toUuid(t.key + ':' + t.statement) !== t.address)
    traitors.push({ kind: 'forged-dna', detail: `${t.key} — address does not recompute from (key:statement); a tamper or forgery` })

  // 2) COLLISIONS — a key or an address collision is a smuggled duplicate, not a datum.
  const seenKeys = new Set<string>(), seenAddr = new Map<string, string>()
  for (const t of T) {
    if (seenKeys.has(t.key)) traitors.push({ kind: 'key-collision', detail: `${t.key} — duplicate key (a collision would be an intrusion)` })
    seenKeys.add(t.key)
    const prior = seenAddr.get(t.address)
    if (prior && prior !== t.key) traitors.push({ kind: 'address-collision', detail: `${t.key} collides at ${t.address} with ${prior}` })
    seenAddr.set(t.address, t.key)
  }

  // 3) COVERAGE — a theorem shown in no monograph is a domain sneaked in without a PRINCIPLE (uncovered).
  const cov = coverage()
  for (const key of cov.uncovered) traitors.push({ kind: 'uncovered', detail: `${key} — shown in no monograph (author a PRINCIPLE for its file)` })

  // 4) CONFORMANCE — the DNA gate's standing invariants (coins conserved, DNA recomputes, single-source, security).
  const conf = conformance()
  for (const c of conf.checks) if (!c.pass) traitors.push({ kind: 'conformance', detail: `${c.id} — ${c.detail}` })

  const checks = ['dna-recomputes', 'no-key-collision', 'no-address-collision', 'monograph-coverage', 'conformance-invariants']
  const clean = traitors.length === 0
  return {
    clean, scanned: T.length, traitors, checks,
    receipt: merkleGravity([toUuid('treason:' + (clean ? 'clean' : 'caught') + ':' + traitors.length), ...traitors.map((v) => toUuid(v.kind + '|' + v.detail))]),
    honest:
      'Catch traitors as fast as a hero: one O(N) pass proving the ledger is UNFORGED and self-consistent — every ' +
      'theorem\'s DNA recomputes, no key/address collides, every theorem is covered by a monograph, and the ' +
      'conformance invariants hold. A traitor is a FORGERY in the artifact, never a person. Passing is not a claim the ' +
      'theorems are true, only that none was tampered with or smuggled in. Recomputable by anyone. Integrity, not truth.',
  }
}

// ── THE GUARD LESSONS, sealed into uuidna as recomputable checks ────────────────────────────────────────────────
// The lessons that were once only in an agent's private memory — moved HERE, where they recompute for anyone, tied to
// the exact check that enforces each. Trust the check, not the note. A lesson whose `holds` is a boolean is verified
// against the live ledger by catchTraitors; one whose `holds` is 'script' is enforced by `npm run guard` (source/axiom
// checks that need the filesystem), documented here so the WHY is recomputable even where the check is not in-library.
export interface GuardLesson { check: string; lesson: string; enforcedBy: string; holds: boolean | 'script' }

/** guardLessons() → the guard's checks, each with the LESSON it enforces, verified against the live ledger where the
 *  check is in-library and marked 'script' where it lives in `npm run guard`. Folded to one recomputable receipt, so
 *  the operating knowledge lives in uuidna (recomputable), not in a private note (trust-me). Integrity, not truth. */
export function guardLessons(): { lessons: GuardLesson[]; allHold: boolean; receipt: string; honest: string } {
  const t = catchTraitors()
  const held = (...kinds: Traitor['kind'][]): boolean => !t.traitors.some((v) => kinds.includes(v.kind))
  const lessons: GuardLesson[] = [
    { check: 'dna-recomputes', enforcedBy: 'catchTraitors', holds: held('forged-dna'),
      lesson: 'Every theorem\'s address IS toUuid(key ":" statement) — a tampered key/statement/address breaks exactly one; a forgery cannot recompute.' },
    { check: 'no-collision', enforcedBy: 'catchTraitors', holds: held('key-collision', 'address-collision'),
      lesson: 'A key or address collision is a smuggled duplicate — an intrusion, never a datum.' },
    { check: 'monograph-coverage', enforcedBy: 'catchTraitors + lean-ledger PRINCIPLE', holds: held('uncovered'),
      lesson: 'Every new lean-*.ts generator needs a PRINCIPLE [file,title,blurb] entry, or its theorems are uncovered and the push is blocked.' },
    { check: 'conformance-invariants', enforcedBy: 'catchTraitors', holds: held('conformance'),
      lesson: 'The DNA gate: the two coins conserved (=2), DNA recomputes, single-source ledger, security posture clean.' },
    { check: 'determinism', enforcedBy: 'harmonic-scan (npm run guard)', holds: 'script',
      lesson: 'No Math.*/wall-clock/RNG anywhere in src — including comments; the smoke test scans RAW source. Exact integer arithmetic settles the coins, a host intrinsic never can. The guard regex matches the smoke test exactly, so the guard is never laxer than the gate it front-runs.' },
    { check: 'axiom-witness', enforcedBy: 'guard (lean/axioms.json)', holds: 'script',
      lesson: 'Every theorem must be kernel-only (no propext, no Classical.choice); a new/unaudited theorem (audited < ledger) or a borrowed axiom trips it — brought forward of the 12s Lean re-run so it is caught in milliseconds.' },
    { check: 'guard-before-reconcile', enforcedBy: 'npm run guard', holds: 'script',
      lesson: 'Run the 0.29s guard BEFORE the ~4-min reconcile: re-spending the full gate on a catchable error is the measured financial damage of manual work (traitor_damage_sealed_by_same_billing). Fast catch, no re-spend.' },
    { check: 'commit-signed-true', enforcedBy: 'reconcile signCommit', holds: 'script',
      lesson: 'A commit cannot be made unless its message is SIGNED TRUE — cites a real sealed theorem, none fabricated. The message folds with its cited theorems to one gravity root through the abstract-0.' },
  ]
  const allHold = lessons.every((l) => l.holds === true || l.holds === 'script')
  return {
    lessons, allHold,
    receipt: merkleGravity(lessons.map((l) => toUuid(l.check + '|' + l.lesson))),
    honest:
      'The guard\'s operating lessons, sealed into uuidna as recomputable checks — moved out of a private note (trust-me) ' +
      'and tied to the exact check that enforces each, folded to one receipt anyone recomputes. A boolean `holds` is ' +
      'verified against the live ledger now; a \'script\' `holds` is enforced by `npm run guard`. Trust the check, not the ' +
      'note: the knowledge lives where it recomputes. Integrity, not truth.',
  }
}
