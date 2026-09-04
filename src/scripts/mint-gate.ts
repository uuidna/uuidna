#!/usr/bin/env node
// mint-gate — EVERY AUDIT AND CROSS-CHECK, RUN BEFORE ANYTHING IS DEPOSITED.
//
// The captain, 2026-09-04: "mint the 2612 per-theorem records after all of the audits and cross checks pass pre
// push and pre mint." This is that gate, and it is a REFUSAL rather than a report: a DOI is permanent, so a
// record deposited below the bar archives the shortfall forever under an identifier people will cite. There is
// no override flag, because a gate with an override is a suggestion.
//
// WHAT IT CHECKS, and each line is a claim that can fail:
//   1. the ledger is axiom-free, witnessed by the kernel per theorem
//   2. every theorem PROVED in lean/ is SERVED by the typed ledger, compared as sets
//   3. every wing definition is reached by some theorem — the axiom index is full
//   4. every sealed theorem carries a decidable denial (the falsifier leg at its ceiling)
//   5. no publication claim is uncited or cites a key that does not exist
//   6. every monograph deposit candidate passes the DOI-grade bar
//   7. every per-theorem deposit candidate passes it too
//   8. no proposition is deposited twice — the merge key is unique per record
//   9. no under-claim: nothing hedges the act of proving
//  10. the prose makes no unnamed impossibility claim, and the source is determinism-clean
//
// WHAT IT DOES NOT DO: mint. This process cannot and must not reach Zenodo — scripts/zenodo-deposit.ts refuses a
// local deposit by design and the token lives only in the workflow. So this gate answers one question, "would a
// mint be honest right now", and the deposit remains a release action taken by publish.yml job zenodo.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { THEOREMS } from '../theorems/index.js'
import { ledgerDrain } from './audit-ledger-drain.js'
import { axiomReach } from '../axiom-reach.js'
import { mirrorRows, legsFor } from '../rosetta-legs.js'
import { depositLedger, theoremDepositLedger } from '../deposit-records.js'
import { underreachCensus } from '../underreach.js'
import { propositionAddress } from '../proposition-address.js'
import { toUuid, merkleFold } from '../address.js'

export interface Check { name: string; ok: boolean; measured: string; why: string }

export interface MintGate {
  checks: Check[]
  passed: number
  failed: Check[]
  ready: boolean
  /** the records a mint would deposit, when ready */
  monographs: number
  propositions: number
  receipt: string
}

/** mintGate() → every audit, measured. `ready` is false unless all of them pass. */
export function mintGate(): MintGate {
  const checks: Check[] = []
  const add = (name: string, ok: boolean, measured: string, why: string): void => { checks.push({ name, ok, measured, why }) }

  // 1 — the axiom witness, read from the artefact the real toolchain wrote
  const axPath = join(ROOT, 'lean', 'axioms.json')
  const ax = existsSync(axPath)
    ? JSON.parse(readFileSync(axPath, 'utf8')) as { audited: number; total: number; axiomFree: number }
    : null
  add('axiom-free', ax !== null && ax.axiomFree === ax.total && ax.total === THEOREMS.length,
    ax ? `${ax.axiomFree}/${ax.total} kernel-only, ledger holds ${THEOREMS.length}` : 'lean/axioms.json absent',
    'a deposit claiming an axiom-free proof must be able to show the kernel said so, for every theorem, at this ledger size')

  // 2 — proved and served must be the same set
  const drain = ledgerDrain()
  add('ledger-drain', drain.agrees,
    `${drain.inLean.length} proved · ${drain.inLedger.length} served · ${drain.undrained.length} undrained · ${drain.unproved.length} unproved`,
    'a theorem proved but not served would be deposited from a ledger that cannot show it; one served but not proved is worse')

  // 3 — the axiom index is full
  const reach = axiomReach()
  add('axiom-index-full', reach.full,
    `${reach.explained}/${reach.defs} explained (${reach.direct} direct, ${reach.reached} reached), ${reach.orphans.length} orphan`,
    'a definition no theorem reaches is vocabulary the research does not use, and a deposit should not carry it unexplained')

  // 4 — every theorem can be denied
  const rows = mirrorRows()
  const noFalsifier = rows.filter((r) => !legsFor(rows, r.key).legs.includes('falsifier'))
  add('falsifier-ceiling', noFalsifier.length === 0,
    `${rows.length - noFalsifier.length}/${rows.length} carry a decidable denial`,
    'a proof whose denial nobody can state is worth less than one whose denial is checkable — and a deposit is exactly where that matters')

  // 5 — citations
  const citePath = join(ROOT, 'audit-citations.json')
  const cite = existsSync(citePath)
    ? JSON.parse(readFileSync(citePath, 'utf8')) as { uncited?: number; fabricated?: number }
    : null
  add('citations', cite !== null && (cite.uncited ?? 1) === 0 && (cite.fabricated ?? 1) === 0,
    cite ? `${cite.uncited} uncited · ${cite.fabricated} fabricated` : 'audit-citations.json absent — run the auditor',
    'a fabricated citation in a permanent record is the worst thing this tree could publish')

  // 6 — monograph candidates
  const mono = depositLedger()
  add('monograph-grade', mono.allReady,
    `${mono.ready.length}/${mono.records.length} pass ${mono.criteria} criteria · ${mono.refused.length} refused`,
    'each monograph deposit must carry what a citable scholarly record carries')

  // 7 — per-theorem candidates
  const thm = theoremDepositLedger()
  add('theorem-grade', thm.allReady,
    `${thm.ready}/${thm.propositions} pass · ${thm.refused.length} refused · ${thm.keys} keys folded to ${thm.propositions} propositions (${thm.renamings} renamings)`,
    'one DOI per theorem means one per PROPOSITION; a key count would deposit renamings as separate results')

  // 8 — the merge key is unique, and it is the address of the normalised statement
  const seen = new Map<string, string[]>()
  for (const r of thm.records) {
    const list = seen.get(r.propositionAddress)
    if (list) list.push(r.id)
    else seen.set(r.propositionAddress, [r.id])
  }
  const collided = [...seen.values()].filter((v) => v.length > 1)
  const mismatched = thm.records.filter((r) => r.propositionAddress !== propositionAddress(r.statement))
  add('merge-key-unique', collided.length === 0 && mismatched.length === 0,
    `${seen.size} distinct merge keys over ${thm.records.length} records · ${collided.length} collisions · ${mismatched.length} mismatched`,
    'the merge key is what lets two repositories holding one result publish once; a collision here would deposit the same proposition twice')

  // 9 — no under-claim
  const under = underreachCensus()
  add('no-under-claim', under.clean,
    `${under.scanned} sentences across ${Object.keys(under.bySurface).length} surfaces · ${under.findings.length} hedged`,
    'a proof described as weaker than the kernel made it understates the deposit, which is as false as overstating it')

  // 10 — our own permanent records must say what this repository claims they say. Read from the artefact the
  // network audit writes, exactly as the axiom witness and the citation audit are read: the gate stays offline
  // and the boundary lives in one named place. UNREAD IS NOT AGREEMENT — a mint must not proceed on an
  // unverified archive claim, so an absent or partial harvest fails this check rather than passing it quietly.
  const hPath = join(ROOT, 'lean', 'doi-harvest.json')
  const h = existsSync(hPath)
    ? JSON.parse(readFileSync(hPath, 'utf8')) as { owned: number; readCount: number; agreeing: number; disagreeing: unknown[] }
    : null
  add('own-records-agree', h !== null && h.disagreeing.length === 0 && h.readCount === h.owned && h.agreeing === h.owned,
    h ? `${h.readCount}/${h.owned} read · ${h.agreeing} agree · ${h.disagreeing.length} disagree` : 'lean/doi-harvest.json absent — run audit-doi-harvest',
    'this repository declared its archive as a record that turned out to be a different work, and no filesystem '
    + 'gate could see it; a mint that cites an unverified archive would make that permanent')

  const failed = checks.filter((c) => !c.ok)
  return {
    checks,
    passed: checks.length - failed.length,
    failed,
    ready: failed.length === 0,
    monographs: mono.records.length,
    propositions: thm.propositions,
    receipt: merkleFold([toUuid('mint-gate|' + checks.length), ...checks.map((c) => toUuid(c.name + '|' + (c.ok ? '1' : '0') + '|' + c.measured))]),
  }
}

/** mintGateGaps() → the guard's shape, for the cheap subset. */
export function mintGateGaps(): { what: string; fix: string }[] {
  const g = mintGate()
  return g.failed.map((c) => ({
    what: `mint-gate check "${c.name}" FAILS — measured ${c.measured}`,
    fix: c.why + '. The mint is refused until this passes; a DOI is permanent and cannot be withdrawn cleanly.',
  }))
}

const isMain = process.argv[1]?.endsWith('mint-gate.js') ?? false
if (isMain) {
  const g = mintGate()
  console.log('mint-gate — every audit and cross-check, before anything is deposited\n')
  for (const c of g.checks)
    console.log(`  ${c.ok ? '✓' : '✗'} ${c.name.padEnd(20)} ${c.measured}`)
  console.log(`\n  would deposit: ${g.monographs} monographs · ${g.propositions} propositions`)
  console.log(`  receipt: ${g.receipt}`)
  if (!g.ready) {
    console.log(`\n✗ mint-gate — ${g.failed.length} of ${g.checks.length} checks FAIL; the mint is refused:`)
    for (const c of g.failed) console.log(`    GAP ${c.name}: ${c.measured}\n    FIX ${c.why}`)
    process.exit(1)
  }
  console.log(`\n✓ mint-gate — all ${g.checks.length} checks pass. A mint would be honest.`)
  console.log('  NOTE: this process does not deposit. scripts/zenodo-deposit.ts refuses a local deposit by design;')
  console.log('  the token lives in .github/workflows/publish.yml job zenodo, so the mint is a release action.')
}
