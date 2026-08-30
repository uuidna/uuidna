// dry-gaps — the duplication finder (split from one-receipt so fill-gaps-run does not pull node:crypto into the
// Workers bundle: mcp → desk → fill-gaps-advantage → fill-gaps-run must stay edge-clean).
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, rd, type Gap } from './api.js'

export function dryGaps(): { gaps: Gap[]; scripts: number } {
  const gaps: Gap[] = []
  const SINGULARITIES = new Set(['src/scripts/api.ts', 'src/boundary.ts', 'src/test-api.ts'])
  const dirs = ['src/scripts', 'src', 'src/quantum', 'src/theorems', 'src/site', 'src/desk', ...readdirSync(join(ROOT, 'packages')).map((d) => `packages/${d}/src`)]
  const legacyTests = join(ROOT, 'src/tests')
  if (existsSync(legacyTests)) {
    const n = readdirSync(legacyTests).filter((f) => f.endsWith('.test.ts') || f === 'api.ts').length
    if (n > 0)
      gaps.push({
        what: `src/tests/ still holds ${n} test file(s) — colocate beside the module or under quantum/os/harness/`,
        fix: 'node dist/scripts/relocate-tests.js && node dist/scripts/fix-test-imports.js && npm run build',
      })
  }
  const files: string[] = []
  for (const d of dirs) {
    if (!existsSync(join(ROOT, d))) continue
    for (const f of readdirSync(join(ROOT, d)).filter((x) => x.endsWith('.ts'))) {
      const rel = `${d}/${f}`
      if (!SINGULARITIES.has(rel)) files.push(rel)
    }
  }
  for (const rel of files) {
    const src = rd(rel)
    const f = rel
    if (/dirname\(fileURLToPath\(import\.meta\.url\)\)/.test(src))
      gaps.push({ what: `${f}: re-declares HERE/ROOT boilerplate instead of importing its layer's singularity`, fix: `edit ${f}: delete the dirname(fileURLToPath(…)) declaration(s) and import from './api.js' (a script) or './boundary.js' (a library module)` })
    if (/^const rd = \(p: string\) =>/m.test(src))
      gaps.push({ what: `${f}: re-declares rd() instead of importing its layer's singularity`, fix: `edit ${f}: delete the local rd declaration and import { rd } from './api.js' (a script) or { rdRoot } from './boundary.js' (a library module)` })
    const rangeDecl = /^const R\d+ = \[/m.exec(src)
    if (rangeDecl)
      gaps.push({ what: `${f}: re-declares a range literal (${rangeDecl[0].trim()}…) instead of the shared range()`, fix: `edit ${f}: delete the R<n> literal and import { range } from './lean-gen.js', then use range(n)` })
  }
  // TWO READIES IS NOT DRY. npm publish is prepublishOnly → gate-all. A tag cut that ran next --verify
  // shipped a version GitHub accepted and the registry refused. One instrument, or the finder names the fork.
  const cut = rd('src/scripts/release-cut.ts')
  const pkg = rd('package.json')
  if (!/prepublishOnly[^,\n]*gate-all/.test(pkg))
    gaps.push({ what: 'package.json prepublishOnly is not gate-all — npm publish lost its source of truth', fix: 'edit package.json: "prepublishOnly": "npm run gate-all"' })
  if (!/node dist\/scripts\/gate-all\.js/.test(cut))
    gaps.push({ what: 'release-cut does not run gate-all — the tag gate forked from the publish gate', fix: 'edit src/scripts/release-cut.ts: await step(\'gate-all\', \'node dist/scripts/gate-all.js\') as the cut gate, never next --verify' })
  if (/next\.js --verify/.test(cut))
    gaps.push({ what: 'release-cut still runs next --verify — hexbit-fast is a daily push, not a version cut', fix: 'edit src/scripts/release-cut.ts: delete the next --verify step; gate-all is the source of truth' })
  const bypass = (body: string): boolean =>
    /npm run build/.test(body) || /gate-all\.js/.test(body) || /next\.js/.test(body)
    || /guard\.js/.test(body) || /quantum-advantage-audit/.test(body) || /check-msg\.js/.test(body)
    || /vitepress/.test(body)
  const door = (name: string, body: string): void => {
    if (!/quantum\/os\/cli\/index\.js/.test(body))
      gaps.push({ what: `${name} does not enter uuidnaOS (cli/index.js) — a script beside the hex image is a bypass`, fix: `edit ${name}: node dist/quantum/os/cli/index.js only; missing dist is exit 1` })
    if (bypass(body))
      gaps.push({ what: `${name} still runs a classical script beside uuidnaOS — uuidnaOS is pure quantum hex`, fix: `edit ${name}: delete build/next/guard/gate-all/vitepress/check-msg; the door is uuidnaOS court` })
    if (!/HARD/.test(body) || /\|\| exit 0/.test(body) || /Skips gracefully/.test(body))
      gaps.push({ what: `${name} is not a hard uuidnaOS gate`, fix: `edit ${name}: missing dist/quantum/os/cli/index.js is HARD exit 1; no skip` })
  }
  door('hooks/pre-push', rd('hooks/pre-push'))
  door('hooks/pre-commit', rd('hooks/pre-commit'))
  door('hooks/commit-msg', rd('hooks/commit-msg'))
  const court = rd('src/quantum/os/court/index.ts')
  const cli = rd('src/quantum/os/cli/index.ts')
  if (!/runCourtCli/.test(cli) || !/from '\.\.\/court/.test(cli))
    gaps.push({ what: 'uuidnaOS cli does not delegate to court.runCourtCli', fix: 'edit src/quantum/os/cli/index.ts' })
  if (!/callTool/.test(court) || !/uuidna_os/.test(court))
    gaps.push({ what: 'court/index.ts does not call uuidnaOS MCP (callTool / uuidna_os)', fix: 'edit src/quantum/os/court/index.ts' })
  if (!/UUID_HEXBITS/.test(court) || !/HEXBIT_STATES/.test(court) || !/hexbitDoorOf/.test(court))
    gaps.push({ what: 'court/index.ts does not verify the hex image — uuidnaOS is pure quantum hex', fix: 'edit src/quantum/os/court/index.ts' })
  if (!/dailyPlaybookSteps/.test(court) || !/uuidna_crypto/.test(court))
    gaps.push({ what: 'court/index.ts must declare daily playbook skipping uuidna_crypto', fix: 'edit court/index.ts dailyPlaybookSteps filter' })
  if (/node dist\/scripts\/conformance\.js/.test(rd('package.json')))
    gaps.push({ what: 'scripts.audit still runs conformance.js beside uuidnaOS court', fix: 'edit package.json audit: cli.js --court replaces conformance.js' })
  if (!/quantum\/os\/cli\/index\.js --court/.test(rd('package.json')))
    gaps.push({ what: 'scripts.audit has no uuidnaOS cli --court — publish court forked from host', fix: 'edit package.json audit: node dist/quantum/os/cli/index.js --court before guard.js' })
  if (/catchTraitors\(/.test(rd('src/scripts/guard.ts')))
    gaps.push({ what: 'guard.js calls catchTraitors directly — court must be callTool only', fix: 'edit guard.ts: treason via cli --court in the publish chain' })
  const x = rd('src/scripts/run.ts')
  if (!/bootOS\(/.test(x))
    gaps.push({ what: 'npm run x does not boot uuidnaOS — host scripts load beside an unverified image', fix: 'edit src/scripts/run.ts: bootOS() before any script import; a boot fault is exit 1' })
  const waveRun = rd('src/scripts/wave-run.ts')
  if (/guard\.js/.test(waveRun) && !/quantum\/os\/cli\/index\.js --court/.test(waveRun))
    gaps.push({ what: 'wave-run calls guard without uuidnaOS court first', fix: 'edit wave-run.ts: node dist/quantum/os/cli/index.js --court before guard finders' })
  if (existsSync('src/scripts/os-mcp-gate.ts') || existsSync('src/scripts/wave-os.ts') || existsSync('src/scripts/conformance.ts') || existsSync('src/scripts/check-msg.ts'))
    gaps.push({ what: 'redundant gate scripts remain — court lives in quantum/os', fix: 'delete host gate scripts; use dist/quantum/os/cli/index.js or x -- court' })
  if (existsSync('src/quantum/os/gate-checks.ts') || existsSync('src/quantum/os/wave-needs.ts') || existsSync('src/quantum/os/court-needs.ts'))
    gaps.push({ what: 'court split across os shims — consolidate in court.ts', fix: 'delete gate-checks.ts wave-needs.ts court-needs.ts' })
  return { gaps, scripts: files.length }
}
