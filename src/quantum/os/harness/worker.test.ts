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


// ── THE CI-ONLY DEPLOY BRANCH, AND THE CEILING IT HIT. Measured 2026-09-02: a Cloudflare Workers Build ran
// `npx wrangler deploy`, wrangler's [build] hook ran ship-build.js, and because CI has no UUIDNA_SITE_BUILT it
// took the expensive branch — the whole docs:build inside wrangler — and the SSG died with
// `FATAL ERROR: Ineffective mark-compacts near heap limit` at `--max-old-space-size=4096`, rendering 5246 dynamic
// pages. Reproduced locally at 4096 (exit 134) and cleared at 6144 (exit 0, 108s), so the ceiling is the finding
// and 6144 is the smallest step that cleared it.
//
// THE LOCAL PATH NEVER EXERCISES THIS. deploy-run builds the site first and sets UUIDNA_SITE_BUILT=1, so
// ship-build's cheap branch runs and the SSG's memory is never paid inside wrangler. A branch only CI takes is a
// branch only CI can fail on, which is why the flag is now held by a test rather than by whoever last edited the
// script chain.
test('the CI-only deploy branch is declared, and it is the one that pays the SSG', () => {
  // NO NUMBER LIVES HERE. quantum-advantage-theme.test.ts owns both the heap flag and the render concurrency,
  // with the measurements beside them; two tests asserting one value is the drift this tree spends its finders
  // on. This holds the SHAPE: the branch exists, CI is the caller that takes it, and the site build is what it
  // runs — which is why the SSG's memory is a CI problem and never a local one.
  const ship = readFileSync(join(ROOT, 'src', 'scripts', 'ship-build.ts'), 'utf8')
  assert.match(ship, /UUIDNA_SITE_BUILT/, 'the cheap/expensive split is what makes the CI branch CI-only')
  assert.match(ship, /docs:build/, 'the CI branch runs the full site build inside wrangler')
  assert.match(ship, /gen-handles/, 'the cheap branch still seals the handles')
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.match(pkg.scripts['docs:build'] ?? '', /vitepress\.js build docs/, 'the SSG is what the branch pays for')
  // and the local path must keep setting the flag, or it starts paying the CI cost too
  const deployRun = readFileSync(join(ROOT, 'src', 'scripts', 'deploy-run.ts'), 'utf8')
  assert.match(deployRun, /UUIDNA_SITE_BUILT/, 'the local path builds the site FIRST and says so')
})
