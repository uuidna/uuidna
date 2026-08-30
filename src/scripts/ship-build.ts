#!/usr/bin/env node
// ship-build — wrangler [build] hook. deploy-run sets UUIDNA_SITE_BUILT=1 after docs:build so the outward
// mill does not pay the SSG twice (verify-don't-recompute at deploy). CI / bare `wrangler deploy` still
// runs the full docs:build chain.
import { spawnSync } from 'node:child_process'
import { ROOT } from './api.js'

function run(cmd: string): void {
  const r = spawnSync(cmd, { cwd: ROOT, shell: true, stdio: 'inherit', env: process.env })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

if (process.env.UUIDNA_SITE_BUILT === '1') {
  console.log('ship-build · site already built — gen-handles only')
  run('node dist/scripts/gen-handles.js')
} else {
  run('npm run docs:build && node dist/scripts/gen-handles.js')
}
