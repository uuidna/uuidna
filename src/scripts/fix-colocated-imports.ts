#!/usr/bin/env node
// fix-colocated-imports — every test imports through the path law: ./index.js beside index.ts, ./module.js beside module.ts.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, relative, resolve } from 'node:path'
import { ROOT } from './api.js'

const SRC = join(ROOT, 'src')

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.test.ts') || e.name === 'test-api.ts') out.push(relative(ROOT, p).replace(/\\/g, '/'))
  }
  return out
}

const exportNames = (src: string): Set<string> => {
  const names = new Set<string>()
  for (const m of src.matchAll(/export (?:async )?(?:function|const|class|type|interface|enum) (\w+)/g)) names.add(m[1]!)
  for (const m of src.matchAll(/export \{([^}]+)\}/g)) {
    for (const part of m[1]!.split(',')) {
      const bit = part.trim().split(/\s+as\s+/)
      names.add((bit[1] ?? bit[0]).trim())
    }
  }
  return names
}

const moduleExports = new Map<string, Set<string>>()
for (const rel of walk(SRC)) {
  const ts = rel.replace(/\.test\.ts$/, '.ts').replace(/test-api\.ts$/, 'test-api.ts')
  if (ts.endsWith('.ts') && existsSync(join(ROOT, ts))) {
    moduleExports.set(ts, exportNames(readFileSync(join(ROOT, ts), 'utf8')))
  }
}
for (const rel of walk(SRC).map((f) => f.replace(/\.test\.ts$/, '.ts')).filter((f) => f.endsWith('.ts') && existsSync(join(ROOT, f)))) {
  if (!moduleExports.has(rel)) moduleExports.set(rel, exportNames(readFileSync(join(ROOT, rel), 'utf8')))
}

// all .ts under src (not only tests)
function allTs(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory() && e.name !== 'handles' && e.name !== 'chunks' && e.name !== 'seeds') allTs(p, out)
    else if (e.name.endsWith('.ts') && !e.name.endsWith('.test.ts')) out.push(relative(ROOT, p).replace(/\\/g, '/'))
  }
  return out
}
for (const rel of allTs(SRC)) {
  if (!moduleExports.has(rel)) moduleExports.set(rel, exportNames(readFileSync(join(ROOT, rel), 'utf8')))
}

const symbolHome = new Map<string, string>()
for (const [mod, names] of moduleExports) {
  for (const n of names) {
    if (!symbolHome.has(n)) symbolHome.set(n, mod)
  }
}

const relImport = (fromRel: string, toRel: string): string => {
  let rel = relative(dirname(join(ROOT, fromRel)), join(ROOT, toRel.replace(/\.ts$/, '.js'))).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = './' + rel
  return rel
}

const resolveSymbols = (fromRel: string, names: string[]): string | null => {
  const testDir = dirname(fromRel)
  const localIndex = `${testDir}/index.ts`
  const localMod = fromRel.replace(/\.test\.ts$/, '.ts')

  const local = moduleExports.get(localIndex) ?? new Set()
  const localSibling = moduleExports.get(localMod) ?? new Set()

  if (names.every((n) => local.has(n)) && existsSync(join(ROOT, localIndex))) return './index.js'
  if (names.length === 1 && localSibling.has(names[0]!) && localMod !== localIndex) {
    return './' + fromRel.split('/').pop()!.replace(/\.test\.ts$/, '.js')
  }

  // walk up for index.ts
  let dir = testDir
  while (dir.startsWith('src/')) {
    const idx = `${dir}/index.ts`
    const ex = moduleExports.get(idx)
    if (ex && names.every((n) => ex.has(n))) {
      return relImport(fromRel, idx)
    }
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }

  // same symbol home for all names
  const homes = [...new Set(names.map((n) => symbolHome.get(n)).filter(Boolean) as string[])]
  if (homes.length === 1) return relImport(fromRel, homes[0]!)
  return null
}

const parseNames = (spec: string): string[] =>
  spec.startsWith('{')
    ? spec.slice(1, -1).split(',').map((s) => s.trim().split(/\s+as\s+/)[0]!.trim()).filter(Boolean)
    : [spec.trim()]

const fixFile = (rel: string, raw: string): string =>
  raw.replace(
    /import\s+(type\s+)?(\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+)['"]/g,
    (full, typeKw: string | undefined, spec: string, imp: string) => {
      const names = parseNames(spec)
      if (!names.length) return full
      const resolved = resolveSymbols(rel, names)
      if (!resolved || resolved === imp) {
        // strip legacy tests/ segment and fix over-deep paths
        if (!imp.includes('tests/') && !/(?:\.\.\/){4,}/.test(imp)) return full
        let fixed = imp.replace(/\/tests\//g, '/')
        const fromDir = dirname(join(ROOT, rel))
        const tryAbs = resolve(fromDir, fixed.replace(/\.js$/, '.ts'))
        const tryIndex = join(tryAbs, 'index.ts')
        if (existsSync(tryAbs)) fixed = relImport(rel, relative(ROOT, tryAbs).replace(/\\/g, '/'))
        else if (existsSync(tryIndex)) fixed = relImport(rel, relative(ROOT, tryIndex).replace(/\\/g, '/'))
        else {
          const base = fixed.replace(/^\.\.\/+/, '').replace(/^\.\//, '')
          const srcPath = join(SRC, base.replace(/\.js$/, '.ts'))
          if (existsSync(srcPath)) fixed = relImport(rel, `src/${base.replace(/\.js$/, '.ts')}`)
        }
        if (fixed === imp) return full
        return `import ${typeKw ?? ''}${spec} from '${fixed}'`.replace(/import\s+from/, 'import ')
      }
      return `import ${typeKw ?? ''}${spec} from '${resolved}'`.replace(/import\s+from/, 'import ')
    },
  )

let touched = 0
for (const rel of walk(SRC)) {
  const raw = readFileSync(join(ROOT, rel), 'utf8')
  const out = fixFile(rel, raw)
  if (out !== raw) { writeFileSync(join(ROOT, rel), out); touched++ }
}
console.log(`fix-colocated-imports — touched ${touched} files`)
