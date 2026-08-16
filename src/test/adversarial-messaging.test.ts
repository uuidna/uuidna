// adversarial-messaging — the three-team security drill (a trinity: 1 sealer + 2 reversers). Team 1 seals a
// private message at maximum strength (the ChaCha20-Poly1305 envelope over a rotating PBKDF2 derivation); Teams 2
// and 3 independently REVERSE, trying to recover the plaintext. The message is PRIVATE only if BOTH reversers fail
// — a 2-of-2 unanimity (the security NOR: one success breaks it). The drill also proves the test can SUCCEED at
// breaking: when Team 1 uses only the CARRIER (imprint) instead of the cipher, Team 2 recovers instantly — the
// carrier was never encryption (Module 6). Pure, offline, deterministic. Integrity, not omniscience.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encrypt, decrypt } from '../crypt.js'
import { imprintTextChain, readImprintTextChain } from '../imprint.js'

const SECRET = 'the privacy message: rendezvous at the double torus'
const KEY = 'correct horse battery staple — the only secret the teams do not share'

test('cipher path — Team 1 seals; Teams 2 and 3 both fail; the message stays private', () => {
  // Team 1 (defence): maximum messaging security — the sealed envelope, advancing step.
  const sealed = encrypt(SECRET, KEY, 7)
  assert.notEqual(Buffer.from(sealed.ct, 'base64').toString('latin1'), SECRET, 'the ciphertext is not the plaintext')

  // Team 2 (reverse by the carrier codec): treat the ciphertext as an imprint chain and decode.
  let team2 = ''
  try { team2 = readImprintTextChain([sealed.ct]) } catch { team2 = '<threw>' }
  assert.notEqual(team2, SECRET, 'Team 2 cannot carrier-decode a real cipher back to the plaintext')

  // Team 3 (reverse by guessing the key): decrypt with a wrong passphrase.
  let team3 = ''
  try { team3 = decrypt(sealed, 'wrong passphrase') } catch { team3 = '<threw>' }
  assert.notEqual(team3, SECRET, 'Team 3 cannot decrypt without the key (AEAD rejects a wrong key)')

  // Privacy = BOTH reversers failed (the security NOR). Only Team 1, with the key, recovers it.
  const privateHeld = team2 !== SECRET && team3 !== SECRET
  assert.equal(privateHeld, true, 'the message is private: neither independent reversal succeeded')
  assert.equal(decrypt(sealed, KEY), SECRET, 'only the key holder reads it')
})

test('carrier path — the drill CAN break: a carried message is not private, Team 2 recovers it', () => {
  // Team 1 mistakes the carrier for a cipher (Module 6 error): imprint, no encryption.
  const carried = imprintTextChain(SECRET)
  // Team 2 reverses immediately — the carrier is bijective by design, never secret.
  const team2 = readImprintTextChain(carried)
  assert.equal(team2, SECRET, 'the carrier yields to the first reverser — it was never encryption')
  // That the attack CAN succeed is what makes the cipher path’s privacy mean something.
})
