// worker discovery — EVERY PUBLISHED PAGE IS A MOUNT POINT, tested at the only level available.
//
// worker.js is not in the TypeScript import graph (mcp-http.test.ts says so where it explains why the MODULE is
// tested instead), and a Cloudflare Worker cannot be instantiated from node:test without wrangler. So this reads
// the deployed source as TEXT and asserts on it. That is a weaker instrument than executing it and this file says
// so rather than implying otherwise: it can prove the route and the header are DECLARED, never that the edge
// serves them. The executing check is the live GET, which belongs to a deploy verification and not to a unit test.
//
// WHAT IT GUARDS. The endpoint answered a client's GET /mcp with a discovery document long before today, which is
// a well-built pasteable mount — but it fired only when the pasted link already contained /mcp. A harness handed
// the bare host, or any of the two thousand published pages, had nothing to follow: /.well-known/mcp.json was 404
// (verified live) and no response anywhere named the endpoint.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'

const worker = (): string => readFileSync(join(ROOT, 'worker.js'), 'utf8')

test('the well-known door is declared, so pasting the BARE HOST can mount the wire', () => {
  const src = worker()
  assert.match(src, /'\/\.well-known\/mcp\.json'/, 'a client that probes well-known paths must find the endpoint without being told the path')
  // and it must answer with the discovery document, not a stub
  assert.match(src, /well-known\/mcp\.json'\)\s*\{[\s\S]{0,400}discovery\(\)/, 'the well-known route must serve the real discovery document')
})

test('THE DISCOVERY DOCUMENT IS ONE DECLARATION — two copies would drift, which is the whole reason for the dry law', () => {
  const src = worker()
  // the note text is the document's most distinctive line; it must appear exactly once, in the single builder
  const notes = src.match(/POST a JSON-RPC message here/g) ?? []
  assert.equal(notes.length, 1, `the discovery note appears ${notes.length} times — served from two paths, it must still be BUILT once`)
  assert.match(src, /const discovery = \(\) => \(\{/, 'the one declaration both doors call')
})

test('every static page carries the endpoint in a Link header — "paste any uuidna.com link" means ANY', () => {
  const src = worker()
  assert.match(src, /headers\.set\('link', `<\$\{url\.origin\}\/mcp>; rel="mcp"`\)/, 'the asset response must name the endpoint')
  // THE MUTATION THAT MATTERS: an ASSETS response's headers are immutable, so the response has to be REBUILT.
  // Setting a header on the original throws at the edge and nowhere else — the failure that only appears in
  // production. This pins the rebuild, so a future simplification back to the direct return is caught here.
  assert.match(src, /new Response\(asset\.body, \{ status: asset\.status/, 'the response must be rebuilt, never mutated — ASSETS headers are immutable at the edge')
  assert.match(src, /headers\.set\('cache-control', assetCacheControl/, 'hashed assets verify at the CDN — immutable cache until deploy')
  assert.ok(!/env\.ASSETS\.fetch\(request\) \/\/ serve the static site/.test(src), 'the un-headered direct return must not come back')
})

test('the additions are ADDITIVE — the protocol path is untouched', () => {
  const src = worker()
  // the JSON-RPC contract, the CORS grant and the 405 guidance all still stand: this change adds doors, it does
  // not move the one that already worked
  assert.match(src, /url\.pathname === '\/mcp'/)
  assert.match(src, /access-control-allow-origin/)
  assert.match(src, /POST a JSON-RPC message to \/mcp \(or GET for discovery\)/)
})

test('the worker graph never static-imports Node builtins Cloudflare refuses (code 10021)', () => {
  const files = [
    'worker.js',
    'src/mcp.ts',
    'src/mcp-http.ts',
    'src/mcp-wire.ts',
    'src/gate-engine.ts',
    'src/tts/index.ts',
    'src/scripts/context-budget.ts',
    'src/os/runtime/index.ts',
    'src/os/runtime/rootfs/index.ts',
    'src/os/runtime/sandbox/index.ts',
    'src/os/runtime/hostnode/index.ts',
    'src/quantum/os/cache/index.ts',
  ]
  for (const rel of files) {
    const src = readFileSync(join(ROOT, rel), 'utf8')
    assert.doesNotMatch(src, /(?:^|\n)import [^;\n]* from ['"]node:(fs|path|os|child_process|util)['"]/, rel)
    assert.doesNotMatch(src, /(?:await |void )import\(['"]node:(fs|path|os|child_process|util)['"]\)/, rel)
  }
  const wrangler = readFileSync(join(ROOT, 'wrangler.toml'), 'utf8')
  assert.match(wrangler, /ship-build\.js/)
  assert.doesNotMatch(wrangler, /command = .*seo-freeze-audit/, 'gen-handles already runs the audit — listing it again on wrangler [build] double-pays')
})


// ── THE CONTAINER CANNOT AFFORD THE SSG, AND TWO ROUNDS OF KNOBS PROVED IT.
//
// First reading (2026-09-02): a Workers Build died at `--max-old-space-size=4096` with `Ineffective
// mark-compacts near heap limit`, and `buildConcurrency: 8` was measured to clear the same site locally at that
// cap. That looked like the fix and it was not: commit ae411b7e carried concurrency 8 and the 2026-09-03T13:49
// deploy OOMed anyway.
//
// Second reading, controlled — the knobs are exhausted and none of them is the cause:
//   · concurrency 64 → 2 moved peak RSS 8.17 → 7.75 GB. Five percent. A quantity that barely answers a knob is
//     not governed by it.
//   · per-page params 61 → 50 MB (crosslinks stripped) moved nothing at all.
//   · the heap requirement sits between 3072 (fails) and 4096 (passes) — under 33% of margin at CI's cap.
//   · page count IS the driver: 1200 pages build inside 2048. 5260 do not fit any cap the container survives,
//     because the render phase retains per page and 5260 × ~1.7 MB is the 8 GiB the container has in total.
// The wall is the container, not the flag: peak RSS 7.75–8.56 GB against 8 GiB leaves no room at any setting,
// which is why no node version and no concurrency ever cleared it.
//
// SO THE HOOK REFUSES. ship-build VERIFIES the dist and generates handles; it never runs the SSG. The site is
// built where the memory is — `npm run ship` — which is also the only path that keeps the deploy's own laws
// (contribute-first deposit, origin-only tree, derived double proof). Reducing the page count instead would mean
// serving links VitePress could not resolve, and dead links are not ignored here.
test('the [build] hook verifies the site and never pays the SSG inside the container', () => {
  const ship = readFileSync(join(ROOT, 'src', 'scripts', 'ship-build.ts'), 'utf8')
  assert.doesNotMatch(ship, /docs:build/, 'the container cannot afford the SSG; a hook that runs it can only OOM')
  assert.match(ship, /existsSync/, '"built" must be a READING of the dist, never an assumption from an env flag')
  assert.match(ship, /process\.exit\(1\)/, 'an absent dist is a named refusal in milliseconds, not a 20-minute OOM')
  assert.match(ship, /npm run ship/, 'the refusal must name the path that works')
  assert.match(ship, /gen-handles/, 'a verified site still seals its handles')
  // the local path is the one that pays the SSG, and it must keep doing so before it uploads
  const deployRun = readFileSync(join(ROOT, 'src', 'scripts', 'deploy-run.ts'), 'utf8')
  assert.match(deployRun, /npm run docs:build/, 'deploy-run builds the site on the machine that has the memory')
  assert.match(deployRun, /UUIDNA_SITE_BUILT/, 'and says so to wrangler')
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.match(pkg.scripts['docs:build'] ?? '', /vitepress\.js build docs/, 'the SSG is what the local path pays for')
  // and the dead-link check stays strict: dropping pages to fit a container would trade a build error for a
  // broken link, which is the same defect served to a reader instead of to a log.
  const vpConfig = readFileSync(join(ROOT, 'docs', '.vitepress', 'config.ts'), 'utf8')
  assert.doesNotMatch(vpConfig, /ignoreDeadLinks:\s*true/, 'dead links are not ignored — a page that is linked must exist')
})
