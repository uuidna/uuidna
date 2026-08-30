// dry-gaps — the duplication finder (split from one-receipt so fill-gaps-run does not pull node:crypto into the
// Workers bundle: mcp → desk → fill-gaps-advantage → fill-gaps-run must stay edge-clean).
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, rd, type Gap } from './api.js'

export function dryGaps(): { gaps: Gap[]; scripts: number } {
  const gaps: Gap[] = []
  const SINGULARITIES = new Set(['src/scripts/api.ts', 'src/boundary.ts', 'src/tests/api.ts'])
  const dirs = ['src/scripts', 'src', 'src/quantum', 'src/theorems', 'src/tests', 'src/site', 'src/desk', ...readdirSync(join(ROOT, 'packages')).map((d) => `packages/${d}/src`)]
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
  return { gaps, scripts: files.length }
}
