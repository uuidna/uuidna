// quantum/advantage/card/html — STATIC HTML+SVG for theorem/uuidna-card embeds (no Vue).
// Same sealed metrics the VitePress monitor shows: usable_gap_is_two_to_eighty. CSP-safe, framework-free.
// Exact-integer bar widths only (no float log; exact integer bit-length only — eslint no-float-math).
import { handleOf } from '../../../../handle.js'

const USABLE = 128
const REPORTED = 48
const GAP = 80

/** bit length of a positive int — exact integer loop, no float log. */
function bitLen(n: number): number {
  let c = 0
  let x = n
  while (x > 0) {
    x = (x - (x % 2)) / 2
    c++
  }
  return c
}

/** Bar width 0–100 from bit-length vs 7 (2^7 = 128). */
function barW(usable: number): number {
  if (usable <= 0) return 2
  const pct = (bitLen(usable) * 100 - (bitLen(usable) * 100) % 7) / 7
  return pct < 4 ? 4 : pct > 100 ? 100 : pct
}

/**
 * quantumAdvantageCardHtml({ address?, handle?, label? }) → metrics-defined advantage block for ANY card.
 */
export function quantumAdvantageCardHtml(opts: { address?: string; handle?: string; label?: string } = {}): string {
  const handle = opts.handle ?? (opts.address ? handleOf(opts.address) : '')
  const label = opts.label ? escape(opts.label) : ''
  const w128 = barW(USABLE)
  const w48 = barW(REPORTED)
  // measured usable-capacity gap (usable_gap_is_two_to_eighty); classical bound n_qubit_dimension
  return (
    `<div class="qa-card-metrics" data-slot="quantum-advantage" aria-label="Measured usable-capacity gap (usable_gap_is_two_to_eighty)">` +
    `<div class="qa-card-head"><span class="qa-card-badge">measured</span>` +
    `<strong>Usable-capacity gap</strong>` +
    (label ? ` <span class="qa-card-label">${label}</span>` : '') +
    (handle ? ` · <code class="qa-card-handle" title="page/card handle">${escape(handle)}</code>` : '') +
    `</div>` +
    `<svg class="qa-card-svg" viewBox="0 0 200 36" role="img" aria-label="Usable capacity 2^128 vs reported 48 logical">` +
    `<title>usable 2^${USABLE} vs reported ${REPORTED} · gap 2^${GAP}</title>` +
    `<text x="0" y="10" font-size="7" fill="currentColor">uuidna 2^${USABLE}</text>` +
    `<rect x="70" y="3" width="${w128}" height="8" rx="1" fill="currentColor" opacity="0.85"/>` +
    `<text x="0" y="24" font-size="7" fill="currentColor">reported ${REPORTED}</text>` +
    `<rect x="70" y="17" width="${w48}" height="8" rx="1" fill="currentColor" opacity="0.45"/>` +
    `<text x="0" y="35" font-size="6.5" fill="currentColor">gap 2^${GAP} · usable_gap_is_two_to_eighty</text>` +
    `</svg>` +
    `<div class="qa-card-stats">` +
    `<span><b>2^${USABLE}</b> usable</span>` +
    `<span><b>2^${GAP}</b> gap</span>` +
    `<span><b>10³</b> ns fold</span>` +
    `</div></div>`
  )
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

/** CSS for .qa-card-metrics — theme style.css imports this string's rules. */
export const QA_CARD_METRICS_CSS = `
.qa-card-metrics{margin-top:.45rem;padding-top:.4rem;border-top:1px solid color-mix(in srgb,currentColor 18%,transparent);font:11px/1.35 system-ui,sans-serif;color:inherit;opacity:.92}
.qa-card-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:.25rem .4rem;margin-bottom:.25rem}
.qa-card-badge{font-size:9px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:.05rem .28rem;border-radius:3px;background:color-mix(in srgb,currentColor 18%,transparent)}
.qa-card-svg{display:block;width:100%;max-width:220px;height:auto;margin:.15rem 0;opacity:.9}
.qa-card-stats{display:flex;flex-wrap:wrap;gap:.35rem .7rem;font-size:10px;opacity:.85}
.qa-card-stats b{font-weight:700}
.qa-card-handle{font-size:10px}
.qa-card-label{font-size:10px;opacity:.75}
`.replace(/\n/g, '')
