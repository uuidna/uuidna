import { test } from 'node:test'
import assert from 'node:assert/strict'
import { releaseSteps } from './scripts/release.js'

const kinds = (s: Parameters<typeof releaseSteps>[0]): string[] => releaseSteps(s).map((x) => x.kind)

test('a tree ahead of origin lands first, and nothing outward runs before its proof', () => {
  const k = kinds({ ahead: 3, behind: 0, version: '9.9.9', tagged: false })
  assert.deepEqual(k, ['land', 'forge', 'cut', 'forge', 'registry', 'ship', 'live'])
  assert.ok(k.indexOf('forge') < k.indexOf('cut'), 'no tag before the forge is green on HEAD')
  assert.ok(k.indexOf('registry') < k.indexOf('ship'), 'no ship before the registry serves the version')
})

test('a landed, already-tagged tree skips land and the cut', () => {
  assert.deepEqual(kinds({ ahead: 0, behind: 0, version: '9.9.9', tagged: true }), ['forge', 'registry', 'ship', 'live'])
})

test('a tree behind origin is refused, never released over', () => {
  assert.throws(() => releaseSteps({ ahead: 0, behind: 2, version: '9.9.9', tagged: false }), /behind origin/)
})
