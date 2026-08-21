// lean-gen — the ONE compute → generate → verify pipeline, shared by every lean:* generator (DRY). A generator
// computes its facts (each a decidable JS predicate paired with a Lean proposition or full theorem), and calls
// emit(): it checks every fact holds in JS, writes lean/<File>.lean and lean/<file>-manifest.json (the microdata
// bridge — {key,name} per theorem), and shells out to `lean` to verify the file compiles sorry-free. One helper,
// no repetition. Integrity.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toUuid } from '../address.js'

import { ROOT } from './api.js'
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
// the wings that use the shared helper and reported every other wing as deciding one case. Measured, that read
// as "97% of enumerating theorems have a JS mirror that walks nothing" — and it was false. `seal_ten` walks
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
  // one pass: each fact's JS is run ONCE, its verdict checked and its walk measured on the same execution, so
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
  if (cache[file] === address && onDisk === lean && existsSync(manifestPath) && !process.env.UUIDNA_PROVE_ALL) {
    console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified by receipt (unchanged at ' + handleOf(address) + '; the kernel signed this exact text — UUIDNA_PROVE_ALL=1 re-proves)')
    return facts.length
  }
  writeFileSync(leanPath, lean)
  writeFileSync(manifestPath, manifest)
  try {
    execSync('lean ' + JSON.stringify(join(ROOT, 'lean', file)), { cwd: ROOT, stdio: 'pipe', maxBuffer: MAXBUF })
  } catch (e) {
    // stdio:'pipe' captures Lean's diagnostic ON the thrown error — print it (the actual proof failure) named to the
    // file, so a broken generator surfaces its OWN error instead of an opaque Node status dump, then drain.
    const err = e as { stdout?: Buffer | string; stderr?: Buffer | string }
    const diag = (String(err.stdout || '') + String(err.stderr || '')).trim()
    console.error('✗ lean/' + file + ' — Lean verification FAILED:\n' + (diag || String(e)))
    process.exit(1)
  }
  cache[file] = address
  writeProofCache(cache)
  console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified sorry-free (receipt ' + handleOf(address) + ' cached — the next unchanged run verifies free).')
  return facts.length
}
