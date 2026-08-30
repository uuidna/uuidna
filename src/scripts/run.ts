#!/usr/bin/env node
// run — THE ONE DISPATCHER. package.json carried ~49 scripts of a single identical shape,
// "<name>": "npm run build && node dist/scripts/<file>.js" — a hand-typed line per script, which is the same
// repetition the `dry` law refuses in source, living in JSON where no finder was looking. Three of them had already
// rotted (the lean:<domain> family named 30 domains for a ledger that has 66) because a hand-typed list cannot know
// what exists; discovery can.
//
//   npm run x -- court [flags]     → uuidnaOS needs (same as os-mcp-gate; agnostic Alpine applet)
//   npm run x -- <script> [args…]  → run exactly that dist/scripts/<script>.js
//   npm run x                       → list every runnable script, discovered, never declared
//
// Named `x` (not `run`) because `npm run run` reads badly and npm reserves no such alias. A script keeps its OWN
// package.json entry only when something outside package.json calls it by name — CI, a git hook, the README or a
// docs page — because those are contracts with the outside world; scriptsGaps() in one-receipt.ts computes exactly
// that set and objects to any thin wrapper that is not in it, so this file cannot rot back into 49 lines.
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { HERE } from './api.js'
import { bootOS } from '../quantum/os/index.js'

/** every dist/scripts/*.js that is a runnable entry point, discovered from disk */
export function runnable(): string[] {
  return readdirSync(HERE)
    .filter((f) => f.endsWith('.js') && !f.endsWith('.d.js') && f !== 'run.js' && f !== 'api.js')
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

const [name, ...rest] = process.argv.slice(2)
try {
  bootOS()
} catch (e) {
  console.error('x — uuidnaOS REFUSED TO BOOT (hex image did not verify): ' + (e instanceof Error ? e.message : String(e)))
  process.exit(1)
}
if (!name) {
  const all = runnable()
  console.log(`x — uuidnaOS hex booted. uuidna_* via MCP, Alpine via uuidna_exec, firmware scripts after the image.\n\n${all.length} firmware scripts:\n`)
  for (const s of all) console.log('  ' + s)
  process.exit(0)
}
if (name.startsWith('uuidna_')) {
  const { callTool } = await import('../mcp.js')
  const args = name === 'uuidna_exec'
    ? { line: rest.join(' ') }
    : rest[0]?.startsWith('{')
      ? JSON.parse(rest[0]) as Record<string, unknown>
      : {}
  const out = await Promise.resolve(callTool(name, args))
  console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 2))
  process.exit(0)
}
const path = join(HERE, `${name.replace(/\.js$/, '')}.js`)
if (existsSync(path)) {
  process.argv = [process.argv[0]!, path, ...rest]
  await import(pathToFileURL(path).href)
  process.exit(0)
}
const { uuidnaExec } = await import('../quantum/os/exec.js')
const ran = uuidnaExec([name, ...rest].join(' '))
for (const line of ran.output) console.log(line)
process.exit(ran.ok ? 0 : 1)
