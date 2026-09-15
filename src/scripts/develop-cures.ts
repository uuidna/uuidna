// develop-cures — THE TAUGHT CURES AND THE CHOICE AMONG THEM, as pure data and pure functions so the loop is testable.
//
// The loop in develop.ts used to take the FIRST matching cure and rebuild the world before reading the next
// denial in the same output (lead 229: three visible cures cost three four-minute rounds). The selection is now
// every match in table order — most specific first, exactly the order the table is written in — with each
// distinct command run once, because two denials that the same command answers are one cure, not two.
//
// THE TABLES LIVE HERE, not in develop.ts, because develop.ts runs its loop on import: a test that reads the
// real table through develop.ts would start a landing. The tables are data, so a test holds each signature
// against the output that summons it and against the near miss that must not.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, RECONCILE_OUTPUTS } from './api.js'

/** A command that is known only once the objection is read: it returns the command, or null when the output
 *  names something no deterministic command answers (that denial then stays the human's). */
export type CmdOf = (out: string) => string | null
/** An objection this pass can cure: its signature in the gate's own output, and the deterministic command that
 *  fixes it. `alone` marks a cure whose command re-derives everything the other matches would regenerate. */
export interface CureRow { name: string; when: RegExp; cmd: string | CmdOf; because: string; alone?: boolean }
export type Resolved<C extends CureRow> = Omit<C, 'cmd'> & { cmd: string }

/** denialLines(out) → the lines a gate DENIES with: `✗ …`, `GAP …`, `FIX …`. Every other line is evidence the
 *  gate quotes — a moved JSON field, a theorem key, a path — and a word inside evidence is not a denial. The whole
 *  output is the fallback for a gate that marked nothing, so an unmarked refusal is still read. */
export function denialLines(out: string): string {
  const marked = out.split('\n').filter((l) => /^\s*(?:GAP|FIX)\b/.test(l) || /^\s*✗\s/.test(l))
  return marked.length ? marked.join('\n') : out
}

// ── THE GENERATED PAGE AND ITS WRITER. A bare negation on a GENERATED page is fixed at the generator's source, and
// the guard that reads the page before the generator re-runs reads the previous generation. The owner of a path is
// read from RECONCILE_OUTPUTS, the one declaration of what each chain generator writes, so a page this map omits is
// a page no generator declares — hand-written, and the author's to answer.
/** generatorsOf(path) → every reconcile generator that declares it writes `path` (exactly, or as a directory). */
export function generatorsOf(path: string, outputs: Readonly<Record<string, readonly string[]>> = RECONCILE_OUTPUTS): string[] {
  return Object.entries(outputs).filter(([, outs]) => outs.some((o) => o === path || path.startsWith(o + '/'))).map(([g]) => g)
}

const BARE = /GAP (docs\/[^\s:]+\.md): the boundary "[^"\n]*" is stated bare/g

/** barePages(out) → every docs page the negation finder named, once each, in the order named */
export function barePages(out: string): string[] {
  return [...new Set([...out.matchAll(BARE)].map((m) => m[1]!))]
}

/** regenerateBarePages(out) → the generators of every page named, then the negation finder asked again; null when
 *  any page named has no declared, compiled generator — a hand-written page is fixed by its author, never here. */
export const regenerateBarePages = (out: string, root: string = ROOT): string | null => {
  const pages = barePages(out)
  if (!pages.length) return null
  const gens: string[] = []
  for (const page of pages) {
    const owners = generatorsOf(page).filter((g) => existsSync(join(root, 'dist', 'scripts', `${g}.js`)))
    if (!owners.length) return null
    for (const g of owners) if (!gens.includes(g)) gens.push(g)
  }
  return [...gens.map((g) => `node dist/scripts/${g}.js`), 'node dist/scripts/one-receipt.js negation'].join(' && ')
}

// ORDER IS LOAD-BEARING — most specific first, because matches run in table order (every match, once each, per round). Learned on this pass's very first real
// run: a spin objection NAMES the files that moved, so a filename cure (regenerate support-audit.json) matched before
// the spin cure (reconcile, which re-derives AND re-seals) and "cured" the wrong thing twice; the run converged only
// because the guard happens to re-seal the fold. A drift of the SEAL is never cured by regenerating one of its files.
export const CURES: CureRow[] = [
  { name: 'derived layer drift (spin)', when: /✗ spin --verify — NON-QUANTUM DRIFT|Spin hard-rejects drift/,
    // --derive-only, NOT plain reconcile. Plain reconcile ends by committing AND PUSHING to origin, so this cure
    // made a routine self-heal an outward act — the pass built to keep the gate green unattended could not safely
    // be run unattended, which is why the same sequence was being hand-run instead. The flag stops after the seal:
    // re-derive and re-seal locally, publish never. Publishing stays a separate, deliberate command.
    // THE RE-ASK IS PART OF THE CURE: a drift that survives the re-derive fails the cure on a tree no one else is
    // writing, and develop hands it to a human rather than walking the same re-derive again.
    // ALONE: the objection names every drifted file, so the filename cures below also match it; each of those
    // regenerates one file the re-derive already wrote, and one that runs after the seal can move the seal again.
    cmd: 'node dist/scripts/reconcile.js --derive-only && node dist/scripts/spin.js --verify',
    alone: true,
    because: 'the derived files moved since the last seal; only the full re-derivation re-seals them (regenerating one named file leaves the seal stale) — and the cure stops at the seal, because healing must not publish. Spin is asked again at once: a drift the re-derive leaves is not drift, and it is the human\'s' },
  { name: 'changelog section missing', when: /CHANGELOG\.md does not mention version/,
    cmd: 'node dist/scripts/gen-changelog-section.js',
    because: 'the calendar ticks the odometer on its own, so the FACTS of a version (counts, receipts, the odometer step, the surfaces) are emitted from the ledger; the narrative is still never generated — the section says the meaning is owed, and a human completing it is finishing the entry' },
  { name: 'rosetta mirror stale', when: /hosted edge would answer from a stale census/,
    cmd: 'node dist/scripts/rosetta.js && npm run build',
    because: 'the five-leg census is recomputed from the ledger and shipped to the hosted edge as src/rosetta-mirror.ts, so ANY change to the ledger leaves the edge answering from the previous generation — the test that catches it prints exactly this command. The rebuild is part of the cure and not an afterthought: rewriting the mirror source without compiling it leaves dist/ carrying the stale census, which is the same fault one step further along. Taught 2026-08-20, after a session where this objection came back three times and was hand-run each time. DELIBERATELY NARROW: the signature matches only the STALE-MIRROR face— see NO_CURE' },
  // BEFORE the axiom witness: a new theorem can be witnessed only once the served ledger names it.
  { name: 'proved wings not yet served', when: /PROVED in lean\/ and absent from the served ledger|NOT witnessed by any wing/,
    cmd: 'node dist/scripts/lean-ledger.js && npm run build && npm run axioms',
    because: 'the served ledger is generated from lean/, so a merge that brings proved wings, or changes a wing\'s statements, leaves src/theorems/generated.ts naming the previous set — the kernel-proved work is invisible to the site, the MCP tools and the publications, and entries the wings no longer state linger unwitnessed. The guard\'s own FIX is this regeneration and the rebuild that compiles it. Taught 2026-09-14, after a merge of seven waves stopped land here on exactly these two objections. The witness runs in the same command: a ledger that names theorems the kernel-only witness does not cover fails the security-posture law for every call made until the witness catches up (audit seq 3705–3707, 2026-09-15), so the heal no longer re-guards between the two. It shrinks the window to this one command; it does not close it — that needs lean-ledger to write the witness for the rows it seals' },
  { name: 'axiom witness stale', when: /AXIOM WITNESS STALE|kernel-only-witness-shipped/,
    cmd: 'npm run axioms',
    because: 'a new theorem has no kernel-only witness yet; the audit regenerates them in one probe per file' },
  // TWO DENIALS THE LOOP MET AND COULD NOT ANSWER (2026-09-07, the render-budget landing): a new wing moved the
  // ledger's distinct count, and the guard's exact FIX lines were re-typed by hand three times before the table
  // learned them. Both cures are the guard's own words; neither invents anything.
  { name: 'stamped ledger slots stale', when: /carries stamped ledger slot\(s\)/,
    cmd: 'node dist/scripts/stamp.js',
    because: 'the slots are generated from the live census, so the surface is corrected by recomputing it, never by editing the number' },
  // Taught 2026-09-14: the witness seal moved from one subject to a theorem per face (receipts signed by 2×7 theorems),
  // and land stopped four rounds on the court record the guard's own FIX recomputes. Two spellings, one record: the
  // guard's leads finder names the file, the leads gate names "the trial record" — both are a seal that differs.
  { name: 'court record stale', when: /(?:lean\/refusal-trials\.json|the trial record) is not what the court computes now/,
    cmd: 'node dist/scripts/trial-refusals.js',
    because: 'the record is recomputed from the leads, the ledger and the kernel\'s receipts, never edited — any change to those inputs, or to the court\'s own seal, leaves it naming the previous verdicts' },
  // A BARE NEGATION ON A GENERATED PAGE (taught 2026-09-15): the source was fixed and the guard read the page the
  // previous generation wrote, so the landing stopped on words nobody had left in the tree. The page's own
  // generator re-runs, then the negation finder is asked again; a page no generator declares stays the author's.
  { name: 'generated page states a boundary bare', when: /GAP docs\/[^\s:]+\.md: the boundary "[^"\n]*" is stated bare/,
    cmd: regenerateBarePages,
    because: 'the page is generated, so its words are its generator\'s: re-running the writer RECONCILE_OUTPUTS declares for it carries the fixed source onto the page, and the finder asked again says whether the source was fixed at all — a negation that survives regeneration is in the source, and the author\'s' },
  { name: 'messaging witness short of the ledger', when: /"messaging_total":false/,
    cmd: 'node dist/scripts/one-receipt.js messaging',
    because: 'lean/messaging-witness.json must cover the current ledger — every carrier round-trips byte-exact — or the one-receipt seal is refused' },
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

/** Objections that are deliberately NOT cured here — each needs a human, and saying so is the honest answer.
 *  READ AGAINST THE DENIAL LINES ONLY (2026-09-15): spin names each drifted JSON file's moved fields, and
 *  audit-citations.json keys every entry `fabricated` while lean/axioms.json names theorems like
 *  `fabricated_cite_stays_unverified` — so any drift in either read as an honesty refusal and stopped the landing
 *  "for a human" before the taught re-derive was consulted. A word the gate quotes as evidence is not its verdict. */
export const NO_CURE: { when: RegExp; why: string }[] = [
  // (the changelog-missing-version class moved OUT of NO_CURE on 2026-08-17 — see CURES: the calendar now emits a
  // factual section, and only the MEANING is still owed to a human. A statistic is not a story.)
  { when: /below the floor of \d+|floor may only rise/,
    why: 'a five-leg census came back BELOW the floor it published, and the two causes are indistinguishable from the message alone: either the mirror is stale (mechanical) or a claim genuinely lost its external anchor (not). Re-running the census cannot decide between them — rosetta REFUSES to write a fallen floor, so the cure would fail identically in both cases and teach nothing. This happened on 2026-08-20: the witness leg read 9 to 0 and nothing had lost an anchor at all — the reader had stopped looking, because the prose moved into Lean doc comments and commentAbove still scanned only `--` lines. A pass that re-ran the census would have retried forever; a person read the message and found the reader. The refusal to auto-cure is what surfaced it' },
  { when: /overclaim|fabricated|does not compute/,
    why: 'the honesty gate refused a claim — fix the claim at its source; a pass that silences this would be the fraud it exists to catch' },
]

/** curesFor(out, table) → every cure whose signature the output carries, table order, one per distinct command.
 *  A cure whose command is read from the output and comes back null is not a cure for this output. A matching
 *  `alone` cure answers by itself, because its command already writes what the others would. */
export function curesFor<C extends CureRow>(out: string, table: readonly C[]): Resolved<C>[] {
  const hit: Resolved<C>[] = []
  for (const c of table) {
    if (!c.when.test(out)) continue
    const cmd = typeof c.cmd === 'string' ? c.cmd : c.cmd(out)
    if (cmd !== null) hit.push({ ...c, cmd })
  }
  const solo = hit.find((c) => c.alone)
  const pick = solo ? [solo] : hit
  return pick.filter((c, i) => pick.findIndex((d) => d.cmd === c.cmd) === i)
}

/** verdictOf(out) → what develop does with one gate's objection: a human's (NO_CURE, read on the denial lines),
 *  the taught cures it names, or untaught — the three answers, in the order develop asks them. */
export function verdictOf(out: string, table: readonly CureRow[] = CURES, blocked: readonly { when: RegExp; why: string }[] = NO_CURE):
  { kind: 'blocked'; why: string } | { kind: 'cures'; cures: Resolved<CureRow>[] } | { kind: 'untaught' } {
  const denial = denialLines(out)
  const human = blocked.find((n) => n.when.test(denial))
  if (human) return { kind: 'blocked', why: human.why }
  const cures = curesFor(out, table)
  return cures.length ? { kind: 'cures', cures } : { kind: 'untaught' }
}
