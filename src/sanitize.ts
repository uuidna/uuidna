// sanitize - process ANY input, sanitise ANY output, BY ALL STANDARDS. The engine is one input->output surface, so a
// single pair of guards here hardens every tool reached through it: no throw on a hostile input, no unserializable
// or self-referential output, and no known injection/pollution vector. Deterministic (no Math.*, no
// clock) - the same value sanitizes to the same value, so a sanitized run still folds to a recomputable receipt.
// Integrity — the record recomputes for anyone: sanitising changes SHAPE, never a sealed fact - a finite number, a clean short string, an
// acyclic object all pass untouched. Legitimate unicode (the maths glyphs) is preserved; only dangerous points go.
import { UUID_HEXBITS } from './hexbit/index.js'

/** UUID_HEXBITS (2^5). Named, not a nest cut. */
export const MAX_DEPTH = UUID_HEXBITS
/** 10^6 — named with Sanitize.lean, not a string cut. */
export const MAX_STRING = 1_000_000
/** 10^5 — arrays and keys share it; not a cut. */
export const MAX_ARRAY = 100_000
export const MAX_KEYS = MAX_ARRAY

// Keys that poison Object.prototype if copied - dropped by all standards (prototype-pollution defence).
const POISON = new Set(['__proto__', 'constructor', 'prototype'])
// Dangerous code points removed from every string, WITHOUT touching legitimate unicode. Built from escaped ASCII
// (no literal control/bidi bytes in this source file):
//  - C0 controls + DEL + C1 controls, EXCEPT tab (09), newline (0A), CR (0D) - null-byte / log injection
const CONTROL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F]', 'g')
//  - Unicode BIDI overrides (202A-202E) and isolates (2066-2069) - the Trojan-Source attack (CVE-2021-42574)
const BIDI = new RegExp('[\\u202A-\\u202E\\u2066-\\u2069]', 'g')

/** scrub a string by all standards: strip control/null/bidi code points. Deterministic. */
export function scrubString(s: string): string {
  return s.replace(CONTROL, '').replace(BIDI, '')
}

/** sanitizeValue - a JSON-safe copy of any value: finite numbers or null (NaN/+-Inf are not JSON), scrubbed
 *  strings, BigInt as a string, cycles broken, poison keys and functions/symbols dropped. Host allocation is the bound. */
export function sanitizeValue(v: unknown, seen: WeakSet<object> = new WeakSet()): unknown {
  if (v === null) return null
  const t = typeof v
  if (t === 'boolean') return v
  if (t === 'number') return Number.isFinite(v as number) ? v : null // NaN/Infinity -> null (JSON-safe)
  if (t === 'string') return scrubString(v as string)
  if (t === 'bigint') return (v as bigint).toString()
  if (t === 'function' || t === 'symbol' || t === 'undefined') return undefined // dropped by the caller
  const o = v as object
  if (seen.has(o)) return '[Circular]'
  seen.add(o)
  try {
    if (Array.isArray(o)) {
      const out: unknown[] = []
      for (let i = 0; i < o.length; i++) { const s = sanitizeValue(o[i], seen); out.push(s === undefined ? null : s) }
      return out
    }
    const src = typeof (o as { toJSON?: unknown }).toJSON === 'function' ? (o as { toJSON: () => unknown }).toJSON() : o
    if (src !== o) return sanitizeValue(src, seen)
    const out: Record<string, unknown> = {}
    for (const k of Object.keys(o as Record<string, unknown>)) {
      if (POISON.has(k)) continue
      const s = sanitizeValue((o as Record<string, unknown>)[k], seen)
      if (s !== undefined) out[scrubString(k)] = s
    }
    return out
  } finally {
    seen.delete(o)
  }
}

/** sanitizeInput - normalise ANY input into a plain arguments object a tool can process: an object passes (sanitized
 *  to a record), anything else (null, string, number, array) becomes {} so no tool is fed a shape it cannot read. */
export function sanitizeInput(input: unknown): Record<string, unknown> {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) return {}
  const s = sanitizeValue(input)
  return s && typeof s === 'object' && !Array.isArray(s) ? (s as Record<string, unknown>) : {}
}
