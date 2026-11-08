import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

// EVERY HEXBIT FOLDER HAS AN INDEX, AND ONE SHARED CONFIG WIRES THEM ALL. Each family is a folder under src/families
// (its hex handle), and src/mcp/families.ts is the single generated config that imports every one of their indices —
// the one import the unit and every framework loads to have all families at will. These tests hold that invariant so
// a folder can never be added without an index, nor left out of the shared config, nor the config wire a folder that
// no longer exists (no hand list, no drift). They read the source tree, so they run from the repo root.
const root = process.cwd()
const famDir = path.join(root, 'src', 'families')
const folders = fs
  .readdirSync(famDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()
const config = fs.readFileSync(path.join(root, 'src', 'mcp', 'families.ts'), 'utf8')

test('there is at least one hexbit family folder', () => {
  assert.ok(folders.length > 0, 'no family folders found under src/families')
})

test('every hexbit folder has an index', () => {
  const missing = folders.filter((n) => !fs.existsSync(path.join(famDir, n, 'index.ts')))
  assert.deepEqual(missing, [], `family folders without index.ts: ${missing.join(', ')}`)
})

test('every family index is wired in the one shared config (families.ts)', () => {
  const unwired = folders.filter((n) => !config.includes(`families/${n}/index.js`))
  assert.deepEqual(unwired, [], `folders not wired in families.ts: ${unwired.join(', ')}`)
})

test('the shared config wires no index that has no folder (no stale wiring)', () => {
  const wired = [...config.matchAll(/families\/([^/]+)\/index\.js/g)].map((m) => m[1])
  const stale = wired.filter((n) => !folders.includes(n))
  assert.deepEqual(stale, [], `wired in families.ts but no folder: ${stale.join(', ')}`)
})
