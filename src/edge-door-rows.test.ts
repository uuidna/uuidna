// edge-door-rows — THE DOORS AS THE EDGE RUNS THEM, WITH THE ROWS ASKED FOR. Node resolves `#ledger` by condition, so a
// child started with --conditions=workerd loads the edge ledger exactly as the worker bundle does: the baked root and
// no rows. Every row, statement shard and station shard it asks for is served from files this test writes from the
// host's own ledger, the way the site build writes them. Each assertion is a divergence measured at uuidna.com/mcp on
// 2026-11-09 that the host never showed: an unheld cited row read as "shares no vocabulary", a swallowed ask turned
// "2 + 2 = 4" into prose, and the trial's involution walked every row to find one station.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { bakeLedgerAssets } from './scripts/ledger-deposit.js'
import { statementShardsOf, stationShardsOf, holdStationShard, stationShardOf } from './statement-shards.js'
import { THEOREMS, isPagelessFile } from './theorems/index.js'
import { stationOfAddress } from './lattice.js'
import { ROOT } from './scripts/api.js'

const CALLS: [string, Record<string, unknown>][] = [
  ['uuidna_adjudicate', { statement: 'handle capacity is quantum by architecture, by theorem handle_capacity_is_quantum_by_architecture' }],
  ['uuidna_adjudicate', { statement: 'the moon is made of cheese, by theorem handle_capacity_is_quantum_by_architecture' }],
  ['uuidna_adjudicate', { statement: 'the moon is made of cheese, by theorem uuid_mix_census_halves' }],
  ['uuidna_decide', { input: '2 + 2 = 4' }],
  ['uuidna_trial', { statement: 'uuid_mix_census_halves' }],
  ['uuidna_audit_details', { text: '2 + 2 = 4' }],
]

const CHILD = `
import { readFileSync, existsSync } from 'node:fs'
const [dir, calls] = [process.argv[1], JSON.parse(process.argv[2])]
const { handleMcpRpc } = await import(${JSON.stringify(pathToFileURL(join(ROOT, 'dist/mcp-http.js')).href)})
const L = await import(${JSON.stringify(pathToFileURL(join(ROOT, 'dist/edge-ledger.js')).href)})
const lf = async (href) => {
  const f = dir + '/' + String(href).slice(L.LEDGER_STORAGE.length + 1) + '.json'
  return existsSync(f) ? new Response(readFileSync(f), { headers: { 'content-type': 'application/json' } }) : new Response('', { status: 404 })
}
const ctx = { origin: 'https://uuidna.com', rows: async (n) => {
  if (n.keys.length) await L.rowsForKeys(n.keys, lf)
  if (n.files.length) await L.rowsForFiles(n.files, lf)
  if (n.shards.length) await L.shardsFor(n.shards, lf)
  if (n.stations.length) await L.stationsFor(n.stations, lf)
} }
const out = []
for (const [name, args] of calls) {
  const r = await handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }, ctx)
  out.push({ isError: !!r?.result?.isError, text: String(r?.result?.content?.[0]?.text ?? '') })
}
process.stdout.write(JSON.stringify(out))
`

test('at the edge, a door asks for the rows it reads and answers as the host does', () => {
  const dir = mkdtempSync(join(tmpdir(), 'edge-door-rows-'))
  try {
    bakeLedgerAssets(dir)
    for (const [sub, shards] of [['statements', statementShardsOf(THEOREMS)], ['stations', stationShardsOf(THEOREMS.filter((t) => !isPagelessFile(t.file)))]] as const) {
      mkdirSync(join(dir, sub), { recursive: true })
      for (const [id, v] of Object.entries(shards)) writeFileSync(join(dir, sub, `${id}.json`), JSON.stringify(v))
    }
    const raw = execFileSync(process.execPath, ['--conditions=workerd', '--max-old-space-size=512', '--input-type=module', '-e', CHILD, dir, JSON.stringify(CALLS)],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    const [onTopic, offTopic, oneLetterGloss, arithmetic, trial, audit] = JSON.parse(raw) as { isError: boolean; text: string }[]
    assert.match(onTopic!.text, /"verdict":"VERIFIED"/, 'a citation about its claim verifies at the edge: ' + onTopic!.text.slice(0, 200))
    assert.match(offTopic!.text, /"verdict":"UNVERIFIED"/, 'the same key cited for an unrelated claim does not')
    assert.match(oneLetterGloss!.text, /"verdict":"UNVERIFIED"/, 'a gloss\'s one-letter tokens ("n", "d") are not vocabulary a claim shares')
    assert.match(arithmetic!.text, /"kind":"decided-arithmetic"/, 'arithmetic is decided, never read as prose: ' + arithmetic!.text.slice(0, 200))
    assert.equal(trial!.isError, false, 'the trial answers without the whole ledger: ' + trial!.text.slice(0, 200))
    assert.equal(audit!.isError, false, 'the audit\'s own fabrication control does not drain its answer: ' + audit!.text.slice(0, 200))
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('a station shard holds a key only under the station its sealed address names', () => {
  const t = THEOREMS.find((r) => !isPagelessFile(r.file))!
  const st = stationOfAddress(t.address)
  const id = stationShardOf(st)
  const other = st.slice(0, 2) + (st.slice(2) === 'ff' ? '00' : 'ff')   // the same shard, never the same station
  assert.deepEqual(holdStationShard(id, { [st]: [t.key] }), { held: 1, refused: 0 }, 'the key under its own station is held')
  assert.deepEqual(holdStationShard(id, { [other]: [t.key], [st]: ['not_a_sealed_key'] }), { held: 0, refused: 2 },
    'a key filed under another station, and a key the ledger does not seal, are refused')
  assert.deepEqual(holdStationShard('00' === id ? '01' : '00', { [st]: [t.key] }), { held: 0, refused: 1 }, 'a station filed in the wrong shard is refused')
})
