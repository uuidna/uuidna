#!/usr/bin/env node
// seo-freeze-audit — run the final SEO + URL-freeze gate (also invoked from prepublish-seal).
import { finalSeoAudit } from '../seo-freeze.js'

const a = finalSeoAudit()
console.log('final-seo-audit — quantumSeo · sitemap · hexbit freeze')
console.log(`  pages=${a.pages} frozenRoutes=${a.frozenRoutes} handleCollisions=${a.handleCollisions} drift=${a.routeDrift.length}`)
console.log(`  receipt ${a.receipt}`)
console.log(`  ${a.honest}`)
if (!a.ok) {
  console.error('✗ final-seo-audit — REFUSED:')
  for (const g of a.gaps.slice(0, 40)) {
    console.error(`  GAP ${g.what}`)
    console.error(`  FIX ${g.fix}`)
  }
  if (a.gaps.length > 40) console.error(`  … +${a.gaps.length - 40} more`)
  process.exit(1)
}
console.log('✓ final-seo-audit — SEO clean; URL freeze holds; hexbit doors are the permanence solution')
