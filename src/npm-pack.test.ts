// npm-pack — CONTROL: dropping one workspace from the files field or the measured pack is a named hole.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { filesFieldCovers, npmPackOsGaps, npmPackWorkspaceGaps, workspacePackages, OS_SHIP_FILES } from './npm-pack.js'

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
  files: string[]
  exports: Record<string, unknown>
}

test('CONTROL — a files field that names only dist does not cover a workspace', () => {
  assert.equal(filesFieldCovers(['dist', 'README.md', 'LICENSE'], 'crypto'), false)
  const gaps = npmPackWorkspaceGaps(['dist', 'README.md', 'LICENSE'])
  assert.ok(gaps.length >= workspacePackages().length, 'every workspace is named as omitted')
  assert.ok(gaps.some((g) => g.what.includes('@uuidna/crypto')), 'crypto is named, not swallowed')
})

test('CONTROL — a pack list missing one workspace names that workspace', () => {
  const rest = workspacePackages().filter((p) => p.dir !== 'crypto').map((p) => `packages/${p.dir}/package.json`)
  const gaps = npmPackWorkspaceGaps(pkg.files, rest)
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /packages\/crypto\/package\.json/)
  assert.match(gaps[0]!.what, /@uuidna\/crypto/)
})

test('the umbrella files field covers every workspace package', () => {
  const pkgs = workspacePackages()
  assert.ok(pkgs.length >= 6, 'the six domain surfaces are present')
  assert.deepEqual(npmPackWorkspaceGaps(pkg.files), [])
  assert.deepEqual(npmPackOsGaps(pkg.files), [])
  for (const p of pkgs) assert.equal(filesFieldCovers(pkg.files, p.dir), true, p.name)
})

test('subpath exports reach every workspace except ./mcp (that path is the hosted server)', () => {
  for (const p of workspacePackages()) {
    if (p.dir === 'mcp') {
      assert.ok(pkg.exports['./mcp'], 'the hosted MCP server stays at ./mcp')
      continue
    }
    const exp = pkg.exports[`./${p.dir}`] as { import?: string; types?: string } | undefined
    assert.ok(exp, `${p.name} must be importable as @uuidna/uuidna/${p.dir}`)
    assert.equal(exp.import, `./packages/${p.dir}/dist/index.js`)
    assert.equal(exp.types, `./packages/${p.dir}/dist/index.d.ts`)
  }
})

test('CONTROL — a files field without the Alpine catalogue does not ship uuidnaOS', () => {
  const gaps = npmPackOsGaps(['dist', 'README.md', 'LICENSE', 'packages'])
  assert.equal(gaps.length, OS_SHIP_FILES.length)
  assert.ok(gaps.some((g) => g.what.includes('mirror/alpine-catalogue.tsv')))
})

test('uuidnaOS apps and drivers are import doors on the umbrella package', () => {
  for (const door of ['./os', './apps', './os/apps', './drivers', './drivers/quantum', './os/catalogue']) {
    const exp = pkg.exports[door] as { import?: string } | undefined
    assert.ok(exp?.import, `${door} must be importable from @uuidna/uuidna`)
    assert.match(exp.import, /\/dist\//, `${door} ships compiled uuidnaOS, not a second tree`)
  }
})

test('npm pack of @uuidna/uuidna contains every workspace package.json and the uuidnaOS catalogue', () => {
  const raw = execSync('npm pack --dry-run --ignore-scripts --json', { encoding: 'utf8', cwd: ROOT })
  const measured = JSON.parse(raw) as { files: { path: string }[] }[]
  const packed = measured[0]!.files.map((f) => f.path)
  assert.deepEqual(npmPackWorkspaceGaps(pkg.files, packed), [])
  assert.deepEqual(npmPackOsGaps(pkg.files, packed), [])
  for (const rel of OS_SHIP_FILES) {
    assert.ok(packed.some((p) => p.replace(/\\/g, '/').endsWith(rel) || p.replace(/\\/g, '/') === rel), rel)
  }
})
