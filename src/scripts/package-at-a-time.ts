#!/usr/bin/env node
// package-at-a-time — AUTOMATE THE NEXT PACKAGE AFTER THE DEFAULT INSTALL, AND RUN IT.
//
// Default install first (100% of alpine-base's closure). If that holds, continue without a hand-off.
// Omit --limit to reverse-and-quantumize the remaining census as one major batch (any language's
// published cmd: is the same shape). `--limit N` still walks N rows through the exec door.
import { runPackageAtATime, renderPackageAtATime } from '../quantum/os/patime/index.js'
import { planAlpineRuns, sandboxTestCommands, renderSandboxSuite } from '../os/runtime/index.js'

function parseLimit(argv: string[]): number | undefined {
  const eq = argv.find((a) => a.startsWith('--limit='))
  if (eq) return Number(eq.slice('--limit='.length))
  const i = argv.indexOf('--limit')
  if (i >= 0) return Number(argv[i + 1])
  return undefined
}

const limit = parseLimit(process.argv)
if (limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
  console.error('package-at-a-time — --limit must be a non-negative integer')
  process.exit(1)
}

if (limit === undefined) {
  const r = runPackageAtATime()
  console.log(renderPackageAtATime(r))
  process.exit(r.boot.complete && r.complete ? 0 : 1)
}

const r = runPackageAtATime(limit, (t, i, n) => {
  if (i === 1 || i === n || i % 1000 === 0) {
    process.stdout.write(`  ${i}/${n} ${t.name} ${t.ok ? 'ok' : 'FAIL'}\n`)
  }
})
console.log(renderPackageAtATime(r))
if (r.commands.length || r.boot.commands.length) {
  const cmds = [...new Set([...r.boot.commands, ...r.commands])]
  const batch = planAlpineRuns(cmds)
  const built = batch.plans.filter((p) => p.plan.ok).length
  console.log(`PLANS ${batch.ok ? 'built' : 'named-refusal'} ${built}/${batch.plans.length} cmd:${batch.reason ? ` (${batch.reason})` : ''}`)
  const sand = sandboxTestCommands(cmds)
  console.log(renderSandboxSuite(sand))
  if (!sand.ok && sand.backend === 'docker') process.exit(1)
}

process.exit(r.boot.complete && r.failed.length === 0 ? 0 : 1)
