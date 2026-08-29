// lonely-gaps — theorems in a wing that share no symbol or constant with any neighbour. Pure ledger read.
import { theorems } from './theorems/index.js'

export interface LonelyGap {
  what: string
  fix: string
}

/** lonelyGaps() → advisory list of wing-isolated theorems (constants count as connection). */
export function lonelyGaps(): LonelyGap[] {
  const STOP = /^(List|range|fun|all|Nat|Int|true|false|filter|map|length|sum|if|then|else)$/
  const toks = (s: string): Set<string> => new Set([
    ...(s.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) ?? []).filter((w) => !STOP.test(w)),
    ...(s.match(/\b\d+\b/g) ?? []),
  ])
  const byWing = new Map<string, ReturnType<typeof theorems>>()
  for (const t of theorems()) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])
  const gaps: LonelyGap[] = []
  for (const [file, ts] of byWing) {
    if (ts.length < 2) continue
    for (const t of ts) {
      const mine = toks(t.statement)
      if (mine.size === 0) continue
      if (ts.some((o) => o.key !== t.key && [...toks(o.statement)].some((w) => mine.has(w)))) continue
      gaps.push({
        what: `${t.key} shares no symbol and no constant with any neighbour in ${file} — \`${t.statement.slice(0, 46)}\``,
        fix: 'connect it: state it over a constant or definition the wing already uses, so the theorem leans on its neighbours instead of standing alone under its name',
      })
    }
  }
  return gaps
}
