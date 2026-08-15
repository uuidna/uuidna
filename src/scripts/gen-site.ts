#!/usr/bin/env npx ts-node
// src/scripts/gen-site.ts — GENERATE COMPLETE SITE
// Builds VitePress documentation site from markdown
// Ready to deploy to uuidna.com

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

// Main execution
(async () => {
  console.log('🌐 Generating Captain Coins VitePress Site...\n')

  // Generate README
  console.log('  ✓ Generating README.md...')
  execSync('npx ts-node src/scripts/gen-readme.ts', { stdio: 'inherit' })

  // Build VitePress site
  console.log('  ✓ Building VitePress documentation...')
  try {
    execSync('npx vitepress build docs', { stdio: 'inherit' })
  } catch (e) {
    console.error('  ✗ VitePress build failed')
    console.error('  Install with: npm install -D vitepress')
    process.exit(1)
  }

  console.log('\n✦ DIAMOND DOCUMENTATION COMPLETE ✦\n')
  console.log('Generated:')
  console.log('  • docs/.vitepress/dist/ (VitePress site, default outDir)')
  console.log('  • README.md            (Project documentation)')
  console.log('  • docs/.vitepress/config.ts (VitePress configuration)\n')
  console.log('Diamond site is part of 1024 reproducible artistic outputs.')
  console.log('\nDeploy with:')
  console.log('  1. npm run docs:build  # Build site to docs/.vitepress/dist/')
  console.log('  2. cp -r docs/.vitepress/dist/* /var/www/uuidna.com/')
  console.log('  3. curl uuidna.com/    # Verify live')
})()
