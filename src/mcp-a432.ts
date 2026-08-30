// mcp-a432 — 432 MCP TOOLS ARE A432 OCCUPANCY, NOT 432 WIRE NAMES.
//
// Theorem k432: 432 = 16×27 = 2⁴×3³. That is the live tuning (A432_HZ) and the fused MCP occupancy.
// tools/list cardinality is the listed doors. uuidna_exec fuses Alpine (any programming language's published
// cmd:) and the rosetta/glagolitic human-language rings into that occupancy — complete in all directions
// without minting one uuidna_* per app or per tongue. Padding names until listed = 432 is the naive
// catalogue the wire ceiling already refused.
import { A432_HZ } from './tts/synth.js'
import { HEXBIT_STATES, hexbitDoorOf, UUID_HEXBITS } from './hexbit/index.js'
import { TRINITY, toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { MCP_ALPINE_DOOR } from './quantum/os/mcpman/index.js'
import { cidrNetwork, ipv4Masks, cidrHostSpan, cidrContains, isHandle } from './handle.js'

export { A432_HZ, MCP_ALPINE_DOOR }

/** Fused MCP occupancy — k432, identical to the live tuning. Not a tools/list target. */
export const MCP_A432 = HEXBIT_STATES * (TRINITY ** TRINITY)

export interface McpA432Fusion {
  definition: 'mcp·a432'
  a432: number
  listed: number
  alpineDoor: typeof MCP_ALPINE_DOOR
  alpineDoorPresent: boolean
  padded: boolean
  fused: boolean
  receipt: string
  hexbits: number[]
}

/** mcpA432Fusion(listed, alpineDoorPresent) → 432-tool occupancy vs listed names.
 *  fused iff the Alpine door is on the wire, listed is non-empty, and listed is not padded to a432. */
export function mcpA432Fusion(listed: number, alpineDoorPresent: boolean): McpA432Fusion {
  const a432 = MCP_A432
  const padded = listed === a432
  const fused = alpineDoorPresent && listed > 0 && listed < a432 && !padded
  const receipt = merkleGravity([
    toUuid('mcp-a432|' + a432),
    toUuid('listed|' + listed),
    toUuid('door|' + MCP_ALPINE_DOOR + '|' + (alpineDoorPresent ? '1' : '0')),
    toUuid('padded|' + (padded ? '1' : '0')),
  ])
  return {
    definition: 'mcp·a432',
    a432,
    listed,
    alpineDoor: MCP_ALPINE_DOOR,
    alpineDoorPresent,
    padded,
    fused,
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

export interface McpIpv4Route {
  cidr: string
  mask: number
  count: number
  tools: string[]
}

export interface McpIpv4Network {
  definition: 'mcp·ipv4'
  mask: number
  listed: number
  span: number
  occupied: number
  vacant: number
  routes: McpIpv4Route[]
  receipt: string
  hexbits: number[]
}

/** mcpIpv4Network(tools, maskBits) → the MCP catalogue as an IPv4 routing table.
 *  Each tool handle is a /32; the mask aggregates them into /8 /16 /24 networks. Vacant prefixes are counted,
 *  never padded with fake tools. */
export function mcpIpv4Network(
  tools: readonly { name: string; handle: string }[],
  maskBits: number = ipv4Masks()[1]!,
): McpIpv4Network {
  const masks = ipv4Masks()
  if (!masks.includes(maskBits)) throw new Error(`mcp: /${maskBits} is not an IPv4 netmask`)
  const buckets = new Map<string, McpIpv4Route>()
  for (const t of tools) {
    if (!isHandle(t.handle)) throw new Error(`mcp: tool ${t.name} handle ${t.handle} is not a handle`)
    const net = cidrNetwork(t.handle, maskBits)
    const cur = buckets.get(net.cidr)
    if (cur) {
      cur.count++
      cur.tools.push(t.name)
    } else {
      buckets.set(net.cidr, { cidr: net.cidr, mask: net.mask, count: 1, tools: [t.name] })
    }
  }
  const routes = [...buckets.values()].sort((a, b) => (a.cidr < b.cidr ? -1 : a.cidr > b.cidr ? 1 : 0))
  const span = cidrHostSpan(masks[0]!) === octetNetworks(maskBits)
    ? octetNetworks(maskBits)
    : octetNetworks(maskBits)
  const occupied = routes.length
  const receipt = merkleGravity([
    toUuid('mcp-ipv4|' + maskBits),
    toUuid('listed|' + tools.length),
    toUuid('occupied|' + occupied),
    ...routes.slice(0, 25).map((r) => toUuid('net|' + r.cidr + '|' + r.count)),
  ])
  return {
    definition: 'mcp·ipv4',
    mask: maskBits,
    listed: tools.length,
    span,
    occupied,
    vacant: span - occupied,
    routes,
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

/** How many prefixes exist at this mask — 256^(mask/8). */
function octetNetworks(maskBits: number): number {
  const bits = ipv4Masks()[0]!
  const keep = maskBits / bits
  let n = 1
  const span8 = cidrHostSpan(ipv4Masks()[2]!)
  for (let i = 0; i < keep; i++) n = n * span8
  return n
}
