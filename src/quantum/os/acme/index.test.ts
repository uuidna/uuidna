// acme-port — uuidnaOS issuing Let's Encrypt certificates through Alpine ACME clients.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ACME_CLIENT_PACKAGES, ACME_EDGE_PACKAGES, LETS_ENCRYPT_DIRECTORY,
  acmeDomainLabels, planLetsEncryptIssuance, testAcmePort, renderAcmePort, renderAcmeIssuance,
} from './index.js'
import { planAlpineRun } from '../../../os/runtime/index.js'
import { theoremByKey } from '../../../index.js'
import { CRYPTO_THEOREM } from '../apptheorem/index.js'
import { fresh } from '../harness/index.js'

test.beforeEach(fresh)

test('ACME catalogue lists lego certbot and edge nginx openssl', () => {
  assert.ok(ACME_CLIENT_PACKAGES.includes('lego'))
  assert.ok(ACME_CLIENT_PACKAGES.includes('certbot'))
  assert.ok(ACME_EDGE_PACKAGES.includes('nginx'))
  assert.ok(ACME_EDGE_PACKAGES.includes('openssl'))
  assert.match(LETS_ENCRYPT_DIRECTORY, /^https:\/\/acme-v02\.api\.letsencrypt\.org/)
})

test('IDN domains fold to A-labels before ACME — Let\'s Encrypt wire format', () => {
  const labels = acmeDomainLabels(['uuidna.com', '例.example', 'bücher.example'])
  assert.equal(labels[0]!.aLabel, 'uuidna.com')
  assert.equal(labels[0]!.idn, false)
  assert.ok(labels[1]!.aLabel.startsWith('xn--'), labels[1]!.aLabel)
  assert.equal(labels[1]!.idn, true)
  assert.ok(labels[2]!.aLabel.startsWith('xn--'), labels[2]!.aLabel)
})

test('every ACME client and edge package passes Layer 1 exec', () => {
  const c = testAcmePort()
  console.log('\n' + renderAcmePort(c) + '\n')
  assert.equal(c.definition, 'uuidnaOS·acme-port·letsencrypt')
  assert.equal(c.clients, ACME_CLIENT_PACKAGES.length)
  assert.equal(c.edge, ACME_EDGE_PACKAGES.length)
  assert.equal(c.passed, c.clients + c.edge, `failed: ${c.failed.join(', ')}`)
  assert.equal(c.complete, true)
  assert.ok(c.commands.includes('lego'))
  assert.ok(c.commands.includes('certbot'))
  assert.equal(c.apps.length, ACME_CLIENT_PACKAGES.length + ACME_EDGE_PACKAGES.length)
  for (const a of c.apps) {
    assert.ok(theoremByKey().has(a.theorem), `${a.name}: ${a.theorem}`)
  }
  assert.ok(c.cites.length >= 2)
  assert.ok(c.cites.some((t) => t.key === CRYPTO_THEOREM))
})

test('ACME apps are the theorem source — lego nginx openssl each cite a sealed key', () => {
  const c = testAcmePort()
  const lego = c.apps.find((a) => a.name === 'lego')!
  const nginx = c.apps.find((a) => a.name === 'nginx')!
  const openssl = c.apps.find((a) => a.name === 'openssl')!
  assert.equal(lego.theorem, CRYPTO_THEOREM)
  assert.equal(nginx.theorem, CRYPTO_THEOREM)
  assert.notEqual(openssl.theorem, CRYPTO_THEOREM)
  assert.ok(openssl.harmonised)
})

test('lego and certbot --help have Layer 2 plans', () => {
  for (const cmd of ['lego --help', 'certbot --help', 'acme-client --help']) {
    const plan = planAlpineRun(cmd)
    if (plan.ok) {
      assert.ok(plan.recipe?.command)
    } else {
      assert.ok(plan.reason, `${cmd} refused with reason`)
    }
  }
})

test('planLetsEncryptIssuance — HTTP-01 recipe for ascii and IDN domains', () => {
  const p = planLetsEncryptIssuance({
    domains: ['uuidna.com', 'www.uuidna.com'],
    client: 'lego',
    webroot: '/var/www/uuidna',
    email: 'ops@uuidna.com',
  })
  console.log('\n' + renderAcmeIssuance(p) + '\n')
  assert.equal(p.definition, 'uuidnaOS·acme·letsencrypt')
  assert.equal(p.challenge, 'http-01')
  assert.ok(p.layer1.every((h) => h.ok), p.layer1.filter((h) => !h.ok).map((h) => h.line).join(', '))
  assert.match(p.layer2.command, /lego --email ops@uuidna\.com/)
  assert.match(p.layer2.command, /--domains uuidna\.com/)
  assert.match(p.layer2.command, /--http\.webroot \/var\/www\/uuidna/)

  const idn = planLetsEncryptIssuance({
    domains: ['例.uuidna.com'],
    client: 'certbot',
  })
  assert.equal(idn.labels[0]!.idn, true)
  assert.ok(idn.labels[0]!.aLabel.startsWith('xn--'))
  assert.match(idn.layer2.command, /certbot certonly/)
  assert.match(idn.layer2.command, new RegExp('-d ' + idn.labels[0]!.aLabel.replace(/\./g, '\\.')))
})

test('packages in the issuance plan include lego nginx openssl', () => {
  const p = planLetsEncryptIssuance({ domains: ['localhost'] })
  const names = new Set(p.packages.map((x) => x.name))
  assert.ok(names.has('lego'))
  assert.ok(names.has('nginx'))
  assert.ok(p.packages.some((x) => x.name === 'openssl'))
  for (const a of p.apps) assert.ok(theoremByKey().has(a.theorem))
})
