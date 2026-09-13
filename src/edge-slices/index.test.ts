import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../scripts/api.js'
import { workspacePackages } from '../npm-pack.js'
import { edgeSlicesOf, wranglerPostureOf } from './index.js'
import { EDGE_SLICES } from './generated.js'

const read = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8')

test('generated.ts IS the current derivation of its live sources — a bake that lags them serves the edge a stale posture', () => {
  // The consumers no longer read the files (the edge has none), so the one way they can go wrong is the bake falling
  // behind package.json, wrangler.toml, packages/ or a re-minted receipt. Same derivation, live input, deep-equal.
  const live = edgeSlicesOf({
    pkg: JSON.parse(read('package.json')),
    wrangler: read('wrangler.toml'),
    workspaces: workspacePackages(),
    receipt: (name) => JSON.parse(read(`lean/${name}-receipt.json`)),
  })
  assert.deepEqual(EDGE_SLICES, live, 'src/edge-slices/generated.ts lags its sources — run `npm run x -- gen-edge-slices`')
})

test('the wrangler posture can fire: an active KV id and a TRIAL_KEY assignment are caught, their commented forms are not', () => {
  const kv = '[[kv_namespaces]]\nbinding = "TRIALS"\nid = "abc123"\n'
  assert.equal(wranglerPostureOf(kv).kvIdCommitted, true)
  assert.equal(wranglerPostureOf(kv.replace(/^/gm, '# ')).kvIdCommitted, false)
  assert.equal(wranglerPostureOf('TRIAL_KEY = "x"').trialKeyValueCommitted, true)
  assert.equal(wranglerPostureOf('# TRIAL_KEY = "x"').trialKeyValueCommitted, false)
})
