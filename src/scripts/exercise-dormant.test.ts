// exercise-dormant — the law that a script excused from the chain is NOT excused from working.
//
// lean/dormant-scripts.json named a real class of decay honestly, but a list of excuses is not a check: for as
// long as nothing RAN these scripts, nothing could tell an idle script from a dead one. The first full sweep found
// four broken behind the excuse — two using require() inside ES modules, one shelling a `ts-node` that is not a
// dependency, and reserve.ts targeting a hardcoded 65536-byte package that had grown to 3.25 MB (it threw, but only
// after emptying the shipped reserved.uuidna). The verdict logic is pure and tested here; the spawning is not.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT } from './api.js'
import { dormantRotGaps, restore, type Exercise } from './exercise-dormant.js'

const ok = (script: string, wrote: string[] = []): Exercise => ({ script, exit: 0, wrote, undeclared: [], residue: [], ms: 1 })

test('a dormant script that exits 0 with no writes is no gap — dormancy stays permitted', () => {
  assert.deepEqual(dormantRotGaps([ok('quantum-school.ts'), ok('refactor.ts')]), [])
})

// ── the EXIT arm: the one that would have caught all four. A script is allowed to be unwired; it is not allowed
// to be broken, and for days these were indistinguishable.
test('a non-zero exit is a gap, and says the script is broken rather than idle', () => {
  const gaps = dormantRotGaps([{ script: 'reserve.ts', exit: 1, wrote: [], undeclared: [], residue: [], ms: 5 }])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0].what, /reserve\.ts is declared dormant but EXITS 1/)
  assert.match(gaps[0].what, /not idle, it is broken/)
  assert.match(gaps[0].fix, /repair it, or retire it/)
})

test('a timeout is reported as a gap too — 124 is not success', () => {
  assert.equal(dormantRotGaps([{ script: 'outward.ts', exit: 124, wrote: [], undeclared: [], residue: [], ms: 120_000 }]).length, 1)
})

// ── the WRITES arm: a script the gate runs on EVERY pass must not surprise the working tree.
test('a declared write is not a gap, but an undeclared one is', () => {
  assert.deepEqual(dormantRotGaps([ok('outward.ts', ['outward-receipts.json'])]), [],
    'writing exactly what the manifest declares is fine')
  const gaps = dormantRotGaps([
    { script: 'outward.ts', exit: 0, wrote: ['outward-receipts.json', 'SURPRISE.json'], undeclared: ['SURPRISE.json'], residue: [], ms: 9 },
  ])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0].what, /outward\.ts writes SURPRISE\.json, which it does not declare/)
  assert.match(gaps[0].fix, /add "SURPRISE\.json" to writes\["outward\.ts"\]/)
})

test('both arms fire independently — a broken script that also writes is two gaps', () => {
  const gaps = dormantRotGaps([{ script: 'rot.ts', exit: 1, wrote: ['a', 'b'], undeclared: ['a', 'b'], residue: [], ms: 3 }])
  assert.equal(gaps.length, 3, 'one for the exit, one per undeclared path')
})

// ── the live roster: every name in the manifest must be exercisable. This is the check the manifest itself now
// leans on — the list is a ROSTER, not an excuse, so a name on it that cannot run is a gap in the gate.
test('the manifest is a roster: it declares writes only for scripts it also lists', () => {
  // read rather than import so a malformed manifest fails loudly here instead of at module load
  const manifest = JSON.parse(
    readFileSync(new URL('../../lean/dormant-scripts.json', import.meta.url), 'utf8'),
  ) as { count: number; scripts: string[]; writes?: Record<string, string[]> }
  assert.equal(manifest.count, manifest.scripts.length, 'the declared count must match the list')
  for (const name of Object.keys(manifest.writes ?? {})) {
    assert.ok(manifest.scripts.includes(name), `writes declares ${name}, which the roster does not list`)
  }
})

// ── THE DELETION THAT ATE ANOTHER SESSION'S WORK (measured 2026-09-06).
//
// `dirtySet()` reads `git status --porcelain`, which lists UNTRACKED files. So a file a neighbouring session
// authored during the exercise window appeared as new, was classed undeclared, and `restore()` REMOVED it —
// silently, because nothing tracked it. uuidna-87 wrote src/cross-surface.test.ts, it passed the guard, and it
// was gone by the time their index lock cleared. Thirty-five dormant scripts run on every gate pass, so that is
// thirty-five windows per pass in which any in-flight authored file can vanish.
//
// The deletion was never load-bearing: an undeclared write is ALREADY a gap. These hold the new behaviour —
// leave it, report it — and the reason, so the next hand does not "tidy" the deletion back in.
test('restore LEAVES an untracked file and returns it as residue — it must not delete', () => {
  const rel = 'dist/_residue-probe/leave-me.txt'
  const abs = join(ROOT, rel)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, 'a neighbouring session authored this')
  try {
    const left = restore([rel])
    assert.deepEqual(left, [rel], 'an untracked path is returned as residue')
    assert.equal(existsSync(abs), true, 'AND IT IS STILL THERE — this is the assertion that stops the regression')
    assert.equal(readFileSync(abs, 'utf8'), 'a neighbouring session authored this', 'byte for byte')
  } finally { rmSync(dirname(abs), { recursive: true, force: true }) }
})

test('residue is reported as a gap, so the only cleaner is a decision', () => {
  const gaps = dormantRotGaps([{ script: 's.ts', exit: 0, wrote: [], undeclared: [], residue: ['src/x.test.ts'], ms: 1 }])
  const hit = gaps.find((g) => /left 1 untracked path/.test(g.what))
  assert.ok(hit, 'the path must be named')
  assert.match(hit.what, /src\/x\.test\.ts/)
  assert.match(hit.fix, /check first/, 'and the fix must warn that residue and work look identical')
})

test('a clean exercise reports no residue — the control', () => {
  assert.deepEqual(dormantRotGaps([{ script: 's.ts', exit: 0, wrote: [], undeclared: [], residue: [], ms: 1 }]), [])
})
