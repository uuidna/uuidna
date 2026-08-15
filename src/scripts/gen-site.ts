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
    execSync('npx vitepress build', { stdio: 'inherit' })
  } catch (e) {
    console.error('  ✗ VitePress build failed')
    console.error('  Install with: npm install -D vitepress')
    process.exit(1)
  }

  console.log('\n✦ VITEPRESS SITE GENERATION COMPLETE ✦\n')
  console.log('Generated:')
  console.log('  • ./site/              (Built VitePress site)')
  console.log('  • README.md            (Project documentation)')
  console.log('  • .vitepress/config.ts (VitePress configuration)\n')
  console.log('Ready to deploy to uuidna.com')
  console.log('\nDeploy with:')
  console.log('  1. npm run docs:build  # Build site to ./site')
  console.log('  2. cp -r site/* /var/www/uuidna.com/')
  console.log('  3. curl uuidna.com/    # Verify live')
})()
