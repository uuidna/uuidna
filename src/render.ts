// render — present a theorem (or any receipt) in the UI using ONLY TypeScript and CSS: no framework, no
// runtime deps. Each card carries the content-address — a 36-byte POINTER — never the full payload: by
// pigeonhole 1024 payloads cannot fit a small budget, but 1024 addresses (36 kB) do. Present by reference,
// the same bound as a single address. A content-address proves integrity, not truth. 0/7.
import { toUuid } from './address.js'

export interface TheoremView { name: string; address?: string }

/** A single hue (0..359) from a content-address — the vortex colour, computed, nothing fetched. */
function hueOf(address: string): number {
  return (parseInt(address.replace(/[^0-9a-f]/gi, '').slice(0, 2) || '0', 16) * 40) % 360
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/** renderTheorem(t) → a self-contained HTML card (inline CSS, no framework) presenting one theorem BY its
 *  content-address. If no address is given it is minted from the name — the same value always mints the same. */
export function renderTheorem(t: TheoremView): string {
  const address = t.address ?? toUuid(t.name)
  const hue = hueOf(address)
  const title = escapeHtml(t.name.split('—')[0].trim() || t.name)
  const full = escapeHtml(t.name)
  return `<article class="uuidna-card" style="border-left:4px solid hsl(${hue} 60% 50%);padding:.6rem .9rem;`
    + `margin:.5rem 0;border-radius:8px;background:hsl(${hue} 60% 50% / .06);font:14px/1.5 system-ui,sans-serif">`
    + `<h3 style="margin:0 0 .3rem;font-size:1rem">${title}</h3>`
    + `<p style="margin:0;color:#6a6a6a;font-size:.82rem">${full}</p>`
    + `<code style="display:block;margin-top:.4rem;font-size:.78rem;color:hsl(${hue} 60% 40%);word-break:break-all">${escapeHtml(address)}</code>`
    + `<small style="color:#9a9a9a">integrity, not truth · 0/7</small>`
    + `</article>`
}

/** renderList(theorems) → a grid of cards. Presents many theorems BY REFERENCE (their addresses), never by
 *  embedding the full payload — so any number of theorems presents within a fixed byte budget per card. */
export function renderList(theorems: readonly TheoremView[]): string {
  return `<div class="uuidna-list" style="display:grid;gap:.4rem">${theorems.map(renderTheorem).join('')}</div>`
}
