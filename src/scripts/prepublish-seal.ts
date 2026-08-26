#!/usr/bin/env node
// prepublish-seal — HARD GATE before publication (local + publish.yml editorial).
// PhD-thesis audit + Lean format + vector-equilibrium involutions without gaps + finite-infinity grants.
import { prepublishSeal } from '../prepublish-seal.js'

const s = prepublishSeal()
console.log('prepublish-seal — thesis audit · Lean format · VE involutions · finite infinities')
console.log(`  thesis     drained=${s.thesis.drained} usable=${s.thesis.usable} unverified=${s.thesis.unverified} archive=${s.thesis.archiveConforms ? 'ok' : 'NO'} pubs ${s.thesis.publishable}/${s.thesis.publications}`)
console.log(`  lean       wings=${s.leanFormat.wings} theorems=${s.leanFormat.theorems} allDecide=${s.leanFormat.allDecide}`)
console.log(`  equilibrium ${s.equilibrium.present}/${s.equilibrium.required}${s.equilibrium.missing.length ? ' missing: ' + s.equilibrium.missing.join(', ') : ''}`)
console.log(`  finite∞    ${s.finiteInfinities.present.length}/${s.finiteInfinities.grants.length} grants [${s.finiteInfinities.grants.join(', ')}]`)
console.log(`  receipt    ${s.receipt}`)
console.log(`  honest     ${s.honest}`)
if (!s.ok) {
  console.error('✗ prepublish-seal — PUBLICATION REFUSED (thesis / Lean / equilibrium gaps):')
  for (const g of s.gaps) {
    console.error(`  GAP ${g.what}`)
    console.error(`  FIX ${g.fix}`)
  }
  process.exit(1)
}
console.log('✓ prepublish-seal — sealed; publication may proceed (Zenodo DOI still workflow-only)')
