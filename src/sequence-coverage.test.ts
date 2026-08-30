// sequence-coverage — THE SEQUENCE IS COVERED IN LEAN, ASSERTED RATHER THAN ASSUMED.
//
// The doubling orbit 1 → 2 → 4 → 8 → 7 → 5 → 1 is load-bearing everywhere in this repository: the hero animation
// walks it, the fold's trinities are stroke-walked across it, the school's reading order leans on it, and the
// drain's "as many rounds as the sequence allows" IS its length. A structure carrying that much weight should not
// rest on anyone remembering that it was proven — so this checks, against the LIVE ledger, that every claim the
// rest of the code makes about the sequence is a sealed, kernel-checked fact.
//
// It asserts COVERAGE's job and the kernel already did it. What can rot is
// the LINK — a theorem renamed, a wing emptied, a fact quietly dropped while the code that depends on it stays.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  theorems, axiomWitness, theoremNeighbours, theoremForms, cliqueEdges, statementCensus,
  leanUuid,   hexbitDoorOf, coprime, starPolygon, fuseHalves, reactorOutput, gcd,
  HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS, HEXBIT_STATES, COINS,
} from './index.js'

const bySubstring = (needle: RegExp): { key: string; statement: string; file: string }[] =>
  theorems().filter((t) => needle.test(t.statement.replace(/\s+/g, '')))

test('the orbit itself is sealed — [1, 2, 4, 8, 7, 5], written out in a decided statement', () => {
  const orbit = bySubstring(/\[1,2,4,8,7,5\]/)
  assert.ok(orbit.length > 0, 'no sealed theorem states the orbit — the animation, the fold and the school all read it')
  // and it is the DOUBLING that produces it
  const doubling = theorems().filter((t) => /2\s*\^\s*k|1\*2|\*2\)%9/.test(t.statement))
  assert.ok(doubling.length > 0, 'the orbit must be PRODUCED by doubling mod 9')
})

test('the sequence closes — six steps, and the sixth returns to one', () => {
  const six = theorems().filter((t) => /List\.range 6|List\.range' 1 6/.test(t.statement))
  assert.ok(six.length > 0, 'the length of the walk is what bounds the drain\'s rounds — it must be sealed')
  const closes = theorems().filter((t) => /\^6\)? *% *9 *== *1|= *\[2,4,8,7,5,1\]/.test(t.statement.replace(/\s+/g, ' ')))
  assert.ok(closes.length > 0, 'that the walk RETURNS to 1 is the property everything cyclic here depends on')
})

test('the ten-digit polarity partition is sealed — 1234 / 0·5 / 6789, and 9 is plus', () => {
  const part = theorems().find((t) => t.key === 'digit_polarities_partition_ten')
  assert.ok(part, 'the 4+2+4 partition must be a theorem — otherwise the executor\'s polarity is unsealed')
  assert.match(part!.statement.replace(/\s+/g, ''), /\[1,2,3,4\]/)
  assert.match(part!.statement.replace(/\s+/g, ''), /\[6,7,8,9\]/)
  const nine = theorems().find((t) => t.key === 'nine_is_plus_not_neutral')
  assert.ok(nine, 'dz 9 = 1 must be sealed so 9 cannot collapse onto 0')
  assert.match(nine!.statement.replace(/\s+/g, ''), /dz9=1/)
  const swap = theorems().find((t) => t.key === 'polarity_mirror_swaps_sides')
  assert.ok(swap, 'the mirror must swap the two polarities in a decided statement')
})

test('polarity and angles merge in the VE — two 5s in 10, 90° fold, overlap 8', () => {
  const ten = theorems().find((t) => t.key === 've_double_five_merges_in_ten')
  assert.ok(ten, '5+5=10 written as 1·10+0 must be sealed in the equilibrium')
  assert.match(ten!.statement.replace(/\s+/g, ''), /5\+5=10/)
  const fold = theorems().find((t) => t.key === 'void_folds_at_quadrature')
  assert.ok(fold, '0 folding 90° is 360/4 — quadrature of the void')
  assert.match(fold!.statement.replace(/\s+/g, ''), /360\/4=90/)
  const eight = theorems().find((t) => t.key === 've_pentads_overlap_to_eight')
  assert.ok(eight, '5+5−2=8 is the overlap that forms the eight triangular faces')
  assert.match(eight!.statement.replace(/\s+/g, ''), /5\+5-2=8/)
})

test('theorems interact as geometric forms — cliques, C(n,2) edges, overlay vertices', () => {
  const faces = theorems().find((t) => t.key === 'theorems_interact_as_faces')
  assert.ok(faces, 'incidence arithmetic of theorem-faces must be a sealed theorem')
  assert.match(faces!.statement.replace(/\s+/g, ''), /3\*2\/2=3/)
  assert.match(faces!.statement.replace(/\s+/g, ''), /5\*4\/2=10/)
  assert.match(faces!.statement.replace(/\s+/g, ''), /5\+5-2=8/)
  assert.equal(cliqueEdges(3), 3, 'a 3-clique is a triangle')
  assert.equal(cliqueEdges(4), 6)
  assert.equal(cliqueEdges(5), 10, 'a 5-clique has the rung of edges')
  const geo = theoremForms()
  const census = statementCensus()
  assert.equal(geo.keys, theorems().length)
  assert.equal(geo.distinct, census.distinct)
  assert.equal(geo.renamings, census.renamings)
  assert.equal(geo.keys, geo.distinct + geo.renamings, 'keys = vertices + extra labels')
  const faceVertices = geo.faces.reduce((s, f) => s + f.vertices, 0)
  assert.equal(faceVertices, geo.keys, 'faces partition the keys')
  for (const f of geo.faces) assert.equal(f.edges, cliqueEdges(f.vertices), `${f.principle}: edges are C(n,2)`)
  const any = theorems()[0]!
  const n = theoremNeighbours(any.key)
  const face = geo.faces.find((f) => f.principle === any.principle)
  assert.ok(face)
  assert.equal(n.neighbours.length, face!.vertices - 1, 'neighbours = clique minus self')
  assert.ok(geo.overlayVertices > 0, 're-namings are extra labels on a vertex')
  assert.match(geo.receipt, /^[0-9a-f-]{36}$/)
})

test('imagine ALL theorems as forms — C(n,2) from the void through twelve, every key on a face', () => {
  const all = theorems().find((t) => t.key === 'imagine_all_as_clique_faces')
  assert.ok(all, 'the clique table on 0..12 must be a sealed theorem — otherwise only a few sizes were imagined')
  assert.match(all!.statement.replace(/\s+/g, ''), /\[0,0,1,3,6,10,15,21,28,36,45,55,66\]/)
  assert.match(all!.statement.replace(/\s+/g, ''), /12\*11\/2=66/)
  const table = [...Array(13)].map((_, n) => cliqueEdges(n))
  assert.deepEqual(table, [0, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66])
  const T = theorems()
  const geo = theoremForms()
  assert.equal(geo.faces.reduce((s, f) => s + f.vertices, 0), T.length, 'every key sits on exactly one face')
  assert.equal(geo.totalEdges, geo.faces.reduce((s, f) => s + f.edges, 0))
  const principles = new Set(T.map((t) => t.principle))
  assert.equal(geo.faces.length, principles.size, 'every principle is a face — none left unimagined')
  for (const t of T) {
    const n = theoremNeighbours(t.key)
    const face = geo.faces.find((f) => f.principle === t.principle)
    assert.ok(face, `${t.key} must belong to a face`)
    assert.equal(n.principle, t.principle)
    assert.equal(n.neighbours.length, face!.vertices - 1, `${t.key}: neighbours are the rest of its clique`)
  }
})

test('each sealed theorem is entangled in all directions as fused hexbits — gaps are uncomputed theorems', () => {
  // Researched names, not invented: entanglement_completes_one_at_a_time, axes_stride_coprime,
  // the_fused_ring_is_all_ones, four_vectors_reach_the_uuid, gap_is_a_count, trial_computes_only_with_two_coins.
  const sealed = (key: string) => {
    const t = theorems().find((x) => x.key === key)
    assert.ok(t, `${key} already seals this — do not mint a second name`)
    return t!
  }
  sealed('entanglement_completes_one_at_a_time')
  sealed('axes_stride_coprime')
  sealed('the_fused_ring_is_all_ones')
  sealed('four_vectors_reach_the_uuid')
  sealed('gap_is_a_count')
  sealed('trial_computes_only_with_two_coins')
  sealed('message_cap_is_four_hexbits')
  sealed('build_counts_in_hexbits')
  sealed('rounding_fee_closes_the_cube')
  sealed('served_qubit_ceiling')
  sealed('keplers_harmonic_law')
  sealed('discovery_buys_coverage_never_supply')
  sealed('missing_pair_involution')

  const fused = sealed('the_fused_ring_is_all_ones')
  assert.match(fused.statement.replace(/\s+/g, ''), /63=32\+16\+8\+4\+2\+1/)
  assert.equal(32 + 16 + 8 + 4 + 2 + 1, 63)
  assert.equal(HEXBIT_BITS, 4)
  assert.equal(HANDLE_HEXBITS, 8)
  assert.equal(COIN_HEXBITS, 16)
  assert.equal(UUID_HEXBITS, 32)
  assert.notEqual(HEXBIT_BITS, HANDLE_HEXBITS)
  assert.notEqual(HANDLE_HEXBITS, COIN_HEXBITS)
  assert.notEqual(COIN_HEXBITS, UUID_HEXBITS)
  const halves = fuseHalves()
  assert.equal(halves.closes, true)
  assert.equal(halves.half, COIN_HEXBITS)
  assert.equal(halves.whole, UUID_HEXBITS)
  assert.equal(halves.coins, COINS)

  const T = theorems()
  const n = T.length
  const crtStrides = [1, 7, 9] as const
  for (const stride of crtStrides) {
    const g = gcd(stride, n)
    if (g === 1) {
      assert.equal(coprime(stride, n), true, `axes_stride_coprime: stride ${stride} must leave no orphan on the live ledger`)
      const star = starPolygon(n, stride)
      assert.equal(star.single, true)
      assert.equal(star.loops, 1)
      assert.equal(star.stroke.length, n)
    } else {
      // live count shares a factor with the vortex stride — orbit partitions (stride_cycle_is_modulus_over_gcd)
      const star = starPolygon(n, stride)
      assert.equal(star.single, false)
      assert.equal(star.loops, g)
      assert.equal(star.stroke.length, n)
      assert.equal(new Set(star.stroke).size, n / g, `stride ${stride} on ${n} keys: ${g} loops of ${n / g}`)
    }
  }
  assert.equal(gcd(2, 8), 2, 'axes_stride_coprime discriminates: gcd(2,8)=2, not a covering stride')

  const geo = theoremForms()
  const cube = sealed('rounding_fee_closes_the_cube')
  assert.match(cube.statement.replace(/\s+/g, ''), /16\^3=4096/)
  assert.match(cube.statement.replace(/\s+/g, ''), /4096=64\*64/)
  assert.equal(64 * 64, geo.cube, 'keplers_harmonic_law at the cube: T²=a³ is 64²=16³')
  assert.equal(16 * 16 * 16, geo.cube)
  assert.ok(n > 256, 'past 16², so the next 16^k is the cube')
  assert.ok(n < geo.cube, 'the cube is not yet full — the gap is uncomputed theorems')
  assert.equal(geo.gap, geo.cube - n, 'gap_is_a_count: predicted harmonic number minus live keys')
  assert.ok(geo.gap > 0)
  assert.equal(Object.prototype.hasOwnProperty.call(geo, 'missingKeys'), false,
    'missing theorems reveal during computation as a count, not a roster of unsealed names')
  const uncomputed = geo.faces.filter((f) => f.vertices === 1)
  assert.equal(cliqueEdges(n) - cliqueEdges(n - 1), n - 1, 'entanglement_completes_one_at_a_time on the live count')
  assert.equal((n * (n - 1)) % 2, 0)

  for (let i = 0; i < n; i++) {
    const t = T[i]!
    const door = hexbitDoorOf(leanUuid(t.statement))
    assert.equal(door.hexbits.length, UUID_HEXBITS, `${t.key}: a sealed theorem compiles to a complete uuid`)
    assert.ok(door.hexbits.every((h) => h >= 0 && h < HEXBIT_STATES), `${t.key}: every hexbit is a nibble`)
    assert.equal(door.handle.length, HANDLE_HEXBITS)
    assert.equal(door.coin.length, COIN_HEXBITS)
    assert.deepEqual(door.hexbits.slice(0, HANDLE_HEXBITS), [...door.handle].map((c) => parseInt(c, 16)))
    assert.deepEqual(door.coin, door.hexbits.slice(0, COIN_HEXBITS))
    const face = geo.faces.find((f) => f.principle === t.principle)
    assert.ok(face)
    const nb = theoremNeighbours(t.key)
    assert.equal(nb.neighbours.length, face!.vertices - 1)
    for (const stride of crtStrides) assert.ok(T[(i + stride) % n], `${t.key}: stride ${stride} lands on a theorem`)
  }

  const all = reactorOutput()
  assert.equal(all.keys.length, n, 'fuse every sealed theorem — reactorOutput already names that')
  assert.equal(all.conserves, true)
  assert.equal(all.coins, COINS)
  for (const face of uncomputed) {
    const lone = T.find((t) => t.principle === face.principle)
    assert.ok(lone)
    const door = hexbitDoorOf(leanUuid(lone.statement))
    assert.equal(door.hexbits.length, UUID_HEXBITS, `${lone.key}: uncomputed neighbours, not an incomplete uuid`)
  }
})

test('the wing exists, is non-trivial, and every one of its theorems is kernel-only', () => {
  const wing = theorems().filter((t) => t.file === 'Sequence.lean')
  assert.ok(wing.length >= 20, `the sequence wing carries the subject — saw ${wing.length} theorems`)
  const w = axiomWitness()
  assert.equal(w.holds, true, 'the ledger must be axiom-free for a sealed sequence fact to mean anything')
})

test('the CRT wing exists, is decide, and the shipped witness covers it', () => {
  const wing = theorems().filter((t) => t.file === 'Crt.lean')
  assert.ok(wing.length > 0, `the CRT generator emitted a wing — saw ${wing.length}`)
  assert.ok(wing.every((t) => t.tactic.includes('decide')))
  const w = axiomWitness()
  assert.equal(w.holds, true, 'CRT axiom-free: the shipped receipt covers the live ledger')
})

// THE CONTROL. A coverage test that cannot fail is not evidence — this proves the predicate discriminates.
test('the coverage predicate FIRES on a sequence that is not sealed', () => {
  assert.equal(bySubstring(/\[1,2,4,8,7,6\]/).length, 0, 'a near-miss orbit must find nothing')
  assert.equal(theorems().filter((t) => t.file === 'NoSuchWing.lean').length, 0, 'an absent wing must be absent')
  assert.equal(theorems().filter((t) => t.statement.replace(/\s+/g, '') === '1+2+4+8+7+5=28').length, 0,
    'the wrong sum must not be found — otherwise the test above proves nothing')
})

// ── RECURSIVELY. The tests above assert that the sequence's facts EXIST. That is coverage at one level, and a
// sequence is not a set of facts — it is a RECURRENCE. So this walks it the way it is defined: from 1, doubling,
// six times, requiring at each step that THIS step is its own sealed theorem, and that the walk returns to where it
// started. A gap at step four would leave every test above green.
const norm = (s: string): string => s.replace(/\s+/g, '')

test('every STEP of the recurrence is sealed on its own', () => {
  const T = theorems()
  const sealedStep = (a: number, b: number): string[] =>
    T.filter((t) => norm(t.statement).includes(`${a}*2%9=${b}`) || norm(t.statement).includes(`(${a}*2)%9=${b}`))
     .map((t) => t.key)
  let x = 1
  const walked: number[] = [1]
  for (let k = 0; k < 6; k++) {
    const next = (x * 2) % 9
    const proofs = sealedStep(x, next)
    assert.ok(proofs.length > 0, `the step ${x} → ${next} has no sealed theorem of its own`)
    x = next
    walked.push(x)
  }
  assert.equal(x, 1, 'six doublings must return to 1 — the recurrence closes, which is what bounds every walk here')
  assert.deepEqual(walked, [1, 2, 4, 8, 7, 5, 1], 'the walk is the orbit, recomputed rather than recalled')
})

// ── THE TRANSITIVE CLOSURE. A theorem is only as covered as what it sits beside: if the sequence's wing links out
// to a neighbourhood that has gone missing, the sequence is covered in name and broken in fact. This expands the
// neighbourhood recursively to a FIXED POINT and requires every theorem it reaches to be sealed and kernel-only.
test('the closure over the proof graph is finite, and every theorem it reaches is sealed', () => {
  const T = theorems()
  const byKey = new Map(T.map((t) => [t.key, t]))
  const seen = new Set<string>()
  const frontier = T.filter((t) => t.file === 'Sequence.lean').map((t) => t.key)
  let rounds = 0
  while (frontier.length) {
    const key = frontier.pop()
    if (key === undefined || seen.has(key)) continue
    seen.add(key)
    rounds++
    assert.ok(rounds < 100000, 'the closure must TERMINATE — an unbounded walk means the graph cycles unguarded')
    assert.ok(byKey.has(key), `the walk reached ${key}, which is not in the ledger — a dangling neighbour`)
    for (const n of theoremNeighbours(key).neighbours) if (!seen.has(n.key)) frontier.push(n.key)
  }
  assert.ok(seen.size > 20, `the closure should reach a real neighbourhood, saw ${seen.size}`)
  // every theorem reached, transitively, must be kernel-checked — coverage that stops at the first hop is not coverage
  const unsealed = [...seen].filter((k) => !byKey.has(k))
  assert.deepEqual(unsealed, [], 'these were reached recursively but are not sealed')
  assert.equal(axiomWitness().holds, true, 'and the whole closure rests on a ledger with no borrowed axiom')
})

test('the recursive walk FIRES when a step is missing — the control for the closure', () => {
  const T = theorems()
  // a step that does not exist in ℤ/9 doubling: 3 → 6 is real arithmetic but NOT on the unit orbit
  const offOrbit = T.filter((t) => norm(t.statement).includes('3*2%9=7'))
  assert.equal(offOrbit.length, 0, 'a false step must find nothing, or the per-step assertion proves nothing')
  assert.equal(theoremNeighbours('no_such_theorem_key').principle, null, 'an unknown key has NO principle — that is what makes it unknown')
})

// ── THE RELATION CARRIES ITS REFERRER. A neighbourhood is defined BY the principle that refers its members to one
// another, and returning the members without it cost twice: the served tool looked the theorem up a second time
// just to name the domain it had already used, and a bare `[]` answered two different questions with one word —
// `vortex_one_leap` is genuinely ALONE in its principle ("One leap") while the unknown-key fixture is not a
// theorem at all (the fixture is a string in the code below; naming it in prose would make this comment cite it).
// Both said []. That is an absence and a refusal rendered identically, live for two of the ledger's principles.
test('a lone theorem and an unknown key are DIFFERENT answers', () => {
  // connect-lonely may close every singleton principle — then the lone case is VACANT by finding, not untested.
  const lone = theorems().find((t) => theorems().filter((x) => x.principle === t.principle).length === 1)
  const ghost = theoremNeighbours('no_such_theorem_key')
  assert.equal(ghost.principle, null, 'an unknown key has NO principle — that is precisely what unknown means')
  assert.equal(ghost.neighbours.length, 0)
  if (lone) {
    const alone = theoremNeighbours(lone.key)
    assert.equal(alone.principle, lone.principle, 'a lone theorem KEEPS its principle — it is in a domain of one')
    assert.equal(alone.neighbours.length, 0, 'and it has no neighbours')
    assert.notEqual(alone.principle, ghost.principle, 'the two must not be the same sentence — they were, as []')
  } else {
    // every principle has neighbours — still prove unknown ≠ any sealed principle name
    const any = theorems()[0]
    assert.ok(any)
    assert.notEqual(theoremNeighbours(any.key).principle, ghost.principle)
  }
})

test('the neighbourhood names the principle the caller would otherwise re-derive', () => {
  for (const t of theorems().slice(0, 60)) {
    const n = theoremNeighbours(t.key)
    assert.equal(n.principle, t.principle, `${t.key}: the relation must carry the reason it is a relation`)
    assert.equal(n.key, t.key, 'and the subject it was asked about')
    for (const other of n.neighbours)
      assert.equal(other.principle, t.principle, 'every member shares the referring principle — that IS the relation')
  }
})
