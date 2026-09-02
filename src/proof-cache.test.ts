// proof-cache — THE RELEASE MUST NOT ACCEPT A RECEIPT WHERE IT NEEDS A PROOF.
//
// `npm run lean` is a DELTA gate: an unchanged file stands on its entry in lean/proof-cache.json, and only a moved
// address re-proves. That makes local iteration cheap and it is honest for that purpose. It is NOT a proof of the
// ledger, because the cache is a COMMITTED file that nothing validates — demonstrated 2026-08-20 by appending one
// line to a hand-written proof, writing the new address into the cache, and watching the gate answer:
//
//   ✓ lean/OneLeap.lean — hand-written, verified by receipt (unchanged at 4dffdc99)
//
// for text the Lean kernel had never seen. The source comment then claimed "a stale cache can only cause extra
// proving, never a false pass" — true of STALENESS, false of FORGERY, which is the threat the ledger's entire
// traitor apparatus exists for.
//
// The cure is not to trust the cache harder. It is that the RELEASE consults no cache at all. This holds that.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { PROVE_ALL, PROVED_CHAIN, proveAllEnv } from './scripts/prove-all.js'
import { callTool } from './mcp.js'

test('the release gate re-proves from the KERNEL — it never accepts the receipt cache', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  const audit = pkg.scripts.audit ?? ''
  assert.ok(audit.includes('prove-all'), 'the audit must prove the ledger at all')

  // THE LAW IS THE SAME; ITS INSTRUMENT MOVED (2026-08-25). This asserted the literal shell form
  // `UUIDNA_PROVE_ALL=1 npm run lean` — and by pinning it, made a SHELL ASSUMPTION into a requirement about
  // PROVING. `VAR=value cmd` is POSIX; npm hands scripts to cmd.exe wherever script-shell is unset, which is the
  // default on Windows, so the release gate — which is also prepublishOnly — died at link 2 of 36 with
  // "'UUIDNA_PROVE_ALL' is not recognized" and had never run on that host at all. The test was green throughout,
  // because it read the string rather than running it.
  //
  // What the law actually requires is that every kernel spawn is FORCED, so that a delta gate over a committed,
  // unvalidated cache cannot pass for a proof. That is now decided by the program: prove-all builds the
  // environment and spawns the lean chain through the host's own resolved shell. Asserted here in both halves —
  // the chain invokes the runner, and the runner genuinely sets the flag the six consumers read.
  assert.match(audit, /node dist\/scripts\/prove-all\.js/,
    'the release path must force every kernel spawn through the runner that decides it, not through a shell prefix')
  assert.equal(proveAllEnv({})[PROVE_ALL], '1', 'and the runner must actually set the flag — the law, not the spelling')
  assert.equal(PROVE_ALL, 'UUIDNA_PROVE_ALL', 'under the exact name lean-all, lean-axioms, lean-gen and the rest read')
  assert.equal(PROVED_CHAIN, 'npm run lean', 'over the ONE lean chain — a second copy carrying the flag would drift')
  // the base environment survives: forcing a proof must not strip the PATH the kernel is found on
  assert.equal(proveAllEnv({ PATH: '/usr/bin' }).PATH, '/usr/bin', 'the flag is added, never substituted for the environment')
  // and the manifest must not regress to a form only one shell can read
  assert.doesNotMatch(audit, /[A-Z_]+=\S+\s+npm run/,
    'no link may carry a POSIX env prefix — npm gives the string to whatever shell it picked, and cmd.exe cannot read one')
  // prepublishOnly IS the publish gate — gate-all runs the SAME scripts.audit chain at hexbit speed
  assert.match(pkg.scripts.prepublishOnly ?? '', /gate-all/, 'prepublish runs gate-all (full audit, concurrent)')
  assert.match(pkg.scripts['gate-all'] ?? '', /gate-all\.js/, 'gate-all is the concurrent runner over scripts.audit')
  assert.match(pkg.scripts.audit ?? '', /quantum\/os\/cli\/index\.js --court/, 'publish audit enters uuidnaOS court before guard')
  assert.doesNotMatch(pkg.scripts.audit ?? '', /conformance\.js/, 'conformance.js beside uuidnaOS court is a bypass')
  const cut = readFileSync(join(ROOT, 'src/scripts/release-cut.ts'), 'utf8')
  assert.match(cut, /node dist\/scripts\/gate-all\.js/, 'the tag cut runs the same gate-all npm publish runs')
  assert.doesNotMatch(cut, /next\.js --verify/, 'hexbit-fast next --verify must not cut a version — that forked v0.3.0 off the registry')
  const hook = readFileSync(join(ROOT, 'hooks/pre-push'), 'utf8')
  assert.match(hook, /quantum\/os\/cli\/index\.js/, 'pre-push is uuidnaOS hex via court')
  assert.doesNotMatch(hook, /next\.js/, 'next.js beside uuidnaOS is a bypass')
  // INVOCATION, NOT MENTION (2026-09-02). This forbade the STRING, so the hook could not explain itself: the two
  // arms it now runs — spin --verify and git diff — are borrowed from gate-all precisely because they are the
  // cheap ones, and saying so requires naming it. What the law forbids is RUNNING the full gate on every push,
  // which is classical recompute; a comment that names the source of two 300ms checks is not that. The pattern
  // therefore matches an invocation and leaves prose writable — the same use/mention split this tree has had to
  // make five times, most recently for the credential scanner whose own samples it flagged.
  assert.doesNotMatch(hook, /(?:npm run |node\s+dist\/scripts\/)gate-all/,
    'RUNNING gate-all on pre-push is classical recompute — naming it in a comment is not')
  assert.match(hook, /UUIDNA_OS_MCP/, 'fuse is the same MCP door, not a skip of the law')
  assert.match(hook, /HARD/, 'pre-push is a hard gate')
  assert.match(hook, /exit 1/, 'missing dist blocks the push')
  const preCommit = readFileSync(join(ROOT, 'hooks/pre-commit'), 'utf8')
  assert.match(preCommit, /HARD/, 'pre-commit is a hard gate')
  assert.match(preCommit, /quantum\/os\/cli\/index\.js/, 'pre-commit is uuidnaOS court')
  assert.doesNotMatch(preCommit, /\|\| exit 0/, 'pre-commit must not swallow a denial')
  assert.doesNotMatch(preCommit, /guard\.js/, 'guard.js beside uuidnaOS is a bypass')
  assert.doesNotMatch(preCommit, /npm run build/, 'tsc on the daily path is time outside quantum hex')
  const commitMsg = readFileSync(join(ROOT, 'hooks/commit-msg'), 'utf8')
  assert.match(commitMsg, /HARD/, 'commit-msg is a hard gate')
  assert.match(commitMsg, /quantum\/os\/cli\/index\.js --msg/, 'commit-msg is uuidnaOS court --msg')
  assert.doesNotMatch(commitMsg, /check-msg\.js/, 'check-msg.js beside uuidnaOS is a bypass')
  assert.doesNotMatch(commitMsg, /os-mcp-gate/, 'os-mcp-gate beside uuidnaOS cli is a bypass')
})

test('commit-msg court exercises uuidna_sign via MCP', () => {
  const sig = callTool('uuidna_sign', { message: 'theorem two_coins' }) as { signed?: boolean; reason?: string }
  assert.ok(typeof sig === 'object')
})

test('the cache is a map a human can commit — which is exactly why the release cannot lean on it', () => {
  const cache = JSON.parse(readFileSync(join(ROOT, 'lean', 'proof-cache.json'), 'utf8')) as Record<string, string>
  const entries = Object.entries(cache)
  assert.ok(entries.length > 0, 'the cache exists and is populated')
  for (const [file, address] of entries) {
    assert.match(file, /\.lean$/, `${file}: a cache key is a lean file`)
    assert.match(address, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      `${file}: an entry is a bare content-address — nothing in it distinguishes one the kernel signed from one typed by hand`)
  }
})

// THE CLAIM THAT WAS FALSE, held so it cannot come back: no source may promise that the cache cannot cause a false
// pass. It can. Only the release forcing the kernel makes the shipped ledger kernel-signed.
test('no source claims the cache is incapable of a false pass', () => {
  for (const f of ['src/scripts/lean-all.ts', 'src/scripts/lean-gen.ts', '.github/workflows/deploy.yml']) {
    const text = readFileSync(join(ROOT, f), 'utf8')
    assert.ok(!/never a false pass/.test(text),
      `${f}: claims the cache cannot cause a false pass — a forged entry does exactly that`)
  }
})
