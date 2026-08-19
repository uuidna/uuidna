// keyboardStatic — Tier 1 keyboard-accessibility check: static, zero-dependency, catches real anti-patterns
// without a browser. HONEST SCOPE: this is NOT a substitute for actually driving Tab/Enter in a real browser
// (Tier 2) — tab ORDER and whether a key press actually activates an element are runtime facts a static scan
// cannot see. What it CAN catch for real: positive tabindex (breaks natural order), outline:none/0 on a
// focusable element with no visible replacement (the single most common real-world keyboard-a11y regression —
// removing the default focus ring for looks, leaving keyboard users with no visible focus at all), and
// aria-hidden placed on an interactive element itself rather than a decorative child (hides a reachable control
// from assistive tech, a WCAG 4.1.2 failure, not just an oversight).

export interface KeyboardViolation { file: string; rule: string; detail: string }

export function checkKeyboardStatic(files: readonly { path: string; source: string }[]): KeyboardViolation[] {
  const violations: KeyboardViolation[] = []
  for (const { path, source } of files) {
    for (const m of source.matchAll(/tabindex\s*=\s*["']?(\d+)["']?/gi)) {
      if (Number(m[1]) > 0) violations.push({ file: path, rule: 'positive-tabindex', detail: `tabindex="${m[1]}" breaks natural tab order` })
    }
    const suppressesOutline = /outline\s*:\s*(none|0)\b/i.test(source)
    const hasFocusReplacement = /:focus(-visible)?\s*\{[^}]*outline/i.test(source)
    if (suppressesOutline && !hasFocusReplacement) {
      violations.push({ file: path, rule: 'outline-suppressed-no-replacement', detail: 'outline:none/0 with no :focus/:focus-visible outline replacement in the same file' })
    }
    // aria-hidden on a real interactive tag (<button ... aria-hidden, <a ... aria-hidden), not on a decorative
    // <span aria-hidden="true"> child — the tag-name check is what tells the two apart.
    for (const m of source.matchAll(/<(button|a)\b[^>]*\baria-hidden\s*=\s*["']true["'][^>]*>/gi)) {
      violations.push({ file: path, rule: 'interactive-aria-hidden', detail: `<${m[1]}> itself carries aria-hidden="true" — hidden from assistive tech while still focusable` })
    }
  }
  return violations
}
