// statement-chunks — distinct Lean statements grouped for chunk storage (pure; no editorial desk deps).
import { theorems } from './theorems/index.js'

interface Entry { key: string; name: string; statement: string; tactic: string; file: string; principle: string; skill: string }

export const normStatement = (s: string): string =>
  s.replace(/\s+/g, '').replace(/\((\d+)\s*:\s*Nat\)/g, '$1').replace(/[()]/g, '')

export function groupByStatement(): Map<string, Array<Entry & { statement: string }>> {
  const T = theorems() as Array<Entry & { statement: string }>
  const by = new Map<string, Array<Entry & { statement: string }>>()
  for (const t of T) {
    const k = normStatement(t.statement)
    const g = by.get(k)
    if (g) g.push(t); else by.set(k, [t])
  }
  return by
}

export interface StatementChunk { statement: string; tactic: string; keys: string[]; files: string[] }

export function allStatementChunks(): StatementChunk[] {
  return [...groupByStatement().values()].map((g) => ({
    statement: g[0]!.statement,
    tactic: g[0]!.tactic.replace(/\s*--.*$/, '').trim(),
    keys: g.map((t) => t.key).sort(),
    files: [...new Set(g.map((t) => t.file))].sort(),
  }))
}
