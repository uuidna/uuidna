import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { PKG_VERSION } from './package-version.js'

// A LITERAL IS ONLY SAFE WITH A GATE. PKG_VERSION is a literal because src/mcp.ts runs on the edge, where there
// is no filesystem to read package.json from — so this test is the thing that keeps it honest.
test('PKG_VERSION IS the shipped package version', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }
  assert.equal(PKG_VERSION, pkg.version,
    `src/package-version.ts says ${PKG_VERSION} and package.json says ${pkg.version} — bump the constant`)
})

// THE DEFECT THIS EXISTS FOR: the stdio MCP door announced '6.9.0', a version that has never existed, to every
// client that connected, while the package was at 0.3.0 and the edge door carried a separate correct literal.
test('no module announces a version by its own literal any more', () => {
  for (const rel of ['src/mcp.ts', 'src/mcp-http.ts']) {
    const src = readFileSync(join(ROOT, rel), 'utf8')
    const literals = [...src.matchAll(/version:\s*'(\d+\.\d+\.\d+)'|VERSION\s*=\s*'(\d+\.\d+\.\d+)'/g)]
    assert.deepEqual(literals.map((m) => m[1] ?? m[2]), [],
      `${rel} announces a hard-coded version — import PKG_VERSION instead`)
    assert.match(src, /PKG_VERSION/, `${rel} must read the one version constant`)
  }
})
