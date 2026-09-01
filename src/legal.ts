// legal — the recomputable legal FACT BASE, delivered in chat. This is NOT a legal audit, legal advice, or a
// compliance opinion, and it must never be presented as one. It gathers the legally-relevant facts a qualified
// attorney or auditor would START from — the licence and its address, the copyright and attribution, the ledger's
// tamper-evident receipt, the project's compliance STANCE (it makes no compliance claim and its own gate refuses
// one), and the standards it CITES (not certifies) — each recomputable by anyone, folded to one receipt. It is the
// evidence() pattern applied to the legal surface: uuidna delivers what recomputes; the ruling is a human's, and a
// court's, never a fold's. Integrity.
import { runTrial } from './trial-run.js'
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
  /** rights that arise AUTOMATICALLY and are therefore asserted rather than applied for */
  rightsAsserted: { right: string; instrument: string; basis: string; automatic: boolean }[]
  /** what use costs — stated beside the rights, because vesting and price are different questions */
  consideration: { nonCommercial: string; commercial: string; contribution: string; note: string }
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
    // ── CLAIM WHAT IS CLAIMABLE, AND ONLY THAT ───────────────────────────────────────────────────────────────
    //
    // Two rights here VEST without registration, fee or filing — which means the only thing that was ever
    // missing is the ASSERTION. An unasserted automatic right is not a stronger right for being modest: in a
    // dispute, the maker and the date are what have to be shown, and a record that never named them makes that
    // harder for no gain.
    //
    // THAT IS ABOUT VESTING, NOT ABOUT PRICE, and the captain corrected an earlier phrasing that blurred the
    // two. uuidna is not free of consideration: non-commercial use needs no licence, COMMERCIAL use is billed
    // the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify), and every
    // publication carries a contribution path (revolut.me/ceccec, noted with the work's own handle URL, in
    // publication-metadata). The rights cost nothing to HOLD; using them commercially is priced, and the price
    // is computed rather than negotiated. Recording only the first half would read as a claim that nothing is
    // owed.
    //
    // WHAT IS DELIBERATELY ABSENT is as much the point. No patent is claimed — the licence is ND and the ledger
    // is published as prior art precisely so nobody, including this project, can enclose it. No trademark
    // registration is claimed, because none has been filed and a claim of one would be false. No compliance
    // opinion is offered; the stance above refuses that in the fact base itself, and this block does not
    // quietly reintroduce it. Asserting a right you hold is not the same act as claiming a status you do not.
    rightsAsserted: [
      {
        right: 'Moral rights — attribution and integrity',
        instrument: 'Berne Convention art. 6bis (as implemented in each member state)',
        basis:
          'Arises on creation for the author, independently of the economic licence and independently of any ' +
          'registry. The CC BY-NC-ND terms carry the same two requirements contractually — attribution, and no ' +
          'derivative works — so the licence and the moral right point the same way; naming the right records ' +
          'that it survives the licence rather than depending on it.',
        automatic: true,
      },
      {
        right: 'Sui generis database right in the sealed ledger and the committed mirror',
        instrument: 'Directive 96/9/EC art. 7 (EU/EEA makers)',
        basis:
          'Protects the MAKER of a database showing substantial investment in obtaining, verifying or presenting ' +
          'its contents — which is what this repository does and can evidence rather than assert: every entry is ' +
          'content-addressed, every theorem is machine-checked and axiom-free, and the verification is ' +
          'recomputable by anyone from the same bytes. The maker is an EU entity (PSG EOOD, Bulgaria, VAT ' +
          'BG130087268), which is the qualifying condition. Independent of copyright in the individual entries: ' +
          'it protects the investment in the collection, not the originality of a row.',
        automatic: true,
      },
    ],
    // the consideration, stated beside the rights so neither half is read alone
    consideration: {
      nonCommercial: 'free, and needs no licence — CC BY-NC-ND 4.0',
      commercial: 'billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify)',
      contribution: 'https://revolut.me/ceccec — carried on every publication, noted with the work\'s own handle URL',
      note: 'The rights above VEST without fee. Use is a separate question, and commercial use is priced by computation rather than by negotiation.',
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
