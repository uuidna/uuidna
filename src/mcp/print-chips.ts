/**
 * Chip blueprints + whitepapers with **multidimensional layers managed by UUID rays**.
 *
 * Lattice: coins · rays = faces (facesOf); rays manage the layer stack.
 * UUID: handle (qpuHandleOf) + cube bits name the chip address — tree-named, not invented.
 *
 *   tools/call papers { chips: true }
 *   tools/call connector { chips: true }
 *   tools/call connector { print: true }
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SemiconductorFormulas } from '../families/semiconductor/index.js'
import { SemiconductorsFormulas } from '../families/semiconductors/index.js'
import { HardwareFormulas } from '../families/hardware/index.js'
import { FirmwareFormulas } from '../families/firmware/index.js'
import { TopologyFormulas } from '../families/topology/index.js'
import { ManifoldFormulas } from '../families/manifold/index.js'
import { PublishingFormulas } from '../families/publishing/index.js'
import { PrintmakingFormulas } from '../families/printmaking/index.js'
import { DriverFormulas } from '../families/driver/index.js'
import {
  cubeOf,
  facesOf,
  qpuHandleOf,
  qpuHexUuidOf,
} from '../quantum/processing/unit/index.js'
import { generateAllBlueprints } from './blueprint-generator.js'
import { generateAllWhitePapers } from './whitepaper-generator.js'
import { chipLicenseMarkdownOf, imprintChipLicenseOf, verifyChipLicenseOf, type ChipLicenseImprint } from './chip-license.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, 'docs', 'chips')

type Call = { address: string; params: number[]; value: number; holds: boolean; hex: string | null; formula: string }

const hexOf = (family: string, formula: string, params: number[]): string | null => {
  try {
    return qpuHexUuidOf({ family, program: [formula], params })
  } catch {
    return null
  }
}

const callOf = (
  family: string,
  formula: string,
  params: number[],
  row: { value: number; holds: boolean; formula?: string },
): Call => ({
  address: `${family}.${formula}`,
  params,
  value: row.value,
  holds: row.holds === true,
  hex: hexOf(family, formula, params),
  formula: typeof row.formula === 'string' ? row.formula : `${family}.${formula}`,
})

/** UUID-ray lattice stack: layers = rays; multidimensional = coins × rays (= faces). */
export const chipRayLayersOf = () => {
  const faces = facesOf()
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const dim = TopologyFormulas.dimension(faces.rays)
  const manifold = ManifoldFormulas.dimension(faces.faces, faces.coins)
  // One layer per ray — formula call index maps onto ray i mod rays.
  const layers = Array.from({ length: faces.rays }, (_, ray) => ({
    ray,
    dimension: dim.value,
    coinSlot: ray % Math.max(1, faces.coins),
    faceIndex: (ray * faces.coins) % Math.max(1, faces.faces),
    manages: `UUID ray ${ray}/${faces.rays} · coin ${ray % Math.max(1, faces.coins)} · face ${(ray * faces.coins) % Math.max(1, faces.faces)}`,
  }))
  return {
    kind: 'chip-ray-layers' as const,
    lattice: {
      n: faces.n,
      coins: faces.coins,
      rays: faces.rays,
      faces: faces.faces,
      holds: faces.holds === true,
      identity: 'coins · rays = faces (theorem around / harmonic)' as const,
    },
    uuid: {
      handleBits: cube.bits,
      hexbit: cube.hexbit,
      vertices: cube.vertices,
      amplitudes: handle.amplitudes,
      next: handle.next,
      holds: cube.holds === true && handle.holds === true,
    },
    dimension: { address: 'topology.dimension', params: [faces.rays], value: dim.value, holds: dim.holds === true, hex: dim.hex ?? null },
    manifold: {
      address: 'manifold.dimension',
      params: [faces.faces, faces.coins],
      value: manifold.value,
      holds: manifold.holds === true,
      hex: manifold.hex ?? null,
    },
    layers,
    layerCount: layers.length,
    holds: faces.holds === true && cube.holds === true && handle.holds === true && dim.holds === true && layers.length === faces.rays,
  }
}

/** Chip families — each call stamped onto a ray layer. */
const chipCallsOf = (): { chip: string; proof: string; calls: Call[] }[] => {
  const semi = [
    callOf('semiconductor', 'bandgap', [1120], SemiconductorFormulas.bandgap(1120)),
    callOf('semiconductor', 'diesyield', [90, 100], SemiconductorFormulas.diesyield(90, 100)),
    callOf('semiconductor', 'doping', [1, 1_000_000], SemiconductorFormulas.doping(1, 1_000_000)),
    callOf('semiconductor', 'threshold', [700], SemiconductorFormulas.threshold(700)),
  ]
  const semis = [
    callOf('semiconductors', 'wafer', [70_650, 100], SemiconductorsFormulas.wafer(70_650, 100)),
    callOf('semiconductors', 'yield', [900, 1000], SemiconductorsFormulas.yield(900, 1000)),
    callOf('semiconductors', 'bandgap', [1120, 40], SemiconductorsFormulas.bandgap(1120, 40)),
    callOf('semiconductors', 'threshold', [900, 700], SemiconductorsFormulas.threshold(900, 700)),
  ]
  const hw = [
    callOf('hardware', 'dies', [70_650, 100], HardwareFormulas.dies(70_650, 100)),
    callOf('hardware', 'threads', [8], HardwareFormulas.threads(8)),
    callOf('hardware', 'cacheLines', [4096], HardwareFormulas.cacheLines(4096)),
    callOf('hardware', 'tdpPerCore', [125, 8], HardwareFormulas.tdpPerCore(125, 8)),
  ]
  const fw = [
    callOf('firmware', 'sectors', [1_048_576, 4096], FirmwareFormulas.sectors(1_048_576, 4096)),
    callOf('firmware', 'words', [4096], FirmwareFormulas.words(4096)),
    callOf('firmware', 'slots', [2_097_152, 1_048_576], FirmwareFormulas.slots(2_097_152, 1_048_576)),
    callOf('firmware', 'version', [1, 1, 0], FirmwareFormulas.version(1, 1, 0)),
  ]
  return [
    { chip: 'semiconductor', proof: 'src/families/semiconductor — a chip is numbers; crossed to electronics', calls: semi },
    { chip: 'semiconductors', proof: 'src/families/semiconductors — device physics of a chip; crossed to electrical', calls: semis },
    { chip: 'hardware', proof: 'src/families/hardware — dies off a wafer; the silicon\'s own arithmetic', calls: hw },
    { chip: 'firmware', proof: 'src/families/firmware — the image\'s own arithmetic on the chip', calls: fw },
  ]
}

const layeredCallsOf = (calls: Call[], rays: number): (Call & { ray: number; layer: number })[] =>
  calls.map((c, i) => ({ ...c, ray: i % rays, layer: i % rays }))

const mdOf = (
  title: string,
  proof: string,
  calls: (Call & { ray?: number; layer?: number })[],
  kind: 'blueprint' | 'whitepaper',
  rays: ReturnType<typeof chipRayLayersOf>,
): string => {
  const rows = calls
    .map(
      (c) =>
        `| ray ${c.ray ?? '—'} | \`${c.address}\` | [${c.params.join(', ')}] | ${c.value} | ${c.holds} | ${c.hex ?? '—'} |`,
    )
    .join('\n')
  const layerTable = rays.layers
    .map((L) => `| ${L.ray} | ${L.coinSlot} | ${L.faceIndex} | ${L.dimension} | ${L.manages} |`)
    .join('\n')
  const body = calls
    .map(
      (c) =>
        `### ray ${c.ray ?? 0} · ${c.address}\n\n- formula: \`${c.formula}\`\n- params: [${c.params.join(', ')}]\n- value: **${c.value}**\n- holds: **${String(c.holds)}**\n- hex: \`${c.hex ?? '—'}\`\n`,
    )
    .join('\n')
  return `# ${title}

> Printed by fused MCP \`papers { chips: true }\` — multidimensional layers managed by UUID rays (lattice coins·rays=faces).

## Proof

${proof}

## Kind

\`${kind}\`

## UUID ray lattice

| field | value | holds |
|---|---|---|
| n | ${rays.lattice.n} | ${rays.lattice.holds} |
| coins | ${rays.lattice.coins} | ${rays.lattice.holds} |
| rays (layers) | ${rays.lattice.rays} | ${rays.lattice.holds} |
| faces | ${rays.lattice.faces} | ${rays.lattice.holds} |
| cube.bits | ${rays.uuid.handleBits} | ${rays.uuid.holds} |
| cube.hexbit | ${rays.uuid.hexbit} | ${rays.uuid.holds} |
| handle.amplitudes | ${rays.uuid.amplitudes} | ${rays.uuid.holds} |
| topology.dimension(rays) | ${rays.dimension.value} | ${rays.dimension.holds} |
| manifold.dimension(faces,coins) | ${rays.manifold.value} | ${rays.manifold.holds} |

Identity: \`${rays.lattice.identity}\`

### Layer stack (one layer per ray)

| ray | coinSlot | faceIndex | dimension | manages |
|---|---|---|---|---|
${layerTable}

## Formula table (ray-stamped)

| ray | address | params | value | holds | hex |
|---|---|---|---|---|---|
${rows}

## Readings

${body}

## Invoke

\`\`\`bash
npm run mcp -- --local '{ "door": "papers", "chips": true }'
tools/call papers { "chips": true }
tools/call connector { "chips": true }
tools/call connector { "print": true }
\`\`\`
`
}

const stampLicenseOf = (body: string, imprint: ChipLicenseImprint): string =>
  `${body.trimEnd()}\n\n${chipLicenseMarkdownOf(imprint)}\n`

export type ChipPrintRow = {
  chip: string
  blueprint: string
  whitepaper: string
  calls: number
  held: number
  layers: number
  licenseVerified: boolean
  holds: boolean
}

export type ChipPrinterProbe = {
  address: string
  params: number[]
  value: number
  holds: boolean
  hex: string | null
  pass: boolean
}

/**
 * Print ray-layered chip blueprints + whitepapers to docs/chips/.
 * Printer probes: publishing.print / printmaking.editionsize / driver.dmaPages on the print set.
 */
export const printChipsOf = async (): Promise<{
  kind: 'print-chips'
  call: 'tools/call papers { chips: true }'
  outDir: string
  wrote: string[]
  chips: ChipPrintRow[]
  rays: ReturnType<typeof chipRayLayersOf>
  license: ChipLicenseImprint
  licenseVerify: { holds: boolean; verified: boolean; digestMatch: boolean }
  printers: ChipPrinterProbe[]
  generators: { blueprints: number; whitepapers: number; pages: number }
  holds: boolean
  goal: 'OPEN'
  note: string
}> => {
  mkdirSync(OUT, { recursive: true })
  const wrote: string[] = []
  const chips: ChipPrintRow[] = []
  const rays = chipRayLayersOf()

  // Lattice JSON for the ray-managed stack (machine-readable).
  const latticePath = path.join(OUT, 'uuid-ray-layers.json')
  writeFileSync(latticePath, `${JSON.stringify(rays, null, 2)}\n`)
  wrote.push('docs/chips/uuid-ray-layers.json')

  // License imprint over the ray lattice document (SPDX + law.* + ed25519/HMAC).
  const latticeBody = JSON.stringify(rays)
  const license = imprintChipLicenseOf(latticeBody)
  const licenseVerify = verifyChipLicenseOf(license, latticeBody)
  writeFileSync(path.join(OUT, 'chip-license-imprint.json'), `${JSON.stringify({ ...license, verify: licenseVerify }, null, 2)}\n`)
  wrote.push('docs/chips/chip-license-imprint.json')

  for (const row of chipCallsOf()) {
    const layered = layeredCallsOf(row.calls, rays.lattice.rays)
    const bpName = `${row.chip}-chip-blueprint.md`
    const wpName = `${row.chip}-chip-whitepaper.md`
    const bpBody = stampLicenseOf(mdOf(`${row.chip} chip blueprint (ray layers)`, row.proof, layered, 'blueprint', rays), license)
    const wpBody = stampLicenseOf(mdOf(`${row.chip} chip whitepaper (ray layers)`, row.proof, layered, 'whitepaper', rays), license)
    writeFileSync(path.join(OUT, bpName), bpBody)
    writeFileSync(path.join(OUT, wpName), wpBody)
    wrote.push(`docs/chips/${bpName}`, `docs/chips/${wpName}`)
    const held = layered.filter((c) => c.holds).length
    chips.push({
      chip: row.chip,
      blueprint: `docs/chips/${bpName}`,
      whitepaper: `docs/chips/${wpName}`,
      calls: layered.length,
      held,
      layers: rays.layerCount,
      licenseVerified: licenseVerify.verified,
      holds: held === layered.length && rays.holds && licenseVerify.holds && license.holds,
    })
  }

  const allCalls = chipCallsOf().flatMap((c) => layeredCallsOf(c.calls, rays.lattice.rays))
  writeFileSync(
    path.join(OUT, 'qpu-chip-index.md'),
    stampLicenseOf(
      mdOf(
        'QPU chip print index — UUID ray layers',
        'Composition of semiconductor + semiconductors + hardware + firmware on the coins·rays=faces lattice; layers managed by UUID rays; crypto-imprinted SPDX license.',
        allCalls,
        'blueprint',
        rays,
      ),
      license,
    ),
  )
  wrote.push('docs/chips/qpu-chip-index.md')

  // Test prints on tree printers (not a physical device) — imprint must verify for pass.
  const copies = Math.max(1, wrote.length)
  const bytes = wrote.length * 1024
  const printers: ChipPrinterProbe[] = [
    (() => {
      const r = PublishingFormulas.print(copies, rays.lattice.rays)
      return { address: 'publishing.print', params: [copies, rays.lattice.rays], value: r.value, holds: r.holds === true, hex: r.hex ?? null, pass: r.holds === true && r.value > 0 && licenseVerify.holds }
    })(),
    (() => {
      const r = PrintmakingFormulas.editionsize(copies, rays.lattice.coins)
      return { address: 'printmaking.editionsize', params: [copies, rays.lattice.coins], value: r.value, holds: r.holds === true, hex: r.hex ?? null, pass: r.holds === true && r.value > 0 && licenseVerify.verified }
    })(),
    (() => {
      const r = PrintmakingFormulas.yieldratio(chips.filter((c) => c.holds).length, Math.max(1, chips.length))
      return { address: 'printmaking.yieldratio', params: [chips.filter((c) => c.holds).length, Math.max(1, chips.length)], value: r.value, holds: r.holds === true, hex: r.hex ?? null, pass: r.holds === true && r.value === 100 }
    })(),
    (() => {
      const r = DriverFormulas.dmaPages(bytes)
      return { address: 'driver.dmaPages', params: [bytes], value: r.value, holds: r.holds === true, hex: r.hex ?? null, pass: r.holds === true && r.value >= 1 && license.verified }
    })(),
  ]

  const blueprints = await generateAllBlueprints()
  const papers = await generateAllWhitePapers()

  return {
    kind: 'print-chips',
    call: 'tools/call papers { chips: true }',
    outDir: 'docs/chips',
    wrote,
    chips,
    rays,
    license,
    licenseVerify,
    printers,
    generators: {
      blueprints: blueprints.total,
      whitepapers: papers.total_papers,
      pages: papers.total_pages,
    },
    holds:
      chips.every((c) => c.holds) &&
      rays.holds &&
      license.holds &&
      licenseVerify.holds &&
      printers.every((p) => p.pass) &&
      blueprints.ready_for_deployment === true &&
      papers.total_papers > 0,
    goal: 'OPEN',
    note: 'chip layers = UUID rays; crypto-imprinted CC-BY-NC-ND-4.0 via ed25519+HMAC; law.reviewed stays lead; printers require imprint verify',
  }
}
