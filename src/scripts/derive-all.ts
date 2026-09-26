#!/usr/bin/env node
// derive-all — RUN WHAT THE GATES THEMSELVES PRESCRIBE, TO A FIXED POINT. One command between a new theorem and green.
//
// The captain, 2026-09-26: "simplify for zero resistance to novelty". The resistance was measured, not guessed: this
// session sealed five theorems and the landing was refused FOUR times, every time on derived surfaces that a chain
// should have regenerated and none did. Counted afterwards — 65 gen-* generators exist and SEVEN are named by any of
// the three hand-written `&&` chains (`npm run lean`, `npm run reconcile`, DERIVE_SURFACES_CMD). `npm run lean` even
// runs latex-crosscheck, the CHECK, without gen-latex, the WRITE, so it can report the paper stale and never fix it.
// Six generators — gen-seo-freeze, gen-mcp-docs, gen-latex, gen-articles, gen-school, gen-llm — are run by nobody.
//
// SO A HUMAN CHASED THEM ONE AT A TIME, which is exactly the friction the captain named: a new theorem costs several
// landing refusals, each naming one surface, each cured by hand.
//
// AND A FOURTH HAND-WRITTEN LIST WOULD HAVE BEEN THE WRONG CURE. Blanket-running all 65 is worse than the disease:
// gen-seo-freeze's own words are that the map is extended "deliberately only when adding a NEW sealed subject, never
// to chase a slug edit", and gen-quantum-capacity is explicitly not a wave's business. A list I typed would also lag
// the moment a generator was added — which is precisely how the three existing chains got here.
//
// THE DECLARATION ALREADY EXISTS, AND IT IS THE GATES. Every finder in guard returns Gap { what, fix }, and the fix
// NAMES ITS OWN REMEDY — "run `npm run x -- gen-falsifiers`", "run gen-mcp-docs", "run `node
// dist/scripts/gen-seo-freeze.js`". prescribed-scripts.test already holds those prescriptions to existing commands,
// so they are curated and checked. This reads them: run the gate, take the fixes it prescribes, run those, and ask
// again. Nothing is listed here, and a finder added tomorrow enrols its own generator by having a fix.
//
// IT RUNS TO A FIXED POINT BECAUSE THE TREE HAS ONE. Several sealed theorems are censuses OF the tree — reach_tactics_
// census, prose_coverage_total, the_store_footprint_is_its_folders — so regenerating a surface moves the theorems
// that count it, which moves the surfaces again. One pass cannot converge BY CONSTRUCTION — the input of pass n is the
// output of pass n-1 — and chasing that by hand is what turned four refusals into a morning. The loop repeats until the gate reports the same gaps twice, which is the honest stop: it
// means the remaining gaps are NOT the kind a generator clears, and it says so rather than spinning.
import { spawnSync } from 'node:child_process'

const PASSES = Number(process.env.UUIDNA_DERIVE_PASSES ?? 4)
const DRY = !process.argv.includes('--run')

/** the commands a gap's own fix prescribes, in the three forms the finders write them. Extracted, never listed:
 *  `npm run x -- <script>` is the dispatcher form the scripts finder asks for, `node dist/scripts/<name>.js` is the
 *  direct form, and a bare `run <name>` names a generator by its script name. */
function prescribedIn(fix: string): string[] {
  const out: string[] = []
  for (const m of fix.matchAll(/npm run x -- ([a-z0-9][a-z0-9:_-]*)/g)) out.push(`npm run x -- ${m[1]}`)
  for (const m of fix.matchAll(/node dist\/scripts\/([a-z0-9-]+)\.js/g)) out.push(`npm run x -- ${m[1]}`)
  // `run gen-mcp-docs` — a bare imperative naming a generator, which only counts when it starts with gen-
  for (const m of fix.matchAll(/run (gen-[a-z0-9-]+)\b/g)) out.push(`npm run x -- ${m[1]}`)
  return out
}

const guard = (): { code: number; text: string } => {
  const r = spawnSync('npm', ['run', 'guard'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  return { code: r.status ?? 1, text: `${r.stdout ?? ''}${r.stderr ?? ''}` }
}

/** THE GAPS AS THE GATE PRINTS THEM. guard's FINDERS table is not exported, so this reads its report rather than
 *  importing its internals — which is also the more honest coupling: the loop reacts to what the gate SAYS, exactly
 *  as a person would, and cannot drift from the gate BY CONSTRUCTION: there is only one code path, the gate's own
 *  process, and this reads its output rather than a second copy of its logic. */
const fixesFrom = (text: string): string[] => {
  const seen = new Set<string>()
  for (const line of text.split('\n')) {
    const m = /^\s*FIX\s+(.*)$/.exec(line)
    if (!m) continue
    for (const c of prescribedIn(m[1]!)) seen.add(c)
  }
  return [...seen]
}

let previous = ''
for (let pass = 1; pass <= PASSES; pass++) {
  const g = guard()
  if (g.code === 0) {
    console.log(`✓ derive-all — green after ${pass - 1} regeneration pass(es); the gate prescribes nothing.`)
    process.exit(0)
  }
  const fixes = fixesFrom(g.text)
  const gaps = (g.text.match(/^\s*GAP /gm) ?? []).length
  const signature = `${gaps}|${fixes.sort().join('|')}`
  console.log(`· pass ${pass} — the gate reports ${gaps} gap(s) and prescribes ${fixes.length} command(s): ${fixes.join(', ') || '(none)'}`)

  if (!fixes.length) {
    console.log('✗ derive-all — the gate is red and prescribes no generator. These gaps are not the kind a')
    console.log('  regeneration clears; read them and fix the cause. Nothing was run.')
    process.exit(1)
  }
  if (signature === previous) {
    console.log('✗ derive-all — the same gaps and the same prescriptions twice: the commands are not clearing them.')
    console.log('  Stopping rather than spinning. This is a real defect behind a prescribed fix, not a stale surface.')
    process.exit(1)
  }
  previous = signature

  if (DRY) {
    console.log('\n  DRY: nothing run. Pass --run to regenerate to a fixed point.')
    process.exit(0)
  }
  for (const cmd of fixes) {
    const parts = cmd.split(' ')
    const r = spawnSync(parts[0]!, parts.slice(1), { encoding: 'utf8', stdio: 'inherit', maxBuffer: 64 * 1024 * 1024 })
    if (r.status !== 0) {
      console.log(`✗ derive-all — \`${cmd}\` exited ${r.status}. A prescribed fix that fails is a finding; stopping.`)
      process.exit(1)
    }
  }
}

console.log(`✗ derive-all — still red after ${PASSES} passes. The tree has a census fixed point that is not settling;`)
console.log('  raise UUIDNA_DERIVE_PASSES only if each pass is visibly reducing the gaps, and read them otherwise.')
process.exit(1)
