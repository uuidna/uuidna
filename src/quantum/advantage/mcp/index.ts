export {
  AGENT_ORIGIN, AGENT_MCP_PATH, ADVANTAGE_MCP_ORIGIN,
  hostedMcpUrl, toolsCall, resultText, payloadOf, advantageCall,
} from './wire/index.js'
export {
  ADVANTAGE_OVERCLAIM,
  atPath, expectHolds, advantageCurriculum, hookAdvantageMcp, renderAdvantageMcpMarkdown,
  type McpExpect, type AdvantageMcpExample, type AdvantageMcpCurriculum,
  type McpHookHop, type AdvantageMcpHook,
} from './curriculum/index.js'
export {
  quantumAdvantagePlaybook,
  playbookExamples,
  type PlaybookStep,
  type QuantumAdvantagePlaybook,
} from './agent/playbook/index.js'
