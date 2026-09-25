import { doiPriorArtForLeanFile, ZENODO_SEALS, type ZenodoSeal } from './zenodo-seals.js'
import { theorems, theoremByKey } from './theorems/index.js'

/**
 * NOVELTY — the question uuidna_prior_art leaves to an external anchor, answered where an anchor exists.
 *
 * The limit is that tool's DECLARED BOUNDARY and a real one: a self-signed date carries no priority, because
 * priority is a fact about a registry and not about this repository. So the question is not refused here; it is
 * asked of the registry's own record, which is the only surface that can answer it.
 *
 * That tool mints a defensive-publication record and states its own limit plainly: "the WHEN is NOT in-house —
 * a self-signed date is worthless for priority; it names the external anchor to cite and fakes nothing." The
 * anchor it points at now exists in the registry, so the WHEN is answerable — by citing somebody else's
 * timestamp, which is the only kind that counts.
 *
 * TWO DOIs, TWO QUESTIONS, AND CONFLATING THEM IS THE FAULT THIS MODULE EXISTS TO PREVENT.
 *   WHAT IS THIS WORK — the concept DOI. It resolves to whichever version is current, so a citation of it does
 *   not rot when a new version lands. It carries no date of its own and proves nothing about precedence.
 *   WHEN WAS IT FIRST — the first deposit. Precedence is the earliest version and nothing else.
 * A credit line that cites the concept and means "we were first" is claiming a date from a moving target. Both
 * DOIs travel together here for that reason.
 *
 * WHAT A DEPOSIT DATE PROVES, EXACTLY: that this content existed and was archived by an independent party on
 * that date. That is all. It does NOT prove the idea was original, that nobody held it earlier privately, that
 * no earlier publication exists, or that any claim in the deposit is true. Zenodo timestamps an upload; it does
 * not adjudicate priority. Anyone asserting more than "archived by this date" is reading a receipt as a ruling.
 *
 * THE PUBLIC RUNS THIS. It reads the sealed registry and the ledger, reaches no network, takes no argument that
 * selects a private surface, and returns the same answer for everyone — which is what makes it safe to serve
 * without authentication.
 */

export interface NoveltyAnchor {
  /** the seal this anchor belongs to */
  id: string
  title: string
  /** the DOI that carries the priority date — the earliest version, which never moves */
  firstDoi: string
  /** the date that deposit was published, ISO — the whole of what is proven */
  firstPublished: string
  /** the DOI to CITE: resolves to whichever version is current */
  citeDoi: string
  /** the concept DOI when the deposit series has one */
  conceptDoi?: string
  /** owned by this ledger, or somebody else's work it cites */
  owned: boolean
}

export interface Novelty {
  /** what was asked about — a theorem key or a Lean wing */
  subject: string
  /** the wing the subject sits in, when a key was given */
  wing?: string
  /** external anchors that carry a date for this subject, earliest first */
  anchors: NoveltyAnchor[]
  /** the earliest deposit date across the anchors — the strongest precedence claim available */
  earliest?: string
  /** stated on every answer, because a receipt read as a ruling is the failure mode here */
  proves: string
  refuses: string
}

const PROVES =
  'that this content existed and was archived by an independent party on the stated date, under the stated DOI'
const REFUSES =
  'that the idea was original, that nobody held it earlier privately, that no earlier publication exists, or '
  + 'that any claim inside the deposit is true. An archive timestamps an upload; it does not adjudicate priority'

const anchorOf = (s: ZenodoSeal): NoveltyAnchor | null => {
  const firstDoi = s.firstDoi ?? s.standingDoi
  const firstPublished = s.firstPublished
  if (firstPublished === undefined) return null   // no date, no precedence claim — omitted, never guessed
  return {
    id: s.id,
    title: s.title,
    firstDoi,
    firstPublished,
    citeDoi: s.standingDoi,
    ...(s.conceptDoi === undefined ? {} : { conceptDoi: s.conceptDoi }),
    owned: s.owned,
  }
}

/** Every seal that carries a dated first deposit, earliest first. A seal without a date is omitted, not dated. */
export function noveltyAnchors(): NoveltyAnchor[] {
  return ZENODO_SEALS.map(anchorOf)
    .filter((a): a is NoveltyAnchor => a !== null)
    .sort((a, b) => (a.firstPublished < b.firstPublished ? -1 : a.firstPublished > b.firstPublished ? 1 : 0))
}

/**
 * novelty(subject) → the dated anchors backing a theorem key or a Lean wing.
 *
 * An unknown subject returns no anchors rather than an error: "nothing here carries a date for that" is a true
 * answer and a useful one, where a throw would read as the tool being broken.
 */
export function novelty(subject: string): Novelty {
  const key = subject.trim()
  const asTheorem = theoremByKey().get(key)   // the ledger's own index — a per-call scan is linear, and quadratic in a loop
  const wing = asTheorem?.file ?? (key.endsWith('.lean') ? key : undefined)

  const wanted = new Set<string>()
  if (wing !== undefined) for (const p of doiPriorArtForLeanFile(wing)) wanted.add(p.doi)

  const anchors = noveltyAnchors().filter((a) =>
    wing === undefined
      ? false
      : wanted.has(a.firstDoi) || wanted.has(a.citeDoi) || ZENODO_SEALS.some((s) => s.id === a.id && s.leanFiles?.includes(wing)),
  )

  return {
    subject: key,
    ...(wing === undefined ? {} : { wing }),
    anchors,
    ...(anchors.length === 0 ? {} : { earliest: anchors[0].firstPublished }),
    proves: PROVES,
    refuses: REFUSES,
  }
}
