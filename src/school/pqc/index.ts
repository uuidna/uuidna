// school/pqc — PQC-adjacent curriculum as hosted MCP calls; required floor theorems must seal in this build.
import { theoremByKey } from '../../theorems/index.js'
import { pqcCurriculum, type PqcMcpCurriculum } from '../../quantum/pqc/mcp/curriculum/index.js'

export const PQC_REQUIRED_THEOREMS = [
  'grover_quadratic_bound',
  'sha256_grover_margin_is_the_address',
  'key_floor_is_one_uuid',
] as const

export {
  PQC_OVERCLAIM,
  pqcCurriculum,
  renderPqcMcpMarkdown,
  atPath,
  expectHolds,
  ADVANTAGE_MCP_ORIGIN as PQC_MCP_ORIGIN,
  type PqcMcpCurriculum,
  type McpExpect,
} from '../../quantum/pqc/mcp/curriculum/index.js'

/** schoolPqcMcpExamples() → curriculum after the PQC floor theorems are sealed in this build. */
export function schoolPqcMcpExamples(): PqcMcpCurriculum {
  const byKey = theoremByKey()
  for (const k of PQC_REQUIRED_THEOREMS) {
    if (!byKey.has(k)) throw new Error(`school PQC MCP: ${k} is not sealed`)
  }
  return pqcCurriculum()
}
