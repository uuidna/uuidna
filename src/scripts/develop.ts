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
import { teeStep, ROOT, h16, pauseSeconds } from './api.js'
import { shellOrExit } from '../os/host/index.js'
import { execSync, spawnSync } from 'node:child_process'

/** An objection this pass can cure: its signature in the gate's own output, and the deterministic command that fixes it. */
type Cure = { name: string; when: RegExp; cmd: string; because: string }

// ORDER IS LOAD-BEARING — most specific first, because the first match wins. Learned on this pass's very first real
// run: a spin objection NAMES the files that moved, so a filename cure (regenerate support-audit.json) matched before
// the spin cure (reconcile, which re-derives AND re-seals) and "cured" the wrong thing twice; the run converged only
// because the guard happens to re-seal the fold. A drift of the SEAL is never cured by regenerating one of its files.
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

const CURES: Cure[] = [
  { name: 'derived layer drift (spin)', when: /NON-QUANTUM DRIFT|Spin hard-rejects drift/,
    // --derive-only, NOT plain reconcile. Plain reconcile ends by committing AND PUSHING to origin, so this cure
    // made a routine self-heal an outward act — the pass built to keep the gate green unattended could not safely
    // be run unattended, which is why the same sequence was being hand-run instead. The flag stops after the seal:
    // re-derive and re-seal locally, publish never. Publishing stays a separate, deliberate command.
    cmd: 'node dist/scripts/reconcile.js --derive-only',
    because: 'the derived files moved since the last seal; only the full re-derivation re-seals them (regenerating one named file leaves the seal stale) — and the cure stops at the seal, because healing must not publish' },
  { name: 'changelog section missing', when: /CHANGELOG\.md does not mention version/,
    cmd: 'node dist/scripts/gen-changelog-section.js',
    because: 'the calendar ticks the odometer on its own, so the FACTS of a version (counts, receipts, the odometer step, the surfaces) are emitted from the ledger; the narrative is still never generated — the section says the meaning is owed, and a human completing it is finishing the entry' },
  { name: 'rosetta mirror stale', when: /hosted edge would answer from a stale census/,
    cmd: 'node dist/scripts/rosetta.js && npm run build',
    because: 'the five-leg census is recomputed from the ledger and shipped to the hosted edge as src/rosetta-mirror.ts, so ANY change to the ledger leaves the edge answering from the previous generation — the test that catches it prints exactly this command. The rebuild is part of the cure and not an afterthought: rewriting the mirror source without compiling it leaves dist/ carrying the stale census, which is the same fault one step further along. Taught 2026-08-20, after a session where this objection came back three times and was hand-run each time. DELIBERATELY NARROW: the signature matches only the STALE-MIRROR face— see NO_CURE' },
  { name: 'axiom witness stale', when: /AXIOM WITNESS STALE|kernel-only-witness-shipped/,
    cmd: 'npm run axioms',
    because: 'a new theorem has no kernel-only witness yet; the audit regenerates them in one probe per file' },
  { name: 'heartbeats missing', when: /heartbeats cover the ledger|MISSING \d+: [a-z_]/,
    cmd: 'node dist/scripts/lean-heartbeats.js --sync',
    because: 'the delta mode measures only the new keys — NOT --all, which spawns a kernel per theorem and burned ninety minutes once' },
  // Found 2026-08-19 by adding a drain path (src/chunks) and watching the gate object with a cure the pass could
  // not apply: .gitattributes is GENERATED from DRAIN_PATHS, so declaring a new derived path always leaves the
  // mark stale until someone runs the generator. Deterministic, single-command, and the finder already prints the
  // exact cure — everything a cure needs, and it was reachable only by a human. Placed ABOVE the filename cures:
  // the objection names a drain path, so a filename rule would otherwise match it and regenerate the wrong thing.
  { name: 'gitattributes mark missing', when: /does not mark it unmergeable/,
    cmd: 'node dist/scripts/gen-gitattributes.js',
    because: '.gitattributes is generated from DRAIN_PATHS and never hand-edited; a new derived path has no merge, only a recomputation, so the mark is regenerated rather than written' },
  // Found 2026-08-19 on the first odometer bump after the check landed: mcp-http.ts states the version the hosted
  // MCP advertises, it cannot import the manifest (rootDir is src; the module runs at the Workers edge with no
  // filesystem), and it had drifted eleven releases while nothing compared the two. The test now catches it, which
  // made every bump fail the gate until someone edited a constant by hand — so the cure closes that loop.
  { name: 'mcp version stale', when: /advertises [0-9.]+ but package\.json is/,
    cmd: 'node dist/scripts/sync-mcp-version.js',
    because: 'the advertised version is written in source because it cannot be imported there; this rewrites it from package.json, so a bump needs no remembered edit' },
  { name: 'support-audit drift', when: /support-audit\.json/,
    cmd: 'node dist/scripts/support.js',
    because: 'a new module changed the reachability count; the audit is derived, so regenerate rather than edit' },
  { name: 'MCP surface drift', when: /docs\/mcp\.md/,
    cmd: 'node dist/scripts/gen-mcp.js',
    because: 'the tool docs are computed from the catalog keys' },

  // EVERY UNATTENDED CYCLE LEAVES EVIDENCE.
  //
  // develop runs every thirty minutes and its cures fix what they can. What it never did was RECORD what it saw,
  // so a slow drift between runs was invisible unless a cure happened to trip on it. measure --all folds the
  // ledger counts, wing parity in both directions, handle round-trips, the rosetta census, research verification
  // status and the open findings — each into a receipt that moves when its value moves. A number that changes
  // between two cycles is then visible in an artifact rather than in nobody's memory.
  //
  // It is a MEASUREMENT. Nothing here repairs anything, so a wrong reading cannot make the tree
  // worse — it can only be seen.
  { name: 'measurements (receipted)', when: /^$/,
    cmd: 'node dist/scripts/measure.js --all',
    because: 'an unattended cycle that only repairs leaves no evidence of what it saw; each measurement folds to a receipt that moves when its value moves, so drift between runs is visible in an artifact rather than in nobody memory',
  },
  { name: 'package surface drift', when: /packages? (?:receipt|surface)|gen:packages/,
    cmd: 'node dist/scripts/gen-packages.js',
    because: 'the six package surfaces are generated from src/index.ts; the guard hard-rejects drift' },
  { name: 'legacy test dir', when: /src\/tests\/ still holds/,
    cmd: 'node dist/scripts/relocate-tests.js && node dist/scripts/fix-test-imports.js && node dist/scripts/repair-test-imports.js && node dist/scripts/fix-colocated-imports.js && node dist/scripts/repair-fs-imports.js && node dist/scripts/index-test-imports.js && npm run build',
    because: 'tests belong beside their module or under quantum/os/harness/; gate-receipt delta runs only when colocated *.test.ts move' },
  // A neighbourhood that will not seal is nearly always a census taken while the wings were being written — the
  // memory walked lean/ mid-generation and saw a file that had not finished moving. Regenerating the wings and
  // re-sealing is the whole repair, and it is safe to attempt because a stale memory can only cost extra sealing:
  // every address is recomputed from the file's own bytes on each run and compared.
  // If it survives the cure, the cause is a genuine duplicate key and the emitter's own gate will name it.
  { name: 'neighbourhood did not seal', when: /neighbourhood \S+ did not seal|members held, missing/,
    cmd: 'node dist/scripts/lean-all.js && node dist/scripts/cube-memory.js',
    because: 'the cube memory holds a handle until its whole neighbourhood is complete; an unsealed cube usually means the census ran against wings mid-write, and re-generating then re-sealing is the repair' },
]

/** Objections that are deliberately NOT cured here — each needs a human, and saying so is the honest answer. */
const NO_CURE: { when: RegExp; why: string }[] = [
  // (the changelog-missing-version class moved OUT of NO_CURE on 2026-08-17 — see CURES: the calendar now emits a
  // factual section, and only the MEANING is still owed to a human. A statistic is not a story.)
  { when: /below the floor of \d+|floor may only rise/,
    why: 'a five-leg census came back BELOW the floor it published, and the two causes are indistinguishable from the message alone: either the mirror is stale (mechanical) or a claim genuinely lost its external anchor (not). Re-running the census cannot decide between them — rosetta REFUSES to write a fallen floor, so the cure would fail identically in both cases and teach nothing. This happened on 2026-08-20: the witness leg read 9 to 0 and nothing had lost an anchor at all — the reader had stopped looking, because the prose moved into Lean doc comments and commentAbove still scanned only `--` lines. A pass that re-ran the census would have retried forever; a person read the message and found the reader. The refusal to auto-cure is what surfaced it' },
  { when: /overclaim|fabricated|does not compute/,
    why: 'the honesty gate refused a claim — fix the claim at its source; a pass that silences this would be the fraud it exists to catch' },
]

/** The walk: the cheapest gates first, each able to name its own objection. */
const WALK: { label: string; cmd: string }[] = [
  { label: 'build', cmd: 'npm run build' },
  { label: 'court', cmd: 'node dist/quantum/os/cli/index.js --court' },
  { label: 'guard', cmd: 'npm run guard' },
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
const waitForQuiet = (): void => {
  const sh = shellOrExit('develop')
  for (let i = 0; i < 30; i++) {
    const r = spawnSync(sh.file, sh.argv('ps aux | grep -E "[r]econcile\\.js|[l]ean-all\\.js" | wc -l'), { cwd: ROOT, encoding: 'utf8', env: sh.env(process.env) })
    if (r.error || r.status !== 0) {
      console.error('x develop — the quiescence probe could not RUN, so this pass cannot tell a quiet tree from a')
      console.error('  busy one. Refusing rather than editing a tree another gate may be mid-run on.')
      console.error('  ' + (r.error?.message ?? `exit ${r.status}`))
      process.exit(1)
    }
    const busy = r.stdout.trim()
    if (busy === '0') return
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

  const blocked = NO_CURE.find((n) => n.when.test(objection.out))
  if (blocked) {
    console.error(`\n✗ develop — the "${objection.label}" gate objected, and this is NOT a machine's to cure:`)
    console.error(`    GAP ${objection.label}: ${namedGap(objection.out, 6)}`)
    console.error(`    FIX ${blocked.why}`)
    process.exit(1)
  }
  const cure = CURES.find((c) => c.when.test(objection.out))
  if (!cure) {
    console.error(`\n✗ develop — the "${objection.label}" gate objected with no taught cure. Read it, fix it, and TEACH it:`)
    console.error(`    GAP ${namedGap(objection.out, 8)}`)
    console.error('    FIX add the objection\'s signature + its deterministic command to CURES in src/scripts/develop.ts')
    process.exit(1)
  }
  const attempt = `${cure.name}::${objection.label}`
  if (attempt === lastAttempt) {
    console.error(`\n✗ develop — the cure for "${cure.name}" did not cure it: the "${objection.label}" gate objects the same way twice.`)
    console.error(`    GAP ${namedGap(objection.out, 8)}`)
    console.error(`    FIX either the signature matches the wrong cure (order CURES most-specific-first) or the cure is incomplete`)
    process.exit(1)
  }
  lastAttempt = attempt
  console.log(`\n→ develop — cure for "${cure.name}": ${cure.cmd}\n  (${cure.because})`)
  const fix = teeStep(`develop · cure · ${cure.name}`, cure.cmd)
  applied.push(cure.name)
  if (!fix.ok) {
    // A CONCURRENT WRITER IS NOT A BREAK — the third category, learned when this pass first met one: another session
    // was mid-landing a theorem, so generated.ts moved under the reconcile's own push and the cure "failed" for a
    // reason that was nobody's fault and fixes itself. Distinguish by asking whether the tree moved during the round.
    if (treeState() !== stateAtRoundStart) {
      console.log(`· develop — the tree moved during round ${round} (another session is landing); waiting and walking again`)
      applied.pop()
      lastAttempt = ''
      continue
    }
    console.error(`✗ develop — the cure for "${cure.name}" itself failed on a tree that did not move; that is a real break.`)
    process.exit(1)
  }
}

console.error(`✗ develop — ${MAX_ROUNDS} rounds spent, still objecting after cures: ${applied.join(', ')}. Every step is teed above; read the gate.`)
process.exit(1)
