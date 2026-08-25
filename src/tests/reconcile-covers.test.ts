// reconcile — THE ONE DERIVE ORDER, AND NOTHING MAY BE MISSING FROM IT.
//
// (the captain's order, 2026-08-25: "consolidate so no excuse for gaps or cracks")
//
// THE CRACK THIS CLOSES, and it cost an evening. The derived layer only settles if every writer runs, in the
// chain's own order, BEFORE the seal. I did not know that order, so I rediscovered it by failing six pushes —
// each one a real ordering fault with a different cause: a file quoting a receipt written later, the ledger's
// own outputs written earlier than where I started, a wing whose statements describe the tree and so move their
// own addresses when proved, a heartbeat table synced before the kernel rewrote it, an axiom witness left stale,
// and five steps that WRITE classified as read-only checks.
//
// Every one of those was already solved. reconcile.ts has carried the correct order the whole time, and its
// `--derive-only` flag runs exactly the half that fixes drift and stops before publishing. I hand-rolled its ten
// steps six times before reading the source. That is not a defect in the tree; it is a defect in what the tree
// TELLS you when it refuses — every failure message named plain `npm run reconcile`, which stages DRAIN_PATHS as
// directories and, on a checkout five sessions share, sweeps somebody else's untracked files into your commit.
//
// So the messages now name the safe door first, and this test holds the other half: that the one derive order is
// COMPLETE. A generator added to the audit chain and not to reconcile would re-open the same crack silently —
// the gate would write a file the reconcile never regenerates, and the next person would meet it as drift in a
// tree where nothing had changed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { plan } from '../scripts/gate-all.js'

/** the reconcile source, cut at the SPLIT its own comment names: everything above re-derives, everything below
 *  publishes. Only the deriving half is the subject here. */
function deriveBlock(): string {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'reconcile.ts'), 'utf8')
  const split = src.indexOf('// THE SPLIT.')
  assert.ok(split > 0, 'reconcile must still name its split between deriving and publishing')
  return src.slice(0, split)
}

test('every GENERATOR the audit runs is also in reconcile\'s derive block', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  const derive = deriveBlock()
  const missing: string[] = []

  for (const step of plan(pkg.scripts.audit ?? '', pkg.scripts)) {
    if (step.kind !== 'generator') continue
    const m = /dist\/scripts\/([a-z0-9-]+)\.js\b/.exec(step.cmd)
    // the npm-script generators (build, lean, vitepress) reach reconcile through `npm run lean` and `npm run
    // build`, which the block calls by name; only the direct script invocations are matched here
    if (!m) continue
    const name = m[1]!
    // prove-all is the audit's forced-kernel wrapper around `npm run lean`; reconcile calls the lean chain
    // itself, with UUIDNA_TRACK_LATEST, so the ledger is regenerated either way
    if (name === 'prove-all' && /npm run lean/.test(derive)) continue
    // rosetta and one-receipt messaging are steps INSIDE `npm run lean`, which the block runs
    if (new RegExp(`\\b${name}\\.js\\b`).test(derive)) continue
    if (new RegExp(`\\b${name}\\.js\\b`).test(pkg.scripts.lean ?? '') && /npm run lean/.test(derive)) continue
    missing.push(`${name}.js`)
  }

  assert.deepEqual(missing, [],
    'a generator the audit runs but the reconcile does not regenerate is a file the gate writes and the reconcile '
    + 'never settles — it returns as spin drift in a tree where nothing changed. Add it to reconcile.ts above THE SPLIT.')
})

test('the derive half publishes NOTHING — the property that makes it safe on a shared tree', () => {
  const derive = deriveBlock()
  for (const forbidden of ['git commit', 'git push', 'git add']) {
    assert.ok(!derive.includes(`run('${forbidden}`),
      `reconcile's deriving half must not ${forbidden} — --derive-only is the door a session on a shared checkout `
      + 'is told to use, and it is only safe while everything above THE SPLIT is local and reversible')
  }
  // and the flag must still exist to be told to use
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'reconcile.ts'), 'utf8')
  assert.match(src, /derive-only/, 'the safe door must exist')
})

test('the failure messages name the SAFE door, not only the publishing one', () => {
  // spin is the check that reports drift most often, and the hook is what a blocked push prints. Both used to
  // name plain `npm run reconcile` — correct on a private clone, and on a shared tree an instruction to sweep
  // a peer's uncommitted work into your own commit.
  const spin = readFileSync(join(ROOT, 'src', 'scripts', 'spin.ts'), 'utf8')
  assert.match(spin, /--derive-only/, 'spin\'s drift message must offer the door that publishes nothing')
  const hook = readFileSync(join(ROOT, 'hooks', 'pre-push'), 'utf8')
  assert.match(hook, /--derive-only/, 'the pre-push hook must offer it too — it is what a blocked push reads')
})
