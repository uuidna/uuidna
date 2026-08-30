// mcp-version — the hosted MCP advertises a version to every client that calls initialize, and it drifted to
// eleven releases stale (0.1.1 against a package at 0.2.5) because nothing compared the two. It cannot be
// imported from package.json — rootDir is src, and mcp-http runs at the Workers edge with no filesystem — so the
// constant is stated in source and held to the manifest here. Found by asking the LIVE endpoint what it was.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'

test('the hosted MCP advertises the package version', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
  const src = readFileSync(join(ROOT, 'src', 'mcp-http.ts'), 'utf8')
  const stated = /const SERVER = \{ name: 'uuidna', version: '([^']+)' \}/.exec(src)?.[1]
  assert.ok(stated, 'the SERVER constant must remain readable to this check')
  assert.equal(stated, pkg.version,
    `mcp-http.ts advertises ${stated} but package.json is ${pkg.version} — update the SERVER constant in src/mcp-http.ts to '${pkg.version}'. Every client calling initialize is being told the wrong version until you do.`)
})
