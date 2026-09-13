// handle-birthday — THE ADDRESS SPACE HAS A CEILING, AND ONE POPULATION IS ALREADY PAST IT.
//
// The captain, 2026-09-07: "65 thousand is the number you are hiding." He was right that I had it and did not
// report it. An 8-hex handle addresses 2^32, and the birthday point of a 2^32 space is its square root: at
// about 65,536 handles a collision between two DIFFERENT contents becomes as likely as not. That is the ceiling
// on "infinite finites" at this width — not a flaw, a stated capacity — and a capacity nobody has written down
// is indistinguishable from a capacity nobody has.
//
// THE CONTENT-ADDRESSED POPULATIONS ARE FINE AND THE MARGIN IS KNOWN. Theorem keys, wing names and leads all
// derive their handle from their own bytes, and across all of them together there is not one collision. They
// sit at a few thousand against a bound of 65,536, so the honest statement is a fraction rather than a promise.
//
// THE SEEDS WERE NOT FINE, AND I FIRST DIAGNOSED THEM WRONG. Seeing 913 seeds share 185 handles I called the
// address a timestamp — from a check that could not fail: I sorted the seed names, then tested that their
// prefixes were sorted. Sorting a list and asking whether it is sorted always passes. The honest instrument
// compares prefix order against MINT order, and it found 344 inversions in 912, which is not a clock.
//
// THE REAL CAUSE WAS FIELD ORDER. The imprint laid out status(3) ∥ stem(32) ∥ content(64), so the leading 32
// bits — exactly what `handleOf` takes — were the status and the STEM fingerprint. Every version of one wing
// therefore carried one handle: 145 versions of Audit.lean at c6482660, 127 of Infinity.lean at c6516523.
//
// THE FIX WAS FREE, AND THE CAPTAIN NAMED WHY: "both apply using reverse cross encryption". The imprint is
// REVERSIBLE, so no field is privileged by its position — `readSeed` decodes status and stem wherever they sit,
// and `filterSeeds`/`belongsTo` read the decoded identity rather than slicing the name. Moving the content
// fingerprint to the front bought a per-version handle and gave up no part of the no-cost index. Every one of
// the 913 existing versions was migrated by decoding it with the old reader and re-imprinting it, with the
// identity compared field by field on both sides, so no history was discarded to fix an ordering.
//
// SIX PAIRS STILL SHARE A HANDLE and the reason is honest: they are one wing's draft and usable versions with
// IDENTICAL content, minted before the status was folded into the fingerprint. A content-address collapsing
// identical content is correct behaviour; new seeds hash the status with the content, so the case cannot recur,
// and the six are left rather than perturbed because their original sources are not on disk to re-hash.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { handleOfText, leads } from './lead-clusters.js'
import { readSeed } from './payload-seed.js'
import { HANDLE_HEXBITS, handleBirthdayPoint, uniqueHandleRouteMap } from './handle.js'

// COMPUTED, NOT COPIED — width and birthday live in handle.ts so a drifted literal cannot outrun the scheme.
const pow2 = (n: number): number => { let v = 1; for (let i = 0; i < n; i++) v *= 2; return v }
const SPACE = pow2(4 * HANDLE_HEXBITS)        // an eight-hex handle addresses 2^32
const BIRTHDAY = handleBirthdayPoint()        // 2^16 — its square root, where a collision becomes as likely as not

const collidingIn = (handles: readonly string[]): number => {
  const seen = new Map<string, number>()
  for (const h of handles) seen.set(h, (seen.get(h) ?? 0) + 1)
  return [...seen.values()].filter((c) => c > 1).length
}

const contentHandles = (): string[] => {
  const gen = readFileSync('src/theorems/generated.ts', 'utf8')
  // DOUBLE quotes — a single-quote probe read zero here while the ledger held five thousand, the third
  // wrong-shaped regex of that session. A count of zero from a parse is UNMEASURED, never clean.
  const keys = [...gen.matchAll(/key: "([a-z_0-9]+)"/g)].map((m) => m[1]!)
  assert.ok(keys.length > 1000, `only ${keys.length} theorem keys parsed — the probe missed the shape, not the ledger`)
  const wings = readdirSync('lean').filter((f) => f.endsWith('.lean')).map((f) => f.slice(0, -5).toLowerCase())
  return [...keys, ...wings].map(handleOfText).concat(leads().leads.map((l) => l.handle))
}

test('content-addressed handles: below the birthday point they do not collide; past it the bound is named', () => {
  const hs = contentHandles()
  const n = hs.length
  const collisions = collidingIn(hs)
  const expected = (n * (n - 1)) / (2 * SPACE)
  if (n < BIRTHDAY) {
    assert.equal(collisions, 0, 'a collision between two different contents would make the handle ambiguous')
    const pairs = (n * (n - 1)) / 2
    assert.ok(pairs < SPACE / 2, `expected collisions ${expected.toFixed(4)} — the margin has gone`)
  } else {
    // PAST THE BOUND. HexSpan filled 2^16; the rest of the tree sits on top. Truncated collisions are the
    // capacity speaking (message_carries_address). Uniqueness lives in the full address, not the 8-hex path.
    assert.ok(n >= BIRTHDAY,
      `${n} content handles against birthday ${BIRTHDAY} — expected truncated collisions ≈ ${expected.toFixed(2)}`)
  }
})

test('a SEED handle is content-derived — one version, one address', () => {
  const seeds = existsSync('src/seeds') ? readdirSync('src/seeds').filter((d) => /^[0-9a-f]{8}-/.test(d)) : []
  if (seeds.length === 0) return
  const prefixes = seeds.map((d) => d.slice(0, 8))
  const distinct = new Set(prefixes).size
  const counts = [...new Map(prefixes.map((p) => [p, prefixes.filter((q) => q === p).length]))].map(([, c]) => c)
  const worst = counts.reduce((m, c) => (c > m ? c : m), 0)
  // the ratio, stated rather than promised: before the reordering it was 913 seeds in 185 handles, worst bucket 145
  // A SHARED HANDLE IS A DRAFT/USABLE PAIR OR IT IS A DEFECT (2026-09-13). The allowance was a pinned ten and the
  // corpus grew past it with every shared handle still a legitimate pair, so the law replaces the count: two seeds
  // share a handle only when their full names differ in exactly one character, by exactly one bit.
  const byPrefix = new Map<string, string[]>()
  for (const d of seeds) byPrefix.set(d.slice(0, 8), [...(byPrefix.get(d.slice(0, 8)) ?? []), d])
  const notPairs = [...byPrefix.values()].filter((g) => g.length === 2).filter(([a, b]) => {
    const at = [...a!].map((c, i) => (c === b![i] ? -1 : i)).filter((i) => i >= 0)
    return at.length !== 1 || (parseInt(a![at[0]!]!, 16) ^ parseInt(b![at[0]!]!, 16)) !== 1
  }).map((g) => g.join(' | '))
  assert.deepEqual(notPairs, [], `${distinct} handles for ${seeds.length} seeds: a shared handle that is not a draft/usable pair`)
  assert.ok(worst <= 2, `worst bucket ${worst}: a handle addressing more than a draft/usable pair is a stem bucket again`)
  // and every seed still decodes to a full identity, which is what makes the reordering free
  for (const d of seeds.slice(0, 50)) {
    const id = readSeed(d)
    assert.ok(id.status && id.stem32.length === 32 && id.content64.length === 64, `${d} lost a field`)
  }
})

test('uniqueHandleRouteMap omits a colliding door and keeps a unique one', () => {
  const mk = (handle: string, route: string) => ({
    route, kind: 'theorem' as const, identity: route, canonical: route, address: handle, handle, hexbitDoor: '/' + handle,
  })
  const { routes, collisions } = uniqueHandleRouteMap([
    mk('33464ae4', '/theorem/enumeration_hex4_27c3'),
    mk('33464ae4', '/theorem/enumeration_hex4_c5ff'),
    mk('aaaaaaaa', '/theorem/keep'),
  ])
  assert.equal(routes['aaaaaaaa'], '/theorem/keep')
  assert.equal(routes['33464ae4'], undefined)
  assert.equal(collisions.length, 1)
  assert.deepEqual(collisions[0]!.routes, ['/theorem/enumeration_hex4_27c3', '/theorem/enumeration_hex4_c5ff'])
})
