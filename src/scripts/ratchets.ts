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

/**
 * FORMULA COPIES — one skill sealing one algebraic form more than once.
 *
 * Measured at 129 groups covering 205 restatements of 1530 pure formulas: `(2*5) % 9 = 1` is sealed five times by
 * `z9-ring` across Core.lean, Ring.lean and Vortex.lean under three names with the same gloss on each. It shrinks by
 * citing rather than re-sealing, never by deletion — a sealed theorem is a published record.
 *
 * AN ABSENT ARTEFACT THROWS RATHER THAN READING ZERO, which is the whole difficulty with a debt measured from a
 * file. Zero is what a perfect ledger reports, so a measure that returns it when the census was never taken makes
 * the ratchet look satisfied at exactly the moment it knows nothing — the vacuous-success class, and the one this
 * tree keeps finding. `liveToolDebt` above reads its baseline the same way and cross-checks against a live list;
 * this cross-checks the recorded formula count against the ledger it claims to describe.
 */
const liveFormulaCopies = (): number => {
  const c = JSON.parse(rd('lean/formula-duplication.json')) as {
    formulas?: number
    groups?: { withinOneSkill?: boolean; keys?: unknown[] }[]
  }
  const groups = c.groups
  if (!Array.isArray(groups) || typeof c.formulas !== 'number' || c.formulas === 0) {
    throw new Error('ratchets: lean/formula-duplication.json is absent or empty — run `npm run x -- formula-duplication`; an untaken census is not a debt of zero')
  }
  return groups
    .filter((g) => g.withinOneSkill === true)
    // saturating subtraction is the naturals' own minus — a group of k keys carries k-1 restatements, and a group
    // of none carries zero rather than a negative. Math.max would say the same thing in floats, which this tree
    // rejects everywhere for the reason that counts are integers.
    .reduce((n, g) => { const k = Array.isArray(g.keys) ? g.keys.length : 1; return n + (k > 1 ? k - 1 : 0) }, 0)
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
    name: 'one skill sealing one formula more than once',
    prefix: 'formula_copy_debt',
    direction: 'shrink',
    unit: 'restatements',
    live: liveFormulaCopies,
    measureAddress: measureAddress(liveFormulaCopies),
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
