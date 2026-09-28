#!/usr/bin/env node
// finders — THE AUDIT CHAIN'S FINDERS, DISCOVERED FROM THEIR OWN DECLARATIONS RATHER THAN TYPED IN ONE LINE.
//
// The captain, 2026-09-28: "simplify. consolidate!"
//
// MEASURED BEFORE CUTTING: the `audit` npm script was 2,768 characters on ONE line — 63 hand-sequenced steps, 57 of
// them `node dist/scripts/X.js &&`. Twenty-one of those steps were independent gap classes, and that list is where the
// manual work lived: three finders written in this session were each wired by hand into that line, and one of them
// (api-cross) was caught by the dormancy test only because a LANDING refused twenty minutes later. A list somebody
// edits is a list somebody forgets.
//
// SO EACH FINDER DECLARES ITSELF. A file carrying `// @finder phase:<n>` is in the chain, at that phase; a file without
// it is not. Adding a finder is writing the finder — nothing central is edited, and the dormancy law is satisfied by
// construction because the runner discovers whatever declared itself. The phases were read off the chain as it stood
// when the hand list was dissolved, so the order did not change on the day it stopped being typed.
//
// ORDER STILL MATTERS AND IS STILL DECLARED. These are independent gap classes, but several read what an earlier one
// wrote (api-cross reads api-discovery's artifact; time-census reads what the censuses before it recorded), so the
// phase is part of the declaration rather than a sort by filename that would silently reorder them.
//
// A FINDER THAT FAILS DOES NOT STOP THE OTHERS. Each one is a separate question about the tree, and answering six of
// them is worth more than stopping at the first — the chain's `&&` meant one red finder hid every finding behind it.
// The runner reports each verdict and exits non-zero if any failed, so the gate's authority is unchanged while the
// information is no longer truncated.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT } from '../boundary.js'

const SRC = join(ROOT, 'src', 'scripts')

export interface Declared { name: string; phase: number }

/** every finder that declares itself, in the order it declares — read from source, never from a list beside it */
export function declaredFinders(dir = SRC): Declared[] {
  const out: Declared[] = []
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.ts') || file.endsWith('.test.ts') || file === 'finders.ts') continue
    const text = readFileSync(join(dir, file), 'utf8')
    const m = /@finder\s+phase:(\d+)/.exec(text)
    if (!m) continue
    out.push({ name: file.replace(/\.ts$/, ''), phase: Number(m[1]) })
  }
  return out.sort((a, b) => a.phase - b.phase || a.name.localeCompare(b.name))
}

if (process.argv[1]?.endsWith('finders.js')) {
  const finders = declaredFinders()
  console.log(`finders — ${finders.length} declared, discovered from their own source`)
  const failed: string[] = []
  for (const f of finders) {
    const t0 = process.hrtime.bigint()
    const r = spawnSync('node', [join(ROOT, 'dist', 'scripts', f.name + '.js')], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    const ms = Number(process.hrtime.bigint() - t0) / 1e6
    // A SPAWN THAT NEVER STARTED reports status null, which is not a failure of the finder — it is a failure to ask.
    // Folding it into "failed" would report a verdict about the tree that was never reached (the lesson qpu's own
    // `ran` field carries), so it is named separately.
    if (r.status === null) {
      console.error(`  ? ${f.name} — NEVER RAN (${r.error?.message ?? 'no status'}); this is not a finding about the tree`)
      failed.push(f.name)
      continue
    }
    if (r.status === 0) console.log(`  ✓ ${f.name} (${ms.toFixed(0)} ms)`)
    else {
      failed.push(f.name)
      console.error(`  ✗ ${f.name} (${ms.toFixed(0)} ms) — its own words:`)
      // A FAILING FINDER MUST SAY SOMETHING. The first version printed only lines beginning with a marker, and both
      // finders that failed on its first run print their findings without one — so the runner announced two failures
      // and quoted neither, which is the "green over an absent action" shape this tree keeps paying for. Markers
      // first, because they are the actionable lines; the tail when there are none, because silence is not a report.
      const all = (r.stdout + '\n' + r.stderr).split('\n').filter((l) => l.trim() !== '')
      const marked = all.filter((l) => /^\s*(✗|GAP|FIX|·|\?)/.test(l))
      const said = marked.length > 0 ? marked.slice(0, 6) : all.slice(-6)
      for (const l of said) console.error(`      ${l.trim().slice(0, 190)}`)
    }
  }
  if (failed.length > 0) {
    console.error(`\n✗ finders — ${failed.length} of ${finders.length} found something: ${failed.join(', ')}`)
    process.exit(1)
  }
  console.log(`\n✓ finders — all ${finders.length} clean`)
}
