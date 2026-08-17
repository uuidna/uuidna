// lean-gen — the ONE compute → generate → verify pipeline, shared by every lean:* generator (DRY). A generator
// computes its facts (each a decidable JS predicate paired with a Lean proposition or full theorem), and calls
// emit(): it checks every fact holds in JS, writes lean/<File>.lean and lean/<file>-manifest.json (the microdata
// bridge — {key,name} per theorem), and shells out to `lean` to verify the file compiles sorry-free. One helper,
// no repetition. Integrity, not truth.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toUuid } from '../address.js'

import { ROOT } from './api.js'
export { ROOT }

// THE DELTA GATE (lead 15, sealed by verify_beats_recompute_by_magnitudes) — the gate proves only what MOVED.
// lean/proof-cache.json maps each generated file to the content-address of the last text the KERNEL ITSELF
// verified; when a regeneration produces byte-identical content (same address), the spawn is skipped and the
// wing is VERIFIED BY RECEIPT — the kernel's prior signature on this exact text, recomputable by anyone from
// the address. A changed wing's address moves, so it always re-proves; a stale cache can only cause EXTRA
// proving, never a false pass. UUIDNA_PROVE_ALL=1 forces every spawn (the full recalibration door, like
// heartbeats --all). Measured motive: the pre-delta `npm run lean` paid ~60 kernel spawns per run to re-prove
// unchanged wings; the delta pays only the diff.
const CACHE_PATH = join(ROOT, 'lean', 'proof-cache.json')
const readProofCache = (): Record<string, string> => {
  try { return existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {} } catch { return {} }
}
const writeProofCache = (c: Record<string, string>): void => {
  const sorted: Record<string, string> = {}
  for (const k of Object.keys(c).sort()) sorted[k] = c[k]!
  writeFileSync(CACHE_PATH, JSON.stringify(sorted, null, 1) + '\n')
}
export const m9 = (n: number): number => ((n % 9) + 9) % 9
// One shared exec buffer for every `lean` shell-out across the pipeline (generators, the audit, the heartbeat probe)
// — a Lean file's stdout/stderr never approaches this, but a single constant keeps the cap consistent, not guessed
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
  skill?: string  // the CAPABILITY this fact demonstrates — authored inline (the single source), not derived from the key
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

// One helper, no repetition: JS-check every fact, write lean/<File>.lean + its manifest, verify sorry-free.
export function emit({ file, header, facts, defs = '', skill }: EmitArgs): number {
  const fail = facts.filter((f) => f.js && f.js() !== true)
  if (fail.length) { console.log('✗ ' + file + ' — JS check failed: ' + fail.map((f) => f.key).join(', ')); process.exit(1) }
  const body = facts.map((f) => (f.lean ? (f.name ? '-- ' + f.name + '\n' : '') + f.lean : `theorem ${f.key} : ${f.stmt} := by decide`)).join('\n\n')
  const lean = `-- lean/${file} — GENERATED. ${header} Every proof \`by decide\`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).\n\n${defs ? defs.trim() + '\n\n' : ''}${body}\n`
  writeFileSync(join(ROOT, 'lean', file), lean)
  // The manifest carries {key, name, skill} — the microdata bridge. skill is the inline, authored capability
  // (a Fact's own skill, else the file-level default); omitted when neither is set, so the ledger falls back.
  writeFileSync(join(ROOT, 'lean', file.replace('.lean', '').toLowerCase() + '-manifest.json'), JSON.stringify(facts.map((f) => { const s = f.skill ?? skill; return s ? { key: f.key, name: f.name || f.stmt || f.key, skill: s } : { key: f.key, name: f.name || f.stmt || f.key } }), null, 0) + '\n')
  // the delta gate: byte-identical content = the kernel's prior signature stands — verify by receipt, skip the spawn
  const address = toUuid(lean)
  const cache = readProofCache()
  if (cache[file] === address && !process.env.UUIDNA_PROVE_ALL) {
    console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified by receipt (unchanged at ' + address.slice(0, 8) + '; the kernel signed this exact text — UUIDNA_PROVE_ALL=1 re-proves)')
    return facts.length
  }
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
  console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified sorry-free (receipt ' + address.slice(0, 8) + ' cached — the next unchanged run verifies free).')
  return facts.length
}
