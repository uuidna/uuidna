// prepublish-seal — THE PUBLICATION LAW (captain, 2026-08-26), as a recomputable gate.
//
// Before each publication: PhD-thesis-quality audit AND publication Lean format — sealed in all vector
// equilibrium of involutions without gaps, granting finite infinities.
//
// Mapped onto this tree's vocabulary (no parallel metaphysics):
//   · thesis audit     → editorial desk clean (drained=0) + publicationStatus.conforms + every note publishable
//   · Lean format      → every publication is composed from a sealed .lean wing; every theorem carries the proof its
//                        row records (`:= by <tactic>`), sorry-free, and the kernel's own `#print axioms` verdict in
//                        lean/axioms.json names no axiom — the tactic is the prover's choice, the verdict is the kernel's
//   · VE of involutions → VectorEquilibrium.lean's full involution/equilibrium set + Wave involution seals, no gap
//   · finite infinities → named theorems that license 2^k / general shapes from finite kernel-checked walks
//
// Zenodo DOI minting stays WORKFLOW-ONLY (zenodo-publish.ts). This seal is what publish.yml / editorial /
// prepublishOnly must pass before any surface ships.
import { existsRoot, rdRoot } from './boundary.js'
import { theorems, theoremByKey } from './theorems/index.js'
import { publications } from './publish.js'
import { editorialState, publicationStatus } from './editorial.js'
import { toUuid } from './address.js'
import { finalSeoAudit } from './seo-freeze.js'
import { quantumAdvantageAudit } from './quantum/advantage/audit/index.js'
import { handlePermanenceAudit } from './handle-permanence.js'
import { publicationMetadataAudit } from './publication-metadata.js'
import { publicationPriorArtAudit } from './publication-prior-art.js'
export {
  VECTOR_EQUILIBRIUM_INVOLUTIONS,
  WAVE_INVOLUTION_SEALS,
  FINITE_INFINITY_GRANTS,
} from './involution-seals.js'
import {
  VECTOR_EQUILIBRIUM_INVOLUTIONS,
  WAVE_INVOLUTION_SEALS,
  FINITE_INFINITY_GRANTS,
} from './involution-seals.js'

/** the kernel's `#print axioms` verdict for one theorem of one wing: [] vouches for the term, a list names what the
 *  proof borrows, null is no verdict — an absent instrument, never read as a pass */
export type KernelVerdict = (key: string, file: string) => string[] | null

/** kernelVerdictOf() → the per-wing verdicts the axiom audit sealed in lean/axioms.json, read as the kernel wrote
 *  them; an unreadable receipt answers null for every key */
export function kernelVerdictOf(): KernelVerdict {
  let wings: Record<string, { verdict?: Record<string, string[]> }> = {}
  try { wings = (JSON.parse(rdRoot('lean/axioms.json')) as { wings?: typeof wings }).wings ?? {} }
  catch { wings = {} }
  return (key, file) => {
    const v = wings[file]?.verdict
    return v && Object.prototype.hasOwnProperty.call(v, key) ? v[key]! : null
  }
}

export interface LeanFormatRow { key: string; tactic: string; lean: string; file: string }

/** leanFormatFault(row, verdict) → why the row cannot stand in a publication, or null when its lean carries the
 *  proof the row records, holds no sorry, and the kernel named no axiom for it. The tactic itself is never judged. */
export function leanFormatFault(t: LeanFormatRow, verdict: KernelVerdict): string | null {
  if (!t.lean.includes(':= by ' + t.tactic)) return 'its lean does not carry the proof its row records (`:= by <tactic>`)'
  if (/\bsorry\b/.test(t.lean)) return 'its proof contains sorry'
  const axioms = verdict(t.key, t.file)
  if (axioms === null) return `the axiom audit (lean/axioms.json) holds no kernel verdict for it in ${t.file}`
  if (axioms.length) return `the kernel names axioms [${axioms.join(', ')}]`
  return null
}

export interface PrepublishGap { what: string; fix: string }
export interface PrepublishSeal {
  ok: boolean
  gaps: PrepublishGap[]
  thesis: { drained: number; unverified: number; usable: number; archiveConforms: boolean; publications: number; publishable: number }
  leanFormat: { wings: number; theorems: number; axiomFree: boolean }
  equilibrium: { required: number; present: number; missing: string[] }
  finiteInfinities: { grants: string[]; present: string[]; missing: string[] }
  seoFreeze: { ok: boolean; pages: number; frozenRoutes: number; drift: number }
  handlePermanence: { ok: boolean; frozenHandles: number; standingDoi: string }
  quantumAdvantage: { ok: boolean; ms: number; levels: number; witnesses: number }
  receipt: string
  honest: string
}

/** prepublishSeal() → thesis-grade readiness for publication. Deterministic from the ledger + editorial artifacts. */
export function prepublishSeal(): PrepublishSeal {
  const gaps: PrepublishGap[] = []
  const byKey = theoremByKey()
  const T = theorems()
  const P = publications()

  // ── 1 · PhD-THESIS-QUALITY AUDIT ──
  let editorial: ReturnType<typeof editorialState>
  try { editorial = editorialState() }
  catch (e) {
    gaps.push({
      what: 'prose-trials.json missing or unreadable — the thesis audit has no desk census',
      fix: 'run `npm run editorial` (derive-prose-trials) so drained/usable are recomputed before publish',
    })
    editorial = { surfaces: 0, paragraphs_tried: 0, usable: 0, unverified: 0, drained: -1, receipt: '' }
  }
  if (editorial.drained !== 0) {
    gaps.push({
      what: `thesis audit RED — ${editorial.drained} DRAINED prose paragraph(s) (hollow / fabricated citation)`,
      fix: 'run `npm run editorial`; clear every DRAINED verdict (cite a sealed theorem or remove the claim)',
    })
  }
  const archive = publicationStatus()
  if (!archive.conforms) {
    gaps.push({
      what: 'archive / license law does not conform (.zenodo.json vs package.json or Zenodo vocabulary)',
      fix: 'run `node dist/scripts/gen-zenodo.js` and fix license drift; publicationStatus().conforms must be true',
    })
  }
  const unpub = P.filter((p) => !p.publishable)
  if (unpub.length) {
    gaps.push({
      what: `publication notes not thesis-clean: ${unpub.map((p) => p.slug).join(', ')}`,
      fix: 'each publication must pass auditPublication (no fabricated theorem cites) — see publish.test.ts',
    })
  }

  // ── 2 · PUBLICATION LEAN FORMAT ──
  const verdict = kernelVerdictOf()
  let axiomFree = true
  for (const p of P) {
    if (!existsRoot(`lean/${p.file}`)) {
      gaps.push({
        what: `publication ${p.slug} has no Lean wing at lean/${p.file}`,
        fix: 'every publication is composed from a sealed lean/*.lean file — restore or regenerate the wing',
      })
    }
    if (p.count < 1 || p.theorems.length !== p.count) {
      gaps.push({
        what: `publication ${p.slug} Lean format broken — count ${p.count} vs theorems ${p.theorems.length}`,
        fix: 'composePublication must read ≥1 sealed theorem from its wing',
      })
    }
    for (const k of p.theorems) {
      const t = byKey.get(k)
      if (!t) {
        gaps.push({ what: `publication ${p.slug} cites missing theorem ${k}`, fix: 'seal the key or drop the cite' })
        axiomFree = false
      } else {
        const fault = leanFormatFault(t, verdict)
        if (fault) {
          gaps.push({
            what: `publication ${p.slug} theorem ${k}: ${fault}`,
            fix: 'publication Lean format admits a theorem the kernel proved sorry-free and axiom-free — run `npm run axioms` or restate the proof',
          })
          axiomFree = false
        }
      }
    }
  }
  const unvouched = T.map((t) => ({ key: t.key, fault: leanFormatFault(t, verdict) })).filter((r) => r.fault !== null)
  if (unvouched.length) {
    axiomFree = false
    gaps.push({
      what: `ledger has ${unvouched.length} theorem(s) the kernel has not vouched sorry-free and axiom-free — publication Lean format requires every proof so vouched`,
      fix: `first offenders: ${unvouched.slice(0, 5).map((r) => `${r.key} (${r.fault})`).join(', ')}`,
    })
  }

  // ── 3 · VECTOR EQUILIBRIUM OF INVOLUTIONS WITHOUT GAPS ──
  const required = [...VECTOR_EQUILIBRIUM_INVOLUTIONS, ...WAVE_INVOLUTION_SEALS]
  const missingEq = required.filter((k) => !byKey.has(k))
  if (missingEq.length) {
    gaps.push({
      what: `vector equilibrium / involution seals have GAPS: ${missingEq.join(', ')}`,
      fix: 'restore VectorEquilibrium.lean + Wave involution theorems (radial_equals_edge, missing_pair_involution, lights_out_flip_involution, …)',
    })
  }
  const veOnDisk = T.filter((t) => t.file === 'VectorEquilibrium.lean').map((t) => t.key)
  for (const k of VECTOR_EQUILIBRIUM_INVOLUTIONS) {
    if (!veOnDisk.includes(k) && byKey.has(k)) {
      gaps.push({
        what: `involution seal ${k} exists but is not in VectorEquilibrium.lean — equilibrium wing has a gap`,
        fix: 'keep the VE involution set inside lean/VectorEquilibrium.lean (single wing, no split)',
      })
    }
  }

  // ── 4 · GRANTING FINITE INFINITIES (named, finite seals) ──
  const missingFi = FINITE_INFINITY_GRANTS.filter((k) => !byKey.has(k))
  if (missingFi.length) {
    gaps.push({
      what: `finite-infinity grant theorems missing: ${missingFi.join(', ')}`,
      fix: 'these finite seals license exponential/general prose WITHOUT infinite proofs — restore them before publish',
    })
  }

  // ── 5 · FINAL SEO AUDIT + URL FREEZE VIA HEXBITS ──
  const seo = finalSeoAudit()
  for (const g of seo.gaps) gaps.push({ what: `seo-freeze: ${g.what}`, fix: g.fix })

  // ── 5b · HANDLE PERMANENCE (DOI-class uuidna.com/<handle>) ──
  const permanence = handlePermanenceAudit()
  for (const g of permanence.gaps) gaps.push({ what: `handle-permanence: ${g.what}`, fix: g.fix })

  // ── 5c · RICH PUBLICATION METADATA + LICENSE IDENTITY (agnostic, all seals) ──
  const pubMeta = publicationMetadataAudit()
  for (const g of pubMeta.gaps) {
    gaps.push({ what: `publication-metadata [${g.id}]: ${g.what}`, fix: g.fix })
  }

  // ── 5d · PRIOR-ART RESEARCH (credit first or captain claim — never unresearched) ──
  const priorArt = publicationPriorArtAudit()
  for (const g of priorArt.gaps) {
    gaps.push({ what: `prior-art [${g.id}]: ${g.what}`, fix: g.fix })
  }

  // ── 6 · measured usable-capacity VERIFY (push-path twin; no remeasure) ──
  // sealed: usable_gap_is_two_to_eighty · n_qubit_dimension (classical bound named, not denied)
  const qa = quantumAdvantageAudit()
  for (const g of qa.gaps) gaps.push({ what: `quantum-advantage: ${g.what}`, fix: g.fix })

  const presentFi = FINITE_INFINITY_GRANTS.filter((k) => byKey.has(k))
  const receipt = toUuid([
    `drained:${editorial.drained}`,
    `pubs:${P.length}`,
    `kernel:${axiomFree}`,
    `eq:${required.length - missingEq.length}/${required.length}`,
    `fi:${presentFi.join(',')}`,
    `seo:${seo.receipt}`,
    `permanence:${permanence.receipt}`,
    `pubmeta:${pubMeta.receipt}`,
    `priorart:${priorArt.receipt}`,
    `qa:${qa.receipt}`,
  ].join('|'))

  return {
    ok: gaps.length === 0,
    gaps,
    thesis: {
      drained: editorial.drained,
      unverified: editorial.unverified,
      usable: editorial.usable,
      archiveConforms: archive.conforms,
      publications: P.length,
      publishable: P.length - unpub.length,
    },
    leanFormat: { wings: P.length, theorems: T.length, axiomFree: axiomFree && unvouched.length === 0 },
    equilibrium: { required: required.length, present: required.length - missingEq.length, missing: missingEq },
    finiteInfinities: { grants: [...FINITE_INFINITY_GRANTS], present: presentFi, missing: missingFi },
    seoFreeze: { ok: seo.ok, pages: seo.pages, frozenRoutes: seo.frozenRoutes, drift: seo.routeDrift.length },
    handlePermanence: { ok: permanence.ok, frozenHandles: permanence.frozenHandles, standingDoi: permanence.standingDoi },
    quantumAdvantage: { ok: qa.ok, ms: qa.ms, levels: qa.levels, witnesses: qa.witnesses },
    receipt,
    honest:
      'Thesis audit = editorial drained=0 + archive conformance + publishable notes. Lean format = every ' +
      'publication from a sealed wing whose every theorem the kernel checked sorry-free and axiom-free (lean/axioms.json), ' +
      'whatever tactic proved it. Vector equilibrium of involutions = VE + Wave involution keys ' +
      'all present (missing_pair_involution names the gap shape). Finite infinities = named finite kernel-checked ' +
      'grants (involution_replaces_the_raised_ceiling, n_qubit_dimension, …) — never an infinite proof claim. ' +
      'SEO freeze = lean/seo-url-map.json route↔hexbit doors. Handle permanence = uuidna.com/<handle> is ' +
      'DOI-class (bidirectional DOI↔handle seals; no churn after freeze). Publication metadata = one rich schema ' +
      'for all seals + license identity (CC-BY-NC-ND-4.0 only). Prior-art research = every seal credits found ' +
      'DOI/proving links first (captain next) or explicitly claims when missing. Quantum advantage = VERIFY sealed report ' +
      '(usable_gap_is_two_to_eighty) without remeasure. Zenodo DOI remains workflow-only.',
  }
}
