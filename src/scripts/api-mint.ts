#!/usr/bin/env node
// @non-harmonic: asks every wired public API and queues FREE-MINT theorem candidates for the resident wave.
import { apiMintHarvest, apiMintDeposit } from '../api-mint.js'
import { ROOT } from './api.js'

const query = process.argv.find((a) => a.startsWith('--query='))?.slice(8)
  ?? process.argv[2]
  ?? 'quantum'
const deposit = process.argv.includes('--deposit')

if (deposit) {
  const h = await apiMintDeposit(query, ROOT + '/lean/wave-queue.json')
  console.log(`\napi-mint — ${h.evidence} evidence · ${h.mintable.length} mintable · receipt ${h.receipt}\n`)
  for (const m of h.mintable.slice(0, 12))
    console.log(`  · ${m.key}  ← ${m.source}  ${m.fragment.slice(0, 50)}`)
  console.log(`\n✓ deposited ${h.deposit.deposited.length} pending · refused ${h.deposit.refused.length} · queue ${h.deposit.pending}`)
  for (const r of h.deposit.refused.slice(0, 5)) console.log(`  · refused ${r.key}: ${r.reason}`)
} else {
  const h = await apiMintHarvest(query)
  console.log(`\napi-mint — ${h.evidence} evidence from ${h.sources.length} sources · ${h.mintable.length} mintable · receipt ${h.receipt}\n`)
  for (const m of h.mintable.slice(0, 12))
    console.log(`  · ${m.key}  ← ${m.source}  ${m.fragment.slice(0, 50)}`)
  if (h.mintable.length > 12) console.log(`  … and ${h.mintable.length - 12} more`)
}

process.exit(0)
