// edge-ledger-assets — THE ROWS THE SITE SERVES ARE THE LEDGER THE ROOT NAMES. copy-lean-to-site writes one document
// per content address under /ledger/, and worker.js answers the edge's reader from those documents before it asks
// storage. This reads them back with the SAME reader the edge runs (ledgerAt over storedAt), every address recomputed
// from its bytes, and compares the rows to the ledger row for row — the proof the deposit script asks of storage,
// asked of the assets. The control: a document whose bytes do not address to their name is refused.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { LEAN_LEDGER } from './theorems/generated.js'
import { THEOREMS } from './theorems/index.js'
import { EDGE_ROOT } from './theorems/edge-root.js'
import { LEDGER_STORAGE, ledgerAt, storedAt } from './edge-ledger.js'
import { bakeLedgerAssets } from './scripts/ledger-deposit.js'
import { ROOT } from './scripts/api.js'

const dir = mkdtempSync(join(tmpdir(), 'uuidna-ledger-assets-'))
const baked = bakeLedgerAssets(dir)

// the asset binding, as a fetch: the storage href's last segment is the address, the file is `<address>.json`
const assetsFetch = (async (input: RequestInfo | URL) => {
  const href = String(input)
  assert.ok(href.startsWith(LEDGER_STORAGE + '/'), `the reader asks the storage prefix the worker rewrites: ${href}`)
  const file = join(dir, `${href.slice(LEDGER_STORAGE.length + 1)}.json`)
  return existsSync(file)
    ? new Response(readFileSync(file), { status: 200, headers: { 'content-type': 'application/json' } })
    : new Response('', { status: 404 })
}) as typeof fetch

test('the baked assets are the ledger: the edge reader reads every piece back, each address recomputed, row for row', async () => {
  assert.equal(baked.root, EDGE_ROOT?.root, 'the manifest served is the root the bundle carries')
  const read = await ledgerAt(baked.root, assetsFetch)
  assert.equal(read.manifest.wings.length, baked.pieces)
  assert.equal(read.rows.length, LEAN_LEDGER.length)
  const drift = read.rows.findIndex((t, i) => t.key !== LEAN_LEDGER[i]?.key || read.lines[i] !== THEOREMS[i]?.lineAddress)
  assert.equal(drift, -1, `first difference at row ${drift}`)
})

test('CONTROL — a document whose bytes do not address to its name is refused by the same reader', async () => {
  const [first] = JSON.parse(readFileSync(join(dir, `${baked.root}.json`), 'utf8')).value.wings as { address: string }[]
  const doc = JSON.parse(readFileSync(join(dir, `${first!.address}.json`), 'utf8')) as { value: { rows: { key: string }[] } }
  doc.value.rows[0]!.key = 'not_the_sealed_key'
  const forged = `${first!.address.slice(0, -1)}${first!.address.endsWith('0') ? '1' : '0'}`
  writeFileSync(join(dir, `${forged}.json`), JSON.stringify(doc))
  await assert.rejects(storedAt(forged, assetsFetch), /address to .* not .* refused/)
  await assert.rejects(storedAt('00000000-0000-0000-0000-000000000000', assetsFetch), /answered 404/)
})

// THE ROWS STAY OUT OF THE WORKER BUNDLE. The Worker imports generated.js for WING_DEFS and PRINCIPLES only. A bundler
// keeps an unread LEAN_LEDGER when it is joined by spread, and joined so it put 24 MB of rows in the 44 MB edge bundle
// (wrangler dry run, 2026-11-10). Both the source and the emitted JS must join the blocks by a call marked pure.
const ledgerLine = (text: string): string => text.split('\n').find((l) => l.startsWith('export const LEAN_LEDGER')) ?? ''
const joinsPure = (line: string): boolean => /=\s*\/\* @__PURE__ \*\/ \w+\.concat\(LEDGER_BLOCK_0\b/.test(line) && !line.includes('...')

test('the ledger joins its blocks by a pure call, in the source and in the emitted JS, so a bundler can drop it', () => {
  const source = ledgerLine(readFileSync(join(ROOT, 'src', 'theorems', 'generated.ts'), 'utf8'))
  const emitted = ledgerLine(readFileSync(new URL('./theorems/generated.js', import.meta.url), 'utf8'))
  assert.ok(joinsPure(source), `src/theorems/generated.ts: ${source.slice(0, 120)}`)
  assert.ok(joinsPure(emitted), `the compiled generated.js lost the pure join: ${emitted.slice(0, 120)}`)
  assert.ok(LEAN_LEDGER.length > 0, 'and the joined ledger still holds its rows')
})

test('CONTROL — a ledger joined by spread is refused by the same predicate', () => {
  assert.equal(joinsPure('export const LEAN_LEDGER = [...LEDGER_BLOCK_0, ...LEDGER_BLOCK_1]'), false)
  assert.equal(joinsPure('export const LEAN_LEDGER = NO_ROWS.concat(LEDGER_BLOCK_0, LEDGER_BLOCK_1)'), false, 'unmarked, a call may be kept')
})
