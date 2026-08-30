// await-live — the release chain's wait, tested in every mode it can meet. This loop used to live as shell inside
// publish.yml where no test could reach it, and hand-checking it there found a real hazard: under `set -euo
// pipefail` an unguarded failing curl aborts the whole step, so a site merely slow to answer would FAIL a release
// instead of being retried. The probe and the sleep are injected here, so all four paths run with no network and
// no waiting — the case a real release cannot show (blocking) included, since v0.2.4's deploy won by 3m50s and the
// retry loop never spun.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { awaitValue } from '../../../scripts/await-live.js'

const NEW = 'urn:uuid:ad4a0e1b-1ba2-8931-bbe9-eceeefc53678'
const OLD = 'urn:uuid:7313d042-c304-8154-a2d4-02e458afc21e'
const noSleep = async (): Promise<void> => {}

test('blocks on the stale value, then passes when the deploy lands mid-wait', async () => {
  const slept: number[] = []
  const out = await awaitValue({
    probe: async (n) => (n > 3 ? NEW : OLD),   // the deploy arrives on the 4th probe
    want: NEW, maxProbes: 40, sleepMs: 15000,
    sleep: async (ms) => { slept.push(ms) },
  })
  assert.equal(out.ok, true)
  assert.equal(out.probes, 4, 'must not pass before the value actually appears')
  assert.equal(slept.length, 3, 'one sleep between each failed probe, none after the success')
})

test('fails when the deploy never lands, naming both values and disowning later checks', async () => {
  const out = await awaitValue({ probe: async () => OLD, want: NEW, maxProbes: 5, sleepMs: 1, sleep: noSleep })
  assert.equal(out.ok, false)
  assert.equal(out.probes, 5)
  assert.match(out.reason, /never served this release/)
  assert.ok(out.reason.includes(OLD) && out.reason.includes(NEW), 'both values must be named, or the failure is unreadable')
  assert.match(out.reason, /do not treat later checks as verifying this release/)
})

test('an unreachable site is retried and reported as unreachable', async () => {
  let attempts = 0
  const out = await awaitValue({
    probe: async () => { attempts++; return null },   // down, refused, or unparseable
    want: NEW, maxProbes: 3, sleepMs: 1, sleep: noSleep,
  })
  assert.equal(out.ok, false)
  assert.equal(attempts, 3, 'a down site must be RETRIED — this is the pipefail hazard the shell version carried')
  assert.match(out.reason, /unreachable/)
})

test('recovers when the site is down at first and answers correctly later', async () => {
  const out = await awaitValue({
    probe: async (n) => (n < 3 ? null : NEW),   // cold start, then healthy
    want: NEW, maxProbes: 10, sleepMs: 1, sleep: noSleep,
  })
  assert.equal(out.ok, true)
  assert.equal(out.probes, 3)
})

test('passes on the first probe when the site is already current — no needless waiting', async () => {
  const slept: number[] = []
  const out = await awaitValue({ probe: async () => NEW, want: NEW, maxProbes: 40, sleepMs: 15000, sleep: async (ms) => { slept.push(ms) } })
  assert.equal(out.probes, 1)
  assert.equal(slept.length, 0, 'a current site must not be slept against at all')
})

test('an empty expectation fails immediately rather than waiting out the bound', async () => {
  let probed = 0
  const out = await awaitValue({ probe: async () => { probed++; return NEW }, want: '', maxProbes: 40, sleepMs: 1, sleep: noSleep })
  assert.equal(out.ok, false)
  assert.equal(probed, 0, 'with nothing to compare against, probing is meaningless')
  assert.match(out.reason, /cannot verify which release is live/)
})
