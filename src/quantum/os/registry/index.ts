// quantum/os/registry — THE ONE PORT REGISTRY: the toolbox and the OS folded to a single content-addressed set
// (the captain's order, 2026-08-23: "refactor all to exactly map alpine for full automated port"; lead 129).
//
// THE UNIFICATION: an MCP tool is a pure function input→output; an Alpine package IS a utility (busybox is a
// toolbox of them); a ported install spec is a utility given a uuidna/<name> identity, a 128-bit address and 32
// hexbit states. So an MCP tool and a ported Alpine package are the SAME KIND OF OBJECT — and this module maps
// EVERY tool onto that one PackagePort shape, then merges it with the OS's install port, so the whole toolbox
// AND the whole ported OS fold to ONE registry with ONE recomputable receipt. "Exactly map alpine" means the
// tools now wear the port's own shape (id, address, hexbits, meaning), discoverable BY package, not a second
// bespoke schema beside it. Automated: derived from the catalogue and the sealed install port, nothing authored.
//
// LOAD-BEARING HONESTY (theorem the_os_is_bootable_quantum): nothing here executes. A tool-package is EITHER a
// package's provenance spec OR uuidna's own pure reimplementation of a utility's logic — never Alpine's binary
// run. A tool's LOGIC is uuidna's; a tool's IDENTITY is a package port. Integrity, loading rather than running.
//
// NON-ARBITRARY ADDRESS: a tool's address is toUuid('tool:' + name + ':' + description) — the EXACT preimage
// apiHandleOf merkle-folds for the served API seal (mcp.ts). So a tool's registry address already equals its
// sealed contract handle's preimage: the registry does not invent an address, it reads the one the API sealed.
import { toUuid, merkleFold } from '../../../address.js'
import { hexbitDoorOf, defaultInstalls, type InstallSpec } from '../index.js'

/** THE ONE SHAPE a tool and a ported package share: a uuidna/<name> identity, a 128-bit content-address, the 32
 *  hexbit states it compiles to, its published meaning, and the virtual-OS route it lives at. `kind` records
 *  which half of the union it came from; everything else is identical, which is the whole point. */
export interface PackagePort {
  kind: 'tool' | 'install'
  id: string           // uuidna/<name>
  name: string
  route: string        // the virtual-OS path: /terminal/... for installs, /mcp/<name> for tools
  meaning: string      // the published one-line meaning (Alpine's T: for installs, the tool's first sentence)
  address: string      // the 128-bit content-address
  hexbits: number[]    // the address compiled to 32 hexbit states
}
export interface Registry {
  count: number; tools: number; installs: number
  packages: PackagePort[]
  root: string; handle: string; receipt: string; honest: string
}

const HONEST =
  'The toolbox and the ported OS as ONE content-addressed registry: every MCP tool recast into the same port ' +
  'shape an Alpine package wears (uuidna/<name>, a 128-bit address, 32 hexbit states, its meaning), merged with ' +
  'the sealed install port, folded to one recomputable receipt. Nothing executes (the_os_is_bootable_quantum) — ' +
  'a tool-package is a provenance spec or uuidna\'s own pure logic, never Alpine\'s binary. Derived, not authored.'

/** the published meaning is one line: the first sentence of the tool description, so the registry stays wire-light
 *  (the full description already ships in tools/list; the registry is the SHAPE, not a second copy of the prose). */
const oneLine = (s: string): string => {
  const cut = s.replace(/\s+/g, ' ').trim()
  const stop = cut.search(/[.:]\s/)
  return stop > 0 ? cut.slice(0, stop) : cut.slice(0, 120)
}

/** portTool(t) → recast one MCP tool as a PackagePort. The address is the API seal's own preimage, so a tool's
 *  registry identity already equals what apiHandleOf folded — the toolbox does not get a second, drifting id. */
export function portTool(t: { name: string; description: string }): PackagePort {
  const address = toUuid('tool:' + t.name + ':' + t.description)
  return {
    kind: 'tool', id: 'uuidna/' + t.name, name: t.name, route: '/mcp/' + t.name,
    meaning: oneLine(t.description), address, ...hexbitDoorOf(address),
  }
}

/** portInstall(s) → the ported Alpine package already IS a PackagePort in all but name: it carries its id,
 *  address, hexbits, meaning and route. This is the proof the two are the same object — no recompute needed. */
export function portInstall(s: InstallSpec): PackagePort {
  return { kind: 'install', id: s.id, name: s.name, route: s.route, meaning: oneLine(s.meaning), address: s.address, hexbits: s.hexbits }
}

/** unifiedRegistry(tools) → the WHOLE toolbox and the WHOLE ported OS as one set, sorted by id, every address
 *  merkle-folded to one root: two parties comparing one handle have compared every port at once. Change one
 *  tool's description or one install's pin and the root moves. The install port is read from the sealed mirror
 *  (defaultInstalls, no fetch); the tools are passed in, so this module never imports the catalogue — no cycle,
 *  and it stays pure and edge-clean. */
export function unifiedRegistry(tools: readonly { name: string; description: string }[]): Registry {
  const installs = defaultInstalls().specs.map(portInstall)
  const toolPorts = tools.map(portTool)
  const packages = [...installs, ...toolPorts].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const root = merkleFold(packages.map((p) => p.address))
  const receipt = toUuid('registry|' + packages.length + '|' + root)
  return {
    count: packages.length, tools: toolPorts.length, installs: installs.length,
    packages, root,
    receipt, ...hexbitDoorOf(receipt), honest: HONEST,
  }
}
