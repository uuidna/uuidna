#!/usr/bin/env node
// predict-and-fill — quantum predictive gap filling.
// Analyzes patterns to anticipate gaps BEFORE they occur, then auto-generates fixes.
// Five predictive patterns: new theorems, new packages, new exports, new tests, new features.
// Deterministic: same source → same predictions always.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES } from '../index.js'
import { HERE, ROOT, invokesFile } from './api.js'

export interface PredictedGap {
  pattern: string
  likelihood: 'high' | 'medium' | 'low'
  location: string
  prediction: string
  autoFillAction?: { file: string; content: string }
}

function predictTheoremGaps(): PredictedGap[] {
  const gaps: PredictedGap[] = []
  const allTheorems = theorems() as any[]
  const principleNames = new Set((PRINCIPLES as any[]).map((p) => p[1]))

  // Pattern 1: Theorems without principles
  const orphans = allTheorems.filter((t) => !principleNames.has(t.principle))
  if (orphans.length > 0) {
    gaps.push({
      pattern: 'theorem-orphan',
      likelihood: 'high',
      location: 'lean/PRINCIPLE.md',
      prediction: `${orphans.length} theorems exist without principle assignment. Next theorem added will likely have same issue.`,
      autoFillAction: {
        file: 'lean/PRINCIPLE.md',
        content: `# Add missing principles for: ${orphans.map((t) => t.principle).slice(0, 3).join(', ')} (${orphans.length} total)`,
      },
    })
  }

  // Pattern 2: Theorems with axioms (should be 0)
  const withAxioms = allTheorems.filter((t) => t.axioms && t.axioms.length > 0)
  if (withAxioms.length > 0) {
    gaps.push({
      pattern: 'axiom-leak',
      likelihood: 'high',
      location: 'src/theorems/generated.ts',
      prediction: `${withAxioms.length} theorems use axioms. Pattern: next proof likely to reuse same axioms. Preemptively convert to decide-only.`,
      autoFillAction: {
        file: 'lean/axioms.json',
        content: `{"offenders": ${JSON.stringify(withAxioms.map((t) => t.key))}}`,
      },
    })
  }

  // Pattern 3: Principle count mismatch
  const expectedPrinciples = 66 // from PRINCIPLES array
  const actualPrinciples = principleNames.size
  if (actualPrinciples < expectedPrinciples) {
    gaps.push({
      pattern: 'principle-drift',
      likelihood: 'medium',
      location: 'lean/PRINCIPLE.md',
      prediction: `Principles count: ${actualPrinciples}/${expectedPrinciples}. Missing ${expectedPrinciples - actualPrinciples}. New theorems will trigger imbalance.`,
      autoFillAction: {
        file: 'lean/PRINCIPLE.md',
        content: `# Missing principles: ${expectedPrinciples - actualPrinciples}. Auto-generate placeholders and assign theorems.`,
      },
    })
  }

  return gaps
}

function predictPackageGaps(): PredictedGap[] {
  const gaps: PredictedGap[] = []
  const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']

  for (const pkg of PACKAGES) {
    const pkgDir = join(ROOT, 'packages', pkg)
    const pkgJsonPath = join(pkgDir, 'package.json')
    const srcPath = join(pkgDir, 'src', 'index.ts')
    const distPath = join(pkgDir, 'dist', 'index.js')

    if (!existsSync(pkgJsonPath)) {
      gaps.push({
        pattern: 'package-missing-config',
        likelihood: 'high',
        location: `packages/${pkg}/package.json`,
        prediction: `@uuidna/${pkg} exists but has no package.json. Pattern: new package will lack config.`,
        autoFillAction: {
          file: pkgJsonPath,
          content: `{"name":"@uuidna/${pkg}","version":"0.1.0","type":"module","license":"CC-BY-NC-ND-4.0","sideEffects":false,"engines":{"node":">=18"},"dependencies":{"@uuidna/uuidna":"file:../.."},"scripts":{"build":"tsc -p tsconfig.json"}}`,
        },
      })
    }

    // DIST-STALE, REMOVED. It compared mtimes of packages/<pkg>/dist — a directory that is
    // GITIGNORED and never committed, rebuilt from source by every CI run. So it fired after any source edit,
    // reported nothing a reader could act on, and did it at HIGH likelihood: the engine's single most severe
    // finding was a local build artifact being younger than its source, which is what a build artifact IS between
    // edits. The real check is deterministic and already runs: gen-packages --verify at guard step 3, which
    // compares the CONTENT of the generated surfaces, not a timestamp on an untracked file.

    // Pattern: Generated file without marker
    if (existsSync(srcPath)) {
      const srcContent = readFileSync(srcPath, 'utf-8')
      if (!srcContent.includes('GENERATED') && srcContent.includes('export')) {
        gaps.push({
          pattern: 'hand-authored-export',
          likelihood: 'medium',
          location: srcPath,
          prediction: `${srcPath.split('/').pop()} has exports but no "GENERATED" marker. Pattern: likely hand-edited; gen-packages --verify will fail.`,
          autoFillAction: {
            file: srcPath,
            content: `// GENERATED by src/scripts/gen-packages.ts — DO NOT EDIT`,
          },
        })
      }
    }
  }

  return gaps
}

function predictExportGaps(): PredictedGap[] {
  const gaps: PredictedGap[] = []
  const srcIndexPath = join(ROOT, 'src', 'index.ts')

  if (existsSync(srcIndexPath)) {
    const srcIndex = readFileSync(srcIndexPath, 'utf-8')
    // EXPORT-DRIFT-RISK, REMOVED. Its condition was `exportCount > 0` and a package having any
    // exports — true of this repository at every moment it has existed, so it could not fail to fire. A check that
    // holds regardless of state is the VACUOUS class `one-receipt vacuous` already exists to catch, and it was
    // reporting the POSSIBILITY of drift while gen-packages --verify was already BLOCKING the actual drift.
    // A prediction that duplicates a hard gate and cannot be false is not a prediction; it is a slogan.
    void srcIndex
  }

  return gaps
}

function predictTestGaps(): PredictedGap[] {
  const gaps: PredictedGap[] = []
  const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']

  for (const pkg of PACKAGES) {
    const pkgJsonPath = join(ROOT, 'packages', pkg, 'package.json')
    if (existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
      const testScript = pkgJson.scripts?.test || ''

      // Pattern: test script references files that don't exist
      const testFiles = testScript.match(/dist\/test\/[^\s]+\.test\.js/g) || []
      for (const testFile of testFiles) {
        const fullPath = join(ROOT, testFile)
        if (!existsSync(fullPath)) {
          gaps.push({
            pattern: 'test-file-missing',
            likelihood: 'high',
            location: `packages/${pkg}/package.json`,
            prediction: `Test script references ${testFile} but file doesn't exist. Pattern: build is incomplete or test lane broken.`,
            autoFillAction: {
              file: fullPath,
              content: `// AUTO-GENERATED test placeholder. Replace with actual tests.`,
            },
          })
        }
      }
    }
  }

  return gaps
}

/** the scripts already DECLARED dormant — read once, so the engine cannot predict what the repo has written down.
 *  A missing or unreadable list is treated as EMPTY rather than silently trusted: if the declaration cannot be
 *  read, every unwired script should be reported, not none of them. */
const DECLARED_DORMANT: Set<string> = (() => {
  try {
    const raw = JSON.parse(readFileSync(join(ROOT, 'lean', 'dormant-scripts.json'), 'utf8')) as { scripts?: string[] }
    return new Set((raw.scripts ?? []).map((x) => String(x).split('/').pop() ?? String(x)))
  } catch { return new Set<string>() }
})()

function predictFeatureGaps(): PredictedGap[] {
  const gaps: PredictedGap[] = []

  // Pattern: New files in src/scripts but not wired to npm scripts
  const scriptsDir = join(ROOT, 'src', 'scripts')
  const scriptFiles = readdirSync(scriptsDir).filter((f) => f.endsWith('.ts'))
  const packageJsonPath = join(ROOT, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  const npmScripts = Object.keys(packageJson.scripts || {})

  // A script is WIRED when something actually INVOKES it — `dist/scripts/<name>.js` in an npm script body, a CI
  // workflow, or another script that spawns it. The previous check asked whether any npm script KEY contained the
  // filename as a substring: a NAME, not a property. `audit.ts` passed it because a script named "audit" exists —
  // and that script never runs dist/scripts/audit.js. It was unwired AND dead (ENOENT on a stale root-level read)
  // for as long as nobody looked, which is exactly the gap this detector exists to prevent. (The old expression also
  // nested a second `.some` over the same keys array, rescanning it for no effect.)
  const invokerFiles = [
    join(ROOT, 'package.json'),
    ...(existsSync(join(ROOT, '.github', 'workflows'))
      ? readdirSync(join(ROOT, '.github', 'workflows')).map((f) => join(ROOT, '.github', 'workflows', f)) : []),
    // the tracked git hooks (core.hooksPath = hooks) are a real invoker: hooks/commit-msg runs check-msg.js, so
    // omitting this directory reported a script as unwired that a hook has been running on every commit.
    ...(existsSync(join(ROOT, 'hooks'))
      ? readdirSync(join(ROOT, 'hooks')).map((f) => join(ROOT, 'hooks', f)) : []),
    ...scriptFiles.map((f) => join(scriptsDir, f)),
    ...readdirSync(join(ROOT, 'src')).filter((f) => f.endsWith('.ts')).map((f) => join(ROOT, 'src', f)),
  ]
  // COMMENTS ARE NOT WIRING. Stripped before searching, because a mention in prose is not an invocation — the first
  // version of this fix proved it the hard way: the comment above, which names dist/scripts/audit.js while explaining
  // the bug, made audit.ts look wired and hid the very case it describes.
  const stripComments = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|\s)\/\/[^\n]*/g, ' ')
  const invocationText = (self: string): string => invokerFiles
    .filter((p) => p !== self)                       // a script re-spawning itself is not what wires it
    .map((p) => { try { return stripComments(readFileSync(p, 'utf-8')) } catch { return '' } })
    .join('\n')

  // DISCOVERY IS WIRING TOO. lean-all deliberately auto-discovers `dist/scripts/lean-*.js` so a new domain needs no
  // package.json entry, and half this repo's generators are wired that way. Rather than hardcode that one pattern
  // (the sin this whole sweep is about), the filename globs are READ from the invoker sources: any regex literal that
  // matches `<something>.js` is applied to the candidate, so a future `/^gen-.*\.js$/` discovery works unchanged.
  const discoveryGlobs = (text: string): RegExp[] => [...text.matchAll(/\/(\^[^/\n]{1,80}\\\.js\$?)\//g)]
    .flatMap((m) => { try { return [new RegExp(m[1])] } catch { return [] } })

  for (const file of scriptFiles) {
    const scriptName = file.replace('.ts', '')
    const others = invocationText(join(scriptsDir, file))
    // A file another module IMPORTS is a shared library (scripts/api.ts is the declared one), not a script anybody
    // runs — reachability for those is support.ts's dead-module scan. Only files nothing imports must be INVOKED.
    if (others.includes(`from './${scriptName}.js'`) || others.includes(`from './scripts/${scriptName}.js'`)) continue
    // ONE LAW, NOT TWO OPINIONS. This used to match the literal string `dist/scripts/<name>.js`, which knows
    // nothing about the `x` dispatcher (`npm run x -- <name>`), a path built up inside execSync, or node running
    // the TypeScript directly — so after the 57 thin wrappers were collapsed it declared 36 live scripts unwired,
    // and its auto-fill offered to restore exactly the wrapper scriptsGaps now BLOCKS. Two gap reporters giving
    // opposite advice is worse than either alone. Both now use invokesFile from api.ts.
    const isWired = invokesFile(others, scriptName)
      || discoveryGlobs(others).some((re) => re.test(`${scriptName}.js`))
    // A DECLARED BOUNDARY IS EXACTLY WHAT PASSES. lean/dormant-scripts.json names the scripts that are BUILT and
    // reachable and that nothing runs — a list that already exists, is exercised by exercise-dormant.ts, and may
    // only shrink. Re-reporting its 30 entries as PREDICTED gaps made 30 of this engine's 32 predictions noise,
    // and a predictor that is 94% noise is one nobody reads. It reported the declaration as a defect, which is the
    // inverse of the law every tool description here states.
    if (!isWired && DECLARED_DORMANT.has(file)) continue
    if (!isWired && !scriptName.startsWith('_')) {
      gaps.push({
        pattern: 'unwired-script',
        likelihood: 'medium',
        location: `src/scripts/${file}`,
        prediction: `${file} exists but no npm script runs it. Pattern: new scripts often forgotten in package.json.`,
        autoFillAction: {
          file: packageJsonPath,
          // NOT a thin wrapper — scriptsGaps blocks those, since a hand-typed entry per script is the repetition
          // the dispatcher removed. Wire it into a real chain, or reach it with the dispatcher.
          content: `run it with \`npm run x -- ${scriptName}\`, or wire it into the audit chain / a workflow if it should run unattended`,
        },
      })
    }
  }

  return gaps
}

/** predictGaps() → THE FIVE PREDICTORS AS DATA, so the MCP can serve what the script prints.
 *
 *  This ran only as a console script and only in CI (school.yml's registrar files it as an issue). An agent asking
 *  "what is about to break here" had no way to ask — which is the same shape as gap 49: a capability the repo has
 *  and no served door onto it. Deterministic: same source, same predictions. The autoFillAction CONTENT is
 *  deliberately not returned — a served tool proposes, it does not hand back a file to write, and the two-handle
 *  law keeps the writing hand human.
 *
 *  It reads the source TREE, so it is a stdio-only tool: the Workers edge has no filesystem and must not pretend. */
export function predictGaps(): { total: number; declaredDormantSkipped: number; byLikelihood: { high: number; medium: number; low: number }
                                 gaps: { pattern: string; likelihood: string; location: string; prediction: string; hasAutoFill: boolean }[]
                                 honest: string } {
  const all = [...predictTheoremGaps(), ...predictPackageGaps(), ...predictExportGaps(), ...predictTestGaps(), ...predictFeatureGaps()]
  return {
    total: all.length,
    // NO SILENT CAPS: what the declaration absorbed is COUNTED, never just dropped — a number that quietly
    // shrinks reads as progress, and this one is a boundary being respected, which is a different fact.
    declaredDormantSkipped: DECLARED_DORMANT.size,
    byLikelihood: {
      high: all.filter((p) => p.likelihood === 'high').length,
      medium: all.filter((p) => p.likelihood === 'medium').length,
      low: all.filter((p) => p.likelihood === 'low').length,
    },
    gaps: all.map((p) => ({ pattern: p.pattern, likelihood: p.likelihood, location: p.location,
      prediction: p.prediction, hasAutoFill: p.autoFillAction !== undefined })),
    honest:
      'PREDICTIONS from the source tree\'s own patterns — an unwired script, a drifted export, a principle with no ' +
      'test — NOT proofs and NOT a claim that any of these WILL break. Each is a pattern that has produced a gap ' +
      'here before, offered so it can be closed before it forms. Deterministic: same tree, same list. Reads the ' +
      'filesystem, so this answers from the stdio server only; the edge has none and does not pretend to. ' +
      'Integrity, not truth.',
  }
}

function main() {
  const allPredictions = [
    ...predictTheoremGaps(),
    ...predictPackageGaps(),
    ...predictExportGaps(),
    ...predictTestGaps(),
    ...predictFeatureGaps(),
  ]

  console.log('🔮 predict-and-fill — quantum predictive gap automation\n')

  if (allPredictions.length === 0) {
    console.log('✅ No predictive gaps detected. System is stable.\n')
    process.exit(0)
  }

  const byLikelihood = { high: [] as PredictedGap[], medium: [] as PredictedGap[], low: [] as PredictedGap[] }
  for (const pred of allPredictions) {
    byLikelihood[pred.likelihood].push(pred)
  }

  let predNum = 1
  for (const likelihood of ['high', 'medium', 'low'] as const) {
    if (byLikelihood[likelihood].length === 0) continue

    const icon = likelihood === 'high' ? '🚨' : likelihood === 'medium' ? '⚡' : '💡'
    console.log(`${icon} ${likelihood.toUpperCase()} LIKELIHOOD (${byLikelihood[likelihood].length})\n`)

    for (const pred of byLikelihood[likelihood]) {
      console.log(`${predNum}. [${pred.pattern}] ${pred.prediction}`)
      console.log(`   Location: ${pred.location}`)
      if (pred.autoFillAction) {
        console.log(`   Auto-fill: ${pred.autoFillAction.file}`)
      }
      console.log()
      predNum++
    }
  }

  const summary = `${byLikelihood.high.length} high, ${byLikelihood.medium.length} medium, ${byLikelihood.low.length} low`
  console.log(`📊 Summary: ${allPredictions.length} predictive gaps — ${summary}`)
  console.log('\nTo auto-fill: these actions prevent gaps before they form.')
  console.log('Guard gate will verify no drift after auto-fill.')

  process.exit(0)
}

// RUN ONLY WHEN RUN. Without this guard, importing predictGaps() executed the whole report — and the MCP tool
// that serves the predictions printed them to stdout, which on a stdio JSON-RPC server is the transport itself.
if (process.argv[1] && process.argv[1].endsWith('predict-and-fill.js')) main()