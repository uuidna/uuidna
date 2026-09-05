// mcp-version — the hosted MCP advertises a version to every client that calls initialize, and it drifted to
// eleven releases stale (0.1.1 against a package at 0.2.5) because nothing compared the two. It cannot be
// imported from package.json — rootDir is src, and mcp-http runs at the Workers edge with no filesystem — so the
// constant is stated in source and held to the manifest here. Found by asking the LIVE endpoint what it was.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { PKG_VERSION } from './package-version.js'

test('the hosted MCP advertises the package version', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
  // READ FROM THE ONE CONSTANT NOW, not from a literal in mcp-http.ts. Both doors used to carry their own
  // version string; the stdio one said '6.9.0' against a package at 0.3.0 while the edge one happened to be
  // right, and nothing compared either to the package. This check used to parse the edge literal, so it could
  // only ever have caught one of the two.
  const stated = PKG_VERSION
  assert.ok(stated, 'the version constant must remain readable to this check')
  assert.equal(stated, pkg.version,
    `src/package-version.ts says ${stated} but package.json is ${pkg.version} — bump PKG_VERSION. BOTH MCP doors read it, so every client calling initialize is told the wrong version until you do.`)
})
