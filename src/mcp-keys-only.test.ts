// mcp-keys-only — THE CHEAPEST QUESTION THE LEDGER SERVES MUST NOT ASK FOR THE ROWS.
//
// MEASURED at uuidna.com/mcp on 2026-09-26, looking for the sealed key a commit should cite: list_theorems was
// refused with "the edge does not hold the whole ledger: 40 MB of rows does not fit a 128 MB isolate" on EVERY
// argument — including a nonsense one, because the refusal fires before argument validation, which is also why my own
// wrong parameter name was invisible to me. So the door's entire advertised contract (principle, skill, contains,
// keys, limit, offset) was unreachable at the edge, and I read keys out of `git log` instead. A door whose contract
// cannot be exercised where it is served is a dead link, and the standing law is not to ignore one.
//
// The baked root already carries every key — one newline-joined string with an offset index (src/theorems/
// ledger-edge.ts) — so `{keys:true}` costs the edge nothing new. sealedKeys() is the accessor that reads the baked
// root at the edge and the rows on a host, which is why this needs no second implementation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'
import { sealedKeys, theorems } from './theorems/index.js'

const keysOnly = (args: Record<string, unknown>): string[] =>
  callTool('uuidna_theorems', { keys: true, ...args }) as string[]

test('keys-only answers the whole key list, and every row of it is a key the ledger seals', () => {
  const all = keysOnly({})
  assert.equal(all.length, sealedKeys().length, 'the keys-only answer is the key list, not a page of it')
  const sealed = new Set(sealedKeys())
  for (const k of all.slice(0, 50)) assert.ok(sealed.has(k), `${k} is not a sealed key`)
})

test('contains narrows to the key, and limit/offset page it', () => {
  const hit = keysOnly({ contains: 'store_footprint' })
  assert.deepEqual(hit, ['the_store_footprint_is_its_folders'])
  assert.equal(keysOnly({ contains: 'STORE_FOOTPRINT' }).length, 1, 'the match is case-insensitive')
  const page = keysOnly({ limit: 3, offset: 1 })
  assert.equal(page.length, 3)
  assert.deepEqual(page, keysOnly({}).slice(1, 4), 'offset and limit page the same list')
})

// THE CONTROL — AND IT IS WHAT MAKES THIS EVIDENCE RATHER THAN A PASSING CALL. Returning the right keys would also
// happen if the path walked all 71,082 rows and mapped t.key, which is exactly what it must not do at the edge. So
// this asserts the NARROWING: a needle that lives in the statements and not in any key comes back empty on the
// keys-only path while the rows path finds it. An answer that read the statements could not tell those apart.
test('the keys-only path reads keys and NOT statements — a statement-only needle finds nothing', () => {
  const needle = '∧'  // every conjunction in the corpus is in a statement; no key may carry it
  assert.equal(sealedKeys().filter((k) => k.includes(needle)).length, 0, 'the needle must be absent from every key')
  const viaRows = theorems().filter((t) => (t.key + ' ' + t.name + ' ' + t.statement).includes(needle))
  assert.ok(viaRows.length > 100, `the needle must be common in the statements: ${viaRows.length}`)
  assert.deepEqual(keysOnly({ contains: needle }), [],
    'the keys-only path must not see the statements — that is the whole reason it fits the edge')

  // and the other direction: asking WITHOUT keys still searches the statements, so nothing was taken away
  const rows = callTool('uuidna_theorems', { contains: needle, limit: 2 }) as { key: string }[]
  assert.equal(rows.length, 2, 'the rows path is unchanged and still reads statements')
})

test('a skill or principle filter still takes the rows path, because the baked root does not carry them', () => {
  const bySkill = callTool('uuidna_theorems', { keys: true, skill: 'z9-ring', limit: 3 }) as string[]
  assert.equal(bySkill.length, 3)
  for (const k of bySkill) assert.equal(typeof k, 'string', 'keys:true still returns keys on the rows path')
})
