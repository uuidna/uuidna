// law-collapse — WHERE IS THIS LEDGER SEALING THE SAME FACT UNDER DIFFERENT NAMES?
//
// THE FINDING THIS GENERALISES. A congruence survey was built over 21 exponents × 124 moduli — 2,604 theorems,
// one per (n, m). Then the measurement: whether a modulus BLOCKS does not depend on n at all, only on
// d = gcd(n, lambda(m)), because the image of x -> x^n over a finite abelian group is G^gcd(n, exp G). 1,968
// exponent pairs shared a d; 1,968 agreed; zero disagreed. 2,604 entries carried 636 distinct facts, and 75.6%
// of the grid was restatement. Sealing it would have inflated the ledger by three quarters and added nothing a
// reader could not derive from one reduction table.
//
// THAT WAS FOUND BY HAND, IN A THROWAWAY SCRIPT, AND ALMOST NOT FOUND AT ALL. This is the finder, folded in, so
// the next family is caught by the tree rather than by luck. It is deliberately NOT specific to gcd or to
// moduli: it asks a question any parameterised family can answer.
//
// THE QUESTION. A family is a set of sealed keys differing only in numbers — power_fixed_mod_25_number_5 and
// power_fixed_mod_45_number_15 are one family with two numeric slots. If a family has k slots and the LAST slot
// (the value) is a function of fewer than k-1 of the others, the family is enumerating parameters that do not
// matter. That is decidable from the key names alone, needs no mathematics, and is exactly what the congruence
// grid was doing: it enumerated n when only gcd(n, lambda(m)) mattered.
//
// WHAT IT CANNOT DO, stated so nobody reads more into a green run: it finds families where a slot is REDUNDANT
// as a function of the others across the sealed sample. It does not prove the redundancy holds beyond the
// sample, it does not find the law, and a family it passes may still hide one that this shape cannot see — the
// Wave count families all pass here, because each modulus has exactly one value, and their law lives in the
// FACTORISATION of the modulus rather than in the key. Names are a cheap surface; this reads only that surface.
import { theorems, type Theorem } from './theorems/index.js'

/** a family: sealed keys whose shape matches once every run of digits is replaced */
export interface Family {
  shape: string
  members: { key: string; slots: number[] }[]
  files: string[]
}

/** families(min) → every family with at least `min` members, largest first. Pure. */
export function families(min = 8): Family[] {
  const all = theorems() as readonly Theorem[]
  const by = new Map<string, Family>()
  for (const t of all) {
    const slots = (t.key.match(/\d+/g) ?? []).map(Number)
    if (!slots.length) continue
    const shape = t.key.replace(/\d+/g, '#')
    const f = by.get(shape)
    if (f) { f.members.push({ key: t.key, slots }); if (!f.files.includes(t.file)) f.files.push(t.file) }
    else by.set(shape, { shape, members: [{ key: t.key, slots }], files: [t.file] })
  }
  return [...by.values()].filter((f) => f.members.length >= min).sort((a, b) => b.members.length - a.members.length)
}

export interface Collapse {
  shape: string
  members: number
  /** the slot index that carries no information once the kept slots are known */
  redundantSlot: number
  /** how many members collapse away if that slot is dropped */
  restatements: number
  files: string[]
}

/** collapses(min) → families with a slot that is redundant across every sealed member.
 *
 *  For each family with two or more slots, drop one slot and ask whether the remaining slots still determine the
 *  whole key's value slot. If they do — for every member, with no disagreement — the dropped slot is being
 *  enumerated for nothing, and the family is that many restatements wide. */
export function collapses(min = 8): Collapse[] {
  const out: Collapse[] = []
  for (const f of families(min)) {
    const width = f.members[0]!.slots.length
    if (width < 2) continue
    if (f.members.some((m) => m.slots.length !== width)) continue
    for (let drop = 0; drop < width - 1; drop++) {
      const seen = new Map<string, number>()
      let consistent = true, dup = 0
      for (const m of f.members) {
        const kept = m.slots.filter((_, i) => i !== drop && i !== width - 1).join(',')
        const value = m.slots[width - 1]!
        const prior = seen.get(kept)
        if (prior === undefined) seen.set(kept, value)
        else if (prior === value) dup++
        else { consistent = false; break }
      }
      if (consistent && dup > 0) {
        out.push({ shape: f.shape, members: f.members.length, redundantSlot: drop, restatements: dup, files: f.files })
        break
      }
    }
  }
  return out.sort((a, b) => b.restatements - a.restatements)
}
