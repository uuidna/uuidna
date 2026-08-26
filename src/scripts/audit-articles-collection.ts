#!/usr/bin/env node
// audit-articles-collection — ENFORCE the Astro-schema half VitePress leaves open (captain lesson).
//
// docs/articles/* already carries title + description uniformly. Until this runs on the gate, the 211th article
// can omit either and the build stays silent — the exact defect class collection/index.ts was written to catch.
// TypeScript validates; VitePress never invents the schema. Not a live Astro collection.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { defineCollection, validate, verdictOf, text } from '../collection/index.js'

const DIR = join(ROOT, 'docs', 'articles')

/** Minimal YAML frontmatter parse — enough for title/description string fields gen-articles emits. */
function frontmatterOf(src: string): Record<string, unknown> {
  if (!src.startsWith('---\n')) return {}
  const end = src.indexOf('\n---\n', 4)
  if (end < 0) return {}
  const block = src.slice(4, end)
  const data: Record<string, unknown> = {}
  for (const line of block.split('\n')) {
    const i = line.indexOf(':')
    if (i <= 0) continue
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return data
}

const articles = defineCollection('articles', [text('title'), text('description')])

const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()
const entries = files.map((f) => ({
  id: `docs/articles/${f}`,
  data: frontmatterOf(readFileSync(join(DIR, f), 'utf8')),
}))

const v = validate(articles, entries)
console.log(verdictOf(v))
if (v.unexercised.length) {
  console.log(`  unexercised optional fields: ${v.unexercised.join(', ')}`)
}
if (v.gaps.length) {
  for (const g of v.gaps.slice(0, 20)) console.error(`  ✗ ${g.what}\n    fix: ${g.fix}`)
  if (v.gaps.length > 20) console.error(`  … ${v.gaps.length - 20} more`)
  process.exit(1)
}
if (v.checked < 1) {
  console.error('✗ articles collection checked 0 entries — denominator missing')
  process.exit(1)
}
