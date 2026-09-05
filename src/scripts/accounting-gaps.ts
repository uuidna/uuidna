#!/usr/bin/env node
// accounting-gaps — EVERY ALPINE SHELL COMMAND IS PORTED OR REFUSED WITH A REASON. Nothing sits unaccounted.
//
// WHAT THIS CLOSES. The shell census read "55 of 345" and said nothing at all about the other 290. That number
// is not wrong and it is not an accounting: a coverage fraction reads as progress while the unmeasured part
// carries no verdict, and the unmeasured part was 84% of the domain. The captain's standing law is that a claim
// something is out of reach must name its reason; this applies the same law to SILENCE — a command with no
// verdict is a claim of nothing, which is the one thing nobody can check.
//
// THE THREE DECIDABLE QUESTIONS, all pure over the sealed port and the refusal register:
//   1. is any command in the universe neither ported nor refused?          (unaccounted → gap)
//   2. is any command BOTH ported and refused?                            (contradiction → gap)
//   3. does any family refuse a name with no cause, or carry no members?   (an empty reason → gap)
//   4. is any name refused by TWO families, or refused under a name no Alpine package provides?
//
// QUESTIONS 4 EXIST BECAUSE BOTH FAULTS HAPPENED. `dircolors-print` was refused for a while and is not a
// command at all — a name I invented while filing, and a refusal for something that does not exist is a
// verdict about nothing. `img` was filed twice, under two different causes, because it was classified from its
// NAME and then reclassified from its package. A name with two reasons is a name with none, and the reason is
// mechanical: refusalOf() returns the FIRST family that lists it, so which cause a reader is shown depends on
// the order of the array rather than on the fact. Both faults are decidable against the catalogue, so neither
// needs to be noticed by eye again.
import { shellCoverage, shellCommandUniverse, catalogueCommandUniverse } from '../quantum/os/shellapi/index.js'
import { REFUSAL_FAMILIES, appletAccounting, refusedNames } from '../quantum/os/refusals/index.js'

export function accountingGaps(): { what: string; fix: string }[] {
  const gaps: { what: string; fix: string }[] = []
  const universe = [...shellCommandUniverse()].sort()
  const ported = shellCoverage().implemented
  const acct = appletAccounting(universe, ported)

  if (acct.unaccounted.length) gaps.push({
    what: `${acct.unaccounted.length} Alpine shell command(s) are neither ported nor refused: ${acct.unaccounted.slice(0, 12).join(', ')}${acct.unaccounted.length > 12 ? ` …and ${acct.unaccounted.length - 12} more` : ''}`,
    fix: 'either port it (src/quantum/os/coreutils + the dispatcher in ../exec) or add it to the family in src/quantum/os/refusals whose cause actually covers it — a command with no verdict is the silent remainder this finder exists to refuse',
  })

  const no = refusedNames()
  const both = ported.filter((c) => no.has(c))
  if (both.length) gaps.push({
    what: `${both.length} command(s) are BOTH ported and refused: ${both.join(', ')}`,
    fix: 'remove each from its refusal family in src/quantum/os/refusals — a port makes its refusal false, and a false reason left standing is worse than an unported applet because nobody re-checks it',
  })

  // a name refused twice resolves to whichever family the array happens to list first, so the cause a reader
  // is shown is an artefact of ordering; the register must carry one cause per name
  const seen = new Map<string, string>()
  for (const f of REFUSAL_FAMILIES) {
    for (const m of f.members) {
      const prior = seen.get(m)
      if (prior !== undefined) gaps.push({
        what: `${m} is refused by two families, so it carries no single reason`,
        fix: `remove ${m} from whichever family does not actually cover it — check which PACKAGE provides it (mirror/alpine-catalogue.tsv, the provides column) rather than reading its name, which is how this fault arises`,
      })
      else seen.set(m, f.cause)
    }
  }
  // a refusal for a name nothing provides is a verdict about nothing
  const allCommands = catalogueCommandUniverse()
  const phantom = [...seen.keys()].filter((n) => !allCommands.has(n))
  if (phantom.length) gaps.push({
    what: `${phantom.length} refused name(s) are not provided by any Alpine package: ${phantom.join(', ')}`,
    fix: 'remove them — a refusal for a command that does not exist is paperwork, and it hides the fact that the real command may be unaccounted for under its actual spelling',
  })
  for (const f of REFUSAL_FAMILIES) {
    if (f.cause.trim().length < 20) gaps.push({
      what: `a refusal family refuses ${f.members.length} command(s) with a cause too short to be a reason: ${JSON.stringify(f.cause)}`,
      fix: 'state the cause: which law of this tree, which missing subject, or which scope boundary refuses them',
    })
    if (f.members.length === 0) gaps.push({
      what: `a refusal family has no members: ${JSON.stringify(f.cause)}`,
      fix: 'delete the family or name what it refuses — an empty family is paperwork for a decision nobody made',
    })
  }
  return gaps
}

const isMain = process.argv[1]?.endsWith('accounting-gaps.js') ?? false
if (isMain) {
  const universe = [...shellCommandUniverse()].sort()
  const acct = appletAccounting(universe, shellCoverage().implemented)
  console.log(`accounting — ${acct.universe} Alpine shell commands · ${acct.ported.length} ported · ${acct.refused.length} refused with a named cause · ${acct.unaccounted.length} unaccounted`)
  const gaps = accountingGaps()
  if (gaps.length) {
    console.log('✗ accounting — ' + gaps.length + ' gap(s), each with its exact fix:')
    for (const g of gaps) console.log('    GAP ' + g.what + '\n    FIX ' + g.fix)
    process.exit(1)
  }
  console.log('✓ accounting — every command in the domain carries a verdict; there is no silent remainder.')
}
