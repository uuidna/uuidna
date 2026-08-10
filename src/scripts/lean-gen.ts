// lean-gen — the ONE compute → generate → verify pipeline, shared by every lean:* generator (DRY). A generator
// computes its facts (each a decidable JS predicate paired with a Lean proposition or full theorem), and calls
// emit(): it checks every fact holds in JS, writes lean/<File>.lean and lean/<file>-manifest.json (the microdata
// bridge — {key,name} per theorem), and shells out to `lean` to verify the file compiles sorry-free. One helper,
// no repetition. Integrity, not truth.
import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
export const m9 = (n: number): number => ((n % 9) + 9) % 9

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
}

// emit's arguments: the target Lean file, its header comment, the facts to prove, and shared Lean defs.
export interface EmitArgs {
  file: string
  header: string
  facts: Fact[]
  defs?: string
}

// One helper, no repetition: JS-check every fact, write lean/<File>.lean + its manifest, verify sorry-free.
export function emit({ file, header, facts, defs = '' }: EmitArgs): number {
  const fail = facts.filter((f) => f.js && f.js() !== true)
  if (fail.length) { console.log('✗ ' + file + ' — JS check failed: ' + fail.map((f) => f.key).join(', ')); process.exit(1) }
  const body = facts.map((f) => (f.lean ? (f.name ? '-- ' + f.name + '\n' : '') + f.lean : `theorem ${f.key} : ${f.stmt} := by decide`)).join('\n\n')
  const lean = `-- lean/${file} — GENERATED. ${header} Every proof \`by decide\`, sorry-free, no Mathlib.\n\n${defs ? defs.trim() + '\n\n' : ''}${body}\n`
  writeFileSync(join(ROOT, 'lean', file), lean)
  writeFileSync(join(ROOT, 'lean', file.replace('.lean', '').toLowerCase() + '-manifest.json'), JSON.stringify(facts.map((f) => ({ key: f.key, name: f.name || f.stmt || f.key })), null, 0) + '\n')
  execSync('lean ' + JSON.stringify(join(ROOT, 'lean', file)), { cwd: ROOT, stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 })
  console.log('✓ lean/' + file + ' — ' + facts.length + ' theorems, verified sorry-free.')
  return facts.length
}
