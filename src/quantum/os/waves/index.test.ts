import { test } from 'node:test'
import assert from 'node:assert/strict'
import { courtJobs, dailyNeedJobs, hexBootJob, publishNeedJobs } from '../court/index.js'
import { runWaves } from './index.js'

test('uuidna needs — court waves boot inside the sandbox', async () => {
  const jobs = [hexBootJob(), ...courtJobs()]
  const r = await runWaves(jobs, { width: 16 })
  assert.equal(r.okTotal, r.jobs)
  assert.ok(r.chain.startsWith('') || r.chain.length === 36)
  assert.equal(r.os.length, 36)
})

test('daily need job count matches hex + court + playbook', () => {
  const daily = dailyNeedJobs()
  const pub = publishNeedJobs()
  assert.ok(daily.length > pub.length)
  assert.equal(pub.length, 1 + courtJobs().length)
})
