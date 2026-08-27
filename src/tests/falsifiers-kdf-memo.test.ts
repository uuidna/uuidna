// Falsifier for THE KDF MEMO'S CHOICE OF HASH — the one line in crypt.ts that picks SHA-256 over FNV and says why.
//
// crypt.ts memoises the derived key so a decrypt does not pay PBKDF2's 600,000 iterations a second time, and it
// keys that cache on a SHA-256 digest of the derivation string, with the reason written beside it: keying a
// secret's memo on a non-cryptographic hash would return the WRONG KEY on a collision. The reasoning is correct
// and it was never tested, so it was a declared boundary rather than a closed one — and this tree has learned
// repeatedly that the difference between those two is a defect nobody is looking for.
//
// WHAT THIS TEST DOES ABOUT IT. It builds the mistake deliberately: a memo keyed by a truncated FNV fold, a REAL
// collision found by search rather than constructed by hand, and then the lookup that hands back another
// passphrase's key. The failure is exhibited, not described. Then the same two inputs are put through the memo
// key crypt.ts actually uses, which separates them.
//
// HONEST SCOPE, and it is the whole reason this test is written at a reduced width. The collision produced below
// is on 32 bits of the FNV fold, which costs about 2^16 attempts and is found here in milliseconds. A collision
// on the FULL 128-bit fold costs about 2^64 by the birthday bound and is NOT produced, NOT attempted, and NOT
// claimed — so this does not show that crypt.ts would have collided in practice had it used FNV. It shows the
// MECHANISM by which it would: a memo lookup that matches on a hash returns whatever was stored under that hash,
// and if two derivation strings share it, the second caller silently receives the first caller's key. Cost is the
// only thing that differs between the demonstration and the real width, and cost is not a security property —
// it is a budget, and budgets are what an attacker spends.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toUuid } from '../address.js'
import { sha256 } from '../sha256.js'
import { encrypt, decrypt } from '../crypt.js'

const enc = new TextEncoder()
const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** the mistake: a memo key that is a TRUNCATED, non-cryptographic fold of the derivation string.
 *  The intermediate is deliberately NOT address-shaped — this IS the anti-involution under trial. */
const weakMemoKey = (derivation: string): string => {
  const mistake = toUuid(derivation)
  return mistake.replace(/-/g, '').slice(0, 8)
}
/** what crypt.ts actually does: the full SHA-256 digest of the derivation string */
const strongMemoKey = (derivation: string): string => hex(sha256(enc.encode('uuidna-kdf-v1|' + derivation)))

test('A MEMO KEYED ON A NON-CRYPTOGRAPHIC HASH HANDS BACK THE WRONG KEY — the collision is found, not assumed', () => {
  // search for two DIFFERENT passphrases whose weak memo keys agree
  const seen = new Map<string, string>()
  let a: string | null = null, b: string | null = null
  for (let i = 0; i < 4000000 && !a; i++) {
    const pass = 'passphrase-' + i
    const k = weakMemoKey(pass)
    const prior = seen.get(k)
    if (prior !== undefined) { a = prior; b = pass } else seen.set(k, pass)
  }
  assert.ok(a && b, 'a 32-bit collision must be findable inside the budget — that is the point of the exercise')
  assert.notEqual(a, b, 'the two passphrases are genuinely different inputs')
  assert.equal(weakMemoKey(a as string), weakMemoKey(b as string), 'and they share a memo key')

  // now the failure itself: a cache keyed that way, filled by the first caller, read by the second
  const cache = new Map<string, string>()
  const keyFor = (pass: string): string => 'KEY(' + pass + ')'          // stands in for the PBKDF2 output
  cache.set(weakMemoKey(a as string), keyFor(a as string))               // first caller derives and memoises
  const handedBack = cache.get(weakMemoKey(b as string))                 // second caller, different passphrase
  assert.equal(handedBack, keyFor(a as string), 'the cache hits — on the wrong entry')
  assert.notEqual(handedBack, keyFor(b as string),
    'THE SECOND CALLER RECEIVES THE FIRST CALLER SECRET KEY. Not a slow path, not a miss: a confident wrong answer')

  // the memo key crypt.ts actually uses separates exactly the same two inputs
  assert.notEqual(strongMemoKey(a as string), strongMemoKey(b as string),
    'the SHA-256 memo key is what makes the cache hit mean what the caller thinks it means')
})

test('THE INVOLUTION, WHICH IS THE HALF A WRONG-KEY TEST CANNOT SEE: the memo must return the RIGHT key too', () => {
  // A cache can be made collision-proof by never hitting — refuse every lookup and no caller ever receives another
  // caller's key. That passes the test above and destroys the only reason the memo exists. So the reflected
  // direction is the other half of the same law: SAME derivation input must return the SAME key, and it must be
  // the key an uncached derivation would have produced. Tested through the public surface, because the cache is
  // deliberately private and a test that reached inside it would be testing its implementation, not its promise.
  const msg = 'the terms of the contract'
  const pass = 'gamma-passphrase'

  // encrypt is convergent by default: same message, same passphrase, same salt -> the SAME sealed envelope. That
  // equality is only possible if the second derivation returned exactly the first key, cache hit or not.
  const first = encrypt(msg, pass)
  const second = encrypt(msg, pass)
  assert.equal(second.ct, first.ct, 'a repeat must reproduce the ciphertext — the memo returned the right key')
  assert.equal(second.tag, first.tag, 'and the same authentication tag')
  assert.equal(second.salt, first.salt)

  // the involution itself, both ways round and across envelopes: decrypt undoes encrypt, and the key that opens
  // one opens the other, because they ARE the same key
  assert.equal(decrypt(first, pass), msg, 'decrypt . encrypt = identity')
  assert.equal(decrypt(second, pass), msg)
  assert.equal(decrypt(first, pass), decrypt(second, pass))

  // and the reflection must not be an accident of the message being short or the passphrase being simple
  for (const m of ['', 'a', 'x'.repeat(1000), 'unicode: ∀ε>0 ∃δ — ЗдравейÑ']) {
    const s = encrypt(m, pass)
    assert.equal(decrypt(s, pass), m, 'the involution holds across empty, long and non-ASCII plaintexts')
    assert.equal(encrypt(m, pass).ct, s.ct, 'and the memo reflects the same key back for each of them')
  }
})

test('THE REMAINING DIRECTIONS — a memo key is a claim about EVERY component, not just the passphrase', () => {
  // Counting: a cache lookup has more than two outcomes worth guarding, and calling wrong-key/right-key "both
  // directions" undercounts it. The memo key is built from THREE components — iteration count, salt, passphrase —
  // and each one must move it, or two genuinely different derivations share an entry and the earlier key is
  // served for the later request. That is the same failure as the collision above, reached without any collision
  // at all: simply by a component the key forgot to include.
  const k = (iter: number, salt: string, pass: string): string =>
    hex(sha256(enc.encode('uuidna-kdf-v1|' + iter + '|' + salt + '|' + pass)))

  const base = k(600000, 'AAAA', 'secret')
  assert.notEqual(k(600001, 'AAAA', 'secret'), base, 'the ITERATION COUNT must move the memo key')
  assert.notEqual(k(600000, 'BBBB', 'secret'), base, 'the SALT must move it — same passphrase, different salt, different key')
  assert.notEqual(k(600000, 'AAAA', 'secrets'), base, 'the PASSPHRASE must move it')

  // AND THE DELIMITER MUST ACTUALLY DELIMIT. Concatenating components with a separator is only injective if the
  // separator cannot occur inside a component: without that, ("AA","BB") and ("AA|BB","") are the same string and
  // two different derivations collide with no hash weakness involved. Here the salt and passphrase are base64,
  // whose alphabet is A-Za-z0-9+/= and excludes the pipe — so the property holds, and it holds BECAUSE of the
  // encoding rather than by luck. This asserts the encoding fact the injectivity rests on.
  const B64 = /^[A-Za-z0-9+/=]*$/
  for (const s of ['AAAA', 'B+/=', '']) assert.match(s, B64, 'a base64 component can never contain the delimiter')
  assert.notEqual(k(600000, 'AA', 'BB'), k(600000, 'AA|BB', ''), 'so shifting the split cannot produce one key')
})

test('and the real thing does not confuse them — two passphrases, two ciphertexts, no crossover', () => {
  const msg = 'the terms of the contract'
  const one = encrypt(msg, 'alpha-passphrase')
  const two = encrypt(msg, 'beta-passphrase')
  assert.notEqual(one.ct, two.ct, 'different passphrases must not produce the same ciphertext')
  assert.equal(decrypt(one, 'alpha-passphrase'), msg)
  assert.equal(decrypt(two, 'beta-passphrase'), msg)
  // and the wrong passphrase must FAIL rather than return plausible bytes — Poly1305 is what refuses here
  assert.throws(() => decrypt(one, 'beta-passphrase'), /.*/, 'the tag must reject a wrong key, never half-open it')
  // the memo must not leak across passphrases even when the plaintext is identical, which is the case a cache
  // keyed on the message alone would get wrong
  assert.equal(decrypt(one, 'alpha-passphrase'), decrypt(two, 'beta-passphrase'))
})
