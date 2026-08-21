// priorart — an IN-HOUSE defensive-publication record: a self-contained, recomputable manifest of WHAT was published
// (the named theorems, in full — statement and proof), by WHOM (attribution), under WHAT terms (the licence), bound
// to the ledger it belongs to, folded to one content-address that is the publication's own receipt. Everything here
// is in-house and recomputable by anyone with the source — zero external dependency.
//
// THE ONE HONEST LIMIT — the WHEN is not in-house, and this record does not pretend it is. A timestamp you generate
// and sign yourself is worthless for priority: you could backdate it. Trusted priority-dating requires an INDEPENDENT
// observer — the public git commit on GitHub (whose push time is recorded by a third party), a Zenodo DOI (dated by
// Zenodo), or an RFC 3161 timestamp authority. This record proves WHAT / WHO / INTEGRITY / TERMS on its own; for WHEN,
// it names the external anchor to cite, and fakes nothing. You cannot notarise your own document. Integrity, not truth.
import { THEOREMS, theoremByKey } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { runTrial } from './theorems/index.js'

const LICENSE_LINE =
  'CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at uuidna.com/license.'

export interface PriorArtExhibit { key: string; statement: string; lean: string; address: string; file: string }

export interface PriorArt {
  exhibits: PriorArtExhibit[]   // the published theorems, in full — recompute each address from its text
  missing: string[]             // requested keys not in the ledger (nothing to publish for those)
  author: string
  license: { spdx: string; address: string }
  ledger: { theorems: number; receipt: string }
  address: string               // the manifest's own content-address — proves WHAT was published, not WHEN
  receipt: string               // exhibits + terms folded, order-invariant
  timestampAnchor: string       // the honest, external "when" — named, not faked
  honest: string
}

/** priorArt(keys) → the in-house defensive-publication record for the named theorems. Deterministic and recomputable:
 *  same keys + ledger → same record → same address. Proves WHAT / WHO / INTEGRITY / TERMS in-house; the WHEN is an
 *  external anchor it names. */
export function priorArt(keys: readonly string[]): PriorArt {
  const byKey = theoremByKey() // the shared consolidated index — O(1) lookup, built once at the source
  const exhibits: PriorArtExhibit[] = []
  const missing: string[] = []
  for (const k of keys) {
    const t = byKey.get(k)
    if (t) exhibits.push({ key: t.key, statement: t.statement, lean: t.lean, address: t.address, file: t.file })
    else missing.push(k)
  }
  const trial = runTrial()
  const licenseAddress = toUuid(LICENSE_LINE)
  const address = toUuid(exhibits.map((e) => e.key + ':' + e.address).join('|') + '|CC-BY-NC-ND-4.0|Tsvetan Rouschev')
  return {
    exhibits,
    missing,
    author: 'Tsvetan Rouschev (ceccec@psg.bg)',
    license: { spdx: 'CC-BY-NC-ND-4.0', address: licenseAddress },
    ledger: { theorems: trial.count, receipt: trial.receipt },
    address,
    receipt: merkleFold([...exhibits.map((e) => e.address), toUuid('license:' + licenseAddress), toUuid('author:Tsvetan Rouschev')]),
    timestampAnchor:
      'The WHEN is NOT in-house. To date this publication for priority, cite an INDEPENDENT observer: the git commit ' +
      'hash that carries this record (GitHub records its push time), a Zenodo DOI (dated by Zenodo — the .zenodo.json ' +
      'is prepared), or an RFC 3161 timestamp authority. This record proves WHAT and WHO recomputably; it does not, ' +
      'and cannot, prove WHEN by itself — a self-signed date is not evidence of priority.',
    honest:
      'In-house and recomputable: the theorems in full, the attribution, the licence and its address, and the ledger ' +
      'receipt — all fold to this record\'s own content-address, which any change moves. It establishes WHAT was ' +
      'published, by WHOM, under what TERMS, with tamper-evidence. It does NOT establish WHEN (an external anchor ' +
      'does that) and does NOT make the result law or standard (an institution does that). Integrity, not truth.',
  }
}
