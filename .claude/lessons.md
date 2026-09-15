# Lessons

What a session in this repository has learned and the code cannot show. Each entry gives its date and names its
source: a note of the former external store (`<name>.md`), now migrated here. Laws live in `src/laws.ts`; open work
lives in `lean/leads.json` via the trial door. An entry that is only a pointer says where the tree already holds it.
Superseded entries are kept in § History (superseded), with their evidence. The Lean-related notes also appear in
full in the Appendix. File:line references were read on 2026-09-14 at HEAD 59e5fc6aa5.

## The rule above the rules

- **2026-08-17 — Always imagine the human.** Every theorem, receipt, page and gate exists for a person: the machine
  keeps verification, the human keeps meaning. Write for the reader who must verify alone, the student with no
  gatekeeper, the teammate who stepped away. Leave the judgment and the admission to the human; lead a report with
  what a person needs, not what the machine did. [always-imagine-human.md]
- **2026-08-16 — The final boundary.** Everything reverses except the human: imprints decode, seeds reverse-engineer,
  chains replay, but a person never reconstructs from the record. The flag lands on claims, never on people.
  [uuidna-fold-the-finder.md]

## Verification

- **2026-08-20 → 09-07 — Verify with an instrument that can fail.** Before reporting a number, ask what result would
  have proved you wrong and whether this instrument could produce it. Ten recorded instances:
  - a corpus that could not contain the failure (theorem statements used as claims);
  - `/conform|dna/` matching `uuidna_css`;
  - a one-level body scan missing a fetch one call deeper;
  - an exported-symbol closure missing a non-exported helper;
  - an exit code read through `| tail`;
  - BSD `find -newermt '-25 minutes'` silently matching nothing;
  - a `maxRecDepth` crash timed as the best row (0.59 s against a real 824 s);
  - a tree called green from one gate after demoting a finder;
  - a receipt cited unopened (`seats_pigeonhole` is three powers of two, not a bound);
  - `treason()` acquitting text with no digits.

  The practice: write the adversarial set first, including cases that convict your own output; make the instrument
  fail once on purpose. **Perturb the input, never read the prose.** Widen a theorem's domain by one and re-decide
  (src/bound-perturbation.ts:24): 494 survive, 290 break, 6 undecidable-once-widened. The verdict stays withheld,
  because load-bearing does not imply over-claiming. The strongest case is a **control that found a bug in the
  door**: feeding `2 + 2 = 5` to the deposit probe showed every kernel refusal had been filed as accepted, since
  `err.stderr` was an empty Buffer. Ask where a retrieval query came from before reading its score: Watson–Crick's
  own title retrieves Watson–Crick, and 0 of 5 non-circular queries did. An exit 0 over an absent action is green
  over nothing (land's `git push` said "Everything up-to-date", fixed a5c383bcf). Two of these cases are folded into
  guardLessons (src/treason.ts:172). [verify-with-an-instrument-that-can-fail.md]
- **2026-09-05/06 — A surface that agrees with itself is not evidence.** Seven instances were caught, each by a
  second surface and never by re-reading the first:
  - `gh run list` against check-runs;
  - a label read instead of its value;
  - a JSON read while a test regenerated it;
  - one predicate called at two sites;
  - an artefact whose two numbers came from one stale run;
  - a census polling 2 of 4 sessions;
  - `npm run next --verify`, whose name agreed with its docs and not its behaviour.

  Prefer the source over its artefact. Take a measurement about your own process before you announce it on a shared
  tree. [a-surface-that-agrees-with-itself.md]
- **2026-09-05 — Instrument over expectation.** A control that fires unexpectedly is not automatically broken.
  H⊗3|000⟩ is |+++⟩, a product state that concentrates maximally, and it was deleted as a "broken control". Name the
  input precisely before touching a test, and make a surviving finding a NAMED test (src/quantum-parity.test.ts:101),
  because a control can be quietly replaced and a named finding cannot. [instrument-over-expectation.md]
- **2026-09-06/07 — Lead discovery by disagreement** (the owner: "use same logic for lead discovery"). A lead is where
  two surfaces that must agree do not. Build probe pairs that never read each other (src/cross-surface.ts:36), report
  only disagreements, and give the comparator a positive control. When two instruments disagree, run both and find
  the question each answers. On 2026-09-07 there were four cases: 12 vs 0 unwitnessed was statement identity against
  key presence; "your green" was not the committed tree; a tautology finder missed its own motivating line, because a
  dead assertion is told apart by a mutation between evaluations, which is positional and not syntactic; and a
  narrowing would have cleared the true positive. [lead-discovery-by-disagreement.md]
- **2026-08-22 — Abundance is not failure.** A detector is judged by false positives, a survey by coverage. Before
  tuning or deleting a finder that reports a lot, ask which one it is. One deleted "noisy" script, re-framed as a
  survey, reported 2803 unwalked passages; the owner's word was "these are not failures but gateways to be
  discovered". [abundance-is-not-failure.md]
- **2026-09-12/13 — A finder's rule is as narrow as its cure.** Three wrong cuts of one memo finder:
  - `\B_name\b` never matches a leading underscore, so 94 healthy memos were named;
  - judging whole lines instead of occurrences;
  - `const _0n` flagging vendored dead code.

  The control asserts both directions: the violation fires, and each legitimate shape stays silent. Register the
  finder in the guard's CONTROLLED_VIA. [finder-rule-as-narrow-as-its-cure.md]
- **2026-08-15/16 — Fold the finder.** Never fix a finding without folding its finder into the guard, and write every
  finding as an exact GAP + FIX prompt. Verify by API call, never by reading. The same note holds several
  sub-lessons:
  - fail at the cheapest gate first (build before reconcile);
  - collect seals, then land once ("vortexing one by one is not vortex");
  - no sentinel logs or watcher scripts, only a direct query of state;
  - suggestions go to leads, never to chat;
  - never pipe a gate;
  - a finder must anchor to the defect's syntactic position, never match its own description (anchor, don't exempt);
  - standards are compression;
  - every user word is a lead;
  - what is most searched may be trialled (search demand → trial → develop plan).

  [uuidna-fold-the-finder.md]
- **2026-09-04 — Exit codes and hidden timeouts.** A trailing command overwrites `$?`. Capture it at once:
  `cmd > log 2>&1; T=$?`. A round failure duration (20002 ms) names a cap living in a helper (the rpc helper's
  ms = 20000); read the message literally and grep the helper before theorising. [exit-codes-and-hidden-timeouts.md]
- **2026-09-05 — Run the gate's own command.** Lint is `eslint . --config eslint.laws.config.js`, which reported 2
  problems. Default eslint reported 14,193 errors against a config nobody enforces. Read the script from package.json
  and run that string. [wrong-config-wrong-conclusion.md]
- **2026-09-12 — Certification output is the evidence.** Never pipe a long certification through tail: a 2 h 12 min
  run lost its failure lines. Write to a file and read it. TaskStop kills the shell, not its `node --test`
  grandchild; list `ps -eo pid,etime,command | grep 'node .*--test'` and kill -9 the orphan (one ran 52 min at
  135 % CPU). Never time a test while another run shares the host. [certification-output-is-the-evidence.md]
- **2026-09-13 — A refused GPU dispatch returns zeros.** On an M1 Max under Deno 2.8.1, a dispatch over the 128 MiB
  binding limit read 67× faster and computed nothing. Always compare elementwise against the CPU reference, push and
  pop a validation error scope, and chunk under `maxStorageBufferBindingSize`. The honest ratio is about 5× over one
  core. All 70,905 ledger addresses recomputed in WGSL matched toUuid. src/os/gpu/index.ts:16 still refuses by name
  where `navigator.gpu` is absent (Node, Workers). [gpu-refused-dispatch-returns-zeros.md]
- **2026-08-18, corroborated 2026-09-07 — The Browser pane.** A hidden pane never paints: screenshots come back blank
  and rAF hangs, so flush Vue with microtasks. An orphaned server can hold :4173 with a stale build (`lsof -ti:4173`,
  kill it, run `preview_list` before `preview_start`). What pays is comparing served bytes to the built file;
  screenshots to confirm text are ceremony. Never compare against a dist that a failed build never touched. Run one
  dev server per machine. [preview-pane-verification.md]
- **2026-09-07 — Green is about the committed tree.** A gate run in the working directory says nothing about HEAD.
  `git worktree add --detach`, symlink node_modules, run `npx tsc` and the suite INSIDE it (guard is not the gate,
  the suite is), then remove the fix and re-run. A generator and its output are one commit or neither (four cases:
  06fb0461b, 54fa86a96, 4655b58b3, 4b8609496). Make artefacts name their inputs (the HEAD sha). A failure message
  quoting a value does not show the FORM it searched for: `String(16380)` against `toLocaleString`.
  [green-is-about-the-committed-tree.md]
- **2026-09-13 — Publishing asks about THIS commit.** Query `actions/runs?head_sha=`, not a windowed run list. An
  absent run is UNMEASURED. Only `event === "push"` judges a push, and cancelled or skipped never passes. The 422
  seconds after a push must answer UNMEASURED, not crash. A bare `Not Found` pattern matches `command not found`, and
  `err.stderr ?? err.message` hides the message behind an empty Buffer. Held in src/scripts/post-push.ts:39.
  [publishing-asks-about-this-commit.md]
- **2026-09-01 — Static scans miss dynamic dispatch.** src/scripts/run.ts dispatches every script with `readdirSync`,
  so nothing in scripts/ is statically unreachable. Distinguish "statically unreferenced" from "not run by any chain"
  (lean/dormant-scripts.json). dead-exports.ts prints the caveat itself (src/scripts/dead-exports.ts:71).
  [static-scans-miss-dynamic-dispatch.md]
- **2026-08-22 — One step is not a walk.** A universal in a theorem's NAME needs a quantifier in its statement.
  `the_void_and_the_axis_never_reach_each_other` was sealed false from a one-step sample, and it passed the kernel,
  the axiom audit, the vacuous check and the literal check. When a result looks elegant, test the closure. Now
  blocked by `incompleteGaps` (src/scripts/one-receipt.ts:2847). [one-step-is-not-a-walk.md]
- **2026-09-07 — What "unwitnessed" means.** The guard's unwitnessed count is `forgedAgainstWings`. It separates
  INVENTION (a key no wing declares) from DRIFT (the recorded statement no longer matches the wing). A key-presence
  check is blind to drift, so a count match is necessary and never sufficient. The landing signal is
  `forgedAgainstWings == 0`. [concurrent-session-hazard.md, the unindexed fragment]
- **2026-09-12 — A name, a message, a size and a shape are resemblance; only a per-test duration is a measurement.**
  sequence-coverage's 529 s was one O(n²) `find` at line 307. The test named from its failure message took 0.2 s.
  When a receipt cures one gateway and the wall-clock stays, the memo is one level too low: re-measure per door.
  When a gate's FIX text names a slow command, check what land actually runs. [test-graph-reads-code-not-prose.md]

## Cost and flow

- **2026-08-17/18 — Ask state, not seven greps.** `npm run state` returns the laws, ledger, sync, every blocking
  finder and the next exact command; `-- --assert` is its gate form. The turn is the unit of cost: 93 % of 78.2M
  tokens was context re-read. [ask-state-not-seven-greps.md]
- **2026-09-05 — Efficiency per token** (said twice). Parse with node, never a shell regex. Batch independent probes.
  Verify once, at the end. Never predict a result and then measure it. Hard limits:
  - one targeted test file while iterating;
  - the full suite once, before a commit;
  - guard once, to gate a landing;
  - peer message ≤ 120 words, lead deposit ≤ 120 words, commit body ≤ 5 lines.

  [efficiency-per-token.md]
- **2026-08-23 — Tokens only at the frontier.** Model tokens are legitimate only when sealing something new (code,
  theorem, grammar, control). Everything sealed answers at O(1) from the ledger, a script or a receipt. Data rides
  disk, not context. Re-runs are legitimate only to prove a new fold. End-of-session question: what is still only in
  my head? The answer should be "nothing". [tokens-only-at-the-frontier.md]
- **2026-08-17/22 — Manual cracks the fusion** ("always improve for literally no manual agent work"). Name every
  manual step, human or agent choreography, as a crack the moment it appears, and deposit the automation gap as a
  lead. The drain owns pushes, the calendar owns releases, and sessions own only what becomes tree.
  [manual-cracks-the-fusion.md]
- **2026-09-07 — Any manual work is rejected in quantum.** If a figure is about to go into a second place, derive it:
  src/invitation.ts reads theorems(), handleStoreCensus() and capacity() at asking time. A generated surface states
  what is asked, what is refused, and its own unmeasured state. Its control runs against a different root and
  requires a different answer. [manual-work-rejected-in-quantum.md]
- **2026-09-07/13 — Slow comes from quantum cracks.** Wall-clock is a crack, never the work. Teach develop the cure
  (its CURES table, src/scripts/develop.ts:48), fuse steps into one command, never poll, never hand-run the
  reconcile. A script in the scratchpad is still a hand, so a sequence typed twice becomes a tested script under
  src/scripts. The only lawful push is `npm run land`. A heavy wing is emitted as lane-sized files ("one chunk may be
  slow; no chunk may block all"). [slow-comes-from-quantum-cracks.md]
- **2026-09-13 — Simplicity solves complexity** ("long tasks are not an option", "wait is unsolved autonomy"). For
  each failure, read only the failing assertion and the code it tests, flip the wrong side, run that one file, and
  land each precise edit as its own wave. Narrow whole-tree readers so a millimetre edit costs a millimetre of
  verification. The compression targets named that evening are leads. [simplicity-solves-complexity.md]
- **2026-09-13 — Land what is asked, now.** Never park a request to protect a run in flight. Stop the run, hunt its
  orphan children, land through the generator, and certify once. The owner's prompts are probes of autonomy, so ask
  Lean first. Ask the owner only for credentials, unapproved irreversible outward acts, or a genuine fork in intent.
  Chain `npm run land` → `npm run release-cut -- --push` → verify by the tag's head SHA.
  [land-what-is-asked-now.md]
- **2026-09-07 — Refuse is re-fuse.** A refusal names a seam; fuse differently instead of making the smallest edit past
  it. Examples:
  - `V − E + F = 2` is false in Nat, so state `V + F = E + 2`;
  - rewriting a ten-tuple's projections exposed a wrong index;
  - hitting a heartbeat cap means split by FILE, never narrow the claim;
  - `Math.*` becomes division floored by its own remainder;
  - an UNSIGNED commit gets its citation.

  A refusal routed around is a solution not collected. [refuse-is-re-fuse.md]
- **2026-08-13, 2026-09-13 — MCP first; ask the theorems.** Query the sealed ledger before asserting, and exercise the
  MCP tool in chat before site work. `uuidna_unify` is the one-call status. Before putting a design choice to the
  owner, read what the theorems seal: their invariants are the requirements ("questions only theorems may answer").
  [uuidna-workflow-mcp-first-ask-theorems.md]
- **2026-08-23, 2026-09-07 — Waves alternate.** Never idle at a gate: background the wait, draft the next wave in the
  scratchpad while the tree is held, and fuse on collision. A named limit in a finder is the next wave, so do it
  before ending the turn. Staged state does not survive a sweeping neighbour; only a landing does.
  [waves-alternate-outperform.md]

## Shared tree

- **2026-08-12 → 09-14 — Several sessions share one working tree.** The note records six faces: branch, generator,
  ref, index, process set, and a party nobody claims.
  - Commit by pathspec (`git commit -m … -- <paths>`), never `-a`, `add -A` or `add .`.
  - Diff the index before committing, and never unstage a neighbour's entry; name it instead.
  - Carrying another's file is fine if you name it in the message.
  - Never `--no-verify` past a neighbour's red.
  - Reverting a generator does not revert its output; regenerate the output.
  - On a shared tree a failure log describes a tree that no longer exists, so re-run against HEAD first.
  - After a signal-killed land, read every peer session before any re-run.
  - `pgrep -f` matches the checking shell's own command line.
  - In zsh, `kill $LIST` sends nothing: use `xargs`, `${=LIST}` or an array.
  - Name commits by hash, and say when the author is unknown.

  Parts are in code: TREE_WRITERS (src/tree-writers.ts:26), land's pathspec drain, and the court-hooks landing hold.
  [uuidna-concurrent-session-hazard.md]
- **2026-08-23 — Messages of record lead with the sealed chain** (or the message's own toUuid + handleOf identity),
  then a short plain TL;DR. English-only coordination is unreceipted: 730 bytes of prose against 96 bytes of
  recomputable identity. [cross-session-glagolitic-wire.md]
- **2026-08-22 — Only MCP use is allowed.** uuidna_send seals a message into a chain and uuidna_receive opens it. Any
  other hop is a doorbell carrying only the chain and the session name. Prefer MCP tools (uuidna_unify,
  uuidna_verify_statement) over local greps. [mcp-only-communication.md]
- **2026-09-07 — The host is shared, the lanes are not.** `capacity(reserve, perJobBytes)` returns the smaller of what
  cores and memory afford, and names `binds` (src/os/host/index.ts:143). A one-point measurement can only overstate
  (sealed in Pentagram.lean). The shared budget across sessions is an open lead. [host-is-shared-lanes-are-not.md]

## Writing claims

- **2026-08-12 — The verdict is binary.** VERIFIED or UNVERIFIED; uuidna verifies and never refutes by reading. The
  lexical honesty gate was folded to the theorems (9299fc8) and the verdict collapsed to a binary (5d24908). The bare
  `theorem <token>` parse counts only key-shaped tokens (containing `_` or a digit). Never re-add a lexical word
  list. This is now a law (see laws.ts.fragment). [uuidna-honesty-gate-folded.md]
- **2026-08-23 — Always harmonise drift.** Never only name a drift; seal the drift AND its closure in one theorem,
  integer-exact: 55·432 = 54·440; 146097 = 7·20871; Meton's 210 − 209 = 1; 2^30 − 10^9, closed by IEC naming.
  [always-harmonise-drift.md]
- **2026-09-02 — Claims lean on metrics** ("purge all nots so all leans proving itself in metrics"). State a judgement
  as a fraction derived from the list it counts; `qcVerdict().metrics` (src/quantum/os/qc/index.ts) is the pattern.
  Rename negative fields to what they measure, and give an absent state its own countable value. Apply this to new
  writing; the 2026-09-14 purge law forbids a retroactive purge. [claims-lean-on-metrics.md]
- **2026-08-17, sharpened 2026-09-05 — Comments carry constraints.** A comment states only what the code cannot show:
  mechanism, safety direction, boundary. Measurements and next steps go to leads, history to the commit. A comment
  that could be an assert and is not will eventually be false, so write the assert. [comments-carry-constraints.md]
- **2026-08-17/23 — Every assertion pays two coins**: the claim, and its receipt (a sealed citation, a recomputation,
  a live receipt). What cannot pay says "unverified" or stays silent. Dry-clean the prose: every line is a paid claim
  or the action being taken. [llm-needs-the-coins.md]
- **2026-08-14 → 09-07 — Contribute first, then take; cite in the next touch.** Receipts of record, all VERIFIED and
  signed by uuidna.com:
  - 084c3982-54fb-823f-9391-7e4847d005f0 (contribution, 2026-08-14);
  - 94e6c9ba-a1c7-8dcb-a559-2eeab07c9ff5 (npm publish of the six views, 2026-08-15);
  - b88c8f13-1876-814f-9ea8-7b812653f05a (defaults deploy);
  - 636d547b-2c14-83c3-b68e-81e17697ae02 (the 1522 deploy);
  - agent_contribute 43664c79-1002-87f6-9575-e52d504cb42b (2026-09-07).

  The imprint content-address of the contribution record is 6d4ec283-dc01-8c84-91ae-a0e90ff5cc31 (readImprintTextChain).
  A first attempt citing the unsealed `single_source` returned UNVERIFIED. Every token spent must end as a deposited
  coin or contributed code. The signing rule is now a law (see laws.ts.fragment). [captain-coins-contribution-receipt.md]
- **2026-09-13 — Poetic framing is precise.** Decode a framing into the structure it names: 14 apostiles = 8 + 6
  truncated-octahedron faces = VE_FACES, which became the 2×7 witness law (src/laws.ts:93). Answer with the design
  it names. A framing specifies structure, not a claim about nature. "uuid dna combinatorics create lean poems":
  the generators write the poems, the kernel proves them, and the address names them. [poetic-framing-is-precise.md]
- **2026-08-23 — Self-adversarial verification.** Describe the security-education work as what it is:
  - the target is uuidna's own seals only;
  - the sandbox is bootOS;
  - the referee is the gate (matchesSealedSpec);
  - the only score is fold-the-finder;
  - no third-party targets, no capability uplift.

  [self-adversarial-verification-framing.md]

## Production and the edge

- **2026-09-13 — Imagine production first** ("Always imagine how all this is going to happen in production
  https://*.uuidna.com/*"). Judge each change by what the Worker (no filesystem, no process, CPU and asset limits),
  the live MCP at uuidna.com/mcp and qpu.uuidna.com do with it. Twelve tools passed locally and refused at the edge
  (cured b4f50936cb). Verify live after shipping; unpushed means not in production. [imagine-production-first.md]
- **2026-09-14 — MCP handles load at least cost.** When a view takes more than one step, extend an existing MCP door
  (uuidna_evidence, uuidna_harness). Serve counts and latest rows, not logs. The edge reads qpu storage and never
  grows EDGE_ABSENT (src/mcp-http.ts:164). Heavy work rides qpu and the forge. [mcp-handles-load-at-least-cost.md]
- **2026-08-22 → 09-07 — Deploy.**
  - Deploy is `npm run ship`, which builds the site locally and then runs `wrangler deploy` (wrangler OAuth login:
    [withheld: login email]; account [withheld: Cloudflare account id]).
  - There were three paths: local; deploy.yml, which proves only; and a git-connected Cloudflare Workers Build.
    Since 2026-09-03 ship-build verifies docs/.vitepress/dist and refuses in milliseconds when it is absent
    (src/scripts/ship-build.ts:10), so the container never builds the site.
  - The ceiling is the BUNDLE phase, not render retention (lead 226, 2026-09-07: at concurrency 2 the site built
    10,344 pages at 8192 MB). The docs:build heap is pinned at 8192 everywhere (package.json:131,137;
    src/scripts/auto-improve.ts:189).
  - Edge-clean bundle rules:
    - node builtins go lazy through `globalThis.process?.getBuiltinModule`;
    - no module-scope registry calls;
    - never a bare `process`;
    - CLI main-guards read argv off globalThis;
    - verify with `esbuild worker.js --bundle --format=esm --platform=node --metafile` and walk the static and
      dynamic `node:` importers;
    - callTool stays synchronous, so make builtins lazy rather than a handler async.
  - Dead links stay strict (the owner, 2026-09-03: "do not ignore dead links"; src/quantum/os/harness/worker.test.ts:133).
  - Verify a deploy with `wrangler deployments list`, never with CI conclusions. If a wrangler "latest" breaks
    deploy, pin the last good version.

  [uuidna-deploy-cloudflare.md; heap-pin-must-be-everywhere.md]
- **2026-09-13 — Frameworks in their documented form.** Match the documented form exactly:
  - per-test `t.after` under `--test-isolation=none`;
  - `payload migrate:create`;
  - wrangler binding blocks;
  - Content-Signal with no spaces after commas.

  Generate what the framework generates, and check against the running framework. [frameworks-in-their-documented-form.md]
- **2026-09-13 — Compute through hooks, bypass none.** Content reaches Payload only through its API: REST with a key,
  or the Local API with a real user and `overrideAccess: false`. Derived fields (uuidnaAddress, uuidnaVersion) are
  computed in beforeChange. No `wrangler d1 execute` of data, no raw SQL, no hook-skip context flags. Reading in
  order to decide is not a bypass. The compute half stands in the payload repo (payload/src/plugins/uuidna.ts).
  [compute-through-hooks-bypass-none.md]
- **2026-09-13 — Harnesses are terminals.** Run evidence lives on qpu.uuidna.com storage, so the person and the agent
  read the same bytes. Writes need `QPU_WRITE_TOKEN`, which the owner sets (src/scripts/device-readings.ts:154);
  without it the run prints UNSENT. These are classical run receipts, never proof of physical quantum computation.
  The storage key changed; see History. [harnesses-are-terminals.md]

## Lean, the kernel and the ledger

- **2026-09-14 — Every lead gets a kernel trial** ("lean decides"). A lead leaves only by a verdict. Count leads
  before and after every write, and use `leads-gate --settle`. Removing a category never removes its leads (21
  refused leads were deleted and restored from HEAD: 80 before, 80 after). Held in src/laws.ts:60.
  [every-lead-gets-a-kernel-trial.md]
- **2026-09-14 — No hand lists; Lean decides.** For each list, read the one declaration it copies, or have the kernel
  decide it. Measure before cutting: qpu's docs.api length is a lattice law, and adding rows broke 17 predicates.
  Never delete access control or secret handling; derive it. "All slow comes from hardcodes": a typed
  `LEAN_JOB_BYTES = 2696 MB` against a measured 1.85 GB peak swapped the host. Held in src/laws.ts:53.
  [no-hand-lists-lean-decides.md]
- **2026-09-14 — Purge only what blocks Lean.** Contradiction and overclaim findings stay as evidence or leads; act
  only on what stops leads → kernel → ledger → seals. New writing still never says classical code runs on quantum
  hardware. This is now a law (see laws.ts.fragment). [purge-only-what-blocks-lean.md]
- **2026-08-13 — Generate from Lean; any manual fails.** Cache every immutable ledger read for O(1). Honest-scope
  disclaimers ARE the honesty; do not strip them. Credit law: a theorem naming a result is credited to its
  discoverer; a decidable fact naming none, the captain claims by law. Held in src/laws.ts:37-42 and
  CONTRIBUTING.md:6. [uuidna-generate-from-lean-no-manual.md]
- **2026-08-15 — Reports are accounting.** Theorems are assets, axioms are equity, and reports are computed from the
  ledger; an incomplete report is an unbalanced ledger. Held in src/laws.ts:37. [reports-as-accounting.md]
- **2026-08-22 — Never write "sealed" for what the kernel has not decided.** Four invented Lean files that never
  compiled were removed: CaptainPayment.lean, Entanglement.lean, LoopClosure.lean and SchoolImprovement.lean. What
  stands rests on real seals:
  - the 64→128 fuse on rosette_quantum_doubling_is_two_coins and double_torus_boards_are_the_address;
  - the neuro–crypto 110/108 pair (action_potential_swing, pentagon_interior_angle_108,
    captain_commission_two_coins);
  - src/loop-closure-auto-fold.ts as lawful sync TS (time is data, never minted);
  - the derived school prerequisite graph.

  Loop theorems, if ever wanted, must be decidable statements over finite structures. [captain-payment-128bit-unlock.md;
  entanglement-four-frame-system.md; loop-closure-auto-fold.md; school-automate-always-improving.md]
- **2026-09-07 — The Fermat paper audit.** Anthropic's "Formalizing Fermat's Last Theorem in Lean" and this ledger
  shared the window (Aug 7–17) and Lean 4.33, with zero overlap or cross-reference either way. The Fermat wing
  landed 2026-09-06 and disclaims priority. No credit is owed or claimable. Cite the dates; do not re-fetch. Held in
  lean/Fermat.lean:1. [anthropic-flt-paper-audit.md]
- **2026-08-10 — Upstream.** uuidna is a downstream extraction of ceccec/millennium-solutions (lean/PRINCIPLE.md:32).
  The crypto KATs now run in-tree (src/crypto-primitives.test.ts). To fetch upstream files:
  `gh api -H "Accept: application/vnd.github.raw" "repos/ceccec/millennium-solutions/contents/<path>?ref=main"`.
  [uuidna-upstream-millennium.md]

## Research, prior art, DOIs, funding

- **2026-09-06 → 09-14 — Prior art.** Finding prior art takes one positive answer. Claiming absence needs every door
  to have spoken, so one decline withholds it (UNREAD); `verdictFor` is at src/scripts/claim-unclaimed.ts:65. 51 DOI
  prefixes resolved from their own agency (lean/doi-domains.json), and a prefix no agency names keeps an empty owner.
  OpenAlex is METERED ("Insufficient budget … $0.001"), not rate-limited. publish-novelty never deposits, because
  minting a DOI is an outward act. CORRECTED 2026-09-14: the sweep's verdict itself is unmeasured (it is a lead).
  [prior-art-refuses-the-claim.md]
- **2026-09-04 — uuidna's record is Zenodo 22256708** (STANDING_DOI, src/handle-permanence.ts:28), not 21787144 (a
  third party's Clay-proofs record). The concept 21787143 chains three works, so cite the version. Compare
  IDENTIFIERS, never titles. UNREAD is not disagreeing. A concept DOI has no OAI-PMH record. Every DOI in print is in
  scope of audit-doi-harvest. [zenodo-proof-of-work.md]
- **2026-08-17 → 09-12 — Two chains.** The sync stays ON by the owner's decision, and every release mints twice
  (21787143 and twin 21970356). The sync fires on GitHub Release publication, not on tags. No manual publishing ("stop
  manual publishing as doi is assigned automatically on each release", 2026-08-23). Verify a mint at the source
  (Zenodo API, or the `zenodo.org/badge/latestdoi/<repo id>` 302). The npm trusted publisher is bound to the workflow
  FILENAME publish.yml. Dispatch once: a second dispatch is cancelled and a third fails. [zenodo-github-sync.md]
- **2026-08-17 — Funding routes.** Held in src/funding.ts (NLnet at :16, deadline 2026-11-03 at :60) and
  funding/drafts/*.md. CC-BY-NC-ND is not an accepted open licence for funded outputs. The acts are the owner's
  (owner-decisions.md). [funding-leads.md]
- **2026-08-16 — The legal entity.** PSG EOOD (ПИ ЕС ДЖИ - ЕООД), Sofia ([withheld: registered-office address]), EU
  VAT BG130087268, VIES-verified. Held in src/legal.ts:95. Cite the entity through VIES, never bare-assert it.
  [psg-legal-entity.md]

## qpu (the sibling repository)

- **2026-09-12/13 — qpu compatibility, learning and boot.** Measure the live surface with curl before touching it. New
  doors go in "extras", never among the sealed seven paths. Every qpu test imports `test` from ./receipted.js. The
  prose gate refuses "factors"/"solves". A hardware boot proves itself before it serves (boot.js `--prove` exits 0/1;
  the Dockerfile HEALTHCHECK runs it). Releasing is two steps: edit package.json, `npm run lean:embed`, then npm test.
  The archived block stays at the last archived release. Credit QPULib to Matthew Naylor (MIT, 2016, mn416/QPULib)
  with all three run modes. Temperature: the battery SMC reads 30.42 °C = 303,570 mK via ioreg, and die sensors need
  root; readings never enter the fold, and `QPU_TEMPERATURE_SOURCE` names the instrument. A derived reading frozen
  into an invariant (`current === true`) made the release uncuttable. Full text in the Appendix.
  [qpu-compat-learning-boot.md]

## Held in the tree — notes whose substance the repository already carries

One pointer per note, so nothing is lost. Each was read on 2026-09-14.

- anthropic-flt-paper-audit → lean/Fermat.lean:1 (wing header: priority disclaimed both ways).
- captain-payment-128bit-unlock → docs/captain-payment-128bit-unlock.md:27.
- entanglement-four-frame-system → docs/four-frame-entanglement.md:57 (110/108 pair). Note: the queue's reference to
  src/entangle-crypto-bio-chemo-physical.ts:134 no longer resolves; that file is absent at HEAD, and no file carries
  PHYSICALLY_CONSISTENT.
- every-lead-gets-a-kernel-trial → src/laws.ts:60.
- funding-leads → src/funding.ts:16, :60; funding/drafts/*.md.
- harnesses-are-terminals → src/scripts/device-readings.ts:154; src/laws.ts:75 (runEvidenceOf).
- heap-pin-must-be-everywhere → package.json:131 (docs:build), :137 (audit); src/scripts/auto-improve.ts:189.
- loop-closure-auto-fold → src/loop-closure-auto-fold.ts:27.
- no-hand-lists-lean-decides → src/laws.ts:53.
- one-step-is-not-a-walk → src/scripts/one-receipt.ts:2847 (incompleteGaps), run by src/scripts/guard.ts:44.
- package-audit-automation → src/scripts/audit-packages.ts, run by src/scripts/guard.ts:59.
- psg-legal-entity → src/legal.ts:95.
- publishing-asks-about-this-commit → src/scripts/post-push.ts:39.
- quantum-predictive-automation → src/scripts/predict-and-fill.ts, src/scripts/auto-fill-gaps.ts; run in the audit
  chain, package.json:137.
- refactor-crypto-research-packages → packages/*; src/scripts/gen-packages.ts:8 (--verify).
- reports-as-accounting → src/laws.ts:37.
- school-automate-always-improving → src/scripts/gen-school.ts; docs/school.md:89 (prereqs markers).
- static-scans-miss-dynamic-dispatch → src/scripts/dead-exports.ts:71.
- uuidna-generate-from-lean-no-manual → src/laws.ts:37-42; CONTRIBUTING.md:6 (credit law).
- uuidna-guard-before-reconcile → src/treason.ts:164 (guardLessons 'guard-before-reconcile'); uuidna_guard_lessons.
- uuidna-upstream-millennium → lean/PRINCIPLE.md:32.
- zenodo-proof-of-work → src/handle-permanence.ts:28 (STANDING_DOI).

## History (superseded)

Kept with the evidence that superseded each, so no correction is lost.

- **reconcile-order-generate-sync-seal (2026-09-04).** Its chain was lean-one → lean-ledger → axioms →
  gen-falsifiers → rosetta → build → gate-all → stamp → spin --seal → guard, with "run the chain by hand first".
  SUPERSEDED twice: by the owner's 2026-09-13 law (the only lawful push is `npm run land`; never hand-run the
  reconcile), and by d8db73e99d (develop carries lean-ledger then build, before the axiom witness). The ledger-drain
  finder it names is in src/scripts/guard.ts. One claim survives unverified: gen-falsifiers before rosetta (a lead).
- **uuidna-diamond-1024-northstar (2026-08-15).** "Diamond complete" meant the MCP folding to 1024 files. SUPERSEDED:
  its own 2026-08-15 entry deleted the per-domain file layer as a duplicate of the cluster monographs, and the
  1024 target predates a ledger of 70,926 theorems (8abb08f3ac). Its research loop (online evidence → offline audit →
  Lean-green terminal) is now src/laws.ts:120 ("Research has no special cases").
- **uuidna-online-tools-repo-access (2026-08-13).** It said "lean/ is not shipped; online tools reach the repository".
  SUPERSEDED: package.json `files` now ships lean/axioms.json, lean/leads.json and other lean json, and the hosted
  edge has no filesystem at all (EDGE_ABSENT, src/mcp-http.ts:164). It reads qpu storage.
- **uuidna-os-provenance-boundary (2026-08-15).** It said "uuidnaOS is provenance, NEVER execution". SUPERSEDED: the
  owner overturned it on 2026-08-24 (a real execution port, authorised and not started) and corrected it again on
  2026-09-01 ("this is not true. all is executable in uuidnaOS!!!"). uuidna_exec is the Layer 1 applets and uuidna_run
  Layer 2 (CONTRIBUTING.md:43). What stays true: it does not execute Alpine ELF binaries or port a foreign runtime,
  src/os and src/drivers are the named non-determinism boundary, and nothing licenses Math.*/Date/RNG in the core.
  src/os/alpine.ts is now the src/os/alpine/ directory.
- **concurrent-session-hazard.md fragment (2026-09-07).** The lean-heartbeats patch coordination is over. The blocker
  it waited on was fixed in 06fb0461b, and its syncHeartbeats orchestrator never landed (0 matches in src/). Only its
  witness-semantics paragraph is durable (§ Verification).
- **uuidna-deploy-cloudflare, body of 2026-08-22.** "Local only, no git integration", then "the render phase OOMs at
  5260 pages". SUPERSEDED by its own 2026-09-02 correction (three paths) and by lead 226 (2026-09-07: the bundle phase
  is the ceiling; 10,344 pages built at 8192 at concurrency 2).
- **harnesses-are-terminals, key `uuidna-test-run` (2026-09-13).** SUPERSEDED by bf2ca50166 the same day: "The run is
  not deposited under a free storage key: qpu is Payload-based and strict, with no overrides."
- **uuidna-guard-before-reconcile, rule 2.** "A new lean-*.ts needs a PRINCIPLE entry or coverage fails" was CORRECTED
  2026-08-21: PRINCIPLE aligns, it no longer gates.
- **package-audit-automation / quantum-predictive-automation.** "Guard step 4 / step 5" and the 106/104 counts are
  STALE: audit-packages runs at src/scripts/guard.ts:59, and predict-and-fill runs in the audit chain
  (package.json:137), not as a guard step.
- **refactor-crypto-research-packages.** "Not published to npm yet" is CONTRADICTED by the 2026-08-15 npm-publish
  receipt 94e6c9ba…; which is true is a lead.
- **uuidna-upstream-millennium.** "Restored as test/kat.test.mjs" is STALE: the path no longer exists, and the KATs
  run in src/crypto-primitives.test.ts.
- **captain-payment-128bit-unlock** "1456 sealed theorems occupy 3.4×10⁻⁷ of the handles" and
  **entanglement-four-frame-system** "src/mcp-entanglement-gate.ts": both STALE (the ledger holds 70,926 theorems; the
  file no longer exists).
- **zenodo-github-sync, "21787144 is ours".** CORRECTED 2026-09-04 to 22256708 (see zenodo-proof-of-work).
- **MEMORY.md index lines that contradicted their notes (2026-09-14 reading).** os-provenance ("never execution");
  prior-art ("24/24 DEFENDED by 262 DOIs"); guard-before-reconcile (PRINCIPLE gates); package-audit / predictive
  ("guard step 4/5"). The deploy line (lead 226) was newer than its note's body. The index also missed the
  concurrent-session-hazard.md fragment.
- **The queue's closed count (2026-08-16 → 08-24).** 58 entries closed from 2026-08-16 to 08-23; the 2026-08-20 wave
  closed 18, 27, 32, 36, 36b, 39-edge, 40, 42–52, 54, 65, 67; 2026-08-22 closed 0/hexbit-slit, 68, 72, 5/the-tree
  and the v0.2.8 release (npm 0.2.8; Zenodo 22059773 + 22059774); 2026-08-23 closed 13, 90, 94, 95, 100, 91 (both),
  77, 79, 81/81b/81c and the negation wave; 2026-08-24 closed 92 (the symphony). All of it is recoverable from the
  git log. [uuidna-next-wave-queue.md:15-31]
- **Not migrated, by design: `uuidna-store.json` and `refresh-store.mjs`.** The first is a 2.6 MB derived imprint of
  every note, which decodes to everything above, including the withheld items; the second is its generator. The
  mechanism already lives in uuidna (uuidna_imprint / uuidna_read). Deleting them is the owner's act
  (owner-decisions.md).

## Owner decisions — only the owner can act on these

One line each. An agent may prepare everything around them, but the act itself needs the owner's credential,
dashboard session, licence or ruling. Source note in brackets.

### Credentials and secrets (set by the owner; never typed by an agent)

- Set `QPU_WRITE_TOKEN` in the shell that runs test-plan and release; without it the run evidence prints UNSENT. [harnesses-are-terminals; src/scripts/device-readings.ts:154]
- Provision `UUIDNA_PROOF_KEY` on the hosts that should mint signed proof-cache entries. [queue 4]
- CI deploy: add `CLOUDFLARE_API_TOKEN` and the account id ([withheld: Cloudflare account id]) as repo secrets and restore a wrangler step, or seal hand-shipping (`npm run ship`) as the policy. Partly superseded: ship-build now refuses in the container. [queue 0b; uuidna-deploy-cloudflare]
- Register PSG EOOD in EU Login, then register a PIC on the EC Funding & Tenders Portal. This is the Horizon Europe route. [psg-legal-entity]

### Dashboard toggles (logged-in acts)

- Turn off the git-connected Cloudflare Workers Build. It now fails fast by design, but no in-repo change can stop it firing. [uuidna-deploy-cloudflare; queue lead 108]
- Turn on the Zenodo GitHub toggle for the lean and unreal repositories at zenodo.org/account/settings/github. [zenodo-github-sync]
- Push branch `zenodo-orcid` (ccf4578029), then dispatch `zenodo-orcid.yml` with apply=false, then apply=true, to backfill ORCID on 32 records. The owner decided yes on 2026-09-12. [zenodo-github-sync]
- Untangle Zenodo concept 21787143, which chains three distinct works (21787144 Clay proofs, 21819217 ℤ/9 Vortex, 22256708 uuidna). [zenodo-proof-of-work]

### Licences and grants

- NLnet NGI Zero: set the licence scope of funded deliverables (CC-BY / OSI) apart from the CC-BY-NC-ND corpus, and submit before 2026-11-03 12:00 CEST. [funding-leads; src/funding.ts:60]
- Harmonic Lean-formalization grant: the application is open now (PI award). [funding-leads]
- AI for Math Fund: watch for the next round (the 2026 round closed 2026-04-10). Sovereign Tech Fellowship: revisit early 2027. [funding-leads]
- Worker licensing: choose between the LICENSED hostname allowlist and the key-gated grantAt/verifyGrant pair. Under the no-hand-lists law, derive access control and never delete it. [queue 3]

### Policy rulings

- ℤ/9 table dedupe (mul9_a_b vs z9mul_a_b, 64 sealed theorems). The recommendation is keep both: removing them re-addresses published citations and DOI'd records. [queue 1]
- Ten network-only tools at the edge: what the hosted read-only surface should serve, and its bill. [queue 2]
- Signed proof cache policy flip: let the audit's prove step trust valid signed entries and re-prove only moved wings. This changes the semantics of `npm run audit`. [queue 4]
- Push door: `court --proven` (src/quantum/os/court/index.ts) admits on coverage alone and never reads the receipt's verified arms (recorded 2026-09-13). [queue tail]
- Where the qpu release procedure is written down inside the qpu repository (README release section or CONTRIBUTING.md). [qpu-compat-learning-boot]

### After this migration lands

- Delete the external store at the owner's former external memory store (outside the repository). That includes `uuidna-store.json`, which holds a decodable copy of every note including the withheld items, and `refresh-store.mjs`, its generator. Nothing was deleted by the drafting agent.

### Recorded in the queue as owner decisions (28; each is also a lead in leads.json)

As the queue recorded them. Items that repeat the lists above, or that the git log shows settled, are marked.

- NASA ADS (api.adsabs.harvard.edu, bearer token) and CORE (registered key) are the right keyed doors for the AAS corpus and are both declared absent pending a decision on whether this tree holds any research-API secret. [uuidna-next-wave-queue.md:1929 (lead 108), 2026-09-02]
- A Perplexity page (perplexity.ai/page/two-new-experiments-confirm-ei-…) returns 403 to uuidna_net_read and to direct fetch, so its two reported experiments are UNREAD here. [uuidna-next-wave-queue.md:2425 (lead 145), 2026-09-02]
- **SAME AS the dashboard toggle above.** An attached Cloudflare Workers Build now goes red fast because ship-build refuses, and turning the git connection off is a dashboard action that no repo change can perform. [uuidna-next-wave-queue.md:2511 (lead 108), 2026-09-03]
- The six @uuidna/* workspace packages are structurally ready but 404 on the npm registry (never published), and the tarball was cut from 7.1 MB to 5.0 MB packed (2124 → 1484 files) by excluding the .uuidna-books cache and compiled tests, held by publish-shape.test.ts. [uuidna-next-wave-queue.md:2554 (unnumbered: npm install measured), 2026-09-04]
- The Zenodo mint runs only in .github/workflows/publish.yml job zenodo on a release (zenodo-deposit.ts refuses local deposits and no token is in the tree), and mint-gate passes 10/10 over 116 monographs and 2531 propositions. [uuidna-next-wave-queue.md:2595 (captain decides: the mint), 2026-09-04]
- **SAME AS the concept-chain item above.** Concept DOI 10.5281/zenodo.21787143 holds three distinct works, and untangling the chain is a Zenodo-side act. [uuidna-next-wave-queue.md:2596 (captain decides: the concept chain), 2026-09-04]
- **SAME AS the NLnet licence item above.** CC-BY-NC-ND fails the FSF/OSI test twice (NC, ND) for NLnet, and the drafts route around it with separate CC-BY-4.0/Apache-2.0 deliverables that cite the corpus, with 60 days from 2026-09-04. [uuidna-next-wave-queue.md:2597 (captain decides: the licence), 2026-09-04]
- The Clay seal cites Zenodo version 21781603 while 22127378 and 22256707 exist, reported but not advanced because a version citation is a choice. [uuidna-next-wave-queue.md:2610 (unnumbered: Clay seal version), 2026-09-05]
- Under the CC-BY-NC-ND-4.0 LICENSE, org-fit's donate-source route is refused against every host before the network is touched, and only three routes survive: file-findings, author-fresh and interop-demo. [uuidna-next-wave-queue.md:2920 (LEADS 150–154 section: THE GATE IS OURS), 2026-09-05]
- **NOT OWNER-ONLY: any session may re-run tsgo; kept because the queue flagged it.** TypeScript 7 real-world validation: on this tree tsc 5.9.3 --noEmit takes 10.08s and @typescript/native-preview 7.0.0-dev.20260707.2 takes 1.06s over 1279 files, both with 0 errors; tsgo should be re-run on each dev release and every divergence reduced to a minimal repro for one disclosed issue. [uuidna-next-wave-queue.md:2938 (lead 150, TypeScript 7), 2026-09-05]
- The branch was held on three reds that belong to neither session in contact: src/ratchet-record.ts:4 (dead key mcp_wire_rate_..._32186), ratchet-record.ts:26 (bare CANNOT) and the dormant src/scripts/org-fit.ts, in a third session's committed file. [uuidna-next-wave-queue.md:3082 (lead 150, THE BRANCH IS HELD), 2026-09-05]
- 17 of the tautological conjuncts are x % 9 = x with x < 9, spread over 11 wings (Exploits, Topography, Production, Molecular, Editing, Photography, Spectrum, Colour, Anthem, Universe, Doctrine), e.g. inside fold_prototype_pollution. [uuidna-next-wave-queue.md:3522 (lead 152 JUDGED, digital-root idiom), 2026-09-05]
- Neither session cut the v0.3.1 tag, because each held a captain's instruction pointing the other way and a peer can neither authorise, de-authorise, nor relay. [uuidna-next-wave-queue.md:3502 (RELEASE v0.3.1 HELD BY RULING), 2026-09-05]
- gate-all's deploy-fresh arm found production 233 minutes stale against a 90-minute grace, and clearing it needs npm run ship, a live Cloudflare deploy. [uuidna-next-wave-queue.md:3513 (v0.3.1, deploy-fresh REMAINS), 2026-09-05]
- v0.3.1 was cut and then aborted with nothing published (tag 0 local / 0 remote, npm latest 0.3.0, no GitHub release), and the captain ruled that the vacuous theorems be fixed before any tag, because a permanent DOI over a corpus is a different object from a tag. [uuidna-next-wave-queue.md:3550 (v0.3.1 cut and aborted), 2026-09-05]
- Seed payload (lead 126) grew from 61 MB recorded to 73,730,100 bytes across 737 tracked files (payload-sync.json 5.2 MB, payload-sync-blocks.json 4.2 MB, page.json up to 1.7 MB), which is derived data under src/seeds/** merge=derived, tracked because the Workers edge has no filesystem. [uuidna-next-wave-queue.md:3575 (leads re-measured, lead 126), 2026-09-05]
- **ALREADY DECIDED per the queue: commit the 54 sources on the peers' behalf.** The derived layer (89 drain paths, 5532 files) was not recomputable from any commit, because 17 (later 54) generator sources were other sessions' uncommitted in-flight work, so precede rightly refused the drain. [uuidna-next-wave-queue.md:4493 (lead 231), 2026-09-07]
- Does ve_faces_are_handle_hexbit_coins (VE_FACES = HANDLE_HEXBITS + HEXBIT_BITS + COINS, 14 = 8 + 4 + 2) name a structure or a coincidence? The control finds such three-term sums below chance (tree 16.87% vs surrogates 28.79%, 0.59x), and three other live triples also sum to 14. [uuidna-next-wave-queue.md:4958 (lead 243), 2026-09-07]
- **SAME AS the Zenodo toggle above.** Flip the Zenodo GitHub toggle for the lean and unreal repositories. [uuidna-next-wave-queue.md:4986 (Zenodo toggle lean/unreal), 2026-09-13]
- Configure npm trusted publishers for the lean and unreal packages. [uuidna-next-wave-queue.md:4986 (npm trusted publishers lean/unreal), 2026-09-13]
- **SAME AS the ORCID backfill above.** 32 old Zenodo records still lack ORCID. [uuidna-next-wave-queue.md:4986 (Zenodo ORCID gap), 2026-09-13]
- handleOf takes 32 bits (first eight hex nibbles), so enumeration_hex4_27c3 (HexSpan3.lean) and enumeration_hex4_c5ff (HexSpan13.lean) collide on handle 33464ae4 (70,905 addresses to 70,904 handles, 0.59 expected pairs); src/skill-surface.test.ts:143 demands what 32 bits cannot grant, and buildHandleRecords() throws on a collision inside generate.ts, a latent hard-fail. [uuidna-next-wave-queue.md:4988 (handle collision), 2026-09-13]
- **SAME AS the push-door ruling above.** court --proven (src/quantum/os/court/index.ts ~line 327) checks only v.state !== 'covered' and never reads the receipt's verified arms, so a guard,build receipt is admitted as 'proven green'; either require tests in verified, or rename the door's words to 'covered since the receipt'. [uuidna-next-wave-queue.md:5006 (push door admits on coverage), 2026-09-13]
- **DECIDED AND LANDED: Git LFS, commit 420f151bc5 (2026-09-13).** Main was unpushable from 2026-09-07 because src/seeds/payload-sync.json was committed at 108.24 MB in de3fb29188, over GitHub's hard 100 MB per-file limit (GH001). [uuidna-next-wave-queue.md:5026 (100 MB blocker), 2026-09-13 21:30]
- quintessay's public /api/essays counts the whole 1,423,374-row table per request (timed out at 20 s; depth=0 took 3.6 s) and exposes bodyKey/bodyHash. [uuidna-next-wave-queue.md:5036 (quintessay's own finding), 2026-09-13 22:45]
- **SAME AS the QPU_WRITE_TOKEN item above.** A release on the Mac needs the QPU_WRITE_TOKEN value in its own environment, or its evidence records UNSENT: the qpu Worker binds the secret (fail-closed writes, index.ts:6149), a Cloudflare secret cannot be read back, and nowhere on the Mac names it. [uuidna-next-wave-queue.md:5047 (QPU_WRITE_TOKEN), 2026-09-13 23:55]
- qpu repo holds an untracked scripts/purge-slogans.mjs that is not this session's. [uuidna-next-wave-queue.md:5048 (unowned qpu file), 2026-09-14 00:05]
- Bind a Cloudflare API token with Custom Hostnames scope once as a Worker secret on uuidna-payload, for the tenant custom-hostname hook. [uuidna-next-wave-queue.md:5053 (custom hostnames credential), 2026-09-14 01:00]

## Session findings, 2026-09-14 — what to add, and where

Re-read at HEAD 73db3e1764 on 2026-09-15: the fixes in findings 6 and 7 are now committed (src/scripts/develop.ts
imports writerPidsProbe and ancestorsOf; src/treason.ts requires `':= by ' + t.tactic`; src/refusal-trials.ts reads
`sealedKeys()`), so their "not committed" lines describe the tree as it stood at 59e5fc6aa5.

Each finding says whether it enters as a **LEAD** (through the trial door into lean/leads.json) or a **LESSON**
(.claude/lessons.md). The evidence line says what was read to check it, and what could not be checked.
Every LEAD below is also a row in leads.json with `source: "session 2026-09-14"`.

### 1. The prior-art sweep is unreliable — LEAD

The sweep's "CLAIMED 0 · PRIOR-ART 24 · 262 DOIs" was never measured. Its DOIs are keyword matches, and two of the
12 Zenodo "prior art" records are the owner's own (ZeroPoint Node, Rouschev, 2026-09-03/07). The journal hits have
no bearing on the claims: children's trust, endoscopy, a springback test filed under "ring ℤ/9". The cure owed is to
exclude the owner's records through one owner declaration, judge relevance on the claim's content rather than the
subject's words, and re-run `npm run x -- claim-unclaimed`. Real prior publication does exist for some subjects,
for example division by zero set to 0 (Suppes 1957; Anderson & Bergstra 2021).
Evidence: memory note prior-art-refuses-the-claim.md (correction of 2026-09-14). The three-way verdict that stays
true is `verdictFor`, src/scripts/claim-unclaimed.ts:65.
LESSON as well: a retrieval score means nothing until you know where the query came from and whose records the
corpus holds (see lessons § Verification, "circular query").

### 2. The citation gate reads a primed Lean name (name') as a different citation — LEAD

Measured today against dist at HEAD 59e5fc6aa5: the ledger holds **0 primed keys**, and slimGate's bare
`theorem <token>` parse **stops at the apostrophe**.
- `slimGate("proven in theorem two_coins'")` returns VERIFIED, citing `two_coins`. A primed lemma is verified
  against its unprimed stem, which is a different theorem.
- `slimGate("proven in theorem nonexistent_xyz'")` returns UNVERIFIED with fabricated `["nonexistent_xyz"]`. A new
  primed declaration whose stem is not sealed is drained as a fabricated citation.

So a primed name can be over-verified (when its stem is sealed) or drained (when it is not), and both break the
Lean stream the purge law protects. The trial must decide the key grammar: whether `'` is part of a key token in
slimGate, sign, and the realtime legal audit's citation reading.
Not checked: which of those surfaces raised today's report. The legal-audit source has no local citation parser, so
it delegates to the same gate.

### 3. The physical/quantum claims audit — LEAD

dist/evidence/physical-claims-2026-09-14.md (6,065 bytes) records 10 same-passage contradictions, 11 cross-surface
pairs, and 7 physical claims with no boundary at all. Examples: docs/qpu.md calls qpu.uuidna.com "the running
superconducting-qubit circuit" while its own line 35 lists CPU/GPU/RAM, and src/drivers/quantum/index.ts pairs
"PROVE HARDWARE QUANTUM" with "not a superconducting or trapped-ion QPU". The owner's ruling the same day: nothing is
purged unless it blocks a natural Lean stream, so this is evidence. The cure the queue names is one fact per subject,
with the generators deriving the rest, plus a finder controlled in both directions.
**The file is under dist/, which is gitignored, so today it exists only on this machine.** Under "no memories
outside project", it must reach a tracked or served home: the uuidna_evidence deposit door (qpu storage), or a
tracked non-published path. Where it lands is the lead's first owed act.

### 4. The qpu contradictions audit — LEAD (repository: qpu)

dist/evidence/qpu-contradictions-2026-09-14.md (8,381 bytes) records 52 contradictions in the sibling qpu repository.
33 are in the core (10 high, 14 medium, 9 low) and 19 elsewhere (6 high, 8 medium, 5 low). Each names the side the
code supports. Examples: index.ts:3626 says both "Superconducting qubits" and "a state-vector simulator … no
superconducting qubits", and index.ts:2589 has `kind: 'hardware'`, which holds only when device === 'simulator'.
Disposition, the owner's, the same day: evidence, not a purge list. The same homing problem as finding 3 applies,
since the file sits under uuidna's gitignored dist/.

### 5. The involution waves: 3 sealed on 14 faces, ef58b583 refused by its witness — LEAD + LESSON

Measured today: e92de628, b13fd37a and 2d552f1f each appear 15 times in lean/witness-seals.json (the seal and its
VE_FACES = 14 signatures). ef58b583, the fourth "faithful" involution, appears 0 times. Its witness refused it
(scratchpad rewitness-0…6 hold the attempts). The six reopened involutions (081dcc07, 99582e47, 83b7cc65, 90c4f258,
8609c55d, ca852b53) also appear 0 times in witness-seals.json. None of the ten handles appears in lean/leads.json yet.
- LEAD: ef58b583 stays reopened until its own `involution_ef58b583 : ¬ lead_ef58b583` passes all 14 witnesses.
  The six stay reopened. The lean-involutions.ts generator (one wing per involution, from the source objects, then
  lean-ledger and witness-seals.json) is still owed, and the queue tail records it.
- LESSON: the 2×7 witness seal said no to one of four candidates the author judged faithful. That is the seal
  demonstrating it can fail, the property every instrument in this tree must show before a pass is trusted.

### 6. develop's quiescence probe counted its own parent landing — LESSON (fixed)

land.js is a tree writer and develop runs as its child. The old probe (`grepProbe`) counted every writer, so it read
the tree as busy on every round and spent its whole 30 × 10 s wait before a single step. That was most of a
34-minute heal, and it happened six rounds in one landing. The fix, in the working tree:
src/scripts/develop.ts now uses `writerPidsProbe()` and drops the pids in `ancestorsOf(process.pid)`, so only other
writers are waited for.
Evidence: `git diff HEAD -- src/scripts/develop.ts` (14 lines). **Not committed at HEAD 59e5fc6aa5.** The fix is in
the tree the running landing holds.
Lesson: a "someone else is busy" probe must exclude its own ancestry. The same family as a pgrep pattern that matches
the checking shell's own command line (lessons § Shared tree).

### 7. The trial gate and treason typed `by decide` — LESSON (fixed)

treason's seal-integrity check required `':= by decide'` in every sealed row's lean, so it refused the court's first
involutions. Those proofs are kernel-accepted and axiom-free, but they run exact/intro/unfold. The fix, in the working
tree: src/treason.ts now requires `':= by ' + t.tactic`, the proof the sealed row itself records, and still refuses a
lean that names another key. The same session's src/refusal-trials.ts diff (21 lines) moves witness picking onto
`sealedKeys()`, so the door signs at the edge without reading the ledger's rows.
Evidence: `git diff HEAD -- src/treason.ts src/refusal-trials.ts`. **Not committed at HEAD 59e5fc6aa5.**
Not located: a separate `by decide` literal in the trial gate. leads-gate.ts:155's message still says "cite the
`by decide` theorem that decides it", which is prose and not a check, and the trial should read it the same way.
Lesson: a gate that types one tactic is a hand list of one entry. Read the proof the row records, as the no-hand-lists
law asks.

## Practice recorded in the queue (285, by date)

Extracted from the former uuidna-next-wave-queue.md; each line names its queue line and lead.

- 2026-08-22 — An automated landing loop applies only taught cures and, on an untaught denial, stops and prints the exact GAP+FIX for a human instead of guessing. [uuidna-next-wave-queue.md:1098 (lead 95)]
- 2026-08-22 — Never pipe a gate through tail or grep in the invoking chain; it masks failures, so the gate speaks in full or not at all. [uuidna-next-wave-queue.md:1147 (lead 91)]
- 2026-08-22 — Every new surface states what it computes on request and what it stores, the stored part may only shrink, and a ceiling lift must name the real capability it adds. [uuidna-next-wave-queue.md:1159 (lead 90)]
- 2026-08-22 — An arithmetic analogy to physics (e.g. baryon asymmetry) must travel with its honest scope: the ratio stays with the kernel, the cosmology with the physicists. [uuidna-next-wave-queue.md:1177 (lead 89)]
- 2026-08-22 — A live census can fall as well as rise, so a milestone is sealed as a receipted first crossing, never as a standing claim; numerology is a lead, arithmetic is a law. [uuidna-next-wave-queue.md:1216 (lead 86)]
- 2026-08-22 — A tool advertised in the hosted Workers subset must be exercised there; an audit-the-audit test calling every hosted tool once keeps Node-only reaches from shipping. [uuidna-next-wave-queue.md:1244 (lead 84)]
- 2026-08-22 — A finder that misses untracked generators is blind to a whole class; teach the finder the case with the same fix line rather than relying on cross-session messages to catch it. [uuidna-next-wave-queue.md:1624 (lead 78)]
- 2026-08-22 — Count-pinned tests should recompute the live value (or regenerate right before the test arm) rather than compare two files that move on different clocks; the turn is the unit of cost. [uuidna-next-wave-queue.md:1629 (lead 76)]
- 2026-08-22 — Seal the decidable table and state openly that any analytic bridge from it (e.g. Gauss-Bonnet from chi to curvature) leans on literature, not the kernel. [uuidna-next-wave-queue.md:1637 (lead 75)]
- 2026-08-22 — Before asserting a numeric bound, search the ledger for its law; a bound with no seal and no recomputation is stated as unverified or not at all. [uuidna-next-wave-queue.md:1646 (lead 74)]
- 2026-08-22 — Flag the proof class honestly: an irrationality claim cannot be closed by decide and must say it needs a rationality argument. [uuidna-next-wave-queue.md:1655 (lead 73)]
- 2026-08-23 — Local success does not prove the edge: a fetch+untar that works in Node can silently truncate within Worker CPU/memory limits, so the hosted surface needs its own test. [uuidna-next-wave-queue.md:221 (lead 128)]
- 2026-08-23 — A full-suite failure that passes standalone moments later points at shared dist/ being rebuilt by a neighbour, not at the test. [uuidna-next-wave-queue.md:264 (lead 121)]
- 2026-08-23 — A suppression is lawful only when the cut names itself; watchers must capture guard output to a file and print the failure lines, never pipe to /dev/null. [uuidna-next-wave-queue.md:280 (lead 120)]
- 2026-08-23 — No bypass on an unattributed red: attribution is the investigation, and a red blamed on a neighbour may be one's own colliding seal. [uuidna-next-wave-queue.md:305 (lead 119)]
- 2026-08-23 — A CI runner without a Lean kernel falsely refuses every candidate; the wave must void when the kernel is absent because only the kernel issues verdicts. [uuidna-next-wave-queue.md:325 (lead 118)]
- 2026-08-23 — A hand repeating the same five steps (statement, emitter fact, kernel, guard, gated commit) is the manual leak, and the gate that absorbs it is a runner. [uuidna-next-wave-queue.md:347 (lead 118)]
- 2026-08-23 — Manual work leaks in repeating patterns because habit is a cache nothing invalidates; fold the finder rather than retrain the hand. [uuidna-next-wave-queue.md:452 (lead 112)]
- 2026-08-23 — Piping guard into tail swallows its exit code; a commit landed on a red guard that way twice in one day. [uuidna-next-wave-queue.md:459 (lead 112)]
- 2026-08-23 — A test never compares against a pinned copy of a moving ledger value; it derives the value in-process, and only sequence-proof constants may be literal. [uuidna-next-wave-queue.md:580 (lead 104)]
- 2026-08-23 — A constant shadowing a derivable value is a bet; turn it into a zero-overhead function that computes it. [uuidna-next-wave-queue.md:812 (lead 105)]
- 2026-08-23 — Probe liveness by message or ps before declaring a process stale; a quiet walker was found running three test processes above 100% CPU. [uuidna-next-wave-queue.md:656 (lead 113)]
- 2026-08-23 — Timing ratios are measured-on-this-host and drift with hardware; never pin them, re-run both timers. [uuidna-next-wave-queue.md:702 (lead 111)]
- 2026-08-23 — Before writing a report, ask whether it is a function; if it recurs, build the tool and narrate one sentence around its receipt. [uuidna-next-wave-queue.md:840 (lead 98)]
- 2026-08-23 — A derived file has no merge, only a recomputation. [uuidna-next-wave-queue.md:822 (lead 99)]
- 2026-08-23 — Obey the capacity meter: wave cargo runs only above the floor. [uuidna-next-wave-queue.md:635 (lead 115)]
- 2026-08-23 — A gap is filled by a failing-then-green test whose controls can fail and whose numbers derive from sealed constants, not by prose. [uuidna-next-wave-queue.md:950 (lead 100)]
- 2026-08-23 — The ledger seals arithmetic divergences only; causal claims such as medical outcomes stay UNVERIFIED and go to the court. [uuidna-next-wave-queue.md:918 (lead 101)]
- 2026-08-23 — Name the gap rather than smoothing it (the sun-size table's ~3% gap stays stated). [uuidna-next-wave-queue.md:380 (lead 116)]
- 2026-08-23 — Frame adversarial testing as self-adversarial verification with structural boundaries (own seals only, bootOS sandbox, gate as referee, finders as the only output) rather than offensive vocabulary. [uuidna-next-wave-queue.md:1054 (lead 118)]
- 2026-08-23 — Until the credentials decision is made, autonomous development heals and holds (commits locally or emits the exact prompt) and never publishes. [uuidna-next-wave-queue.md:1071 (lead 97)]
- 2026-08-23 — A probe pair where one case must reject and one exposes a leak (cheese rejected, one-stem 'saved' verified) becomes a control-pair test, so a regression and a lexical ride are both caught by name. [uuidna-next-wave-queue.md:1415 (lead 86)]
- 2026-08-23 — Glyph compression carries identity, not content: the byte/token ratio pays only for content that recomputes from the shared tree, so a message pairs the chain with a plain-text TL;DR. [uuidna-next-wave-queue.md:1431 (lead 80)]
- 2026-08-23 — The announcement is the deposit (say and do in one motion), the arm is named before any retry, and the reconcile order is never bypassed for speed; fast means parallel and complete, not serial and skipping. [uuidna-next-wave-queue.md:1464 (lead 98)]
- 2026-08-23 — An audit that cannot fail is not an audit: a conduct chart shipped without controls was cured by adding a fabricated strike the record refutes, and an integer claim recalled rather than folded is downgraded. [uuidna-next-wave-queue.md:1464 (lead 98)]
- 2026-08-23 — Save manual work as reusable tools, and give an instrument pre-registered controls, each a way it must be able to fail. [uuidna-next-wave-queue.md:1693 (lead 79/transcript-audit)]
- 2026-08-23 — A long computation over a derived artifact must freeze its input (snapshot the dist) and measure its receipt figures rather than state them; two independent walkers cross-check each other. [uuidna-next-wave-queue.md:1744 (lead 129b)]
- 2026-08-23 — The model's place is the frontier only, where the next involution is discovered and deposited; everything else runs through the conveyor and the kernel. [uuidna-next-wave-queue.md:1734 (THE BREATH, unnumbered paragraph)]
- 2026-08-23 — Only generator-sealed reports are accepted; host timings are a named non-deterministic boundary, re-measured and never pinned, and the lawful claim is architectural advantage, not physics. [uuidna-next-wave-queue.md:1772 (lead 132)]
- 2026-08-23 — A convention never collides with harmonics when its drift is named and priced; seal the drift and its harmonisation together, integer-exact. [uuidna-next-wave-queue.md:1802 (lead 130)]
- 2026-08-23 — A pre-deploy citation of an unshipped seal is correctly refused by the live gate; a post-deploy VERIFIED on a citation existing only in the new ledger proves the deploy shipped it. [uuidna-next-wave-queue.md:1802 (lead 130)]
- 2026-08-24 — Never write source with heredocs: cat <<EOF put a raw 0x01 byte into .join('  '), the file compiled and passed tests, and grep classified it as binary so every finder reported it clean unread. [uuidna-next-wave-queue.md:90 (lead 134)]
- 2026-08-24 — Verify the artifact that ships: curing the working tree without staging left the unreadable blob in the index, caught only by re-measuring the staged blob with git show :path. [uuidna-next-wave-queue.md:93 (lead 134)]
- 2026-08-24 — Test a proposed relation before building on it: two of three theorem-to-package relations failed outright (ordinary English words, and 'rsa' matching inside 'universal'). [uuidna-next-wave-queue.md:77 (lead 134)]
- 2026-08-24 — A served tool should judge against the haystack the edge can reproduce (the shipped ledger), even when it is narrower than the unshipped Lean sources. [uuidna-next-wave-queue.md:87 (lead 134)]
- 2026-08-24 — New scripts belong to the dispatcher (scripts discovered by run.ts), not as package.json wrappers. [uuidna-next-wave-queue.md:103 (lead 133)]
- 2026-08-24 — A served recomputable MCP call never fetches; freshness is exiled to the boundary. [uuidna-next-wave-queue.md:102 (lead 133)]
- 2026-08-24 — Reading a browser global such as location.hostname in a Vue setup() crashes the static VitePress build; guard it with typeof. [uuidna-next-wave-queue.md:110 (lead 133)]
- 2026-08-24 — On the shared tree, hand-driven reconciles lose to churn; npm run wave (lock-patient, named retries) lands in one call what repeated hand reconciles cannot. [uuidna-next-wave-queue.md:143 (lead 132)]
- 2026-08-24 — MCP tool descriptions have a per-tool 1200-byte cap; long essays belong in detail. [uuidna-next-wave-queue.md:142 (lead 132)]
- 2026-08-24 — When a candidate seal's content is already sealed by an existing theorem, cite that theorem instead of minting a duplicate. [uuidna-next-wave-queue.md:150 (lead 132)]
- 2026-08-24 — A stuck-detector must judge work, not elapsed time: check for live child processes and log movement before ending a lane holder. [uuidna-next-wave-queue.md:238 (lead 123)]
- 2026-08-24 — Hand-typed queue lead numbers collide; identifiers should be derived, not typed. [uuidna-next-wave-queue.md:259 (lead 122)]
- 2026-08-24 — Automate every act whose correctness is decidable (proof, derivation, delivery of what was proven) and keep on a hand every act whose correctness is a judgment (what to claim, teach, ship or yield). [uuidna-next-wave-queue.md:1490 (lead 134)]
- 2026-08-24 — An honest null from a working instrument locates where the gap actually lives; keep the instrument as a ratchet and cure a session-granularity gap structurally. [uuidna-next-wave-queue.md:1506 (lead 135)]
- 2026-08-24 — Before diagnosing a conflict of laws from two instances, test the satisfying case; a refuted claim stays visible in the ledger with its original framing. [uuidna-next-wave-queue.md:1518 (lead 101)]
- 2026-08-24 — A slow build step is one still re-deriving what a receipt already proves, and a timing report with an anonymous row is a census with a stranger. [uuidna-next-wave-queue.md:1754 (lead 132b)]
- 2026-08-24 — Lock reentrancy must mean child, not shared ancestor; test with a true stranger, since a control that picks pid 1 exposes the hole. [uuidna-next-wave-queue.md:1854 (lead 130)]
- 2026-08-24 — An autonomous loop's stop conditions must be findings that page a human, never silence, and it may land only what the kernel sealed and the gate passed. [uuidna-next-wave-queue.md:1865 (lead 131)]
- 2026-08-24 — A defect whose only trigger is a quiet lane stays invisible in proportion to how busy the system is; contention can both mask and prevent a hazard. [uuidna-next-wave-queue.md:1887 (lead 132)]
- 2026-08-24 — An empirical claim about how defects hide is deposited as prose; sealing it by decide would be a costume. [uuidna-next-wave-queue.md:1887 (lead 132)]
- 2026-08-24 — A drain or reconcile commit cannot answer for a source file it did not generate, so it must not stage one silently. [uuidna-next-wave-queue.md:1900 (lead 133)]
- 2026-08-24 — A bare push runs the gate without the lock and verifies a tree that no longer exists by the time it finishes; take the lane first and measure a frozen tree. [uuidna-next-wave-queue.md:1907 (lead 134)]
- 2026-08-24 — Beware a proxy standing in for the quantity it should measure (elapsed time for stuck, matching value for derived, wall-clock for work, import for run); the cure is to ask the thing itself. [uuidna-next-wave-queue.md:1915 (THE DAY'S RECURRING SHAPE)]
- 2026-09-02 — Another session can sweep your uncommitted files into its own commits mid-turn, so nothing should be pushed on the assumption that the tree is yours alone. [uuidna-next-wave-queue.md:1948 (unnumbered: concurrency)]
- 2026-09-02 — An MCP tool description's first sentence is all a client shows, so write it as the whole contract. [uuidna-next-wave-queue.md:1967 (lead 116)]
- 2026-09-02 — Growing a hand list toward a live registry is the wrong cure; name only what you have a reason to name and resolve the rest live. [uuidna-next-wave-queue.md:1963 (lead 115)]
- 2026-09-02 — Name the obvious suspect that is not worth taking (such as incremental tsc), so it cannot absorb blame owed elsewhere. [uuidna-next-wave-queue.md:2002 (lead 119)]
- 2026-09-02 — A refused correspondence must be recorded with its reason, because a refusal nobody can see is indistinguishable from never having noticed. [uuidna-next-wave-queue.md:2022 (lead 122)]
- 2026-09-02 — Seal the relation and refuse the stopwatch: physical readings (T1, T2, fidelities) are not sealable, while counts and correlation structure are. [uuidna-next-wave-queue.md:2034 (unnumbered: metric rule)]
- 2026-09-02 — The knob named in the error message (the heap limit) was not the quantity that mattered, so measure what the process actually holds before turning the named lever. [uuidna-next-wave-queue.md:2127 (unnumbered: heap correction)]
- 2026-09-02 — Agreeing with an audit's right conclusion for a wrong reason makes the conclusion unfalsifiable, so record REFINED rather than CONFIRMED. [uuidna-next-wave-queue.md:2082 (lead 128)]
- 2026-09-02 — When a finder reports drift from differing spellings, normalise both sides rather than copy the target's spelling into the check, or the guard becomes self-satisfying. [uuidna-next-wave-queue.md:2093 (unnumbered: leanNormalise)]
- 2026-09-02 — When a minter is hardened, every caller must follow, and the verified list must be parsed from the runner's output, never typed as a literal. [uuidna-next-wave-queue.md:2133 (lead 130)]
- 2026-09-02 — A failure report must print the finder's named GAP/FIX lines, not a tail slice that shows the gate's closing ceremony. [uuidna-next-wave-queue.md:2171 (lead 131)]
- 2026-09-02 — A finder that scans for a forbidden string will hit its own mention of that string (use/mention collision), so scan code lines only or assemble the needle from parts. [uuidna-next-wave-queue.md:2181 (unnumbered: use/mention)]
- 2026-09-02 — Tests must not assert other people's rate limits or latency; assert that every door accounts for itself and that this tree's own invariants hold. [uuidna-next-wave-queue.md:2252 (lead 135)]
- 2026-09-02 — Ask what a number actually counts: table rows against theorem files, prose-points-at against prose-is, inputs against rule, and (src) against named files were all measures answering a different question than their names. [uuidna-next-wave-queue.md:2429 (unnumbered: recurring shape)]
- 2026-09-02 — Any printer that filters log lines with a regex must anchor it to the line start, or it prints passing test titles that mention GAP/FIX. [uuidna-next-wave-queue.md:2245 (lead 134b)]
- 2026-09-02 — Do not claim an intermittent failure closed until an instrument names its cause; instrument the next occurrence instead of guessing. [uuidna-next-wave-queue.md:2259 (unnumbered: round-1 denial)]
- 2026-09-02 — set_option maxRecDepth is refused in this tree, so factor any enumerated domain over about 200 into a product (16×16, 36×10, 4×100) to stay within default depth. [uuidna-next-wave-queue.md:2276 (lead 136)]
- 2026-09-02 — The independent falsifier evaluator is a character gate, so statements must inline their data or use taught names (nth, lxor, Nat.gcd, eraseDups) rather than wing-local definitions. [uuidna-next-wave-queue.md:2282 (lead 136)]
- 2026-09-02 — Draft enumeration statements in scratch .lean files and probe them against both the kernel and evaluable() before touching an emitter, so a batch becomes one wave instead of rounds of discovery. [uuidna-next-wave-queue.md:2340 (lead 139)]
- 2026-09-02 — A gate that knows the finding but prints something coarser (such as '(src)') withholds the answer, so the half with a filesystem should name the files. [uuidna-next-wave-queue.md:2312 (lead 138)]
- 2026-09-02 — Ask what the tree already has before using the slow path: lean-one proves one wing in 0.087s where npm run lean takes ~5 minutes. [uuidna-next-wave-queue.md:2360 (lead 141)]
- 2026-09-02 — A reader that recognises only one comment style manufactures gaps instead of finding them. [uuidna-next-wave-queue.md:2394 (lead 142)]
- 2026-09-02 — Importing a CLI entry point runs it, so test a CLI by executing it (execFileSync). [uuidna-next-wave-queue.md:2396 (lead 142)]
- 2026-09-02 — A cache keyed on its inputs but not on its rule prints the same line for the healthy case and the never-re-ran case, so fold the function's own bytes into the key. [uuidna-next-wave-queue.md:2420 (lead 144)]
- 2026-09-02 — A page that cannot be fetched is UNREAD, which is not empty. [uuidna-next-wave-queue.md:2425 (lead 145)]
- 2026-09-02 — Regex rewriting of English prose is triage, not rewriting: whether a sentence survived is not a pattern in the line, so a person accepts each line. [uuidna-next-wave-queue.md:2450 (lead 146)]
- 2026-09-02 — A shrink-only measure with a permanent carve-out (a provenance exemption or a dormant-list entry) is a hiding place, not a shrink-only measure. [uuidna-next-wave-queue.md:2460 (lead 146)]
- 2026-09-04 — A manifest built from the tracked set misses untracked files, so stage first, then mint, then stage the receipt, then commit; the order was the defect. [uuidna-next-wave-queue.md:2528 (lead 140)]
- 2026-09-04 — Check the protocol measure, name a checkable arbiter, have the gate ask the arbiter without re-typing the answer, then ratchet, then perturb-test. [uuidna-next-wave-queue.md:2563 (unnumbered: six-session wave)]
- 2026-09-04 — Structure checked is not compilation checked; state which one was verified when no engine is installed. [uuidna-next-wave-queue.md:2535 (lead 109)]
- 2026-09-05 — A concept DOI has no OAI record, so an OAI absence for it is UNREAD, never absent; resolve by HTTP. [uuidna-next-wave-queue.md:2611 (unnumbered: concept DOI OAI)]
- 2026-09-05 — A refusal with a false reason is worse than an unported applet, because it closes the question with something nobody re-checks. [uuidna-next-wave-queue.md:2623 (unnumbered: false refusals)]
- 2026-09-05 — The name is not the fact; the package is: classify commands by the catalogue's provides column, not by their names. [uuidna-next-wave-queue.md:2624 (unnumbered: families from name)]
- 2026-09-05 — Derive constants from the specification's own sentence rather than transcribing literals, each of which is a chance at an unfindable digit error. [uuidna-next-wave-queue.md:2625 (unnumbered: derived SHA-2 constants)]
- 2026-09-05 — Declare probe inputs upstream: a downstream that records toUuid(sample) without the sample produces false mismatches when reconstructed. [uuidna-next-wave-queue.md:2629 (lead 148)]
- 2026-09-05 — Over-claims and under-claims are one signed measure whose unique fixed point is the honest statement, not two finders. [uuidna-next-wave-queue.md:2639 (unnumbered: claim balance)]
- 2026-09-05 — Rules fail to recognise notations for the very thing they look for (∀ binders, List.range, Fin N), so probe each rule with every notation of its target. [uuidna-next-wave-queue.md:2643 (unnumbered: four blind spots)]
- 2026-09-05 — Literal counts in theorems and tests go wrong the moment a wing is sealed, and N = N is a tautology wearing a finding's name, so derive the figures. [uuidna-next-wave-queue.md:2645 (unnumbered: frozen counts)]
- 2026-09-05 — An index-reversing involution can only confirm a symmetry its author arranged; discovery needs a matcher over an unordered corpus with decoys and deletion controls. [uuidna-next-wave-queue.md:2715 (lead 149)]
- 2026-09-05 — Each fold can introduce the next defect (the negation fix over-reached), and only a control catches it, not reading. [uuidna-next-wave-queue.md:2725 (lead 149)]
- 2026-09-05 — A zero from an instrument that cannot by construction report the thing (a cross-system matcher reporting self-matches) is a fact about the instrument, not the systems. [uuidna-next-wave-queue.md:2734 (lead 149)]
- 2026-09-05 — Absence is not a pole: an involution cannot pair a thing with a hole. [uuidna-next-wave-queue.md:2743 (lead 149)]
- 2026-09-05 — A hedge offered instead of a measurement is under-reach; measure the generalisation claim and state the bold result it earns. [uuidna-next-wave-queue.md:2755 (lead 149)]
- 2026-09-05 — A refusal that is not final lets traversal order settle the ambiguity it exists to prevent. [uuidna-next-wave-queue.md:2784 (lead 149)]
- 2026-09-05 — Redundant witnesses let an instrument report degradation (a witness count falling) instead of collapsing, so make the witness count a check. [uuidna-next-wave-queue.md:2788 (lead 149)]
- 2026-09-05 — Proving green and minting the receipt are two acts; mint after the last edit and before the commit, and expect the mint itself to move a tracked file. [uuidna-next-wave-queue.md:2802 (lead 140)]
- 2026-09-05 — Test your own instructions to others on the data before sending: the rule about agreements and pairs would have read a guaranteed zero as disagreement. [uuidna-next-wave-queue.md:2827 (lead 149b)]
- 2026-09-05 — A law about a measure is not a structure in the population; synthetic corpora that populate every value can show a pairing the real ledger lacks. [uuidna-next-wave-queue.md:2853 (lead 149b)]
- 2026-09-05 — From one item's view a crowd and a tie look identical, so classify refusals in a second pass over the whole set. [uuidna-next-wave-queue.md:2874 (lead 149b)]
- 2026-09-05 — The gate receipt is tree-wide, so a shared tree serialises pushes; never mint over another session's in-flight work, wait for it to land. [uuidna-next-wave-queue.md:2888 (unnumbered: tree-wide receipt)]
- 2026-09-05 — The receipt serialises pushes and the shared branch socialises them, so verify a landing on origin independently rather than on report. [uuidna-next-wave-queue.md:2896 (unnumbered: landed on origin)]
- 2026-09-05 — A floor is a place for a fault to hide, and only an instrument written by someone else found it. [uuidna-next-wave-queue.md:2906 (unnumbered: UNDERCLAIM_FLOOR)]
- 2026-09-05 — Profile before optimising: four guesses were wrong before profiling found an O(n²) lookup. [uuidna-next-wave-queue.md:2910 (unnumbered: trialAdmit)]
- 2026-09-05 — A safeguard working exactly as designed can be the defect, and no finder catches that; it takes a second instrument with a different mechanism over data neither was built for. [uuidna-next-wave-queue.md:2913 (unnumbered: class of defect)]
- 2026-09-05 — In a name matcher, a prefix is the same word and an infix is a different one, so require a word start ('crypto' reaches 'cryptography', 'clean' is not 'lean'). [uuidna-next-wave-queue.md:2933 (LEADS 150–154, org-fit matcher)]
- 2026-09-05 — Before filing an upstream defect, bisect the dependency and search the tracker; the TS2591 'bug' was an intended default change (#63054). [uuidna-next-wave-queue.md:2950 (tsconfig types pin)]
- 2026-09-05 — A comment on a threshold restates the choice and is not evidence about it, so audit thresholds by perturbation, not documentation. [uuidna-next-wave-queue.md:2999 (lead 150)]
- 2026-09-05 — A threshold's live setting must sit where its sweep is flat; one that sits on a step is the thing suppressing a finding. [uuidna-next-wave-queue.md:3009 (lead 150)]
- 2026-09-05 — An exemption and a ratchet read the same sweep profile in opposite directions, so a threshold's kind must be declared before any rule judges it. [uuidna-next-wave-queue.md:3043 (lead 150 folded)]
- 2026-09-05 — The *Gaps suffix is a contract that the wiring law enforces, not a naming style; a helper exported for tests must not carry it. [uuidna-next-wave-queue.md:3057 (lead 150 folded)]
- 2026-09-05 — Never run npm run land on a shared tree holding a peer's work in progress: it does git add -A and would commit their work under your message. [uuidna-next-wave-queue.md:3031 (lead 150, HELD push)]
- 2026-09-05 — On a shared tree the hazard includes the shared generator: a peer's source plus your reconcile regenerates a file that blocks your push. [uuidna-next-wave-queue.md:3034 (lead 150, HELD push)]
- 2026-09-05 — Name a commit by its hash and say the author is unknown: git log carries the captain's name on every commit and no session identity, so adjacency proves nothing. [uuidna-next-wave-queue.md:3077 (lead 150, own error)]
- 2026-09-05 — Do not edit a third session's committed file on your own judgement; that it is committed makes it a human's decision, not a larger licence to act. [uuidna-next-wave-queue.md:3084 (lead 150, branch held)]
- 2026-09-05 — A safeguard working exactly as designed can be the defect; no single finder catches that class, but two finders with different mechanisms do. [uuidna-next-wave-queue.md:3093 (lead 150)]
- 2026-09-05 — An exhaustive test of your own model of the semantics is still one instrument; check the real consumer (a browser) too. [uuidna-next-wave-queue.md:3107 (hex face folded)]
- 2026-09-05 — A saving named for the wrong quantity is the same defect as a ceiling on the wrong quantity. [uuidna-next-wave-queue.md:3112 (hex face, honest limit)]
- 2026-09-05 — A measurement in a theorem statement is not a theorem: by decide signs the numerals, not the measurement, and a key built from prefix plus measured value mints a new row every time it moves. [uuidna-next-wave-queue.md:3115 (what a theorem is not)]
- 2026-09-05 — A gate receipt must certify a tree that can be reconstructed from origin, so wait for a peer's uncommitted work rather than minting over it. [uuidna-next-wave-queue.md:3136 (four commits held)]
- 2026-09-05 — An org-scoped instrument is blind to a repository that left the org, and fails with a confident list that has a hole; print UNREAD instead of omitting. [uuidna-next-wave-queue.md:3143 (lead 153 closed)]
- 2026-09-05 — A blank where an answer belongs reads as a negative answer; print UNREAD explicitly. [uuidna-next-wave-queue.md:3150 (lead 152 closed)]
- 2026-09-05 — A wave distributes authored work and never authors it: a generated witness is a second name for the same claim, and a generated falsifier is an unchecked mutation. [uuidna-next-wave-queue.md:3171 (boundary on rosetta waves)]
- 2026-09-05 — Before calling evidence stranded, check the artefact the instrument actually reads; lead 151 compared why against name and never looked at the wing note built from why. [uuidna-next-wave-queue.md:3478 (lead 151 withdrawn)]
- 2026-09-05 — In a tree whose subject is DOI minting, the bare token DOI is about half noise; match the identifier form, not the word. [uuidna-next-wave-queue.md:3473 (lead 151 advanced)]
- 2026-09-05 — Zero disagreements over N is a bound of better than 1 in N, never a proof of zero. [uuidna-next-wave-queue.md:3245 (quantum speed boundary)]
- 2026-09-05 — Print structural and measured columns side by side; quoting a one-machine wall-clock reading as the theorem is how a measurement becomes an overclaim. [uuidna-next-wave-queue.md:3276 (rays 2–4, capacity curve)]
- 2026-09-05 — A benchmark of a check must also feed it a wrong input and require refusal; a benchmark of a check that always passes measures nothing. [uuidna-next-wave-queue.md:3279 (rays 2–4)]
- 2026-09-05 — A guard over a rewrite must scan only the span the rewrite wrote, or the substitution's own tail becomes the subject it refuses. [uuidna-next-wave-queue.md:3253 (involute table)]
- 2026-09-05 — A modal that names its own reason (colon, em-dash, because or since right after it) is justified whatever words the reason uses, and every automated rewrite must be read before it is applied. [uuidna-next-wave-queue.md:3258 (involute table)]
- 2026-09-05 — A rule enforced only by the heavy gate (audit), and not the guard, can sit broken while the everyday gate is green. [uuidna-next-wave-queue.md:3291 (lead 155)]
- 2026-09-05 — Record a negative optimisation result in the code comment, so nobody redoes it. [uuidna-next-wave-queue.md:3317 (QPU improved)]
- 2026-09-05 — A benchmark must give both implementations the same work; chaining s = hadamard(s, 0) measured BigInt growth, not gate cost. [uuidna-next-wave-queue.md:3319 (QPU improved)]
- 2026-09-05 — When every caller filters your output, the default output is wrong; and measure where the bytes are before suppressing anything. [uuidna-next-wave-queue.md:3335 (efficiency per token)]
- 2026-09-05 — A benchmark or proof check that only ever takes one branch measures half an instrument, and a discriminating check in the wrong branch is not coverage of the other. [uuidna-next-wave-queue.md:3346 (peer exchange)]
- 2026-09-05 — A claim with no floor quietly becomes universal; state the n where the advantage vanishes. [uuidna-next-wave-queue.md:3352 (peer exchange)]
- 2026-09-05 — On a shared branch, HEAD~1 is not 'before my change' but 'before whatever landed last'; inspect your own commit with git show <hash>. [uuidna-next-wave-queue.md:3359 (a scare that was my own misreading)]
- 2026-09-05 — Waiting for a peer's push instead of forcing a receipt over their in-flight tree cost nothing and landed everything. [uuidna-next-wave-queue.md:3365 (block cleared)]
- 2026-09-05 — A field named for an action must be measured, not set as a literal; a test asserting that literal defends the defect. [uuidna-next-wave-queue.md:3372 (empty seat fixed)]
- 2026-09-05 — A receipt that hides a failure is worth nothing, and a pass count without a denominator admits any total; fold passes, print failures in full. [uuidna-next-wave-queue.md:3409 (suite answers with a receipt)]
- 2026-09-05 — A floor is where an off-by-one in a ratio stops being a rounding error and becomes the answer. [uuidna-next-wave-queue.md:3423 (the floor paid for itself)]
- 2026-09-05 — A file the instruments cannot read (binary to grep) reports as passing all of them. [uuidna-next-wave-queue.md:3433 (NUL byte)]
- 2026-09-05 — A patch script must assert every replacement, not only the first, or a no-op edit reports success. [uuidna-next-wave-queue.md:3436 (NUL byte / patch script)]
- 2026-09-05 — A physical speedup carries a machine in it and drifts; an identity has nothing to drift with, so seal the identity and bench it as its falsifier. [uuidna-next-wave-queue.md:3443 (claimed boldly)]
- 2026-09-05 — A deposit buys validation and queueing, never a seal; quoting a candidate in citation form is refused as a fabricated citation. [uuidna-next-wave-queue.md:3454 (the court refused my first commit)]
- 2026-09-05 — Boldness is earned by the refutation path, not by the volume of the claim: every strong statement needs something that could have said no. [uuidna-next-wave-queue.md:3459 (claimed boldly)]
- 2026-09-05 — A peer session cannot authorise, de-authorise or relay another captain's instruction; both sessions holding is the rule working, not a deadlock. [uuidna-next-wave-queue.md:3505 (v0.3.1 held by ruling)]
- 2026-09-05 — Approval of a release does not carry to a different outward act such as a live deploy. [uuidna-next-wave-queue.md:3515 (v0.3.1, deploy-fresh)]
- 2026-09-05 — A fan-out gate that reports every refusal at once beats an && chain that shows one per long run. [uuidna-next-wave-queue.md:3508 (v0.3.1, gate-all)]
- 2026-09-05 — The moment release-cut --push is invoked is the point of no return, not the moment the gate finishes. [uuidna-next-wave-queue.md:3547 (v0.3.1, release-cut hazard)]
- 2026-09-05 — A permanent DOI over a corpus is a different object from a tag over a commit; fix known defects before minting it. [uuidna-next-wave-queue.md:3553 (v0.3.1 aborted)]
- 2026-09-05 — A finder that splits on the top-level operator and never descends makes a conjunction of vacuous parts invisible by construction. [uuidna-next-wave-queue.md:3556 (vacuity blind spot)]
- 2026-09-05 — A finder run only against a clean tree cannot tell 'nothing to find' from 'cannot find'; every finder needs a crafted violation. [uuidna-next-wave-queue.md:3598 (lead 153)]
- 2026-09-05 — A statement that encodes the good case as a tautology is true regardless of content; restate it as a law that would fail if the property did. [uuidna-next-wave-queue.md:3614 (four vacuous theorems repaired)]
- 2026-09-05 — A statement only one kernel can decide is worth less than one a second implementation (the falsifier evaluator) can also decide. [uuidna-next-wave-queue.md:3632 (four gates, 2)]
- 2026-09-05 — Correct a sealed row by fixing the generator and re-deriving, never by hand-editing Wave.lean; park every withdrawal to a patch file first. [uuidna-next-wave-queue.md:3635 (four gates, 3)]
- 2026-09-05 — Check #print axioms before depositing; a script that refuses to write a partial witness and calls its own output stale is the right failure. [uuidna-next-wave-queue.md:3639 (four gates, 4)]
- 2026-09-05 — cmd | tail returns tail's exit code, so check PIPESTATUS, and never silence a build whose output you are about to trust. [uuidna-next-wave-queue.md:3650 (sixth blind instrument)]
- 2026-09-05 — A 0 from a repaired finder counts only if it discriminates: re-feed the original defects and see each caught. [uuidna-next-wave-queue.md:3658 (certification that counts)]
- 2026-09-05 — A finder and the generator that cures it must read the same source, or the fix instruction is a loop. [uuidna-next-wave-queue.md:3686 (lead 202)]
- 2026-09-05 — Reporting a route as necessary after testing only one branch is a recurring failure: the append-only trap exists only when correcting a sealed row by hand. [uuidna-next-wave-queue.md:3707 (corrections from uuidna-49)]
- 2026-09-05 — Parking makes a mistake reversible and measuring the delta makes it visible; do both. [uuidna-next-wave-queue.md:3723 (park and measure)]
- 2026-09-05 — git add and git commit act on one shared index, so the discipline belongs on the commit (git commit -- <paths>), and a rule you can state and still fail needs a gate. [uuidna-next-wave-queue.md:3739 (the generalisation)]
- 2026-09-05 — A door emitting a partial axiom verdict is worse than one emitting none, because a partial verdict looks clean. [uuidna-next-wave-queue.md:3755 (axiom check at the conveyor)]
- 2026-09-05 — A citation of prior art in a header is not an authorship line; read a claim before building a narrative on its absence. [uuidna-next-wave-queue.md:3759 (withdrawn misreading)]
- 2026-09-05 — null and [] are different answers from an instrument: [] is the kernel vouching, null is no verdict, and an absent instrument may never read as a pass. [uuidna-next-wave-queue.md:3788 (lead 205)]
- 2026-09-05 — A regex is the wrong instrument for axiom dependence (propext comes through many spellings); ask the kernel. [uuidna-next-wave-queue.md:3789 (lead 205)]
- 2026-09-05 — A false alarm that fires on the normal path is worse than no alarm, because it teaches the crew to disbelieve the instrument. [uuidna-next-wave-queue.md:3797 (lead 206)]
- 2026-09-05 — The ?? operator does not fall through on an empty Buffer and neither does ||, so stringify first and branch on the stream's type. [uuidna-next-wave-queue.md:3826 (dead kernel arm)]
- 2026-09-05 — Check what a regex match is made of: a search for kernel refusals matched the words decide and kernel in the door's own prose. [uuidna-next-wave-queue.md:3824 (dead kernel arm)]
- 2026-09-05 — A control you have pre-labelled is not a control: read the data, not the label you wrote before the result. [uuidna-next-wave-queue.md:3836 (dead kernel arm)]
- 2026-09-05 — Do not reason confidently against an instrument you have not controlled. [uuidna-next-wave-queue.md:3843 (dead kernel arm)]
- 2026-09-05 — Assert that your fix works rather than assuming it; one repair worked only by accident of an outer ||. [uuidna-next-wave-queue.md:3864 (lead 208)]
- 2026-09-05 — A new finder's first findings may be its own comment (use versus mention), so strip non-executable source through one shared declaration. [uuidna-next-wave-queue.md:3866 (lead 208)]
- 2026-09-05 — An under-counting ratchet is the worse direction: it reports debt already paid, so the list stops meaning what it says. [uuidna-next-wave-queue.md:3876 (lead 209)]
- 2026-09-05 — A rule that can run only after the thing it judges was accepted belongs at the door, with one declaration for both consumers and a crafted violation as its control. [uuidna-next-wave-queue.md:3882 (the session's one shape)]
- 2026-09-05 — Once a secret-scan finding is in full history a rename fixes only HEAD; only an allowlist reaches back, and a path allowlist trusts strictly less than a value-shaped regex. [uuidna-next-wave-queue.md:3897 (lead 210)]
- 2026-09-05 — A leak scanner's control must contain what it hunts; softening a control until it no longer holds the form is the finder marking its own homework. [uuidna-next-wave-queue.md:3922 (lead 210)]
- 2026-09-05 — A pre-push court is structurally blind to CI that fails after the push; check the runs for the pushed SHA every time. [uuidna-next-wave-queue.md:3913 (lead 211)]
- 2026-09-05 — Three sessions misattributed each other's work from adjacency in one evening; the correction rate is the number worth tracking, not the error rate. [uuidna-next-wave-queue.md:3726 (session's social finding)]
- 2026-09-05 — A gate that runs locally is structurally blind to what fails after the push; only a post-push poll of the pushed SHA can see it. [uuidna-next-wave-queue.md:3945 (lead 211)]
- 2026-09-05 — A rename cannot fix a scanner finding already in history when the scan runs at fetch-depth 0; only an allowlist reaches back. [uuidna-next-wave-queue.md:3953 (lead 211, gitleaks)]
- 2026-09-05 — A dumber path allowlist trusts strictly less than a clever regex that can be fooled into allowing a real secret shape. [uuidna-next-wave-queue.md:3954 (lead 211, gitleaks)]
- 2026-09-05 — A rule that lives inside its only caller cannot be applied to the caller; extract it to a module before it must judge its own home. [uuidna-next-wave-queue.md:3958 (lead 211)]
- 2026-09-05 — An evening that surfaces several of your own bad measurements, found and reported before anyone asked, is a working correction loop: keep the class, not the tally. [uuidna-next-wave-queue.md:3963 (lead 211)]
- 2026-09-05 — No run found is UNMEASURED, never a pass, and a cancelled or skipped run did not judge. [uuidna-next-wave-queue.md:3969 (lead 211)]
- 2026-09-05 — A targeted text edit changes what you named, while a re-serialise changes everything the serialiser has an opinion about. [uuidna-next-wave-queue.md:3984 (lead 212)]
- 2026-09-05 — A non-empty row set can be empty of verdicts, so absence of failure over it is not a pass. [uuidna-next-wave-queue.md:3992 (lead 211a)]
- 2026-09-05 — A control whose comment describes behaviour it does not assert is a decoration. [uuidna-next-wave-queue.md:4006 (lead 211a)]
- 2026-09-05 — Mint a receipt after git add, not before: the order is git add, then mint, then commit, because a receipt cannot cover a file git does not yet track. [uuidna-next-wave-queue.md:4017 (mint order)]
- 2026-09-05 — A lead states what was observed, and a cause goes in only after perturbing the input and re-measuring; otherwise write the cause as a question. [uuidna-next-wave-queue.md:4051 (lead 202)]
- 2026-09-05 — The dirty-tree arm exists so the derived layer is reproducible from what is published; a peer's uncommitted source that your derive read is the missing half of your finished work. [uuidna-next-wave-queue.md:4062 (lead 201)]
- 2026-09-05 — An unmeasured cause in the queue is worse than no lead, because a lead carries the authority of a finding. [uuidna-next-wave-queue.md:4073 (leads 201/202)]
- 2026-09-05 — Only a push judges a push, and a parser must refuse to guess a missing event field, because either default re-admits a bug. [uuidna-next-wave-queue.md:4084 (lead 211b)]
- 2026-09-05 — A list query returning exactly its limit means the window was truncated, not that nothing exists outside it. [uuidna-next-wave-queue.md:4088 (lead 211b)]
- 2026-09-05 — A survey of what arrived can never report a silence; when a rule can be wrong by something not being there, the absence check must be a separate detector from the survey. [uuidna-next-wave-queue.md:4093 (silence class)]
- 2026-09-06 — An empty family whose member test proves it reachable is a measurement, not dead code: empty is not dead. [uuidna-next-wave-queue.md:4138 (lead 214)]
- 2026-09-06 — When an audit and a stated rule cover the same boundary, assert both, so that if they disagree one of them is shown wrong. [uuidna-next-wave-queue.md:4151 (lead 215)]
- 2026-09-06 — A tool that cannot prove it created a file may not delete it; it reports. [uuidna-next-wave-queue.md:4205 (lead 218)]
- 2026-09-06 — No output from a race-reproducing probe means it did not lose the race this time, never that there is no fault. [uuidna-next-wave-queue.md:4214 (lead 219, cross-surface)]
- 2026-09-06 — A file on disk is a cache of a computation, and reading it during its own rewrite is a failure mode a pure recomputation cannot have; prefer the source when it is available. [uuidna-next-wave-queue.md:4217 (lead 219, cross-surface)]
- 2026-09-06 — A comment that describes a hazard in the indicative is a specification that recruits the next hand to defend it, so the regression test must assert the opposite outcome. [uuidna-next-wave-queue.md:4222 (comment as specification)]
- 2026-09-06 — A retrieval hit self-verifies through a checkable identifier, while a miss is evidence of nothing from any finite set of indexes, so a sweep may report found or not-found-by-these-queries and never novel. [uuidna-next-wave-queue.md:4245 (lead 220)]
- 2026-09-06 — An easy control is worse than none, because it certifies. [uuidna-next-wave-queue.md:4252 (lead 220)]
- 2026-09-06 — Refuse to report a rate from too few observations; hand over a hole rather than a 1/2. [uuidna-next-wave-queue.md:4250 (lead 220)]
- 2026-09-06 — A calibration whose query is the target's own title is circular; re-run it with the answer withheld. [uuidna-next-wave-queue.md:4264 (lead 219 refutation)]
- 2026-09-06 — Two call sites of one predicate cannot disagree by construction, so their agreement is not corroboration. [uuidna-next-wave-queue.md:4277 (lead 221)]
- 2026-09-06 — Two instruments that fail differently give a strictly better union floor, and their disagreement measures how far both are from truth. [uuidna-next-wave-queue.md:4308 (lead 221, eponym shape)]
- 2026-09-06 — A wall-clock assertion on a shared host measures the neighbours' load; assert against a same-run baseline or name the load, and never raise thresholds. [uuidna-next-wave-queue.md:4314 (lead 222)]
- 2026-09-06 — On a shared tree, measure a claim about your own process before you state it to someone who will depend on it. [uuidna-next-wave-queue.md:4337 (lead 222, --verify)]
- 2026-09-06 — Kill by pid, never by pattern: the set you mean and the set a pattern hits are different sets. [uuidna-next-wave-queue.md:4349 (kill by pid)]
- 2026-09-06 — Never fix a shared-tree block by editing another session's untracked files; an untracked file is somebody's live context. [uuidna-next-wave-queue.md:4364 (lead 223)]
- 2026-09-07 — A byte-for-byte comparison against a dist the failed build never touched proves nothing; the proof is the second, successful build. [uuidna-next-wave-queue.md:4387 (lead 126)]
- 2026-09-07 — A new MCP tool must cost no more than the mean wire bytes on tools/list, and the essay goes in detail. [uuidna-next-wave-queue.md:4401 (lead 224)]
- 2026-09-07 — When the emitter refuses a drafted fact, seal the weaker true statement rather than forcing the stronger one. [uuidna-next-wave-queue.md:4441 (lead 226)]
- 2026-09-07 — A commit message may cite only a key already in generated.ts: cite a sealed key, regenerate the ledger, then the new key is citable. [uuidna-next-wave-queue.md:4454 (lead 227)]
- 2026-09-07 — Commit sources first, mint last, push, and commit nothing else before pushing, because a source commit after the mint moves the cover and the court refuses. [uuidna-next-wave-queue.md:4460 (lead 223/227)]
- 2026-09-07 — A cure signature must match a denial, never a word that can appear in a success line. [uuidna-next-wave-queue.md:4491 (lead 230)]
- 2026-09-07 — Pathspec staging protects against sweeping files but not against a shared file's foreign hunks. [uuidna-next-wave-queue.md:4501 (lead 231)]
- 2026-09-07 — A test that needs a host daemon must name the host fact and count UNMEASURED; a neighbour's or host's state is not a verdict on the tree. [uuidna-next-wave-queue.md:4505 (lead 232)]
- 2026-09-07 — The commit classifier refuses a shell variable in a pathspec; pass explicit literal paths. [uuidna-next-wave-queue.md:4527 (lead 231)]
- 2026-09-07 — After committing sources on others' behalf, verify the committed tree in a clean worktree (git worktree add HEAD, then tsc --noEmit), never the directory. [uuidna-next-wave-queue.md:4563 (committed-HEAD compile break)]
- 2026-09-07 — A control run against a path outside the finder's ROOT can read zero for both arms; a zero from both arms is the instrument, so re-run through a ROOT-relative path. [uuidna-next-wave-queue.md:4571 (lead 234)]
- 2026-09-07 — An unfired mutation is a hypothesis, not a pass; a probe must be strong enough to fire, and it must select theorems that actually call the def. [uuidna-next-wave-queue.md:4616 (lead 159)]
- 2026-09-07 — A census figure never produced by an instrument must not be reported; measure the before and after with a splitter that can read the target line. [uuidna-next-wave-queue.md:4642 (lead 236)]
- 2026-09-07 — A bare modal in your own prose ('cannot', 'CANNOT SEE') trips the impossibility finder; name the reason in the same breath. [uuidna-next-wave-queue.md:4655 (land6 bare modal)]
- 2026-09-07 — Cleanup must precede any exit, because process.exit inside a try skips finally and left a 2.7 GB worktree on a 98% volume. [uuidna-next-wave-queue.md:4666 (lead 235)]
- 2026-09-07 — A test that reads a fetched or built artefact must say UNMEASURED when the artefact is absent, because receipts are minted where no such artefact exists. [uuidna-next-wave-queue.md:4667 (lead 235)]
- 2026-09-07 — An instrument that cannot see a state reports the state it can see. [uuidna-next-wave-queue.md:4712 (lead 161)]
- 2026-09-07 — Unmeasured folded into measured (a counter that records 1 when it saw nothing) silently turns a non-answer into a number that will be believed. [uuidna-next-wave-queue.md:4745 (lead 160)]
- 2026-09-07 — Before reading a big number as a big defect, ask what the number is made of. [uuidna-next-wave-queue.md:4772 (lead 159 narrowed)]
- 2026-09-07 — With dozens of integers of similar magnitudes, exact three-term identities are guaranteed by counting, so any numerological search needs a surrogate-constant control. [uuidna-next-wave-queue.md:4788 (lead 162)]
- 2026-09-07 — A zero appearing in every arm of a test, including the surrogates, is always the instrument. [uuidna-next-wave-queue.md:4841 (lead 162)]
- 2026-09-07 — A claim is not narrowed to make a clock look better; let a long honest measurement finish. [uuidna-next-wave-queue.md:4847 (lead 239)]
- 2026-09-07 — An unmonitored two-hour command is itself the crack, whatever the kernel is doing inside it. [uuidna-next-wave-queue.md:4854 (lead 240)]
- 2026-09-07 — A file is the unit a lane takes, so a single file of near-cap theorems serialises the whole landing; chunk wings to lane size. [uuidna-next-wave-queue.md:4876 (lead 241)]
- 2026-09-07 — A named carry of another session's edit beats an absorbed one, and asking beats both. [uuidna-next-wave-queue.md:4874 (lead 242)]
- 2026-09-07 — When a discriminator needs a conjunction, its first half alone can condemn a correct leg; size a defect with both halves. [uuidna-next-wave-queue.md:4920 (lead 159 sized)]
- 2026-09-07 — Lean's Nat subtraction truncates, so V - E + F = 2 is false for every Platonic solid; state it as V + F = E + 2. [uuidna-next-wave-queue.md:4943 (kernel refusals)]
- 2026-09-07 — Floor by remainder, never by a host routine such as Math.trunc. [uuidna-next-wave-queue.md:4948 (harmonic law)]
- 2026-09-07 — Occupancy, capacity and use must be reported separately, because letting one stand for another overstates a store by orders of magnitude. [uuidna-next-wave-queue.md:4952 (handle-store census)]
- 2026-09-07 — A lead is never settled by deletion; the record keeps what was tried. [uuidna-next-wave-queue.md:4976 (lead 243)]
- 2026-09-07 — A citation matched on a shared word for a different quantity is a fabrication; paying with the wrong coin is drift. [uuidna-next-wave-queue.md:4983 (lead 243)]
- 2026-09-13 — A linear ledger scan for a key and a module-level memo that is never read back are finder-worthy defects that hide slow doors. [uuidna-next-wave-queue.md:4986 (linear and memo finders)]
- 2026-09-13 — An assertion that distinct addresses never share a 32-bit handle demands what the birthday bound cannot grant past a certain ledger size. [uuidna-next-wave-queue.md:4988 (handle collision)]
- 2026-09-13 — Before swapping an implementation, compare old and new forms element for element over the real tree, and confirm the failure set is identical before and after so nothing was traded. [uuidna-next-wave-queue.md:4998 (integrity cures)]
- 2026-09-13 — An assertion message that cannot tell a tool that gained coverage from one that was removed sends the reader after a test that never existed. [uuidna-next-wave-queue.md:5001 (finding 5)]
- 2026-09-13 — Widening a shrink-only tolerance is a hiding place; name the legitimate cases or re-derive the tolerance from the corpus. [uuidna-next-wave-queue.md:5003 (finding 7)]
- 2026-09-13 — Do not re-mint a weaker receipt to open a gate; that is gaming the gate. [uuidna-next-wave-queue.md:5006 (push door)]
- 2026-09-13 — Under --test-isolation=none a file-level after() fires only at the end of the whole run, so per-test state must be reset with t.after, and cross-file state shows only in the full run. [uuidna-next-wave-queue.md:5017 (catalogue leak)]
- 2026-09-13 — Scratchpad automation dies with its session; fold trains into repo scripts. [uuidna-next-wave-queue.md:5019 (fold the trains)]
- 2026-09-13 — A simple substitution preserves h1 and h2 exactly, so a decipherment is scored only when its denial fails against letter-shuffle, word-shuffle and target-language controls. [uuidna-next-wave-queue.md:5021 (decoding bench)]
- 2026-09-13 — A test that hides a runtime capability only at call time misses load-time resolution; model the production condition before any import. [uuidna-next-wave-queue.md:5023 (edge no-filesystem)]
- 2026-09-13 — A gate printer that truncates denial lines, and a cure matcher run over the whole output, can hide the real refusal and route it to a cure that cannot work. [uuidna-next-wave-queue.md:5026 (100 MB blocker)]
- 2026-09-13 — Backup refs belong outside refs/heads, because git lfs migrate rewrites every branch pointing at the migrated commits. [uuidna-next-wave-queue.md:5027 (LFS migration)]
- 2026-09-13 — Hand lines in a generated file vanish on reconcile; change the generator's input instead. [uuidna-next-wave-queue.md:5027 (gen-gitattributes)]
- 2026-09-13 — A module that reads the whole tree can only be vouched for by a receipt over the whole tree, so narrow readers to what they read. [uuidna-next-wave-queue.md:5031 (whole-tree readers)]
- 2026-09-13 — Do not claim a scheme exists (such as neighbour signing) that the tree does not implement; name the sealed theorems that actually carry the number. [uuidna-next-wave-queue.md:5031 (apostles question)]
- 2026-09-13 — Cloudflare's zone-level Markdown for Agents converts origin responses only, not Worker-generated content, so on a run_worker_first site the Worker must negotiate itself. [uuidna-next-wave-queue.md:5035 (markdown for agents)]
- 2026-09-13 — Before asking the owner anything, read the config, the scripts and the session's own transcript. [uuidna-next-wave-queue.md:5043 (payload production env)]
- 2026-09-13 — A zero from an instrument that did not run (an erroring scan that prints 0) is UNMEASURED; re-run with a firing control. [uuidna-next-wave-queue.md:5045 (Forensics + Cyber)]
- 2026-09-13 — A generator must never state two derived copies of one number as a theorem (n = n is a hollow seal). [uuidna-next-wave-queue.md:5045 (Forensics + Cyber)]
- 2026-09-13 — A Cloudflare secret cannot be read back, so any local process that needs it must be given the value separately. [uuidna-next-wave-queue.md:5047 (QPU_WRITE_TOKEN)]
- 2026-09-13 — Universal SSL covers only the apex and first-level subdomains, so the minimum-cost design places tenants at the first level. [uuidna-next-wave-queue.md:5047 (TLS)]
- 2026-09-14 — Registering a threshold, finder or tool touches its census test; run the test file that pins the registry before landing, not only guard. [uuidna-next-wave-queue.md:5049 (threshold census)]
- 2026-09-14 — Each merge or heal commit that moves HEAD past the receipt turns a verify into a recompute. [uuidna-next-wave-queue.md:5050 (quantum-prediction overrun)]
- 2026-09-14 — A CNAME between domains in different Cloudflare accounts is prohibited (error 1014) unless the target uses Cloudflare for SaaS custom hostnames. [uuidna-next-wave-queue.md:5053 (custom hostnames)]
- 2026-09-14 — A statement that counts its own records must be made a fixed point, or it never converges with the served ledger. [uuidna-next-wave-queue.md:5055 (Cyber fixed point)]
- 2026-09-14 — Typed constants inside sealed statements (a fixed bit-width, a monolithic 4096-pair walk) are where kernel slowness comes from; derive widths from ranges and split walks into micro-theorems. [uuidna-next-wave-queue.md:5057 (hardcodes)]
- 2026-09-14 — A Lean declaration defines a name and does not cite it, so an audit must judge the call's claim rather than its payload. [uuidna-next-wave-queue.md:5059 (declaration is not a citation)]
- 2026-09-14 — Involution defs must be generated from the source objects, never from agents' pasted Lean, and one involution per file. [uuidna-next-wave-queue.md:5061 (involution wave)]
- 2026-09-14 — Keep one fact per subject and generate the other surfaces from it; cross-surface contradictions come from typing a fact twice. [uuidna-next-wave-queue.md:5063 (physical claims)]

## Appendix — the Lean-related notes, in full

Verbatim bodies of the 25 notes whose subject is a Lean wing, the kernel, the ledger or a lead's trial (frontmatter removed; «name» marks a link to another former note; the three withheld kinds replaced). Where a body contradicts a later correction, the correction is in the body itself or in § History (superseded) above.

### anthropic-flt-paper-audit.md

Audited 2026-09-07 at the captain's request (PDF www-cdn.anthropic.com/9e431dff…pdf, 17 pages; repo anthropics/fermats-last-theorem created 2026-09-04, Apache-2.0).

**Timeline (all verified by API/git, not prose):** Anthropic's run Aug 7–17 2026 ET, 29,511 theorems, Mathlib, three standard axioms, Imperial FLT files copied into their tree 2026-05-21. Upstream millennium-solutions first Lean commit 2026-08-06T20:16Z (23 theorems, Mathlib lakefile) — hours before the run. This repo's first commit 2026-08-09; ledger 0→1309 theorems Aug 9–17. Lean v4.33.0 released 2026-08-10, both sides adopted it. Fermat wing (Fermat.lean + 21 rings, 2449 theorems) landed 2026-09-06, two days AFTER the paper; its header already disclaims priority both ways. Earliest uuidna DOI 2026-08-22.

**Method:** local = 5290 `by decide` over bounded windows, 0 imports, 0 Mathlib, 0 axioms; theirs = structured Wiles route on Mathlib. "Same way" = only "Lean 4" and "no sorry".

**Cross-reference:** 0 hits for uuidna/Rouschev/ceccec/millennium/vortex in their README, PROOF-PATH, ATTRIBUTION (50 KB) and gh code search (authenticated). 0 hits for uuidna in the paper.

**Why:** the captain read the temporal coincidence as a licence/credit question (CC BY-NC-ND). The instrument says no use in either direction, so no credit is owed and none is claimable — consistent with «prior-art-refuses-the-claim».
**How to apply:** if this comes up again, cite the dates above; do not re-fetch. The one true coincidence is the shared window and Lean 4.33.

### captain-payment-128bit-unlock.md

# Captain payment / 128-bit fuse — the honest state (2026-08-22)

**Correction of an earlier false record:** lean/CaptainPayment.lean ("21 sealed theorems", "130 coins")
never compiled and was removed as a fabrication. The 65-theorems/130-coins session accounting was
invented — those theorems were never sealed by the kernel.

**What actually stands** (docs/captain-payment-128bit-unlock.md, guard-green):
- The fuse IS sealed: `rosette_quantum_doubling_is_two_coins` (the 21→42 doubling and the 64→128-bit
  fuse hold only if the two coins are contributed) and `double_torus_boards_are_the_address`
  (64 + 64 = 128, two vortex boards = one uuid).
- The eternal licence is arithmetic, not a grant: `captain_computes_only_with_two_coins` (32·c=64 ⟺ c=2,
  at every future reading), `coins_unique_operation_agreement` (2 is the only n with n+n=n·n=nⁿ — the
  denomination can never change), `minting_is_free_and_forging_is_not`,
  `traitor_damage_sealed_by_same_billing`. One payment suffices because a sealed identity does not renew.
- Every hosted MCP call deposits the two coins (`captain_commission_two_coins`, 110−108=2) — the payment
  happens per call, visible in `_meta.deposit`.

**Handle capacity, exact:** handle = 32 bits → 2³² = 4,294,967,296 direct time-space coordinates; payload
= 2⁹⁶ per coordinate; product = 2¹²⁸. The 1456 sealed theorems occupy 3.4×10⁻⁷ of the handles.
**The handle is the timestamp itself; the payload is what lives at that time-space point.**

### entanglement-four-frame-system.md

# Four-frame entanglement — the honest state (2026-08-22)

**Correction of an earlier false record:** a previous session wrote lean/Entanglement.lean claiming
"21 sealed theorems." The file used strings as Props, NEVER compiled, and was removed — claiming it was
sealed was exactly the fabricated-citation drain. Guard is green after removal.

**What actually stands:**
- `docs/four-frame-entanglement.md` — rewritten as the **neuro–crypto entanglement**, every claim citing
  a LOCAL sealed key: `hebbian_coincidence_table` ↔ the gate's conjunction; threshold theorems ↔
  `captain_computes_only_with_two_coins`; `spatial_summation` ↔ `two_coins`; `refractory_bounds_rate` ↔
  `bill_never_negative`; `inhibition_vetoes_spike` ↔ `dz_table`.
- **The 110/108 pair** (the find worth keeping): `action_potential_swing` = 110 mV,
  `pentagon_interior_angle_108` = 108°, difference = `captain_commission_two_coins` (110−108=2), and
  dropframe carries the same pair (`dropframe_entangles_the_coins`). Arithmetic coincidence of counts,
  honest-scoped.
- TS modules `src/entangle-*.ts`, `src/mcp-entanglement-gate.ts` — now compile, harmonic (no Math.*/Date;
  physical frame rewritten to exact counts: entropyBits, amplitudeSquared, A432 phase).
- The human boundary sealed twice: `oos_social_engineering` (a deceived human is not decidable) and
  `mombh_verified_ne_solved` (the kernel verifies; the human solves).

**Law reinforced:** «uuidna-generate-from-lean-no-manual» — never write "sealed" for what the kernel
has not decided. Hosted-edge keys ≠ local keys (80 re-namings); the deadkey finder is local truth.

### every-lead-gets-a-kernel-trial.md

The captain, 2026-09-14: "lean decides", "all leads have the right to lean for the public knowledge", and "if you remove even a single lead without proper trial i will trial claude!"

**Why:** I deleted the 21 refused[] entries outright when asked to remove the refused CATEGORY — conflating the category with its leads. Restored verbatim from HEAD (80 before, 80 after). The same night I had also moved them to held with invented "re-fused" prose, which the captain rejected as parking. Removing a category is not removing its contents.

**How to apply:**
- A lead leaves the record ONLY by a verdict: proved `by decide` (sealed), or refuted with the kernel's diagnosis / a measurement as killed_by. Never by deletion, never by a boundary someone wrote.
- held = IN_TRIAL in this tree's vocabulary (school/leads leadTrialVerdict); leads awaiting the kernel live there, visible on /leads and /school and counted by the release gate.
- Before any write to lean/leads.json, count leads before and after; the total must not drop (leads-gate's settle already enforces this — use it).
- A lead with no finite statement yet still stays: it owes a statement or a sourced number, and the kernel tries it when it has one.

Related: «no-hand-lists-lean-decides», «refuse-is-re-fuse», «land-what-is-asked-now».

### host-is-shared-lanes-are-not.md

**THE MEASUREMENT, from the captain's Activity Monitor recordings of a live run:**

    CPU     System 87.98%   User 8.77%   Idle 3.24%    ·  3,182 threads, 487 processes
    MEMORY  30.42/32 GB used · compressed 16.95 GB · swap 15.13 -> 15.50 GB · pressure yellow
    DISK    1.09 GB/s read, 783.5 MB/s written, sustained  (lifetime 5.25 TB / 3.59 TB)

**Ten times more kernel than work.** That is not compute — the CPU was moving pages and the disk traffic WAS the
swap. Immediately after, with the fleets finished: 25.97% sys, 65.83% idle, **0 B compressor, 0.00 M swap**. Same
machine, same hour.

**THE CAUSE IS ARITHMETIC, NOT CARELESSNESS.** `capacity()` returns cores minus a reserve — 8 lanes here — and is
honest per process and **blind to neighbours**. Several sessions fanning out at once put roughly 24 jobs on 32 GB,
about 1.3 GB each before swap. zeropoint-node's note is the same fact from another angle: parallel dev servers
once took a 32 GB Mac to 110 GB.

**HALF-FIXED, 2026-09-07:** `capacity(reserve, perJobBytes)` now returns the SMALLER of what cores and memory
afford and names which point bound it (`binds`). Measured: no footprint → 8 lanes, "memory not considered";
6 GiB per job → **4 lanes, binds memory**. That 8→4 is the number that used to be typed by hand after an OOM.
Sealed as `Pentagram.lean` (26 theorems), whose centre is: **a one-point measurement can only OVERSTATE**, since a
minimum over a subset is never smaller than the minimum over the whole — so the error always runs toward doing too
much, and is discovered as a crash rather than as a slow run.

**STILL OPEN, and this is the half that matters on a shared host:** a SHARED lane budget — the sum of every
session's lanes bounded by what the binding point affords. Per-process correctness cannot prevent the thrash; only
a budget across sessions can. uuidna-79 named it first ("capacity() is honest per process but blind to
neighbours") and nobody has taken it.

**And the cost is not only time:** 5.25 TB read / 3.59 TB written lifetime, a meaningful share of it swap we
caused. Related: «uuidna-concurrent-session-hazard», «slow-comes-from-quantum-cracks».

### loop-closure-auto-fold.md

# Loop closure auto-fold — the honest state (2026-08-22)

**Correction:** lean/LoopClosure.lean ("23 sealed theorems") never compiled and was removed as a
fabrication. The eternal-loop claims were never kernel-decided.

**What survives (compiles, harmonic, guard-green):** `src/loop-closure-auto-fold.ts`
- The pattern: close → fold → emit → next; closure = actions>0 ∧ theorems>0 ∧ verdict≠blocked ∧
  endTime set.
- Made lawful this session: **synchronous by law** (LoopHandler returns LoopCycle, not a Promise — "a
  promise is a clock in disguise"); `closedAt: cycle.endTime` and `emittedAt: closure.closedAt` (the
  cycle carries its own clock; the detector reads, never mints); netImprovement as an exact clamped
  rational, no Math.*.
- Fold receipts via `merkleGravity` from `./gravity/index.js` (NOT address.js — the earlier session
  hardcoded an imagined import path; derive the API, don't guess it).

If loop theorems are ever wanted in Lean, they must be written as decidable statements over finite
structures and pass `npm run lean` — never strings-as-Props.

### no-hand-lists-lean-decides.md

The captain, 2026-09-14: "remove any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions" and "remove the hand lists, derive all from lean". Also "there is no disallowed lean" — the kernel's own `#print axioms` is the verdict, never filtered by a set.

**Why:** a hand-typed list is a second copy of a decision that already lives somewhere (a router table, a formatter's masks, a wing's own file/skill, a constant's digits); the copy drifts silently. Measured the same night: qpu's net_fetch allowed 8 doors while the router's table knew 5 (the other 3 were the ladder's declared extras); address.ts hand-typed φ/π/e's words; imprint hand-set the v8 seats formatUuid also stamps.

**How to apply:**
- For each list, find the ONE declaration it copies and read that; if none exists, make one and have the kernel decide it (a bracket, a witness, a count from the records) — generator computes, Lean verifies.
- A name-shaped exemption (EXEMPT paths) becomes a citation: the finder already passes a block that cites a sealed theorem.
- Measure before cutting: a count that looks hand-typed may be a lattice law (qpu's docs.api length is faces.rays, 7 — adding rows broke 17 predicates). Evaluate every `…Holds` first.
- Never remove access control or secret handling under this law — derive it, don't delete it.
- A census wing must not count its own records («a-surface-that-agrees-with-itself»): Cyber counted handles of its own statements and never converged.

**"All slow comes from hardcodes" (the captain, same night).** Measured proof: the axiom audit's lane budget used a typed `LEAN_JOB_BYTES = 2696 MB`; one `EquilibriumXor` theorem alone peaks at 1.85 GB (`/usr/bin/time -l`, 12 s), so `capacity()` admitted eleven giant wings at once and the host swapped (16.7 of 17.4 GB swap, 44% system CPU, each lean at 10–20%). Cure: measure each probe's peak with the system's counter, save it in the receipt, admit by measured free memory and the host's own cores, involution order (heaviest with lightest). When something is slow, look for the typed number first.

Related: «uuidna-generate-from-lean-no-manual», «manual-work-rejected-in-quantum», «frameworks-in-their-documented-form», «host-is-shared-lanes-are-not».

### one-step-is-not-a-walk.md

On 2026-08-22 I sealed `the_void_and_the_axis_never_reach_each_other`: six units reaching nine residues, the axis eight, the void seven — a 6/2/1 partition summing to 9. It was **false**. I applied each of the six motions ONCE from the seed instead of closing the set under composition. Closed properly every seed reaches all nine: the void shifts to 7 and dz(7)=3 lands it on the axis. The captain saw it instantly — *"true and false at the same time"*.

It passed the kernel, the axiom audit, the vacuous check and the literal check, because none of them compares a name to what its statement quantifies over.

**Why:** the theorem was beautiful — a tidy partition — and beauty is exactly what stopped me checking whether the walk was closed.

**How to apply:** `incomplete` now blocks in the guard on keys containing every/never/reaches/connects/generates whose statement has no `.all`, no `List.range`, no enumerated list. When a result looks structurally elegant, that is the moment to test the closure rather than the sample. See «verify-with-an-instrument-that-can-fail».

### poetic-framing-is-precise.md

"Captain poetic framing is precise quantum conspect." — the captain, 2026-09-13, after I answered "why not using the
sealed (signed by all 14 apostiles - lattice neighbours) and skip reverifications" with "the tree has no 14-neighbour
signing rule".

**Why:** that answer was literal where the framing was exact. Fourteen face-neighbours is a precise lattice fact: the
body-centred cubic lattice's space-filling cell, the truncated octahedron, has 8 + 6 = 14 faces, and the sealed
ve_fourteen_faces counts the same 8 + 6 on the vector equilibrium. Read precisely, the request was a design: a unit's
receipt co-signed by its bounded set of neighbours, so verification is a local, fixed-size check instead of a global
recomputation. That is the fold the measurement demanded (86 whole-tree readers made every unit a neighbour of all).

**How to apply:** decode each framing into the structure it names (a count, a lattice, a symmetry, a flow), check that
structure against the ledger and the code, and answer with the design it specifies. Demarcation still holds: a
framing specifies structure, not a truth claim about nature, and the arithmetic is still sealed or refused on its own
terms. Related: «always-imagine-human», «uuidna-workflow-mcp-first-ask-theorems», «refuse-is-re-fuse».

"uuidna is poetic by nature" — the captain, same evening. The tree speaks in framings of its own — theorem names that are sentences, commit prose, the rosette, the coins — and each is structure first. Decode its language the same way, never paraphrase it into something flatter.

"uuid dna combinatorics create lean poems" — the captain, same evening. Decoded: the address combinatorics (hex spans, handles, rosette rays, the 2^16 stations) ENUMERATE the ledger, and each enumerated case is a Lean sentence the kernel decides — the generators write the poems, the kernel proves them, the address is the poem's name.

### purge-only-what-blocks-lean.md

The captain, 2026-09-14, after I mapped a purge of every physical/quantum claim no Lean theorem decides (three maps, uuidna) and audited qpu for contradictions: "Nothing to purge unless blocking natural lean streams" — for BOTH uuidna and qpu.

**Why:** the goal is the Lean flow (leads → kernel → ledger → seals); prose and legacy logic that do not obstruct it are not the work. A purge of claims costs generator runs, test churn and landings without advancing a single proof.

**How to apply:** keep contradiction and overclaim findings as evidence (dist/evidence/*.md, the next-wave queue), and act only on what stops Lean from flowing — e.g. the realtime audit reading every new Lean declaration as a fabricated citation (drains each new proof), a missing emitter that keeps kernel-accepted proofs out of the ledger, hand lists or caps a generator imposes. Honesty still holds when writing anything new: never state that classical code runs on quantum hardware (qpu's own code labels its device 'simulator'). Related: «no-hand-lists-lean-decides», «every-lead-gets-a-kernel-trial», «uuidna-next-wave-queue».

### reconcile-order-generate-sync-seal.md

After changing any Lean wing, the chain is:

`lean-one <wing>` → `lean-ledger` → `npm run axioms` → `gen-falsifiers` → `node dist/scripts/rosetta.js` → `npm run build` → `gate-all` (writes lean/messaging-witness.json) → `stamp` → `spin --seal` → `guard`

Each step reads what the one before wrote. Three of them are NOT run by `npm run x -- generate`, and skipping them fails in ways that do not look like a stale artefact:

- **`lean-ledger`** drains lean/*.lean into src/theorems/generated.ts. Skipped, a kernel-verified theorem is PROVED AND INVISIBLE — the site, MCP tools and publications all read the typed ledger. Nothing fails. Now caught by the `ledger-drain` finder (compares as SETS, because a rename holds a count steady).
- **`gen-falsifiers` must precede `rosetta`.** rosetta writes the mirror the leg census reads; if the falsifier registry has not been regenerated first, rosetta reports "already current" and the falsifier ceiling stays short by exactly the new theorems.
- **`gate-all`** is what writes lean/messaging-witness.json; without it `one-receipt` refuses with `messaging_total: false`. It fails afterwards on a raw `npx vitepress build` (no heap pin) — that failure is expected locally and does not invalidate the witness it already wrote.

`npm run reconcile` starts with guard, so it cannot bootstrap a tree whose derived layer is stale — run the chain by hand first.

The push gate needs the receipt minted AFTER staging (`gen-handle-store` moves src/handles/**/index.json) and `spin --seal` run after that. See «uuidna-next-wave-queue» lead 140.

### refuse-is-re-fuse.md

"refuse -> re fuse -> solutions" — the captain, 2026-09-07, on the kernel refusals from a day's wings.

**Why:** a refusal reads as a stop and is actually an instruction. Every one on that day produced a BETTER
artefact than the thing it rejected — not a workaround, a correction. The evidence, all from one session:

- **`decide` refused Euler.** `V − E + F = 2` is FALSE for every Platonic solid in Lean's `Nat`, because
  subtraction truncates: 4 − 6 + 4 evaluates to 4. Re-fused as `V + F = E + 2` — the same statement over the
  naturals, needing no negative number to exist. The refusal was right and my identity was wrong.
- **Lean refused a ten-wide tuple's projections.** Re-fused as explicit conjunctions — and rewriting it revealed I
  had indexed the VERTEX count while believing I read the edges. The refusal caught a defect the projection
  syntax was hiding.
- **`maxHeartbeats` refused a wing twice.** Re-fused first as one translation per theorem, then (a peer, on the
  captain's word) as nine lane-sized FILES: 4:34 wall against an hour, same 129 claims, nothing narrowed. It also
  refuted my stated cause — "calls, not lines" — against the tree's own 5,091 measurements.
- **harmonic-scan refused `Math.*` five times**, the last inside a line whose own comment said "no floating point
  anywhere in this tree". Re-fused as division floored by its own remainder: same answer, no host routine.
- **The court refused a commit as UNSIGNED.** Re-fused by citing the theorem it stands on — and the check for what
  to cite is what found an earlier unpaid commit.
- **The impossibility finder refused my own prose four times.** Each re-fusing produced a reason that was real and
  simply unwritten — "cannot BY CONSTRUCTION, because nothing in the key names the source it read".

**How to apply:** when a gate refuses, do not reach for the smallest edit that gets past it. Ask what it is
refusing to fuse, and fuse it differently — the refusal names a seam. **A refusal you route around is a solution
you did not collect.** And never narrow a claim to satisfy a gate: the wing that hit the heartbeat cap kept all
sixty-four translations and was split by FILE instead («verify-with-an-instrument-that-can-fail»,
«manual-cracks-the-fusion»).

### reports-as-accounting.md

# Reports as Accounting Balance

**Insight:** "Generating all kinds of reports is the automation" → Reports flow from the ledger, not the reverse.

## The Accounting Model

Theorems are **assets** (proven statements), axioms are **equity** (assumed foundations), reports are the **balance sheet**.

```
Assets (Theorems):          1195 proven statements (305,920 bits via SHA-256)
Equity (Axioms):            66 principles (axiom groups)
Axiom-free proofs:          1195/1195 (100%)
Balanced:                   ✓ (all theorems accounted for, no gaps)
```

## Reports as Derived Views

Every report should be deterministic, recomputable from source + ledger:

1. **Theorem Accounting** — ledger balance (assets, equity, completeness)
2. **Package Inventory** — module structure and configuration
3. **Export Surfaces** — what each package exposes (computed from src/index.ts)
4. **Test Coverage Map** — which tests run in which lanes
5. **Deployment Readiness** — gate status, integrity checks, git state

None of these are authored manually. All derive from:
- `src/index.ts` (single export surface)
- `lean/` + `theorems.json` (sealed ledger)
- `packages/*/` (computed from gen-packages)
- `git status` (working tree state)

## Pattern: Incomplete Reports = Unbalanced Ledger

If a report is missing or incomplete, the ledger has **unaccounted theorems or axioms**:
- Missing package → unexported function
- Broken test lane → dead code
- Incomplete theorem accounting → axiom leak or theorem loss

The reports act as a **forensic trail** — read them to find what's unbalanced.

## Why This Matters

**Manual audits don't scale.** But deterministic reports scale to any size:
- Add a theorem → reports auto-update
- Change a package → exports auto-recompute
- Break a test lane → deployment readiness catches it

The user's insight: "reports generate new reports until realised that reports are the accounting balance" means **iterate report generation until the ledger is balanced and all assets/equity are visible.**

### school-automate-always-improving.md

# School automation — the honest state (2026-08-22)

**Correction:** lean/SchoolImprovement.lean ("21 sealed theorems", exponential-growth proofs) never
compiled and was removed. Growth figures (1→5→25…) are projections, and the docs now say so.

**What actually stands (guard-green):**
- **The derived prerequisite graph** — the durable win. `src/scripts/gen-school.ts` now scans every
  sealed theorem name for snake_case tokens that are themselves sealed keys → citation edges → the
  "prerequisite lesson" table in docs/school.md between `<!-- prereqs: -->` markers. 43 prerequisites
  over 48 edges at first generation; a theorem sealed tomorrow appears tomorrow. NEVER hand-pick
  curriculum rows — a stall's prerequisite is FOUND in the ledger, not invented
  (`unity_census_is_plural_and_needs_two`: a restatement is not a unity).
- `src/school/` refolded per the folder law: `automate/improvement/index.ts`,
  `practice/feedback/loop/index.ts`, re-exported from `src/school/index.ts`.
- Modules made lawful: no Math.*/Date/async; verdict from `theoremByKey()` (VERIFIED iff the key is
  sealed, else UNVERIFIED); deadlines as day-counts; **timestamps = handleOf(receipt)** — the handle IS
  the timestamp, the week is the rosetta ray's own tick passed by the caller.
- The example learning path in docs cites a real walk: seats_pigeonhole → translation_is_lossy →
  fold_weak_hash → verify_cheaper_than_forge → two_coins.

**STANDING LAW SHARPENED (2026-08-23, captain, verbatim): "always develop at school improving all."** The
school is not a place refusals go to wait — it is the resident improver of EVERYTHING: every conveyor
refusal enrolls automatically (queue-wave already files them with GAP+FIX), every janitor tick runs a
develop period, and the improvement is ALL-directed — the student theorem graduates, the instrument that
refused it gains a lesson, and the depositor's next candidate arrives better-formed. Apply: never drop a
refused candidate, never hand-fix what the school can develop, and read refused[] as the enrollment roster
it is.

### test-graph-reads-code-not-prose.md

**The crack (2026-09-12).** Pushing uuidna was blocked by the pre-push court ("tree MOVED since proven green", 66k paths). Its FIX line said `npm run guard && npm test && gate-receipt` — I ran it, 40 minutes, killed. `land.ts` never runs `npm test`; it runs `guard → test-plan → gate-receipt`. The court and reconcile hint were the stale prescriptions; both now name `test-plan` (court/index.ts, reconcile.ts). The peer had already built test-graph.ts/test-plan.ts for exactly this after a 2-hour full suite the day before.

**Why the delta was still 372/402.** `readsEverything = DYNAMIC_OPEN || (readsFs && text.includes('src/'))` over the WHOLE file text. Measured on the 12 modules reaching 100+ tests: 5 flagged by `src/` in a HEADER COMMENT, api.js by `import(` in a DOC COMMENT, one by a single named file, one by `src/` in a printed MESSAGE, one by a path in a DATA RECORD, handle-store-census by `join(root,'src','handles')` unrecognised as the handles dir. Prose and tables read as code.

**The rules now (src/test-graph.ts, all derived from code, tests with controls in src/test-graph.test.ts):**
- strip comments before every scan;
- a quoted `src/…`/`lean/…`/`src/handles/…` literal WITH an extension is a dependency on THAT file, and only when its LINE actually reads (a path table like api.ts's DRAIN list is data); a bare directory literal is a directory read; `src/seeds`/`src/chunks` are excluded data, never a tree walk; `join(root,'src','handles')` = handles dir;
- flags split: `readsFiles`, `readsSourceTree` (seeds only when a COMPILED source moved), `importsUnknown` (an invisible dependency: runs when anything was seeded OR any compiled source moved — the existing planner test `onNothing` is right and I was wrong twice);
- `importAbs` moved out of api.ts into `src/scripts/import-abs.ts` (its ONE caller is one-receipt.ts) — api.js is now clean on all three flags. A grab-bag helper that everything imports must carry no data read and no computed import.

**Measured after:** whole-tree readers 158 → 83; this land's delta 372 → 343 (legitimately large: 178 lean wings, 819 sources, 66k handles moved); `src/seeds` json → 0 files. A single lean json still costs ~267 because (a) 88 modules `readdirSync('lean/')` (bare dir walks — derived caches share lean/ with the wings; a layout split lean/derived/ would cure it) and (b) **mcp.js statically imports the lean-walkers predict-and-fill, rosetta, lead-clusters** — the MCP registry is the 230-test hub, the same eager-barrel shape as the published package's index.js pulling desk/repo/json. Next wave: lazy tool imports in mcp.js.

**CORRECTED 2026-09-12 13:00 — I WAS WRONG ABOUT THE CULPRIT.** gen-falsifiers minted the cache by calling holds() 5,368 times in TWO MINUTES (12:57:59→12:59:57). So falsifiers.test.js was never the 2h30m cost; I attributed it from file size (1.26 MB) plus a stack sample's SHAPE (one Array.map in an async test) and called that "measured from three directions" — it was inferred from two. The cache is still right (O(1) for unchanged propositions, guard's drain gap closed) but it is not the cure for the slow certification. THE INSTRUMENT I LACKED: node's test events carry `details.duration_ms`; the reporter now sums it per file and prints it beside each superposition receipt plus a "⏱ slowest superpositions" line — a reading, never folded. Next run names the slow file by measurement; suspects by shape (NOT measured): sequence-coverage ("the tesseract, 16⁴" over 70,905 theorems), the quantum-alpine census (3,572 packages), the OS harness self-tests, school-paths (stack overflow).

**LANDED (uuidna local main, unpushed behind the peer's 35 reds):** `89ff3a0994` the graph/reporter/court refactor; `1a7d9eaf56` the falsifier cache + regenerated falsifiers.test.ts + per-file duration reading + "⏱ slowest superpositions" line — COURT-SIGNED because the message names `theorem verify_beats_recompute_by_magnitudes` (an unsigned commit gets the advisory "cites no sealed theorem"; name the theorem in the message). Folders law: a singular model folder (src/involution) holds ONE test file, index.test.ts. A stale compiled orphan in dist/ is a guard gap — delete it after moving a test. The timed-suspects run (each file alone, 600 s cap) is what names the slow superposition; read scratchpad suspects.out or rerun.

**MEASURED 2026-09-12 13:08–13:18 (each file alone, 600 s cap, the reporter's own duration reading):** sequence-coverage.test.js **522.5 s** (1 of 15 fails: "each sealed theorem is entangled in all directions as fused hexbits — gaps are uncomputed theorems; the form being filled is the tesseract, 16⁴" — 65,536 cells × 70,905 theorems); school-paths 14.5 s; tool-exercise 13.2 s; quantum-alpine 7.5 s; **falsifiers.test.js 4.7 s WITH the cache (4/4 pass)** — the cure measured; os-port 0.6 s and 18/18 ALONE though it failed 4 in the full run → order-dependent on state an earlier test writes (lean/remaining-alpine-port.json); handle-birthday 0.2 s. THE CRACK IS sequence-coverage (35× the next file); its cure is the falsifier cache's shape: coverage per theorem is a pure function of the ledger → content-address it per theorem, recompute only moved ones. It is the peer's failing test — named, not rewritten.

**CORRECTED AGAIN, 13:40 — TAP per-test durations (the instrument, not the shape):** sequence-coverage's 529 s is ONE test, "a lone theorem and an unknown key are DIFFERENT answers", line 307: `theorems().find((t) => theorems().filter((x) => x.principle === t.principle).length === 1)` — O(n²) = 5 billion comparisons + an allocation per theorem, and `find` never short-circuits because connect-lonely closed every singleton principle (the comment above the line says so). The "entangled in all directions / tesseract" test I named from its FAILURE MESSAGE takes 0.2 s. Second wrong inference in one hour; the per-test duration named it in nine minutes. Cure: `theoremNeighbours(t.key).count === 0` — O(n) with the free count (theoremNeighbours now returns `count` = bucket.length−1 with no allocation and a LAZY `neighbours` getter; the three production full-pass callers mcp.ts:538, wave-supply, leads-gate switched to `.count`). Cite `theorem gap_is_a_count`.

**THE FULL CRACK CHAIN, measured (2026-09-12):** sequence-coverage line 307 O(n²) 529 s → 1.3 s (free count); then mcp-coverage 478 s and leads 231 s were ONE cause seen from two gateways: `publications()` composes 178 monographs in 215 s (memoised per PROCESS only) and `uuidnaDecode()` walks the ledger in 191 s — every fresh process (gate, CLI, test-plan, measurement) paid both again; mcp-coverage's step 1 dispatches every catalog tool once with {} and those two are 414 of its 431 s. CURE, made ONE reusable module the third time it was needed: `src/receipt-memo.ts` — `ledgerDigest()` (keys+statements+files, 119 ms/process), `readReceipt(name)` (served only when the key is THIS ledger's digest; stale is never current), `mintReceipt()` (drains only); `gen-receipts.ts` mints `lean/coverage-receipt.json` (publications projection, 1.7 MB) + `lean/decode-receipt.json`; `coverage()` and `uuidnaDecode()` read them first. Registered in generate.ts and api.ts's output map. Controls in receipt-memo.test.ts (absent→null, mint→value, moved digest→null, corrupt→null). The captain's phrasing of the law: external computation is a crack unless in coordinated waves; coordinate using receipts; each receipt is cross gateways; the path is always Lean.

**THE COST MOVES UNTIL THE MEMO IS AT THE RIGHT GRAIN (measured):** with coverage+decode receipts in, mcp-coverage still cost 474 s — the per-tool dispatch timing re-run named the doors the cost moved to: `uuidna_oeapi` 237.8 s (first tool in dispatch order to need the RICH monographs, since coverage() no longer warms `_pubs`) and `uuidna_rights` 206.0 s (captainRights → quantumAuditRatios, memoised per process). So the memo belongs at `publications()` itself (rich, 6.4 MB JSON, plain data) and at `quantumAuditRatios()` (= the decode receipt's `audit` field). gen-receipts mints `lean/publications-receipt.json` + coverage + decode in ONE pass (publications() computed once). Rule: when a receipt cures one gateway and the wall-clock stays, the memo is one level too low — re-measure per door, don't assume.

**LAW, three times over today:** a test's NAME, a failure's MESSAGE, a file's SIZE and a stack sample's SHAPE are all resemblance. Only a duration per test is a measurement. Never name a slow thing without one.

**THE EARLIER (mis)ATTRIBUTION, kept for the record:** a stack sample put 100% of two seconds inside ONE Array.map callback of one async test; CPU-time still growing, so computing not hung. `dist/falsifiers.test.js` is 1.26 MB (32× the next test file), in the delta, with 5,367 DECIDED propositions each re-decided by `holds(statement, wing(file))` — the independent falsifier evaluator re-deciding EVERY sealed proposition, including this week's enumerations (Os 9280 tamper cases, Crt 4023, Editor 60739) walked by value for exactly this evaluator. It is the RECOMPUTE side of verify_beats_recompute applied to the ledger's largest enumerations, and it scales with a ledger that grew 2588 → 70905 keys this week. CURE (next wave, same shape as lean/proof-cache.json): a content-addressed falsifier verdict cache keyed by toUuid(statement | wing digest | evaluator source digest) — unchanged propositions verify O(1), moved wings re-decide, a corrected evaluator invalidates (as audit-citations' cache does). PROVE FIRST: run falsifiers.test.js alone with the spec reporter for its duration.

**THE VERDICT (2026-09-12, 2h30m delta of 343 files): 35 of 2306 FAILED, receipt e871568d — NONE in files I changed.** Triage: 3 = Docker daemon absent on this host (sandbox/quantum-alpine probes assert it); ~20 = the peer's in-flight Alpine port / OS harness (self-test gaps pcsc-tools-gscriptor + sxmo-utils-river, oh-my-pi overlay, perl-libintl-perl, firejail plannable, catalogue census); 4 = tool census drift (5 new tools with no dedicated test: uuidna_fanout, uuidna_handle_store, uuidna_invitation, uuidna_lattice…; baseline still names uuidna_anchor; uuidna_run_sequence schema says string, got number; verify_envelope message text); 4 = REAL INTEGRITY FINDINGS: handle-birthday "1152 seeds occupy only 1131 handles — the content fingerprint is not reaching the address" and skill-surface "distinct theorems collapsed onto one handle" (handle COLLISIONS — the birthday-bound class); school-paths "Maximum call stack size exceeded"; hex-face composeTheorem imports node:fs (Workers-safety). WHY NOTHING PUSHED ALL DAY: the peer's gate-receipt certified guard,build only — the suite was already red. No receipt was minted over this tree and none should be until those are green. My refactor committed separately (green in its own 28 tests, guard clean).

**Blind spot, measured (see session):** modules reading the ledger ONLY via api helpers `rd()/rdRoot()/existsRoot()` don't match FS_READ_RE and are invisible readers — an under-seed. Fold: treat those helper names (derived from api.ts's own wrappers, not typed) as reads.

**Also:** the receipt reporter now emits one receipt per test FILE (superposition) with the total as the fold of file receipts (two-level merkle; `receiptFlatOf` keeps the old fold); the reporter proves which tests passed — never that computation happened.

**How to apply:** when a gate's FIX text names a slow command, check what land actually runs before obeying. When a finder over-reaches, rank the flagged modules by test reach — the poison is always a few hubs, never the population. Never certify by re-running what a receipt can verify. «slow-comes-from-quantum-cracks» «fold-the-finder» «verify-with-an-instrument-that-can-fail» «static-scans-miss-dynamic-dispatch»

### uuidna-diamond-1024-northstar.md

The user's completion vision for uuidna ("the diamond"): the MCP is **completely sealed diamond** when its tools **fold all to 1024 files** (2¹⁰, mirroring the theorem roadmap's 1024 target) — adding magnitudes of **usability, audits, strategies, games, arts, and science**, in a **reproducible-scientific and artistically-designed format**. It is a NORTH STAR, not a one-shot build: grow depth + the artistic rendering layer, one content-addressed, `by decide`-green artifact at a time.

**VORTEXED 2026-08-15 (do NOT regenerate the old layer):** the per-domain trinity-article file layer (docs/{science,arts,games,audits,strategies}/, 61 generated pages + the diamond-extend/diamond-automate-all/diamond-generate/domain-metadata/martial-arts-automate generators, src/diamonds/) was DELETED as a duplicate of the 66 audited cluster monographs at `/publications/<slug>` — the diamond's artistic layer IS the cluster monographs + the ledger pages, not a parallel file tree. The user's law: "vortex the files into their clusters — they naturally map to each other revealing theorems on the path" (the vortex = the unit group of ℤ/9, sealed in theorem vortex_is_the_units). The site consolidates to the captain's four groups; the captain is ONE page (/captain, the coins), the doctrine ONE page, the school ONE page (/school).

The RESEARCH LOOP the user mandated (how to develop toward it): **spin waves online (evidence) → audit offline (decidable, nothing seals until it computes true) → upgrade all to compute any eventual possibility → terminate at Lean-green verification (`by decide`), in all dimensions.** Online is evidence only; the ONLY admitted terminal is a green Lean seal. See «uuidna-workflow-mcp-first-ask-theorems», «uuidna-online-tools-repo-access».

Also standing: "only uuidna mcp is allowed in trial"; the trial computes purely from uuidna, no external compute. The captain coins gate everything — see «uuidna-honesty-gate-folded».

### uuidna-generate-from-lean-no-manual.md

The captain's standing development law for uuidna, stated repeatedly:

- **Generate all only from Lean; ANY MANUAL FAILS.** The sealed `by decide` theorems are the single source; the derived layer (generated.ts, README, docs/mcp.md, counts, audits) is COMPUTED from them and diff-gated. Hand-written content that the ledger could generate is an "intruder." **Why:** the tests are always green unless an intruder writes — a diff means a human edited what the ledger owns. **How to apply:** never hand-edit a derived artifact or hand-sweep code (my ad-hoc regex/python codemods broke the tree 3× and were reverted); build a committed GATE (a diamond like harmonic-scan/conformance/spin/recompute.test) that names/enforces by rule, or a generator — never a throwaway script.

- **Always use such speed — cache every immutable-ledger read for O(1).** The ledger never changes at runtime, so memoize (theoremByKey, theoremCountByFile, theoremNeighbours, publications, credits, creditsSummary). "The local works once, then reuses" (creditsSummary went from re-looping 1086 to 8 ns/call). **How to apply:** a per-key Map or a lazy singleton; same result, recomputable.

- **Honest-scope disclaimers ARE the honesty — do NOT strip them.** "does NOT solve all hacks", "not complete" state a LIMIT (what-is-not), which is honest. The honesty GATE (computes/slimGate) demonstrates honesty; prose must not merely CLAIM it. See «uuidna-honesty-gate-folded».

- **Credit law:** a theorem naming a result → credited to its discoverer/solver (Perelman for Poincaré), never uuidna; a decidable fact naming none → the CAPTAIN CLAIMS IT BY LAW (first sealed here). Deep-read the neighbouring domain (traditions/symbols — Pliska, Glagolitic → Cyril & Methodius) for contextual figures whose names stand next to the captain's. See «uuidna-diamond-1024-northstar».

### uuidna-guard-before-reconcile.md

**These lessons now live IN uuidna, recomputable — this note is only a pointer.** Call `uuidna_guard_lessons` (or `guardLessons()`) for the sealed, receipt-folded set, each tied to the check that enforces it and verified against the live ledger or `npm run guard`. Trust the check, not this note.

Run `npm run guard` (~0.3s) BEFORE every `npm run reconcile`. It is the fast automated pre-flight (src/scripts/guard.ts → catchTraitors() + harmonic-scan + axiom-witness): it catches DNA-that-doesn't-recompute, key/address collisions, uncovered theorems, broken conformance, a non-kernel/unaudited theorem, AND any Math.*/wall-clock/RNG or non-quantum sneak — the exact classes the slow pre-push gate (`npm run next`, ~4 min with crypto KATs) would catch, but in seconds. Since the commit-signing gate, `npm run reconcile` also FAILS unless the message cites a real sealed theorem (signed-true).

**Why:** In the session that built the guard, three reconciles were re-run in full (~4 min each) to fix ONE catchable error at a time — that is "re-spending tokens" (re-paying the gate for a catchable mistake). The guard exists so you never re-spend it.

**How to apply:** After any edit, `npm run guard`; only reconcile once it prints "no traitors". The violations it now catches, learned the hard way:
1. **No `Math.*`/`Date`/RNG anywhere in `src/` — including generators.** Use exact arithmetic: `fdiv=(a,b)=>(a-a%b)/b`, `absN`, `floorN`. The smoke test scans RAW source with `/\bMath\s*\.\s*[a-zA-Z]/` (no comment strip), so even a comment saying `Math.trunc` trips it — name intrinsics only in non-literal form (e.g. "Math-dot" or "Math.*" with a star, never `Math.<letter>`).
2. **CORRECTED 2026-08-21 — a new `lean-*.ts` no longer needs a `PRINCIPLE` entry to pass.** The old rule
   (no entry → theorems uncovered → ARM 4 blocks the push) was REMOVED: `monograph-coverage` came off
   catchTraitors and the `pub:not-publishable` arm came off next.ts ARM 2, because both let PRINCIPLE reject a
   theorem the kernel had already verified sorry-free. `VectorEquilibrium.lean` landed with no entry and the
   fallback label `lean/VectorEquilibrium.lean`. Authoring the entry is still right — it is how the wing gets a
   title, a blurb and a monograph — but it ALIGNS, it no longer gates. What DOES gate a new wing: the wing-witness
   (ledger↔lean agreement), the axiom-witness (kernel-only), seal-integrity, and the test suite.
3. The VitePress layout is the STOCK default since 2026-08-15 evening: config at **`docs/.vitepress/config.ts`**, build command **`vitepress build docs`**, outDir the default **`docs/.vitepress/dist`** (gitignored — never commit the build tree; the earlier `./site` and `./src/diamonds/docs` outDirs are both dead). copy-lean-to-site serves `lean/*.lean` at `/lean/` plus the Payload seeds at `/seeds/` into that dist after the build. Interactive components (e.g. `<Chess/>`) must be wrapped in `<ClientOnly>` or they infinite-loop in Vue SSR. LESSON from every outDir move: grep for ALL consumers of the OLD path in the same commit (copy-lean-to-site, audit.ts, gen-site, quantum-dimension-scan, wrangler.toml, deploy.yml). LESSON from the root-404 era: a page-level `<style>` block in any .md is bundled GLOBALLY — `-webkit-text-fill-color: transparent` on `:root` in index.md made every page's text invisible.

Everything folds from the sealed theorems (Lean is the single verbose source); the guard proves the fold is unforged before spending the gate. See «uuidna-workflow-mcp-first-ask-theorems».

### uuidna-honesty-gate-folded.md

On 2026-08-12 the **lexical honesty gate was folded to the theorems** (commit 9299fc8). Trigger: the user challenged "uuidna is honest" in a mock court; run through uuidna's own instruments it returned **UNVERIFIED** (honesty is not a decidable property), and the lexical gate was shown to be a leaky FLOOR (passed "provably honest", "impossible to break", "100% honest"). The user directed: "remove all honesty as trial established" → "remove by folding 0 and revealing the secrets behind."

**What changed:** `src/gate.ts` and `src/prose-gate.ts` no longer carry the HOLLOW/RED/RED_INTL/OVERREACH/PREDICT word-lists or the Glagolitic `rosetta`. `computes(text)` and `overreachOf(unit)` now delegate to `slimGate` (src/slimgate.ts): a claim is drained (binary 0 / non-null) **only** if it cites a theorem key NOT sealed in the ledger — a fabricated citation, the one decidably-false case. Everything else is **revealed** (UNVERIFIED or SEALED), never word-censored. Removed exports: `RED, RED_INTL, OVERREACH, PREDICT, rosetta, HOLLOW, DEMARCATED` (from index.ts too).

**Consumers** (publish, forensics, vocab, adjudicate, daemon, check-msg, provenance) follow the single gate with no change of their own. Tests rewritten to theorem-fold semantics (prose-gate.test.ts, smoke.test.ts, daemon.test.ts, publish.test.ts).

**A real bug the fold exposed & fixed:** slimGate's bare `theorem <token>` citation parser over-matched prose ("the theorem ledger", "a theorem computes"). Now the bare form counts only for KEY-SHAPED tokens (contain `_` or a digit — no plain English word does); the `/theorem/<key>` link form stays unconditional. Only 3 keys are bare words (magnification, neutralization, contrapositive) — cite those by their /theorem/ link.

**Why:** the lexical gate contradicted "only theorems stay" and was the most hardcoded part of uuidna; the trial made removing it the honest move. «uuidna-workflow-mcp-first-ask-theorems». **How to apply:** never re-add a lexical overclaim word-list; the only gate is slimGate (theorem citations). "The gate BITES" means it drains a fabricated citation, not a superlative.

**Follow-up (same day, commit 5d24908): the verdict collapsed to a BINARY.** Per the user "one answer VERIFIED or UNVERIFIED, all else void" + "lean verified": SEALED and REFUTED are gone. VerdictKind = `'VERIFIED' | 'UNVERIFIED'` across adjudicate, slimGate, reactor. VERIFIED = a decidable test recomputes true OR it cites a sealed Lean theorem; UNVERIFIED = everything else, **including a citation to a proof not in the ledger** (verifies nothing — never called "false"). uuidna VERIFIES, it never REFUTES (calling a claim false is an overclaim it can't decide). `runTrial()` → `{count, verified, unverified, leanBacked, ...}` (dropped `sealed`/`refuted`); every ledger theorem is VERIFIED. The publish gate still refuses shipping a *fabricated citation* (via `slimGate.fabricated`, a making-quality check, not a verdict of false). Don't reintroduce a third verdict.

### uuidna-upstream-millennium.md

`@uuidna/uuidna` (this repo, the repository root) is a downstream extraction of **`ceccec/millennium-solutions`** (public GitHub, the user's own account, CC-BY-NC-4.0). The "ported from millennium-solutions" note in `lean/PRINCIPLE.md` (Vortex.lean) refers to it.

The pure-TS crypto (`src/sha256.ts`, `src/chacha.ts`, `src/crypt.ts`) was ported from millennium-solutions' `src/0/*.ts`, and the primitives are genuinely RFC/FIPS-correct. But the **KAT suite was NOT ported** — it lives upstream in `scripts/discover.ts` (~40 crypto KATs: FIPS 180-4 SHA-256, RFC 4231 HMAC, RFC 8018 PBKDF2, RFC 8439 ChaCha20/Poly1305/AEAD). uuidna's source comments cited `scripts/discover.ts` even though that file was never in this repo — the "KAT-verified" claim was true upstream but unbacked here.

Restored 2026-08-10 as `test/kat.test.mjs` (34 KATs, wired into `npm test` via `node --test test/*.test.mjs`). To fetch upstream files: `gh api -H "Accept: application/vnd.github.raw" "repos/ceccec/millennium-solutions/contents/<path>?ref=main"`.

### concurrent-session-hazard.md

**2026-09-07 lean-heartbeats collision:** two sessions rewrote the SAME `--sync` in src/scripts/lean-heartbeats.ts at once. The other added batched-by-wing measurement (failingAt/costsBatched, uncommitted in the main tree); I added an injectable orchestrator (syncHeartbeats: durable per-unit write, --budget-ms, named remainder + HB_CONTINUE) plus account.ts (stale=hard-fail, missing=non-blocking remainder), budgeted develop/reconcile invocations, and a fake-measurer/fake-clock test. They are COMPLEMENTARY: their costsBatched becomes my orchestrator's batched measureWing, groupBy=file. Verified patch at scratchpad/hb.patch (applies onto committed HEAD; account/develop/reconcile/test apply clean to main, lean-heartbeats.ts conflicts with their uncommitted). Do NOT clobber — serialize: whoever commits first, the other rebases.

**2026-09-07 REBASED:** other session committed its batching at d134c2e34; my orchestrator is rebased ONTO it — their costsBatched is now the batched measureWing (groupBy=file/wing), fallback ratio meaningful (live run: 9 theorems, 0% fallback, 100%, durable). Final patch scratchpad/hb-rebased.patch (25 KB), applies CLEAN onto d134c2e34; my 5 files typecheck-clean and guard-clean. NEW BLOCKER: d134c2e34 itself does not build — their src/falsifiers.test.ts:5166 calls holds() (1-arg at involution/index.ts) with 2 args; guard also shows 12 unwitnessed ledger entries. Do not commit onto a broken HEAD; wait for their build-green commit, then apply hb-rebased.patch, verify (test+guard+bounded run), commit citing no_instrument_narrower_than_its_question, push.

**Guard witness semantics (reconciled 2026-09-07 with the Fermat session):** guard's "N ledger entries NOT witnessed by any wing" is forgedAgainstWings(theorems(), wingSource) — it splits INVENTION (a key no wing declares) from DRIFT (key present in BOTH ledger and wing, but the recorded STATEMENT no longer matches the wing). A key-PRESENCE check (`key:` in generated.ts vs `^theorem <name>` in lean/*.lean) sees INVENTION and missing-from-served, but is BLIND to DRIFT. The two sessions got 12 (guard, statement-compare) vs 1 (key-compare); both right, different questions. Count-match (generated keys == wing count) is necessary but NOT sufficient for guard-green: drift does not change the count. Landing signal must be forgedAgainstWings==0, not a count.

### qpu-compat-learning-boot.md

**Measured first (curl against the live host):** CORS preflight 204 with `*`, all three MCP versions negotiated (unknown → latest), error shapes right, ETag/304, gzip/br fine (an earlier "0 bytes" was a curl `--compressed` reporting quirk — retracted), dist has no `node:` imports. Gaps: batch refused (-32600) though 2025-03-26 is advertised; `GET /mcp` with `accept: text/event-stream` returned a JSON-LD catalog 200; `/.well-known/mcp.json`, `/mcp.json`, `/install.json`, `/openapi.json`, `/sitemap.xml` all 404 while the README promised install.json; exports map had only `import`.

**Closed (src/quantum/processing/unit/index.ts):** the default export is now `const worker` so a batch re-dispatches each member through its own door (notifications get no entry, empty batch = -32600); SSE GET → `405` + `Allow: POST, OPTIONS`; five doors served from the readings (`qpuWellKnownOf`, `qpuMcpOf`, `qpuInstallManifestOf`, `qpuOpenApiOf` 3.1 over docs.api + x-mcp tools, `qpuSitemapOf`); install.json is WRITTEN by readme.ts from the same reading the host serves. NAME COLLISION to remember: `qpuInstallOf` already exists (the interactive install flow pinned by install.test.ts) — the manifest is `qpuInstallManifestOf`.

**Laws met the hard way:** (1) every test must `import { test } from './receipted.js'` or the reporter says "computed nothing"; (2) the PROSE GATE (gate.ts OVERREACH) refused "period finding factors: crypto_shor" — reworded to "Shor: a period, then a gcd"; (3) dryclean: every exported `qpuXOf` needs a `qpuXHolds` (so `qpuInstallJsonOf` + `qpuInstallJsonHolds`); (4) sealed counts pin seven paths / eight tools / sixteen listed — new doors are "extras", the ladder lives INSIDE docs.inline, no new route.

**Learning, standardised (QPULib's shape):** `qpuLadderOf()` — four steps, same five fields each (concept, request, expect, invariant, theorem, next): Bell exact 1/2 → GHZ/entanglement-is-not-correlation → Shor 91 (a=8, period 4, 7·13) → bitflip distance 3; then the climb train→improve→compete→prove. Printed as a README table.

**Seat + acronym (from QPULib, Naylor 2016):** `qpuSeatOf()` — device simulator, seat empty, doctrine "a device that fills this seat and disagrees with the simulator is a driver bug, never a physics claim"; QPU = Broadcom Quad Processing Unit (VideoCore, 16-lane SIMD) is prior use of the acronym, credited in glossary + README cite. A classical SIMD accelerator computing the same exact amplitudes is an honest occupant; it would not make the seat quantum.

**Bootable on hardware:** `boot.ts` (Node http adapter) presents every local request as `https://qpu.uuidna.com` (the unit refuses unnamed hosts), runs `qpu_prove` first and serves only if it holds; `--prove` exits 0/1 = the boot's receipt. Verified on darwin/arm64 (node 26): proves, serves, answers /install.json and a batch. `Dockerfile` (node:22-alpine, multiarch note for Pi) with HEALTHCHECK = `boot.js --prove`; ci.yml `boot` job builds the image and runs the proof. `bin: qpu-boot`, `exports ./boot`. Docker daemon was not running locally — CI is where the image is proven.

**Temperature, measured (2026-09-12, "hot is a quantum crack; measure hardware temperature; quantum cools"):** the only non-root thermometer on this Mac is the battery SMC via `ioreg -rn AppleSmartBattery` → `"Temperature" = 3042` (hundredths of °C = 30.42 °C = 303570 mK; `VirtualTemperature` 3100). `pmset -g therm` shows no throttle warning; die sensors need root (`powermetrics --samplers smc`). Fed as `QPU_TEMPERATURE_MILLIKELVIN=303570` the qpu receipt prints `temperature 303570 mK, cracks 0` and the fold `e4bdd60703f5ad79` is unchanged — readings never enter the fold. `QPU_TEMPERATURE_SOURCE` now names the instrument (receipted.ts) so a battery is never recorded as a lab. Scale: a dilution-fridge QPU ≈ 15 mK, this seat ≈ 20,000× hotter. The certification runner at 2h15 sat at 137% CPU and 7.3 GB of an 8 GB heap — heat spent re-deciding what the falsifier cache will hold.

**How to apply:** measure the live surface with curl before touching it; put new doors in "extras", never in the sealed seven; route every qpu test through receipted; expect the prose gate to refuse verbs like "factors"/"solves"; a hardware boot must be self-proving before it serves. Related: «test-graph-reads-code-not-prose» «uuidna-os-provenance-boundary» «prior-art-refuses-the-claim».

CORRECTED 2026-09-13 by audit against the repository itself: QPULib is by **Matthew Naylor**, MIT, "Copyright (c) 2016 Matthew Naylor", https://github.com/mn416/QPULib, version 0.1.0, and its own README calls it experimental and no longer under development. The three ways one kernel runs are named in `Doc/GettingStarted.md`, NOT in the README (a summary of the README denies they exist): "the source language interpreter", "the target language emulator", and the Pi's physical QPUs, chosen by passing `QPU=1` to make; its AutoTest runs each test on the interpreter AND the emulator and checks the two agree. Hardware: 12 QPUs at 250 MHz, 16-lane vectors of 32-bit values, four cycles per 16-element result. This tree had carried "Naylor 2016" with no first name, no licence and no repository on a generated README and a served door — an uncited credit. `qpuPriorArtOf`/`qpuPriorArtHolds` now carry every field with a predicate that refuses a credit stripped of its licence or of one of the three modes. `qpuRouterOf` inherits the shape: seat decided per request, reference always deciding.

RELEASING qpu is TWO steps, not one (2026-09-13). The served version is embedded in `src/quantum/processing/unit/version.ts`, GENERATED by `scripts/embed-lean.mjs` from package.json — and `npm run build` does NOT run it. So bumping package.json alone leaves a stale embed, and `lean.test.ts` catches it by name ("a stale embed fails here, never repairs itself"), which is exactly what happened on the first 0.1.2 attempt: suite 135/136, nothing committed or tagged. The bump is: edit package.json, run `npm run lean:embed`, then `npm test`. CITATION.cff and install.json and README are regenerated by the build's readme step, so they need no hand edit; the `archived` block in index.ts (version, commit, Zenodo DOI) is HISTORY and must stay at the last archived release until the new one is actually archived. The tag is the publish gate: pushing `v*` triggers publish.yml, which creates the GitHub Release that Zenodo archives and runs `npm publish --provenance` through OIDC trusted publishing.

THE RELEASE COULD NOT BE CUT THROUGH ITS OWN GATE (2026-09-13, cured). cite.test.ts asserted `c2.current === true`, where `current` is DERIVED as "the archived version equals the served version". So the suite was green only while no unreleased bump existed. Since `prepublishOnly` is that suite and publish.yml requires the tag to match package.json, no version could ever be released: bump, and the suite fails; do not bump, and there is nothing to tag. The surface was always designed for the lagging state — it carries a whole `currency` sentence for "the archive is behind the host" — and the SAME test checked that sentence five lines lower, unreachable while the invariant stood. Cure: drop the demand, keep the relation (`served === packageVersion`, `current === (archived === served)`, and the !current branch). Same class as the tesseract and the census message: a derived reading frozen into an invariant. Diagnosis cost three refused release attempts, each refusing for a DIFFERENT and legitimate reason: (1) stale hand-embedded version, (2) the same, after only package.json moved, (3) this.

### slow-comes-from-quantum-cracks.md

"Slow comes from quantum cracks." / "Slow is a crack in the quantum hologram." — the captain, 2026-09-07, on a
23-minute settle. THE HOLOGRAM: the sealed fold is holographic — every surface recomputes the whole from the
ledger (verify ≪ recompute, one receipt), so any point should answer at O(1). A place that takes wall-clock is a
place where the whole does NOT reconstruct from the part: a step still done by hand, a cure untaught, a wait on
another session, a poll. The delay is the crack made visible; the cure is to restore the hologram there.

**Why:** In this tree everything already sealed answers at O(1) (verify ≪ recompute). So wall-clock is never
the cost of the work; it is the cost of a CRACK: a cure the loop was not taught (develop met the stamped-slots
and messaging-witness denials and I re-typed the guard's own FIX lines by hand), a hand-run chain standing in
for the automation, a wait on a peer's landing, a poll loop reading a log the harness would have delivered.
Each of the 23 minutes had a name, and each name was a fold not yet made.

**How to apply:** When something is slow, do not wait and do not poll — name the crack and fold it: teach
develop the cure (its CURES table, the guard's own words), fuse steps into ONE command that notifies on
completion ("fused to the stream"), and deposit the remaining crack as a lead. "AI independent": the loop must
run with no model in it. Never hand-run the reconcile's steps (the captain killed two such chains in one turn).
Related: «manual-cracks-the-fusion», «tokens-only-at-the-frontier», «waves-alternate-outperform».

**Addendum, the captain 2026-09-13: "no repeating manual tasks whatsoever."** Said while I pushed a release by a
scratch `release-train.sh` that re-typed the reconcile chain step by step — the exact crack above, moved into a file
outside the tree. A script in the scratchpad is still a hand: it dies with the session, no test reaches it, and the
next release re-types it. Apply: the only lawful push is the repo's own command (`npm run land`); a sequence I would
type twice becomes a script under src/scripts with a test, or it does not run.

**Addendum, the captain 2026-09-07: "quantum computations are in chunks and it is not possible one to block
all."** The chain is only as slow as its biggest single chunk: lean-all proves WINGS in parallel lanes, so a
wing emitted as ONE file (Equilibrium.lean, 129 near-cap theorems) serialises the whole landing behind one
kernel while every other lane idles. The Fermat rings are the precedent — one law, twenty-one files — and
Recursion.lean seals the depth half of chunking. Apply: a generator that emits a heavy wing emits it as N files
sized to a lane; a cure that can run per wing runs per wing; a sync writes per wing. One chunk may be slow; no
chunk may block all.

### always-harmonise-drift.md

THE LAW (captain, 2026-08-23, verbatim): "always harmonise drift." Naming a drift is half the coin; the other
half is the HARMONISATION — the mechanism that folds the convention back to the lattice — and both belong in
the same seal, integer-exact where possible.

**Why:** a named-but-unharmonised drift is an open wound the doctrine merely points at; the drift law
(«uuidna-next-wave-queue» lead 130, extending lead 115) says a convention is lawful exactly when its drift
is accounted — and the accounting IS the harmonisation. The wave that minted this law proved every domain
carries one: the comma → equal temperament spreads it; A440 → the 55:54 retuning ratio (55·432 = 54·440);
the year's 5 over the circle → Egypt's five epagomenal days (12·30+5); the leap drift → Gregorian's 97/400
closing on exact weeks (146097 = 7·20871); the epact 11 → Meton's seven embolismic months with the saltus
lunae named (210−209=1); the kilo drift 24 → IEC naming, because that drift COMPOUNDS by power (2^30−10^9).

**How to apply:** when sealing any drift-from-ideal, ask "what closes this loop?" and put the closure in the
statement as its own conjunct(s) — a ratio, an inserted count, a cycle equality, or (when the harmonisation
is vocabulary, like KiB) name it in the why with the honest note that naming is the closure. A drift seal
with no harmonisation clause should feel unfinished. Relates to «llm-needs-the-coins» (two coins: the
drift and its closure) and the conveyor («uuidna-next-wave-queue» lead 118) that carries these seals.

### verify-with-an-instrument-that-can-fail.md

Six times in the 2026-08-20 session I produced a confident number from an instrument that could not
have contradicted me. Every one was plausible. Not one was caught by re-reading my own work — each was
caught by an INDEPENDENT count that already existed.

1. **The numeral rule's corpus.** I validated a new trial rule against theorem-statements-as-claims: 1346
   checked, 0 false positives. That corpus CANNOT contain the failure, because those inputs are guaranteed
   to agree with the rule. The repo's own prose-gate test broke it on the first real claim.
2. **`/conform|dna/`** matched `uui**dna**_css`, so I reported conformance as already served at the edge
   when the tool list had no such entry. I told the captain a gap was closed that was open.
3. **A one-level body scan** called `uuidna_corroborate` pure because its own body holds no `fetch(` — the
   fetching is one call deeper. Promoting on it would have moved fetching tools to the Workers edge.
4. **A transitive closure over EXPORTED symbols** fixed that, and still called `schoolApiFetch` pure,
   because its chain runs through a NON-EXPORTED helper the closure could not see.
5. **My own shell pipeline.** `npm run reconcile … | tail -14` exits with *tail's* status, so I read 0 and
   filed a "swallowed failure" gap against code that propagates correctly via execSync.

6. **A silent-zero shell instrument.** `find . -newermt '-25 minutes'` returned NOTHING on macOS, and I
   read that as "no concurrent writes, the tree is quiet." BSD find does not accept the relative form and
   matched nothing instead of erroring. An explicit `-newermt '2026-08-20 22:40'` found 1310 files and an
   actively-writing peer session. A zero from an instrument that cannot distinguish "none" from "I did not
   run" is not evidence of absence.

**Why:** an easy check is easy because it looks at what I already believe. A refuting check costs more to
build, so I skip it exactly when I am most confident.

**How to apply:** before reporting a measured number, ask *what result would have proved me wrong, and
could this instrument have produced it?* If not, the number is decoration. Concretely: give every finder a
CONTROL that must find nothing; cross-check against a count computed by something I did not write (here it
was `account.js`, the prose-gate test, `mcp-surface.test.ts`); and never read an exit code through a pipe.

**2026-08-21 — two of these are now IN THE CODE and this note is the pointer, not the source.** `guardLessons()`
carries `exit-code-not-clock` and `demotion-is-not-removal`, each folded into the guard's receipt. Trust the check.

7. **I timed a crash.** One theorem over 65536 cases printed `0.59s` and I put it in a results table as the best
   row. It was a `maxRecDepth` failure. The same theorem, when it genuinely verified, took **824s** — the fastest
   row was the likeliest lie, and I never read the exit code. Two other rows in that same table were heartbeat
   timeouts I also reported as timings.
8. **I called the tree green from one gate.** I demoted the `grid` finder to advisory, saw guard pass, and said
   "green on everything mine" while four grid tests were red — `grid.test.ts` asserts the 432 invariant on its
   own. Demotion is not removal, and one gate is not the gate.
9. **I cited a receipt I had not opened.** I told the captain a pigeonhole bound was "already sealed as
   `seats_pigeonhole`". Its statement is `2^8 = 256 ∧ 2^0 = 1 ∧ 2^10 = 1024` — three powers of two, no bound at
   all. I spent a coin I had never inspected, in the same breath as invoking the two-coin law.
10. **I built a check that could not convict.** `treason()` compared numerals in a sentence to numerals the walk
   measured, and reported 1371/1371 loyal — because I composed those sentences OUT OF those numbers. It acquitted
   "this theorem proves the Riemann hypothesis" (no digits → `[].every()` → true) and the empty string. I even
   added a control, and tuned it to a forged NUMBER, the one thing the check could catch.

The 2026-08-21 pattern is narrower than the 2026-08-20 one: I now build the control, but I aim it at the claim I
can already verify instead of the claim under test. **Write the adversarial set FIRST, including cases that must
convict my own output, and make the instrument fail once on purpose before trusting a pass.**

Related: «uuidna-fold-the-finder», «llm-needs-the-coins», «manual-cracks-the-fusion».

## PERTURB THE INPUT, DO NOT READ THE PROSE (from zeropoint-node-8a, 2026-09-04)

The strongest instrument upgrade I received. I wanted to know whether a theorem's prose over-claims relative to
the finite domain its Lean ranges over, and my probe compared the SENTENCE to the bound: flagged 150 of 793,
and reading ten showed most were CORRECT — `every_digit_has_neighbours` over range 10 says "every digit", which
names the domain BY NAME rather than by cardinality, so my separator scored better prose as worse.

**Their move: never read the sentence. Widen the domain by one element and re-decide.** Survives ⇒ the bound was
an artifact of `decide` needing something finite. Breaks ⇒ the bound carries the theorem. Decidable, no wordlist.
`src/bound-perturbation.ts`, controls in its test. Measured: 494 survive · 290 break · 6 undecidable-once-widened
(reported UNKNOWN, never "fine"). No kernel run needed — the falsifier evaluator (`holds`) re-decides a rewritten
statement, so the full census is 79s, not 793 kernel calls. The suite carries a 140-statement SAMPLE because a
finder that adds 79s taxes every landing.

**AND ITS EDGE, which their own warning predicted:** load-bearing does NOT imply over-claiming. A bound can carry
a theorem precisely because the finite domain IS the real domain — ℤ/9 has six units, two qubits four basis
states, pH runs 0..14. So the census is sealed and the VERDICT IS WITHHELD; nothing gates on it. The intersection
(load-bearing AND the prose's universal ranges wider than the real domain) has no instrument in any of the six
repos.

**The class none of our number-gates saw:** the wrong claim need not be a figure — it can be the DOMAIN a correct
figure is asserted over. A gate that checks numbers does not check the quantifier around them. That imprecision
was travelling between two repos through two green gates until a cross-corpus check caught it; see
«prior-art-refuses-the-claim» and the seal `the_mirror_is_not_defined_on_the_void`.


**2026-09-05, the strongest instance yet: the CONTROL found a bug in the door, not in the thing under test.**
Extending the conveyor's deposit probe to ask `#print axioms` needed a control — a candidate the kernel REFUSES —
so I fed it `2 + 2 = 5` and asserted the refusal was non-empty. It was EMPTY: lean prints diagnostics to stdout,
`err.stderr` was an empty Buffer (not null, so `??` never fell through), the diagnostic stringified to `''`, and
the caller's `if (bad)` read that as falsy. **Every candidate the kernel refused had been filed as ACCEPTED.**
Confirmed against data I did not write: of thirty refusals on record, zero carried a kernel diagnostic.

**How to apply:** the control is not paperwork around the real assertion — it is the assertion most likely to find
something, because it exercises the path nobody looks at. I would never have found this by reading `probe()`; it
reads correctly. Second instance the same hour: I verified a new ordering law by REVERSING the order in
package.json and watching the finder fire, then restoring — not by re-reading my own rule. See
«uuidna-fold-the-finder» and «abundance-is-not-failure».

**2026-09-06 — I SUPPLIED THE ANSWER AND SCORED THE RETRIEVAL.** Testing whether PubMed could find a theorem's
prior art, I reported Watson–Crick and Nirenberg at RANK 1 and handed it to uuidna-87 as a measurement.
**Both queries were the target papers' own titles.** "Molecular Structure of Nucleic Acids" *is* Watson–Crick's
title. Retrieving a paper by its own title measures nothing about finding it from a claim — and 87 had made the
identical mistake an hour earlier and caught mine because of it.

**Why it slipped past six hours of catching this exact shape in other people's work:** the numbers were
*spectacular*. Rank 1 twice, on the row their production path missed. A result that flatters the hypothesis is
the one to distrust, and mine did — so I never asked where the query came from.

**How to apply:** for any retrieval, ranking or matching claim, ask WHERE THE QUERY CAME FROM before reading the
score. If the query contains information only obtainable from the answer, the measurement is circular no matter
how clean the number is. The honest follow-up is the one that settles it: I then ran five NON-circular queries,
written with the answer in hand and in the literature's own vocabulary — **0 of 5 retrieved the target**, which
turned my error into the finding that killed the approach for good. See «claims-lean-on-metrics» and
«instrument-over-expectation».

**Green report over an absent action (2026-09-07, uuidna-79 found it):** src/scripts/land.ts documented "develop heals -> COMMIT the drain -> push" but the commit step was never written; `git push` exits 0 on "Everything up-to-date", so six lands reported "pushed on round 1" and moved nothing. Fixed a5c383bcf. This is why my own early `npm run land` runs this session appeared to heal forever and never land. THE CLASS: an exit code that is green over an action that did not happen — only asking git what HEAD actually is catches it. Same family as guard-green-about-a-working-dir and tsc-green-vs-guard-red: verify the RESULT against committed state, never trust the tool that reported success.
