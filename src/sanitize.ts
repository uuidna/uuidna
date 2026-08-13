// sanitize - process ANY input, sanitise ANY output, BY ALL STANDARDS. The engine is one input->output surface, so a
// single pair of guards here hardens every tool reached through it: no throw on a hostile input, no unserializable,
// unbounded, or self-referential output, and no known injection/pollution vector. Deterministic (no Math.*, no
// clock) - the same value sanitizes to the same value, so a sanitized run still folds to a recomputable receipt.
// Integrity, not truth: sanitising changes SHAPE, never a sealed fact - a finite number, a clean short string, an
// acyclic object all pass untouched. Legitimate unicode (the maths glyphs) is preserved; only dangerous points go.

export const MAX_DEPTH = 32          // nesting deeper than this is collapsed - no stack blow-up on a hostile input
export const MAX_STRING = 1_000_000  // 1 MB per string - bounded, never unbounded
export const MAX_ARRAY = 100_000     // array length cap - a hostile "make me allocate forever" is refused
export const MAX_KEYS = 100_000      // object key cap - same, for a hostile many-keyed object

// Keys that poison Object.prototype if copied - dropped by all standards (prototype-pollution defence).
const POISON = new Set(['__proto__', 'constructor', 'prototype'])
// Dangerous code points removed from every string, WITHOUT touching legitimate unicode. Built from escaped ASCII
// (no literal control/bidi bytes in this source file):
//  - C0 controls + DEL + C1 controls, EXCEPT tab (09), newline (0A), CR (0D) - null-byte / log injection
const CONTROL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F]', 'g')
//  - Unicode BIDI overrides (202A-202E) and isolates (2066-2069) - the Trojan-Source attack (CVE-2021-42574)
const BIDI = new RegExp('[\\u202A-\\u202E\\u2066-\\u2069]', 'g')

/** scrub a string by all standards: strip control/null/bidi code points, then bound length. Deterministic. */
export function scrubString(s: string): string {
  const clean = s.replace(CONTROL, '').replace(BIDI, '')
  return clean.length > MAX_STRING ? clean.slice(0, MAX_STRING) + '…[truncated]' : clean
}

/** sanitizeValue - a JSON-safe copy of any value: finite numbers or null (NaN/+-Inf are not JSON), scrubbed+bounded
 *  strings, BigInt as a string, cycles broken, depth/array/keys bounded, poison keys and functions/symbols dropped. */
export function sanitizeValue(v: unknown, depth = 0, seen: WeakSet<object> = new WeakSet()): unknown {
  if (v === null) return null
  const t = typeof v
  if (t === 'boolean') return v
  if (t === 'number') return Number.isFinite(v as number) ? v : null // NaN/Infinity -> null (JSON-safe)
  if (t === 'string') return scrubString(v as string)
  if (t === 'bigint') return (v as bigint).toString()
  if (t === 'function' || t === 'symbol' || t === 'undefined') return undefined // dropped by the caller
  // object (incl. array)
  const o = v as object
  if (seen.has(o)) return '[Circular]'
  if (depth >= MAX_DEPTH) return '[MaxDepth]'
  seen.add(o)
  try {
    if (Array.isArray(o)) {
      const n = o.length > MAX_ARRAY ? MAX_ARRAY : o.length
      const out: unknown[] = []
      for (let i = 0; i < n; i++) { const s = sanitizeValue(o[i], depth + 1, seen); out.push(s === undefined ? null : s) } // arrays keep indices - undefined -> null
      if (o.length > MAX_ARRAY) out.push('…[truncated ' + (o.length - MAX_ARRAY) + ' more]')
      return out
    }
    // honour an explicit JSON projection if the value defines one (e.g. a typed value), else own enumerable keys
    const src = typeof (o as { toJSON?: unknown }).toJSON === 'function' ? (o as { toJSON: () => unknown }).toJSON() : o
    if (src !== o) return sanitizeValue(src, depth + 1, seen)
    const out: Record<string, unknown> = {}
    let kept = 0
    for (const k of Object.keys(o as Record<string, unknown>)) {
      if (POISON.has(k)) continue                       // prototype-pollution defence - never copy a poison key
      if (kept >= MAX_KEYS) { out['…'] = '[truncated keys]'; break }
      const s = sanitizeValue((o as Record<string, unknown>)[k], depth + 1, seen)
      if (s !== undefined) { out[scrubString(k)] = s; kept++ } // scrub the KEY too; drop undefined values
    }
    return out
  } finally {
    seen.delete(o) // allow the same object in sibling branches - only true cycles are broken
  }
}

/** sanitizeInput - normalise ANY input into a plain arguments object a tool can process: an object passes (sanitized
 *  to a record), anything else (null, string, number, array) becomes {} so no tool is fed a shape it cannot read. */
export function sanitizeInput(input: unknown): Record<string, unknown> {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) return {}
  const s = sanitizeValue(input)
  return s && typeof s === 'object' && !Array.isArray(s) ? (s as Record<string, unknown>) : {}
}
