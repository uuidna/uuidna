#!/usr/bin/env node
// src/scripts/gen-legacy-manifest.ts — legacy/manifest.json: every module of the old tree (src/ and legacy/web/, the
// payloadcms/website fork) as the Payload installation in web/ takes it in, one lead per module. Read from git, so the
// manifest names the committed tree; each module's address is the content address of its text.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, listTracked } from './api.js'
import { toUuid } from '../address.js'

const CODE = /\.(ts|tsx|js|mjs|cjs)$/
const EXPORT = /export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g
const EXPORT_LIST = /export\s*\{([^}]*)\}/g

const modules = listTracked(['src', 'legacy/web'])
  .filter((f) => CODE.test(f) && !f.endsWith('.d.ts') && !f.includes('/node_modules/'))
  .sort()
  .map((path) => {
    const text = readFileSync(join(ROOT, path), 'utf8')
    const names = new Set<string>()
    for (const m of text.matchAll(EXPORT)) names.add(m[1]!)
    for (const m of text.matchAll(EXPORT_LIST))
      for (const part of m[1]!.split(',')) { const name = part.trim().split(/\s+as\s+/).pop()?.trim(); if (name) names.add(name) }
    return { path, exports: [...names].sort(), size: Buffer.byteLength(text), address: toUuid(text) }
  })

writeFileSync(join(ROOT, 'legacy', 'manifest.json'), JSON.stringify({ modules: modules.length, receipt: toUuid(modules.map((m) => m.address).join('\n')), entries: modules }) + '\n')
console.log(`✓ gen-legacy-manifest — ${modules.length} module(s) of src/ and legacy/web/ → legacy/manifest.json`)
