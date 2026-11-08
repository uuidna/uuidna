/**
 * One call runs every blueprint and white-paper generator the tree already names.
 * Reachable through the unit boot, stdio, and any sealed door (`{ door: "papers" }`, including cite).
 * A script that imports dist is not spawned while dist is held.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { generateAllBlueprints } from './blueprint-generator.js'
import { generateAllWhitePapers } from './whitepaper-generator.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const SCRIPTS: readonly { generator: string; writes: readonly string[] }[] = [
  { generator: 'scripts/generate-readme.mjs', writes: ['README.md', 'RELEASE.md', '.zenodo.json'] },
  { generator: 'scripts/generate-docs.mjs', writes: ['docs', 'src/seed/docs.ts'] },
  { generator: 'scripts/generate-skills.mjs', writes: ['.claude/skills/qpu-families/SKILL.md', '.claude/skills/payload-cloudflare/SKILL.md'] },
]

const NEEDLE = /blueprint|whitepaper|white-paper|white_paper|generate-readme|generate-docs|generate-skills/i

export type PaperRow = {
  generator: string
  path: string | null
  hex: string | null
  value: number | null
  holds: boolean
  next: number | string | null
  absent: string | null
  waited: 'dist' | null
}

/** Dist is held while npm test, the build, or a node test of dist is running, or while the built unit is missing. */
const distHeldOf = (): boolean => {
  if (!existsSync(path.join(ROOT, 'dist/quantum/processing/unit/index.js'))) return true
  try {
    const out = execFileSync('ps', ['-ax', '-o', 'command='], { encoding: 'utf8' })
    return out.split('\n').some((line) =>
      /(^|[^\w])npm test\b/.test(line) ||
      /npm run build\b/.test(line) ||
      /node --test .*dist\//.test(line) ||
      /(^|[^\w])tsc(\s|$)/.test(line))
  } catch {
    return true
  }
}

const rowOf = (partial: Partial<PaperRow> & Pick<PaperRow, 'generator'>): PaperRow => ({
  path: null,
  hex: null,
  value: null,
  holds: false,
  next: null,
  absent: null,
  waited: null,
  ...partial,
})

/**
 * Run every blueprint and white-paper generator this tree names.
 * In-process generators return counts and write no file.
 * Script generators write their own files, and only when dist is free.
 * A formula address with no generator is recorded absent. No document is written for it.
 * qpu.improve is not called: that address does not write files and does not call these generators.
 * @wing agents
 * @kind function
 */
export const papersOf = async (args: Record<string, unknown> = {}): Promise<{
  kind: 'papers'
  wrote: string[]
  rows: PaperRow[]
  holds: boolean
  chips?: Awaited<ReturnType<typeof import('./print-chips.js').printChipsOf>>
  print?: Awaited<ReturnType<typeof import('./print-all.js').printAllOf>>
}> => {
  const rows: PaperRow[] = []
  const wrote: string[] = []

  // Layered chip print / full printable×printer matrix — fused args, not a tools/list door.
  if (args.print === true || args.printAll === true) {
    const { printAllOf } = await import('./print-all.js')
    const print = await printAllOf()
    return {
      kind: 'papers',
      wrote: print.wrote,
      rows: print.matrix.map((c) =>
        rowOf({
          generator: `${c.printable}→${c.printer}`,
          path: null,
          hex: c.hex,
          value: c.value,
          holds: c.pass,
        }),
      ),
      holds: print.holds,
      print,
      chips: print.chips,
    }
  }
  if (args.chips === true || args.chip === true) {
    const { printChipsOf } = await import('./print-chips.js')
    const chips = await printChipsOf()
    return {
      kind: 'papers',
      wrote: chips.wrote,
      rows: [
        rowOf({
          generator: 'src/mcp/print-chips.ts#printChipsOf',
          value: chips.rays.layerCount,
          holds: chips.holds,
          path: 'docs/chips',
        }),
        ...chips.chips.map((c) =>
          rowOf({ generator: c.chip, path: c.blueprint, value: c.layers, holds: c.holds }),
        ),
        ...chips.printers.map((p) =>
          rowOf({ generator: p.address, hex: p.hex, value: p.value, holds: p.pass }),
        ),
      ],
      holds: chips.holds,
      chips,
    }
  }

  const blueprints = await generateAllBlueprints()
  rows.push(rowOf({
    generator: 'src/mcp/blueprint-generator.ts#generateAllBlueprints',
    value: blueprints.total,
    holds: blueprints.ready_for_deployment === true,
  }))

  const papers = await generateAllWhitePapers()
  rows.push(rowOf({
    generator: 'src/mcp/whitepaper-generator.ts#generateAllWhitePapers',
    value: papers.total_papers,
    holds: papers.total_papers > 0,
  }))

  const held = distHeldOf()
  for (const script of SCRIPTS) {
    if (held) {
      rows.push(rowOf({ generator: script.generator, waited: 'dist' }))
      continue
    }
    const run = spawnSync(process.execPath, [script.generator], { cwd: ROOT, encoding: 'utf8' })
    const ok = run.status === 0
    if (!ok) {
      const detail = (run.stderr || run.stdout || 'exit').trim().slice(0, 240)
      rows.push(rowOf({ generator: script.generator, value: run.status, absent: detail || null }))
      continue
    }
    for (const file of script.writes) {
      wrote.push(file)
      rows.push(rowOf({ generator: script.generator, path: file, holds: true }))
    }
  }

  rows.push(rowOf({
    generator: 'scripts/generate.mjs',
    absent: 'the door calls scripts/generate-readme.mjs and scripts/generate-docs.mjs',
    waited: held ? 'dist' : null,
  }))

  const { hexFamiliesOf, qpuHexUuidOf } = await import('../quantum/processing/unit/index.js')
  let matched = 0
  for (const [family, formulas] of hexFamiliesOf()) {
    for (const formula of formulas) {
      if (!NEEDLE.test(family) && !NEEDLE.test(formula.name)) continue
      matched += 1
      let hex: string | null = null
      try {
        hex = formula.arity === 0 ? qpuHexUuidOf({ family, program: [formula.name], params: [] }) : null
      } catch {
        hex = null
      }
      rows.push(rowOf({
        generator: `${family}.${formula.name}`,
        hex,
        absent: 'no generator writes this address',
      }))
    }
  }
  if (matched === 0) {
    rows.push(rowOf({
      generator: 'blueprint|whitepaper|white-paper|generate-readme|docs',
      absent: 'no registered formula',
    }))
  }

  let improve: string | null = null
  try {
    improve = qpuHexUuidOf({ family: 'qpu', program: ['improve'], params: [] })
  } catch {
    improve = '70a13419-6000-3000-8000-000000000000'
  }
  rows.push(rowOf({
    generator: 'qpu.improve',
    hex: improve,
    absent: 'does not write files and does not call the readme, docs, or skills generators',
  }))

  return { kind: 'papers', wrote, rows, holds: rows.some((r) => r.holds) }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await import('./families.js')
  const out = await papersOf()
  process.stdout.write(`${JSON.stringify(out)}\n`)
}
