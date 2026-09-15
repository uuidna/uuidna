#!/usr/bin/env node
// develop — THE AUTONOMOUS DEVELOPMENT PASS. Walk the gate; when it objects with a cure this pass has been TAUGHT,
// apply the cure and walk again. Bounded rounds. Exit non-zero only when an objection has no taught cure, printing it
// as the exact GAP+FIX for a human — and never inventing a cure it was not given.
//
// THE CURE TABLE IS FOLDED MANUAL WORK. Every entry below was earned the hard way on 2026-08-17: one deposit took SIX
// hand-walked strokes, and each stroke ended with a gate printing a command that a human then typed. That is a loop a
// machine should close, so it does — with one honest exception kept out: the changelog entry naming a release needs a
// human voice, and a pass that generated release prose would be writing the one thing it cannot mean.
//
// THE TWO-HANDLE LAW HOLDS: the computing handle drains what is deterministic (regenerate, sync, re-seal, reconcile);
// the paying handle keeps judgement (what a release says, what a new wing claims, which objection is really a design
// question). Usage:
//   node dist/scripts/develop.js          → heal the tree until the gate is clean, then stop (default; nothing pushed)
//   node dist/scripts/develop.js --seal   → then hand to `one-receipt seal`, and ASSERT the result is actually synced
import { verdictOf } from './develop-cures.js'
import { writerPidsProbe } from '../tree-writers.js'
import { ancestorsOf } from './one-writer.js'
import { teeStep, ROOT, h16, pauseSeconds } from './api.js'
import { shellOrExit } from '../os/host/index.js'
import { execSync, spawnSync } from 'node:child_process'

// THE CURE TABLE AND NO_CURE live in develop-cures.ts: this file runs its loop on import, so the tables sit where a
// test can hold each signature against its objection and its near miss without starting a landing.
/** namedGap(out, tail) → the FINDER'S OWN named gap, not the tail of its log.
 *
 *  All three refusal paths below used to print `out.split('\n').slice(-8)`. Measured 2026-09-02: guard failed on
 *  a bare modal claim in one comment, and the tail window showed the rosette receipt, the unified fold and the
 *  aura line — guard's closing ceremony — while the actual GAP sat twenty lines above and the report read as
 *  though the fold itself were the objection. A gate that knows the finding and prints something else makes the
 *  next hand re-run it to learn the accusation, which is the cost this whole loop exists to remove.
 *
 *  Guard and the finders emit their findings in a fixed shape (`GAP …` / `FIX …`, under a `✗ <finder>` line), so
 *  those lines ARE the answer. The tail stays as the fallback for a gate that named nothing in that shape — an
 *  output with no named gap is still worth showing, and showing it is not the same as pretending it was named. */
const namedGap = (out: string, tail: number): string => {
  const lines = out.split('\n').map((l) => l.trimEnd())
  const named = lines.filter((l) => /^\s*(GAP|FIX)\b/.test(l) || /^✗\s/.test(l))
  const pick = named.length ? named : lines.filter((l) => l.trim().length > 0).slice(-tail)
  return pick.join('\n         ')
}

/** The walk: the cheapest gates first, each able to name its own objection.
 *  Guard is the compiled door, never `npm run guard`: that wrapper rebuilds, so a walk that already built
 *  would spawn a second tsc as an unfused process and pay the QPU width twice for one tree. */
const WALK: { label: string; cmd: string }[] = [
  { label: 'build', cmd: 'npm run build' },
  { label: 'court', cmd: 'node dist/quantum/os/cli/index.js --court' },
  { label: 'guard', cmd: 'node dist/scripts/guard.js' },
  { label: 'account', cmd: 'node dist/scripts/account.js' },
  { label: 'spin --verify', cmd: 'node dist/scripts/spin.js --verify' },
]

/** The tree's identity right now — HEAD plus the dirty set. If this moves mid-round, another writer is landing. */
const treeState = (): string => {
  try {
    const head = execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf8' }).trim()
    const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' })
    // THE CONTENT, not just the file list. The first version of this folded only HEAD + the porcelain status, and it
    // would have MISSED the very case it was written for: while another session edited src/css.ts repeatedly, the
    // status line stayed ` M src/css.ts` through every save — identical string, different file. A name is not the
    // thing again, one layer deeper. Folding the diff makes the identity mean what it claims.
    const diff = execSync('git diff HEAD', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    return `${head}|${h16(status)}|${h16(diff)}`
  } catch { return '' }
}
/** Wait for another gate to finish before touching the shared tree — the mixed-dist hazard, which the seal already
 *  guards against and this pass did not. Bounded: 30 probes × 10s. */
/** THE PROBE HAS THREE ANSWERS (2026-08-25). This shelled `ps aux | grep | wc -l` and `sleep 10` through
 *  execSync, whose shell on Windows is cmd.exe, where none of ps, grep, wc or sleep exists — so the wait THREW
 *  on its first probe instead of waiting. It survives on a developer host only because Git for Windows puts
 *  those four on PATH; from a plain Windows PATH both calls fail outright. Measured both ways.
 *
 *  That is commit 07bc4b2f again, whose message called the same defect in one-writer.ts THE LAST POSIX
 *  ASSUMPTION. It was not. The cure is the landed one: wait through the host's own shell (pauseSeconds), and
 *  name the instrument in the driver rather than trusting execSync's default.
 *
 *  AND THE ANSWER IS NO LONGER TWO-VALUED, which is the defect underneath the portability one. `busy === '0'`
 *  read a THROWN probe and a genuinely quiet tree as different only by luck: any non-zero string kept waiting,
 *  and a probe that could not run at all had no answer of its own. This function guards the mixed-dist hazard —
 *  editing a tree while another gate is mid-run — so 'I could not tell' must never be spent as 'quiet'. It
 *  refuses instead, and says which instrument failed. Bounded: 30 probes x 10s. */
// THE LANDING THAT RUNS THIS PASS IS NOT ANOTHER GATE (2026-09-14). land.js is a tree writer and develop runs as its
// child, so a probe that counted every writer read the tree as busy on every round and spent its whole 30 × 10 s wait
// before a single step — measured as most of a 34-minute heal, and six rounds of it in one landing. The writers in this
// process's own ancestry are this pass itself; any other writer is still waited for.
/** otherWriters() → the pids of every tree writer outside this pass's own ancestry, asked once. */
const otherWriters = (): number[] => {
  const sh = shellOrExit('develop')
  const mine = new Set(ancestorsOf(process.pid))
  const r = spawnSync(sh.file, sh.argv(writerPidsProbe()), { cwd: ROOT, encoding: 'utf8', env: sh.env(process.env) })
  if (r.error || r.status !== 0) {
    console.error('x develop — the quiescence probe could not RUN, so this pass has no way to tell a quiet tree from a')
    console.error('  busy one. Refusing rather than editing a tree another gate may be mid-run on.')
    console.error('  ' + (r.error?.message ?? `exit ${r.status}`))
    process.exit(1)
  }
  return r.stdout.split(/\s+/).filter(Boolean).map(Number).filter((p) => Number.isInteger(p) && !mine.has(p))
}
const waitForQuiet = (): void => {
  for (let i = 0; i < 30; i++) {
    if (otherWriters().length === 0) return
    if (i === 0) console.log('· develop — another gate is running on this tree; waiting for quiescence (never edit mid-gate)')
    pauseSeconds(10)
  }
}

const MAX_ROUNDS = 6
const applied: string[] = []
/** A CURE THAT DOES NOT CURE IS A BROKEN CURE — if the same cure meets the same objection twice, stop and say so
 *  rather than spending rounds. Without this the pass can loop plausibly and even exit 0 for the wrong reason. */
let lastAttempt = ''

for (let round = 1; round <= MAX_ROUNDS; round++) {
  waitForQuiet()
  const stateAtRoundStart = treeState()
  let objection: { label: string; out: string } | null = null
  for (const step of WALK) {
    const r = teeStep(`develop · round ${round} · ${step.label}`, step.cmd)
    if (!r.ok) { objection = { label: step.label, out: r.out }; break }
  }
  // A TORN TREE IS NOT AN OBJECTION — the concurrent-writer test belongs on the WALK too. Met
  // the second time this pass ran: another session was mid-edit on gen-readme.ts (naming THEOREM_COUNT before defining
  // it), so `build` failed with a TS error that was nobody's bug and was gone minutes later. Reporting that as "no
  // taught cure" sends a human to debug a file that was simply half-written at the moment we read it.
  if (objection && treeState() !== stateAtRoundStart) {
    console.log(`· develop — the "${objection.label}" gate failed while the tree was moving (another session is landing); waiting and walking again`)
    continue
  }
  if (!objection) {
    console.log(`\n✓ develop — the gate is clean${applied.length ? ` after ${applied.length} cure(s): ${applied.join(', ')}` : ' (nothing to heal)'}`)
    if (process.argv.includes('--seal')) {
      // The seal gets the SAME three-way reading the walk and the cures have: synced, denied, or blocked by another
      // writer. A TORN TREE AT PUSH TIME IS NOT A DENIAL — the pre-push hook builds the WORKING tree, so a sibling
      // session's half-written file fails the gate for a reason that is nobody's bug and fixes itself. Three pushes
      // were blocked exactly that way in one hour (`THEOREM_COUNT` undefined in gen-readme.ts, then `vortexOrbit`
      // and `fdiv` in css.ts); every error was gone minutes later. One retry after quiescence, then report honestly.
      for (let attempt = 1; attempt <= 2; attempt++) {
        const before = treeState()
        const sealed = teeStep(`develop · seal${attempt > 1 ? ` (attempt ${attempt}, after quiescence)` : ''}`, 'node dist/scripts/one-receipt.js seal')
        // RECONCILED MEANS SYNCED, or this fails loudly: the seal has exited 0 while unsynced before, which is how a
        // "successful" unattended run left commits sitting on the local branch.
        const ahead = execSync('git rev-list origin/main..HEAD --count', { cwd: ROOT, encoding: 'utf8' }).trim()
        if (sealed.ok && ahead === '0') { console.log('✓ develop — sealed and synced'); process.exit(0) }
        const moved = treeState() !== before
        const tornBuild = /error TS\d+/.test(sealed.out)
        if (attempt === 1 && (moved || tornBuild)) {
          console.log(`· develop — the seal was blocked while the tree was moving${tornBuild ? ' (a half-written source failed the pre-push build)' : ''}; waiting for quiescence and sealing once more`)
          waitForQuiet()
          continue
        }
        console.error(`✗ develop — NOT SYNCED: ${ahead} commit(s) still local.`)
        if (moved || tornBuild) console.error('    Cause: another session is landing on this tree — this is NOT a denial of your work. Run again when it is quiet; nothing is lost, the commits are here.')
        else console.error('    Cause: the gate stated an objection. Read the teed steps above — it named what to fix.')
        process.exit(1)
      }
    }
    process.exit(0)
  }

  const verdict = verdictOf(objection.out)
  if (verdict.kind === 'blocked') {
    console.error(`\n✗ develop — the "${objection.label}" gate objected, and this is NOT a machine's to cure:`)
    console.error(`    GAP ${objection.label}: ${namedGap(objection.out, 6)}`)
    console.error(`    FIX ${verdict.why}`)
    process.exit(1)
  }
  // EVERY TAUGHT CURE THE OUTPUT NAMES, IN ONE ROUND (lead 229, folded 2026-09-07). The first match alone ran,
  // then a full rebuild, court and guard — about four minutes at load — before the second denial, which had been
  // printed in the same output, was even read. Three cures visible at once cost three rounds. The guard prints
  // every finding it has; the loop now answers every one it was taught, in table order (most specific first), each
  // distinct command once, and rebuilds once. A denial no cure matches still ends the round the honest way.
  if (verdict.kind === 'untaught') {
    console.error(`\n✗ develop — the "${objection.label}" gate objected with no taught cure. Read it, fix it, and TEACH it:`)
    console.error(`    GAP ${namedGap(objection.out, 8)}`)
    console.error('    FIX add the objection\'s signature + its deterministic command to CURES in src/scripts/develop-cures.ts')
    process.exit(1)
  }
  const cures = verdict.cures
  const attempt = `${cures.map((c) => c.name).join(' + ')}::${objection.label}`
  if (attempt === lastAttempt) {
    console.error(`\n✗ develop — the cure(s) for "${cures.map((c) => c.name).join(' + ')}" did not cure it: the "${objection.label}" gate objects the same way twice.`)
    console.error(`    GAP ${namedGap(objection.out, 8)}`)
    console.error(`    FIX either a signature matches the wrong cure (order CURES most-specific-first) or a cure is incomplete`)
    process.exit(1)
  }
  lastAttempt = attempt
  if (cures.length > 1) console.log(`\n→ develop — ${cures.length} denials answered in this round: ${cures.map((c) => c.name).join(' · ')}`)
  let broke = false
  for (const cure of cures) {
    console.log(`\n→ develop — cure for "${cure.name}": ${cure.cmd}\n  (${cure.because})`)
    const fix = teeStep(`develop · cure · ${cure.name}`, cure.cmd)
    applied.push(cure.name)
    if (fix.ok) continue
    // A CONCURRENT WRITER IS NOT A BREAK — the third category, learned when this pass first met one: another session
    // was mid-landing a theorem, so generated.ts moved under the reconcile's own push and the cure "failed" for a
    // reason that was nobody's fault and fixes itself. Distinguish by asking whether the tree moved during the round.
    // AND WHO MOVED IT: a cure writes the tree itself, so a moved tree alone read every failed cure as a neighbour's
    // landing and walked the same cure again. A cure that ends with its gate re-asked (the spin re-derive, the page
    // regeneration) fails on its own writes when the objection survives, and with no other writer running that
    // failure is the human's.
    if (treeState() !== stateAtRoundStart && otherWriters().length > 0) {
      console.log(`· develop — the tree moved during round ${round} (another session is landing); waiting and walking again`)
      applied.pop()
      lastAttempt = ''
      broke = true
      break
    }
    console.error(`✗ develop — the cure for "${cure.name}" failed with no other writer on the tree: the objection survived its taught cure, and it is a human's.`)
    console.error(`    GAP ${namedGap(fix.out, 8)}`)
    process.exit(1)
  }
  if (broke) continue
}

console.error(`✗ develop — ${MAX_ROUNDS} rounds spent, still objecting after cures: ${applied.join(', ')}. Every step is teed above; read the gate.`)
process.exit(1)
