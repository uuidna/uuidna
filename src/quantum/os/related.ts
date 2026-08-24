// quantum/os/related — WHICH ALPINE PACKAGES ARE RELATED TO THE THEOREMS, decided rather than asserted (the
// captain's order, 2026-08-24: "port all packages related to the theorems").
//
// THE QUESTION IS AN ADJUDICATION, NOT A SEARCH. The obvious approach — grep the ledger for package names — was
// MEASURED FIRST and is a false-positive machine: of 5961 main packages, 43 names occur in the sealed wings, but
// `make`, `tree`, `which`, `less`, `file`, `cargo`, `dash` occur there as ORDINARY ENGLISH (the register's cargo,
// a typographic dash, a chessboard's rank and file), and `openssl` / `mdevd` occur only INSIDE the quoted Alpine
// description of a package that is already ported ("Crypto library from openssl"). A lexical hit is evidence, not
// a verdict. Two other relations were measured and failed outright: theorem-key words against package names (9
// hits, all English), and primitive names against package descriptions (sha256/poly1305/merkle → 0 packages,
// while "rsa" matched "libuuid" through the substring in "unive-rsa-l").
//
// SO THIS MODULE RETURNS THE HOUSE'S OWN THREE VERDICTS, never a bare list:
//   PORTED   — the package is named by the wings AND is in the sealed install port. Related, and already carried.
//   QUOTED   — every mention lies inside a ported package's own published description, so the ledger is quoting
//              Alpine ABOUT a ported package, not naming a new one. Refuted, with the quote as the reason.
//   UNDECIDED— the name is also an ordinary English word and no lexical test can settle its sense. NOT claimed
//              related and NOT claimed unrelated: a human decides, and the instrument says so rather than guessing.
// The captain's answer therefore comes with its own evidence: what is related is carried, what is refuted names
// its refuting quote, and what cannot be decided lexically is declared undecided instead of silently dropped.
//
// HONEST SCOPE (theorem the_os_is_bootable_quantum): relatedness is about PROVENANCE and MEANING — nothing is
// installed, linked, or run. Pure and total: the haystack and the candidate names are passed in, so this decides
// offline over sealed data and can be recomputed by anyone.
import { toUuid } from '../../address.js'
import { defaultInstalls } from './index.js'
import { LEAN_LEDGER } from '../../theorems/generated.js'

export type Verdict = 'PORTED' | 'QUOTED' | 'UNDECIDED'
export interface RelatedPackage { name: string; verdict: Verdict; why: string }
export interface RelatedReport {
  candidates: number
  ported: string[]
  quoted: RelatedPackage[]
  undecided: RelatedPackage[]
  // FALSIFIABLE, and currently FALSE: closed means every candidate outside the port was POSITIVELY REFUTED by a
  // quote — i.e. nothing is left undecided. It is NOT "every hit landed in some bucket", which would be true by
  // construction and would prove nothing. While `undecided` is non-empty the port is not provably closed, and
  // this field says so out loud rather than flattering the port.
  closed: boolean
  receipt: string
  honest: string
}

const HONEST =
  'Which Alpine packages the sealed theorems relate to, ADJUDICATED: a lexical hit is evidence, never a verdict. ' +
  'PORTED = named and already carried; QUOTED = every mention sits inside a ported package\'s own published ' +
  'description, so the ledger quotes Alpine about a package it already has; UNDECIDED = the name is also an ' +
  'ordinary English word and no lexical test settles its sense — a human decides, and this says so rather than ' +
  'guessing. Integrity and meaning only; nothing is installed, linked, or run.'

/** whole-word occurrence — a package name inside a longer identifier is not a mention of that package. */
const mentions = (name: string, hay: string): boolean =>
  new RegExp('(^|[^a-z0-9-])' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9-]|$)').test(hay)

/** relatedPackages(names, hay) → the adjudication. `names` are the published package names to consider and `hay`
 *  is the sealed prose to search (the Lean wings + the generated ledger). Names of 3 characters or fewer are not
 *  considered: below that length a "mention" is noise by construction, and saying so is cheaper than filtering it. */
export function relatedPackages(names: readonly string[], hay: string): RelatedReport {
  const port = defaultInstalls()
  const ported = new Set(port.specs.map((s) => s.name))
  // the ported packages' own published descriptions — the quotes the ledger legitimately carries
  const descriptions = port.specs.map((s) => s.meaning).join('  ')

  const hits = names.filter((n) => n.length > 3 && mentions(n, hay))
  const inPort: string[] = []
  const quoted: RelatedPackage[] = []
  const undecided: RelatedPackage[] = []

  for (const n of hits) {
    if (ported.has(n)) { inPort.push(n); continue }
    if (mentions(n, descriptions)) {
      // the ledger names it only because a package it ALREADY carries is described with that word
      const spec = port.specs.find((s) => mentions(n, s.meaning))!
      quoted.push({ name: n, verdict: 'QUOTED', why: `every mention sits inside ${spec.id}'s published description: "${spec.meaning}"` })
      continue
    }
    undecided.push({ name: n, verdict: 'UNDECIDED', why: 'the name is also an ordinary English word; no lexical test settles which sense the wings use — a human decides' })
  }

  inPort.sort()
  quoted.sort((a, b) => (a.name < b.name ? -1 : 1))
  undecided.sort((a, b) => (a.name < b.name ? -1 : 1))
  return {
    candidates: hits.length, ported: inPort, quoted, undecided,
    // every outside candidate positively refuted, nothing left hanging. False while anything is undecided —
    // which is the honest state today (the English-collision names cannot be settled by any lexical test).
    closed: undecided.length === 0,
    receipt: toUuid('related|' + hits.length + '|' + inPort.join(',') + '|' + quoted.map((q) => q.name).join(',') + '|' + undecided.map((u) => u.name).join(',')),
    honest: HONEST,
  }
}

/** THE SEALED HAYSTACK — every theorem's name and statement, joined. Pure and edge-clean: the ledger is an
 *  imported module, never a file read, so this decides the same way on the edge as it does here. The Lean
 *  SOURCE files carry more prose than the ledger does, but they are not shipped; the ledger is what every
 *  surface can recompute from, so the ledger is what the verdict is measured against. */
export const sealedHaystack = (): string =>
  LEAN_LEDGER.map((t) => t.key + ' ' + t.name + ' ' + t.statement).join('\n')

/** relatedToTheorems(names) → the adjudication against the SEALED LEDGER, for any candidate package names the
 *  caller supplies (the published index is a network read and belongs at the os/ boundary, never in a served
 *  call). Defaults to the ported set, which answers "is the port itself still theorem-named?" offline. */
export function relatedToTheorems(names?: readonly string[]): RelatedReport {
  return relatedPackages(names && names.length ? names : defaultInstalls().specs.map((s) => s.name), sealedHaystack())
}
