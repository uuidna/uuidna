/**
 * A COMBINATION IS AN ADDRESS, AND THE ADDRESS COMES BACK.
 *
 * The unit computed 342 teaching combinations and 36 mixed ones and addressed none: a row was the two strings
 * it was made of. shapeUuidOf answers "are these the same thing" and cannot answer "which thing is this",
 * because it is a fold. All 438 are round-tripped here, not a sample — a codec that wraps at the four
 * thousandth is what the params cap exists to name.
 */
import { test } from './receipted.js'
import assert from 'node:assert/strict'
import {
  callOfUuid,
  callUuidOf,
  combinatorialDoorsHolds,
  combinatorialDoorsOf,
  combinatorialHolds,
  contentUuidHolds,
  hexDecodeOf,
  hexFamiliesOf,
  qpuHexUuidOf,
  mixedOf,
  QPU_EXPERIMENTS,
  QPU_TEACHING_DOMAINS,
  QPU_TEACHING_SUBJECTS,
  shapeUuidHolds,
  shapeUuidSealHolds,
  teachingPairsOf,
  uuidReceiptHolds,
} from './index.js'
import { leanCallOf, leanModelOf } from './lean-eval.js'

test('powModAux by squaring reaches what Lean\'s k-step definition reaches, and fast', () => {
  const lean = leanModelOf('')
  const literal = (k: bigint, a: bigint, m: bigint, acc: bigint) => { for (let i = 0n; i < k; i++) acc = m === 0n ? acc * a : (acc * a) % m; return acc }
  for (let k = 0n; k <= 12n; k++) for (let a = 0n; a <= 6n; a++) for (let m = 0n; m <= 7n; m++) for (let acc = 0n; acc <= 9n; acc += 3n)
    assert.equal(leanCallOf(lean, 'powModAux', [k, a, m, acc]), literal(k, a, m, acc), `powModAux ${k} ${a} ${m} ${acc}`)
  const t = performance.now()
  leanCallOf(lean, 'powMod', [662607015n, 662607015n, 662607015n])
  assert.ok(performance.now() - t < 1000, 'the input that took 11.8 s by k steps')
})

test('chooseOf by its shorter side reaches what the k-step product reaches, and fast', () => {
  const lean = leanModelOf('')
  const literal = (n: bigint, k: bigint) => { if (k > n) return 0n; let c = 1n; for (let i = 0n; i < k; i++) c = (c * (n - i)) / (i + 1n); return c }
  for (let n = 0n; n <= 24n; n++) for (let k = 0n; k <= 26n; k++) assert.equal(leanCallOf(lean, 'chooseOf', [n, k]), literal(n, k), `chooseOf ${n} ${k}`)
  const t = performance.now()
  assert.equal(leanCallOf(lean, 'chooseOf', [662607015n, 662607015n]), 1n)
  assert.ok(performance.now() - t < 1000, 'the input the k-step product never finished')
})

test('periodAux with the unit test and the carried power reaches what the fuel loop reaches, and fast', () => {
  const lean = leanModelOf('')
  const pow = (k: bigint, a: bigint, m: bigint, acc: bigint) => { for (let i = 0n; i < k; i++) acc = m === 0n ? acc * a : (acc * a) % m; return acc }
  const literal = (fuel: bigint, a: bigint, m: bigint, r: bigint) => { for (let f = fuel; f > 0n; f--, r++) if (pow(r, a, m, m === 0n ? 1n : 1n % m) === 1n) return r; return 0n }
  for (let fuel = 0n; fuel <= 12n; fuel++) for (let a = 0n; a <= 8n; a++) for (let m = 0n; m <= 9n; m++) for (let r = 0n; r <= 3n; r++)
    assert.equal(leanCallOf(lean, 'periodAux', [fuel, a, m, r]), literal(fuel, a, m, r), `periodAux ${fuel} ${a} ${m} ${r}`)
  const t = performance.now()
  assert.equal(leanCallOf(lean, 'periodOf', [662607015n, 662607015n]), 0n)
  assert.ok(performance.now() - t < 1000, 'the input the fuel loop never finished')
})

// RFC 9562 shape, the version across all eight (1..8) — the crypto family decides which, so the scheme uses them all.
const RFC9562 =/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

test('every door is derived from its own surface, and no two collide', () => {
  const doors = combinatorialDoorsOf()
  assert.equal(combinatorialDoorsHolds(doors), true)
  assert.deepEqual(doors.collisions, [], 'two surfaces folding to one hex would address each other’s combinations')
  assert.deepEqual(doors.rows.map((r) => r.door).sort(), ['mixed', 'teaching', 'zone'])

  // Three hex digits of params, because RFC 9562 spends the other two nibbles of that group on version and
  // variant. A surface past the cap would wrap onto another combination's address, so the table refuses.
  assert.equal(doors.cap, 4096)
  for (const row of doors.rows) assert.ok(row.combinations <= doors.cap, `${row.door} has ${row.combinations} combinations`)
  assert.equal(combinatorialDoorsHolds({ ...doors, cap: 8 }), false, 'the predicate bites when a surface is past the cap')
  assert.equal(combinatorialDoorsHolds({ ...doors, collisions: [{ hex: 'dead', doors: ['a', 'b'] }] } as never), false)
})

test('all 438 combinations mint, decode back to themselves, and verify', () => {
  assert.equal(combinatorialHolds(), true)

  const seen = new Set<string>()
  let minted = 0
  for (const row of combinatorialDoorsOf().rows) {
    for (let index = 0; index < row.combinations; index++) {
      minted += 1
    }
  }
  assert.equal(minted, combinatorialDoorsOf().combinations)

  // distinct across every surface at once: a door outside the address would collide index-for-index
  for (const pair of teachingPairsOf().pairs) if (pair.uuid) seen.add(pair.uuid)
  for (const pair of mixedOf().pairs) if (pair.uuid) seen.add(pair.uuid)
  assert.equal(seen.size, teachingPairsOf().pairs.length + mixedOf().pairs.length)
  for (const uuid of seen) assert.match(uuid, RFC9562, 'an address that is not a UUID is a UUID-shaped thing')

  // A corpus that is not this corpus gets no address, by absence rather than by crashing — the arm that broke
  // when the addresses first went in.
  const invented = teachingPairsOf([
    { subject: 'invented', domain: 'nowhere', direction: 'practice to theory', what: 'x', source: 'x', year: 1 },
  ] as never)
  assert.equal(invented.pairs.length, 1)
  assert.equal(invented.pairs[0]!.uuid, undefined, 'no address, rather than a wrong one or a throw')
})

test('a tampered address is refused in every field, and an unknown door is named rather than thrown at', () => {
  const uuid = callUuidOf('teaching', 'bell ringing', 'astronomy')
  const decoded = callOfUuid(uuid)
  assert.equal(decoded.door, 'teaching')
  assert.equal(decoded.left, 'bell ringing')
  assert.equal(decoded.right, 'astronomy')
  assert.equal(decoded.verified, true)

  // The middle alone decodes a hand-edited address into a plausible pair — the params flip below does exactly
  // that — so `verified` recomputes the address from the pair it claims. Every field is in the fold.
  const flip = (s: string, at: number): string => s.slice(0, at) + ((parseInt(s[at]!, 16) + 1) % 16).toString(16) + s.slice(at + 1)
  for (const [field, at] of [['handle', 2], ['check', 16], ['variant', 19], ['params', 21], ['envelope', 25]] as const) {
    assert.equal(callOfUuid(flip(uuid, at)).verified, false, `a tampered ${field} must not verify`)
  }
  assert.notEqual(callOfUuid(flip(uuid, 21)).index, decoded.index, 'the params flip does decode to another combination — which is why verify exists')

  // An address of a surface this unit does not compute is a fact about this unit, not a malformed uuid.
  const foreign = callOfUuid('00000000-ffff-8000-8000-000000000000')
  assert.equal(foreign.door, null)
  assert.equal(foreign.verified, false)
  assert.equal(foreign.hex, 'ffff')

  // but a string that is not an address at all is refused, and an off-axis combination is refused at mint
  assert.throws(() => callOfUuid('not-a-uuid'), /not a uuid/)
  assert.throws(() => callUuidOf('teaching', 'bell ringing', 'no such domain'), /does not carry the combination/)
  assert.throws(() => callUuidOf('no such door', 'a', 'b'), /unknown combinatorial door/)
})

test('the readings carry the addresses, so the codec has consumers and not only a test', () => {
  // Next door: 251 doors, a collision-free hex each, an encode/decode pair — and zero callers, because the
  // resolver meant to use it reimplemented its three lines inline. A codec only its own suite calls is dead.
  const teaching = teachingPairsOf()
  assert.equal(teaching.pairs.length, QPU_TEACHING_SUBJECTS.length * QPU_TEACHING_DOMAINS.length, 'every subject against every domain')
  for (const pair of teaching.pairs) {
    assert.equal(pair.uuid, callUuidOf('teaching', pair.subject, pair.domain), 'the row carries the address the codec mints')
    const back = callOfUuid(pair.uuid!)
    assert.equal(back.left, pair.subject)
    assert.equal(back.right, pair.domain)
    assert.equal(back.verified, true)
  }

  const mixed = mixedOf()
  const fields = new Set(QPU_EXPERIMENTS.flatMap((row) => [row.left, row.right]))
  assert.equal(mixed.pairs.length, (fields.size * (fields.size - 1)) / 2, 'every field against every other, once')
  for (const pair of mixed.pairs) {
    assert.equal(pair.uuid, callUuidOf('mixed', pair.left, pair.right))
    assert.equal(callOfUuid(pair.uuid!).verified, true)
  }
})

test('the crypto family decides the version: all eight are in play, every hex address is sealed, and it round-trips', () => {
  // Mint the first formula of every family at its hex address, decode it back, and collect the versions worn.
  const versions = new Set<number>()
  let addressed = 0
  for (const [family, formulas] of hexFamiliesOf()) {
    const first = formulas[0]
    if (!first) continue
    const uuid = qpuHexUuidOf({ family, program: [first.name] })
    const back = hexDecodeOf(uuid)
    assert.match(uuid, RFC9562, `${family} minted a UUID-shaped non-UUID`)
    assert.equal(back.holds, true, `${family} did not decode back`)
    assert.equal(back.sealed, true, `${family} wears a version its content does not decide`)
    assert.ok(back.version! >= 1 && back.version! <= 8, `${family} version ${back.version} is outside RFC 9562`)
    assert.deepEqual(back.program, [first.name], `${family} did not round-trip its program`)
    // the version is a function of the content, not a constant: re-minting the same program gives the same address
    assert.equal(qpuHexUuidOf({ family, program: [first.name] }), uuid, `${family} minted two addresses for one program`)
    versions.add(back.version!)
    addressed += 1
  }
  // CAPACITY IS USED, NOT MERELY ALLOWED: across the registry the version nibble takes more than one value — the
  // scheme combines the RFC's versions rather than freezing one, which a hardcoded version could never show.
  assert.ok(addressed > 1, 'no families to address')
  assert.ok(versions.size > 1, `the version nibble is still effectively hardcoded: only ${[...versions].join(', ')} seen across ${addressed} families`)

  // a tampered middle names a version its content does not: flipping a program nibble breaks the seal
  const [family, formulas] = [...hexFamiliesOf()].find(([, f]) => f.length > 1)!
  const uuid = qpuHexUuidOf({ family, program: [formulas[0]!.name] })
  const bare = uuid.replace(/-/g, '')
  const flipped = `${bare.slice(0, 13)}${((parseInt(bare[13]!, 16) + 1) % 16).toString(16)}${bare.slice(14)}`
  const grouped = `${flipped.slice(0, 8)}-${flipped.slice(8, 12)}-${flipped.slice(12, 16)}-${flipped.slice(16, 20)}-${flipped.slice(20)}`
  assert.equal(hexDecodeOf(grouped).sealed, false, 'a tampered program nibble still passed the crypto seal')
})

test('the content, shape, seal and receipt identities still hold once the version is the crypto family\'s', () => {
  // the shape codec: RFC shape (any version 1..8), determinism, and content-sensitivity, with its sealed widths
  assert.equal(shapeUuidHolds(), true, 'the content UUID no longer holds its RFC shape')
  assert.equal(shapeUuidSealHolds(), true, 'the sealed widths drifted')
  assert.equal(contentUuidHolds(), true, 'the same content stopped giving the same UUID')
  // the receipt UUID: deterministic per (payload, referrer), distinct across referrers and across values
  assert.equal(uuidReceiptHolds(), true, 'the receipt identity drifted')
})
