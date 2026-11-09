// ship-build — a site is shippable only when it serves the ledger the worker is baked with. Measured 2026-11-09: a site
// built before the last bake shipped beside the new worker, and every row-reading door refused for the new manifest.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { builtSite } from './ship-build.js'

test('builtSite reads whether the site serves the baked root\'s manifest, in both directions', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ship-build-'))
  try {
    writeFileSync(join(dir, 'index.html'), '<!doctype html>')
    mkdirSync(join(dir, 'ledger'))
    writeFileSync(join(dir, 'ledger', 'old-root.json'), '{}')
    assert.equal(builtSite(dir, 'new-root').ledger, false, 'a site holding only an older root is not this bake\'s site')
    writeFileSync(join(dir, 'ledger', 'new-root.json'), '{}')
    assert.equal(builtSite(dir, 'new-root').ledger, true, 'the site serves the baked root')
    assert.equal(builtSite(dir, undefined).ledger, false, 'no baked root is never read as served')
    assert.deepEqual(builtSite(join(dir, 'absent'), 'new-root'), { present: false, index: false, pages: 0, ledger: false })
  } finally { rmSync(dir, { recursive: true, force: true }) }
})
