// table-leads — lean/leads.json tables.found names finite objects a wing STATES and does not yet ENUMERATE.
//
// The record is a lead, not a receipt (tables.why). This module compares the stated size to theoremCountByFile()
// for `<Wing>.lean`. Under-count is homework the desk proposes; only the kernel enumerates. Never auto-seal.
// A wing that already seals at least as many theorems as the stated object has paid the enumeration door.
export interface TableFound { wing: string; object: string; size: string }
export interface TableLead {
  wing: string
  file: string
  object: string
  stated: number
  sealed: number
  owes: string
}

/** tableFileOf(wing) → the Lean file the tables record names. Pure. */
export const tableFileOf = (wing: string): string => `${wing}.lean`

/** tableLeadsFrom(found, counts) → wings whose sealed census is still short of the stated table. Pure. */
export function tableLeadsFrom(
  found: readonly TableFound[],
  counts: ReadonlyMap<string, number>,
): TableLead[] {
  const out: TableLead[] = []
  for (const row of found) {
    const stated = Number(row.size)
    if (!Number.isFinite(stated) || stated <= 0) continue
    const file = tableFileOf(row.wing)
    const sealed = counts.get(file) ?? 0
    if (sealed >= stated) continue
    out.push({
      wing: row.wing,
      file,
      object: row.object,
      stated,
      sealed,
      owes: `${file} states ${row.object} (${stated}) and seals ${sealed} — enumerate the table; desk proposes, kernel disposes`,
    })
  }
  return out.sort((a, b) => (b.stated - b.sealed) - (a.stated - a.sealed) || (a.wing < b.wing ? -1 : 1))
}
