// ratchets — THE MEASURES THIS TREE PROMISES NOT TO LOOSEN, each bound to a sealed theorem.
//
// A ratchet is three things: a live measurement, the direction it may travel, and a SEALED value it is compared
// against. The seal is the mechanism — moving a ceiling costs a theorem through the conveyor, the kernel and the
// court, where editing a JSON file costs a second.
//
// A NEW RULER EARNS A NEW FAMILY. When the impossibility detector widened from bare impossibility to modality it
// found 641 where the old one found 622 — the tree did not get worse, the ruler changed. Re-sealing 641 under
// the old key would have silently raised a shrink-only ceiling; instead the widened detector has its own family
// (impossibility_modal_debt) and the old one stays sealed as history under the old name. The two numbers are not
// comparable and the naming says so, which is the point a peer session made in one line: the old ceiling is what
// a future reader would otherwise compare against without knowing the ruler moved.
import { measureAddress, type Ratchet } from './ratchet-gaps.js'
import { impossibilityGaps } from './impossibility-gaps.js'
import { sourceGraph } from '../test-paths.js'
import { TOOL_NAMES, MCP_CATALOG } from '../mcp.js'
import { wireBytes, type WireTool } from '../mcp-wire.js'
import { rd } from './api.js'

/** the bare modal claims outstanding, measured with an EMPTY baseline — the true count, not the undeclared one */
const liveModalDebt = (): number => impossibilityGaps([...sourceGraph().keys()], new Set()).length

/** the wire cost per tool, in hundredths — integer, because the determinism law refuses rounding helpers */
const liveWireRate = (): number => {
  const tools = MCP_CATALOG as unknown as WireTool[]
  return tools.length > 0 ? Number((BigInt(wireBytes(tools)) * 100n) / BigInt(tools.length)) : 0
}

/** MCP tools covered only by aggregate folds — the under-coverage debt */
const liveToolDebt = (): number => {
  const declared = JSON.parse(rd('lean/tool-exercise-baseline.json')) as { aggregateOnly?: string[] }
  return (declared.aggregateOnly ?? []).filter((n) => TOOL_NAMES.includes(n)).length
}

export const RATCHETS: readonly Ratchet[] = [
  {
    name: 'bare modal claims (the impossibility debt)',
    prefix: 'impossibility_modal_debt',
    direction: 'shrink',
    unit: 'claims',
    live: liveModalDebt,
    measureAddress: measureAddress(liveModalDebt),
  },
  {
    name: 'MCP wire cost per tool',
    prefix: 'mcp_wire_rate_fell_while_total_grew',
    direction: 'shrink',
    unit: 'hundredths of a byte per tool',
    live: liveWireRate,
    measureAddress: measureAddress(liveWireRate),
  },
  {
    name: 'MCP tools with no dedicated test',
    prefix: 'mcp_tool_debt',
    direction: 'shrink',
    unit: 'tools',
    live: liveToolDebt,
    measureAddress: measureAddress(liveToolDebt),
  },
]
