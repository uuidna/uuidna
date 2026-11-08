/**
 * Print every tree-named printable, then test each on tree-named printers.
 * No physical printer — publishing.print / printmaking.* / optics.dpi / raster.dpi / driver.dmaPages.
 *
 *   tools/call papers { print: true }
 *   tools/call connector { print: true }
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CombinatoricsFormulas } from '../families/combinatorics/index.js'
import { PublishingFormulas } from '../families/publishing/index.js'
import { PrintmakingFormulas } from '../families/printmaking/index.js'
import { OpticsFormulas } from '../families/optics/index.js'
import { RasterFormulas } from '../families/raster/index.js'
import { DriverFormulas } from '../families/driver/index.js'
import { qpuHexUuidOf } from '../quantum/processing/unit/index.js'
import { printChipsOf } from './print-chips.js'
import { papersOf } from './papers.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export type Printable = {
  id: string
  kind: 'chip-blueprint' | 'chip-whitepaper' | 'chip-index' | 'mcp-blueprint' | 'mcp-whitepaper' | 'script-doc'
  path: string | null
  bytes: number
  pages: number
  holds: boolean
}

export type PrinterProbe = {
  address: string
  params: number[]
  value: number
  holds: boolean
  hex: string | null
}

export type MatrixCell = {
  printable: string
  printer: string
  params: number[]
  value: number
  hex: string | null
  holds: boolean
  pass: boolean
}

const hexOf = (family: string, formula: string, params: number[]): string | null => {
  try {
    return qpuHexUuidOf({ family, program: [formula], params })
  } catch {
    return null
  }
}

const pagesOf = (bytes: number): number => {
  const p = PublishingFormulas.pages(Math.max(bytes, 1), 500)
  return Math.max(1, p.value)
}

const filePrintableOf = (id: string, kind: Printable['kind'], rel: string, holds: boolean): Printable => {
  const abs = path.join(ROOT, rel)
  const bytes = existsSync(abs) ? statSync(abs).size : 0
  return { id, kind, path: rel, bytes, pages: pagesOf(bytes || 1), holds: holds && bytes > 0 }
}

/** Tree-named printers — each probe takes printable size/count args. */
const printersOnOf = (p: Printable): PrinterProbe[] => {
  const copies = Math.max(1, p.pages)
  const signatures = 1
  const bytes = Math.max(1, p.bytes)
  const inches = Math.max(1, Math.ceil(bytes / 10_000))
  const pixels = Math.max(bytes, copies * 72)
  const good = p.holds ? copies : 0
  const total = Math.max(1, copies)

  const run = (family: string, formula: string, params: number[], row: { value: number; holds: boolean }): PrinterProbe => ({
    address: `${family}.${formula}`,
    params,
    value: row.value,
    holds: row.holds === true,
    hex: hexOf(family, formula, params),
  })

  return [
    run('publishing', 'print', [copies, signatures], PublishingFormulas.print(copies, signatures)),
    run('publishing', 'pages', [bytes, 500], PublishingFormulas.pages(bytes, 500)),
    run('printmaking', 'editionsize', [copies, signatures], PrintmakingFormulas.editionsize(copies, signatures)),
    run('printmaking', 'platepasses', [copies, signatures], PrintmakingFormulas.platepasses(copies, signatures)),
    run('printmaking', 'yieldratio', [good, total], PrintmakingFormulas.yieldratio(good, total)),
    run('printmaking', 'pressuresetting', [bytes, Math.max(1, copies)], PrintmakingFormulas.pressuresetting(bytes, Math.max(1, copies))),
    run('optics', 'dpi', [pixels, inches], OpticsFormulas.dpi(pixels, inches)),
    run('raster', 'dpi', [pixels, inches], RasterFormulas.dpi(pixels, inches)),
    run('driver', 'dmaPages', [bytes], DriverFormulas.dmaPages(bytes)),
  ]
}

/**
 * Inventory printables → print chips + papers generators → test every printable on every printer.
 * Combinatorics.combinations names the batch size of the matrix.
 */
export const printAllOf = async (): Promise<{
  kind: 'print-all'
  call: 'tools/call connector { print: true }'
  printables: Printable[]
  printers: string[]
  matrix: MatrixCell[]
  combinatorics: { address: string; params: number[]; value: number; holds: boolean; hex: string | null }
  summary: { printables: number; printers: number; cells: number; pass: number; fail: number }
  chips: Awaited<ReturnType<typeof printChipsOf>>
  papers: { wrote: string[]; holds: boolean; rows: number }
  wrote: string[]
  holds: boolean
  goal: 'OPEN'
  note: string
}> => {
  const chips = await printChipsOf()
  // papersOf may wait on dist for script writers — still inventories blueprint/whitepaper generators.
  const papers = await papersOf()

  const printables: Printable[] = []
  for (const c of chips.chips) {
    printables.push(filePrintableOf(`${c.chip}-blueprint`, 'chip-blueprint', c.blueprint, c.holds))
    printables.push(filePrintableOf(`${c.chip}-whitepaper`, 'chip-whitepaper', c.whitepaper, c.holds))
  }
  printables.push(filePrintableOf('qpu-chip-index', 'chip-index', 'docs/chips/qpu-chip-index.md', chips.holds))

  printables.push({
    id: 'mcp-blueprints',
    kind: 'mcp-blueprint',
    path: null,
    bytes: chips.generators.blueprints,
    pages: Math.max(1, chips.generators.blueprints),
    holds: chips.generators.blueprints > 0,
  })
  printables.push({
    id: 'mcp-whitepapers',
    kind: 'mcp-whitepaper',
    path: null,
    bytes: chips.generators.pages * 500,
    pages: Math.max(1, chips.generators.pages),
    holds: chips.generators.whitepapers > 0,
  })

  for (const w of papers.wrote) {
    printables.push(filePrintableOf(`script:${w}`, 'script-doc', w, true))
  }

  const printerNames = [
    'publishing.print',
    'publishing.pages',
    'printmaking.editionsize',
    'printmaking.platepasses',
    'printmaking.yieldratio',
    'printmaking.pressuresetting',
    'optics.dpi',
    'raster.dpi',
    'driver.dmaPages',
  ]

  const matrix: MatrixCell[] = []
  for (const printable of printables) {
    for (const probe of printersOnOf(printable)) {
      const pass = printable.holds === true && probe.holds === true && probe.value >= 0
      matrix.push({
        printable: printable.id,
        printer: probe.address,
        params: probe.params,
        value: probe.value,
        hex: probe.hex,
        holds: probe.holds,
        pass,
      })
    }
  }

  const nP = printables.length
  const nR = printerNames.length
  const combo = CombinatoricsFormulas.combinations(nP, Math.min(nP, 1))
  const product = CombinatoricsFormulas.combinations(nP + nR, 2)

  const pass = matrix.filter((c) => c.pass).length
  const fail = matrix.length - pass

  // Write matrix receipt beside chip prints.
  const matrixPath = path.join(ROOT, 'docs', 'chips', 'print-matrix.json')
  const receipt = {
    kind: 'print-matrix',
    printables: printables.map((p) => ({ id: p.id, kind: p.kind, path: p.path, bytes: p.bytes, pages: p.pages, holds: p.holds })),
    printers: printerNames,
    matrix,
    summary: { printables: nP, printers: nR, cells: matrix.length, pass, fail },
    holds: fail === 0 && chips.holds,
  }
  const { writeFileSync, mkdirSync } = await import('node:fs')
  mkdirSync(path.dirname(matrixPath), { recursive: true })
  writeFileSync(matrixPath, `${JSON.stringify(receipt, null, 2)}\n`)

  const wrote = [...chips.wrote, ...papers.wrote, 'docs/chips/print-matrix.json']

  return {
    kind: 'print-all',
    call: 'tools/call connector { print: true }',
    printables,
    printers: printerNames,
    matrix,
    combinatorics: {
      address: 'combinatorics.combinations',
      params: [nP, 1],
      value: combo.value,
      holds: combo.holds === true,
      hex: hexOf('combinatorics', 'combinations', [nP, 1]),
      ...(product.holds ? { batch: product.value } : {}),
    },
    summary: { printables: nP, printers: nR, cells: matrix.length, pass, fail },
    chips,
    papers: { wrote: papers.wrote, holds: papers.holds, rows: papers.rows.length },
    wrote,
    holds: fail === 0 && chips.holds === true && combo.holds === true,
    goal: 'OPEN',
    note: 'every printable tested on publishing.print / printmaking.* / optics.dpi / raster.dpi / driver.dmaPages — tree printers only',
  }
}
