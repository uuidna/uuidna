#!/usr/bin/env node
// repair-test-imports — strip legacy src/tests/ from import paths after colocation (fix-test-imports regression).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT } from './api.js'
import { listTestSources } from '../test-paths.js'

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, out)
    else if (e.name.endsWith('.test.ts') || e.name === 'test-api.ts') out.push(rel)
  }
  return out
}

const fixImp = (imp: string, testRel: string): string => {
  if (!imp.includes('tests/')) return imp
  let stripped = imp.replace(/\/tests\//g, '/')
  if (testRel.startsWith('src/scripts/') && stripped.startsWith('../') && stripped.indexOf('/', 3) === -1) {
    const base = stripped.slice(3)
    if (existsSync(join(ROOT, dirname(testRel), base.replace(/\.js$/, '.ts')))) stripped = './' + base
  }
  // quantum/os/*/*.test.ts: ../../../index.js often means the local index, not src/index
  if (testRel.includes('/index.test.ts') && stripped.endsWith('/index.js')) {
    const local = './index.js'
    if (existsSync(join(ROOT, dirname(testRel), 'index.ts'))) stripped = local
  }
  return stripped
}

const patch = (raw: string, testRel: string): string =>
  raw
    .replace(/from ['"](\.[^'"]+)['"]/g, (_m, imp: string) => `from '${fixImp(imp, testRel)}'`)
    .replace(/import\(['"](\.[^'"]+)['"]\)/g, (_m, imp: string) => `import('${fixImp(imp, testRel)}')`)

let touched = 0
for (const to of [...new Set([...listTestSources(), ...walk('src')])]) {
  const raw = readFileSync(join(ROOT, to), 'utf8')
  if (!raw.includes('tests/')) continue
  const out = patch(raw, to)
  if (out !== raw) { writeFileSync(join(ROOT, to), out); touched++ }
}
console.log(`repair-test-imports — touched ${touched} files`)
