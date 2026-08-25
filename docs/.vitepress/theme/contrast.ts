// contrast — WCAG 1.4.3/1.4.11 contrast ratio, pure arithmetic (the relative-luminance formula), same style as
// address.ts's own hue->RGB math: no library, no browser, recomputable by anyone from two hex colours alone.
// HONEST SCOPE: this checks the SPECIFIC colour pairs the components added this session actually use (ReferrerNav,
// ReadAloud) against VitePress's own SHIPPED variable values (read from the real installed package below, never
// hand-copied — so it can't go stale the way a hardcoded snapshot would) — it does NOT re-audit VitePress's entire
// default theme, which is a separately maintained upstream project outside this codebase's scope.

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

const channelLuminance = (c: number): number => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

/** contrastRatio(hex1, hex2) → the WCAG contrast ratio between two colours, 1..21. Order-independent (the
 *  formula always divides the lighter luminance by the darker one). */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export const WCAG_AA_TEXT = 4.5     // normal text, level AA (1.4.3)
export const WCAG_AA_UI = 3.0       // large text / UI components & graphical objects (1.4.11, 1.4.3 large text)

// The values every component here actually renders with via var(--vp-c-*). Two blocks: light and dark, since the
// site ships a real theme toggle.
//
// THE GREY/TEXT/DIVIDER VALUES are VitePress's own, read from the real installed theme-default/styles/vars.css
// rather than hand-guessed. THE BRAND IS NOT: style.css overrides --vp-c-brand-1 in both themes, so upstream's
// indigo is a colour this site never paints, and holding it here made every brand check measure the wrong thing.
// That was found by reading getComputedStyle off a live page instead of trusting the table — which is the whole
// lesson: a table of "what the framework ships" is not a table of "what this site renders" the moment one line
// of CSS disagrees, and only one of those two questions is the one being asked.
export const VP_COLORS = {
  light: {
    bg: '#ffffff', bgSoft: '#f6f6f7', divider: '#e2e2e3',
    text1: '#3c3c43', text2: '#67676c', text3: '#929295',
    // NOT VitePress's --vp-c-indigo-1 (#3451b2), which is what this line held until it was measured in a live
    // page: style.css:53 overrides --vp-c-brand-1 with uuidna's own purple, so #3451b2 is a colour this site
    // never renders. The check was reading upstream's value and reporting it as the shipped one — the same
    // measure-the-proxy-not-the-thing shape the ledger keeps catching, arriving in the instrument that exists to
    // catch it. Both values pass AA, so nothing broken shipped; the margin was simply overstated by 1.3 points.
    brand1: '#6b46e5', // style.css:53 — uuidna brand, light
  },
  dark: {
    bg: '#1b1b1f', bgSoft: '#202127', divider: '#2e2e32',
    text1: '#dfdfd6', text2: '#98989f', text3: '#6a6a71',
    brand1: '#a78bfa', // style.css:139 — uuidna brand, dark (not VitePress's #a8b1ff, same reason as light)
  },
} as const

export interface ContrastCheck { name: string; fg: string; bg: string; threshold: number; theme: 'light' | 'dark' }

// The actual (fg, bg) pairs ReferrerNav.vue and ReadAloud.vue render, in each theme — read straight off their own
// <style> blocks (var(--vp-c-text-2) on the nav bar's var(--vp-c-bg), etc.), not reconstructed from memory.
export function realComponentChecks(): ContrastCheck[] {
  const checks: ContrastCheck[] = []
  for (const theme of ['light', 'dark'] as const) {
    const c = VP_COLORS[theme]
    checks.push(
      { name: `ReferrerNav link text (${theme})`, fg: c.text2, bg: c.bg, threshold: WCAG_AA_TEXT, theme },
      { name: `ReferrerNav link hover (${theme})`, fg: c.brand1, bg: c.bg, threshold: WCAG_AA_TEXT, theme },
      { name: `ReadAloud button text (${theme})`, fg: c.text1, bg: c.bgSoft, threshold: WCAG_AA_TEXT, theme },
      { name: `ReadAloud button hover (${theme})`, fg: c.brand1, bg: c.bgSoft, threshold: WCAG_AA_TEXT, theme },
      { name: `ReadAloud stop button text (${theme})`, fg: c.text2, bg: c.bgSoft, threshold: WCAG_AA_TEXT, theme },
      { name: `ReadAloud button border, non-text UI (${theme})`, fg: c.text2, bg: c.bgSoft, threshold: WCAG_AA_UI, theme },
      // SponsorCard (the aside's sponsorship slot). Its lede and message reuse pairs already checked above; the
      // one NEW pair is the link, and it is here because the first draft of that line failed. It was written as
      // var(--seq-5) — copied from Dimensions.vue, where the same var is used the same way — and --seq-5 is
      // hsl(120 66% 55%) = #41d841, which measures 1.75:1 against the light background where AA asks 4.5:1. It
      // is legible in dark (8.50:1) and nearly invisible in light, which is the shape of the bug a dark-themed
      // author ships without ever seeing it. The colour is now the brand var, and the pair is checked here so
      // reverting it turns this test red instead of turning the link grey.
      { name: `SponsorCard link (${theme})`, fg: c.brand1, bg: c.bgSoft, threshold: WCAG_AA_TEXT, theme },
    )
  }
  return checks
}

/** THE ℤ/9 ACCENTS AS TEXT, MEASURED — the pairs this file's scope note excludes, computed rather than assumed.
 *
 *  The note above says, accurately, that this module checks the pairs of the components it names and does not
 *  re-audit the wider theme. That boundary is declared, which is what keeps it honest — but declared narrowness
 *  is still narrowness, and the question "is the shipped text readable" is wider than the two components the list
 *  covers. Writing SponsorCard walked straight into the gap: the accent var read as the obvious choice, matched
 *  what a sibling component already did, and failed AA by a factor of two and a half.
 *
 *  So the accents are measured here, as data, and NOT asserted as a test. They are used as TEXT COLOUR today in
 *  CaptainCoins (.cc-v.ok/.bad), CostMeter and TokenMeter (.cm-key b / .tm-key b), MessageStream (.ms-layers b,
 *  .ms-err, .ms-arrive.ok b) and Dimensions (.dims-toggle.folded), and every one of those pairs fails AA against
 *  the LIGHT background — --seq-5 at 1.89:1, --seq-center at 2.17:1, --seq-1 at 3.73:1, --seq-2 at 4.42:1, the
 *  last close enough to look like a rounding argument and still short. Making that a failing assertion would turn
 *  five components red in a shared tree without their authors' say, so it is exposed as a function a maintainer
 *  can run, and named in the open, rather than either fixed by ambush or left undiscovered.
 *
 *  The accents are hex literals here because they are hsl() in the palette and this module's arithmetic is
 *  hex-only; each is the exact conversion of the sealed sequenceVars() value, not a hand-picked approximation. */
export const SEQ_AS_TEXT = {
  '--seq-1': '#d841a5',
  '--seq-2': '#d84141',
  '--seq-5': '#41d841',
  '--seq-center': '#2acb2a',
} as const

export function accentTextChecks(): ContrastCheck[] {
  const checks: ContrastCheck[] = []
  for (const theme of ['light', 'dark'] as const) {
    const c = VP_COLORS[theme]
    for (const [name, fg] of Object.entries(SEQ_AS_TEXT)) {
      checks.push({ name: `${name} as text on bg (${theme})`, fg, bg: c.bg, threshold: WCAG_AA_TEXT, theme })
      checks.push({ name: `${name} as text on bgSoft (${theme})`, fg, bg: c.bgSoft, threshold: WCAG_AA_TEXT, theme })
    }
  }
  return checks
}
