#!/usr/bin/env node
// src/scripts/gen-legacy-manifest.ts — legacy/manifest.json: every module of the old tree (src/, legacy/web/ — the
// payloadcms/website fork — and worker.js, the edge) as the Payload installation in web/ takes it in, one lead product
// per module. Read from git, so the manifest names the committed tree; each module's address is the content address of
// its text, and its work task is the first sentence of its own header comment.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, listTracked } from './api.js'
import { toUuid } from '../address.js'

const CODE = /\.(ts|tsx|js|mjs|cjs)$/
const EXPORT = /export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g
const EXPORT_LIST = /export\s*\{([^}]*)\}/g

const version = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { version: string }).version

/** the first sentence of the comment a module opens with, or '' when it opens with code */
const taskOf = (text: string): string => {
  const head: string[] = []
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (/^(#!|\/\/\s*@)/.test(t)) continue
    const m = /^(?:\/\/+|\/\*+|\*\/?)\s?(.*)$/.exec(t)
    if (!m) break
    head.push(m[1]!.replace(/\*\/$/, '').trim())
  }
  const prose = head.join(' ').replace(/\s+/g, ' ').trim()
  return (/^(.{12,300}?[.!?])(\s|$)/.exec(prose)?.[1] ?? prose.slice(0, 300)).trim()
}

const modules = listTracked(['src', 'legacy/web', 'worker.js'])
  .filter((f) => CODE.test(f) && !f.endsWith('.d.ts') && !f.includes('/node_modules/'))
  .sort()
  .map((path) => {
    const text = readFileSync(join(ROOT, path), 'utf8')
    const names = new Set<string>()
    for (const m of text.matchAll(EXPORT)) names.add(m[1]!)
    for (const m of text.matchAll(EXPORT_LIST))
      for (const part of m[1]!.split(',')) { const name = part.trim().split(/\s+as\s+/).pop()?.trim(); if (name) names.add(name) }
    return { path, exports: [...names].sort(), size: Buffer.byteLength(text), address: toUuid(text), task: taskOf(text), version }
  })

writeFileSync(join(ROOT, 'legacy', 'manifest.json'), JSON.stringify({ modules: modules.length, receipt: toUuid(modules.map((m) => m.address).join('\n')), entries: modules }) + '\n')
console.log(`✓ gen-legacy-manifest — ${modules.length} module(s) of src/, legacy/web/ and worker.js → legacy/manifest.json`)
