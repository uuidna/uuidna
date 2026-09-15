// oidc — the verifier refuses every wrong claim, a wrong signature and a wrong algorithm, and accepts the one right
// token. Keys are generated here with WebCrypto, so the test signs exactly as GitHub does (RS256 over header.payload).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { verifyActionsToken, verifyActionsTokenFetching, expectedWorkflowRef, GITHUB_ACTIONS_ISSUER, GITHUB_ACTIONS_JWKS_URL, type Jwks, type OidcExpectation } from './oidc.js'

const EXPECT: OidcExpectation = { audience: 'https://uuidna.com', repository: 'uuidna/uuidna', workflowFile: 'school-grade.yml', ref: 'refs/heads/main' }
const NOW_S = 1800000000
const NOW = NOW_S * 1000
const b64u = (b: Uint8Array): string => Buffer.from(b).toString('base64url')
const enc = (o: unknown): string => b64u(new TextEncoder().encode(JSON.stringify(o)))

const pair = (): Promise<CryptoKeyPair> => crypto.subtle.generateKey(
  { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify'])

async function sign(priv: CryptoKey, header: object, claims: object): Promise<string> {
  const data = enc(header) + '.' + enc(claims)
  return data + '.' + b64u(new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', priv, new TextEncoder().encode(data))))
}

const claims = (over: Record<string, unknown> = {}): Record<string, unknown> => ({
  iss: GITHUB_ACTIONS_ISSUER, aud: 'https://uuidna.com', repository: 'uuidna/uuidna',
  workflow_ref: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main', ref: 'refs/heads/main',
  sha: 'abc123', run_id: '42', event_name: 'schedule', iat: NOW_S - 10, nbf: NOW_S - 10, exp: NOW_S + 300, ...over,
})

async function fixture(): Promise<{ priv: CryptoKey; jwks: Jwks; other: CryptoKey }> {
  const k = await pair(), o = await pair()
  const pub = await crypto.subtle.exportKey('jwk', k.publicKey)
  return { priv: k.privateKey, other: o.privateKey, jwks: { keys: [{ kty: 'RSA', kid: 'k1', n: pub.n, e: pub.e, alg: 'RS256', use: 'sig' }] } }
}

test('the expected workflow_ref is the exact claim GitHub issues', () => {
  assert.equal(expectedWorkflowRef(EXPECT), 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main')
})

test('a valid token is accepted and its claims are returned', async () => {
  const f = await fixture()
  const r = await verifyActionsToken(await sign(f.priv, { alg: 'RS256', kid: 'k1', typ: 'JWT' }, claims()), f.jwks, EXPECT, NOW)
  assert.ok(r.ok, r.ok ? '' : r.reason)
  if (r.ok) { assert.equal(r.claims.run_id, '42'); assert.equal(r.claims.sha, 'abc123') }
  const arrayAud = await verifyActionsToken(await sign(f.priv, { alg: 'RS256', kid: 'k1' }, claims({ aud: ['other', 'https://uuidna.com'] })), f.jwks, EXPECT, NOW)
  assert.ok(arrayAud.ok, 'an audience array naming this audience holds')
})

test('each wrong claim is refused by name', async () => {
  const f = await fixture()
  const cases: [string, Record<string, unknown>, RegExp][] = [
    ['wrong iss', { iss: 'https://token.actions.githubusercontent.com.evil' }, /iss/],
    ['wrong aud', { aud: 'https://evil.example' }, /aud/],
    ['wrong repo', { repository: 'someone/uuidna' }, /repository/],
    ['another workflow', { workflow_ref: 'uuidna/uuidna/.github/workflows/school.yml@refs/heads/main' }, /workflow_ref/],
    ['another branch', { workflow_ref: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/feature' }, /workflow_ref/],
    ['a branch that only starts with main', { workflow_ref: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main-evil' }, /workflow_ref/],
    ['a fork of the path', { workflow_ref: 'evil/uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main' }, /workflow_ref/],
    ['expired', { exp: NOW_S - 1 }, /expired/],
    ['expiring this very second', { exp: NOW_S }, /expired/],
    ['issued in the future', { iat: NOW_S + 3600 }, /future/],
    ['not yet valid', { nbf: NOW_S + 3600 }, /nbf/],
    ['no exp', { exp: undefined }, /numeric/],
  ]
  for (const [name, over, why] of cases) {
    const r = await verifyActionsToken(await sign(f.priv, { alg: 'RS256', kid: 'k1' }, claims(over)), f.jwks, EXPECT, NOW)
    assert.equal(r.ok, false, name)
    if (!r.ok) assert.match(r.reason, why, name)
  }
})

test('a bad signature, a wrong algorithm, an unknown kid and a malformed token are refused', async () => {
  const f = await fixture()
  const forged = await verifyActionsToken(await sign(f.other, { alg: 'RS256', kid: 'k1' }, claims()), f.jwks, EXPECT, NOW)
  assert.equal(forged.ok, false)
  if (!forged.ok) assert.match(forged.reason, /signature/)
  // the payload swapped under a real signature
  const real = await sign(f.priv, { alg: 'RS256', kid: 'k1' }, claims())
  const [h, , s] = real.split('.')
  const swapped = await verifyActionsToken(`${h}.${enc(claims({ run_id: '43' }))}.${s}`, f.jwks, EXPECT, NOW)
  assert.equal(swapped.ok, false, 'a signature binds the payload it was made over')
  const none = await verifyActionsToken(`${enc({ alg: 'none', kid: 'k1' })}.${enc(claims())}.`, f.jwks, EXPECT, NOW)
  assert.equal(none.ok, false)
  if (!none.ok) assert.match(none.reason, /RS256/)
  const kid = await verifyActionsToken(await sign(f.priv, { alg: 'RS256', kid: 'k9' }, claims()), f.jwks, EXPECT, NOW)
  assert.equal(kid.ok, false)
  for (const t of ['', 'a.b', 'a.b.c.d', '!!.!!.!!']) assert.equal((await verifyActionsToken(t, f.jwks, EXPECT, NOW)).ok, false, JSON.stringify(t))
})

test('the fetching wrapper reads GitHub\'s JWKS once per kid, and never for a token whose claims already fail', async () => {
  const f = await fixture()
  const asked: string[] = []
  const fakeFetch = (async (u: string) => { asked.push(String(u)); return new Response(JSON.stringify({ keys: [{ ...f.jwks.keys[0], kid: 'fetch-k' }] })) }) as unknown as typeof fetch
  const bad = await verifyActionsTokenFetching(await sign(f.priv, { alg: 'RS256', kid: 'nope' }, claims({ aud: 'x' })), EXPECT, NOW, fakeFetch)
  assert.equal(bad.ok, false)
  assert.equal(asked.length, 0, 'a token refused on its claims costs no fetch')
  const token = await sign(f.priv, { alg: 'RS256', kid: 'fetch-k' }, claims())
  assert.ok((await verifyActionsTokenFetching(token, EXPECT, NOW, fakeFetch)).ok)
  assert.ok((await verifyActionsTokenFetching(token, EXPECT, NOW, fakeFetch)).ok)
  assert.deepEqual(asked, [GITHUB_ACTIONS_JWKS_URL], 'the second verification reads the cached key')
})
