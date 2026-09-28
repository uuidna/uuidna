#!/usr/bin/env node
// @finder phase:10 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// api-cross — CROSS THE QUANTITIES THE APIS PUBLISHED AGAINST THE QUANTITIES THE LEDGER SEALS.
//
// The captain, 2026-09-28: "... to discover the cross formulas and prove on the apis as cross applications". This is the
// fourth and fifth links. The fourth is mechanical once the third is done: a published number and a sealed number are
// both integers, and a match is a candidate cross. The fifth is where care is needed.
//
// WHAT A MATCH PROVES AND WHAT IT DOES NOT. It proves that a public source and this ledger carry the same digits. It does
// NOT prove they mean the same thing, and this session has the counter-example in its own history: Colour and Acoustics
// share 340 — a hue angle and a wave speed in metres per second — and nothing physical passes between them. So a match
// here is a CANDIDATE and the door says so in every line it prints. The proof that a candidate is a real bridge is the
// CODATA path (src/codata-cross.ts), where the match is against a published constant with its unit and its exponent, and
// the unit is what makes the claim checkable.
//
// THE EVIDENCE FLOOR IS THE SAME LESSON AS EVERYWHERE ELSE HERE. A match on two or three digits is noise: short strings
// are the mantissa of hundreds of unrelated quantities. The floor is the median length of the digit strings actually
// discovered, so it is measured from this run rather than chosen, and it moves when the sources do.
//
// DECIMAL POINTS ARE DROPPED, NOT ROUNDED. A published 368.38 becomes 36838, because the ledger stores integers and a
// mantissa comparison is the only comparison available. That is a real weakening and it is stated: 368.38 and 36.838 and
// 3683.8 all become the same string, so a match carries no information about scale. Only the CODATA path recovers scale,
// because only it carries an exponent.

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { wrArtifact } from '../artifact.js'
import { ROOT } from '../boundary.js'
import { servedAsync } from '../receipt.js'
import { fsStore, ledgerAndRule } from './receipted.js'

interface DiscoveredQuantity { path: string; sample?: string }
interface DiscoverySource { api: string; quantities: DiscoveredQuantity[] }

/** the digits of a published value, decimal point and sign removed, trailing zeros kept */
export const digitsOf = (sample: string): string => {
  const m = /^-?(\\d+)(?:\\.(\\d+))?(?:[eE]([+-]?\\d+))?$/.exec(sample.trim())
  if (m === null) return ''
  return `${m[1]}${m[2] ?? ''}`.replace(/^0+(?=\\d)/, '')
}

const census = JSON.parse(readFileSync(join(ROOT, 'lean', 'api-discovery.json'), 'utf8')) as
  { sources?: DiscoverySource[] }
const sources = census.sources ?? []

const published: { api: string; path: string; digits: string; raw: string }[] = []
for (const s of sources) {
  for (const q of s.quantities) {
    if (q.sample === undefined) continue
    const d = digitsOf(q.sample)
    if (d === '') continue
    published.push({ api: s.api, path: q.path, digits: d, raw: q.sample })
  }
}

// THE FLOOR IS THIS RUN'S OWN MEDIAN, so it is measured and not picked
const lengths = published.map((p) => p.digits.length).sort((a, b) => a - b)
const mid = lengths.length >> 1
const floor = lengths.length === 0
  ? 0
  : lengths.length % 2 === 1
    ? lengths[mid]!
    : ((lengths[mid - 1]! + lengths[mid]!) - ((lengths[mid - 1]! + lengths[mid]!) % 2)) / 2

interface Candidate { digits: string; api: string; path: string; raw: string; wings: string[] }

const crossed = await servedAsync<{ floor: number; published: number; candidates: Candidate[] }>({
  path: 'lean/api-cross-receipt.json',
  inputs: [
    ...ledgerAndRule(['dist/scripts/api-cross.js']),
    // the discovery census is an input too: new quantities must invalidate the receipt
    readFileSync(join(ROOT, 'lean', 'api-discovery.json'), 'utf8'),
  ],
  compute: async () => {
    const { theorems } = await import('../theorems/index.js')
    const { characteristicNumerals } = await import('../formula.js')
    const carriers = new Map<string, Set<string>>()
    for (const t of theorems()) {
      const wing = String(t.file).replace(/\\.lean$/, '')
      for (const v of characteristicNumerals(String(t.statement ?? ''))) {
        const set = carriers.get(v) ?? new Set<string>()
        set.add(wing)
        carriers.set(v, set)
      }
    }
    const candidates: Candidate[] = []
    for (const p of published) {
      if (p.digits.length < floor) continue
      const wings = carriers.get(p.digits)
      if (wings === undefined) continue
      candidates.push({ digits: p.digits, api: p.api, path: p.path, raw: p.raw, wings: [...wings].sort() })
    }
    return { floor, published: published.length, candidates }
  },
}, fsStore)

const { candidates } = crossed.value
console.log(crossed.hit ? `served by receipt ${crossed.digest}` : `crossed and earned receipt ${crossed.digest}`)
console.log(`published quantities ${published.length} · evidence floor ${floor} digits · CANDIDATE crosses ${candidates.length}`)
console.log()
for (const c of candidates.slice(0, 20)) {
  console.log(`  ${c.digits.padStart(12)}  ${c.api}.${c.path}  (${c.raw})`)
  console.log(`                ⇄ sealed in ${c.wings.slice(0, 6).join(', ')}`)
}
if (candidates.length > 20) console.log(`  … and ${candidates.length - 20} more`)
console.log()
console.log('EVERY LINE ABOVE IS A CANDIDATE, NOT A BRIDGE. A shared digit string is a fact about digits: this session')
console.log('found Colour and Acoustics sharing 340, a hue angle against a wave speed, with nothing passing between.')
console.log('The unit is what would make it checkable, and only the CODATA path carries one.')

wrArtifact('lean/api-cross.json', {
  kind: 'api-cross',
  publishedQuantities: published.length,
  evidenceFloor: floor,
  candidates,
  honest: 'a candidate is a shared digit string between a public source and a sealed statement. It is not a bridge: the '
    + 'decimal point is dropped so scale is lost, and 368.38, 36.838 and 3683.8 all match the same key. Only a match '
    + 'carrying a unit and an exponent — the CODATA path — can be checked as meaning the same quantity.',
})
console.log()
console.log('✓ lean/api-cross.json written')
