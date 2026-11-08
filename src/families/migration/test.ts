import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MigrationFormulas } from './index.js'
import '../../mcp/families.js'

test('migration: netmigration, grossflow, rate, pushpull, remittanceshare, settlementratio, returnrate, integrationindex — crossing to sociology', async (t) => {
  assert.equal(MigrationFormulas.netmigration(5000, 3000).value, 2000, 'arrivals over departures')
  assert.equal(MigrationFormulas.netmigration(3000, 5000).value, 0)
  assert.equal(MigrationFormulas.grossflow(5000, 3000).value, 8000)
  assert.equal(MigrationFormulas.rate(2000, 50000).value, 40, 'per thousand of population')
  assert.equal(MigrationFormulas.pushpull(30, 70).value, 40, 'net pull pressure')
  assert.equal(MigrationFormulas.remittanceshare(300, 1500).value, 20)
  assert.equal(MigrationFormulas.settlementratio(800, 1000).value, 80)
  assert.equal(MigrationFormulas.returnrate(250, 1000).value, 25)
  assert.equal(MigrationFormulas.integrationindex(60, 90, 3).value, 51)
  assert.equal(MigrationFormulas.netmigration(5000, 3000).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('migration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'migration', program: ['rate'], params: [2000, 50000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `migration.rate at ${uuid}`)
  uuidReceiptOf('migration rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; netmigration 2000, grossflow 8000, rate 40, pushpull 40, remittanceshare 20, settlementratio 80, returnrate 25, integrationindex 51; crossing to sociology')
})
