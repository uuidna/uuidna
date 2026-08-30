#!/usr/bin/env node
// repair-fs-imports — hostnode exports a subset; tests use node:fs/path/os/child_process directly on the host.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT } from './api.js'

const FS = new Set(['readFileSync', 'writeFileSync', 'readdirSync', 'existsSync', 'mkdirSync', 'mkdtempSync', 'rmSync', 'unlinkSync', 'statSync', 'realpathSync'])
const PATH = new Set(['join', 'dirname', 'sep'])
const OS = new Set(['tmpdir'])
const CP = new Set(['spawnSync', 'execFileSync', 'spawn'])

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith('.test.ts')) out.push(p)
  }
  return out
}

const hostRe = /import\s+\{([^}]+)\}\s+from\s+['"][^'"]*hostnode\/index\.js['"]/g

const fix = (raw: string): string => {
  const blocks: { spec: string; from: string }[] = []
  let m: RegExpExecArray | null
  const re = /import\s+\{([^}]+)\}\s+from\s+['"][^'"]*hostnode\/index\.js['"]/g
  while ((m = re.exec(raw))) {
    blocks.push({ spec: m[1]!, from: m[0] })
  }
  if (!blocks.length) return raw
  let out = raw
  for (const { spec, from } of blocks) {
    const names = spec.split(',').map((s) => {
      const p = s.trim().split(/\s+as\s+/)
      return { local: (p[1] ?? p[0]).trim(), orig: p[0]!.trim() }
    })
    const fs: string[] = []
    const path: string[] = []
    const os: string[] = []
    const cp: string[] = []
    for (const { local, orig } of names) {
      const n = orig
      const bit = local === n ? n : `${n} as ${local}`
      if (FS.has(n)) fs.push(bit)
      else if (PATH.has(n)) path.push(bit)
      else if (OS.has(n)) os.push(bit)
      else if (CP.has(n)) cp.push(bit)
    }
    const lines: string[] = []
    if (fs.length) lines.push(`import { ${fs.join(', ')} } from 'node:fs'`)
    if (path.length) lines.push(`import { ${path.join(', ')} } from 'node:path'`)
    if (os.length) lines.push(`import { ${os.join(', ')} } from 'node:os'`)
    if (cp.length) lines.push(`import { ${cp.join(', ')} } from 'node:child_process'`)
    out = out.replace(from, lines.join('\n'))
  }
  return out
}

let touched = 0
for (const abs of walk(join(ROOT, 'src'))) {
  const raw = readFileSync(abs, 'utf8')
  const next = fix(raw)
  if (next !== raw) { writeFileSync(abs, next); touched++ }
}
console.log(`repair-fs-imports — touched ${touched} files`)
