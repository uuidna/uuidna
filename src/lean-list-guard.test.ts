// THE CLEANUP CARRIES THE GUARD THAT PREVENTS ITS RETURN.
//
// Five copies of a one-line Nat-list renderer had accumulated across four generators — `list` in lean-diagonal and
// lean-land-rights, `L` in lean-sicross, and BOTH `vec` and `list` in lean-plancklattice, two byte-identical
// functions in one file. They are now one export, lean-gen's `leanList`. Collecting duplicates without computing a
// guard against them only resets the clock: the sixth copy is one convenient moment away, and it will be added by
// somebody who has no reason to know the other four ever existed.
//
// THE CHECK IS OVER THE SOURCE, NOT A REMEMBERED LIST OF FILES. A finder that names the four files it knows about
// cannot see the fifth — BY CONSTRUCTION, since a check written against four named copies has the fifth nowhere in
// its input — which is the same error that let five copies accumulate in the first place: every one of
// them was locally reasonable. So this walks every generator and asks the structural question instead.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { leanList } from './scripts/lean-gen.js'

const SCRIPTS = join(ROOT, 'src', 'scripts')
const generators = (): string[] =>
  readdirSync(SCRIPTS).filter((f) => f.startsWith('lean-') && f.endsWith('.ts') && !f.endsWith('.test.ts'))

/** any local function whose whole body renders a joined array as a bracketed literal */
const LOCAL_RENDERER = /^\s*(?:export\s+)?const\s+(\w+)\s*=\s*\([^)]*\)\s*:\s*string\s*=>\s*`\[\$\{\s*\w+\s*\.join\(\s*', '\s*\)\s*\}\]`/gm

test('no generator keeps its own copy of the Nat-list renderer', () => {
  const offenders: string[] = []
  for (const f of generators()) {
    if (f === 'lean-gen.ts') continue // the one home
    const src = readFileSync(join(SCRIPTS, f), 'utf8')
    for (const m of src.matchAll(LOCAL_RENDERER)) offenders.push(`${f}: const ${m[1]}`)
  }
  assert.deepEqual(offenders, [],
    'import leanList from ./lean-gen.js instead — the emitted text is the kernel\'s input, and five spellings of one '
    + 'literal are five places a separator can drift into a different-but-valid term')
})

test('the collected renderer still renders exactly what the five copies did', () => {
  // all five bodies were `[${x.join(', ')}]`, so this is the contract they shared, pinned.
  assert.equal(leanList([1, -1, 5, -2]), '[1, -1, 5, -2]')
  assert.equal(leanList([]), '[]')
  assert.equal(leanList([7]), '[7]')
  // the separator is comma-SPACE; a bare comma is valid Lean too, which is exactly why drift here is silent
  assert.ok(leanList([1, 2]).includes(', '), 'the separator is ", " — a bare comma would still parse')
})

// AND THE VECTOR OPS, for the same reason: lean-plancklattice defined `add`/`sub` over exponent vectors and
// src/quantum/combinatorics exported the identical pair — a module extracted FROM this structure so lean-sicross
// could share it, while the file it came from kept its own.
test('no generator keeps its own copy of exponent-vector add/sub', () => {
  const LOCAL_VEC_OP = /^\s*const\s+(add|sub)\s*=\s*\(a:\s*readonly number\[\]/gm
  const offenders: string[] = []
  for (const f of generators()) {
    const src = readFileSync(join(SCRIPTS, f), 'utf8')
    for (const m of src.matchAll(LOCAL_VEC_OP)) offenders.push(`${f}: const ${m[1]}`)
  }
  assert.deepEqual(offenders, [], 'import add/sub from ../quantum/combinatorics/index.js — it also refuses a lattice whose points disagree about the basis')
})
