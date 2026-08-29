// school/advantage/mcp/examples — Node verify that QA_REQUIRED_THEOREMS are sealed, then the dry curriculum.
// The monitor imports quantum/advantage/mcp/curriculum; this file may load the ledger.
import { theoremByKey } from '../../../../theorems/index.js'
import { QA_REQUIRED_THEOREMS } from '../../../../quantum/advantage/audit/index.js'
import { advantageCurriculum, type AdvantageMcpCurriculum } from '../../../../quantum/advantage/mcp/curriculum/index.js'

export {
  ADVANTAGE_MCP_ORIGIN,
  ADVANTAGE_OVERCLAIM,
  atPath,
  expectHolds,
  hookAdvantageMcp,
  renderAdvantageMcpMarkdown,
  advantageCurriculum,
  type AdvantageMcpCurriculum,
  type AdvantageMcpExample,
  type AdvantageMcpHook,
  type McpExpect,
  type McpHookHop,
} from '../../../../quantum/advantage/mcp/curriculum/index.js'

/** schoolAdvantageMcpExamples() → curriculum, after the required advantage theorems are present in this build. */
export function schoolAdvantageMcpExamples(): AdvantageMcpCurriculum {
  const byKey = theoremByKey()
  for (const k of QA_REQUIRED_THEOREMS) {
    if (!byKey.has(k)) throw new Error(`school advantage MCP: ${k} is not sealed`)
  }
  return advantageCurriculum()
}
