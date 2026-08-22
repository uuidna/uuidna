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
import { acquire, release } from './one-writer.js'

const ROUNDS = 4   // bounded: more than the worst day needed once every cure is taught; never a spin loop

const run = (cmd: string): { ok: boolean; out: string } => {
  try { return { ok: true, out: execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 }) } }
  catch (e) { const err = e as { stdout?: string; stderr?: string }; return { ok: false, out: (err.stdout ?? '') + (err.stderr ?? '') } }
}

// the taught cures for gate denials, MOST SPECIFIC FIRST (develop's own law: first match wins, and a cure
// this table was not taught is a human's decision, never a guess)
const CURES: { name: string; when: RegExp; cmd: string }[] = [
  { name: 'raced edge mirror', when: /stale census|MIRROR.*MATCHES A LIVE RECOMPUTE/i, cmd: 'node dist/scripts/rosetta.js && npm run build' },
  { name: 'stale axiom witness', when: /AXIOM WITNESS STALE/, cmd: 'npm run axioms' },
  { name: 'stale spin seal', when: /spin/i, cmd: 'node dist/scripts/reconcile.js --derive-only' },
  { name: 'stale derived layer', when: /STALE DERIVED LAYER|git-diff of generated/, cmd: 'node dist/scripts/reconcile.js --derive-only' },
]

const gate = acquire('land', process.pid)
if (!gate.ok) {
  console.error(`✗ land — the tree is HELD by pid ${gate.holder.pid} (${gate.holder.purpose}); one landing at a time is the whole point.`)
  process.exit(1)
}
process.on('exit', () => release(process.pid))

for (let round = 1; round <= ROUNDS; round++) {
  console.log(`\nland — round ${round}/${ROUNDS}: heal, commit, push …`)
  const heal = run('node dist/scripts/develop.js')          // taught cures only; prints its own receipts
  if (!heal.ok) {
    console.error('✗ land — develop met an objection with NO taught cure. Its GAP+FIX, verbatim — a human decides here (that is the design, not a failure of it):\n')
    console.error(heal.out.split('\n').filter((l) => /✗|GAP|FIX/.test(l)).join('\n') || heal.out.slice(-1500))
    process.exit(1)
  }
  run('node dist/scripts/reconcile.js --derive-only')        // derived layer freshly sealed, spin LAST, no publish
  const push = run('git push origin main')
  if (push.ok) {
    console.log(`✓ land — pushed on round ${round}; the gate's own receipts are above. Landing complete.`)
    process.exit(0)
  }
  const cure = CURES.find((c) => c.when.test(push.out))
  if (!cure) {
    console.error('✗ land — the gate denied with NO taught cure. Its verdict follows verbatim; a human decides here:\n')
    console.error(push.out.split('\n').filter((l) => /✗|GAP|FIX/.test(l)).join('\n') || push.out.slice(-2000))
    process.exit(1)
  }
  console.log(`· land — gate denied; taught cure applies: ${cure.name} → ${cure.cmd}`)
  const cured = run(cure.cmd)
  if (!cured.ok) { console.error(`✗ land — the cure itself failed (${cure.name}); a human decides here.`); process.exit(1) }
}
console.error(`✗ land — ${ROUNDS} rounds spent without a landing; the tree is healthy but the gate keeps moving. A human decides here (and the round log above is the evidence for the next fold).`)
process.exit(1)
