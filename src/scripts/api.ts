// api — THE SCRIPTS' QUANTUM API, declared once. 125 scripts each re-declared the same boilerplate (ROOT
// resolution, file reads, the 16-hex fold, the GAP+FIX reporter); this module is the singularity they all import
// from — standardisation and DRY use of one api, so a script is only its own logic. The `one-receipt dry` finder
// objects (GAP + exact FIX) to any script that re-declares what lives here — the duplication class cannot regrow.
// os/host is a static import and safe as one: it declares no top-level side effect and reaches its builtins through
// the same lazy registry this file does, so bundling it costs the edge nothing it does not already carry.
import { shellOrExit } from '../os/host/index.js'
import { laneOf } from '../handle.js'   // THE one derivation — see handle.ts
const cryptom = (): typeof import('node:crypto') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:crypto') as typeof import('node:crypto') // lazy: the edge bundles this module but never calls it
const cpm = (): typeof import('node:child_process') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:child_process') as typeof import('node:child_process') // lazy: the edge bundles this module but never calls it
// node:fs rides LAZILY through the runtime's own registry (the mcp.ts:38 law, sync form): a top-level
// import rides every bundle that reaches this module, and the edge worker has no filesystem.
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')
const pathm = (): typeof import('node:path') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:path') as typeof import('node:path') // lazy: the edge bundles this module but never calls it
const urlm = (): typeof import('node:url') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:url') as typeof import('node:url') // lazy: the edge bundles this module but never calls it

/** the scripts directory (dist/scripts at runtime) — every script lives here, so one HERE serves all */
// the edge bundles this module but never walks a filesystem: on a runtime without the builtin registry the
// anchors resolve to '/', and every function that would read from them stays uncalled there by construction
const hasNodeRegistry = typeof (globalThis as { process?: { getBuiltinModule?: unknown } }).process?.getBuiltinModule === 'function'
export const HERE = hasNodeRegistry ? pathm().dirname(urlm().fileURLToPath(import.meta.url)) : '/'
/** the repo root */
export const ROOT = hasNodeRegistry ? pathm().join(HERE, '..', '..') : '/'

// ── THE ONE LEAN PARSE. Reading a theorem out of a .lean file was written twice — the ledger builder and the prose
// census each carried a character-identical regex — and the two agreed only because nobody had yet edited one. The
// parse is subtle enough that a divergence would be silent: the lookahead must stop a tactic at the NEXT
// declaration, and `/--` must be tested BEFORE `--` (a doc comment opens with a slash, and the alternation is
// ordered), or every wing's tactic swallows the next theorem's prose. The doc capture may not contain `-/`, so a
// match cannot stretch from one comment's opening to a later comment's close — without that guard the lazy form
// backtracks across the whole file and every theorem inherits the FIRST theorem's sentence. One declaration; a
// third copy is what `one-receipt dry` exists to refuse.
export interface LeanDecl { key: string; statement: string; tactic: string; doc: string }
const LEAN_DOC = /\/--((?:(?!-\/)[\s\S])*?)-\/\s*$/
const LEAN_THEOREM = /theorem\s+(\w+)\s*:([\s\S]*?):=\s*by([\s\S]*?)(?=\n(?:\/--|--|theorem|def|namespace|end|$))/g

/** every `theorem k : s := by t` in a Lean file, each with the doc comment immediately above it ('' when bare) */
export function leanDecls(text: string): LeanDecl[] {
  return [...text.matchAll(LEAN_THEOREM)].map((m) => {
    const doc = LEAN_DOC.exec(text.slice(0, m.index))
    return {
      key: m[1]!,
      statement: m[2]!.trim().replace(/\s+/g, ' '),
      tactic: m[3]!.trim().replace(/\s+/g, ' '),
      doc: doc ? doc[1]!.trim().replace(/\s+/g, ' ').replace(/-\\\//g, '-/') : '',
    }
  })
}

// ── USE VERSUS MENTION — THE LAW EVERY RAW-SOURCE CHECK MEETS. A finder that greps source reads words rather than roles, so it reads alike a line that
// DOES a thing from a line that TALKS ABOUT it. This bit four separate checks in one session (2026-08-19), in two
// opposite directions, and both are now named so the fifth is recognised rather than rediscovered:
//
//   FALSE POSITIVE — the check flags the comment explaining it. The determinism scan flagged a comment saying the
//     builtin maths helper had been avoided; the sources finder flagged a comment saying an observation verb was
//     deliberately not used; the comments finder flagged its own documentation for using a literal count as the
//     example. THERE IS NO STRUCTURAL FIX: if a token is banned, it is banned in prose too. The convention is to
//     describe the forbidden thing IN WORDS and never write its literal form — which is why several comments in
//     this tree name a helper or an extension descriptively rather than exactly.
//
//   FALSE NEGATIVE — the file satisfies the check BY TALKING ABOUT ITSELF. A script documented its own usage with
//     its compiled name, and the dormancy check read that comment as proof something ran it; any dormant script
//     could have hidden the same way. THIS ONE IS STRUCTURAL, and selfExcluded() below is the fix.
//
// The general rule, from which both follow: EVIDENCE MUST COME FROM SOMEWHERE ELSE. A file is never its own
// witness, and a check is never satisfied by the sentence describing it.
//
//   THE THIRD CASE, AND ITS REMEDY (2026-08-25). "There is no structural fix" above is true of a BANNED-TOKEN
//   scan — if a token is forbidden, it is forbidden in prose, and the only cure is to describe it in words. It is
//   NOT true of a scan that COUNTS or CITES, and reading it as general cost five sessions seven separate hours in
//   one day. A counting scan has an anchor available, because an instance carries syntax a mention lacks:
//
//     grep -c 'key:'        1691   ← matches `export interface LeanTheorem { key: string; … }`, the DECLARATION
//     grep -c 'key: "'      1690   ← a string-literal value appears only in a value position
//     grep -c '^  { key:'   1690   ← an indentation and a brace prose produces only on purpose
//
//   One too many, and one high is worse than wildly wrong: it survives review because it looks approximately
//   correct, and an operator checking themselves against it confirms the error. The same shape hit a citation
//   scan matching the words after "theorem" in ordinary prose, a deadkey finder reading a comment that documented
//   purged keys as citations of them, and — twice — the notes explaining a ban by writing the banned token.
//
//   SO THE RULE, stated with its remedy rather than as an observation: A SCANNER THAT READS SOURCE READS WORDS, NOT ROLES, SO IT MUST
//   DISTINGUISH A CITATION FROM A MENTION OF ONE. Every finder over prose therefore needs EITHER a structural
//   anchor prose produces only on purpose — a line start, an indent, a brace, a quote that only a value
//   carries — OR an explicit exemption at the point of mention. Reach for the anchor first: an exemption is a
//   list, and a list is the thing that goes stale. Where neither is possible the scan is a banned-token scan
//   after all, and the convention above applies.

// ── FALSIFIABILITY — AN AUDIT THAT CANNOT FAIL IS NOT AN AUDIT. The ledger already refuses a THEOREM that is
// true regardless of its content (vacuousGaps: x = x, P ∨ ¬P). The same disease reaches running code, where it is
// harder to see because the result is a green boolean rather than a trivial statement. Met 2026-08-19 in
// domain-wave: its per-wing audit reported `orderInvariant` by comparing a fold against the fold of the reversed
// input — but merkleFold SORTS its leaves, so the comparison is true for every input. It reported 72/72 across
// every wing, and the number was unearnable. Checked over 492 permutations across sizes 0..40: never false.
//
// THE LAW: every audit ships with the mutation that breaks it. If no input makes the check say no, the check is
// measuring the shape of its own implementation— and it will report success
// forever, including on the day the thing it guards is broken.
//
// This is undecidable statically in general: knowing how to mutate an input is domain knowledge.
// So it is a discipline with a tool rather than a finder — falsify() below makes the mutation case uniform and
// cheap enough that omitting it is a choice rather than an oversight. Compare the recompute audit that replaced
// the vacuous one: an address is toUuid(key + ':' + statement), so tampering with either must break it, and
// domain-wave.test.ts asserts exactly that.

/** Run a check against its subject AND against mutations that MUST break it. Returns whether the check holds on
 *  the real subject, and which mutations it FAILED to catch — a falsifiable check catches every one. Pure: no
 *  assertions, no I/O, so callers assert on the result and the helper stays usable anywhere. */
export function falsify<T>(subject: T, check: (x: T) => boolean, mutations: readonly ((x: T) => T)[]): { holds: boolean; survived: number[] } {
  return {
    holds: check(subject),
    survived: mutations.map((m, i) => (check(m(subject)) ? i : -1)).filter((i) => i >= 0),
  }
}

/** Drop the candidate's own source from a corpus before asking whether anything else refers to it — a file must
 *  never be its own witness. Pass the candidate's filename and the map of every file being scanned. */
export function selfExcluded(candidate: string, sources: ReadonlyMap<string, string>): string {
  return [...sources.entries()].filter(([name]) => name !== candidate).map(([, text]) => text).join('\n')
}

/** Does one LINE both name a file and carry a runner — i.e. is this an invocation rather than a mention? Reading a
 *  bare filename counts prose as evidence (a path in a data list, a comment naming a generator, a call that READS
 *  a script's source); requiring the runner adjacent misses a constructed path built up from parts. One line
 *  carrying both is the rule that survived testing in both directions. */
export function invokesFile(corpus: string, base: string): boolean {
  const named = new RegExp(base.replace(/-/g, '[-]') + '\\.(js|ts)\\b')
  const runner = /\b(node|execSync|spawn(Sync)?|npm run|x\s+--)\b/
  if (corpus.split('\n').some((line) => named.test(line) && runner.test(line))) return true
  // A MANIFEST ENTRY IS AN INVOCATION. The line-with-a-runner rule fits a shell chain, where the filename and
  // the `node` sit together. It does not fit a manifest: generate.ts lists its emitters as `{ file: 'gen-x.js' }`
  // and spawns them in a generic loop, so the name and the runner are never on one line and every generator it
  // runs on every pass reads as dead. Both the dormant finder and the gap predictor hit this and each was about
  // to grow its own copy of the rule — so it lives here, where they already both look.
  return new RegExp("file:\\s*'" + base.replace(/-/g, '[-]') + "\\.js'").test(corpus)
}
// ── THE PATH HAS ONE SPELLING. A repo-relative path is DATA here, not a filesystem gesture: the finders compare it
// against literals (`src/scripts/`), the reports print it, and the sealed artifacts FOLD it. So its separator is
// part of a content address, and a separator that depends on the host is an address that depends on the host —
// which is precisely what this ledger exists to refuse.
//
// It was not theoretical. Run on a Windows development machine, `relative()` returned `src\scripts\one-receipt.ts`,
// and every finder that compares against the POSIX literal quietly stopped matching: the support audit found 138
// roots and ZERO scripts, declared 227 live modules dead, and wrote that verdict into support-audit.json and
// research-leads.json as committed fact. Nothing errored. The audit reported confidently, and was wrong about most
// of the tree — the exact failure mode a green check is supposed to rule out.
//
// So the conversion happens ONCE, at the boundary where a host path becomes repo data, and never at the comparisons
// (there are dozens, and the next one added would forget). Everything downstream sees one spelling.
/** a repo-relative path in the ONE canonical spelling — POSIX separators, on every host */
export const relRoot = (abs: string): string => pathm().relative(ROOT, abs).replace(/\\/g, '/')
/** join repo-relative segments in the canonical spelling — the same law for a path BUILT rather than derived */
export const relJoin = (...parts: string[]): string => parts.join('/').replace(/\\/g, '/')


/** The environment git is allowed to see — every repository-redirecting GIT_* variable REMOVED.
 *
 *  ALL OF THESE OUTRANK `-C` AND `cwd`, and git exports the first two into EVERY HOOK IT RUNS. So any code that
 *  says "look at this directory" while running under a gate is not looking at that directory unless it says so
 *  here: `git -C <fixture> init` under an inherited GIT_DIR re-initialises the repository the VARIABLE names, and
 *  on 2026-08-25 that wrote core.bare = true into the shared config and stopped every session on this machine
 *  with "fatal: this operation must be run in a work tree".
 *
 *  The damage was invisible in the usual way: `rev-parse --show-toplevel` still answers with the cwd, because git
 *  infers the WORK TREE from the directory while taking the REPOSITORY from the environment. Safe case and
 *  redirected case return the same string, so the isolation check written to prevent exactly this could not fail.
 *  Ask `--absolute-git-dir` instead — which .git will be WRITTEN — and the two cases separate.
 *
 *  Scrubbing leaves the DIRECTORY as the only thing that can answer "which repository", which is what every
 *  caller passing a cwd already believed it meant. */
const GIT_REDIRECTING = ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR', 'GIT_OBJECT_DIRECTORY',
  'GIT_ALTERNATE_OBJECT_DIRECTORIES', 'GIT_CEILING_DIRECTORIES', 'GIT_NAMESPACE', 'GIT_PREFIX'] as const

export const cleanGitEnv = (base: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv => {
  const env = { ...base }
  for (const k of GIT_REDIRECTING) delete env[k]
  return env
}

/** Why a spawn did not succeed, in the words the case deserves — and the DISTINCTION `status !== 0` erases.
 *
 *  `spawnSync` sets `status` to null when the command never STARTED: the binary did not resolve, the host refused
 *  the spawn, a signal killed it before it ran. Both throwers below tested `r.status !== 0`, which is true of null,
 *  so a shell that could not be launched raised `failed (exit null)` — a sentence naming an exit code that does not
 *  exist, for a program that never produced one, and the reader then hunts a command that was never wrong.
 *
 *  The same two-state instrument answering a three-state question as the arc receipt (all-run.ts, phaseLeaf) and as
 *  green.ts's Verdict, which names the third state `unmeasured`. Here it leaves control flow alone by construction — both callers
 *  throw either way, and that is right: a step that could not run has not passed. What it changes is the EVIDENCE
 *  the throw carries, which is the whole of what a caller has to work from.
 */
export const whyFailed = (r: { status: number | null; error?: Error; signal?: NodeJS.Signals | null }): string =>
  r.error ? `could not be RUN (${r.error.message})`
    : r.status === null ? `could not be RUN (killed by ${r.signal ?? 'an unknown signal'} before it reported)`
      : `failed (exit ${r.status})`

/** shellRun(cmd) → run a command through the host's own shell, streaming to this process's stdio; THROWS on a
 *  non-zero exit, exactly as execSync did, so a caller's error handling is unchanged.
 *
 *  WHY NOT execSync. Its default shell is cmd.exe on Windows, and the chain's commands are POSIX: `VAR=1 npm run
 *  lean` is an environment prefix to a POSIX shell and an unknown program to cmd, which is how a reconcile died
 *  with "'UUIDNA_TRACK_LATEST' is not recognized" — the command was never wrong, the shell was never asked. Globs
 *  fail the same way, and worse, because an unexpanded pattern matches nothing and still exits 0. */
export const shellRun = (cmd: string, cwd: string = ROOT): void => {
  const sh = shellOrExit('run')
  const r = cpm().spawnSync(sh.file, sh.argv(cmd), { cwd, env: sh.env(process.env), stdio: 'inherit' })
  if (r.status !== 0) throw new Error(`shellRun ${whyFailed(r)}: ${cmd}`)
}

/** shellOut(cmd) → the command's stdout, through the same host shell. Throws on a non-zero exit. */
export const shellOut = (cmd: string, cwd: string = ROOT): string => {
  const sh = shellOrExit('run')
  const r = cpm().spawnSync(sh.file, sh.argv(cmd), { cwd, env: sh.env(process.env), encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`shellOut ${whyFailed(r)}: ${cmd}\n${r.stderr ?? ''}`)
  return (r.stdout ?? '').trim()
}

/** pauseSeconds(n) → wait n seconds through the host's own shell.
 *
 *  Never a clock read (the determinism scan admits none), and never a bare `sleep`, which is a program on a POSIX
 *  host and nothing at all on Windows: the lock's probe-wait shelled out to it and, finding nothing, spun through
 *  180 instant no-ops and pronounced a live holder immortal — a wait that waited no time is a queue in name only. */
export const pauseSeconds = (n: number): void => {
  const sh = shellOrExit('pause')
  cpm().spawnSync(sh.file, sh.argv(`sleep ${n}`), { env: sh.env(process.env) })
}

/** run `thunks` with at most `limit` in flight, preserving result order.
 *
 *  Declared HERE because two runners now need it and a second copy is what the `dry` law refuses: gate-all fans
 *  the audit's independent checks across the machine, and lean-gen fans the kernel spawns that re-prove the wings.
 *  Both are the same shape — independent work, a lane count, order-preserving results — and the second one to want
 *  it should find it rather than write it again. */
export async function pool<T>(thunks: readonly (() => Promise<T>)[], limit: number): Promise<T[]> {
  const out = new Array<T>(thunks.length)
  let next = 0
  // integer comparison, not Math.* — the determinism scan hard-rejects host Math calls everywhere, no exemption
  const cap = limit < 1 ? 1 : limit
  const span = thunks.length || 1
  const workers = Array.from({ length: cap < span ? cap : span }, async () => {
    for (;;) {
      const i = next++
      if (i >= thunks.length) return
      out[i] = await thunks[i]!()
    }
  })
  await Promise.all(workers)
  return out
}

/** poolByHandle(items, run, lanes) → the same fan-out, assigned by ADDRESS instead of by arrival.
 *
 *  Each item carries the address of the thing it is work for; `laneOf` turns that into a lane, and each lane runs
 *  its own bucket in order. Results come back in the ORIGINAL order, so a caller sees the original order, the difference showing only
 *  in the two ways that matter:
 *
 *    REPRODUCIBLE — the same work distributes the same way on every run and every host. `pool` assigns by whoever
 *      finished first, so two runs of identical work land differently and a step that got slower cannot be told
 *      from a step that merely shared a lane with something heavy. Today's last defect was exactly that shape: a
 *      generator that times itself read a decade slower because of what happened to be running beside it.
 *
 *    NOT WORK-CONSERVING — and this is the price, measured rather than waved at. A residue knows nothing about
 *      how long a piece takes, so one lane can hold the slow items while others sit idle; `pool` never idles while
 *      work remains. On the proof sweep across 14 lanes: 23,536 ms by arrival, 25,874 ms by handle — about a
 *      tenth more wall-clock, on a workload whose pieces are all of a size. A lopsided workload would pay more,
 *      and should take `pool`.
 *
 *  Neither replaces the other. The choice is between a shorter run and a run you can compare to the last one. */
export async function poolByHandle<T>(
  items: readonly { address: string; run: () => Promise<T> }[],
  lanes: number,
): Promise<T[]> {
  const out = new Array<T>(items.length)
  const cap = lanes < 1 ? 1 : lanes
  const buckets = new Map<number, number[]>()
  items.forEach((item, i) => {
    const lane = laneOf(item.address, cap)
    const bucket = buckets.get(lane)
    if (bucket) bucket.push(i)
    else buckets.set(lane, [i])
  })
  // the buckets run concurrently; WITHIN a bucket the order is the items' own, so a lane is replayable too
  await Promise.all([...buckets.values()].map(async (indices) => {
    for (const i of indices) out[i] = await items[i]!.run()
  }))
  return out
}

/** how the work fell across the lanes — what a report needs to show that the balance was real and not assumed. */
export const laneCensus = (addresses: readonly string[], lanes: number): number[] => {
  const counts = new Array<number>(lanes < 1 ? 1 : lanes).fill(0)
  for (const a of addresses) counts[laneOf(a, counts.length)]!++
  return counts
}

/** import a COMPILED module by ABSOLUTE path — always as a file URL.
 *
 *  A POSIX absolute path happens to be a usable module specifier, so `import(join(dist, 'x.js'))` reads as correct
 *  and is correct — there. On Windows the same expression hands the loader `C:\…`, which it reads as a URL with the
 *  scheme `c:` and refuses outright. The specifier form is a host fact, so it is settled once, here, rather than at
 *  each of the six call sites that had quietly assumed one host. */
export const importAbs = <T = Record<string, unknown>>(abs: string): Promise<T> =>
  import(urlm().pathToFileURL(abs).href) as Promise<T>

// ── ONE READ PER FILE PER PROCESS (2026-09-01, "dry clean the laws to serve quantum") ────────────────────────
//
// The guard is 45 finders and they all read the same tree. Measured over one run: 3,159 readFileSync calls for
// 1,078 distinct files — 2,081 of them REDUNDANT, two thirds of the I/O spent fetching bytes the process already
// had. docs/license.md was read 16 times, package.json 13, docs/captain.md 10. Nothing was wrong with any single
// finder; the entropy is that each one is written as though it were the only reader, which is exactly what makes
// them independently correct and collectively wasteful.
//
// The cache is sound only because the WRITE goes through the same door: wr() drops the entry it overwrites, so a
// generator that writes a file and reads it back in one process still sees its own bytes. That is not a detail —
// it is the whole safety argument, and it is why this belongs on rd/wr rather than inside any one finder. A
// cache in a finder would be private and safe; a cache here is shared and must be invalidated, so it is.
//
// within one process only, and blind to a write that bypasses wr() — a spawned child, an execSync
// git checkout, a direct fsm().writeFileSync. Those exist (reconcile spawns generators), which is why this holds
// no state across processes and why every phase boundary in a chain is a fresh process that starts cold.
// VALIDATED BY MTIME, NOT BY TRUST. The first cut invalidated on wr() alone and would have been correct only if
// wr() were the only writer. It is not: direct fsm().writeFileSync calls exist, reconcile spawns generators that
// write this same tree, and an execSync git checkout moves files under a running process. Any of those hands a
// wr()-only cache a stale answer, and a stale read inside the GUARD is the worst possible place for one — the
// gate would pass on bytes that are no longer there.
//
// A stat is not free, but it is the cheap half of the pair: it reads metadata rather than content, so a 300 KB
// generated.ts costs one stat instead of one full parse-and-decode. Correctness first, and the saving survives.
const READS = new Map<string, { mtimeMs: number; text: string }>()

/** read a repo-relative file as utf8 — cached per process, revalidated by mtime on every hit */
export const rd = (p: string): string => {
  const abs = pathm().join(ROOT, p)
  const hit = READS.get(p)
  const mtimeMs = ((): number => { try { return fsm().statSync(abs).mtimeMs } catch { return -1 } })()
  if (hit && hit.mtimeMs === mtimeMs && mtimeMs !== -1) return hit.text
  const text = fsm().readFileSync(abs, 'utf8')
  READS.set(p, { mtimeMs, text })
  return text
}
/** does a repo-relative path exist */
export const has = (p: string): boolean => fsm().existsSync(pathm().join(ROOT, p))
/** write a repo-relative utf8 file — drops the cached read so the next rd sees these bytes */
export const wr = (p: string, data: string): void => {
  READS.delete(p)
  fsm().writeFileSync(pathm().join(ROOT, p), data)
}
/** forget every cached read — for a caller that knows the tree moved underneath it (a spawn, a checkout) */
export const forgetReads = (): void => { READS.clear() }
/** mkdir -p a repo-relative directory */
export const mkdirp = (p: string): void => { fsm().mkdirSync(pathm().join(ROOT, p), { recursive: true }) }
/** rm -rf a repo-relative path when it exists */
export const rmrf = (p: string): void => { if (has(p)) fsm().rmSync(pathm().join(ROOT, p), { recursive: true, force: true }) }
/** the 16-hex component fold */
export const h16 = (data: string): string => cryptom().createHash('sha256').update(data).digest('hex').slice(0, 16)
/** the 32-hex order-invariant fold over named components */
export const foldOf = (entries: Record<string, string>): string =>
  cryptom().createHash('sha256').update(Object.entries(entries).map(([k, v]) => `${k}:${v}`).sort().join('|')).digest('hex').slice(0, 32)
/** the ℤ/7 ray of a string — the same partition as /rosetta */
export const ray = (s: string): number => parseInt(cryptom().createHash('sha256').update(s).digest('hex').slice(0, 8), 16) % 7

/** The result of a teed child step: whether it passed, and the tail of what it said. */
export type StepResult = { ok: boolean; out: string; tail: string }
/** the last n lines of output — what a retry or a cure must quote to be worth printing */
export const lastLines = (s: string, n = 20): string => s.trimEnd().split('\n').slice(-n).join('\n')
/** Run a child step with its output TEED: stderr merged, passed through to this process's stdout so the caller's own
 *  log holds the child's words, and kept so a failure can be matched against a cure and quoted. Declared HERE because
 *  both the seal and the develop pass need it, and a retry loop that discards its child's output costs more than the
 *  failure it retries (learned 2026-08-17: six seal rounds produced a seven-line log while throwing away the real
 *  objection each time). */
export function teeStep(label: string, cmd: string, cwd: string = ROOT): StepResult {
  process.stdout.write(`\n── ${label} ──\n`)
  try {
    const out = cpm().execSync(`${cmd} 2>&1`, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    process.stdout.write(out)
    return { ok: true, out, tail: lastLines(out) }
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string }
    const out = `${err.stdout ?? ''}${err.stderr ?? ''}`.trim() || String(err.message ?? e)
    process.stdout.write(out + '\n')
    return { ok: false, out, tail: lastLines(out) }
  }
}

/** streamStep(label, cmd) → run a step, STREAM its output live AND capture it — teeStep's sibling for the LONG
 *  ones. THE CRACK THIS CLOSES (the captain's order, 2026-08-24: "fold the streaming crack"): teeStep runs
 *  execSync and prints the whole output AFTER the step returns, which is right for a step that takes a second
 *  and a lie for one that takes minutes — the watcher reads silence where the machine is working. Caught live:
 *  an arc's log sat unchanged for twenty-two minutes while its reconcile waited, correctly and quietly, on
 *  another session's lock; nothing was wrong and nothing said so. The runner still needs the TEXT (it sorts a
 *  reconcile failure into its named transient classes), so the fold is BOTH, from one spawn with two consumers.
 *
 *  NOT a pipe to tee: `cmd | tee file` streams and captures, and swallows the exit code — the trap this tree
 *  keeps a pipes finder for, and the one that let a failed run report success earlier the same day. The code is
 *  read from the child's own 'close' event, where it survives by construction.
 *
 *  ASYNC by necessity: streaming means watching a process that is still alive, which a synchronous call
 *  forbids. teeStep stays exactly as it is for the short steps its callers were written around. */
export function streamStep(label: string, cmd: string, cwd: string = ROOT): Promise<StepResult> {
  process.stdout.write(`\n── ${label} ──\n`)
  return new Promise((resolve) => {
    // THE SHELL IS THE HOST'S (os/host), not `shell: true`. Node's shorthand picks cmd.exe on Windows, which does
    // not expand the globs these steps carry — `npm run test` would hand node a literal pattern, match no files
    // and exit 0, so a suite that ran nothing would report as a suite that passed. The resolved recipe is a POSIX
    // shell on every host, with the toolchain PATH that makes it a whole one.
    const sh = shellOrExit(label)
    const child = cpm().spawn(sh.file, sh.argv(cmd), { cwd, env: sh.env(process.env) })
    let out = ''
    child.stdout?.on('data', (c: Buffer) => { out += c.toString(); process.stdout.write(c) })
    child.stderr?.on('data', (c: Buffer) => { out += c.toString(); process.stderr.write(c) })
    child.on('error', (e: Error) => resolve({ ok: false, out: out + String(e.message), tail: lastLines(out + String(e.message)) }))
    child.on('close', (code: number | null) => resolve({ ok: code === 0, out, tail: lastLines(out) }))
  })
}

/** THE DRAIN'S OWN PATHS — every artifact the unattended drain REGENERATES, and nothing else. The seal and reconcile
 *  used `git add -A`, which on a shared tree sweeps a sibling session's in-flight SOURCE edits into a commit whose
 *  message describes something else: four times in one day work landed under a title about unrelated work, and in this
 *  repo a commit message is a signed artifact that must cite a sealed theorem, so the record has to mean what it says.
 *  Staging explicit paths keeps the drain to what it computed. Anything else left dirty is somebody's work: the drain
 *  NAMES it and leaves it alone (see stageDerived). Add a path here only if a generator writes it. */
export const DRAIN_PATHS: readonly string[] = [
  // the openly-licensed funding drafts — composed from the ledger by gen-funding-drafts, so they are staged
  // like any other derived surface rather than left to rot while git reports the tree clean
  'funding/drafts/nlnet-ngi-zero.md',
  'funding/drafts/harmonic-research.md',
  'funding/drafts/ai-for-math.md',
  'funding/drafts/continuous-sponsorship.md',
  // the declared derived layer (mirrors src/spin.ts DERIVED_FILES — spin seals exactly these)
  'src/theorems/generated.ts', 'lean/PRINCIPLE.md', 'CHANGELOG.md', 'lean/axioms.json',
  'docs/mcp.md', 'docs/apis.md', 'docs/leads.md', 'audit-citations.json', 'support-audit.json', 'research-leads.json',
  // the other computed artifacts the drain writes: the fold, the seal manifest, the measured costs, the page seeds
  'quantum-fold.json', 'spin-manifest.json', 'lean/heartbeats.json', 'lean/proof-cache.json',
  'prose-trials.json', 'docs/captain-claims.json', 'src/seeds',
  // the quantum capacity report (gen-quantum-capacity): sealed rows + rendered block + /quantum it re-inserts into
  'lean/quantum-capacity.json', 'lean/quantum-capacity.md', 'docs/quantum.md',
  // the measured advantage report (gen-quantum-advantage)
  'lean/quantum-advantage.json', 'docs/public/quantum-advantage.jsonld',
  // final SEO URL freeze map (gen-seo-freeze) — route↔hexbit; post-freeze permanence = hexbit doors only
  'lean/seo-url-map.json',
  // the ledger as a manuscript (gen-latex) — rewritten on every reconcile, so it is staged rather than left dirty
  'docs/public/uuidna-ledger.tex',
  // the discovery and conveyor boards (gen-expose, gen-waves): the loop's two faces in the UI
  'docs/expose.md', 'docs/waves.md',
  // the unlock board (gen-unlocks): census from theorems(); home fragment injected into docs/index.md
  'docs/unlocks.md', 'docs/index.md', 'lean/unlocks.json',
  // regenerated by the reconcile chain and, until 2026-08-17, staged by nothing — so every run rewrote them and
  // then committed with nothing added. Named by `one-receipt drain`, which holds this list against
  // RECONCILE_OUTPUTS from both sides.
  'README.md', 'llm.txt', 'docs/analytics.md',
  // the push-time proof the tag verifies instead of recomputing — written LAST by reconcile, because it
  // fingerprints src/ and lean/ and reconcile regenerates lean/; any earlier and it would seal a tree that moved
  'gate-receipt.json',
  // the practice block is generated from the ledger; a figure that moves must move the file
  'docs/school.md',
  'docs/sequence-field.md',
  // the falsifier leg for every sealed statement a second implementation can decide — regenerated whenever the
  // ledger moves, and listed BEFORE the mirror because the census below reads it to grant the leg. It carries the
  // sealed statements as strings and re-decides them, so a statement that moves makes it fail as a stale copy
  // rather than pass against yesterday's proposition — but only if it is actually regenerated, which is what this
  // line buys. Its generator sat unwired for an hour after landing, invisible to the orphan ratchet for writing a
  // variable target — the same way gen-captain-claims-complete, declared four lines up, went unrun while its
  // output kept asserting that no theorem escapes the audit.
  'src/falsifiers.test.ts',
  // the mirror the hosted edge answers from — regenerated whenever the ledger moves
  'src/rosetta-mirror.ts',
  // regenerated by the manifest and, until 2026-08-21, staged by nothing — the same defect the 2026-08-17 comment
  // above records, recurring because reconcile's hand-written list drifted from the manifest that actually runs
  'docs/articles', 'docs/public/feed.json', 'docs/public/terminology.json', 'docs/public/statement-addresses.json', 'docs/prose-evidence.md',
  '.gitattributes',
  'packages', 'lean',
  // the archive's deposited metadata — generated since 2026-08-18, because a hand-written surface that
  // becomes a permanent DOI is the one place a stale number stands uncorrected after the fact.
  '.zenodo.json',
  // agnostic Zenodo publication seals — workflow job zenodo-seals loops zenodo/manifest.json
  'zenodo',
  // every report and audit, consolidated and computed — the orphan snapshot became an output 2026-08-18
  'reports.json',
  // every Lean line that more than one key seals — the declared reuse, generated 2026-08-18
  'lean/statement-index.json',
  // every wing's manifest — lean-gen writes one per generated wing, so `npm run lean` rewrites them on every
  // reconcile and nothing staged them; a glob, because the set grows with the ledger and a fixed list would rot.
  'lean/*-manifest.json',
  // gen-captain-claims' OTHER output — docs/captain-claims.json was declared 2026-08-17, its .md sibling was not,
  // and drifted dirty every docs:build for most of a session before one-receipt drain's docs:build check named it.
  'docs/captain-claims.md',
  // and its COMPLETE sibling — generated by gen-captain-claims-complete, declared 2026-08-18 when the
  // widened counts finder read its live per-category subtotals as stale globals. A generated file that
  // nothing declares is exempt from nothing and staged by no one.
  'docs/captain-claims-complete.json',
  // candidate leads mined from public-domain texts — proposed by the desk; regenerated by the
  // DAILY research cron (network).
  'book-leads.json',
  // the song from the ledger — page and exact-integer WAV, both derived from Song.lean seals by gen-song
  'docs/song.md', 'docs/public/song.wav',
  // the release anthem — the whole ledger sung in place, derived from Anthem.lean seals by gen-anthem
  'docs/anthem.md',
  // the session roster — every device's crews, carried by origin because a socket only spans one machine
  'lean/sessions.json',
  // the referrer song — the doors and the walk census; the audio computes IN THE BROWSER (no asset, the captain's rule)
  'docs/referrer-song.md',
  // the school of open doors — the unverified in topics, derived by gen-open-questions
  'docs/open-questions.md',
  // most-searched → Lean doors + desk leads (gen-search-feed); JSON rides the lean/ directory umbrella
  'docs/search-feed.md',
  'docs/apps.md',
  'docs/evasion.md',
  'docs/symphony.md',
  'docs/utterances.md',
  // the default install's meaning page — derived from Installs.lean by gen-os
  'docs/os.md',
  // Alpine hexbit quantum monitor (TypeScript computes · VitePress shows) — gen-os
  'lean/alpine-hexbit-monitor.json', 'docs/public/alpine-hexbit-monitor.jsonld',
  // MCP Alpine man exposure — one uuidna_exec door; sealed beside the hexbit monitor (gen-os)
  'lean/mcp-alpine-man.json',
  // browser usability seal — store mounts + man→app→hexbit + terminal samples (not 28k sessions)
  'lean/browser-apps-usable.json',
  'lean/alpine-discovery.json',
  // npm/curl apps ported as Alpine overlay (omp/oh-my-pi) — merged at catalogue read time
  'mirror/alpine-overlay.tsv',
  // edge/testing packages that close latest-stable community deps (gen-alpine-testing-leads)
  'mirror/alpine-testing-leads.tsv',
  // docs/public/alpine-catalogue.tsv is a BUILD ARTIFACT (gitignored) — served from dist via copy-lean-to-site;
  // never a drain path (stageDerived would fail on git add -- of an ignored file).
  'docs/store.md',
  // the model comparison page — rewritten by gen-models from the committed feed mirror every reconcile
  'docs/models.md',
  // the public model feed mirror — lean-models re-pins it under UUIDNA_TRACK_LATEST (reconcile's lean step)
  'src/quantum/models/mirror.ts',
  // ledger slot stamps (<!--L:distinct--> / <!--L:keys-->) — stamp.js runs inside `npm run lean`
  'docs/doctrine.md',
  // one chunk per DISTINCT proven fact — fewer than the key count, since a statement sealed in two wings is
  // one fact with two names. The two figures are deliberately not written here; statementCensus() reports them,
  // and a count in a comment is stale the next time a wing lands. Generated
  // 2026-08-19. The whole directory is one drain path, same convention as src/seeds.
  'src/chunks',
  // four-level handle store (gen-handle-store) — chunks + freeze publication|page; wipe+rewrite
  'src/handles',
]

/** Concrete drain files whose single writer is NOT visible from RECONCILE_OUTPUTS / DOCS_BUILD_OUTPUTS alone —
 *  lean's own emitters ride `npm run lean`, cron/on-demand scripts ride outside the manifest. drainGaps holds
 *  every concrete DRAIN_PATH to exactly one owner across this map and the two output declarations; a path with
 *  zero or two fails. Directory/glob drain paths are umbrellas and are not counted here. */
export const DRAIN_WRITERS: Readonly<Record<string, string>> = {
  'src/theorems/generated.ts': 'lean-ledger',
  'lean/PRINCIPLE.md': 'lean-ledger',
  'lean/proof-cache.json': 'lean-gen',
  'prose-trials.json': 'derive-prose-trials',
  'book-leads.json': 'mine-books',
  'lean/sessions.json': 'session',
  'src/quantum/models/mirror.ts': 'lean-models',
  'docs/doctrine.md': 'stamp',
}

/** What each generator in the reconcile chain WRITES — declared, because the write targets are computed through
 *  variables (`readmePath`, `leanPath`, `CACHE_PATH`), so no honest static scan can recover them. The drain stages
 *  DRAIN_PATHS and nothing else, so a generator whose output is absent from that list is regenerated on every
 *  reconcile and staged by none of them: the run then commits with nothing added and dies on git's own error.
 *  Measured 2026-08-17 — README.md, docs/analytics.md, docs/captain-claims.md, lean/cipher-manifest.json and
 *  llm.txt all rewrote and none were staged. `one-receipt drain` holds this map against reconcile.ts and
 *  against DRAIN_PATHS, so adding a generator to the chain without declaring its output fails at guard speed. */
export const RECONCILE_OUTPUTS: Readonly<Record<string, readonly string[]>> = {
  'lean-axioms': ['lean/axioms.json'],
  'gen-mcp': ['docs/mcp.md'],
  'gen-apis': ['docs/apis.md'],
  'gen-latex': ['docs/public/uuidna-ledger.tex'],
  'gen-funding-drafts': ['funding/drafts/nlnet-ngi-zero.md', 'funding/drafts/harmonic-research.md', 'funding/drafts/ai-for-math.md', 'funding/drafts/continuous-sponsorship.md'],
  'gen-quantum-capacity': ['lean/quantum-capacity.json', 'lean/quantum-capacity.md', 'docs/quantum.md'],
  'gen-quantum-advantage': ['lean/quantum-advantage.json', 'docs/public/quantum-advantage.jsonld'],
  'gen-seo-freeze': ['lean/seo-url-map.json'],
  'gen-expose': ['docs/expose.md'],
  'gen-waves': ['docs/waves.md'],
  'gen-unlocks': ['lean/unlocks.json', 'docs/unlocks.md', 'docs/index.md'],
  'gen-readme': ['README.md'],
  'gen-llm': ['llm.txt'],
  'gen-statement-fixture': ['docs/public/statement-addresses.json'],
  'gen-leads': ['docs/leads.md'],
  'gen-zenodo': ['.zenodo.json'],
  'gen-zenodo-seals': ['zenodo'],
  'gen-school': ['docs/school.md'],
  // THE EIGHT THE CHAIN NEVER RAN. reconcile listed nine generators by hand while generate.ts's manifest held
  // eighteen, so these eight were regenerated by the AUDIT and staged by nobody — the git-diff arm then failed on a
  // tree the gate itself dirtied. reconcile now runs the manifest, so each declares what it writes like any other.
  'gen-packages': ['packages'],
  'gen-handles': ['src/chunks'],
  'gen-captain-claims': ['docs/captain-claims.json', 'docs/captain-claims.md'],
  'gen-captain-claims-complete': ['docs/captain-claims-complete.json'],
  'gen-terminology': ['docs/public/terminology.json'],
  'gen-feed': ['docs/public/feed.json'],
  'gen-articles': ['docs/articles'],
  'gen-prose-evidence': ['docs/prose-evidence.md'],
  'gen-gitattributes': ['.gitattributes'],
  'generate': [],   // the manifest runner itself writes nothing; drainGaps expands it to the generators it runs

  // declared BEFORE rosetta because it is generated before rosetta: the census grants the falsifier leg by finding
  // a theorem's literal key in a test file, so this output is one of rosetta's inputs rather than a sibling of it
  'gen-falsifiers': ['src/falsifiers.test.ts'],
  'rosetta': ['src/rosetta-mirror.ts'],
  'gate-receipt': ['gate-receipt.json'],
  // the gate now runs as reconcile's precondition, so its one written artifact is declared like any other
  'guard': ['quantum-fold.json'],
  'gen-reports': ['reports.json'],
  'gen-lines': ['lean/statement-index.json'],
  'gen-handle-chunks': ['src/chunks'],
  'gen-handle-store': ['src/handles'],
  'gen-analytics': ['docs/analytics.md'],
  'gen-song': ['docs/song.md', 'docs/public/song.wav'],
  'gen-anthem': ['docs/anthem.md'],
  'gen-store': ['docs/store.md'],
  'gen-referrer-song': ['docs/referrer-song.md'],
  'gen-open-questions': ['docs/open-questions.md'],
  'gen-sequence-field': ['docs/sequence-field.md'],
  'gen-search-feed': ['lean/search-feed.json', 'docs/search-feed.md'],
  'gen-apps': ['docs/apps.md'],
  'gen-evasion': ['docs/evasion.md'],
  'gen-symphony': ['docs/symphony.md'],
  'gen-utterances': ['docs/utterances.md'],
  'gen-os': ['docs/os.md', 'lean/alpine-hexbit-monitor.json', 'docs/public/alpine-hexbit-monitor.jsonld', 'lean/mcp-alpine-man.json'],
  'gen-alpine-overlay': ['mirror/alpine-overlay.tsv'],   // docs/public/alpine-catalogue.tsv is gitignored build artifact
  'gen-alpine-testing-leads': ['mirror/alpine-testing-leads.tsv'],
  'browser-apps-usable': ['lean/browser-apps-usable.json'],
  'alpine-discovery': ['lean/alpine-discovery.json'],
  // the model comparison over all public live data — derived from the committed feed mirror by gen-models
  'gen-models': ['docs/models.md'],
  'lean-heartbeats': ['lean/heartbeats.json'],
  'support': ['support-audit.json', 'research-leads.json'],
  'audit-citations': ['audit-citations.json'],
  'sync-changelog': ['CHANGELOG.md'],
  'spin': ['spin-manifest.json'],
  'account': [],       // reports only — aborts the run when the ledger does not reconcile, writes nothing
  'one-receipt': [],   // invoked as the `coherent` probe here; the finders report, they do not write
}

/** The SAME declaration, for the OTHER chain that regenerates tracked derived files: `docs:build`. Found
 *  2026-08-18 — gen-captain-claims writes BOTH docs/captain-claims.json (a drain path since 2026-08-17) AND
 *  docs/captain-claims.md, and only the .json sibling was ever declared. The .md file drifted dirty every time
 *  docs:build ran, indistinguishable at a glance from a hand edit, and sat uncommitted for most of a session.
 *  `one-receipt drain` checks this map against package.json's own "docs:build" script string, the same way it
 *  checks RECONCILE_OUTPUTS against reconcile.ts's source — two chains, one law: every generator's output is
 *  declared, or the file it writes is nobody's to stage. */
export const DOCS_BUILD_OUTPUTS: Readonly<Record<string, readonly string[]>> = {
  'gen-mcp': ['docs/mcp.md'],
  'gen-apis': ['docs/apis.md'],
  'gen-latex': ['docs/public/uuidna-ledger.tex'],
  'gen-captain-claims': ['docs/captain-claims.json', 'docs/captain-claims.md'],
  'gen-sequence-field': ['docs/sequence-field.md'],
  'lean-payload-seeds': ['src/seeds'],   // the whole directory is one drain path — see stageDerived
  'payload-sync': ['src/seeds'],
  'copy-lean-to-site': [],   // writes into docs/.vitepress/dist, which is gitignored — nothing to drain
}

/** Stage ONLY the drain's own paths, then report what was left for a human. Returns the untouched paths so a caller
 *  can print them: a sibling's edit is neither swept into the drain's commit nor silently ignored — it is named. */
export function stageDerived(cwd: string = ROOT): { staged: number; leftForHumans: string[] } {
  // a pathspec with a glob is handed to git as-is — existsSync answers for a path rather than a pattern, and the set it
  // matches (one manifest per wing) grows with the ledger, so listing them by name would rot on the next wing.
  // Skip gitignored paths: a build artifact on DRAIN_PATHS would make `git add` exit 1 and abort reconcile.
  const existing = DRAIN_PATHS.filter((p) => {
    if (p.includes('*')) return true
    if (!fsm().existsSync(pathm().join(cwd, p))) return false
    // EXIT 1 IS AN ANSWER; 128 IS A BROKEN INSTRUMENT (measured: 0 = ignored, 1 = not ignored, 128 = no pathspec
    // or not a repository). Catching every throw as "not ignored" conflates the two, so a git that cannot answer
    // would make EVERY drain path look stageable and `git add` them all — the precise failure this filter exists
    // to avoid. A peer's catalogue names the class: an error sentinel counted as evidence (zeropoint-node-8a,
    // 2026-09-04). Only status 1 is read as a verdict; anything else rethrows, because an instrument that failed
    // has established nothing about the path.
    const probe = cpm().spawnSync('git', ['check-ignore', '-q', '--', p], { cwd, stdio: 'ignore' })
    if (probe.status === 0) return false        // ignored — leave it out of the staging set
    if (probe.status === 1) return true         // not ignored — stage it
    throw new Error(`git check-ignore could not answer for ${p} (status ${String(probe.status)}${probe.error ? ': ' + probe.error.message : ''}) — an instrument that failed has established nothing`)
  })
  if (existing.length) cpm().execSync(`git add -- ${existing.map((p) => JSON.stringify(p)).join(' ')}`, { cwd })
  const staged = cpm().execSync('git diff --cached --name-only', { cwd, encoding: 'utf8' }).trim().split('\n').filter(Boolean).length
  const leftForHumans = cpm().execSync('git status --porcelain', { cwd, encoding: 'utf8' })
    .split('\n').filter(Boolean)
    .filter((l) => !l.startsWith('M  ') && !l.startsWith('A  ') && !l.startsWith('D  '))   // not already staged
    .map((l) => l.slice(3).trim())
  return { staged, leftForHumans }
}

export type Gap = { what: string; fix: string }
/** the GAP+FIX reporter — every audit finding is an exact computational prompt; exits 1 on any gap */
export function report(name: string, gaps: Gap[], okMessage: string): void {
  if (gaps.length) {
    console.error(`✗ ${name} — ${gaps.length} gap(s), each with its exact fix:`)
    for (const g of gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
    process.exit(1)
  }
  console.log(`✓ ${name} — ${okMessage}`)
}
