// The palette COMPUTES from the ℤ/9 sequence — no hardcoded colours. Each digit maps to a hue anchored on the
// centre: 5 → green (120°, the heart chakra, the dz(x)=10−x fixed point), and the reflection dz sends a digit to its
// complement across that green centre (1↔9, 2↔8, 3↔7, 4↔6, 5 fixed). Emitted as CSS custom properties --seq-1 …
// --seq-9, plus board tints anchored on the green centre, so components read the sequence, never a hex literal.
// Pure arithmetic (hue = 120 + (d−5)·30): 5→120 green, 1→0 red, 9→240 blue.
export function sequenceVars(): Record<string, string> {
  const hue = (d: number) => 120 + (d - 5) * 30
  const vars: Record<string, string> = {}
  for (let d = 1; d <= 9; d++) vars['--seq-' + d] = 'hsl(' + hue(d) + ' 60% 55%)'
  // Board and accents anchored on the green centre (digit 5) — a light and a dark green, symmetric about the heart.
  vars['--seq-center'] = 'hsl(' + hue(5) + ' 60% 45%)' // 5 — green, the heart
  vars['--seq-light'] = 'hsl(' + hue(5) + ' 32% 82%)'
  vars['--seq-dark'] = 'hsl(' + hue(5) + ' 30% 50%)'
  vars['--seq-last'] = 'hsl(' + hue(4) + ' 45% 70%)' // last-move tint from digit 4 (dz-mirror of 6)
  return vars
}

/** Set the computed sequence variables on the document root (client-side only). */
export function applySequence(): void {
  if (typeof document === 'undefined') return
  const vars = sequenceVars()
  for (const k in vars) document.documentElement.style.setProperty(k, vars[k])
}
