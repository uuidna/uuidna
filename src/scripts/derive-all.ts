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

/** A FIX THAT MENTIONS A COMMAND IS NOT ALWAYS A FIX THAT ASKS FOR IT, and the first version of this missed that
 *  distinction with consequences. The scripts finder's fix reads "REMOVE it and use `npm run x -- <name>`" — the
 *  quoted command is how a reader would invoke the script AFTERWARDS, and the action is an edit to package.json.
 *  This extractor took the mention as an instruction and ran `npm run x -- zenodo-deposit`, attempting a Zenodo DOI
 *  publish. It refused, because deposits are workflow-only — which was luck, not design: the same mistake on a
 *  different script would simply have run it.
 *
 *  SO A COMMAND COUNTS ONLY WHERE THE FIX ASKS FOR IT TO BE PERFORMED: an imperative that means do-this-now ("run",
 *  "re-run", "regenerate with"), and not inside a fix whose action is a removal or an edit. Both directions are
 *  asserted in derive-all.test.ts, because a one-directional check is what let this through — every prescription I
 *  tested by hand was a genuine regeneration, so the extractor looked right. */
// `x -- ` is an alternative rather than a skipped word because `npm run x -- gen-latex` contains the literal "run x",
// so a pattern that stopped at the verb would name the DISPATCHER as the script to run.
const PERFORM = /(?:^|\s)(?:re-?run|run|regenerate with)\s+`?(?:npm run x -- |x -- |node dist\/scripts\/)?([a-z0-9][a-z0-9:_-]*)(?:\.js)?`?/g
// A FIX MAY ALSO OPEN WITH THE BARE COMMAND — axiom-reach's reads "node dist/scripts/generate.js && npm run build",
// no imperative verb at all, and the first version read zero prescriptions from it and reported the gate "not the kind
// a regeneration clears" when it was exactly that. A command in the FIRST position is the fix's action, which is the
// same reasoning NOT_AN_ACTION uses in reverse: there is no verb in front of it to make it an illustration.
const LEADS_WITH = /^\s*`?(?:npm run x -- |node dist\/scripts\/)([a-z0-9][a-z0-9:_-]*)(?:\.js)?`?/
const NOT_AN_ACTION = /\bremove it\b|\bremove the\b|\bedit\b|\bdelete\b|\bnever\b/i

export function prescribedIn(fix: string): string[] {
  // a fix whose ACTION is an edit or a removal prescribes no command, however many it quotes for illustration
  if (NOT_AN_ACTION.test(fix)) return []
  const out: string[] = []
  const lead = LEADS_WITH.exec(fix)
  if (lead) out.push(`npm run x -- ${lead[1]!}`)
  for (const m of fix.matchAll(PERFORM)) {
    const name = m[1]!
    if (name === 'npm' || name === 'node' || name === 'it' || name === 'the' || name === 'build') continue
    out.push(`npm run x -- ${name}`)
  }
  return [...new Set(out)]
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

// ── CLI: `npm run x -- derive-all [--run]`. THE LOOP RUNS ONLY WHEN THIS FILE IS THE ENTRY POINT, because
// prescribedIn is imported by its own control test — and a module whose top level runs the gate would make importing
// the extractor spawn a full guard (measured: 119 seconds, and a red exit that failed the test for reasons that had
// nothing to do with the extractor).
if (process.argv[1]?.endsWith('derive-all.js')) {
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
    // AND THEN BUILD, EVERY PASS. A generator writes TypeScript — generate.js rewrites src/theorems/generated.ts —
    // so the gate's next pass would read the PREVIOUS compile and report the same gap forever. axiom-reach's own fix
    // spells the chain out ("… && npm run build") and this is that clause, held once here rather than parsed per fix:
    // a regeneration that is not compiled has not reached the tree the gate reads.
    const built = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', stdio: 'inherit' })
    if (built.status !== 0) {
      console.log('✗ derive-all — the regenerated tree does not compile. That is a finding, not a stale surface.')
      process.exit(1)
    }
  }

  console.log(`✗ derive-all — still red after ${PASSES} passes. The tree has a census fixed point that is not settling;`)
  console.log('  raise UUIDNA_DERIVE_PASSES only if each pass is visibly reducing the gaps, and read them otherwise.')
  process.exit(1)
}
