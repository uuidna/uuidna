import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { AuditFormulas } from './index.js'
import '../../mcp/families.js'

/** COMPLIANCE AS FUSION, EXACT. Each formula fuses a few standards' scores: GDPR+ISO+NIST as a plain mean, healthcare
 *  and payment as the weighted sums their frameworks state (HIPAA 0.4 / SOC2 0.35 / NIST 0.25; PCI-DSS 0.45 / CIS 0.3 /
 *  OWASP 0.25), and supply-chain risk as 1/(1 + mean of the four controls) — risk that falls as the controls rise.
 *  Crosses audit → the standards it names. */
test('audit: the compliance fusions are the exact weighted scores, and risk falls as controls rise', async (t) => {
  assert.equal(AuditFormulas.gdprIsoNistFusion(90, 85, 80).value, 85, 'the mean of the three standards')
  assert.equal(AuditFormulas.gdprIsoNistFusion(60, 60, 60).value, 60, 'all equal, the fusion is the same')
  assert.equal(AuditFormulas.healthcareComplianceFusion(90, 85, 80).value, 85.75, 'HIPAA·0.4 + SOC2·0.35 + NIST·0.25')
  assert.equal(AuditFormulas.healthcareComplianceFusion(100, 100, 100).value, 100, 'full compliance scores 100')
  assert.equal(AuditFormulas.paymentSecurityFusion(90, 85, 80).value, 86, 'PCI-DSS·0.45 + CIS·0.3 + OWASP·0.25')
  assert.equal(AuditFormulas.paymentSecurityFusion(100, 100, 100).value, 100)
  assert.equal(AuditFormulas.supplyChainRiskFormula(0, 0, 0, 0).value, 1, 'no controls: maximum risk, 1/(1+0)')
  assert.ok(AuditFormulas.supplyChainRiskFormula(100, 100, 100, 100).value < AuditFormulas.supplyChainRiskFormula(10, 10, 10, 10).value, 'more controls, less risk')
  assert.equal(AuditFormulas.supplyChainRiskFormula(80, 90, 70, 100).value, 1 / (1 + 85), '1/(1 + mean of SLSA, SBOM, SCA, code quality)')
  assert.equal(AuditFormulas.gdprIsoNistFusion(90, 85, 80).dst, 'standards.nist')
  assert.equal(AuditFormulas.paymentSecurityFusion(90, 85, 80).dst, 'standards.owasp')
  assert.equal(AuditFormulas.supplyChainRiskFormula(0, 0, 0, 0).dst, 'audit.risk')
  // supplyChainRiskFormula takes four params; a hex program addresses at most three, so it is checked directly above.
  // five registered: four compliance fusions and the pure reply-fold audit (audit.replies). questions and realtime are
  // the gate (gate.leads, gate.gaps) and are reached through the gate door, not re-registered as swept formulas.
  await verifyHex('audit', 5, [
    ['gdprIsoNistFusion', [90, 85, 80], 85],
    ['gdprIsoNistFusion', [60, 60, 60], 60],
    ['healthcareComplianceFusion', [90, 85, 80], 85.75],
    ['healthcareComplianceFusion', [100, 100, 100], 100],
    ['paymentSecurityFusion', [90, 85, 80], 86],
    ['paymentSecurityFusion', [100, 100, 100], 100],
  ])
  t.diagnostic('5 formulas; GDPR/ISO/NIST mean 85, healthcare 85.75, payment 86, supply-chain risk falling; audit.replies pure; questions/realtime are the gate; crossing to the standards')
})

/** THE UNIT AUDITS ITSELF, ALL TO COURT. questions = open leads, each a hex address audited before it is asked;
 *  replies = the recognition fold that audits every reply; realtime = the live gaps, each routed to court with a
 *  resolve. The rule is simple: everything is sent to court, and the court solves all. */
test('audit.questions / audit.replies / audit.realtime: the unit audits itself and routes to court', async (t) => {
  const replies = AuditFormulas.replies()
  assert.equal(replies.holds, true, 'every reply is audited by its recognition fold')
  assert.equal(replies.value, 1)
  const q = (await AuditFormulas.questions(0)) as unknown as { value: number; holds: boolean; addressed: number; bare: number; court: string }
  assert.equal(q.bare, 0, 'no question is bare — each open lead is a hex address before it is asked')
  assert.equal(q.holds, q.addressed === q.value, 'the audit holds exactly when every question is addressed')
  assert.ok(typeof q.court === 'string' && q.court.includes('court'), 'questions route to court')
  const rt = (await AuditFormulas.realtime(0)) as unknown as { value: number; holds: boolean; routed: number; court: string }
  assert.equal(typeof rt.value, 'number', 'realtime returns a gap count for the slice')
  assert.equal(rt.holds, rt.routed === rt.value, 'the audit holds when every realtime gap is routed to court with a resolve')
  assert.ok(typeof rt.court === 'string' && rt.court.includes('court'), 'realtime routes to court')
  t.diagnostic(`self-audit: replies hold; questions open=${q.value} addressed=${q.addressed}; realtime gaps=${rt.value} routed=${rt.routed} — all to court`)
})
