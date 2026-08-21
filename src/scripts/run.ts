#!/usr/bin/env node
// run — THE ONE DISPATCHER. package.json carried ~49 scripts of a single identical shape,
// "<name>": "npm run build && node dist/scripts/<file>.js" — a hand-typed line per script, which is the same
// repetition the `dry` law refuses in source, living in JSON where no finder was looking. Three of them had already
// rotted (the lean:<domain> family named 30 domains for a ledger that has 66) because a hand-typed list cannot know
// what exists; discovery can.
//
//   npm run x -- <script> [args…]   → run exactly that dist/scripts/<script>.js
//   npm run x                       → list every runnable script, discovered
//
// Named `x` (not `run`) because `npm run run` reads badly and npm reserves no such alias. A script keeps its OWN
// package.json entry only when something outside package.json calls it by name — CI, a git hook, the README or a
// docs page — because those are contracts with the outside world; scriptsGaps() in one-receipt.ts computes exactly
// that set and objects to any thin wrapper that is not in it, so this file cannot rot back into 49 lines.
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { HERE } from './api.js'

/** every dist/scripts/*.js that is a runnable entry point, discovered from disk */
export function runnable(): string[] {
  return readdirSync(HERE)
    .filter((f) => f.endsWith('.js') && !f.endsWith('.d.js') && f !== 'run.js' && f !== 'api.js')
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

const [name, ...rest] = process.argv.slice(2)
if (!name) {
  const all = runnable()
  console.log(`x — run one script by name: npm run x -- <script> [args…]\n\n${all.length} available:\n`)
  for (const s of all) console.log('  ' + s)
  process.exit(0)
}
const path = join(HERE, `${name.replace(/\.js$/, '')}.js`)
if (!existsSync(path)) {
  console.error(`x — no such script "${name}".\nRun \`npm run x\` with no argument to list every available script.`)
  process.exit(1)
}
// the target reads its own flags from argv[2..] — re-seat them so `npm run x -- spin --verify` reaches spin as `--verify`
process.argv = [process.argv[0]!, path, ...rest]
await import(pathToFileURL(path).href)
