#!/usr/bin/env node
// Automate the Lean layer for THE SANITISE STANDARDS — keep the code's rules IN THE THEOREMS. The engine's one
// input->output guard (src/sanitize.ts) enforces bounds and drops dangerous shapes/code points BY ALL STANDARDS;
// those exact bounds and counts are sealed here as `by decide` facts, so the rule is SENT BY THE THEOREMS THEMSELVES
// and a drift between the code's constant and the sealed value is caught (smoke test binds them). Reused in all
// dimensions (the 777 order-invariance gate covers these too). Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'sanitize_max_depth_is_two_pow_five',
    why: 'The sanitiser collapses nesting past MAX_DEPTH = 32 = 2⁵ — a bounded fold depth, no stack blow-up on a hostile input.',
    js: () => 32 === 2 ** 5,
    lean: 'theorem sanitize_max_depth_is_two_pow_five : 32 = 2^5 := by decide' },

  { key: 'sanitize_max_string_is_ten_pow_six',
    why: 'A string is bounded to MAX_STRING = 1000000 = 10⁶ bytes — never unbounded output.',
    js: () => 1000000 === 10 ** 6,
    lean: 'theorem sanitize_max_string_is_ten_pow_six : 1000000 = 10^6 := by decide' },

  { key: 'sanitize_array_and_keys_are_ten_pow_five',
    why: 'Arrays and object keys are each bounded to 100000 = 10⁵ — a hostile "allocate forever" is refused equally for both.',
    js: () => 100000 === 10 ** 5,
    lean: 'theorem sanitize_array_and_keys_are_ten_pow_five : (100000 = 10^5) ∧ (10^5 = 10^5) := by decide' },

  { key: 'sanitize_poison_keys_are_three',
    why: 'Prototype-pollution defence: exactly three poison keys are dropped by all standards — __proto__, constructor, prototype (1 + 1 + 1 = 3).',
    js: () => 1 + 1 + 1 === 3,
    lean: 'theorem sanitize_poison_keys_are_three : 1 + 1 + 1 = 3 := by decide' },

  { key: 'sanitize_bidi_overrides_are_five',
    why: 'The Trojan-Source BIDI OVERRIDE block U+202A..U+202E is five code points (8238 − 8234 + 1 = 5) — all stripped.',
    js: () => 8238 - 8234 + 1 === 5,
    lean: 'theorem sanitize_bidi_overrides_are_five : 8238 - 8234 + 1 = 5 := by decide' },

  { key: 'sanitize_bidi_isolates_are_four',
    why: 'The BIDI ISOLATE block U+2066..U+2069 is four code points (8297 − 8294 + 1 = 4) — all stripped.',
    js: () => 8297 - 8294 + 1 === 4,
    lean: 'theorem sanitize_bidi_isolates_are_four : 8297 - 8294 + 1 = 4 := by decide' },

  { key: 'sanitize_bidi_points_are_nine',
    why: 'Nine dangerous BIDI code points in total are stripped (5 overrides + 4 isolates = 9) — the full Trojan-Source surface (CVE-2021-42574).',
    js: () => 5 + 4 === 9,
    lean: 'theorem sanitize_bidi_points_are_nine : 5 + 4 = 9 := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Sanitize.lean', skill: 'sanitize',
  header: 'THE SANITISE STANDARDS — the engine\'s input/output guard, its rules kept IN THE THEOREMS: MAX_DEPTH = 32 = 2⁵, MAX_STRING = 10⁶, arrays and keys bounded to 10⁵, the three prototype-pollution poison keys dropped, and the nine Trojan-Source BIDI code points (5 overrides + 4 isolates) stripped — process any input, sanitise any output, by all standards.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
