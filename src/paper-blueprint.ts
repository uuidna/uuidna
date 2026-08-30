// paper-blueprint — THE WHITE PAPER AND THE BLUEPRINTS ARE ONE INTEGER.
//
// The captain's reading: uuidna is not a paper that describes a system, and not a drawing that waits for a
// paper. A sealed theorem's statement is the white paper; its handle, route, and 32 hexbit states are the
// blueprints; they share one content-address. Theorem a_spec_compiles_to_hexbits already says the specification
// and its sound are the same integer — this module APPLIES that, it does not name a second claim.
//
// Same door for an install spec (Alpine meaning / site route) and an MCP tool (first sentence / /mcp/<name>).
// Wire-light: one object, two readings, never two documents to keep in sync.
import { hexbitDoorOf, compileToHexbits, UUID_HEXBITS } from './hexbit/index.js'
import { handleOf } from './handle.js'
import type { Theorem } from './theorems/index.js'
import type { InstallSpec } from './quantum/os/index.js'
import { catalogueCompile, type CataloguePackage } from './quantum/os/catalogue/index.js'
import { portTool } from './quantum/os/registry/index.js'

export interface Paper {
  title: string
  statement: string
  source: string
}

export interface Blueprint {
  id: string
  handle: string
  hexbits: number[]
  route: string
}

export interface PaperBlueprint {
  definition: 'paper+blueprint'
  cites: '/theorem/a_spec_compiles_to_hexbits'
  kind: 'theorem' | 'install' | 'tool' | 'package'
  address: string
  paper: Paper
  blueprint: Blueprint
  honest: string
}

const HONEST =
  'White paper and blueprints at once: the sealed statement (or published meaning) is the paper; the handle, ' +
  'route, and 32 hexbit states are the drawing. They share one address — theorem a_spec_compiles_to_hexbits. ' +
  'Integrity, not a second document to maintain.'

const door = (address: string): { handle: string; hexbits: number[] } => {
  const d = hexbitDoorOf(address)
  return { handle: d.handle, hexbits: d.hexbits }
}

/** paperBlueprintTheorem(t) → the dual reading of one sealed theorem. */
export function paperBlueprintTheorem(t: Theorem): PaperBlueprint {
  const { handle, hexbits } = door(t.address)
  return {
    definition: 'paper+blueprint',
    cites: '/theorem/a_spec_compiles_to_hexbits',
    kind: 'theorem',
    address: t.address,
    paper: {
      title: t.name,
      statement: t.statement,
      source: 'https://github.com/uuidna/uuidna/blob/main/lean/' + t.file,
    },
    blueprint: {
      id: 'uuidna/' + t.key,
      handle,
      hexbits,
      route: '/theorem/' + t.key,
    },
    honest: HONEST,
  }
}

/** paperBlueprintInstall(s) → dual reading of one default-install spec (meaning is the paper; route is the drawing). */
export function paperBlueprintInstall(s: InstallSpec): PaperBlueprint {
  return {
    definition: 'paper+blueprint',
    cites: '/theorem/a_spec_compiles_to_hexbits',
    kind: 'install',
    address: s.address,
    paper: { title: s.name, statement: s.meaning, source: s.id },
    blueprint: { id: s.id, handle: handleOf(s.address), hexbits: s.hexbits, route: s.route },
    honest: HONEST,
  }
}

/** paperBlueprintTool(t) → dual reading of one MCP tool (description is the paper; /mcp/<name> is the drawing). */
export function paperBlueprintTool(t: { name: string; description: string }): PaperBlueprint {
  const p = portTool(t)
  return {
    definition: 'paper+blueprint',
    cites: '/theorem/a_spec_compiles_to_hexbits',
    kind: 'tool',
    address: p.address,
    paper: { title: t.name, statement: p.meaning, source: p.id },
    blueprint: { id: p.id, handle: handleOf(p.address), hexbits: p.hexbits, route: p.route },
    honest: HONEST,
  }
}

/** paperBlueprintPackage(p) → dual reading of any catalogue row (Alpine, overlay, or quantumised registry). */
export function paperBlueprintPackage(p: CataloguePackage): PaperBlueprint {
  const c = catalogueCompile(p)
  const { handle, hexbits } = door(c.address)
  return {
    definition: 'paper+blueprint',
    cites: '/theorem/a_spec_compiles_to_hexbits',
    kind: 'package',
    address: c.address,
    paper: { title: p.name, statement: p.desc, source: c.id },
    blueprint: { id: c.id, handle, hexbits, route: '/catalogue/' + p.name },
    honest: HONEST,
  }
}

/** sameInteger(dual) → paper and blueprint compile from the same address (a_spec_compiles_to_hexbits). */
export function sameInteger(d: PaperBlueprint): boolean {
  const bits = compileToHexbits(d.address)
  return bits.length === UUID_HEXBITS
    && bits.every((h, i) => h === d.blueprint.hexbits[i])
    && handleOf(d.address) === d.blueprint.handle
}
