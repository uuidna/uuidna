#!/usr/bin/env node
// @non-harmonic: this script ASKS THE OUTSIDE WORLD — the research gates answer on their own uptime, and a probe is
// a network read. Everything it prints is addressed: what came back is a content-address, not a copy.
//
// research-gates — probe every declared gate once. A keyless gate is asked its declared probe and the answer is
// addressed (ask() in src/apis). A keyed gate is never asked here: the script reports whether the OWNER has set the
// key's environment variable (presence only, the value is never read into any output) and otherwise says UNSENT, the
// same word the run evidence uses for a missing token. A served-not-fetched gate is listed as cited. Nothing here is
// a verdict: the court leans what a gate answers, this is the roll-call.
//   npm run x -- research-gates            probe and print
//   npm run x -- research-gates --json     the same as one JSON document
import { ask } from '../apis/index.js'
import { researchGates, researchEnvironment, type GateRow } from '../quantum/os/gates/index.js'

type Probe =
  | { id: string; grade: string; standards: boolean; state: 'answered'; address: string; bytes: number; status: number }
  | { id: string; grade: string; standards: boolean; state: 'refused'; why: string }
  | { id: string; grade: string; standards: boolean; state: 'UNSENT'; keys: string[] }
  | { id: string; grade: string; standards: boolean; state: 'keyed'; keys: string[] }
  | { id: string; grade: string; standards: boolean; state: 'cited' }

const probeUrl = (g: GateRow): string => {
  if (g.id === 'nist-acvp-vectors') return `${g.base}/${g.probe}`
  if (g.probe === '' || g.probe === undefined) return g.base
  const q = encodeURIComponent(g.probe)
  switch (g.id) {
    case 'duckduckgo-instant': return `${g.base}?q=${q}&format=json&no_html=1`
    case 'wikipedia-search': return `${g.base}?action=query&list=search&srsearch=${q}&format=json`
    case 'crossref-works': return `${g.base}?query=${q}&rows=1`
    case 'openalex-works': return `${g.base}?search=${q}&per-page=1`
    case 'semantic-scholar-search': return `${g.base}?query=${q}&limit=1`
    case 'arxiv-query': return `${g.base}?search_query=all:${q}&max_results=1`
    case 'zenodo-records': return `${g.base}?q=${q}&size=1`
    case 'nist-nvd-cves': return `${g.base}?cveId=${q}`
    case 'cern-open-data': return `${g.base}?q=${q}&size=1`
    default: return `${g.base}?q=${q}`
  }
}

const probeOne = async (g: GateRow): Promise<Probe> => {
  const head = { id: g.id, grade: g.grade, standards: g.standards }
  if (g.access === 'served-not-fetched') return { ...head, state: 'cited' }
  if (g.access === 'owner-key') {
    const keys = [...(g.key ?? [])]
    const set = keys.every((k) => typeof process.env[k] === 'string' && process.env[k]!.length > 0)
    return set ? { ...head, state: 'keyed', keys } : { ...head, state: 'UNSENT', keys }
  }
  if (g.shape === 'zip') return { ...head, state: 'cited' }   // a binary archive is addressed by its downloader, not read here
  const a = await ask(probeUrl(g))
  return 'refused' in a ? { ...head, state: 'refused', why: a.refused } : { ...head, state: 'answered', address: a.address, bytes: a.bytes, status: a.status }
}

const main = async (): Promise<void> => {
  const json = process.argv.includes('--json')
  const r = researchGates()
  const e = researchEnvironment()
  const probes = await Promise.all(r.gates.map(probeOne))
  const answered = probes.filter((p) => p.state === 'answered').length
  const unsent = probes.filter((p) => p.state === 'UNSENT')
  if (json) {
    console.log(JSON.stringify({ gates: r.receipt, environment: e.receipt, answered, unsent: unsent.length, probes, ported: e.ported, absent: e.absent }, null, 1))
    return
  }
  console.log(`research-gates — ${r.count} gates (${r.standardsGraded} standards-graded) · receipt ${r.handle} · environment ${e.ported}/${e.asked} ported${e.absent.length ? ` (absent: ${e.absent.join(', ')})` : ''}`)
  for (const p of probes) {
    const tag = p.grade.padEnd(10)   // named · identifier · standard — the credit classifier's word, not a blanket label
    if (p.state === 'answered') console.log(`  ✓ ${tag} ${p.id.padEnd(28)} ${p.status} ${String(p.bytes).padStart(7)} bytes → ${p.address}`)
    else if (p.state === 'refused') console.log(`  ○ ${tag} ${p.id.padEnd(28)} refused: ${p.why}`)
    else if (p.state === 'UNSENT') console.log(`  · ${tag} ${p.id.padEnd(28)} UNSENT — the owner sets ${p.keys.join(' and ')}`)
    else if (p.state === 'keyed') console.log(`  ✓ ${tag} ${p.id.padEnd(28)} key present (${p.keys.join(', ')}) — asked by its door, not here`)
    else console.log(`  · ${tag} ${p.id.padEnd(28)} cited, not fetched`)
  }
  console.log(`  ${answered} answered · ${unsent.length} UNSENT (owner keys) · ${probes.length - answered - unsent.length} cited or refused`)
}

await main()
