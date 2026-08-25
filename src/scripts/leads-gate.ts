#!/usr/bin/env node
// leads-gate — THE RELEASE GATE: no version ships while a lead is held.
//
// (the captain's order, 2026-08-25: "next release only possible if all leads verified. lead is anything not
// verified. automate")
//
// A commit may carry leads; that is what work in progress is, and guard already refuses the classes it can decide
// per commit. A RELEASE is a different act — it is telling the world the tree is what it says it is — so this
// runs on the release path and asks the one question the per-commit gate does not: is anything still unverified?
//
// THE READINGS ARE GATHERED HERE, THE VERDICT IS COMPUTED IN src/leads.ts. Same split the tree keeps everywhere:
// spawning and file reading are the boundary's job, the law is the library's, and the law can therefore be driven
// by a test with no checkout (see tests/leads.test.ts, which feeds it the refusals directly).
//
// EVERY SOURCE REPORTS WHETHER IT WAS READ. A source that throws does NOT contribute an empty list — it reports
// UNREAD and blocks, because an unread source and a clean source return the same empty list, and a gate that
// cannot tell them apart is the instrument theorem no_instrument_narrower_than_its_question forbids. This gate
// exists to refuse unverified claims; shipping on a census nobody managed to take would be one.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { leadCensus, renderCensus, read, unread, type Lead, type SourceReading } from '../leads.js'
import { coverage } from '../publish.js'
import { gridGaps, pairsGaps } from '../grid.js'
import { theorems, theoremNeighbours } from '../theorems/index.js'

/** lean/leads.json — the research record. HELD is the open state and carries what it OWES; REFUTED carries the
 *  measurement that killed it and REFUSED the boundary that declines it. The settlement is evidence-bearing in
 *  every case, which is the property that makes "settled" mean something other than "we stopped looking". */
function ledgerLeads(): SourceReading {
  const p = join(ROOT, 'lean', 'leads.json')
  try {
    if (!existsSync(p)) return unread('ledger', `${p} is absent — the research record cannot be read`)
    const j = JSON.parse(readFileSync(p, 'utf8')) as {
      held?: { lead: string; owes?: string }[]
      refuted?: unknown[]; refused?: unknown[]
    }
    if (!Array.isArray(j.held)) return unread('ledger', 'leads.json has no held[] array — a shape drift, not an empty record')
    const open: Lead[] = j.held.map((l) => ({
      source: 'ledger', what: l.lead,
      owes: l.owes ?? 'a `by decide` proof, a measurement that refutes it, or a named boundary that refuses it',
    }))
    return read('ledger', open, (j.refuted?.length ?? 0) + (j.refused?.length ?? 0))
  } catch (e) {
    return unread('ledger', `leads.json could not be parsed (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** the coordinates where the ledger's own structure exposes an unsealed seat — a lonely principle, a broken grid
 *  seat, a pair gap. Each is a place the tree ALREADY KNOWS something is missing, which is the definition. */
function exposeLeads(): SourceReading {
  try {
    // the SAME three walks uuidna_expose serves, from the same primitives — one derivation, so the gate and the
    // served surface can never disagree about what is exposed
    const lonely = theorems().filter((t) => theoremNeighbours(t.key).neighbours.length === 0)
    const open: Lead[] = [
      ...lonely.map((t) => ({ source: 'expose', what: `${t.key} is alone in its principle "${t.principle}" (${t.file})`, owes: 'a second theorem in that principle, or a sealed statement that one is genuinely enough' })),
      ...gridGaps().map((g) => ({ source: 'expose', what: g.what, owes: g.fix })),
      ...pairsGaps().map((g) => ({ source: 'expose', what: g.what, owes: g.fix })),
    ]
    return read('expose', open, theorems().length - lonely.length)
  } catch (e) {
    return unread('expose', `the coordinate walk threw (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** a sealed theorem shown in no monograph is a proof the reader cannot reach — verified in the kernel, unpublished
 *  in the record. HONEST SCOPE: coverage's per-theorem check is implied by its per-FILE one (a publication is
 *  composed of every theorem in its file), so this surfaces uncovered FILES as the load-bearing half. */
function coverageLeads(): SourceReading {
  try {
    const c = coverage()
    const open: Lead[] = c.uncoveredFiles.map((f) => ({
      source: 'coverage', what: `${f} carries sealed theorems and has no publication`,
      owes: 'a PRINCIPLE [file, title, blurb] entry in lean-ledger, so the proofs it holds are reachable by a reader',
    }))
    return read('coverage', open, c.covered)
  } catch (e) {
    return unread('coverage', `the coverage census threw (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** research-leads.json — what the support audit found unreachable and handed to R&D */
function researchLeads(): SourceReading {
  const p = join(ROOT, 'research-leads.json')
  try {
    if (!existsSync(p)) return unread('research', `${p} is absent — run npm run x -- support`)
    const j = JSON.parse(readFileSync(p, 'utf8')) as { leads?: { what?: string; fix?: string }[] }
    if (!Array.isArray(j.leads)) return unread('research', 'research-leads.json has no leads[] array — a shape drift')
    return read('research', j.leads.map((l) => ({
      source: 'research', what: String(l.what ?? 'an unreachable module'),
      owes: String(l.fix ?? 'wire it, or retire it — a module nothing reaches is unverified by construction'),
    })), 0)
  } catch (e) {
    return unread('research', `research-leads.json could not be parsed (${e instanceof Error ? e.message : String(e)})`)
  }
}

/** THE DECLARED SOURCES. Adding one is a line here; the census does the rest, and a source that throws blocks
 *  rather than disappears. */
export const LEAD_SOURCES: readonly (() => SourceReading)[] = [ledgerLeads, exposeLeads, coverageLeads, researchLeads]

export function gatherLeads(): SourceReading[] {
  return LEAD_SOURCES.map((s) => {
    // a source that throws OUTSIDE its own try is still a reading, never a silence
    try { return s() } catch (e) { return unread(s.name || 'anonymous', `the source itself threw (${e instanceof Error ? e.message : String(e)})`) }
  })
}

// THE ARC RUNS ONLY WHEN IT IS THE COMMAND — importing this module gives you the sources, running it renders the
// verdict and exits. Same guard every runner in this tree carries.
if (process.argv[1]?.endsWith('leads-gate.js')) {
  const census = leadCensus(gatherLeads())
  console.log('leads — A LEAD IS ANYTHING NOT VERIFIED. No release ships while one is held.\n')
  for (const line of renderCensus(census)) console.log(line)
  console.log(`\n  receipt ${census.receipt}`)
  if (!census.ready) {
    console.log('\n  Settle a lead by giving it evidence, in lean/leads.json:')
    console.log('    · move it to refuted[] with killed_by — the measurement that killed it')
    console.log('    · move it to refused[] with `boundary` — the named law or scope that declines it')
    console.log('    · or seal it: a `by decide` theorem, after which it is not a lead at all')
    console.log('  A lead is never settled by deletion — the record keeps what was tried.')
  }
  process.exit(census.ready ? 0 : 1)
}
