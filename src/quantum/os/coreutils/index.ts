// coreutils — THE BUSYBOX TEXT AND ARITHMETIC APPLETS, PORTED AS PURE LOGIC.
//
// WHAT PORTING MEANS HERE, and the distinction was drawn earlier today rather than assumed. uuidnaOS ATTESTS the
// Alpine catalogue — it can say what a package IS, by content-address, without running it — and it EXECUTES a
// small set of ported applets. Those are different verbs and the surface now says which it is doing. So "port
// as many Alpine executables as possible" means moving applets across that line: from attested to genuinely
// executing, as pure logic over the virtual filesystem, never as a host binary.
//
// WHICH APPLETS CAN CROSS, AND WHICH ARE REFUSED WITH THEIR REASON NAMED. An applet is portable here exactly
// when it is a total function of its input — everything else is refused for a stated cause, either a law of
// this tree or the absence of the thing the applet acts on:
//   · text and arithmetic transforms — wc, head, tail, sort, uniq, cut, tr, rev, tac, nl, fold, seq, factor,
//     expr, basename, dirname, printf, base64, sha256sum, cksum, test, true, false, yes. All ported below.
//   · `date` and `uptime` are refused BY LAW: they read a wall clock, and this tree hard-rejects the clock
//     everywhere, so time enters as data or not at all. Not a limitation of effort.
//   · `ps`, `kill`, `mount`, `dd` are refused for lack of a subject — there are no host processes or devices
//     here to act on, and faking them would be the attested/executed confusion in a worse form.
//   · `awk` and full `sed` are refused as SCOPE: each is an interpreter for its own language, so porting one
//     means porting a language. `grep` and `sed s///` are transforms and are portable; the rest is not.
//
// EVERY FUNCTION HERE IS PURE: same input, same output, no clock, no randomness, no filesystem. The caller
// supplies the text — from a session file or from the operands — so these can be tested without an OS at all.
import { sha256 } from '../../../sha256.js'

/** the lines an applet returns, plus the structured data the receipt folds */
export interface AppletOut { lines: string[]; data: unknown }

// CLAMPS WRITTEN AS COMPARISONS, because the determinism scan hard-rejects the whole standard maths namespace
// everywhere in this tree, and the first version of this file reached for its max and min helpers out of habit.
// The scan cannot tell a mention from a use, so this note names the family without spelling it — and that is
// the correct outcome: a scanner taught to allow mentions is a scanner with a carve-out. A comparison is all a
// clamp ever needed anyway.
const atLeast = (n: number, low: number): number => (n < low ? low : n)
const atMost = (n: number, high: number): number => (n > high ? high : n)

const ok = (lines: string[], data: unknown = null): AppletOut => ({ lines, data })

/** THE PORTED APPLET NAMES, in one list so the dispatcher and the census cannot disagree. */
export const CORE_APPLETS = [
  'wc', 'head', 'tail', 'sort', 'uniq', 'cut', 'tr', 'rev', 'tac', 'nl', 'fold',
  'seq', 'factor', 'expr', 'basename', 'dirname', 'printf', 'base64', 'sha256sum', 'cksum',
  'test', 'true', 'false', 'yes', 'grep',
  // second wave — two-input, column and encoding applets
  'comm', 'join', 'paste', 'expand', 'unexpand', 'fmt', 'base32', 'od', 'sum', 'tsort', 'numfmt', 'pathchk',
] as const
export type CoreApplet = (typeof CORE_APPLETS)[number]

/** APPLETS THAT CANNOT BE PORTED, with the reason each is refused. Named so the refusal is a declared boundary
 *  rather than an omission — and so nobody adds a faked one later. */
export const UNPORTABLE: readonly { name: string; why: string }[] = [
  { name: 'date', why: 'reads a wall clock; this tree hard-rejects the clock everywhere, so time enters as data or not at all' },
  { name: 'uptime', why: 'reports elapsed time since a boot that never happened here, and reading a wall clock to compute it is refused tree-wide' },
  { name: 'ps', why: 'there are no host processes here; a faked table would be attestation wearing execution\'s clothes' },
  { name: 'kill', why: 'nothing to signal, and pretending otherwise would report success for an action never taken' },
  { name: 'mount', why: 'no block devices; the filesystem is a provenance model, not storage' },
  { name: 'dd', why: 'copies bytes between devices that do not exist here' },
  { name: 'awk', why: 'an interpreter for its own language, not a transform — porting it means porting a language' },
  { name: 'sed', why: 'the same, beyond `s///`; a partial sed that silently ignores a script is worse than none' },
  { name: 'shuf', why: 'shuffles by randomness, and this tree admits no random source anywhere — a shuf with a fixed order would be a lie in its own name' },
  { name: 'md5sum', why: 'this tree implements sha256 and nothing else; a hash written to fill a row of a table is a liability, not a port' },
  { name: 'sha1sum', why: 'the same — and both md5 and sha1 are broken for the purpose people reach for them, so importing them to look complete would be the worse trade' },
  { name: 'sha512sum', why: 'legitimate, but unwritten here: sha256 is the one hash this tree implements and audits, and a second implementation earns its place by being needed, not by being listed' },
  { name: 'split', why: 'writes its pieces as files; the session filesystem is read-only to applets, so a split that reported success would have produced nothing' },
  { name: 'tee', why: 'the same — its whole purpose is the side effect of writing, and an applet that cannot write cannot tee' },
  { name: 'env', why: 'reads the host process environment, which is exactly the boundary uuidnaOS does not cross' },
  { name: 'sleep', why: 'measures a duration against a clock, refused tree-wide; and a sleep that returns at once is not a sleep' },
  { name: 'xargs', why: 'builds and runs command lines; the dispatcher runs one applet per call by design, and a nested runner is a shell, not an applet' },
]

const digits = (s: string): boolean => /^-?\d+$/.test(s)
const num = (s: string): number => Number.parseInt(s, 10)

/** wc(text) → lines, words, bytes. Newline-terminated or not, counted as the text stands. */
export function wc(text: string): AppletOut {
  const lines = text.length === 0 ? 0 : text.split('\n').length
  const words = text.split(/\s+/).filter(Boolean).length
  const bytes = new TextEncoder().encode(text).length
  return ok([`${lines} ${words} ${bytes}`], { lines, words, bytes })
}

export function head(text: string, n = 10): AppletOut {
  const l = text.split('\n').slice(0, atLeast(n, 0))
  return ok(l, { count: l.length })
}

export function tail(text: string, n = 10): AppletOut {
  const all = text.split('\n')
  const l = n <= 0 ? [] : all.slice(atLeast(all.length - n, 0))
  return ok(l, { count: l.length })
}

/** sort — lexicographic by default, numeric with -n. Deterministic: ties keep input order. */
export function sortLines(text: string, numeric = false, reverse = false): AppletOut {
  const l = text.split('\n')
  const idx = l.map((v, i) => ({ v, i }))
  idx.sort((a, b) => {
    const c = numeric && digits(a.v.trim()) && digits(b.v.trim())
      ? num(a.v) - num(b.v)
      : (a.v < b.v ? -1 : a.v > b.v ? 1 : 0)
    return c !== 0 ? (reverse ? -c : c) : a.i - b.i
  })
  return ok(idx.map((x) => x.v), { count: l.length, numeric, reverse })
}

export function uniq(text: string, count = false): AppletOut {
  const out: string[] = []
  const runs: { line: string; n: number }[] = []
  for (const line of text.split('\n')) {
    const last = runs[runs.length - 1]
    if (last && last.line === line) last.n++
    else runs.push({ line, n: 1 })
  }
  for (const r of runs) out.push(count ? `${String(r.n).padStart(7)} ${r.line}` : r.line)
  return ok(out, { runs: runs.length })
}

/** cut -f N -d D — one-based fields, as cut counts them. */
export function cut(text: string, field: number, delim = '\t'): AppletOut {
  const l = text.split('\n').map((line) => line.split(delim)[field - 1] ?? '')
  return ok(l, { field, delim })
}

/** tr FROM TO — positional character mapping; a shorter TO repeats its last character, as tr does. */
export function tr(text: string, from: string, to: string): AppletOut {
  const map = new Map<string, string>()
  for (let i = 0; i < from.length; i++) map.set(from[i]!, to.length === 0 ? '' : (to[i] ?? to[to.length - 1]!))
  let out = ''
  for (const ch of text) out += map.has(ch) ? map.get(ch)! : ch
  return ok(out.split('\n'), { mapped: map.size })
}

export const rev = (text: string): AppletOut =>
  ok(text.split('\n').map((l) => [...l].reverse().join('')), null)

export const tac = (text: string): AppletOut => {
  const l = text.split('\n').reverse()
  return ok(l, { count: l.length })
}

export function nl(text: string): AppletOut {
  const l = text.split('\n').map((line, i) => `${String(i + 1).padStart(6)}\t${line}`)
  return ok(l, { count: l.length })
}

/** fold -w N — hard wrap, no word breaking, exactly as fold does without -s. */
export function fold(text: string, width = 80): AppletOut {
  const w = atLeast(width, 1)
  const out: string[] = []
  for (const line of text.split('\n')) {
    if (line.length === 0) { out.push(''); continue }
    for (let i = 0; i < line.length; i += w) out.push(line.slice(i, i + w))
  }
  return ok(out, { width: w, lines: out.length })
}

/** grep PATTERN — fixed-string or regex match, line by line. -v inverts, -c counts, -i folds case. */
export function grep(text: string, pattern: string, opts: { invert?: boolean; count?: boolean; ignoreCase?: boolean } = {}): AppletOut {
  let re: RegExp
  try { re = new RegExp(pattern, opts.ignoreCase ? 'i' : '') }
  catch { return ok([`grep: invalid pattern: ${pattern}`], { error: 'invalid pattern' }) }
  const hits = text.split('\n').filter((l) => re.test(l) !== !!opts.invert)
  return opts.count ? ok([String(hits.length)], { matches: hits.length }) : ok(hits, { matches: hits.length })
}

/** seq — seq N | seq A B | seq A STEP B, bounded so a runaway cannot hang the shell. */
export const SEQ_CAP = 100_000
export function seq(a: number, b?: number, step?: number): AppletOut {
  const from = b === undefined ? 1 : a
  const to = b === undefined ? a : b
  const by = step ?? (to < from ? -1 : 1)
  if (by === 0) return ok(['seq: step may not be zero'], { error: 'zero step' })
  const out: string[] = []
  for (let v = from; by > 0 ? v <= to : v >= to; v += by) {
    out.push(String(v))
    if (out.length >= SEQ_CAP) return ok([...out, `seq: stopped at ${SEQ_CAP} values`], { capped: true, count: out.length })
  }
  return ok(out, { count: out.length })
}

/** factor N → its prime factorisation, by trial division. Exact, and the arithmetic this tree is built on. */
export function factor(n: number): AppletOut {
  if (!Number.isInteger(n) || n < 2) return ok([`factor: ${n}: not an integer above one`], { error: 'domain' })
  const fs: number[] = []
  let m = n
  for (let d = 2; d * d <= m; d++) while (m % d === 0) { fs.push(d); m /= d }
  if (m > 1) fs.push(m)
  return ok([`${n}: ${fs.join(' ')}`], { n, factors: fs, prime: fs.length === 1 })
}

/** expr A op B — integer arithmetic only, and division by zero is refused rather than returning a value. */
export function expr(a: string, op: string, b: string): AppletOut {
  if (!digits(a) || !digits(b)) return ok(['expr: non-integer operand'], { error: 'operand' })
  const x = num(a), y = num(b)
  switch (op) {
    case '+': return ok([String(x + y)], { value: x + y })
    case '-': return ok([String(x - y)], { value: x - y })
    case '*': return ok([String(x * y)], { value: x * y })
    case '/': return y === 0 ? ok(['expr: division by zero'], { error: 'division by zero' })
      : ok([String((x - (x % y)) / y)], { value: (x - (x % y)) / y })
    case '%': return y === 0 ? ok(['expr: division by zero'], { error: 'division by zero' })
      : ok([String(x % y)], { value: x % y })
    default: return ok([`expr: unknown operator ${op}`], { error: 'operator' })
  }
}

export function basename(path: string, suffix = ''): AppletOut {
  const tailSeg = String(path).replace(/\/+$/, '').split('/').pop() ?? ''
  const cut2 = suffix && tailSeg.endsWith(suffix) ? tailSeg.slice(0, -suffix.length) : tailSeg
  return ok([cut2], { path, base: cut2 })
}

export function dirname(path: string): AppletOut {
  const p = String(path).replace(/\/+$/, '')
  const i = p.lastIndexOf('/')
  const d = i < 0 ? '.' : i === 0 ? '/' : p.slice(0, i)
  return ok([d], { path, dir: d })
}

/** printf — %s %d %% only, and an unknown specifier is REFUSED rather than passed through silently. */
export function printf(fmt: string, args: readonly string[]): AppletOut {
  let i = 0
  let bad = ''
  const out = String(fmt)
    .replace(/\\n/g, '\n').replace(/\\t/g, '\t')
    .replace(/%[a-zA-Z%]/g, (m) => {
      if (m === '%%') return '%'
      if (m === '%s') return args[i++] ?? ''
      if (m === '%d') { const v = args[i++] ?? '0'; return digits(v) ? String(num(v)) : '0' }
      bad = m
      return m
    })
  return bad ? ok([`printf: unsupported specifier ${bad}`], { error: bad }) : ok(out.split('\n'), { out })
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** base64 — encode, or decode with -d. Written out rather than delegated, so it holds on any runtime. */
export function base64(text: string, decode = false): AppletOut {
  if (!decode) {
    const bytes = new TextEncoder().encode(text)
    let out = ''
    for (let i = 0; i < bytes.length; i += 3) {
      const b0 = bytes[i]!, b1 = bytes[i + 1], b2 = bytes[i + 2]
      out += B64[b0 >> 2]! + B64[((b0 & 3) << 4) | ((b1 ?? 0) >> 4)]!
        + (b1 === undefined ? '=' : B64[((b1 & 15) << 2) | ((b2 ?? 0) >> 6)]!)
        + (b2 === undefined ? '=' : B64[b2 & 63]!)
    }
    return ok([out], { encoded: out })
  }
  const clean = text.replace(/[^A-Za-z0-9+/=]/g, '').replace(/=+$/, '')
  const bytes: number[] = []
  for (let i = 0; i < clean.length; i += 4) {
    const q = [0, 1, 2, 3].map((k) => B64.indexOf(clean[i + k] ?? 'A'))
    if (q.some((v) => v < 0)) return ok(['base64: invalid input'], { error: 'invalid' })
    bytes.push(((q[0]! << 2) | (q[1]! >> 4)) & 255)
    if (clean[i + 2] !== undefined) bytes.push(((q[1]! << 4) | (q[2]! >> 2)) & 255)
    if (clean[i + 3] !== undefined) bytes.push(((q[2]! << 6) | q[3]!) & 255)
  }
  const out = new TextDecoder().decode(new Uint8Array(bytes))
  return ok([out], { decoded: out })
}

/** sha256sum — the repository's OWN sha256, so the hash a stranger checks is the one this tree computes. */
export function sha256sum(text: string): AppletOut {
  const d = sha256(new TextEncoder().encode(text))
  const hex = [...d].map((b) => b.toString(16).padStart(2, '0')).join('')
  return ok([`${hex}  -`], { sha256: hex })
}

/** cksum — the POSIX CRC32 with the length appended, exactly as cksum prints it. */
export function cksum(text: string): AppletOut {
  const bytes = new TextEncoder().encode(text)
  let crc = 0
  for (const b of bytes) {
    crc ^= b << 24
    for (let k = 0; k < 8; k++) crc = (crc & 0x80000000) ? ((crc << 1) ^ 0x04c11db7) >>> 0 : (crc << 1) >>> 0
  }
  for (let len = bytes.length; len > 0; len >>= 8) {
    crc ^= (len & 255) << 24
    for (let k = 0; k < 8; k++) crc = (crc & 0x80000000) ? ((crc << 1) ^ 0x04c11db7) >>> 0 : (crc << 1) >>> 0
  }
  crc = (~crc) >>> 0
  return ok([`${crc} ${bytes.length}`], { crc, length: bytes.length })
}

/** test / [ — integer and string predicates. Reports the verdict; a shell would take an exit code. */
export function testExpr(args: readonly string[]): AppletOut {
  const a = args.filter((x) => x !== ']')
  const verdict = (v: boolean): AppletOut => ok([v ? 'true' : 'false'], { true: v })
  if (a.length === 1) return verdict(a[0] !== '')
  if (a.length === 2 && a[0] === '-n') return verdict((a[1] ?? '') !== '')
  if (a.length === 2 && a[0] === '-z') return verdict((a[1] ?? '') === '')
  if (a.length === 3) {
    const [x, op, y] = a as [string, string, string]
    if (op === '=') return verdict(x === y)
    if (op === '!=') return verdict(x !== y)
    if (['-eq', '-ne', '-lt', '-le', '-gt', '-ge'].includes(op)) {
      if (!digits(x) || !digits(y)) return ok(['test: integer expression expected'], { error: 'operand' })
      const p = num(x), q = num(y)
      return verdict(op === '-eq' ? p === q : op === '-ne' ? p !== q : op === '-lt' ? p < q
        : op === '-le' ? p <= q : op === '-gt' ? p > q : p >= q)
    }
  }
  return ok(['test: unsupported expression'], { error: 'expression' })
}

/** yes N — bounded, because an unbounded yes is a hang and this shell has no interrupt. */
export const YES_CAP = 1000
export const yes = (text: string, n = 10): AppletOut => {
  const k = atMost(atLeast(n, 1), YES_CAP)
  return ok(Array.from({ length: k }, () => text || 'y'), { count: k, cap: YES_CAP })
}

// ── SECOND WAVE. The first wave took the single-input transforms; these are the ones that needed a shape the
// dispatcher did not have yet — two inputs (comm, join, paste), a column model (expand, unexpand, fmt), or an
// encoding the tree had not written down (base32, od, sum). Each is still a total function of its input.

/** comm(a, b) → the three POSIX columns: only in a, only in b, in both. Inputs are taken as they arrive; comm
 *  assumes sorted input and says so rather than sorting behind the caller's back. */
export function comm(a: string, b: string): AppletOut {
  const la = a.split('\n'), lb = b.split('\n')
  const inB = new Set(lb), inA = new Set(la)
  const onlyA = la.filter((l) => !inB.has(l))
  const onlyB = lb.filter((l) => !inA.has(l))
  const both = la.filter((l) => inB.has(l))
  const lines = [...onlyA.map((l) => l), ...onlyB.map((l) => '\t' + l), ...both.map((l) => '\t\t' + l)]
  return ok(lines, { onlyA, onlyB, both: [...new Set(both)] })
}

/** join(a, b, field) → lines sharing a key in the given 1-based field, key first, then each side's remainder. */
export function join(a: string, b: string, field = 1): AppletOut {
  const key = (l: string): string => l.split(/\s+/)[field - 1] ?? ''
  const rest = (l: string): string[] => l.split(/\s+/).filter((_, i) => i !== field - 1)
  const index = new Map<string, string[][]>()
  for (const l of b.split('\n')) {
    if (!l) continue
    const k = key(l)
    index.set(k, [...(index.get(k) ?? []), rest(l)])
  }
  const lines: string[] = []
  for (const l of a.split('\n')) {
    if (!l) continue
    for (const r of index.get(key(l)) ?? []) lines.push([key(l), ...rest(l), ...r].join(' '))
  }
  return ok(lines, { joined: lines.length })
}

/** paste(a, b, delim) → line i of a beside line i of b. The shorter side pads with empty, never truncates the
 *  longer one — dropping the tail would be a silent loss of the caller's data. */
export function paste(a: string, b: string, delim = '\t'): AppletOut {
  const la = a.split('\n'), lb = b.split('\n')
  const n = la.length > lb.length ? la.length : lb.length
  const lines: string[] = []
  for (let i = 0; i < n; i++) lines.push((la[i] ?? '') + delim + (lb[i] ?? ''))
  return ok(lines, { rows: n })
}

export const TAB_DEFAULT = 8
/** expand(text, tabs) → tabs become spaces to the next tab stop, which is a column count, not a fixed width. */
export function expand(text: string, tabs = TAB_DEFAULT): AppletOut {
  const width = atLeast(atMost(tabs, 64), 1)
  const lines = text.split('\n').map((line) => {
    let out = ''
    for (const ch of line) {
      if (ch !== '\t') { out += ch; continue }
      const pad = width - (out.length % width)
      out += ' '.repeat(pad)
    }
    return out
  })
  return ok(lines, { tabs: width })
}

/** unexpand(text, tabs) → LEADING runs of spaces become tabs. Only leading, as busybox does by default: spaces
 *  inside a line are usually alignment a tab would break. */
export function unexpand(text: string, tabs = TAB_DEFAULT): AppletOut {
  const width = atLeast(atMost(tabs, 64), 1)
  const lines = text.split('\n').map((line) => {
    const m = /^ +/.exec(line)
    if (!m) return line
    const n = m[0].length
    return '\t'.repeat((n - (n % width)) / width) + ' '.repeat(n % width) + line.slice(n)
  })
  return ok(lines, { tabs: width })
}

export const FMT_WIDTH = 75
/** fmt(text, width) → words reflowed to a width. A blank line separates paragraphs and is preserved, because a
 *  reflow that eats paragraph breaks has changed the document, not its margins. */
export function fmt(text: string, width = FMT_WIDTH): AppletOut {
  const w = atLeast(atMost(width, 400), 8)
  const lines: string[] = []
  for (const para of text.split(/\n\s*\n/)) {
    if (lines.length) lines.push('')
    let cur = ''
    for (const word of para.split(/\s+/).filter(Boolean)) {
      if (!cur) { cur = word; continue }
      if (cur.length + 1 + word.length <= w) cur += ' ' + word
      else { lines.push(cur); cur = word }
    }
    if (cur) lines.push(cur)
  }
  return ok(lines, { width: w })
}

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
/** base32(text, decode) → RFC 4648 base32, padded. The inverse is exact: decode(encode(x)) is x for any input. */
export function base32(text: string, decode = false): AppletOut {
  if (decode) {
    const clean = text.replace(/=+$/, '').replace(/\s+/g, '').toUpperCase()
    let bits = 0, value = 0
    const out: number[] = []
    for (const ch of clean) {
      const i = B32.indexOf(ch)
      if (i < 0) return ok([`base32: invalid character '${ch}'`], { error: 'invalid-base32' })
      value = (value << 5) | i
      bits += 5
      if (bits >= 8) { bits -= 8; out.push((value >> bits) & 0xff) }
    }
    return ok([new TextDecoder().decode(new Uint8Array(out))], { bytes: out.length })
  }
  const bytes = new TextEncoder().encode(text)
  let bits = 0, value = 0, out = ''
  for (const b of bytes) {
    value = (value << 8) | b
    bits += 8
    while (bits >= 5) { bits -= 5; out += B32[(value >> bits) & 31] }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31]
  while (out.length % 8 !== 0) out += '='
  return ok([out], { base32: out })
}

/** od(text, mode) → the byte dump. Two modes are ported: 'x1' (hex bytes) and 'c' (printable characters with
 *  escapes). The octal word default is not ported — see the refusal list for why a partial format is worse. */
export function od(text: string, mode: 'x1' | 'c' = 'x1'): AppletOut {
  const bytes = new TextEncoder().encode(text)
  const lines: string[] = []
  const ESC: Record<number, string> = { 10: '\\n', 9: '\\t', 13: '\\r', 0: '\\0' }
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = [...bytes.slice(i, i + 16)]
    const cells = mode === 'x1'
      ? chunk.map((b) => b.toString(16).padStart(2, '0'))
      : chunk.map((b) => ESC[b] ?? (b >= 32 && b < 127 ? String.fromCharCode(b) : b.toString(8).padStart(3, '0')))
    lines.push(i.toString(8).padStart(7, '0') + ' ' + cells.join(' '))
  }
  lines.push(bytes.length.toString(8).padStart(7, '0'))
  return ok(lines, { bytes: bytes.length, mode })
}

/** sum(text) → the BSD 16-bit checksum and the block count, the same two numbers `sum` prints. */
export function sum(text: string): AppletOut {
  const bytes = new TextEncoder().encode(text)
  let s = 0
  for (const b of bytes) {
    s = (s >> 1) + ((s & 1) << 15)
    s = (s + b) & 0xffff
  }
  const blocks = (bytes.length + 1023 - ((bytes.length + 1023) % 1024)) / 1024
  return ok([`${s.toString().padStart(5, '0')} ${blocks}`], { sum: s, blocks })
}

/** tsort(text) → a topological order of whitespace-separated pairs. A CYCLE IS NAMED, never silently dropped:
 *  tsort's whole value is telling you the order exists, so an order it cannot produce must say so. */
export function tsort(text: string): AppletOut {
  const toks = text.split(/\s+/).filter(Boolean)
  const nodes = new Set<string>(toks)
  const edges: [string, string][] = []
  for (let i = 0; i + 1 < toks.length; i += 2) if (toks[i] !== toks[i + 1]) edges.push([toks[i]!, toks[i + 1]!])
  const indeg = new Map<string, number>([...nodes].map((n) => [n, 0]))
  const out = new Map<string, string[]>()
  for (const [a, b] of edges) {
    indeg.set(b, (indeg.get(b) ?? 0) + 1)
    out.set(a, [...(out.get(a) ?? []), b])
  }
  const ready = [...nodes].filter((n) => (indeg.get(n) ?? 0) === 0).sort()
  const order: string[] = []
  while (ready.length) {
    const n = ready.shift()!
    order.push(n)
    for (const m of out.get(n) ?? []) {
      indeg.set(m, (indeg.get(m) ?? 0) - 1)
      if ((indeg.get(m) ?? 0) === 0) { ready.push(m); ready.sort() }
    }
  }
  if (order.length !== nodes.size) {
    const stuck = [...nodes].filter((n) => !order.includes(n)).sort()
    return ok([`tsort: input contains a loop: ${stuck.join(' ')}`], { error: 'cycle', cycle: stuck })
  }
  return ok(order, { order })
}

const SI = ['', 'K', 'M', 'G', 'T', 'P', 'E']
/** numfmt(n, to) → an SI (1000) or IEC (1024) rendering. INTEGER ARITHMETIC ONLY: the value is carried as
 *  tenths and divided down, so no floating point and no rounding library enters the answer — the same digits
 *  come out on every host. */
export function numfmt(n: number, to: 'si' | 'iec' | 'iec-i' | 'none' = 'si'): AppletOut {
  if (!Number.isFinite(n) || !Number.isInteger(n)) return ok(['numfmt: invalid number'], { error: 'not-an-integer' })
  if (to === 'none') return ok([String(n)], { value: n })
  const base = to === 'iec' || to === 'iec-i' ? 1024 : 1000
  const neg = n < 0
  const abs = neg ? -n : n
  let unit = 0, div = 1
  while (abs >= div * base && unit < SI.length - 1) { div = div * base; unit++ }
  const tenths = (abs * 10 - ((abs * 10) % div)) / div
  const whole = (tenths - (tenths % 10)) / 10
  const frac = tenths % 10
  const digitsOut = unit === 0 || frac === 0 ? String(whole) : `${whole}.${frac}`
  // GNU prints K for --to=iec and Ki for --to=iec-i; the 'i' belongs to the second spelling only.
  const text = (neg ? '-' : '') + digitsOut + SI[unit] + (to === 'iec-i' && unit > 0 ? 'i' : '')
  return ok([text], { value: n, unit: SI[unit], base, tenths })
}

/** pathchk(path) → whether a path is portable under POSIX's portable filename character set. Pure string law. */
export function pathchk(path: string): AppletOut {
  const bad: string[] = []
  if (path === '') bad.push('empty path')
  if (path.length > 255) bad.push(`length ${path.length} exceeds the 255-byte portable limit`)
  for (const part of path.split('/')) {
    if (part === '') continue
    if (part.startsWith('-')) bad.push(`component '${part}' begins with '-'`)
    if (!/^[A-Za-z0-9._-]+$/.test(part)) bad.push(`component '${part}' leaves the portable character set`)
  }
  return bad.length
    ? ok(bad.map((b) => `pathchk: ${b}`), { error: 'not-portable', portable: false, faults: bad })
    : ok([`pathchk: ${path} is portable`], { portable: true, faults: [] })
}
