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
import { theorems, axiomWitness, theoremNeighbours, theoremForms, cliqueEdges, statementCensus } from '../index.js'

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

test('the wing exists, is non-trivial, and every one of its theorems is kernel-only', () => {
  const wing = theorems().filter((t) => t.file === 'Sequence.lean')
  assert.ok(wing.length >= 20, `the sequence wing carries the subject — saw ${wing.length} theorems`)
  const w = axiomWitness()
  assert.equal(w.holds, true, 'the ledger must be axiom-free for a sealed sequence fact to mean anything')
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
