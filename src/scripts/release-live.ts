#!/usr/bin/env node
// release-live — ASK NPM AND ZENODO WHETHER THE RELEASE IS THERE.
//
// The counterpart to every other gate in this tree, which read the repository. A release lives in two public
// services and the repository is not one of them, so a tree can be internally perfect and describe a release that
// does not exist. That is not hypothetical: on 2026-09-25 package.json said 0.3.1, npm's latest said 0.3.0,
// Zenodo's newest versioned record said 0.3.0, and no v0.3.1 tag existed locally or on the remote. Every gate was
// green. A version had been bumped and the release never cut.
//
// EXIT CODES MATCH audit-doi-harvest, because the distinction is the same one: 1 is a REFUTATION (the services
// answered, and the answer contradicts this tree), 2 is UNREAD (the services did not answer, so nothing was
// learned). A verifier that returns 0 when it could not reach its subject is the vacuous-success class, and a
// release verifier is the single place in the pipeline most exposed to it.
import { writeFileSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { releaseLive } from '../release-live.js'

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { name: string; version: string }
const want = process.argv.find((a) => /^\d+\.\d+\.\d+$/.test(a)) ?? pkg.version

// THE TAG IS WHAT SEPARATES "not cut yet" from "cut and lost". Without it, a version missing from npm is work in
// progress; with it, a release was attempted and did not land. publish.yml runs leads-gate BEFORE publishing, so
// treating the first case as a finding would have deadlocked the pipeline on a true statement.
const tagged = ((): boolean => {
  try { return execFileSync('git', ['tag', '--list', `v${want}`], { encoding: 'utf8' }).trim().length > 0 }
  catch { return false }
})()

const r = await releaseLive(want, pkg.name, tagged)

console.log(`release-live — ${pkg.name}@${want}, as the public record serves it\n`)
for (const c of r.checks) {
  console.log(`  ${c.pending ? '○' : c.unread ? '·' : c.ok ? '✓' : '✗'} ${c.name}`)
  console.log(`      ${c.measured}`)
}
console.log(`\n  npm latest ${r.npmLatest || '(none)'} · zenodo newest ${r.zenodoLatest || '(none)'} · tree ${want}`)
console.log(`  ${r.passed}/${r.checks.length} live · ${r.unread} unread · ${r.pending} pending (v${want} ${tagged ? 'is tagged' : 'has NO tag — not cut'}) · receipt ${r.receipt}`)

writeFileSync(join(ROOT, 'lean', 'release-live.json'), JSON.stringify(r, null, 1) + '\n')

if (r.gaps.length > 0 && r.gaps.some((g) => !g.fix.startsWith('the subject could not be read'))) {
  console.log('\n✗ release-live — the public record does not carry the release this tree describes:')
  for (const g of r.gaps.filter((x) => !x.fix.startsWith('the subject could not be read'))) {
    console.log(`    GAP ${g.what}`)
    console.log(`    WHY ${g.fix}`)
  }
  console.log('\n  FIX if the version was bumped but never cut: `npm run release-cut -- --push` publishes through OIDC.')
  console.log('      if npm carries it and Zenodo does not: publish.yml job zenodo was skipped or failed — re-run it.')
  process.exit(1)
}
if (r.pending > 0 && r.unread === 0) {
  console.log(`\n○ release-live — v${want} has not been cut (no tag), so the registry and the archive cannot carry it yet.`)
  console.log('  Nothing is wrong and nothing is verified. Cut the tag to release: `npm run release-cut -- --push`.')
  process.exit(3)
}
if (r.unread > 0) {
  console.log('\n· release-live — some subjects were UNREAD. Unread is not live:')
  for (const c of r.checks.filter((x) => x.unread)) console.log(`    ${c.name}: ${c.measured}`)
  process.exit(2)
}
console.log('\n✓ release-live — npm and Zenodo both carry this exact release, complete and resolvable.')
