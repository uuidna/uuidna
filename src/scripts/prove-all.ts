#!/usr/bin/env node
// @non-harmonic: spawns the lean chain as a subprocess — a NAMED boundary, like wave-run.ts and all-run.ts.
//
// prove-all — FORCE EVERY KERNEL SPAWN, DECIDED BY THE PROGRAM AND NOT BY WHICHEVER SHELL npm PICKED.
//
// THE RELEASE GATE COULD NOT RUN ON A WINDOWS HOST, AND HAD NEVER RUN ON THIS ONE (2026-08-25, found by a peer
// session running the slow chain by hand). `npm run audit` — which is also `prepublishOnly`, so it IS the publish
// gate — carried exactly one env-prefixed link out of thirty-six:
//
//     UUIDNA_PROVE_ALL=1 npm run lean
//
// `VAR=value cmd` is POSIX shell syntax. npm runs scripts through its script-shell, which is unset here
// (`npm config get script-shell` → null), so npm falls back to cmd.exe, which has no such form. The chain died at
// link 2 with "'UUIDNA_PROVE_ALL' is not recognized as an internal or external command" — before the kernel,
// before generate, guard, spin, the tests, and before the `git diff --exit-code` that decides whether the derived
// layer is honest. Reproduced in a throwaway package.json to be sure it was the FORM and not the chain.
//
// WHY NOBODY SAW IT. The same chain is executed two ways. gate-all READS scripts.audit, classifies each step and
// spawns it through the host's resolved shell (os/host), where the prefix works — and reports 31 green. npm runs
// the identical string through cmd.exe and dies. Both call themselves the audit; only the computed one has ever
// executed here, and gate-receipt then verifies some arms at O(1) instead of re-running them. A green gate was
// standing in for a release gate nobody had run.
//
// THE FIX IS NOT TO TEACH THE RUNNER THE PREFIX. gate-all already parses `VAR=value` to classify a step, so three
// lines would have made it inject the variable too — and that is uuidna absorbing the cost of the offence, which
// widens the gap between the two chains rather than closing it. The gap IS the finding.
//
// So the decision moves out of the shell and into the program. The flag is consumed six times as
// process.env.UUIDNA_PROVE_ALL, three layers below the chain (lean-all, lean-axioms, lean-gen, lean-installs,
// lean-models), so it must reach a whole subtree — an environment, not an argument. This builds that environment
// explicitly and hands it to a child spawned through the host's own shell. Every host reaches the same state,
// and no manifest line depends on which interpreter npm chose.
import { spawnSync } from 'node:child_process'
import { ROOT } from './api.js'
import { shellOrExit } from '../os/host/index.js'

/** THE FLAG THIS RUNNER EXISTS TO SET. One declaration, so the test asserts the same name the consumers read. */
export const PROVE_ALL = 'UUIDNA_PROVE_ALL'

/** The environment the lean chain is proved under — PURE, so the law is testable without spawning anything.
 *
 *  This is what the release gate's proof-forcing actually IS, now that it is not a prefix in a string: a base
 *  environment plus one variable. proof-cache.test.ts asserts THIS rather than a shell form, so the law survives
 *  a host that spells environments differently. */
export const proveAllEnv = (base: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv =>
  ({ ...base, [PROVE_ALL]: '1' })

/** the chain this forces — npm's own `lean` script, unchanged and undivided. It is spawned rather than inlined
 *  so there is exactly ONE definition of what proving the ledger means; a second copy carrying the flag would be
 *  the duplication `one-receipt dry` refuses, and would drift the day the lean chain grows a step. */
export const PROVED_CHAIN = 'npm run lean'

if (process.argv[1]?.endsWith('prove-all.js')) {
  const shell = shellOrExit('prove-all')
  console.log(`prove-all — forcing ${PROVE_ALL}=1 for: ${PROVED_CHAIN}`)
  const r = spawnSync(shell.file, shell.argv(PROVED_CHAIN), {
    cwd: ROOT, env: shell.env(proveAllEnv()), stdio: 'inherit',
  })
  // THREE OUTCOMES, the same distinction the arc receipt and the shell throwers now carry: `status` is null when
  // the command never STARTED, and reporting that as a failed proof would send a reader hunting a kernel error
  // that never happened. The release gate must not proceed on either, but it must SAY which.
  if (r.error || r.status === null) {
    console.error(`✗ prove-all — the lean chain could not be RUN: ${r.error?.message ?? `killed by ${r.signal}`}`)
    console.error('  this is a fact about this host, not about the ledger — no theorem was disproved, none was proved either')
    process.exit(1)
  }
  if (r.status !== 0) {
    console.error(`✗ prove-all — the lean chain exited ${r.status} with ${PROVE_ALL}=1: the ledger did not re-prove from the kernel`)
    process.exit(r.status)
  }
  console.log(`✓ prove-all — the ledger re-proved from the kernel with ${PROVE_ALL}=1, every spawn forced`)
}
