// render — present a theorem (or any receipt) in the UI using ONLY TypeScript and CSS: no framework, no
// runtime deps. Each card carries the content-address — a 36-byte POINTER — never the full payload: by
// pigeonhole 1024 payloads cannot fit a small budget, but 1024 addresses (36 kB) do. Present by reference,
// the same bound as a single address. Every card is schema.org microdata and LINKS its statement to its
// proof page (/theorem/<key>) — the statement and its proof are one edge. A content-address proves integrity,
// not truth.
import { toUuid, vortexOrbit } from './address.js'
import { DIMENSIONS } from './harness.js'
import { sequenceVars, durationVars } from './css.js'

export interface TheoremView { name: string; address?: string; key?: string }
export interface RenderOpts { base?: string } // site base for proof links; '' → served at root (/theorem/<key>)

// Root-relative by default — VitePress serves the site at root, so proof links resolve to /theorem/<key>.
// Pass an explicit base (e.g. '/site') to prefix them. (Was '/millennium-solutions', the upstream deposit
// uuidna is extracted from — a stale default that pointed consumers' cards at the wrong site.)
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
    // The full content-address is the machine KEY, never shown — carried as microdata identifier (recomputable,
    // crawlable) and as the uuidna:address meta. What the reader sees is the first-part HANDLE (first 8 hex, the
    // door /<handle>); the rest of the uuid computes on the spot from the proof. Real uuids compute, they don't display.
    + `<meta itemprop="identifier" content="${escapeHtml(address)}">`
    + `<code data-slot="handle" style="display:block;margin-top:.4rem;font-size:.78rem;color:hsl(${hue} 60% 40%)">${escapeHtml(address.slice(0, 8))}</code>`
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

// ── THE HERO ANIMATION — motion computed from the ledger, never chosen ────────────────────────────────────────────
// Every number that moves here is sealed. The path is the DOUBLING ORBIT (vortexOrbit: 1→2→4→8→7→5→1, the unit group
// of ℤ/9 generated by 2 — vortex_is_the_units, order_of_two_is_six), so the walk closes because the orbit does. The
// colour of each rung is the ℤ/9 sequence hue (sequenceVars), and the TIMING is the units of ℤ/9 written three times
// — 111, 222, 444, 555, 777, 888 ms (durationVars) — so the animation's tempo is the same arithmetic as its path.
// The seven rays are the rosetta DIMENSIONS. Nothing is tuned by eye: change a sealed fact and the motion changes.
//
// HONEST SCOPE: a deterministic SVG computed from sealed constants. It VISUALISES the arithmetic; it does not prove
// anything the arithmetic does not already prove, and it claims nothing about what the motion depicts.
export interface HeroAnimation {
  svg: string
  sequence: readonly number[]      // the doubling orbit walked
  dimensions: readonly string[]    // the seven rosetta rays
  durations: readonly string[]     // the sealed tempi, in orbit order
  address: string                  // the content-address of this exact hero
  honest: string
}

/** heroAnimation(key, dimension, rung, tempo, base) → the sequence and dimensions as one animated SVG, every value
 *  sealed. FIVE parameters, all optional: which theorem it announces, which of the seven dimensions leads, which
 *  sequence rung the colour starts on, which sealed tempo drives it, and the URL base its proof link uses. */
export function heroAnimation(
  key = 'vortex_orbit', dimension = 'en', rung = 1, tempo = 444, base = DEFAULT_BASE,
): HeroAnimation {
  const orbit = vortexOrbit()                                     // [1,2,4,8,7,5] — the path, sealed
  const dims = DIMENSIONS                                         // the seven rays, sealed
  const seq = sequenceVars()                                      // rung → hue, sealed
  const durs = durationVars()                                     // the units of ℤ/9, tripled, sealed
  const tempoKeys = Object.keys(durs)
  const hue = (n: number): string => seq[`--seq-${((n + rung - 1) % 9) + 1}`] ?? seq['--seq-1']
  const beat = (i: number): string => durs[tempoKeys[i % tempoKeys.length]] ?? `${tempo}ms`
  // six nodes on the ring, placed by their ORBIT INDEX (not by angle chosen for looks): step k sits at k/6 of the turn
  const node = (v: number, i: number): string => {
    const turn = (i * 60)                                          // 360/6 — the orbit has six steps, so the ring does
    return `<g transform="rotate(${turn} 100 100)"><circle cx="100" cy="30" r="9" fill="${hue(v)}">` +
      `<animate attributeName="r" values="9;13;9" dur="${beat(i)}" repeatCount="indefinite"/></circle>` +
      `<text x="100" y="34" text-anchor="middle" font-size="10" fill="#0b0b0b" transform="rotate(${-turn} 100 30)">${v}</text></g>`
  }
  const ray = (d: string, i: number): string =>
    `<line x1="100" y1="100" x2="100" y2="58" stroke="${hue(i + 1)}" stroke-width="1" opacity=".35"` +
    ` transform="rotate(${(i * 360) / dims.length} 100 100)"><animate attributeName="opacity" values=".15;.5;.15"` +
    ` dur="${beat(i)}" repeatCount="indefinite"/></line>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img"` +
    ` aria-label="the doubling orbit ${orbit.join('→')} across ${dims.length} dimensions">` +
    `<title>${key} — the orbit walks ${orbit.join('→')}→${orbit[0]}, seven dimensions, tempi ${tempoKeys.map((k) => durs[k]).join(' ')}</title>` +
    dims.map(ray).join('') + orbit.map(node).join('') +
    `<circle cx="100" cy="100" r="4" fill="${hue(5)}"/></svg>`   // 5 — the fixed point of the diamond involution
  return {
    svg, sequence: orbit, dimensions: dims,
    durations: tempoKeys.map((k) => durs[k]),
    address: toUuid(`hero:${key}|${dimension}|${rung}|${tempo}|${base}|${orbit.join(',')}`),
    honest: 'A deterministic SVG computed from sealed constants: the path is the ℤ/9 doubling orbit, the hues are the ' +
      'sequence, the tempi are the units of ℤ/9 written three times. It VISUALISES arithmetic and proves nothing further.',
  }
}
