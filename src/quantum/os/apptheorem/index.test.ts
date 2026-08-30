// app-theorem — apps are the main source of theorems.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  appTheoremBehind, foldAppTheorems, PORT_THEOREM, CRYPTO_THEOREM,
} from './index.js'
import { theoremByKey } from '../../../index.js'
import { fresh } from '../harness/index.js'

test.beforeEach(fresh)

test('every ported app carries a sealed theorem key', () => {
  for (const name of ['openssl', 'nginx', 'lego', 'certbot', 'busybox']) {
    const a = appTheoremBehind(name)
    assert.ok(theoremByKey().has(a.theorem), `${name}: ${a.theorem}`)
    assert.ok(a.route.startsWith('/theorem/'))
    assert.ok(theoremByKey().has(a.port.key))
  }
})

test('harmonised apps cite skill witness; crypto apps cite grover margin', () => {
  const openssl = appTheoremBehind('openssl')
  assert.ok(openssl.harmonised)
  assert.equal(openssl.theorem, openssl.harmonised!.key)

  const nginx = appTheoremBehind('nginx')
  assert.equal(nginx.harmonised, null)
  assert.ok(nginx.crypto)
  assert.equal(nginx.theorem, CRYPTO_THEOREM)

  const lego = appTheoremBehind('lego')
  assert.equal(lego.theorem, CRYPTO_THEOREM)
})

test('foldAppTheorems dedupes unique keys from the app census', () => {
  const fold = foldAppTheorems(['openssl', 'nginx', 'lego', 'certbot'])
  assert.equal(fold.apps.length, 4)
  assert.ok(fold.theorems.length >= 2)
  assert.ok(fold.theorems.some((t) => t.key === CRYPTO_THEOREM))
  assert.ok(fold.crypto >= 2)
  for (const t of fold.theorems) assert.ok(theoremByKey().has(t.key))
})

test('unknown catalogue row falls back to port theorem', () => {
  const a = appTheoremBehind('not-a-real-package-xyz')
  assert.equal(a.theorem, PORT_THEOREM)
})
