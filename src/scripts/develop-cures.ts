// develop-cures — THE HEAL'S TAUGHT CURES, AND WHICH ONES ONE GATE OUTPUT NAMES, as pure data and pure functions so
// the loop's choice is testable and every runner that heals (develop, land's heal, the autopilot train) reads ONE table.
//
// The loop in develop.ts used to take the FIRST matching cure and rebuild the world before reading the next
// denial in the same output (lead 229: three visible cures cost three four-minute rounds). The selection is now
// every match in table order — most specific first, exactly the order the table is written in — with each
// distinct command run once, because two denials that the same command answers are one cure, not two.
//
// THE TABLE MOVED HERE FROM develop.ts (2026-09-15) because a second runner needed it: the autopilot train runs the
// same cures in the order that converged, and a copy of the table there would be the eighth hand-copy the dry law
// refuses. develop.ts imports it; nothing else holds a cure.
export interface CureRow { name: string; when: RegExp; cmd: string; because: string }

/** curesFor(out, table) → every cure whose signature the output carries, table order, one per distinct command */
export function curesFor<C extends CureRow>(out: string, table: readonly C[]): C[] {
  const hit = table.filter((c) => c.when.test(out))
  return hit.filter((c, i) => hit.findIndex((d) => d.cmd === c.cmd) === i)
}

/** namedGap(out, tail) → the FINDER'S OWN named gap, not the tail of its log.
 *
 *  All three refusal paths in develop used to print `out.split('\n').slice(-8)`. Measured 2026-09-02: guard failed on
 *  a bare modal claim in one comment, and the tail window showed the rosette receipt, the unified fold and the
 *  aura line — guard's closing ceremony — while the actual GAP sat twenty lines above and the report read as
 *  though the fold itself were the objection. A gate that knows the finding and prints something else makes the
 *  next hand re-run it to learn the accusation, which is the cost this whole loop exists to remove.
 *
 *  Guard and the finders emit their findings in a fixed shape (`GAP …` / `FIX …`, under a `✗ <finder>` line), so
 *  those lines ARE the answer. The tail stays as the fallback for a gate that named nothing in that shape — an
 *  output with no named gap is still worth showing, and showing it is not the same as pretending it was named. */
export const namedGap = (out: string, tail: number): string => namedLines(out, tail).join('\n         ')
/** namedLines(out, tail) → the same lines as a list, for a runner that prints them one per GAP */
export const namedLines = (out: string, tail: number): string[] => {
  const lines = out.split('\n').map((l) => l.trimEnd())
  const named = lines.filter((l) => /^\s*(GAP|FIX)\b/.test(l) || /^✗\s/.test(l))
  return named.length ? named : lines.filter((l) => l.trim().length > 0).slice(-tail)
}

// ── THE BUILD GATE COMES BEFORE ANY REGENERATION (taught 2026-09-15, PATCHES §41 and §45). A generated file the type
// checker refuses deadlocks its own regeneration: the build fails, dist stays stale, and lean-one / lean-ledger then
// run the OLD compiled generators — Fluid came back 6 theorems instead of 25, ef58b583's wing unchanged. And a chain
// that went on past a failed build tested the old dist seven times, so fixed looked the same as unfixed. The cure is
// the autopilot's build stage: it bootstraps ONCE with --noEmitOnError false only when every type error sits in a
// file a declared generator owns, regenerates with those owners, and then a normal build must pass on its own.
export const BUILD_GATE: CureRow = {
  name: 'build gate before regeneration', when: /^\S+\.tsx?\(\d+,\d+\): error TS\d+/m,
  cmd: 'node dist/scripts/autopilot.js --stage build',
  because: 'a type error in a generated file deadlocks its own regeneration (the build fails, dist stays stale, the generators that would cure it run as their old compiled selves — measured 2026-09-15: Fluid 6 of 25 theorems); the build stage bootstraps once only when every error sits in a file a declared generator owns, then a normal build must pass — any other type error stops',
}

// ── WING GENERATORS RUN THROUGH lean-one, NEVER DIRECTLY (taught 2026-09-15, PATCHES §41). A wing script run on its own
// WRITES its .lean text and queues the kernel call; only an entry point drains the queue (lean-gen provePending). The
// admission of ef58b583 ran lean-involutions directly and wrote two wings the kernel never proved — generated text
// nobody signed. lean-one is the single-wing entry point that writes AND proves. The domain is appended per wing.
export const WING_STEP: CureRow = {
  name: 'wing generators through lean-one', when: /(?!)/,
  cmd: 'node dist/scripts/lean-one.js',
  because: 'a wing script run directly writes its wing and leaves the kernel call queued — measured 2026-09-15, direct lean-involutions wrote two wings and proved neither; lean-one is the entry point that drains the queue, so a wing is regenerated and signed in one step',
}

/** The objections this pass can cure: each signature as the gate prints it, and the deterministic command that fixes it.
 *
 *  ORDER IS LOAD-BEARING — most specific first, and matches run in table order (every match, once each, per round).
 *  Learned on develop's very first real run: a spin objection NAMES the files that moved, so a filename cure
 *  (regenerate support-audit.json) matched before the spin cure (reconcile, which re-derives AND re-seals) and "cured"
 *  the wrong thing twice. A drift of the SEAL is never cured by regenerating one of its files.
 *
 *  AND THE LEDGER'S DEPENDENTS RUN BEFORE THE SEAL (2026-09-15, landings 2 and 3): the rows from 'proved wings not yet
 *  served' down to 'court record stale' sit ABOVE the spin cure because each writes a file spin seals — HEAL_ORDER below
 *  is the measured order, and the table keeps it. */
export const CURES: CureRow[] = [
  BUILD_GATE,
  // BEFORE the axiom witness: a new theorem can be witnessed only once the served ledger names it.
  { name: 'proved wings not yet served', when: /PROVED in lean\/ and absent from the served ledger|NOT witnessed by any wing/,
    cmd: 'node dist/scripts/lean-ledger.js && npm run build',
    because: 'the served ledger is generated from lean/, so a merge that brings proved wings, or changes a wing\'s statements, leaves src/theorems/generated.ts naming the previous set — the kernel-proved work is invisible to the site, the MCP tools and the publications, and entries the wings no longer state linger unwitnessed. The guard\'s own FIX is this regeneration and the rebuild that compiles it. Taught 2026-09-14, after a merge of seven waves stopped land here on exactly these two objections' },
  { name: 'axiom witness stale', when: /AXIOM WITNESS STALE|kernel-only-witness-shipped/,
    cmd: 'npm run axioms',
    because: 'a new theorem has no kernel-only witness yet; the audit regenerates them in one probe per file' },
  // Moved ABOVE the court (2026-09-15, landing 3): "heartbeats missing" came first in the objection sequence, and
  // `lean-heartbeats --sync` read 70998/70998 current the moment it ran — the objection was the heal's check order.
  { name: 'heartbeats missing', when: /heartbeats cover the ledger|MISSING \d+: [a-z_]/,
    cmd: 'node dist/scripts/lean-heartbeats.js --sync',
    because: 'the delta mode measures only the new keys — NOT --all, which spawns a kernel per theorem and burned ninety minutes once' },
  // TWO DENIALS THE LOOP MET AND COULD NOT ANSWER (2026-09-07, the render-budget landing): a new wing moved the
  // ledger's distinct count, and the guard's exact FIX lines were re-typed by hand three times before the table
  // learned them. Both cures are the guard's own words; neither invents anything.
  { name: 'stamped ledger slots stale', when: /carries stamped ledger slot\(s\)/,
    cmd: 'node dist/scripts/stamp.js',
    because: 'the slots are generated from the live census, so the surface is corrected by recomputing it, never by editing the number' },
  { name: 'messaging witness short of the ledger', when: /"messaging_total":false/,
    cmd: 'node dist/scripts/one-receipt.js messaging',
    because: 'lean/messaging-witness.json must cover the current ledger — every carrier round-trips byte-exact — or the one-receipt seal is refused' },
  // Taught 2026-09-14: the witness seal moved from one subject to a theorem per face (receipts signed by 2×7 theorems),
  // and land stopped four rounds on the court record the guard's own FIX recomputes.
  // AND IT RUNS BEFORE THE SPIN CURE (2026-09-15, PATCHES §40–§44): lean/refusal-trials.json is in spin's sealed set,
  // so a court cure drifts spin BY DESIGN. With the spin cure first in the table, land2 and land3 each spent six rounds
  // alternating "derived layer drift (spin)" ↔ "court record stale" and pushed nothing; and reconcile --derive-only
  // runs the guard as its precondition, so while the court is stale the spin cure stops at its first step, by construction.
  { name: 'court record stale', when: /lean\/refusal-trials\.json is not what the court computes now/,
    cmd: 'node dist/scripts/trial-refusals.js',
    because: 'the record is recomputed from the leads, the ledger and the kernel\'s receipts, never edited — any change to those inputs, or to the court\'s own seal, leaves it naming the previous verdicts; it runs before the spin reseal because the record is one of the files spin seals (measured 2026-09-15: six rounds of court ↔ spin alternation in each of two landings with the order reversed)' },
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
  // ANCHORED TO A DENIAL LINE (2026-09-07): the bare signature matched the guard's own CLEAN line — "gen-packages …
  // packages receipt c047c416" — so this cure fired on every green guard, and a round whose only other gap was
  // untaught reported "did not cure" against a cure that had nothing to cure. A signature is a denial, never a word.
  { name: 'package surface drift', when: /(?:✗|GAP)[^\n]*(?:packages? (?:receipt|surface)|gen:packages)/,
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
export const NO_CURE: { when: RegExp; why: string }[] = [
  // (the changelog-missing-version class moved OUT of NO_CURE on 2026-08-17 — see CURES: the calendar now emits a
  // factual section, and only the MEANING is still owed to a human. A statistic is not a story.)
  { when: /below the floor of \d+|floor may only rise/,
    why: 'a five-leg census came back BELOW the floor it published, and the two causes are indistinguishable from the message alone: either the mirror is stale (mechanical) or a claim genuinely lost its external anchor (not). Re-running the census cannot decide between them — rosetta REFUSES to write a fallen floor, so the cure would fail identically in both cases and teach nothing. This happened on 2026-08-20: the witness leg read 9 to 0 and nothing had lost an anchor at all — the reader had stopped looking, because the prose moved into Lean doc comments and commentAbove still scanned only `--` lines. A pass that re-ran the census would have retried forever; a person read the message and found the reader. The refusal to auto-cure is what surfaced it' },
  { when: /overclaim|fabricated|does not compute/,
    why: 'the honesty gate refused a claim — fix the claim at its source; a pass that silences this would be the fraud it exists to catch' },
]

// ── THE ORDER THAT CONVERGED (2026-09-15, the autopilot's fixed point). Each cure writes an input of the ones after it:
// the wings feed the served ledger; the ledger feeds the axiom witness, the heartbeats, the stamped slots and the
// messaging witness; all of those feed the court's record; and the court's record is one of the files spin seals.
// Land 2 and land 3 ran the same cures in the table's old order (spin first) and alternated six rounds each; run in
// this order, the chain reaches a tree the guard, spin --verify and the court all accept.
export const HEAL_ORDER: readonly { cure: string; because: string }[] = [
  { cure: WING_STEP.name, because: 'the wing texts are the ledger\'s source; a generator that changed since the last landing is re-run and PROVED before anything reads its wing (§41: a wing written and not proved is text nobody signed)' },
  { cure: 'proved wings not yet served', because: 'the served ledger is generated from the proved wings, and the rebuild makes the generators after it read the new ledger (§41: a stale dist runs the old generators)' },
  { cure: 'axiom witness stale', because: 'the witness must cover the ledger just served, or security-posture fails and every audited call in that window reads a law down (§34: 46 calls at 1642–1687)' },
  { cure: 'heartbeats missing', because: 'heartbeats cover the ledger\'s keys; the delta sync reads the new ledger (§42: the objection was the check order, the cure worked at once)' },
  { cure: 'stamped ledger slots stale', because: 'stamped surfaces carry the live census, which moved with the ledger' },
  { cure: 'messaging witness short of the ledger', because: 'every carrier of the current ledger must round-trip before the seal' },
  { cure: 'court record stale', because: 'the court reads the ledger, lean/axioms.json and the witness seals — every cure above writes one of them — and its record is sealed by spin (§44), so it is recomputed after them and before the seal' },
  { cure: 'derived layer drift (spin)', because: 'the seal is LAST: it fingerprints every derived file, so any write after it drifts it (§40–§44: six rounds of court ↔ spin in each of two landings when the seal ran first). Its cure is a full reconcile, and reconcile now computes the court record as its own last derivation, just before its seal (§46: a court refresh followed by a re-derivation that did not recompute the court left it stale, aab15809 ≠ 1bdb8d24) — so derive, court and seal happen together and cannot alternate' },
]

/** a cure that is not in HEAL_ORDER still writes derived files, so after it the tail from here is re-run — the court's
 *  record and the spin seal, the two files every derived write moves */
export const RESEAL_FROM = 'court record stale'

/** healPlan(order, rows) → the HEAL_ORDER entries resolved to their cure rows, in order — a name that resolves to no
 *  row THROWS, because an order naming a cure nobody taught is a plan that silently skips a step */
export function healPlan(order: readonly { cure: string; because: string }[], rows: readonly CureRow[]): (CureRow & { order: string })[] {
  return order.map((o) => {
    const row = rows.find((r) => r.name === o.cure)
    if (!row) throw new Error(`develop-cures: HEAL_ORDER names "${o.cure}", which no cure row carries`)
    return { ...row, order: o.because }
  })
}
