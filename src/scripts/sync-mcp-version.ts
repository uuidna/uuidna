#!/usr/bin/env node
// sync-mcp-version — hold the hosted MCP's advertised version to package.json.
//
// mcp-http.ts states the version it reports to every client calling initialize. It cannot import the manifest
// (rootDir is src, and the module runs at the Workers edge with no filesystem), so the value is written in source
// — and it drifted eleven releases, advertising 0.1.1 while the package reached 0.2.5, because nothing compared
// the two. src/tests/mcp-version.test.ts now compares them, which means every odometer bump FAILS the gate until
// the constant follows. That is safe but it is a remembered step, so this closes the loop: the test catches it,
// this cures it, and develop applies the cure without anyone typing.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

const SRC = join(ROOT, 'src', 'mcp-http.ts')
const RX = /(const SERVER = \{ name: 'uuidna', version: ')([^']+)(' })/
const want = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }).version
const src = readFileSync(SRC, 'utf8')
const found = RX.exec(src)
if (!found) { console.error('✗ sync-mcp-version — the SERVER constant is no longer recognisable in src/mcp-http.ts'); process.exit(1) }
if (found[2] === want) { console.log(`✓ sync-mcp-version — the hosted MCP already advertises ${want}`); process.exit(0) }
writeFileSync(SRC, src.replace(RX, `$1${want}$3`))
console.log(`✓ sync-mcp-version — advertised version ${found[2]} → ${want}`)
