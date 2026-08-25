// microdata — A SEALED REPORT AS REUSABLE STRUCTURED DATA, so a figure keeps its honesty class when it leaves
// the page.
//
// The tree's reports are strict about one thing above all: every figure carries its CLASS and its SOURCE. The
// quantum-capacity report says it in its own header — "one honesty class per figure" — reported (the platform's
// own publication, source named) or measured (timed here, on this host). That discipline survives exactly as far
// as the markdown table. The moment anyone lifts a number out of it — a crawler, a citation, another model, a
// slide — the class and the source fall off, and a measured-on-this-host figure becomes an unqualified fact
// about the world. That is the honesty gate's own failure mode, one serialisation downstream of where it looks.
//
// So the report is emitted a second way, machine-first, with the class ATTACHED TO EACH FIGURE rather than
// narrated in the prose around it. schema.org already has the property this tree needs and it is not a
// stretched fit: `measurementTechnique` is precisely "the technique by which this value was determined", which
// is what `reported` and `measured` are. `citation` carries the named source. A consumer that reads only the
// structured form still cannot honestly quote a number without its provenance, because they arrive as one node.
//
// REUSABLE, and that is the point of the shape: nothing here knows about qubits. Any sealed report — capacity,
// coverage, conformance, billing — is a name, a receipt and a list of classed figures, so any of them can reach
// a served .jsonld through this one function. The alternative was a second hand-rolled JSON-LD builder inside
// gen-quantum-capacity, which is the exact drift class schema-org-vocab.ts was extracted to end: one vocabulary,
// one audit, one emitter, not one per file that happens to emit structured data.
//
// HONEST SCOPE: this changes the SERIALISATION, never the claim. It cannot make a figure more true than the
// report already made it; it only stops the qualifier from being lost in transit. Every @type and property it
// emits is vetted in schema-org-vocab.ts and walked by auditJsonLd, the same gate seo.ts and gen-feed.ts pass —
// an unvetted term fails the build rather than shipping as plausible-looking markup.
import { toUuid } from './address.js'
import { urlOf } from './site/index.js'

/** How a figure came to be known. The vocabulary is deliberately small and closed: a report that needs another
 *  class should have to say so here, where the meaning is written down, rather than inventing one at the call
 *  site.
 *    `reported` — someone else's published figure, cited to them.
 *    `measured` — timed or counted by the generator on the build host.
 *    `computed` — derived by arithmetic from the other two; adds no new claim about the world.
 *    `declared`  — true by construction or definition, and asserted by THIS tree about ITSELF.
 *
 *  `declared` is the one that has to exist, and it is the reason this list is closed. The capacity report's
 *  own row (2^128 addresses usable, error-free) is not a measurement and is not anyone's publication — it
 *  follows from how addresses are built. Folding it in with `reported` would dress a self-assertion as a cited
 *  external result, which is precisely the substitution this module exists to prevent; a figure's class is
 *  worth carrying only if the flattering class is unavailable when it does not apply.
 *
 *  `assumed` was ADDED 2026-08-25, by the route this comment invites: a report needed a class the list did not
 *  have, so it is written down here rather than invented at the call site. The quantum-advantage report compares
 *  measured fidelity against "the ~10^-3 two-qubit gate error class", and a multi-source verification pass went
 *  looking for the sources behind that number and refuted every claim it could reach — in both directions. So
 *  the figure is not `reported`: nobody's publication was read to get it. It is not `measured`, `computed` or
 *  `declared` either. It is an ASSUMPTION the comparison runs on, and with only four classes available the
 *  honest choice was between mislabelling it `reported` and dropping the comparison entirely.
 *
 *  That is the failure this vocabulary exists to prevent, arriving from the other side: a closed list is only
 *  honest while it can name every state a real figure occupies, and a missing class pushes a figure into the
 *  nearest flattering one. `assumed` is the unflattering state — a number the report runs on and cannot source
 *  — and naming it costs nothing while leaving it unnamed cost a citation that was never made. */
export type HonestyClass = 'reported' | 'measured' | 'computed' | 'declared' | 'assumed'

export interface Figure {
  /** what this figure is OF, specific enough to stand alone once lifted out of its table row */
  name: string
  value: number | string
  /** the unit, spelled for a reader ('ns per verified fold', 'qubits'); omitted for a dimensionless count */
  unitText?: string
  measurementTechnique: HonestyClass
  /** the source, named — a publication for `reported`, the generator and its conditions for `measured` */
  citation: string
}

export interface SealedReport {
  /** the report's own path segment, e.g. 'quantum-capacity' — its served .jsonld and its @id both derive from it */
  slug: string
  name: string
  description: string
  /** the report's sealed receipt; becomes the Dataset's identifier so the node and the report cannot drift apart */
  receipt: string
  figures: Figure[]
}

export interface Dataset {
  '@context': string
  '@id': string
  '@type': 'Dataset'
  name: string
  description: string
  url: string
  identifier: string
  isAccessibleForFree: true
  variableMeasured: {
    '@type': 'PropertyValue'
    name: string
    value: number | string
    unitText?: string
    measurementTechnique: HonestyClass
    citation: string
  }[]
}

/** reportDataset(report) → the whole Dataset, pure and deterministic: same report in, byte-identical node out,
 *  no clock and no I/O. The caller writes it; tests call it directly. The @id folds the RECEIPT rather than the
 *  slug, so two builds of the same report share an identity and a changed report gets a new one for free. */
export function reportDataset(report: SealedReport): Dataset {
  return {
    '@context': 'https://schema.org',
    '@id': `urn:uuid:${toUuid('report:' + report.slug + ':' + report.receipt)}`,
    '@type': 'Dataset',
    name: report.name,
    description: report.description,
    url: urlOf(`${report.slug}.jsonld`),
    identifier: report.receipt,
    isAccessibleForFree: true,
    variableMeasured: report.figures.map((f) => ({
      '@type': 'PropertyValue' as const,
      name: f.name,
      value: f.value,
      // an absent unit is OMITTED rather than sent as an empty string: a consumer can tell "dimensionless" from
      // "unit unknown" only if the key is missing, and a blank unitText reads as the latter
      ...(f.unitText === undefined ? {} : { unitText: f.unitText }),
      measurementTechnique: f.measurementTechnique,
      citation: f.citation,
    })),
  }
}
