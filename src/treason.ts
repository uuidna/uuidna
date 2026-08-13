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
