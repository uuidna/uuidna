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
import { shellCoverage, shellCommandUniverse } from '../quantum/os/shellapi/index.js'
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
