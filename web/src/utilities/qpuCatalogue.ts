import { handle } from '@uuidna/qpu/mcp'

import { canonicalText, uuid } from '@uuidna/qpu/address'

type Answer = { error?: { message: string }; result?: { content?: { text?: string; type: string }[]; isError?: boolean; structuredContent?: unknown } }

/** One tools/call of qpu's catalogue, answered by its handler in this Worker: the call every hook makes. */
export const callCatalogue = async (name: string, args: Record<string, unknown>) => {
  const r = (await handle({ id: 1, jsonrpc: '2.0', method: 'tools/call', params: { arguments: args, name } })) as Answer
  if (r.error) return { error: r.error.message }
  return { isError: r.result?.isError === true, structured: r.result?.structuredContent as Record<string, unknown> | undefined, content: r.result?.content }
}

/** A circuit program (the circuit tool's arguments) run by the classical exact simulator: its outcome, as the circuit
 *  tool at /api/mcp answers it, and a receipt, the content address of the program and the outcome together. */
export const runCircuit = async (program: Record<string, unknown>) => {
  const r = await callCatalogue('circuit', program)
  if ('error' in r || r.isError || !r.structured) throw new Error(`the circuit tool refused the program: ${'error' in r ? r.error : JSON.stringify(r.content ?? null)}`)
  return { outcome: r.structured, receipt: uuid(canonicalText({ arguments: program, outcome: r.structured, tool: 'circuit' })) as string }
}
