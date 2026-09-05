// finder-coverage — A FINDER THAT NOBODY CALLS IS A CLAIM NOBODY CHECKS. Every gap-finder exported by one-receipt must
// be wired into the guard as BLOCKING, declared ADVISORY with a stated reason, or listed ON_DEMAND here with why —
// and this test fails if a new one appears in none of those places.
//
// MEASURED, the day it was folded (2026-08-17): three finders — `dry`, `seo`, `vacuous` — existed and were invoked
// NOWHERE in the tree: not the guard. The moment `vacuous` was first run it
// named 12 findings, all of them theorems already sealed and published whose proofs are true regardless of content
// (P ∨ ¬P, P ↔ P). The code to catch that class had been written and never executed. This is the finder for finders.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

/** Deliberately not in the guard, each with the reason it stays out — a measured cost. */
const ON_DEMAND: Record<string, string> = {
  // A LAW FOR THE PERSON, NOT A GATE ON THE KERNEL. lonely reports theorems sharing neither symbol nor constant
  // with any neighbour in their wing — `108 * 17 = 1836` sitting in Vortex.lean touching nothing, its meaning
  // carried by the key alone. Real, and not a Lean violation: a wing's FIRST theorem in a new direction has no
  // neighbours yet, and that is growth. Blocking on it would refuse exactly that. It is driven by
  // connect-lonely, which reduced it 23 -> 10 by giving each isolated value its digital root — the one fact
  // every wing here already shares.
  lonely: 'reports theorems that connect to no neighbour in their wing; driven by connect-lonely, not gated because a new direction legitimately begins alone',
  crypto: 'covers every cryptographic operation against its KAT; the crypto-primitives tests already assert the vectors each pass, so the guard would pay twice',
  re: 'measures reverse-engineering cost by bounded key recovery at ~2.1s per guess on this host — a measurement',
  // DEMOTED OUT OF THE GUARD ENTIRELY on 2026-08-21
  // and a gate that cannot refuse a proof is custom logic over spelling, counting or presentation. They remain
  // exported because the MEASUREMENT is still worth asking for on demand; what ended is their power to block.
  seo: 'reports page descriptions outside a search-snippet band; this project\'s descriptions carry honest scope and are longer BY DESIGN, so the band is advice and never law',
  // MOVED TO THE AUDIT CHAIN on 2026-08-21 — not on-demand: `npm run audit` runs each by name every pass, so they
  // still report before anything ships. They left the GATE because the gate decides whether a RECONCILE may run, and
  // none of the three protects the commit: a reconcile with any of them open still stages a correct derived layer
  // over an unforged ledger. Together they were 580ms of a gate the captain holds to one second.
  dormant: 'asks whether built code is ever EXERCISED, not whether the commit is honest — runs in npm run audit (one-receipt dormant)',
  skills: 'asks whether a sealed skill is reachable through a dispatch; the stdio/edge pair is held by skill-surface.test.ts — runs in npm run audit (one-receipt skills)',
  micro: 'reads the BUILT site\'s JSON-LD, which a pre-reconcile gate has no reason to require built — runs in npm run audit (one-receipt micro)',
  sources: 'demands a named authority for an empirically measured quantity — right for a wing that reads the world, and exactly wrong as a gate on a wing that reads only arithmetic',
  leanNegation: 'flags object-level negation comments without discharge beneath the Lean line; NOT a blocking guard — first run flooded false positives (lexical claim-vs-name), runs on demand via one-receipt lean-negation and state finder',
}

test('every finder one-receipt exports is wired: blocking in the guard, advisory with a reason, or on-demand with why', () => {
  const oneReceipt = readFileSync(join(ROOT, 'src', 'scripts', 'one-receipt.ts'), 'utf8')
  const guard = readFileSync(join(ROOT, 'src', 'scripts', 'guard.ts'), 'utf8')
  // every exported gap-finder, by its leaf name: `export function fooGaps` → 'foo'
  const finders = [...oneReceipt.matchAll(/^export (?:async )?function ([a-zA-Z]+)Gaps\b/gm)].map((m) => m[1])
  assert.ok(finders.length >= 9, `expected the finder family, found ${finders.length}`)

  // the guard's two tiers, read from its own lists rather than assumed
  const blocking = new Set([...guard.matchAll(/\{ name: '([a-z]+)', run:/g)].map((m) => m[1]))
  const advisory = new Set([...guard.matchAll(/\{ name: '([a-z]+)', run: [^\n]*\n\s*why:/g)].map((m) => m[1]))

  const unwired: string[] = []
  for (const f of finders) {
    const leaf = f === 'pipe' ? 'pipes' : f === 'import' ? 'imports' : f
    if (blocking.has(leaf) || advisory.has(leaf) || leaf in ON_DEMAND) continue
    unwired.push(`${f}Gaps → nothing runs it`)
  }
  assert.deepEqual(unwired, [], 'wire it into the guard, declare it ADVISORY with a reason, or add it to ON_DEMAND with why')
})

test('an advisory finder must state WHY it does not block — "not blocking" is a decision', () => {
  const guard = readFileSync(join(ROOT, 'src', 'scripts', 'guard.ts'), 'utf8')
  const advisoryBlock = guard.slice(guard.indexOf('const ADVISORY'))
  const entries = [...advisoryBlock.matchAll(/\{ name: '([a-z]+)', run: [\s\S]*?why: '([^']{40,})'/g)]
  // AN EMPTY TIER IS THE STRONGEST STATE. The tier existed so that "not blocking" was a
  // DECLARED decision rather than an accident — and reading four such declarations side by side is what showed
  // they should not be gates at all. They were removed on 2026-08-21
  // with its reason. What this test guards is that nothing sits here WITHOUT a reason; zero entries pass.
  for (const [, name, why] of entries)
    assert.ok(why.length >= 40, `advisory finder "${name}" must state a real reason, got ${why.length} chars`)
})

test('the on-demand exemptions each carry their reason', () => {
  for (const [name, why] of Object.entries(ON_DEMAND))
    assert.ok(why.length >= 40, `on-demand finder "${name}" needs a stated reason, got: ${why}`)
})

// ── EVERY FINDER IS HELD TO BE WIRED. NONE IS HELD TO BE ABLE TO FIRE.
//
// The test above refuses a finder the guard does not run. It says nothing about whether running it could ever
// return anything, and a finder is only ever executed against a tree that is expected to be clean — where
// "nothing to find" and "cannot find" produce the identical output. 2026-09-05 produced FOUR blind finders and
// every one was found by a second instrument or by another session, never by its own suite: the ambiguity
// refusal could not see a fixed point occupied 2652 times; UNDERCLAIM_FLOOR was documented and still hid a row;
// the WITNESS rule matched the bare word DOI in a repository whose subject is minting them; and vacuousGaps
// split on the top-level operator and never descended, while four theorems were wholly vacuous.
// `no_instrument_narrower_than_its_question` is sealed, and the finders were not held to it.
//
// A POSITIVE CONTROL is a test that hands the rule a crafted violation and asserts it comes back non-empty.
// SHRINK-ONLY, and ADVISORY by construction: promoting this to blocking on the day it was written would red the
// guard on fifty finders at once, and a gate that fires everywhere is a gate someone switches off — the failure
// mode src/underreach.ts names in its own header. The baseline may only fall.
const CONTROLLED_VIA: Record<string, string> = {
  thresholdGaps: 'sweepThreshold — exemption-hiding and ratchet-slack cases, both asserted non-empty',
  involutionGaps: 'discoverInvolution — the skewed-corpus and ambiguity cases',
  deadkeyGaps: 'deadKeysInLine — a purged key in a crafted line',
  underreachGaps: 'underreachIn — a hedge applied to the act of proving',
  claimBalanceGaps: 'claimBalanceOf — an under-claiming row',
}

/** the finders no test hands a crafted violation to — computed, never listed by hand */
export function findersWithoutAPositiveControl(): string[] {
  const walk = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() && !['node_modules', 'dist'].includes(e.name) ? walk(join(d, e.name))
      : e.name.endsWith('.test.ts') ? [join(d, e.name)] : [])
  // SPLIT ON A TEST DECLARATION, NOT ON ANY `test(`. `\btest\(` also matches `.test(` — `.` is a non-word
  // character, so the word boundary holds — which means every RegExp.test() call inside a test body CUT THAT BODY
  // IN HALF, separating the finder's name from the assertion that proves it fires. Measured 2026-09-05: a control
  // handing scriptsGaps a crafted violation was not counted, because the block contained `/…/.test(g.what)`.
  // An under-counting ratchet is the worse direction here: it reports debt that has already been paid, so real
  // controls look absent and the list stops meaning what it says.
  const blocks = walk(join(ROOT, 'src')).flatMap((f) => readFileSync(f, 'utf8').split(/(?<![.\w])test\(/))
  const FIRES = /length,\s*[1-9]|length\s*>=?\s*1|length\s*>\s*0|assert\.ok\(|notDeepEqual|assert\.match\(/
  const named = new Set<string>()
  for (const b of blocks) {
    if (!FIRES.test(b)) continue
    for (const m of b.matchAll(/\b([a-zA-Z]+Gaps)\b/g)) named.add(m[1]!)
    for (const [finder, helper] of Object.entries(CONTROLLED_VIA)) if (b.includes(helper.split(' ')[0]!)) named.add(finder)
  }
  const guardSrc = readFileSync(join(ROOT, 'src/scripts/guard.ts'), 'utf8')
  const wired = [...new Set(guardSrc.match(/\b[a-zA-Z]+Gaps\b/g) ?? [])].sort()
  return wired.filter((f) => !named.has(f))
}

test('ADVISORY, SHRINK-ONLY: the set of finders never shown to fire may only get smaller', () => {
  const path = join(ROOT, 'lean/finder-controls-baseline.json')
  const unproven = findersWithoutAPositiveControl()
  const baseline = new Set((JSON.parse(readFileSync(path, 'utf8')) as { unproven: string[] }).unproven)
  const added = unproven.filter((f) => !baseline.has(f))
  assert.deepEqual(added, [],
    `a NEW finder with no positive control: ${added.join(', ')} — hand it a crafted violation and assert it comes back non-empty, or add it to CONTROLLED_VIA naming the helper that does`)
  assert.ok(unproven.length <= baseline.size,
    `the unproven set grew ${baseline.size} → ${unproven.length}; it may only shrink`)
})

// THE DETECTOR NEEDED ITS OWN CONTROL, and it took uuidna-49 handing it a violation to find that out. It split
// on `\btest\(`, which ALSO matches `.test(` — `.` is a non-word character, so the boundary holds — and every
// RegExp.test() inside a test body cut that body in half, separating a finder's name from the assertion proving
// it fires. The baseline therefore reported debt ALREADY PAID: lanesGaps had a control the detector could not
// see. That is the worse direction for a shrink-only ratchet, because a real control looks absent and the number
// stops meaning what it says. An instrument built to find uncontrolled instruments, uncontrolled.
test('the split pattern separates test DECLARATIONS and never a RegExp.test() call', () => {
  const SPLIT = /(?<![.\w])test\(/
  assert.equal(SPLIT.test('  const m = /runs rosetta/.test(g.what)'), false, 'a .test( call must not split a body')
  assert.equal(SPLIT.test('  if (RE.test(line)) return'), false)
  assert.equal(SPLIT.test("\ntest('a finder fires', () => {"), true, 'a real declaration must still split')
  assert.equal(/\btest\(/.test('x.test(y)'), true, 'the OLD pattern did match .test( — this is the regression')
})

test('finders with a demonstrable control are NOT reported as unproven', () => {
  const unproven = new Set(findersWithoutAPositiveControl())
  // each of these is exercised by a test that hands it, or its named helper, a crafted violation
  for (const f of ['thresholdGaps', 'involutionGaps', 'lanesGaps', 'vacuousGaps']) {
    assert.equal(unproven.has(f), false, `${f} has a positive control and the detector cannot see it — the split or CONTROLLED_VIA has drifted`)
  }
})
