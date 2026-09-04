#!/usr/bin/env node
// ship-build — wrangler [build] hook. It VERIFIES the site is built; it NEVER builds it.
//
// THE CONSTRAINT THIS ENFORCES: the SSG does not fit a deploy container. The render phase retains per page, so
// the heap scales with the 5260 dynamic pages — peak RSS 7.75–8.56 GB against Cloudflare Workers Builds' 8 GiB.
// There is no margin at any concurrency and no node version that changes it: `buildConcurrency` 64 → 2 moved
// peak RSS 8.17 → 7.75 GB (5%), and cutting the per-page params 61 → 50 MB moved nothing. A container build can
// only OOM twenty minutes in, which is why this hook refuses in milliseconds instead.
//
// So the SSG runs where the memory is — the operator's machine, via `npm run ship` (deploy-run.ts), which builds
// the site and then uploads with UUIDNA_SITE_BUILT=1. That is also the only path that keeps the deploy's laws:
// contribute-first deposit, origin-only tree, derived double proof. A git-connected container build keeps none of
// them, so a refusal here is the right answer twice over.
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { spawnSync } from 'node:child_process'

const DIST = join(ROOT, 'docs', '.vitepress', 'dist')

/** builtSite() → what the dist holds, so "built" is a reading and never an assumption. */
export function builtSite(dir: string = DIST): { present: boolean; index: boolean; pages: number } {
  if (!existsSync(dir)) return { present: false, index: false, pages: 0 }
  let pages = 0
  const walk = (d: string): void => {
    for (const n of readdirSync(d, { withFileTypes: true })) {
      if (n.isDirectory()) walk(join(d, n.name))
      else if (n.name.endsWith('.html')) pages++
    }
  }
  walk(dir)
  return { present: true, index: existsSync(join(dir, 'index.html')), pages }
}

const site = builtSite()
if (!site.present || !site.index) {
  console.error('✗ ship-build — no built site at docs/.vitepress/dist (index.html absent). NOTHING WAS UPLOADED,')
  console.error('  so whatever is live stays live: this refusal costs a red build and never a broken site.')
  console.error('')
  console.error('  WHY: the [build] hook does not run the SSG. Measured on this tree — 5260 dynamic pages need a')
  console.error('  heap of more than 4096 MB and build at 4352, against a deploy container of 8 GiB TOTAL that')
  console.error('  must also hold node, the bundler and its native modules. The render retains per page, so the')
  console.error('  requirement grows with the page count and no concurrency or heap setting changes that.')
  console.error('')
  console.error('  IF YOU ARE THE OPERATOR: deploy from the machine that has the memory —  npm run ship')
  console.error('  deploy-run builds the site, uploads with the dist in place, and keeps the contribute-first,')
  console.error('  origin-only and double-proof laws a container build skips entirely.')
  console.error('')
  console.error('  IF YOU ARE SEEING THIS ON EVERY PUSH: a git-connected Cloudflare Workers Build is attached and')
  console.error('  it can never succeed, because a container cannot render this site. Disconnect it —')
  console.error('  Cloudflare dashboard → Workers & Pages → uuidna → Settings → Build → disconnect the repository.')
  console.error('  That is a dashboard act; no change in this repository can stop the trigger from firing.')
  process.exit(1)
}
console.log(`ship-build · site present — ${site.pages} page(s) built; generating handles only`)
const r = spawnSync('node dist/scripts/gen-handles.js', { cwd: ROOT, shell: true, stdio: 'inherit', env: process.env })
if (r.status !== 0) process.exit(r.status ?? 1)
