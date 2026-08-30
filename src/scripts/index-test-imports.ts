#!/usr/bin/env node
// index-test-imports — beside-module tests import through index.ts; paths mirror the sibling index surface.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { ROOT } from './api.js'

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, out)
    else if (e.name.endsWith('.test.ts')) out.push(rel)
  }
  return out
}

const exportNames = (src: string): Set<string> => {
  const names = new Set<string>()
  for (const m of src.matchAll(/export (?:async )?(?:function|const|class|type|interface|enum) (\w+)/g)) names.add(m[1]!)
  for (const m of src.matchAll(/export \{([^}]+)\}/g)) {
    for (const part of m[1]!.split(',')) {
      const n = part.trim().split(/\s+as\s+/)[0]!.trim()
      if (n) names.add(n)
    }
  }
  return names
}

const importPaths = (src: string): Map<string, string> => {
  const out = new Map<string, string>()
  for (const m of src.matchAll(/import\s+(?:type\s+)?(?:\{([^}]+)\}|(\w+))\s+from\s+['"]([^'"]+)['"]/g)) {
    const path = m[3]!
    const names = m[1]
      ? m[1].split(',').map((s) => s.trim().split(/\s+as\s+/).pop()!.trim())
      : [m[2]!]
    for (const n of names) if (n) out.set(n, path)
  }
  return out
}

const depthToSrc = (testRel: string): string => {
  const d = testRel.split('/').length - 2 // src/.../file.test.ts → levels under src
  return '../'.repeat(d)
}

const fixIndexTest = (testRel: string, raw: string): string | null => {
  if (!testRel.endsWith('/index.test.ts')) return null
  const indexRel = testRel.replace(/\.test\.ts$/, '.ts')
  if (!existsSync(join(ROOT, indexRel))) return null
  const indexSrc = readFileSync(join(ROOT, indexRel), 'utf8')
  const local = exportNames(indexSrc)
  const indexImports = importPaths(indexSrc)
  const parentIndex = join(dirname(indexRel), '../index.ts')
  const parentRel = relative(ROOT, parentIndex).replace(/\\/g, '/')
  const parentExports = existsSync(join(ROOT, parentRel))
    ? exportNames(readFileSync(join(ROOT, parentRel), 'utf8'))
    : new Set<string>()

  return raw.replace(
    /import\s+(type\s+)?(\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+)['"]/g,
    (full, typeKw: string | undefined, spec: string, imp: string) => {
      if (!imp.includes('index.js') && !imp.includes('/tests/')) return full
      const names = spec.startsWith('{')
        ? spec.slice(1, -1).split(',').map((s) => s.trim().split(/\s+as\s+/)[0]!.trim())
        : [spec.trim()]
      let target = imp
      const allLocal = names.every((n) => local.has(n))
      const allParent = names.every((n) => parentExports.has(n))
      if (allLocal) target = './index.js'
      else if (allParent) target = '../index.js'
      else if (names.length === 1 && indexImports.has(names[0]!)) target = indexImports.get(names[0]!)!
      else if (imp.includes('/tests/') || imp.match(/(?:\.\.\/){2,}index\.js$/)) {
        // fall through: strip erroneous tests segment, fix depth to src root modules
        target = imp.replace(/\/tests\//g, '/').replace(/^(?:\.\.\/)+index\.js$/, '../index.js')
      }
      if (target === imp) return full
      return `import ${typeKw ?? ''}${spec} from '${target}'`.replace(/import\s+from/, 'import ')
    },
  )
}

const fixHarness = (testRel: string, raw: string): string | null => {
  if (!testRel.startsWith('src/quantum/os/harness/')) return null
  const prefix = depthToSrc(testRel)
  let out = raw.replace(new RegExp(`(?:\\.\\./){5,}`, 'g'), prefix)
  out = out.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\//g, `from '${prefix}`)
  out = out.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/\.\.\//g, `from '${prefix}`)
  out = out.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\//g, `from '${prefix}`)
  out = out.replace(/from '\.\.\/\.\.\/\.\.\/index\.js'/g, "from '../index.js'")
  out = out.replace(/from '\.\.\/\.\.\/index\.js'/g, "from '../index.js'")
  if (/\b(boot|fresh|exec|reset|shell|ls|APPLETS)\b/.test(out) && out.includes("from '../index.js'")) {
    out = out.replace(
      /import \{([^}]*(?:boot|fresh|exec|reset|shell|ls|APPLETS)[^}]*)\} from '\.\.\/index\.js'/g,
      "import {$1} from './index.js'",
    )
  }
  return out === raw ? null : out
}

let touched = 0
for (const rel of walk('src')) {
  let raw = readFileSync(join(ROOT, rel), 'utf8')
  const a = fixIndexTest(rel, raw)
  if (a) raw = a
  const b = fixHarness(rel, raw)
  if (b) raw = b
  const orig = readFileSync(join(ROOT, rel), 'utf8')
  if (raw !== orig) { writeFileSync(join(ROOT, rel), raw); touched++ }
}
console.log(`index-test-imports — touched ${touched} files`)
