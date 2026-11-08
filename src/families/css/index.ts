import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CSS — THE DESIGN SYSTEM AS ARITHMETIC, LEARNED FROM TAILWIND AND SHADCN. A design token is a number on a scale: the
 *  spacing step (0.25rem = 4px), px↔rem at a 16px base, a modular type scale (×1.25 from 16), the responsive breakpoints,
 *  the rounded radius scale, line-height, the WCAG contrast ratio, and the grid gutter. Exact and combinatorial — every
 *  token composes with another. Crosses to `cross`. A measure, the way Tailwind's config is a measure. */

const PROOF = 'CSS design tokens as arithmetic from Tailwind/shadcn (spacing 0.25rem step, px↔rem at 16, modular 1.25 type scale, breakpoints, rounded radius, line-height, WCAG contrast, grid gutter)'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const SCREENS = [640, 768, 1024, 1280, 1536] as const // sm md lg xl 2xl
const RADIUS = [0, 2, 4, 6, 8, 12, 16, 24] as const // none sm DEFAULT md lg xl 2xl 3xl (px)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'css', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `css.${name}`, params })

export class CssFormulas {
  /** THE SPACING STEP in px: Tailwind's unit is 0.25rem = 4px, so step n is 4n px. value step · 4. */
  static spacing(step: number): CrossFormula { return c('css-spacing', 'spacing(step) = step · 4 (px; 0.25rem unit)', step * 4, nat(step), 'spacing', [step]) }
  /** PX TO REM at the 16px base, in centi-rem (×100): 24px → 150 (1.5rem). value ⌊px · 100 / 16⌋. */
  static rem(px: number): CrossFormula { return c('css-rem', 'rem(px) = ⌊px · 100 / 16⌋ (centi-rem, 16px base)', Math.floor((px * 100) / 16), nat(px), 'rem', [px]) }
  /** THE MODULAR TYPE SCALE in px: 16 × 1.25^step (Tailwind's ratio from base). value ⌊16 · 5^step / 4^step⌋. */
  static type(step: number): CrossFormula { return c('css-type', 'type(step) = ⌊16 · 5^step / 4^step⌋ (modular 1.25 from 16px)', Math.floor((16 * 5 ** step) / 4 ** step), nat(step) && step <= 10, 'type', [step]) }
  /** A RESPONSIVE BREAKPOINT in px: the i-th of sm(640) md(768) lg(1024) xl(1280) 2xl(1536). value SCREENS[i]. */
  static screen(i: number): CrossFormula { return c('css-screen', 'screen(i) = the i-th breakpoint (640, 768, 1024, 1280, 1536)', i >= 0 && i < SCREENS.length ? SCREENS[i]! : 0, nat(i) && i < SCREENS.length, 'screen', [i], { name: ['sm', 'md', 'lg', 'xl', '2xl'][i] }) }
  /** THE ROUNDED RADIUS in px: the i-th of the rounded scale (0, 2, 4, 6, 8, 12, 16, 24) — shadcn's --radius lives here. */
  static radius(i: number): CrossFormula { return c('css-radius', 'radius(i) = the i-th rounded step (0, 2, 4, 6, 8, 12, 16, 24 px)', i >= 0 && i < RADIUS.length ? RADIUS[i]! : 0, nat(i) && i < RADIUS.length, 'radius', [i]) }
  /** LINE-HEIGHT in px for a font size at the normal 1.5 ratio. value ⌊size · 3 / 2⌋. */
  static leading(size: number): CrossFormula { return c('css-leading', 'leading(size) = ⌊size · 3 / 2⌋ (line-height 1.5)', Math.floor((size * 3) / 2), nat(size), 'leading', [size]) }
  /** THE WCAG CONTRAST RATIO (×100) between two relative luminances on 0…100: (lighter + 5) / (darker + 5). AA text ≥ 450. */
  static contrast(lighter: number, darker: number): CrossFormula { const hi = Math.max(lighter, darker), lo = Math.min(lighter, darker); return c('css-contrast', 'contrast(a, b) = ⌊(lighter + 5) · 100 / (darker + 5)⌋ (WCAG, AA ≥ 450)', Math.floor(((hi + 5) * 100) / (lo + 5)), nat(lighter, darker) && lighter <= 100 && darker <= 100, 'contrast', [lighter, darker]) }
  /** THE GRID GUTTER in px: the total gap across `cols` columns at `gap` px each — (cols − 1) · gap. value max(0, cols − 1) · gap. */
  static grid(cols: number, gap: number): CrossFormula { return c('css-grid', 'grid(cols, gap) = max(0, cols − 1) · gap (total gutter)', Math.max(0, cols - 1) * gap, nat(cols, gap), 'grid', [cols, gap]) }
}

for (const name of ['contrast', 'grid', 'leading', 'radius', 'rem', 'screen', 'spacing', 'type'] as const)
  hexRegisterOf('css', name, (CssFormulas[name] as (...x: unknown[]) => unknown).bind(CssFormulas))
