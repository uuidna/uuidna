#!/usr/bin/env node
// land — THE PUSH LOOP, FOLDED (lead 95; the captain's no-manual-agent-work law): seven hand-babysat walks
// on 2026-08-22 were this exact loop run by a person-shaped agent — walk the gate, read the denial, apply
// the taught cure, walk again. develop.js already owns heal-until-clean with taught cures and never invents
// one; land extends the same discipline to LANDING: bounded rounds of { develop (heal) → commit what the
// drain owns → push }; a gate denial with a taught cure loops, an untaught denial STOPS and prints the exact
// GAP+FIX for a human. Every round logs its receipt. The one-writer lock guards the whole loop (acquired
// here; develop/reconcile children pass because the holder is their ancestor — lead 91's reentrancy, which
// release() and currentWriter() must learn before this ships: acquire succeeds iff no LIVE lock or the
// holder is an ancestor pid of the acquirer; pid liveness alone is unsound to RECYCLING, so the lock also
// stores the holder's command name and start time, both re-checked). NOTHING here bypasses the gate:
// --no-verify does not appear in this file, and an untaught denial is the loop's honest end, not an obstacle.
import { execSync } from 'node:child_process'
import { ROOT } from './api.js'
import { acquire, awaitAcquire, release, LOCK_PATH, working } from './one-writer.js'

const ROUNDS = 4   // bounded: more than the worst day needed once every cure is taught; never a spin loop

const run = (cmd: string): { ok: boolean; out: string } => {
  try { return { ok: true, out: execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 }) } }
  catch (e) { const err = e as { stdout?: string; stderr?: string }; return { ok: false, out: (err.stdout ?? '') + (err.stderr ?? '') } }
}

// the taught cures for gate denials, MOST SPECIFIC FIRST (develop's own law: first match wins, and a cure
// this table was not taught is a human's decision, never a guess)
const CURES: { name: string; when: RegExp; cmd: string }[] = [
  // THE ONE DENIAL THE LOOP COULD NOT ANSWER, and it was walked by hand twice in one session before it was
  // taught (2026-08-31): a SHARED tree goes behind while the gate is being walked, so the push is rejected and
  // land — whose whole point is that a taught denial loops — stopped at the one denial a neighbour causes on a
  // schedule. Git spells it TWO ways and neither alone is enough: "(fetch first)" before a fetch has run, and
  // "(non-fast-forward)" once the remote-tracking ref is current, which is the same tree in two moods; a cure
  // matching only the second spelling is the one a guess would have written, and it misses the case that fires.
  // The cure INTEGRATES, never forces: no --force, no --force-with-lease, no --no-verify. A merge that CONFLICTS
  // aborts itself, leaving the tree exactly as clean as it was found, and reports failure — so land takes its own
  // honest end (`the cure itself failed`) and a human resolves the overlap, which is the one decision this table
  // must never guess. The merge cites a sealed theorem so the commit is SIGNED: an automated merge that cannot
  // pay the citation coin is a hand-amend waiting to happen, and three were amended by hand the day this landed.
  { name: 'behind the shared tree', when: /\[rejected\][^\n]*\((?:fetch first|non-fast-forward)\)|tip of your current branch is behind/,
    cmd: 'git fetch origin && { git merge --no-edit -m "Merge origin/main: the shared tree moved while the gate was walked.\n\nBacked by theorem two_coins." origin/main || { git merge --abort; false; }; }' },
  // THE DENIAL THIS LOOP MEETS EVERY TIME IT CHANGES SOURCE (taught 2026-09-01, the day the receipt arm shipped).
  // --court --proven refuses a push whose tree the green receipt no longer covers, which is exactly right and is
  // exactly what a landing that edited src/ has just caused. The cure is not to weaken the arm: it is to EARN a
  // new receipt the honest way — guard, then the suite, then write it — and only then push. Slow by design; the
  // receipt is worth precisely as much as the run behind it.
  { name: 'receipt no longer covers the tree', when: /the tree MOVED since it was proven green|receipt certifies different bytes/,
    // --verified names EXACTLY the two arms this cure just ran, and nothing else. The receipt used to assert
    // five (types, tests, guard, qa, next --verify) because the list was typed into the writer rather than
    // passed by the runner — so it claimed a green run whoever called it and however little had happened.
    cmd: 'npm run guard && npm test && node dist/scripts/gate-receipt.js --verified guard,tests' },
  { name: 'raced edge mirror', when: /stale census|MIRROR.*MATCHES A LIVE RECOMPUTE/i, cmd: 'node dist/scripts/rosetta.js && npm run build' },
  { name: 'stale axiom witness', when: /AXIOM WITNESS STALE/, cmd: 'npm run axioms' },
  { name: 'stale spin seal', when: /spin/i, cmd: 'node dist/scripts/reconcile.js --derive-only' },
  { name: 'stale derived layer', when: /STALE DERIVED LAYER|git-diff of generated/, cmd: 'node dist/scripts/reconcile.js --derive-only' },
]

// AND IT WAITS RATHER THAN DYING (2026-08-24): the refusal was right and incomplete — the ONE manual step
// left in the whole loop was a person re-running this command after a neighbour's writer cleared. The queue
// is the LOCK'S own (awaitAcquire), not a shell re-written here: that is the eighth hand-copy this law exists
// to stop, and delegating inherits reentrancy, stale reclaim and atomicity instead of re-implementing them.
// `--no-wait` keeps the old refusal for a caller that would rather be told.
const gate = process.argv.includes('--no-wait')
  ? acquire('land', process.pid)
  : awaitAcquire('land', process.pid, LOCK_PATH, (h) =>
      console.error(`· land — the lane is HELD by pid ${h.pid} (${h.purpose}); WAITING for it (no clock: the lock lifts when the holder ends, and a dead holder is reclaimed)`))
if (!gate.ok) {
  console.error(`✗ land — pid ${gate.holder.pid} (${gate.holder.purpose}) still holds the tree; one landing at a time is the whole point.`)
  // WORK, NOT CLOCK (queue lead 123, found live when this very message accused a holder whose children were
  // npm run lean and tsc, mid-cure): a holder with live children is BUSY and must not be ended.
  console.error(working(gate.holder.pid)
    ? '  It IS WORKING — live children are running under it. Busy, not stuck: wait longer or coordinate, and do NOT end it.'
    : '  NO live child runs under it — the honest stuck signal. Name it to a human, or end it knowingly. Never delete a live pid\'s lock.')
  process.exit(1)
}
process.on('exit', () => release(process.pid))

for (let round = 1; round <= ROUNDS; round++) {
  console.log(`\nland — round ${round}/${ROUNDS}: heal, commit, push …`)
  const heal = run('node dist/scripts/develop.js')          // taught cures only; prints its own receipts
  if (!heal.ok) {
    console.error('✗ land — develop met an objection with NO taught cure. Its GAP+FIX, verbatim — a human decides here (that is the design, not a failure of it):\n')
    console.error(heal.out.split('\n').filter((l) => /^(✗|GAP|FIX)/.test(l.trim())).join('\n') || heal.out.slice(-1500))
    process.exit(1)
  }
  run('node dist/scripts/reconcile.js --derive-only')        // derived layer freshly sealed, spin LAST, no publish

  // ── THE RECEIPT IS MINTED FOR THE TREE THIS ROUND HEALED, BEFORE THE PUSH (found 2026-09-02, by measuring) ──
  //
  // Every landing took TWO rounds and the first one could never succeed. develop and reconcile --derive-only both
  // WRITE, so by the time the push runs, the tree has moved past whatever gate-receipt.json covered — and the
  // court's --proven arm refuses exactly that. So land pushed, was told "the receipt no longer covers the tree",
  // ran the taught cure (guard + suite + mint), and then healed and re-derived THE WHOLE TREE AGAIN in round 2 to
  // reach the same push. Sampled on a live run: 3 starts of reconcile --derive-only totalling 281s and 2 of
  // develop totalling 147s, most of it the second pass repeating what the first had already made clean.
  //
  // The loop was paying a DENIAL to learn something it already knew: it had just written files. This asks the
  // same instrument the court uses — gate-receipt --verify, O(1) — and mints only when the answer is no, before
  // the commit, so the fresh receipt is committed with the work it covers and the push passes on round 1. The
  // taught cure below stays as the fallback for the one case outside this check's reach by construction — a
  // neighbour moving the tree between the mint and the push, which is the case it was written for.
  //
  // AND IT MUST BE MINTED AFTER THE STAGING, which the first version got wrong and which is why round 1 was
  // still denied on any round that ADDED a file. The receipt's per-file manifest is built from the tracked set,
  // so a brand-new file is invisible to a mint taken while it is still untracked — and then registers as drift
  // the instant `git add` tracks it. The court said so in its own words, "the drift is only files appearing or
  // disappearing", and three landings in a row named the newly-added sources as MOVED. Staging first makes the
  // mint cover the same set the commit will carry.
  // ── THE COMMIT THIS FILE ALWAYS CLAIMED AND NEVER MADE (found 2026-09-01) ────────────────────────────────────
  //
  // The header above has described this loop as "{ develop (heal) → commit what the drain owns → push }" since it
  // was written. The middle step was never here. develop heals without committing; reconcile --derive-only says
  // so in its own success line ("the tree is dirty and NOTHING was committed or pushed"). So land healed a tree,
  // left 217 files staged, and ran `git push` — which exits 0 on "Everything up-to-date" because there was
  // genuinely nothing to send. Six landings in one session reported "pushed on round 1" and moved nothing.
  //
  // It is the tree's own recurring defect, and the most dangerous variant: a green report over an ABSENT action.
  // Nothing failed. No output was wrong. The only way to see it was to ask git what HEAD actually was, which is
  // why the verification below asks that and does not trust the exit code of anything.
  const dirty = run('git status --porcelain').out.trim()
  if (dirty) {
    run('git add -A')
    const covered = run('node dist/scripts/gate-receipt.js --verify')
    if (!covered.ok) {
      console.log('\nland — the heal moved the tree, so its receipt is stale; earning a new one before the push …')
      const proof = run('npm run guard && npm test && node dist/scripts/gate-receipt.js --verified guard,tests')
      if (!proof.ok) {
        // ANCHORED, because the first version of this filter matched test NAMES containing "GAP" and "FIX" and
        // printed six PASSING lines while the real failure stayed in the discarded remainder. A marker means
        // something only at the start of a line: `✖` and `not ok` are the suite's, `✗ guard` and `✗ gate-receipt`
        // are the gates'. The tail rides along unconditionally, because a chain can also die without any marker.
        console.error('✗ land — the tree does not prove green, so no receipt was minted. What it said:\n')
        const lines = proof.out.split('\n')
        const marked = lines.filter((l) => /^(✖|not ok|✗ (guard|gate-receipt|gen-packages)|# fail)/.test(l.trim()))
        if (marked.length) console.error(marked.slice(0, 20).join('\n'))
        console.error('\n  … the chain\u2019s last lines:\n' + lines.filter((l) => l.trim()).slice(-12).join('\n'))
        process.exit(1)
      }
    }
    run('git add gate-receipt.json')
    // cites a sealed theorem so commit-msg can sign it; an unsignable automated commit is a hand-amend waiting
    const msg = 'Land: heal, re-derive and seal what the drain owns — gate-clean, unattended. Backed by theorem two_coins'
    const committed = run('git commit -m ' + JSON.stringify(msg))
    if (!committed.ok) {
      console.error('✗ land — the commit was REFUSED (the gate speaks below); a human decides here:\n')
      console.error(committed.out.split('\n').filter((l) => /^(✗|GAP|FIX|BLOCKED)/.test(l.trim())).join('\n') || committed.out.slice(-1200))
      process.exit(1)
    }
  }

  const before = run('git rev-parse HEAD').out.trim()
  const push = run('git push origin main')
  if (push.ok) {
    // VERIFY THE REMOTE MOVED, because "Everything up-to-date" is also a success. The push is only a landing if
    // origin/main now holds this commit — asked of git, never inferred from an exit code.
    const remote = run('git rev-parse origin/main').out.trim()
    if (remote !== before) {
      console.error(`✗ land — push reported success but origin/main is ${remote.slice(0, 8)}, not ${before.slice(0, 8)}. NOTHING LANDED.`)
      process.exit(1)
    }
    console.log(`✓ land — pushed on round ${round}: origin/main is now ${before.slice(0, 8)}. Landing complete.`)
    process.exit(0)
  }
  // ── THE DENIAL IS READ ALOUD EVEN WHEN A CURE APPLIES (found 2026-09-02, by needing it and not having it).
  //
  // A cured denial printed only the cure's NAME, and `push.out` — the court's actual verdict, with the per-file
  // manifest naming exactly which files moved — was discarded. So when a landing that had just minted a fresh
  // receipt was denied anyway for "the receipt no longer covers the tree", there was nothing to diagnose from:
  // the loop knew which files had moved, said the cure's name, and threw the answer away. That is the same shape
  // this tree already names elsewhere — a gate that knows the finding and prints something else makes the next
  // hand re-run it to learn the accusation. A cure is not a reason to stop reporting.
  const denial = push.out.split('\n').filter((l) => /^(✗|GAP|FIX|CHANGED|APPEARED|VANISHED|MOVED|!|remote:|error:|hint:)/.test(l.trim()))
  if (denial.length) {
    console.error('  land — the gate said, verbatim:')
    for (const l of denial.slice(0, 12)) console.error(`    ${l.trim()}`)
  }
  const cure = CURES.find((c) => c.when.test(push.out))
  if (!cure) {
    console.error('✗ land — the gate denied with NO taught cure. Its verdict follows verbatim; a human decides here:\n')
    console.error(push.out.split('\n').filter((l) => /^(✗|GAP|FIX|!|remote:|error:|hint:)/.test(l.trim())).join('\n') || push.out.slice(-2000))
    process.exit(1)
  }
  console.log(`· land — gate denied; taught cure applies: ${cure.name} → ${cure.cmd}`)
  const cured = run(cure.cmd)
  if (!cured.ok) { console.error(`✗ land — the cure itself failed (${cure.name}); a human decides here.`); process.exit(1) }
}
console.error(`✗ land — ${ROUNDS} rounds spent without a landing; the tree is healthy but the gate keeps moving. A human decides here (and the round log above is the evidence for the next fold).`)
process.exit(1)
