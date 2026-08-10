// render — present a theorem (or any receipt) in the UI using ONLY TypeScript and CSS: no framework, no
// runtime deps. Each card carries the content-address — a 36-byte POINTER — never the full payload: by
// pigeonhole 1024 payloads cannot fit a small budget, but 1024 addresses (36 kB) do. Present by reference,
// the same bound as a single address. Every card is schema.org microdata and LINKS its statement to its
// proof page (/theorem/<key>) — the statement and its proof are one edge. A content-address proves integrity,
// not truth.
import { toUuid } from './address.js'

export interface TheoremView { name: string; address?: string; key?: string }
export interface RenderOpts { base?: string } // site base for proof links; '' → served at root (/theorem/<key>)

// Root-relative by default — the site is served at root (scripts/build-site.mjs), so proof links resolve to
// /theorem/<key>. Pass an explicit base (e.g. '/site') to prefix them. (Was '/millennium-solutions', the upstream
// deposit uuidna is extracted from — a stale default that pointed consumers' cards at the wrong site.)
const DEFAULT_BASE = ''

/** A single hue (0..359) from a content-address — the vortex colour, computed, nothing fetched. */
function hueOf(address: string): number {
  return (parseInt(address.replace(/[^0-9a-f]/gi, '').slice(0, 2) || '0', 16) * 40) % 360
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/** The proof URL for a theorem — its statement's link to its proof page. Keyless views point at the ledger. */
function proofUrl(t: TheoremView, base: string): string {
  return base.replace(/\/$/, '') + '/theorem/' + (t.key ?? '')
}

/** renderTheorem(t) → a self-contained HTML card (inline CSS, no framework) presenting one theorem BY its
 *  content-address, as schema.org CreativeWork microdata, LINKING the statement to its proof page (/theorem/<key>).
 *  If no address is given it is minted from the name — the same value always mints the same. */
export function renderTheorem(t: TheoremView, opts: RenderOpts = {}): string {
  const base = opts.base ?? DEFAULT_BASE
  const address = t.address ?? toUuid(t.name)
  const hue = hueOf(address)
  const title = escapeHtml(t.name.split('—')[0].trim() || t.name)
  const full = escapeHtml(t.name)
  const url = proofUrl(t, base)
  // the statement links to its proof: if a key is known the title is an anchor to /theorem/<key> (itemprop url)
  const heading = t.key
    ? `<a itemprop="url" href="${escapeHtml(url)}" style="color:inherit;text-decoration:none">${title}</a>`
    : title
  // STRICT shadcn anatomy via data-slot (card · card-header · card-title · card-description · card-content ·
  // card-footer) so a shadcn host consumes and styles these cards — compatible API, no framework dependency.
  // Inline CSS keeps them self-contained and CSP-safe when rendered standalone.
  return `<article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="${escapeHtml(url)}" `
    + `style="border-left:4px solid hsl(${hue} 60% 50%);padding:.6rem .9rem;`
    + `margin:.5rem 0;border-radius:8px;background:hsl(${hue} 60% 50% / .06);font:14px/1.5 system-ui,sans-serif">`
    + `<div data-slot="card-header">`
    + `<h3 data-slot="card-title" itemprop="name" style="margin:0 0 .3rem;font-size:1rem">${heading}</h3>`
    + `<p data-slot="card-description" itemprop="description" style="margin:0;color:#6a6a6a;font-size:.82rem">${full}</p>`
    + `</div>`
    + `<div data-slot="card-content">`
    + `<code itemprop="identifier" style="display:block;margin-top:.4rem;font-size:.78rem;color:hsl(${hue} 60% 40%);word-break:break-all">${escapeHtml(address)}</code>`
    + `</div>`
    + `<div data-slot="card-footer"><small style="color:#9a9a9a">integrity, not truth</small></div>`
    + `</article>`
}

/** renderHero(t) → the OpenGraph HERO for one theorem's page: the <meta property="og:*"> tags (title, description,
 *  type, url→its proof) PLUS the microdata card. Emitted head-first so a crawler or an agent reads the statement,
 *  its proof URL and its content-address on first contact. Self-contained, no script. */
export function renderHero(t: TheoremView, opts: RenderOpts = {}): string {
  const base = opts.base ?? DEFAULT_BASE
  const address = t.address ?? toUuid(t.name)
  const url = proofUrl(t, base)
  const og = [
    ['og:type', 'article'],
    ['og:title', t.name.split('—')[0].trim() || t.name],
    ['og:description', t.name],
    ['og:url', url],
    ['uuidna:address', address],
  ].map(([p, c]) => `<meta property="${escapeHtml(p)}" content="${escapeHtml(c)}">`).join('')
  return og + renderTheorem({ ...t, address }, opts)
}

/** renderList(theorems) → a grid of cards. Presents many theorems BY REFERENCE (their addresses), never by
 *  embedding the full payload — so any number of theorems presents within a fixed byte budget per card. */
export function renderList(theorems: readonly TheoremView[], opts: RenderOpts = {}): string {
  return `<div class="uuidna-list" style="display:grid;gap:.4rem">${theorems.map((t) => renderTheorem(t, opts)).join('')}</div>`
}
