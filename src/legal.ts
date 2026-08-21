// legal — the recomputable legal FACT BASE, delivered in chat. This is NOT a legal audit, legal advice, or a
// compliance opinion, and it must never be presented as one. It gathers the legally-relevant facts a qualified
// attorney or auditor would START from — the licence and its address, the copyright and attribution, the ledger's
// tamper-evident receipt, the project's compliance STANCE (it makes no compliance claim and its own gate refuses
// one), and the standards it CITES (not certifies) — each recomputable by anyone, folded to one receipt. It is the
// evidence() pattern applied to the legal surface: uuidna delivers what recomputes; the ruling is a human's, and a
// court's, never a fold's. Integrity.
import { runTrial } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { vocabulary } from './vocab.js'
import { forensics } from './forensics.js'

const LICENSE_LINE =
  'CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at uuidna.com/license.'

export interface LegalFacts {
  disclaimer: string
  license: { spdx: string; address: string; attribution: string; canonical: string }
  ledger: { theorems: number; receipt: string; note: string }
  complianceStance: { makesComplianceClaim: boolean; note: string; overclaimRefused: boolean }
  standardsCited: Record<string, string[]>
  forCounsel: string
  receipt: string
}

/** legalFacts() → the recomputable legal fact base. Deterministic: same repo state → same facts → same receipt.
 *  NOT a legal opinion — the inputs an audit starts from. */
export function legalFacts(): LegalFacts {
  const trial = runTrial()
  const standardsCited = vocabulary().standards
  // demonstrate, in the fact base itself, that the project's own gate REFUSES a blanket compliance claim
  const overclaim = 'uuidna is fully legally compliant with all international laws and standards'
  const overclaimRefused = forensics(overclaim).violations.some((v) => v.kind === 'unbacked-law')
  const licenseAddress = toUuid(LICENSE_LINE)
  return {
    disclaimer:
      'THIS IS NOT A LEGAL AUDIT, LEGAL ADVICE, OR A COMPLIANCE OPINION, and must not be presented as one. It is a ' +
      'recomputable inventory of legally-relevant FACTS — the inputs a qualified attorney or auditor starts from, ' +
      'never the conclusion. A real legal audit requires licensed counsel reviewing specific jurisdictions against ' +
      'your actual deployment and use; a content-address cannot settle that. Take these facts to qualified counsel.',
    license: { spdx: 'CC-BY-NC-ND-4.0', address: licenseAddress, attribution: 'Tsvetan Rouschev (ceccec@psg.bg)', canonical: 'https://uuidna.com/license' },
    ledger: { theorems: trial.count, receipt: trial.receipt, note: 'tamper-evident: any change moves the receipt; recompute with `npm run lean`' },
    complianceStance: {
      makesComplianceClaim: false,
      note: 'The project makes NO compliance claim — it disclaims one (privacy by design. See /privacy.',
      overclaimRefused,
    },
    standardsCited,
    forCounsel:
      'These are recomputable inputs. A qualified IP/technology attorney should review them against ' +
      'the relevant jurisdictions (copyright, privacy such as GDPR/CCPA, export/crypto controls, consumer law) and ' +
      'the actual commercial deployment. uuidna delivers what recomputes and leaves the legal ruling to humans.',
    receipt: merkleFold([
      toUuid('license:' + licenseAddress),
      toUuid('ledger:' + trial.receipt),
      toUuid('stance:no-compliance-claim:' + overclaimRefused),
      toUuid('standards:' + Object.keys(standardsCited).length),
    ]),
  }
}
