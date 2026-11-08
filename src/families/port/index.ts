import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PORTING AS COMBINATORICS. Moving code between platforms is layout arithmetic over open, published formats: a binary
 *  is identified by its magic number, a struct's size and field offsets follow the C ABI's natural-alignment rule, a
 *  platform's pointer and long widths follow its data model (ILP32, LP64, LLP64), and a value's bytes reverse between
 *  endiannesses. Each is a function of naturals — the same ones readelf, nm and an ABI calculator compute — so each is
 *  a hex program at an address with a receipt. Open formats only; no licensing, protection or proprietary layout is
 *  read or defeated here. */

const PROOF = 'ELF/PE/Mach-O/WASM/class-file magic numbers; the System V / Itanium C ABI natural-alignment rule; the ILP32/LP64/LLP64 data models'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'port', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `port.${name}`, params })

// the formats a binary announces in its first bytes, as the number those bytes read big-endian
const MAGIC: Record<number, string> = { 0x7f454c46: 'ELF', 0x4d5a9000: 'PE/MZ', 0xcafebabe: 'Java class / Mach-O fat', 0xfeedface: 'Mach-O 32', 0xfeedfacf: 'Mach-O 64', 0x0061736d: 'WASM', 0x213c6172: 'ar archive', 0x504b0304: 'ZIP/JAR', 0x7f454c00: 'ELF (truncated)' }
const MAGICS = Object.keys(MAGIC).map(Number).sort((a, b) => a - b)
// the pointer / long widths of a data model, in bytes: [int, long, pointer]
const MODELS: Record<number, { name: string; int: number; long: number; ptr: number }> = { 0: { name: 'ILP32', int: 4, long: 4, ptr: 4 }, 1: { name: 'LP64', int: 4, long: 8, ptr: 8 }, 2: { name: 'LLP64', int: 4, long: 4, ptr: 8 }, 3: { name: 'ILP64', int: 8, long: 8, ptr: 8 } }

export class PortFormulas {
  /** Identify a format from the number its first four bytes read: value the index of the magic (1-based) in the known
   *  set, 0 when none; holds when it is a known magic. port.name(n) in the reading. */
  static magic(n: number): CrossFormula {
    const i = MAGICS.indexOf(n)
    return f('port-magic', 'magic(n) = [n is a known format magic]', i + 1, nat(n) && i >= 0, 'magic', [n], { format: i >= 0 ? MAGIC[n] : 'unknown', known: MAGICS.length })
  }
  /** The next offset at or after `offset` that is aligned to `align` (a power of two): the C ABI places a field of
   *  alignment `align` here. align 0 is treated as 1 (packed). */
  static align(offset: number, align: number): CrossFormula {
    const a = align < 1 ? 1 : align
    const aligned = Math.ceil(offset / a) * a
    return f('port-align', 'align(o, a) = ⌈o / a⌉ · a', aligned, nat(offset, align) && (a & (a - 1)) === 0, 'align', [offset, align], { padding: aligned - offset })
  }
  /** The size of a struct whose field sizes are the hex digits of `fields` (each digit a field of that many bytes,
   *  1 … 15; its alignment is its size for these scalar widths), laid out by the C ABI with natural alignment and the
   *  whole padded to the largest field's alignment. The real porting number: how big the struct is on this target. */
  static layout(fields: number): CrossFormula {
    const sizes = fields > 0 ? fields.toString(16).split('').map((d) => parseInt(d, 16)).filter((d) => d > 0) : []
    let offset = 0, maxAlign = 1
    for (const s of sizes) { offset = Math.ceil(offset / s) * s + s; maxAlign = Math.max(maxAlign, s) }
    const total = Math.ceil(offset / maxAlign) * maxAlign
    return f('port-layout', 'layout(fields) = struct size under natural alignment', sizes.length ? total : 0, nat(fields) && sizes.length > 0, 'layout', [fields], { fields: sizes, align: maxAlign, tail: total - offset })
  }
  /** The offset of the i-th field (0-based) of the struct whose field sizes are the hex digits of `fields`. */
  static offset(fields: number, i: number): CrossFormula {
    const sizes = fields > 0 ? fields.toString(16).split('').map((d) => parseInt(d, 16)).filter((d) => d > 0) : []
    let offset = 0, at = 0
    for (const [k, s] of sizes.entries()) { offset = Math.ceil(offset / s) * s; if (k === i) { at = offset; break } offset += s }
    return f('port-offset', 'offset(fields, i) = the i-th field’s aligned offset', i < sizes.length ? at : 0, nat(fields, i) && i < sizes.length, 'offset', [fields, i], { field: sizes[i], of: sizes.length })
  }
  /** The pointer width in bytes of the data model m (0 ILP32, 1 LP64, 2 LLP64, 3 ILP64): what a pointer costs when
   *  porting there. port.name in the reading; long(m) is the sibling. */
  static word(m: number): CrossFormula {
    const model = MODELS[m]
    return f('port-word', 'word(m) = sizeof(void*) of data model m', model?.ptr ?? 0, model !== undefined, 'word', [m], { model: model?.name, int: model?.int, long: model?.long })
  }
  /** The long width in bytes of the data model m: where ILP32/LP64/LLP64 differ and ports break. */
  static long(m: number): CrossFormula {
    const model = MODELS[m]
    return f('port-long', 'long(m) = sizeof(long) of data model m', model?.long ?? 0, model !== undefined, 'long', [m], { model: model?.name })
  }
  /** A value of `bytes` bytes with its byte order reversed: the same scalar read on the other endianness. */
  static swap(x: number, bytes: number): CrossFormula {
    const b = bytes < 1 ? 1 : Math.min(bytes, 6)
    let v = x >>> 0, out = 0
    for (let k = 0; k < b; k++) { out = out * 256 + (v % 256); v = Math.floor(v / 256) }
    return f('port-swap', 'swap(x, bytes) = x with its bytes reversed', out, nat(x, bytes) && bytes >= 1 && bytes <= 6, 'swap', [x, bytes], { bytes: b })
  }
  /** The padding bytes a field of alignment `align` needs at `offset`: align(offset, align) − offset. */
  static pad(offset: number, align: number): CrossFormula {
    const a = align < 1 ? 1 : align
    return f('port-pad', 'pad(o, a) = ⌈o / a⌉ · a − o', Math.ceil(offset / a) * a - offset, nat(offset, align) && (a & (a - 1)) === 0, 'pad', [offset, align])
  }
}

for (const name of ['align', 'layout', 'long', 'magic', 'offset', 'pad', 'swap', 'word'] as const)
  hexRegisterOf('port', name, (PortFormulas[name] as (...x: unknown[]) => unknown).bind(PortFormulas))
