// Quantum capacity theme — home doors to /quantum; README + /quantum keep the capacity table.
// No QuantumAdvantage card chrome; ObjectPage has no per-page QA.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import { axisForRelativePath, homeHeroOf } from '../../../axis-monograph.js'

const THEME = join(ROOT, 'docs/.vitepress/theme')

test('theme Layout is ObjectPage; no QuantumAdvantage registration', () => {
  const idx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.match(idx, /Layout:\s*ObjectPage/)
  assert.doesNotMatch(idx, /QuantumAdvantage/)
  assert.doesNotMatch(idx, /QaMetrics/)
  assert.doesNotMatch(idx, /QaCardInjector/)
  assert.doesNotMatch(idx, /loadDimensions/)
})

test('ObjectPage does not mount QuantumAdvantage, Dimensions FAB, or QaCardInjector', () => {
  const vue = readFileSync(join(THEME, 'ObjectPage.vue'), 'utf8')
  assert.doesNotMatch(vue, /QuantumAdvantage/)
  assert.doesNotMatch(vue, /QaCardInjector/)
  assert.doesNotMatch(vue, /QaMetrics/)
  assert.doesNotMatch(vue, /Dimensions/)
  assert.doesNotMatch(vue, /object-h1|object-hero/)
  assert.doesNotMatch(vue, /display:\s*none\s*!important/)
  assert.match(vue, /ObjectCrosslinks/)
  assert.match(vue, /ObjectBreadcrumbs/)
  assert.ok(!existsSync(join(THEME, 'QaCardInjector.vue')))
  assert.ok(!existsSync(join(THEME, 'QaMetrics.vue')))
  assert.ok(!existsSync(join(THEME, 'QuantumAdvantage.vue')))
})

test('home doors to /quantum; capacity table on /quantum and README only', () => {
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.doesNotMatch(home, /<QuantumAdvantage\s*\/>/)
  assert.doesNotMatch(home, /<CostMeter\s*\/>/)
  assert.doesNotMatch(home, /quantum-capacity:begin/)
  const hero = homeHeroOf(axisForRelativePath('index.md').census!)
  assert.ok(hero.features.some((f) => f.link === '/quantum'))
  assert.match(home, /\/guides/)
  assert.match(home, /\/mcp/)
  assert.match(home, /^## Use$/m)
  const footer = readFileSync(join(THEME, 'SiteFooter.vue'), 'utf8')
  assert.match(footer, /#use/, 'README use door — the old #verify heading is gone')
  assert.doesNotMatch(footer, /#verify/)
  const fmEnd = home.indexOf('\n---\n', 4)
  assert.ok(fmEnd > 0, 'homepage opens with YAML frontmatter')
  const fm = home.slice(0, fmEnd)
  assert.match(fm, /layout:\s*home/)
  assert.doesNotMatch(fm, /^hero:/m)
  assert.doesNotMatch(fm, /^features:/m)
  assert.doesNotMatch(fm, /^description:/m)
  assert.ok(!existsSync(join(ROOT, 'docs/.vitepress/advantage.data.ts')))
  const quantum = readFileSync(join(ROOT, 'docs/quantum.md'), 'utf8')
  assert.match(quantum, /quantum-capacity:begin/)
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  assert.match(readme, /quantum-capacity:begin/)
})

test('Clay is the visible test POC on home and README — computationally claimed', () => {
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.match(home, /clay_gravity_equals_rosette/)
  assert.doesNotMatch(home, /seal\s*≠\s*solution|not a solution claim/i)
  const census = axisForRelativePath('index.md').census
  assert.ok(census)
  const hero = homeHeroOf(census)
  assert.ok(hero.features.some((f) =>
    f.title.startsWith('clay_') && f.link.startsWith('/theorem/clay_')))
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  assert.match(readme, /### Proof of concept/)
  assert.match(readme, /#### Clay/)
  assert.match(readme, /computational claim/)
  assert.match(readme, /clay_gravity_equals_rosette/)
  assert.match(readme, /zenodo\.org\/records\/21781603|10\.5281\/zenodo\.21781603/)
  assert.doesNotMatch(readme, /solves none of the seven|seal\s*≠\s*solution/i)
})

test('compose-object emits stock markdown H1 + lead under it', async () => {
  const { composeTheorem, composePublication } = await import(join(ROOT, 'dist/compose-object.js'))
  const { theorems, publications } = await import(join(ROOT, 'dist/index.js'))
  const t = theorems()[0]
  const page = composeTheorem(t)
  assert.match(page.content, /^# /m)
  assert.doesNotMatch(page.content, /^heroTitle:\s/m)
  const pubs = publications().filter((p: { publishable?: boolean }) => p.publishable)
  assert.ok(pubs.length > 0)
  const pub = composePublication(pubs[0])
  assert.match(pub.content, /^# /m)
})

test('the monitor does not import the package barrel; VitePress reads constructors', () => {
  for (const f of readdirSync(THEME)) {
    if (!/\.(vue|ts)$/.test(f) || f.endsWith('.test.ts')) continue
    const src = readFileSync(join(THEME, f), 'utf8')
    assert.doesNotMatch(src, /from ['"][^'"]*dist\/index\.js['"]/, `${f} must not import the package barrel`)
    assert.doesNotMatch(src, /from ['"][^'"]*src\/index\.js['"]/, `${f} must not import the package barrel`)
    assert.doesNotMatch(src, /theorems\/(index|generated)\.js/, `${f} must not recompute the ledger — quantum advantage verifies the wire (n_qubit_dimension)`)
    assert.doesNotMatch(src, /ledger-search/, `${f} must not bundle searchLedger`)
    assert.doesNotMatch(src, /from ['"][^'"]*\/cost\.js['"]/, `${f} must not recompute cost`)
    assert.doesNotMatch(src, /from ['"][^'"]*\/grid\.js['"]/, `${f} must not recompute the wing grid`)
    assert.doesNotMatch(src, /school\/advantage/, `${f} must not load theoremByKey via school advantage`)
    // THE EXEMPTION IS A LIST OF PURPOSES, NOT A LOOPHOLE. Most components are MONITORS: they display what the
    // edge already computed, and pulling 7.3 MB of catalogue into a visitor's tab to redisplay it would be a cost
    // imposed for nothing. A few components are the OS ITSELF running client-side, and for those the census is
    // not overhead — it is the subject. CatalogueBrowser and ExecShell were already named; PortsConsole joins them
    // because it exists to run the ported APIs on the reader's own device (the captain's order, 2026-09-01).
    //
    // What the law protects is preserved rather than traded away: PortsConsole never parses on mount. The prime is
    // a button carrying its own size, so the reader spends the 7.3 MB deliberately or not at all. An exemption
    // that let a component parse the census at page load would be the loophole this comment exists to refuse.
    if (f !== 'CatalogueBrowser.vue' && f !== 'ExecShell.vue' && f !== 'PortsConsole.vue') {
      assert.doesNotMatch(src, /from ['"][^'"]*browser-boot/, `${f} must not boot uuidnaOS into the client bundle`)
      assert.doesNotMatch(src, /from ['"][^'"]*os\/catalogue/, `${f} must not parse the Alpine census in the monitor`)
      assert.doesNotMatch(src, /from ['"][^'"]*os\/exec/, `${f} must not run Layer 1 locally`)
      assert.doesNotMatch(src, /from ['"][^'"]*os\/index/, `${f} must not load the install mill`)
      assert.doesNotMatch(src, /from ['"][^'"]*agent-coverage/, `${f} must not load catalogue via agent-coverage`)
      assert.doesNotMatch(src, /from ['"][^'"]*url-audit/, `${f} must not recompute 404 matches from the census`)
      assert.doesNotMatch(src, /from ['"][^'"]*exec-shell/, `${f} must not import the local exec mill`)
      assert.doesNotMatch(src, /from ['"][^'"]*port-panel/, `${f} must not import the local port mill`)
      assert.doesNotMatch(src, /from ['"][^'"]*catalogue-browser/, `${f} must not import the local catalogue mill`)
    }
    assert.doesNotMatch(src, /from ['"][^'"]*terminal-meaning/, `${f} must not load the install port for /terminal`)
    assert.doesNotMatch(src, /from ['"][^'"]*adjudicate/, `${f} must not pull the theorem ledger via adjudicate`)
    if (f !== 'Terminal.vue') {
      assert.doesNotMatch(src, /apps\/terminal/, `${f} must not load the terminal parser`)
    }
    assert.doesNotMatch(src, /from ['"][^'"]*\/harness\.js['"]/, `${f} must not load the gate via harness`)
  }
  const idx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.match(idx, /defineAsyncComponent/)
  const hex = readFileSync(join(THEME, 'HexFace.vue'), 'utf8')
  assert.doesNotMatch(hex, /import HexbitPlayer from/)
  const i18n = readFileSync(join(ROOT, 'src/object-i18n.ts'), 'utf8')
  assert.match(i18n, /tts\/readings\.js/)
  assert.doesNotMatch(i18n, /tts\/index\.js/)
  assert.match(i18n, /from ['"]\.\/dimensions\.js['"]/)
  const cur = readFileSync(join(ROOT, 'src/quantum/advantage/mcp/curriculum/index.ts'), 'utf8')
  assert.doesNotMatch(cur, /theorems\/index/)
  assert.doesNotMatch(cur, /os\/index/)
  assert.doesNotMatch(cur, /crypto-apps/)
  assert.doesNotMatch(cur, /agent-coverage/)
  const wire = readFileSync(join(ROOT, 'src/quantum/advantage/mcp/wire/index.ts'), 'utf8')
  assert.match(wire, /hostedMcpUrl/)
  assert.match(wire, /advantageCall/)
  for (const rel of ['src/quantum/message/index.ts', 'src/quantum/voting/index.ts', 'src/anti-fraud.ts']) {
    const src = readFileSync(join(ROOT, rel), 'utf8')
    assert.doesNotMatch(src, /from ['"]\.\.\/\.\.\/index\.js['"]/, `${rel} must not import the package barrel`)
    assert.doesNotMatch(src, /from ['"]\.\/index\.js['"]/, `${rel} must not import the package barrel`)
  }
  const vp = join(ROOT, 'docs/.vitepress')
  for (const f of readdirSync(vp)) {
    if (!/\.(ts|js)$/.test(f)) continue
    const src = readFileSync(join(vp, f), 'utf8')
    assert.doesNotMatch(src, /from ['"][^'"]*dist\/index\.js['"]/, `${f} must import constructors, not the package barrel`)
  }
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  // THE SSG HEAP IS A BOUNDED WINDOW, and BOTH bounds are measured — this assertion used to pin 4096 exactly,
  // which was right when it was written and became wrong when the dynamic route grew.
  //   UPPER: 8192 OOMs the 8 GiB Cloudflare VM (measured earlier; Cloudflare strips NODE_OPTIONS, so the budget
  //          rides Node's argv by construction, because Cloudflare strips NODE_OPTIONS from the build).
  //   LOWER: 4096 ABORTS at 5246 dynamic pages — `FATAL ERROR: Ineffective mark-compacts near heap limit` in a
  //          Workers Build on 2026-09-02, reproduced locally (exit 134) and cleared at 6144 (exit 0, 108s).
  // So the value lives strictly between them, and this is the ONE place that holds it — worker.test.ts holds the
  // CI-only branch that pays it, and deliberately asserts no number of its own.
  const heap = /--max-old-space-size=(\d+)/.exec(pkg.scripts['docs:build'] ?? '')
  assert.ok(heap, 'the SSG budget must ride Node argv — Cloudflare strips NODE_OPTIONS')
  const mib = Number(heap[1])
  assert.ok(mib > 4096, `${mib} MiB: 4096 was measured to abort at 5246 pages`)
  assert.ok(mib < 8192, `${mib} MiB: 8192 was measured to OOM the 8 GiB Cloudflare VM`)
  const wrangler = readFileSync(join(ROOT, 'wrangler.toml'), 'utf8')
  assert.doesNotMatch(wrangler, /max-old-space-size/)
  assert.doesNotMatch(wrangler, /command = .*seo-freeze-audit/)
  assert.doesNotMatch(idx, /defineAsyncComponent\(\(\) => import\('\.\/HexFace\.vue/)
  assert.doesNotMatch(idx, /defineAsyncComponent\(\(\) => import\('\.\/RefererCompass\.vue/)
  assert.doesNotMatch(idx, /defineAsyncComponent\(\(\) => import\('\.\/Handle\.vue/)
  assert.match(idx, /import Handle from '\.\/Handle\.vue'/)
  const cfg = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
  assert.match(cfg, /fm\.search = false/)
  assert.match(cfg, /\[slug\]/)
  assert.match(cfg, /theoremCount/)
})
