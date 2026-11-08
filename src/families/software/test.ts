import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SoftwareFormulas } from './index.js'

/** The engineering arithmetic — kloc, coverage, cyclomatic, defects, flags, hours, velocity, semver — each exact. */
test('software: kloc, coverage, cyclomatic, defects, flags, hours, velocity, semver', async (t) => {
  assert.equal(SoftwareFormulas.kloc(12345).value, 12, '12345 loc')
  assert.equal(SoftwareFormulas.coverage(87, 100).value, 87, '87/100 covered')
  assert.equal(SoftwareFormulas.coverage(1, 0).value, 0, 'no total, no divide')
  assert.equal(SoftwareFormulas.cyclomatic(10, 8).value, 4, 'edges − nodes + 2')
  assert.equal(SoftwareFormulas.cyclomatic(1, 8).value, 0, 'floored at 0')
  assert.equal(SoftwareFormulas.defects(12, 5).value, 60, '12 kloc at 5/kloc')
  assert.equal(SoftwareFormulas.flags(10).value, 1024, '2^10 flag combos')
  assert.equal(SoftwareFormulas.hours(5).value, 20, '5 points, 4h each')
  assert.equal(SoftwareFormulas.velocity(40, 10).value, 4, '40 items over 10 days')
  assert.equal(SoftwareFormulas.semver(1, 2, 3).value, 1002003, 'packed semver')
  assert.equal(SoftwareFormulas.density(60, 12).value, 5, '60 defects over 12 kloc')
  assert.equal(SoftwareFormulas.throughput(4, 6).value, 24, '4 velocity over 6 sprints')
  assert.equal(SoftwareFormulas.debt(40, 150).value, 6000, '40 hours at 150 each')
  assert.equal(SoftwareFormulas.effort(12, 20).value, 240, '12 kloc at 20 each')
  assert.equal(SoftwareFormulas.teamsize(100, 40).value, 3, '100 hours at 40 each')
  assert.equal(SoftwareFormulas.builds(50, 3).value, 150, '50 commits of 3 builds')
  assert.equal(SoftwareFormulas.mttr(600, 8).value, 75, '600 downtime over 8 incidents')
  assert.equal(hexFamiliesOf().get('software')?.length, 15)
  for (const [name, params, expected] of [['kloc', [12345], 12], ['flags', [10], 1024], ['semver', [1, 2, 3], 1002003]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'software', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `software.${name} at ${uuid}`)
    uuidReceiptOf(`software ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 12345→12 kloc, cyclomatic 4, 2^10 flags, semver 1.2.3→1002003')
})
