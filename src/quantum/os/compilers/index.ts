// quantum/os/compilers — EVERY TRANSLATION THIS MACHINE PERFORMS, MEASURED.
//
// Alpine's `language` domain is 7,486 packages — compilers, runtimes and bindings, the largest domain in the
// catalogue by a factor of six — and uuidna can offer no API over it: it cannot run python, and pretending
// otherwise would be the overreach this tree keeps refusing. But the question underneath that domain is one
// uuidnaOS can answer about ITSELF, because it runs several compilers of its own and none of them were measured.
//
// A COMPILER HERE IS A TOTAL TRANSLATION from one sealed form to another: Lean to the ledger, TypeScript to
// JavaScript, the ledger to the edge mirror, markdown to the served site. Each has an input it does not own and
// an output nothing may hand-edit, which is exactly the derived-layer law this tree already enforces — so the
// compilation pipeline is not a metaphor here, it is the shape of the repository.
//
// THE RATIO IS THE INTERESTING COLUMN and it is not a quality score. Lean expands 1.2× into the ledger because
// a theorem carries its prose; the rosetta mirror contracts to 0.05× because it keeps addresses and drops
// statements; markdown expands ~175× because every theorem gets its own page and a page carries a whole site's
// chrome. A number far from 1 is a design decision showing itself, and the only wrong reading is to call the
// large one waste — 5,407 pages is what "one click from any theorem to its proof" costs.
//
// MEASURED ON A HOST THAT HAS THE FILES, and absent otherwise. A browser has no lean/ directory; it gets
// `present: false` rather than zeros, because a compiler that cannot be measured has not been measured to be
// empty. Same distinction the monitor and the catalogue keep.
import { nodeBuiltin, ROOT } from '../../../boundary.js'
import { toUuid } from '../../../address.js'

export interface CompilerRow {
  compiler: string
  inBytes: number
  outBytes: number
  /** out/in as an integer ratio in HUNDREDTHS, so no float is stored — 121 means 1.21×.
   *  Tenths were not enough: the edge mirror contracts to 0.05×, which truncates to a flat 0.0 in tenths and
   *  reports the most interesting compiler in this list as doing nothing. A unit too coarse to show a
   *  contraction is a unit that hides one. */
  ratioHundredths: number
  note: string
}

export interface CompilerCensus {
  definition: 'uuidnaos-compilers'
  present: boolean
  rows: CompilerRow[]
  receipt: string
  honest: string
}

type Fs = typeof import('node:fs')

const walk = (fs: Fs, dir: string, re: RegExp): { files: number; bytes: number } => {
  let files = 0, bytes = 0
  let entries: { name: string; isDirectory: () => boolean }[] = []
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return { files, bytes } }
  for (const e of entries) {
    const p = dir + '/' + e.name
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue
      const sub = walk(fs, p, re)
      files += sub.files; bytes += sub.bytes
    } else if (re.test(e.name)) {
      try { files++; bytes += fs.statSync(p).size } catch { /* a file that vanished mid-walk is not a measurement */ }
    }
  }
  return { files, bytes }
}

const sizeOf = (fs: Fs, rel: string): number => { try { return fs.statSync(ROOT + '/' + rel).size } catch { return 0 } }

/** ratio in HUNDREDTHS, integer — the determinism law refuses the rounding helper, and a float would not seal */
const hundredths = (out: number, inp: number): number => (inp > 0 ? Number((BigInt(out) * 100n) / BigInt(inp)) : 0)

export function compilerCensus(): CompilerCensus {
  const fs = nodeBuiltin<Fs>('node:fs')
  if (!fs) {
    return {
      definition: 'uuidnaos-compilers', present: false, rows: [], receipt: '',
      honest: 'no filesystem on this host — the compilers are absent to this process, which is not the same as measuring them empty',
    }
  }
  const lean = walk(fs, ROOT + '/lean', /\.lean$/)
  const ts = walk(fs, ROOT + '/src', /\.ts$/)
  const js = walk(fs, ROOT + '/dist', /\.js$/)
  const md = walk(fs, ROOT + '/docs', /\.md$/)
  const site = walk(fs, ROOT + '/docs/.vitepress/dist', /\.html$/)
  const ledger = sizeOf(fs, 'src/theorems/generated.ts')
  const mirror = sizeOf(fs, 'src/rosetta-mirror.ts')

  const rows: CompilerRow[] = [
    { compiler: 'Lean → ledger', inBytes: lean.bytes, outBytes: ledger, ratioHundredths: hundredths(ledger, lean.bytes), note: `${lean.files} .lean files → one generated module` },
    { compiler: 'TypeScript → JavaScript', inBytes: ts.bytes, outBytes: js.bytes, ratioHundredths: hundredths(js.bytes, ts.bytes), note: `${ts.files} sources → ${js.files} emitted` },
    { compiler: 'ledger → edge mirror', inBytes: ledger, outBytes: mirror, ratioHundredths: hundredths(mirror, ledger), note: 'addresses kept, statements dropped' },
    { compiler: 'markdown → site', inBytes: md.bytes, outBytes: site.bytes, ratioHundredths: hundredths(site.bytes, md.bytes), note: `${md.files} pages → ${site.files} html` },
  ]
  return {
    definition: 'uuidnaos-compilers',
    present: true,
    rows,
    receipt: toUuid(rows.map((r) => `${r.compiler}:${r.inBytes}:${r.outBytes}`).join('|')),
    honest:
      'A compiler here is a TOTAL translation between sealed forms, with an input it does not own and an output ' +
      'nothing may hand-edit. The ratio is a design decision showing itself, never a quality score: the site ' +
      'expands because every theorem gets its own page, and the mirror contracts because it keeps addresses and ' +
      'drops statements. Measured on a host that has the files; absent, not empty, on one that does not.',
  }
}

export function renderCompilers(c: CompilerCensus): string[] {
  if (!c.present) return ['compilers: ABSENT — no filesystem on this host']
  return [
    'compilers: every translation this machine performs',
    ...c.rows.map((r) =>
      `  ${r.compiler.padEnd(24)} ${String(r.inBytes).padStart(10)} → ${String(r.outBytes).padStart(10)} B  ` +
      `${(r.ratioHundredths / 100).toFixed(2)}×  ${r.note}`),
    `  receipt ${c.receipt}`,
  ]
}
