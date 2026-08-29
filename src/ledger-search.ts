// ledger-search — filter the sealed keys and fold the hit list to one receipt.
// A leaf: theorems + address + hexbit door. Not the editorial harvest, not TTS, not the package barrel.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { hexbitDoorOf } from './hexbit/index.js'

export interface LedgerSearch {
  q: string; count: number; total: number; receipt: string
  handle: string; hexbits: number[]; door: string
  matches: Array<{ key: string; name: string; principle: string; skill: string }>
}

export function searchLedger(q: string, limit = 60): LedgerSearch {
  const T = theorems()
  const s = q.trim().toLowerCase()
  const hit = s ? T.filter((t) => `${t.key} ${t.name} ${t.statement} ${t.principle} ${t.skill}`.toLowerCase().includes(s)) : []
  const receipt = toUuid(hit.map((t) => t.key).join('\n'))
  return {
    q, count: hit.length, total: T.length,
    receipt,
    ...hexbitDoorOf(receipt),
    matches: hit.slice(0, limit).map((t) => ({ key: t.key, name: t.name, principle: t.principle, skill: t.skill })),
  }
}
