// skills — the migration gate. Every theorem's skill must be AUTHORED at the Lean source (a manifest `skill` for
// generated files, or an inline `-- @skill:` for the hand-written trio).
// This test fails the moment a new theorem lands without an authored skill — so the heuristic stays retired and the
// capability axis can't silently drift back to a word-list.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems } from '../index.js'
import { ROOT } from '../boundary.js'

const LEAN = join(ROOT, 'lean')

test('every theorem carries an INLINE-authored skill — skillOf is retired (0 fallback)', () => {
  const authored = new Set<string>()
  for (const f of readdirSync(LEAN)) {
    if (f.endsWith('-manifest.json')) {
      for (const e of JSON.parse(readFileSync(join(LEAN, f), 'utf8')) as { key: string; skill?: string }[]) {
        if (e.skill) authored.add(e.key)
      }
    } else if (f.endsWith('.lean')) {
      for (const mm of readFileSync(join(LEAN, f), 'utf8').matchAll(/--\s*@skill:\s*([\w-]+)\s*\n\s*theorem\s+(\w+)/g)) authored.add(mm[2])
    }
  }
  const fallback = theorems().filter((t) => !authored.has(t.key))
  assert.equal(fallback.length, 0, `theorems missing an authored skill (add a manifest skill or an inline -- @skill:): ${fallback.map((t) => t.key).join(', ')}`)
})
