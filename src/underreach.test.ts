import { test } from 'node:test'
import assert from 'node:assert/strict'
import { underreachIn, underreachCensus, UNDERREACH_RE,
  decidedDomain, claimImbalances, claimBalanceOf, claimBalanceGaps, involuteClaim, UNDERCLAIM_FLOOR } from './underreach.js'

// THE INSTRUMENT MUST FIRE. A finder that returns zero is indistinguishable from a finder that detects nothing —
// the two outputs are identical, by construction — so a clean corpus is only evidence when the detector has been
// shown to catch a real under-claim first. These four cases are that demonstration, and they run before the
// corpus-wide check below is allowed to mean anything.
test('it catches a hedge applied to the act of proving', () => {
  for (const bad of [
    'This may be proven by exhaustion.',
    'The identity appears to be decided by the kernel.',
    'That result could be verified over every case.',
    'The bound might well hold for all inputs.',
  ]) assert.equal(underreachIn('t', bad).length, 1, bad)
})

test('it does NOT fire on a prohibition, a permission, or a declared measurement', () => {
  for (const good of [
    'The court may not refute the non-justiciable.',
    'Tissue pressure may safely exceed ambient by the ratio 2:1.',
    'The tropical year is a measured quantity — roughly 365.2422 days — so it may be estimated only.',
    'Every case is decided by the kernel, axiom-free.',
  ]) assert.deepEqual(underreachIn('t', good), [], good)
})

test('the sealed corpus makes no under-claim', () => {
  const c = underreachCensus()
  assert.ok(c.scanned > 30000, 'the scan must cover every surface, not a sample')
  assert.deepEqual(c.findings, [], 'a proof hedged is a proof wasted')
  assert.equal(c.clean, true)
})

// EVERY SURFACE MUST BE READ, AND A ZERO PROVES NOTHING ON ITS OWN. A peer shipped a widened sweep whose
// extractor could not read the surface it had just added: it returned zero lines from 19,519 published words and
// reported green, because an empty list and a clean list are the same list. So the census publishes a sentence
// count per surface, and a surface at zero is a blind reader rather than a clean one.
test('no surface is blind — each contributes sentences to the census', () => {
  const c = underreachCensus()
  for (const [surface, n] of Object.entries(c.bySurface))
    assert.ok(n > 0, `${surface} contributed 0 sentences — the reader does not reach it, so its clean verdict is empty`)
  assert.equal(c.scanned, Object.values(c.bySurface).reduce((a, n) => a + n, 0), 'the total must BE the surfaces')
})

// THE PLANT TEST. Proof that the reader reaches each surface's actual bytes: inject a known under-claim and the
// finding count must rise by exactly one. Lean is the surface that matters most here — its comments open with
// `--`, not `//`, which is exactly the marker a markdown-and-TypeScript extractor silently skips.
test('planting an under-claim on each surface is caught — the reader reaches the bytes', () => {
  const PLANT = 'This may be proven by exhaustion.'
  const surfaces: [string, string][] = [
    ['markdown prose', '# A title\n\nSome sealed prose about a decided fact.'],
    ['lean -- comment', '-- THE WING: every case is decided by the kernel, axiom-free.'],
    ['a bare sentence', 'The identity closes over every residue.'],
  ]
  for (const [label, text] of surfaces) {
    const clean = underreachIn(label, text).length
    assert.equal(underreachIn(label, text + '\n' + PLANT).length, clean + 1, `${label}: the plant was not caught`)
  }
})

test('the rule requires the hedge to touch the proving, not merely share a sentence', () => {
  assert.ok(!UNDERREACH_RE.test('It may rain, and the theorem is decided.'))
  assert.ok(UNDERREACH_RE.test('the theorem may be decided'))
})

// ── THE CLAIM BALANCE. The captain, 2026-09-05: "over-claims and under-claims are equally important", then
// the structure — "involuted over-claims are under-claims". One signed measure, negation as the involution, and
// the honest statement as its unique fixed point. Every test below exists because a version of the rule was
// wrong in a way only measurement showed.

test('decidedDomain counts ELEMENTS, not commas — a list of pairs is not twice as many cases', () => {
  assert.equal(decidedDomain('([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => p)'), 4,
    'counting commas read this four-case enumeration as eight and produced two false findings')
  assert.equal(decidedDomain('(∀ l : Fin 128, l.val = l.val)'), 128)
  assert.equal(decidedDomain('([1,2,3] : List Nat).all (fun n => n = n)'), 3)
  assert.equal(decidedDomain('(2 + 2 = 4)'), 0, 'a closed identity quantifies over nothing')
  assert.equal(decidedDomain('([] : List Nat).all (fun n => n = n)'), 0, 'an empty list decides no cases')
})

// THE INVOLUTION LAW, checked in the code as well as sealed in the ledger: r(b) = −b is self-inverse, its only
// fixed point is 0, and it carries each direction to the other. This is what makes the two faults ONE.
test('the claim involution is self-inverse, swaps the directions, and fixes only the honest statement', () => {
  for (let b = -12; b <= 12; b++) {
    assert.equal(involuteClaim(involuteClaim(b)), b, `r(r(${b})) must be ${b}`)
    if (b !== 0) assert.notEqual(involuteClaim(b), b, `${b} must not be fixed`)
  }
  assert.equal(involuteClaim(0), 0, 'the honest statement is the unique fixed point')
  assert.ok(involuteClaim(5) < 0 && involuteClaim(-5) > 0, 'an over-claim involutes to an under-claim and back')
})

// THE CONTROL. claimImbalances returns [] over the live ledger, and an empty list from a working measure reads
// exactly like an empty list from a blind one — so it is shown firing on the fault it is for.
//
// AND ON WHICH SIDE IT MEASURES. This measure owns the UNDER direction, which nothing in the tree had. The OVER
// direction already has a tuned rule in one-receipt's `incomplete`; re-deriving it here from the claim sentence
// was tried and fired on 1387 of 2625 theorems, most of them correctly claimed. Two rules for one sign is the
// drift this file avoids. The involution is what makes them one fault rather than two: a balance on this side
// maps to a balance on that side under r(b) = −b, with equal magnitude.
test('the measure FIRES on an under-claim, and its involute lands on the over side with equal magnitude', () => {
  const under = claimBalanceOf({ key: 'k', name: 'CLAIMED: the phase flip is its own inverse.', statement: '(∀ x : Fin 64, x.val = x.val)' })
  assert.equal(under.direction, 'under')
  assert.equal(under.proved, 64)
  assert.equal(under.balance, 1 - 64, 'a 64-case universal described as a single fact is 63 cases under')
  // the involute is the over-claim of the SAME size — equally important, which is the whole point
  assert.equal(involuteClaim(under.balance), 63)
  assert.ok(involuteClaim(under.balance) > 0, 'the mirror of an under-claim lies on the over side')
  assert.equal(claimBalanceGaps() instanceof Array, true)
})

test('a List.range quantification is SEEN — the blind spot that reported 1387 false over-claims', () => {
  assert.equal(decidedDomain('((List.range 7).all (fun a => a = a))'), 7)
  assert.equal(decidedDomain('((List.range 64).all (fun t => t = t))'), 64)
  // z7fermat is decided over List.range 7 and claims "every non-zero ray" — honest, and it was flagged until
  // the measure could read the second notation for a universal
  assert.equal(claimBalanceOf({ key: 'z7fermat', name: 'every non-zero ray to the sixth is 1 (mod 7)',
    statement: '(List.range 7).all (fun a => a = a)' }).direction, 'honest')
})

test('it stays quiet on a sentence that states its scope, and on one that NARROWS it deliberately', () => {
  assert.equal(claimBalanceOf({ key: 'k', name: 'CLAIMED over all 64 cases: it holds.', statement: '(∀ x : Fin 64, x.val = x.val)' }).direction, 'honest')
  // "on sample amplitudes" claims LESS on purpose and says so — precision, not timidity. The ledger carries
  // exactly this form (z_involution), and an earlier rule called it an under-claim.
  assert.equal(claimBalanceOf({ key: 'k', name: 'holds on sample amplitudes',
    statement: '([(1,0),(0,1),(3,-5),(-2,7),(1,1),(2,2),(3,3),(4,4)] : List (Int × Int)).all (fun p => p)' }).direction, 'honest')
})

// THE FLOOR WAS SET TOO HIGH BY ME AND A PEER'S MEASUREMENT FOUND IT. At 8, `s_dagger_inverse` — four sample
// amplitudes, no scope in its sentence — was invisible, while its sibling `z_involution` declares scope over the
// SAME four. The tree's convention declares at four, so the floor is 2 now: the smallest domain where "how many"
// is a question at all. A floor is a place for a fault to hide, so it is kept as low as it can honestly go.
test('the floor is low enough that a four-case under-claim cannot hide beneath it', () => {
  assert.equal(claimImbalances([{ key: 'k', name: 'it holds.', statement: '(∀ x : Fin 4, x.val = x.val)' }]).length, 1,
    'four cases with no scope stated is exactly the fault that was hiding at the old floor of 8')
  assert.equal(claimImbalances([{ key: 'k', name: 'it holds.', statement: '(∀ x : Fin 2, x.val = x.val)' }]).length, 1,
    `the floor is ${UNDERCLAIM_FLOOR}, the smallest domain where the question exists`)
  assert.deepEqual(claimImbalances([{ key: 'k', name: 'it holds.', statement: '(2 + 2 = 4)' }]), [],
    'a closed identity quantifies over nothing, so there is no scope to state')
})

test('the live ledger sits ON the fixed point — no claim is off its own proof in either direction', () => {
  assert.deepEqual(claimImbalances().map((b) => `${b.key}:${b.direction}${b.balance}`), [],
    'a claim off its proof is trusted wrongly in whichever direction it leans')
})
