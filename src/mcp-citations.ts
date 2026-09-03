// mcp-citations — EVERY THEOREM A SERVED TOOL CITES MUST BE SEALED.
//
// THE COVERAGE GAP THIS CLOSES. audit-citations holds the citation law over PUBLICATIONS and reports zero
// fabricated across the whole ledger; the honesty gate drains a claim that cites a proof which is not sealed.
// Neither reads the MCP catalogue's own prose. A tool description is the most load-bearing sentence in the
// tree — it is what a model reads to decide whether to call the tool, and it is served to every client — and
// `uuidna_through_void` cites `mirror_fixed_five` in exactly the shape a publication would.
//
// Checked by hand while following a peer lead (node.zeropoint.bg states throughVoid(n) = 1 − n mod 9 is an
// involution fixed only at 5; recomputed true, and mirror_fixed_five seals the same object in the coordinates
// 10 − d on 1..9). The answer was clean — zero unsealed citations across every description — and a clean
// hand-check that nothing enforces is a result with a shelf life. This is the finder for it.
import { THEOREMS } from './theorems/index.js'
import { MCP_CATALOG } from './mcp.js'

/** a theorem-shaped citation: snake_case with at least two underscores, which is what every sealed key looks
 *  like and what ordinary prose does not. Deliberately narrow — `uuidna_*` is a TOOL name, never a theorem. */
const CITATION = /\b(?!uuidna_)[a-z][a-z0-9]*(?:_[a-z0-9]+){2,}\b/g

export interface McpCitation { tool: string; key: string }

/** mcpCitations() → every theorem-shaped key cited by a served tool's description, with the tool that cites it. */
export function mcpCitations(): McpCitation[] {
  const out: McpCitation[] = []
  for (const tool of MCP_CATALOG) {
    for (const m of (tool.description ?? '').matchAll(CITATION)) out.push({ tool: tool.name, key: m[0] })
  }
  return out
}

/** mcpCitationGaps() → citations naming a key the ledger does not hold. A served sentence citing a proof that
 *  does not exist is the one violation this tree calls fabrication, wherever the sentence lives. */
export function mcpCitationGaps(): { what: string; fix: string }[] {
  const sealed = new Set(THEOREMS.map((t) => t.key))
  const gaps: { what: string; fix: string }[] = []
  for (const c of mcpCitations()) {
    if (sealed.has(c.key)) continue
    gaps.push({
      what: `${c.tool} cites \`${c.key}\`, which the ledger does not seal — a served description naming a proof that does not exist`,
      fix: `either seal a theorem under that exact key, or cite the key that actually proves the claim, or drop the citation and state the tool's contract without one — a description is what a caller reads to decide, so a fabricated citation there is load-bearing`,
    })
  }
  return gaps
}
