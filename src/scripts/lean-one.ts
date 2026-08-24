#!/usr/bin/env node
// lean-one — run exactly ONE lean-<domain> generator, for ad-hoc single-domain debugging. Replaces 30 individual
// npm scripts (lean:quantum, lean:clay, lean:core, ...) that were pure repetition of one shape: npm run lean
// already auto-discovers and runs every one of these via lean-all.ts, so the standalone scripts existed only for
// re-checking ONE domain in isolation without re-proving the other 66. Same discovery lean-all.ts uses, reused
// here rather than a second, driftable list of domain names.
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { HERE } from './api.js'
import { provePending } from './lean-gen.js'
import { capacity } from '../os/host/index.js'

const NOT_A_DOMAIN = new Set(['lean-gen.js', 'lean-ledger.js', 'lean-all.js', 'lean-heartbeats.js', 'lean-one.js'])
const domains = (): string[] =>
  readdirSync(HERE).filter((f) => /^lean-.*\.js$/.test(f) && !NOT_A_DOMAIN.has(f)).map((f) => f.replace(/^lean-/, '').replace(/\.js$/, '')).sort()

const arg = process.argv[2]
if (!arg) {
  console.error('lean:one — usage: npm run lean:one -- <domain>\navailable: ' + domains().join(', '))
  process.exit(1)
}
const file = `lean-${arg.toLowerCase()}.js`
const path = join(HERE, file)
if (!existsSync(path)) {
  console.error(`lean:one — no such domain "${arg}" (looked for ${file})\navailable: ` + domains().join(', '))
  process.exit(1)
}
await import(pathToFileURL(path).href)
// the generator WRITES its wing and queues the kernel call (lean-gen's PENDING); the entry point drains it. One
// domain is one spawn, so the lane count changes nothing here — draining does, because a wing left unproved is a
// generated file nobody signed.
const { failed } = await provePending(capacity().lanes)
if (failed.length) process.exit(1)
