// test-paths — where tests live: index.test.ts beside index.ts, or {module}.test.ts beside {module}.ts.
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { ROOT } from './boundary.js'

export const LEGACY_TEST_DIR = 'src/tests'

export function isTestSource(rel: string): boolean {
  if (!rel.startsWith('src/') || !rel.endsWith('.ts')) return false
  if (rel.startsWith(`${LEGACY_TEST_DIR}/`) && rel.endsWith('.test.ts')) return true
  if (rel.endsWith('.test.ts')) return true
  return rel === 'src/test-api.ts'
}

export function testDistForSource(srcPath: string): string | null {
  if (!isTestSource(srcPath)) return null
  return `dist/${srcPath.replace(/^src\//, '').replace(/\.ts$/, '')}.js`
}

function walkTestSources(dir: string, root: string = ROOT): string[] {
  const abs = join(root, dir)
  if (!existsSync(abs)) return []
  const out: string[] = []
  for (const n of readdirSync(abs)) {
    const rel = `${dir}/${n}`
    const p = join(root, rel)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (n === 'node_modules') continue
      out.push(...walkTestSources(rel, root))
    } else if (isTestSource(rel)) out.push(rel)
  }
  return out
}

export function listTestSources(root: string = ROOT): string[] {
  return walkTestSources('src', root).sort()
}

export function testDistForModule(srcPath: string): string | null {
  if (!srcPath.startsWith('src/') || isTestSource(srcPath)) return null
  if (srcPath.endsWith('/index.ts')) {
    const co = `${srcPath.slice(0, -'/index.ts'.length)}/index.test.ts`
    if (existsSync(join(ROOT, co))) return testDistForSource(co)
  }
  const sibling = srcPath.replace(/\.ts$/, '.test.ts')
  if (existsSync(join(ROOT, sibling))) return testDistForSource(sibling)
  return null
}

export function deltaTestFiles(changed: readonly string[]): string[] {
  const tests = new Set<string>()
  for (const f of changed) {
    const direct = testDistForSource(f)
    if (direct) tests.add(direct)
    const mod = testDistForModule(f)
    if (mod) tests.add(mod)
  }
  return [...tests].filter((t) => existsSync(join(ROOT, t))).sort()
}

export function testRunGlobs(): string[] {
  return ["dist/**/*.test.js"]
}

export function rewriteTestImports(content: string, fromRel: string, toRel: string): string {
  const fix = (imp: string): string => {
    const abs = join(dirname(fromRel), imp).replace(/\\/g, '/')
    let rel = relative(dirname(toRel), abs).replace(/\\/g, '/')
    if (!rel.startsWith('.')) rel = './' + rel
    return rel
  }
  return content
    .replace(/from ['"](\.[^'"]+)['"]/g, (_m, imp: string) => `from '${fix(imp)}'`)
    .replace(/import\(['"](\.[^'"]+)['"]\)/g, (_m, imp: string) => `import('${fix(imp)}')`)
}

export function allTestFiles(root: string = ROOT): string[] {
  return listTestSources(root)
}
