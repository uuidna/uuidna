// school/sequence — living-field curriculum as hosted MCP calls; required theorems must seal in this build.
import { theoremByKey } from '../../theorems/index.js'
import { sequenceCurriculum, type SequenceMcpCurriculum } from '../../quantum/sequence/mcp/curriculum/index.js'

export const SEQUENCE_REQUIRED_THEOREMS = [
  'seal_ten',
  'agl_order_54',
  'commutator_is_shift',
  'angles_close',
  'seams_two',
  'nine_is_plus_not_neutral',
  'ten_pairs',
] as const

export {
  SEQUENCE_OVERCLAIM,
  sequenceCurriculum,
  renderSequenceMcpMarkdown,
  atPath,
  expectHolds,
  ADVANTAGE_MCP_ORIGIN as SEQUENCE_MCP_ORIGIN,
  type SequenceMcpCurriculum,
  type McpExpect,
} from '../../quantum/sequence/mcp/curriculum/index.js'

/** schoolSequenceMcpExamples() → curriculum after the sequence floor theorems are sealed in this build. */
export function schoolSequenceMcpExamples(): SequenceMcpCurriculum {
  const byKey = theoremByKey()
  for (const k of SEQUENCE_REQUIRED_THEOREMS) {
    if (!byKey.has(k)) throw new Error(`school sequence MCP: ${k} is not sealed`)
  }
  return sequenceCurriculum()
}
