// reflects — reveal the sealed theorems a real-world system ALREADY reflects. Given a description of a system (its
// devices, its concepts), it matches those concepts against the ledger and returns the EXISTING theorems whose
// decidable arithmetic the system rests on — folded to one receipt. It reveals a reflection; it does not build one.
// HONEST SCOPE: the matched theorems already exist and were proven `by decide` for their own domain; this shows that
// the SAME arithmetic recurs in the system named — it does NOT claim uuidna IS that system, nor that the theorems
// were made for it, nor that citing them makes the system secure/correct. A reflection is a resemblance the ledger
// already carries, recomputable by anyone. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

/** One revealed theorem — what it is, what it demonstrates, and which concept of the system it reflects. */
export interface Reflected { key: string; title: string; skill: string; principle: string; address: string; concept: string }

export interface Reflection {
  query: string
  concepts: string[]       // the distinct concept-words drawn from the query
  matches: Reflected[]     // existing sealed theorems the system reflects, one per (theorem, first matching concept)
  count: number
  receipt: string          // the revealed theorems' addresses, folded order-invariant — recompute it or it changed
  honest: string
}

/** reflects(query) → reveal the existing sealed theorems a system reflects, matched from the ledger by concept and
 *  folded to a receipt. Deterministic: same query + ledger → same reflection. */
export function reflects(query: string): Reflection {
  const concepts = [...new Set(query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3))]
  const T = theorems()
  const matches: Reflected[] = []
  const seen = new Set<string>()
  for (const c of concepts) {
    for (const t of T) {
      if (seen.has(t.key)) continue
      const hay = (t.key + ' ' + t.name + ' ' + t.skill + ' ' + t.principle).toLowerCase()
      if (hay.includes(c)) {
        seen.add(t.key)
        matches.push({ key: t.key, title: t.name.split(/[—:]/)[0].trim(), skill: t.skill, principle: t.principle, address: t.address, concept: c })
      }
    }
  }
  return {
    query,
    concepts,
    matches,
    count: matches.length,
    receipt: matches.length ? merkleFold(matches.map((m) => m.address)) : toUuid('no-reflection'),
    honest:
      'These theorems ALREADY EXIST, each proven `by decide` for its own domain; the reflection is that the SAME ' +
      'decidable arithmetic recurs in the system named. It does NOT claim uuidna is that system, that the theorems ' +
      'were built for it, or that citing them makes the system secure or correct — a resemblance is not an endorsement. ' +
      'Recomputable by anyone from the same ledger. Integrity, not truth.',
  }
}
