#!/usr/bin/env node
// gateways — HOW MUCH EACH WING HOLDS AND HAS NOT SAID.
//
// A cross a·d = b·c between two pairs a wing already states is a PASSAGE: it connects one stated pair to
// another, and passing it costs the two coins like any gateway. Counting them measures something real — the
// distance between what a wing's own constants make true and what its theorems have actually sealed.
//
// THIS IS NOT A FINDER AND NOTHING HERE IS A DEFECT. An early version of this reported 8522 crosses and I read
// the number as noise from a broken filter, then deleted the script. That was the wrong metric: a detector is
// judged by false positives, a SURVEY by coverage. These are gateways nobody has walked, not findings nobody
// should have made — and a wing with many is rich, not faulty.
//
// WHAT IT DOES NOT CLAIM. That every gateway is worth sealing: a passage returning where it began costs two
// coins for nothing, and `2 * 6 = 3 * 4` is arithmetic true of any four numbers in that ratio. The survey counts
// the surface; which passages lead somewhere is a reading, and the kernel decides. Nothing is sealed here.
import { theorems } from '../index.js'

const nums = (s: string): number[] => [...new Set((s.match(/\b\d{1,6}\b/g) ?? []).map(Number))].filter((n) => n > 1)

const byWing = new Map<string, ReturnType<typeof theorems>>()
for (const t of theorems()) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])

const survey: Array<{ wing: string; stated: number; gateways: number }> = []
for (const [wing, ts] of byWing) {
  const pairs: Array<[number, number]> = []
  for (const t of ts) { const n = nums(t.statement)
    for (let x = 0; x < n.length; x++) for (let y = x + 1; y < n.length; y++) pairs.push([n[x]!, n[y]!]) }
  const seen = new Set<string>()
  for (let i = 0; i < pairs.length; i++) for (let j = i + 1; j < pairs.length; j++) {
    const [a, b] = pairs[i]!, [c, d] = pairs[j]!
    if (a === c && b === d) continue
    if (a * d === b * c) seen.add(`${a}*${d}=${b}*${c}`)
  }
  survey.push({ wing: wing.replace('.lean', ''), stated: ts.length, gateways: seen.size })
}

survey.sort((a, b) => b.gateways - a.gateways)
const total = survey.reduce((n, s) => n + s.gateways, 0)
console.log('wings by unwalked gateways — crosses between pairs the wing already states:')
for (const s of survey.slice(0, 10)) console.log(`  ${String(s.gateways).padStart(5)}  ${s.wing.padEnd(20)} (${s.stated} sealed)`)
console.log(`\n✓ gateways — ${total} passages across ${survey.length} wings, none sealed: the survey counts the surface, the kernel decides which lead somewhere.`)
