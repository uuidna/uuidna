// lean-gen — the ONE compute → generate → verify pipeline, shared by every lean:* generator (DRY). A generator
// computes its facts (each a decidable JS predicate paired with a Lean proposition or full theorem), and calls
// emit(): it checks every fact holds in JS, writes lean/<File>.lean and lean/<file>-manifest.json (the microdata
// bridge — {key,name} per theorem), and shells out to `lean` to verify the file compiles sorry-free. One helper,
// no repetition. Integrity.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toUuid } from '../address.js'
import { hmacSha256 } from '../sha256.js'

import { ROOT, poolByHandle } from './api.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts
export { ROOT }

// THE DELTA GATE — the gate proves only what MOVED (verify_beats_recompute_by_magnitudes). lean/proof-cache.json
// maps each generated file to the content-address of the last text the KERNEL ITSELF verified; byte-identical
// content carries that prior signature, recomputable by anyone from the address, so the spawn is skipped. A
// changed wing's address moves and always re-proves; a stale cache can only cause EXTRA proving
// pass. UUIDNA_PROVE_ALL=1 forces every spawn (the full recalibration door, like heartbeats --all).
const CACHE_PATH = join(ROOT, 'lean', 'proof-cache.json')
export const readProofCache = (): Record<string, string> => {
  try { return existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {} } catch { return {} }
}
export const writeProofCache = (c: Record<string, string>): void => {
  const sorted: Record<string, string> = {}
  for (const k of Object.keys(c).sort()) sorted[k] = c[k]!
  writeFileSync(CACHE_PATH, JSON.stringify(sorted, null, 1) + '\n')
}

// ── THE SIGNED PROOF CACHE (queue captain-item 4, the MECHANISM half — the policy flip stays the captain's).
// The hole this closes: proof-cache.json is committed and nothing validated it, so an entry naming the current
// text's address made the delta gate answer "verified by receipt" for text the kernel never signed. Now a mint
// on a host holding UUIDNA_PROOF_KEY writes `address|hmac(key, file:address)` — and a KEY-BEARING host
// DISTRUSTS any entry that is unsigned or mis-signed, re-proving instead. A keyless host keeps today's floor
// (address match), honestly weaker; the release's UUIDNA_PROVE_ALL stays the final authority either way. The
// key is a machine secret in the environment, never committed — only a real kernel run on a keyed host mints.
const PROOF_KEY = process.env.UUIDNA_PROOF_KEY
const utf8 = (s: string): Uint8Array => new TextEncoder().encode(s)
const hexOf = (b: Uint8Array): string => Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
/** the entry a REAL kernel run mints: signed where the host holds the key, bare address where it does not. */
export const signProofEntry = (file: string, address: string): string =>
  PROOF_KEY ? address + '|' + hexOf(hmacSha256(utf8(PROOF_KEY), utf8(file + ':' + address))) : address
/** may this entry stand for this file's current address? A key-bearing host requires the signature. */
export const proofEntryValid = (entry: string | undefined, file: string, address: string): boolean => {
  if (!entry) return false
  const bar = entry.indexOf('|')
  const addr = bar === -1 ? entry : entry.slice(0, bar)
  if (addr !== address) return false                      // the text moved — always re-prove
  if (!PROOF_KEY) return true                             // keyless: address match is the (weaker, named) floor
  if (bar === -1) return false                            // keyed host, unsigned entry: distrust, re-prove
  return entry.slice(bar + 1) === hexOf(hmacSha256(utf8(PROOF_KEY), utf8(file + ':' + address)))
}
export const m9 = (n: number): number => ((n % 9) + 9) % 9
// range — THE ONE range walk every generator's js mirror shares. `(List.range n).all (…)` is the commonest shape
// in the ledger, and its JS twin was being re-declared per generator as `const R8 = [0,1,…,7]`; declared once here,
// the boilerplate cannot regrow (one-receipt dry objects to any re-declaration, with the exact fix).
// THE CASE COUNTER. Mass — how many cases a `by decide` actually settles — was being recovered downstream by
// regexing the RENDERED statement for `List.range 16`, which is reading prose about the algebra rather than the
// algebra. That parser needed teaching about list literals, then about conjuncts, and would have rated a theorem
// by a numeral in a comment. The count is not a thing to recover: the generator WALKS the domain to compute the
// fact, so the walk itself is the measurement. `range` is the shared helper every emitter already uses, so it
// tallies what it hands out while a fact is being computed, and emit() reads the tally off the same run that
// proves the JS side. Nothing is parsed.
//
// THE TALLY MUST NOT CARE HOW A WING WALKS. Counting only `range` calls was a second parser in disguise: it saw
// the wings that use the shared helper and reported every other wing as deciding one case. Run over the whole
// ledger, that read as "97% of enumerating theorems have a JS mirror that walks nothing" — and it was false. `seal_ten` walks
// `[0..9].every(...)` and `s.map(dz)` with array literals, which the helper-counter cannot see. So the count is
// taken at the ITERATION itself: for the length of one fact's check, the array methods a walk is made of tally
// what they visit. Any helper, any literal, any shape — if it iterates, it counts.
const WALKERS = ['every', 'some', 'map', 'filter', 'forEach', 'reduce', 'find', 'findIndex', 'flatMap'] as const
let walked = 0
let tallying = false
const originals = new Map<string, unknown>()
export const startTally = (): void => {
  walked = 0
  if (tallying) return
  tallying = true
  for (const m of WALKERS) {
    const orig = (Array.prototype as unknown as Record<string, (...a: unknown[]) => unknown>)[m]!
    originals.set(m, orig)
    ;(Array.prototype as unknown as Record<string, unknown>)[m] = function (this: unknown[], ...args: unknown[]) {
      walked += this.length
      return orig.apply(this, args)
    }
  }
}
export const endTally = (): number => {
  if (tallying) for (const m of WALKERS)
    (Array.prototype as unknown as Record<string, unknown>)[m] = originals.get(m)
  tallying = false
  return walked
}
export const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i)
// One shared exec buffer for every `lean` shell-out across the pipeline (generators, the audit, the heartbeat probe)
// — a Lean file's stdout/stderr never approaches this, but a single constant keeps the cap consistent
// per call site.
export const MAXBUF = 64 * 1024 * 1024

// Axiom-free primitives — kept HERE so every generator shares ONE definition (DRY). Lean's native `Nat.xor` (`^^^`)
// and `List.getD` are defined by well-founded recursion over `Nat.bitwise`, whose `by decide` path borrows the
// `propext` axiom — so a theorem using them is NOT kernel-only. These structural-recursion replacements compute the
// SAME values and depend on NO axioms (verified by scripts/lean-axioms), keeping the ledger's trust base at the
// leanprover/lean4 kernel alone. LXOR_DEF covers 0..255 (8-bit fuel) — wider than any xor the ledger takes.
export const LXOR_DEF = `-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native \`^^^\` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose \`by decide\` proof term borrows the \`propext\` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. \`lxor a b\` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b`
export const NTH_DEF = `-- nth / nthR — list indexing as decidable, AXIOM-FREE structural recursion. Lean's \`List.getD\` routes through the
-- \`propext\` axiom under \`by decide\`; this recursion does not (scripts/lean-axioms proves it). \`nth l i\` = the i-th
-- Nat of l (0 past the end); \`nthR m i\` = the i-th row of a Nat matrix ([] past the end).
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nth xs n
def nthR : List (List Nat) → Nat → List Nat
  | [], _ => []
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthR xs n`

// A single fact: stmt is the Lean proposition (a `theorem key : stmt := by decide` is generated), OR lean is a
// full theorem string. name is the human/microdata label (also carried into the manifest, and — for a full `lean`
// theorem — kept as a `--` comment above it so the file stays self-documenting). why is an alternate label the
// generators fold into name. js is the decidable JS check: every fact must hold before a single line is written.
export interface Fact {
  key: string
  stmt?: string
  lean?: string
  name?: string
  why?: string
  js?: () => boolean
  defs?: string
  skill?: string  // the CAPABILITY this fact demonstrates — authored inline (the single source)
}

// emit's arguments: the target Lean file, its header comment, the facts to prove, and shared Lean defs. `skill` is
// the file-level default capability (most domains are uniform); a Fact's own `skill` overrides it per fact.
export interface EmitArgs {
  file: string
  header: string
  facts: Fact[]
  defs?: string
  skill?: string
}

/** docComment(prose) → a real Lean `/-- … -/` DOC COMMENT, attached to the declaration that follows it.
 *
 *  THE PROSE BELONGS TO THE PROOF. Every generator already carried a sentence per fact — `name`, or
 *  `why` — and that sentence went into lean/<file>-manifest.json and into src/theorems/generated.ts while the .lean
 *  file itself got, at most, an ordinary `--` comment and usually nothing at all. So the one artifact a reader can
 *  check independently, and the one artifact the kernel signs, was the one artifact with no prose in it: the docs
 *  said what a theorem meant, the Lean said what it proved, and nothing held the two together.
 *
 *  A `/--` doc comment is part of the declaration. It rides inside the text `emit` addresses, so the file's
 *  content-address covers the sentence as well as the statement: change the prose and the address moves, the delta
 *  gate misses, and the kernel re-verifies. Prose can no longer drift from the proof it describes without the build
 *  noticing — which is exactly what a `--` comment could not give, since nothing downstream ever read one.
 *
 *  Wrapped greedily at 108 columns because the ledger's longest sentence is 1,197 characters and a single line that
 *  long is not readable in the file it documents. The wrap is deterministic — same prose, same bytes — or it would
 *  re-address every wing on every run and the delta gate would never hit. `-/` cannot appear inside a doc comment
 *  (it would close it early and Lean would fail to parse the theorem that follows), so it is escaped rather than
 *  trusted: today no name in the ledger contains one, and "today none do" is not a property. */
export function docComment(prose: string, width = 108): string {
  const clean = String(prose).replace(/\s+/g, ' ').trim().replace(/-\//g, '-\\/')
  if (!clean) return ''
  const lines: string[] = []
  let line = ''
  for (const word of clean.split(' ')) {
    if (line && line.length + 1 + word.length > width) { lines.push(line); line = word } else line = line ? line + ' ' + word : word
  }
  if (line) lines.push(line)
  return lines.length === 1 ? `/-- ${lines[0]} -/\n` : `/-- ${lines.join('\n    ')} -/\n`
}

// One helper, no repetition: JS-check every fact, write lean/<File>.lean + its manifest, verify sorry-free.
export function emit({ file, header, facts, defs = '', skill }: EmitArgs): number {
  // one pass: each fact's JS is run ONCE, its verdict checked and its walk tallied on the same execution, so
  // the recorded mass belongs to the computation that was actually validated.
  const cases = new Map<string, number>()
  const fail: Fact[] = []
  for (const f of facts) {
    if (!f.js) continue
    startTally()
    let ok: unknown
    try { ok = f.js() } finally { const w = endTally(); cases.set(f.key, w > 0 ? w : 1) }
    if (ok !== true) fail.push(f)
  }
  if (fail.length) { console.log('✗ ' + file + ' — JS check failed: ' + fail.map((f) => f.key).join(', ')); process.exit(1) }
  // A doc comment attaches to ONE declaration, and a Fact's `lean` field is free to carry several theorems in one
  // string. Prefixing the fact would document the first and leave the rest bare, so the comment goes before EVERY
  // `theorem` in the block: the sentence is the fact's, and each theorem the fact seals is entitled to it. No
  // generated wing writes a multi-theorem fact today — this changes nothing in the current tree and is here so that
  // the first one to do so is documented rather than silently half-documented.
  const body = facts.map((f) => {
    const doc = docComment(f.name || f.why || f.stmt || f.key)
    return f.lean ? f.lean.replace(/^theorem\s/gm, doc + 'theorem ') : doc + `theorem ${f.key} : ${f.stmt} := by decide`
  }).join('\n\n')
  const lean = `-- lean/${file} — GENERATED. ${header} Every proof \`by decide\`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).\n\n${defs ? defs.trim() + '\n\n' : ''}${body}\n`
  // The manifest carries {key, name, skill} — the microdata bridge. skill is the inline, authored capability
  // (a Fact's own skill, else the file-level default); omitted when neither is set, so the ledger falls back.
  const manifestPath = join(ROOT, 'lean', file.replace('.lean', '').toLowerCase() + '-manifest.json')
  const manifest = JSON.stringify(facts.map((f) => { const s = f.skill ?? skill; const c = cases.get(f.key) ?? 1; return s ? { key: f.key, name: f.name || f.stmt || f.key, skill: s, cases: c } : { key: f.key, name: f.name || f.stmt || f.key, cases: c } }), null, 0) + '\n'
  // THE DELTA GATE, decided BEFORE any write: byte-identical content means the kernel's prior signature stands,
  // so an unchanged wing costs neither the spawn NOR the two file writes — the whole step is verify-by-receipt.
  // (Both files must exist: a deleted artifact must be rewritten even when the address matches.)
  const leanPath = join(ROOT, 'lean', file)
  const address = toUuid(lean)
  const cache = readProofCache()
  // The skip is only sound if the file ON DISK is the text the cache describes. Existence is not enough: a run
  // that wrote the file and then FAILED verification leaves a different text behind with the cache unmoved, so a
  // later correct run would match the cache, skip the write, and leave the bad file standing. Compare content.
  const onDisk = existsSync(leanPath) ? readFileSync(leanPath, 'utf8') : ''
  if (proofEntryValid(cache[file], file, address) && onDisk === lean && existsSync(manifestPath) && !process.env.UUIDNA_PROVE_ALL) {
    console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified by receipt (unchanged at ' + handleOf(address) + '; the kernel signed this exact text — UUIDNA_PROVE_ALL=1 re-proves)')
    return facts.length
  }
  writeFileSync(leanPath, lean)
  writeFileSync(manifestPath, manifest)
  // THE SPAWN IS QUEUED, NOT TAKEN (see PENDING below). Everything above this line is this generator's own work
  // and stays exactly where it was; the kernel call is the one part that belongs to the machine rather than to
  // the wing, and it is the part that was costing 97% of the gate.
  PENDING.push({ file, path: leanPath, address, theorems: facts.length })
  return facts.length
}

/** A wing written to disk and waiting for the kernel's signature. */
export interface PendingProof { file: string; path: string; address: string; theorems: number }

// ── THE KERNEL SPAWNS BELONG TO THE MACHINE, NOT TO THE WING ────────────────────────────────────────────────
//
// Each generator used to prove its own wing inline: write the file, block on `lean`, cache, return. Correct, and
// strictly sequential — ~90 wings, one kernel process at a time, timed by the gate's own census at 114,402 ms
// on a 16-core machine, which is 97% of the concurrent phase's floor while fifteen cores did nothing. THAT NUMBER
// IS A READING OF AN INSTRUMENT AND CARRIES ITS INSTRUMENT'S NAME: it is what the kernel spawns cost under
// leanprover/lean4 v4.33.0 driven from Node.js v24 on one 16-core host, and the authority for it is nothing more
// than that toolchain on that machine. A different toolchain version, a different host, or a different core count
// will move it, so it is quoted as an observation and never as a constant. What does NOT move with the version is
// the shape the observation exposed — one queue of ninety against fifteen idle lanes — and the change below is
// justified by the shape, not by the milliseconds. The gate had
// been fanning its checks out across the machine for some time; the single step inside those checks that dominates
// every run was still a queue of one.
//
// The wings are independent by construction — each is a standalone .lean file with no Mathlib and no cross-imports
// (that is why `by decide` works at all), so nothing orders one against another. Independence is the licence to
// run them TOGETHER, the same reasoning gate-all already applies one level up. So emit() writes and REGISTERS, and
// the entry points drain this queue across the host's real lanes.
//
// THE CACHE IS WRITTEN ONCE, AFTER. Ninety concurrent writers to one proof-cache.json is a lost-update race that
// would silently drop signatures and cost re-proving later. It is written once when the drain finishes — and it is
// written EVEN IF a wing failed, so the work the kernel did sign is never thrown away by a sibling's failure.
const PENDING: PendingProof[] = []
/** what is written and still unsigned — a caller may inspect it, and the drain empties it */
export const pendingProofs = (): readonly PendingProof[] => PENDING

// THE QUEUE MAY NOT BE ABANDONED. Deferring the spawn buys the machine, and it opens one hole that the inline
// version could not have: a process that writes wings and exits WITHOUT draining leaves generated .lean files on
// disk that no kernel ever signed — and they look exactly like signed ones. That is the failure this tree refuses
// everywhere else (a claim with no proof behind it), so it is made loud here rather than left to discipline: any
// exit with the queue non-empty names the unproved wings and fails, whatever the exit code was going to be.
process.on('exit', () => {
  if (!PENDING.length) return
  process.exitCode = 1
  console.error(`\n✗ lean-gen — ${PENDING.length} wing(s) were WRITTEN AND NEVER PROVED: ${PENDING.map((p) => p.file).join(', ')}`)
  console.error('  A generated wing with no kernel signature is a claim with no proof. The entry point must call provePending().')
})

/** provePending(lanes) → run the queued kernel verifications concurrently; returns what failed.
 *
 *  A wing that fails prints the kernel's OWN diagnostic named to its file, exactly as the inline spawn did — the
 *  fan-out changes when the spawns happen, never what a failure tells you. */
export async function provePending(lanes: number): Promise<{ proved: number; failed: PendingProof[] }> {
  const queued = PENDING.splice(0, PENDING.length)
  if (!queued.length) return { proved: 0, failed: [] }
  const cache = readProofCache()
  const failed: PendingProof[] = []
  // THE WING'S OWN ADDRESS CHOOSES ITS LANE (handle.ts's laneOf). A wing's address is the content-address of its
  // Lean text, so the assignment is a property of what is being proved rather than of who happened to finish
  // first: the same wing proves on the same lane every run, on every host. That is what makes a proof sweep
  // COMPARABLE run to run — and comparability is not a luxury here, because the last defect of the day was a
  // generator whose self-timing moved a decade for no reason but which siblings it shared the machine with.
  const results = await poolByHandle(queued.map((p) => ({ address: p.address, run: () => new Promise<boolean>((resolve) => {
    execFile('lean', [p.path], { cwd: ROOT, maxBuffer: MAXBUF }, (err, stdout, stderr) => {
      if (!err) return resolve(true)
      const diag = (String(stdout || '') + String(stderr || '')).trim()
      console.error('✗ lean/' + p.file + ' — Lean verification FAILED:\n' + (diag || String(err)))
      resolve(false)
    })
  }) })), lanes)
  results.forEach((ok, i) => {
    const p = queued[i]!
    if (ok) { cache[p.file] = signProofEntry(p.file, p.address); console.log('✓ lean/' + p.file + ' — ' + p.theorems + ' theorems, verified sorry-free (receipt ' + handleOf(p.address) + ' cached — the next unchanged run verifies free).') }
    else failed.push(p)
  })
  writeProofCache(cache)   // every signature the kernel DID give, kept — a sibling's failure discards nobody's work
  return { proved: results.filter(Boolean).length, failed }
}
