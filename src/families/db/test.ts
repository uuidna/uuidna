import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DbFormulas, PORTED_DB } from './index.js'
import { dataOf } from '../../mcp/qpu-fused.js'
import '../../mcp/families.js'

/** QPU OS runs databases as adapter facades over one Cloudflare-binding store: no migrations, Postgres and SQLite in the
 *  browser for real, Mongo as a facade, every adapter × mode an address — unlimited, stable experiments. */
test('db: no migrations on bindings, Postgres/SQLite in the browser, Mongo a facade, unlimited experiments', async (t) => {
  // no migrations whatsoever: every adapter persists to content-addressed bindings
  for (let i = 0; i < 5; i++) { assert.equal(DbFormulas.migrations(i).value, 0, 'no migrations'); assert.equal(DbFormulas.migrations(i).holds, true) }
  // Postgres and SQLite run in the browser; Mongo does not (no WASM mongod) — honest
  assert.equal(DbFormulas.browser(0).value, 1, 'd1/sqlite in the browser (wa-sqlite)')
  assert.equal(DbFormulas.browser(2).value, 1, 'postgres in the browser (PGlite WASM)')
  assert.equal(DbFormulas.browser(4).value, 0, 'mongodb surface is a facade, no browser engine')
  // the binding behind each facade
  assert.ok(Number(DbFormulas.binding(2).value) >= 1, 'postgres stores in a binding (KV+R2)')
  // stability: browser mode needs a browser engine; server modes run all
  assert.equal(DbFormulas.stable(4, 0).value, 0, 'mongo is not a stable browser solution')
  assert.equal(DbFormulas.stable(4, 2).value, 1, 'mongo is stable in docker')
  assert.equal(DbFormulas.stable(2, 0).value, 1, 'postgres is a stable browser solution')
  // the config space and the unbounded experiments
  assert.equal(DbFormulas.combinations().value, 7 * 4)
  assert.equal(DbFormulas.experiments(1000000).value, 1000000, 'experiments are unbounded — every config an address')
  // PORT AND TEST ALL: every official Payload db adapter read live is ported into the family
  const eco = (((await dataOf('payload', { category: 0 })) as { reading?: { plugins?: { ecosystem?: { package: string; kind: string }[] } } }).reading?.plugins?.ecosystem ?? [])
  const livePayloadDbs = eco.filter((e) => e.kind === 'db adapter').map((e) => e.package)
  if (livePayloadDbs.length) {
    const missing = livePayloadDbs.filter((p) => !(PORTED_DB as readonly string[]).includes(p))
    assert.deepEqual(missing, [], `every Payload database is ported; live db-* adapters ${livePayloadDbs.join(', ')}`)
  }
  assert.equal(DbFormulas.adapters().value, 7, 'five Payload databases + two QPU-native')
  assert.equal(DbFormulas.ported(4).value, 1, 'mongodb ports db-mongodb')
  assert.equal(DbFormulas.ported(5).value, 0, 'qpu-raid is QPU-native')
  assert.equal(hexFamiliesOf().get('db')?.length, 8)
  for (const [name, params, expected] of [['migrations', [1], 0], ['browser', [1], 1], ['stable', [4, 0], 0], ['ported', [2], 1]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'db', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `db.${name} at ${uuid}`)
    uuidReceiptOf(`db ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('6 formulas; 0 migrations on bindings; postgres+sqlite in the browser, mongo a facade; 20 adapter×mode combinations; experiments unbounded')
})
