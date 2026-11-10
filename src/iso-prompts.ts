// iso-prompts — EVERY SEALED THEOREM AS AN ISO TEST PROMPT, SERVED BY MCP'S OWN PROMPTS METHODS (the captain,
// 2026-11-10: "prose comes from lean inline docs as iso test prompts via mcp"). The prompt is the theorem exactly as
// Lean holds it: its inline doc, the statement a reader tests (ISO/IEC 25051 5.1.2.4), followed by the declaration that
// is the test. Nothing here writes a sentence of its own. The list pages through the keys the baked root carries, so
// the edge answers it without the rows; a get reads the one row its key names.
import { sealedCount, sealedKeyAt, theoremFor, sealedAddressOf } from './theorems/index.js'

export const ISO_PROMPT_PREFIX = 'iso-test-'
const PAGE = 100

/** prompts/list → one page of prompts, each named by its theorem's key, and the cursor of the next page */
export function isoPromptPage(cursor?: unknown): { prompts: { name: string; title: string }[]; nextCursor?: string } {
  const from = typeof cursor === 'string' && /^[0-9]+$/.test(cursor) ? Number(cursor) : 0
  const to = from + PAGE < sealedCount() ? from + PAGE : sealedCount()
  const prompts: { name: string; title: string }[] = []
  for (let i = from; i < to; i++) { const key = sealedKeyAt(i); if (key) prompts.push({ name: ISO_PROMPT_PREFIX + key, title: key }) }
  return to < sealedCount() ? { prompts, nextCursor: String(to) } : { prompts }
}

/** the key a prompt name carries, or null when the name is not an ISO test prompt of a sealed theorem */
export const isoPromptKey = (name: unknown): string | null => {
  if (typeof name !== 'string' || !name.startsWith(ISO_PROMPT_PREFIX)) return null
  const key = name.slice(ISO_PROMPT_PREFIX.length)
  return sealedAddressOf(key) !== undefined ? key : null
}

/** prompts/get → the theorem's Lean doc as the prompt's description and its doc and declaration as the message */
export function isoPromptOf(name: unknown): { description: string; messages: { role: 'user'; content: { type: 'text'; text: string } }[]; _meta: { key: string; address: string } } {
  const key = isoPromptKey(name)
  if (key === null) throw new Error(`prompts/get: ${String(name)} names no sealed theorem — prompts are ${ISO_PROMPT_PREFIX}<key>`)
  const t = theoremFor(key)
  if (!t) throw new Error(`prompts/get: the row of ${key} is not held on this surface`)
  return {
    description: t.name,
    messages: [{ role: 'user', content: { type: 'text', text: `/-- ${t.name} -/\ntheorem ${t.key} : ${t.statement} := by ${t.tactic}` } }],
    _meta: { key, address: sealedAddressOf(key)! },
  }
}
